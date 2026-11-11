import { useFormik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import * as yup from "yup";
import ReportComponent from "../../../../common/ReportComponent";
import { Col, Form } from "react-bootstrap";
import DateInputField from "../../../../common/DateInputField";
import { parseLocalDate, formatDatetimeToDate } from "../../../../../utils/dateUtils";

const validationSchema = yup.object().shape({
  beginningDate: yup.date(),
  endDate: yup.date(),
  byAssignedDispatcher: yup.boolean(),
});

const DispatchesByDispatcherReport = () => {
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [isTabValid, setIsTabValid] = useState(false);
  const [dateKey, setDateKey] = useState(Date.now());
  const DISPATCHES_BY_DISPATCHER_REPORT_ID = process.env.REACT_APP_SP_DISPATCHES_BY_DISPATCHER_REPORT;

  const getInitialValues = () => ({
    beginningDate: formatDatetimeToDate(new Date()),
    endDate: formatDatetimeToDate(new Date()),
    byAssignedDispatcher: true,
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    enableReinitialize: false,
  });

  const { values, setValues, resetForm, setFieldValue } = formik;
  const { beginningDate, endDate, byAssignedDispatcher } = values;

  //tab validation
  useEffect(() => {
    if (beginningDate && isBeginningDateValid && endDate && isEndDateValid) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [beginningDate, isBeginningDateValid, endDate, isEndDateValid]);

  const params = {
    BeginningDate: formatDatetimeToDate(beginningDate),
    EndDate: formatDatetimeToDate(endDate),
    ByAssignedDispatcher: byAssignedDispatcher,
  };

  const handleReset = () => {
    const newInitialValues = getInitialValues();
    setValues(newInitialValues);
    setIsBeginningDateValid(true);
    setIsEndDateValid(true);
    setDateKey(Date.now());
  };

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-5 w-100 mt-0 m-l-5">
              <Form.Group className={` m-b-10 align-items-center row  m-l-10 m-r-0 mt-3 `}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label  ">Beginning Date</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="" style={{ maxWidth: "120px" }}>
                  <DateInputField
                    key={`beginning-${dateKey}`}
                    date={beginningDate}
                    max={endDate && parseLocalDate(endDate)}
                    setDate={(date) => {
                      setFieldValue("beginningDate", date);
                    }}
                    setIsDateValid={setIsBeginningDateValid}
                    className={beginningDate && isBeginningDateValid ? "borderGreen" : "borderRed"}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={` m-b-10 align-items-center row  m-l-10 m-r-0 mt-3 `}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label  ">End Date</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="" style={{ maxWidth: "120px" }}>
                  <DateInputField
                    key={`end-${dateKey}`}
                    min={beginningDate && parseLocalDate(beginningDate)}
                    max={new Date()}
                    date={endDate}
                    setDate={(date) => {
                      setFieldValue("endDate", date);
                    }}
                    setIsDateValid={setIsEndDateValid}
                    className={endDate && isEndDateValid ? "borderGreen" : "borderRed"}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-4">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">By Assigned Dispatcher</Form.Label>
                </Col>
                <Col xs={1} className="p-0 m-l-15">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="byAssignedDispatcher"
                    name="byAssignedDispatcher"
                    checked={byAssignedDispatcher}
                    onChange={(e) => {
                      setFieldValue("byAssignedDispatcher", e.target.checked);
                    }}
                  />
                </Col>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={handleReset}
      id={DISPATCHES_BY_DISPATCHER_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
      useType
    />
  );
};

export default DispatchesByDispatcherReport;
