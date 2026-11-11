import { createSlice } from "@reduxjs/toolkit";

const SettlementsSlice = createSlice({
  name: "Settlements",
  initialState: {
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    browseNavigation: [],

    //search
    settlementData: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    id: "",
    primaryKey: "",
    changeColor: false,
    viewDetail: false,
    editFormData: null,
    // normal sorting
    sortValue: "",
    sortFlag: false,

    //editing
    checkCity: "",
    totalFund: null,
    city: "",
    outbound: false,
    reload: false,
    radioValue: "Debit Card",

    totalAmount: 0,
    taxableAmount: 0,
    reimbursmentAmount: 0,
  },

  reducers: {
    setSettlementData: (state, action) => {
      state.settlementData = action.payload;
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

    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },

    setPrimaryKey: (state, action) => {
      state.primaryKey = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setOutbound: (state, action) => {
      state.outbound = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setCheckCity: (state, action) => {
      state.checkCity = action.payload;
    },
    setRadioValue: (state, action) => {
      state.radioValue = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setTaxableAmount: (state, action) => {
      state.taxableAmount = action.payload;
    },

    setReimbursmentAmount: (state, action) => {
      state.reimbursmentAmount = action.payload;
    },
    setTotalFund: (state, action) => {
      state.totalFund = action.payload;
    },
  },
});
export const {
  setPageNumber,
  setTotalElements,
  setTotalPages,
  resetShuttleCity,
  setBrowseNavigation,
  setSettlementData,
  setSearchTerm,
  setSearchCriteria,
  setNormalSortValue,
  setNormalSortFlag,
  setId,
  setLoader,
  setPrimaryKey,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  resetChanges,
  setCity,
  setOutbound,
  setReload,
  toggleChangesCancelled,
  setCheckCity,
  setRadioValue,
  setTotalFund,
  setTaxableAmount,
  setReimbursmentAmount,
  setTotalAmount,
} = SettlementsSlice.actions;
export default SettlementsSlice.reducer;
