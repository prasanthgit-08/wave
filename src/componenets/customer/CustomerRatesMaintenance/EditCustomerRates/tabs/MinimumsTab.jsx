import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerRatesData,
  setDriverMinimumAsFlatRate,
  setDriverMinimumCharge,
  setDriverMinimumChargeReload,
  setDriverMinimumChargeReturn,
  setDriverMinimumMiles,
  setDriverMinimumMilesReload,
  setDriverMinimumMilesReturn,
  setInvoiceMinimumAddFuelSurcharge,
  setInvoiceMinimumAsFlatrate,
  setInvoiceMinimumCharge,
  setInvoiceMinimumChargeReload,
  setInvoiceMinimumChargeReturn,
  setInvoiceMinimumMiles,
  setInvoiceMinimumMilesReload,
  setInvoiceMinimumMilesReturn,
  setIsMinimumTabValid,
  setIsSaveValid,
} from "../../../../../redux/CustomerRatesSlice";
import * as yup from "yup";
import { Formik } from "formik";
//import { BigDecimal } from 'bigdecimal';

const MinimumsTab = () => {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(true);

  const editFormData = useSelector((state) => state.customerRatesReducer.editFormData);
  const customerRatesData = useSelector((state) => state.customerRatesReducer.customerRatesData);
  const viewDetail = useSelector((state) => state.customerRatesReducer.viewDetail);
  const invoiceMinimumCharge = useSelector((state) => state.customerRatesReducer.invoiceMinimumCharge);
  const invoiceMinimumMiles = useSelector((state) => state.customerRatesReducer.invoiceMinimumMiles);
  const invoiceMinimumChargeReload = useSelector(
    (state) => state.customerRatesReducer.invoiceMinimumChargeReload
  );
  const invoiceMinimumMilesReload = useSelector(
    (state) => state.customerRatesReducer.invoiceMinimumMilesReload
  );
  const invoiceMinimumChargeReturn = useSelector(
    (state) => state.customerRatesReducer.invoiceMinimumChargeReturn
  );
  const invoiceMinimumMilesReturn = useSelector(
    (state) => state.customerRatesReducer.invoiceMinimumMilesReturn
  );
  const invoiceMinimumAsFlatrate = useSelector(
    (state) => state.customerRatesReducer.invoiceMinimumAsFlatrate
  );
  const invoiceMinimumAddFuelSurcharge = useSelector(
    (state) => state.customerRatesReducer.invoiceMinimumAddFuelSurcharge
  );
  const driverMinimumCharge = useSelector((state) => state.customerRatesReducer.driverMinimumCharge);
  const driverMinimumMiles = useSelector((state) => state.customerRatesReducer.driverMinimumMiles);
  const driverMinimumChargeReload = useSelector(
    (state) => state.customerRatesReducer.driverMinimumChargeReload
  );
  const driverMinimumMilesReload = useSelector(
    (state) => state.customerRatesReducer.driverMinimumMilesReload
  );
  const driverMinimumChargeReturn = useSelector(
    (state) => state.customerRatesReducer.driverMinimumChargeReturn
  );
  const driverMinimumMilesReturn = useSelector(
    (state) => state.customerRatesReducer.driverMinimumMilesReturn
  );
  const driverMinimumAsFlatRate = useSelector((state) => state.customerRatesReducer.driverMinimumAsFlatRate);
  const isMinimumTabValid = useSelector((state) => state.customerRatesReducer.isMinimumTabValid);
  const invoiceRates = useSelector((state) => state.customerRatesReducer.invoiceRates);
  const driverRates = useSelector((state) => state.customerRatesReducer.driverRates);
  /*****Invoice Fuel surcharges to disable the Add fuel Surcharge field */
  const invoiceFuelSurchargeGas = useSelector((state) => state.customerRatesReducer.invoiceFuelSurchargeGas);
  const invoiceFuelSurchargeDiesel = useSelector(
    (state) => state.customerRatesReducer.invoiceFuelSurchargeDiesel
  );
  const invoiceFuelSurchargeGasCanada = useSelector(
    (state) => state.customerRatesReducer.invoiceFuelSurchargeGasCanada
  );
  const invoiceFuelSurchargeDieselCanada = useSelector(
    (state) => state.customerRatesReducer.invoiceFuelSurchargeDieselCanada
  );
  const driverFuelSurchargeGas = useSelector((state) => state.customerRatesReducer.driverFuelSurchargeGas);
  const driverFuelSurchargeDiesel = useSelector(
    (state) => state.customerRatesReducer.driverFuelSurchargeDiesel
  );
  const driverFuelSurchargeGasCanada = useSelector(
    (state) => state.customerRatesReducer.driverFuelSurchargeGasCanada
  );
  const driverFuelSurchargeDieselCanada = useSelector(
    (state) => state.customerRatesReducer.driverFuelSurchargeDieselCanada
  );
  useEffect(() => {
    if (editFormData != null) {
      dispatch(
        setInvoiceMinimumCharge(
          editFormData?.invoiceMinimumCharge === 0
            ? ""
            : Number.isInteger(editFormData?.invoiceMinimumCharge)
              ? editFormData?.invoiceMinimumCharge.toFixed(2)
              : editFormData?.invoiceMinimumCharge
        )
      );

      dispatch(
        setInvoiceMinimumMiles(
          editFormData?.invoiceMinimumMiles === 0 ? "" : editFormData.invoiceMinimumMiles
        )
      );

      dispatch(
        setInvoiceMinimumChargeReload(
          editFormData?.invoiceMinimumChargeReload === 0
            ? ""
            : Number.isInteger(editFormData?.invoiceMinimumChargeReload)
              ? editFormData?.invoiceMinimumChargeReload.toFixed(2)
              : editFormData?.invoiceMinimumChargeReload
        )
      );

      dispatch(
        setInvoiceMinimumMilesReload(
          editFormData?.invoiceMinimumMilesReload === 0 ? "" : editFormData.invoiceMinimumMilesReload
        )
      );

      dispatch(
        setInvoiceMinimumChargeReturn(
          editFormData?.invoiceMinimumChargeReturn === 0
            ? ""
            : Number.isInteger(editFormData?.invoiceMinimumChargeReturn)
              ? editFormData?.invoiceMinimumChargeReturn.toFixed(2)
              : editFormData?.invoiceMinimumChargeReturn
        )
      );

      dispatch(
        setInvoiceMinimumMilesReturn(
          editFormData?.invoiceMinimumMilesReturn === 0 ? "" : editFormData.invoiceMinimumMilesReturn
        )
      );
      dispatch(setInvoiceMinimumAsFlatrate(editFormData?.invoiceMinimumAsFlatrate || false));

      dispatch(setInvoiceMinimumAddFuelSurcharge(editFormData?.invoiceMinimumAddFuelSurcharge || false));

      dispatch(
        setDriverMinimumCharge(
          editFormData?.driverMinimumCharge === 0
            ? ""
            : Number.isInteger(editFormData?.driverMinimumCharge)
              ? editFormData?.driverMinimumCharge.toFixed(2)
              : editFormData?.driverMinimumCharge
        )
      );
      dispatch(
        setDriverMinimumMiles(editFormData?.driverMinimumMiles === 0 ? "" : editFormData.driverMinimumMiles)
      );

      dispatch(
        setDriverMinimumChargeReload(
          editFormData?.driverMinimumChargeReload === 0
            ? ""
            : Number.isInteger(editFormData?.driverMinimumChargeReload)
              ? editFormData?.driverMinimumChargeReload.toFixed(2)
              : editFormData?.driverMinimumChargeReload
        )
      );
      dispatch(
        setDriverMinimumMilesReload(
          editFormData?.driverMinimumMilesReload === 0 ? "" : editFormData?.driverMinimumMilesReload
        )
      );

      dispatch(
        setDriverMinimumChargeReturn(
          editFormData?.driverMinimumChargeReturn === 0
            ? ""
            : Number.isInteger(editFormData?.driverMinimumChargeReturn)
              ? editFormData?.driverMinimumChargeReturn.toFixed(2)
              : editFormData?.driverMinimumChargeReturn
        )
      );
      dispatch(
        setDriverMinimumMilesReturn(
          editFormData?.driverMinimumMilesReload === 0 ? "" : editFormData?.driverMinimumMilesReturn
        )
      );
      dispatch(setDriverMinimumAsFlatRate(editFormData?.driverMinimumAsFlatRate || false));
    }
  }, [editFormData, viewDetail]);
  /**Setting the Miminum Tab form data for Save */
  const minimumTabFormData = () => {
    dispatch(
      setCustomerRatesData({
        invoiceMinimumCharge: invoiceMinimumCharge,
        invoiceMinimumMiles: invoiceMinimumMiles,
        invoiceMinimumChargeReload: invoiceMinimumChargeReload,
        invoiceMinimumMilesReload: invoiceMinimumMilesReload,
        invoiceMinimumChargeReturn: invoiceMinimumChargeReturn,
        invoiceMinimumMilesReturn: invoiceMinimumMilesReturn,
        invoiceMinimumAsFlatrate: invoiceMinimumAsFlatrate,
        invoiceMinimumAddFuelSurcharge: invoiceMinimumAddFuelSurcharge,
        driverMinimumCharge: driverMinimumCharge,
        driverMinimumMiles: driverMinimumMiles,
        driverMinimumChargeReload: driverMinimumChargeReload,
        driverMinimumMilesReload: driverMinimumMilesReload,
        driverMinimumChargeReturn: driverMinimumChargeReturn,
        driverMinimumMilesReturn: driverMinimumMilesReturn,
        driverMinimumAsFlatRate: driverMinimumAsFlatRate,
      })
    );
  };
  useEffect(() => {
    minimumTabFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    invoiceMinimumCharge,
    invoiceMinimumMiles,
    invoiceMinimumChargeReload,
    invoiceMinimumMilesReload,
    invoiceMinimumChargeReturn,
    invoiceMinimumMilesReturn,
    invoiceMinimumAsFlatrate,
    invoiceMinimumAddFuelSurcharge,
    driverMinimumCharge,
    driverMinimumMiles,
    driverMinimumChargeReload,
    driverMinimumMilesReload,
    driverMinimumChargeReturn,
    driverMinimumMilesReturn,
    driverMinimumAsFlatRate,
  ]);
  const RateValidation = /^\d{0,7}(?:\.\d{0,2})?$/;
  /*Clear the invoice and Driver Rates based on the Invoice and Driver rates flags*/
  useEffect(() => {
    if ((!invoiceRates && !viewDetail) || (!invoiceRates && viewDetail)) {
      dispatch(setInvoiceMinimumCharge(""));
      dispatch(setInvoiceMinimumMiles(""));
      dispatch(setInvoiceMinimumChargeReload(""));
      dispatch(setInvoiceMinimumMilesReload(""));
      dispatch(setInvoiceMinimumChargeReturn(""));
      dispatch(setInvoiceMinimumMilesReturn(""));
    }
  }, [invoiceRates, viewDetail]);
  /********
   * Reset the Invoice Minimum Addfuel
   * Surcharge on clearing Surcharges fields
   ******/
  useEffect(() => {
    if (
      !invoiceFuelSurchargeGas &&
      !invoiceFuelSurchargeDiesel &&
      !invoiceFuelSurchargeGasCanada &&
      !invoiceFuelSurchargeDieselCanada &&
      !driverFuelSurchargeGas &&
      !driverFuelSurchargeDiesel &&
      !driverFuelSurchargeGasCanada &&
      !driverFuelSurchargeDieselCanada
    ) {
      dispatch(setInvoiceMinimumAddFuelSurcharge(false));
    }
  }, [
    invoiceFuelSurchargeGas,
    invoiceFuelSurchargeDiesel,
    invoiceFuelSurchargeGasCanada,
    invoiceFuelSurchargeDieselCanada,
    driverFuelSurchargeGas,
    driverFuelSurchargeDiesel,
    driverFuelSurchargeGasCanada,
    driverFuelSurchargeDieselCanada,
  ]);
  useEffect(() => {
    if ((!driverRates && !viewDetail) || (!driverRates && viewDetail)) {
      dispatch(setDriverMinimumMilesReturn(""));
    }
  }, [driverRates, viewDetail]);

  /*Minimum Tab Validation*/
  useEffect(() => {
    if (
      invoiceMinimumMiles < 0 ||
      invoiceMinimumMiles > 32767 ||
      invoiceMinimumMilesReload < 0 ||
      invoiceMinimumMilesReload > 32767 ||
      invoiceMinimumMilesReturn < 0 ||
      invoiceMinimumMilesReturn > 32767 ||
      driverMinimumMiles < 0 ||
      driverMinimumMiles > 32767 ||
      driverMinimumMilesReload < 0 ||
      driverMinimumMilesReload > 32767 ||
      driverMinimumMilesReturn < 0 ||
      driverMinimumMilesReturn > 32767 ||
      invoiceMinimumCharge === "." ||
      invoiceMinimumChargeReload === "." ||
      invoiceMinimumChargeReturn === "." ||
      driverMinimumCharge === "." ||
      driverMinimumChargeReload === "." ||
      driverMinimumChargeReturn === "."
    ) {
      dispatch(setIsMinimumTabValid(false));
    } else {
      dispatch(setIsMinimumTabValid(true));
    }
  }, [
    invoiceRates,
    driverRates,
    invoiceMinimumCharge,
    invoiceMinimumMiles,
    invoiceMinimumChargeReload,
    invoiceMinimumMilesReload,
    invoiceMinimumChargeReturn,
    invoiceMinimumMilesReturn,
    driverMinimumCharge,
    driverMinimumMiles,
    driverMinimumChargeReload,
    driverMinimumMilesReload,
    driverMinimumChargeReturn,
    driverMinimumMilesReturn,
  ]);
  const isNumber = (value) => {
    if (!value) return value;
    const number = value?.replace(/[^\d:.]/g, "");
    if (value) return number;
  };
  const isDays = (value) => {
    if (!value) return value;
    const days = value?.replace(/[^\d]/g, "");
    if (value) return days;
  };

  return (
    <Formik
      initialValues={{
        invoiceMinimumMiles,
        invoiceMinimumMilesReload,
        invoiceMinimumMilesReturn,
        driverMinimumMiles,
        driverMinimumMilesReload,
        driverMinimumMilesReturn,
      }}
    >
      {(formik) => (
        <Form>
          <div className="p-1 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                {/* Invoice Minimum Charge Outbound */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Invoice Minimum Charge Outbound
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      id="InvoiceminimumChargeOutbound"
                      className={`customFormControl ${invoiceMinimumCharge === "." ? "borderRed" : "borderBlack"}`}
                      type="text"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      value={invoiceMinimumCharge}
                      onChange={(e) => {
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                          dispatch(setInvoiceMinimumCharge(isNumber(e.target.value)));
                      }}
                      disabled={viewDetail || invoiceMinimumMiles > 0 || !invoiceRates}
                    />
                  </Col>
                </Form.Group>
                {/* Invoice Minimum Miles Outbound */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Invoice Minimum Miles Outbound
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      type="text"
                      name="invoiceMinimumMiles"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      id="invoiceMinimumMiles"
                      value={invoiceMinimumMiles}
                      maxLength={5}
                      onChange={(e) => {
                        dispatch(setInvoiceMinimumMiles(isDays(e.target.value)));
                      }}
                      className={`customFormControl ${
                        !viewDetail
                          ? !invoiceMinimumMiles || (invoiceMinimumMiles >= 0 && invoiceMinimumMiles <= 32767)
                            ? ""
                            : "borderRed"
                          : ""
                      }`}
                      disabled={viewDetail || invoiceMinimumCharge > 0 || !invoiceRates}
                    />
                  </Col>
                </Form.Group>
                {/* Invoice Minimum Charge Reload */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Invoice Minimum Charge Reload
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      className={`customFormControl ${
                        invoiceMinimumChargeReload === "." ? "borderRed" : "borderBlack"
                      }`}
                      type="text"
                      name="invoiceMinimumChargeReload"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      id="invoiceMinimumChargeReload"
                      value={invoiceMinimumChargeReload}
                      onChange={(e) => {
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                          dispatch(setInvoiceMinimumChargeReload(isNumber(e.target.value)));
                      }}
                      disabled={viewDetail || invoiceMinimumMilesReload > 0 || !invoiceRates}
                    />
                  </Col>
                </Form.Group>
                {/* Invoice Minimum Miles Reload */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Invoice Minimum Miles Reload
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      type="text"
                      name="invoiceMinimumMilesReload"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      id="invoiceMinimumMilesReload"
                      maxLength={5}
                      value={invoiceMinimumMilesReload}
                      onChange={(e) => {
                        dispatch(setInvoiceMinimumMilesReload(isDays(e.target.value)));
                      }}
                      className={`customFormControl ${
                        !viewDetail
                          ? !invoiceMinimumMilesReload ||
                            (invoiceMinimumMilesReload >= 0 && invoiceMinimumMilesReload <= 32767)
                            ? ""
                            : "borderRed"
                          : ""
                      }`}
                      disabled={viewDetail || invoiceMinimumChargeReload > 0 || !invoiceRates}
                    />
                  </Col>
                </Form.Group>
                {/* Invoice Minimum Charge Return */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Invoice Minimum Charge Return
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      className={`customFormControl ${
                        invoiceMinimumChargeReturn === "." ? "borderRed" : "borderBlack"
                      }`}
                      type="text"
                      name="invoiceMinimumChargeReturn"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      id="invoiceMinimumChargeReturn"
                      value={invoiceMinimumChargeReturn}
                      onChange={(e) => {
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                          dispatch(setInvoiceMinimumChargeReturn(isNumber(e.target.value)));
                      }}
                      disabled={viewDetail || invoiceMinimumMilesReturn > 0 || !invoiceRates}
                    />
                  </Col>
                </Form.Group>
                {/* Invoice Minimum Miles Return */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Invoice Minimum Miles Return
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      type="text"
                      name="invoiceMinimumMilesReturn"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      id="invoiceMinimumMilesReturn"
                      value={invoiceMinimumMilesReturn}
                      maxLength={5}
                      onChange={(e) => {
                        dispatch(setInvoiceMinimumMilesReturn(isDays(e.target.value)));
                      }}
                      className={`customFormControl ${
                        !viewDetail
                          ? !invoiceMinimumMilesReturn ||
                            (invoiceMinimumMilesReturn >= 0 && invoiceMinimumMilesReturn <= 32767)
                            ? ""
                            : "borderRed"
                          : ""
                      }`}
                      disabled={viewDetail || invoiceMinimumChargeReturn > 0 || !invoiceRates}
                    />
                  </Col>
                </Form.Group>
                {/* Invoice Minimum As Flatrate */}
                <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Invoice Minimum As Flatrate
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="invoiceMinimumAsFlatrate"
                      id="invoiceMinimumAsFlatrate"
                      onChange={(e) => {
                        dispatch(setInvoiceMinimumAsFlatrate(e.target.checked));
                      }}
                      checked={invoiceMinimumAsFlatrate}
                      disabled={viewDetail || !invoiceRates}
                    />
                  </Col>
                </Form.Group>
                {/* Add Fuel Surcharge */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Add Fuel Surcharge</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="invoiceMinimumAddFuelSurcharge"
                      onChange={(e) => {
                        dispatch(setInvoiceMinimumAddFuelSurcharge(e.target.checked));
                      }}
                      checked={invoiceMinimumAddFuelSurcharge}
                      disabled={
                        viewDetail ||
                        (!invoiceFuelSurchargeGas &&
                          !invoiceFuelSurchargeDiesel &&
                          !invoiceFuelSurchargeGasCanada &&
                          !invoiceFuelSurchargeDieselCanada &&
                          !driverFuelSurchargeGas &&
                          !driverFuelSurchargeDiesel &&
                          !driverFuelSurchargeGasCanada &&
                          !driverFuelSurchargeDieselCanada)
                      }
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6} md={6} xs={6}>
                {/* Driver Minimum Charge Outbound */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Driver Minimum Charge Outbound
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      className={`customFormControl ${driverMinimumCharge === "." ? "borderRed" : "borderBlack"}`}
                      type="text"
                      name="driverMinimumCharge"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      id="driverMinimumCharge"
                      value={driverMinimumCharge}
                      onChange={(e) => {
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                          dispatch(setDriverMinimumCharge(isNumber(e.target.value)));
                      }}
                      disabled={viewDetail || driverMinimumMiles > 0 || !driverRates}
                    />
                  </Col>
                </Form.Group>
                {/* Driver Minimum Miles Outbound */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Driver Minimum Miles Outbound
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      type="text"
                      name="driverMinimumMiles"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      id="driverMinimumMiles"
                      maxLength={5}
                      value={driverMinimumMiles}
                      onChange={(e) => {
                        dispatch(setDriverMinimumMiles(isDays(e.target.value)));
                      }}
                      className={`customFormControl ${
                        !viewDetail
                          ? !driverMinimumMiles || (driverMinimumMiles >= 0 && driverMinimumMiles <= 32767)
                            ? ""
                            : "borderRed"
                          : ""
                      }`}
                      disabled={viewDetail || driverMinimumCharge > 0 || !driverRates}
                    />
                  </Col>
                </Form.Group>
                {/* Driver Minimum Charge Reload */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Driver Minimum Charge Reload
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      className={`customFormControl ${
                        driverMinimumChargeReload === "." ? "borderRed" : "borderBlack"
                      }`}
                      type="text"
                      name="driverMinimumChargeReload"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      id="driverMinimumChargeReload"
                      value={driverMinimumChargeReload}
                      onChange={(e) => {
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                          dispatch(setDriverMinimumChargeReload(isNumber(e.target.value)));
                      }}
                      disabled={viewDetail || driverMinimumMilesReload > 0 || !driverRates}
                    />
                  </Col>
                </Form.Group>
                {/* Driver Minimum Miles Reload */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Driver Minimum Miles Reload
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      type="text"
                      name="driverMinimumMilesReload"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      id="driverMinimumMilesReload"
                      maxLength={5}
                      value={driverMinimumMilesReload}
                      onChange={(e) => {
                        dispatch(setDriverMinimumMilesReload(isDays(e.target.value)));
                      }}
                      className={`customFormControl ${
                        !viewDetail
                          ? !driverMinimumMilesReload ||
                            (driverMinimumMilesReload >= 0 && driverMinimumMilesReload <= 32767)
                            ? ""
                            : "borderRed"
                          : ""
                      }`}
                      disabled={viewDetail || driverMinimumChargeReload > 0 || !driverRates}
                    />
                  </Col>
                </Form.Group>
                {/* Driver Minimum Charge Return */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Driver Minimum Charge Return
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      className={`customFormControl ${
                        driverMinimumChargeReturn === "." ? "borderRed" : "borderBlack"
                      }`}
                      type="text"
                      name="driverMinimumChargeReturn"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      id="driverMinimumChargeReturn"
                      value={driverMinimumChargeReturn}
                      onChange={(e) => {
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                          dispatch(setDriverMinimumChargeReturn(isNumber(e.target.value)));
                      }}
                      disabled={viewDetail || driverMinimumMilesReturn > 0 || !driverRates}
                    />
                  </Col>
                </Form.Group>
                {/* Driver Minimum Miles Return */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Driver Minimum Miles Return
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      type="text"
                      name="driverMinimumMilesReturn"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      id="driverMinimumMilesReturn"
                      maxLength={5}
                      value={driverMinimumMilesReturn}
                      onChange={(e) => {
                        dispatch(setDriverMinimumMilesReturn(isDays(e.target.value)));
                      }}
                      className={`customFormControl ${
                        !viewDetail
                          ? !driverMinimumMilesReturn ||
                            (driverMinimumMilesReturn >= 0 && driverMinimumMilesReturn <= 32767)
                            ? ""
                            : "borderRed"
                          : ""
                      }`}
                      disabled={viewDetail || driverMinimumChargeReturn > 0 || !driverRates}
                    />
                  </Col>
                </Form.Group>
                {/* Driver Minimum As Flatrate */}
                <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      Driver Minimum As Flatrate
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="driverMinimumAsFlatRate"
                      checked={driverMinimumAsFlatRate}
                      disabled={viewDetail || !driverRates}
                      onChange={(e) => {
                        dispatch(setDriverMinimumAsFlatRate(e.target.checked));
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

export default MinimumsTab;
