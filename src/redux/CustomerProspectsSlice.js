import { createSlice } from "@reduxjs/toolkit";

const CustomerProspectsSlice = createSlice({
  name: "CustomerProspects",
  initialState: {
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    listingData: [],
    selectedId: "",
    //search
    searchTerms: "",
    searchCriteria: "Beginning",
    changeColor: false,
    viewDetail: false,
    selectedStatus: "Active",
    editFormData: null,
    changesCancelled: false,
    saveData: "",
    //editing
    normalSortValue: null,
    normalSortFlag: false,
    //input
    name: "",
    managerId: null,
    managerInput: "",
    address1: "",
    address2: "",
    phone: "",
    email: "",
    contact: "",
    website: "",
    cityNew: "",
    postalCodeNew: "",
    stateCodeNew: "",
    commodityType: "",
    canadianNew: false,
    currentTransporter: "",
    callBack: "",
    lastUpdate: "",
    loadsPerYear: "",
    milesPerLoad: "",
    notes: "",
    checkName: "",
    zipPostLengthNew: "",
    dateFlag: false,
    postalCodeOnChange: false,
    onCancel: false,
    loadingFlag: false,
    customerProspectsPostalCodePK: null,
    isCallDateValid: true,
  },
  reducers: {
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
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
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAddress1: (state, action) => {
      state.address1 = action.payload;
    },
    setAddress2: (state, action) => {
      state.address2 = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setManagerInput: (state, action) => {
      state.managerInput = action.payload;
    },
    setManagerId: (state, action) => {
      state.managerId = action.payload;
    },
    setWebsite: (state, action) => {
      state.website = action.payload;
    },

    setCityNew: (state, action) => {
      state.cityNew = action.payload;
    },
    setStateCodeNew: (state, action) => {
      state.stateCodeNew = action.payload;
    },
    setPostalCodeNew: (state, action) => {
      state.postalCodeNew = action.payload;
    },
    setCurrentTransporter: (state, action) => {
      state.currentTransporter = action.payload;
    },
    setCommodityType: (state, action) => {
      state.commodityType = action.payload;
    },
    setMilesPerLoad: (state, action) => {
      state.milesPerLoad = action.payload;
    },
    setLoadsPerYear: (state, action) => {
      state.loadsPerYear = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setCallBack: (state, action) => {
      state.callBack = action.payload;
    },
    setLastUpdate: (state, action) => {
      state.lastUpdate = action.payload;
    },
    setSaveData: (state, action) => {
      state.saveData = action.payload;
    },
    setCheckName: (state, action) => {
      state.checkName = action.payload;
    },
    setCanandianNew: (state, action) => {
      state.canadianNew = action.payload;
    },
    setZipPostLengthNew: (state, action) => {
      state.zipPostLengthNew = action.payload;
    },
    setDateFlag: (state, action) => {
      state.dateFlag = action.payload;
    },

    setChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    resetChanges: (state, action) => {
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.searchCriteria = "Beginning";
      state.searchTerms = "";
      state.pageNumber = 0;
      state.selectedStatus = "Active";
      state.changeColor = false;
    },
    resetStates: (state, action) => {
      state.name = "";
      state.email = "";
      state.managerInput = "";
      state.managerId = null;
      state.stateCodeNew = "";
      state.postalCodeNew = "";
      state.cityNew = "";
      state.phone = "";
      state.contact = "";
      state.website = "";
      state.commodityType = "";
      state.currentTransporter = "";
      state.milesPerLoad = "";
      state.loadsPerYear = "";
      state.callBack = "";
      state.lastUpdate = "";
      state.notes = "";
      state.address2 = "";
      state.address1 = "";
      state.checkName = false;
      state.dateFlag = false;
    },
    setPostalCodeOnChange: (state, action) => {
      state.postalCodeOnChange = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setLoadingFlag: (state, action) => {
      state.loadingFlag = action.payload;
    },
    setCustomerProspectsPostalCodePK: (state, action) => {
      state.customerProspectsPostalCodePK = action.payload;
    },
    setIsCallDateValid: (state, action) => {
      state.isCallDateValid = action.payload;
    },
  },
});
export const {
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setSearchTerms,
  setSearchCriteria,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  resetChanges,
  setListingData,
  setSelectedId,
  setChangesCancelled,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedStatus,
  setSaveData,
  setName,
  setCheckName,
  setAddress1,
  setAddress2,
  setCityNew,
  setPhone,
  setPostalCodeNew,
  setStateCodeNew,
  setEmail,
  setContact,
  setWebsite,
  setCommodityType,
  setCurrentTransporter,
  setLoadsPerYear,
  setMilesPerLoad,
  setManagerId,
  setManagerInput,
  setNotes,
  setLastUpdate,
  setCallBack,
  setLoadingFlag,
  resetStates,
  setDateFlag,
  setCanandianNew,
  setZipPostLengthNew,
  setOnCancel,
  setPostalCodeOnChange,
  setCustomerProspectsPostalCodePK,
  setIsCallDateValid,
} = CustomerProspectsSlice.actions;
export default CustomerProspectsSlice.reducer;
