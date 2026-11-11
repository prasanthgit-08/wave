import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import {
  setBreakdown,
  setDamage,
  setDelay,
  setDelayedData,
  setDelayedUnitCodePK,
  setDescription,
  setDescriptionValid,
  setEditFormData,
  setRoadType,
  setRoadcondition,
  setSisterDelayCode,
  setSisterDelayCodeValid,
  setViewDetail,
  setWeather,
} from "../../../../../redux/DelayUnitCodesSlice";
import DelayUnitCodesService from "../../../../../services/DelayUnitCodesService";
import { useNavigate, useParams } from "react-router-dom";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import LoadingIcon from "../../../../common/LoadingIcon";
import Input from "../../../../../components/common/input";

const DelayUnitCodesEditContent = () => {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.delayedUnitCodesReducer.description);
  const delay = useSelector((state) => state.delayedUnitCodesReducer.delay);
  const damage = useSelector((state) => state.delayedUnitCodesReducer.damage);
  const breakdown = useSelector((state) => state.delayedUnitCodesReducer.breakdown);
  const weather = useSelector((state) => state.delayedUnitCodesReducer.weather);
  const roadType = useSelector((state) => state.delayedUnitCodesReducer.roadType);
  const roadcondition = useSelector((state) => state.delayedUnitCodesReducer.roadcondition);
  const sisterDelayCode = useSelector((state) => state.delayedUnitCodesReducer.sisterDelayCode);
  const viewDetail = useSelector((state) => state.delayedUnitCodesReducer.viewDetail);
  const changesCancelled = useSelector((state) => state.delayedUnitCodesReducer.changesCancelled);
  const editFormData = useSelector((state) => state.delayedUnitCodesReducer.editFormData);
  const descriptionValid = useSelector((state) => state.delayedUnitCodesReducer.descriptionValid);
  const sisterDelayCodeValid = useSelector((state) => state.delayedUnitCodesReducer.sisterDelayCodeValid);
  const [descriptionError, setDescriptionError] = useState("");
  const [sisterDelayCodeError, setSisterDelayCodeError] = useState("");
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const delayedUnitCodePK = id;
  const navigate = useNavigate();

  const fetchRecordById = (id) => {
    setLoader(true);
    DelayUnitCodesService.getDelayedUnitCodesById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
      })
      .catch((error) => {
        navigate("/delay-unit-codes-listing");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const getDelayedCodes = () => {
    dispatch(
      setDelayedData({
        delayedUnitCodePK: id,
        description: description,
        delay: delay,
        damage: damage,
        breakdown: breakdown,
        weather: weather,
        roadType: roadType,
        roadcondition: roadcondition,
        sisterDelayCode: sisterDelayCode,
      })
    );
  };

  const handleCheckUniqueDescription = (value) => {
    DelayUnitCodesService.checkDescription(value, delayedUnitCodePK)
      .then((res) => {
        if (res.data.length > 0) {
          setDescriptionError(res.data);
          dispatch(setDescriptionValid(false));
        } else {
          setDescriptionError("");
          dispatch(setDescriptionValid(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCheckUniqueSisterCode = (value) => {
    DelayUnitCodesService.checkSisterCode(value, delayedUnitCodePK)
      .then((res) => {
        if (res.data.length > 0) {
          setSisterDelayCodeError(res.data);
          dispatch(setSisterDelayCodeValid(false));
        } else {
          setSisterDelayCodeError("");
          dispatch(setSisterDelayCodeValid(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setDelayedUnitCodePK(""));
      dispatch(setDescription(""));
      dispatch(setDelay(false));
      dispatch(setDamage(false));
      dispatch(setBreakdown(false));
      dispatch(setWeather(false));
      dispatch(setRoadType(false));
      dispatch(setRoadcondition(false));
      dispatch(setSisterDelayCode(""));
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    if (id) {
      fetchRecordById(id);
      handleCheckUniqueDescription();
      handleCheckUniqueSisterCode();
    }
  }, [id, changesCancelled]);

  useEffect(() => {
    getDelayedCodes();
  }, [id, description, delay, damage, breakdown, weather, roadType, roadcondition, sisterDelayCode]);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setDelayedUnitCodePK(editFormData.delayedUnitCodePK || ""));
      dispatch(setDescription(editFormData.description?.trim() || ""));
      dispatch(setDelay(editFormData.delay || false));
      dispatch(setDamage(editFormData.damage || false));
      dispatch(setBreakdown(editFormData.breakdown || false));
      dispatch(setWeather(editFormData.weather || false));
      dispatch(setRoadType(editFormData.roadType || false));
      dispatch(setRoadcondition(editFormData.roadcondition || false));
      dispatch(setSisterDelayCode(editFormData.sisterDelayCode?.trim() || ""));
    }
  }, [editFormData, changesCancelled]);

  const validationSchema = yup.object({
    code: yup.string().required(),
    description: yup.string().required(),
  });

  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={{
        description,
        delay,
        damage,
        breakdown,
        weather,
        roadType,
        roadcondition,
        sisterDelayCode,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        code: true,
        description: true,
      }}
      on={on}
    >
      {(formik) => (
        <div className="w-100 p-2">
          {loader && <LoadingIcon />}
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              <div className="p-15 w-100">
                <Row className="m-0 p-10">
                  <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                    <Form.Group className="form-group m-t-20 align-items-center row  m-l-0 m-r-0 mb-4">
                      <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                        <Form.Label
                          className={`${QuarterScreenTemplate.customColFormLabel} ${QuarterScreenTemplate.customLabel}`}
                        >
                          Description
                        </Form.Label>
                      </Col>
                      <Col xs={5} md={5} sm={5} className="p-0">
                        <input
                          name={description}
                          type="text"
                          className={`${styles.formControl} ${
                            viewDetail === true
                              ? ""
                              : description !== "" && descriptionError.length === 0 && descriptionValid
                                ? "borderGreen"
                                : "borderRed"
                          }`}
                          maxLength={50}
                          id="description"
                          value={description}
                          disabled={viewDetail}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onInput={(e) => {
                            formik.handleChange(e);
                            dispatch(setDescription(e.target.value));
                            setDescriptionError("");
                            dispatch(setDescriptionValid(true));
                          }}
                          onBlur={(e) => {
                            if (e.target.value) {
                              handleCheckUniqueDescription(e.target.value);
                            }
                          }}
                          style={{
                            borderColor:
                              viewDetail === true
                                ? "black"
                                : description !== "" && descriptionError.length === 0 && descriptionValid
                                  ? "green"
                                  : "red",
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className=" form-group m-t-4  align-items-center row  m-l-0 m-r-0 mb-4">
                      <Col xs={3} sm={3} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>Delay</Form.Label>
                      </Col>

                      <Col xs={1} md={6} sm={2} className="p-0 d-flex">
                        <input
                          type="checkbox"
                          className={
                            !viewDetail &&
                            !delay &&
                            !damage &&
                            !breakdown &&
                            !weather &&
                            !roadType &&
                            !roadcondition
                              ? "borderRed form-check-input mt-0"
                              : "form-check-input mt-0"
                          }
                          id="delay"
                          name="delay"
                          value={delay}
                          checked={delay}
                          disabled={viewDetail}
                          onChange={(e) => dispatch(setDelay(e.target.checked))}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className=" form-group m-t-2  align-items-center row  m-l-0 m-r-0 mb-4">
                      <Col xs={3} sm={3} className="p-0  ">
                        <Form.Label className={`${styles.colFormLabel}`}>Damage</Form.Label>
                      </Col>

                      <Col xs={1} md={6} sm={2} className="p-0 d-flex">
                        <input
                          type="checkbox"
                          className={
                            !viewDetail &&
                            !delay &&
                            !damage &&
                            !breakdown &&
                            !weather &&
                            !roadType &&
                            !roadcondition
                              ? "borderRed form-check-input mt-0"
                              : "form-check-input mt-0"
                          }
                          id="damage"
                          name="damage"
                          value={damage}
                          checked={damage}
                          disabled={viewDetail}
                          onChange={(e) => dispatch(setDamage(e.target.checked))}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className=" form-group m-t-2  align-items-center row  m-l-0 m-r-0 mb-4">
                      <Col xs={3} sm={3} className="p-0  ">
                        <Form.Label className={`${styles.colFormLabel}`}>Breakdown</Form.Label>
                      </Col>

                      <Col xs={1} md={6} sm={2} className="p-0 d-flex">
                        <input
                          type="checkbox"
                          className={
                            !viewDetail &&
                            !delay &&
                            !damage &&
                            !breakdown &&
                            !weather &&
                            !roadType &&
                            !roadcondition
                              ? "borderRed form-check-input mt-0"
                              : "form-check-input mt-0"
                          }
                          id="breakdown"
                          name="breakdown"
                          value={breakdown}
                          checked={breakdown}
                          disabled={viewDetail}
                          onChange={(e) => dispatch(setBreakdown(e.target.checked))}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className=" form-group m-t-2  align-items-center row  m-l-0 m-r-0 mb-4">
                      <Col xs={3} sm={3} className="p-0  ">
                        <Form.Label className={`${styles.colFormLabel}`}>Weather</Form.Label>
                      </Col>

                      <Col xs={1} md={6} sm={2} className="p-0 d-flex">
                        <input
                          type="checkbox"
                          className={
                            !viewDetail &&
                            !delay &&
                            !damage &&
                            !breakdown &&
                            !weather &&
                            !roadType &&
                            !roadcondition
                              ? "borderRed form-check-input mt-0"
                              : "form-check-input mt-0"
                          }
                          id="weather"
                          name="weather"
                          value={weather}
                          checked={weather}
                          disabled={viewDetail}
                          onChange={(e) => dispatch(setWeather(e.target.checked))}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className=" form-group m-t-2  align-items-center row  m-l-0 m-r-0 mb-4">
                      <Col xs={3} sm={3} className="p-0  ">
                        <Form.Label className={`${styles.colFormLabel}`}>Road Type</Form.Label>
                      </Col>

                      <Col xs={1} md={6} sm={2} className="p-0 d-flex">
                        <input
                          type="checkbox"
                          className={
                            !viewDetail &&
                            !delay &&
                            !damage &&
                            !breakdown &&
                            !weather &&
                            !roadType &&
                            !roadcondition
                              ? "borderRed form-check-input mt-0"
                              : "form-check-input mt-0"
                          }
                          id="roadType"
                          name="roadType"
                          value={roadType}
                          checked={roadType}
                          disabled={viewDetail}
                          onChange={(e) => dispatch(setRoadType(e.target.checked))}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className=" form-group m-t-2  align-items-center row  m-l-0 m-r-0 mb-4">
                      <Col xs={3} sm={3} className="p-0  ">
                        <Form.Label className={`${styles.colFormLabel}`}>Road Condition</Form.Label>
                      </Col>

                      <Col xs={1} md={6} sm={2} className="p-0 d-flex">
                        <input
                          type="checkbox"
                          className={
                            !viewDetail &&
                            !delay &&
                            !damage &&
                            !breakdown &&
                            !weather &&
                            !roadType &&
                            !roadcondition
                              ? "borderRed form-check-input mt-0"
                              : "form-check-input mt-0"
                          }
                          id="roadcondition"
                          name="roadcondition"
                          value={roadcondition}
                          checked={roadcondition}
                          disabled={viewDetail}
                          onChange={(e) => dispatch(setRoadcondition(e.target.checked))}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group m-t-10 align-items-center row  m-l-0 m-r-0 ">
                      <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                        <Form.Label
                          className={`${QuarterScreenTemplate.customColFormLabel} ${QuarterScreenTemplate.customLabel}`}
                        >
                          Sister Delay Code
                        </Form.Label>
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0 ">
                        <input
                          name={sisterDelayCode}
                          type="text"
                          className={`${styles.formControl} ${
                            viewDetail === true || sisterDelayCode === ""
                              ? ""
                              : sisterDelayCode !== "" &&
                                  sisterDelayCodeError.length === 0 &&
                                  sisterDelayCodeValid
                                ? ""
                                : "borderRed"
                          }`}
                          maxLength={10}
                          id="description"
                          value={sisterDelayCode}
                          disabled={viewDetail}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onInput={(e) => {
                            formik.handleChange(e);
                            dispatch(setSisterDelayCode(e.target.value));
                            setSisterDelayCodeError("");
                            dispatch(setSisterDelayCodeValid(true));
                          }}
                          onBlur={(e) => {
                            if (e.target.value) {
                              handleCheckUniqueSisterCode(e.target.value);
                            }
                          }}
                          style={{
                            borderColor:
                              viewDetail === true || sisterDelayCode === ""
                                ? "black"
                                : sisterDelayCode !== "" &&
                                    sisterDelayCodeError.length === 0 &&
                                    sisterDelayCodeValid
                                  ? ""
                                  : "red",
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
export default DelayUnitCodesEditContent;
