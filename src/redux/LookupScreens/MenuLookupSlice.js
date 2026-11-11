import { createSlice } from "@reduxjs/toolkit";

const MenuLookupSlice = createSlice({
  name: "menuLookup",
  initialState: {
    listingData: [],
    // search filter
    searchTerms: "",
    selectedSearchCriteria: "Beginning",

    selectedId: "",
    loading: true,

    normalSortValue: null,
    normalSortFlag: false,

    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
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
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    resetMenuSearchFilters: (state, action) => {
      state.listingData = [];
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.selectedId = "";
      state.loading = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setSelectedId,
  setLoading,
  setListingData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  resetMenuSearchFilters,
} = MenuLookupSlice.actions;

export default MenuLookupSlice;
