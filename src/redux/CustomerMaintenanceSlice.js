import { createSlice } from "@reduxjs/toolkit";

const CustomerMaintenanceSlice = createSlice({
  name: "customerMaintenance",

  initialState: {
    viewDetail: true,
    editMode: false,
    dataFromSecondDB: null,
    editCustomerData: null,
    customerMaintananceSpecialCondition: "",
    customerFormData: null,
    IsGeneralTabValid: true,
    IsSettingsTabValid: true,
    settingNoValidation: false,
    IsSettingsBondInfoValid: false,
    IsOrdersDetailsTabValid: true,
    IsOrdersSettingsTabValid: true,
    ordersSettingsTabInitialColor: true,
    IsInvoiceGeneralTabValid: true,
    IsInvoiceSettingsATabValid: true,
    InvoiceSettingsATabNoValidation: true,
    IsInvoiceSettingsBTabValid: true,
    IsInvoiceRatesTabValid: true,
    InvoiceRatesTabRequired: false,
    ratesTabInitialColor: true,
    IsInvoicePaperworkTabValid: true,
    IsInvoiceStorageTabValid: true,
    StorageInitailColor: true,
    IsDelaysDelayTabValid: true,
    IsDelaysBreakdownTabValid: true,
    IsDelaysDamageTabValid: true,
    IsDelaysHotlineTabValid: true,
    delaysHotlineTabInitialColor: true,
    activeTab: "general",

    //General Tab
    customerName: "",
    customerNameExistCheck: "",
    customerCanadian: false,
    customerPhone: "",
    customerTollPhone: "",
    customerDPU: false,
    settingsTabmiscellaneousCustomer: false,
    settingsAllDealersFOD: false,
    customerGroupsSelection: false,
    changesCancelled: false,
    customerDealerSelection: false,
    websiteLogin: "",
    websitePassword: "",
    postalcode: "",
    city: "",
    statecode: "",

    //Settings
    customerType: "",
    dpuCustomer: false,
    dispatchUser: "",

    //Order/Details
    orderEntryUsers: "",

    //Order/Settings
    requirePdi: false,

    // Invoice/Payment
    creditCardPayments: "",
    openBalancePayments: "",
    openBulkInvoices: false,
    bulkInvoices: "",
    brokerCity: "",
    brokerStatecode: "",
    brokerCanadian: false,
    brokerPostcode: "",
    validInvoicePaymentTab: "",

    //Storage Tab
    storageInvoiceStorageUnits: false,

    onCancel: false,

    //For loading
    isCustomerLoading: false,
  },

  reducers: {
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },

    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },

    setDataFromSecondDB: (state, action) => {
      state.dataFromSecondDB = action.payload;
    },

    setEditCustomerData: (state, action) => {
      state.editCustomerData = action.payload;
    },
    setCustomerMaintananceSpecialCondition: (state, action) => {
      state.customerMaintananceSpecialCondition = action.payload;
    },

    setCustomerFormData: (state, action) => {
      let payload = action.payload;
      state.customerFormData = { ...state.customerFormData, ...payload };
    },
    setIsGeneralTabValid: (state, action) => {
      state.IsGeneralTabValid = action.payload;
    },
    setIsSettingsTabValid: (state, action) => {
      state.IsSettingsTabValid = action.payload;
    },
    setIsSettingsBondInfoValid: (state, action) => {
      state.IsSettingsBondInfoValid = action.payload;
    },
    setSettingNoValidation: (state, action) => {
      state.settingNoValidation = action.payload;
    },
    setIsOrdersDetailsTabValid: (state, action) => {
      state.IsOrdersDetailsTabValid = action.payload;
    },

    setIsOrdersSettingsTabValid: (state, action) => {
      state.IsOrdersSettingsTabValid = action.payload;
    },

    setOrdersSettingsTabInitialColor: (state, action) => {
      state.ordersSettingsTabInitialColor = action.payload;
    },

    setIsInvoiceGeneralTabValid: (state, action) => {
      state.IsInvoiceGeneralTabValid = action.payload;
    },
    setValidInvoicePaymentTab: (state, action) => {
      state.validInvoicePaymentTab = action.payload;
    },
    setIsInvoiceSettingsATabValid: (state, action) => {
      state.IsInvoiceSettingsATabValid = action.payload;
    },
    setInvoiceSettingsATabNoValidation: (state, action) => {
      state.InvoiceSettingsATabNoValidation = action.payload;
    },
    setIsInvoiceSettingsBTabValid: (state, action) => {
      state.IsInvoiceSettingsBTabValid = action.payload;
    },

    setIsInvoiceRatesTabValid: (state, action) => {
      state.IsInvoiceRatesTabValid = action.payload;
    },

    setInvoiceRatesTabRequired: (state, action) => {
      state.InvoiceRatesTabRequired = action.payload;
    },

    setRatesTabInitialColor: (state, action) => {
      state.ratesTabInitialColor = action.payload;
    },

    setIsInvoicePaperworkTabValid: (state, action) => {
      state.IsInvoicePaperworkTabValid = action.payload;
    },

    setIsInvoiceStorageTabValid: (state, action) => {
      state.IsInvoiceStorageTabValid = action.payload;
    },
    setStorageInitialColor: (state, action) => {
      state.StorageInitailColor = action.payload;
    },

    setIsDelaysDelayTabValid: (state, action) => {
      state.IsDelaysDelayTabValid = action.payload;
    },

    setIsDelaysBreakdownTabValid: (state, action) => {
      state.IsDelaysBreakdownTabValid = action.payload;
    },

    setIsDelaysDamageTabValid: (state, action) => {
      state.IsDelaysDamageTabValid = action.payload;
    },

    setIsDelaysHotlineTabValid: (state, action) => {
      state.IsDelaysHotlineTabValid = action.payload;
    },

    setDelaysHotlineTabInitialColor: (state, action) => {
      state.delaysHotlineTabInitialColor = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },

    //General Tab
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },

    setCustomerNameExistCheck: (state, action) => {
      state.customerNameExistCheck = action.payload;
    },

    setCustomerCanadian: (state, action) => {
      state.customerCanadian = action.payload;
    },
    setCustomerPhone: (state, action) => {
      state.customerPhone = action.payload;
    },
    setCustomerTollPhone: (state, action) => {
      state.customerTollPhone = action.payload;
    },
    setCustomerDPU: (state, action) => {
      state.customerDPU = action.payload;
    },
    setSettingsTabmiscellaneousCustomer: (state, action) => {
      state.settingsTabmiscellaneousCustomer = action.payload;
    },
    setSettingsAllDealersFOD: (state, action) => {
      state.settingsAllDealersFOD = action.payload;
    },
    setCustomerGroupsSelection: (state, action) => {
      state.customerGroupsSelection = action.payload;
    },
    setCustomerDealerSelection: (state, action) => {
      state.customerDealerSelection = action.payload;
    },

    setWebsiteLogin: (state, action) => {
      state.websiteLogin = action.payload;
    },

    setWebsitePassword: (state, action) => {
      state.websitePassword = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setCustomerPostalCode: (state, action) => {
      state.postalCode = action.payload;
    },
    setCustomerStateCode: (state, action) => {
      state.statecode = action.payload;
    },
    setCustomerCity: (state, action) => {
      state.city = action.payload;
    },

    //Settings

    setCustomerType: (state, action) => {
      state.customerType = action.payload;
    },
    setDpuCustomer: (state, action) => {
      state.dpuCustomer = action.payload;
    },
    setBrokerCity: (state, action) => {
      state.brokerCity = action.payload;
    },
    setBrokerStatecode: (state, action) => {
      state.brokerStatecode = action.payload;
    },
    setBrokerCanedian: (state, action) => {
      state.brokerCanadian = action.payload;
    },
    setBrokerPostcode: (state, action) => {
      state.brokerPostcode = action.payload;
    },
    setDispatcheUser: (state, action) => {
      state.dispatchUser = action.payload;
    },

    //order/deatils
    setOrderEntryUsers: (state, action) => {
      state.orderEntryUsers = action.payload;
    },

    //Order/Settings

    setRequirePdi: (state, action) => {
      state.requirePdi = action.payload;
    },

    // Invoice/Payment
    setCreditCardPayments: (state, action) => {
      state.creditCardPayments = action.payload;
    },

    setOpenBalancePayments: (state, action) => {
      state.openBalancePayments = action.payload;
    },
    setOpenBulkInvoices: (state, action) => {
      state.openBulkInvoices = action.payload;
    },
    setBulkInvoices: (state, action) => {
      state.bulkInvoices = action.payload;
    },

    //Storage Tab

    setStorageInvoiceStorageUnits: (state, action) => {
      state.storageInvoiceStorageUnits = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    //for loading
    setIsCustomerLoading: (state, action) => {
      state.isCustomerLoading = action.payload;
    },
  },
});

export const {
  setViewDetail,
  setEditMode,
  setStorageInitialColor,
  setDataFromSecondDB,
  setEditCustomerData,
  setCustomerMaintananceSpecialCondition,
  setCustomerFormData,
  setIsGeneralTabValid,
  setIsSettingsTabValid,
  setIsSettingsBondInfoValid,
  setSettingNoValidation,
  setIsOrdersTabValid,
  setIsOrdersDetailsTabValid,
  setIsOrdersSettingsTabValid,
  setOrdersSettingsTabInitialColor,
  setIsInvoiceGeneralTabValid,
  setIsInvoiceSettingsATabValid,
  setInvoiceSettingsATabNoValidation,
  setIsInvoiceSettingsBTabValid,
  setIsInvoiceRatesTabValid,
  setInvoiceRatesTabRequired,
  setRatesTabInitialColor,
  setIsInvoicePaperworkTabValid,
  setIsInvoiceStorageTabValid,
  setIsDelaysDelayTabValid,
  setIsDelaysBreakdownTabValid,
  setIsDelaysDamageTabValid,
  setIsDelaysHotlineTabValid,
  setDelaysHotlineTabInitialColor,
  setActiveTab,
  setCustomerName,
  setCustomerNameExistCheck,
  setCustomerCanadian,
  setCustomerPhone,
  setCustomerTollPhone,
  setCustomerPostalCode,
  setCustomerCity,
  setCustomerStateCode,
  setCustomerDPU,
  setSettingsTabmiscellaneousCustomer,
  setSettingsAllDealersFOD,
  setCustomerGroupsSelection,
  setCustomerDealerSelection,
  setWebsiteLogin,
  setWebsitePassword,
  toggleChangesCancelled,
  setCustomerType,
  setDpuCustomer,
  setOrderEntryUsers,
  setRequirePdi,
  setCreditCardPayments,
  setOpenBalancePayments,
  setOpenBulkInvoices,
  setBulkInvoices,
  setStorageInvoiceStorageUnits,
  setDispatcheUser,
  setValidInvoicePaymentTab,
  setIsCustomerLoading,
  setBrokerCanedian,
  setBrokerPostcode,
  setBrokerStatecode,
  setBrokerCity,
  setOnCancel,
} = CustomerMaintenanceSlice.actions;

export const customerdata = (state) => state.customerMaintenance.value;

export default CustomerMaintenanceSlice.reducer;
