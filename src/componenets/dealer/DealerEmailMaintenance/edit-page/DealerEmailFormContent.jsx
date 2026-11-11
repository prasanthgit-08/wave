/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { Formik } from "formik";

import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  setCheckName,
  setDeliveryOnly,
  setDispatchOnly,
  setDispatchUpdate,
  setEditEmailData,
  setEmail,
  setEmailBOLatDelivery,
  setEmailBolatYardExit,
  setEmailBolDispatch,
  setEmailBolOrderEntry,
  setIsEmailUnique,
  setIsNameUnique,
  setName,
  setSaveFormData,
  setViewDetail,
} from "../../../../redux/DealerEmailSlice";
import DealerEmailMaintenanceService from "../../../../services/DealerEmailMaintenanceService";
import { emailRegex } from "../../../../utils/validation/EmailRegex";
import LoadingIcon from "../../../common/LoadingIcon";

const DealerEmailFormContent = () => {
  const { id, dealerEmailsPK, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const viewDetail = useSelector((state) => state.dealerEmailReducer.viewDetail);
  const name = useSelector((state) => state.dealerEmailReducer.name);
  const email = useSelector((state) => state.dealerEmailReducer.email);
  const dispatchUpdate = useSelector((state) => state.dealerEmailReducer.dispatchUpdate);
  const dispatchOnly = useSelector((state) => state.dealerEmailReducer.dispatchOnly);
  const emailBolOrderEntry = useSelector((state) => state.dealerEmailReducer.emailBolOrderEntry);
  const deliveryOnly = useSelector((state) => state.dealerEmailReducer.deliveryOnly);
  const emailBolDispatch = useSelector((state) => state.dealerEmailReducer.emailBolDispatch);
  const editEmailData = useSelector((state) => state.dealerEmailReducer.editEmailData);
  const changesCancelled = useSelector((state) => state.dealerEmailReducer.changesCancelled);
  const isNameUnique = useSelector((state) => state.dealerEmailReducer.isNameUnique);
  const isEmailUnique = useSelector((state) => state.dealerEmailReducer.isEmailUnique);
  const deleteLoader = useSelector((state) => state.dealerEmailReducer.deleteLoader);

  const emailBOLatDelivery = useSelector((state) => state.dealerEmailReducer.emailBOLatDelivery);
  const emailBolatYardExit = useSelector((state) => state.dealerEmailReducer.emailBolatYardExit);

  const fetchRecordById = (dealerEmailsPK) => {
    dispatch(setViewDetail(true));
    setLoader(true);
    DealerEmailMaintenanceService.getDealerEmailById(dealerEmailsPK)
      .then((response) => {
        const data = response.data;
        dispatch(setEditEmailData(data));
        dispatch(setViewDetail(true));
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        navigate(`/dealer-email-maintenance/${id}`);
        console.log(err);
      });
  };
  useEffect(() => {
    if (editEmailData === undefined || editEmailData === null || editEmailData === "") {
      dispatch(setName(""));
      dispatch(setEmail(""));
      dispatch(setDispatchOnly(""));
      dispatch(setDeliveryOnly(""));
      dispatch(setDispatchUpdate(""));
      dispatch(setEmailBolOrderEntry(""));
      dispatch(setEmailBolDispatch(""));
      dispatch(setEmailBOLatDelivery(""));
      dispatch(setEmailBolatYardExit(""));
    }
  }, [editEmailData]);

  const hanldeCheckForm = (name) => {
    if (name) {
      DealerEmailMaintenanceService.checkNameExist(id, dealerEmailsPK, name)
        .then((res) => {
          dispatch(setIsNameUnique(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const hanldeCheckEmail = (email) => {
    if (email) {
      DealerEmailMaintenanceService.checkEmailExist(id, dealerEmailsPK, email)
        .then((res) => {
          dispatch(setIsEmailUnique(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (editEmailData != null) {
      dispatch(setName(editEmailData.name ? editEmailData.name?.trim() : ""));
      dispatch(setEmail(editEmailData.email ? editEmailData.email?.trim() : ""));
      dispatch(setDispatchOnly(editEmailData.dispatchOnly ? editEmailData.dispatchOnly : ""));
      dispatch(setDeliveryOnly(editEmailData.deliveryOnly ? editEmailData.deliveryOnly : ""));
      dispatch(setDispatchUpdate(editEmailData.dispatchUpdate ? editEmailData.dispatchUpdate : ""));
      dispatch(
        setEmailBolOrderEntry(editEmailData.emailBolOrderEntry ? editEmailData.emailBolOrderEntry : false)
      );
      dispatch(setEmailBolDispatch(editEmailData.emailBolDispatch ? editEmailData.emailBolDispatch : ""));

      dispatch(setEmailBOLatDelivery(editEmailData.emailBOLDelivery ? editEmailData.emailBOLDelivery : ""));
      dispatch(setEmailBolatYardExit(editEmailData.emailBOLYardExit ? editEmailData.emailBOLYardExit : ""));
    }
  }, [editEmailData, changesCancelled]);

  useEffect(() => {
    if (dealerEmailsPK) fetchRecordById(dealerEmailsPK);
  }, [dealerEmailsPK]);

  const getDealerEmailData = () => {
    dispatch(
      setSaveFormData({
        dealerFK: id,
        dealerEmailsPK: dealerEmailsPK,
        name: name,
        email: email,
        dispatchOnly: dispatchOnly,
        deliveryOnly: deliveryOnly,
        dispatchUpdate: dispatchUpdate,
        emailBolOrderEntry: emailBolOrderEntry,
        emailBolDispatch: emailBolDispatch,
        emailBOLDelivery: emailBOLatDelivery,
        emailBOLYardExit: emailBolatYardExit,
      })
    );
  };

  const getCheckboxClass = (isChecked) => {
    if (viewDetail) {
      return "black";
    }
    const allUnchecked =
      !dispatchUpdate &&
      !dispatchOnly &&
      !deliveryOnly &&
      !emailBolOrderEntry &&
      !emailBolDispatch &&
      !emailBolatYardExit &&
      !emailBOLatDelivery;

    if (allUnchecked) {
      return "borderRed";
    }
    return isChecked ? "borderGreen" : "black";
  };
  useEffect(() => {
    getDealerEmailData();
  }, [
    dealerEmailsPK,
    name,
    email,
    dispatchOnly,
    deliveryOnly,
    dispatchUpdate,
    emailBolOrderEntry,
    emailBolDispatch,
    emailBOLatDelivery,
    emailBolatYardExit,
  ]);
  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().matches(emailRegex),
  });
  return (
    <Formik
      initialValues={{
        name,
        email,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        name: true,
        email: true,
      }}
    >
      {(formik) => (
        <div className="w-100 p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-5">
              <div className="p-15 w-100">
                {(loader || deleteLoader) && <LoadingIcon />}
                <Row className="m-0 p-10 m-t-20">
                  <Col xs={8} md={8} sm={8}>
                    <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center justify-content-start row m-l-0 m-r-0">
                      <Col md={1} sm={1} xs={1} className="p-0  me-4">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          {t("edit.AlternateContact.page.resources.tab.name")}
                        </Form.Label>
                      </Col>

                      <Col xs={5} md={5} sm={5} className="p-0">
                        <input
                          type="text"
                          className={`${QuarterScreen.formControl} ${
                            isNameUnique && !viewDetail
                              ? "borderRed"
                              : viewDetail === true
                                ? "black"
                                : formik.errors.name === undefined && name.length > 0
                                  ? "borderGreen"
                                  : formik.errors.name !== undefined
                                    ? "borderRed"
                                    : ""
                          }`}
                          id="name"
                          name="name"
                          autoComplete="off"
                          aria-autocomplete="list"
                          maxLength={30}
                          value={name}
                          disabled={viewDetail}
                          onBeforeInput={(e) => {
                            if (name.length === 0 && /^\s$/.test(e.data)) {
                              e.preventDefault();
                            }
                          }}
                          onBlur={(e) => {
                            hanldeCheckForm(e.target.value);
                          }}
                          onInput={(e) => {
                            formik.handleChange(e);
                            dispatch(setName(e.target.value));
                            dispatch(setIsNameUnique(false));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center justify-content-start row m-l-0 m-r-0">
                      <Col md={1} sm={1} xs={1} className="p-0  me-4">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          {t("edit.AlternateContact.page.resources.tab.email")}
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} sm={7} className="p-0">
                        <input
                          type="text"
                          className={`${QuarterScreen.formControl} ${
                            isEmailUnique && !viewDetail
                              ? "borderRed"
                              : viewDetail === true
                                ? "black"
                                : formik.errors.email === undefined && email.length > 0
                                  ? "borderGreen"
                                  : formik.errors.email !== undefined
                                    ? "borderRed"
                                    : ""
                          }`}
                          id="email"
                          name="email"
                          autoComplete="off"
                          aria-autocomplete="list"
                          maxLength={70}
                          value={email}
                          disabled={viewDetail}
                          onInput={(e) => {
                            formik.handleChange(e);
                            dispatch(setEmail(e.target.value));
                            dispatch(setIsEmailUnique(false));
                          }}
                          onBlur={(e) => {
                            hanldeCheckEmail(e.target.value);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm={3} md={3} xs={3} style={{ Width: "450px" }}>
                    <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
                      <Col md={8} sm={8} xs={8} className="p-0  me-4">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          {t("edit.dealer.email.page.tab.dispatchUpdate")}
                        </Form.Label>
                      </Col>

                      <Col xs={1} md={1} sm={1} className="p-0 d-flex">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${getCheckboxClass(dispatchUpdate)}`}
                          id="dispatchUpdate"
                          name="dispatchUpdate"
                          checked={dispatchUpdate}
                          disabled={viewDetail || deliveryOnly == true || dispatchOnly == true}
                          onChange={(e) => {
                            dispatch(setDispatchUpdate(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
                      <Col md={8} sm={8} xs={8} className="p-0  me-4">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          {t("edit.dealer.email.page.tab.deliveryOnlyUpdate")}
                        </Form.Label>
                      </Col>

                      <Col xs={1} md={1} sm={1} className="p-0 d-flex">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${getCheckboxClass(deliveryOnly)}`}
                          id="deliveryOnly"
                          name="deliveryOnly"
                          checked={deliveryOnly}
                          disabled={viewDetail || dispatchUpdate || dispatchOnly}
                          onChange={(e) => {
                            dispatch(setDeliveryOnly(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
                      <Col md={8} sm={8} xs={8} className="p-0  me-4">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Dispatch Only Update{" "}
                        </Form.Label>
                      </Col>

                      <Col xs={1} md={1} sm={1} className="p-0 d-flex">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${getCheckboxClass(dispatchOnly)}`}
                          id="dispatchOnly"
                          name="dispatchOnly"
                          checked={dispatchOnly}
                          disabled={viewDetail || dispatchUpdate || deliveryOnly}
                          onChange={(e) => {
                            dispatch(setDispatchOnly(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row m-l-0 m-r-0">
                      <Col md={8} sm={8} xs={8} className="p-0 me-4">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Pickup Dealer BOL's
                        </Form.Label>
                      </Col>
                    </Form.Group>

                    <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
                      <Col md={8} sm={8} xs={8} className="p-0  me-4">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Email BOL At Order Entry
                        </Form.Label>
                      </Col>
                      <Col xs={1} md={1} sm={1} className="p-0 d-flex">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${getCheckboxClass(emailBolOrderEntry)}`}
                          id="emailBolOrderEntry"
                          name="emailBolOrderEntry"
                          checked={emailBolOrderEntry}
                          disabled={viewDetail || emailBolDispatch === true}
                          onChange={(e) => {
                            dispatch(setEmailBolOrderEntry(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
                      <Col md={8} sm={8} xs={8} className="p-0  me-4">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Email BOL At Dispatch
                        </Form.Label>
                      </Col>
                      <Col xs={1} md={1} sm={1} className="p-0 d-flex">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${getCheckboxClass(emailBolDispatch)}`}
                          id="emailBolDispatch"
                          name="emailBolDispatch"
                          checked={emailBolDispatch}
                          disabled={viewDetail || emailBolOrderEntry === true}
                          onChange={(e) => {
                            dispatch(setEmailBolDispatch(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row m-l-0 m-r-0">
                      <Col md={8} sm={8} xs={8} className="p-0 me-4">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Delivery Dealer BOL's
                        </Form.Label>
                      </Col>
                    </Form.Group>

                    <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
                      <Col md={8} sm={8} xs={8} className="p-0  me-4">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Email BOL At Yard Exit
                        </Form.Label>
                      </Col>
                      <Col xs={1} md={1} sm={1} className="p-0 d-flex">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${getCheckboxClass(emailBolatYardExit)}`}
                          id="emailBolatYardExit"
                          name="emailBolatYardExit"
                          checked={emailBolatYardExit}
                          disabled={viewDetail || emailBOLatDelivery === true}
                          onChange={(e) => {
                            dispatch(setEmailBolatYardExit(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
                      <Col md={8} sm={8} xs={8} className="p-0  me-4">
                        <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                          Email BOL At Delivery
                        </Form.Label>
                      </Col>
                      <Col xs={1} md={1} sm={1} className="p-0 d-flex">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${getCheckboxClass(emailBOLatDelivery)}`}
                          id="emailBOLatDelivery"
                          name="emailBOLatDelivery"
                          checked={emailBOLatDelivery}
                          disabled={viewDetail || emailBolatYardExit === true}
                          onChange={(e) => {
                            dispatch(setEmailBOLatDelivery(e.target.checked));
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

export default DealerEmailFormContent;
