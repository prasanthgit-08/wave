import { createSlice } from "@reduxjs/toolkit";

const DriverLookupSlice = createSlice({
  name: "driverLookup",
  initialState: {
    // Search Filter
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    statusType: "All",
    driverType: "All",
    cityType: "Mailing",
    showAdvancedSearch: false,
    showAdvancedSort: false,
    // Table Listing
    loading: true,
    listingData: [],
    selectedId: null,
    normalSortValue: null,
    normalSortFlag: false,
    // Pagination
    pageNumber: 0,
    totalElements: 0,
    totalPages: 0,
    // Advanced Search
    advancedSearchObject: null, //For common
    advancedSearchPayload: null, //For Advanced search payload which goes
    // Advanced Sort
    advancedSortingOrder: null,
    advancedSortingCombination: null,
    // Advanced Search Sidebar
    advancedSearchString: "",
    checkAllAdvancedSearchBy: false,
    advancedSearchByInputs: {
      dba: false,
      address: false,
      ssn: false,
      phone: false,
      email: false,
      vin: false,
      licensePlate: false,
      nickName: false,
      driversLicense: false,
      notes: false,
    },
    // Misc
  },
  reducers: {
    // Search Filter
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setStatusType: (state, action) => {
      state.statusType = action.payload;
    },
    setDriverType: (state, action) => {
      state.driverType = action.payload;
    },
    setCityType: (state, action) => {
      state.cityType = action.payload;
    },
    toggleAdvancedSearch: (state, action) => {
      state.showAdvancedSearch = !state.showAdvancedSearch;
    },
    toggleAdvancedSort: (state, action) => {
      state.showAdvancedSort = !state.showAdvancedSort;
    },
    // Table Listing
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    // Pagination
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    // Advanced Search
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setAdvancedSearchPayload: (state, action) => {
      state.advancedSearchPayload = action.payload;
    },
    // Advanced Sort
    setAdvancedSortingOrder: (state, action) => {
      state.advancedSortingOrder = action.payload;
    },
    setAdvancedSortingCombination: (state, action) => {
      state.advancedSortingCombination = action.payload;
    },
    // Advanced Search Sidebar
    setAdvancedSearchString: (state, action) => {
      state.advancedSearchString = action.payload;
    },
    setCheckAllAdvancedSearchBy: (state, action) => {
      state.checkAllAdvancedSearchBy = action.payload;

      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = action.payload;
      });
    },
    setAdvancedSearchByInputs: (state, { payload }) => {
      state.advancedSearchByInputs = {
        ...state.advancedSearchByInputs,
        [payload.name]: payload.checked,
      };
    },
    // Miscellaneous
    clearAdvancedSearch: (state, action) => {
      state.advancedSearchObject = null;
      state.advancedSearchPayload = null;
      state.advancedSearchString = "";
      state.checkAllAdvancedSearchBy = false;
      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = false;
      });
    },
    resetDriverLookup: (state, action) => {
      // Search Filter
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.statusType = "All";
      state.driverType = "All";
      state.cityType = "Mailing";
      state.showAdvancedSearch = false;
      state.showAdvancedSort = false;
      // Table Listing
      state.loading = true;
      state.listingData = [];
      state.selectedId = null;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      // Pagination
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      // Advanced Search
      state.advancedSearchObject = null;
      state.advancedSearchPayload = null;
      // Advanced Sort
      state.advancedSortingOrder = null;
      state.advancedSortingCombination = null;
      // Advanced Search Sidebar
      state.advancedSearchString = "";
      state.checkAllAdvancedSearchBy = false;
      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = false;
      });
    },
  },
});

export const {
  setSearchTerm,
  setSelectedSearchCriteria,
  setStatusType,
  setDriverType,
  setCityType,
  toggleAdvancedSearch,
  toggleAdvancedSort,
  setListingData,
  setLoading,
  setSelectedId,
  setNormalSortValue,
  setNormalSortFlag,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setAdvancedSortingOrder,
  setAdvancedSortingCombination,
  setAdvancedSearchString,
  setCheckAllAdvancedSearchBy,
  setAdvancedSearchByInputs,
  clearAdvancedSearch,
  resetDriverLookup,
} = DriverLookupSlice.actions;

export default DriverLookupSlice.reducer;
