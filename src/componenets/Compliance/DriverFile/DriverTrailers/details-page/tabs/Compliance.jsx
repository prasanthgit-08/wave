import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";
import DateInputField from "../../../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import { setDriverTrailersData, setIsComplianceTabValid } from "../../../../../../redux/DriverTrailersSlice";
import formatDatetimeToDate from "../../../../../../utils/formatDateTimeToDate";
import Input from "../../../../../../components/common/input";

const Compliance = () => {
  const dispatch = useDispatch();
  const [dotInspectionExpiration, setDotInspectionExpiration] = useState("");
  const [isDotInspectionExpirationValid, setIsDotInspectionExpirationValid] = useState(true);
  const [insuranceExpiration, setInsuranceExpiration] = useState("");
  const [isInsuranceExpirationValid, setIsInsuranceExpirationValid] = useState(true);
  const [insuranceCarrier, setInsuranceCarrier] = useState("");
  const [dotInspectionHold, setDotInspectionHold] = useState(false);
  const [dotInspectionHoldDate, setDotInspectionHoldDate] = useState("");
  const [isDotInspectionHoldDateValid, setIsDotInspectionHoldDateValid] = useState(true);
  const [inspectionHoldReason, setInspectionHoldReason] = useState("");
  const [validComplianceHold, setValidComplianceHold] = useState(true);

  const viewDetail = useSelector((state) => state.driverTrailers.viewDetail);
  const formData = useSelector((state) => state.driverTrailers.formData);

  const complianceTabData = () => {
    dispatch(
      setDriverTrailersData({
        dotInspectionExpirationDate: dotInspectionExpiration,
        insuranceExpirationDate: insuranceExpiration,
        insuranceCarrier: insuranceCarrier,
        dotInspectionHold: dotInspectionHold,
        dotInspectionHoldDate: dotInspectionHoldDate,
        dotInspectionHoldReason: inspectionHoldReason,
      })
    );
  };

  useEffect(() => {
    complianceTabData();
  }, [
    dotInspectionExpiration,
    insuranceExpiration,
    insuranceCarrier,
    dotInspectionHold,
    dotInspectionHoldDate,
    inspectionHoldReason,
  ]);

  useEffect(() => {
    if (
      insuranceCarrier &&
      dotInspectionExpiration &&
      insuranceExpiration &&
      isDotInspectionExpirationValid &&
      isInsuranceExpirationValid &&
      isDotInspectionHoldDateValid &&
      validComplianceHold
    ) {
      dispatch(setIsComplianceTabValid(true));
    } else {
      dispatch(setIsComplianceTabValid(false));
    }
  }, [
    insuranceCarrier,
    dotInspectionExpiration,
    insuranceExpiration,
    isDotInspectionExpirationValid,
    isInsuranceExpirationValid,
    isDotInspectionHoldDateValid,
    validComplianceHold,
  ]);

  useEffect(() => {
    if (dotInspectionHold) {
      if (dotInspectionHoldDate && inspectionHoldReason && isDotInspectionHoldDateValid) {
        setValidComplianceHold(true);
      } else {
        setValidComplianceHold(false);
      }
    } else {
      setValidComplianceHold(true);
    }
  }, [dotInspectionHold, inspectionHoldReason, dotInspectionHoldDate]);

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      setDotInspectionExpiration(formatDatetimeToDate(formData?.dotInspectionExpirationDate || ""));
      setInsuranceExpiration(formatDatetimeToDate(formData?.insuranceExpirationDate || ""));
      setInsuranceCarrier(formData?.insuranceCarrier || "");
      setDotInspectionHold(formData?.dotInspectionHold || false);
      setDotInspectionHoldDate(formatDatetimeToDate(formData?.dotInspectionHoldDate || ""));
      setInspectionHoldReason(formData?.dotInspectionHoldReason || "");
    }, 20);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [formData, viewDetail]);

  useEffect(() => {
    if (dotInspectionHold === false) {
      setInspectionHoldReason("");
      setDotInspectionHoldDate("");
    }
  }, [dotInspectionHold]);

  return (
    <div className="p-0 w-100">
      <Row className="m-0 p-20 ">
        <Col>
          <Form.Group className="m-t-4 align-items-center row m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>DOT Inspection Expiration</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className={`p-0 `} style={{ width: "95px" }}>
              <DateInputField
                date={dotInspectionExpiration}
                setDate={setDotInspectionExpiration}
                setIsDateValid={setIsDotInspectionExpirationValid}
                disabled={viewDetail}
                className={`customFormControl  ${
                  !viewDetail
                    ? dotInspectionExpiration && isDotInspectionExpirationValid
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-5 align-items-center row m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Liability Insurance Expiration</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className={`p-0 `} style={{ width: "95px" }}>
              <DateInputField
                name="insuranceExpiration"
                date={insuranceExpiration}
                setDate={setInsuranceExpiration}
                setIsDateValid={setIsInsuranceExpirationValid}
                disabled={viewDetail}
                className={`customFormControl  ${
                  !viewDetail
                    ? insuranceExpiration && isInsuranceExpirationValid
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="m-t-15 align-items-center row m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Liability Insurance Carrier</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "285px" }}>
              <Input
                type="text"
                maxLength={30}
                className={`customFormControl ${
                  !viewDetail ? (insuranceCarrier ? "borderGreen" : "borderRed") : ""
                }`}
                value={insuranceCarrier}
                onChange={(e) => setInsuranceCarrier(e.target.value)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-5 align-items-center row m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>DOT Roadside Inspection Hold</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={dotInspectionHold}
                onChange={(e) => setDotInspectionHold(e.target.checked)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="m-t-15 align-items-center row m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Roadside Hold Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className={`p-0 `} style={{ width: "95px" }}>
              <DateInputField
                name="dotInspectionHoldDate"
                date={dotInspectionHoldDate}
                setDate={setDotInspectionHoldDate}
                setIsDateValid={setIsDotInspectionHoldDateValid}
                disabled={viewDetail || !dotInspectionHold}
                className={`customFormControl ${
                  !viewDetail && dotInspectionHold
                    ? dotInspectionHoldDate && isDotInspectionHoldDateValid
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="m-t-15 row m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Roadside Hold Reason</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0">
              <textarea
                rows={7}
                cols={50}
                type="text"
                style={{
                  resize: "none",
                  display: "fixed",
                  maxWidth: "320px",
                  boxShadow: "none",
                  fontSize: "12px",
                }}
                className={`customFormControl h-100 ${
                  !viewDetail && dotInspectionHold ? (inspectionHoldReason ? "borderGreen" : "borderRed") : ""
                }`}
                name="holdReason"
                value={inspectionHoldReason}
                onChange={(e) => setInspectionHoldReason(e.target.value)}
                disabled={viewDetail || !dotInspectionHold}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Compliance;
