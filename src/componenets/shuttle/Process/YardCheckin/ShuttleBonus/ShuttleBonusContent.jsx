import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Form } from "react-bootstrap";
import {
  setShuttleAmountForShuttleBonus,
  setReasonForShuttleBonus,
  setSavedSuccessForShuttleBonus,
} from "../../../../../redux/YardCheckinSlice";

function ShuttleBonusContent() {
  //Dispatch, navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Local State Declaration
  const [selectedDriverName, setSelectedDriverName] = useState("");
  const [selectedUnitNumber, setSelectedUnitNumber] = useState("");
  const [selectedUnitSpecialCode, setSelectedUnitSpecialCode] = useState("");
  const [shuttleAmount, setShuttleAmount] = useState("");
  const [reason, setReason] = useState("");

  //Get Value From Redux
  const selectedDriverData = useSelector((state) => state.yardCheckinReducer.selectedDriver);
  const unitNumberSelected = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const specialCodeOfSelectedUnit = useSelector(
    (state) => state.yardCheckinReducer.specialCodeOfSelectedUnit
  );
  const savedSuccessForShuttleBonus = useSelector(
    (state) => state.yardCheckinReducer.savedSuccessForShuttleBonus
  );

  /*** UseEffects ***/
  // UseEffect for setting selected Driver Name in local state
  useEffect(() => {
    if (selectedDriverData) {
      const fullName = `${selectedDriverData.firstName ? selectedDriverData.firstName?.trim() : ""} ${
        selectedDriverData.lastName ? selectedDriverData.lastName?.trim() : ""
      }`;
      setSelectedDriverName(fullName?.trim());
    }
  }, [selectedDriverData]);

  //UseEffect for setting selected Unit Number and Special Code
  useEffect(() => {
    if (unitNumberSelected || specialCodeOfSelectedUnit) {
      setSelectedUnitNumber(unitNumberSelected);
      setSelectedUnitSpecialCode(specialCodeOfSelectedUnit);
    }
  }, [unitNumberSelected, specialCodeOfSelectedUnit]);

  //Dispatch local state in redux
  useEffect(() => {
    dispatch(setShuttleAmountForShuttleBonus(shuttleAmount));
    dispatch(setReasonForShuttleBonus(reason));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuttleAmount, reason]);

  // On page refresh navigates to initial page
  useEffect(() => {
    if (selectedDriverData === "") {
      navigate("/yard-checkin-driver-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDriverData]);

  useEffect(() => {
    if (unitNumberSelected === "") {
      setSelectedUnitSpecialCode("");
      setShuttleAmount("");
      setReason("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitNumberSelected]);

  useEffect(() => {
    if (savedSuccessForShuttleBonus) {
      navigate("/yard-checkin-unit-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedSuccessForShuttleBonus]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col className="p-15 mt-5 mb-5" xs={7}>
              {/* Driver */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Driver
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    id="selectedDriverName"
                    name="selectedDriverName"
                    value={selectedDriverName}
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>

              {/* Unit Number */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    type="text"
                    value={selectedUnitNumber}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>

              {/* Special Code */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Special Code
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    type="text"
                    value={selectedUnitSpecialCode}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>

              {/* Shuttle Amount */}
              <Form.Group className="mt-5 m-b-10 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Bonus Amount
                  </Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "65px" }}>
                  <input
                    className={`customFormControl ${
                      shuttleAmount === "" || shuttleAmount === "." || shuttleAmount <= 0
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                    name="shuttleAmount"
                    type="text"
                    maxLength={8}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={shuttleAmount || ""}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setShuttleAmount(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>

              {/*Reason For Shuttle Bonus */}
              <Form.Group className="form-group mt-3  align-items-start row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <label className="col-form-label me-4">Reason For Bonus</label>
                </Col>

                <Col xs={6} md={6} className="p-0">
                  <textarea
                    rows={5}
                    cols={20}
                    style={{
                      resize: "none",
                      display: "fixed",
                      minHeight: "120px",
                      minWidth: "450px",
                      boxShadow: "none",
                      fontSize: "12px",
                    }}
                    type="search"
                    className={`customFormControl h-100 textarea-height customFocusClass   ${
                      reason?.trim() === "" ? "borderRed" : "borderGreen"
                    }`}
                    onInput={(e) => {
                      setReason(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShuttleBonusContent;
