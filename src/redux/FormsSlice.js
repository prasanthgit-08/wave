import { createSlice } from "@reduxjs/toolkit";

const FormsSlice = createSlice({
  name: "Forms",
  initialState: {
    listingData: [],
    responseData: null,
    forms: null,
    id: null,
    viewDetail: false,
    disableSave: true,
    changeColor: false,
    saveFormObject: null,
    customerId: "",
    customerPlantId: "",
    customerPlantGroupId: "",
    customerGroupId: "",
    customerUnitTypeGroupId: "",
    pickupDealerId: "",
    pickupDealerGroupId: "",
    deliveryDealerId: "",
    deliveryDealerGroupId: "",
    unitTypeId: "",
    unitTypeGroupId: "",
    yardId: "",
    specialCodeId: "",
    // search filter
    searchTerm: "",
    searchCriteria: "Beginning",
    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    // normal sorting
    sortValue: null,
    sortFlag: false,
    //validation
    isDescriptionUnique: true,
    isObjectKeyUnique: true,
    isBasicTabValid: false,
    isDetailTabValid: false,
    currentTab: "basic",
    formPathExists: true,
    projectPathExists: true,
    clearDetailForm: false,
    recordPrimaryKey: "",
    tableName: "",
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setResponseData: (state, action) => {
      state.responseData = action.payload;
    },
    setForms: (state, action) => {
      state.forms = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setSaveFormObject: (state, { payload }) => {
      state.saveFormObject = { ...state.saveFormObject, ...payload };
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setCustomerPlantId: (state, action) => {
      state.customerPlantId = action.payload;
    },
    setCustomerPlantGroupId: (state, action) => {
      state.customerPlantGroupId = action.payload;
    },
    setCustomerGroupId: (state, action) => {
      state.customerGroupId = action.payload;
    },
    setCustomerUnitTypeGroupId: (state, action) => {
      state.customerUnitTypeGroupId = action.payload;
    },
    setPickupDealerId: (state, action) => {
      state.pickupDealerId = action.payload;
    },
    setPickupDealerGroupId: (state, action) => {
      state.pickupDealerGroupId = action.payload;
    },
    setDeliveryDealerId: (state, action) => {
      state.deliveryDealerId = action.payload;
    },
    setDeliveryDealerGroupId: (state, action) => {
      state.deliveryDealerGroupId = action.payload;
    },
    setUnitTypeId: (state, action) => {
      state.unitTypeId = action.payload;
    },
    setUnitTypeGroupId: (state, action) => {
      state.unitTypeGroupId = action.payload;
    },
    setYardId: (state, action) => {
      state.yardId = action.payload;
    },
    setSpecialCodeId: (state, action) => {
      state.specialCodeId = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },
    setIsDescriptionUnique: (state, action) => {
      state.isDescriptionUnique = action.payload;
    },
    setIsObjectLockUnique: (state, action) => {
      state.isObjectKeyUnique = action.payload;
    },
    setIsBasicTabValid: (state, action) => {
      state.isBasicTabValid = action.payload;
    },
    setIsDetailTabValid: (state, action) => {
      state.isDetailTabValid = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },

    setFormPathExists: (state, action) => {
      state.formPathExists = action.payload;
    },

    setProjectPathExists: (state, action) => {
      state.projectPathExists = action.payload;
    },
    setClearDetailForm: (state, action) => {
      state.clearDetailForm = action.payload;
    },
    setRecordPrimaryKey: (state, action) => {
      state.recordPrimaryKey = action.payload;
    },
    setTableName: (state, action) => {
      state.tableName = action.payload;
    },

    resetForms: (state) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.listingData = [];
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      state.id = null;
      state.sortValue = null;
      state.sortFlag = false;
      state.changeColor = false;
      state.recordPrimaryKey = "";
      state.tableName = "";
    },

    resetChanges: (state) => {
      state.saveFormObject = null;
    },
  },
});

export const {
  setListingData,
  setResponseData,
  setForms,
  setId,
  setViewDetail,
  setDisableSave,
  setChangeColor,
  setSaveFormObject,
  setCustomerId,
  setCustomerPlantId,
  setCustomerPlantGroupId,
  setCustomerGroupId,
  setCustomerUnitTypeGroupId,
  setPickupDealerId,
  setPickupDealerGroupId,
  setDeliveryDealerId,
  setDeliveryDealerGroupId,
  setUnitTypeId,
  setUnitTypeGroupId,
  setYardId,
  setSpecialCodeId,
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSortValue,
  setSortFlag,
  setIsDescriptionUnique,
  setIsObjectLockUnique,
  setIsBasicTabValid,
  setIsDetailTabValid,
  setCurrentTab,
  toggleChangesCancelled,
  resetForms,
  resetChanges,
  setProjectPathExists,
  setFormPathExists,
  setClearDetailForm,
  setRecordPrimaryKey,
  setTableName,
} = FormsSlice.actions;

export default FormsSlice.reducer;
