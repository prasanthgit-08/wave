// import React from 'react'

import { createSlice } from "@reduxjs/toolkit";
import { formatPhoneNumber } from "../utils/validation/Phonevalidation";

const DelayResourcesSlice = createSlice({
  name: "regionsFilter",
  initialState: {
    id: "",
    changeColor: false,
    searchCriteria: "Beginning",
    listingData: [],
    searchTerm: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    sortValue: null,
    sortFlag: false,
    loader: false,
    edit: false,
    disableSave: false,
    data: null,
    description: "",
    phone: "",
    notes: "",
    delay: false,
    breakdown: false,
    damage: false,
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
    setData: (state, action) => {
      state.data = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
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
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setDelay: (state, action) => {
      state.delay = action.payload;
    },
    setBreakdown: (state, action) => {
      state.breakdown = action.payload;
    },
    setDamage: (state, action) => {
      state.damage = action.payload;
    },
    resetEditScreen: (state) => {
      state.breakdown = state.data.breakdown;
      state.description = state.data.description;
      state.notes = state.data.notes;
      state.damage = state.data.damage;
      state.phone = formatPhoneNumber(state.data.phone);
      state.delay = state.data.delay;
    },
    resetData: (state, action) => {
      state.breakdown = false;
      state.damage = false;
      state.delay = false;
      state.description = "";
      state.phone = "";
      state.notes = "";
      state.data = null;
    },
    resetSearchSettings: (state, action) => {
      state.changeColor = false;
      state.searchCriteria = "Beginning";
      state.searchTerm = "";
      state.pageNumber = 0;
      state.sortValue = null;
      state.sortFlag = false;
      state.listingData = [];
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
  setEdit,
  setData,
  setSortFlag,
  setSortValue,
  setDisableSave,
  setBreakdown,
  setDamage,
  setDelay,
  setDescription,
  setNotes,
  setPhone,
  setListingData,
  resetSearchSettings,
  resetData,
  resetEditScreen,
} = DelayResourcesSlice.actions;

export const resource = (state) => state.delayResourcesFilter.value;

export default DelayResourcesSlice.reducer;
