import { createSlice } from "@reduxjs/toolkit";

const MiscDealerLookupSlice = createSlice({
  name: "miscDealerLookup",
  initialState: {
    miscDealerData: [],
    // search filter
    searchTerms: "",
    showAdvanceSearch: false,
    showAdvanceSort: false,
    selectedSearchCriteria: "Beginning",

    changeColor: false,
    selectedId: "",
    loading: true,
    searchedDealer: null,
    advanceSortedValue: null,
    normalSortValue: null,
    normalSortFlag: false,
    advanceSortingOrder: null,
    rowPosition: [],
    columnPosition: [],

    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,

    pickupCity: "",
    pickupStateCode: "",
    pickupCanadian: false,
    pickupPostalCode: "",

    //city,state,postal code
    city: "",
    statecode: "",
    canadian: false,
    postcode: "",
  },
  reducers: {
    setMiscDealerData: (state, action) => {
      state.miscDealerData = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchedDealer: (state, action) => {
      state.searchedDealer = action.payload;
    },

    setAdvanceSortedValue: (state, action) => {
      state.advanceSortedValue = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },

    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setShowAdvanceSort: (state, action) => {
      state.showAdvanceSort = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },

    setAdvanceSortingCriteria: (state, action) => {
      state.advanceSortingOrder = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },

    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
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

    setPickupCity: (state, action) => {
      state.pickupCity = action.payload;
    },
    setPickupPostalCode: (state, action) => {
      state.pickupPostalCode = action.payload;
    },

    setPickupStateCode: (state, action) => {
      state.pickupStateCode = action.payload;
    },

    setPickupCanadian: (state, action) => {
      state.pickupCanadian = action.payload;
    },
    setMiscCity: (state, action) => {
      state.city = action.payload;
    },
    setMiscStatecode: (state, action) => {
      state.statecode = action.payload;
    },
    setMiscPostcode: (state, action) => {
      state.postcode = action.payload;
    },

    resetSearchSettings: (state, action) => {
      state.miscDealerData = [];
      state.searchTerms = "";
      state.showAdvanceSearch = false;
      state.showAdvanceSort = false;
      state.selectedSearchCriteria = "Beginning";
      state.changeColor = false;
      state.loading = true;
      state.searchedDealer = null;
      state.advanceSortedValue = null;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.advanceSortingOrder = null;
      state.rowPosition = [];
      state.columnPosition = [];
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.pickupCity = "";
      state.pickupPostalCode = "";
      state.pickupStateCode = "";
      state.pickupCanadian = false;
      state.selectedId = null;
    },
  },
});

export const {
  setMiscDealerData,
  setChangeColor,
  setSelectedId,
  setLoading,
  setAdvanceSortedValue,
  setSearchedDealer,
  setNormalSortValue,
  setNormalSortFlag,
  setShowAdvanceSort,
  setSelectedSearchCriteria,
  setAdvanceSortingCriteria,
  setSearchTerms,
  setShowAdvanceSearch,
  setSortPositions,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  resetSearchSettings,
  setPickupCity,
  setPickupCanadian,
  setPickupStateCode,
  setPickupPostalCode,
  setMiscCity,
  setMiscStatecode,
  setMiscPostcode,
} = MiscDealerLookupSlice.actions;

export default MiscDealerLookupSlice.reducer;
