import { createSlice } from "@reduxjs/toolkit";

const YardCheckinSecondShuttleSlice = createSlice({
  name: "yardCheckinSecondShuttle",
  initialState: {
    listingData: [],
    selectedId: null,
    viewDetail: false,
    selectedObject: null,
    // pagination
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalElements: 0,
    // normal sorting
    sortValue: "",
    sortFlag: false,
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setSelectedObject: (state, action) => {
      state.selectedObject = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },

    resetSecondShuttleBrowse: (state) => {
      state.listingData = [];
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      state.selectedId = null;
      state.sortValue = null;
      state.sortFlag = false;
    },
  },
});

export const {
  setListingData,
  setSelectedId,
  setViewDetail,
  setSelectedObject,
  setPageNumber,
  setPageSize,
  setTotalPages,
  setTotalElements,
  setSortValue,
  setSortFlag,
  resetSecondShuttleBrowse,
} = YardCheckinSecondShuttleSlice.actions;

export default YardCheckinSecondShuttleSlice;
