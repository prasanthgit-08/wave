import { createSlice } from "@reduxjs/toolkit";

const DispatchRestrictionsSlice = createSlice({
  name: "DispatchRestrictionsSlice",
  initialState: {
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    listingData: [],
    selectedId: "",
    addDate: null,
    userName: "",
    notes: "",
    dispatchRestrictionsPK: null,
    customerName: "",
    dealerName: "",
    specialCodeDescription: "",
    stateCode: "",
    stateCodeName: "",
    allowDispatch: false,
    dealerId: null,
    customerId: null,
    specialCodeId: null,
    customerSelection: false,
    dealerSelection: false,
    specialCodeSelection: false,

    //search

    searchTerm: "",
    searchCriteria: "Beginning",
    changeColor: false,
    viewDetail: false,
    editFormData: null,
    changesCancelled: false,

    isDateValid: true,
    normalSortValue: null,
    normalSortFlag: false,
    combinationCheck: false,
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
    setAtleastOneCheck: (state, action) => {
      state.atleastOneCheck = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setHolidayPK: (state, action) => {
      state.holidayPK = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setChangesCancelled: (state) => {
      state.changesCancelled = !state.changesCancelled;
    },

    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setUs: (state, action) => {
      state.us = action.payload;
    },
    setCanadian: (state, action) => {
      state.canadian = action.payload;
    },
    setIsDateValid: (state, action) => {
      state.isDateValid = action.payload;
    },
    setAddDate: (state, action) => {
      state.addDate = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setDispatchRestrictionsPK: (state, action) => {
      state.dispatchRestrictionsPK = action.payload;
    },
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
    setDealerName: (state, action) => {
      state.dealerName = action.payload;
    },
    setSpecialCodeDescription: (state, action) => {
      state.specialCodeDescription = action.payload;
    },
    setStateCode: (state, action) => {
      state.stateCode = action.payload;
    },
    setAllowDispatch: (state, action) => {
      state.allowDispatch = action.payload;
    },
    setDealerId: (state, action) => {
      state.dealerId = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setSpecialCodeId: (state, action) => {
      state.specialCodeId = action.payload;
    },
    setCustomerSelection: (state, action) => {
      state.customerSelection = action.payload;
    },
    setDealerSelection: (state, action) => {
      state.dealerSelection = action.payload;
    },
    setSpecialCodeSelection: (state, action) => {
      state.specialCodeSelection = action.payload;
    },
    setStateCodeName: (state, action) => {
      state.stateCodeName = action.payload;
    },
    setCombinationCheck: (state, action) => {
      state.combinationCheck = action.payload;
    },
    resetCloseChanges: (state, action) => {
      state.stateCode = "";
      state.stateCodeName = "";
      state.dealerId = null;
      state.customerId = null;
      state.specialCodeId = null;
      state.dealerName = "";
      state.customerName = "";
      state.notes = "";
      state.specialCodeDescription = "";

      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.normalSortFlag = false;
      state.normalSortValue = "";
      state.combinationCheck = false;
    },
  },
});
export const {
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setSearchTerm,
  setSearchCriteria,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  setDescription,
  setDate,
  setUs,
  setCanadian,
  setListingData,
  setSelectedId,
  setHolidayPK,
  setChangesCancelled,
  setIsDateValid,
  setAtleastOneCheck,
  setNormalSortValue,
  setNormalSortFlag,
  setAddDate,
  setUserName,
  setNotes,
  setDispatchRestrictionsPK,
  setStateCode,
  setSpecialCodeDescription,
  setDealerName,
  setCustomerName,
  setAllowDispatch,
  setDealerId,
  setCustomerId,
  setSpecialCodeId,
  setCustomerSelection,
  setDealerSelection,
  setSpecialCodeSelection,
  setStateCodeName,
  resetCloseChanges,
  setCombinationCheck,
} = DispatchRestrictionsSlice.actions;
export default DispatchRestrictionsSlice.reducer;
