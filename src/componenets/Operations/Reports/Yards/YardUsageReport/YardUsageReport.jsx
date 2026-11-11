import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ReportComponent from "../../../../common/ReportComponent";
import DateInputField from "../../../../common/DateInputField";
import { formatDatetimeToDate, normalizeDate } from "../../../../../utils/dateUtils";

const YardUsageReport = () => {
  const [beginningDate, setBeginningDate] = useState(formatDatetimeToDate(new Date()));
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [endDate, setEndDate] = useState(formatDatetimeToDate(new Date()));
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [isTabValid, setIsTabValid] = useState(false);

  const YARD_USAGE_REPORT_ID = process.env.REACT_APP_SP_YARD_USAGE_REPORT;

  const returnFormData = () => {
    return {
      beginDate: beginningDate,
      endDate: endDate,
    };
  };

  const resetFormData = () => {
    setBeginningDate(formatDatetimeToDate(new Date()));
    setIsBeginningDateValid(true);
    setEndDate(formatDatetimeToDate(new Date()));
    setIsEndDateValid(true);
  };

  // Tab Validation
  useEffect(() => {
    if (
      beginningDate &&
      isBeginningDateValid &&
      endDate &&
      isEndDateValid &&
      normalizeDate(endDate) >= normalizeDate(beginningDate) &&
      normalizeDate(endDate) >= normalizeDate(new Date())
    ) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [beginningDate, isBeginningDateValid, endDate, isEndDateValid]);

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-10">
              <Col xs={11}>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Beginning Date</Form.Label>
                  </Col>

                  <Col xs={2} className="p-0" style={{ maxWidth: "120px" }}>
                    <DateInputField
                      date={beginningDate}
                      setDate={setBeginningDate}
                      max={new Date()}
                      setIsDateValid={setIsBeginningDateValid}
                      className={beginningDate && isBeginningDateValid ? "borderGreen" : "borderRed"}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">End Date</Form.Label>
                  </Col>

                  <Col xs={2} className="p-0" style={{ maxWidth: "120px" }}>
                    <DateInputField
                      date={endDate}
                      setDate={setEndDate}
                      setIsDateValid={setIsEndDateValid}
                      min={new Date()}
                      className={
                        endDate &&
                        isEndDateValid &&
                        normalizeDate(endDate) >= normalizeDate(beginningDate) &&
                        normalizeDate(endDate) >= normalizeDate(new Date())
                          ? "borderGreen"
                          : "borderRed"
                      }
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
      resetFormData={resetFormData}
      id={YARD_USAGE_REPORT_ID}
      isTabValid={isTabValid}
      payload={returnFormData()}
      useType={true}
    />
  );
};

export default YardUsageReport;
