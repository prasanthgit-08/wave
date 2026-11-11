import { createSlice } from "@reduxjs/toolkit";

const RegionsSearchFilterSlice = createSlice({
  name: "regionsFilter",
  initialState: {
    id: "",
    changeColor: false,
    searchCriteria: "Beginning",
    regionsDataList: [],
    searchTerm: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    sortValue: null,
    sortFlag: false,
    loader: true,
  },
  reducers: {
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

    setRegionsDataList: (state, action) => {
      state.regionsDataList = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },

    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },

    setSearchTerms: (state, action) => {
      state.searchTerm = action.payload;
    },
    resetSearchSettings: (state, action) => {
      state.changeColor = false;
      state.searchCriteria = "Beginning";
      state.searchTerm = "";
      state.pageNumber = 0;
      state.sortValue = null;
      state.sortFlag = false;
    },
  },
});

export const {
  setId,
  setChangeColor,
  setComplete,
  setSearchCriteria,
  setRegionsDataList,
  setSearchTerms,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setLoader,
  setSortFlag,
  setSortValue,
  resetSearchSettings,
} = RegionsSearchFilterSlice.actions;

export const regions = (state) => state.regionsFilter.value;

export default RegionsSearchFilterSlice.reducer;
