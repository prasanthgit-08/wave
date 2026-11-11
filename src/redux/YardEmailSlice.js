import { createSlice } from "@reduxjs/toolkit";

const YardEmailSlice = createSlice({
  name: "YardEmailSlice",
  initialState: {
    // fetch data

    listingData: [],
    // search filter
    searchTerm: "",
    searchCriteria: "Beginning",
    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    // editing
    selectedId: "",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    changesCancelled: false,
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    // form inputs
    isNameUnique: false,
    yardEmailPK: null,
    yardFK: "", // has to be changed in the future .Right now we dont have yard maintenance pgm
    name: "",
    email: "",
    bol: false,
    text: false,
    batch: false,
    bolsAsOnePDF: false,
    returnTextEmail: false,
    returnEmailBOLs: false,
    isEmailUnique: false,
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setYardEmailPK: (state, action) => {
      state.yardEmailPK = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
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
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },

    setYardFK: (state, action) => {
      state.yardFK = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setBol: (state, action) => {
      state.bol = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
    setBatch: (state, action) => {
      state.batch = action.payload;
    },
    setBOLsAsOnePDF: (state, action) => {
      state.bolsAsOnePDF = action.payload;
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
    setChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setIsNameUnique: (state, action) => {
      state.isNameUnique = action.payload;
    },
    setReturnTextEmail: (state, action) => {
      state.returnTextEmail = action.payload;
    },
    setIsEmailUnique: (state, action) => {
      state.isEmailUnique = action.payload;
    },
    setReturnEmailBOLs: (state, action) => {
      state.returnEmailBOLs = action.payload;
    },
    resetChanges: (state, action) => {
      state.yardEmailPK = null;
      state.name = "";
      state.email = "";
      state.bol = false;
      state.text = false;
      state.batch = false;
      state.bolsAsOnePDF = false;
      state.isNameUnique = false;
      state.returnTextEmail = false;
      state.returnEmailBOLs = false;
      state.isEmailUnique = false;
    },
    resetYardEmail: (state, action) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.listingData = [];
      state.selectedId = "";
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
  },
});

export const {
  setListingData,
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedId,
  setYardEmailPK,
  setYardFK,
  setLoader,
  setName,
  setEmail,
  setBol,
  setText,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  setChangesCancelled,
  resetChanges,
  setIsNameUnique,
  setBatch,
  setAllBolInOnePdf,
  setBOLsAsOnePDF,
  setReturnTextEmail,
  setReturnEmailBOLs,
  setIsEmailUnique,
} = YardEmailSlice.actions;

export default YardEmailSlice.reducer;
