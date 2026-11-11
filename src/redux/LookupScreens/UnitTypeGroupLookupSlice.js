import { createSlice } from "@reduxjs/toolkit";

const UnitTypeGroupLookupSlice = createSlice({
  name: "unitTypeLookGroupup",
  initialState: {
    unitTypeGroupLookupData: [],
    // search filter
    searchTerms: "",
    selectedSearchCriteria: "Beginning",
    unitTypeGroupSearchCriteria: "All",

    // pagination
    unitTypeGroupPageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    id: "",
    unitTypeGroupSelectedId: "",
    changeColor: false,

    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],
    loading: true,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUnitTypeGroupSelectedId: (state, action) => {
      state.unitTypeGroupSelectedId = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setUnitTypeGroupLookupData: (state, action) => {
      state.unitTypeGroupLookupData = action.payload;
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
    setUnitTypeGroupSearchCriteria: (state, action) => {
      state.unitTypeGroupSearchCriteria = action.payload;
    },
    setUnitTypeGroupPageNumber: (state, action) => {
      state.unitTypeGroupPageNumber = action.payload;
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

    resetUnitTypeGroupSearchSettings: (state, action) => {
      state.unitTypeGroupLookupData = [];
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.unitTypeGroupSearchCriteria = "All";
      state.unitTypeGroupSelectedId = "";
      state.changeColor = false;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.unitTypeGroupPageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.loading = true;
    },
  },
});

export const {
  setLoading,
  setUnitTypeGroupSelectedId,
  setChangeColor,
  setUnitTypeGroupLookupData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setUnitTypeGroupSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setTotalElements,
  setTotalPages,
  setUnitTypeGroupPageNumber,
  setId,
  resetUnitTypeGroupSearchSettings,
} = UnitTypeGroupLookupSlice.actions;

export default UnitTypeGroupLookupSlice.reducer;
