import { createSlice } from "@reduxjs/toolkit";

const EmailRecipientSlice = createSlice({
  name: "EmailRecipient",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    searchTerm: "",
    searchCriteria: "Beginning",
    changeColor: false,
    listingData: [],
    changesCancelled: false,
    normalSortValue: null,
    normalSortFlag: false,
    viewDetail: false,
    editFormData: null,
    emailRecipientPK: "",
    emailRecipientData: null,
    isEmailRecipientDataLoading: false,

    //input
    recipientUserFK: "",
    recipientTableField: "",
    recipientSubTable: "",
    recipientFieldName: "",
    name: "",
    email: "",
    emailCondition: "",
    isValidEmail: false,
  },

  reducers: {
    //Browse Page
    setId: (state, action) => {
      state.id = action.payload;
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
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setEmailRecipientPK: (state, action) => {
      state.emailRecipientPK = action.payload;
    },
    setEmailRecipientData: (state, action) => {
      state.emailRecipientData = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setIsEmailRecipientDataLoading: (state, action) => {
      state.isEmailRecipientDataLoading = action.payload;
    },

    //Input
    setRecipientUserFK: (state, action) => {
      state.recipientUserFK = action.payload;
    },
    setRecipientTableField: (state, action) => {
      state.recipientTableField = action.payload;
    },
    setRecipientSubTable: (state, action) => {
      state.recipientSubTable = action.payload;
    },
    setRecipientFieldName: (state, action) => {
      state.recipientFieldName = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setEmailCondition: (state, action) => {
      state.emailCondition = action.payload;
    },
    setIsValidEmail: (state, action) => {
      state.isValidEmail = action.payload;
    },

    resetChanges: (state, action) => {
      state.emailRecipientPK = null;
      state.recipientUserFK = "";
      state.recipientTableField = "";
      state.recipientSubTable = "";
      state.recipientFieldName = "";
      state.name = "";
      state.email = "";
      state.emailCondition = "";
      state.isValidEmail = false;
    },

    resetEmailRecipient: (state, action) => {
      state.searchTerm = "";
      state.pageNumber = 0;
      state.searchCriteria = "Beginning";
      state.id = "";
      state.changeColor = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
  },
});

export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSearchTerm,
  setSearchCriteria,
  setChangeColor,
  setListingData,
  setChangesCancelled,
  setNormalSortValue,
  setNormalSortFlag,
  setEditFormData,
  setEmailRecipientPK,
  setEmailRecipientData,
  setViewDetail,
  setIsEmailRecipientDataLoading,
  resetChanges,
  resetEmailRecipient,
  //Input
  setRecipientUserFK,
  setRecipientTableField,
  setRecipientSubTable,
  setRecipientFieldName,
  setName,
  setEmail,
  setEmailCondition,
  setIsValidEmail,
} = EmailRecipientSlice.actions;

export default EmailRecipientSlice.reducer;
