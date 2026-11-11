import { createSlice } from "@reduxjs/toolkit";

const ShuttleCitysSlice = createSlice({
  name: "shuttleCitys",
  initialState: {
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    browseNavigation: [],

    //search
    shuttleCitysData: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    id: "",
    primaryKey: "",
    changeColor: false,
    viewDetail: false,
    editFormData: null,
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,

    //editing
    checkCity: "",
    city: "",
    outbound: false,
    reload: false,
    radioValue: "outbound",
  },
  reducers: {
    setShuttleCitysData: (state, action) => {
      state.shuttleCitysData = action.payload;
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
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
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
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setOutbound: (state, action) => {
      state.outbound = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setCheckCity: (state, action) => {
      state.checkCity = action.payload;
    },
    setRadioValue: (state, action) => {
      state.radioValue = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    resetChanges: (state, action) => {
      state.primaryKey = "";
      state.city = "";
      state.outbound = false;
      state.reload = false;
      state.checkCity = "";
      state.editFormData = null;
    },
    resetShuttleCity: (state, action) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.viewDetail = [];
      state.selectedId = "";
      state.pageNumber = 0;
      //state.duplicateRecord = false;
    },
  },
});
export const {
  setPageNumber,
  setTotalElements,
  setTotalPages,
  resetShuttleCity,
  setBrowseNavigation,
  setShuttleCitysData,
  setSearchTerm,
  setSearchCriteria,
  setNormalSortValue,
  setNormalSortFlag,
  setId,
  setLoader,
  setPrimaryKey,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  resetChanges,
  setCity,
  setOutbound,
  setReload,
  toggleChangesCancelled,
  setCheckCity,
  setRadioValue,
} = ShuttleCitysSlice.actions;
export default ShuttleCitysSlice.reducer;
