import { createSlice } from "@reduxjs/toolkit";

const DriverCheckinHistorySlice = createSlice({
  name: "DriverCheckinHistorySlice",
  initialState: {
    id: "",
    changeColor: false,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    browseNavigation: [],
    viewDetail: false,
    driverCheckinHistoryData: [],
    loader: true,
    changesCancelled: false,
    clearValue: false,
    normalSortValue: null,
    normalSortFlag: false,
    selectedCheckinNote: "",
    selectedRecordId: null,
  },

  reducers: {
    resetClose: (state, action) => {
      state.pageNumber = 0;
      state.changeColor = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.selectedCheckinNote = "";
      state.selectedRecordId = null;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },

    setId: (state, action) => {
      state.id = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
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
    setDriverCheckinHistoryData: (state, action) => {
      state.driverCheckinHistoryData = action.payload;
    },

    setClearValue: (state, action) => {
      state.clearValue = !state.clearValue;
    },
    setSelectedCheckinNote: (state, action) => {
      state.selectedCheckinNote = action.payload;
    },
    setSelectedRecordId: (state, action) => {
      state.selectedRecordId = action.payload;
    },
  },
});

export const {
  toggleChangesCancelled,
  setClearValue,
  resetChanges,
  resetClose,
  setNotes,
  setId,
  setLoader,
  setChangeColor,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setBrowseNavigation,
  setViewDetail,
  setDriverCheckinHistoryData,
  setNormalSortValue,
  setNormalSortFlag,
  setOnCancel,
  setSelectedCheckinNote,
  setSelectedRecordId,
} = DriverCheckinHistorySlice.actions;

export const yard = (state) => state.YardMaintenanceSlice.value;

export default DriverCheckinHistorySlice.reducer;
