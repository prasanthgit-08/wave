import { createSlice } from "@reduxjs/toolkit";

const EditMasterExpressDriverTabSlice = createSlice({
  name: "EditMasterExpressDriverTabSlice",
  initialState: {
    driverMiles: 0,
    driverMilesBalance: 0,
    driverFlatRate: 0,
    driverFlatRateBalance: 0,
    driverReturnFlatRate: 0,
    driverReturnFlatRateBalance: 0,
    driverMinimumRate: 0,
    payTolls: false,
    fodTolls: false,
    payPermits: false,
    fodPermits: false,
    payWash: false,
    baseRate: 0,
    returnRates: false,
    driverFuelSurchargeRate: 0,
    driverCDLARate: 0,
    driverCDLAReturn: false,
    driverApportionedRate: 0,
    driverApportionedReturn: false,
    driverSupplementalRate: 0,
    driverSupplementalFuelSurchargeRate: 0,
    driverSupplementalReturn: false,
    driverSupplementalDescription: "",
    driverLengthRate: 0,
    driverLengthReturn: false,
    driverAdditionalRate: 0,
    driverAdditionalFuelSurchargeRate: 0,
    driverAdditionalFlatRate: 0,
    driverAdditionalReturn: false,
    driverAdditionalDescription: "",
    driverSpecialRate: 0,
    driverSpecialFuelSurchargeRate: 0,
    driverSpecialReturn: false,
    driverSpecialDescription: "",
    halfTonAdjustmentRate: 0,
    driverBonusRate: 0,
    driverPickupPulloutFee: 0,
    driverAdditionalPulloutFee: 0,
    noPickupPulloutFee: false,
    driverDeliveryPulloutFee: 0,
    noDeliveryPulloutFee: false,
    driverUSCharge: 0,
    driverCanadianCharge: 0,

    driverELDFee: 0,
    eldFeeDescription: "",
    driverTabData: "",
    driverAmountCalculationData: "",
  },
  reducers: {
    setDriverMiles: (state, action) => {
      state.driverMiles = action.payload;
    },
    setDriverMilesBalance: (state, action) => {
      state.driverMilesBalance = action.payload;
    },
    setDriverFlatRate: (state, action) => {
      state.driverFlatRate = action.payload;
    },
    setDriverFlatRateBalance: (state, action) => {
      state.driverFlatRateBalance = action.payload;
    },
    setDriverReturnFlatRate: (state, action) => {
      state.driverReturnFlatRate = action.payload;
    },
    setDriverReturnFlatRateBalance: (state, action) => {
      state.driverReturnFlatRateBalance = action.payload;
    },
    setDriverMinimumRate: (state, action) => {
      state.driverMinimumRate = action.payload;
    },
    setPayTolls: (state, action) => {
      state.payTolls = action.payload;
    },
    setFodTolls: (state, action) => {
      state.fodTolls = action.payload;
    },
    setPayPermits: (state, action) => {
      state.payPermits = action.payload;
    },
    setFodPermits: (state, action) => {
      state.fodPermits = action.payload;
    },
    setPayWash: (state, action) => {
      state.payWash = action.payload;
    },
    setBaseRate: (state, action) => {
      state.baseRate = action.payload;
    },
    setReturnRates: (state, action) => {
      state.returnRates = action.payload;
    },
    setDriverFuelSurchargeRate: (state, action) => {
      state.driverFuelSurchargeRate = action.payload;
    },
    setDriverCDLARate: (state, action) => {
      state.driverCDLARate = action.payload;
    },
    setDriverCDLAReturn: (state, action) => {
      state.driverCDLAReturn = action.payload;
    },
    setDriverApportionedRate: (state, action) => {
      state.driverApportionedRate = action.payload;
    },
    setDriverApportionedReturn: (state, action) => {
      state.driverApportionedReturn = action.payload;
    },
    setDriverSupplementalRate: (state, action) => {
      state.driverSupplementalRate = action.payload;
    },
    setDriverSupplementalFuelSurchargeRate: (state, action) => {
      state.driverSupplementalFuelSurchargeRate = action.payload;
    },
    setDriverSupplementalReturn: (state, action) => {
      state.driverSupplementalReturn = action.payload;
    },
    setDriverSupplementalDescription: (state, action) => {
      state.driverSupplementalDescription = action.payload;
    },
    setDriverLengthRate: (state, action) => {
      state.driverLengthRate = action.payload;
    },
    setDriverLengthReturn: (state, action) => {
      state.driverLengthReturn = action.payload;
    },
    setDriverAdditionalRate: (state, action) => {
      state.driverAdditionalRate = action.payload;
    },
    setDriverAdditionalFuelSurchargeRate: (state, action) => {
      state.driverAdditionalFuelSurchargeRate = action.payload;
    },
    setDriverAdditionalFlatRate: (state, action) => {
      state.driverAdditionalFlatRate = action.payload;
    },
    setDriverAdditionalReturn: (state, action) => {
      state.driverAdditionalReturn = action.payload;
    },
    setDriverAdditionalDescription: (state, action) => {
      state.driverAdditionalDescription = action.payload;
    },
    setDriverSpecialRate: (state, action) => {
      state.driverSpecialRate = action.payload;
    },
    setDriverSpecialFuelSurchargeRate: (state, action) => {
      state.driverSpecialFuelSurchargeRate = action.payload;
    },
    setDriverSpecialReturn: (state, action) => {
      state.driverSpecialReturn = action.payload;
    },
    setDriverSpecialDescription: (state, action) => {
      state.driverSpecialDescription = action.payload;
    },
    setHalfTonAdjustmentRate: (state, action) => {
      state.halfTonAdjustmentRate = action.payload;
    },
    setDriverBonusRate: (state, action) => {
      state.driverBonusRate = action.payload;
    },
    setDriverPickupPulloutFee: (state, action) => {
      state.driverPickupPulloutFee = action.payload;
    },
    setDriverAdditionalPulloutFee: (state, action) => {
      state.driverAdditionalPulloutFee = action.payload;
    },
    setNoPickupPulloutFee: (state, action) => {
      state.noPickupPulloutFee = action.payload;
    },
    setDriverDeliveryPulloutFee: (state, action) => {
      state.driverDeliveryPulloutFee = action.payload;
    },
    setNoDeliveryPulloutFee: (state, action) => {
      state.noDeliveryPulloutFee = action.payload;
    },
    setDriverUSCharge: (state, action) => {
      state.driverUSCharge = action.payload;
    },
    setDriverELDFee: (state, action) => {
      state.driverELDFee = action.payload;
    },
    setEldFeeDescription: (state, action) => {
      state.eldFeeDescription = action.payload;
    },
    setDriverCanadianCharge: (state, action) => {
      state.driverCanadianCharge = action.payload;
    },
    setDriverTabData: (state, action) => {
      state.driverTabData = { ...state.driverTabData, ...action.payload };
    },
    setDriverAmountCalculationData: (state, action) => {
      state.driverAmountCalculationData = action.payload;
    },
  },
});

export const {
  setDriverMiles,
  setDriverMilesBalance,
  setDriverFlatRate,
  setDriverFlatRateBalance,
  setDriverReturnFlatRate,
  setDriverReturnFlatRateBalance,
  setDriverMinimumRate,
  setPayTolls,
  setFodTolls,
  setPayPermits,
  setFodPermits,
  setPayWash,
  setBaseRate,
  setReturnRates,
  setDriverFuelSurchargeRate,
  setDriverCDLARate,
  setDriverCDLAReturn,
  setDriverSupplementalRate,
  setDriverSupplementalFuelSurchargeRate,
  setDriverSupplementalReturn,
  setDriverSupplementalDescription,
  setDriverLengthRate,
  setDriverLengthReturn,
  setDriverAdditionalRate,
  setDriverAdditionalFuelSurchargeRate,
  setDriverAdditionalFlatRate,
  setDriverAdditionalReturn,
  setDriverAdditionalDescription,
  setDriverSpecialRate,
  setDriverSpecialFuelSurchargeRate,
  setDriverSpecialReturn,
  setDriverSpecialDescription,
  setHalfTonAdjustmentRate,
  setDriverBonusRate,
  setDriverPickupPulloutFee,
  setDriverAdditionalPulloutFee,
  setNoPickupPulloutFee,
  setDriverDeliveryPulloutFee,
  setNoDeliveryPulloutFee,
  setDriverUSCharge,
  setDriverELDFee,
  setEldFeeDescription,
  setDriverCanadianCharge,
  setDriverTabData,
  setDriverAmountCalculationData,
  setDriverApportionedRate,
  setDriverApportionedReturn,
} = EditMasterExpressDriverTabSlice.actions;

export default EditMasterExpressDriverTabSlice.reducer;
