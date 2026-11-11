/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomDropzone from "../../../common/CustomDropzone";
import { useDispatch, useSelector } from "react-redux";
import ScanInvoiceService from "../../../../services/Invoicing/ScanInvoiceService";
import DWTComponent from "../../../../modules/dwt";
import {
  setScanInvoicePayload,
  setScanInvoiceFiles,
  setDisableSave,
} from "../../../../redux/Invoicing/ScanInvoiceSlice";
import { useNavigate } from "react-router-dom";

const DocumentScanScreenContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCustomerUploadActive, setIsCustomerUploadActive] = useState(false);
  const [isCompanyUploadActive, setIsCompanyUploadActive] = useState(false);
  const [isBolUploadActive, setIsBolUploadActive] = useState(false);
  const [isDafUploadActive, setIsDafUploadActive] = useState(false);
  const [isIftaUploadActive, setIsIftaUploadActive] = useState(false);
  const [isBreakdownUploadActive, setIsBreakdownUploadActive] = useState(false);

  const [isCustomerScanActive, setIsCustomerScanActive] = useState(false);
  const [isCompanyScanActive, setIsCompanyScanActive] = useState(false);
  const [isBolScanActive, setIsBolScanActive] = useState(false);
  const [isDafScanActive, setIsDafScanActive] = useState(false);
  const [isIftaScanActive, setIsIftaScanActive] = useState(false);
  const [isBreakdownScanActive, setIsBreakdownScanActive] = useState(false);

  const [isBolVisible, setIsBolVisible] = useState(false);
  const [isDafVisible, setIsDafVisible] = useState(false);
  const [isIftaVisible, setIsIftaVisible] = useState(false);
  const [isBreakdownVisible, setIsBreakdownVisible] = useState(false);

  const companyFK = useSelector((state) => state.scanInvoiceReducer.companyFK);
  const invoicePK = useSelector((state) => state.scanInvoiceReducer.invoicePK);
  const scanInvoiceFiles = useSelector((state) => state.scanInvoiceReducer.scanInvoiceFiles);
  const selectedCompanyName = useSelector((state) => state.scanInvoiceReducer.selectedCompanyName);
  const invoiceById = useSelector((state) => state.scanInvoiceReducer.invoiceById);

  const {
    customerUploadFiles,
    companyUploadFiles,
    bolUploadFiles,
    dafUploadFiles,
    iftaUploadFiles,
    breakdownUploadFiles,
    customerScanFiles,
    companyScanFiles,
    bolScanFiles,
    dafScanFiles,
    iftaScanFiles,
    breakdownScanFiles,
  } = scanInvoiceFiles;

  // Set buttonFlags & Update payload object on intial render
  useEffect(() => {
    const getButtonFlags = () => {
      ScanInvoiceService.getbuttonValidations(selectedCompanyName, companyFK, invoicePK)
        .then((response) => {
          const { data } = response;

          if (data?.miscellaneous) {
            setIsBolVisible(false);
            setIsDafVisible(false);
            setIsIftaVisible(false);
            setIsBreakdownVisible(false);
          } else {
            setIsBolVisible(data?.bolFlag);
            setIsDafVisible(data?.dafFlag);
            setIsIftaVisible(data?.iftaFlag);
            setIsBreakdownVisible(data?.breadownFlag);
          }
        })
        .catch(() => {});
    };

    if (invoicePK) {
      getButtonFlags();
    }

    dispatch(
      setScanInvoicePayload({
        companyFK,
        companyName: selectedCompanyName,
      })
    );
  }, []);

  useEffect(() => {
    if (!invoicePK) {
      navigate("/scan-invoice/invoice-unit-selection");
    }
  }, []);

  // Scan Invoice Save Validation
  useEffect(() => {
    if (
      (customerUploadFiles?.length === 0 &&
        companyUploadFiles?.length === 0 &&
        bolUploadFiles?.length === 0 &&
        dafUploadFiles?.length === 0 &&
        iftaUploadFiles?.length === 0 &&
        breakdownUploadFiles?.length === 0 &&
        customerScanFiles?.length === 0 &&
        companyScanFiles?.length === 0 &&
        bolScanFiles?.length === 0 &&
        dafScanFiles?.length === 0 &&
        iftaScanFiles?.length === 0 &&
        breakdownScanFiles?.length === 0) ||
      isCustomerUploadActive ||
      isCompanyUploadActive ||
      isBolUploadActive ||
      isDafUploadActive ||
      isIftaUploadActive ||
      isBreakdownUploadActive ||
      isCustomerScanActive ||
      isCompanyScanActive ||
      isBolScanActive ||
      isDafScanActive ||
      isIftaScanActive ||
      isBreakdownScanActive
    ) {
      dispatch(setDisableSave(true));
    } else {
      dispatch(setDisableSave(false));
    }
  }, [
    customerUploadFiles,
    companyUploadFiles,
    bolUploadFiles,
    dafUploadFiles,
    iftaUploadFiles,
    breakdownUploadFiles,
    customerScanFiles,
    companyScanFiles,
    bolScanFiles,
    dafScanFiles,
    iftaScanFiles,
    breakdownScanFiles,
    isCustomerUploadActive,
    isCompanyUploadActive,
    isBolUploadActive,
    isDafUploadActive,
    isIftaUploadActive,
    isBreakdownUploadActive,
    isCustomerScanActive,
    isCompanyScanActive,
    isBolScanActive,
    isDafScanActive,
    isIftaScanActive,
    isBreakdownScanActive,
  ]);

  // Update Scan Invoice payload with uploaded/scanned files
  useEffect(() => {
    dispatch(
      setScanInvoicePayload({
        customerUploadFiles,
        companyUploadFiles,
        bolUploadFiles,
        dafUploadFiles,
        iftaUploadFiles,
        breakdownUploadFiles,
        customerScanFiles,
        companyScanFiles,
        bolScanFiles,
        dafScanFiles,
        iftaScanFiles,
        breakdownScanFiles,
      })
    );
  }, [
    customerUploadFiles,
    companyUploadFiles,
    bolUploadFiles,
    dafUploadFiles,
    iftaUploadFiles,
    breakdownUploadFiles,
    customerScanFiles,
    companyScanFiles,
    bolScanFiles,
    dafScanFiles,
    iftaScanFiles,
    breakdownScanFiles,
  ]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border p-2 halfScreenFormContentHeight">
        <Row className="mx-0 p-0 mt-2">
          <Col xs={10}>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Unit Number</Form.Label>
              </Col>
              <Col xs={4} className="p-0">
                <input
                  name="unitNumber"
                  id="unitNumber"
                  type="text"
                  className={`customFormControl`}
                  value={
                    invoiceById?.[0]?.miscellaneousUnit
                      ? invoiceById?.[0]?.miscellaneousUnit
                      : invoiceById?.[0]?.unitNumber || ""
                  }
                  disabled
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 mb-2`}>
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Customer Paperwork</Form.Label>
              </Col>

              <Col xs={1} className="p-0 w-150px">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isCustomerUploadActive
                      ? "btn-warning"
                      : customerUploadFiles?.length > 0
                        ? "btn-success"
                        : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => setIsCustomerUploadActive((state) => !state)}
                  disabled={
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i className="fa-solid fa-cloud-arrow-up me-1" />
                  Upload
                </button>
              </Col>
              <Col xs={2} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isCustomerScanActive
                      ? "btn-warning"
                      : customerScanFiles?.length > 0
                        ? "btn-success"
                        : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => setIsCustomerScanActive((state) => !state)}
                  disabled={
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>

            <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 mb-2`}>
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Company Paperwork</Form.Label>
              </Col>

              <Col xs={1} className="p-0 w-150px">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isCompanyUploadActive
                      ? "btn-warning"
                      : companyUploadFiles?.length > 0
                        ? "btn-success"
                        : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => setIsCompanyUploadActive((state) => !state)}
                  disabled={
                    isCustomerUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i className="fa-solid fa-cloud-arrow-up me-1" />
                  Upload
                </button>
              </Col>

              <Col xs={2} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isCompanyScanActive
                      ? "btn-warning"
                      : companyScanFiles?.length > 0
                        ? "btn-success"
                        : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => {
                    setIsCompanyScanActive((state) => !state);
                  }}
                  disabled={
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCustomerScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>

            {isBolVisible && (
              <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 mb-2`}>
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">BOL</Form.Label>
                </Col>

                <Col xs={1} className="p-0 w-150px">
                  <button
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                      isBolUploadActive
                        ? "btn-warning"
                        : bolUploadFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => setIsBolUploadActive((state) => !state)}
                    disabled={
                      isCustomerUploadActive ||
                      isCompanyUploadActive ||
                      isDafUploadActive ||
                      isIftaUploadActive ||
                      isBreakdownUploadActive ||
                      isCustomerScanActive ||
                      isCompanyScanActive ||
                      isBolScanActive ||
                      isDafScanActive ||
                      isIftaScanActive ||
                      isBreakdownScanActive
                    }
                  >
                    <i className="fa-solid fa-cloud-arrow-up me-1" />
                    Upload
                  </button>
                </Col>

                <Col xs={2} className="p-0">
                  <button
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                      isBolScanActive
                        ? "btn-warning"
                        : bolScanFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => setIsBolScanActive((state) => !state)}
                    disabled={
                      isCustomerUploadActive ||
                      isCompanyUploadActive ||
                      isBolUploadActive ||
                      isDafUploadActive ||
                      isIftaUploadActive ||
                      isBreakdownUploadActive ||
                      isCustomerScanActive ||
                      isCompanyScanActive ||
                      isDafScanActive ||
                      isIftaScanActive ||
                      isBreakdownScanActive
                    }
                  >
                    <i class="fa-solid fa-expand me-2" />
                    Scan
                  </button>
                </Col>
              </Form.Group>
            )}

            {isDafVisible && (
              <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 mb-2`}>
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">DAF</Form.Label>
                </Col>

                <Col xs={1} className="p-0 w-150px">
                  <button
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                      isDafUploadActive
                        ? "btn-warning"
                        : dafUploadFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => setIsDafUploadActive((state) => !state)}
                    disabled={
                      isCustomerUploadActive ||
                      isCompanyUploadActive ||
                      isBolUploadActive ||
                      isIftaUploadActive ||
                      isBreakdownUploadActive ||
                      isCustomerScanActive ||
                      isCompanyScanActive ||
                      isBolScanActive ||
                      isDafScanActive ||
                      isIftaScanActive ||
                      isBreakdownScanActive
                    }
                  >
                    <i className="fa-solid fa-cloud-arrow-up me-1" />
                    Upload
                  </button>
                </Col>

                <Col xs={2} className="p-0">
                  <button
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                      isDafScanActive
                        ? "btn-warning"
                        : dafScanFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => setIsDafScanActive((state) => !state)}
                    disabled={
                      isCustomerUploadActive ||
                      isCompanyUploadActive ||
                      isBolUploadActive ||
                      isDafUploadActive ||
                      isIftaUploadActive ||
                      isBreakdownUploadActive ||
                      isCustomerScanActive ||
                      isCompanyScanActive ||
                      isBolScanActive ||
                      isIftaScanActive ||
                      isBreakdownScanActive
                    }
                  >
                    <i class="fa-solid fa-expand me-2" />
                    Scan
                  </button>
                </Col>
              </Form.Group>
            )}

            {isIftaVisible && (
              <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 mb-2`}>
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">IFTA</Form.Label>
                </Col>

                <Col xs={1} className="p-0 w-150px">
                  <button
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                      isIftaUploadActive
                        ? "btn-warning"
                        : iftaUploadFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => setIsIftaUploadActive((state) => !state)}
                    disabled={
                      isCustomerUploadActive ||
                      isCompanyUploadActive ||
                      isBolUploadActive ||
                      isDafUploadActive ||
                      isBreakdownUploadActive ||
                      isCustomerScanActive ||
                      isCompanyScanActive ||
                      isBolScanActive ||
                      isDafScanActive ||
                      isIftaScanActive ||
                      isBreakdownScanActive
                    }
                  >
                    <i className="fa-solid fa-cloud-arrow-up me-1" />
                    Upload
                  </button>
                </Col>

                <Col xs={2} className="p-0">
                  <button
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                      isIftaScanActive
                        ? "btn-warning"
                        : iftaScanFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => setIsIftaScanActive((state) => !state)}
                    disabled={
                      isCustomerUploadActive ||
                      isCompanyUploadActive ||
                      isBolUploadActive ||
                      isDafUploadActive ||
                      isIftaUploadActive ||
                      isBreakdownUploadActive ||
                      isCustomerScanActive ||
                      isCompanyScanActive ||
                      isBolScanActive ||
                      isDafScanActive ||
                      isBreakdownScanActive
                    }
                  >
                    <i class="fa-solid fa-expand me-2" />
                    Scan
                  </button>
                </Col>
              </Form.Group>
            )}

            {isBreakdownVisible && (
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-4">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Breakdown</Form.Label>
                </Col>

                <Col xs={1} className="p-0 w-150px">
                  <button
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                      isBreakdownUploadActive
                        ? "btn-warning"
                        : breakdownUploadFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => setIsBreakdownUploadActive((state) => !state)}
                    disabled={
                      isCustomerUploadActive ||
                      isCompanyUploadActive ||
                      isBolUploadActive ||
                      isDafUploadActive ||
                      isIftaUploadActive ||
                      isCustomerScanActive ||
                      isCompanyScanActive ||
                      isBolScanActive ||
                      isDafScanActive ||
                      isIftaScanActive ||
                      isBreakdownScanActive
                    }
                  >
                    <i className="fa-solid fa-cloud-arrow-up me-1" />
                    Upload
                  </button>
                </Col>

                <Col xs={2} className="p-0">
                  <button
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                      isBreakdownScanActive
                        ? "btn-warning"
                        : breakdownScanFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => setIsBreakdownScanActive((state) => !state)}
                    disabled={
                      isCustomerUploadActive ||
                      isCompanyUploadActive ||
                      isBolUploadActive ||
                      isDafUploadActive ||
                      isIftaUploadActive ||
                      isBreakdownUploadActive ||
                      isCustomerScanActive ||
                      isCompanyScanActive ||
                      isBolScanActive ||
                      isDafScanActive ||
                      isIftaScanActive
                    }
                  >
                    <i class="fa-solid fa-expand me-2" />
                    Scan
                  </button>
                </Col>
              </Form.Group>
            )}

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-0">
              <Col xs={2} className="p-0" />
              <Col xs={10}>
                {/* Drag & Drop Component for Upload */}
                {isCustomerUploadActive && (
                  <CustomDropzone
                    files={customerUploadFiles}
                    setFiles={(files) =>
                      dispatch(setScanInvoiceFiles({ actionType: "customerUploadFiles", payload: files }))
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      customerUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {/* Scan Component for scanning documents */}
                {isCustomerScanActive && (
                  <DWTComponent
                    files={customerScanFiles}
                    setFiles={(files) =>
                      dispatch(setScanInvoiceFiles({ actionType: "customerScanFiles", payload: files }))
                    }
                  />
                )}

                {isCompanyUploadActive && (
                  <CustomDropzone
                    files={companyUploadFiles}
                    setFiles={(files) =>
                      dispatch(setScanInvoiceFiles({ actionType: "companyUploadFiles", payload: files }))
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      companyUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {isCompanyScanActive && (
                  <DWTComponent
                    files={companyScanFiles}
                    setFiles={(files) =>
                      dispatch(setScanInvoiceFiles({ actionType: "companyScanFiles", payload: files }))
                    }
                  />
                )}

                {isBolUploadActive && (
                  <CustomDropzone
                    files={bolUploadFiles}
                    setFiles={(files) =>
                      dispatch(setScanInvoiceFiles({ actionType: "bolUploadFiles", payload: files }))
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      bolUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {isBolScanActive && (
                  <DWTComponent
                    files={bolScanFiles}
                    setFiles={(files) =>
                      dispatch(setScanInvoiceFiles({ actionType: "bolScanFiles", payload: files }))
                    }
                  />
                )}

                {isDafUploadActive && (
                  <CustomDropzone
                    files={dafUploadFiles}
                    setFiles={(files) =>
                      dispatch(setScanInvoiceFiles({ actionType: "dafUploadFiles", payload: files }))
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      dafUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {isDafScanActive && (
                  <DWTComponent
                    files={dafScanFiles}
                    setFiles={(files) =>
                      dispatch(setScanInvoiceFiles({ actionType: "dafScanFiles", payload: files }))
                    }
                  />
                )}

                {isIftaUploadActive && (
                  <CustomDropzone
                    files={iftaUploadFiles}
                    setFiles={(files) =>
                      dispatch(setScanInvoiceFiles({ actionType: "iftaUploadFiles", payload: files }))
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      iftaUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {isIftaScanActive && (
                  <DWTComponent
                    files={iftaScanFiles}
                    setFiles={(files) =>
                      dispatch(setScanInvoiceFiles({ actionType: "iftaScanFiles", payload: files }))
                    }
                  />
                )}

                {isBreakdownUploadActive && (
                  <CustomDropzone
                    files={breakdownUploadFiles}
                    setFiles={(files) =>
                      dispatch(setScanInvoiceFiles({ actionType: "breakdownUploadFiles", payload: files }))
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      breakdownUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {isBreakdownScanActive && (
                  <DWTComponent
                    files={breakdownScanFiles}
                    setFiles={(files) =>
                      dispatch(setScanInvoiceFiles({ actionType: "breakdownScanFiles", payload: files }))
                    }
                  />
                )}
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DocumentScanScreenContent;
