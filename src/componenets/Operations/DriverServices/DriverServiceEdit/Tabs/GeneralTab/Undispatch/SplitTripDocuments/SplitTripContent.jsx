import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import CustomDropzone from "../../../../../../../common/CustomDropzone";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setInactiveDropzone,
  setSplitTripFiles,
  setSplitTripSave,
  setIsButtonsLoopingCompleted,
} from "../../../../../../../../redux/UndispatchSlice";
import UndispatchService from "../../../../../../../../services/UndispatchService";
import { useNavigate, useParams } from "react-router-dom";
import DWTComponent from "../../../../../../../../modules/dwt";
const SplitTripContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { delayedunitPK, driverId, dispatchId, companyName, unitfk } = useParams();
  const [buttonsFlagResponse, setButtonsFlagResponse] = useState(null);

  const [activeButton, setActiveButton] = useState("");
  const [isCustomerUploadActive, setIsCustomerUploadActive] = useState(false);
  const [isCompanyUploadActive, setIsCompanyUploadActive] = useState(false);
  const [isBolUploadActive, setIsBolUploadActive] = useState(false);
  const [isDafUploadActive, setIsDafUploadActive] = useState(false);
  const [isIftaUploadActive, setIsIftaUploadActive] = useState(false);

  const [isCustomerScanActive, setIsCustomerScanActive] = useState(false);
  const [isCompanyScanActive, setIsCompanyScanActive] = useState(false);
  const [isBolScanActive, setIsBolScanActive] = useState(false);
  const [isDafScanActive, setIsDafScanActive] = useState(false);
  const [isIftaScanActive, setIsIftaScanActive] = useState(false);

  const splitTripFiles = useSelector((state) => state.undispatchReducer.splitTripFiles);
  const isButtonsLoopingCompleted = useSelector((state) => state.undispatchReducer.isButtonsLoopingCompleted);

  const {
    customerUploadFiles,
    companyUploadFiles,
    bolUploadFiles,
    dafUploadFiles,
    iftaUploadFiles,
    customerScanFiles,
    companyScanFiles,
    bolScanFiles,
    dafScanFiles,
    iftaScanFiles,
  } = splitTripFiles;

  const [saveFlag, setSaveFlag] = useState(false);

  const isDelayedUnit = useSelector((state) => state.undispatchReducer.isDelayedUnit);
  const inactiveDropzone = useSelector((state) => state.undispatchReducer.inactiveDropzone);
  const selectedUnitsListIndex = useSelector((state) => state.undispatchReducer.selectedUnitsListIndex);
  const undispatchFlag = useSelector((state) => state.undispatchReducer.undispatchFlag);
  const driverReleased = localStorage.getItem("driverRelease") === "true";

  useSelector((state) => state.undispatchReducer.iftaFiles);

  useEffect(() => {
    if (!undispatchFlag) {
      const isDelayed =
        window.location.pathname ===
        `/releasedriver-splittrip-document-screen/${driverId}/${delayedunitPK}/${dispatchId}/${companyName}`;
      if (!isDelayed) {
        if (driverReleased) {
          navigate(
            `/delay-processing/delayed-details/${companyName}/${Number(unitfk)}/${Number(driverId)}/${Number(delayedunitPK)}`,
            { replace: true }
          );
        } else {
          navigate("/undispatch/" + driverId);
        }
      } else {
        navigate(
          "/delay-processing/delayed-details/" +
            companyName +
            "/" +
            Number(unitfk) +
            "/" +
            Number(driverId) +
            "/" +
            Number(delayedunitPK)
        );
      }
    }
  }, [undispatchFlag]);

  // Scan Paperwork Next_Unit/Save Validation

  useEffect(() => {
    if (
      isCustomerUploadActive ||
      isCompanyUploadActive ||
      isBolUploadActive ||
      isDafUploadActive ||
      isIftaUploadActive ||
      isCustomerScanActive ||
      isCompanyScanActive ||
      isBolScanActive ||
      isDafScanActive ||
      isIftaScanActive
    ) {
      dispatch(setSplitTripSave(true));
    } else {
      dispatch(setSplitTripSave(false));
    }
  }, [
    isCustomerUploadActive,
    isCompanyUploadActive,
    isBolUploadActive,
    isDafUploadActive,
    isIftaUploadActive,
    isCustomerScanActive,
    isCompanyScanActive,
    isBolScanActive,
    isDafScanActive,
    isIftaScanActive,
  ]);

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
                  disabled={
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive
                  }
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
                >
                  Upload
                </button>{" "}
              </Col>
              <Col xs={2} className="p-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomerScanActive((state) => !state);
                  }}
                  disabled={
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive
                  }
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isCustomerScanActive
                      ? "btn-warning"
                      : customerScanFiles?.length > 0
                        ? "btn-success"
                        : "btn-secondary"
                  }`}
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
                  type="button"
                  onClick={() => {
                    setIsCompanyUploadActive((state) => !state);
                  }}

                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isCompanyUploadActive
                      ? "btn-warning"
                      : companyUploadFiles?.length > 0
                        ? "btn-success"
                        : "btn-secondary"
                  }`}
                  disabled={
                    isCustomerUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive
                  }
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
                  disabled={
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isCustomerScanActive ||
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
            <Form.Group className="mt-1  align-items  row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <label className="col-form-label dealer-label p-0 m-b-20">BOL</label>
              </Col>
              <Col xs={1} className="p-0 w-150px">
                <button
                  type="button"
                  onClick={() => {
                    setIsBolUploadActive((state) => !state);
                  }}
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isBolUploadActive
                      ? "btn-warning"
                      : bolUploadFiles?.length > 0
                        ? "btn-success"
                        : "btn-secondary"
                  }`}

                  disabled={
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive
                  }
                >
                  Upload
                </button>{" "}
              </Col>
              <Col xs={2} className="p-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsBolScanActive((state) => !state);
                  }}

                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isBolScanActive
                      ? "btn-warning"
                      : bolScanFiles?.length > 0
                        ? "btn-success"
                        : "btn-secondary"
                  }`}
                  disabled={
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isDafScanActive ||
                    isIftaScanActive
                  }
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>{" "}
            <Form.Group className="mt-1  align-items  row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <label className="col-form-label dealer-label p-0 m-b-20">DAF</label>
              </Col>
              <Col xs={1} className="p-0 w-150px">
                <button
                  type="button"
                  onClick={() => {
                    setIsDafUploadActive((state) => !state);
                  }}

                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isDafUploadActive
                      ? "btn-warning"
                      : dafUploadFiles?.length > 0
                        ? "btn-success"
                        : "btn-secondary"
                  }`}

                  disabled={
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isIftaUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive
                  }
                >
                  Upload
                </button>{" "}
              </Col>

              <Col xs={2} className="p-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsDafScanActive((state) => !state);
                  }}

                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isDafScanActive
                      ? "btn-warning"
                      : dafScanFiles?.length > 0
                        ? "btn-success"
                        : "btn-secondary"
                  }`}

                  disabled={
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isIftaScanActive
                  }
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>{" "}
            <Form.Group className="mt-1  align-items  row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <label className="col-form-label dealer-label p-0 m-b-20">IFTA</label>
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
                  onClick={() => {
                    setIsIftaUploadActive((state) => !state);
                  }}
                  disabled={
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive
                  }
                >
                  Upload
                </button>{" "}
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
                  onClick={() => {
                    setIsIftaScanActive((state) => !state);
                  }}
                  disabled={
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive
                  }
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>
            <Form.Group className="form-group mt-2 align-items-center row m-l-0 m-r-0 mt-0">
              <Col xs={2} className="p-0" />
              <Col xs={10}>
                {/* Drag & Drop Component for Upload */}
                {isCustomerUploadActive && (
                  <CustomDropzone
                    files={customerUploadFiles}
                    setFiles={(files) =>
                      dispatch(setSplitTripFiles({ actionType: "customerUploadFiles", payload: files }))
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
                      dispatch(setSplitTripFiles({ actionType: "customerScanFiles", payload: files }))
                    }
                    height="180px"
                  />
                )}

                {isCompanyUploadActive && (
                  <CustomDropzone
                    files={companyUploadFiles}
                    setFiles={(files) =>
                      dispatch(setSplitTripFiles({ actionType: "companyUploadFiles", payload: files }))
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
                      dispatch(setSplitTripFiles({ actionType: "companyScanFiles", payload: files }))
                    }
                    height="180px"
                  />
                )}

                {isBolUploadActive && (
                  <CustomDropzone
                    files={bolUploadFiles}
                    setFiles={(files) =>
                      dispatch(setSplitTripFiles({ actionType: "bolUploadFiles", payload: files }))
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      bolUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                    height="180px"
                  />
                )}
                {isBolScanActive && (
                  <DWTComponent
                    files={bolScanFiles}
                    setFiles={(files) =>
                      dispatch(setSplitTripFiles({ actionType: "bolScanFiles", payload: files }))
                    }
                    height="180px"
                  />
                )}

                {isDafUploadActive && (
                  <CustomDropzone
                    files={dafUploadFiles}
                    setFiles={(files) =>
                      dispatch(setSplitTripFiles({ actionType: "dafUploadFiles", payload: files }))
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      dafUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                    height="180px"
                  />
                )}
                {isDafScanActive && (
                  <DWTComponent
                    files={dafScanFiles}
                    setFiles={(files) =>
                      dispatch(setSplitTripFiles({ actionType: "dafScanFiles", payload: files }))
                    }
                    height="180px"
                  />
                )}

                {isIftaUploadActive && (
                  <CustomDropzone
                    files={iftaUploadFiles}
                    setFiles={(files) =>
                      dispatch(setSplitTripFiles({ actionType: "iftaUploadFiles", payload: files }))
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      iftaUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                    height="180px"
                  />
                )}
                {isIftaScanActive && (
                  <DWTComponent
                    files={iftaScanFiles}
                    setFiles={(files) =>
                      dispatch(setSplitTripFiles({ actionType: "iftaScanFiles", payload: files }))
                    }
                    height="180px"
                  />
                )}
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
      {saveFlag && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitTripContent;
