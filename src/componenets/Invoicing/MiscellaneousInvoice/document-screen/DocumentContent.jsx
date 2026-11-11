import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomDropzone from "../../../common/CustomDropzone";
import { useDispatch, useSelector } from "react-redux";
import { setMiscInvoiceFiles } from "../../../../redux/Invoicing/MiscInvoiceSlice";
import DWTComponent from "../../../../modules/dwt";

const DocumentContent = () => {
  const dispatch = useDispatch();

  const [isCustomerUploadActive, setIsCustomerUploadActive] = useState(false);
  const [isCompanyUploadActive, setIsCompanyUploadActive] = useState(false);
  const [isCustomerScanActive, setIsCustomerScanActive] = useState(false);
  const [isCompanyScanActive, setIsCompanyScanActive] = useState(false);
  const miscInvoiceFiles = useSelector((state) => state.miscInvoiceReducer.miscInvoiceFiles);

  const { customerUploadFiles, companyUploadFiles, customerScanFiles, companyScanFiles } = miscInvoiceFiles;

  /****
   * Scan Invoice Save Validation
   * ****/
  useEffect(() => {
    if (isCustomerUploadActive || isCompanyUploadActive || isCustomerScanActive || isCompanyScanActive) {
      dispatch(setMiscInvoiceFiles({ actionType: "setScanStatus", payload: true }));
    } else {
      dispatch(setMiscInvoiceFiles({ actionType: "setScanStatus", payload: false }));
    }
  }, [isCustomerUploadActive, isCompanyUploadActive, isCustomerScanActive, isCompanyScanActive]);

  return (
    <div className="m-1">
      {/* <div className="shadow-sm rounded border quarterScreenFormContentHeight"> */}
      <div className="shadow-sm rounded border p-1" style={{ height: "424px" }}>
        <div className="ps-3 mb-4 ">
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
                        : customerUploadFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => setIsCustomerUploadActive((state) => !state)}
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
                        : customerScanFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => setIsCustomerScanActive((state) => !state)}
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
                    onClick={() => setIsCompanyUploadActive((state) => !state)}
                    disabled={isCustomerUploadActive || isCustomerScanActive || isCompanyScanActive}
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
                    disabled={isCustomerUploadActive || isCompanyUploadActive || isCustomerScanActive}
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
                        dispatch(setMiscInvoiceFiles({ actionType: "customerUploadFiles", payload: files }))
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
                        dispatch(setMiscInvoiceFiles({ actionType: "customerScanFiles", payload: files }))
                      }
                    />
                  )}

                  {isCompanyUploadActive && (
                    <CustomDropzone
                      files={companyUploadFiles}
                      setFiles={(files) =>
                        dispatch(setMiscInvoiceFiles({ actionType: "companyUploadFiles", payload: files }))
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
                        dispatch(setMiscInvoiceFiles({ actionType: "companyScanFiles", payload: files }))
                      }
                    />
                  )}
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default DocumentContent;
