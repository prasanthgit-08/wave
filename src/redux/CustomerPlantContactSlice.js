import { createSlice } from "@reduxjs/toolkit";
const CustomerPlantContactSlice = createSlice({
  name: "CustomerPlantContactSlice",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    plantContactData: [],
    contactData: null,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    browseNavigation: [],
    changeColor: false,
    editFormData: null,
    //input
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
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    checkContact: "",
    changesCancelled: false,
    plantPk: "",
    isBirtdayValid: true,
    isCallBackValid: true,
    isLastCallValid: true,
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
    setPlantContactData: (state, action) => {
      state.plantContactData = action.payload;
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
    setPlantPk: (state, action) => {
      state.plantPk = action.payload;
    },
    setIsBirtdayValid: (state, action) => {
      state.isBirtdayValid = action.payload;
    },
    setIsCallBackValid: (state, action) => {
      state.isCallBackValid = action.payload;
    },
    setIsLastCallValid: (state, action) => {
      state.isLastCallValid = action.payload;
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
    },
    resetClose: (state, action) => {
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
  setPlantContactData,
  setContactData,
  setPlantPk,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
  setBrowseNavigation,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setEditFormData,
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
  resetChanges,
  setCheckContact,
  toggleChangesCancelled,
  resetClose,
  setIsBirtdayValid,
  setIsLastCallValid,
  setIsCallBackValid,
} = CustomerPlantContactSlice.actions;

export const customerPlantContact = (state) => state.CustomerPlantContact.value;
export default CustomerPlantContactSlice.reducer;
