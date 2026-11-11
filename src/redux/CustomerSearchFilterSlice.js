import { createSlice } from "@reduxjs/toolkit";

const CustomerSearchFilterSlice = createSlice({
  name: "customerSearchFilter",

  initialState: {
    loader: true,
    selectedCustomerStatus: "Complete",
    selectedStatus: "Active",
    selectedSearchCriteria: "Beginning",
    complete: true,
    searchTerms: "",
    showAdvanceSearch: false,
    showAdvanceSort: false,
    searchedCustomer: null,
    advancedSearchObject: null,
    advanceSortingOrder: null,
    normalSortValue: null,
    normalSortFlag: false,
    customerData: [],
    changeColor: false,
    advanceSortedValue: null,
    id: "",
  },

  reducers: {
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

    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },

    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },

    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },

    setCustomerData: (state, action) => {
      state.customerData = action.payload;
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
    resetSearch: (state, action) => {
      state.selectedCustomerStatus = "Complete";
      state.selectedStatus = "Active";
      state.selectedSearchCriteria = "Beginning";
      state.complete = true;
      state.searchTerms = "";
      state.showAdvanceSearch = false;
      state.showAdvanceSort = false;
      state.searchedCustomer = null;
      state.advancedSearchObject = null;
      state.advanceSortingOrder = null;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.changeColor = false;
      state.advanceSortedValue = null;
    },
  },
});

export const {
  setLoader,
  setSelectedCustomerStatus,
  setSelectedStatus,
  setSelectedSearchCriteria,
  setComplete,
  setSearchTerms,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  setSearchedCustomer,
  setAdvancedSearchObject,
  setNormalSortValue,
  setNormalSortFlag,
  setCustomerData,
  setChangeColor,
  setAdvanceSortingOrder,
  setAdvanceSortingCriteria,
  setAdvanceSortedValue,
  setId,
  resetSearch,
} = CustomerSearchFilterSlice.actions;

export const customer = (state) => state.customerSearchFilter.value;

export default CustomerSearchFilterSlice.reducer;
