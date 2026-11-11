import { createSlice } from "@reduxjs/toolkit";

const MiscCustomerLookupSlice = createSlice({
  name: "miscCustomerLookup",
  initialState: {
    miscCustomerData: [],
    // search filter
    searchTerms: "",
    showAdvanceSearch: false,
    showAdvanceSort: false,
    selectedSearchCriteria: "Beginning",

    id: "",
    changeColor: false,
    loading: true,
    searchedCustomer: null,
    advanceSortedValue: null,
    normalSortValue: null,
    normalSortFlag: false,
    advanceSortingOrder: null,
    rowPosition: [],
    columnPosition: [],

    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,

    miscCity: "",
    miscStateCode: "",
    miscCanadian: false,
    miscPostalCode: "",
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchedCustomer: (state, action) => {
      state.searchedCustomer = action.payload;
    },
    setMiscCustomerData: (state, action) => {
      state.miscCustomerData = action.payload;
    },
    setAdvanceSortedValue: (state, action) => {
      state.advanceSortedValue = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },

    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setShowAdvanceSort: (state, action) => {
      state.showAdvanceSort = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },

    setAdvanceSortingCriteria: (state, action) => {
      state.advanceSortingOrder = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },

    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
    },

    setSortPositions: (state, action) => {
      state.rowPosition = action.payload;
      state.columnPosition = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setMiscCity: (state, action) => {
      state.miscCity = action.payload;
    },
    setMiscPostalCode: (state, action) => {
      state.miscPostalCode = action.payload;
    },

    setMiscStateCode: (state, action) => {
      state.miscStateCode = action.payload;
    },

    setMiscCanadian: (state, action) => {
      state.miscCanadian = action.payload;
    },

    resetSearchSettings: (state, action) => {
      state.miscCustomerData = [];
      state.searchTerms = "";
      state.showAdvanceSearch = false;
      state.showAdvanceSort = false;
      state.selectedSearchCriteria = "Beginning";
      state.id = "";
      state.changeColor = false;
      state.loading = true;
      state.searchedCustomer = null;
      state.advanceSortedValue = null;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.advanceSortingOrder = null;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.miscCity = "";
      state.miscPostalCode = "";
      state.miscStateCode = "";
      state.miscCanadian = false;
    },
  },
});

export const {
  setId,
  setChangeColor,
  setLoading,
  setAdvanceSortedValue,
  setSearchedCustomer,
  setMiscCustomerData,
  setNormalSortValue,
  setNormalSortFlag,
  setShowAdvanceSort,
  setSelectedSearchCriteria,
  setAdvanceSortingCriteria,
  setSearchTerms,
  setShowAdvanceSearch,
  setSortPositions,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  resetSearchSettings,
  setMiscCity,
  setMiscCanadian,
  setMiscStateCode,
  setMiscPostalCode,
} = MiscCustomerLookupSlice.actions;

export default MiscCustomerLookupSlice.reducer;
