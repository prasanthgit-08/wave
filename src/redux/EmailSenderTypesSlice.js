import { createSlice } from "@reduxjs/toolkit";

const EmailSenderTypesSlice = createSlice({
  name: "emailSenderTypes",
  initialState: {
    listingData: [],
    formData: null,
    emailSenderTypes: null,
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
    emailSenderTypesvalid: false,
    duplicateDescription: false,
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setEmailSenderTypes: (state, action) => {
      state.emailSenderTypes = action.payload;
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
    setEmailSenderTypesvalid: (state, action) => {
      state.emailSenderTypesvalid = action.payload;
    },
    setDuplicateDescription: (state, action) => {
      state.duplicateDescription = action.payload;
    },

    resetEmailSenderTypes: (state) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.listingData = [];
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      state.selectedId = null;
      state.sortValue = null;
      state.sortFlag = false;
      state.emailSenderTypesvalid = false;
      state.duplicateDescription = false;
    },
  },
});

export const {
  setListingData,
  setFormData,
  setEmailSenderTypes,
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
  resetEmailSenderTypes,
  setEmailSenderTypesvalid,
  setDuplicateDescription,
} = EmailSenderTypesSlice.actions;

export default EmailSenderTypesSlice.reducer;
