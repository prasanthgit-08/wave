import React, { useEffect } from "react";
import * as yup from "yup";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import PostalCode from "../../../../../common/PostalCode";
import { useDispatch, useSelector } from "react-redux";
import {
  setBrokerCity,
  setBrokerPostcode,
  setBrokerStatecode,
  setCustomerFormData,
  setIsSettingsBondInfoValid,
  setOnCancel,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import Input from "../../../../../../components/common/input";
import { removeLeadingWhitespace } from "../../../../../../utils/utils";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";

const BondInfo = () => {
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [notes, setNotes] = useState("");
  const [phone, setPhone] = useState("");

  const [postalCodePK, setPostalCodePK] = useState(null);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const params = useParams();
  const incompletecustomerId = params.incompletecustomerPK;

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);
  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);
  const isCustomerLoading = useSelector((state) => state.customerMaintenanceReducer.isCustomerLoading);
  const customerType = useSelector((state) => state.customerMaintenanceReducer.customerType);
  const onCancel = useSelector((state) => state.customerMaintenanceReducer.onCancel);
  const dispatch = useDispatch();

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const validationSchema = yup.object({
    name: yup.string().required(),
    address1: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),

    postalcode: yup.string().required(),

    phone: yup.string().matches(phoneRegex),
  });

  useEffect(() => {
    if (editCustomerData === null) {
      setName("");
      setAddress1("");
      setAddress2("");
      setNotes("");
      setPhone("");
      setCity("");
      setStateCode("");
      setPostalCode("");
    }
    // Bond info only applies to Brokers; ignore stale bond data stored on any other customer type.
    if (editCustomerData !== null && editCustomerData?.customerType?.trim() !== "B") {
      setName("");
      setAddress1("");
      setAddress2("");
      setNotes("");
      setPhone("");
      setCity("");
      setStateCode("");
      setPostalCode("");
      setPostalCodePK(null);
    } else if (editCustomerData !== null) {
      setName(editCustomerData.bondName || "");
      setAddress1(editCustomerData.bondAddress1 ? editCustomerData.bondAddress1 : "");
      setAddress2(editCustomerData.bondAddress2 ? editCustomerData.bondAddress2 : "");
      setNotes(editCustomerData.bondNotes ? editCustomerData.bondNotes : "");
      setPhone(editCustomerData.bondPhone ? formatPhoneNumber(editCustomerData.bondPhone) : "");
      setCity(editCustomerData.bondCity ? editCustomerData.bondCity : "");
      setStateCode(editCustomerData.bondStateCode ? editCustomerData.bondStateCode : "");
      setPostalCode(editCustomerData.bondPostalCode ? editCustomerData.bondPostalCode : "");
      setPostalCodePK(editCustomerData.bondPostalCodePK || null);
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    dispatch(
      setCustomerFormData({
        bondName: name,
        bondAddress1: address1,
        bondAddress2: address2,
        bondNotes: notes,
        bondPhone: phone?.replace(/\s+/g, ""),
        bondCity: city,
        bondStateCode: statecode,
        bondPostalCode: postalcode,
      })
    );
  }, [name, phone, address1, address2, notes, city, statecode, postalcode]);

  useEffect(() => {
    if (customerType !== "B") {
      setName("");
      setPostalCodePK(null);
      setAddress1("");
      setAddress2("");
      setNotes("");
      setPhone("");
      dispatch(setBrokerStatecode(""));
      setStateCode("");
      dispatch(setBrokerPostcode(""));
      setPostalCode("");
      dispatch(setBrokerCity(""));
      setCity("");
    }
  }, [customerType]);

  useEffect(() => {
    if (customerType === "B") {
      if (!(name && address1)) {
        dispatch(setIsSettingsBondInfoValid(false));
      } else if (!phone?.match(phoneRegex)) {
        dispatch(setIsSettingsBondInfoValid(false));
      } else if (!postalCodePK) {
        dispatch(setIsSettingsBondInfoValid(false));
      } else {
        dispatch(setIsSettingsBondInfoValid(true));
      }
    }
  }, [name, phone, address1, city, postalCodePK, postalcode, statecode, customerType]);

  return (
    <Formik
      initialValues={{
        name,
        address1,
        city,
        statecode,
        phone,
        postalcode,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        description: true,
        name: true,
        address1: true,
        city: true,
        statecode: true,
        lastOrderDate: true,
        phone: true,
        tollfreephone: true,
        fax: true,
        postalcode: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="p-2 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="mt-3 align-items-cen row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  Who Broker is Bonded by
                </Form.Group>
                {/* Name Field */}
                <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Name</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <Input
                      className="customFormControl"
                      name="name"
                      type="text"
                      value={name}
                      disabled={viewDetail}
                      maxLength={30}
                      onChange={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        setName(cleanedValue);
                      }}
                      style={{
                        border:
                          viewDetail || isCustomerLoading || customerType !== "B"
                            ? ""
                            : name
                              ? "green 2px solid"
                              : "red 2px solid",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Address Field-1*/}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Address</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <Input
                      className="customFormControl"
                      name="ad1"
                      type="text"
                      maxLength={30}
                      value={address1}
                      disabled={viewDetail}
                      onChange={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        setAddress1(cleanedValue);
                      }}
                      style={{
                        border:
                          viewDetail || isCustomerLoading || customerType !== "B"
                            ? ""
                            : address1
                              ? "green 2px solid"
                              : "red 2px solid",
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                {/* Address Field-2 */}
                <Form.Group className="mt-3 mb-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <Input
                      className="customFormControl"
                      name="ad2"
                      value={address2}
                      type="text"
                      maxLength={30}
                      disabled={viewDetail}
                      onChange={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        setAddress2(cleanedValue);
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <PostalCodeComponent
                  disabled={viewDetail || isCustomerLoading || customerType !== "B"}
                  city={viewDetail ? editCustomerData?.bondCity : city}
                  setCity={setCity}
                  stateCode={viewDetail ? editCustomerData?.bondStateCode : statecode}
                  setStateCode={setStateCode}
                  postalCode={viewDetail ? editCustomerData?.bondPostalCode : postalcode}
                  setPostalCode={setPostalCode}
                  canadian={canadian}
                  setCanadian={setCanadian}
                  postalOptions={postalOptions}
                  setPostalValues={setPostalValues}
                  postalCodePK={postalCodePK}
                  setPostalCodePK={setPostalCodePK}
                  className={"postalCodeRefSeco"}
                />

                {/* Phone Field */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Phone</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                    <Input
                      className="customFormControl"
                      name="phone"
                      value={phone}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => phoneFormatHandler(e)}
                      style={{
                        border:
                          viewDetail || isCustomerLoading || customerType !== "B"
                            ? ""
                            : String(phone).match(phoneRegex)
                              ? "green 2px solid"
                              : "red 2px solid",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Notes */}

                <Form.Group className="m-t-15 row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Notes</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "410px" }}>
                    <textarea
                      rows={7}
                      cols={200}
                      type="text"
                      style={{
                        resize: "none",
                        display: "fixed",
                        maxWidth: "520px",
                        boxShadow: "none",
                        fontSize: "12px",
                      }}
                      className={`customFormControl h-100`}
                      name="notes"
                      value={notes}
                      disabled={viewDetail}
                      autoComplete="off"
                      onInput={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        setNotes(cleanedValue);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BondInfo;
