import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 0,
  searchTerm: "",
  searchCriteria: "Beginning",
  delayCheckRequestData: [],
  sortValue: "",
  sortType: false,
  changeColor: false,
  checkRequestid: null,
  totalElements: 0,
  totalPages: 0,
  loading: true,
  selectedId: null,
  viewDetail: false,
  delayRequestRecord: null,
  companyAmount: "",
  driverAmount: "",
  totalAmount: "",
  unitFK: null,
  delayedUnitFK: null,
  changesCancelled: false,
  delayRequestFormData: null,
  disableSave: true,
  isCancelledClicked: false,
  invoiceTextInputs: [],
  checkPrintFormData: null,
  accumulatedBond: "",
  postalCodePK: null,
  description: "",
  reserveBondFundFK: null,
};

const DelayUnitCheckRequestSlice = createSlice({
  name: "delayCheckRequest",
  initialState,
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setDelayCheckRequestData: (state, action) => {
      state.delayCheckRequestData = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setCheckRequestid: (state, action) => {
      state.checkRequestid = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDelayRequestRecord: (state, action) => {
      state.delayRequestRecord = action.payload;
    },
    setCompanyAmount: (state, action) => {
      state.companyAmount = action.payload;
    },
    setDriverAmount: (state, action) => {
      state.driverAmount = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setUnitFK: (state, action) => {
      state.unitFK = action.payload;
    },
    setDelayedUnitFK: (state, action) => {
      state.delayedUnitFK = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setDelayRequestFormData: (state, action) => {
      let payload = action.payload;
      state.delayRequestFormData = { ...state.delayRequestFormData, ...payload };
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setIsCancelledClicked: (state, action) => {
      state.isCancelledClicked = action.payload;
    },
    setInvoiceTextInputs: (state, action) => {
      state.invoiceTextInputs = action.payload;
    },
    setCheckPrintFormData: (state, action) => {
      state.checkPrintFormData = action.payload;
    },
    setAccumulatedBond: (state, action) => {
      state.accumulatedBond = action.payload;
    },
    setPostalCodePK: (state, action) => {
      state.postalCodePK = action.payload;
    },
    setReserveBondFundFK: (state, action) => {
      state.reserveBondFundFK = action.payload;
    },

    resetDelayUnitCheck: (state, action) => {
      // Search Filter
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.selectedId = null;
      state.changeColor = false;
      // Table Listing
      state.loading = true;
      state.delayCheckRequestData = [];
      state.sortValue = "";
      state.sortType = false;
      // Pagination
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
    },
  },
});

export const {
  setPageNumber,
  setSearchTerm,
  setSearchCriteria,
  setDelayCheckRequestData,
  setSortValue,
  setSortType,
  setChangeColor,
  setCheckRequestid,
  setTotalElements,
  setTotalPages,
  setSelectedId,
  setLoading,
  resetDelayUnitCheck,
  setViewDetail,
  setDelayRequestRecord,
  setTotalAmount,
  setCompanyAmount,
  setDriverAmount,
  setDelayedUnitFK,
  setUnitFK,
  setChangesCancelled,
  setDelayRequestFormData,
  setDisableSave,
  setIsCancelledClicked,
  setInvoiceTextInputs,
  setCheckPrintFormData,
  setAccumulatedBond,
  setPostalCodePK,
  setDescription,
  setReserveBondFundFK,
} = DelayUnitCheckRequestSlice.actions;

export default DelayUnitCheckRequestSlice;
