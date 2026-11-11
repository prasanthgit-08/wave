import { createSlice } from "@reduxjs/toolkit";

const BrokerLookupSlice = createSlice({
  name: "brokerLookup",
  initialState: {
    brokerData: [],
    // search filter
    searchTerms: "",
    selectedSearchCriteria: "Beginning",

    brokerId: "",
    changeColor: false,
    loading: true,

    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],

    // pagination
    pageNumberBrokerLookup: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setBrokerLookupId: (state, action) => {
      state.brokerId = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBrokerData: (state, action) => {
      state.brokerData = action.payload;
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
    setPageNumberBrokerLookup: (state, action) => {
      state.pageNumberBrokerLookup = action.payload;
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

    resetSearchSettingsBroker: (state, action) => {
      state.brokerData = [];
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.brokerId = "";
      state.changeColor = false;
      state.loading = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumberBrokerLookup = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setBrokerLookupId,
  setChangeColor,
  setLoading,
  setBrokerData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setPageNumberBrokerLookup,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsBroker,
} = BrokerLookupSlice.actions;

export default BrokerLookupSlice.reducer;
