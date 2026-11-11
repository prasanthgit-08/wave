import { createSlice } from "@reduxjs/toolkit";

const CustomerLookupSlice = createSlice({
  name: "customerLookup",
  initialState: {
    customerData: [],
    // search filter
    searchTerms: "",
    showAdvanceSearch: false,
    showAdvanceSort: false,
    selectedSearchCriteria: "Beginning",

    id: "",
    changeColorCustomerLookup: false,
    loading: true,
    searchedCustomer: null,
    dpuCustomer: null,
    advancedSearchObject: null,
    advanceSortedValue: null,
    normalSortValue: null,
    normalSortFlag: false,
    advanceSortingOrder: null,
    rowPosition: [],
    columnPosition: [],
    customerSelection: false,

    // pagination
    pageNo: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },

    setChangeColorCustomerLookup: (state, action) => {
      state.changeColorCustomerLookup = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchedCustomer: (state, action) => {
      state.searchedCustomer = action.payload;
    },
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
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
    setPageNo: (state, action) => {
      state.pageNo = action.payload;
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

    setCustomerSelection: (state, action) => {
      state.customerSelection = action.payload;
    },

    resetSearchSettings: (state, action) => {
      state.customerData = [];
      state.searchTerms = "";
      state.showAdvanceSearch = false;
      state.showAdvanceSort = false;
      state.selectedSearchCriteria = "Beginning";
      state.id = "";
      state.changeColorCustomerLookup = false;
      state.loading = true;
      state.searchedCustomer = null;
      state.advancedSearchObject = null;
      state.advanceSortedValue = null;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.advanceSortingOrder = null;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNo = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setId,
  setChangeColorCustomerLookup,
  setLoading,
  setAdvanceSortedValue,
  setSearchedCustomer,
  setAdvancedSearchObject,
  setCustomerData,
  setNormalSortValue,
  setNormalSortFlag,
  setShowAdvanceSort,
  setSelectedSearchCriteria,
  setAdvanceSortingCriteria,
  setSearchTerms,
  setShowAdvanceSearch,
  setSortPositions,
  setPageNo,
  setTotalElements,
  setTotalPages,
  setCustomerSelection,
  resetSearchSettings,
} = CustomerLookupSlice.actions;

export default CustomerLookupSlice.reducer;
