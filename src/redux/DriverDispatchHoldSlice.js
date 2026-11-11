import { createSlice } from "@reduxjs/toolkit";

const DriverDispatchHoldSlice = createSlice({
  name: "driverDispatchHold",
  initialState: {
    listingData: [],
    formData: null,
    driverDispatchHold: null,
    selectedId: null,
    viewDetail: false,
    disableSave: true,
    // search filter
    searchTerm: "",
    searchCriteria: "Beginning",
    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    // normal sorting
    sortValue: null,
    sortFlag: false,
    restricted: false,
    dispatchers: false,
    maintenancePgm: true,
    dispatchLoading: false,
    isValidEntry: false,
    paginationLoader: true,
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setDispatchLoading: (state, action) => {
      state.dispatchLoading = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setDriverDispatchHold: (state, action) => {
      state.driverDispatchHold = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },
    setRestricted: (state, action) => {
      state.restricted = action.payload;
    },
    setDispatchers: (state, action) => {
      state.dispatchers = action.payload;
    },
    setMaintenancePgm: (state, action) => {
      state.maintenancePgm = action.payload;
    },
    setIsValidEntry: (state, action) => {
      state.isValidEntry = action.payload;
    },
    setPaginationLoader: (state, action) => {
      state.paginationLoader = action.payload;
    },

    resetDriverDispatchHold: (state) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.listingData = [];
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      state.selectedId = null;
      state.sortValue = null;
      state.sortFlag = false;
      state.restricted = false;
      state.dispatchers = false;
      state.isValidEntry = false;
      state.paginationLoader = true;
    },
  },
});

export const {
  setListingData,
  setFormData,
  setDriverDispatchHold,
  setSelectedId,
  setViewDetail,
  setDisableSave,
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSortValue,
  setSortFlag,
  resetDriverDispatchHold,
  setRestricted,
  setDispatchers,
  setMaintenancePgm,
  setDispatchLoading,
  setIsValidEntry,
  setPaginationLoader,
} = DriverDispatchHoldSlice.actions;

export default DriverDispatchHoldSlice.reducer;
