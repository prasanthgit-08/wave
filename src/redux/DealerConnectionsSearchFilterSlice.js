import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";

const DealerConnectionsSearchFilterSlice = createSlice({
  name: "DealerConnections",
  initialState: {
    dealerConnectionsPK: "",
    dealerOne: "",
    dealerOnePK: "",
    dealerTwo: "",
    dealerTwoPK: "",
    invoiceMiles: "",
    driverMiles: "",
    dealerconnectionData: null,
    listingData: [],
    dealerList: [],
    dealerLoading: false,

    viewDetail: true,
    saveDisable: true,
    isExisting: false,
    changeColor: false,

    pageNumber: 0,
    formPageNumber: 0,
    totalElements: 0,
    totalPages: 0,

    searchTerm: "",
    searchCriteria: "Beginning",
    sort: false,
    sortValue: null,
    dealer1searchString: "",
    dealer2searchString: "",

    advanceSearch: false,
    advancedSearchObject: null,
    advanceSearchTermOne: "",
    advanceSearchTermTwo: "",
    advanceSearchFK1: "",
    advanceSearchFK2: "",

    dealerSelection1: false,
    dealerSelection2: false,
  },
  reducers: {
    setDealerConnectionsPK: (state, action) => {
      state.dealerConnectionsPK = action.payload;
    },
    setDealerOne: (state, action) => {
      state.dealerOne = action.payload;
    },
    setDealerOnePK: (state, action) => {
      state.dealerOnePK = action.payload;
    },
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setDealerTwo: (state, action) => {
      state.dealerTwo = action.payload;
    },
    setDealerTwoPK: (state, action) => {
      state.dealerTwoPK = action.payload;
    },
    setDriverMiles: (state, action) => {
      state.driverMiles = action.payload;
    },
    setInvoiceMiles: (state, action) => {
      state.invoiceMiles = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setDealerList: (state, action) => {
      state.dealerList = action.payload;
    },
    setDealerLoading: (state, action) => {
      state.dealerLoading = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setSaveDisable: (state, action) => {
      state.saveDisable = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setIsExisting: (state, action) => {
      state.isExisting = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setFormPageNumber: (state, action) => {
      state.formPageNumber = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setDealer1SearchString: (state, action) => {
      state.dealer1searchString = action.payload;
    },
    setDealer2SearchString: (state, action) => {
      state.dealer2searchString = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSort: (state, action) => {
      state.sort = !state.sort;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },

    setAdvanceSearch: (state, action) => {
      state.advanceSearch = action.payload;
    },
    setAdvanceSearchTermOne: (state, action) => {
      state.advanceSearchTermOne = action.payload;
    },
    setAdvanceSearchTermTwo: (state, action) => {
      state.advanceSearchTermTwo = action.payload;
    },
    setAdvanceSearchFK1: (state, action) => {
      state.advanceSearchFK1 = action.payload;
    },
    setAdvanceSearchFK2: (state, action) => {
      state.advanceSearchFK2 = action.payload;
    },
    setDealerSelection1: (state, action) => {
      state.dealerSelection1 = action.payload;
    },
    setDealerSelection2: (state, action) => {
      state.dealerSelection2 = action.payload;
    },
    setdealerConnectionsData: (state, action) => {
      state.dealerconnectionData = action.payload;
    },
    resetPageValues: (state, action) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.sort = false;
      state.sortValue = null;

      state.listingData = [];

      state.viewDetail = true;
      state.saveDisable = true;
      state.isExisting = false;
      state.changeColor = false;

      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;

      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.sort = false;
      state.sortValue = null;

      state.advanceSearch = false;
      state.advanceSearchTermOne = "";
      state.advanceSearchTermTwo = "";
    },
    resetChanges: (state, action) => {
      state.dealerOne = "";
      state.dealerOnePK = "";
      state.dealerTwo = "";
      state.dealerTwoPK = "";
      state.driverMiles = "";
      state.invoiceMiles = "";
      state.dealer1searchString = "";
      state.dealer2searchString = "";
      state.dealerconnectionData = null;
    },
  },
});

export const {
  setDealerConnectionsPK,
  setDealerOne,
  setDealerOnePK,
  setDealerTwo,
  setDealerTwoPK,
  setDriverMiles,
  setListingData,
  setDealerList,
  setInvoiceMiles,
  setAdvanceSearch,
  setAdvanceSearchTermOne,
  setAdvanceSearchTermTwo,
  setAdvancedSearchObject,
  setAdvanceSearchFK1,
  setAdvanceSearchFK2,
  setFormPageNumber,
  setPageNumber,
  setTotalElements,
  setTotalPages,

  setDealer1SearchString,
  setDealer2SearchString,
  setSearchTerm,
  setSearchCriteria,
  setSort,
  setSortValue,
  setIsExisting,
  setSaveDisable,
  setViewDetail,
  setChangeColor,
  setDealerLoading,

  setDealerSelection1,
  setDealerSelection2,
  setdealerConnectionsData,
  resetChanges,
  resetPageValues,
} = DealerConnectionsSearchFilterSlice.actions;

export default DealerConnectionsSearchFilterSlice.reducer;
