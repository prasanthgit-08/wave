import { t } from "i18next";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import {
  setCustomerFormData,
  setIsInvoiceSettingsBTabValid,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import { Formik } from "formik";
import CustomerService from "../../../../../../services/CustomerService";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import Input from "../../../../../../components/common/input";
import LookupButton from "../../../../../common/LookupButton";
import CustomerGroupsLookup from "../../../../../LookupScreens/CustomerGroups/CustomerGroupsLookup";
import { useParams } from "react-router-dom";
import CustomerGroupService from "../../../../../../services/CustomerGroupService";
import { lastpointer } from "../../../../../../utils/utils";

function SettingsTabB() {
  const dispatch = useDispatch();
  const params = useParams();
  const customerId = params.id;

  const [invoiceBreakdownSeperately, setInvoiceBreakdownSeperately] = useState(false);
  const [invoiceBreakdownImmediately, setInvoiceBreakdownImmediately] = useState(false);
  const [allowReturnRates, setAllowReturnRates] = useState(false);
  const [singleunitInvoiceFoMultiUnits, setSingleunitInvoiceFoMultiUnits] = useState(false);
  const [invoiceEmailedToPlant, setInvoiceEmailedToPlant] = useState(false);
  const [invoiceAsCND, setInvoiceAsCND] = useState(false);
  const [exchangeRate, setExchangeRate] = useState("");
  const [minNameLength, setMinNameLength] = useState("");
  const [maxNameLength, setMaxNameLength] = useState("");
  const [customerGroupData, setCustomerGroupData] = useState([]);
  const [customerGroupFK, setCustomerGroupFK] = useState("");
  const [customerGroupDescription, setCustomerGroupDescription] = useState("");
  const [showCustomerGroupLookup, setShowCustomerGroupLookup] = useState(false);

  const [alternateLoading, setAlternateLoading] = useState(false);

  const [selectAttemptedPickupAmount, setSelectAttemptedPickupAmount] = useState(false);
  const [invoiceAttemptedPickupAmount, setInvoiceAttemptedPickupAmount] = useState("");
  const [driverAttemptedPickUPAmount, setDriverAttemptedPickUPAmount] = useState("");
  const [adjustAttemptedPickupAmount, setAdjustAttemptedPickupAmount] = useState(false);

  const [paperworkNameFromList, setPaperworkNameFromList] = useState([]);
  const [alternativePaperworkNameFromList, setAlternativePaperworkNameFromList] = useState([]);
  const [paperworkNameFromId, setPaperworkNameFromId] = useState("");
  const [alternativePaperworkNameFromId, setAlternativePaperworkNameFromId] = useState("");
  const [hasGroup, setHasGroup] = useState("");

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  const usePlants = useSelector((state) => state.customerMaintenanceReducer.settingsUsePlants);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  const getPaperWorksNameFromList = () => {
    CustomerService.getPaperworkNameFrom().then(({ data }) => {
      setPaperworkNameFromList(data);
    });
  };
  const getAlternativePaperWorksNameFromList = () => {
    CustomerService.getAlternativePaperworkNameFrom().then(({ data }) => {
      setAlternativePaperworkNameFromList(data);
    });
  };

  const handleCustomerGroupSelection = (group) => {
    setCustomerGroupDescription(group.description);
    setCustomerGroupFK(group.customerGroupPK);
    setShowCustomerGroupLookup(false);
  };

  const fetchCustomerGroupDataBySearchString = (string) => {
    setAlternateLoading(true);
    CustomerGroupService.getCustomerGroupForAuto(string, customerId)
      .then((response) => {
        setCustomerGroupData(response?.data?.content);
      })
      .finally(() => {
        setAlternateLoading(false);
      });
  };

  useEffect(() => {
    if (
      !paperworkNameFromId ||
      paperworkNameFromId === "Invoice Number" ||
      paperworkNameFromId === "Unit Number"
    ) {
      setAlternativePaperworkNameFromId("");
    }
    if (paperworkNameFromId) {
      if (paperworkNameFromId === "Invoice Number") {
        setMaxNameLength(6);
        setMinNameLength(5);
      } else {
        setMaxNameLength(5);
        setMinNameLength(5);
      }
    } else {
      setMaxNameLength("");
      setMinNameLength("");
    }
  }, [paperworkNameFromId]);

  useEffect(() => {
    if (editCustomerData === null) {
      setInvoiceBreakdownSeperately(false);
      setInvoiceBreakdownImmediately(false);
      setAllowReturnRates(false);
      setInvoiceEmailedToPlant(false);
      setInvoiceAsCND(false);
      setExchangeRate("");
      setSelectAttemptedPickupAmount(false);
      setInvoiceAttemptedPickupAmount("");
      setDriverAttemptedPickUPAmount("");
      setAdjustAttemptedPickupAmount(false);
    }
    if (editCustomerData !== null) {
      setInvoiceBreakdownSeperately(
        editCustomerData.invoiceBreakdownSeperately != null
          ? editCustomerData.invoiceBreakdownSeperately
          : false
      );
      setInvoiceBreakdownImmediately(
        editCustomerData.invoiceBreakdownImmediately != null
          ? editCustomerData.invoiceBreakdownImmediately
          : false
      );
      setAllowReturnRates(
        editCustomerData.allowReturnRates != null ? editCustomerData.allowReturnRates : false
      );
      setInvoiceEmailedToPlant(
        editCustomerData.allowInvoiceEmailedToPlant != null ? editCustomerData.allowInvoiceEmailedToPlant : ""
      );
      setPaperworkNameFromId(editCustomerData.paperworkName != null ? editCustomerData.paperworkName : "");
      setInvoiceAsCND(editCustomerData.invoiceAsCND != null ? editCustomerData.invoiceAsCND : "");
      setExchangeRate(
        editCustomerData.invoiceAsCND != null &&
          editCustomerData.exchangeRate != null &&
          editCustomerData.exchangeRate > 0
          ? editCustomerData.exchangeRate
          : ""
      );
      setAlternativePaperworkNameFromId(
        editCustomerData.paperworkName &&
          editCustomerData.paperworkName !== "Invoice Number" &&
          editCustomerData.alternatePaperworkName != null
          ? editCustomerData.alternatePaperworkName
          : ""
      );
      setSingleunitInvoiceFoMultiUnits(
        editCustomerData.singleInvoiceMultiUnit !== null ? editCustomerData.singleInvoiceMultiUnit : false
      );

      setSelectAttemptedPickupAmount(
        editCustomerData.selectAttemptedPickupCustomer != null && editCustomerData.hasCustomerGroups
          ? editCustomerData.selectAttemptedPickupCustomer
          : ""
      );
      setInvoiceAttemptedPickupAmount(
        editCustomerData.invoiceAttemptedPickup != null && editCustomerData.invoiceAttemptedPickup > 0
          ? editCustomerData.invoiceAttemptedPickup
          : ""
      );
      setDriverAttemptedPickUPAmount(
        editCustomerData.driverAttemptedPickup != null && editCustomerData.driverAttemptedPickup > 0
          ? editCustomerData.driverAttemptedPickup
          : ""
      );
      setAdjustAttemptedPickupAmount(
        editCustomerData.adjustAttemptedPickup != null ? editCustomerData.adjustAttemptedPickup : ""
      );
      setCustomerGroupDescription(
        editCustomerData.alternateAPUCustomerGroupDescription != null
          ? editCustomerData.alternateAPUCustomerGroupDescription
          : ""
      );
      setCustomerGroupFK(
        editCustomerData.alternateAPUCustomerGroupFK != null
          ? editCustomerData.alternateAPUCustomerGroupFK
          : ""
      );
      setHasGroup(editCustomerData.hasCustomerGroups != null ? editCustomerData.hasCustomerGroups : false);

      setMinNameLength(
        editCustomerData.paperworkName && editCustomerData.minimumNameLength != null
          ? editCustomerData.minimumNameLength
          : ""
      );
      setMaxNameLength(
        editCustomerData.paperworkName && editCustomerData.maximumNameLength != null
          ? editCustomerData.maximumNameLength
          : ""
      );
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    if (invoiceAsCND === false) {
      setExchangeRate("");
    }
  }, [exchangeRate, invoiceAsCND]);

  const validationSchema = yup.object({
    invoiceAsCND: yup.boolean(),
  });

  useEffect(() => {
    settingsTabBFormData();
  }, [
    selectAttemptedPickupAmount,
    invoiceAttemptedPickupAmount,
    driverAttemptedPickUPAmount,
    adjustAttemptedPickupAmount,
    invoiceBreakdownSeperately,
    invoiceBreakdownImmediately,
    allowReturnRates,
    invoiceEmailedToPlant,
    invoiceAsCND,
    exchangeRate,
    paperworkNameFromId,
    alternativePaperworkNameFromId,
    maxNameLength,
    minNameLength,
    singleunitInvoiceFoMultiUnits,
    customerGroupFK,
  ]);

  useEffect(() => {
    getAlternativePaperWorksNameFromList();
    getPaperWorksNameFromList();
  }, []);

  useEffect(() => {
    if (!paperworkNameFromId) {
      dispatch(setIsInvoiceSettingsBTabValid(false));
    } else if (
      paperworkNameFromId === "Unit Number" &&
      !(
        maxNameLength &&
        minNameLength &&
        Number(maxNameLength) >= 5 &&
        Number(minNameLength) >= 5 &&
        Number(maxNameLength) >= Number(minNameLength)
      )
    ) {
      dispatch(setIsInvoiceSettingsBTabValid(false));
    } else if (
      (paperworkNameFromId !== "Unit Number" &&
        paperworkNameFromId !== "Invoice Number" &&
        !alternativePaperworkNameFromId) ||
      !(
        maxNameLength &&
        minNameLength &&
        Number(maxNameLength) >= 5 &&
        Number(minNameLength) >= 5 &&
        Number(maxNameLength) >= Number(minNameLength)
      )
    ) {
      dispatch(setIsInvoiceSettingsBTabValid(false));
    } else if (selectAttemptedPickupAmount && !customerGroupFK) {
      dispatch(setIsInvoiceSettingsBTabValid(false));
    } else if (
      invoiceAsCND &&
      (!exchangeRate ||
        Number(exchangeRate) <= 0 ||
        lastpointer(exchangeRate) ||
        !/^\d{0,2}(?:\.\d{0,4})?$/.test(exchangeRate))
    ) {
      dispatch(setIsInvoiceSettingsBTabValid(false));
    } else if (lastpointer(invoiceAttemptedPickupAmount)) {
      dispatch(setIsInvoiceSettingsBTabValid(false));
    } else if (lastpointer(driverAttemptedPickUPAmount)) {
      dispatch(setIsInvoiceSettingsBTabValid(false));
    } else {
      dispatch(setIsInvoiceSettingsBTabValid(true));
    }
  }, [
    paperworkNameFromId,
    alternativePaperworkNameFromId,
    minNameLength,
    maxNameLength,
    exchangeRate,
    invoiceAsCND,
    invoiceAttemptedPickupAmount,
    driverAttemptedPickUPAmount,
    selectAttemptedPickupAmount,
    customerGroupFK,
  ]);

  useEffect(() => {
    if (!hasGroup) {
      setSelectAttemptedPickupAmount(false);
    }
  }, [hasGroup]);

  const settingsTabBFormData = () => {
    dispatch(
      setCustomerFormData({
        invoiceBreakdownSeperately: invoiceBreakdownSeperately,
        invoiceBreakdownImmediately: invoiceBreakdownImmediately,
        allowReturnRates: allowReturnRates,
        allowInvoiceEmailedToPlant: invoiceEmailedToPlant,
        invoiceAsCND: invoiceAsCND,
        exchangeRate: exchangeRate,
        minimumNameLength: minNameLength,
        maximumNameLength: maxNameLength,
        paperworkName: paperworkNameFromId,
        selectAttemptedPickupCustomer: selectAttemptedPickupAmount,
        invoiceAttemptedPickup: invoiceAttemptedPickupAmount,
        driverAttemptedPickup: driverAttemptedPickUPAmount,
        adjustAttemptedPickup: adjustAttemptedPickupAmount,
        alternatePaperworkName: alternativePaperworkNameFromId,
        singleInvoiceMultiUnit: singleunitInvoiceFoMultiUnits,
        alternateAPUCustomerGroupFK: customerGroupFK,
      })
    );
  };

  return (
    <Formik
      initialValues={{
        invoiceAsCND,
        exchangeRate,
        invoiceAttemptedPickupAmount,
        driverAttemptedPickUPAmount,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        invoiceAsCND: false,
        exchangeRate: true,
        invoiceAttemptedPickupAmount: true,
        driverAttemptedPickUPAmount: true,
      }}
    >
      {(formik) => (
        <div className="p-2 w-100">
          <Row className="m-0 p-0">
            <Col sm={6} md={6} lg={6} xl={6} xs={6}>
              {/*Invoice Breakdown Seperately*/}
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.settingB.invoice.breakdown.seperately.field")}
                  </Form.Label>
                </Col>
                <Col xs={5} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="invoiceBreakdownSeperately"
                    value={invoiceBreakdownSeperately}
                    checked={invoiceBreakdownSeperately}
                    disabled={viewDetail}
                    onChange={(e) => setInvoiceBreakdownSeperately(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Invoice Breakdown Immediately*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.settingB.invoice.breakdown.immediately.field")}
                  </Form.Label>
                </Col>
                <Col xs={5} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="invoiceBreakdownImmediately"
                    value={invoiceBreakdownImmediately}
                    checked={invoiceBreakdownImmediately}
                    disabled={viewDetail}
                    onChange={(e) => setInvoiceBreakdownImmediately(e.target.checked)}
                  />
                </Col>
              </Form.Group>
              {/*Invoice Emailed to Plant*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.settingA.invoice.emailed.to.plant.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="invoiceEmailedToPlant"
                    value={invoiceEmailedToPlant}
                    checked={invoiceEmailedToPlant}
                    disabled={viewDetail || usePlants === false}
                    onChange={(e) => setInvoiceEmailedToPlant(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Allow Return Rates*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.settingB.allow.return.rates.field")}
                  </Form.Label>
                </Col>
                <Col xs={5} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="allowReturnRates"
                    value={allowReturnRates}
                    checked={allowReturnRates}
                    disabled={viewDetail}
                    onChange={(e) => setAllowReturnRates(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Single Unit Invoice For Multi Units*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    Single Unit Invoice For Multi Units
                  </Form.Label>
                </Col>
                <Col xs={5} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="singleunitInvoiceFoMultiUnits"
                    value={singleunitInvoiceFoMultiUnits}
                    checked={singleunitInvoiceFoMultiUnits}
                    disabled={viewDetail}
                    onChange={(e) => setSingleunitInvoiceFoMultiUnits(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Invoice As CND*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.settingA.invoice.as.cnd.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="invoiceAsCND"
                    value={invoiceAsCND}
                    checked={invoiceAsCND}
                    disabled={viewDetail}
                    onChange={(e) => setInvoiceAsCND(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Exchange Rate*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.settingA.exchange.rate.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0">
                  <Input
                    className={`customFormControl ${
                      viewDetail || !invoiceAsCND
                        ? ""
                        : !(/^\d{0,2}(?:\.\d{0,4})?$/.test(exchangeRate) && exchangeRate > 0) ||
                            lastpointer(exchangeRate)
                          ? "borderRed"
                          : exchangeRate !== "" && exchangeRate?.length > 0
                            ? "borderGreen"
                            : ""
                    }`}
                    name="exchangeRate"
                    value={exchangeRate}
                    disabled={viewDetail || invoiceAsCND === false}
                    maxLength={11}
                    onChange={(e) => {
                      formik.handleChange(e);

                      if (e.target.value?.match(/^\d{0,2}(?:\.\d{0,4})?$/)) {
                        setExchangeRate(e.target.value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>

              {/*Paperwork Name From*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Paperwork Name From</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <Form.Select
                    className={`customFormControl 
                    ${viewDetail ? "borderBlack" : paperworkNameFromId ? "borderGreen" : "borderRed"}
                    `}
                    name="Paperwork Name From"
                    value={paperworkNameFromId}
                    onChange={(e) => {
                      setPaperworkNameFromId(e.target.value);
                    }}
                    disabled={viewDetail}
                  >
                    <option value="">---Select---</option>
                    {paperworkNameFromList?.map((item) => (
                      <option key={item.paperworkNameFromId} value={item.paperworkNameFromId}>
                        {item.paperworkNameFromName}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              {/*Alternate Paperwork Name From*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    Alternate Paperwork Name From
                  </Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0">
                  <Form.Select
                    className={`customFormControl 
                     ${viewDetail || !paperworkNameFromId || paperworkNameFromId === "Invoice Number" || paperworkNameFromId === "Unit Number" ? "borderBlack" : alternativePaperworkNameFromId ? "borderGreen" : "borderRed"}
                    `}
                    onChange={({ target }) => {
                      setAlternativePaperworkNameFromId(target.value);
                    }}
                    name=" Alternate Paperwork Name From"
                    value={alternativePaperworkNameFromId}
                    disabled={
                      viewDetail ||
                      !paperworkNameFromId ||
                      paperworkNameFromId === "Invoice Number" ||
                      paperworkNameFromId === "Unit Number"
                    }
                  >
                    <option value="">---Select---</option>
                    {alternativePaperworkNameFromList?.map((item) => (
                      <option
                        key={item.alternativePaperworkNameFromId}
                        value={item.alternativePaperworkNameFromId}
                      >
                        {item.alternativePaperworkNameFromName}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              {/*Minimum Name Length*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Minimum Name Length</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "50px" }}>
                  <Input
                    className={`customFormControl 
                    ${
                      viewDetail || !paperworkNameFromId || paperworkNameFromId === "Invoice Number"
                        ? "borderBlack"
                        : minNameLength &&
                            minNameLength >= 5 &&
                            Number(minNameLength) <= Number(maxNameLength)
                          ? "borderGreen"
                          : "borderRed"
                    }
                    `}
                    name="minNameLength"
                    value={minNameLength}
                    disabled={viewDetail || paperworkNameFromId === "Invoice Number" || !paperworkNameFromId}
                    maxLength={11}
                    onChange={(e) => {
                      formik.handleChange(e);
                      e.target.value?.match(/^\d{0,2}?$/) &&
                        e.target.value <= 21 &&
                        setMinNameLength(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>

              {/*Maximum Name Length*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Maximum Name Length</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "50px" }}>
                  <Input
                    className={`customFormControl 
                    ${
                      viewDetail || !paperworkNameFromId || paperworkNameFromId === "Invoice Number"
                        ? "borderBlack"
                        : maxNameLength && maxNameLength >= 5
                          ? "borderGreen"
                          : "borderRed"
                    }
                    `}
                    name="maxNameLength"
                    value={maxNameLength}
                    disabled={viewDetail || paperworkNameFromId === "Invoice Number" || !paperworkNameFromId}
                    maxLength={11}
                    onChange={(e) => {
                      formik.handleChange(e);
                      e.target.value?.match(/^\d{0,2}?$/) &&
                        e.target.value <= 21 &&
                        setMaxNameLength(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col sm={6} md={6} lg={6} xl={6} xs={6}>
              {/*Select Attempted Pickup Customer*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={5} md={5} xs={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {"Select Attempted Pickup Customer"}
                  </Form.Label>
                </Col>
                <Col xs={5} md={6} sm={5} lg={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="selectAttemptedPickupAmount"
                    value={selectAttemptedPickupAmount}
                    disabled={viewDetail || !hasGroup}
                    checked={selectAttemptedPickupAmount}
                    autoComplete="off"
                    onChange={(e) => {
                      setSelectAttemptedPickupAmount(e.target.checked);
                      if (!e.target.checked) {
                        setInvoiceAttemptedPickupAmount("");
                        setDriverAttemptedPickUPAmount("");
                        setCustomerGroupDescription("");
                        setCustomerGroupFK(null);
                      }
                    }}
                  />
                </Col>
              </Form.Group>

              {/*Alternate APU Customer Group*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={5} md={5} xs={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {"Alternate APU Customer Group"}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={customerGroupData}

                    searchString={customerGroupDescription}
                    fetchDataBySearchString={fetchCustomerGroupDataBySearchString}
                    renderItemId={(customer) => customer.customerGroupPK}
                    renderItemField={(customer) => customer.description}
                    onSelect={handleCustomerGroupSelection}
                    handleAutoCompleteClose={() => {
                      setCustomerGroupDescription("");
                      setCustomerGroupFK(null);
                    }}
                    clearInputCallback={() => {
                      setCustomerGroupFK(null);
                    }}
                    className={`${viewDetail || !selectAttemptedPickupAmount ? "" : !customerGroupFK ? "borderRed" : "borderGreen"}`}
                    handleSearchString={(string) => {
                      setCustomerGroupDescription(string);
                    }}
                    selectedId={customerGroupFK}
                    loading={alternateLoading}
                    disabled={viewDetail || !selectAttemptedPickupAmount || !hasGroup}
                  />
                  <LookupButton
                    disabled={viewDetail || !selectAttemptedPickupAmount || !hasGroup}
                    onClick={() => {
                      setShowCustomerGroupLookup(true);
                    }}
                  />
                </Col>
              </Form.Group>

              {/*Invoice Attempted Pickup Amount*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={5} md={5} xs={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.rates.invoice.attempted.pickup.amount.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0">
                  <Input
                    className={`customFormControl ${lastpointer(invoiceAttemptedPickupAmount) ? "borderRed" : ""}`}
                    name="invoiceAttemptedPickupAmount"
                    value={invoiceAttemptedPickupAmount}
                    maxLength={8}
                    disabled={viewDetail}
                    onChange={(e) => {
                      formik.handleChange(e);

                      if (e.target.value?.match(/^\d{0,5}(?:\.\d{0,2})?$/)) {
                        setInvoiceAttemptedPickupAmount(e.target.value);
                      }
                    }}
                  />
                </Col>
              </Form.Group>

              {/*Driver Attempted Pickup Amount*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={5} md={5} xs={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {"Driver Attempted Pickup Amount"}
                  </Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0">
                  <Input
                    className={`customFormControl  ${lastpointer(driverAttemptedPickUPAmount) ? "borderRed" : ""}`}
                    name="driverAttemptedPickUPAmount"
                    value={driverAttemptedPickUPAmount}
                    maxLength={8}
                    disabled={viewDetail}
                    onChange={(e) => {
                      formik.handleChange(e);

                      if (e.target.value?.match(/^\d{0,5}(?:\.\d{0,2})?$/)) {
                        setDriverAttemptedPickUPAmount(e.target.value);
                      }
                    }}
                  />
                </Col>
              </Form.Group>

              {/*Adjust Attempted Pickup Amount*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={5} md={5} xs={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.rates.adjust.attempted.pickup.amount.field")}
                  </Form.Label>
                </Col>
                <Col xs={5} md={6} sm={5} lg={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="adjustAttemptedPickupAmount"
                    value={adjustAttemptedPickupAmount}
                    disabled={viewDetail}
                    checked={adjustAttemptedPickupAmount}
                    onChange={(e) => setAdjustAttemptedPickupAmount(e.target.checked)}
                  />
                </Col>
              </Form.Group>
            </Col>
            <CustomerGroupsLookup
              show={showCustomerGroupLookup}
              onHide={() => {
                setShowCustomerGroupLookup(false);
              }}
              renderItemId={(customer) => customer.customerGroupPK}
              handleLookupSelection={handleCustomerGroupSelection}
              CustomerFilter
              customerId={customerId ? customerId : 0}
            />
          </Row>
        </div>
      )}
    </Formik>
  );
}
export default SettingsTabB;
