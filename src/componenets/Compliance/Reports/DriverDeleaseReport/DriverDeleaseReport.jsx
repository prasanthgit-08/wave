import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import DateInputField from "../../../common/DateInputField";
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import { parseLocalDate, formatDatetimeToDate } from "../../../../utils/dateUtils";
import ReportComponent from "../../../common/ReportComponent";

const validationSchema = yup.object().shape({
  division: yup.string(),
  status: yup.string(),
  lettersRequired: yup.boolean(),
});

const DriverDeleaseReport = () => {
  const formik = useFormik({
    initialValues: {
      division: "all",
      status: "both",
      lettersRequired: false,
    },
    validationSchema: validationSchema,
  });

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;

  const { values, setValues, setFieldValue, initialValues } = formik;

  const { division, status, lettersRequired } = values;

  const [beginningDate, setBeginningDate] = useState(formatDatetimeToDate(new Date()));
  const [endDate, setEndDate] = useState(formatDatetimeToDate(new Date()));
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [isButtonValid, setIsButtonValid] = useState(false);
  const DRIVER_DELEASE_REPORT_ID = process.env.REACT_APP_SP_DRIVER_DELEASE_REPORT;

  //buttonValidation
  useEffect(() => {
    if (beginningDate && isBeginningDateValid && endDate && isEndDateValid && division && status) {
      setIsButtonValid(true);
    } else {
      setIsButtonValid(false);
    }
  }, [beginningDate, isBeginningDateValid, isEndDateValid, endDate, division, status, lettersRequired]);

  const handleReset = () => {
    setBeginningDate("");
    setEndDate("");
    setTimeout(() => {
      setBeginningDate(formatDatetimeToDate(new Date()));
      setEndDate(formatDatetimeToDate(new Date()));
      formik.resetForm();
    }, 0);
    setIsBeginningDateValid(true); // Reset validation states
    setIsEndDateValid(true);
  };

  const params = {
    Division: division,
    BeginningDate: beginningDate,
    EndDate: endDate,
    Status: status,
    LetterRequired: lettersRequired,
    UserFK: userPK,
  };

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-5 w-100 mt-0 m-l-10">
            <Col sm={6} xs={6} md={6}>
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-4">
                <Col xs={3} md={3} sm={3} className="p-0">
                  <Form.Label className="customColFormLabel">Division</Form.Label>
                </Col>

                <Col xs={8} className="p-0 m-l-10">
                  <CustomRadioGroup
                    name="division"
                    horizontal
                    horizontalAlignmentClassName="pe-4"
                    selectedOption={division}
                    onChange={(value) => setFieldValue("division", value)}
                    options={[
                      { value: "all", label: "All", width: "100px" },
                      { value: "driveaway", label: "Driveaway", disabled: false },
                      { value: "towaway", label: "Towaway", disabled: false },
                      { value: "flatbed", label: "Flatbed", disabled: false },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Beginning Date</Form.Label>
                </Col>

                <Col xs={3} md={3} lg={3} sm={3} className="p-0 m-l-10">
                  <DateInputField
                    date={beginningDate}
                    name="beginningDate"
                    setIsDateValid={setIsBeginningDateValid}
                    setDate={(value) => {
                      setBeginningDate(value);
                    }}
                    className={`customFormControl ${
                      beginningDate && isBeginningDateValid ? "borderGreen" : "borderRed"
                    }`}
                    max={endDate && parseLocalDate(endDate)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">End Date</Form.Label>
                </Col>

                <Col xs={3} md={3} lg={3} sm={3} className="p-0 m-l-10">
                  <DateInputField
                    date={endDate}
                    name="endDate"
                    setDate={(value) => {
                      setEndDate(value);
                    }}
                    setIsDateValid={setIsEndDateValid}
                    className={`customFormControl ${endDate && isEndDateValid ? "borderGreen" : "borderRed"}`}
                    min={beginningDate && parseLocalDate(beginningDate)}
                    max={new Date()}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-4">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="customColFormLabel">Status</Form.Label>
                </Col>

                <Col sm={8} md={8} xs={8} className="p-0 m-l-10">
                  <CustomRadioGroup
                    name="status"
                    horizontal
                    horizontalAlignmentClassName="pe-3"
                    selectedOption={status}
                    onChange={(value) => setFieldValue("status", value)}
                    options={[
                      { value: "both", label: "Both", width: "70px" },
                      { value: "terminated", label: "Terminated", width: "95px" },
                      { value: "inactive", label: "Inactive", disabled: false },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={`mt-4 m-b-10 align-items-center row  m-l-0 m-r-0  `}>
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className=" col-form-label">Letters Required</Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="lettersRequired"
                    name="lettersRequired"
                    checked={formik.values.lettersRequired}
                    onChange={(e) => setFieldValue("lettersRequired", e.target.checked)}
                  />
                </Col>
              </Form.Group>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={handleReset}
      id={DRIVER_DELEASE_REPORT_ID}
      isTabValid={isButtonValid}
      payload={params}
    />
  );
};

export default DriverDeleaseReport;
