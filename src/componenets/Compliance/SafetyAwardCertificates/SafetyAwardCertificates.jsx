import React, { useState } from "react";
import QuarterScreenWrapper from "../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../common/Header";
import { Col, Form, Row } from "react-bootstrap";
import CommonFooter from "../../common/CommonFooter";
import { useNavigate } from "react-router-dom";
import SafetyAwardsService from "../../../services/Compliance/SafetyAwardsService";
import toast from "react-hot-toast";
import PreviewPopup from "../../common/PreviewPopup";
import DeleteComponent from "../../common/DeleteComponent";

const SafetyAwardCertificates = () => {
  const navigate = useNavigate();
  const [printAward, setPrintAward] = useState("");
  const [showPreview, setshowPreview] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const DeletePrimaryOk = () => {
    setShow(false);
  };

  /******Process the Driver Safety Awards *****/
  const handleProcess = () => {
    setLoader(true);
    SafetyAwardsService.processSafetyAwards()
      .then((response) => {
        if (response.data === "No Records Found.") {
          handleShow();
          setLoader(false);
          return; // Stop execution here
        }
        setFileContent(response.data.fileContent);
        setshowPreview(true);
        toast.success("Safety Awards Certificate Process Completed");
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error processing Safety Awards Certificate:", error);
        navigate(`/`);
        toast.error("Failed to process Safety Awards Certificate");
        setLoader(false);
      });
  };

  const footerButtons = [
    {
      label: loader ? (
        <div className="loader-container">
          <div className="loader_YardCheckin"></div>
        </div>
      ) : (
        "Process"
      ),
      onClick: () => handleProcess(),
    },
  ];

  return (
    <QuarterScreenWrapper>
      <PreviewPopup show={showPreview} onHide={() => setshowPreview(false)} base64PDF={fileContent} />

      <Header
        confirmClose
        programName="Safety Awards Certificate"
        closeModalBody="Please confirm you want to close the program without Processing"
      />
      {loader && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      {/* Form Contents */}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-5">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Print Award Certificates</Form.Label>
                    </Col>

                    <Col xs={1} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="printAward"
                        name="printAward"
                        value={printAward}
                        checked={printAward}
                        onChange={(e) => setPrintAward(e.target.checked)}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <DeleteComponent
        show={show}
        onHide={DeletePrimaryOk}
        title={<span style={{ color: "red" }}>Warning: No Drivers Found</span>}
        body={<span style={{ color: "red" }}> No Drivers Found for Safety Awards</span>}
        handleOK={DeletePrimaryOk}
      />
      <CommonFooter buttons={footerButtons} />
    </QuarterScreenWrapper>
  );
};

export default SafetyAwardCertificates;
