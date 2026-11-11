import { createSlice } from "@reduxjs/toolkit";

const SpecialCodeLookupSlice = createSlice({
  name: "specialCodeLookup",
  initialState: {
    specialCodeData: [],
    // search filter
    searchTerms: "",
    selectedSearchCriteria: "Beginning",

    selectedId: "",
    changeColor: false,
    loading: false,

    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],

    // pagination
    pageNumberSpecialCodeLookup: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSpecialCodeData: (state, action) => {
      state.specialCodeData = action.payload;
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
    setPageNumberSpecialCodeLookup: (state, action) => {
      state.pageNumberSpecialCodeLookup = action.payload;
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

    resetSearchSettingsSpecialCode: (state, action) => {
      state.specialCodeData = [];
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.selectedId = "";
      state.changeColor = false;
      state.loading = false;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumberSpecialCodeLookup = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setSelectedId,
  setChangeColor,
  setLoading,
  setSpecialCodeData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setPageNumberSpecialCodeLookup,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsSpecialCode,
} = SpecialCodeLookupSlice.actions;

export default SpecialCodeLookupSlice.reducer;
