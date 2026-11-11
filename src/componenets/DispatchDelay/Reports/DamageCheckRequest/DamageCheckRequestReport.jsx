import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import formatDatetimeToDate from "../../../../utils/formatDateTimeToDate";
import DateInputField from "../../../common/DateInputField";
import ReportComponent from "../../../common/ReportComponent";

const DamageCheckRequestReport = () => {
  const [isButtonValid, setIsButtonValid] = useState(false);
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [beginningDate, setBeginningDate] = useState(formatDatetimeToDate(new Date()));
  const [endDate, setendDate] = useState(formatDatetimeToDate(new Date()));
  const [onlyOpenclaims, setOnlyOpenclaims] = useState(false);
  const DAMAGE_CHECK_REQUEST_REPORT_ID = process.env.REACT_APP_SP_DAMAGE_CHECK_REQUEST_REPORT;

  //buttonValidation
  useEffect(() => {
    if (beginningDate && isBeginningDateValid && endDate && isEndDateValid) {
      setIsButtonValid(true);
    } else {
      setIsButtonValid(false);
    }
  }, [beginningDate, isBeginningDateValid, endDate, isEndDateValid]);

  const handleReset = () => {
    // resetForm(); // Reset formik form
    setOnlyOpenclaims(false);
    setBeginningDate("");
    setendDate("");
    setTimeout(() => {
      setBeginningDate(formatDatetimeToDate(new Date()));
      setendDate(formatDatetimeToDate(new Date()));
    }, 0);
    setIsBeginningDateValid(true); // Reset validation states
    setIsEndDateValid(true);
  };

  const params = {
    Beginningdate: beginningDate,
    EndDate: endDate,
    OnlyOpenClaims: onlyOpenclaims,
  };

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-5 w-100 m-l-5">
            <Row>
              <Col sm={6} md={6} xs={6}>
                <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-5 m-r-0 mt-4 `}>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label  ">Beginning Date</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="d-flex ">
                    <DateInputField
                      date={beginningDate}
                      name="BeginningDate"
                      setDate={(value) => {
                        setBeginningDate(value);
                      }}
                      setIsDateValid={setIsBeginningDateValid}
                      className={`customFormControl ${
                        beginningDate && isBeginningDateValid ? "borderGreen" : "borderRed"
                      }`}
                      max={endDate && parseLocalDate(endDate)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-5 m-r-0 mt-3 `}>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label  ">End Date</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="d-flex ">
                    <DateInputField
                      date={endDate}
                      name="EndDate"
                      setIsDateValid={setIsEndDateValid}
                      setDate={(value) => {
                        setendDate(value);
                      }}
                      className={`customFormControl ${endDate && isEndDateValid ? "borderGreen" : "borderRed"}`}
                      min={beginningDate && parseLocalDate(beginningDate)}
                      max={new Date()}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-5 m-r-0 mt-3 `}>
                  <Col sm={3} md={3} xs={3} className="p-0 d-flex">
                    <Form.Label className=" col-form-label">Only Open Claims</Form.Label>
                  </Col>
                  <Col xs={9} md={9} sm={9}>
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="onlyOpenClaims"
                      name="onlyOpenClaims"
                      checked={onlyOpenclaims}
                      onChange={(e) => setOnlyOpenclaims(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={handleReset}
      id={DAMAGE_CHECK_REQUEST_REPORT_ID}
      isTabValid={isButtonValid}
      payload={params}
    />
  );
};

export default DamageCheckRequestReport;
