import { createSlice } from "@reduxjs/toolkit";

import React from "react";

const PrinterSearchFilterSlice = createSlice({
  name: "printerFilter",
  initialState: {
    id: "",
    changeColor: false,
    searchCriteria: "Beginning",
    printerDataList: [],
    searchTerms: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    loader: true,
    sortValue: "",
    sortType: false,

    descriptionError: "",
  },
  reducers: {
    setDescriptionError: (state, action) => {
      state.descriptionError = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
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
    setId: (state, action) => {
      state.id = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },

    setPrinterDataList: (state, action) => {
      state.printerDataList = action.payload;
    },

    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    resetSearchSettings: (state, action) => {
      state.changeColor = false;
      state.searchCriteria = "Beginning";
      state.searchTerms = "";
      state.pageNumber = 0;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
  },
});

export const {
  setId,
  setChangeColor,
  setComplete,
  setSearchCriteria,
  setPrinterDataList,
  setSearchTerms,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setLoader,
  resetSearchSettings,
  setSortValue,
  setSortType,
  setDescriptionError,
  toggleChangesCancelled,
} = PrinterSearchFilterSlice.actions;

export const printer = (state) => state.printerFilter.value;

export default PrinterSearchFilterSlice.reducer;
