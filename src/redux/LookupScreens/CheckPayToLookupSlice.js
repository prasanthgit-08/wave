import { createSlice } from "@reduxjs/toolkit";

const checkPayToLookupSlice = createSlice({
  name: "checkPayToLookupReducer",
  initialState: {
    listingData: [],
    searchTerms: "",
    selectedSearchCriteria: "Beginning",
    changeColor: false,
    selectedId: null,
    loading: true,
    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],

    // pagination
    pageNumberCheckPayToLookup: 0,
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
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setPageNumberCheckPayToLookup: (state, action) => {
      state.pageNumberCheckPayToLookup = action.payload;
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
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    resetSearchSettingsLookupCheckPayTo: (state, action) => {
      state.listingData = [];
      state.selectedId = null;
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.changeColor = false;
      state.loading = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumberCheckPayToLookup = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});
export const {
  setChangeColor,
  setSelectedId,
  setLoading,
  setListingData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setPageNumberCheckPayToLookup,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsLookupCheckPayTo,
} = checkPayToLookupSlice.actions;

export default checkPayToLookupSlice.reducer;
