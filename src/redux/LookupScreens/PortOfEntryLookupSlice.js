import { createSlice } from "@reduxjs/toolkit";

const PortOfEntryLookupSlice = createSlice({
  name: "portOfEntryLookup",
  initialState: {
    portOfEntryData: [],
    // search filter
    searchTerms: "",
    selectedSearchCriteria: "Beginning",
    selectedId: null,
    changeColor: false,
    loading: true,
    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],

    // pagination
    pageNumberPortOfEntryLookup: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPortOfEntryData: (state, action) => {
      state.portOfEntryData = action.payload;
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
    setPageNumberPortOfEntryLookup: (state, action) => {
      state.pageNumberPortOfEntryLookup = action.payload;
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

    resetSearchSettingsPortOfEntry: (state, action) => {
      state.portOfEntryData = [];
      state.selectedId = null;
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.changeColor = false;
      state.loading = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumberPortOfEntryLookup = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setChangeColor,
  setSelectedId,
  setLoading,
  setPortOfEntryData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setPageNumberPortOfEntryLookup,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsPortOfEntry,
} = PortOfEntryLookupSlice.actions;

export default PortOfEntryLookupSlice.reducer;
