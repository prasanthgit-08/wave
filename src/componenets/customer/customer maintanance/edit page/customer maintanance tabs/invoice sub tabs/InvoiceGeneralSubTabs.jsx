import { t } from "i18next";
import * as yup from "yup";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import {
  setCustomerFormData,
  setIsInvoiceGeneralTabValid,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import phoneExtension from "../../../../../../utils/validation/PhoneExtension";
import numberValidation from "../../../../../../utils/validation/NumberValidation";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import Input from "../../../../../../components/common/input";
import LookupButton from "../../../../../common/LookupButton";
import TermsLookup from "../../../../../LookupScreens/Terms/TermsLookup";
import CustomerService from "../../../../../../services/CustomerService";
import { lastpointer, removeLeadingWhitespace } from "../../../../../../utils/utils";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";

function InvoiceGeneralSubTabs() {
  const dispatch = useDispatch();

  const [invoiceContact, setInvoiceContact] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [terms, setTerms] = useState("");
  const [termsFK, setTermsFK] = useState(null);
  const [termsList, setTermsList] = useState([]);
  const [showTermsLookup, setShowTermsLookup] = useState(false);
  const [dueDays, setDueDays] = useState("");
  const [realWorldCustomerCode, setRealWorldCustomerCode] = useState("");
  const [invoiceDiscount, setInvoiceDiscount] = useState(false);
  const [invoiceDiscountPercentage, setInvoiceDiscountPercentage] = useState("");
  const [paymentDiscount, setPaymentDiscount] = useState(false);
  const [paymentDiscountPercentage, setPaymentDiscountPercentage] = useState("");
  const [paymentDiscountDays, setPaymentDiscountDays] = useState("");
  const [realWorldRefnoString, setRealWorldRefnoString] = useState("");
  const [termsLoading, setTermsLoading] = useState(false);

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);
  const miscellaneousCustomer = useSelector(
    (state) => state.customerMaintenanceReducer.settingsTabmiscellaneousCustomer
  );

  const allDealersFOD = useSelector((state) => state.customerMaintenanceReducer.settingsAllDealersFOD);

  const getTermsForAutocomplete = (string) => {
    setTermsLoading(true);
    CustomerService.fetchTermsforAutoComplete(string)
      .then(({ data }) => {
        setTermsList(data?.content);
      })
      .finally(() => {
        setTermsLoading(false);
      });
  };

  const fetchTermsById = (id, description) => {
    if (id && description) {
      setTerms(description.trim());
    } else if (id) {
      CustomerService.getTermsById(id).then(({ data }) => {
        setTerms(data?.description?.trim());
      });
    }
  };

  const handleTermsSelection = (data) => {
    setTerms(data?.description?.trim());
    setTermsFK(data?.termsPK);
    setShowTermsLookup(false);
  };

  useEffect(() => {
    if (editCustomerData === null) {
      setInvoiceContact("");
      setPhone("");
      setFax("");
      setTerms("");
      setTermsFK(null);
      setDueDays("");
      setRealWorldCustomerCode("");
      setRealWorldRefnoString("");
      setInvoiceDiscount(false);
      setInvoiceDiscountPercentage("");
      setPaymentDiscount(false);
      setPaymentDiscountPercentage("");
      setPaymentDiscountDays("");
    }
    if (editCustomerData !== null) {
      setInvoiceContact(
        editCustomerData.invoiceContact != null ? editCustomerData.invoiceContact?.trim() : ""
      );
      setPhone(
        editCustomerData.invoiceContactPhone != null
          ? formatPhoneNumber(editCustomerData.invoiceContactPhone)
          : ""
      );
      setFax(
        editCustomerData.invoiceContactFAX != null
          ? formatPhoneNumber(editCustomerData.invoiceContactFAX)
          : ""
      );
      setRealWorldCustomerCode(
        editCustomerData.realWorldCustomerCode != null ? editCustomerData.realWorldCustomerCode?.trim() : ""
      );
      setRealWorldRefnoString(
        editCustomerData.realWorldRefnoString != null ? editCustomerData.realWorldRefnoString?.trim() : ""
      );

      setTermsFK(editCustomerData.termsFK != null ? editCustomerData.termsFK : null);
      fetchTermsById(
        editCustomerData.termsFK != null ? editCustomerData.termsFK : null,
        editCustomerData.termsDescription
      );

      setDueDays(editCustomerData.invoiceDueDays != null ? editCustomerData.invoiceDueDays : "");
      setInvoiceDiscount(editCustomerData.invoiceDiscount != null ? editCustomerData.invoiceDiscount : "");

      setInvoiceDiscountPercentage(
        editCustomerData.invoiceDiscountPercent != null && editCustomerData.invoiceDiscountPercent > 0
          ? editCustomerData.invoiceDiscountPercent
          : ""
            ? Math.floor(editCustomerData.invoiceDiscountPercent * 100 || "")
            : ""
      );
      setPaymentDiscount(editCustomerData.paymentDiscount != null ? editCustomerData.paymentDiscount : "");
      setPaymentDiscountPercentage(
        editCustomerData.paymentDiscountPercent != null && editCustomerData.paymentDiscountPercent > 0
          ? editCustomerData.paymentDiscountPercent
          : ""
      );
      setPaymentDiscountDays(
        editCustomerData.paymentDiscountDays != null && editCustomerData.paymentDiscountDays != 0
          ? editCustomerData.paymentDiscountDays
          : ""
      );
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    invoiceGeneralTabFormData();
  }, [
    invoiceContact,
    phone,
    fax,
    termsFK,
    dueDays,
    invoiceDiscount,
    realWorldCustomerCode,
    realWorldRefnoString,
    invoiceDiscountPercentage,
    paymentDiscount,
    paymentDiscountPercentage,
    paymentDiscountDays,
  ]);

  const invoiceGeneralTabFormData = () => {
    dispatch(
      setCustomerFormData({
        invoiceContact: invoiceContact,
        invoiceContactPhone: phone?.replace(/\s+/g, ""),
        invoiceContactFAX: fax?.replace(/\s+/g, ""),
        invoiceTerms: terms,
        termsFK: termsFK,
        invoiceDueDays: dueDays,
        invoiceDiscount: invoiceDiscount,

        invoiceDiscountPercent: invoiceDiscountPercentage,
        paymentDiscount: paymentDiscount,
        realWorldCustomerCode: realWorldCustomerCode,
        paymentDiscountPercent: paymentDiscountPercentage,
        paymentDiscountDays: paymentDiscountDays,
        realWorldRefnoString: realWorldRefnoString,
      })
    );
  };

  useEffect(() => {
    if (!(invoiceContact && termsFK && realWorldCustomerCode?.trim() && realWorldRefnoString?.trim())) {
      dispatch(setIsInvoiceGeneralTabValid(false));
    } else if (!phone?.match(phoneRegex)) {
      dispatch(setIsInvoiceGeneralTabValid(false));
    } else if (fax && !fax?.match(phoneRegex)) {
      dispatch(setIsInvoiceGeneralTabValid(false));
    } else if (
      invoiceDiscount &&
      (!invoiceDiscountPercentage ||
        parseFloat(invoiceDiscountPercentage) <= 0 ||
        parseFloat(invoiceDiscountPercentage) > 99)
    ) {
      dispatch(setIsInvoiceGeneralTabValid(false));
    } else if (
      paymentDiscount &&
      !(
        String(paymentDiscountPercentage)?.match(/^[0-9][0-9]*$/) &&
        String(paymentDiscountDays)?.match(/^[0-9][0-9]*$/)
      )
    ) {
      dispatch(setIsInvoiceGeneralTabValid(false));
    } else {
      dispatch(setIsInvoiceGeneralTabValid(true));
    }
  }, [
    realWorldCustomerCode,
    invoiceContact,
    phone,
    fax,
    termsFK,
    invoiceDiscount,
    invoiceDiscountPercentage,
    paymentDiscount,
    paymentDiscountPercentage,
    paymentDiscountDays,
    realWorldCustomerCode,
    realWorldRefnoString,
    realWorldRefnoString,
    allDealersFOD,
  ]);

  useEffect(() => {
    if (invoiceDiscount === false) {
      setInvoiceDiscountPercentage("");
    }
  }, [invoiceDiscount]);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const percentageValidation = /^[0-9]*$/;

  const daysValidation = /^[0-9]*$/;

  const validationSchema = yup.object({
    realWorldCustomerCode: yup.string().required(),
    invoiceContact: yup.string().required(),
    phone: yup.string().matches(phoneRegex).required(),
    fax: yup.string().matches(phoneRegex),
    terms: yup.string().required(),
    dueDays: yup.string().matches(daysValidation),
    invoiceDiscount: yup.boolean(),
    paymentDiscount: yup.boolean(),
    realWorldRefnoString: yup.string().required(),
  });

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFax(formattedPhoneNumber);
  };

  const dueDaysFormatHandler = (e) => {
    const dueDays = phoneExtension(e.target.value);
    setDueDays(dueDays);
  };

  return (
    <Formik
      initialValues={{
        invoiceContact,
        phone,
        fax,
        terms,
        dueDays,
        invoiceDiscount,
        invoiceDiscountPercentage,
        paymentDiscount,
        paymentDiscountPercentage,
        paymentDiscountDays,
        realWorldCustomerCode,
        realWorldRefnoString,
      }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      validateOnMount
      initialTouched={{
        realWorldCustomerCode: true,
        invoiceContact: true,
        phone: true,
        fax: true,
        terms: true,
        dueDays: true,
        invoiceDiscount: true,
        paymentdiscount: true,
        invoiceDiscountPercentage: true,
        paymentDiscountPercentage: true,
        paymentDiscountDays: true,
        realWorldRefnoString: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="p-2 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                {/*Invoice Contact*/}
                <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.general.invoice.contact.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <Input
                      className="customFormControl"
                      name="invoiceContact"
                      type="text"
                      value={invoiceContact}
                      maxLength={30}
                      disabled={viewDetail}
                      onChange={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        setInvoiceContact(cleanedValue);
                      }}
                      style={{
                        border:
                          viewDetail === true
                            ? "black 1px solid"
                            : formik.errors.invoiceContact === undefined &&
                                invoiceContact != null &&
                                invoiceContact?.length > 0
                              ? "green 2px solid"
                              : formik.errors.invoiceContact !== undefined
                                ? "red 2px solid"
                                : "",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Phone Field */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.phone")}
                    </Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
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
                            ? "black 1px solid "
                            : formik.errors.phone === undefined && phone != null && phone?.length > 0
                              ? "green 2px solid"
                              : formik.errors.phone !== undefined
                                ? "red 2px solid"
                                : "",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Fax Field */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.dealer.page.general.tab.fax")}
                    </Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                    <Input
                      className="customFormControl"
                      type="fax"
                      name="fax"
                      value={fax}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => {
                        formik.handleChange(e);
                        faxFormatHandler(e);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail === true || fax === ""
                            ? "black 1px solid"
                            : formik.errors.fax === undefined && fax != null && fax?.length > 0
                              ? ""
                              : !phoneRegex?.test(fax)
                                ? "red 2px solid"
                                : "",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/*Blank Space */}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 visibility-hidden">
                  <Col xs={5} sm={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input type="checkbox" className="form-check-input p-0 " name="emailedBolAddSignature" />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 visibility-hidden">
                  <Col xs={5} sm={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input type="checkbox" className="form-check-input p-0 " name="emailedBolAddSignature" />
                  </Col>
                </Form.Group>

                {/* Terms Field */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.general.terms.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                    <AutoCompleteDropdown
                      arrayList={termsList}
                      searchString={terms}
                      customFormatSearchString={(searchString) => searchString}
                      renderItemId={(terms) => terms.termsPK}
                      renderItemField={(terms) => terms.description}
                      handleSearchString={(string) => setTerms(string)}
                      fetchDataBySearchString={getTermsForAutocomplete}
                      onSelect={handleTermsSelection}
                      clearInputCallback={() => {
                        setTermsFK(null);
                      }}
                      disabled={viewDetail}
                      className={`${viewDetail ? "" : !termsFK || terms === "" ? "borderRed" : "borderGreen"}`}
                      selectedId={termsFK}
                      loading={termsLoading}
                    />
                    <LookupButton
                      onClick={() => {
                        setShowTermsLookup(true);
                      }}
                      disabled={viewDetail}
                    />
                  </Col>
                </Form.Group>

                {/*Blank Space */}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 visibility-hidden">
                  <Col xs={5} sm={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input type="checkbox" className="form-check-input p-0 " name="emailedBolAddSignature" />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 visibility-hidden">
                  <Col xs={5} sm={5} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input type="checkbox" className="form-check-input p-0 " name="emailedBolAddSignature" />
                  </Col>
                </Form.Group>

                {/*Due Days*/}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0  visibility-hidden">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.general.due.days.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "80px" }}>
                    <Input
                      className="customFormControl"
                      name="dueDays"
                      value={dueDays}
                      disabled={viewDetail}
                      maxLength={9}
                      onChange={(e) => {
                        formik.handleChange(e);
                        dueDaysFormatHandler(e);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          formik.errors.dueDays === undefined && dueDays?.length > 0
                            ? "green 2px solid"
                            : String(dueDays).match(/^[0-9]*$/)
                              ? ""
                              : "red 2px solid",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/*Invoice Discount*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.general.invoice.discount.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="invoiceDiscount"
                      value={invoiceDiscount}
                      disabled={viewDetail}
                      checked={invoiceDiscount}
                      onChange={(e) => {
                        setInvoiceDiscount(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>

                {/*Invoice Discount Percentage*/}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.general.invoice.discount.percentage.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "40px" }}>
                    <Input
                      className={`customFormControl ${
                        !viewDetail && invoiceDiscount
                          ? parseFloat(invoiceDiscountPercentage) > 99 ||
                            parseFloat(invoiceDiscountPercentage) <= 0 ||
                            !invoiceDiscountPercentage ||
                            lastpointer(invoiceDiscountPercentage)
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                      name="invoiceDiscountPercentage"
                      value={invoiceDiscountPercentage}
                      maxLength={2}
                      disabled={viewDetail || invoiceDiscount === false}
                      onChange={(e) => {
                        formik.handleChange(e);
                        if (e.target.value === ".") {
                          return;
                        }
                        setInvoiceDiscountPercentage(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/*Payment Discount*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.general.payment.discount.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="paymentDiscount"
                      value={paymentDiscount}
                      checked={paymentDiscount}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setPaymentDiscount(e.target.checked);
                        if (!e.target.checked) {
                          setPaymentDiscountPercentage("");
                          setPaymentDiscountDays("");
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                {/*Payment Discount Percentage*/}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.general.payment.discount.percentage.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "40px" }}>
                    <Input
                      className="customFormControl"
                      name="paymentDiscountPercentage"
                      value={paymentDiscountPercentage}
                      maxLength={2}
                      disabled={viewDetail || paymentDiscount === false}
                      onChange={(e) => {
                        formik.handleChange(e);
                        e.target.value?.match(/^[0-9]*$/) && setPaymentDiscountPercentage(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border: !viewDetail
                          ? paymentDiscount
                            ? paymentDiscountPercentage === null ||
                              paymentDiscountPercentage === "" ||
                              paymentDiscountPercentage < 0
                              ? "red 2px solid"
                              : "green 2px solid"
                            : "black 1px solid"
                          : "black 1px solid",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/*Payment Discount Days*/}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.invoice.sub.tab.general.payment.discount.days.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0">
                    <Input
                      className="customFormControl"
                      name="paymentDiscountDays"
                      value={paymentDiscountDays}
                      disabled={viewDetail || !paymentDiscount}
                      onChange={(e) => {
                        formik.handleChange(e);
                        e.target.value?.match(/^\d{0,5}?$/) &&
                          e.target.value <= 32767 &&
                          setPaymentDiscountDays(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border: !viewDetail
                          ? paymentDiscount
                            ? paymentDiscountDays === null ||
                              paymentDiscountDays === "" ||
                              paymentDiscountDays < 0
                              ? "red 2px solid"
                              : "green 2px solid"
                            : "black 1px solid"
                          : "black 1px solid",
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                {/*Quickbook Customer Code*/}

                {/******Enhancement 27*******/}

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Passport Customer Number</Form.Label>
                  </Col>
                  <Col xs={4} sm={4} md={4} className="p-0">
                    <Input
                      id="realworldcustomer"
                      className="customFormControl"
                      name="realWorldCustomerCode"
                      maxLength={12}
                      value={realWorldCustomerCode}
                      disabled={viewDetail}
                      onChange={(e) => {
                        const value = e.target.value;
                        const cleanedValue = value?.replace(/[^a-zA-Z0-9]/g, ""); // remove special characters
                        setRealWorldCustomerCode(cleanedValue);
                      }}
                      style={{
                        border: viewDetail
                          ? "1px solid black"
                          : realWorldCustomerCode?.trim()?.length > 0
                            ? "2px solid green"
                            : "2px solid red",
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-15 row m-l-0 m-r-0">
                  <Col xs={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Passport Reference String</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "410px" }}>
                    <textarea
                      rows={7}
                      cols={200}
                      type="text"
                      className={`customFormControl h-100`}
                      id="realWorldRefnoString"
                      name="realWorldRefnoString"
                      autoComplete="off"
                      value={realWorldRefnoString}
                      disabled={viewDetail}
                      onInput={(e) => {
                        const cleanedValue = removeLeadingWhitespace(e.target.value);
                        setRealWorldRefnoString(cleanedValue);
                      }}
                      style={{
                        resize: "none",
                        display: "fixed",
                        maxWidth: "520px",
                        fontSize: "12px",
                        boxShadow: "none",
                        border: viewDetail
                          ? "1px solid black"
                          : realWorldRefnoString?.trim()?.length > 0
                            ? "2px solid green"
                            : "2px solid red",
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <TermsLookup
              show={showTermsLookup}
              onHide={() => {
                setShowTermsLookup(false);
              }}
              renderItemId={(terms) => terms.termsFK}
              handleLookupSelection={handleTermsSelection}
              MaintenanceProgram
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default InvoiceGeneralSubTabs;
