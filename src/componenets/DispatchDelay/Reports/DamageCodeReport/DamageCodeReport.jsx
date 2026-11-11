import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import DateInputField from "../../../common/DateInputField";
import ReportComponent from "../../../common/ReportComponent";
import * as yup from "yup";
import { useFormik } from "formik";
import formatDatetimeToDate from "../../../../utils/formatDateTimeToDate";

const validationSchema = yup.object().shape({
  division: yup.string(),
  beginningDate: yup.date(),
  endDate: yup.date(),
  detailReport: yup.boolean(),
});

const DamageCodeReport = () => {
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [isButtonValid, setIsButtonValid] = useState(false);
  const DAMAGE_CODE_REPORT_ID = process.env.REACT_APP_SP_DAMAGE_CODE_REPORT;

  const formik = useFormik({
    initialValues: {
      division: "All",
      beginningDate: "",
      endDate: "",
      detailReport: false,
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const { division, source, beginningDate, endDate, detailReport } = values;

  const params = {
    Division: division,
    BeginingDate: beginningDate ? formatDatetimeToDate(beginningDate) : null,
    EndDate: endDate ? formatDatetimeToDate(endDate) : null,
    DetailReport: detailReport,
  };

  //tab validation
  useEffect(() => {
    if (isBeginningDateValid && isEndDateValid) {
      setIsButtonValid(true);
    } else {
      setIsButtonValid(false);
    }
  }, [isBeginningDateValid, isEndDateValid]);

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
                    { value: "All", label: "All", width: "70px" },
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

            <Form.Group className={` m-b-10 align-items-center row  m-l-5 m-r-0 mt-4 `}>
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
                  className={isBeginningDateValid ? "" : "borderRed"}
                />
              </Col>
            </Form.Group>

            <Form.Group className={` m-b-10 align-items-center row  m-l-5 m-r-0 mt-4 `}>
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
                  className={isEndDateValid ? "" : "borderRed"}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-4 m-b-10 align-items-center row  m-l-5 m-r-0  `}>
              <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                <Form.Label className=" col-form-label">Detail Report</Form.Label>
              </Col>
              <Col xs={9} md={9} sm={9}>
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="detailReport"
                  name="detailReport"
                  checked={detailReport}
                  onChange={(e) => setFieldValue("detailReport", e.target.checked)}
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
      id={DAMAGE_CODE_REPORT_ID}
      isTabValid={isButtonValid}
      payload={params}
    />
  );
};

export default DamageCodeReport;
