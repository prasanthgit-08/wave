import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomDropzone from "../../../../common/CustomDropzone";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setBolFiles,
  setBolScanFiles,
  setCompanyPaperworkFiles,
  setCompanyPaperworkScanFiles,
  setCustomerPaperworkFiles,
  setCustomerPaperworkScanFiles,
  setDafFiles,
  setDafScanFiles,
  setDelayReturnSave,
  setIftaFiles,
  setIftaScanFiles,
  setInactiveDropzone,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import CustomDropzoneDisabled from "../../../../common/CustomDropzoneDisabled";
import PaperworkProcessingService from "../../../../../services/Invoicing/PaperworkProcessingService";
import UndispatchService from "../../../../../services/UndispatchService";
import DWTComponent from "../../../../../modules/dwt";
const DelayDocumentContent = () => {
  const dispatch = useDispatch();
  const [buttonsFlagResponse, setButtonsFlagResponse] = useState(null);
  const [isCustomerPaperworkActive, setIsCustomerPaperworkActive] = useState(false);
  const [isCompanyPaperworkActive, setIsCompanyPaperworkActive] = useState(false);
  const [isBolActive, setIsBolActive] = useState(false);
  const [isDafActive, setIsDafActive] = useState(false);
  const [isIftaActive, setIsIftaActive] = useState(false);

  const [isCustomerScanActive, setIsCustomerScanActive] = useState(false);
  const [isCompanyScanActive, setIsCompanyScanActive] = useState(false);
  const [isBolScanActive, setIsBolScanActive] = useState(false);
  const [isDafScanActive, setIsDafScanActive] = useState(false);
  const [isIftaScanActive, setIsIftaScanActive] = useState(false);

  const data = useSelector((state) => state.delayProcessing.data);
  const inactiveDropzone = useSelector((state) => state.delayProcessing.inactiveDropzone);
  const customerPaperworkFiles = useSelector((state) => state.delayProcessing.customerPaperworkFiles);
  const companyPaperworkFiles = useSelector((state) => state.delayProcessing.companyPaperworkFiles);
  const bolFiles = useSelector((state) => state.delayProcessing.bolFiles);
  const dafFiles = useSelector((state) => state.delayProcessing.dafFiles);
  const iftaFiles = useSelector((state) => state.delayProcessing.iftaFiles);

  const customerPaperworkScanFiles = useSelector((state) => state.delayProcessing.customerPaperworkScanFiles);
  const companyPaperworkScanFiles = useSelector((state) => state.delayProcessing.companyPaperworkScanFiles);
  const bolScanFiles = useSelector((state) => state.delayProcessing.bolScanFiles);
  const dafScanFiles = useSelector((state) => state.delayProcessing.dafScanFiles);
  const iftaScanFiles = useSelector((state) => state.delayProcessing.iftaScanFiles);

  // For rendering a disabled dropzone when Upload/Scan is inactive
  useEffect(() => {
    if (isCustomerPaperworkActive || isCompanyPaperworkActive || isBolActive || isDafActive || isIftaActive) {
      dispatch(setInactiveDropzone(false));
    } else {
      dispatch(setInactiveDropzone(true));
    }
    if (
      isBolScanActive ||
      isDafScanActive ||
      isIftaScanActive ||
      isCompanyScanActive ||
      isCustomerScanActive ||
      isCustomerPaperworkActive ||
      isCompanyPaperworkActive ||
      isBolActive ||
      isDafActive ||
      isIftaActive
    ) {
      dispatch(setDelayReturnSave(true));
    } else {
      dispatch(setDelayReturnSave(false));
    }
  }, [
    isCustomerPaperworkActive,
    isCompanyPaperworkActive,
    isBolActive,
    isDafActive,
    isIftaActive,
    isBolScanActive,
    isDafScanActive,
    isIftaScanActive,
    isCompanyScanActive,
    isCustomerScanActive,
  ]);

  useEffect(() => {
    const getButtonFlags = () => {
      UndispatchService.getButtonFlags(data?.DispatchPK)
        .then((response) => {
          const { data } = response;

          setButtonsFlagResponse(data);
        })
        .catch(() => {});
    };

    if (data?.DispatchPK) {
      getButtonFlags(data?.DispatchPK); // Pass unitpk to the function
    }
  }, []);

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col xs={12}>
            <Form.Group className="mt-0  align-items  row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <label className="col-form-label dealer-label p-0 m-b-20">Customer Paperwork</label>
              </Col>
              <Col sm={3} md={3} xs={3} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isCustomerPaperworkActive
                      ? "btn-warning"
                      : customerPaperworkFiles?.length > 0
                        ? "btn-success"
                        : "btn-primary"
                  }`}
                  type="button"
                  onClick={() => {
                    setIsCustomerPaperworkActive((state) => !state);
                  }}
                  disabled={
                    isCompanyPaperworkActive ||
                    isBolActive ||
                    isDafActive ||
                    isIftaActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isCustomerScanActive
                  }
                >
                  Upload
                </button>{" "}
              </Col>
              <Col xs={2} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isCustomerScanActive
                      ? "btn-warning"
                      : customerPaperworkScanFiles?.length > 0
                        ? "btn-success"
                        : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => setIsCustomerScanActive((state) => !state)}
                  disabled={
                    isCustomerPaperworkActive ||
                    isCompanyPaperworkActive ||
                    isBolActive ||
                    isDafActive ||
                    isIftaActive ||
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
            <Form.Group className="mt-1  align-items  row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <label className="col-form-label dealer-label p-0 m-b-20">Company Paperwork</label>
              </Col>
              <Col sm={3} md={3} xs={3} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isCompanyPaperworkActive
                      ? "btn-warning"
                      : companyPaperworkFiles?.length > 0
                        ? "btn-success"
                        : "btn-primary"
                  }`}
                  type="button"
                  onClick={() => {
                    setIsCompanyPaperworkActive((state) => !state);
                  }}
                  disabled={
                    isCustomerPaperworkActive ||
                    isBolActive ||
                    isDafActive ||
                    isIftaActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isCustomerScanActive
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
                      : companyPaperworkScanFiles?.length > 0
                        ? "btn-success"
                        : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => setIsCompanyScanActive((state) => !state)}
                  disabled={
                    isCustomerPaperworkActive ||
                    isCompanyPaperworkActive ||
                    isBolActive ||
                    isDafActive ||
                    isIftaActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isCustomerScanActive
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
              <Col sm={3} md={3} xs={3} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isBolActive ? "btn-warning" : bolFiles?.length > 0 ? "btn-success" : "btn-primary"
                  }`}
                  type="button"
                  onClick={() => {
                    setIsBolActive((state) => !state);
                  }}
                  disabled={
                    isCustomerPaperworkActive ||
                    isCompanyPaperworkActive ||
                    isDafActive ||
                    isIftaActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isCustomerScanActive
                  }
                >
                  Upload
                </button>{" "}
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
                    isCustomerPaperworkActive ||
                    isCompanyPaperworkActive ||
                    isBolActive ||
                    isDafActive ||
                    isIftaActive ||
                    isCompanyScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isCustomerScanActive
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
              <Col sm={3} md={3} xs={3} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isDafActive ? "btn-warning" : dafFiles?.length > 0 ? "btn-success" : "btn-primary"
                  }`}
                  type="button"
                  onClick={() => {
                    setIsDafActive((state) => !state);
                  }}
                  disabled={
                    isCustomerPaperworkActive ||
                    isCompanyPaperworkActive ||
                    isBolActive ||
                    isIftaActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isCustomerScanActive
                  }
                >
                  Upload
                </button>{" "}
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
                    isCustomerPaperworkActive ||
                    isCompanyPaperworkActive ||
                    isBolActive ||
                    isDafActive ||
                    isIftaActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isIftaScanActive ||
                    isCustomerScanActive
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
              <Col sm={3} md={3} xs={3} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isIftaActive ? "btn-warning" : iftaFiles?.length > 0 ? "btn-success" : "btn-primary"
                  }`}
                  type="button"
                  onClick={() => {
                    setIsIftaActive((state) => !state);
                  }}
                  disabled={
                    isCustomerPaperworkActive ||
                    isCompanyPaperworkActive ||
                    isBolActive ||
                    isDafActive ||
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
                  onClick={() => setIsIftaScanActive((state) => !state)}
                  disabled={
                    isCustomerPaperworkActive ||
                    isCompanyPaperworkActive ||
                    isBolActive ||
                    isDafActive ||
                    isIftaActive ||
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
                {inactiveDropzone && <CustomDropzoneDisabled height="180px" />}

                {!inactiveDropzone && isCustomerPaperworkActive && (
                  <CustomDropzone
                    files={customerPaperworkFiles}
                    setFiles={(files) => dispatch(setCustomerPaperworkFiles(files))}
                    fileType={"PDF"}
                    customDropzoneMessage={
                      customerPaperworkFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                    height="180px"
                  />
                )}
                {/* Scan Component for scanning documents */}
                {isCustomerScanActive && (
                  <DWTComponent
                    files={customerPaperworkScanFiles}
                    setFiles={(files) => dispatch(setCustomerPaperworkScanFiles(files))}
                  />
                )}

                {!inactiveDropzone && isCompanyPaperworkActive && (
                  <CustomDropzone
                    files={companyPaperworkFiles}
                    setFiles={(files) => dispatch(setCompanyPaperworkFiles(files))}
                    fileType={"PDF"}
                    customDropzoneMessage={
                      companyPaperworkFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                    height="180px"
                  />
                )}

                {isCompanyScanActive && (
                  <DWTComponent
                    files={companyPaperworkScanFiles}
                    setFiles={(files) => dispatch(setCompanyPaperworkScanFiles(files))}
                  />
                )}

                {!inactiveDropzone && isBolActive && (
                  <CustomDropzone
                    files={bolFiles}
                    setFiles={(files) => dispatch(setBolFiles(files))}
                    fileType={"PDF"}
                    customDropzoneMessage={
                      bolFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                    height="180px"
                  />
                )}

                {isCustomerScanActive && (
                  <DWTComponent files={bolScanFiles} setFiles={(files) => dispatch(setBolScanFiles(files))} />
                )}

                {!inactiveDropzone && isDafActive && (
                  <CustomDropzone
                    files={dafFiles}
                    setFiles={(files) => dispatch(setDafFiles(files))}
                    fileType={"PDF"}
                    customDropzoneMessage={
                      dafFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                    height="180px"
                  />
                )}

                {isDafScanActive && (
                  <DWTComponent files={dafScanFiles} setFiles={(files) => dispatch(setDafScanFiles(files))} />
                )}

                {!inactiveDropzone && isIftaActive && (
                  <CustomDropzone
                    files={iftaFiles}
                    setFiles={(files) => dispatch(setIftaFiles(files))}
                    fileType={"PDF"}
                    customDropzoneMessage={
                      iftaFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                    height="180px"
                  />
                )}

                {isIftaScanActive && (
                  <DWTComponent
                    files={iftaScanFiles}
                    setFiles={(files) => dispatch(setIftaScanFiles(files))}
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

export default DelayDocumentContent;
