import { createSlice } from "@reduxjs/toolkit";
const PostalCodeSlice = createSlice({
  name: "PostalCodeSlice",
  initialState: {
    // fetch data
    listingData: [],
    selectedStatus: "US",
    selectedId: "",

    //input fields

    postalCodePK: "",
    canadian: false,
    latitude: "",
    longitude: "",
    city: "",
    stateCode: "",
    postalCode: "",
    isPlateStateValid: false,

    // search filter
    searchTerms: "",

    searchCriteria: "Beginning",
    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    showAdvanceSearch: false,
    showAdvanceSort: false,
    searchedPostalCode: null,
    searchedPostalCodeUpdate: null,
    advanceSortedValue: null,
    advanceSortingOrder: null,
    normalSortValue: null,
    normalSortFlag: false,

    // resetChanges,

    // editing

    viewDetail: false,
    changeColor: false,
    editFormData: null,
    changesCancelled: false,
    inputfields: false,
    loader: false,
  },
  reducers: {
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
    },
    setShowAdvanceSort: (state, action) => {
      state.showAdvanceSort = action.payload;
    },

    setPostalCodePK: (state, action) => {
      state.postalCodePK = action.payload;
    },
    setCanadian: (state, action) => {
      state.canadian = action.payload;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setStateCode: (state, action) => {
      state.stateCode = action.payload;
    },
    setPostalCode: (state, action) => {
      state.postalCode = action.payload;
    },
    setSearchedPostalCodeUpdate: (state, action) => {
      state.searchedPostalCodeUpdate = action.payload;
    },

    setAdvanceSortedValue: (state, action) => {
      state.advanceSortedValue = action.payload;
    },
    setAdvanceSortingOrder: (state, action) => {
      state.advanceSortingOrder = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },

    setInputfields: (state, action) => {
      state.inputfields = action.payload;
    },
    setIsPlateStateValid: (state, action) => {
      state.isPlateStateValid = action.payload;
    },

    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },

    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setAdvanceSortingCriteria: (state, action) => {
      state.advanceSortingOrder = action.payload;
    },

    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },

    setChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    resetChanges: (state, action) => {
      state.postalCodePK = "";
      state.canadian = false;
      state.latitude = "";
      state.longitude = "";
      state.city = "";
      state.stateCode = "";
      state.postalCode = "";
    },
    setSearchedPostalCode: (state, action) => {
      state.searchedPostalCode = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
});
export const {
  setListingData,
  setSelectedStatus,
  setPostalCodePK,
  setCanadian,
  setLatitude,
  setLongitude,
  setCity,
  setStateCode,
  setPostalCode,
  setSearchTerms,
  setSearchCriteria,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  resetChanges,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  setChangesCancelled,
  setSelectedId,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  setAdvanceSortedValue,
  setAdvanceSortingOrder,
  setSearchedPostalCode,
  setNormalSortValue,
  setNormalSortFlag,
  setAdvanceSortingCriteria,
  setIsPlateStateValid,
  setSearchedPostalCodeUpdate,
  setLoader,
} = PostalCodeSlice.actions;

export default PostalCodeSlice.reducer;
