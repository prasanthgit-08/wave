import { createSlice } from "@reduxjs/toolkit";

const EditCustomerDealerSlice = createSlice({
  name: "editcustomerDealers",
  initialState: {
    changeColor: false,
    selectionGroup: "",
    editDetails: false,
    newFlag: false,
    customerDealer: null,
    customerDealerData: "",
    isCanadian: false,
    customerDealerId: "",
    activeTab: "general",
    validGeneralTab: false,
    validFlatratesTab: false,
    validPOETab: false,
    askTolls: false,
    askPermit: false,
    askWash: false,
    freezePOE: false,
    showCommision: false,
    broker: null,
    selectionId: "",
    selectionName: "",
    dealerId: "",
    dealerName: "",
    dealerCity: "",
    customerStoreCode: "",
    dealerStateCode: "",
    customerCity: "",
    customerStateCode: "",
    dstCity: "",
    dstStateCode: "",
    dpuCustomer: false,
    dpuCustomerId: "",
  },
  reducers: {
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setSelectionGroup: (state, action) => {
      state.selectionGroup = action.payload;
    },
    setCustomerDealerId: (state, action) => {
      state.customerDealerId = action.payload;
    },
    setSelectionId: (state, action) => {
      state.selectionId = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSelectionName: (state, action) => {
      state.selectionName = action.payload;
    },
    setIsCanadian: (state, action) => {
      state.isCanadian = action.payload;
    },
    setCustomerDealer: (state, { payload }) => {
      state.customerDealer = { ...state.customerDealer, ...payload };
    },
    setCustomerDealerData: (state, { payload }) => {
      state.customerDealerData = { payload };
    },
    setValidFlatratesTab: (state, { payload }) => {
      state.validFlatratesTab = payload;
    },
    setValidGeneralTab: (state, { payload }) => {
      state.validGeneralTab = payload;
    },
    setValidPOETab: (state, { payload }) => {
      state.validPOETab = payload;
    },
    setEditDetails: (state, action) => {
      state.editDetails = action.payload;
    },
    setNewFlag: (state, action) => {
      state.newFlag = action.payload;
    },
    setAskPermits: (state, action) => {
      state.askPermit = action.payload;
    },
    setAskTolls: (state, action) => {
      state.askTolls = action.payload;
    },
    setAskWash: (state, action) => {
      state.askWash = action.payload;
    },
    setShowCommission: (state, action) => {
      state.showCommision = action.payload;
    },
    setDealerId(state, action) {
      state.dealerId = action.payload;
    },
    setDealerName(state, action) {
      state.dealerName = action.payload;
    },
    setBroker(state, action) {
      state.broker = action.payload;
    },

    setBrokerName: (state, action) => {
      state.brokername = action.payload;
    },
    setBrokerId: (state, action) => {
      state.brokerId = action.payload;
    },
    setFreezePOE: (state, action) => {
      state.freezePOE = action.payload;
    },
    setDealerStateCode: (state, action) => {
      state.dealerStateCode = action.payload;
    },
    setDealerCity: (state, action) => {
      state.dealerCity = action.payload;
    },
    setCustomerStoreCode: (state, action) => {
      state.customerStoreCode = action.payload;
    },
    setCustomerStateCode: (state, action) => {
      state.customerStateCode = action.payload;
    },
    setCustomerCity: (state, action) => {
      state.customerCity = action.payload;
    },
    setDstCity: (state, action) => {
      state.dstCity = action.payload;
    },
    setDstStateCode: (state, action) => {
      state.dstStateCode = action.payload;
    },
    setDpuCustomer: (state, action) => {
      state.dpuCustomer = action.payload;
    },
    setDpuCustomerId: (state, action) => {
      state.dpuCustomerId = action.payload;
    },
    setData: (state, { payload }) => {
      state.customerDealerData = payload;
      state.customerDealerId = payload.customerDealerPK;
    },
    resetData: (state, action) => {
      state.customerDealerData = [];
      state.customerDealer = null;
    },
  },
});
export const {
  setChangeColor,
  setSelectionGroup,
  setDealerId,
  setNewFlag,
  setIsCanadian,
  setEditDetails,
  setDealerName,
  setSelectionId,
  setSelectionName,
  setActiveTab,
  setValidFlatratesTab,
  setValidGeneralTab,
  setValidPOETab,
  setBroker,
  setAskPermits,
  setAskTolls,
  setAskWash,
  setShowCommission,
  setDriverDeliveryInstruction,
  setDriverPickupInstruction,
  setBrokerId,
  setBrokerName,
  setFreezePOE,
  setData,
  setCustomerDealer,
  setCustomerDealerData,
  setDealerCity,
  setCustomerStoreCode,
  setDealerStateCode,
  setCustomerCity,
  setCustomerStateCode,
  setDstCity,
  setDstStateCode,
  setDpuCustomer,
  resetData,
  setDpuCustomerId,
  setMaxDriverWash,
  setCustomerDealerId,
} = EditCustomerDealerSlice.actions;

export const customerDealers = (state) => state.editcustomerDealers.value;

export default EditCustomerDealerSlice.reducer;
