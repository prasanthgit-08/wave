import { createSlice } from "@reduxjs/toolkit";

const DealerLookupSlice = createSlice({
  name: "dealerLookup",
  initialState: {
    dealerData: [],

    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,

    // search filter & sort
    searchTerms: "",
    selectedSearchCriteria: "Beginning",
    showAdvanceSearch: false,
    showAdvanceSort: false,
    normalSortValue: null,
    normalSortFlag: false,
    advanceSortedValue: null,
    searchedDealer: null,
    advancedSearchObject: null,
    advanceSortingOrder: null,
    rowPosition: [],
    columnPosition: [],

    selectedId: "",
    changeColor: false,
    loading: true,
  },
  reducers: {
    setDealerData: (state, action) => {
      state.dealerData = action.payload;
    },

    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
    },
    setShowAdvanceSort: (state, action) => {
      state.showAdvanceSort = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setAdvanceSortedValue: (state, action) => {
      state.advanceSortedValue = action.payload;
    },
    setSearchedDealer: (state, action) => {
      state.searchedDealer = action.payload;
    },
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setAdvanceSortingCriteria: (state, action) => {
      state.advanceSortingOrder = action.payload;
    },
    setSortPositions: (state, action) => {
      state.rowPosition = action.payload;
      state.columnPosition = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    resetDealerLookup: (state, action) => {
      state.dealerData = [];
      state.searchTerms = "";
      state.showAdvanceSearch = false;
      state.showAdvanceSort = false;
      state.selectedSearchCriteria = "Beginning";
      state.selectedId = "";
      state.changeColor = false;
      state.loading = true;
      state.searchedDealer = null;
      state.advancedSearchObject = null;
      state.advanceSortedValue = null;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.advanceSortingOrder = null;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setDealerData,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setSearchTerms,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  setSelectedSearchCriteria,
  setNormalSortValue,
  setNormalSortFlag,
  setAdvanceSortedValue,
  setSearchedDealer,
  setAdvancedSearchObject,
  setAdvanceSortingCriteria,
  setSortPositions,
  setSelectedId,
  setChangeColor,
  setLoading,
  resetDealerLookup,
} = DealerLookupSlice.actions;

export default DealerLookupSlice.reducer;
