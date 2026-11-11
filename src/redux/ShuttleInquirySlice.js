import { createSlice } from "@reduxjs/toolkit";

const ShuttleInquirySlice = createSlice({
  name: "shuttleInquiry",
  initialState: {
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    loader: true,

    //normal sort
    sortFlag: false,
    sortFieldName: "",

    //search
    shuttleData: [],
    shuttleSearchObject: null,
    editFormData: null,
    unitNumberLast5: "",
    isDateValid: true,

    //Details
    selectedId: "",

    //show the selected row
    changeColor: false,

    //For company
    companyFK: "",
    companyName: "",
    currentCompanyName: "",

    //For export button functionality
    exportObject: null,
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setId: (state, action) => {
      state.id = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setAllShuttleData: (state, action) => {
      state.shuttleData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    resetChanges: (state, action) => {
      state.selectedId = "";
      state.shuttleData = [];
      state.shuttleSearchObject = null;
      state.editFormData = null;
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.sortFlag = false;
      state.sortFieldName = "";
      state.changeColor = false;
      state.selectedId = "";
      state.companyFK = "";
      state.companyName = "";
      state.currentCompanyName = "";
      state.exportObject = null;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setShuttleSearchObject: (state, action) => {
      state.shuttleSearchObject = action.payload;
    },
    setUnitNumberLast5: (state, action) => {
      state.unitNumberLast5 = action.payload;
    },
    setSortFieldName: (state, action) => {
      state.sortFieldName = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setCompanyFK: (state, action) => {
      state.companyFK = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setCurrentCompanyName: (state, action) => {
      state.currentCompanyName = action.payload;
    },
    setExportObject: (state, action) => {
      state.exportObject = action.payload;
    },
    setIsDateValid: (state, action) => {
      state.isDateValid = action.payload;
    },
  },
});
export const {
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setId,
  setAllShuttleData,
  setPrimaryKey,
  setEditFormData,
  setLoader,
  resetChanges,
  setShuttleSearchObject,
  setUnitNumberLast5,
  setSortFieldName,
  setSortFlag,
  setSelectedId,
  setChangeColor,
  setCompanyFK,
  setCompanyName,
  setCurrentCompanyName,
  setExportObject,
  setIsDateValid,
} = ShuttleInquirySlice.actions;
export default ShuttleInquirySlice.reducer;
