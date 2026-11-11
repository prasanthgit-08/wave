import { createSlice } from "@reduxjs/toolkit";

const RegionsLookupSlice = createSlice({
  name: "regionsLookup",
  initialState: {
    regionsData: [],
    // search filter
    searchTerms: "",
    selectedSearchCriteria: "Beginning",
    regionsId: null,
    changeColor: false,
    loading: true,
    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],

    // pagination
    pageNumberRegionsLookup: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setRegionsId: (state, action) => {
      state.regionsId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRegionsData: (state, action) => {
      state.regionsData = action.payload;
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
    setPageNumberRegionsLookup: (state, action) => {
      state.pageNumberRegionsLookup = action.payload;
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

    resetSearchSettingsRegions: (state, action) => {
      state.regionsData = [];
      state.regionsId = null;
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.changeColor = false;
      state.loading = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumberRegionsLookup = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setChangeColor,
  setRegionsId,
  setLoading,
  setRegionsData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setPageNumberRegionsLookup,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsRegions,
} = RegionsLookupSlice.actions;

export default RegionsLookupSlice.reducer;
