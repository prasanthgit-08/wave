import { parseLocalDate } from "../../../utils/dateUtils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import QuarterScreenWrapper from "../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../common/Header";
import CommonFooter from "../../common/CommonFooter";
import { Col, Form, Modal, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setTestFile } from "../../../redux/BulkOrderEntrySlice";
import CustomerOrdersService from "../../../services/CustomerOrdersService";
import LoadingIcon from "../../common/LoadingIcon";
import toast from "react-hot-toast";
import { setTestResponse } from "../../../redux/CustomerOrdersSlice";
import { useNavigate } from "react-router-dom";

const BulkOrderEntry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const testFile = useSelector((state) => state.bulkOrderEntry.testFile);
  const [optionTemplateList, setOptionTemplateList] = useState([]);
  const [orderTemplateId, setOrderTemplateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [processingJob, setProcessingJob] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const statusRequestId = useRef(0);

  // Check if a file is selected
  const hasFile = testFile && testFile.fileName;
  const isBatchProcessing = processingJob?.status === "PROCESSING";

  const resetProcessingState = useCallback(() => {
    statusRequestId.current += 1;
    setProcessingJob(null);
    setCheckingStatus(false);
    setShowResultsModal(false);
  }, []);

  const handleFileChange = (event) => {
    const input = event.target;
    const file = input.files && input.files[0];
    if (!file) return;
    resetProcessingState();
    dispatch(setTestFile({ file, fileName: file.name, fileURL: URL.createObjectURL(file) }));
    input.value = "";
  };

  const removeFile = () => {
    resetProcessingState();
    dispatch(setTestFile(null));
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const handleTest = () => {
    setLoading(true);
    CustomerOrdersService.processCustomerOrderFile(testFile?.file, orderTemplateId)
      .then((res) => {
        const { data } = res;
        if (data) {
          if (data.error.errorCode !== "0") {
            toast.error(data.error.errorMessage);
          }

          if (data.error.errorCode === "0") {
            dispatch(setTestResponse(data?.response));
            dispatch(setTestFile(null));
            navigate(`/customer-orders/test-result/${orderTemplateId}/${0}`, {
              state: {
                fromBulkOrderEntry: true,
              },
            });
            toast.success("File Uploaded Successfully");
          }
        }
      })
      .catch((error) => {
        console.error("Error processing customer order file:", error);
      })
      .finally(() => setLoading(false));
  };

  const getExceptions = (exceptionList) => {
    if (!exceptionList) return [];

    const xmlDocument = new DOMParser().parseFromString(exceptionList, "application/xml");
    if (xmlDocument.querySelector("parsererror")) return [];

    return Array.from(xmlDocument.querySelectorAll("Exception")).map((exception) => ({
      vin: exception.querySelector("VIN")?.textContent || "-",
      message: exception.querySelector("ExceptionMessage")?.textContent || "-",
    }));
  };

  const exceptionRows = getExceptions(processingJob?.details?.ExceptionList);

  const checkProcessingStatus = useCallback(
    (batchCode) => {
      const batchId = batchCode || processingJob?.batchId;
      if (!batchId || checkingStatus) return;

      const requestId = ++statusRequestId.current;
      setCheckingStatus(true);
      CustomerOrdersService.getBulkOrderEntryStatus(batchId)
        .then((response) => {
          if (requestId !== statusRequestId.current) return;

          const statusData = response.data;
          const isComplete = statusData?.Status === true;

          setProcessingJob((currentJob) => ({
            ...currentJob,
            batchId,
            status: isComplete ? "COMPLETED" : "PROCESSING",
            lastChecked: statusData?.LastChecked || new Date().toISOString(),
            details: statusData,
          }));

          if (isComplete) setShowResultsModal(true);
        })
        .catch((error) => {
          if (requestId !== statusRequestId.current) return;

          console.error("Error checking bulk order entry status:", error);
          toast.error("Unable to check processing status. Please try again.");
        })
        .finally(() => {
          if (requestId === statusRequestId.current) setCheckingStatus(false);
        });
    },
    [checkingStatus, processingJob?.batchId]
  );

  useEffect(() => {
    if (processingJob?.status !== "PROCESSING" || checkingStatus) return undefined;

    const intervalId = window.setInterval(checkProcessingStatus, 5000);
    return () => window.clearInterval(intervalId);
  }, [checkProcessingStatus, checkingStatus, processingJob?.status]);

  const handleProcess = () => {
    setLoading(true);
    CustomerOrdersService.processCustomerOrderFile(testFile?.file, orderTemplateId, "Process")
      .then((res) => {
        const { data } = res;
        if (data) {
          if (data.error.errorCode !== "0") {
            toast.error(data.error.errorMessage);
          }

          if (data.error.errorCode === "0") {
            const batchId = data?.response?.BatchID?.[0]?.BatchID;
            if (!batchId) {
              toast.error("The file was submitted, but no batch ID was returned.");
              return;
            }

            setProcessingJob({
              batchId,
              status: "PROCESSING",
              lastChecked: null,
              details: null,
            });
            dispatch(setTestFile(null));
            toast.success("File submitted for processing");
            checkProcessingStatus(batchId);
          }
        }
      })
      .catch((error) => {
        // console.error("Error processing customer order file:", error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const fetchOrderTemplateList = () => {
      setLoading(true);
      CustomerOrdersService.getOrderTemplates()
        .then((response) => {
          const data = response.data;
          setOptionTemplateList(data?.customerOrders);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    };

    fetchOrderTemplateList();
  }, []);

  const leftButtons = [
    {
      label: "Test",
      onClick: handleTest,
      disabled: !hasFile || !orderTemplateId,
    },
  ];
  const rightButtons = [
    {
      label: "Process",
      onClick: handleProcess,
      disabled: !hasFile || !orderTemplateId || isBatchProcessing,
    },
  ];

  return (
    <QuarterScreenWrapper>
      {loading && <LoadingIcon />}
      <Header />
      <div className="w-100 p-1">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100 mt-3">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group align-items-center row m-l-50 m-r-0 mb-2 mt-5">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">Order Template</Form.Label>
                    </Col>
                    <Col xs={3} className="p-0">
                      <Form.Select
                        className={`customFormControl ${orderTemplateId ? "borderGreen" : "borderRed"}`}
                        name="customerType"
                        id="customerType"
                        value={orderTemplateId}
                        onChange={(e) => {
                          if (e.target.value !== orderTemplateId) resetProcessingState();
                          setOrderTemplateId(e.target.value);
                        }}
                        disabled={isBatchProcessing}
                      >
                        <option value="">--Select--</option>
                        {optionTemplateList?.map((item) => (
                          <option key={item.CustomerOrderPK} value={item.CustomerOrderPK}>
                            {item.Description}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Form.Group className="form-group align-items-center row m-l-50 m-r-0 mb-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">File To Be Processed</Form.Label>
                    </Col>

                    <Col xs={6} className="p-0 d-flex position-relative">
                      <input
                        type="text"
                        className="customFormControl"
                        readOnly
                        placeholder={!hasFile ? "No file selected" : ""}
                        value={hasFile ? "" : ""}
                      />
                      {hasFile && (
                        <a
                          href={testFile.fileURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="file-link"
                          style={{
                            position: "absolute",
                            left: "15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "blue",
                            textDecoration: "underline",
                            cursor: "pointer",
                            width: "90%",
                            textAlign: "left",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {testFile.fileName}
                        </a>
                      )}
                      {hasFile && (
                        <i
                          className="fa-solid fa-xmark"
                          onClick={removeFile}
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "black",
                          }}
                        />
                      )}
                    </Col>

                    <Col className="ms-2">
                      <button
                        type="button"
                        className="btn btn-secondary customButtonMediumWidth btn-sm"
                        onClick={triggerFileInput}
                        disabled={isBatchProcessing}
                      >
                        Browse
                      </button>
                      <input
                        type="file"
                        id="fileInput"
                        accept=".csv, .txt, .xlsx"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </Col>
                  </Form.Group>

                  {processingJob && (
                    <div className="border rounded p-3 mt-4 ms-5" style={{ maxWidth: "510px" }}>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <strong>Processing Status</strong>
                        <span
                          className={`badge ${
                            processingJob.status === "COMPLETED" ? "bg-success" : "bg-warning text-dark"
                          }`}
                        >
                          {processingJob.status === "COMPLETED" ? "Completed" : "Processing"}
                        </span>
                      </div>
                      <p className="mb-2">
                        {processingJob.status === "COMPLETED"
                          ? "Your order has finished processing."
                          : "Backend is processing your order. This may take several minutes."}
                      </p>
                      {processingJob.status === "PROCESSING" && (
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <Spinner
                            animation="border"
                            role="status"
                            aria-label="Processing"
                            style={{ width: "2.25rem", height: "2.25rem" }}
                          />
                          <span>
                            {checkingStatus ? "Checking status..." : "Waiting for backend processing..."}
                          </span>
                        </div>
                      )}
                      <small className="d-block text-muted mb-3">
                        Batch ID: {processingJob.batchId}
                        <br />
                        Last checked:{" "}
                        {processingJob.lastChecked
                          ? parseLocalDate(processingJob.lastChecked).toLocaleString()
                          : "Not yet checked"}
                      </small>
                      <button
                        type="button"
                        className="btn btn-secondary customButtonMediumWidth btn-sm"
                        onClick={() => {
                          if (processingJob.status === "COMPLETED") {
                            setShowResultsModal(true);
                          } else {
                            checkProcessingStatus();
                          }
                        }}
                        disabled={checkingStatus}
                      >
                        {checkingStatus
                          ? "Checking..."
                          : processingJob.status === "COMPLETED"
                            ? "View Results"
                            : "Check Status"}
                      </button>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <CommonFooter leftButtons={leftButtons} rightButtons={rightButtons} />

      <Modal show={showResultsModal} onHide={() => setShowResultsModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Bulk Order Processing Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3 mb-4">
            <Col sm={4}>
              <div className="border rounded p-3 text-center">
                <div className="text-muted small">Total Records</div>
                <strong>{processingJob?.details?.RecordCount ?? 0}</strong>
              </div>
            </Col>
            <Col sm={4}>
              <div className="border rounded p-3 text-center text-success">
                <div className="text-muted small">Successful</div>
                <strong>{processingJob?.details?.SuccessCount ?? 0}</strong>
              </div>
            </Col>
            <Col sm={4}>
              <div className="border rounded p-3 text-center text-danger">
                <div className="text-muted small">Failed</div>
                <strong>{processingJob?.details?.FailedCount ?? 0}</strong>
              </div>
            </Col>
          </Row>

          <h6>Exceptions</h6>
          <div className="border rounded" style={{ maxHeight: "300px", overflowY: "auto" }}>
            <Table striped hover responsive className="mb-0">
              <thead className="sticky-top bg-light">
                <tr>
                  <th>VIN</th>
                  <th>Exception</th>
                </tr>
              </thead>
              <tbody>
                {exceptionRows.map((exception, index) => (
                  <tr key={`${exception.vin}-${index}`}>
                    <td>{exception.vin}</td>
                    <td>{exception.message}</td>
                  </tr>
                ))}
                {exceptionRows.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center text-muted">
                      No exceptions were returned.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setShowResultsModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </QuarterScreenWrapper>
  );
};

export default BulkOrderEntry;
