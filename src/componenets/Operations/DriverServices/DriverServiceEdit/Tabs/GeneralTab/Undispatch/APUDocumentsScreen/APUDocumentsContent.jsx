import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  setApuFiles,
  setApuSave,
  setCompanyApuPaperworkFiles,
  setCustomerApuPaperworkFiles,
  setInactiveAPUDropzone,
} from "../../../../../../../../redux/UndispatchSlice";
import UndispatchService from "../../../../../../../../services/UndispatchService";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CustomDropzoneDisabled from "../../../../../../../common/CustomDropzoneDisabled";
import CustomDropzone from "../../../../../../../common/CustomDropzone";
import DWTComponent from "../../../../../../../../modules/dwt";
const APUDocumentsContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dispatchId, driverId } = useParams();
  const [buttonsAPUFlagResponse, setButtonsAPUFlagResponse] = useState(null);

  const [isCustomerUploadActive, setIsCustomerUploadActive] = useState(false);
  const [isCompanyUploadActive, setIsCompanyUploadActive] = useState(false);

  const [isCustomerScanActive, setIsCustomerScanActive] = useState(false);
  const [isCompanyScanActive, setIsCompanyScanActive] = useState(false);

  const apuFiles = useSelector((state) => state.undispatchReducer.apuFiles);
  const { customerUploadFiles, companyUploadFiles, customerScanFiles, companyScanFiles } = apuFiles;

  const undispatchFlag = useSelector((state) => state.undispatchReducer.undispatchFlag);

  useEffect(() => {
    if (isCustomerUploadActive || isCompanyUploadActive || isCustomerScanActive || isCompanyScanActive) {
      dispatch(setApuSave(false));
    } else {
      dispatch(setApuSave(true));
    }
  }, [isCustomerUploadActive, isCompanyUploadActive, isCustomerScanActive, isCompanyScanActive]);

  useEffect(() => {
    if (!undispatchFlag) {
      navigate(`/undispatch/${driverId}`);
    }
  }, [undispatchFlag]);

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col xs={12}>
            <Form.Group className="mt-0  align-items  row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <label className="col-form-label dealer-label p-0 m-b-20">Customer Paperwork</label>
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
                  onClick={() => {
                    setIsCustomerUploadActive((state) => !state);
                  }}
                  disabled={isCompanyUploadActive || isCustomerScanActive || isCompanyScanActive}
                >
                  Upload
                </button>{" "}
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

            <Form.Group className="mt-1  align-items  row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <label className="col-form-label dealer-label p-0 m-b-20">Company Paperwork</label>
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
                  disabled={isCustomerUploadActive || isCustomerScanActive || isCompanyScanActive}
                >
                  Upload
                </button>{" "}
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
            <Form.Group className="mt-5 align-items  row  m-l-0 m-r-0"> </Form.Group>
            <Form.Group className="form-group mt-2 align-items-center row m-l-0 m-r-0 mt-0">
              <Col xs={2} className="p-0" />
              <Col xs={10}>
                {isCustomerUploadActive && (
                  <CustomDropzone
                    files={customerUploadFiles}
                    setFiles={(files) =>
                      dispatch(setApuFiles({ actionType: "customerUploadFiles", payload: files }))
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      customerUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                    height="180px"
                  />
                )}
                {/* Scan Component for scanning documents */}
                {isCustomerScanActive && (
                  <DWTComponent
                    files={customerScanFiles}
                    setFiles={(files) =>
                      dispatch(setApuFiles({ actionType: "customerScanFiles", payload: files }))
                    }
                    height="180px"
                  />
                )}

                {isCompanyUploadActive && (
                  <CustomDropzone
                    files={companyUploadFiles}
                    setFiles={(files) =>
                      dispatch(setApuFiles({ actionType: "companyUploadFiles", payload: files }))
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      companyUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                    height="180px"
                  />
                )}
                {isCompanyScanActive && (
                  <DWTComponent
                    files={companyScanFiles}
                    setFiles={(files) =>
                      dispatch(setApuFiles({ actionType: "companyScanFiles", payload: files }))
                    }
                    height="180px"
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

export default APUDocumentsContent;
