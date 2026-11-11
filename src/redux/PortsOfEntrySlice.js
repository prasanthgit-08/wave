import { createSlice } from "@reduxjs/toolkit";
const PortsOfEntrySlice = createSlice({
  name: "PortsOfEntry",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    portsOfEntryData: [],
    saveFormData: null,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    sortValue: null,
    sortFlag: false,
    //input
    usCity: "",
    stateCode: "",
    canadianCity: "",
    provence: "",
    canadianCrossing: "",
    sequence: "",
    //uniquesequence
    changesCancelled: false,
    disableSave: true,
    portsOfEntry: null,
    usFlag: false,
    canadianFlag: false,
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
    setPortsOfEntryData: (state, action) => {
      state.portsOfEntryData = action.payload;
    },
    setSaveFormData: (state, action) => {
      state.saveFormData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
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
    //input
    setUsCity: (state, action) => {
      state.usCity = action.payload;
    },
    setStateCode: (state, action) => {
      state.stateCode = action.payload;
    },
    setCanadianCity: (state, action) => {
      state.canadianCity = action.payload;
    },
    setProvence: (state, action) => {
      state.provence = action.payload;
    },
    setCanadianCrossing: (state, action) => {
      state.canadianCrossing = action.payload;
    },
    setSequence: (state, action) => {
      state.sequence = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },

    resetChanges: (state, action) => {
      state.usCity = "";
      state.stateCode = "";
      state.canadianCity = "";
      state.provence = "";
      state.canadianCrossing = "";
      state.sequence = "";
    },
    resetPortsOfEntry: (state, action) => {
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.sortFlag = false;
      state.sortValue = null;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setPortsOfEntry: (state, action) => {
      state.portsOfEntry = action.payload;
    },
    setUsFlag: (state, action) => {
      state.usFlag = action.payload;
    },
    setCanadianFlag: (state, action) => {
      state.canadianFlag = action.payload;
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setPortsOfEntryData,
  setSaveFormData,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
  setBrowseNavigation,
  setChangeColor,
  setSortValue,
  setSortFlag,
  setEditFormData,
  setUsCity,
  setStateCode,
  setCanadianCity,
  setProvence,
  setCanadianCrossing,
  setSequence,
  //setChangesCancelled,
  setDisableSave,
  resetChanges,
  toggleChangesCancelled,
  resetPortsOfEntry,
  setPortsOfEntry,
  setUsFlag,
  setCanadianFlag,
} = PortsOfEntrySlice.actions;

export default PortsOfEntrySlice.reducer;
