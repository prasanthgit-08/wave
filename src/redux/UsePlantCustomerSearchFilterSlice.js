//used for customerplant where useplant==true ,for customer browse page
import { createSlice } from "@reduxjs/toolkit";

const UsePlantCustomerSearchFilterSlice = createSlice({
  name: "UsePlantCustomerSearchFilter",

  initialState: {
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    browseNavigation: [],
    loader: true,
    selectedCustomerStatus: "Complete",
    selectedStatus: "Active",
    selectedSearchCriteria: "Beginning",
    complete: true,
    searchTerms: "",
    showAdvanceSearch: false,
    showAdvanceSort: false,
    searchedCustomer: null,
    advanceSortingOrder: null,
    normalSortValue: null,
    normalSortFlag: false,
    changeColor: false,
    advanceSortedValue: null,
    id: "",
  },

  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },

    setSelectedCustomerStatus: (state, action) => {
      state.selectedCustomerStatus = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setComplete: (state, action) => {
      state.complete = action.payload;
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

    setSearchedCustomer: (state, action) => {
      state.searchedCustomer = action.payload;
    },

    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },

    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setAdvanceSortingOrder: (state, action) => {
      state.advanceSortingOrder = action.payload;
    },

    setAdvanceSortingCriteria: (state, action) => {
      state.advanceSortingOrder = action.payload;
    },

    setAdvanceSortedValue: (state, action) => {
      state.advanceSortedValue = action.payload;
    },

    setId: (state, action) => {
      state.id = action.payload;
    },
    resetSearchFilter: (state, action) => {
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.selectedStatus = "Active";
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.searchedCustomer = null;
    },

    resetAdvanceSearchSort: (state, action) => {
      state.showAdvanceSearch = false;
      state.showAdvanceSort = false;
      state.advanceSortingOrder = null;
      // state.advanceSortingCriteria = false;
      state.advanceSortedValue = null;
      state.id = "";
    },
  },
});

export const {
  resetSearchFilter,
  resetAdvanceSearchSort,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setBrowseNavigation,
  setLoader,
  setSelectedCustomerStatus,
  setSelectedStatus,
  setSelectedSearchCriteria,
  setComplete,
  setSearchTerms,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  setSearchedCustomer,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setAdvanceSortingOrder,
  setAdvanceSortingCriteria,
  setAdvanceSortedValue,
  setId,
} = UsePlantCustomerSearchFilterSlice.actions;

export const customer = (state) => state.usePlantCustomerSearchFilter.value;

export default UsePlantCustomerSearchFilterSlice.reducer;
