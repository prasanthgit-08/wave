/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomDropzone from "../../../common/CustomDropzone";
import { useDispatch, useSelector } from "react-redux";
import DWTComponent from "../../../../modules/dwt";
import {
  setBulkUnitReimbursementFiles,
  setDetailsData,
  setUploadActive,
} from "../../../../redux/Invoicing/BulkUnitReimbursementSlice";

const BulkReimbursementDocumentsContent = () => {
  const dispatch = useDispatch();

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

  const bulkUnitReimbursementFiles = useSelector(
    (state) => state.bulkUnitReimbursementReducer.bulkUnitReimbursementFiles
  );

  const { customerUploadFiles, companyUploadFiles, customerScanFiles, companyScanFiles } =
    bulkUnitReimbursementFiles;

  useEffect(() => {
    if (isCustomerUploadActive || isCompanyUploadActive || isCustomerScanActive || isCompanyScanActive) {
    } else {
    }
  }, [isCustomerUploadActive, isCompanyUploadActive, isCustomerScanActive, isCompanyScanActive]);

  useEffect(() => {
    dispatch(
      setDetailsData({
        customerUploadFiles,
        companyUploadFiles,
        customerScanFiles,
        companyScanFiles,
      })
    );
  }, [customerUploadFiles, companyUploadFiles, customerScanFiles, companyScanFiles]);

  useEffect(() => {
    if (isCompanyUploadActive || isCustomerUploadActive || isCompanyScanActive || isCustomerScanActive) {
      dispatch(setUploadActive(true));
    } else {
      dispatch(setUploadActive(false));
    }
  }, [isCompanyUploadActive, isCustomerUploadActive, isCompanyScanActive, isCustomerScanActive]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border p-2 quarterScreenFormContentHeight">
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

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-0">
              <Col xs={2} className="p-0" />
              <Col xs={10}>
                {/* Drag & Drop Component for Upload */}
                {isCustomerUploadActive && (
                  <CustomDropzone
                    files={customerUploadFiles}
                    setFiles={(files) =>
                      dispatch(
                        setBulkUnitReimbursementFiles({ actionType: "customerUploadFiles", payload: files })
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
                        setBulkUnitReimbursementFiles({ actionType: "customerScanFiles", payload: files })
                      )
                    }
                  />
                )}

                {isCompanyUploadActive && (
                  <CustomDropzone
                    files={companyUploadFiles}
                    setFiles={(files) =>
                      dispatch(
                        setBulkUnitReimbursementFiles({ actionType: "companyUploadFiles", payload: files })
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
                        setBulkUnitReimbursementFiles({ actionType: "companyScanFiles", payload: files })
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

export default BulkReimbursementDocumentsContent;
