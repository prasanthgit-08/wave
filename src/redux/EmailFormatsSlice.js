import { createSlice } from "@reduxjs/toolkit";

const EmailFormatsSlice = createSlice({
  name: "EmailFormats",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    searchTerm: "",
    searchCriteria: "Beginning",
    changeColor: false,
    listingData: [],
    viewDetail: false,
    editFormData: null,
    emailFormatPK: "",
    emailFormatData: null,
    changesCancelled: false,
    isEmailFormatDataLoading: false,

    //input
    // General Tab
    objectKey: "",
    description: "",
    senderUserFK: "",
    senderTypeFK: "",
    databaseTableName: "",
    recordPrimaryKey: "",
    isGeneralTabValid: false,

    //format
    emailBodyFormat: "",
    isFormatTabValid: false,

    //Subject
    emailSubject: "",
    isSubjectTabValid: false,

    //normal sort
    normalSortValue: null,
    normalSortFlag: false,

    //validation
    isDescriptionUnique: true,
    isObjectKeyUnique: true,
    isTableExists: true,
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
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setEmailFormatPK: (state, action) => {
      state.emailFormatPK = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = action.payload;
    },
    setIsEmailFormatDataLoading: (state, action) => {
      state.isEmailFormatDataLoading = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setEmailFormatData: (state, action) => {
      state.emailFormatData = action.payload;
    },

    //General Tab
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setIsDescriptionUnique: (state, action) => {
      state.isDescriptionUnique = action.payload;
    },
    setObjectKey: (state, action) => {
      state.objectKey = action.payload;
    },
    setIsObjectKeyUnique: (state, action) => {
      state.isObjectKeyUnique = action.payload;
    },
    setSenderUserFK: (state, action) => {
      state.senderUserFK = action.payload;
    },
    setSenderTypeFK: (state, action) => {
      state.senderTypeFK = action.payload;
    },
    setDatabaseTableName: (state, action) => {
      state.databaseTableName = action.payload;
    },
    setRecordPrimaryKey: (state, action) => {
      state.recordPrimaryKey = action.payload;
    },
    setIsGeneralTabValid: (state, action) => {
      state.isGeneralTabValid = action.payload;
    },
    setIsTableExists: (state, action) => {
      state.isTableExists = action.payload;
    },

    //Format Tab
    setEmailBodyFormat: (state, action) => {
      state.emailBodyFormat = action.payload;
    },
    setIsFormatTabValid: (state, action) => {
      state.isFormatTabValid = action.payload;
    },

    //Subject Tab
    setEmailSubject: (state, action) => {
      state.emailSubject = action.payload;
    },
    setIsSubjectTabValid: (state, action) => {
      state.isSubjectTabValid = action.payload;
    },

    resetChanges: (state, action) => {
      state.emailFormatPK = null;
      state.objectKey = "";
      state.description = "";
      state.senderUserFK = "";
      state.senderTypeFK = "";
      state.databaseTableName = "";
      state.recordPrimaryKey = "";
      state.emailBodyFormat = "";
      state.emailSubject = "";
    },

    resetEmailFormat: (state, action) => {
      state.searchTerm = "";
      state.pageNumber = 0;
      state.searchCriteria = "Beginning";
      state.id = "";
      state.changeColor = false;
      state.isDescriptionUnique = true;
      state.isObjectKeyUnique = true;
      state.isTableExists = true;
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
  setViewDetail,
  setEditFormData,
  setEmailFormatPK,
  setFormDescriptionId,
  setChangesCancelled,
  setIsEmailFormatDataLoading,
  setNormalSortValue,
  setNormalSortFlag,
  setEmailFormatData,
  setIsDescriptionUnique,
  setDescription,
  setObjectKey,
  setIsObjectKeyUnique,
  setSenderUserFK,
  setSenderTypeFK,
  setDatabaseTableName,
  setRecordPrimaryKey,
  setIsGeneralTabValid,
  setEmailBodyFormat,
  setIsFormatTabValid,
  setEmailSubject,
  setIsSubjectTabValid,
  resetChanges,
  resetEmailFormat,
  setIsTableExists,
} = EmailFormatsSlice.actions;

export default EmailFormatsSlice.reducer;
