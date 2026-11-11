import { parseLocalDate } from "../../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";
import DateInputField from "../../../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import { setDriverTrailersData, setIsMaintenanceTabValid } from "../../../../../../redux/DriverTrailersSlice";
import { useParams } from "react-router-dom";
import formatDatetimeToDate from "../../../../../../utils/formatDateTimeToDate";
import Input from "../../../../../../components/common/input";

const Maintenance = () => {
  const { driverId, recordId } = useParams();
  const id = recordId;

  const [lastMaintenanceReport, setLastMaintenanceReport] = useState("");
  const [isLastMaintenanceReportValid, setIsLastMaintenanceReportValid] = useState(true);
  const [nextMaintenanceReportDue, setNextMaintenanceReportDue] = useState("");
  const [isNextMaintenanceReportDueValid, setIsNextMaintenanceReportDueValid] = useState(true);
  const [maintenanceReportHold, setMaintenanceReportHold] = useState(false);
  const [maintenanceReportHoldDate, setMaintenanceReportHoldDate] = useState("");
  const [isMaintenanceReportHoldDateValid, setIsMaintenanceReportHoldDateValid] = useState(true);
  const [maintenanceReportHoldReason, setMaintenanceReportHoldReason] = useState("");
  const [firstAxle, setFirstAxle] = useState(false);
  const [firstAxleRight, setFirstAxleRight] = useState("");
  const [firstAxleLeft, setFirstAxleLeft] = useState("");
  const [secondAxle, setSecondAxle] = useState(false);
  const [secondAxleRight, setSecondAxleRight] = useState("");
  const [secondAxleLeft, setSecondAxleLeft] = useState("");
  const [thirdAxle, setThirdAxle] = useState(false);
  const [thirdAxleLeft, setThirdAxleLeft] = useState("");
  const [thirdAxleRight, setThirdAxleRight] = useState("");
  const viewDetail = useSelector((state) => state.driverTrailers.viewDetail);
  const formData = useSelector((state) => state.driverTrailers.formData);
  const [isSecondAxleAvailable, setIsSecondAxleAvailable] = useState(false);
  const [isThirdAxleAvailable, setIsThirdAxleAvailable] = useState(false);
  const [secondAxleCheck, setSecondAxleCheck] = useState(true);
  const [thirdAxleCheck, setThirdAxleCheck] = useState(true);
  const [validMaintenanceReportHold, setValidMaintenanceReportHold] = useState(true);

  // For Tab Validation

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      nextMaintenanceReportDue &&
      firstAxleLeft &&
      firstAxleRight &&
      secondAxleCheck &&
      thirdAxleCheck &&
      isLastMaintenanceReportValid &&
      isNextMaintenanceReportDueValid &&
      isMaintenanceReportHoldDateValid &&
      validMaintenanceReportHold
    ) {
      dispatch(setIsMaintenanceTabValid(true));
    } else {
      dispatch(setIsMaintenanceTabValid(false));
    }
  }, [
    nextMaintenanceReportDue,
    firstAxleLeft,
    firstAxleRight,
    secondAxleCheck,
    thirdAxleCheck,
    isLastMaintenanceReportValid,
    isNextMaintenanceReportDueValid,
    isMaintenanceReportHoldDateValid,
    validMaintenanceReportHold,
  ]);

  useEffect(() => {
    if (maintenanceReportHold) {
      if (maintenanceReportHoldDate && isMaintenanceReportHoldDateValid) {
        setValidMaintenanceReportHold(true);
      } else {
        setValidMaintenanceReportHold(false);
      }
    } else {
      setValidMaintenanceReportHold(true);
    }
  }, [maintenanceReportHold, maintenanceReportHoldDate, isMaintenanceReportHoldDateValid]);

  // Set data to setDriverTrailersData object DriverTrailerslice

  const maintenanceTabData = () => {
    dispatch(
      setDriverTrailersData({
        lastMaintenanceReport: lastMaintenanceReport,
        nextMaintenanceReportDue: nextMaintenanceReportDue,
        maintenanceReportHold: maintenanceReportHold,
        maintenanceReportHoldDate: maintenanceReportHoldDate,
        maintenanceReportHoldReason: maintenanceReportHoldReason,
        axle1Dual: firstAxle,
        axle1LeftTireSize: firstAxleLeft,
        axle1RightTireSize: firstAxleRight,
        axle2Dual: secondAxle,
        axle2LeftTireSize: secondAxleLeft,
        axle2RightTireSize: secondAxleRight,
        axle3Dual: thirdAxle,
        axle3LeftTireSize: thirdAxleLeft,
        axle3RightTireSize: thirdAxleRight,
      })
    );
  };

  useEffect(() => {
    maintenanceTabData();
  }, [
    lastMaintenanceReport,
    nextMaintenanceReportDue,
    maintenanceReportHold,
    maintenanceReportHoldDate,
    maintenanceReportHoldReason,
    firstAxle,
    firstAxleLeft,
    firstAxleRight,
    secondAxle,
    secondAxleLeft,
    secondAxleRight,
    thirdAxle,
    thirdAxleLeft,
    thirdAxleRight,
  ]);

  // Set Data in fields in the case of Edit

  useEffect(() => {
    setLastMaintenanceReport(formatDatetimeToDate(formData?.lastMaintenanceReport || ""));
    setNextMaintenanceReportDue(formatDatetimeToDate(formData?.nextMaintenanceReportDue || ""));
    setMaintenanceReportHold(formData?.maintenanceReportHold || false);
    setMaintenanceReportHoldDate(formatDatetimeToDate(formData?.maintenanceReportHoldDate || ""));
    setMaintenanceReportHoldReason(formData?.maintenanceReportHoldReason || "");
    setFirstAxle(formData?.axle1Dual || false);
    setFirstAxleLeft(formData?.axle1LeftTireSize || "");
    setFirstAxleRight(formData?.axle1RightTireSize || "");
    setSecondAxle(formData?.axle2Dual || false);
    setSecondAxleLeft(formData?.axle2LeftTireSize || "");
    setSecondAxleRight(formData?.axle2RightTireSize || "");
    setThirdAxle(formData?.axle3Dual || false);
    setThirdAxleLeft(formData?.axle3LeftTireSize || "");
    setThirdAxleRight(formData?.axle3RightTireSize || "");
    setIsSecondAxleAvailable(formData?.axle2LeftTireSize && formData?.axle2RightTireSize ? true : false); // In the case of edit second left and second rght are avilable then check box before second axle is checked
    setIsThirdAxleAvailable(formData?.axle3LeftTireSize && formData?.axle3RightTireSize ? true : false); // In the case of edit third left and third rght are avilable then check box before third axle is checked
  }, [formData, viewDetail]);

  //  Clear field when Maintenance Report Hold Unchecked

  useEffect(() => {
    if (maintenanceReportHold === false) {
      setMaintenanceReportHoldDate("");
      setMaintenanceReportHoldReason("");
    }
  }, [maintenanceReportHold]);

  //  Clear field when Before Second axle check box Disabled

  useEffect(() => {
    if (!isSecondAxleAvailable) {
      setSecondAxleLeft("");
      setSecondAxleRight("");
      setSecondAxle(false);
    }
  }, [isSecondAxleAvailable]);

  // For Tab validation for second left and right axle when check box before second axle is checked

  useEffect(() => {
    if (isSecondAxleAvailable) {
      if (secondAxleLeft && secondAxleRight) {
        setSecondAxleCheck(true);
      } else {
        setSecondAxleCheck(false);
      }
    } else {
      setSecondAxleCheck(true);
    }
  }, [secondAxleLeft, secondAxleRight, isSecondAxleAvailable]);

  // For Tab validation for Third left and right axle when check box before third axle is checked

  useEffect(() => {
    if (isThirdAxleAvailable) {
      if (thirdAxleLeft && thirdAxleRight) {
        setThirdAxleCheck(true);
      } else {
        setThirdAxleCheck(false);
      }
    } else {
      setThirdAxleCheck(true);
    }
  }, [thirdAxleLeft, thirdAxleRight, isThirdAxleAvailable]);

  //  Clear field when Before Third axle check box Disabled

  useEffect(() => {
    if (!isThirdAxleAvailable) {
      setThirdAxleLeft("");
      setThirdAxleRight("");
      setThirdAxle(false);
    }
  }, [isThirdAxleAvailable]);

  return (
    <div className="p-0 w-100">
      <Row className="m-0 p-20">
        <Col sm={9} md={9} lg={9} xl={9} xs={9}>
          <Form.Group className="form-group m-t-5 form-group m-t-5 align-items-center row m-l-0 m-r-0 mb-3">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`} />
              {"Last Maintenance Report"}
            </Col>

            <Col xs={2} md={2} sm={2} className={`p-0 `} style={{ width: "95px" }}>
              <DateInputField
                name="lastMaintenanceReport"
                date={lastMaintenanceReport}
                reduxSetDate={(value) => setLastMaintenanceReport(value)}
                max={
                  nextMaintenanceReportDue
                    ? new Date(parseLocalDate(formatDatetimeToDate(nextMaintenanceReportDue)) - 24 * 60 * 60 * 1000)
                    : ""
                }
                setDate={setLastMaintenanceReport}
                setIsDateValid={setIsLastMaintenanceReportValid}
                disabled={viewDetail || id == null}
                className={`customFormControl  ${
                  !viewDetail ? (isLastMaintenanceReportValid ? "" : "borderRed") : ""
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group m-t-5 form-group m-t-5 align-items-center row m-l-0 m-r-0 mb-3">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`} />
              {"Next Maintenance Report Due"}
            </Col>
            <Col xs={2} md={2} sm={2} className={`p-0 `} style={{ width: "95px" }}>
              <DateInputField
                className={`customFormControl  ${
                  !viewDetail
                    ? nextMaintenanceReportDue && isNextMaintenanceReportDueValid
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
                name="nextMaintenanceReportDue"
                date={nextMaintenanceReportDue}
                reduxSetDate={(value) => setNextMaintenanceReportDue(value)}
                min={
                  lastMaintenanceReport
                    ? new Date(
                        parseLocalDate(formatDatetimeToDate(lastMaintenanceReport)).getTime() + 24 * 60 * 60 * 1000
                      )
                    : ""
                }
                setDate={setNextMaintenanceReportDue}
                setIsDateValid={setIsNextMaintenanceReportDueValid}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`} />
              {"Maintenance Report Hold"}
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={maintenanceReportHold}
                onChange={(e) => setMaintenanceReportHold(e.target.checked)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`} />
              Maintenance Report Hold Date
            </Col>

            <Col xs={2} md={2} sm={2} className={`p-0 `} style={{ width: "95px" }}>
              <DateInputField
                name="maintenanceReportHoldDate"
                date={maintenanceReportHoldDate}
                setDate={setMaintenanceReportHoldDate}
                setIsDateValid={setIsMaintenanceReportHoldDateValid}
                disabled={viewDetail || !maintenanceReportHold}
                className={`customFormControl ${
                  !viewDetail && maintenanceReportHold
                    ? maintenanceReportHoldDate && isMaintenanceReportHoldDateValid
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15  row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`} />
              {"Maintenance Report Hold Reason"}
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0">
              <textarea
                rows={7}
                cols={50}
                type="text"
                style={{
                  resize: "none",
                  display: "fixed",
                  minHeight: "25px",
                  minWidth: "50px",
                  maxHeight: "150px",
                  maxWidth: "450px",
                  boxShadow: "none",
                  fontSize: "12px",
                }}
                className="customFormControl h-100"
                name="holdReason"
                value={maintenanceReportHoldReason}
                onChange={(e) => setMaintenanceReportHoldReason(e.target.value)}
                disabled={viewDetail || !maintenanceReportHold}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-5 align-items-center row m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0"></Col>
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`} />
              Tire Sizes
            </Col>
          </Form.Group>

          <Form.Group className="form-group m-t-5 form-group m-t-2 m-b-2 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0"></Col>
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "75px" }}>
              <Form.Label className={`${styles.colFormLabel}`} />
              Dual
            </Col>
            <Col sm={2} md={2} xs={2} className="p-0 " style={{ width: "100px" }}>
              <Form.Label className={`${styles.colFormLabel}`} />
              Left
            </Col>
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "100px" }}>
              <Form.Label className={`${styles.colFormLabel}`} />
              Right
            </Col>
          </Form.Group>

          <Form.Group className="form-group m-t-5 form-group m-t-2 m-b-2 align-items-center row m-l-0 m-r-0">
            <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "150px" }}></Col>
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "75px" }}>
              <Form.Label className={`${styles.colFormLabel}`} />
              {"Ist Axle"}
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 `}
                checked={firstAxle}
                onChange={(e) => setFirstAxle(e.target.checked)}
                disabled={viewDetail}
              />
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 p-t-5 p-r-10 p-b-5" style={{ width: "100px" }}>
              <Input
                type="text"
                className={`customFormControl ${
                  !viewDetail ? (firstAxleLeft ? "borderGreen" : "borderRed") : ""
                }`}
                value={firstAxleLeft}
                maxLength={12}
                onChange={(e) => setFirstAxleLeft(e.target.value)}
                disabled={viewDetail}
              />
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 p-t-5 p-r-10 p-b-5" style={{ width: "100px" }}>
              <Input
                type="text"
                className={`customFormControl ${
                  !viewDetail ? (firstAxleRight ? "borderGreen" : "borderRed") : ""
                }`}
                value={firstAxleRight}
                maxLength={12}
                onChange={(e) => setFirstAxleRight(e.target.value)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group m-t-2 form-group m-t-2 m-b-2 align-items-center row m-l-0 m-r-0">
            <Col sm={1} md={1} xs={1} style={{ width: "120px" }}></Col>
            <Col sm={1} md={1} xs={1} className="pr-20 " style={{ width: "30px" }}>
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={isSecondAxleAvailable}
                onChange={(e) => setIsSecondAxleAvailable(e.target.checked)}
                disabled={viewDetail}
              />
            </Col>
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "75px" }}>
              <Form.Label className={`${styles.colFormLabel}`} />
              {"2nd Axle"}
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={secondAxle}
                onChange={(e) => setSecondAxle(e.target.checked)}
                disabled={viewDetail || !isSecondAxleAvailable}
              />
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0 p-t-5 p-r-10 p-b-5" style={{ width: "100px" }}>
              <Input
                type="text"
                className={`customFormControl ${
                  !viewDetail
                    ? isSecondAxleAvailable
                      ? secondAxleLeft
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                    : ""
                }`}
                value={secondAxleLeft}
                maxLength={12}
                onChange={(e) => setSecondAxleLeft(e.target.value)}
                disabled={viewDetail || !isSecondAxleAvailable}
              />
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 p-t-5 p-r-10 p-b-5" style={{ width: "100px" }}>
              <Input
                type="text"
                className={`customFormControl ${
                  !viewDetail
                    ? isSecondAxleAvailable
                      ? secondAxleRight
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                    : ""
                }`}
                value={secondAxleRight}
                maxLength={12}
                onChange={(e) => setSecondAxleRight(e.target.value)}
                disabled={viewDetail || !isSecondAxleAvailable}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group m-t-2 form-group m-t-2 m-b-2 align-items-center row m-l-0 m-r-0">
            <Col sm={1} md={1} xs={1} style={{ width: "120px" }}></Col>
            <Col sm={1} md={1} xs={1} className="pr-20" style={{ width: "30px" }}>
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={isThirdAxleAvailable}
                onChange={(e) => setIsThirdAxleAvailable(e.target.checked)}
                disabled={viewDetail || !isSecondAxleAvailable}
              />
            </Col>
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "75px" }}>
              <Form.Label className={`${styles.colFormLabel}`} />
              {"3rd Axle"}
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                checked={thirdAxle}
                onChange={(e) => setThirdAxle(e.target.checked)}
                disabled={viewDetail || !isThirdAxleAvailable}
              />
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0 p-t-5 p-r-10 p-b-5" style={{ width: "100px" }}>
              <Input
                type="text"
                className={`customFormControl ${
                  !viewDetail
                    ? isThirdAxleAvailable
                      ? thirdAxleLeft
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                    : ""
                }`}
                value={thirdAxleLeft}
                maxLength={12}
                onChange={(e) => setThirdAxleLeft(e.target.value)}
                disabled={viewDetail || !isThirdAxleAvailable}
              />
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 p-t-5 p-r-10 p-b-5" style={{ width: "100px" }}>
              <Input
                type="text"
                className={`customFormControl ${
                  !viewDetail
                    ? isThirdAxleAvailable
                      ? thirdAxleRight
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                    : ""
                }`}
                value={thirdAxleRight}
                maxLength={12}
                onChange={(e) => setThirdAxleRight(e.target.value)}
                disabled={viewDetail || !isThirdAxleAvailable}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Maintenance;
