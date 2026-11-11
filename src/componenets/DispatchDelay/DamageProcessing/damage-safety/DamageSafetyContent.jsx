import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DateInputField from "../../../common/DateInputField";
import {
  setAdjustBondTotal,
  setAdjustSafetyMiles,
  setBondTotal,
  setDeductAllSafetyMiles,
  setDelayDamageValue,
  setMilesToDeduct,
  setNextSafetySchoolDate,
  setNextSmartSimulatorDate,
  setReleaseReserve,
  setRequireAttendSafetySchool,
  setRequireAttendSmartSimulator,
  setReserve,
  setSaveData,
  setSaveFlag,
} from "../../../../redux/DelayDamageSafetySlice";
import DelayDamageService from "../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";

const DamageSafetyContent = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    delayDamageValue,
    adjustSafetyMiles,
    deductAllSafetyMiles,
    milesToDeduct,
    bondTotal,
    reserve,
    releaseReserve,
    requireAttendSafetySchool,
    nextSafetySchoolDate,
    requireAttendSmartSimulator,
    nextSmartSimulatorDate,
    adjustBondTotal,
    damageSafetyFlag,
  } = useSelector((state) => state.delayDamageSafetyReducer);

  const [nextSafetySchoolDateValid, setNextSafetySchoolDateValid] = useState(true);
  const [nextSmartSimulatorDateValid, setNextSmartSimulatorDateValid] = useState(true);

  // to backend
  const setData = () => {
    dispatch(
      setSaveData({
        delayDamageUnitPK: parseInt(id, 10),

        driverId: delayDamageValue?.DriverFK || "",

        currentMiles: parseInt(delayDamageValue?.Safetymiles, 10) || "",

        bondTotal: bondTotal ? parseFloat(bondTotal) : null,

        releaseReserve: releaseReserve,

        nextSafetySchoolDate: nextSafetySchoolDate || null,

        nextSmartSimulatorDate: nextSmartSimulatorDate || null,

        milesToDeduct: delayDamageValue?.LostSafetyMiles > 0 ? null : parseInt(milesToDeduct, 10),
      })
    );
  };

  useEffect(() => {
    setData();
  }, [
    delayDamageValue,
    milesToDeduct,
    bondTotal,
    releaseReserve,
    reserve,
    id,
    nextSafetySchoolDate,
    nextSmartSimulatorDate,
  ]);

  const isNumber = (value) => {
    if (!value) return value;
    const number = value?.replace(/[^\d]/g, "");
    if (value) return number;
  };
  const isDecimalNumber = (value) => {
    if (!value) return value;
    const number = value?.replace(/[^\d:.]/g, "");

    if (value) return number;
  };

  useEffect(() => {
    DelayDamageService.getDelayDamageInformation(id)
      .then((response) => {
        const data = response?.data?.delayUnitDamageDetails[0];
        dispatch(setDelayDamageValue(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //save valiadtion
  useEffect(() => {
    const noAdjustments =
      !adjustSafetyMiles &&
      !deductAllSafetyMiles &&
      !adjustBondTotal &&
      !requireAttendSafetySchool &&
      !requireAttendSmartSimulator &&
      !releaseReserve;

    if (noAdjustments) {
      dispatch(setSaveFlag(true)); // All unchecked --> Save disabled
    } else if (
      (!adjustSafetyMiles ||
        (adjustSafetyMiles && milesToDeduct && milesToDeduct <= delayDamageValue?.Safetymiles)) &&
      (!deductAllSafetyMiles || (deductAllSafetyMiles && milesToDeduct)) &&
      (!adjustBondTotal || (adjustBondTotal && bondTotal)) &&
      (!requireAttendSafetySchool ||
        (requireAttendSafetySchool && nextSafetySchoolDate && nextSafetySchoolDateValid)) &&
      (!requireAttendSmartSimulator ||
        (requireAttendSmartSimulator && nextSmartSimulatorDate && nextSmartSimulatorDateValid))
    ) {
      dispatch(setSaveFlag(false)); // All required fields filled --> Save enabled
    } else {
      dispatch(setSaveFlag(true)); // Missing required fields --> Save disabled
    }
  }, [
    adjustSafetyMiles,
    milesToDeduct,
    deductAllSafetyMiles,
    adjustBondTotal,
    bondTotal,
    delayDamageValue,
    requireAttendSafetySchool,
    nextSafetySchoolDate,
    nextSafetySchoolDateValid,
    requireAttendSmartSimulator,
    nextSmartSimulatorDate,
    nextSmartSimulatorDateValid,
    releaseReserve,
    dispatch,
  ]);

  useEffect(() => {
    if (!damageSafetyFlag) {
      navigate("/damage-processing/view-damage/" + id);
    }
  }, [damageSafetyFlag]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="mt-2 mx-3">
              <Col xs={6}>
                <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Current Miles</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className={`p-0 d-flex`}>
                    <input
                      className={`customFormControl`}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={delayDamageValue?.Safetymiles}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Adjust Safety Miles</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      disabled={deductAllSafetyMiles || delayDamageValue?.LostSafetyMiles > 0}
                      checked={adjustSafetyMiles}

                      onChange={(e) => {
                        const value = e.target.checked;
                        dispatch(setAdjustSafetyMiles(value));

                        if (value) {
                          dispatch(setDeductAllSafetyMiles(false));

                          const damageAmount = delayDamageValue?.DamageAmount || 0;
                          const currentMiles = delayDamageValue?.Safetymiles || 0;
                          let mtd = 0;

                          if (damageAmount < 2500) {
                            mtd = currentMiles < 75000 ? currentMiles : 75000;
                          } else if (damageAmount >= 2500 && damageAmount < 5000) {
                            mtd = currentMiles < 100000 ? currentMiles : 100000;
                          } else if (damageAmount >= 5000 && damageAmount < 7500) {
                            mtd = currentMiles < 150000 ? currentMiles : 150000;
                          } else if (damageAmount >= 7500) {
                            mtd = currentMiles;
                          }

                          dispatch(setMilesToDeduct(mtd));
                        } else {
                          dispatch(setMilesToDeduct(""));
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Deduct All Safety Miles</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      disabled={adjustSafetyMiles || delayDamageValue?.LostSafetyMiles > 0}
                      checked={deductAllSafetyMiles}
                      onChange={(e) => {
                        const value = e.target.checked;
                        dispatch(setDeductAllSafetyMiles(value));
                        if (value) {
                          dispatch(setMilesToDeduct(delayDamageValue?.Safetymiles));
                          dispatch(setAdjustSafetyMiles(false));
                        } else if (!value) {
                          dispatch(setMilesToDeduct(""));
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Miles To Deduct</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className={`p-0 d-flex`}>
                    <input
                      id="customer"
                      name="customer"
                      type="customer"
                      maxLength={10}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={milesToDeduct}
                      onChange={(e) => {
                        dispatch(setMilesToDeduct(isNumber(e.target.value)));
                      }}
                      disabled={!adjustSafetyMiles || delayDamageValue?.LostSafetyMiles > 0}
                      className={`customFormControl ${
                        !adjustSafetyMiles
                          ? ""
                          : adjustSafetyMiles &&
                              milesToDeduct &&
                              milesToDeduct <= delayDamageValue?.Safetymiles
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0"></Form.Group>
                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Adjust Bond Total</Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      checked={adjustBondTotal}
                      onChange={(e) => {
                        const value = e.target.checked;
                        dispatch(setAdjustBondTotal(value));
                        if (!value) {
                          dispatch(setBondTotal(""));
                        } else {
                          dispatch(setBondTotal(delayDamageValue?.BondTotal));
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Bond Total</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className={`p-0 d-flex`}>
                    <input
                      id="customer"
                      name="customer"
                      type="customer"
                      value={bondTotal}
                      disabled={!adjustBondTotal}
                      maxLength={14}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        e.target.value?.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                          dispatch(setBondTotal(isDecimalNumber(e.target.value)));
                      }}
                      className={`customFormControl ${
                        !adjustBondTotal ? "" : adjustBondTotal && bondTotal ? "borderGreen" : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0"></Form.Group>
                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Reserve</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className={`p-0 d-flex`}>
                    <input
                      className={`customFormControl`}
                      id="customer"
                      name="customer"
                      type="customer"
                      value={delayDamageValue?.ReserveAmount}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Release Reserve</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      checked={releaseReserve}
                      disabled={delayDamageValue?.ReserveAmount <= 0}
                      onChange={(e) => {
                        dispatch(setReleaseReserve(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col xs={6}>
                <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {" "}
                      Require Attend Safety School
                    </Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      checked={requireAttendSafetySchool}
                      onChange={(e) => {
                        const value = e.target.checked;
                        dispatch(setRequireAttendSafetySchool(value));
                        if (value) {
                          dispatch(setNextSafetySchoolDate(new Date()));
                        } else {
                          dispatch(setNextSafetySchoolDate(""));
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Next Safety School Date</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <DateInputField
                      date={nextSafetySchoolDate}
                      reduxSetDate={(value) => {
                        dispatch(setNextSafetySchoolDate(value));
                      }}
                      setIsDateValid={setNextSafetySchoolDateValid}
                      disabled={!requireAttendSafetySchool}
                      min={new Date()}
                      className={`customFormControl ${
                        !requireAttendSafetySchool
                          ? ""
                          : nextSafetySchoolDate && requireAttendSafetySchool && nextSafetySchoolDateValid
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0"></Form.Group>
                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {" "}
                      Require Attend Smart Simulator
                    </Form.Label>
                  </Col>
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <input
                      type="checkbox"
                      checked={requireAttendSmartSimulator}
                      onChange={(e) => {
                        const value = e.target.checked;
                        dispatch(setRequireAttendSmartSimulator(value));
                        if (value) {
                          dispatch(setNextSmartSimulatorDate(new Date()));
                        } else {
                          dispatch(setNextSmartSimulatorDate(""));
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Next Smart Simulator Date</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <DateInputField
                      date={nextSmartSimulatorDate}
                      setIsDateValid={setNextSmartSimulatorDateValid}

                      reduxSetDate={(value) => {
                        dispatch(setNextSmartSimulatorDate(value));
                      }}
                      min={new Date()}
                      disabled={!requireAttendSmartSimulator}
                      className={`customFormControl ${
                        !requireAttendSmartSimulator
                          ? ""
                          : nextSmartSimulatorDate &&
                              nextSmartSimulatorDateValid &&
                              requireAttendSmartSimulator
                            ? "borderGreen"
                            : "borderRed"
                      }`}
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
};

export default DamageSafetyContent;
