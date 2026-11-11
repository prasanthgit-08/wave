import { createSlice } from "@reduxjs/toolkit";
const LoadHistorySlice = createSlice({
  name: "LoadHistorySlice",
  initialState: {
    historyData: [],
    dispatchData: null,
    checkIns: [],
    selectedDispatch: null,
    sortFlag: false,
    sortValue: null,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    checkinSortFlag: false,
    checkinSortValue: null,
    checkinPageNumber: 0,
    fromDate: null,
    toDate: null,
    toDateValid: true,
    fromDateValid: true,
    load: false,
    dateLoading: false,
  },
  reducers: {
    setHistoryData: (state, { payload }) => {
      state.historyData = payload;
    },
    setDispatchData: (state, { payload }) => {
      state.dispatchData = payload;
    },
    setCheckIns: (state, { payload }) => {
      state.checkIns = payload;
    },
    setSelectedDispatch: (state, { payload }) => {
      state.selectedDispatch = payload;
    },
    setSortFlag: (state, { payload }) => {
      state.sortFlag = payload;
    },
    setSortValue: (state, { payload }) => {
      state.sortValue = payload;
    },
    setPageNumber: (state, { payload }) => {
      state.pageNumber = payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCheckinSortFlag: (state, { payload }) => {
      state.checkinSortFlag = payload;
    },
    setCheckinSortValue: (state, { payload }) => {
      state.checkinSortValue = payload;
    },
    setChekinPageNumber: (state, { payload }) => {
      state.checkinPageNumber = payload;
    },
    setToDate: (state, { payload }) => {
      state.toDate = payload;
    },
    setFromDate: (state, { payload }) => {
      state.fromDate = payload;
    },
    setToDateValid: (state, { payload }) => {
      state.toDateValid = payload;
    },
    setFromDateValid: (state, { payload }) => {
      state.fromDateValid = payload;
    },
    setDateLoading: (state, { payload }) => {
      state.dateLoading = payload;
    },
    setload: (state, { payload }) => {
      state.load = payload;
    },
    resetBrowse: (state) => {
      state.pageNumber = 0;
      state.sortValue = null;
      state.sortFlag = false;
      state.selectedDispatch = null;
      state.historyData = [];
      state.totalElements = 0;
      state.totalPages = 0;
      state.toDate = new Date();
      state.fromdate = new Date();
    },
    resetEdit: (state) => {
      state.checkIns = [];
      state.dispatchData = null;
      state.checkinPageNumber = 0;
      state.checkinSortValue = null;
      state.checkinSortFlag = false;
    },
  },
});
export const {
  setHistoryData,
  setDispatchData,
  setCheckIns,
  setSelectedDispatch,
  setPageNumber,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setCheckinSortFlag,
  setCheckinSortValue,
  setChekinPageNumber,
  setFromDate,
  setToDate,
  setToDateValid,
  setFromDateValid,
  resetBrowse,
  resetEdit,
  setload,
  setDateLoading,
} = LoadHistorySlice.actions;

export default LoadHistorySlice.reducer;
