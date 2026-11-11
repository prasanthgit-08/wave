import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import { Col, Form, Row } from "react-bootstrap";
import CustomDropzone from "../../../common/CustomDropzone";
import DWTComponent from "../../../../modules/dwt";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFields,
  setDocumentFiles,
  setDriverInvoiceFiles,
  setUploadActive,
} from "../../../../redux/DriverInvoiceSlice";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const DriverInvoiceScan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  window.addEventListener("popstate", () => {
    dispatch(resetFields());
    navigate(`/driver-invoice-browse`);
  });

  const [isUploadActive, setIsUploadActive] = useState(false);
  const [isScanActive, setIsScanActive] = useState(false);

  const driverInvoiceFiles = useSelector((state) => state.driverInvoiceReducer.driverInvoiceFiles);
  const { paperworkUploadFiles, paperworkScanFiles } = driverInvoiceFiles;
  const loadSave = useSelector((state) => state.driverInvoiceReducer.loadSave);

  useEffect(() => {
    dispatch(
      setDocumentFiles({
        paperworkUploadFiles,
        paperworkScanFiles,
      })
    );
  }, [paperworkUploadFiles, paperworkScanFiles]);
  useEffect(() => {
    if (isUploadActive || isScanActive) {
      dispatch(setUploadActive(true));
    } else {
      dispatch(setUploadActive(false));
    }
  }, [isUploadActive, isScanActive]);

  return (
    <QuarterScreenWrapper>
      <Header />
      <div className="p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          {loadSave && (
            <div className="fade modal-backdrop show">
              <div className="pos-center">
                <div className="loader"></div>
              </div>
            </div>
          )}
          <Row className="mx-0 p-0 mt-2">
            <Col xs={10}>
              <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 mb-2 mt-2`}>
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Paperwork</Form.Label>
                </Col>

                <Col xs={1} className="p-0 w-150px">
                  <button
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                      isUploadActive
                        ? "btn-warning"
                        : paperworkUploadFiles?.length
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => setIsUploadActive((state) => !state)}
                    disabled={isScanActive}
                  >
                    <i className="fa-solid fa-cloud-arrow-up me-1" />
                    Upload
                  </button>
                </Col>
                <Col xs={2} className="p-0">
                  <button
                    type="button"
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 btn-secondary ${
                      isScanActive
                        ? "btn-warning"
                        : paperworkScanFiles?.length
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    onClick={() => setIsScanActive((state) => !state)}
                    disabled={isUploadActive}
                  >
                    <i class="fa-solid fa-expand me-2" />
                    Scan
                  </button>
                </Col>
              </Form.Group>
              <Form.Group
                className="form-group align-items-center row m-l-0 m-r-0"
                style={{ marginTop: "100px" }}
              >
                <Col xs={2} className="p-0" />
                <Col xs={10}>
                  {isUploadActive && (
                    <CustomDropzone
                      files={paperworkUploadFiles}
                      setFiles={(files) =>
                        dispatch(
                          setDriverInvoiceFiles({ actionType: "paperworkUploadFiles", payload: files })
                        )
                      }
                      fileType={"PDF"}
                      customDropzoneMessage={
                        paperworkUploadFiles?.length === 0
                          ? `Please Scan / Drag-Drop / Attach atleast one document`
                          : `Drag 'n' Drop PDF files / Attach from your computer`
                      }
                    />
                  )}
                  {isScanActive && (
                    <DWTComponent
                      files={paperworkScanFiles}
                      setFiles={(files) =>
                        dispatch(setDriverInvoiceFiles({ actionType: "paperworkScanFiles", payload: files }))
                      }
                    />
                  )}
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </QuarterScreenWrapper>
  );
};

export default DriverInvoiceScan;
