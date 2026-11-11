import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import { setDriverTruckData, setIsMaintenanceTabValid } from "../../../../../redux/DriverTrucksSlice";
import { useParams } from "react-router-dom";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import { cleanFirstChar } from "../../../../../utils/utils";
import Input from "../../../../../components/common/input";

const Maintenance = () => {
  const dispatch = useDispatch();

  const { driverId, recordId } = useParams();
  const id = recordId;

  const [maintenancereporthold, setMaintenanceReportHold] = useState(false);
  const [maintenancereportholdreason, setMaintenanceReportHoldReason] = useState("");
  const [lastmaintenancereport, setLastMaintenanceReport] = useState("");
  const [lastMaintenanceReportValidation, setLastMaintenanceReportValidation] = useState(true);
  const [nextmaintenancereportdue, setNextMaintenanceReportDue] = useState("");
  const [nextMaintenanceReportDueValidation, setNextMaintenanceReportDueValidation] = useState(true);
  const [maintenancereportholddate, setMaintenanceReportHoldDate] = useState("");
  const [isLastMaintenanceReportValid, setIsLastMaintenanceReportValid] = useState(true);

  const [isMaintenanceReportHoldDateValidation, setIsMaintenanceReportHoldDateValidation] = useState(true);
  const [frontleft, setFrontLeft] = useState("");
  const [frontright, setFrontRight] = useState("");
  const [rearoutsideleft, setRearOutsideLeft] = useState("");
  const [rearoutsideright, setRearOutsideRight] = useState("");
  const [rearinsideleft, setRearInsideLeft] = useState("");
  const [rearinsideright, setRearInsideRight] = useState("");

  const viewDetails = useSelector((state) => state.driverTrucks.viewDetails);
  const formData = useSelector((state) => state.driverTrucks.formData);
  const driverTruckData = useSelector((state) => state.driverTrucks.driverTruckData);

  const maintenanceTabData = () => {
    dispatch(
      setDriverTruckData({
        lastMaintenanceReport: lastmaintenancereport,
        nextMaintenanceReport: nextmaintenancereportdue,
        maintenanceReportHold: maintenancereporthold,
        maintenanceReportHoldDate: maintenancereportholddate,
        maintenanceReportHoldReason: maintenancereportholdreason,
        leftFrontTireSize: frontleft,
        rightFrontTireSize: frontright,
        leftRearOutsideTireSize: rearoutsideleft,
        rightRearOutsideTireSize: rearoutsideright,
        leftRearInsideTireSize: rearinsideleft,
        rightRearInsideTireSize: rearinsideright,
      })
    );
  };

  useEffect(() => {
    maintenanceTabData();
  }, [
    lastmaintenancereport,
    nextmaintenancereportdue,
    maintenancereporthold,
    maintenancereportholdreason,
    frontleft,
    frontright,
    rearoutsideleft,
    rearoutsideright,
    rearinsideleft,
    rearinsideright,
    maintenancereportholddate,
  ]);

  useEffect(() => {
    if (formData) {
      setLastMaintenanceReport(formData?.lastMaintenanceReport || "");
      setNextMaintenanceReportDue(formData?.nextMaintenanceReport || "");
      setMaintenanceReportHold(formData?.maintenanceReportHold || false);
      setMaintenanceReportHoldDate(formData?.maintenanceReportHoldDate || "");
      setMaintenanceReportHoldReason(formData?.maintenanceReportHoldReason || "");
      setFrontLeft(formData?.leftFrontTireSize?.trim() || "");
      setFrontRight(formData?.rightFrontTireSize?.trim() || "");
      setRearOutsideLeft(formData?.leftRearOutsideTireSize?.trim() || "");
      setRearOutsideRight(formData?.rightRearOutsideTireSize?.trim() || "");
      setRearInsideLeft(formData?.leftRearInsideTireSize?.trim() || "");
      setRearInsideRight(formData?.rightRearInsideTireSize?.trim() || "");
    }
  }, [formData, viewDetails]);

  useEffect(() => {
    if (driverTruckData) {
      console.log("Syncing from driverTruckData:", driverTruckData);
      const hasMaintenanceUpdate =
        driverTruckData.maintenanceReportHold !== undefined ||
        driverTruckData.maintenanceReportHoldDate !== undefined ||
        driverTruckData.nextMaintenanceReport !== undefined;

      if (hasMaintenanceUpdate) {
        if (driverTruckData.maintenanceReportHold !== undefined) {
          setMaintenanceReportHold(driverTruckData.maintenanceReportHold);
        }
        if (driverTruckData.maintenanceReportHoldDate !== undefined) {
          setMaintenanceReportHoldDate(driverTruckData.maintenanceReportHoldDate);
        }
        if (driverTruckData.nextMaintenanceReport !== undefined) {
          setNextMaintenanceReportDue(driverTruckData.nextMaintenanceReport);
        }
        if (driverTruckData.maintenanceReportHoldReason !== undefined) {
          setMaintenanceReportHoldReason(driverTruckData.maintenanceReportHoldReason || "");
        }
        if (driverTruckData.lastMaintenanceReport !== undefined) {
          setLastMaintenanceReport(driverTruckData.lastMaintenanceReport || "");
        }
        if (driverTruckData.leftFrontTireSize !== undefined) {
          setFrontLeft(driverTruckData.leftFrontTireSize?.trim() || "");
        }
        if (driverTruckData.rightFrontTireSize !== undefined) {
          setFrontRight(driverTruckData.rightFrontTireSize?.trim() || "");
        }
        if (driverTruckData.leftRearOutsideTireSize !== undefined) {
          setRearOutsideLeft(driverTruckData.leftRearOutsideTireSize?.trim() || "");
        }
        if (driverTruckData.rightRearOutsideTireSize !== undefined) {
          setRearOutsideRight(driverTruckData.rightRearOutsideTireSize?.trim() || "");
        }
        if (driverTruckData.leftRearInsideTireSize !== undefined) {
          setRearInsideLeft(driverTruckData.leftRearInsideTireSize?.trim() || "");
        }
        if (driverTruckData.rightRearInsideTireSize !== undefined) {
          setRearInsideRight(driverTruckData.rightRearInsideTireSize?.trim() || "");
        }
      }
    }
  }, [driverTruckData]);

  useEffect(() => {
    if (
      nextmaintenancereportdue &&
      frontleft &&
      frontright &&
      rearoutsideleft &&
      rearoutsideright &&
      isMaintenanceReportHoldDateValidation &&
      lastMaintenanceReportValidation &&
      nextMaintenanceReportDueValidation &&
      isLastMaintenanceReportValid
    ) {
      dispatch(setIsMaintenanceTabValid(true));
    } else {
      dispatch(setIsMaintenanceTabValid(false));
    }
  }, [
    nextmaintenancereportdue,
    frontleft,
    frontright,
    rearoutsideleft,
    rearoutsideright,
    isMaintenanceReportHoldDateValidation,
    lastMaintenanceReportValidation,
    nextMaintenanceReportDueValidation,
    isLastMaintenanceReportValid,
  ]);

  const handleMaintenanceReportHoldChange = (e) => {
    const isChecked = e.target.checked;
    setMaintenanceReportHold(isChecked);
    if (!isChecked) {
      setMaintenanceReportHoldDate("");
      setMaintenanceReportHoldReason("");
    }
  };

  return (
    <div className="p-0 w-100">
      <Row className="m-0 p-0">
        <Col sm={5} md={5} lg={5} xl={5} xs={5} style={{ minWidth: "750px" }}>
          <Form.Group className="form-group m-t-5 form-group m-t-5 align-items-center row m-l-0 m-r-0 mb-3">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Last Maintenance Report"}</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className={`p-0 `} style={{ width: "100px" }}>
              <DateInputField
                name="lastMaintenanceReport"
                date={lastmaintenancereport}
                reduxSetDate={(value) => setLastMaintenanceReport(value)}
                max={
                  nextmaintenancereportdue
                    ? new Date(parseLocalDate(formatDatetimeToDate(nextmaintenancereportdue)) - 24 * 60 * 60 * 1000)
                    : ""
                }
                setDate={setLastMaintenanceReport}
                setIsDateValid={setIsLastMaintenanceReportValid}
                disabled={viewDetails || id == null}
                className={`customFormControl  ${
                  !viewDetails ? (isLastMaintenanceReportValid ? "" : "borderRed") : ""
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Next Maintenance Report Due"}</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-95px">
              <DateInputField
                name="nextMaintenanceReportDue"
                date={nextmaintenancereportdue}
                reduxSetDate={(value) => setNextMaintenanceReportDue(value)}
                min={
                  lastmaintenancereport
                    ? new Date(parseLocalDate(lastmaintenancereport).getTime() + 24 * 60 * 60 * 1000)
                    : ""
                }
                setDate={setNextMaintenanceReportDue}
                setIsDateValid={setNextMaintenanceReportDueValidation}
                disabled={viewDetails}
                className={`customFormControl  ${
                  !viewDetails
                    ? nextmaintenancereportdue && nextMaintenanceReportDueValidation
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Maintenance Report Hold"}</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 `}
                id="maintenancereporthold"
                name="maintenancereporthold"
                onChange={handleMaintenanceReportHoldChange}
                checked={maintenancereporthold}
                value={maintenancereporthold}
                disabled={viewDetails}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {"Maintenance Report Hold Date"}
              </Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-95px">
              <DateInputField
                date={maintenancereportholddate}
                setDate={setMaintenanceReportHoldDate}
                setIsDateValid={setIsMaintenanceReportHoldDateValidation}
                disabled={viewDetails || !maintenancereporthold}
                value={maintenancereportholddate}
                className={`customFormControl  ${
                  !viewDetails ? (isMaintenanceReportHoldDateValidation ? "" : "borderRed") : ""
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label" />
              {"Maintenance Report Hold Reason"}
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0">
              <textarea
                rows={4}
                cols={5}
                type="text"
                style={{
                  resize: "none",
                  display: "fixed",
                  minHeight: "25px",
                  minWidth: "50px",
                  maxWidth: "450px",
                  boxShadow: "none",
                  fontSize: "12px",
                }}
                className="customFormControl h-100"
                name="holdReason"
                autoComplete="off"
                aria-autocomplete="list"
                value={maintenancereportholdreason}
                onInput={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setMaintenanceReportHoldReason(cleaned);
                }}
                disabled={viewDetails || !maintenancereporthold}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0"></Col>
            <Col xs={4} sm={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Tire Sizes"}</Form.Label>
            </Col>
          </Form.Group>

          <Form.Group className="mt-1 form-group align-items-center row m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0"></Col>
            <Col xs={1} sm={1} className="p-0">
              <Form.Label className="col-form-label dealer-label">Left</Form.Label>
            </Col>
            <Col xs={3} sm={3} className="p-0 ms-4">
              <Form.Label className="col-form-label dealer-label ">Right</Form.Label>
            </Col>
          </Form.Group>

          <Form.Group className="mt-1 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={1} sm={1} className="p-0">
              {" "}
            </Col>
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Front"}</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "70pX" }}>
              <Input
                className={`customFormControl ${
                  viewDetails ? "" : frontleft.length >= 1 ? "borderGreen" : "borderRed"
                }`}
                type="text"
                disabled={viewDetails}
                maxLength={12}
                value={frontleft}
                onChange={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setFrontLeft(cleaned);
                }}
              />
            </Col>

            <Col xs={1} md={1} sm={1} className="p-10" style={{ width: "90pX" }}>
              <Input
                className={`customFormControl ${
                  viewDetails ? "" : frontright.length >= 1 ? "borderGreen" : "borderRed"
                }`}
                type="text"
                maxLength={12}
                disabled={viewDetails}
                value={frontright}
                onChange={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setFrontRight(cleaned);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-1 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={1} sm={1} className="p-0"></Col>
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Rear Outside"} </Form.Label>{" "}
            </Col>
            <Col xs={1} md={1} lg={1} sm={1} className="p-0" style={{ width: "70pX" }}>
              <Input
                type="text"
                className={`customFormControl ${
                  viewDetails ? "" : rearoutsideleft.length >= 1 ? "borderGreen" : "borderRed"
                }`}
                name="rearoutside"
                maxLength={12}
                disabled={viewDetails}
                value={rearoutsideleft}
                onChange={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setRearOutsideLeft(cleaned);
                }}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-10" style={{ width: "90pX" }}>
              <Input
                className={`customFormControl ${
                  viewDetails ? "" : rearoutsideright.length >= 1 ? "borderGreen" : "borderRed"
                }`}
                name="rearoutsideright"
                type="text"
                maxLength={12}
                disabled={viewDetails}
                value={rearoutsideright}
                onChange={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setRearOutsideRight(cleaned);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={1} sm={1} className="p-0"></Col>
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Rear Inside"}</Form.Label>
            </Col>

            <Col xs={1} md={1} lg={1} sm={1} className="p-0" style={{ width: "70pX" }}>
              <Input
                type="text"
                className={`customFormControl`}
                name="rearinside"
                maxLength={12}
                disabled={viewDetails}
                value={rearinsideleft}
                onChange={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setRearInsideLeft(cleaned);
                }}
              />
            </Col>

            <Col xs={1} md={1} sm={1} className="p-10" style={{ width: "90pX" }}>
              <Input
                className={`customFormControl`}
                name=""
                type="text"
                maxLength={12}
                disabled={viewDetails}
                value={rearinsideright}
                onChange={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setRearInsideRight(cleaned);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Maintenance;
