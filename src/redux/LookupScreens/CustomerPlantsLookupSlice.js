import { createSlice } from "@reduxjs/toolkit";

const CustomerPlantsLookupSlice = createSlice({
  name: "customerPlantsLookup",
  initialState: {
    customerPlantData: [],
    // search filter
    searchTerms: "",
    showAdvanceSearch: false,
    showAdvanceSort: false,
    selectedSearchCriteria: "Beginning",

    billingPlantId: "",
    changeColorCustomerPlantLookup: false,
    loading: true,
    searchedCustomerPlant: null,
    advancedSearchObject: null,
    advanceSortedValue: null,
    normalSortValue: null,
    normalSortFlag: false,
    advanceSortingOrder: null,

    // pagination
    pageNoPlantsLookup: 0,
    totalPages: 0,
    totalElements: 0,
    customerPlantFKS: null,
  },
  reducers: {
    setBillingPlantId: (state, action) => {
      state.billingPlantId = action.payload;
    },

    setChangeColorCustomerPlantLookup: (state, action) => {
      state.changeColorCustomerPlantLookup = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchedCustomerPlant: (state, action) => {
      state.searchedCustomerPlant = action.payload;
    },
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setCustomerPlantData: (state, action) => {
      state.customerPlantData = action.payload;
    },
    setAdvanceSortedValue: (state, action) => {
      state.advanceSortedValue = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },

    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setShowAdvanceSort: (state, action) => {
      state.showAdvanceSort = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setPageNoPlantsLookup: (state, action) => {
      state.pageNoPlantsLookup = action.payload;
    },

    setAdvanceSortingCriteria: (state, action) => {
      state.advanceSortingOrder = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },

    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setCustomerPlantFKList: (state, action) => {
      state.customerPlantFKS = action.payload;
    },

    resetSearchSettingsPlants: (state, action) => {
      state.customerPlantData = [];
      state.searchTerms = "";
      state.showAdvanceSearch = false;
      state.showAdvanceSort = false;
      state.selectedSearchCriteria = "Beginning";
      state.billingPlantId = "";
      state.changeColorCustomerPlantLookup = false;
      state.loading = true;
      state.searchedCustomerPlant = null;
      state.advancedSearchObject = null;
      state.advanceSortedValue = null;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.advanceSortingOrder = null;
      state.pageNoPlantsLookup = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const {
  setBillingPlantId,
  setChangeColorCustomerPlantLookup,
  setLoading,
  setAdvanceSortedValue,
  setSearchedCustomerPlant,
  setAdvancedSearchObject,
  setCustomerPlantData,
  setNormalSortValue,
  setNormalSortFlag,
  setShowAdvanceSort,
  setSelectedSearchCriteria,
  setAdvanceSortingCriteria,
  setSearchTerms,
  setShowAdvanceSearch,
  setPageNoPlantsLookup,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsPlants,
  setCustomerPlantFKList,
} = CustomerPlantsLookupSlice.actions;

export default CustomerPlantsLookupSlice.reducer;
