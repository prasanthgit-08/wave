import { createSlice } from "@reduxjs/toolkit";

const UnitMultiLoadLookupSlice = createSlice({
  name: "unitMultiLoadLookup",
  initialState: {
    yardsData: [],
    // search filter
    searchTerms: "",
    selectedSearchCriteria: "Beginning",

    pickupYardId: "",
    changeColor: false,
    loading: true,

    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],

    // pagination
    pageNumberYardLookup: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setPickupYardId: (state, action) => {
      state.pickupYardId = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setYardsData: (state, action) => {
      state.yardsData = action.payload;
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
    setPageNumberYardLookup: (state, action) => {
      state.pageNumberYardLookup = action.payload;
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

    resetSearchSettingsYard: (state, action) => {
      state.yardsData = [];
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.pickupYardId = "";
      state.changeColor = false;
      state.loading = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumberYardLookup = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setPickupYardId,
  setChangeColor,
  setLoading,
  setYardsData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setPageNumberYardLookup,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsYard,
} = UnitMultiLoadLookupSlice.actions;

export default UnitMultiLoadLookupSlice.reducer;
