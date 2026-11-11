import { createSlice } from "@reduxjs/toolkit";

const DriverTruckLookupSlice = createSlice({
  name: "DriverTrailerLookupSlice",
  initialState: {
    truckData: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    selectedId: "",
    sortValue: "",
    sortType: false,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    driverFK: 41,
    type: "Autocomplete",
    changeColor: true,
    truckLoading: false,
  },
  reducers: {
    setTruckData: (state, action) => {
      state.truckData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
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
    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setTruckLoading: (state, action) => {
      state.truckLoading = action.payload;
    },
    resetLookupData: (state, action) => {
      // state.truckData = [];
      state.searchCriteria = "Beginning";
      state.searchTerm = "";
      state.changeColor = false;
      state.selectedId = null;
      state.sortType = false;
      state.sortValue = "";
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});
export const {
  setTruckData,
  setSearchTerm,
  setSearchCriteria,
  setSelectedId,
  setSortValue,
  setSortType,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setDriverFK,
  setType,
  setChangeColor,
  setTruckLoading,
  resetLookupData,
} = DriverTruckLookupSlice.actions;

export default DriverTruckLookupSlice;
