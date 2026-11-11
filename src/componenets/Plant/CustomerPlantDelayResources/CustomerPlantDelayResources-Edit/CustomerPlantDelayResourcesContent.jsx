import React, { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import {
  resetChanges,
  resetClose,
  setBreakdown,
  setCheckDescription,
  setDamage,
  setDelay,
  setDescription,
  setEditFormData,
  setNotes,
  setPhone,
  setSaveData,
  setViewDetail,
} from "../../../../redux/CustomerPlantDelaySlice";
import PlantDelayResourcesService from "../../../../services/PlantDelayResourcesService";

const CustomerPlantDelayResourcesContent = () => {
  const params = useParams();
  const delaypk = params.delayPk;
  const plantId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const description = useSelector((state) => state.customerPlantDelayReducer.description);
  const editFormData = useSelector((state) => state.customerPlantDelayReducer.editFormData);
  const phone = useSelector((state) => formatPhoneNumber(state?.customerPlantDelayReducer?.phone));
  const delay = useSelector((state) => state.customerPlantDelayReducer.delay);
  const breakdown = useSelector((state) => state.customerPlantDelayReducer.breakdown);
  const damage = useSelector((state) => state.customerPlantDelayReducer.damage);
  const notes = useSelector((state) => state.customerPlantDelayReducer.notes);
  const viewDetail = useSelector((state) => state.customerPlantDelayReducer.viewDetail);
  const changesCancelled = useSelector((state) => state.customerPlantDelayReducer.changesCancelled);
  const checkDescription = useSelector((state) => state.customerPlantDelayReducer.checkDescription);
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setPhone(formattedPhoneNumber));
  };

  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (delaypk) fetchRecordById(delaypk);
  }, [delaypk]);

  const fetchRecordById = (delaypk) => {
    setLoad(true);
    PlantDelayResourcesService.getPlantDelayResourcesById(delaypk)
      .then((response) => {
        setLoad(false);
        const { data } = response;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
        dispatch(resetClose());
        navigate(
          "/customer-plant-delay-resources/" + params.customerId + "/" + params.id + "/" + params.pageNumber
        );
      });
  };

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setDescription(editFormData.description ? editFormData.description?.trim() : ""));
      dispatch(setDamage(editFormData.damage ? editFormData.damage : ""));
      dispatch(setBreakdown(editFormData.breakdown ? editFormData.breakdown : ""));
      dispatch(setDelay(editFormData.delay ? editFormData.delay : ""));
      dispatch(setPhone(editFormData.phone ? editFormData.phone : ""));

      dispatch(setNotes(editFormData.notes ? editFormData.notes : ""));
      dispatch(setCheckDescription());
    }
  }, [editFormData, changesCancelled]);
  useEffect(() => {
    if (editFormData === null || editFormData === undefined) {
      dispatch(resetChanges());
    }
  }, [editFormData]);

  const getData = () => {
    dispatch(
      setSaveData({
        customerDelayResourcePK: delaypk,
        description: description,
        damage: damage,
        delay: delay,
        phone: phone.replace(/\s+/g, ""),
        breakdown: breakdown,
        notes: notes,
        customerPlantFK: plantId,
      })
    );
  };
  useEffect(() => {
    getData();
  }, [description, damage, delay, breakdown, delaypk, phone, notes, plantId]);

  const checkDescriptionExist = (description) => {
    PlantDelayResourcesService.checkdescriptionExist(description, delaypk, plantId)
      .then((res) => {
        dispatch(setCheckDescription(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const phoneLenght = 14;
  const validationSchema = yup.object({
    description: yup.string().required(),
    phone: yup.string().matches(phoneRegex),
  });
  return (
    <Formik
      initialValues={{
        description,
        phone,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        description: true,
        phone: true,
      }}
    >
      {(formik) => (
        <div className="w-100 p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              <div className="p-15 w-100">
                <Row className="m-0 p-0 mt-3 ">
                  <Col lg={6} md={6} sm={6} xs={6} className="mt-3">
                    <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0 ">
                      <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Description
                        </Form.Label>
                      </Col>

                      <Col xs={8} md={8} sm={8} className="p-0">
                        <input
                          name={description}
                          type="text"
                          className={`${QuarterScreen.formControl} ${
                            viewDetail === true
                              ? ""
                              : formik.errors.description === undefined && description.length >= 1
                                ? checkDescription
                                  ? "borderRed"
                                  : "borderGreen"
                                : "borderRed"
                          }`}
                          maxLength={30}
                          id="description"
                          value={description}
                          disabled={viewDetail}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          onChange={(e) => {
                            dispatch(setDescription(e.target.value.replace(/^\s+/g, "")));
                            dispatch(setCheckDescription(""));
                          }}
                          onBlur={(e) => {
                            if (e.target.value) {
                              checkDescriptionExist(e.target.value);
                            }
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 form-group m-b-20 align-items-center row m-l-0 m-r-0">
                      <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Phone
                        </Form.Label>
                      </Col>

                      <Col xl={3} lg={3} md={3} sm={3} xs={3} className="p-0">
                        <input
                          type="text"
                          className={`${QuarterScreen.formControl} ${
                            viewDetail === true
                              ? ""
                              : formik.errors.phone === undefined && phone != null && phone.length > 1
                                ? ""
                                : formik.errors.phone !== undefined
                                  ? "borderRed"
                                  : ""
                          }`}
                          id="phone"
                          name="phone"
                          value={phone}
                          maxLength={phoneLenght}
                          disabled={viewDetail}
                          onChange={(e) => phoneFormatHandler(e)}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          onInput={(e) => {
                            // formik.handleChange(e);
                            dispatch(setPhone(e.target.value));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 form-group m-b-20 align-items-center row m-l-0 m-r-0">
                      <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Delay
                        </Form.Label>
                      </Col>

                      <Col xs={6} md={6} sm={5} className="p-0">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${
                            delay || damage || breakdown ? "" : "borderRed"
                          }`}
                          id="delay"
                          name="delay"
                          checked={delay}
                          disabled={viewDetail}
                          onChange={(e) => {
                            dispatch(setDelay(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 form-group m-b-20 align-items-center row m-l-0 m-r-0">
                      <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Breakdown
                        </Form.Label>
                      </Col>

                      <Col xs={6} md={6} sm={5} className="p-0">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${
                            delay || damage || breakdown ? "" : "borderRed"
                          }`}
                          id="breakdown"
                          name="breakdown"
                          disabled={viewDetail}
                          checked={breakdown}
                          onChange={(e) => {
                            dispatch(setBreakdown(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 form-group m-b-20 align-items-center row m-l-0 m-r-0">
                      <Col xl={3} lg={3} md={3} xs={3} sm={3} className="p-0">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Damage
                        </Form.Label>
                      </Col>

                      <Col xs={6} md={6} sm={5} className="p-0">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${
                            delay || damage || breakdown ? "" : "borderRed"
                          }`}
                          id="damage"
                          checked={damage}
                          disabled={viewDetail}
                          name="damage"
                          onChange={(e) => {
                            dispatch(setDamage(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <Form.Group className=" form-group  m-b-20 align-items-center m-l-0 m-r-0">
                      <Col xl={2} lg={3} md={3} xs={5} sm={3} className="p-0">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label} m-b-15`}>
                          Notes
                        </Form.Label>
                      </Col>

                      <div xl={12} lg={12} md={12} sm={12} xs={12} className="p-0">
                        <textarea
                          name="notes"
                          className="col-12 h-250px "
                          style={{ borderRadius: "0.25rem" }}
                          id="notes"
                          disabled={viewDetail}
                          cols="30"
                          rows="20"
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          value={notes}
                          onChange={(e) => {
                            dispatch(setNotes(e.target.value.replace(/^\s+/g, "")));
                          }}
                        ></textarea>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              {load && (
                <div className="fade modal-backdrop show">
                  {" "}
                  <div className="pos-center">
                    {" "}
                    <div className="loader"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
export default CustomerPlantDelayResourcesContent;
