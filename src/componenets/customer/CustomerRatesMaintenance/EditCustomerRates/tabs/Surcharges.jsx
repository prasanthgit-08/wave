import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerRatesData,
  setDriverApportionedSurcharge,
  setDriverApportionedWeightCutoff,
  setDriverCDLGVWRCutoff,
  setDriverCDLGVWRCutoffB,
  setDriverCDLLengthCutoff,
  setDriverCDLLengthCutoffB,
  setDriverCDLSurcharge,
  setDriverCDLSurchargeB,
  setDriverCDLSurchargeCanada,
  setDriverCDLSurchargeCanadaB,
  setDriverFuelSurchargeDiesel,
  setDriverFuelSurchargeGas,
  setInvoiceApportionedSurcharge,
  setInvoiceApportionedWeightCutoff,
  setInvoiceCDLSurchargeCanada,
  setInvoiceCDLSurchargeCanadaB,
  setInvoiceFuelSurchargeDiesel,
  setInvoiceFuelSurchargeDieselCanada,
  setInvoiceFuelSurchargeGas,
  setInvoiceFuelSurchargeGasCanada,
  setIsSurchargesTabValid,
  setUseApportionedOnReloads,
  setUseApportionedOnReturns,
  setUseCDLReload,
  setUseCDLReturns,
  setdriverFuelSurchargeDieselCanada,
  setdriverFuelSurchargeGasCanada,
  setinvoiceCDLGVWRCutoff,
  setinvoiceCDLGVWRCutoffB,
  setinvoiceCDLLengthCutoff,
  setinvoiceCDLLengthCutoffB,
  setinvoiceCDLSurcharge,
  setinvoiceCDLSurchargeB,
} from "../../../../../redux/CustomerRatesSlice";
import { useParams } from "react-router-dom";
import { lastpointer } from "../../../../../utils/utils";
export const Surcharges = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const ratePK = params.customerRatePK;
  const editFormData = useSelector((state) => state.customerRatesReducer.editFormData);
  const viewDetail = useSelector((state) => state.customerRatesReducer.viewDetail);
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
  const invoiceCDLSurcharge = useSelector((state) => state.customerRatesReducer.invoiceCDLSurcharge);
  const invoiceCDLSurchargeCanada = useSelector(
    (state) => state.customerRatesReducer.invoiceCDLSurchargeCanada
  );
  const invoiceCDLGVWRCutoff = useSelector((state) => state.customerRatesReducer.invoiceCDLGVWRCutoff);
  const invoiceCDLLengthCutoff = useSelector((state) => state.customerRatesReducer.invoiceCDLLengthCutoff);
  const driverCDLSurcharge = useSelector((state) => state.customerRatesReducer.driverCDLSurcharge);
  const driverCDLSurchargeCanada = useSelector(
    (state) => state.customerRatesReducer.driverCDLSurchargeCanada
  );
  const driverCDLGVWRCutoff = useSelector((state) => state.customerRatesReducer.driverCDLGVWRCutoff);
  const driverCDLLengthCutoff = useSelector((state) => state.customerRatesReducer.driverCDLLengthCutoff);
  const invoiceCDLSurchargeB = useSelector((state) => state.customerRatesReducer.invoiceCDLSurchargeB);
  const invoiceCDLSurchargeCanadaB = useSelector(
    (state) => state.customerRatesReducer.invoiceCDLSurchargeCanadaB
  );
  const invoiceCDLGVWRCutoffB = useSelector((state) => state.customerRatesReducer.invoiceCDLGVWRCutoffB);
  const invoiceCDLLengthCutoffB = useSelector((state) => state.customerRatesReducer.invoiceCDLLengthCutoffB);
  const driverCDLSurchargeB = useSelector((state) => state.customerRatesReducer.driverCDLSurchargeB);
  const driverCDLSurchargeCanadaB = useSelector(
    (state) => state.customerRatesReducer.driverCDLSurchargeCanadaB
  );
  const driverCDLGVWRCutoffB = useSelector((state) => state.customerRatesReducer.driverCDLGVWRCutoffB);
  const driverCDLLengthCutoffB = useSelector((state) => state.customerRatesReducer.driverCDLLengthCutoffB);
  const useCDLReload = useSelector((state) => state.customerRatesReducer.useCDLReload);
  const useCDLReturns = useSelector((state) => state.customerRatesReducer.useCDLReturns);
  const invoiceRates = useSelector((state) => state.customerRatesReducer.invoiceRates);
  const driverRates = useSelector((state) => state.customerRatesReducer.driverRates);
  const invoiceApportionedSurcharge = useSelector(
    (state) => state.customerRatesReducer.invoiceApportionedSurcharge
  );
  const invoiceApportionedWeightCutoff = useSelector(
    (state) => state.customerRatesReducer.invoiceApportionedWeightCutoff
  );
  const driverApportionedSurcharge = useSelector(
    (state) => state.customerRatesReducer.driverApportionedSurcharge
  );
  const driverApportionedWeightCutoff = useSelector(
    (state) => state.customerRatesReducer.driverApportionedWeightCutoff
  );
  const useApportionedOnReloads = useSelector((state) => state.customerRatesReducer.useApportionedOnReloads);
  const useApportionedOnReturns = useSelector((state) => state.customerRatesReducer.useApportionedOnReturns);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(
        setDriverApportionedWeightCutoff(
          editFormData?.driverApportionedCutoff === 0
            ? ""
            : Number.isInteger(editFormData?.driverApportionedCutoff)
              ? editFormData?.driverApportionedCutoff
              : editFormData?.driverApportionedCutoff
        )
      );
      dispatch(
        setDriverApportionedSurcharge(
          editFormData?.driverApportionedRate === 0
            ? ""
            : Number.isInteger(editFormData?.driverApportionedRate)
              ? editFormData?.driverApportionedRate.toFixed(4)
              : editFormData?.driverApportionedRate
        )
      );
      dispatch(
        setInvoiceApportionedWeightCutoff(
          editFormData?.invoiceApportionedCutoff === 0
            ? ""
            : Number.isInteger(editFormData?.invoiceApportionedCutoff)
              ? editFormData?.invoiceApportionedCutoff
              : editFormData?.invoiceApportionedCutoff
        )
      );
      dispatch(
        setInvoiceApportionedSurcharge(
          editFormData?.invoiceApportionedRate === 0
            ? ""
            : Number.isInteger(editFormData?.invoiceApportionedRate)
              ? editFormData?.invoiceApportionedRate.toFixed(4)
              : editFormData?.invoiceApportionedRate
        )
      );
      dispatch(
        setInvoiceFuelSurchargeGas(
          editFormData?.invoiceFuelSurchargeGas === 0
            ? ""
            : Number.isInteger(editFormData?.invoiceFuelSurchargeGas)
              ? editFormData?.invoiceFuelSurchargeGas.toFixed(4)
              : editFormData?.invoiceFuelSurchargeGas
        )
      );
      dispatch(
        setInvoiceFuelSurchargeDiesel(
          editFormData?.invoiceFuelSurchargeDiesel === 0
            ? ""
            : Number.isInteger(editFormData?.invoiceFuelSurchargeDiesel)
              ? editFormData?.invoiceFuelSurchargeDiesel.toFixed(4)
              : editFormData?.invoiceFuelSurchargeDiesel
        )
      );
      dispatch(
        setInvoiceFuelSurchargeGasCanada(
          editFormData?.invoiceFuelSurchargeGasCN === 0
            ? ""
            : Number.isInteger(editFormData?.invoiceFuelSurchargeGasCN)
              ? editFormData?.invoiceFuelSurchargeGasCN.toFixed(4)
              : editFormData?.invoiceFuelSurchargeGasCN
        )
      );
      dispatch(
        setInvoiceFuelSurchargeDieselCanada(
          editFormData?.invoiceFuelSurchargeDieselCN === 0
            ? ""
            : Number.isInteger(editFormData?.invoiceFuelSurchargeDieselCN)
              ? editFormData?.invoiceFuelSurchargeDieselCN.toFixed(4)
              : editFormData?.invoiceFuelSurchargeDieselCN
        )
      );
      dispatch(
        setDriverFuelSurchargeGas(
          editFormData?.driverFuelSurchargeGas === 0
            ? ""
            : Number.isInteger(editFormData?.driverFuelSurchargeGas)
              ? editFormData?.driverFuelSurchargeGas.toFixed(4)
              : editFormData?.driverFuelSurchargeGas
        )
      );
      dispatch(
        setDriverFuelSurchargeDiesel(
          editFormData?.driverFuelSurchargeDiesel === 0
            ? ""
            : Number.isInteger(editFormData?.driverFuelSurchargeDiesel)
              ? editFormData?.driverFuelSurchargeDiesel.toFixed(4)
              : editFormData?.driverFuelSurchargeDiesel
        )
      );
      dispatch(
        setdriverFuelSurchargeGasCanada(
          editFormData?.driverFuelSurchargeGasCN === 0
            ? ""
            : Number.isInteger(editFormData?.driverFuelSurchargeGasCN)
              ? editFormData?.driverFuelSurchargeGasCN.toFixed(4)
              : editFormData?.driverFuelSurchargeGasCN
        )
      );
      dispatch(
        setdriverFuelSurchargeDieselCanada(
          editFormData?.driverFuelSurchargeDieselCN === 0
            ? ""
            : Number.isInteger(editFormData?.driverFuelSurchargeDieselCN)
              ? editFormData?.driverFuelSurchargeDieselCN.toFixed(4)
              : editFormData?.driverFuelSurchargeDieselCN
        )
      );
      dispatch(
        setinvoiceCDLSurcharge(
          editFormData?.invoiceCDLARate === 0
            ? ""
            : Number.isInteger(editFormData?.invoiceCDLARate)
              ? editFormData?.invoiceCDLARate.toFixed(4)
              : editFormData?.invoiceCDLARate
        )
      );
      dispatch(
        setInvoiceCDLSurchargeCanada(
          editFormData?.invoiceCDLACanadianRate === 0
            ? ""
            : Number.isInteger(editFormData?.invoiceCDLACanadianRate)
              ? editFormData?.invoiceCDLACanadianRate.toFixed(4)
              : editFormData?.invoiceCDLACanadianRate
        )
      );
      dispatch(
        setinvoiceCDLGVWRCutoff(
          editFormData?.invoiceCDLGVWRCutoff === 0 ? "" : editFormData.invoiceCDLGVWRCutoff
        )
      );
      dispatch(
        setinvoiceCDLLengthCutoff(
          editFormData?.invoiceCDLLengthCutoff === 0 ? "" : editFormData?.invoiceCDLLengthCutoff
        )
      );
      dispatch(
        setDriverCDLSurcharge(
          editFormData?.driverCDLARate === 0
            ? ""
            : Number.isInteger(editFormData?.driverCDLARate)
              ? editFormData?.driverCDLARate.toFixed(4)
              : editFormData?.driverCDLARate
        )
      );
      dispatch(
        setDriverCDLSurchargeCanada(
          editFormData?.driverCDLACanadianRate === 0
            ? ""
            : Number.isInteger(editFormData?.driverCDLACanadianRate)
              ? editFormData?.driverCDLACanadianRate.toFixed(4)
              : editFormData?.driverCDLACanadianRate
        )
      );
      dispatch(
        setDriverCDLGVWRCutoff(
          editFormData?.driverCDLGVWRCutoff === 0 ? "" : editFormData?.driverCDLGVWRCutoff
        )
      );
      dispatch(
        setDriverCDLLengthCutoff(
          editFormData?.driverCDLLengthCutoff === 0 ? "" : editFormData?.driverCDLLengthCutoff
        )
      );
      /************************Surcharges Tab Tier B******************************/
      dispatch(
        setinvoiceCDLSurchargeB(
          editFormData?.invoiceCDLARateB === 0
            ? ""
            : Number.isInteger(editFormData?.invoiceCDLARateB)
              ? editFormData?.invoiceCDLARateB.toFixed(4)
              : editFormData?.invoiceCDLARateB
        )
      );
      dispatch(
        setInvoiceCDLSurchargeCanadaB(
          editFormData?.invoiceCDLACanadianRateB === 0
            ? ""
            : Number.isInteger(editFormData?.invoiceCDLACanadianRateB)
              ? editFormData?.invoiceCDLACanadianRateB.toFixed(4)
              : editFormData?.invoiceCDLACanadianRateB
        )
      );
      dispatch(
        setinvoiceCDLGVWRCutoffB(
          editFormData?.invoiceCDLGVWRCutoffB === 0 ? "" : editFormData?.invoiceCDLGVWRCutoffB
        )
      );
      dispatch(
        setinvoiceCDLLengthCutoffB(
          editFormData?.invoiceCDLLengthCutoffB === 0 ? "" : editFormData?.invoiceCDLLengthCutoffB
        )
      );
      dispatch(
        setDriverCDLSurchargeB(
          editFormData?.driverCDLARateB === 0
            ? ""
            : Number.isInteger(editFormData?.driverCDLARateB)
              ? editFormData?.driverCDLARateB.toFixed(4)
              : editFormData?.driverCDLARateB
        )
      );
      dispatch(
        setDriverCDLSurchargeCanadaB(
          editFormData?.driverCDLACanadianRateB === 0
            ? ""
            : Number.isInteger(editFormData?.driverCDLACanadianRateB)
              ? editFormData?.driverCDLACanadianRateB.toFixed(4)
              : editFormData?.driverCDLACanadianRateB
        )
      );
      dispatch(
        setDriverCDLGVWRCutoffB(
          editFormData?.driverCDLGVWRCutoffB === 0 ? "" : editFormData?.driverCDLGVWRCutoffB
        )
      );
      dispatch(
        setDriverCDLLengthCutoffB(
          editFormData?.driverCDLLengthCutoffB === 0 ? "" : editFormData?.driverCDLLengthCutoffB
        )
      );

      dispatch(setUseCDLReload(editFormData?.useCDLReload || false));
      dispatch(setUseCDLReturns(editFormData?.useCDLReturns || false));
      dispatch(setUseApportionedOnReloads(editFormData?.useApportionedReload || false));
      dispatch(setUseApportionedOnReturns(editFormData?.useApportionedReturns || false));
    }
  }, [editFormData, viewDetail]);

  /**** Setting Surcharges Form data for Save ***/
  const surchargesTabFormData = () => {
    dispatch(
      setCustomerRatesData({
        invoiceFuelSurchargeGas: invoiceFuelSurchargeGas,
        invoiceFuelSurchargeDiesel: invoiceFuelSurchargeDiesel,
        invoiceFuelSurchargeGasCN: invoiceFuelSurchargeGasCanada,
        invoiceFuelSurchargeDieselCN: invoiceFuelSurchargeDieselCanada,
        driverFuelSurchargeGas: driverFuelSurchargeGas,
        driverFuelSurchargeDiesel: driverFuelSurchargeDiesel,
        driverFuelSurchargeGasCN: driverFuelSurchargeGasCanada,
        driverFuelSurchargeDieselCN: driverFuelSurchargeDieselCanada,
        invoiceCDLARate: invoiceCDLSurcharge,
        invoiceCDLACanadianRate: invoiceCDLSurchargeCanada,
        invoiceCDLGVWRCutoff: invoiceCDLGVWRCutoff,
        invoiceCDLLengthCutoff: invoiceCDLLengthCutoff,
        driverCDLARate: driverCDLSurcharge,
        driverCDLACanadianRate: driverCDLSurchargeCanada,
        driverCDLGVWRCutoff: driverCDLGVWRCutoff,
        driverCDLLengthCutoff: driverCDLLengthCutoff,
        invoiceCDLARateB: invoiceCDLSurchargeB,
        invoiceCDLACanadianRateB: invoiceCDLSurchargeCanadaB,
        invoiceCDLGVWRCutoffB: invoiceCDLGVWRCutoffB,
        invoiceCDLLengthCutoffB: invoiceCDLLengthCutoffB,
        driverCDLARateB: driverCDLSurchargeB,
        driverCDLACanadianRateB: driverCDLSurchargeCanadaB,
        driverCDLGVWRCutoffB: driverCDLGVWRCutoffB,
        driverCDLLengthCutoffB: driverCDLLengthCutoffB,
        useCDLReload: useCDLReload,
        useCDLReturns: useCDLReturns,
        invoiceApportionedRate: invoiceApportionedSurcharge,
        invoiceApportionedCutoff: invoiceApportionedWeightCutoff,
        driverApportionedCutoff: driverApportionedWeightCutoff,
        driverApportionedRate: driverApportionedSurcharge,
        useApportionedReload: useApportionedOnReloads,
        useApportionedReturns: useApportionedOnReturns,
      })
    );
  };
  useEffect(() => {
    surchargesTabFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    invoiceFuelSurchargeGas,
    invoiceFuelSurchargeDiesel,
    invoiceFuelSurchargeGasCanada,
    invoiceFuelSurchargeDieselCanada,
    driverFuelSurchargeGas,
    driverFuelSurchargeDiesel,
    driverFuelSurchargeGasCanada,
    driverFuelSurchargeDieselCanada,
    invoiceCDLSurcharge,
    invoiceCDLSurchargeCanada,
    invoiceCDLGVWRCutoff,
    invoiceCDLLengthCutoff,
    driverCDLSurcharge,
    driverCDLSurchargeCanada,
    driverCDLGVWRCutoff,
    driverCDLLengthCutoff,
    invoiceCDLSurchargeB,
    invoiceCDLSurchargeCanadaB,
    invoiceCDLGVWRCutoffB,
    invoiceCDLLengthCutoffB,
    driverCDLSurchargeB,
    driverCDLSurchargeCanadaB,
    driverCDLGVWRCutoffB,
    driverCDLLengthCutoffB,
    useCDLReload,
    useCDLReturns,
    invoiceApportionedSurcharge,
    invoiceApportionedWeightCutoff,
    driverApportionedWeightCutoff,
    driverApportionedSurcharge,
    useApportionedOnReloads,
    useApportionedOnReturns,
  ]);

  const apportionedCheckBoxDisabled = !(
    invoiceApportionedSurcharge ||
    invoiceApportionedWeightCutoff ||
    driverApportionedSurcharge ||
    driverApportionedWeightCutoff
  );

  const ChargeValidation = /^\d{0,6}(?:\.\d{0,4})?$/;
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
  /*   clear the invoice rates and driver rates fields based on the invoice and driver flags
   */
  useEffect(() => {
    if ((!invoiceRates && !viewDetail) || (!invoiceRates && viewDetail)) {
      dispatch(setInvoiceFuelSurchargeGas(""));
      dispatch(setInvoiceFuelSurchargeDiesel(""));
      dispatch(setInvoiceFuelSurchargeGasCanada(""));
      dispatch(setInvoiceFuelSurchargeDieselCanada(""));
      dispatch(setinvoiceCDLSurcharge(""));
      dispatch(setInvoiceCDLSurchargeCanada(""));
      dispatch(setinvoiceCDLGVWRCutoff(""));
      dispatch(setinvoiceCDLLengthCutoff(""));
      dispatch(setinvoiceCDLSurchargeB(""));
      dispatch(setInvoiceCDLSurchargeCanadaB(""));
      dispatch(setinvoiceCDLGVWRCutoffB(""));
      dispatch(setinvoiceCDLLengthCutoffB(""));
      dispatch(setInvoiceApportionedSurcharge(""));
      dispatch(setInvoiceApportionedWeightCutoff(""));
    }
  }, [invoiceRates, viewDetail]);
  useEffect(() => {
    if ((!driverRates && !viewDetail) || (!driverRates && viewDetail)) {
      dispatch(setDriverFuelSurchargeGas(""));
      dispatch(setDriverFuelSurchargeDiesel(""));
      dispatch(setdriverFuelSurchargeGasCanada(""));
      dispatch(setdriverFuelSurchargeDieselCanada(""));
      dispatch(setDriverCDLSurcharge(""));
      dispatch(setDriverCDLSurchargeCanada(""));
      dispatch(setDriverCDLGVWRCutoff(""));
      dispatch(setDriverCDLLengthCutoff(""));
      dispatch(setDriverCDLSurchargeB(""));
      dispatch(setDriverCDLSurchargeCanadaB(""));
      dispatch(setDriverCDLGVWRCutoffB(""));
      dispatch(setDriverCDLLengthCutoffB(""));
      dispatch(setDriverApportionedSurcharge(""));
      dispatch(setDriverApportionedWeightCutoff(""));
    }
  }, [driverRates, viewDetail]);

  /*******
   * Validation of zero input invoice rates
   * **********/
  useEffect(() => {
    if (
      invoiceRates &&
      (invoiceCDLGVWRCutoff || invoiceCDLLengthCutoff) &&
      (parseFloat(invoiceCDLSurcharge) === 0 || !invoiceCDLSurcharge) &&
      (parseFloat(invoiceCDLSurchargeCanada) === 0 || !invoiceCDLSurchargeCanada)
    ) {
      dispatch(setinvoiceCDLSurcharge(""));
      dispatch(setInvoiceCDLSurchargeCanada(""));
    }
  }, [
    invoiceRates,
    invoiceCDLSurcharge,
    invoiceCDLSurchargeCanada,
    invoiceCDLGVWRCutoff,
    invoiceCDLLengthCutoff,
  ]);

  /*******
   * Validation of zero input driver rates
   *********/
  useEffect(() => {
    if (
      driverRates &&
      (driverCDLGVWRCutoff || driverCDLLengthCutoff) &&
      (parseFloat(driverCDLSurcharge) === 0 || !driverCDLSurcharge) &&
      (parseFloat(driverCDLSurchargeCanada) === 0 || !driverCDLSurchargeCanada)
    ) {
      dispatch(setDriverCDLSurcharge(""));
      dispatch(setDriverCDLSurchargeCanada(""));
    }
  }, [driverRates, driverCDLSurcharge, driverCDLSurchargeCanada, driverCDLGVWRCutoff, driverCDLLengthCutoff]);

  /*****For Tier B Invoice rates */
  /****Used to clear the Tier B driver values *****/
  useEffect(() => {
    if (driverRates && driverCDLGVWRCutoffB === "" && driverCDLLengthCutoffB === "") {
      dispatch(setDriverCDLSurchargeB(""));
      dispatch(setDriverCDLSurchargeCanadaB(""));
    }
  }, [driverRates, driverCDLGVWRCutoffB, driverCDLLengthCutoffB]);

  /****Used to clear the Tier A invoice values *****/
  useEffect(() => {
    if (invoiceRates && invoiceCDLGVWRCutoffB === "" && invoiceCDLLengthCutoffB === "") {
      dispatch(setinvoiceCDLSurchargeB(""));
      dispatch(setInvoiceCDLSurchargeCanadaB(""));
    }
  }, [invoiceRates, invoiceCDLGVWRCutoffB, invoiceCDLLengthCutoffB]);

  /*****
   * Surcharges Tab Validation based on TierA and TierB
   * ****/
  useEffect(() => {
    if (apportionedCheckBoxDisabled) {
      dispatch(setUseApportionedOnReloads(false));
      dispatch(setUseApportionedOnReturns(false));
    }
    if (
      (invoiceCDLGVWRCutoff && invoiceCDLGVWRCutoff < 0) ||
      invoiceCDLGVWRCutoff > 32767 ||
      (invoiceCDLLengthCutoff && invoiceCDLLengthCutoff < 0) ||
      invoiceCDLLengthCutoff > 32767 ||
      (driverCDLGVWRCutoff && driverCDLGVWRCutoff < 0) ||
      driverCDLGVWRCutoff > 32767 ||
      (driverCDLLengthCutoff && driverCDLLengthCutoff < 0) ||
      driverCDLLengthCutoff > 32767 ||
      lastpointer(invoiceFuelSurchargeGas) ||
      lastpointer(invoiceFuelSurchargeDiesel) ||
      lastpointer(invoiceFuelSurchargeGasCanada) ||
      lastpointer(invoiceFuelSurchargeDieselCanada) ||
      lastpointer(driverFuelSurchargeGas) ||
      lastpointer(driverFuelSurchargeDiesel) ||
      lastpointer(driverFuelSurchargeGasCanada) ||
      lastpointer(driverFuelSurchargeDieselCanada) ||
      lastpointer(invoiceCDLSurcharge) ||
      lastpointer(invoiceCDLSurchargeCanada) ||
      lastpointer(driverCDLSurcharge) ||
      lastpointer(driverCDLSurchargeCanada) ||
      (invoiceCDLGVWRCutoffB && invoiceCDLGVWRCutoffB < 0) ||
      invoiceCDLGVWRCutoffB > 32767 ||
      (invoiceCDLLengthCutoffB && invoiceCDLLengthCutoffB < 0) ||
      invoiceCDLLengthCutoffB > 32767 ||
      (driverCDLGVWRCutoffB && driverCDLGVWRCutoffB < 0) ||
      driverCDLGVWRCutoffB > 32767 ||
      (driverCDLLengthCutoffB && driverCDLLengthCutoffB < 0) ||
      driverCDLLengthCutoffB > 32767 ||
      lastpointer(invoiceCDLSurchargeB) ||
      lastpointer(invoiceCDLSurchargeCanadaB) ||
      lastpointer(driverCDLSurchargeB) ||
      lastpointer(driverCDLSurchargeCanadaB) ||
      lastpointer(invoiceApportionedWeightCutoff) ||
      lastpointer(driverApportionedWeightCutoff) ||
      lastpointer(invoiceApportionedSurcharge) ||
      lastpointer(driverApportionedSurcharge) ||
      (driverCDLGVWRCutoffB && parseInt(driverCDLGVWRCutoffB) < parseInt(driverCDLGVWRCutoff)) ||
      (driverCDLLengthCutoffB && parseInt(driverCDLLengthCutoffB) < parseInt(driverCDLLengthCutoff)) ||
      (invoiceCDLGVWRCutoffB && parseInt(invoiceCDLGVWRCutoffB) < parseInt(invoiceCDLGVWRCutoff)) ||
      (invoiceCDLLengthCutoffB && parseInt(invoiceCDLLengthCutoffB) < parseInt(invoiceCDLLengthCutoff)) ||
      areCDLInvoiceRatesNotPresentTierA() ||
      areCDLInvoiceRatesNotPresentTierB() ||
      areCDLDriverRatesNotPresentTierA() ||
      areCDLDriverRatesNotPresentTierB() ||
      (invoiceRates &&
        (invoiceCDLSurcharge || invoiceCDLSurchargeCanada) &&
        areCDLDriverRatesAllPresentTierA() &&
        (!invoiceCDLGVWRCutoff || parseInt(invoiceCDLGVWRCutoff) === 0) &&
        (!invoiceCDLLengthCutoff || parseInt(invoiceCDLLengthCutoff) === 0)) ||
      (invoiceApportionedSurcharge && !invoiceApportionedWeightCutoff) ||
      (driverApportionedSurcharge && !driverApportionedWeightCutoff) ||
      (driverApportionedWeightCutoff &&
        (driverApportionedWeightCutoff < 0 || driverApportionedWeightCutoff > 32767)) ||
      (invoiceApportionedWeightCutoff &&
        (invoiceApportionedWeightCutoff < 0 || invoiceApportionedWeightCutoff > 32767)) ||
      (driverRates &&
        (driverCDLSurcharge || driverCDLSurchargeCanada) &&
        areCDLInvoiceRatesAllPresentTierA() &&
        (!driverCDLGVWRCutoff || parseFloat(driverCDLGVWRCutoff) === 0) &&
        (!driverCDLLengthCutoff || parseFloat(driverCDLLengthCutoff) === 0))
    ) {
      dispatch(setIsSurchargesTabValid(false));
    } else {
      dispatch(setIsSurchargesTabValid(true));
    }
  }, [
    driverRates,
    invoiceRates,
    invoiceFuelSurchargeGas,
    invoiceFuelSurchargeDiesel,
    invoiceFuelSurchargeGasCanada,
    invoiceFuelSurchargeDieselCanada,
    driverFuelSurchargeGas,
    driverFuelSurchargeDiesel,
    driverFuelSurchargeGasCanada,
    driverFuelSurchargeDieselCanada,
    invoiceCDLSurcharge,
    invoiceCDLSurchargeCanada,
    invoiceCDLGVWRCutoff,
    invoiceCDLLengthCutoff,
    driverCDLSurcharge,
    driverCDLSurchargeCanada,
    driverCDLGVWRCutoff,
    driverCDLLengthCutoff,
    invoiceCDLSurchargeB,
    invoiceCDLSurchargeCanadaB,
    invoiceCDLGVWRCutoffB,
    invoiceCDLLengthCutoffB,
    driverCDLSurchargeB,
    driverCDLSurchargeCanadaB,
    driverCDLGVWRCutoffB,
    driverCDLLengthCutoffB,
    invoiceApportionedWeightCutoff,
    invoiceApportionedSurcharge,
    driverApportionedSurcharge,
    driverApportionedWeightCutoff,
  ]);

  /******Used for Validation Purposes in the Surcharges field Tier A*****/

  const areCDLDriverRatesNotPresentTierA = () =>
    ((driverCDLGVWRCutoff && parseFloat(driverCDLGVWRCutoff) !== 0) ||
      (driverCDLLengthCutoff && parseFloat(driverCDLLengthCutoff) !== 0)) &&
    driverRates &&
    !driverCDLSurcharge &&
    !driverCDLSurchargeCanada;

  const areCDLInvoiceRatesNotPresentTierA = () =>
    ((invoiceCDLGVWRCutoff && parseFloat(invoiceCDLGVWRCutoff) !== 0) ||
      (invoiceCDLLengthCutoff && parseFloat(invoiceCDLLengthCutoff) !== 0)) &&
    invoiceRates &&
    !invoiceCDLSurcharge &&
    !invoiceCDLSurchargeCanada;

  const areCDLDriverRatesAllPresentTierA = () =>
    (driverCDLGVWRCutoff || driverCDLLengthCutoff) &&
    driverRates &&
    (driverCDLSurcharge || driverCDLSurchargeCanada);

  const areCDLInvoiceRatesAllPresentTierA = () =>
    (invoiceCDLGVWRCutoff || invoiceCDLLengthCutoff) &&
    invoiceRates &&
    (invoiceCDLSurcharge || invoiceCDLSurchargeCanada);

  /******Used for Validation Purposes in the Surcharges field Tier B*****/
  const areCDLDriverRatesNotPresentTierB = () =>
    ((driverCDLGVWRCutoffB && parseFloat(driverCDLGVWRCutoffB) !== 0) ||
      (driverCDLLengthCutoffB && parseFloat(driverCDLLengthCutoffB) !== 0)) &&
    driverRates &&
    !driverCDLSurchargeB &&
    !driverCDLSurchargeCanadaB;

  const areCDLInvoiceRatesNotPresentTierB = () =>
    ((invoiceCDLGVWRCutoffB && parseFloat(invoiceCDLGVWRCutoffB) !== 0) ||
      (invoiceCDLLengthCutoffB && parseFloat(invoiceCDLLengthCutoffB) !== 0)) &&
    invoiceRates &&
    !invoiceCDLSurchargeB &&
    !invoiceCDLSurchargeCanadaB;

  /********If all fields are empty*****/
  const noValuesPresentInTierA = () =>
    !invoiceCDLSurcharge &&
    !invoiceCDLSurchargeCanada &&
    !invoiceCDLGVWRCutoff &&
    !invoiceCDLLengthCutoff &&
    !driverCDLSurcharge &&
    !driverCDLSurchargeCanada &&
    !driverCDLGVWRCutoff &&
    !driverCDLLengthCutoff;
  return (
    <div className="p-1 w-100">
      <Row className="m-0 p-0">
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Invoice Fuel Surcharge Gas</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              {/* <input hidden/> */}
              <input
                className={`customFormControl ${lastpointer(invoiceFuelSurchargeGas) ? "borderRed" : "borderBlack"}`}
                type="text"
                name="invoiceFuelSurchargeGas"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="invoiceFuelSurchargeGas"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setInvoiceFuelSurchargeGas(isNumber(e.target.value)));
                }}
                value={invoiceFuelSurchargeGas}
                disabled={viewDetail || !invoiceRates}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Invoice Fuel Surcharge Diesel</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${lastpointer(invoiceFuelSurchargeDiesel) ? "borderRed" : "borderBlack"}`}
                type="text"
                name="invoiceFuelSurchargeDiesel"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="invoiceFuelSurchargeDiesel"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setInvoiceFuelSurchargeDiesel(isNumber(e.target.value)));
                }}
                value={invoiceFuelSurchargeDiesel}
                disabled={viewDetail || !invoiceRates}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Invoice Fuel Surcharge Gas Canada</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  lastpointer(invoiceFuelSurchargeGasCanada) ? "borderRed" : "borderBlack"
                }`}
                type="text"
                name="invoiceFuelSurchargeGasCanada"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="invoiceFuelSurchargeGasCanada"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setInvoiceFuelSurchargeGasCanada(isNumber(e.target.value)));
                }}
                value={invoiceFuelSurchargeGasCanada}
                disabled={viewDetail || !invoiceRates}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Invoice Fuel Surcharge Diesel Canada</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  lastpointer(invoiceFuelSurchargeDieselCanada) ? "borderRed" : "borderBlack"
                }`}
                type="text"
                name="invoiceFuelSurchargeDieselCanada"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="invoiceFuelSurchargeDieselCanada"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setInvoiceFuelSurchargeDieselCanada(isNumber(e.target.value)));
                }}
                value={invoiceFuelSurchargeDieselCanada}
                disabled={viewDetail || !invoiceRates}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Driver Fuel Surcharge Gas</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${lastpointer(driverFuelSurchargeGas) ? "borderRed" : "borderBlack"}`}
                type="text"
                name="driverFuelSurchargeGas"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverFuelSurchargeGas"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setDriverFuelSurchargeGas(isNumber(e.target.value)));
                }}
                value={driverFuelSurchargeGas}
                disabled={viewDetail || !driverRates}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Driver Fuel Surcharge Diesel</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${lastpointer(driverFuelSurchargeDiesel) ? "borderRed" : "borderBlack"}`}
                type="text"
                name="driverFuelSurchargeDiesel"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverFuelSurchargeDiesel"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setDriverFuelSurchargeDiesel(isNumber(e.target.value)));
                }}
                value={driverFuelSurchargeDiesel}
                disabled={viewDetail || !driverRates}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Driver Fuel Surcharge Gas Canada</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  lastpointer(driverFuelSurchargeGasCanada) ? "borderRed" : "borderBlack"
                }`}
                type="text"
                name="driverFuelSurchargeGasCanada"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverFuelSurchargeGasCanada"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setdriverFuelSurchargeGasCanada(isNumber(e.target.value)));
                }}
                value={driverFuelSurchargeGasCanada}
                disabled={viewDetail || !driverRates}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Driver Fuel Surcharge Diesel Canada</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  lastpointer(driverFuelSurchargeDieselCanada) ? "borderRed" : "borderBlack"
                }`}
                type="text"
                name="driverFuelSurchargeDieselCanada"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverFuelSurchargeDieselCanada"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setdriverFuelSurchargeDieselCanada(isNumber(e.target.value)));
                }}
                value={driverFuelSurchargeDieselCanada}
                disabled={viewDetail || !driverRates}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Invoice Apportioned Surcharge</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  lastpointer(invoiceApportionedSurcharge) ? "borderRed" : "borderBlack"
                }`}
                type="text"
                name="invoiceApportionedSurcharge"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="invoiceApportionedSurcharge"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setInvoiceApportionedSurcharge(isNumber(e.target.value)));
                }}
                value={invoiceApportionedSurcharge}
                disabled={viewDetail || !invoiceRates}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Invoice Apportioned Weight Cutoff</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? !invoiceApportionedSurcharge &&
                      !(invoiceApportionedWeightCutoff < 0 || invoiceApportionedWeightCutoff > 32767)
                      ? ""
                      : lastpointer(invoiceApportionedWeightCutoff) ||
                          (invoiceApportionedSurcharge && !invoiceApportionedWeightCutoff) ||
                          invoiceApportionedWeightCutoff < 0 ||
                          invoiceApportionedWeightCutoff > 32767
                        ? "borderRed"
                        : "borderGreen"
                    : ""
                }`}
                type="text"
                name="invoiceApportionedWeightCutoff"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="invoiceApportionedWeightCutoff"
                maxLength={5}
                onChange={(e) => {
                  dispatch(setInvoiceApportionedWeightCutoff(isDays(e.target.value)));
                }}
                value={invoiceApportionedWeightCutoff}
                disabled={viewDetail || !invoiceRates}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Driver Apportioned Surcharge</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  lastpointer(driverApportionedSurcharge) ? "borderRed" : "borderBlack"
                }`}
                type="text"
                name="driverApportionedSurcharge"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverApportionedSurcharge"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setDriverApportionedSurcharge(isNumber(e.target.value)));
                }}
                value={driverApportionedSurcharge}
                disabled={viewDetail || !driverRates}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Driver Apportioned Weight Cutoff</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? !driverApportionedSurcharge &&
                      !(driverApportionedWeightCutoff < 0 || driverApportionedWeightCutoff > 32767)
                      ? ""
                      : lastpointer(driverApportionedWeightCutoff) ||
                          (driverApportionedSurcharge && !driverApportionedWeightCutoff) ||
                          driverApportionedWeightCutoff < 0 ||
                          driverApportionedWeightCutoff > 32767
                        ? "borderRed"
                        : "borderGreen"
                    : ""
                }`}
                type="text"
                name="driverApportionedWeightCutoff"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverApportionedWeightCutoff"
                maxLength={5}
                onChange={(e) => {
                  dispatch(setDriverApportionedWeightCutoff(isDays(e.target.value)));
                }}
                value={driverApportionedWeightCutoff}
                disabled={viewDetail || !driverRates}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Use Apportioned On Reloads</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="useApportionedOnReloads"
                checked={useApportionedOnReloads}
                disabled={viewDetail || apportionedCheckBoxDisabled}
                onChange={(e) => {
                  dispatch(setUseApportionedOnReloads(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Use Apportioned on Returns</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="useApportionedOnReturns"
                checked={useApportionedOnReturns}
                disabled={viewDetail || apportionedCheckBoxDisabled}
                onChange={(e) => {
                  dispatch(setUseApportionedOnReturns(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
        </Col>

        <Col sm={6} md={6} xs={6} className="">
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel mt-3">Invoice CDL Surcharge</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px me-5">
              <Form.Label className="customColFormLabel">Tier A</Form.Label>

              <input
                className={`customFormControl ${
                  !viewDetail
                    ? lastpointer(invoiceCDLSurcharge) || areCDLInvoiceRatesNotPresentTierA()
                      ? "borderRed"
                      : ((invoiceCDLGVWRCutoff && parseFloat(invoiceCDLGVWRCutoff) !== 0) ||
                            (invoiceCDLLengthCutoff && parseFloat(invoiceCDLLengthCutoff) !== 0)) &&
                          invoiceCDLSurcharge &&
                          parseFloat(invoiceCDLSurcharge) !== 0
                        ? "borderGreen"
                        : ""
                    : "borderBlack"
                }`}
                type="text"
                name="invoiceCDLSurcharge"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="invoiceCDLSurcharge"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setinvoiceCDLSurcharge(isNumber(e.target.value)));
                }}
                value={invoiceCDLSurcharge}
                disabled={viewDetail || !invoiceRates}
              />
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <Form.Label className="customColFormLabel">Tier B</Form.Label>

              <input
                className={`customFormControl ${
                  !viewDetail
                    ? lastpointer(invoiceCDLSurchargeB) || areCDLInvoiceRatesNotPresentTierB()
                      ? "borderRed"
                      : ((invoiceCDLGVWRCutoffB && parseFloat(invoiceCDLGVWRCutoffB) !== 0) ||
                            (invoiceCDLLengthCutoffB && parseFloat(invoiceCDLLengthCutoffB) !== 0)) &&
                          invoiceCDLSurchargeB &&
                          parseFloat(invoiceCDLSurchargeB) !== 0
                        ? "borderGreen"
                        : ""
                    : "borderBlack"
                }`}
                type="text"
                name="InvoiceCDLSurchargeB"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="InvoiceCDLSurchargeB"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setinvoiceCDLSurchargeB(isNumber(e.target.value)));
                }}
                value={invoiceCDLSurchargeB}
                disabled={
                  viewDetail ||
                  !invoiceRates ||
                  ((invoiceCDLGVWRCutoffB == null || Number(invoiceCDLGVWRCutoffB) === 0) &&
                    (invoiceCDLLengthCutoffB == null || Number(invoiceCDLLengthCutoffB) === 0))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Invoice CDL Surcharge Canada</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px me-5">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? lastpointer(invoiceCDLSurchargeCanada) || areCDLInvoiceRatesNotPresentTierA()
                      ? "borderRed"
                      : ((invoiceCDLGVWRCutoff && parseFloat(invoiceCDLGVWRCutoff) !== 0) ||
                            (invoiceCDLLengthCutoff && parseFloat(invoiceCDLLengthCutoff) !== 0)) &&
                          invoiceCDLSurchargeCanada &&
                          parseFloat(invoiceCDLSurchargeCanada) !== 0
                        ? "borderGreen"
                        : ""
                    : "borderBlack"
                }`}
                type="text"
                name="invoiceCDLSurchargeCanada"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="invoiceCDLSurchargeCanada"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setInvoiceCDLSurchargeCanada(isNumber(e.target.value)));
                }}
                value={invoiceCDLSurchargeCanada}
                disabled={viewDetail || !invoiceRates}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px me-5">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? lastpointer(invoiceCDLSurchargeCanadaB) || areCDLInvoiceRatesNotPresentTierB()
                      ? "borderRed"
                      : ((invoiceCDLGVWRCutoffB && parseFloat(invoiceCDLGVWRCutoffB) !== 0) ||
                            (invoiceCDLLengthCutoffB && parseFloat(invoiceCDLLengthCutoffB) !== 0)) &&
                          invoiceCDLSurchargeCanadaB &&
                          parseFloat(invoiceCDLSurchargeCanadaB) !== 0
                        ? "borderGreen"
                        : ""
                    : "borderBlack"
                }`}
                type="text"
                name="invoiceCDLSurchargeCanadaB"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="invoiceCDLSurchargeCanadaB"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setInvoiceCDLSurchargeCanadaB(isNumber(e.target.value)));
                }}
                value={invoiceCDLSurchargeCanadaB}
                disabled={
                  viewDetail ||
                  !invoiceRates ||
                  ((invoiceCDLGVWRCutoffB == null || Number(invoiceCDLGVWRCutoffB) === 0) &&
                    (invoiceCDLLengthCutoffB == null || Number(invoiceCDLLengthCutoffB) === 0))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Invoice CDL GVWR Cutoff</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px me-5">
              <input
                type="text"
                name="invoiceCDLGVWRCutoff"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="invoiceCDLGVWRCutoff"
                value={invoiceCDLGVWRCutoff}
                maxLength={5}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(setinvoiceCDLGVWRCutoff(isDays(value)));
                  if (!value && !invoiceCDLLengthCutoff) {
                    dispatch(setinvoiceCDLGVWRCutoffB(""));
                    dispatch(setinvoiceCDLLengthCutoffB(""));
                  } else if (!value && invoiceCDLLengthCutoff) {
                    dispatch(setinvoiceCDLGVWRCutoffB(""));
                  }
                }}
                className={`customFormControl ${
                  !viewDetail
                    ? !(invoiceCDLGVWRCutoff >= 0 && invoiceCDLGVWRCutoff <= 32767) ||
                      (invoiceRates &&
                        (invoiceCDLSurcharge || invoiceCDLSurchargeCanada) &&
                        areCDLDriverRatesAllPresentTierA() &&
                        (!invoiceCDLGVWRCutoff || parseFloat(invoiceCDLGVWRCutoff) === 0) &&
                        (!invoiceCDLLengthCutoff || parseFloat(invoiceCDLLengthCutoff) === 0))
                      ? "borderRed"
                      : areCDLDriverRatesAllPresentTierA() &&
                          invoiceCDLGVWRCutoff &&
                          parseFloat(invoiceCDLGVWRCutoff) !== 0
                        ? "borderGreen"
                        : ""
                    : "borderBlack"
                }`}
                disabled={viewDetail || !invoiceRates}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                type="text"
                name="invoiceCDLGVWRCutoffB"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="invoiceCDLGVWRCutoffB"
                value={invoiceCDLGVWRCutoffB}
                maxLength={5}
                onChange={(e) => {
                  dispatch(setinvoiceCDLGVWRCutoffB(isDays(e.target.value)));
                }}
                className={`customFormControl ${
                  !viewDetail
                    ? !(invoiceCDLGVWRCutoffB >= 0 && invoiceCDLGVWRCutoffB <= 32767) ||
                      (invoiceCDLGVWRCutoffB &&
                        parseInt(invoiceCDLGVWRCutoffB) < parseInt(invoiceCDLGVWRCutoff))
                      ? "borderRed"
                      : ""
                    : "borderBlack"
                }`}
                disabled={
                  viewDetail ||
                  !invoiceRates ||
                  invoiceCDLGVWRCutoff == null ||
                  Number(invoiceCDLGVWRCutoff) === 0
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Invoice CDL Length Cutoff</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px me-5">
              <input
                type="text"
                name="invoiceCDLLengthCutoff"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="invoiceCDLLengthCutoff"
                maxLength={5}
                value={invoiceCDLLengthCutoff}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(setinvoiceCDLLengthCutoff(isDays(value)));
                  if (!value) {
                    dispatch(setinvoiceCDLLengthCutoffB(""));
                  }
                }}
                className={`customFormControl ${
                  !viewDetail
                    ? !(invoiceCDLLengthCutoff >= 0 && invoiceCDLLengthCutoff <= 32767) ||
                      (invoiceRates &&
                        (invoiceCDLSurcharge || invoiceCDLSurchargeCanada) &&
                        areCDLDriverRatesAllPresentTierA() &&
                        (!invoiceCDLGVWRCutoff || parseFloat(invoiceCDLGVWRCutoff) === 0) &&
                        (!invoiceCDLLengthCutoff || parseFloat(invoiceCDLLengthCutoff) === 0))
                      ? "borderRed"
                      : areCDLDriverRatesAllPresentTierA() &&
                          invoiceCDLLengthCutoff &&
                          parseFloat(invoiceCDLLengthCutoff) !== 0
                        ? "borderGreen"
                        : ""
                    : "borderBlack"
                }`}
                disabled={viewDetail || !invoiceRates}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                type="text"
                name="invoiceCDLLengthCutoffB"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="invoiceCDLLengthCutoffB"
                maxLength={5}
                value={invoiceCDLLengthCutoffB}
                onChange={(e) => {
                  dispatch(setinvoiceCDLLengthCutoffB(isDays(e.target.value)));
                }}
                className={`customFormControl ${
                  !viewDetail
                    ? !(invoiceCDLLengthCutoffB >= 0 && invoiceCDLLengthCutoffB <= 32767) ||
                      (invoiceCDLLengthCutoffB &&
                        parseInt(invoiceCDLLengthCutoffB) < parseInt(invoiceCDLLengthCutoff))
                      ? "borderRed"
                      : ""
                    : "borderBlack"
                }`}
                disabled={
                  viewDetail ||
                  !invoiceRates ||
                  ((invoiceCDLGVWRCutoff == null || Number(invoiceCDLGVWRCutoff) === 0) &&
                    (invoiceCDLLengthCutoff == null || Number(invoiceCDLLengthCutoff) === 0))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Driver CDL Surcharge</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px me-5">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? lastpointer(driverCDLSurcharge) || areCDLDriverRatesNotPresentTierA()
                      ? "borderRed"
                      : ((driverCDLGVWRCutoff && Number(driverCDLGVWRCutoff) !== 0) ||
                            (driverCDLLengthCutoff && Number(driverCDLLengthCutoff) !== 0)) &&
                          driverCDLSurcharge &&
                          parseFloat(driverCDLSurcharge) !== 0
                        ? "borderGreen"
                        : ""
                    : "borderBlack"
                }`}
                type="text"
                name="driverCDLSurcharge"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverCDLSurcharge"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setDriverCDLSurcharge(isNumber(e.target.value)));
                }}
                value={driverCDLSurcharge}
                disabled={viewDetail || !driverRates}
              />
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? lastpointer(driverCDLSurchargeB) || areCDLDriverRatesNotPresentTierB()
                      ? "borderRed"
                      : ((driverCDLGVWRCutoffB && Number(driverCDLGVWRCutoffB) !== 0) ||
                            (driverCDLLengthCutoffB && Number(driverCDLLengthCutoffB) !== 0)) &&
                          driverCDLSurchargeB &&
                          parseFloat(driverCDLSurchargeB) !== 0
                        ? "borderGreen"
                        : ""
                    : "borderBlack"
                }`}
                type="text"
                name="driverCDLSurchargeB"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverCDLSurchargeB"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setDriverCDLSurchargeB(isNumber(e.target.value)));
                }}
                value={driverCDLSurchargeB}
                disabled={
                  viewDetail ||
                  !driverRates ||
                  ((driverCDLGVWRCutoffB == null || Number(driverCDLGVWRCutoffB) === 0) &&
                    (driverCDLLengthCutoffB == null || Number(driverCDLLengthCutoffB) === 0))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Driver CDL Surcharge Canada</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px me-5">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? lastpointer(driverCDLSurchargeCanada) || areCDLDriverRatesNotPresentTierA()
                      ? "borderRed"
                      : ((driverCDLGVWRCutoff && Number(driverCDLGVWRCutoff) !== 0) ||
                            (driverCDLLengthCutoff && Number(driverCDLLengthCutoff) !== 0)) &&
                          driverCDLSurchargeCanada &&
                          parseFloat(driverCDLSurchargeCanada) !== 0
                        ? "borderGreen"
                        : ""
                    : "borderBlack"
                }`}
                type="text"
                name="driverCDLSurchargeCanada"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverCDLSurchargeCanada"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setDriverCDLSurchargeCanada(isNumber(e.target.value)));
                }}
                value={driverCDLSurchargeCanada}
                disabled={viewDetail || !driverRates}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? lastpointer(driverCDLSurchargeCanadaB) || areCDLDriverRatesNotPresentTierB()
                      ? "borderRed"
                      : ((driverCDLGVWRCutoffB && Number(driverCDLGVWRCutoffB) !== 0) ||
                            (driverCDLLengthCutoffB && Number(driverCDLLengthCutoffB) !== 0)) &&
                          driverCDLSurchargeCanadaB &&
                          parseFloat(driverCDLSurchargeCanadaB) !== 0
                        ? "borderGreen"
                        : ""
                    : "borderBlack"
                }`}
                type="text"
                name="driverCDLSurchargeCanadaB"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverCDLSurchargeCanadaB"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    dispatch(setDriverCDLSurchargeCanadaB(isNumber(e.target.value)));
                }}
                value={driverCDLSurchargeCanadaB}
                disabled={
                  viewDetail ||
                  !driverRates ||
                  ((driverCDLGVWRCutoffB == null || Number(driverCDLGVWRCutoffB) === 0) &&
                    (driverCDLLengthCutoffB == null || Number(driverCDLLengthCutoffB) === 0))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Driver CDL GVWR Cutoff</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px me-5">
              <input
                type="text"
                name="driverCDLGVWRCutoff"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverCDLGVWRCutoff"
                value={driverCDLGVWRCutoff}
                maxLength={5}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(setDriverCDLGVWRCutoff(isDays(value)));
                  if (!value && !driverCDLLengthCutoff) {
                    dispatch(setDriverCDLGVWRCutoffB(""));
                    dispatch(setDriverCDLLengthCutoffB(""));
                  }
                  if (!value && driverCDLLengthCutoff) {
                    dispatch(setDriverCDLGVWRCutoffB(""));
                  }
                }}
                className={`customFormControl ${
                  !viewDetail
                    ? !(driverCDLGVWRCutoff >= 0 && driverCDLGVWRCutoff <= 32767) ||
                      (driverRates &&
                        (driverCDLSurcharge || driverCDLSurchargeCanada) &&
                        areCDLInvoiceRatesAllPresentTierA() &&
                        (!driverCDLGVWRCutoff || parseFloat(driverCDLGVWRCutoff) === 0) &&
                        (!driverCDLLengthCutoff || parseFloat(driverCDLLengthCutoff) === 0))
                      ? "borderRed"
                      : areCDLInvoiceRatesAllPresentTierA() &&
                          driverCDLGVWRCutoff &&
                          parseFloat(driverCDLGVWRCutoff) !== 0
                        ? "borderGreen"
                        : ""
                    : "borderBlack"
                }`}
                disabled={viewDetail || !driverRates}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                type="text"
                name="driverCDLGVWRCutoffB"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverCDLGVWRCutoffB"
                value={driverCDLGVWRCutoffB}
                maxLength={5}
                onChange={(e) => {
                  dispatch(setDriverCDLGVWRCutoffB(isDays(e.target.value)));
                }}
                className={`customFormControl ${
                  !viewDetail
                    ? driverCDLGVWRCutoffB && parseInt(driverCDLGVWRCutoffB) < parseInt(driverCDLGVWRCutoff)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                disabled={
                  viewDetail ||
                  !driverRates ||
                  driverCDLGVWRCutoff == null ||
                  Number(driverCDLGVWRCutoff) === 0
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Driver CDL Length Cutoff</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px me-5">
              <input
                type="text"
                name="driverCDLLengthCutoff"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverCDLLengthCutoff"
                value={driverCDLLengthCutoff}
                maxLength={5}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(setDriverCDLLengthCutoff(isDays(value)));
                  if (!value) {
                    dispatch(setDriverCDLLengthCutoffB(""));
                  }
                }}
                className={`customFormControl ${
                  !viewDetail
                    ? !(driverCDLLengthCutoff >= 0 && driverCDLLengthCutoff <= 32767) ||
                      (driverRates &&
                        (driverCDLSurcharge || driverCDLSurchargeCanada) &&
                        areCDLInvoiceRatesAllPresentTierA() &&
                        (!driverCDLGVWRCutoff || parseFloat(driverCDLGVWRCutoff) === 0) &&
                        (!driverCDLLengthCutoff || parseFloat(driverCDLLengthCutoff) === 0))
                      ? "borderRed"
                      : areCDLInvoiceRatesAllPresentTierA() &&
                          driverCDLLengthCutoff &&
                          parseFloat(driverCDLLengthCutoff) !== 0
                        ? "borderGreen"
                        : ""
                    : "borderBlack"
                }`}
                disabled={viewDetail || !driverRates}
              />
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                type="text"
                name="driverCDLLengthCutoffB"
                autoComplete="newpassword"
                aria-autocomplete="none"
                id="driverCDLLengthCutoffB"
                value={driverCDLLengthCutoffB}
                maxLength={5}
                onChange={(e) => {
                  dispatch(setDriverCDLLengthCutoffB(isDays(e.target.value)));
                }}
                className={`customFormControl ${
                  !viewDetail
                    ? driverCDLLengthCutoffB &&
                      parseInt(driverCDLLengthCutoffB) < parseInt(driverCDLLengthCutoff)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                disabled={
                  viewDetail ||
                  !driverRates ||
                  ((driverCDLGVWRCutoff == null || Number(driverCDLGVWRCutoff) === 0) &&
                    (driverCDLLengthCutoff == null || Number(driverCDLLengthCutoff) === 0))
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Use CDL On Reloads</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="useCDLReload"
                checked={useCDLReload}
                disabled={viewDetail || (!invoiceRates && !driverRates) || noValuesPresentInTierA()}
                onChange={(e) => {
                  dispatch(setUseCDLReload(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="customColFormLabel">Use CDL On Returns</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="useCDLReturns"
                checked={useCDLReturns}
                disabled={viewDetail || (!invoiceRates && !driverRates) || noValuesPresentInTierA()}
                onChange={(e) => {
                  dispatch(setUseCDLReturns(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};
