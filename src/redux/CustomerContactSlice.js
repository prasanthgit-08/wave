import { createSlice } from "@reduxjs/toolkit";

const CustomerContactSlice = createSlice({
  name: "customerContact",
  initialState: {
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    browseNavigation: [],
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    //search
    customerContactData: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    id: "",
    primaryKey: "",
    changeColor: false,
    viewDetail: false,
    editFormData: null,
    //editing
    contact: "",
    name: "",
    position: "",
    phone: "",
    fax: "",
    email: "",
    birthday: "",
    callback: "",
    lastcall: "",
    notes: "",
    tabIsValid: true,
    checkContact: "",
    customerId: "",
    disableSave: true,
  },
  reducers: {
    setCustomerContactData: (state, action) => {
      state.customerContactData = action.payload;
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

    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },

    setId: (state, action) => {
      state.id = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setPrimaryKey: (state, action) => {
      state.primaryKey = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },

    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setFax: (state, action) => {
      state.fax = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setBirthday: (state, action) => {
      state.birthday = action.payload;
    },
    setCallback: (state, action) => {
      state.callback = action.payload;
    },
    setLastcall: (state, action) => {
      state.lastcall = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setTabValid: (state, action) => {
      state.tabIsValid = action.payload;
    },
    setCheckContact: (state, action) => {
      state.checkContact = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    resetChanges: (state, action) => {
      state.primaryKey = "";
      state.name = "";
      state.contact = "";
      state.position = "";
      state.phone = "";
      state.fax = "";
      state.email = "";
      state.birthday = "";
      state.callback = "";
      state.lastcall = "";
      state.notes = "";
      state.checkContact = "";
      state.editFormData = null;
    },
  },
});

export const {
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setBrowseNavigation,
  setCustomerContactData,
  setSearchTerm,
  setSearchCriteria,
  setId,
  setNormalSortValue,
  setNormalSortFlag,
  setPrimaryKey,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  resetChanges,
  setContact,
  setName,
  setPosition,
  setPhone,
  setFax,
  setEmail,
  setBirthday,
  setCallback,
  setLastcall,
  setNotes,
  setTabValid,
  setCheckContact,
  setCustomerId,
  toggleChangesCancelled,
  setDisableSave,
} = CustomerContactSlice.actions;

export default CustomerContactSlice.reducer;
