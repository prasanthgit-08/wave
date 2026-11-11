import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  driverName: "",
  invoiceDownTimeHours: "0",
  invoiceDownTimeRate: "0.0",
  invoiceDownTimeInvoice: "0.0",
  driversDownTimeHours: "0",
  driversDownTimeRate: "0.0",
  driversDownTimeDriver: "0.0",
  attemptedPickupDriver: "0.0",
  attemptedPickupInvoice: "0.0",
  attemptedPickupAuthorizedBy: "",
  permitsInvoice: "0.0",
  permitsDrivers: "0.0",
  tollsInvoice: "0.0",
  tollsDrivers: "0.0",
  fuelCreditGallons: "0",
  fuelCreditPrice: "0.0",
  fuelCreditDriver: "0.0",
  secondDriverGallons: "0",
  secondDriverPrice: "0.0",
  secondDriverDriver: "0.0",
  invoiceAdditionalMiles: "0",
  invoiceAdditionalRate: "0.0",
  invoiceAdditionalInvoice: "0.0",
  driverAdditionalMiles: "0",
  driverAdditionalRate: "0.0",
  driverAdditionalDriver: "0.0",
  breakdownFeeInvoice: "0.0",
  breakdownFeeDriver: "0.0",
  invoiced: false,
  driverPaid: false,
  viewDetail: false,
  motorized: false,
  invoiceFlatrated: false,
  driverFlatrated: false,
  isValid: false,
  unitFK: null,
  dispatchFK: null,
  data: null,
  breakdownFK: null,
  validEntry: false,
};

const DelayUnitExpenseSlice = createSlice({
  name: "delayUnitExpenseSlice",
  initialState,
  reducers: {
    setDriverName: (state, action) => {
      state.driverName = action.payload;
    },
    setInvoiceDownTimeHours: (state, action) => {
      state.invoiceDownTimeHours = action.payload;
    },
    setInvoiceDownTimeRate: (state, action) => {
      state.invoiceDownTimeRate = action.payload;
    },
    setInvoiceDownTimeInvoice: (state, action) => {
      state.invoiceDownTimeInvoice = action.payload;
    },
    setDriversDownTimeHours: (state, action) => {
      state.driversDownTimeHours = action.payload;
    },
    setDriversDownTimeRate: (state, action) => {
      state.driversDownTimeRate = action.payload;
    },
    setDriversDownTimeDriver: (state, action) => {
      state.driversDownTimeDriver = action.payload;
    },
    setAttemptedPickupDriver: (state, action) => {
      state.attemptedPickupDriver = action.payload;
    },
    setAttemptedPickupInvoice: (state, action) => {
      state.attemptedPickupInvoice = action.payload;
    },
    setAttemptedPickupAuthorizedBy: (state, action) => {
      state.attemptedPickupAuthorizedBy = action.payload;
    },
    setPermitsInvoice: (state, action) => {
      state.permitsInvoice = action.payload;
    },
    setPermitsDrivers: (state, action) => {
      state.permitsDrivers = action.payload;
    },
    setTollsInvoice: (state, action) => {
      state.tollsInvoice = action.payload;
    },
    setTollsDrivers: (state, action) => {
      state.tollsDrivers = action.payload;
    },
    setFuelCreditGallons: (state, action) => {
      state.fuelCreditGallons = action.payload;
    },
    setFuelCreditPrice: (state, action) => {
      state.fuelCreditPrice = action.payload;
    },
    setFuelCreditDriver: (state, action) => {
      state.fuelCreditDriver = action.payload;
    },
    setSecondDriverGallons: (state, action) => {
      state.secondDriverGallons = action.payload;
    },
    setSecondDriverPrice: (state, action) => {
      state.secondDriverPrice = action.payload;
    },
    setSecondDriverDriver: (state, action) => {
      state.secondDriverDriver = action.payload;
    },
    setInvoiceAdditionalMiles: (state, action) => {
      state.invoiceAdditionalMiles = action.payload;
    },
    setInvoiceAdditionalRate: (state, action) => {
      state.invoiceAdditionalRate = action.payload;
    },
    setInvoiceAdditionalInvoice: (state, action) => {
      state.invoiceAdditionalInvoice = action.payload;
    },
    setDriverAdditionalMiles: (state, action) => {
      state.driverAdditionalMiles = action.payload;
    },
    setDriverAdditionalRate: (state, action) => {
      state.driverAdditionalRate = action.payload;
    },
    setDriverAdditionalDriver: (state, action) => {
      state.driverAdditionalDriver = action.payload;
    },
    setBreakdownFeeInvoice: (state, action) => {
      state.breakdownFeeInvoice = action.payload;
    },
    setBreakdownFeeDriver: (state, action) => {
      state.breakdownFeeDriver = action.payload;
    },
    setInvoiced: (state, action) => {
      state.invoiced = action.payload;
    },
    setDriverPaid: (state, action) => {
      state.driverPaid = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setMotorized: (state, action) => {
      state.motorized = action.payload;
    },
    setInvoiceFlatrated: (state, action) => {
      state.invoiceFlatrated = action.payload;
    },
    setDriverFlatrated: (state, action) => {
      state.driverFlatrated = action.payload;
    },
    setDelayedUnitId: (state, action) => {
      state.delayedUnitId = action.payload;
    },
    setDelayedUnitExpsnseId: (state, action) => {
      state.delayedUnitExpsnseId = action.payload;
    },
    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },
    setIsValid: (state, action) => {
      state.isValid = action.payload;
    },
    setUnitFK: (state, action) => {
      state.unitFK = action.payload;
    },
    setDispatchFK: (state, action) => {
      state.dispatchFK = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setBreakdownFK: (state, action) => {
      state.breakdownFK = action.payload;
    },
    setValidEntry: (state, action) => {
      state.validEntry = action.payload;
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setDriverName,
  setInvoiceDownTimeHours,
  setInvoiceDownTimeRate,
  setInvoiceDownTimeInvoice,
  setDriversDownTimeHours,
  setDriversDownTimeRate,
  setDriversDownTimeDriver,
  setAttemptedPickupDriver,
  setAttemptedPickupInvoice,
  setAttemptedPickupAuthorizedBy,
  setPermitsInvoice,
  setPermitsDrivers,
  setTollsInvoice,
  setTollsDrivers,
  setFuelCreditGallons,
  setFuelCreditPrice,
  setFuelCreditDriver,
  setSecondDriverGallons,
  setSecondDriverPrice,
  setSecondDriverDriver,
  setInvoiceAdditionalMiles,
  setInvoiceAdditionalRate,
  setInvoiceAdditionalInvoice,
  setDriverAdditionalMiles,
  setDriverAdditionalRate,
  setDriverAdditionalDriver,
  setBreakdownFeeInvoice,
  setBreakdownFeeDriver,
  setInvoiced,
  setDriverPaid,
  setDelayedUnitExpsnseId,
  setDelayedUnitId,
  setDriverFK,
  setDriverFlatrated,
  setInvoiceFlatrated,
  setMotorized,
  setViewDetail,
  setDispatchFK,
  setUnitFK,
  setIsValid,
  setData,
  setBreakdownFK,
  setValidEntry,
  resetState,
} = DelayUnitExpenseSlice.actions;
export default DelayUnitExpenseSlice;
