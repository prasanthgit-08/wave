import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import ReportComponent from "../../../../common/ReportComponent";
import DateInputField from "../../../../common/DateInputField";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";

const validationSchema = yup.object().shape({
  division: yup.string(),
  source: yup.string(),
  beginningDate: yup.date(),
  endDate: yup.date(),
  includePostedToSisters: yup.boolean(),
});

const PickupFeesReport = () => {
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [dispatcherLoader, setDispatcherLoader] = useState(false);
  const [dispatchUserData, setDispatchUserData] = useState([]);
  const [showDispatcherLookUp, setShowDispatcherLookUp] = useState(false);
  const [isTabValid, setIsTabValid] = useState(false);
  const PICKUP_FEE_REPORT_ID = process.env.REACT_APP_SP_PICKUP_FEE_REPORT;

  const formik = useFormik({
    initialValues: {
      division: "ALL",
      source: "Both",
      beginningDate: new Date(),
      endDate: new Date(),
      includePostedToSisters: false,
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const { division, source, beginningDate, endDate, includePostedToSisters } = values;

  const params = {
    Division: division,
    Source: source,
    BeginningDate: formatDatetimeToDate(beginningDate),
    EndDate: formatDatetimeToDate(endDate),
    PostedToSisters: includePostedToSisters,
  };

  //tab validation
  useEffect(() => {
    if (beginningDate && isBeginningDateValid && endDate && isEndDateValid) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [beginningDate, isBeginningDateValid, endDate, isEndDateValid]);

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-5 w-100 mt-0 m-l-5">
              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-3">
                <Col xs={2} className="p-0">
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
                      { value: "ALL", label: "All", width: "70px" },
                      { value: "Driveaway", label: "Driveaway", disabled: false },
                      { value: "Towaway", label: "Towaway", disabled: false },
                      { value: "Single", label: "Single", disabled: false },
                      { value: "Flatbed", label: "Flatbed", disabled: false },
                      { value: "PopUp", label: "Pop Up    ", disabled: false },
                      { value: "TruckCamper", label: "Truck Camper", disabled: false },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Source</Form.Label>
                </Col>

                <Col sm={8} md={8} xs={8} className="p-0 m-l-10">
                  <CustomRadioGroup
                    name="source"
                    horizontal
                    horizontalAlignmentClassName="pe-3"
                    selectedOption={source}
                    onChange={(value) => setFieldValue("source", value)}
                    options={[
                      { value: "Both", label: "Both", width: "70px" },
                      { value: "Outbound", label: "Outbound", width: "95px" },
                      { value: "Reload", label: "Reload", disabled: false },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={` m-b-10 align-items-center row  m-l-10 m-r-0 mt-3 `}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label  ">Beginning Date</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="" style={{ maxWidth: "120px" }}>
                  <DateInputField
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
                    min={beginningDate && parseLocalDate(beginningDate)}
                    max={new Date()}
                    date={endDate}
                    setDate={(date) => setFieldValue("endDate", date)}
                    setIsDateValid={setIsEndDateValid}
                    className={endDate && isEndDateValid ? "borderGreen" : "borderRed"}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-4">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Include Posted To Sisters</Form.Label>
                </Col>
                <Col xs={1} className="p-0 m-l-15">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="includePostedToSisters"
                    name="includePostedToSisters"
                    checked={includePostedToSisters}
                    onChange={(e) => {
                      setFieldValue("includePostedToSisters", e.target.checked);
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
      resetFormData={() => {
        setValues(initialValues);
        setFieldValue("beginningDate", new Date());
        setFieldValue("endDate", new Date());
      }}
      id={PICKUP_FEE_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
    />
  );
};

export default PickupFeesReport;
