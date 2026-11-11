import { createSlice } from "@reduxjs/toolkit";

const EmailAttachmentSlice = createSlice({
  name: "emailAttachment",
  initialState: {
    selectedId: null,
    listingData: [],
    responseData: null,
    emailAttachmentData: null,
    viewDetail: false,
    disableSave: false,
    changeColor: false,
    emailAttachmentPK: "",
    formDescriptionId: "",
    documentTypeDescriptionId: "",
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
    //input
    form: "",
    documentType: "",
    onlyEmailIf: "",
    alternateForm: "",
    isUniqueDescription: true,
    checkFormName: "",
    documentTypeDescription: "",
    formDescription: "",
  },

  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },

    setListingData: (state, action) => {
      state.listingData = action.payload;
    },

    setResponseData: (state, action) => {
      state.responseData = action.payload;
    },

    setEmailAttachmentData: (state, action) => {
      state.emailAttachmentData = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },

    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setEmailAttachmentPK: (state, action) => {
      state.emailAttachmentPK = action.payload;
    },

    setFormDescriptionId: (state, action) => {
      state.formDescriptionId = action.payload;
    },
    setDocumentTypeDescriptionId: (state, action) => {
      state.documentTypeDescriptionId = action.payload;
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

    setForm: (state, action) => {
      state.form = action.payload;
    },
    setDocumentType: (state, action) => {
      state.documentType = action.payload;
    },

    setOnlyEmailIf: (state, action) => {
      state.onlyEmailIf = action.payload;
    },

    setAlternateForm: (state, action) => {
      state.alternateForm = action.payload;
    },
    setIsUniqueDescription: (state, action) => {
      state.isUniqueDescription = action.payload;
    },
    setCheckFormName: (state, action) => {
      state.checkFormName = action.payload;
    },
    setDocumentTypeDescription: (state, action) => {
      state.documentTypeDescription = action.payload;
    },
    setFormDescription: (state, action) => {
      state.formDescription = action.payload;
    },

    resetChanges: (state, action) => {
      state.emailAttachmentPK = null;
      state.form = "";
      state.onlyEmailIf = "";
      state.alternateForm = "";
      state.changeColor = false;
      state.isUniqueDescription = true;
      state.checkFormName = "";
      state.documentTypeDescription = "";
      state.formDescription = "";
    },

    resetEmailAttachment: (state) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.listingData = [];
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      state.selectedId = null;
      state.sortValue = null;
      state.sortFlag = false;
      state.isUniqueDescription = true;
      state.checkFormName = "";
      state.documentTypeDescription = "";
      state.formDescription = "";
    },
  },
});

export const {
  setSelectedId,
  setListingData,
  setResponseData,
  setEmailAttachmentData,
  setViewDetail,
  setDisableSave,
  setChangeColor,
  setEmailAttachmentPK,
  setFormDescriptionId,
  setDocumentTypeDescriptionId,
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSortValue,
  setSortFlag,
  setForm,
  setDocumentType,
  setOnlyEmailIf,
  setAlternateForm,
  resetChanges,
  resetEmailAttachment,
  setIsUniqueDescription,
  setCheckFormName,
  setDocumentTypeDescription,
  setFormDescription,
} = EmailAttachmentSlice.actions;

export default EmailAttachmentSlice.reducer;
