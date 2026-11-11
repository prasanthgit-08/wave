import { createSlice } from "@reduxjs/toolkit";

const EditMasterExpressInvoiceTabSlice = createSlice({
  name: "EditMasterExpressInvoiceTabSlice",
  initialState: {
    preInvoiced: false,
    invoiceMiles: 0,
    invoicePercentage: 0,
    overInvoicePercentage: 0.0,
    invoiceFlatrate: 0.0,
    flatRateReturn: 0.0,
    invoiceMinimumRate: false,
    fodInvoice: 0.0,
    fodInvoiceAmount: 0.0,
    prepaidAmount: 0.0,
    billTolls: false,
    maximumTolls: 0.0,
    billPermits: false,
    maximumPermits: 0.0,
    billWash: false,
    maximumWash: 0.0,
    baseRate: 0.0,
    returnRate: 0.0,
    fuelSurchargeRate: 0.0,
    cdlRate: 0.0,
    cdlReturn: 0.0,
    invoiceApportionedRate: 0,
    invoiceApportionedReturn: false,
    supplementalRate: 0.0,
    supplementalFuelSurchargeRate: 0.0,
    supplementalRateReturn: false,
    supplementalRateDescription: "",
    lengthRate: 0.0,
    lengthRateReturn: 0.0,
    additionalRate: 0.0,
    additionalFuelSurchargeRate: 0.0,
    additionalRateReturn: 0.0,
    additionalRateDescription: "",
    specialRate: 0.0,
    specialFuelSurchargeRate: 0.0,
    specialRateReturn: 0.0,
    specialRateDescription: "",
    driverRate: 0.0,
    driverFuelSurchargeRate: 0.0,
    driverRateReturn: 0.0,
    driverRateDescription: "",
    invoiceCanadianCharge: 0.0,
    invoiceUsCharge: 0.0,
    invoicePortEscortFee: 0.0,
    invoiceELDFee: 0.0,
    eldFeeDescription: "",
    invoiceTabData: "",
    invoiceAdditionalFlatRate: 0.0,
    amountCalculationData: "",
    triggeringAmountCalculation: 0,
    dispatchPK: null,
    candianPickup: false,
    candianDelivery: false,
    isTowableSingle: false,
  },

  reducers: {
    setPreInvoiced: (state, action) => {
      state.preInvoiced = action.payload;
    },
    setInvoiceTabData: (state, action) => {
      state.invoiceTabData = { ...state.invoiceTabData, ...action.payload };
    },
    setInvoiceMiles: (state, action) => {
      state.invoiceMiles = action.payload;
    },
    setInvoicePercentage: (state, action) => {
      state.invoicePercentage = action.payload;
    },
    setOverInvoicePercentage: (state, action) => {
      state.overInvoicePercentage = action.payload;
    },
    setInvoiceFlatrate: (state, action) => {
      state.invoiceFlatrate = action.payload;
    },
    setFlatRateReturn: (state, action) => {
      state.flatRateReturn = action.payload;
    },
    setInvoiceMinimumRate: (state, action) => {
      state.invoiceMinimumRate = action.payload;
    },
    setFodInvoice: (state, action) => {
      state.fodInvoice = action.payload;
    },
    setFodInvoiceAmount: (state, action) => {
      state.fodInvoiceAmount = action.payload;
    },
    setPrepaidAmount: (state, action) => {
      state.prepaidAmount = action.payload;
    },
    setBillTolls: (state, action) => {
      state.billTolls = action.payload;
    },
    setMaximumTolls: (state, action) => {
      state.maximumTolls = action.payload;
    },
    setBillPermits: (state, action) => {
      state.billPermits = action.payload;
    },
    setMaximumPermits: (state, action) => {
      state.maximumPermits = action.payload;
    },
    setBillWash: (state, action) => {
      state.billWash = action.payload;
    },
    setMaximumWash: (state, action) => {
      state.maximumWash = action.payload;
    },
    setBaseRate: (state, action) => {
      state.baseRate = action.payload;
    },
    setIsTowableSingle: (state, action) => {
      state.isTowableSingle = action.payload;
    },
    setReturnRate: (state, action) => {
      state.returnRate = action.payload;
    },
    setFuelSurchargeRate: (state, action) => {
      state.fuelSurchargeRate = action.payload;
    },
    setCdlRate: (state, action) => {
      state.cdlRate = action.payload;
    },
    setCdlReturn: (state, action) => {
      state.cdlReturn = action.payload;
    },
    setInvoiceApportionedRate: (state, action) => {
      state.invoiceApportionedRate = action.payload;
    },
    setInvoiceApportionedReturn: (state, action) => {
      state.invoiceApportionedReturn = action.payload;
    },
    setSupplementalRate: (state, action) => {
      state.supplementalRate = action.payload;
    },
    setSupplementalFuelSurchargeRate: (state, action) => {
      state.supplementalFuelSurchargeRate = action.payload;
    },
    setSupplementalRateReturn: (state, action) => {
      state.supplementalRateReturn = action.payload;
    },
    setSupplementalRateDescription: (state, action) => {
      state.supplementalRateDescription = action.payload;
    },
    setLengthRate: (state, action) => {
      state.lengthRate = action.payload;
    },
    setLengthRateReturn: (state, action) => {
      state.lengthRateReturn = action.payload;
    },
    setAdditionalRate: (state, action) => {
      state.additionalRate = action.payload;
    },
    setAdditionalFuelSurchargeRate: (state, action) => {
      state.additionalFuelSurchargeRate = action.payload;
    },
    setAdditionalRateReturn: (state, action) => {
      state.additionalRateReturn = action.payload;
    },
    setAdditionalRateDescription: (state, action) => {
      state.additionalRateDescription = action.payload;
    },
    setSpecialRate: (state, action) => {
      state.specialRate = action.payload;
    },
    setSpecialFuelSurchargeRate: (state, action) => {
      state.specialFuelSurchargeRate = action.payload;
    },
    setSpecialRateReturn: (state, action) => {
      state.specialRateReturn = action.payload;
    },
    setSpecialRateDescription: (state, action) => {
      state.specialRateDescription = action.payload;
    },
    setDriverRate: (state, action) => {
      state.driverRate = action.payload;
    },
    setDriverFuelSurchargeRate: (state, action) => {
      state.driverFuelSurchargeRate = action.payload;
    },
    setDriverRateReturn: (state, action) => {
      state.driverRateReturn = action.payload;
    },
    setDriverRateDescription: (state, action) => {
      state.driverRateDescription = action.payload;
    },
    setInvoiceCanadianCharge: (state, action) => {
      state.invoiceCanadianCharge = action.payload;
    },
    setInvoiceUsCharge: (state, action) => {
      state.invoiceUsCharge = action.payload;
    },
    setInvoicePortEscortFee: (state, action) => {
      state.invoicePortEscortFee = action.payload;
    },
    setInvoiceELDFee: (state, action) => {
      state.invoiceELDFee = action.payload;
    },
    setEldFeeDescription: (state, action) => {
      state.eldFeeDescription = action.payload;
    },
    setInvoiceAdditionalFlatRate: (state, action) => {
      state.invoiceAdditionalFlatRate = action.payload;
    },
    setAmountCalculationData: (state, action) => {
      state.amountCalculationData = action.payload;
    },
    setTriggeringAmountCalculation: (state, action) => {
      state.triggeringAmountCalculation = state.triggeringAmountCalculation + 1;
    },
    setCanadianDelivery: (state, action) => {
      state.candianDelivery = action.payload;
    },
    setCanadianPickup: (state, action) => {
      state.candianPickup = action.payload;
    },
  },
});

export const {
  setPreInvoiced,
  setInvoiceMiles,
  setInvoicePercentage,
  setOverInvoicePercentage,
  setInvoiceFlatrate,
  setFlatRateReturn,
  setInvoiceMinimumRate,
  setFodInvoice,
  setFodInvoiceAmount,
  setPrepaidAmount,
  setBillTolls,
  setMaximumTolls,
  setBillPermits,
  setMaximumPermits,
  setBillWash,
  setMaximumWash,
  setBaseRate,
  setReturnRate,
  setFuelSurchargeRate,
  setCdlRate,
  setCdlReturn,
  setSupplementalRate,
  setSupplementalFuelSurchargeRate,
  setSupplementalRateReturn,
  setSupplementalRateDescription,
  setLengthRate,
  setLengthRateReturn,
  setAdditionalRate,
  setAdditionalFuelSurchargeRate,
  setAdditionalRateReturn,
  setAdditionalRateDescription,
  setSpecialRate,
  setSpecialFuelSurchargeRate,
  setSpecialRateReturn,
  setSpecialRateDescription,
  setDriverRate,
  setDriverFuelSurchargeRate,
  setDriverRateReturn,
  setDriverRateDescription,
  setInvoiceCanadianCharge,
  setInvoiceUsCharge,
  setInvoicePortEscortFee,
  setInvoiceELDFee,
  setEldFeeDescription,
  setInvoiceTabData,
  setInvoiceAdditionalFlatRate,
  setAmountCalculationData,
  setTriggeringAmountCalculation,
  setCanadianDelivery,
  setCanadianPickup,
  setIsTowableSingle,
  setInvoiceApportionedRate,
  setInvoiceApportionedReturn,
} = EditMasterExpressInvoiceTabSlice.actions;

export default EditMasterExpressInvoiceTabSlice.reducer;
