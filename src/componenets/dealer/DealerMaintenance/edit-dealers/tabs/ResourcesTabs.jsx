import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import phoneExtension from "../../../../../utils/validation/PhoneExtension";
import {
  setDealer,
  setGmPhone,
  setGmEmail,
  setSmPhone,
  setSmEmail,
  setServicePhone,
  setServiceEmail,
  setRdPhone,
  setRdEmail,
  setDeliveryPhone,
  setGmExtn,
  setDeliveryExtn,
  setSalesExtn,
  setSmExtn,
} from "../../../../../redux/EditDealerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, htmlFor } from "formik";
import * as yup from "yup";
import FormikController from "../../../../../utils/validation/FormikController";
import { t } from "i18next";
import { emailRegex } from "../../../../../utils/validation/EmailRegex";

function ResourcesTabs() {
  const [generalManagerContact, setGeneralManagerContact] = useState("");
  const [generalManagerPhone, setGeneralManagerPhone] = useState("");
  const [generalManagerPhoneExtn, setGeneralManagerPhoneExtn] = useState("");
  const [generalManagerEmail, setGeneralManagerEmail] = useState("");
  const [salesManagerContact, setSalesManagerContact] = useState("");
  const [salesManagerPhone, setSalesManagerPhone] = useState("");
  const [salesManagerPhoneExtn, setSalesManagerPhoneExtn] = useState("");
  const [salesManagerEmail, setSalesManagerEmail] = useState("");
  const [serviceManagerContact, setServiceManagerContact] = useState("");
  const [serviceManagerPhone, setServiceManagerPhone] = useState("");
  const [serviceManagerPhoneExtn, setServiceManagerPhoneExtn] = useState("");
  const [serviceManagerEmail, setServiceManagerEmail] = useState("");
  const [deliveryContact, setDeliveryContact] = useState("");
  const [deliveryPhone1, setDeliveryPhone1] = useState("");
  const [deliveryPhoneExtn, setDeliveryPhoneExtn] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState("");

  const dealerData = useSelector((state) => state.editDealerReducer.dealerData);

  const contactOnDelivery = useSelector((state) => state.editDealerReducer.contactOnDelivery);

  const dealer = useSelector((state) => state.editDealerReducer.dealer);
  let viewDetail = useSelector((state) => state.editDealerReducer.viewDetail);

  const gmPhoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setGeneralManagerPhone(formattedPhoneNumber);
  };

  const gmPhoneFormatExtension = (e) => {
    const extenstion = phoneExtension(e.target.value);

    setGeneralManagerPhoneExtn(extenstion);
  };

  const salesPhoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setSalesManagerPhone(formattedPhoneNumber);
  };

  const salesPhoneFormatExtension = (e) => {
    const extenstion = phoneExtension(e.target.value);

    setSalesManagerPhoneExtn(extenstion);
  };
  const servicePhoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setServiceManagerPhone(formattedPhoneNumber);
  };

  const servicePhoneFormatExtension = (e) => {
    const extenstion = phoneExtension(e.target.value);

    setServiceManagerPhoneExtn(extenstion);
  };

  const deliveryPhoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setDeliveryPhone1(formattedPhoneNumber);
  };

  const deliveryPhoneFormatExtension = (e) => {
    const extenstion = phoneExtension(e.target.value);

    setDeliveryPhoneExtn(extenstion);
  };

  useEffect(() => {
    if (dealerData != null) {
      setGeneralManagerContact(
        dealerData.generalManagerContact != null ? dealerData.generalManagerContact?.trim() : ""
      );
      setGeneralManagerPhone(
        dealerData.generalManagerPhone != null ? formatPhoneNumber(dealerData.generalManagerPhone) : ""
      );

      setGeneralManagerPhoneExtn(
        dealerData.generalManagerPhoneExtn != null ? dealerData.generalManagerPhoneExtn?.trim() : ""
      );
      setGeneralManagerEmail(
        dealerData.generalManagerEmail != null ? dealerData.generalManagerEmail?.trim() : ""
      );
      setSalesManagerContact(
        dealerData.salesManagerContact != null ? dealerData.salesManagerContact?.trim() : ""
      );
      setSalesManagerPhone(
        dealerData.salesManagerPhone != null ? formatPhoneNumber(dealerData.salesManagerPhone) : ""
      );
      setSalesManagerPhoneExtn(
        dealerData.salesManagerPhoneExtn != null ? dealerData.salesManagerPhoneExtn?.trim() : ""
      );
      setSalesManagerEmail(dealerData.salesManagerEmail != null ? dealerData.salesManagerEmail?.trim() : "");

      setServiceManagerContact(
        dealerData.serviceManagerContact != null ? dealerData.serviceManagerContact?.trim() : ""
      );
      setServiceManagerPhone(
        dealerData.serviceManagerPhone != null ? formatPhoneNumber(dealerData.serviceManagerPhone) : ""
      );
      setServiceManagerPhoneExtn(
        dealerData.serviceManagerPhoneExtn != null ? dealerData.serviceManagerPhoneExtn?.trim() : ""
      );
      setServiceManagerEmail(
        dealerData.serviceManagerEmail != null ? dealerData.serviceManagerEmail?.trim() : ""
      );

      if (null != dealerData?.deliveryContact) {
        setDeliveryContact(dealerData?.deliveryContact?.trim());
      } else {
        setDeliveryContact("");
      }
      setDeliveryPhone1(dealerData.deliveryPhone != null ? formatPhoneNumber(dealerData.deliveryPhone) : "");
      setDeliveryPhoneExtn(dealerData.deliveryPhoneExtn != null ? dealerData.deliveryPhoneExtn?.trim() : "");
      setDeliveryEmail(dealerData.deliveryEmail != null ? dealerData.deliveryEmail?.trim() : "");
    }
  }, [dealerData, viewDetail]);

  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };

  useEffect(() => {
    resourcesTabFormData();
  }, [
    generalManagerContact,
    generalManagerPhone,
    generalManagerPhoneExtn,
    generalManagerEmail,
    salesManagerContact,
    salesManagerPhone,
    salesManagerPhoneExtn,
    salesManagerEmail,
    serviceManagerContact,
    serviceManagerPhone,
    serviceManagerPhoneExtn,
    serviceManagerEmail,
    contactOnDelivery,
    deliveryPhone1,
    deliveryPhoneExtn,
    deliveryEmail,
    deliveryContact,
  ]);

  useEffect(() => {
    if (null != dealer) {
      setDeliveryContact(deliveryContact);
    }
  }, [deliveryPhone1, deliveryContact]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGmPhone(generalManagerPhone));
    dispatch(setGmEmail(generalManagerEmail));
    dispatch(setSmPhone(salesManagerPhone));
    dispatch(setSmEmail(salesManagerEmail));
    dispatch(setServicePhone(serviceManagerPhone));
    dispatch(setServiceEmail(serviceManagerEmail));
    dispatch(setRdPhone(deliveryPhone1));
    dispatch(setRdEmail(deliveryEmail));
    dispatch(setGmExtn(generalManagerPhoneExtn));
    dispatch(setDeliveryExtn(deliveryPhoneExtn));
    dispatch(setSalesExtn(salesManagerPhoneExtn));
    dispatch(setSmExtn(serviceManagerPhoneExtn));
  }, [
    generalManagerPhone,
    generalManagerEmail,
    salesManagerPhone,
    salesManagerEmail,
    serviceManagerPhone,
    serviceManagerEmail,
    deliveryPhone1,
    deliveryEmail,
    generalManagerPhoneExtn,
    deliveryPhoneExtn,
    salesManagerPhoneExtn,
    serviceManagerPhoneExtn,
  ]);

  const resourcesTabFormData = () => {
    dispatch(
      setDealer({
        generalManagerContact: generalManagerContact,
        generalManagerPhone: generalManagerPhone?.replace(/\s+/g, ""),
        generalManagerPhoneExtn: generalManagerPhoneExtn,
        generalManagerEmail: generalManagerEmail,
        salesManagerContact: salesManagerContact,
        salesManagerPhone: salesManagerPhone?.replace(/\s+/g, ""),
        salesManagerPhoneExtn: salesManagerPhoneExtn,
        salesManagerEmail: salesManagerEmail,
        serviceManagerContact: serviceManagerContact,
        serviceManagerPhone: serviceManagerPhone?.replace(/\s+/g, ""),
        serviceManagerPhoneExtn: serviceManagerPhoneExtn,
        serviceManagerEmail: serviceManagerEmail,
        deliveryContact: deliveryContact,
        deliveryPhone: deliveryPhone1?.replace(/\s+/g, ""),
        deliveryPhoneExtn: deliveryPhoneExtn,
        deliveryEmail: deliveryEmail,
      })
    );
  };

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const phoneLenght = 14;

  const validationSchema = yup.object({
    generalManagerPhone: yup.string().matches(phoneRegex),
    generalManagerEmail: yup.string().matches(emailRegex),
    salesManagerPhone: yup.string().matches(phoneRegex),
    salesManagerEmail: yup.string().matches(emailRegex),
    serviceManagerPhone: yup.string().matches(phoneRegex),
    serviceManagerEmail: yup.string().matches(emailRegex),
    deliveryPhone1: yup.string().matches(phoneRegex),
    deliveryEmail: yup.string().matches(emailRegex),
  });

  useEffect(() => {
    if (serviceManagerPhone === "") {
      setServiceManagerPhoneExtn("");
    }
  }, [serviceManagerPhone]);

  useEffect(() => {
    if (generalManagerPhone === "") {
      setGeneralManagerPhoneExtn("");
    }
  }, [generalManagerPhone]);

  return (
    <Formik
      initialValues={{
        generalManagerPhone,
        generalManagerEmail,
        salesManagerPhone,
        salesManagerEmail,
        serviceManagerPhone,
        serviceManagerEmail,
        deliveryPhone1,
        deliveryEmail,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        generalManagerPhone: true,
        generalManagerEmail: true,
        salesManagerPhone: true,
        salesManagerEmail: true,
        serviceManagerPhone: true,
        serviceManagerEmail: true,
        deliveryPhone1: true,
        deliveryEmail: true,
      }}
      on={on}
    >
      {(formik) => (
        <Form on={formik.handle} style={{ flexShrink: 10 }}>
          <div className="p-2 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label p-0">General Manager</Form.Label>
                  </Col>

                  <Col xs={4} md={4} lg={4} sm={4} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      id="generalManagerContact"
                      name="generalManagerContact"
                      maxLength={30}
                      value={generalManagerContact}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => setGeneralManagerContact(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label p-0">Phone</Form.Label>
                  </Col>

                  <Col xs={4} md={3} sm={4} className="p-l-0" style={{ width: "110px" }}>
                    <input
                      className={`customFormControl ${
                        !viewDetail
                          ? generalManagerPhone.length !== 0 && !generalManagerPhone?.match(phoneRegex)
                            ? "borderRed"
                            : ""
                          : ""
                      }`}
                      type="generalManagerPhone"
                      name="generalManagerPhone"
                      value={generalManagerPhone}
                      maxLength={phoneLenght}
                      disabled={viewDetail}
                      onChange={gmPhoneFormatHandler}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setGeneralManagerPhone(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>

                  <Col xs={3} sm={3} md={2} lg={1} className="p-0" style={{ width: "55px" }}>
                    <input
                      type="text"
                      className={`customFormControl ${
                        !generalManagerPhone || !generalManagerPhoneExtn || viewDetail
                          ? ""
                          : generalManagerPhoneExtn && generalManagerPhoneExtn?.length < 3
                            ? "borderRed"
                            : ""
                      }`}
                      id="generalManagerPhoneExtn"
                      name="generalManagerPhoneExtn"
                      maxLength={4}
                      value={generalManagerPhoneExtn}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={gmPhoneFormatExtension}
                      onInput={(e) => setGeneralManagerPhoneExtn(e.target.value)}
                      disabled={generalManagerPhone === "" || viewDetail === true}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Email</Form.Label>
                  </Col>

                  <Col xs={6} sm={6} md={6} className="p-0">
                    <input
                      className={`customFormControl ${
                        viewDetail === true
                          ? ""
                          : formik.errors.generalManagerEmail === undefined &&
                              generalManagerEmail != null &&
                              generalManagerEmail.length > 1
                            ? ""
                            : formik.errors.generalManagerEmail !== undefined
                              ? "borderRed"
                              : ""
                      }`}

                      type="text"
                      name="generalManagerEmail"
                      maxLength={70}
                      value={generalManagerEmail}
                      onInput={(e) => {
                        formik.handleChange(e);
                        setGeneralManagerEmail(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0"></Form.Group>

                <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label p-0">Sales Manager</Form.Label>
                  </Col>

                  <Col xs={4} md={4} lg={4} sm={4} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      id="salesManagerContact"
                      name="salesManagerContact"
                      maxLength={30}
                      value={salesManagerContact}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => setSalesManagerContact(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label p-0">Phone</Form.Label>
                  </Col>

                  <Col xs={4} md={3} sm={4} className="p-l-0" style={{ width: "110px" }}>
                    <input
                      className={`customFormControl ${
                        !viewDetail
                          ? salesManagerPhone.length !== 0 && !salesManagerPhone?.match(phoneRegex)
                            ? "borderRed"
                            : ""
                          : ""
                      }`}
                      type="salesManagerPhone"
                      name="salesManagerPhone"
                      value={salesManagerPhone}
                      maxLength={phoneLenght}
                      onChange={salesPhoneFormatHandler}
                      onInput={(e) => {
                        formik.handleChange(e);
                        setSalesManagerPhone(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>

                  <Col xs={3} sm={3} md={2} lg={1} className="p-0" style={{ width: "55px" }}>
                    <input
                      type="text"
                      className={`customFormControl ${
                        viewDetail || !salesManagerPhone || !salesManagerPhoneExtn
                          ? ""
                          : salesManagerPhoneExtn && salesManagerPhoneExtn?.length < 3
                            ? "borderRed"
                            : ""
                      }`}
                      id="salesManagerPhoneExtn"
                      name="salesManagerPhoneExtn"
                      onChange={salesPhoneFormatExtension}
                      maxLength={4}
                      value={salesManagerPhoneExtn}
                      onInput={(e) => setSalesManagerPhoneExtn(e.target.value)}
                      disabled={salesManagerPhone === "" || viewDetail}
                      aria-autocomplete="list"
                      autoComplete="off"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Email</Form.Label>
                  </Col>
                  <Col xs={6} sm={6} md={6} className="p-0">
                    <input
                      className={`customFormControl ${
                        viewDetail === true
                          ? ""
                          : formik.errors.salesManagerEmail === undefined &&
                              salesManagerEmail != null &&
                              salesManagerEmail.length > 1
                            ? ""
                            : formik.errors.salesManagerEmail !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                      type="text"
                      name="salesManagerEmail"
                      value={salesManagerEmail}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      maxLength={70}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setSalesManagerEmail(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={5} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} md={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Service Manager</Form.Label>
                  </Col>

                  <Col xs={4} md={4} lg={4} sm={4} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      id="serviceManagerContact"
                      name="serviceManagerContact"
                      maxLength={30}
                      value={serviceManagerContact}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => setServiceManagerContact(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} md={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label p-0">Phone</Form.Label>
                  </Col>

                  <Col xs={4} md={3} sm={4} className="p-l-0" style={{ width: "110px" }}>
                    <input
                      className={`customFormControl ${
                        !viewDetail
                          ? serviceManagerPhone.length !== 0 && !serviceManagerPhone?.match(phoneRegex)
                            ? "borderRed"
                            : ""
                          : ""
                      }`}
                      type="serviceManagerPhone"
                      name="serviceManagerPhone"
                      value={serviceManagerPhone}
                      maxLength={phoneLenght}
                      onChange={servicePhoneFormatHandler}
                      onInput={(e) => {
                        formik.handleChange(e);
                        setServiceManagerPhone(e.target.value);
                      }}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onBlur={formik.handleBlur}
                    />
                  </Col>

                  <Col xs={3} sm={3} md={2} lg={1} className="p-0" style={{ width: "55px" }}>
                    <input
                      className={`customFormControl ${
                        viewDetail || !serviceManagerPhone || !serviceManagerPhoneExtn
                          ? ""
                          : serviceManagerPhoneExtn && serviceManagerPhoneExtn?.length < 3
                            ? "borderRed"
                            : ""
                      }`}
                      id="serviceManagerPhoneExtn"
                      name="serviceManagerPhoneExtn"
                      maxLength={4}
                      value={serviceManagerPhoneExtn}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={servicePhoneFormatExtension}
                      onInput={(e) => setServiceManagerPhoneExtn(e.target.value)}
                      disabled={serviceManagerPhone === "" || viewDetail === true}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} md={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label p-0">Email</Form.Label>
                  </Col>

                  <Col xs={6} sm={6} md={6} className="p-0">
                    <input
                      className={`customFormControl ${
                        viewDetail === true
                          ? ""
                          : formik.errors.serviceManagerEmail === undefined &&
                              serviceManagerEmail != null &&
                              serviceManagerEmail.length > 1
                            ? ""
                            : formik.errors.serviceManagerEmail !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      type="text"
                      name="serviceManagerEmail"
                      value={serviceManagerEmail}
                      maxLength={70}
                      onInput={(e) => {
                        formik.handleChange(e);
                        setServiceManagerEmail(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0"></Form.Group>

                <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} md={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label p-0">Delivery Contact</Form.Label>
                  </Col>
                  <Col xs={4} md={4} lg={4} sm={4} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl 
                     
                           
                    `}
                      id="deliveryContact"
                      name="deliveryContact"
                      maxLength={30}
                      value={deliveryContact}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setDeliveryContact(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} md={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label p-0">Phone</Form.Label>
                  </Col>
                  <Col xs={4} md={3} sm={4} className="p-l-0" style={{ width: "110px" }}>
                    <input
                      control="input"
                      type="deliveryPhone"
                      name="deliveryPhone"

                      className={`customFormControl ${
                        viewDetail === true
                          ? ""
                          : formik.errors.deliveryPhone1 === undefined &&
                              deliveryPhone1 != null &&
                              deliveryPhone1.length > 1
                            ? ""
                            : formik.errors.deliveryPhone1 !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                      value={deliveryPhone1}
                      maxLength={phoneLenght}
                      disabled={viewDetail}
                      onChange={deliveryPhoneFormatHandler}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setDeliveryPhone1(e.target.value);
                      }}
                    />
                  </Col>

                  <Col xs={3} sm={3} md={2} lg={1} className="p-0" style={{ width: "55px" }}>
                    <input
                      type="text"
                      className={`customFormControl ${
                        viewDetail || !deliveryPhone1 || !deliveryPhoneExtn
                          ? ""
                          : deliveryPhoneExtn && deliveryPhoneExtn?.length < 3
                            ? "borderRed"
                            : ""
                      }`}
                      id="deliveryPhoneExtn"
                      name="deliveryPhoneExtn"
                      maxLength={4}
                      value={deliveryPhoneExtn}
                      onChange={deliveryPhoneFormatExtension}
                      onInput={(e) => setDeliveryPhoneExtn(e.target.value)}
                      disabled={deliveryPhone1 === "" || viewDetail === true}
                      aria-autocomplete="list"
                      autoComplete="off"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} md={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label p-0">Email</Form.Label>
                  </Col>
                  <Col xs={6} sm={6} md={6} className="p-0">
                    <input
                      className={`customFormControl ${
                        viewDetail === true
                          ? ""
                          : formik.errors.deliveryEmail === undefined &&
                              deliveryEmail != null &&
                              deliveryEmail.length > 1
                            ? ""
                            : formik.errors.deliveryEmail !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                      control="input"
                      type="text"
                      name="deliveryEmail"
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"

                      value={deliveryEmail}
                      maxLength={70}
                      onInput={(e) => {
                        formik.handleChange(e);
                        setDeliveryEmail(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim().length === 0) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="margin-box-14 form-group  align-items-center row  m-l-0 m-r-0"></Form.Group>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default ResourcesTabs;
