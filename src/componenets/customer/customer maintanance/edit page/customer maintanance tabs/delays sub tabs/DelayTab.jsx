import { t } from "i18next";
import * as yup from "yup";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import phoneExtension from "../../../../../../utils/validation/PhoneExtension";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import {
  setCustomerFormData,
  setIsDelaysDelayTabValid,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import { removeLeadingWhitespace } from "../../../../../../utils/utils";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";
import Input from "../../../../../../components/common/input";

function DelayTabs() {
  const dispatch = useDispatch();

  const [delayContact, setDelayContact] = useState("");
  const [phone, setPhone] = useState("");
  const [extn, setExtn] = useState("");
  const [fAXDelayUpdates, setfAXDelayUpdates] = useState(false);
  const [fax, setFax] = useState("");
  const [instructions, setInstructions] = useState("");

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  useEffect(() => {
    if (fAXDelayUpdates === false) {
      setFax("");
    }
  }, [fAXDelayUpdates, fax]);

  useEffect(() => {
    if (editCustomerData === null) {
      setDelayContact("");
      setPhone("");
      setExtn("");
      setfAXDelayUpdates(false);
      setFax("");
      setInstructions("");
    }
    if (editCustomerData !== null) {
      setDelayContact(editCustomerData.delayContact != null ? editCustomerData.delayContact : "");
      setPhone(editCustomerData.delayPhone != null ? formatPhoneNumber(editCustomerData.delayPhone) : "");
      setExtn(editCustomerData.delayPhoneExtension != null ? editCustomerData.delayPhoneExtension : "");
      setfAXDelayUpdates(editCustomerData.faxDelayUpdates != null ? editCustomerData.faxDelayUpdates : "");
      setFax(
        editCustomerData.delayFAXNumber != null ? formatPhoneNumber(editCustomerData.delayFAXNumber) : ""
      );
      setInstructions(editCustomerData.delayInstructions != null ? editCustomerData.delayInstructions : "");
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    breakdownFormData();
  }, [delayContact, phone, extn, fAXDelayUpdates, fax, instructions]);

  const breakdownFormData = () => {
    dispatch(
      setCustomerFormData({
        delayContact: delayContact,
        delayPhone: phone?.replace(/\s+/g, ""),
        delayPhoneExtension: extn,
        faxDelayUpdates: fAXDelayUpdates,
        delayFAXNumber: fax?.replace(/\s+/g, ""),
        delayInstructions: instructions,
      })
    );
  };

  useEffect(() => {
    if (!delayContact) {
      dispatch(setIsDelaysDelayTabValid(false));
    } else if (!phone?.match(phoneRegex)) {
      dispatch(setIsDelaysDelayTabValid(false));
    } else if (fAXDelayUpdates && !fax?.match(phoneRegex)) {
      dispatch(setIsDelaysDelayTabValid(false));
    } else if (extn && extn?.length < 3) {
      dispatch(setIsDelaysDelayTabValid(false));
    } else {
      dispatch(setIsDelaysDelayTabValid(true));
    }
  }, [delayContact, phone, fAXDelayUpdates, fax, extn]);

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
    delayContact: yup.string().required(),
    fAXDelayUpdates: yup.boolean(),
    fax: yup.string().when("fAXDelayUpdates", {
      is: true,
      then: yup.string().matches(phoneRegex).required(),
      otherwise: yup.string().matches(phoneRegex),
    }),

    phone: yup.string().matches(phoneRegex).required(),
  });

  return (
    <Formik
      initialValues={{ delayContact, fAXDelayUpdates, fax, phone }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        delayContact: true,
        fAXDelayUpdates: false,
        fax: true,
        phone: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="p-2 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                {/*Delay Contact*/}
                <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">
                      {t("customer.maintanance.delays.sub.tab.delay.delay.contact.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "350px" }}>
                    <Input
                      className="customFormControl"
                      name="delayContact"
                      type="text"
                      value={delayContact}
                      maxLength={30}
                      disabled={viewDetail}
                      onChange={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        setDelayContact(cleanedValue);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail === true
                            ? "black 1px solid"
                            : formik.errors.delayContact === undefined &&
                                delayContact != null &&
                                delayContact?.length > 0
                              ? "green 2px solid"
                              : formik.errors.delayContact !== undefined
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
                            : formik.errors.phone === undefined && phone != null && phone?.length > 0
                              ? "green 2px solid"
                              : formik.errors.phone !== undefined
                                ? "red 2px solid"
                                : "",
                      }}
                    />
                  </Col>

                  <Col sm={1} md={1} xs={1} className="p-r-0">
                    <Form.Label className="customColFormLabel w-100 text-center">
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

                {/*FAX Delay Updates*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">
                      {t("customer.maintanance.delays.sub.tab.delay.fax.delays.updates.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="fAXDelayUpdates"
                      value={fAXDelayUpdates}
                      checked={fAXDelayUpdates}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setfAXDelayUpdates(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Fax Field */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
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
                      disabled={viewDetail || fAXDelayUpdates === false}
                      onChange={(e) => {
                        formik.handleChange(e);
                        faxFormatHandler(e);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail === true || fAXDelayUpdates === false
                            ? "black 1px solid"
                            : formik.errors.fax === undefined && fax != null && fax?.length > 0
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

export default DelayTabs;
