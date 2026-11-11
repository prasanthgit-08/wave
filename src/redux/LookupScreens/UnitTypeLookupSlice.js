import { createSlice } from "@reduxjs/toolkit";

const UnitTypeLookupSlice = createSlice({
  name: "unitTypeLookup",
  initialState: {
    unitTypeLookupData: [],
    // search filter
    searchTerms: "",
    selectedSearchCriteria: "Beginning",
    unitTypeSearchCriteria: "All",

    // pagination
    unitTypePageNumber: 0,
    totalPages: 0,
    totalElements: 0,

    unitTypeSelectedId: "",
    changeColor: false,
    loading: true,

    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],
  },
  reducers: {
    setUnitTypeSelectedId: (state, action) => {
      state.unitTypeSelectedId = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUnitTypeLookupData: (state, action) => {
      state.unitTypeLookupData = action.payload;
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
    setUnitTypeSearchCriteria: (state, action) => {
      state.unitTypeSearchCriteria = action.payload;
    },
    setUnitTypePageNumber: (state, action) => {
      state.unitTypePageNumber = action.payload;
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
    setYardsSelection: (state, action) => {
      state.yardsSelection = action.payload;
    },

    resetUnitTypeSearchSettings: (state, action) => {
      state.unitTypeLookupData = [];
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.unitTypeSearchCriteria = "All";
      state.unitTypeSelectedId = "";
      state.changeColor = false;
      state.loading = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.unitTypePageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setUnitTypeSelectedId,
  setChangeColor,
  setLoading,
  setUnitTypeLookupData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setUnitTypeSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setUnitTypePageNumber,
  setTotalElements,
  setTotalPages,
  setYardsSelection,
  resetUnitTypeSearchSettings,
} = UnitTypeLookupSlice.actions;

export default UnitTypeLookupSlice.reducer;
