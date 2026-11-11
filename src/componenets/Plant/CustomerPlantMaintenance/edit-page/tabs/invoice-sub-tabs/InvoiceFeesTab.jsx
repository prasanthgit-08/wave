import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlantFormData,
  setInvoiceFeesInvoice2unitUnloadFee,
  setInvoiceFeesDriver2UnitUnloadFee,
  setInvoiceFeesUnit2UnloadFeeDescription,
  setInvoiceFeesInvoice3PlusUnitUnloadFee,
  setInvoiceFeesDriver3PlusUnitUnloadFee,
  setInvoiceFeesPlus3UnitUnloadFeeDescription,
  setInvoiceFeesInvoicePopupUnloadFee,
  setInvoiceFeesDriverPopupUnloadFee,
  setInvoiceFeesPopupUnloadFeeDescription,
  setInvoiceFeesInvoiceUSSurcharge,
  setInvoiceFeesDriverUSSurcharge,
  setInvoiceFeesUsSurchargeDescription,
  setInvoiceFeesInvoiceCanadianSurcharge,
  setInvoiceFeesDriverCanadianSurcharge,
  setInvoiceFeesCanadianSurchargeDescription,
  setInvoiceFeesInvoiceSplitDropUnloadFee,
  setInvoiceFeesDriverSplitDropUnloadFee,
  setInvoiceFeesPopupSplitDropFeeDescription,
} from "../../../../../../redux/CustomerPlantMaintenanceSlice";
const InvoiceFeesTab = () => {
  const [invoice2unitUnloadFee, setInvoice2unitUnloadFee] = useState("");
  const [driver2UnitUnloadFee, setDriver2UnitUnloadFee] = useState("");
  const [unit2UnloadFeeDescription, setunit2UnloadFeeDescription] = useState("");
  const [invoice3PlusUnitUnloadFee, setInvoice3PlusUnitUnloadFee] = useState("");
  const [driver3PlusUnitUnloadFee, setDriver3PlusUnitUnloadFee] = useState("");
  const [plus3UnitUnloadFeeDescription, setPlus3UnitUnloadFeeDescription] = useState("");
  const [invoicePopupUnloadFee, setInvoicePopupUnloadFee] = useState("");
  const [driverPopupUnloadFee, setDriverPopupUnloadFee] = useState("");
  const [popupUnloadFeePerUnit, setPopupUnloadFeePerUnit] = useState("");
  const [popupUnloadFeeDescription, setPopupUnloadFeeDescription] = useState("");
  const [invoiceUSSurcharge, setInvoiceUSSurcharge] = useState("");
  const [driverUSSurcharge, setDriverUSSurcharge] = useState("");
  const [usSurchargeDescription, setUsSurchargeDescription] = useState("");
  const [invoiceCanadianSurcharge, setInvoiceCanadianSurcharge] = useState("");
  const [driverCanadianSurcharge, setDriverCanadianSurcharge] = useState("");
  const [canadianSurchargeDescription, setCanadianSurchargeDescription] = useState("");
  const [invoiceSplitDropUnloadFee, setInvoiceSplitDropUnloadFee] = useState("");
  const [driverSplitDropUnloadFee, setDriverSplitDropUnloadFee] = useState("");
  const [popupSplitDropFeeDescription, setPopupSplitDropFeeDescription] = useState("");
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);
  useEffect(() => {
    if (editPlantData != null) {
      setInvoice2unitUnloadFee(editPlantData.invoice2unitUnloadFee?.toFixed(2));

      setDriver2UnitUnloadFee(editPlantData.driver2UnitUnloadFee?.toFixed(2));
      setunit2UnloadFeeDescription(
        editPlantData.twoUnitUnloadFeeDescription != null ? editPlantData.twoUnitUnloadFeeDescription : ""
      );
      setInvoice3PlusUnitUnloadFee(editPlantData.invoice3PlusUnitUnloadFee?.toFixed(2));
      setDriver3PlusUnitUnloadFee(editPlantData.driver3PlusUnitUnloadFee?.toFixed(2));
      setPlus3UnitUnloadFeeDescription(
        editPlantData.threePlusUnitUnloadFeeDescription != null
          ? editPlantData.threePlusUnitUnloadFeeDescription
          : ""
      );
      setInvoicePopupUnloadFee(editPlantData.invoicePopupUnloadFee?.toFixed(2));
      setDriverPopupUnloadFee(editPlantData.driverPopupUnloadFee?.toFixed(2));
      setPopupUnloadFeePerUnit(
        editPlantData.popupUnloadFeePerUnit != null ? editPlantData.popupUnloadFeePerUnit : ""
      );
      setPopupUnloadFeeDescription(
        editPlantData.popupUnloadFeeDescription != null ? editPlantData.popupUnloadFeeDescription : ""
      );
      setInvoiceUSSurcharge(editPlantData.invoiceUSSurcharge?.toFixed(2));
      setDriverUSSurcharge(editPlantData.driverUSSurcharge?.toFixed(2));
      setUsSurchargeDescription(
        editPlantData.usSurchargeDescription != null ? editPlantData.usSurchargeDescription : ""
      );
      setInvoiceCanadianSurcharge(editPlantData.invoiceCanadianSurcharge?.toFixed(2));
      setDriverCanadianSurcharge(editPlantData.driverCanadianSurcharge?.toFixed(2));
      setCanadianSurchargeDescription(
        editPlantData.canadianSurchargeDescription != null ? editPlantData.canadianSurchargeDescription : ""
      );
      setInvoiceSplitDropUnloadFee(editPlantData.invoiceSplitDropUnloadFee?.toFixed(2));
      setDriverSplitDropUnloadFee(editPlantData.driverSplitDropUnloadFee?.toFixed(2));
      setPopupSplitDropFeeDescription(
        editPlantData.popupSplitDropFeeDescription != null ? editPlantData.popupSplitDropFeeDescription : ""
      );
    }
  }, [editPlantData, viewDetail]);

  const invoiceFeesFormData = () => {
    dispatch(
      setPlantFormData({
        invoice2unitUnloadFee: invoice2unitUnloadFee,
        driver2UnitUnloadFee: driver2UnitUnloadFee,
        twoUnitUnloadFeeDescription: unit2UnloadFeeDescription,
        invoice3PlusUnitUnloadFee: invoice3PlusUnitUnloadFee,
        driver3PlusUnitUnloadFee: driver3PlusUnitUnloadFee,
        threePlusUnitUnloadFeeDescription: plus3UnitUnloadFeeDescription,
        invoicePopupUnloadFee: invoicePopupUnloadFee,
        driverPopupUnloadFee: driverPopupUnloadFee,
        popupUnloadFeePerUnit: popupUnloadFeePerUnit,
        popupUnloadFeeDescription: popupUnloadFeeDescription,
        invoiceUSSurcharge: invoiceUSSurcharge,
        driverUSSurcharge: driverUSSurcharge,
        usSurchargeDescription: usSurchargeDescription,
        invoiceCanadianSurcharge: invoiceCanadianSurcharge,
        driverCanadianSurcharge: driverCanadianSurcharge,
        canadianSurchargeDescription: canadianSurchargeDescription,
        invoiceSplitDropUnloadFee: invoiceSplitDropUnloadFee,
        driverSplitDropUnloadFee: driverSplitDropUnloadFee,
        popupSplitDropFeeDescription: popupSplitDropFeeDescription,
      })
    );
  };

  useEffect(() => {
    dispatch(setInvoiceFeesInvoice2unitUnloadFee(invoice2unitUnloadFee));
    dispatch(setInvoiceFeesDriver2UnitUnloadFee(driver2UnitUnloadFee));
    dispatch(setInvoiceFeesUnit2UnloadFeeDescription(unit2UnloadFeeDescription));
    dispatch(setInvoiceFeesInvoice3PlusUnitUnloadFee(invoice3PlusUnitUnloadFee));
    dispatch(setInvoiceFeesDriver3PlusUnitUnloadFee(driver3PlusUnitUnloadFee));
    dispatch(setInvoiceFeesPlus3UnitUnloadFeeDescription(plus3UnitUnloadFeeDescription));
    dispatch(setInvoiceFeesInvoicePopupUnloadFee(invoicePopupUnloadFee));
    dispatch(setInvoiceFeesDriverPopupUnloadFee(driverPopupUnloadFee));
    dispatch(setInvoiceFeesPopupUnloadFeeDescription(popupUnloadFeeDescription));
    dispatch(setInvoiceFeesInvoiceUSSurcharge(invoiceUSSurcharge));
    dispatch(setInvoiceFeesDriverUSSurcharge(driverUSSurcharge));
    dispatch(setInvoiceFeesUsSurchargeDescription(usSurchargeDescription));
    dispatch(setInvoiceFeesInvoiceCanadianSurcharge(invoiceCanadianSurcharge));
    dispatch(setInvoiceFeesDriverCanadianSurcharge(driverCanadianSurcharge));
    dispatch(setInvoiceFeesCanadianSurchargeDescription(canadianSurchargeDescription));
    dispatch(setInvoiceFeesInvoiceSplitDropUnloadFee(invoiceSplitDropUnloadFee));
    dispatch(setInvoiceFeesDriverSplitDropUnloadFee(driverSplitDropUnloadFee));
    dispatch(setInvoiceFeesPopupSplitDropFeeDescription(popupSplitDropFeeDescription));
  }, [
    invoice2unitUnloadFee,
    driver2UnitUnloadFee,
    unit2UnloadFeeDescription,
    invoice3PlusUnitUnloadFee,
    driver3PlusUnitUnloadFee,
    plus3UnitUnloadFeeDescription,
    invoicePopupUnloadFee,
    driverPopupUnloadFee,
    popupUnloadFeeDescription,
    invoiceUSSurcharge,
    driverUSSurcharge,
    usSurchargeDescription,
    invoiceCanadianSurcharge,
    driverCanadianSurcharge,
    canadianSurchargeDescription,
    invoiceSplitDropUnloadFee,
    driverSplitDropUnloadFee,
    popupSplitDropFeeDescription,
  ]);
  useEffect(() => {
    invoiceFeesFormData();
  }, [
    invoice2unitUnloadFee,
    driver2UnitUnloadFee,
    unit2UnloadFeeDescription,
    invoice3PlusUnitUnloadFee,
    driver3PlusUnitUnloadFee,
    plus3UnitUnloadFeeDescription,
    invoicePopupUnloadFee,
    driverPopupUnloadFee,
    popupUnloadFeePerUnit,
    popupUnloadFeeDescription,
    invoiceUSSurcharge,
    driverUSSurcharge,
    usSurchargeDescription,
    invoiceCanadianSurcharge,
    driverCanadianSurcharge,
    canadianSurchargeDescription,
    invoiceSplitDropUnloadFee,
    driverSplitDropUnloadFee,
    popupSplitDropFeeDescription,
  ]);

  useEffect(() => {
    if (
      (!invoice2unitUnloadFee && !driver2UnitUnloadFee) ||
      (parseFloat(invoice2unitUnloadFee || 0) === 0 && parseFloat(driver2UnitUnloadFee || 0) === 0)
    ) {
      setunit2UnloadFeeDescription("");
    }
  }, [invoice2unitUnloadFee, driver2UnitUnloadFee]);

  useEffect(() => {
    if (
      (!invoice3PlusUnitUnloadFee && !driver3PlusUnitUnloadFee) ||
      (parseFloat(invoice3PlusUnitUnloadFee || 0) === 0 && parseFloat(driver3PlusUnitUnloadFee || 0) === 0)
    ) {
      setPlus3UnitUnloadFeeDescription("");
    }
  }, [invoice3PlusUnitUnloadFee, driver3PlusUnitUnloadFee]);

  useEffect(() => {
    if (
      (!invoicePopupUnloadFee && !driverPopupUnloadFee) ||
      (parseFloat(invoicePopupUnloadFee || 0) === 0 && parseFloat(driverPopupUnloadFee || 0) === 0)
    ) {
      setPopupUnloadFeeDescription("");
    }
  }, [invoicePopupUnloadFee, driverPopupUnloadFee]);

  useEffect(() => {
    if (
      (!invoiceUSSurcharge && !driverUSSurcharge) ||
      (parseFloat(invoiceUSSurcharge || 0) === 0 && parseFloat(driverUSSurcharge || 0) === 0)
    ) {
      setUsSurchargeDescription("");
    }
  }, [invoiceUSSurcharge, driverUSSurcharge]);

  useEffect(() => {
    if (
      (!invoiceCanadianSurcharge && !driverCanadianSurcharge) ||
      (parseFloat(invoiceCanadianSurcharge || 0) === 0 && parseFloat(driverCanadianSurcharge || 0) === 0)
    ) {
      setCanadianSurchargeDescription("");
    }
  }, [invoiceCanadianSurcharge, driverCanadianSurcharge]);

  useEffect(() => {
    if (
      (!invoiceSplitDropUnloadFee && !driverSplitDropUnloadFee) ||
      (parseFloat(invoiceSplitDropUnloadFee || 0) === 0 && parseFloat(driverSplitDropUnloadFee || 0) === 0)
    ) {
      setPopupSplitDropFeeDescription("");
    }
  }, [invoiceSplitDropUnloadFee, driverSplitDropUnloadFee]);
  /****validation****/
  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");

    if (value) return number;
  };
  const FeeValidation = /^(?:\d{1,5}(\.\d{1,2})?|\.\d{1,2})$/;

  const validationSchema = yup.object({
    invoiceUSSurcharge: yup.string().matches(FeeValidation),
    driverUSSurcharge: yup.string().matches(FeeValidation),
    invoice3PlusUnitUnloadFee: yup.string().matches(FeeValidation),
    driver3PlusUnitUnloadFee: yup.string().matches(FeeValidation),
    invoiceCanadianSurcharge: yup.string().matches(FeeValidation),
    driverCanadianSurcharge: yup.string().matches(FeeValidation),
    invoiceSplitDropUnloadFee: yup.string().matches(FeeValidation),
    driverSplitDropUnloadFee: yup.string().matches(FeeValidation),
    invoice2unitUnloadFee: yup.string().matches(FeeValidation),
    driver2UnitUnloadFee: yup.string().matches(FeeValidation),
    invoicePopupUnloadFee: yup.string().matches(FeeValidation),
    driverPopupUnloadFee: yup.string().matches(FeeValidation),
  });
  return (
    <Formik
      initialValues={{
        invoice2unitUnloadFee,
        invoice3PlusUnitUnloadFee,
        driver2UnitUnloadFee,
        driver3PlusUnitUnloadFee,
        invoicePopupUnloadFee,
        driverPopupUnloadFee,
        invoiceUSSurcharge,
        driverUSSurcharge,
        usSurchargeDescription,
        driverCanadianSurcharge,
        driverSplitDropUnloadFee,
      }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      validateOnMount
      initialTouched={{
        invoice2unitUnloadFee: true,
        driver2UnitUnloadFee: true,
        invoice3PlusUnitUnloadFee: true,
        driver3PlusUnitUnloadFee: true,
        invoicePopupUnloadFee: true,
        driverPopupUnloadFee: true,
        invoiceUSSurcharge: true,
        driverUSSurcharge: true,
        invoiceCanadianSurcharge: true,
        driverCanadianSurcharge: true,
        driverSplitDropUnloadFee: true,
        invoiceSplitDropUnloadFee: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="m-b-5">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={3} sm={3} md={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.invoice2UnitUnloadFee")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        id="invoice2unitUnloadFee"
                        name="invoice2unitUnloadFee"
                        type="text"
                        value={invoice2unitUnloadFee}
                        maxLength={8}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setInvoice2unitUnloadFee(isNumber(e.target.value));
                        }}
                        className={`customFormControl ${
                          viewDetail === true || invoice2unitUnloadFee === ""
                            ? "" // no border if viewDetail or empty
                            : !FeeValidation.test(invoice2unitUnloadFee)
                              ? "borderRed" // red border if invalid
                              : "" // valid input → no border
                        }`}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={3} sm={3} md={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.driver2UnitUnloadFee")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        id="driver2UnitUnloadFee"
                        name="driver2UnitUnloadFee"
                        type="text"
                        value={driver2UnitUnloadFee}
                        maxLength={8}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setDriver2UnitUnloadFee(isNumber(e.target.value));
                        }}
                        className={`customFormControl ${
                          viewDetail === true || driver2UnitUnloadFee === ""
                            ? "" // no border if viewDetail or empty
                            : !FeeValidation.test(driver2UnitUnloadFee)
                              ? "borderRed" // red border if invalid
                              : "" // valid input → no border
                        }`}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={3} sm={3} md={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.2UnitUnloadFeeDescription")}
                      </Form.Label>
                    </Col>
                    <Col sm={7} md={7} xs={7} className="p-0">
                      <input
                        className={`customFormControl ${
                          viewDetail ||
                          (!parseFloat(invoice2unitUnloadFee || 0) && !parseFloat(driver2UnitUnloadFee || 0))
                            ? ""
                            : unit2UnloadFeeDescription &&
                                (parseFloat(invoice2unitUnloadFee || 0) > 0.0 ||
                                  parseFloat(driver2UnitUnloadFee || 0) > 0.0)
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        disabled={
                          viewDetail ||
                          ((invoice2unitUnloadFee == null ||
                            parseFloat(invoice2unitUnloadFee) === 0 ||
                            invoice2unitUnloadFee == "") &&
                            (driver2UnitUnloadFee == null ||
                              parseFloat(driver2UnitUnloadFee) === 0 ||
                              driver2UnitUnloadFee == ""))
                        }
                        id="customer"
                        name="customer"
                        type="text"
                        value={unit2UnloadFeeDescription}
                        maxLength={50}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setunit2UnloadFeeDescription(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                    <Col xs={3} sm={3} md={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.invoice3+UnitUnloadFee")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        id="invoice3PlusUnitUnloadFee"
                        name="invoice3PlusUnitUnloadFee"
                        type="text"
                        value={invoice3PlusUnitUnloadFee}
                        maxLength={8}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setInvoice3PlusUnitUnloadFee(isNumber(e.target.value));
                        }}
                        className={`customFormControl ${
                          viewDetail === true || invoice3PlusUnitUnloadFee === ""
                            ? "" // no border if viewDetail or empty
                            : !FeeValidation.test(invoice3PlusUnitUnloadFee)
                              ? "borderRed" // red border if invalid
                              : "" // valid input → no border
                        }`}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={3} sm={3} md={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.driver3+UnitUnloadFee")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        id="driver3PlusUnitUnloadFee"
                        name="driver3PlusUnitUnloadFee"
                        type="text"
                        value={driver3PlusUnitUnloadFee}
                        maxLength={8}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setDriver3PlusUnitUnloadFee(isNumber(e.target.value));
                        }}
                        className={`customFormControl ${
                          viewDetail === true || driver3PlusUnitUnloadFee === ""
                            ? "" // no border if viewDetail or empty
                            : !FeeValidation.test(driver3PlusUnitUnloadFee)
                              ? "borderRed" // red border if invalid
                              : "" // valid input → no border
                        }`}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={3} sm={3} md={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.3+UnitUnloadFeeDescription")}
                      </Form.Label>
                    </Col>
                    <Col sm={7} md={7} xs={7} className="p-0">
                      <input
                        className={`customFormControl ${
                          viewDetail ||
                          (!parseFloat(invoice3PlusUnitUnloadFee || 0) &&
                            !parseFloat(driver3PlusUnitUnloadFee || 0))
                            ? ""
                            : plus3UnitUnloadFeeDescription &&
                                (parseFloat(invoice3PlusUnitUnloadFee || 0) > 0.0 ||
                                  parseFloat(driver3PlusUnitUnloadFee || 0) > 0.0)
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        disabled={
                          viewDetail ||
                          ((invoice3PlusUnitUnloadFee == null ||
                            parseFloat(invoice3PlusUnitUnloadFee) === 0 ||
                            invoice3PlusUnitUnloadFee == "") &&
                            (driver3PlusUnitUnloadFee == null ||
                              parseFloat(driver3PlusUnitUnloadFee) === 0 ||
                              driver3PlusUnitUnloadFee == ""))
                        }
                        id="plus3UnitUnloadFeeDescription"
                        name="plus3UnitUnloadFeeDescription"
                        type="text"
                        value={plus3UnitUnloadFeeDescription}
                        maxLength={50}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setPlus3UnitUnloadFeeDescription(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                    <Col xs={3} sm={3} md={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.invoicePopupUnloadFee")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        id="invoicePopupUnloadFee"
                        name="invoicePopupUnloadFee"
                        type="text"
                        value={invoicePopupUnloadFee}
                        maxLength={8}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setInvoicePopupUnloadFee(isNumber(e.target.value));
                        }}
                        className={`customFormControl ${
                          viewDetail === true || invoicePopupUnloadFee === ""
                            ? "" // no border if viewDetail or empty
                            : !FeeValidation.test(invoicePopupUnloadFee)
                              ? "borderRed" // red border if invalid
                              : "" // valid input → no border
                        }`}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={3} sm={3} md={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.driverPopupUnloadFee")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        id="driverPopupUnloadFee"
                        name="driverPopupUnloadFee"
                        type="text"
                        value={driverPopupUnloadFee}
                        maxLength={8}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setDriverPopupUnloadFee(isNumber(e.target.value));
                        }}
                        className={`customFormControl ${
                          viewDetail === true || driverPopupUnloadFee === ""
                            ? "" // no border if viewDetail or empty
                            : !FeeValidation.test(driverPopupUnloadFee)
                              ? "borderRed" // red border if invalid
                              : "" // valid input → no border
                        }`}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.popupUnloadFeePerUnit")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        name="popupUnloadFeePerUnit"
                        value={popupUnloadFeePerUnit}
                        checked={popupUnloadFeePerUnit}
                        disabled={viewDetail}
                        onChange={(e) => setPopupUnloadFeePerUnit(e.target.checked)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={3} sm={3} md={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.PopupUnloadFeeDescription")}
                      </Form.Label>
                    </Col>
                    <Col sm={7} md={7} xs={7} className="p-0">
                      <input
                        className={`customFormControl ${
                          viewDetail ||
                          (!parseFloat(invoicePopupUnloadFee || 0) && !parseFloat(driverPopupUnloadFee || 0))
                            ? ""
                            : popupUnloadFeeDescription &&
                                (parseFloat(invoicePopupUnloadFee || 0) > 0.0 ||
                                  parseFloat(driverPopupUnloadFee || 0) > 0.0)
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        disabled={
                          viewDetail ||
                          ((invoicePopupUnloadFee == null ||
                            parseFloat(invoicePopupUnloadFee) === 0 ||
                            invoicePopupUnloadFee == "") &&
                            (driverPopupUnloadFee == null ||
                              parseFloat(driverPopupUnloadFee) === 0 ||
                              driverPopupUnloadFee == ""))
                        }
                        id="popupUnloadFeeDescription"
                        name="popupUnloadFeeDescription"
                        type="text"
                        value={popupUnloadFeeDescription}
                        maxLength={50}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setPopupUnloadFeeDescription(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm={6} md={6} xs={6} className="ps-lg-5">
                  <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0">
                    <Col xs={4} sm={4} md={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.invoiceUSSurcharge")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        id="invoiceUSSurcharge"
                        name="invoiceUSSurcharge"
                        type="text"
                        value={invoiceUSSurcharge}
                        maxLength={8}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setInvoiceUSSurcharge(isNumber(e.target.value));
                        }}
                        className={`customFormControl ${
                          viewDetail === true || invoiceUSSurcharge === ""
                            ? "" // no border if viewDetail or empty
                            : !FeeValidation.test(invoiceUSSurcharge)
                              ? "borderRed" // red border if invalid
                              : "" // valid input → no border
                        }`}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={4} sm={4} md={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.driverUSSurcharge")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        id=" driverUSSurcharge"
                        name=" driverUSSurcharge"
                        type="text"
                        value={driverUSSurcharge}
                        maxLength={8}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setDriverUSSurcharge(isNumber(e.target.value));
                        }}
                        className={`customFormControl ${
                          viewDetail === true || driverUSSurcharge === ""
                            ? "" // no border if viewDetail or empty
                            : !FeeValidation.test(driverUSSurcharge)
                              ? "borderRed" // red border if invalid
                              : "" // valid input → no border
                        }`}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={4} sm={4} md={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.USSurchargeDescription")}
                      </Form.Label>
                    </Col>
                    <Col sm={7} md={7} xs={7} className="p-0">
                      <input
                        className={`customFormControl ${
                          viewDetail ||
                          (!parseFloat(invoiceUSSurcharge || 0) && !parseFloat(driverUSSurcharge || 0))
                            ? ""
                            : usSurchargeDescription &&
                                (parseFloat(invoiceUSSurcharge || 0) > 0.0 ||
                                  parseFloat(driverUSSurcharge || 0) > 0.0)
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        disabled={
                          viewDetail ||
                          ((invoiceUSSurcharge == null ||
                            parseFloat(invoiceUSSurcharge) === 0 ||
                            invoiceUSSurcharge == "") &&
                            (driverUSSurcharge == null ||
                              parseFloat(driverUSSurcharge) === 0 ||
                              driverUSSurcharge == ""))
                        }
                        id="usSurchargeDescription"
                        name="usSurchargeDescription"
                        type="text"
                        value={usSurchargeDescription}
                        maxLength={50}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setUsSurchargeDescription(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                    <Col xs={4} sm={4} md={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.invoiceCanadianSurcharge")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        id="invoiceCanadianSurcharg"
                        name="invoiceCanadianSurcharg"
                        type="text"
                        maxLength={8}
                        value={invoiceCanadianSurcharge}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setInvoiceCanadianSurcharge(isNumber(e.target.value));
                        }}
                        className={`customFormControl ${
                          viewDetail === true || invoiceCanadianSurcharge === ""
                            ? "" // no border if viewDetail or empty
                            : !FeeValidation.test(invoiceCanadianSurcharge)
                              ? "borderRed" // red border if invalid
                              : "" // valid input → no border
                        }`}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={4} sm={4} md={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.driverCanadianSurcharge")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        id="driverCanadianSurcharge"
                        name="driverCanadianSurcharge"
                        type="text"
                        maxLength={8}
                        value={driverCanadianSurcharge}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setDriverCanadianSurcharge(isNumber(e.target.value));
                        }}
                        className={`customFormControl ${
                          viewDetail === true || driverCanadianSurcharge === ""
                            ? "" // no border if viewDetail or empty
                            : !FeeValidation.test(driverCanadianSurcharge)
                              ? "borderRed" // red border if invalid
                              : "" // valid input → no border
                        }`}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={4} sm={4} md={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.canadianSurchargeDescription")}
                      </Form.Label>
                    </Col>
                    <Col sm={7} md={7} xs={7} className="p-0">
                      <input
                        className={`customFormControl ${
                          viewDetail ||
                          (!parseFloat(invoiceCanadianSurcharge || 0) &&
                            !parseFloat(driverCanadianSurcharge || 0))
                            ? ""
                            : canadianSurchargeDescription &&
                                (parseFloat(invoiceCanadianSurcharge || 0) > 0.0 ||
                                  parseFloat(driverCanadianSurcharge || 0) > 0.0)
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        disabled={
                          viewDetail ||
                          ((invoiceCanadianSurcharge == null ||
                            parseFloat(invoiceCanadianSurcharge) === 0 ||
                            invoiceCanadianSurcharge == "") &&
                            (driverCanadianSurcharge == null ||
                              parseFloat(driverCanadianSurcharge) === 0 ||
                              driverCanadianSurcharge == ""))
                        }
                        id="canadianSurchargeDescription"
                        name="canadianSurchargeDescription"
                        type="text"
                        value={canadianSurchargeDescription}
                        maxLength={50}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setCanadianSurchargeDescription(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                    <Col xs={4} sm={4} md={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.invoicesSplitDropUnloadFee")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        id="invoiceSplitDropUnloadFee"
                        name="invoiceSplitDropUnloadFee"
                        type="text"
                        maxLength={8}
                        value={invoiceSplitDropUnloadFee}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setInvoiceSplitDropUnloadFee(isNumber(e.target.value));
                        }}
                        className={`customFormControl ${
                          viewDetail === true || invoiceSplitDropUnloadFee === ""
                            ? "" // no border if viewDetail or empty
                            : !FeeValidation.test(invoiceSplitDropUnloadFee)
                              ? "borderRed" // red border if invalid
                              : "" // valid input → no border
                        }`}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={4} sm={4} md={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.driverSplitDropUnloadFee")}
                      </Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                      <input
                        id="driverSplitDropUnloadFee"
                        name="driverSplitDropUnloadFee"
                        type="text"
                        maxLength={8}
                        value={driverSplitDropUnloadFee}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            setDriverSplitDropUnloadFee(isNumber(e.target.value));
                        }}
                        className={`customFormControl ${
                          viewDetail === true || driverSplitDropUnloadFee === ""
                            ? "" // no border if viewDetail or empty
                            : !FeeValidation.test(driverSplitDropUnloadFee)
                              ? "borderRed" // red border if invalid
                              : "" // valid input → no border
                        }`}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={4} sm={4} md={4} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("edit.customer.plant.page.invoice.fees.tab.splitDropUnloadFeeDescription")}
                      </Form.Label>
                    </Col>
                    <Col sm={7} md={7} xs={7} className="p-0">
                      <input
                        id="popupSplitDropFeeDescription"
                        name="popupSplitDropFeeDescription"
                        type="text"
                        value={popupSplitDropFeeDescription}
                        maxLength={50}
                        className={`customFormControl ${
                          viewDetail ||
                          (!parseFloat(invoiceSplitDropUnloadFee || 0) &&
                            !parseFloat(driverSplitDropUnloadFee || 0))
                            ? ""
                            : popupSplitDropFeeDescription &&
                                (parseFloat(invoiceSplitDropUnloadFee || 0) > 0.0 ||
                                  parseFloat(driverSplitDropUnloadFee || 0) > 0.0)
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        disabled={
                          viewDetail ||
                          ((invoiceSplitDropUnloadFee == null ||
                            parseFloat(invoiceSplitDropUnloadFee) === 0 ||
                            invoiceSplitDropUnloadFee == "") &&
                            (driverSplitDropUnloadFee == null ||
                              parseFloat(driverSplitDropUnloadFee) === 0 ||
                              driverSplitDropUnloadFee == ""))
                        }
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setPopupSplitDropFeeDescription(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InvoiceFeesTab;
