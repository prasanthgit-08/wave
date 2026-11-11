import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../common/Header";
import { Col, Form, Row } from "react-bootstrap";
import CommonFooter from "../../common/CommonFooter";
import DateInputField from "../../common/DateInputField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SafetyCertificateService from "../../../services/Compliance/SafetyCertificateService";
import PreviewPopup from "../../common/PreviewPopup";
import toast from "react-hot-toast";
import DeleteComponent from "../../common/DeleteComponent";

const SafetySchoolCertificates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [showPreview, setshowPreview] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [safetyDate, setSafetyDate] = useState("");
  const [printSelection, setPrintSelection] = useState(false);
  const [emailSelection, setEmailSelection] = useState(false);
  const [safetyStatus, setSafetyStatus] = useState("");
  const [safetyDatesList, setSafetyDatesList] = useState([]);
  const [isSafetyDateValid, setIsSafetyDateValid] = useState(false);
  const [isSafetyDateFormat, setIsSafetyDateFormat] = useState(true);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  /****Alert Popup***/
  const DeletePrimaryOk = () => {
    setShow(false);
  };

  /****
   * Process the safety certificates
   *****/
  const handleProcess = () => {
    if (!isSafetyDateValid) {
      handleShow();
      setLoader(false);
      return; // Stop execution if the date is invalid
    }
    setLoader(true);
    SafetyCertificateService.processSafety(safetyDate, printSelection, emailSelection, safetyStatus)
      .then((response) => {
        setFileContent(response.data.fileContent);
        if (printSelection) {
          setshowPreview(true);
        }
        toast.success("Safety Certificates Process Completed");
        setEmailSelection(false);
        setPrintSelection(false);
        setSafetyDate("");
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error processing Safety Certificates:", error);
        navigate(`/`);
        toast.error("Failed to process Safety Certificates");
        setLoader(false);
      });
  };
  /*****
   * Get the valid list of Last Safty Date
   * ****/
  const handleSimulatorDateCheck = () => {
    SafetyCertificateService.processSafetyDate(safetyDate, printSelection, emailSelection, "Date")
      .then((response) => {
        const extractedDates = response.data?.response?.SafetyCertificate?.map((item) => item.LastSafety);
        setSafetyDatesList(extractedDates);
      })
      .catch((error) => {
        console.error("Error fetching Safety dates:", error);
      });
  };

  /******Used to set the flag whether the selected
   * safety date matches any one in the list of valid dates
   *****/
  useEffect(() => {
    if (safetyDate && safetyDatesList?.length > 0) {
      setIsSafetyDateValid(safetyDatesList.includes(safetyDate));
    }
  }, [safetyDate, safetyDatesList]);

  /******
   * Used to get the list of valid safety Dates
   * *****/
  useEffect(() => {
    if (!safetyDate && !emailSelection && !printSelection) {
      handleSimulatorDateCheck();
    }
  }, []);

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
      disabled: !safetyDate || (!printSelection && !emailSelection) || !isSafetyDateFormat,
    },
  ];

  return (
    <QuarterScreenWrapper>
      <Header
        confirmClose
        programName="Safety Certificate"
        closeModalBody="Please confirm you want to close the program without Processing"
      />
      <PreviewPopup show={showPreview} onHide={() => setshowPreview(false)} base64PDF={fileContent} />
      {loader && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}{" "}
      {/* Form Contents */}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-5">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Safety School Date</Form.Label>
                    </Col>
                    <Col xs="auto" className="p-0">
                      <DateInputField
                        date={safetyDate}
                        name="safetyDate"
                        setIsDateValid={setIsSafetyDateFormat}
                        style={{ width: "70px" }} // Set width directly here
                        className={`customFormControl ${
                          safetyDate && isSafetyDateFormat ? "borderGreen" : "borderRed"
                        }`}
                        setDate={setSafetyDate}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Email Safety School Certificates</Form.Label>
                    </Col>

                    <Col xs={1} className="p-0">
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${!printSelection && !emailSelection ? "borderRed" : ""}`}
                        name="emailSelection"
                        value={emailSelection}
                        checked={emailSelection}
                        onChange={(e) => setEmailSelection(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Print Safety School Roster</Form.Label>
                    </Col>

                    <Col xs={1} className="p-0">
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${!printSelection && !emailSelection ? "borderRed" : ""}`}
                        name="printSelection"
                        value={printSelection}
                        checked={printSelection}
                        onChange={(e) => setPrintSelection(e.target.checked)}
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
        title={<span style={{ color: "red" }}>Warning: No Records Found</span>}
        body={<span style={{ color: "red" }}>No records are available for this date.</span>}
        handleOK={DeletePrimaryOk}
      />
      <CommonFooter buttons={footerButtons} />
    </QuarterScreenWrapper>
  );
};

export default SafetySchoolCertificates;
