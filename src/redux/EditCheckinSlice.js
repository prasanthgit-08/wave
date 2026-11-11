import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  pageNumber: 0,
  totalPages: 0,
  totalElements: 0,
  searchTerms: "",
  searchCriteria: "Beginning",
  viewDetail: false,
  changeColor: false,
  editFormData: null,
  normalSortValue: "",
  normalSortFlag: false,
  listingData: [],
  checkinId: null,
  formDetails: null,
  invoiceTracking: false,
  preInvoiced: false,
  masterUser: false,
  cityStateCheck: false,
  changesCancelled: false,
  postalCode: null,
  unitNumber: "",
  driverCheckinId: null,
};

const EditCheckinSlice = createSlice({
  name: "EditCheckinSlice",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setCheckinId: (state, action) => {
      state.checkinId = action.payload;
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
    setSearchTerm: (state, action) => {
      state.searchTerms = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
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
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    resetChanges: (state) => {
      Object.assign(state, initialState);
    },
    toggleChangesCancelled: (state) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setFormDetails: (state, action) => {
      state.formDetails = action.payload;
    },
    setInvoiceTracking: (state, action) => {
      state.invoiceTracking = action.payload;
    },
    setPreInvoiced: (state, action) => {
      state.preInvoiced = action.payload;
    },
    setMasterUser: (state, action) => {
      state.masterUser = action.payload;
    },
    setCityStateCheck: (state, action) => {
      state.cityStateCheck = action.payload;
    },
    setPostalCode: (state, action) => {
      state.postalCode = action.payload;
    },
    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setDriverCheckinId: (state, action) => {
      state.driverCheckinId = action.payload;
    },
    resetState: () => initialState,

    setChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
  },
});

export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSearchTerm,
  setSearchCriteria,
  resetChanges,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  setNormalSortValue,
  setNormalSortFlag,
  toggleChangesCancelled,
  setListingData,
  setCheckinId,
  setFormDetails,
  setInvoiceTracking,
  setPreInvoiced,
  setMasterUser,
  setCityStateCheck,
  resetState,
  setChangesCancelled,
  setPostalCode,
  setUnitNumber,
  setDriverCheckinId,
} = EditCheckinSlice.actions;

export default EditCheckinSlice.reducer;
