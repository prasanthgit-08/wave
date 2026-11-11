import { createSlice } from "@reduxjs/toolkit";

const YardToYardShuttleSlice = createSlice({
  name: "yardToYardShuttle",
  initialState: {
    yardToYardShuttlePK: null,
    saveData: null,

    //for data list
    listingData: [],
    changeColor: false,

    //for edit & save button
    viewDetail: false,
    saveDisable: false,

    //for pagenation
    pageNumber: 0,
    totalElements: 0,
    totalPages: 0,

    //for search and sort
    searchTerm: "",
    searchCriteria: "Beginning",
    sort: false,
    sortValue: null,

    // for advance search
    advanceSearch: false,
    advanceSearchObject: null,
    advanceSearchTermOne: "",
    advanceSearchTermTwo: "",

    loader: true,
  },
  reducers: {
    setYardToYardShuttlePK: (state, action) => {
      state.yardToYardShuttlePK = action.payload;
    },
    setSaveData: (state, action) => {
      state.saveData = action.payload;
    },

    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setSaveDisable: (state, action) => {
      state.saveDisable = action.payload;
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

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },

    setAdvanceSearch: (state, action) => {
      state.advanceSearch = action.payload;
    },
    setAdvanceSearchObject: (state, action) => {
      state.advanceSearchObject = action.payload;
    },
    setAdvanceSearchTermOne: (state, action) => {
      state.advanceSearchTermOne = action.payload;
    },
    setAdvanceSearchTermTwo: (state, action) => {
      state.advanceSearchTermTwo = action.payload;
    },

    setLoader: (state, action) => {
      state.loader = action.payload;
    },

    resetPageValues: (state, action) => {
      state.yardToYardShuttlePK = null;
      // state.viewDetail= true
      state.changeColor = false;
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      state.loader = true;
      state.listingData = [];
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.sort = false;
      state.sortValue = null;
      state.advanceSearchObject = null;
      state.advanceSearch = false;
      state.advanceSearchTermOne = "";
      state.advanceSearchTermTwo = "";
      state.saveDisable = true;
      state.isExisting = false;
      state.hasFee = false;
    },
  },
});

export const {
  setYardToYardShuttlePK,
  setSaveData,

  setListingData,
  setChangeColor,

  setViewDetail,
  setSaveDisable,

  setPageNumber,
  setTotalElements,
  setTotalPages,

  setSearchTerm,
  setSearchCriteria,
  setSort,
  setSortValue,

  setAdvanceSearch,
  setAdvanceSearchObject,
  setAdvanceSearchTermOne,
  setAdvanceSearchTermTwo,

  setLoader,
  resetPageValues,
} = YardToYardShuttleSlice.actions;
export default YardToYardShuttleSlice.reducer;
