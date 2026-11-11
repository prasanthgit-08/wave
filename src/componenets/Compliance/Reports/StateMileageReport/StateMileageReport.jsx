import { formatForApi, parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import DateInputField from "../../../common/DateInputField";
import ReportComponent from "../../../common/ReportComponent";

const validationSchema = yup.object().shape({
  division: yup.string(),
  source: yup.string(),
  beginningDate: yup.date(),
  endDate: yup.date(),
});

const StateMileageReport = () => {
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [isBeginningDateModified, setIsBeginningDateModified] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);
  const STATE_MILEAGE_REPORT_ID = process.env.REACT_APP_SP_STATE_MILEAGE_REPORT;

  const formik = useFormik({
    initialValues: {
      division: "all",
      source: "both",
      beginningDate: new Date(),
      endDate: new Date(),
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const { division, source, beginningDate, endDate } = values;

  // Set initial beginning date to 30 days before end date
  useEffect(() => {
    if (!isBeginningDateModified) {
      const newBeginningDate = parseLocalDate(endDate);
      newBeginningDate.setDate(endDate?.getDate() - 30);
      setFieldValue("beginningDate", newBeginningDate);
    }
  }, [endDate, isBeginningDateModified, setFieldValue]);

  const params = {
    Division: division,
    PcMilerXml: "",
    UserPK: 10,
    Source: source,
    BeginingDate: beginningDate ? formatForApi(beginningDate) : null,
    EndDate: endDate ? formatForApi(endDate) : null,
  };
  //tab validation

  useEffect(() => {
    if (beginningDate && isBeginningDateValid && endDate && isEndDateValid) {
      setIsButtonValid(true);
    } else {
      setIsButtonValid(false);
    }
  }, [beginningDate, isBeginningDateValid, endDate, isEndDateValid]);

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-5 w-100 mt-0 m-l-5">
            <Form.Group className="form-group align-items-center row m-l-5 m-r-0 mb-3 mt-3">
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
                    { value: "all", label: "All", width: "70px" },
                    { value: "driveaway", label: "Driveaway", disabled: false },
                    { value: "towaway", label: "Towaway", disabled: false },
                    { value: "single", label: "Single", disabled: false },
                    { value: "flatbed", label: "Flatbed", disabled: false },
                    { value: "popUp", label: "Pop Up    ", disabled: false },
                    { value: "truckCamper", label: "Truck Camper", disabled: false },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-5 m-r-0 mb-3">
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
                    { value: "both", label: "Both", width: "70px" },
                    { value: "outbound", label: "Outbound", width: "95px" },
                    { value: "reload", label: "Reload", disabled: false },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className={` m-b-10 align-items-center row  m-l-5 m-r-0 mt-4 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">Beginning Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="" style={{ maxWidth: "120px" }}>
                <DateInputField
                  date={beginningDate}
                  max={endDate ? parseLocalDate(endDate) : ""}
                  setDate={(date) => {
                    setFieldValue("beginningDate", date);
                    setIsBeginningDateModified(true);
                  }}
                  setIsDateValid={setIsBeginningDateValid}
                  className={beginningDate && isBeginningDateValid ? "borderGreen" : "borderRed"}
                />
              </Col>
            </Form.Group>

            <Form.Group className={` m-b-10 align-items-center row  m-l-5 m-r-0 mt-4 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">End Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="" style={{ maxWidth: "120px" }}>
                <DateInputField
                  min={beginningDate ? parseLocalDate(beginningDate) : ""}
                  date={endDate}
                  setDate={(date) => setFieldValue("endDate", date)}
                  setIsDateValid={setIsEndDateValid}
                  className={endDate && isEndDateValid ? "borderGreen" : "borderRed"}
                />
              </Col>
            </Form.Group>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
      }}
      id={STATE_MILEAGE_REPORT_ID}
      isTabValid={isButtonValid}
      payload={params}
    />
  );
};

export default StateMileageReport;
