import { createSlice } from "@reduxjs/toolkit";

const UnitTypeGroupsSlice = createSlice({
  name: "unitTypeGroupsLookup",
  initialState: {
    unitTypeGroupsData: [],
    // search filter
    searchTerms: "",
    selectedSearchCriteria: "Beginning",
    unitTypeGroupsId: null,
    changeColor: false,
    loading: true,
    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],

    // pagination
    pageNumberUnitTypeGroupsLookup: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setUnitTypeGroupsId: (state, action) => {
      state.unitTypeGroupsId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUnitTypeGroupsData: (state, action) => {
      state.unitTypeGroupsData = action.payload;
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
    setPageNumberUnitTypeGroupsLookup: (state, action) => {
      state.pageNumberUnitTypeGroupsLookup = action.payload;
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

    resetSearchSettingsUnitTypeGroups: (state, action) => {
      state.unitTypeGroupsData = [];
      state.unitTypeGroupsId = null;
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.changeColor = false;
      state.loading = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumberUnitTypeGroupsLookup = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setChangeColor,
  setUnitTypeGroupsId,
  setLoading,
  setUnitTypeGroupsData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setPageNumberUnitTypeGroupsLookup,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsUnitTypeGroups,
} = UnitTypeGroupsSlice.actions;

export default UnitTypeGroupsSlice.reducer;
