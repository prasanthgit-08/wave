import { createSlice } from "@reduxjs/toolkit";

const ReservesLookupSlice = createSlice({
  name: "ReservesLookupSlice",
  initialState: {
    reservesData: [],
    // search filter
    searchTerms: "",
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    reservesId: null,
    selectedId: "",
    changeColor: false,
    loading: true,
    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],
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
    setReservesData: (state, action) => {
      state.reservesData = action.payload;
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
    setReservesId: (state, action) => {
      state.reservesId = action.payload;
    },

    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
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
      state.reservesData = [];
      state.reservesId = null;
      state.searchTerms = "";
      state.selectedId = "";
      state.searchTerm = "";
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
  setReservesData,
  setReservesId,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSelectedId,
  setSearchTerm,
  setSortPositions,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsState,
} = ReservesLookupSlice.actions;

export default ReservesLookupSlice.reducer;
