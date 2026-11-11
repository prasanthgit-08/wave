import { createSlice } from "@reduxjs/toolkit";

const HolidaysSlice = createSlice({
  name: "Holidays",
  initialState: {
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    listingData: [],
    selectedId: "",

    //search

    searchTerm: "",
    searchCriteria: "Beginning",
    changeColor: false,
    viewDetail: false,
    editFormData: null,
    changesCancelled: false,

    //editing
    holidayPK: "",
    description: "",
    date: {
      date: "",
      dateInput: "",
      isDateValid: true,
    },
    us: false,
    canadian: false,
    isDateValid: true,
    atleastOneCheck: true,
    normalSortValue: null,
    normalSortFlag: false,
  },
  reducers: {
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
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
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setAtleastOneCheck: (state, action) => {
      state.atleastOneCheck = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setHolidayPK: (state, action) => {
      state.holidayPK = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },

    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setDate: (state, action) => {
      // For updating the state
      if (action.payload) {
        state.date = { ...state.date, ...action.payload };
      } else {
        // For clearing the state
        state.date = {
          date: "",
          dateInput: "",
          isDateValid: true,
        };
      }
    },
    setUs: (state, action) => {
      state.us = action.payload;
    },
    setCanadian: (state, action) => {
      state.canadian = action.payload;
    },
    setIsDateValid: (state, action) => {
      state.isDateValid = action.payload;
    },

    resetChanges: (state, action) => {
      state.holidayPK = null;
      state.date = "";
      state.description = "";
      state.us = false;
      state.canadian = false;
      state.isDateValid = true;
      state.normalSortValue = null;
      state.normalSortFlag = false;
    },
  },
});
export const {
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setSearchTerm,
  setSearchCriteria,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  resetChanges,
  setDescription,
  setDate,
  setUs,
  setCanadian,
  setListingData,
  setSelectedId,
  setHolidayPK,
  setChangesCancelled,
  setIsDateValid,
  setAtleastOneCheck,
  setNormalSortValue,
  setNormalSortFlag,
} = HolidaysSlice.actions;
export default HolidaysSlice.reducer;
