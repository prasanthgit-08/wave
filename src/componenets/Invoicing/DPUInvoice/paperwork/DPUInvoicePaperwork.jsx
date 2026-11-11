import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomDropzone from "../../../common/CustomDropzone";
import DWTComponent from "../../../../modules/dwt";
import {
  setDpuInvoicePaperworkFiles,
  setDpuInvoicePayload,
  setIsButtonsLoopingCompleted,
  setDisableSave,
} from "../../../../redux/Invoicing/DPUInvoiceSlice";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../../common/LoadingIcon";

const DPUInvoicePaperwork = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState("customer");
  const [isCustomerUploadActive, setIsCustomerUploadActive] = useState(false);
  const [isCustomerScanActive, setIsCustomerScanActive] = useState(false);
  const [isCompanyUploadActive, setIsCompanyUploadActive] = useState(false);
  const [isCompanyScanActive, setIsCompanyScanActive] = useState(false);

  const dpuInvoicePaperworkFiles = useSelector((state) => state.dpuInvoice.dpuInvoicePaperworkFiles);
  const isButtonsLoopingCompleted = useSelector((state) => state.dpuInvoice.isButtonsLoopingCompleted);

  const dpuInvoicePayload = useSelector((state) => state.dpuInvoice.dpuInvoicePayload);

  const unitPK = useSelector((state) => state.dpuInvoice.unitPK);
  const [loading, setLoading] = useState(true);

  const { customerUploadFiles, companyUploadFiles, customerScanFiles, companyScanFiles } =
    dpuInvoicePaperworkFiles;

  // Scan Invoice Save Validation
  useEffect(() => {
    if (
      (customerUploadFiles?.length === 0 && customerScanFiles?.length === 0) ||
      isCustomerUploadActive ||
      isCompanyUploadActive ||
      isCustomerScanActive ||
      isCompanyScanActive
    ) {
      dispatch(setDisableSave(true));
    } else {
      dispatch(setDisableSave(false));
    }
  }, [
    customerUploadFiles,
    customerScanFiles,
    isCustomerUploadActive,
    isCompanyUploadActive,
    isCustomerScanActive,
    isCompanyScanActive,
  ]);

  useEffect(() => {
    if (!unitPK) {
      navigate("/DpuInvoice/browse");
    }
  }, []);

  useEffect(() => {
    dispatch(
      setDpuInvoicePayload({
        customerUploadFiles,
        companyUploadFiles,
        customerScanFiles,
        companyScanFiles,
      })
    );
  }, [customerUploadFiles, companyUploadFiles, customerScanFiles, companyScanFiles]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="mx-0 p-0 mt-2">
          <Col xs={10}>
            <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 mb-2`}>
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Customer Paperwork</Form.Label>
              </Col>

              <Col xs={1} className="p-0 w-150px">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isCustomerUploadActive
                      ? "btn-warning"
                      : !isButtonsLoopingCompleted && activeButton === "customer"
                        ? "btn-success"
                        : !customerUploadFiles?.length && !customerScanFiles?.length
                          ? "btn-danger"
                          : customerUploadFiles?.length
                            ? "btn-success"
                            : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => {
                    setIsCustomerUploadActive((state) => !state);

                    if (
                      activeButton === "customer" &&
                      isCustomerUploadActive &&
                      (customerUploadFiles?.length > 0 || customerScanFiles?.length > 0) &&
                      !isButtonsLoopingCompleted
                    ) {
                      setActiveButton("");
                      dispatch(setIsButtonsLoopingCompleted(true));
                    }
                  }}
                  disabled={isCompanyUploadActive || isCustomerScanActive || isCompanyScanActive}
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
                      : !isButtonsLoopingCompleted && activeButton === "customer"
                        ? "btn-success"
                        : !customerUploadFiles?.length && !customerScanFiles?.length
                          ? "btn-danger"
                          : customerScanFiles?.length
                            ? "btn-success"
                            : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => {
                    setIsCustomerScanActive((state) => !state);

                    if (
                      activeButton === "customer" &&
                      isCustomerUploadActive &&
                      (customerUploadFiles?.length > 0 || customerScanFiles?.length > 0) &&
                      !isButtonsLoopingCompleted
                    ) {
                      setActiveButton("");
                      dispatch(setIsButtonsLoopingCompleted(true));
                    }
                  }}
                  disabled={isCustomerUploadActive || isCompanyUploadActive || isCompanyScanActive}
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
                  onClick={() => {
                    setIsCompanyUploadActive((state) => !state);
                  }}
                  disabled={
                    isCustomerUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    !isButtonsLoopingCompleted
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
                    isCustomerScanActive ||
                    !isButtonsLoopingCompleted
                  }
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-0">
              <Col xs={2} className="p-0" />
              <Col xs={10}>
                {/* Drag & Drop Component for Upload */}
                {isCustomerUploadActive && (
                  <CustomDropzone
                    files={customerUploadFiles}
                    setFiles={(files) =>
                      dispatch(
                        setDpuInvoicePaperworkFiles({ actionType: "customerUploadFiles", payload: files })
                      )
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
                      dispatch(
                        setDpuInvoicePaperworkFiles({ actionType: "customerScanFiles", payload: files })
                      )
                    }
                  />
                )}

                {isCompanyUploadActive && (
                  <CustomDropzone
                    files={companyUploadFiles}
                    setFiles={(files) =>
                      dispatch(
                        setDpuInvoicePaperworkFiles({ actionType: "companyUploadFiles", payload: files })
                      )
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
                      dispatch(
                        setDpuInvoicePaperworkFiles({ actionType: "companyScanFiles", payload: files })
                      )
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

export default DPUInvoicePaperwork;
