import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import DriverService from "../../../../services/DriverService";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import DateInputField from "../../../common/DateInputField";
import DriverLookup from "../../../LookupScreens/Driver/DriverLookup";
import ReportComponent from "../../../common/ReportComponent";
import { parseLocalDate, formatDatetimeToDate } from "../../../../utils/dateUtils";

const RandomTestingSummaryReport = () => {
  const [isTabValid, setIsTabValid] = useState(true);
  const [driverInput, setDriverInput] = useState("");
  const [driverName, setDriverName] = useState("");
  const [testingType, setTestingType] = useState("Both");
  const [testingStatus, setTestingStatus] = useState("All");
  const [driversToInclude, setDriversToInclude] = useState("Both");
  const [endDate, setEndDate] = useState(formatDatetimeToDate(new Date()));
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [driverFK, setDriverFK] = useState(null);
  const [driverDropDownData, setDriverDropDownData] = useState([]);
  const [driverLoader, setDriverLoader] = useState(false);
  const [showDriverLookup, setShowDriverLookup] = useState(false);
  const RANDOM_TESTING_REPORT_ID = process.env.REACT_APP_SP_RANDOM_TESTING_REPORT;

  //this function is to calculate the first day of current year
  const getFirstDayOfCurrentYear = () => {
    const today = new Date();
    return `${today.getFullYear()}-01-01`;
  };
  const [beginningDate, setBeginningDate] = useState(getFirstDayOfCurrentYear());

  const returnFormData = {
    TestingStatus: testingStatus,
    TestingType: testingType,
    DriverPK: driverFK,
    BeginingDate: formatDatetimeToDate(beginningDate),
    EndDate: formatDatetimeToDate(endDate),
    DriversToInclude: driversToInclude,
  };

  const isDateFieldDisabled = () => {
    return testingStatus === "UnNotified" || testingStatus === "Notified";
  };

  const handleDriverSelection = (data) => {
    const fullName = (data.firstName?.trim() ?? "") + (data.lastName ? " " + data.lastName?.trim() : "");
    setDriverInput(fullName);
    setDriverFK(data.driverPK);
    setDriverName(fullName);
  };

  const driverLookupSelection = (data) => {
    const fullName = (data.firstName?.trim() ?? "") + (data.lastName ? " " + data.lastName?.trim() : "");
    setDriverInput(fullName);
    setDriverFK(data.driverPK);
    setShowDriverLookup(false);
  };

  const resetAllVariables = () => {
    setTestingType("Both");
    setTestingStatus("All");
    setDriversToInclude("Both");
    setDriverFK(null);
    setDriverInput("");
    setBeginningDate(getFirstDayOfCurrentYear());
    setEndDate(formatDatetimeToDate(new Date()));
  };

  const fetchDrivers = (string) => {
    setDriverLoader(true);
    DriverService.getDriverForAuto(string)
      .then((response) => {
        const data = response.data.content;
        const driverList = data?.map((item) => ({
          ...item,
          name: item.name?.trim(),
          firstName: item.firstName,
          lastName: item.lastName,
        }));

        setDriverDropDownData(driverList);
      })
      .catch((err) => {})
      .finally(() => {
        setDriverLoader(false);
      });
  };

  //tab validation
  useEffect(() => {
    if (isBeginningDateValid && isEndDateValid && (!driverInput || driverFK)) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [isBeginningDateValid, isEndDateValid, driverFK, driverInput]);

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">Testing Status</Form.Label>
                    </Col>

                    <Col xs={8} className="p-0">
                      <CustomRadioGroup
                        name="divisionValue"
                        horizontal
                        horizontalAlignmentClassName="pe-4"
                        defaultWidth={"85px"}
                        options={[
                          { value: "All", label: "All" },
                          { value: "UnNotified", label: "UnNotified" },
                          { value: "Notified", label: "Notified" },
                          { value: "Tested", label: "Tested" },
                        ]}
                        selectedOption={testingStatus}
                        onChange={(value) => {
                          setTestingStatus(value);
                          // If "UnNotified" or "Notified" is selected, set dates to null
                          if (value === "UnNotified" || value === "Notified") {
                            setBeginningDate(null);
                            setEndDate(null);
                          } else {
                            // For "All" or "Tested", set to default dates
                            setBeginningDate(getFirstDayOfCurrentYear());
                            setEndDate(new Date());
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">Testing Type</Form.Label>
                    </Col>

                    <Col xs={8} className="p-0">
                      <CustomRadioGroup
                        name="driverStatus"
                        horizontal
                        horizontalAlignmentClassName="pe-4"
                        defaultWidth={"85px"}
                        options={["Both", "Drug", "Alcohol"]}
                        selectedOption={testingType}
                        onChange={(value) => setTestingType(value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">Drivers To Include</Form.Label>
                    </Col>

                    <Col xs={8} className="p-0">
                      <CustomRadioGroup
                        name="driversToInclude"
                        horizontal
                        horizontalAlignmentClassName="pe-4"
                        defaultWidth={"85px"}
                        options={[
                          { value: "Both", label: "Both" },
                          { value: "CDL", label: "CDL" },
                          { value: "NonCDL", label: "Non-CDL" },
                        ]}
                        selectedOption={driversToInclude}
                        onChange={(value) => {
                          setDriversToInclude(value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  {/* Dispatcher */}
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">Driver</Form.Label>
                    </Col>
                    <Col xs={5} className="p-0 d-flex">
                      <AutoCompleteDropdown
                        className={driverFK ? "borderGreen" : driverInput ? "borderRed" : ""}
                        arrayList={driverDropDownData}
                        searchString={driverInput}
                        renderItemId={(data) => data.driverPK}
                        renderItemField={(data) => `${data.firstName ?? ""} ${data.lastName ?? ""}`?.trim()}
                        handleSearchString={(string) => setDriverInput(string)}
                        fetchDataBySearchString={fetchDrivers}
                        onSelect={driverLookupSelection}
                        selectedId={driverFK}
                        clearInputCallback={() => setDriverFK(null)}
                        loading={driverLoader}
                      />
                      <LookupButton onClick={() => setShowDriverLookup(true)} />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">Beginning Date</Form.Label>
                    </Col>
                    <Col xs={2} className="p-0" style={{ width: "110px" }}>
                      <DateInputField
                        date={beginningDate}
                        max={endDate && parseLocalDate(endDate)}
                        name="beginningDate"
                        setIsDateValid={setIsBeginningDateValid}
                        className={`customFormControl ${isBeginningDateValid ? "" : "borderRed"}`}
                        setDate={setBeginningDate}
                        disabled={isDateFieldDisabled()} // <<< updated here
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">End Date</Form.Label>
                    </Col>
                    <Col xs={2} className="p-0" style={{ width: "110px" }}>
                      <DateInputField
                        date={endDate}
                        min={beginningDate && parseLocalDate(beginningDate)}
                        max={new Date()}
                        name="endDate"
                        setIsDateValid={setIsEndDateValid}
                        style={{ width: "110px" }}
                        className={`customFormControl ${isEndDateValid ? "" : "borderRed"}`}
                        setDate={setEndDate}
                        disabled={isDateFieldDisabled()}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

      <DriverLookup
        show={showDriverLookup}
        onHide={() => setShowDriverLookup(false)}
        renderItemId={(data) => data.driverPK}
        handleLookupSelection={driverLookupSelection}
        MaintenanceProgram
      />
    </>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        resetAllVariables();
      }}
      id={RANDOM_TESTING_REPORT_ID}
      isTabValid={isTabValid}
      payload={returnFormData}
    />
  );
};

export default RandomTestingSummaryReport;
