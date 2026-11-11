import { createSlice } from "@reduxjs/toolkit";

const DealerGroupsSearchFilterSlice = createSlice({
  name: "dealerGroupFilter",
  initialState: {
    id: "",
    changeColor: false,
    searchTerm: "",
    searchCriteria: "Beginning",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    listingData: [],
    load: false,
    sort: false,
    sortValue: "",
  },
  reducers: {
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
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSort: (state) => {
      state.sort = !state.sort;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    resetSearchSettings: (state, action) => {
      state.changeColor = false;
      state.searchCriteria = "Beginning";
      state.searchTerm = "";
      state.pageNumber = 0;
      state.sortValue = "";
      state.sort = false;
    },
  },
});

export const {
  setId,
  setChangeColor,
  setListingData,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSearchCriteria,
  setSearchTerm,
  setSort,
  setSortValue,
  resetSearchSettings,
} = DealerGroupsSearchFilterSlice.actions;

export const dealerGroup = (state) => state.dealerGroupFilter.value;

export default DealerGroupsSearchFilterSlice.reducer;
