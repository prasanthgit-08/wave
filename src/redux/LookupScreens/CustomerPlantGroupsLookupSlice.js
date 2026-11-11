import { createSlice } from "@reduxjs/toolkit";

const CustomerPlantGroupsLookupSlice = createSlice({
  name: "customerPlantGroupsLookup",
  initialState: {
    customerPlantGroupsData: [],
    // search filter
    searchTerms: "",
    selectedSearchCriteria: "Beginning",
    customerPlantGroupsId: null,
    changeColor: false,
    loading: true,
    normalSortValue: "",
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],

    // pagination
    pageNumbercustomerPlantGroupsLookup: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setCustomerPlantGroupsId: (state, action) => {
      state.customerPlantGroupsId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCustomerPlantGroupsData: (state, action) => {
      state.customerPlantGroupsData = action.payload;
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
    setPageNumberCustomerPlantGroupsLookup: (state, action) => {
      state.pageNumbercustomerPlantGroupsLookup = action.payload;
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

    resetSearchSettingsCustomerPlantGroups: (state, action) => {
      state.customerPlantGroupsData = [];
      state.customerPlantGroupsId = null;
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.changeColor = false;
      state.loading = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumbercustomerPlantGroupsLookup = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setChangeColor,
  setCustomerPlantGroupsId,
  setLoading,
  setCustomerPlantGroupsData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setPageNumberCustomerPlantGroupsLookup,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsCustomerPlantGroups,
} = CustomerPlantGroupsLookupSlice.actions;

export default CustomerPlantGroupsLookupSlice.reducer;
