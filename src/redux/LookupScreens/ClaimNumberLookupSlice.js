import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  pageNumberClaimNumberLookup: 0,
  totalPages: 0,
  totalElements: 0,
};

const ClaimNumberLookupSlice = createSlice({
  name: "claimNumberLookupReducer",
  initialState,
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

    setPageNumberClaimNumberLookup: (state, action) => {
      state.pageNumberClaimNumberLookup = action.payload;
    },

    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },

    // FIXED
    setSortPositions: (state, action) => {
      state.rowPosition = action.payload.row;
      state.columnPosition = action.payload.column;
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

    // CLEAN RESET
    resetSearchSettingsClaimNumberLookup: () => initialState,
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
  setPageNumberClaimNumberLookup,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsClaimNumberLookup,
} = ClaimNumberLookupSlice.actions;

export default ClaimNumberLookupSlice.reducer;
