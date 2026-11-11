import { t } from "i18next";
import * as yup from "yup";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import {
  setCustomerFormData,
  setIsDelaysDamageTabValid,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import phoneExtension from "../../../../../../utils/validation/PhoneExtension";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import { removeLeadingWhitespace } from "../../../../../../utils/utils";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";
import Input from "../../../../../../components/common/input";

function DamageTab() {
  const dispatch = useDispatch();

  const [damageContact, setDamageContact] = useState("");
  const [phone, setPhone] = useState("");
  const [extn, setExtn] = useState("");
  const [faxDamageUpdates, setFaxDamageUpdates] = useState(false);
  const [fax, setFax] = useState("");
  const [instructions, setInstructions] = useState("");

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  useEffect(() => {
    if (faxDamageUpdates === false) {
      setFax("");
    }
  }, [faxDamageUpdates, fax]);

  useEffect(() => {
    if (editCustomerData === null) {
      setDamageContact("");
      setPhone("");
      setExtn("");
      setFaxDamageUpdates(false);
      setFax("");
      setInstructions("");
    }
    if (editCustomerData !== null) {
      setDamageContact(editCustomerData.damageContact != null ? editCustomerData.damageContact : "");
      setPhone(editCustomerData.damagePhone != null ? formatPhoneNumber(editCustomerData.damagePhone) : "");
      setExtn(editCustomerData.damagePhoneExtension != null ? editCustomerData.damagePhoneExtension : "");
      setFaxDamageUpdates(editCustomerData.faxDamageUpdates != null ? editCustomerData.faxDamageUpdates : "");
      setFax(
        editCustomerData.damageFAXNumber != null ? formatPhoneNumber(editCustomerData.damageFAXNumber) : ""
      );
      setInstructions(editCustomerData.damageInstructions != null ? editCustomerData.damageInstructions : "");
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    breakdownFormData();
  }, [damageContact, phone, extn, faxDamageUpdates, fax, instructions]);

  const breakdownFormData = () => {
    dispatch(
      setCustomerFormData({
        damageContact: damageContact,
        damagePhone: phone.replace(/\s+/g, ""),
        damagePhoneExtension: extn,
        faxDamageUpdates: faxDamageUpdates,
        damageFAXNumber: fax.replace(/\s+/g, ""),
        damageInstructions: instructions,
      })
    );
  };

  useEffect(() => {
    if (!damageContact) {
      dispatch(setIsDelaysDamageTabValid(false));
    } else if (!phone?.match(phoneRegex)) {
      dispatch(setIsDelaysDamageTabValid(false));
    } else if (faxDamageUpdates && !fax?.match(phoneRegex)) {
      dispatch(setIsDelaysDamageTabValid(false));
    } else if (extn && extn?.length < 3) {
      dispatch(setIsDelaysDamageTabValid(false));
    } else {
      dispatch(setIsDelaysDamageTabValid(true));
    }
  }, [damageContact, phone, faxDamageUpdates, fax, extn]);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const phoneFormatExtension = (e) => {
    const extenstion = phoneExtension(e.target.value);
    setExtn(extenstion);
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFax(formattedPhoneNumber);
  };

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    damageContact: yup.string().required(),
    faxDamageUpdates: yup.boolean(),
    fax: yup.string().when("faxDamageUpdates", {
      is: true,
      then: yup.string().matches(phoneRegex).required(),
      otherwise: yup.string().matches(phoneRegex),
    }),
    phone: yup.string().matches(phoneRegex).required(),
  });

  return (
    <Formik
      initialValues={{ damageContact, faxDamageUpdates, fax, phone }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      validateOnMount
      initialTouched={{
        damageContact: true,
        faxDamageUpdates: false,
        fax: true,
        phone: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="p-2 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                {/*Damage Contact*/}
                <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                  <Col ssm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">
                      {t("customer.maintanance.delays.sub.tab.damage.damage.contact.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "350px" }}>
                    <Input
                      className="customFormControl"
                      name="damageContact"
                      type="text"
                      maxLength={30}
                      value={damageContact}
                      disabled={viewDetail}

                      onChange={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        setDamageContact(cleanedValue);
                      }}

                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail === true
                            ? "black 1px solid"
                            : formik.errors.damageContact === undefined &&
                                damageContact != null &&
                                damageContact.length > 0
                              ? "green 2px solid"
                              : formik.errors.damageContact !== undefined
                                ? "red 2px solid"
                                : "",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/*Phone, Extn*/}
                <Form.Group className="mt-3 row  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">
                      {t("edit.dealer.page.general.tab.phone")}
                    </Form.Label>
                  </Col>
                  <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "110px" }}>
                    <Input
                      className="customFormControl"
                      name="phone"
                      value={phone}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => {
                        formik.handleChange(e);
                        phoneFormatHandler(e);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail === true
                            ? "black 1px solid"
                            : formik.errors.phone === undefined && phone != null && phone.length > 0
                              ? "green 2px solid"
                              : formik.errors.phone !== undefined
                                ? "red 2px solid"
                                : "",
                      }}
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-r-0">
                    <Form.Label className="customColFormLabel w-100 text-center padding_right">
                      {t("edit.dealer.page.general.tab.extn")}
                    </Form.Label>
                  </Col>

                  <Col xs={3} sm={3} md={2} lg={1} className="p-0" style={{ width: "55px" }}>
                    <Input
                      className={`customFormControl ${
                        !phone || !extn || viewDetail ? "" : extn && extn?.length < 3 ? "borderRed" : ""
                      }`}
                      name="extn"
                      value={extn}
                      maxLength={4}
                      disabled={phone === "" || viewDetail === true}
                      onChange={(e) => phoneFormatExtension(e)}
                    />
                  </Col>
                </Form.Group>

                {/*FAX Damage Updates*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col ssm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">
                      {t("customer.maintanance.delays.sub.tab.damage.fax.damage.updates.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="faxDamageUpdates"
                      value={faxDamageUpdates}
                      checked={faxDamageUpdates}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setFaxDamageUpdates(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Fax Field */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col ssm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">
                      {t("edit.dealer.page.general.tab.fax")}
                    </Form.Label>
                  </Col>
                  <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "110px" }}>
                    <Input
                      className="customFormControl"
                      type="fax"
                      name="fax"
                      value={fax}
                      maxLength={14}
                      disabled={viewDetail || faxDamageUpdates === false}
                      onChange={(e) => {
                        formik.handleChange(e);
                        faxFormatHandler(e);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail === true || faxDamageUpdates === false
                            ? "black 1px solid"
                            : formik.errors.fax === undefined && fax != null && fax.length > 0
                              ? "green 2px solid"
                              : formik.errors.fax !== undefined
                                ? "red 2px solid"
                                : "",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/*Instructions*/}

                <Form.Group className="m-t-15 row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Instructions</Form.Label>
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
                      value={instructions}
                      disabled={viewDetail}
                      autoComplete="off"

                      onInput={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        setInstructions(cleanedValue);
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
}

export default DamageTab;
