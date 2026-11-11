import { createSlice } from "@reduxjs/toolkit";

const CustomerDispatchUsersSlice = createSlice({
  name: "customerDispatchUsers",
  initialState: {
    listingData: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    normalSortValue: null,
    normalSortFlag: false,
    selectedId: "",
    viewDetail: false,
    changeColor: false,
    formData: null,
    changesCancelled: false,
    addFormData: null,
    disableSave: false,
    orderDispatchUsers: "",
    usePlant: true,
    customerDispatcUserValid: false,
  },
  reducers: {
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
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
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setAddFormData: (state, action) => {
      state.addFormData = action.payload;
    },
    setOrderDispatchUsers: (state, action) => {
      state.orderDispatchUsers = action.payload;
    },
    setUsePlant: (state, action) => {
      state.usePlant = action.payload;
    },
    setCustomerDispatcUserValid: (state, action) => {
      state.customerDispatcUserValid = action.payload;
    },

    resetCustomerDispatchUsers: (state) => {
      state.searchTerm = "";
      state.pageNumber = 0;
      state.searchCriteria = "Beginning";
      state.listingData = [];
      state.selectedId = "";
      state.disableSave = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.totalPages = 0;
      state.totalElements = 0;
      state.changeColor = false;
      state.formData = null;
      state.viewDetail = false;
      state.usePlant = true;
      state.customerDispatcUserValid = false;
    },
  },
});

export const {
  setDisableSave,
  setListingData,
  setNormalSortValue,
  setNormalSortFlag,
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSelectedId,
  setViewDetail,
  setChangeColor,
  setFormData,
  setChangesCancelled,
  setAddFormData,
  setOrderDispatchUsers,
  resetCustomerDispatchUsers,
  setUsePlant,
  setCustomerDispatcUserValid,
} = CustomerDispatchUsersSlice.actions;

export default CustomerDispatchUsersSlice.reducer;
