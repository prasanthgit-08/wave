import { createSlice } from "@reduxjs/toolkit";

const DealerContactsSlice = createSlice({
  name: "dealerContactSlice",
  initialState: {
    contact: "",
    name: "",
    position: "",
    phone: "",
    fax: "",
    email: "",
    birthday: "",
    callback: "",
    lastcall: "",
    note: "",
    contactExist: false,
    // edit mode

    editMode: false,

    selectedId: "",
    contactExistData: "",

    // pagination

    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    dealerContactsData: [],

    // filters

    searchTerm: "",
    searchCrit: "Beginning",
    sortType: null,
    sortValue: null,
    isBirtdayValid: true,
    isCallBackValid: true,
    isLastCallValid: true,
  },
  reducers: {
    // filters

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCrit: (state, action) => {
      state.searchCrit = action.payload;
    },

    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setContactExistData: (state, action) => {
      state.contactExistData = action.payload;
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
    setLastCall: (state, action) => {
      state.lastcall = action.payload;
    },
    setNote: (state, action) => {
      state.note = action.payload;
    },

    // pagination
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setDealerContactsData: (state, action) => {
      state.dealerContactsData = action.payload;
    },
    resetDatas: (state) => {
      state.contact = "";
      state.name = "";
      state.position = "";
      state.fax = "";
      state.phone = "";
      state.email = "";
      state.birthday = "";
      state.callback = "";
      state.lastcall = "";
      state.note = "";
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setContactExist: (state, action) => {
      state.contactExist = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
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
  },
});

export const {
  setContact,
  setName,
  setPosition,
  setPhone,
  setFax,
  setEmail,
  setBirthday,
  setCallback,
  setLastCall,
  setNote,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setDealerContactsData,
  resetDatas,
  setEditMode,
  setContactExist,
  setSelectedId,
  setSearchCrit,
  setSearchTerm,
  setSortType,
  setSortValue,
  setContactExistData,
  setIsBirtdayValid,
  setIsLastCallValid,
  setIsCallBackValid,
} = DealerContactsSlice.actions;

export default DealerContactsSlice.reducer;
