import { createSlice } from "@reduxjs/toolkit";

const EditDealerSlice = createSlice({
  name: "editDealer",
  initialState: {
    dealer: null,
    completeDealer: null,
    dealerData: null,
    viewDetail: null,
    dealerName: "",
    dealerAddress: "",
    dealerCity: "",
    dealerStatecode: "",
    dealerCanadian: false,
    dealerPostcode: "",
    dealerPhone: "",
    dealerTollPhone: "",
    dealerFax: "",
    dealerLogin: "",
    dealerPassword: "",
    beginDate: "",
    endDate: "",
    deliveryPhone: "",
    pickPhone: "",
    gmPhone: "",
    gmEmail: "",
    smPhone: "",
    smEmail: "",
    servicePhone: "",
    serviceEmail: "",
    rdPhone: "",
    rdEmail: "",
    tabIsValid: true,
    isPickUpTabVaild: true,
    isResourcesTabVaild: true,
    isSettingsTabVaild: true,
    isBolTextTabVaild: true,
    isDeliveryTabVaild: true,
    postalCodeOnChange: false,
    zipPostLenght: null,
    cityLength: null,
    contactOnDelivery: "",
    //for lookup broker
    brokerSelection: false,
    brokerInput: "",
    brokerId: null,
    //for customer lookup
    customerSelection: false,
    customerInput: "",
    customerId: null,
    //for dealer group
    dealerGroupSelection: false,
    dealerGroupInput: "",
    dealerGroupId: null,
    //for master dealer group
    masterDealerGroupSelection: false,
    masterDealerGroupInput: "",
    masterDealerGroupId: null,
    onCancel: false,
    //For loading
    isDealerLoading: false,
    dealerPostalCodePK: null,
    bolAtDispatchOrFaxBolAtOrderEntry: false,
    lastOrderDate: "",
    closeBeginDateValid: true,
    closeEndDateValid: true,
    lastOrder: null,
    totalUnits: null,
    ytdUnits: null,

    faxBolAtOrderEntry: false,
    faxBolAtDispatch: false,
    fetchLoad: false,
    smExtn: "",
    gmExtn: "",
    salesExtn: "",
    deliveryExtn: "",
    activateLoader: false,
    deActivateLoader: false,
    deleteDealerLoader: false,
  },

  reducers: {
    setDealer: (state, action) => {
      let payload = action.payload;
      state.dealer = { ...state.dealer, ...payload };
    },

    setBrokerSelection: (state, action) => {
      state.brokerSelection = action.payload;
    },
    setBrokerInput: (state, action) => {
      state.brokerInput = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setCustomerSelection: (state, action) => {
      state.customerSelection = action.payload;
    },
    setCustomerInput: (state, action) => {
      state.customerInput = action.payload;
    },
    setDealerGroupId: (state, action) => {
      state.dealerGroupId = action.payload;
    },
    setDealerGroupSelection: (state, action) => {
      state.dealerGroupSelection = action.payload;
    },
    setDealerGroupInput: (state, action) => {
      state.dealerGroupInput = action.payload;
    },
    setMasterDealerGroupId: (state, action) => {
      state.masterDealerGroupId = action.payload;
    },
    setMasterDealerGroupSelection: (state, action) => {
      state.masterDealerGroupSelection = action.payload;
    },
    setMasterDealerGroupInput: (state, action) => {
      state.masterDealerGroupInput = action.payload;
    },
    setBrokerId: (state, action) => {
      state.brokerId = action.payload;
    },
    setCompeleteDealer: (state, action) => {
      state.completeDealer = action.payload;
    },

    setEditDealer: (state, action) => {
      state.dealerData = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },

    setDealerName: (state, action) => {
      state.dealerName = action.payload;
    },

    setDealerAddress: (state, action) => {
      state.dealerAddress = action.payload;
    },
    setPostalCodeOnChange: (state, action) => {
      state.postalCodeOnChange = action.payload;
    },
    setDealerCity: (state, action) => {
      state.dealerCity = action.payload;
    },
    setDealerStatecode: (state, action) => {
      state.dealerStatecode = action.payload;
    },
    setDealerCanedian: (state, action) => {
      state.dealerCanadian = action.payload;
    },
    setDealerPostcode: (state, action) => {
      state.dealerPostcode = action.payload;
    },
    setDealerPhone: (state, action) => {
      state.dealerPhone = action.payload;
    },
    setDealerTollPhone: (state, action) => {
      state.dealerTollPhone = action.payload;
    },
    setDealerFax: (state, action) => {
      state.dealerFax = action.payload;
    },
    setDealerLogin: (state, action) => {
      state.dealerLogin = action.payload;
    },
    setDealerPassword: (state, action) => {
      state.dealerPassword = action.payload;
    },
    setBeginDate: (state, action) => {
      state.beginDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setDeliveryPhone: (state, action) => {
      state.deliveryPhone = action.payload;
    },
    setContactOnDelivery: (state, action) => {
      state.contactOnDelivery = action.payload;
    },
    setPickPhone: (state, action) => {
      state.pickPhone = action.payload;
    },
    setGmPhone: (state, action) => {
      state.gmPhone = action.payload;
    },
    setGmEmail: (state, action) => {
      state.gmEmail = action.payload;
    },
    setSmPhone: (state, action) => {
      state.smPhone = action.payload;
    },
    setSmEmail: (state, action) => {
      state.smEmail = action.payload;
    },
    setServicePhone: (state, action) => {
      state.servicePhone = action.payload;
    },
    setServiceEmail: (state, action) => {
      state.serviceEmail = action.payload;
    },
    setRdPhone: (state, action) => {
      state.rdPhone = action.payload;
    },
    setRdEmail: (state, action) => {
      state.rdEmail = action.payload;
    },

    setTabValid: (state, action) => {
      state.tabIsValid = action.payload;
    },

    setFormIsValid: (state, action) => {
      state.formIsValid = action.payload;
    },

    setPickupTabIsValid: (state, action) => {
      state.isPickUpTabVaild = action.payload;
    },

    setResourcesTabIsValid: (state, action) => {
      state.isResourcesTabVaild = action.payload;
    },
    setDeliveryTabIsValid: (state, action) => {
      state.isDeliveryTabVaild = action.payload;
    },

    setSettingsTabIsValid: (state, action) => {
      state.isSettingsTabVaild = action.payload;
    },

    setBolTextTabIsValid: (state, action) => {
      state.isBolTextTabVaild = action.payload;
    },
    setDealerCityLength: (state, action) => {
      state.cityLength = action.payload;
    },
    setDealerZipPostLenght: (state, action) => {
      state.zipPostLenght = action.payload;
    },

    setContactOnDelivry: (state, action) => {
      state.contactOnDelivery = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    //for loading
    setIsDealerLoading: (state, action) => {
      state.isDealerLoading = action.payload;
    },
    setActivateLoader: (state, action) => {
      state.activateLoader = action.payload;
    },
    setDeActivateLoader: (state, action) => {
      state.deActivateLoader = action.payload;
    },
    setDealerPostalCodePK: (state, action) => {
      state.dealerPostalCodePK = action.payload;
    },
    setDeleteDealerLoader: (state, action) => {
      state.deleteDealerLoader = action.payload;
    },
    resetChangesforAutoCompletes: (state, action) => {
      state.brokerInput = "";
      state.brokerId = null;
      state.customerInput = "";
      state.customerId = null;
      state.dealerGroupId = null;
      state.dealerGroupInput = "";
      state.masterDealerGroupId = null;
      state.masterDealerGroupInput = "";
    },

    setBolAtDispatchOrFaxBolAtOrderEntry: (state, action) => {
      state.bolAtDispatchOrFaxBolAtOrderEntry = action.payload;
    },
    setLastOrderDate: (state, action) => {
      state.lastOrderDate = action.payload;
    },
    setCloseBeginDateValid: (state, action) => {
      state.closeBeginDateValid = action.payload;
    },
    setCloseEndDateValid: (state, action) => {
      state.closeEndDateValid = action.payload;
    },
    setLastOrder: (state, action) => {
      state.lastOrder = action.payload;
    },
    setTotalUnits: (state, action) => {
      state.totalUnits = action.payload;
    },
    setYtdUnits: (state, action) => {
      state.ytdUnits = action.payload;
    },
    setFaxBolAtOrderEntry: (state, action) => {
      state.faxBolAtOrderEntry = action.payload;
    },
    setFaxBolAtDispatch: (state, action) => {
      state.faxBolAtDispatch = action.payload;
    },

    setFetchLoad: (state, action) => {
      state.fetchLoad = action.payload;
    },
    setSmExtn: (state, action) => {
      state.smExtn = action.payload;
    },
    setGmExtn: (state, action) => {
      state.gmExtn = action.payload;
    },
    setSalesExtn: (state, action) => {
      state.salesExtn = action.payload;
    },
    setDeliveryExtn: (state, action) => {
      state.deliveryExtn = action.payload;
    },
  },
});

export const {
  setDealer,
  setCompeleteDealer,
  setEditDealer,
  setViewDetail,
  setDealerName,
  setDealerAddress,
  setDealerCity,
  setDealerStatecode,
  setDealerCanedian,
  setDealerPostcode,
  setDealerPhone,
  setDealerTollPhone,
  setDealerFax,
  setDealerLogin,
  setDealerPassword,
  setBeginDate,
  setEndDate,
  setDeliveryPhone,
  setPickPhone,
  setGmPhone,
  setGmEmail,
  setSmPhone,
  setSmEmail,
  setServicePhone,
  setServiceEmail,
  setRdPhone,
  setRdEmail,
  setTabValid,
  setFormIsValid,
  setPickupTabIsValid,
  setResourcesTabIsValid,
  setSettingsTabIsValid,
  setBolTextTabIsValid,
  setDealerZipPostLenght,
  setDealerCityLength,
  setContactOnDelivry,
  setBrokerSelection,
  setBrokerInput,
  setBrokerId,
  setCustomerSelection,
  setCustomerInput,
  setCustomerId,
  resetChangesforAutoCompletes,
  setDealerGroupId,
  setDealerGroupSelection,
  setDealerGroupInput,
  setMasterDealerGroupId,
  setMasterDealerGroupSelection,
  setMasterDealerGroupInput,
  setDeliveryTabIsValid,
  setContactOnDelivery,
  setPostalCodeOnChange,
  setOnCancel,
  setIsDealerLoading,
  setDealerPostalCodePK,
  setBolAtDispatchOrFaxBolAtOrderEntry,
  setLastOrderDate,
  setCloseBeginDateValid,
  setCloseEndDateValid,
  setLastOrder,
  setTotalUnits,
  setYtdUnits,
  setFaxBolAtOrderEntry,
  setFaxBolAtDispatch,
  setFetchLoad,
  setGmExtn,
  setDeliveryExtn,
  setSalesExtn,
  setSmExtn,
  setActivateLoader,
  setDeActivateLoader,
  setDeleteDealerLoader,
} = EditDealerSlice.actions;

export const dealerData = (state) => state.editDealer.value;

export default EditDealerSlice.reducer;
