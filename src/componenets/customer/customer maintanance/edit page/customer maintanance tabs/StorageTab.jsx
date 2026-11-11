import { t } from "i18next";
import * as yup from "yup";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import phoneExtension from "../../../../../utils/validation/PhoneExtension";
import CustomerService from "../../../../../services/CustomerService";
import {
  setCustomerFormData,
  setIsInvoiceStorageTabValid,
  setStorageInitialColor,
} from "../../../../../redux/CustomerMaintenanceSlice";
import numberValidation from "../../../../../utils/validation/NumberValidation";
import { lastpointer } from "../../../../../utils/utils";
import Input from "../../../../../components/common/input";

function StorageTab() {
  const dispatch = useDispatch();

  const [invoiceStorageUnits, setInvoiceStorageUnits] = useState(false);
  const [invoiceStorageOnDelivery, setInvoiceStorageOnDelivery] = useState(false);
  const [invoiceStorageOnDPUPickup, setInvoiceStorageOnDPUPickup] = useState(false);
  const [invoiceStorageSeperate, setInvoiceStorageSeperate] = useState(false);
  const [forgiveStorageOnDelivery, setForgiveStorageOnDelivery] = useState(false);
  const [billStartAndRun, setBillStartAndRun] = useState(false);
  const [allStorageBillingPeriod, setAllStorageBillingPeriod] = useState([]);
  const [storageBillingPeriod, setStorageBillingPeriod] = useState("");
  const [storageDays1stPeriod, setStorageDays1stPeriod] = useState("");
  const [storageAmount1stPeriod, setStorageAmount1stPeriod] = useState("");
  const [storagePeriodDays, setStoragePeriodDays] = useState("");
  const [storageAmountPerPeriod, setStorageAmountPerPeriod] = useState("");
  const [startAndRunPeriod, setStartAndRunPeriod] = useState("");
  const [startAndRunAmount, setStartAndRunAmount] = useState("");
  const [flatrateStorage, setFlatrateStorage] = useState(false);

  const [storageAmountFlatrate, setFlatrateStorageAmount] = useState("");

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  const getStorageBillingPeriod = () => {
    CustomerService.getStorageBillingPeriod()
      .then((response) => {
        const data = response?.data;
        setAllStorageBillingPeriod(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getStorageBillingPeriod();
  }, []);

  useEffect(() => {
    if (editCustomerData === null) {
      setInvoiceStorageUnits();
      setInvoiceStorageOnDelivery(false);
      setInvoiceStorageOnDPUPickup(false);
      setForgiveStorageOnDelivery(false);
      setStorageBillingPeriod("");
      setStorageDays1stPeriod("");
      setStorageAmount1stPeriod("");
      setStoragePeriodDays("");
      setStorageAmountPerPeriod("");
    }
    if (editCustomerData !== null) {
      setInvoiceStorageUnits(
        editCustomerData.invoiceStorageUnits != null ? editCustomerData.invoiceStorageUnits : ""
      );

      setFlatrateStorage(editCustomerData.flatrateStorage != null ? editCustomerData.flatrateStorage : false);

      setFlatrateStorageAmount(
        editCustomerData.storageAmountFlatrate != null ? editCustomerData.storageAmountFlatrate : ""
      );
      setInvoiceStorageOnDelivery(
        editCustomerData.invoiceStorageOnDelivery != null ? editCustomerData.invoiceStorageOnDelivery : ""
      );
      setInvoiceStorageOnDPUPickup(
        editCustomerData.invoiceStorageOnDPUPickup != null ? editCustomerData.invoiceStorageOnDPUPickup : ""
      );
      setForgiveStorageOnDelivery(
        editCustomerData.forgiveStorageOnDelivery != null ? editCustomerData.forgiveStorageOnDelivery : ""
      );
      setStorageBillingPeriod(
        editCustomerData.storageBillingPeriod != null &&
          editCustomerData.storageBillingPeriod !== " " &&
          (editCustomerData.invoiceStorageUnits ||
            editCustomerData.invoiceStorageOnDelivery ||
            editCustomerData.invoiceStorageOnDPUPickup ||
            editCustomerData.forgiveStorageOnDelivery)
          ? editCustomerData.storageBillingPeriod
          : ""
      );
      setStorageDays1stPeriod(
        editCustomerData.storage1stPeriod != null &&
          editCustomerData.storageBillingPeriod !== " " &&
          editCustomerData.storageBillingPeriod != null &&
          (editCustomerData.invoiceStorageUnits ||
            editCustomerData.invoiceStorageOnDelivery ||
            editCustomerData.invoiceStorageOnDPUPickup ||
            editCustomerData.forgiveStorageOnDelivery)
          ? editCustomerData.storage1stPeriod
          : ""
      );
      setStorageAmount1stPeriod(
        editCustomerData.storageAmount1stPeriod != null &&
          editCustomerData.storageBillingPeriod !== " " &&
          editCustomerData.storageBillingPeriod != null &&
          (editCustomerData.invoiceStorageUnits ||
            editCustomerData.invoiceStorageOnDelivery ||
            editCustomerData.invoiceStorageOnDPUPickup ||
            editCustomerData.forgiveStorageOnDelivery)
          ? editCustomerData.storageAmount1stPeriod
          : ""
      );
      setStoragePeriodDays(
        editCustomerData.storagePeriod != null &&
          editCustomerData.storageBillingPeriod !== " " &&
          editCustomerData.storageBillingPeriod != null &&
          (editCustomerData.invoiceStorageUnits ||
            editCustomerData.invoiceStorageOnDelivery ||
            editCustomerData.invoiceStorageOnDPUPickup ||
            editCustomerData.forgiveStorageOnDelivery)
          ? editCustomerData.storagePeriod
          : ""
      );
      setStorageAmountPerPeriod(
        editCustomerData.storageAmountPeriod != null &&
          editCustomerData.storageBillingPeriod !== " " &&
          editCustomerData.storageBillingPeriod != null &&
          (editCustomerData.invoiceStorageUnits ||
            editCustomerData.invoiceStorageOnDelivery ||
            editCustomerData.invoiceStorageOnDPUPickup ||
            editCustomerData.forgiveStorageOnDelivery)
          ? editCustomerData.storageAmountPeriod
          : ""
      );
      setInvoiceStorageSeperate(
        editCustomerData.invoiceStorageSeperate != null ? editCustomerData.invoiceStorageSeperate : false
      );
      setBillStartAndRun(
        editCustomerData.invoiceStartAndRunFee != null ? editCustomerData.invoiceStartAndRunFee : false
      );
      setStartAndRunAmount(
        editCustomerData.startAndRunAmountPeriod != null && editCustomerData.invoiceStartAndRunFee === true
          ? editCustomerData.startAndRunAmountPeriod
          : ""
      );
      setStartAndRunPeriod(
        editCustomerData.startAndRunPeriod != null && editCustomerData.invoiceStartAndRunFee === true
          ? editCustomerData.startAndRunPeriod
          : ""
      );
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    storageTabFormData();
  }, [
    invoiceStorageUnits,
    invoiceStorageOnDelivery,
    invoiceStorageOnDPUPickup,
    forgiveStorageOnDelivery,
    storageBillingPeriod,
    storageDays1stPeriod,
    storageAmount1stPeriod,
    storagePeriodDays,
    storageAmountPerPeriod,
    billStartAndRun,
    invoiceStorageSeperate,
    startAndRunAmount,
    startAndRunPeriod,
    storageAmountFlatrate,
    flatrateStorage,
  ]);

  const storageTabFormData = () => {
    dispatch(
      setCustomerFormData({
        invoiceStorageUnits: invoiceStorageUnits,
        invoiceStorageOnDelivery: invoiceStorageOnDelivery,
        invoiceStorageOnDPUPickup: invoiceStorageOnDPUPickup,
        forgiveStorageOnDelivery: forgiveStorageOnDelivery,
        storageBillingPeriod: storageBillingPeriod,
        storage1stPeriod: storageDays1stPeriod,
        storageAmount1stPeriod: storageAmount1stPeriod,
        storagePeriod: storagePeriodDays,
        storageAmountPeriod: storageAmountPerPeriod,
        invoiceStorageSeperate: invoiceStorageSeperate,
        invoiceStartAndRunFee: billStartAndRun,
        startAndRunPeriod: startAndRunPeriod,
        startAndRunAmountPeriod: startAndRunAmount,
        storageAmountFlatrate: storageAmountFlatrate,
        flatrateStorage: flatrateStorage,
      })
    );
  };

  useEffect(() => {
    if (
      invoiceStorageOnDPUPickup ||
      invoiceStorageOnDelivery ||
      invoiceStorageUnits ||
      forgiveStorageOnDelivery ||
      billStartAndRun
    ) {
      dispatch(setStorageInitialColor(false));
    } else {
      dispatch(setStorageInitialColor(true));
    }
  }, [
    invoiceStorageUnits,
    invoiceStorageOnDPUPickup,
    invoiceStorageOnDelivery,
    forgiveStorageOnDelivery,
    billStartAndRun,
  ]);

  useEffect(() => {
    if (!invoiceStorageUnits) {
      setInvoiceStorageOnDPUPickup(false);
      setInvoiceStorageOnDelivery(false);
      setForgiveStorageOnDelivery(false);
      setInvoiceStorageSeperate(false);
      setBillStartAndRun(false);
    }
    if (!(
      invoiceStorageOnDPUPickup ||
      invoiceStorageOnDelivery ||
      invoiceStorageUnits ||
      forgiveStorageOnDelivery
    )) {
      setStorageBillingPeriod("");
      setStorageDays1stPeriod("");
      setStoragePeriodDays("");
      setStorageAmount1stPeriod("");
      setStorageAmountPerPeriod("");
    }
  }, [
    invoiceStorageOnDPUPickup,
    invoiceStorageOnDelivery,
    invoiceStorageUnits,
    forgiveStorageOnDelivery,
    invoiceStorageSeperate,
  ]);

  const validationSchema = yup.object({
    storageDays1stPeriod: yup
      .string()
      .matches(/^\d{0,5}?$/)
      .required(),
    storagePeriodDays: yup
      .string()
      .matches(/^\d{0,5}?$/)
      .required(),
    startAndRunPeriod: yup
      .string()
      .matches(/^\d{0,5}?$/)
      .max(90),
  });

  useEffect(() => {
    if (invoiceStorageOnDelivery) {
      setForgiveStorageOnDelivery(false);
    } else {
      setInvoiceStorageSeperate(false);
      setInvoiceStorageOnDPUPickup(false);
    }
  }, [invoiceStorageOnDelivery]);

  useEffect(() => {
    if (forgiveStorageOnDelivery) {
      setInvoiceStorageOnDelivery(false);
    }
  }, [forgiveStorageOnDelivery]);

  useEffect(() => {
    if (!billStartAndRun) {
      setStartAndRunAmount("");
      setStartAndRunPeriod("");
    }
  }, [billStartAndRun]);

  useEffect(() => {
    let isValid = true;

    if (invoiceStorageUnits) {
      if (flatrateStorage) {
        if (
          storageAmountFlatrate == null ||
          storageAmountFlatrate === "" ||
          isNaN(Number(storageAmountFlatrate)) ||
          !(
            String(storageAmountFlatrate)?.match(/^\d{0,5}(?:\.\d{0,2})?$/) &&
            !lastpointer(storageAmountFlatrate)
          )
        ) {
          isValid = false;
        }
      } else {
        if (!storageBillingPeriod) {
          isValid = false;
        } else {
          if (
            !storageDays1stPeriod ||
            !storageAmount1stPeriod ||
            lastpointer(storageAmount1stPeriod) ||
            !storagePeriodDays ||
            !storageAmountPerPeriod ||
            lastpointer(storageAmountPerPeriod) ||
            isNaN(Number(storageAmountPerPeriod)) ||
            !String(storageAmountPerPeriod)?.match(/^\d{0,5}(?:\.\d{0,2})?$/)
          ) {
            isValid = false;
          }
        }
      }
    }

    if (billStartAndRun) {
      if (!startAndRunAmount || lastpointer(startAndRunAmount) || !startAndRunPeriod) {
        isValid = false;
      }
    }

    dispatch(setIsInvoiceStorageTabValid(isValid));
  }, [
    invoiceStorageUnits,
    flatrateStorage,
    storageAmountFlatrate,
    storageBillingPeriod,
    storageDays1stPeriod,
    storageAmount1stPeriod,
    storagePeriodDays,
    storageAmountPerPeriod,
    billStartAndRun,
    startAndRunAmount,
    startAndRunPeriod,
  ]);

  return (
    <Formik
      initialValues={{
        storageBillingPeriod,
        storageDays1stPeriod,
        storageAmount1stPeriod,
        storagePeriodDays,
        storageAmountPerPeriod,
        startAndRunAmount,
        startAndRunPeriod,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        storageBillingPeriod: true,
        storageDays1stPeriod: true,
        storageAmount1stPeriod: true,
        storagePeriodDays: true,
        storageAmountPerPeriod: true,
        startAndRunAmount: true,
        startAndRunPeriod: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="p-2 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                {/*Invoice Storage Units*/}
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.storage.tab.storage.invoice.storage.units.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={6} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="invoiceStorageUnits"
                      value={"invoiceStorageUnits"}
                      checked={invoiceStorageUnits}
                      disabled={viewDetail}
                      onChange={(e) => {
                        if (!e.target.checked) {
                          setFlatrateStorage(false);
                        }
                        setInvoiceStorageUnits(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>

                {/*Invoice Storage On Delivery*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.storage.tab.storage.invoice.storage.on.delivery.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={6} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="invoiceStorageOnDelivery"
                      value={"invoiceStorageOnDelivery"}
                      checked={invoiceStorageOnDelivery}
                      disabled={viewDetail || !invoiceStorageUnits}
                      onChange={(e) => setInvoiceStorageOnDelivery(e.target.checked)}
                    />
                  </Col>
                </Form.Group>

                {/*Invoice Storage Seperate*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Invoice Storage Seperate</Form.Label>
                  </Col>
                  <Col xs={5} md={6} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="invoiceStorageSeperate"
                      value={"invoiceStorageSeperate"}
                      checked={invoiceStorageSeperate}
                      disabled={viewDetail || !invoiceStorageUnits || !invoiceStorageOnDelivery}
                      onChange={(e) => setInvoiceStorageSeperate(e.target.checked)}
                    />
                  </Col>
                </Form.Group>

                {/*Invoice Storage On DPU Pickup*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.storage.tabstorage.invoice.storage.on.dpu.pickup.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={6} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="invoiceStorageOnDPUPickup"
                      value={"invoiceStorageOnDPUPickup"}
                      checked={invoiceStorageOnDPUPickup}
                      disabled={viewDetail || !invoiceStorageUnits || !invoiceStorageOnDelivery}
                      onChange={(e) => setInvoiceStorageOnDPUPickup(e.target.checked)}
                    />
                  </Col>
                </Form.Group>

                {/*Forgive Storage On Delivery*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.storage.tab.forgive.storage.on.delivery.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={6} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="forgiveStorageOnDelivery"
                      value={"forgiveStorageOnDelivery"}
                      checked={forgiveStorageOnDelivery}
                      disabled={viewDetail || !invoiceStorageUnits}
                      onChange={(e) => setForgiveStorageOnDelivery(e.target.checked)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Flatrate Storage</Form.Label>
                  </Col>
                  <Col xs={5} md={6} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      name="flatrateStorage"
                      value={"flatrateStorage"}
                      checked={flatrateStorage}
                      disabled={viewDetail || !invoiceStorageUnits}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFlatrateStorage(isChecked);

                        if (isChecked) {
                          // When checked, set all to 0
                          setStorageBillingPeriod("");
                          setStorageDays1stPeriod("");
                          setStoragePeriodDays("");
                          setStorageAmountPerPeriod("");
                          setStorageAmount1stPeriod("");

                          setStorageBillingPeriod(""); // if used
                        } else {
                          setStorageBillingPeriod("");
                          setStorageDays1stPeriod("");
                          setStoragePeriodDays("");
                          setStorageAmountPerPeriod("");
                          setStorageAmount1stPeriod("");

                          setStorageBillingPeriod("");
                          setFlatrateStorageAmount("");
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                {/*Storage Billing Period*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.storage.tab.storage.billing.period.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Select
                      className="customFormControl"
                      name="storageBillingPeriod"
                      id="storageBillingPeriod"
                      value={storageBillingPeriod}
                      disabled={
                        viewDetail ||
                        flatrateStorage ||
                        !(
                          invoiceStorageOnDPUPickup ||
                          invoiceStorageOnDelivery ||
                          invoiceStorageUnits ||
                          forgiveStorageOnDelivery
                        )
                      }
                      onChange={(e) => {
                        setStorageBillingPeriod(e.target.value);
                        if (e.target.value === "") {
                          setStorageDays1stPeriod("");
                          setStoragePeriodDays("");
                          setStorageAmountPerPeriod("");
                          setStorageAmount1stPeriod("");
                        }
                      }}
                      style={{
                        border:
                          viewDetail === true ||
                          flatrateStorage ||
                          !(
                            invoiceStorageOnDPUPickup ||
                            invoiceStorageOnDelivery ||
                            invoiceStorageUnits ||
                            forgiveStorageOnDelivery
                          )
                            ? "black 1px solid"
                            : storageBillingPeriod === ""
                              ? "red 2px solid"
                              : "green 2px solid",
                      }}
                    >
                      <option value="">--Select--</option>
                      {allStorageBillingPeriod?.map((item) => (
                        <option key={item.storageBillingPeriodID} value={item.storageBillingPeriodID}>
                          {item.storageBillingPeriodName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/*Storage Days 1st Period*/}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.storage.tab.storage.days.1st.period.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "50px" }}>
                    <Input
                      className="customFormControl"
                      type="text"
                      name="storageDays1stPeriod"
                      value={storageDays1stPeriod}
                      maxLength={5}
                      disabled={
                        viewDetail ||
                        flatrateStorage ||
                        storageBillingPeriod === "" ||
                        !(
                          invoiceStorageOnDPUPickup ||
                          invoiceStorageOnDelivery ||
                          invoiceStorageUnits ||
                          forgiveStorageOnDelivery
                        )
                      }
                      onChange={(e) => {
                        formik.handleChange(e);
                        e.target.value?.match(/^\d{0,5}?$/) &&
                          e.target.value <= 32767 &&
                          setStorageDays1stPeriod(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail || flatrateStorage || storageBillingPeriod === ""
                            ? "black 1px solid"
                            : String(storageDays1stPeriod).match(/^\d{0,5}?$/) &&
                                storageDays1stPeriod !== "" &&
                                String(storageDays1stPeriod).length > 0
                              ? "green 2px solid"
                              : "red 2px solid",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/*Storage Amount 1st Period*/}

                <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.storage.tab.storage.amount.1st.period.field")}
                    </Form.Label>
                  </Col>

                  <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "75px" }}>
                    <Input
                      className={`customFormControl ${
                        viewDetail || flatrateStorage || storageBillingPeriod === ""
                          ? "black"
                          : lastpointer(storageAmount1stPeriod)
                            ? "borderRed"
                            : String(storageAmount1stPeriod)?.match(/^\d{0,5}(?:\.\d{0,2})?$/) &&
                                storageAmount1stPeriod !== ""
                              ? "borderGreen"
                              : "borderRed"
                      }`}
                      type="text"
                      name="storageAmount1stPeriod"
                      value={storageAmount1stPeriod}
                      maxLength={8}
                      disabled={
                        viewDetail ||
                        flatrateStorage ||
                        storageBillingPeriod === "" ||
                        !(
                          invoiceStorageOnDPUPickup ||
                          invoiceStorageOnDelivery ||
                          invoiceStorageUnits ||
                          forgiveStorageOnDelivery
                        )
                      }
                      onChange={(e) => {
                        const val = e.target.value;

                        // allow empty
                        if (val === "") {
                          setStorageAmount1stPeriod("");
                          formik.handleChange(e);
                          return;
                        }

                        // allow (7,2):
                        // max 5 digits before dot
                        // max 2 digits after dot
                        // "." allowed as-is
                        const regex = /^\d{0,5}(\.\d{0,2})?$/;

                        if (regex.test(val)) {
                          setStorageAmount1stPeriod(val);
                          formik.handleChange({
                            target: { name: "storageAmount1stPeriod", value: val },
                          });
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/*Storage Period Days*/}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.storage.tab.storage.period.days.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "50px" }}>
                    <Input
                      className="customFormControl"
                      type="text"
                      name="storagePeriodDays"
                      value={storagePeriodDays}
                      maxLength={5}
                      disabled={
                        viewDetail ||
                        storageBillingPeriod === "" ||
                        flatrateStorage ||
                        !(
                          invoiceStorageOnDPUPickup ||
                          invoiceStorageOnDelivery ||
                          invoiceStorageUnits ||
                          forgiveStorageOnDelivery
                        )
                      }
                      onChange={(e) => {
                        formik.handleChange(e);
                        String(e.target.value)?.match(/^\d{0,5}?$/) &&
                          e.target.value <= 32767 &&
                          setStoragePeriodDays(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail || flatrateStorage || storageBillingPeriod === ""
                            ? "black 1px solid"
                            : String(storagePeriodDays)?.match(/^\d{0,5}?$/) &&
                                storagePeriodDays !== "" &&
                                String(storagePeriodDays)?.length > 0
                              ? "green 2px solid"
                              : "red 2px solid",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/*Storage Amount Per Period*/}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("customer.maintanance.storage.tab.storage.amount.per.period.field")}
                    </Form.Label>
                  </Col>
                  <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "75px" }}>
                    <Input
                      className={`customFormControl ${
                        viewDetail || flatrateStorage || storageBillingPeriod === ""
                          ? "black"
                          : lastpointer(storageAmountPerPeriod)
                            ? "borderRed"
                            : formik.errors.storageAmountPerPeriod === undefined &&
                                storageAmountPerPeriod !== "" &&
                                storageAmountPerPeriod !== "0." &&
                                Number(storageAmountPerPeriod) >= 0 &&
                                String(storageAmountPerPeriod)?.match(/^\d{0,5}(\.\d{0,2})?$/)
                              ? "borderGreen"
                              : "borderRed"
                      }`}

                      type="text"
                      name="storageAmountPerPeriod"
                      value={storageAmountPerPeriod}
                      maxLength={8}
                      disabled={
                        viewDetail ||
                        storageBillingPeriod === "" ||
                        flatrateStorage ||
                        !(
                          invoiceStorageOnDPUPickup ||
                          invoiceStorageOnDelivery ||
                          invoiceStorageUnits ||
                          forgiveStorageOnDelivery
                        )
                      }
                      onChange={(e) => {
                        formik.handleChange(e);
                        if (e.target.value?.match(/^\d{0,5}(?:\.\d{0,2})?$/)) {
                          setStorageAmountPerPeriod(e.target.value);
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>

                {/***** * Enhancement 28 *****/}
                <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Flatrate Storage Amount</Form.Label>
                  </Col>

                  <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "75px" }}>
                    <Input
                      className={`customFormControl ${lastpointer(storageAmountFlatrate) ? "borderRed" : ""}`}
                      type="text"
                      name="flatrateStorageAmount"
                      value={storageAmountFlatrate}
                      maxLength={8}
                      disabled={
                        viewDetail ||
                        !flatrateStorage ||
                        !(
                          invoiceStorageOnDPUPickup ||
                          invoiceStorageOnDelivery ||
                          invoiceStorageUnits ||
                          forgiveStorageOnDelivery
                        )
                      }
                      onChange={(e) => {
                        formik.handleChange(e);

                        if (e.target.value?.match(/^\d{0,5}(?:\.\d{0,2})?$/)) {
                          setFlatrateStorageAmount(e.target.value);
                        }
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        border:
                          viewDetail || !flatrateStorage
                            ? "black 1px solid"
                            : formik.errors.flatrateStorageAmount === undefined &&
                                Number(storageAmountFlatrate) >= 0 &&
                                storageAmountFlatrate !== "" &&
                                storageAmountFlatrate !== "0." &&
                                String(storageAmountFlatrate)?.match(/^\d{0,5}(?:\.\d{0,2})?$/)
                              ? "green 2px solid"
                              : "red 2px solid",
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                {/*Bill start and Run*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Bill Start & Run</Form.Label>
                  </Col>
                  <Col xs={5} md={6} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="billStartAndRun"
                      value={"billStartAndRun"}
                      checked={billStartAndRun}
                      disabled={viewDetail || !invoiceStorageUnits}
                      onChange={(e) => setBillStartAndRun(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                {/*Start and Run Period Days*/}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Start & Run Period Days</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "50px" }}>
                    <Input
                      type="text"
                      className={`customFormControl 
                       ${
                         viewDetail || !billStartAndRun || !invoiceStorageUnits
                           ? "black"
                           : startAndRunPeriod !== ""
                             ? "borderGreen"
                             : "borderRed"
                       }
                          `}
                      name="startAndRunPeriod"
                      value={startAndRunPeriod}
                      disabled={viewDetail || !billStartAndRun || !invoiceStorageUnits}
                      maxLength={5}
                      onChange={(e) => {
                        formik.handleChange(e);
                        e.target.value?.match(/^\d{0,5}?$/) &&
                          e.target.value <= 90 &&
                          setStartAndRunPeriod(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                {/*Start and Run Amount per Period*/}
                <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Start & Run Amount Per Period
                    </Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "75px" }}>
                    <Input
                      type="text"
                      className={`customFormControl ${
                        viewDetail || !billStartAndRun || !invoiceStorageUnits
                          ? "black"
                          : lastpointer(startAndRunAmount)
                            ? "borderRed"
                            : startAndRunAmount !== "" &&
                                String(startAndRunAmount)?.match(/^\d{0,5}(?:\.\d{0,2})?$/)
                              ? "borderGreen"
                              : "borderRed"
                      }`}
                      name="startAndRunAmount"
                      value={startAndRunAmount}
                      disabled={viewDetail || !billStartAndRun || !invoiceStorageUnits}
                      maxLength={8}
                      onChange={(e) => {
                        if (e.target.value?.match(/^\d{0,5}(?:\.\d{0,2})?$/)) {
                          setStartAndRunAmount(e.target.value);
                        }
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

export default StorageTab;
