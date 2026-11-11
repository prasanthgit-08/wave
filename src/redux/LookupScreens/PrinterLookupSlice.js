import { createSlice } from "@reduxjs/toolkit";
const PrinterLookupSlice = createSlice({
  name: "printerLookup",
  initialState: {
    printerData: [],
    // search filter
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    id: "",
    changeColor: false,
    normalSortValue: null,
    normalSortFlag: false,
    rowPosition: [],
    columnPosition: [],
    loading: true,

    // pagination
    pageNumberPrinterLookup: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setPrinterData: (state, action) => {
      state.printerData = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setPageNumberPrinterLookup: (state, action) => {
      state.pageNumberPrinterLookup = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortPositions: (state, action) => {
      state.rowPosition = action.payload;
      state.columnPosition = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetSearchSettingsPrinter: (state, action) => {
      state.printerData = [];
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.changeColor = false;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumberPrinterLookup = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.id = "";
      state.loading = true;
    },
  },
});

export const {
  setId,
  setPrinterData,
  setChangeColor,
  setYardsData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerm,
  setSortPositions,
  setTotalElements,
  setTotalPages,
  resetSearchSettingsPrinter,
  setLoading,
  setPageNumberPrinterLookup,
} = PrinterLookupSlice.actions;
export default PrinterLookupSlice.reducer;
