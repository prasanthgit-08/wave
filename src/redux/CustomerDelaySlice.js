import { createSlice } from "@reduxjs/toolkit";

const CustomerDelay = createSlice({
  name: "cutomerDelay",
  initialState: {
    // search filter
    searchTerm: "",
    searchCriteria: "Beginning",
    listingData: [],
    customerFK: "",
    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    //form
    description: "",
    phone: "",
    delay: false,
    breakdown: false,
    damage: false,
    notes: "",
    changeColor: false,
    //edi mode

    editMode: false,

    // rowid

    selectedId: "",
  },
  reducers: {
    setSearchTerms: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setCustomerFKRedux: (state, action) => {
      state.customerFK = action.payload;
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
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    //from actions

    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
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
    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    //edit actions

    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },

    //setselected row

    setDelaySelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const {
  setSearchTerms,
  setSearchCriteria,
  setListingData,
  setCustomerFKRedux,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setDescription,
  setPhone,
  setBreakdown,
  setNormalSortValue,
  setNormalSortFlag,
  setDamage,
  setDelay,
  setNotes,
  setEditMode,
  setDelaySelectedId,
} = CustomerDelay.actions;

export default CustomerDelay.reducer;
