import { createSlice } from "@reduxjs/toolkit";
const AlternateContactSlice = createSlice({
  name: "AlternateContact",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    alternateContactData: [],
    contactData: null,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    browseNavigation: [],
    changeColor: false,
    editFormData: null,
    //input
    name: "",
    contact: "",
    phone: "",
    email: "",
    fax: "",
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    checkContact: "",
    changesCancelled: false,
  },
  reducers: {
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
    setAlternateContactData: (state, action) => {
      state.alternateContactData = action.payload;
    },
    setContactData: (state, action) => {
      state.contactData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
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
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    //input
    setName: (state, action) => {
      state.name = action.payload;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setFax: (state, action) => {
      state.fax = action.payload;
    },
    resetChanges: (state, action) => {
      state.email = "";
      state.fax = "";
      state.contact = "";
      state.phone = "";
      state.name = "";
      state.checkContact = "";
    },
    resetAlternateContact: (state, action) => {
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
    setCheckContact: (state, action) => {
      state.checkContact = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setAlternateContactData,
  setContactData,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
  setBrowseNavigation,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setEditFormData,
  setContact,
  setEmail,
  setName,
  setPhone,
  setFax,
  resetChanges,
  setCheckContact,
  toggleChangesCancelled,
  resetAlternateContact,
} = AlternateContactSlice.actions;

export const alternateContact = (state) => state.AlternateContact.value;
export default AlternateContactSlice.reducer;
