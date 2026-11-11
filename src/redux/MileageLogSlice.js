import { createSlice } from "@reduxjs/toolkit";

const MileageLogSlice = createSlice({
  name: "driverMileageLogs",
  initialState: {
    listingData: [],
    formData: null,
    searchTerm: "",
    searchCriteria: "All",
    searchStatus: "All",
    pageNumber: 0,
    loadedPageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    sortValue: null,
    sortFlag: false,
    changeColor: false,
    active: true,
    selectionType: "safety miles",
    beginningDate: null,
    endDate: null,
    isBeginningDateValid: true,
    isEndDateValid: true,
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSearchStatus: (state, action) => {
      state.searchStatus = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setLoadedPageNumber: (state, action) => {
      state.loadedPageNumber = action.payload;
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
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setSelectionType: (state, action) => {
      state.selectionType = action.payload;
    },
    setBeginningDate: (state, action) => {
      state.beginningDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setIsBeginningDateValid: (state, action) => {
      state.isBeginningDateValid = action.payload;
    },
    setIsEndDateValid: (state, action) => {
      state.isEndDateValid = action.payload;
    },

    resetDriverMileageLogs: (state) => {
      state.formData = null;
      state.searchTerm = "";
      state.searchCriteria = "All";
      state.searchStatus = "All";
      state.pageNumber = 0;
      state.loadedPageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.sortValue = null;
      state.sortFlag = false;
      state.changeColor = false;
      state.active = true;
      state.selectionType = "safety miles";
      state.beginningDate = null;
      state.endDate = null;
      state.isBeginningDateValid = true;
      state.isEndDateValid = true;
    },
  },
});

export const {
  setListingData,
  setFormData,
  setSearchTerm,
  setSearchCriteria,
  setSearchStatus,
  setPageNumber,
  setLoadedPageNumber,
  setTotalPages,
  setTotalElements,
  setSortValue,
  setSortFlag,
  setChangeColor,
  setActive,
  setSelectionType,
  resetDriverMileageLogs,
  setBeginningDate,
  setEndDate,
  setIsBeginningDateValid,
  setIsEndDateValid,
} = MileageLogSlice.actions;

export default MileageLogSlice.reducer;
