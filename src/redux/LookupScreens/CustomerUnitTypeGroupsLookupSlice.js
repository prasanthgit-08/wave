import { createSlice } from "@reduxjs/toolkit";

const CustomerUnitTypeGroupsLookupSlice = createSlice({
  name: "CustomerUnitTypeGroupsLookup",
  initialState: {
    customerUnitTypeGroupsData: [],

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

    searchDescription: "",
    searchCustomer: "",
    searchPlant: "",
    searchPlantGroup: "",
    searchCustomerGroup: "",

    advancedSearchString: "",
    advancedSearchByPayload: null,
    checkAllAdvancedSearchBy: false,

    selectedId: "",
    changeColor: false,
    loading: true,
  },
  reducers: {
    setCustomerUnitTypeGroupsData: (state, action) => {
      state.customerUnitTypeGroupsData = action.payload;
    },
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
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

    setSearchDescription: (state, action) => {
      state.searchDescription = action.payload;
    },
    setSearchCustomer: (state, action) => {
      state.searchCustomer = action.payload;
    },
    setSearchPlant: (state, action) => {
      state.searchPlant = action.payload;
    },
    setSearchPlantGroup: (state, action) => {
      state.searchPlantGroup = action.payload;
    },
    setSearchCustomerGroup: (state, action) => {
      state.searchCustomerGroup = action.payload;
    },

    resetunitTypeLookup: (state, action) => {
      state.customerUnitTypeGroupsData = [];
      state.searchTerms = "";
      state.showAdvanceSearch = false;
      state.selectedSearchCriteria = "Beginning";
      state.selectedId = "";
      state.changeColor = false;
      state.loading = true;
      state.advancedSearchObject = null;
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
  setCustomerUnitTypeGroupsData,
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
  setSearchDescription,
  setSearchCustomer,
  setSearchPlant,
  setSearchPlantGroup,
  setSearchCustomerGroup,
  resetunitTypeLookup,
} = CustomerUnitTypeGroupsLookupSlice.actions;

export default CustomerUnitTypeGroupsLookupSlice.reducer;
