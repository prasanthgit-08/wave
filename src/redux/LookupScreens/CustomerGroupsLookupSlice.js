import { createSlice } from "@reduxjs/toolkit";

const CustomerGroupsLookupSlice = createSlice({
  name: "CustomerGroupsLookupSlice",
  initialState: {
    customerGroupData: [],
    // search filter
    searchTerms: "",
    customerGroupsId: "",
    selectedSearchCriteria: "Beginning",
    customerGroupId: null,
    changeColor: false,
    loading: true,

    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],

    // pagination
    pageNumberCustomerGroupsLookup: 0,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCustomerGroupData: (state, action) => {
      state.customerGroupData = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setCustomerGroupsId: (state, action) => {
      state.customerGroupsId = action.payload;
    },
    setPageNumberCustomerGroupsLookup: (state, action) => {
      state.pageNumberCustomerGroupsLookup = action.payload;
    },
    setCustomerGroupId: (state, action) => {
      state.customerGroupId = action.payload;
    },

    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
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
    resetSearchSettingsState: (state, action) => {
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.changeColor = false;
      state.loading = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.pageNumberCustomerGroupsLookup = 0;
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },

    resetSearchSettingsCustomerGroups: (state, action) => {
      state.customerGroupData = [];
      state.customerGroupsId = null;
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.changeColor = false;
      state.loading = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumberCustomerGroupsLookup = 0;
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setChangeColor,
  setCustomerGroupId,
  setLoading,
  setCustomerGroupData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setPageNumberCustomerGroupsLookup,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsCustomerGroups,
  resetSearchSettingsState,
} = CustomerGroupsLookupSlice.actions;

export default CustomerGroupsLookupSlice.reducer;
