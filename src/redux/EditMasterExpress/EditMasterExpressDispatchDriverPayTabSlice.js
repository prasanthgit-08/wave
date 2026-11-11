import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  miles: 0,
  payMiles: 0,
  flatRate: 0,
  flatRated: false,
  baseRate: 0,
  fuelSurcharge: 0,
  fuelSurchargeRate: 0,
  cDLARate: 0,
  apportionedRate: 0,
  supplementalRate: 0,
  supplementalFuelSurchargeRate: 0,
  supplementalDescription: "",
  lengthRate: 0,
  additionalRate: 0,
  additionalFuelSurchargeRate: 0,
  additionalFlatRate: 0,
  additionalFlatRateDescription: "",
  additionalDescription: "",
  specialRate: 0,
  specialFuelSurchargeRate: 0,
  specialDescription: "",
  driverRate: 0,
  driverFuelSurchargeRate: 0,
  driverDescription: "",
  halfTonAdjustmentRate: 0,
  longUnitRateDescription: "",
  longUnitRate: 0,
  safetyRate: 0,
  bonusPoolRate: 0,
  subTotal: 0,
  subTotalFuelSurcharge: 0,
  fuelSurchrage: 0,
  totalRate: 0,
  pickupPulloutFee: 0,
  additionalPulloutFee: 0,
  noPickupPulloutFee: false,
  deliveryPulloutFee: 0,
  noDeliveryPulloutFee: false,
  grossPay: 0,
  uSCharge: 0,
  canadianCharge: 0,
  bondFee: 0,
  netPay: 0,
  payBalance: 0,
  driverFK: null,

  driverELDFee: 0,
  deliveryBonus: false,
  driverDeliveryBonus: 0,
  invoiceDeliveryBonus: 0,
  deliveryBonusDescription: "",
  deliveryBonusDeliverByDate: null,
  deliveryBonusDeliverByDateValid: false,
  driverPayTabData: {},
  candianDelivery: false,
};
const EditMasterExpressDispatchDriverPayTabSlice = createSlice({
  name: "EditMasterExpressDispatchDriverPayTabSlice",
  initialState,
  reducers: {
    updateField: (state, { payload }) => {
      const { field, value } = payload;
      if (field in state) {
        state[field] = value;
      }
    },
    resetFields: (state) => {
      Object.assign(state, initialState);
    },
    updateMultipleFields: (state, action) => {
      const fieldsToUpdate = action.payload;
      Object.entries(fieldsToUpdate).forEach(([field, value]) => {
        if (field in state) {
          state[field] = value;
        }
      });
    },
    updateDriverPayTabData: (state, { payload }) => {
      state.driverPayTabData = { ...state.driverPayTabData, ...payload };
    },
  },
});

export const { updateField, updateMultipleFields, resetFields, updateDriverPayTabData } =
  EditMasterExpressDispatchDriverPayTabSlice.actions;

export default EditMasterExpressDispatchDriverPayTabSlice;
