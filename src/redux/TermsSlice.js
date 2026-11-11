import { createSlice } from "@reduxjs/toolkit";

const TermsSlice = createSlice({
  name: "TermsSlice",
  initialState: {
    id: "",
    searchCriteria: "Beginning",
    listingData: [],
    searchTerm: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    descriptionValid: true,
    termValid: true,
    termsCodeValid: true,

    //editing
    description: "",
    terms: "",
    invoiceDays: "",
    termsCode: "",
    viewDetail: false,
    changeColor: false,
    editFormData: null,

    //normal sort
    normalSortValue: null,
    normalSortFlag: false,
  },

  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTermsCodeValid: (state, action) => {
      state.termsCodeValid = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },

    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setTerms: (state, action) => {
      state.terms = action.payload;
    },
    setInvoiceDays: (state, action) => {
      state.invoiceDays = action.payload;
    },
    setTermsCode: (state, action) => {
      state.termsCode = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },

    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },

    setDescriptionValid: (state, action) => {
      state.descriptionValid = action.payload;
    },
    setTermValid: (state, action) => {
      state.termValid = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },

    resetChanges: (state, action) => {
      state.description = "";
      state.descriptionValid = true;
      state.terms = "";
      state.invoiceDays = 0;
      state.termsCode = "";
      state.viewDetail = false;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.termValid = true;
      state.termsCodeValid = true;
    },
  },
});

export const {
  setId,
  setPageNumber,
  setListingData,
  setTotalElements,
  setTotalPages,
  setSearchTerm,
  setSearchCriteria,
  setDescription,
  setTerms,
  setInvoiceDays,
  setTermsCode,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  resetChanges,
  setNormalSortValue,
  setNormalSortFlag,
  setDescriptionValid,
  setTermValid,
  toggleChangesCancelled,
  setTermsCodeValid,
} = TermsSlice.actions;

export default TermsSlice.reducer;
