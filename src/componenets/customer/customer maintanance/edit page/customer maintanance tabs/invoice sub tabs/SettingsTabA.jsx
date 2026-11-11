/* eslint-disable react-hooks/exhaustive-deps */
import { t } from "i18next";
import * as yup from "yup";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import {
  setCustomerFormData,
  setInvoiceSettingsATabNoValidation,
  setIsInvoiceSettingsATabValid,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import numberValidation from "../../../../../../utils/validation/NumberValidation";
import CustomerService from "../../../../../../services/CustomerService";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import Input from "../../../../../../components/common/input";
import LookupButton from "../../../../../common/LookupButton";
import CustomerLookup from "../../../../../LookupScreens/Customer/CustomerLookup";
import { removeLeadingWhitespace } from "../../../../../../utils/utils";

function SettingsTabA() {
  const dispatch = useDispatch();

  const [creditHold, setCreditHold] = useState(false);
  const [billAlternateCustomer, setBillAlternateCustomer] = useState(false);
  const [alternateCustomer, setAlternateCustomer] = useState([]);
  const [alternateCustomerInput, setAlternateCustomerInput] = useState("");
  const [alternateCustomerFK, setAlternateCustomerFK] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preInvoiceUnit, setPreInvoiceUnit] = useState(false);

  const [tollsInvoice, setTollsInvoice] = useState("");
  const [tollsDriver, setTollsDriver] = useState("");
  const [tollsDriverFod, setTollsDriverFod] = useState("");
  const [tollsask, setTollsask] = useState("");
  const [permitsInvoice, setPermitsInvoice] = useState("");
  const [permitsDriver, setPermitsDriver] = useState("");
  const [permitsDriverFod, setPermitsDriverFod] = useState("");
  const [permitsAsk, setPermitsAsk] = useState("");
  const [washInvoice, setWashInvoice] = useState("");
  const [washDriver, setWashDriver] = useState("");
  const [washAsk, setWashAsk] = useState("");
  const [flatRatedUnitTollsInvoice, setFlatRatedUnitTollsInvoice] = useState(false);
  const [flatRatedUnitTollsDriver, setFlatRatedUnitTollsDriver] = useState(false);
  const [flatRatedUnitPermitsInvoice, setFlatRatedUnitPermitsInvoice] = useState(false);
  const [flatRatedUnitPermitsDriver, setFlatRatedUnitPermitsDriver] = useState(false);
  const [flatRatedUnitWashInvoice, setFlatRatedUnitWashInvoice] = useState(false);
  const [flatRatedUnitWashDriver, setFlatRatedUnitWashDriver] = useState(false);
  const [saveTollsandPermits, setSaveTollsandPermits] = useState(false);
  const [invoiceTracking, setInvoiceTracking] = useState(false);

  const [fAXCODCheck, setFAXCODCheck] = useState(false);
  const [codFaxNumber, setCodFaxNumber] = useState("");
  const [codCheckReceipt, setCodCheckReceipt] = useState(false);
  const [codFaxInstructions, setCodFaxInstructions] = useState("");
  const [receivesStatement, setReceivesStatement] = useState(false);
  const [allStatementPeriod, setAllStatementPeriod] = useState([]);
  const [statementPeriod, setStatementPeriod] = useState("");
  const [holdStatementInvoices, setHoldStatementInvoices] = useState(false);

  const [includeStatementInvoices, setIncludeStatementInvoices] = useState(false);
  const [includeStatementPaperwork, setIncludeStatementPaperwork] = useState(false);

  const [emailStatement, setEmailStatement] = useState(false);
  const [mailStatement, setMailStatement] = useState(false);
  const [showAlternateCustomer, setShowAlternateCustomer] = useState(false);
  const [alternativeCustomerFreightOnly, setAlternativeCustomerFreightOnly] = useState(false);

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);
  let activeTab = useSelector((state) => state.customerMaintenanceReducer.activeTab);

  const alternateCustomerSelection = useSelector(
    (state) => state.customerMaintenanceReducer.alternateCustomerSelection
  );

  /************** Alternate Customer Autocomplete Fetch function ***************/
  const getAlternateCustomerByName = (string) => {
    setLoading(true);
    CustomerService.getAlternateCustomerByName(string)
      .then((response) => {
        const data = response?.data;
        const customerList = (data?.content || []).map((customer) => ({ ...customer, name: customer.name?.trim() }));
        setAlternateCustomer(customerList);
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  };

  /************** Alternate Customer Autocomplete Handle function On select ***************/
  const handleAlternateCustomerSelection = (customer) => {
    setAlternateCustomerFK(customer.customerPK);
    setAlternateCustomerInput(customer.name?.trim());
  };

  /************** Alternate Customer Lookup Show ***************/
  const handleAlternateCustomerLookupModalshow = () => {
    setShowAlternateCustomer(true);
  };

  /************** Alternate Customer Lookup Handle function ***************/
  const handleAlternateCustomerLookupSelection = (customer) => {
    setAlternateCustomerFK(customer.customerPK);
    setAlternateCustomerInput(customer.name?.trim());
    setShowAlternateCustomer(false);
  };

  /************** Alternate Customer Lookup Hide ***************/
  const hideAlternateCustomerModal = () => {
    setShowAlternateCustomer(false);
  };

  useEffect(() => {
    if (fAXCODCheck === false) {
      setCodFaxNumber("");
      setCodFaxInstructions("");
    }
  }, [fAXCODCheck]);

  useEffect(() => {
    if (receivesStatement === false) {
      setStatementPeriod("");
      setHoldStatementInvoices(false);
      setMailStatement(false);
      setEmailStatement(false);
    }
  }, [receivesStatement, statementPeriod]);

  const getStatementPeriod = () => {
    CustomerService.getStatementPeriod()
      .then((response) => {
        const data = response?.data;
        setAllStatementPeriod(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getStatementPeriod();
  }, []);

  useEffect(() => {
    if (editCustomerData === null) {
      setCreditHold(false);
      setBillAlternateCustomer("");
      setAlternateCustomerFK(null);
      setAlternateCustomerInput("");
      setPreInvoiceUnit(false);
      setTollsInvoice("");
      setTollsDriver("");
      setTollsDriverFod("");
      setTollsask("");
      setPermitsInvoice("");
      setPermitsDriver("");
      setPermitsDriverFod("");
      setPermitsAsk("");
      setWashInvoice("");
      setWashDriver("");
      setWashAsk("");
      setSaveTollsandPermits(false);
      setFAXCODCheck(false);
      setCodFaxNumber("");
      setCodCheckReceipt(false);
      setCodFaxInstructions("");
      setReceivesStatement(false);
      setStatementPeriod("");
      setHoldStatementInvoices(false);
      setEmailStatement(false);
      setMailStatement(false);
      setInvoiceTracking(false);

      setIncludeStatementInvoices(false);
      setIncludeStatementPaperwork(false);
    }
    if (editCustomerData !== null) {
      setCreditHold(editCustomerData.creditHold != null ? editCustomerData.creditHold : "");
      setBillAlternateCustomer(
        editCustomerData.billAlternateCustomer != null ? editCustomerData.billAlternateCustomer : ""
      );
      setAlternateCustomerFK(
        editCustomerData.alternateCustomerFK != null ? editCustomerData.alternateCustomerFK : ""
      );
      setAlternateCustomerInput(editCustomerData.alternateCustomerName?.trim() || "");
      setPreInvoiceUnit(editCustomerData.preinvoiceUnits != null ? editCustomerData.preinvoiceUnits : "");

      setTollsInvoice(editCustomerData.invoiceTolls != null ? editCustomerData.invoiceTolls : "");
      setTollsDriver(editCustomerData.driverTolls != null ? editCustomerData.driverTolls : "");
      setTollsDriverFod(editCustomerData.driverFODTolls != null ? editCustomerData.driverFODTolls : "");
      setTollsask(editCustomerData.askTolls != null ? editCustomerData.askTolls : "");

      setPermitsInvoice(editCustomerData.invoicePermits != null ? editCustomerData.invoicePermits : "");
      setPermitsDriver(editCustomerData.driverPermits != null ? editCustomerData.driverPermits : "");
      setPermitsDriverFod(editCustomerData.driverFODPermits != null ? editCustomerData.driverFODPermits : "");
      setPermitsAsk(editCustomerData.askPermits != null ? editCustomerData.askPermits : "");
      setWashInvoice(editCustomerData.invoiceWash != null ? editCustomerData.invoiceWash : "");
      setWashDriver(editCustomerData.driverWash != null ? editCustomerData.driverWash : "");
      setWashAsk(editCustomerData.askWash != null ? editCustomerData.askWash : "");

      setSaveTollsandPermits(
        editCustomerData.saveTollsAndPermits != null ? editCustomerData.saveTollsAndPermits : ""
      );
      setInvoiceTracking(editCustomerData.invoiceTracking != null ? editCustomerData.invoiceTracking : "");

      setFAXCODCheck(editCustomerData.faxCODCheck != null ? editCustomerData.faxCODCheck : false);
      setCodFaxNumber(
        editCustomerData.codFAXPhoneNumber != null
          ? formatPhoneNumber(editCustomerData.codFAXPhoneNumber)
          : ""
      );
      setCodCheckReceipt(editCustomerData.codCheckReceipt != null ? editCustomerData.codCheckReceipt : "");
      setCodFaxInstructions(
        editCustomerData.codFAXInstructions != null ? editCustomerData.codFAXInstructions : ""
      );
      setReceivesStatement(
        editCustomerData.receivesStatement != null ? editCustomerData.receivesStatement : ""
      );
      setStatementPeriod(editCustomerData.statementPeriod != null ? editCustomerData.statementPeriod : "");
      setHoldStatementInvoices(
        editCustomerData.holdStatementInvoice != null ? editCustomerData.holdStatementInvoice : ""
      );
      setEmailStatement(
        editCustomerData.emailStatementInvoice != null ? editCustomerData.emailStatementInvoice : ""
      );
      setIncludeStatementInvoices(
        editCustomerData.includeStatementInvoices != null ? editCustomerData.includeStatementInvoices : ""
      );
      setIncludeStatementPaperwork(
        editCustomerData.includeStatementPaperwork != null ? editCustomerData.includeStatementPaperwork : ""
      );

      setMailStatement(
        editCustomerData.mailStatementInvoice != null ? editCustomerData.mailStatementInvoice : ""
      );
      setFlatRatedUnitTollsInvoice(
        editCustomerData.invoiceTollsFlatrate != null ? editCustomerData.invoiceTollsFlatrate : false
      );
      setFlatRatedUnitTollsDriver(
        editCustomerData.driverTollsFlatrate != null ? editCustomerData.driverTollsFlatrate : false
      );
      setFlatRatedUnitPermitsInvoice(
        editCustomerData.invoicePermitsFlatrate != null ? editCustomerData.invoicePermitsFlatrate : false
      );
      setFlatRatedUnitPermitsDriver(
        editCustomerData.driverPermitsFlatrate != null ? editCustomerData.driverPermitsFlatrate : false
      );
      setFlatRatedUnitWashInvoice(
        editCustomerData.invoiceWashFlatrate != null ? editCustomerData.invoiceWashFlatrate : false
      );
      setFlatRatedUnitWashDriver(
        editCustomerData.driverWashFlatrate != null ? editCustomerData.driverWashFlatrate : false
      );
      setAlternativeCustomerFreightOnly(
        editCustomerData.alternateCustomerFreightOnly != null
          ? editCustomerData.alternateCustomerFreightOnly
          : false
      );
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    settingsTabAFormData();
  }, [
    creditHold,
    billAlternateCustomer,
    alternateCustomerFK,
    preInvoiceUnit,
    tollsInvoice,
    tollsDriver,
    tollsDriverFod,
    tollsask,
    permitsInvoice,
    permitsDriver,
    permitsDriverFod,
    permitsAsk,
    washInvoice,
    washDriver,
    washAsk,
    saveTollsandPermits,
    fAXCODCheck,
    codFaxNumber,
    codCheckReceipt,
    codFaxInstructions,
    receivesStatement,
    statementPeriod,
    holdStatementInvoices,
    emailStatement,
    mailStatement,
    flatRatedUnitTollsInvoice,
    flatRatedUnitTollsDriver,
    flatRatedUnitPermitsInvoice,
    flatRatedUnitPermitsDriver,
    flatRatedUnitWashInvoice,
    flatRatedUnitWashDriver,
    alternativeCustomerFreightOnly,
    includeStatementInvoices,
    includeStatementPaperwork,
    invoiceTracking,
  ]);

  const settingsTabAFormData = () => {
    dispatch(
      setCustomerFormData({
        creditHold: creditHold,
        billAlternateCustomer: billAlternateCustomer,
        alternateCustomerFK: alternateCustomerFK,
        preinvoiceUnits: preInvoiceUnit,
        invoiceTolls: tollsInvoice,
        driverTolls: tollsDriver,
        driverFODTolls: tollsDriverFod,
        askTolls: tollsask,
        invoicePermits: permitsInvoice,
        driverPermits: permitsDriver,
        driverFODPermits: permitsDriverFod,
        askPermits: permitsAsk,
        invoiceWash: washInvoice,
        driverWash: washDriver,
        askWash: washAsk,
        saveTollsAndPermits: saveTollsandPermits,
        faxCODCheck: fAXCODCheck,
        codFAXPhoneNumber: codFaxNumber.replace(/\s+/g, ""),
        codCheckReceipt: codCheckReceipt,
        codFAXInstructions: codFaxInstructions,
        receivesStatement: receivesStatement,
        statementPeriod: statementPeriod,
        holdStatementInvoice: holdStatementInvoices,
        emailStatementInvoice: emailStatement,
        mailStatementInvoice: mailStatement,
        invoiceTollsFlatrate: flatRatedUnitTollsInvoice,
        driverTollsFlatrate: flatRatedUnitTollsDriver,
        invoicePermitsFlatrate: flatRatedUnitPermitsInvoice,
        driverPermitsFlatrate: flatRatedUnitPermitsDriver,
        invoiceWashFlatrate: flatRatedUnitWashInvoice,
        driverWashFlatrate: flatRatedUnitWashDriver,
        alternateCustomerFreightOnly: alternativeCustomerFreightOnly,
        includeStatementInvoices: includeStatementInvoices,
        includeStatementPaperwork: includeStatementPaperwork,
        invoiceTracking: invoiceTracking,
      })
    );
  };

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const exchangeRateValidation = /^\d{0,6}(?:\.\d{0,4})?$/;

  const validationSchema = yup.object({
    billAlternateCustomer: yup.boolean(),
    alternateCustomer: yup.string().when("billAlternateCustomer", {
      is: true,
      then: yup.string().required(),
      otherwise: "",
    }),
    invoiceAsCND: yup.boolean(),
    fAXCODCheck: yup.boolean(),
    codFaxNumber: yup.string().when("fAXCODCheck", {
      is: true,
      then: yup.string().matches(phoneRegex).required(),
      otherwise: yup.string().matches(phoneRegex),
    }),
    codFaxInstructions: yup.string().when("fAXCODCheck", {
      is: true,
      then: yup.string().required(),
      otherwise: "",
    }),
    receivesStatement: yup.boolean(),
    statementPeriod: yup.string().when("receivesStatement", {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
  });

  const codFaxNumberFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setCodFaxNumber(formattedPhoneNumber);
  };

  useEffect(() => {
    if (!billAlternateCustomer) {
      setAlternateCustomerFK(null);
      setAlternateCustomerInput("");
    }
  }, [billAlternateCustomer]);

  useEffect(() => {
    if (billAlternateCustomer || fAXCODCheck || receivesStatement) {
      dispatch(setInvoiceSettingsATabNoValidation(false));
    } else {
      dispatch(setInvoiceSettingsATabNoValidation(true));
    }

    if (billAlternateCustomer && !alternateCustomerFK) {
      dispatch(setIsInvoiceSettingsATabValid(false));
    } else if (fAXCODCheck && (!codFaxNumber.match(phoneRegex) || !codFaxInstructions)) {
      dispatch(setIsInvoiceSettingsATabValid(false));
    } else if (receivesStatement && !statementPeriod) {
      dispatch(setIsInvoiceSettingsATabValid(false));
    } else {
      dispatch(setIsInvoiceSettingsATabValid(true));
    }
  }, [
    ,
    fAXCODCheck,
    codFaxNumber,
    codFaxInstructions,
    receivesStatement,
    statementPeriod,
    alternateCustomerFK,
    billAlternateCustomer,
  ]);

  useEffect(() => {
    if (!receivesStatement || !emailStatement) {
      setIncludeStatementInvoices(false);
      setIncludeStatementPaperwork(false);
    }
  }, [receivesStatement, emailStatement]);

  return (
    <Formik
      initialValues={{
        billAlternateCustomer,
        alternateCustomer,
        codFaxNumber,
        fAXCODCheck,
        codFaxInstructions,
        receivesStatement,
        statementPeriod,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        billAlternateCustomer: false,
        alternateCustomer: true,
        codFaxNumber: true,
        invoiceAsCND: false,
        exchangeRate: true,
        fAXCODCheck: false,
        codFaxInstructions: true,
        receivesStatement: false,
        statementPeriod: true,
      }}
    >
      {(formik) => (
        <div className="p-2 w-100 p-t-0 p-b-0">
          <Row className="m-0 p-0">
            <Col sm={6} md={6} lg={6} xl={6} xs={6}>
              {/*Credit Hold*/}
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.credit.hold.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="creditHold"
                    value={creditHold}
                    checked={creditHold}
                    disabled={viewDetail}
                    onChange={(e) => setCreditHold(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Bill Alternate Customer*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.bill.alternate.customer.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="billAlternateCustomer"
                    checked={billAlternateCustomer}
                    disabled={viewDetail}
                    onChange={(e) => setBillAlternateCustomer(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Alternate Customer*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.alternate.customer.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={alternateCustomer}
                    loading={loading}
                    searchString={alternateCustomerInput}
                    customFormatSearchString={(searchString) => searchString}
                    renderItemId={(customer) => customer.customerPK}
                    renderItemField={(customer) => customer.name}
                    handleSearchString={(string) => setAlternateCustomerInput(string)}
                    fetchDataBySearchString={getAlternateCustomerByName}
                    onSelect={handleAlternateCustomerSelection}
                    selectedId={alternateCustomerFK}
                    clearInputCallback={() => {
                      setAlternateCustomerFK(null);
                    }}
                    disabled={viewDetail || !billAlternateCustomer}
                    className={`${
                      viewDetail
                        ? ""
                        : billAlternateCustomer
                          ? !alternateCustomerFK || alternateCustomerInput === ""
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                    }`}
                  />
                  <LookupButton
                    onClick={handleAlternateCustomerLookupModalshow}
                    disabled={viewDetail || billAlternateCustomer === false}
                  />
                </Col>
              </Form.Group>

              {/*Alternative Customer Freight Only*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="customColFormLabel d-flex">
                    Alternate Customer Freight Only
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="alternativeCustomerFreightOnly"
                    value={alternativeCustomerFreightOnly}
                    checked={alternativeCustomerFreightOnly}
                    disabled={viewDetail}
                    onChange={(e) => setAlternativeCustomerFreightOnly(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*PreInvoice Units*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.pre.invoice.units.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="preInvoiceUnit"
                    value={preInvoiceUnit}
                    checked={preInvoiceUnit}
                    disabled={viewDetail}
                    onChange={(e) => setPreInvoiceUnit(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Tolls*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.tolls.field")}
                  </Form.Label>
                </Col>

                <Col sm={8} xs={8} md={8} lg={8} xl={8} className="p-0">
                  <Row className="m-0 p-0">
                    {/*Invoice*/}
                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="tollsInvoice"
                        value={tollsInvoice}
                        checked={tollsInvoice}
                        disabled={viewDetail}
                        onChange={(e) => setTollsInvoice(e.target.checked)}
                      />
                    </Col>
                    <Col
                      xs={2}

                      className="p-0 "
                    >
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.tab.heading.invoice")}
                      </Form.Label>
                    </Col>

                    {/*Driver*/}
                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="tollsDriver"
                        value={tollsDriver}
                        checked={tollsDriver}
                        disabled={viewDetail}
                        onChange={(e) => setTollsDriver(e.target.checked)}
                      />
                    </Col>
                    <Col xs={2} className="p-0 ">
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.orders.sub.tab.detail.driver.field")}
                      </Form.Label>
                    </Col>

                    {/*Driver FOD*/}
                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="tollsDriverFod"
                        value={tollsDriverFod}
                        checked={tollsDriverFod}
                        disabled={viewDetail}
                        onChange={(e) => setTollsDriverFod(e.target.checked)}
                      />
                    </Col>
                    <Col xs={2} className="p-0 ">
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.invoice.sub.tab.settingA.driver.fod.field")}
                      </Form.Label>
                    </Col>

                    {/*Ask*/}
                    <Col xs={2} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="tollsask"
                        value={tollsask}
                        checked={tollsask}
                        disabled={viewDetail}
                        onChange={(e) => setTollsask(e.target.checked)}
                      />
                    </Col>

                    <Col xs={1} className="p-0 small-screen-w-20">
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.invoice.sub.tab.settingA.ask.field")}
                      </Form.Label>
                    </Col>
                  </Row>
                </Col>
              </Form.Group>

              {/*Permits*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.permits.field")}
                  </Form.Label>
                </Col>

                <Col sm={8} xs={8} md={8} lg={8} xl={8} className="p-0">
                  <Row className="m-0 p-0">
                    {/*Invoice*/}

                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="permitsInvoice"
                        value={permitsInvoice}
                        checked={permitsInvoice}
                        disabled={viewDetail}
                        onChange={(e) => setPermitsInvoice(e.target.checked)}
                      />
                    </Col>
                    <Col
                      xs={2}

                      className="p-0 "
                    >
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.tab.heading.invoice")}
                      </Form.Label>
                    </Col>
                    {/*Driver*/}

                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="permitsDriver"
                        value={permitsDriver}
                        checked={permitsDriver}
                        disabled={viewDetail}
                        onChange={(e) => setPermitsDriver(e.target.checked)}
                      />
                    </Col>
                    <Col xs={2} className="p-0 ">
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.orders.sub.tab.detail.driver.field")}
                      </Form.Label>
                    </Col>

                    {/*Driver FOD*/}

                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="permitsDriverFod"
                        value={permitsDriverFod}
                        checked={permitsDriverFod}
                        disabled={viewDetail}
                        onChange={(e) => setPermitsDriverFod(e.target.checked)}
                      />
                    </Col>
                    <Col xs={2} className="p-0 ">
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.invoice.sub.tab.settingA.driver.fod.field")}
                      </Form.Label>
                    </Col>

                    {/*Ask*/}
                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="permitsAsk"
                        value={permitsAsk}
                        checked={permitsAsk}
                        disabled={viewDetail}
                        onChange={(e) => setPermitsAsk(e.target.checked)}
                      />
                    </Col>

                    <Col xs={1} className="p-0 small-screen-w-20">
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.invoice.sub.tab.settingA.ask.field")}
                      </Form.Label>
                    </Col>
                  </Row>
                </Col>
              </Form.Group>

              {/*Wash*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.wash.field")}
                  </Form.Label>
                </Col>

                <Col sm={8} xs={8} md={8} lg={8} xl={8} className="p-0">
                  <Row className="m-0 p-0">
                    {/*Invoice*/}

                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="washInvoice"
                        value={washInvoice}
                        checked={washInvoice}
                        disabled={viewDetail}
                        onChange={(e) => setWashInvoice(e.target.checked)}
                      />
                    </Col>
                    <Col xs={2} className="p-0 ">
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.tab.heading.invoice")}
                      </Form.Label>
                    </Col>

                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="washDriver"
                        value={washDriver}
                        checked={washDriver}
                        disabled={viewDetail}
                        onChange={(e) => setWashDriver(e.target.checked)}
                      />
                    </Col>
                    <Col xs={2} className="p-0 ">
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.orders.sub.tab.detail.driver.field")}
                      </Form.Label>
                    </Col>

                    {/*Driver FOD*/}
                    <Col xs={1} className="p-0 w-25px d-flex align-items-center hide-elements">
                      <input type="checkbox" className="form-check-input p-0 " />
                    </Col>
                    <Col xs={2} className="p-0 hide-elements">
                      <Form.Label className="customColFormLabel"></Form.Label>
                    </Col>

                    {/*Ask*/}
                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="washAsk"
                        value={washAsk}
                        checked={washAsk}
                        disabled={viewDetail}
                        onChange={(e) => setWashAsk(e.target.checked)}
                      />
                    </Col>

                    <Col xs={1} className="p-0 small-screen-w-20">
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.invoice.sub.tab.settingA.ask.field")}
                      </Form.Label>
                    </Col>
                  </Row>
                </Col>
              </Form.Group>

              {/*Flat Rated Unit Tolls*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="customColFormLabel">Flat Rated Unit Tolls</Form.Label>
                </Col>

                <Col sm={8} xs={8} md={8} lg={8} xl={8} className="p-0">
                  <Row className="m-0 p-0">
                    {/*Invoice*/}

                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="flatRatedUnitTollsInvoice"
                        value={flatRatedUnitTollsInvoice}
                        checked={flatRatedUnitTollsInvoice}
                        disabled={viewDetail}
                        onChange={(e) => setFlatRatedUnitTollsInvoice(e.target.checked)}
                      />
                    </Col>
                    <Col
                      xs={2}

                      className="p-0 "
                    >
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.tab.heading.invoice")}
                      </Form.Label>
                    </Col>

                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="flatRatedUnitTollsDriver"
                        value={flatRatedUnitTollsDriver}
                        checked={flatRatedUnitTollsDriver}
                        disabled={viewDetail}
                        onChange={(e) => setFlatRatedUnitTollsDriver(e.target.checked)}
                      />
                    </Col>
                    <Col xs={2} className="p-0 ">
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.orders.sub.tab.detail.driver.field")}
                      </Form.Label>
                    </Col>
                  </Row>
                </Col>
              </Form.Group>

              {/*Flat Rated Unit Permits*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="customColFormLabel">Flat Rated Unit Permits</Form.Label>
                </Col>

                <Col sm={8} xs={8} md={8} lg={8} xl={8} className="p-0">
                  <Row className="m-0 p-0">
                    {/*Invoice*/}

                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="flatRatedUnitPermitsInvoice"
                        value={flatRatedUnitPermitsInvoice}
                        checked={flatRatedUnitPermitsInvoice}
                        disabled={viewDetail}
                        onChange={(e) => setFlatRatedUnitPermitsInvoice(e.target.checked)}
                      />
                    </Col>
                    <Col
                      xs={2}

                      className="p-0 "
                    >
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.tab.heading.invoice")}
                      </Form.Label>
                    </Col>

                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="flatRatedUnitPermitsDriver"
                        value={flatRatedUnitPermitsDriver}
                        checked={flatRatedUnitPermitsDriver}
                        disabled={viewDetail}
                        onChange={(e) => setFlatRatedUnitPermitsDriver(e.target.checked)}
                      />
                    </Col>
                    <Col xs={2} className="p-0 ">
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.orders.sub.tab.detail.driver.field")}
                      </Form.Label>
                    </Col>
                  </Row>
                </Col>
              </Form.Group>

              {/*Flat Rated Unit Wash*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="customColFormLabel">Flat Rated Unit Wash</Form.Label>
                </Col>

                <Col sm={8} xs={8} md={8} lg={8} xl={8} className="p-0">
                  <Row className="m-0 p-0">
                    {/*Invoice*/}

                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="flatRatedUnitWashInvoice"
                        value={flatRatedUnitWashInvoice}
                        checked={flatRatedUnitWashInvoice}
                        disabled={viewDetail}
                        onChange={(e) => setFlatRatedUnitWashInvoice(e.target.checked)}
                      />
                    </Col>
                    <Col
                      xs={2}

                      className="p-0 "
                    >
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.tab.heading.invoice")}
                      </Form.Label>
                    </Col>

                    <Col xs={1} className="p-0 w-25px d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="flatRatedUnitWashDriver"
                        value={flatRatedUnitWashDriver}
                        checked={flatRatedUnitWashDriver}
                        disabled={viewDetail}
                        onChange={(e) => setFlatRatedUnitWashDriver(e.target.checked)}
                      />
                    </Col>
                    <Col xs={2} className="p-0 ">
                      <Form.Label className="customColFormLabel">
                        {t("customer.maintanance.orders.sub.tab.detail.driver.field")}
                      </Form.Label>
                    </Col>
                  </Row>
                </Col>
              </Form.Group>

              {/*Save Permits and Permits*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.save.tolls.and.permits.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="saveTollsandPermits"
                    value={saveTollsandPermits}
                    checked={saveTollsandPermits}
                    disabled={viewDetail}
                    onChange={(e) => setSaveTollsandPermits(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/****Enhancement 31****/}

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="customColFormLabel">Invoice Tracking</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="invoiceTracking"
                    value={invoiceTracking}
                    checked={invoiceTracking}
                    disabled={viewDetail}
                    onChange={(e) => setInvoiceTracking(e.target.checked)}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col sm={6} md={6} xs={6}>
              {/*FAX COD Check*/}
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0">
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.fax.cod.check.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="fAXCODCheck"
                    value={fAXCODCheck}
                    checked={fAXCODCheck}
                    disabled={viewDetail}
                    onChange={(e) => setFAXCODCheck(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*COD FAX Number*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.cod.number.field")}
                  </Form.Label>
                </Col>
                <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "110px" }}>
                  <Input
                    className="customFormControl"
                    name="codFaxNumber"
                    type="fax"
                    value={codFaxNumber}
                    disabled={viewDetail || fAXCODCheck === false}
                    maxLength={14}
                    onChange={(e) => {
                      formik.handleChange(e);
                      codFaxNumberFormatHandler(e);
                    }}
                    onBlur={formik.handleBlur}
                    style={{
                      border:
                        viewDetail === true
                          ? "black 1px solid"
                          : formik.errors.codFaxNumber === undefined &&
                              codFaxNumber != null &&
                              codFaxNumber.length > 0
                            ? "green 2px solid"
                            : formik.errors.codFaxNumber !== undefined
                              ? "red 2px solid"
                              : "",
                    }}
                  />
                </Col>
              </Form.Group>

              {/*COD Check Receipt*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0">
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.cod.check.receipt.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="codCheckReceipt"
                    value={codCheckReceipt}
                    checked={codCheckReceipt}
                    disabled={viewDetail}
                    onChange={(e) => setCodCheckReceipt(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*COD FAX Instructions*/}
              <Form.Group className="form-group mt-5 align-items-center row  m-l-0 m-r-0">
                <Col sm={12} md={12} xs={12} className="p-0">
                  <label className="customColFormLabel p-0 m-b-20">
                    {t("customer.maintanance.invoice.sub.tab.settingA.cod.fax.instruction.field")}
                  </label>
                </Col>

                <Col xs={10} md={10} className="p-0">
                  <textarea
                    rows={7}
                    cols={20}
                    type="text"
                    className="customFormControl h-100"
                    name="codFaxInstructions"
                    value={codFaxInstructions}
                    disabled={viewDetail || fAXCODCheck === false}
                    autoComplete="off"

                    onInput={(e) => {
                      const cleanedValue = removeLeadingWhitespace(e.target.value);
                      setCodFaxInstructions(cleanedValue);
                    }}
                    style={{
                      border:
                        viewDetail === true
                          ? "black 1px solid"
                          : formik.errors.codFaxInstructions === undefined &&
                              codFaxInstructions != null &&
                              codFaxInstructions?.length > 0
                            ? "green 2px solid"
                            : formik.errors.codFaxInstructions !== undefined
                              ? "red 2px solid"
                              : "",
                    }}
                  />
                </Col>
              </Form.Group>

              {/*Receives Statement*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0">
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.receives.statement.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="receivesStatement"
                    value={receivesStatement}
                    checked={receivesStatement}
                    disabled={viewDetail}
                    onChange={(e) => setReceivesStatement(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Statement Period */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.statement.period.field")}
                  </Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <Form.Select
                    className={`customFormControl ${viewDetail || !receivesStatement ? "borderBlack" : statementPeriod ? "borderGreen" : "borderRed"}`}
                    name="statementPeriod"
                    disabled={viewDetail || receivesStatement === false}
                    value={statementPeriod}
                    onChange={(e) => {
                      setStatementPeriod(e.target.value);
                    }}
                  >
                    <option value="">---Select---</option>
                    {allStatementPeriod?.map((item) => (
                      <option key={item.statementPeriodID} value={item.statementPeriodID}>
                        {item.statementPeriodName}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              {/*Hold Statement Invoices*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0">
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.hold.statement.invoices.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="holdStatementInvoices"
                    value={holdStatementInvoices}
                    checked={holdStatementInvoices}
                    disabled={viewDetail || !statementPeriod}
                    onChange={(e) => setHoldStatementInvoices(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*****Enhancement32*********/}

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0">
                  <Form.Label className="customColFormLabel">Include Statement Invoices</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="holdStatementInvoices"
                    value={includeStatementInvoices}
                    checked={includeStatementInvoices}
                    disabled={viewDetail || !receivesStatement || !emailStatement || !statementPeriod}
                    onChange={(e) => setIncludeStatementInvoices(e.target.checked)}
                  />
                </Col>

                <Col xs={3} sm={3} className="p-0">
                  <Form.Label className="customColFormLabel">Include Statement PaperWork</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="holdStatementInvoices"
                    value={includeStatementPaperwork}
                    checked={includeStatementPaperwork}
                    disabled={viewDetail || !receivesStatement || !emailStatement || !statementPeriod}
                    onChange={(e) => setIncludeStatementPaperwork(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Mail Statements*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0">
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.mail.statements.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="mailStatement"
                    value={mailStatement}
                    checked={mailStatement}
                    disabled={viewDetail || !(statementPeriod && receivesStatement)}
                    onChange={(e) => setMailStatement(e.target.checked)}
                  />
                </Col>

                <Col xs={3} sm={3} className="p-0">
                  <Form.Label className="customColFormLabel">
                    {t("customer.maintanance.invoice.sub.tab.settingA.email.statements.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="emailStatement"
                    value={viewDetail}
                    checked={emailStatement}
                    disabled={viewDetail || !(statementPeriod && receivesStatement)}
                    onChange={(e) => setEmailStatement(e.target.checked)}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          {/* Customer Lookup Modal */}
          <CustomerLookup
            show={showAlternateCustomer}
            onHide={hideAlternateCustomerModal}
            renderItemId={(customer) => customer.customerPK}
            handleLookupSelection={handleAlternateCustomerLookupSelection}
            MaintenanceProgram
          />
        </div>
      )}
    </Formik>
  );
}

export default SettingsTabA;
