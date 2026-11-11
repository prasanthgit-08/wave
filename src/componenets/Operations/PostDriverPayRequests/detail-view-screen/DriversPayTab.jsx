import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import { useParams } from "react-router-dom";
import PostpayRequestService from "../../../../services/PostpayRequestService";
import { useDispatch, useSelector } from "react-redux";
import { setChargeDPM, setReimbursementData } from "../../../../redux/PostPayRequestSlice";
import { useStateManager } from "react-select";
import LoadingIcon from "../../../common/LoadingIcon";

const DriversPayTab = () => {
  const { id } = useParams();
  const [driverPayData, setDriverPayData] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const [isChargeDPMEditable, setIsChargeDPMEditable] = useState(false);
  const chargeDPM = useSelector((state) => state.postPayRequestSlice.chargeDPM);

  useEffect(() => {
    if (id) {
      fetchDriverPayDetails();
    }
  }, [id]);

  useEffect(() => {
    const other1 = parseFloat(driverPayData?.OtherAmount1 || 0);
    const other2 = parseFloat(driverPayData?.OtherAmount2 || 0);
    const sum = other1 + other2;

    setIsChargeDPMEditable(sum > 0);
    if (sum === 0) {
      dispatch(setChargeDPM("0"));
    }
  }, [driverPayData?.OtherAmount1, driverPayData?.OtherAmount2]);

  const fetchDriverPayDetails = async () => {
    setLoader(true);
    try {
      const response = await PostpayRequestService.getDriverPayRequestDetails(id);
      setDriverPayData(response[0]);
      dispatch(setReimbursementData(response[0]));
    } catch (error) {
      console.error("Error fetching driver pay details:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleChargeDPMChange = (e) => {
    const value = e.target.value;

    // Allow only positive numbers and zero
    if (value === "" || value === "0") {
      dispatch(setChargeDPM(value));
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        dispatch(setChargeDPM(value));
      }
    }
  };

  return (
    <div className="p-0 w-100">
      {loader && <LoadingIcon />}
      <Row className="m-0 p-20">
        <Col xs={12}>
          <Form.Group className="mb-2 mt-1 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Unit Number</Form.Label>
            </Col>

            <Col xs={3} className="p-0">
              <input
                type="text"
                value={driverPayData?.UnitNumber || ""}
                maxLength={30}
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </Col>
          </Form.Group>

          {/* Empty Tag for styling */}
          <Form.Group className="mb-3 align-items-center invisible row m-l-0 m-r-0">
            <Col xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={6} className="p-0"></Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Down Time Hours</Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                value={driverPayData?.DowntimeHours ?? 0}
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </Col>
            <Col xs={1} className="">
              <Form.Label className="customColFormLabel">Rate per Hour</Form.Label>
            </Col>
            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                value={driverPayData?.DowntimeRate ?? 0}
                className={`customFormControl`}
                disabled
              />
            </Col>
            <Col xs={1} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Total</Form.Label>
            </Col>
            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={driverPayData?.DowntimeAmount ?? 0}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Additional Miles</Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={driverPayData?.AdditionalMiles ?? 0}
                disabled
              />
            </Col>
            <Col xs={1} className="">
              <Form.Label className="customColFormLabel">Rate per Mile</Form.Label>
            </Col>
            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={driverPayData?.MileageRate ?? 0}
                disabled
              />
            </Col>
            <Col xs={1} className="text-end">
              <Form.Label className="customColFormLabel pe-3">Total</Form.Label>
            </Col>
            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={driverPayData?.MileageAmount ?? 0}
                disabled
              />
            </Col>
          </Form.Group>

          {driverPayData?.RecruitingBonus && (
            <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
              <Col xs={2} className="p-0">
                <Form.Label className={`customColFormLabel`}>Recruiting Bonus</Form.Label>
              </Col>

              <Col xs={1} className="p-0">
                <input
                  type="text"
                  maxLength={30}
                  className={`customFormControl`}
                  value={driverPayData?.RecruitingBonusAmount ?? 0}
                  disabled
                />
              </Col>

              <Col xs={1} className="p-0"></Col>
              <Col xs={2} className="text-end">
                <Form.Label className="customColFormLabel pe-3">Recruited Driver</Form.Label>
              </Col>
              <Col xs={1} className="p-0 d-flex w-300 col-md-6 col-sm-6 col-6">
                <input
                  type="text"
                  maxLength={30}
                  className={`customFormControl`}
                  value={driverPayData?.RecruitedDriver ?? 0}
                  disabled
                />
              </Col>
            </Form.Group>
          )}

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Shuttle</Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={driverPayData?.ShuttleAmount ?? 0}
                disabled
              />
            </Col>
            <Col xs={2} className="" style={{ width: "100px" }}>
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={7} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                className={`customFormControl`}
                value={driverPayData?.ShuttleDescription || ""}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Other #1</Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                value={driverPayData?.OtherAmount1 ?? 0}
                className={`customFormControl`}
                disabled
              />
            </Col>
            <Col xs={2} className="" style={{ width: "100px" }}>
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={7} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                value={driverPayData?.OtherAmountDescription1 || ""}
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Other #2</Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={30}
                className={`customFormControl`}
                value={driverPayData?.OtherAmount2 ?? 0}
                disabled
              />
            </Col>
            <Col xs={2} className="" style={{ width: "100px" }}>
              <Form.Label className="customColFormLabel pe-3">Reason</Form.Label>
            </Col>
            <Col xs={7} className="p-0">
              <input
                name="invoiceTolls"
                id="invoiceTolls"
                type="text"
                value={driverPayData?.OtherAmountDescription2 || ""}
                className={`customFormControl`}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Charge DPM</Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                type="text"
                maxLength={8} // 5 digits + decimal point + 2 decimal places = 8
                className={`customFormControl ${isChargeDPMEditable ? "" : ""}`}
                value={chargeDPM}
                onChange={(e) => {
                  const value = e.target.value;

                  // Regular expression to match the pattern: max 5 digits before decimal, exactly 2 after
                  const regex = /^\d{0,5}(\.\d{0,2})?$/;

                  if (regex.test(value)) {
                    dispatch(setChargeDPM(value));
                  }
                }}
                onBlur={(e) => {
                  // Format number on blur to ensure 2 decimal places
                  const value = e.target.value;
                  if (value && value !== "0") {
                    // If there's a decimal point, ensure 2 decimal places
                    if (value.includes(".")) {
                      const [whole, decimal] = value.split(".");
                      dispatch(setChargeDPM(`${whole}.${(decimal || "").padEnd(2, "0")}`));
                    } else {
                      // If no decimal point, add .00
                      dispatch(setChargeDPM(`${value}.00`));
                    }
                  }
                }}
                disabled={!isChargeDPMEditable}

                onKeyPress={(e) => {
                  // Prevent entering more than 5 digits before decimal
                  const value = e.target.value;
                  const [whole, decimal] = value.split(".");

                  // Allow only numbers and one decimal point
                  if (!/[\d.]/.test(e.key)) {
                    e.preventDefault();
                    return;
                  }

                  // Prevent multiple decimal points
                  if (e.key === "." && value.includes(".")) {
                    e.preventDefault();
                    return;
                  }

                  // Check whole number length
                  if (!value.includes(".") && whole.length >= 5 && e.key !== ".") {
                    e.preventDefault();
                    return;
                  }

                  // Check decimal places
                  if (decimal && decimal.length >= 2) {
                    e.preventDefault();
                    return;
                  }
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-1 align-items-center row m-l-0 m-r-0">
            <Col xs={2} className="p-0 d-flex align-self-start">
              <Form.Label className={`customColFormLabel`}>Notes</Form.Label>
            </Col>

            <Col xs={9} className="p-0">
              <textarea
                name="driverPay"
                id="driverPay"
                style={{ width: "100%" }}
                value={driverPayData?.Notes || ""}
                disabled
                rows="9"
                className={`customFocusClass `}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default DriversPayTab;
