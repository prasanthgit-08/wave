import { createSlice } from "@reduxjs/toolkit";

const RoadConditionLookupSlice = createSlice({
  name: "RoadConditionLookupSlice",
  initialState: {
    formsData: [],
    // search filter
    searchTerms: "",
    selectedSearchCriteria: "Beginning",
    id: null,
    changeColor: false,
    loading: true,

    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],

    // pagination
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
    setFormsData: (state, action) => {
      state.formsData = action.payload;
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
    setId: (state, action) => {
      state.id = action.payload;
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
      state.formsData = [];
      state.id = null;
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.changeColor = false;
      state.loading = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setChangeColor,
  setLoading,
  setFormsData,
  setId,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsState,
} = RoadConditionLookupSlice.actions;

export default RoadConditionLookupSlice;
