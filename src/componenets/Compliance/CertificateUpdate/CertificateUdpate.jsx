import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import moment from "moment";
import QuarterScreenWrapper from "../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../common/Header";
import CommonFooter from "../../common/CommonFooter";
import CustomRadioGroup from "../../common/CustomRadioGroup";
import DateInputField from "../../common/DateInputField";
import { formatDatetimeToDate } from "../../../utils/dateUtils";
import { getCurrentCompany } from "../../../utils/utils";

const SUNDAY = 0;
const SATURDAY = 6;
const DEFAULT_DAYS_TO_NEXT_SAFETY = 365;
const days = Number(getCurrentCompany()?.daysToNextSafety);
console.log("nextdate", days);
const normalizeDay = (value) => {
  /* DateInputField hands back "YYYY-MM-DD", which new Date() reads as UTC midnight - the day
     before in western timezones. moment reads it as local, so the weekday stays correct. */
  const date = moment(value).toDate();
  date.setHours(12, 0, 0, 0);
  return date;
};

const skipWeekendForward = (value) => {
  const date = normalizeDay(value);
  if (date.getDay() === SATURDAY) {
    date.setDate(date.getDate() + 2);
  } else if (date.getDay() === SUNDAY) {
    date.setDate(date.getDate() + 1);
  }
  return date;
};

/* the school date already happened and cannot be in the future, so it falls back to the Friday */
const skipWeekendBackward = (value) => {
  const date = normalizeDay(value);
  if (date.getDay() === SATURDAY) {
    date.setDate(date.getDate() - 1);
  } else if (date.getDay() === SUNDAY) {
    date.setDate(date.getDate() - 2);
  }
  return date;
};

const getDaysToNextSafety = () => {
  const days = Number(getCurrentCompany()?.daysToNextSafety);
  return days > 0 ? days : DEFAULT_DAYS_TO_NEXT_SAFETY;
};

const addDaysToNextSafety = (fromDate) => {
  const date = normalizeDay(fromDate);
  date.setDate(date.getDate() + getDaysToNextSafety());
  const currentDate = normalizeDay(new Date());
  return skipWeekendForward(date < currentDate ? currentDate : date);
};

const CertificateUdpate = () => {
  const navigate = useNavigate();
  const [school, setSchool] = useState("Safety");

  const today = useMemo(() => normalizeDay(new Date()), []);
  const schoolDateDefault = useMemo(() => skipWeekendBackward(new Date()), []);

  const [schoolDate, setSchoolDate] = useState(schoolDateDefault);
  const [nextDate, setNextDate] = useState(() => addDaysToNextSafety(schoolDateDefault));

  const [isSchoolDateFormatValid, setIsSchoolDateFormatValid] = useState(true);
  const [isNextDateFormatValid, setIsNextDateFormatValid] = useState(true);

  const isSchoolDateInRange = !!schoolDate && normalizeDay(schoolDate) <= today;
  const isNextDateInRange = !!nextDate && normalizeDay(nextDate) >= today;

  const isSchoolDateValid = !!schoolDate && isSchoolDateFormatValid && isSchoolDateInRange;
  const isNextDateValid = !!nextDate && isNextDateFormatValid && isNextDateInRange;

  const isFormValid = isSchoolDateValid && isNextDateValid;

  const handleSchoolDateChange = (value) => {
    if (!value) {
      setSchoolDate("");
      return;
    }
    const selectedDate = skipWeekendBackward(value);
    setSchoolDate(selectedDate);
    setNextDate(addDaysToNextSafety(selectedDate));
  };

  const handleNextDateChange = (value) => {
    setNextDate(value ? skipWeekendForward(value) : "");
  };

  const handleNext = () => {
    if (!isFormValid) return;
    navigate("/certificate-update-driver-selection", {
      state: {
        type: school,
        availableDate: formatDatetimeToDate(schoolDate, "YYYY-MM-DD", true),
        nextDate: formatDatetimeToDate(nextDate, "YYYY-MM-DD", true),
      },
    });
  };

  const footerButtons = [
    {
      label: "Next",
      onClick: handleNext,
      disabled: !isFormValid,
    },
  ];

  return (
    <QuarterScreenWrapper>
      <Header
        confirmClose
        programName="Certificate Update"
        closeModalBody="Please confirm you want to close the program without saving your changes"
      />

      {/* Form Contents */}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-5">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">School</Form.Label>
                    </Col>
                    <Col xs={2} className="p-0">
                      <CustomRadioGroup
                        name="school"
                        horizontal
                        horizontalAlignmentClassName="pe-3"
                        options={["Safety", "Simulator"]}
                        selectedOption={school}
                        onChange={(value) => setSchool(value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">School Date</Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0" style={{ maxWidth: "120px" }}>
                      <DateInputField
                        date={schoolDate}
                        name="schoolDate"
                        max={today}
                        setIsDateValid={setIsSchoolDateFormatValid}
                        setDate={handleSchoolDateChange}
                        className={`customFormControl ${isSchoolDateValid ? "borderGreen" : "borderRed"}`}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Next Date</Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0" style={{ maxWidth: "120px" }}>
                      <DateInputField
                        date={nextDate}
                        name="nextDate"
                        min={today}
                        setIsDateValid={setIsNextDateFormatValid}
                        setDate={handleNextDateChange}
                        className={`customFormControl ${isNextDateValid ? "borderGreen" : "borderRed"}`}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

      <CommonFooter buttons={footerButtons} />
    </QuarterScreenWrapper>
  );
};

export default CertificateUdpate;
