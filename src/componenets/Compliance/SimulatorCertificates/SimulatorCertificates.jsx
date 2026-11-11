import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../common/Header";
import { Col, Form, Row } from "react-bootstrap";
import CommonFooter from "../../common/CommonFooter";
import DateInputField from "../../common/DateInputField";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SimulatorCertificateService from "../../../services/Compliance/SimulatorCertificateService";
import { setSimulatorCertificateData } from "../../../redux/Compliance/SimulatorCertificateSlice";
import PreviewPopup from "../../common/PreviewPopup";
import DeleteComponent from "../../common/DeleteComponent";

const SimulatorCertificates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [showPreview, setshowPreview] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [simulatorDate, setSimulatorDate] = useState("");
  const [printSelection, setPrintSelection] = useState(false);
  const [emailSelection, setEmailSelection] = useState(false);
  const [simulatorStatus, setSimulatorStatus] = useState("");
  const [simulatorDatesList, setSimulatorDatesist] = useState([]);
  const [isSimulatorDateValid, setIsSimulatorDateValid] = useState(false);
  const [isSimulatorDateFormat, setIsSimulatorDateFormat] = useState(true);
  const simulatorCertificateData = useSelector(
    (state) => state.simulatorCertificateReducer.simulatorCertificateData
  );
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  /****Alert Popup***/
  const DeletePrimaryOk = () => {
    setShow(false);
  };

  /******
   * Process the Simulator certificate by Print or Email
   ******/
  const handleProcessWithValidation = () => {
    if (!isSimulatorDateValid) {
      handleShow();
      setLoader(false);
      return; // Stop execution if the date is invalid
    }
    setLoader(true);
    SimulatorCertificateService.processSimulator(
      simulatorDate,
      printSelection,
      emailSelection,
      simulatorStatus
    )
      .then((response) => {
        setFileContent(response.data.fileContent);
        if (printSelection) {
          setshowPreview(true);
        }
        toast.success("Simulator Certificates Process Completed");
        setPrintSelection(false);
        setEmailSelection(false);
        setSimulatorDate("");
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error processing Simulator Certificates:", error);
        navigate(`/`);
        toast.error("Failed to process Simulator Certificates");
        setLoader(false);
      });
  };

  /******Get the valid simulator Date */
  const handleSimulatorDateCheck = () => {
    SimulatorCertificateService.processSimulatorDate(simulatorDate, printSelection, emailSelection, "Date")
      .then((response) => {
        const extractedDates = response.data?.response?.SimulatorCertificate?.map(
          (item) => item.LastSimulator
        );
        setSimulatorDatesist(extractedDates);
      })
      .catch((error) => {
        console.error("Error fetching simulator dates:", error);
      });
  };
  /*****
   * Check whether the simulator date is a valid date from the Drivers tabel
   ******/
  useEffect(() => {
    if (simulatorDate && simulatorDatesList?.length > 0) {
      setIsSimulatorDateValid(simulatorDatesList.includes(simulatorDate));
    }
  }, [simulatorDate, simulatorDatesList]);

  useEffect(() => {
    if (!simulatorDate && !emailSelection && !printSelection) {
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
      onClick: () => handleProcessWithValidation(),
      disabled: !simulatorDate || (!printSelection && !emailSelection) || !isSimulatorDateFormat,
    },
  ];

  return (
    <QuarterScreenWrapper>
      <PreviewPopup show={showPreview} onHide={() => setshowPreview(false)} base64PDF={fileContent} />
      <Header
        confirmClose
        programName="Simulator Certificate"
        closeModalBody="Please confirm you want to close the program without Processing"
      />
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
                      <Form.Label className="customColFormLabel">Simulator Date</Form.Label>
                    </Col>

                    <Col xs="auto" className="p-0">
                      <DateInputField
                        date={simulatorDate}
                        name="simulatorDate"
                        setIsDateValid={setIsSimulatorDateFormat}
                        style={{ width: "70px" }} // Set width directly here
                        className={`customFormControl ${
                          simulatorDate && isSimulatorDateFormat ? "borderGreen" : "borderRed"
                        }`}
                        setDate={setSimulatorDate}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Email Simulator Certificates</Form.Label>
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
                      <Form.Label className="customColFormLabel">Print Simulator Roster</Form.Label>
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

export default SimulatorCertificates;
