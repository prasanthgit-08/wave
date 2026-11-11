import { parseLocalDate } from "../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import QuarterScreenWrapper from "../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../common/Header";
import CommonFooter from "../../common/CommonFooter";
import DateInputField from "../../common/DateInputField";
import OrientationFormsService from "../../../services/OrientationFormsService";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import PreviewPopup from "../../common/PreviewPopup";
import LoadingIcon from "../../common/LoadingIcon";
const ComplianceOrientation = () => {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState(false);
  const [guts, setGuts] = useState(false);
  const [roadTests, setRoadTests] = useState(false);
  const [plateForm, setPlateForm] = useState(false);
  const [drugTestForm, setDrugTestForm] = useState(false);
  const [physical, setPhysical] = useState(false);
  const [debitCard, setDebitCard] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [arizonaPermit, setArizonaPermit] = useState(false);
  const [reinstatement, setReinstatement] = useState(false);
  const [missingItems, setMissingItems] = useState(false);
  const [safetyAlert, setSafetyAlert] = useState(false);
  const [orientationReceipt, setOrientationReceipt] = useState(false);
  const [orientationForms, setOrientationForms] = useState(false);
  const [annualReview, setAnnualReview] = useState(false);
  const [truckMaintenanceReport, setTruckMaintenanceReport] = useState(false);
  const [leagalizationSpreadsheet, setLeagalizationSpreadsheet] = useState(false);
  const [towawaySpreadsheet, setTowawaySpreadsheet] = useState(false);
  const [driveawaySpreadsheet, setDriveawaySpreadsheet] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fromDateValid, setFromDateValid] = useState(true);
  const [endDateValid, setEndDateValid] = useState(true);
  const toBool = (val) => (val ? 1 : 0);
  const [fileContent, setFileContent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const allFalse =
    !contracts &&
    !guts &&
    !roadTests &&
    !plateForm &&
    !drugTestForm &&
    !physical &&
    !debitCard &&
    !welcome &&
    !arizonaPermit &&
    !reinstatement &&
    !missingItems &&
    !safetyAlert &&
    !orientationReceipt &&
    !orientationForms &&
    !truckMaintenanceReport &&
    !annualReview;

  const allFalseSpreadSheet = !leagalizationSpreadsheet && !driveawaySpreadsheet && !towawaySpreadsheet;
  //Footer Buttons

  const buttons = [
    {
      label: "Email Driver",
      disabled:
        (allFalse && allFalseSpreadSheet) ||
        leagalizationSpreadsheet ||
        towawaySpreadsheet ||
        driveawaySpreadsheet ||
        !(endDate && endDateValid) ||
        !(fromDate && fromDateValid) ||
        loading,
      onClick: () => handleEmail("emailDriver"),
    },
    {
      label: "Email User",
      disabled:
        (allFalse && allFalseSpreadSheet) ||
        !(endDate && endDateValid) ||
        !(fromDate && fromDateValid) ||
        loading,
      onClick: () => handleEmail("emailUser"),
    },
    {
      label: "Print",
      disabled:
        (allFalse && allFalseSpreadSheet) ||
        !(endDate && endDateValid) ||
        !(fromDate && fromDateValid) ||
        leagalizationSpreadsheet ||
        towawaySpreadsheet ||
        driveawaySpreadsheet ||
        loading,
      onClick: () => handleEmail("print"),
    },
  ];

  const handleEmail = (type) => {
    const payload = {
      type,
      isPrint: type === "print" ? 1 : 0,
      isEmail: type !== "print" ? 1 : 0,
      driverFK: null,
      beginingDate: fromDate,
      endDate: endDate,
      reportForms: {
        contracts: toBool(contracts),
        guts: toBool(guts),
        roadTests: toBool(roadTests),
        plateForm: toBool(plateForm),
        drugTestForm: toBool(drugTestForm),
        physical: toBool(physical),
        debitCard: toBool(debitCard),
        welcome: toBool(welcome),
        arizonaPermit: toBool(arizonaPermit),
        reinstatement: toBool(reinstatement),
        missingItems: toBool(missingItems),
        safetyAlert: toBool(safetyAlert),
        orientationReceipt: toBool(orientationReceipt),
        orientationForms: toBool(orientationForms),
        truckMaintenanceReport: toBool(truckMaintenanceReport),
        annualReview: toBool(annualReview),
      },
      towawaySheetRequired: towawaySpreadsheet,
      driveawaySheetRequired: driveawaySpreadsheet,
      legalizationSheetRequired: leagalizationSpreadsheet,
    };

    emailOrientationForm(payload, type);
  };

  const emailOrientationForm = (payload, type) => {
    setLoading(true);
    OrientationFormsService.saveEmailOrientationForm(payload)
      .then((res) => {
        if (res?.data?.errorCode > 0) {
          toast.error("Invalid Data");
          return;
        }

        if (type === "print") {
          const attachments = res.data.attachments;

          if (attachments && typeof attachments === "object") {
            const firstFileKey = Object.keys(attachments)[0]; // e.g. "ifta.pdf"
            const fileBase64 = attachments[firstFileKey];

            if (fileBase64) {
              setFileContent(fileBase64);
              setShowPreview(true);
              toast.success("Form generated successfully");
            } else {
              toast.error("No file content found");
            }
          } else {
            toast.error("Invalid Data");
          }
        } else {
          toast.success("Email orientation form sent successfully");
        }
      })
      .catch((err) => {
        toast.error("Failed to send email orientation form");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const hidepopup = () => {
    setShowPreview(false);
  };

  return (
    <QuarterScreenWrapper>
      <Header programName="Orientation Forms" closeNavigationURL={`/`} />

      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          {loading && <LoadingIcon />}
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="mt-3 mx-3">
                {/* 1st Column */}
                <Form.Group className="mt-1 row align-items-center m-l-0 m-r-0">
                  {/* Label */}
                  <Col xs={2} className={`p-0 d-flex `}>
                    <Form.Label className="col-form-label dealer-label">Hire Date From</Form.Label>
                  </Col>

                  <Col xs={2} className="p-0 w-95px m-l-10">
                    <DateInputField
                      date={fromDate}
                      max={(endDate && parseLocalDate(endDate)) || new Date()}
                      reduxSetDate={setFromDate}
                      setIsDateValid={setFromDateValid}
                      className={fromDate && fromDateValid ? "borderGreen" : "borderRed"}
                    />
                  </Col>

                  {/* Slash */}
                  <Col xs="auto" className="p-0 d-flex justify-content-center" style={{ width: "23px" }}>
                    <span> To </span>
                  </Col>

                  <Col xs={2} className="p-0 w-95px">
                    <DateInputField
                      date={endDate}
                      min={fromDate && parseLocalDate(fromDate)}
                      max={new Date()}
                      reduxSetDate={setEndDate}
                      setIsDateValid={setEndDateValid}
                      className={endDate && endDateValid ? "borderGreen" : "borderRed"}
                    />
                  </Col>
                </Form.Group>

                <Col xs={4}>
                  <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Contracts</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        disabled={!allFalseSpreadSheet}
                        checked={contracts}
                        onChange={(e) => {
                          setContracts(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Guts</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={guts}
                        onChange={(e) => {
                          setGuts(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Road Tests</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={roadTests}
                        onChange={(e) => {
                          setRoadTests(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Plate Form</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={plateForm}
                        onChange={(e) => {
                          setPlateForm(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Drug Test Form</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={drugTestForm}
                        onChange={(e) => {
                          setDrugTestForm(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Physical</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={physical}
                        onChange={(e) => {
                          setPhysical(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Debit Card</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={debitCard}
                        onChange={(e) => {
                          setDebitCard(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        Truck Maintenance Report
                      </Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={truckMaintenanceReport}
                        onChange={(e) => {
                          setTruckMaintenanceReport(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                {/* 2nd Column */}
                <Col xs={4}>
                  <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} md={7} sm={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Arizona Permit</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        checked={arizonaPermit}
                        onChange={(e) => {
                          setArizonaPermit(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Welcome</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={welcome}
                        onChange={(e) => {
                          setWelcome(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} md={7} sm={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Reinstatement</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={reinstatement}
                        disabled={!allFalseSpreadSheet}
                        onChange={(e) => {
                          setReinstatement(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} md={7} sm={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Missing Items</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={missingItems}
                        onChange={(e) => {
                          setMissingItems(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} md={7} sm={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Safety Alert</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={safetyAlert}
                        onChange={(e) => {
                          setSafetyAlert(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} md={7} sm={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Orientation Receipt</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={orientationReceipt}
                        onChange={(e) => {
                          setOrientationReceipt(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} md={7} sm={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Orientation Forms</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={orientationForms}
                        onChange={(e) => {
                          setOrientationForms(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} md={7} sm={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Annual Review</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        disabled={!allFalseSpreadSheet}
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        checked={annualReview}
                        onChange={(e) => {
                          setAnnualReview(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                {/* 3rd Column */}
                <Col xs={4}>
                  <Form.Group className=" h-200px align-items-center row  m-l-0 m-r-0" />
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} md={7} sm={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        Leagalization Spreadsheet
                      </Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        type="checkbox"
                        disabled={!allFalse}
                        checked={leagalizationSpreadsheet}
                        onChange={(e) => {
                          setLeagalizationSpreadsheet(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} md={7} sm={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Towaway Spreadsheet</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        type="checkbox"
                        disabled={!allFalse}
                        checked={towawaySpreadsheet}
                        onChange={(e) => {
                          setTowawaySpreadsheet(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} md={7} sm={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Driveaway Spreadsheet</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        className={`form-check-input p-0 ${allFalse && allFalseSpreadSheet ? "borderRed" : ""}`}
                        type="checkbox"
                        disabled={!allFalse}
                        checked={driveawaySpreadsheet}
                        onChange={(e) => {
                          setDriveawaySpreadsheet(e.target.checked);
                        }}
                      />
                    </Col>
                    <PreviewPopup show={showPreview} base64PDF={fileContent} onHide={hidepopup} />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <CommonFooter buttons={buttons} />
    </QuarterScreenWrapper>
  );
};

export default ComplianceOrientation;
