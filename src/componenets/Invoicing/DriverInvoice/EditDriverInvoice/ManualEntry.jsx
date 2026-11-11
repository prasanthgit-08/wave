import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";

import { useNavigate, useParams } from "react-router-dom";
import QuarterScreenSearchFilter from "../../../common/QuarterScreenSearchFilter";
import PostalCodeComponent from "../../../common/PostalCodeComponent";
import { Formik } from "formik";

import {
  setEmailFormat,
  setManualEntryData,
  setManualSaveFlag,
  setCustomerEmail,
  resetFields,
} from "../../../../redux/DriverInvoiceSlice";
function ManualEntry(styles) {
  const { id, pageNumber } = useParams();

  window.addEventListener("popstate", () => {
    dispatch(resetFields());
    navigate(`/driver-invoice-browse`);
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [viewDetail, setViewDetail] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const initialValue = [{ city: "", stateCode: "", postalCode: "", canadian: false }];

  const [postalOptions, setPostalValues] = useState(initialValue);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [canadian, setCanadian] = useState(false);
  const emailFormat = useSelector((state) => state.driverInvoiceReducer.emailFormat);

  const validateEmail = (email) => {
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
    return emailRegex.test(email);
  };

  const phoneNumberValidation = (value) => {
    if (!value) return value;

    const phoneNumber = value?.replace(/[^\d]/g, "");

    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;

    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)})${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)})${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = phoneNumberValidation(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  useEffect(() => {
    dispatch(
      setManualEntryData({
        name: name,
        address1: address1,
        address2: address2,
        city: city,
        postalCode: postalCode,
        stateCode: stateCode,
        phone: phone,
        email: email,
        postalCodePK: postalCodePK,
        canadian: canadian,
      })
    );
  }, [name, address1, address2, city, postalCode, stateCode, phone, email, postalCodePK, canadian, dispatch]);

  return (
    <Formik
      initialValues={{
        name,
        address1,
        address2,
        city,
        stateCode,
        postalCode,
        email,
        phone,
      }}
      validationSchema={""}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        url: true,
      }}
    >
      {(formik) => (
        <div className="w-100 p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              <div className="p-15 w-100">
                <Row className="g-3">
                  <Col xl={8} lg={8} md={8} sm={8} xs={8} className="m-t-10">
                    <Form.Group className="mt-5 form-group align-items-center row m-l-0 m-r-0 mb-3">
                      <Col sm={3} md={3} xs={3} className="pl-4">
                        <label className={QuarterScreenSearchFilter.colFormLabel}>Name</label>
                      </Col>
                      <Col xs={5} md={5} sm={5} className="p-0">
                        <input
                          type="text"
                          className={`customFormControl ${
                            viewDetail ? "" : name ? "borderGreen" : "borderRed"
                          }`}
                          id="name"
                          name="name"
                          value={name}
                          maxLength={30}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onBeforeInput={(e) => {
                            if (e.data === " " && e.target.value?.trim().length === 0) {
                              e.preventDefault();
                            }
                          }}
                          onInput={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mt-2 form-group align-items-center row m-l-0 m-r-0 mb-3">
                      <Col sm={3} md={3} xs={3} className="pl-4">
                        <label className={QuarterScreenSearchFilter.colFormLabel}>Address</label>
                      </Col>
                      <Col xs={5} md={5} sm={5} className="p-0">
                        <input
                          type="text"
                          className={`customFormControl ${
                            viewDetail ? "" : address1 ? "borderGreen" : "borderRed"
                          }`}
                          id="ad1"
                          name="ad1"
                          value={address1}
                          maxLength={30}
                          autoComplete="one-time-code"
                          onBeforeInput={(e) => {
                            if (e.data === " " && e.target.value?.trim().length === 0) {
                              e.preventDefault();
                            }
                          }}
                          aria-autocomplete="list"
                          onInput={(e) => {
                            setAddress1(e.target.value);
                          }}
                          spellCheck={false}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mt-2 form-group align-items-center row m-l-0 m-r-0 mb-3">
                      <Col xs={3} sm={3} md={3} className="p-0"></Col>
                      <Col xs={5} md={5} sm={5} className="p-0">
                        <input
                          type="text"
                          className="customFormControl"
                          id="ad2"
                          name="ad2"
                          value={address2}
                          onBeforeInput={(e) => {
                            if (e.data === " " && e.target.value?.trim().length === 0) {
                              e.preventDefault();
                            }
                          }}
                          maxLength={30}
                          autoComplete="one-time-code"
                          aria-autocomplete="list"
                          onInput={(e) => {
                            setAddress2(e.target.value);
                          }}
                          spellCheck={false}
                        />
                      </Col>
                    </Form.Group>
                    <Col xs={11} md={11} sm={11} className="p-0" style={{ marginLeft: "12px" }}>
                      <PostalCodeComponent
                        disabled={viewDetail}
                        city={city}
                        setCity={setCity}
                        stateCode={stateCode}
                        setStateCode={setStateCode}
                        postalCode={postalCode}
                        setPostalCode={setPostalCode}
                        setPostalValues={setPostalValues}
                        postalOptions={postalOptions}
                        postalCodePK={postalCodePK}
                        setPostalCodePK={setPostalCodePK}
                        canadian={canadian}
                        setCanadian={setCanadian}
                        labelColNumber={3}
                        stateInputWidth={"55px"}
                        zipInputWidth={"100px"}
                      />
                    </Col>

                    <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0 mb-3">
                      <Col sm={3} md={3} xs={3} className="pl-4">
                        <label className={QuarterScreenSearchFilter.colFormLabel}>Phone</label>
                      </Col>
                      <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "100px" }}>
                        <input
                          type="text"
                          className={`customFormControl ${
                            viewDetail ? "" : phone && phone?.length === 13 ? "borderGreen" : "borderRed"
                          }`}
                          id="phone"
                          name="phone"
                          value={phone}
                          onChange={(e) => phoneFormatHandler(e)}
                          maxLength={30}
                          onBeforeInput={(e) => {
                            if (e.data === " " && e.target.value?.trim().length === 0) {
                              e.preventDefault();
                            }
                          }}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onInput={(e) => {
                            setPhone(e.target.value);
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mt-2 form-group align-items-center row m-l-0 m-r-0 mb-3">
                      <Col sm={3} md={3} xs={3} className="pl-4">
                        <label className={QuarterScreenSearchFilter.colFormLabel}>Email</label>
                      </Col>
                      <Col xs={9} md={9} sm={9} className="p-0">
                        <input
                          type="text"
                          className={`customFormControl ${
                            viewDetail ? "" : !email ? "borderRed" : emailFormat ? "borderGreen" : "borderRed"
                          }`}
                          id="email"
                          name="email"
                          value={email}
                          onBeforeInput={(e) => {
                            if (e.data === " " && e.target.value?.trim().length === 0) {
                              e.preventDefault();
                            }
                          }}
                          maxLength={70}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onChange={(e) => {
                            const emailValue = e.target.value;
                            const isValidEmail1 = validateEmail(emailValue);
                            setEmail(emailValue);
                            dispatch(setCustomerEmail(emailValue));
                            dispatch(setEmailFormat(isValidEmail1));
                          }}
                          onInput={(e) => {
                            setEmail(e.target.value);
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
}

export default ManualEntry;
