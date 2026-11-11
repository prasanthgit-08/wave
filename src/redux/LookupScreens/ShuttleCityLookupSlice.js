import { createSlice } from "@reduxjs/toolkit";

const ShuttleCityLookupSlice = createSlice({
  name: "shuttleCityLookup",
  initialState: {
    shuttleCityData: [],
    // search filter
    searchTerms: "",
    selectedSearchCriteria: "Beginning",
    shuttleCityId: null,
    changeColor: false,
    loading: true,

    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],

    // pagination
    pageNumberShuttleCityLookup: 0,
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
    setShuttleCityData: (state, action) => {
      state.shuttleCityData = action.payload;
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
    setShuttleCityId: (state, action) => {
      state.shuttleCityId = action.payload;
    },

    setPageNumberShuttleCityLookup: (state, action) => {
      state.pageNumberShuttleCityLookup = action.payload;
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

    resetSearchSettingsShuttleCity: (state, action) => {
      state.shuttleCityData = [];
      state.shuttleCityId = null;
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.changeColor = false;
      state.loading = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumberShuttleCityLookup = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setChangeColor,
  setLoading,
  setShuttleCityData,
  setShuttleCityId,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setPageNumberShuttleCityLookup,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsShuttleCity,
} = ShuttleCityLookupSlice.actions;

export default ShuttleCityLookupSlice.reducer;
