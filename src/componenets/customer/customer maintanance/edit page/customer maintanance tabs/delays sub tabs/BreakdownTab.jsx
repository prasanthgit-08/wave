import { t } from "i18next";
import * as yup from "yup";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import {
  setCustomerFormData,
  setIsDelaysBreakdownTabValid,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import phoneExtension from "../../../../../../utils/validation/PhoneExtension";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import { removeLeadingWhitespace } from "../../../../../../utils/utils";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";
import Input from "../../../../../../components/common/input";

function BreakdownTab() {
  const dispatch = useDispatch();

  const [breakdownContact, setBreakdownContact] = useState("");
  const [phone, setPhone] = useState("");
  const [extn, setExtn] = useState("");
  const [fAXBreakdownnUpdates, setFAXBreakdownnUpdates] = useState(false);
  const [fax, setFax] = useState("");
  const [instructions, setInstructions] = useState("");

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  useEffect(() => {
    if (fAXBreakdownnUpdates === false) {
      setFax("");
    }
  }, [fAXBreakdownnUpdates, fax]);

  useEffect(() => {
    if (editCustomerData === null) {
      setBreakdownContact("");
      setPhone("");
      setExtn("");
      setFAXBreakdownnUpdates(false);
      setFax("");
      setInstructions("");
    }
    if (editCustomerData !== null) {
      setBreakdownContact(editCustomerData.breakdownContact != null ? editCustomerData.breakdownContact : "");
      setPhone(
        editCustomerData.breakdownPhone != null ? formatPhoneNumber(editCustomerData.breakdownPhone) : ""
      );
      setExtn(
        editCustomerData.breakdownPhoneExtension != null ? editCustomerData.breakdownPhoneExtension : ""
      );
      setFAXBreakdownnUpdates(
        editCustomerData.faxbreakdownUpdates != null ? editCustomerData.faxbreakdownUpdates : ""
      );
      setFax(
        editCustomerData.breakdownFAXNumber != null
          ? formatPhoneNumber(editCustomerData.breakdownFAXNumber)
          : ""
      );
      setInstructions(
        editCustomerData.breakdownInstructions != null ? editCustomerData.breakdownInstructions : ""
      );
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    breakdownFormData();
  }, [breakdownContact, phone, extn, fAXBreakdownnUpdates, fax, instructions]);

  const breakdownFormData = () => {
    dispatch(
      setCustomerFormData({
        breakdownContact: breakdownContact,
        breakdownPhone: phone?.replace(/\s+/g, ""),
        breakdownPhoneExtension: extn,
        faxbreakdownUpdates: fAXBreakdownnUpdates,
        breakdownFAXNumber: fax?.replace(/\s+/g, ""),
        breakdownInstructions: instructions,
      })
    );
  };

  useEffect(() => {
    if (!breakdownContact) {
      dispatch(setIsDelaysBreakdownTabValid(false));
    } else if (!phone?.match(phoneRegex)) {
      dispatch(setIsDelaysBreakdownTabValid(false));
    } else if (fAXBreakdownnUpdates && !fax?.match(phoneRegex)) {
      dispatch(setIsDelaysBreakdownTabValid(false));
    } else if (extn && extn?.length < 3) {
      dispatch(setIsDelaysBreakdownTabValid(false));
    } else {
      dispatch(setIsDelaysBreakdownTabValid(true));
    }
  }, [breakdownContact, phone, fAXBreakdownnUpdates, fax, extn]);

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
    breakdownContact: yup.string().required(),
    fAXBreakdownnUpdates: yup.boolean(),
    fax: yup.string().when("fAXBreakdownnUpdates", {
      is: true,
      then: yup.string().matches(phoneRegex).required(),
      otherwise: yup.string().matches(phoneRegex),
    }),
    phone: yup.string().matches(phoneRegex).required(),
  });

  return (
    <Formik
      initialValues={{ breakdownContact, fAXBreakdownnUpdates, fax, phone }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      validateOnMount
      initialTouched={{
        breakdownContact: true,
        fAXBreakdownnUpdates: false,
        fax: true,
        phone: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="p-2 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                {/*Breakdown Contact*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">
                      {t("customer.maintanance.delays.sub.tab.breakdown.breakdwon.contact.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "350px" }}>
                    <Input
                      className="customFormControl"
                      name="breakdownContact"
                      type="text"
                      value={breakdownContact}
                      maxLength={30}
                      disabled={viewDetail}

                      onChange={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        setBreakdownContact(cleanedValue);
                      }}

                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail === true
                            ? "black 1px solid"
                            : formik.errors.breakdownContact === undefined &&
                                breakdownContact != null &&
                                breakdownContact?.length > 0
                              ? "green 2px solid"
                              : formik.errors.breakdownContact !== undefined
                                ? "red 2px solid"
                                : "",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/*Phone, Extn*/}
                <Form.Group className="mt-3 row align-items-center row  m-l-0 m-r-0">
                  <Col ssm={3} md={3} xs={3} className="p-0">
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
                      name="extn"
                      value={extn}
                      maxLength={4}
                      disabled={phone === "" || viewDetail === true}
                      onChange={(e) => phoneFormatExtension(e)}
                      className={`customFormControl ${
                        !phone || !extn || viewDetail ? "" : extn && extn?.length < 3 ? "borderRed" : ""
                      }`}
                    />
                  </Col>
                </Form.Group>

                {/*FAX Breakdown Updates*/}
                <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0">
                  <Col ssm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">{"FAX Breakdown Updates"}</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="fAXBreakdownnUpdates"
                      value={fAXBreakdownnUpdates}
                      checked={fAXBreakdownnUpdates}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setFAXBreakdownnUpdates(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Fax Field */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
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
                      disabled={viewDetail || fAXBreakdownnUpdates === false}
                      onChange={(e) => {
                        formik.handleChange(e);
                        faxFormatHandler(e);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail === true || fAXBreakdownnUpdates === false
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

export default BreakdownTab;
