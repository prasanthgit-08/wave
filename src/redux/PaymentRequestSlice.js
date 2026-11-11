import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 0,
  totalPages: 0,
  totalElements: 0,
  listingData: [],
  searchTerms: "",
  searchCriteria: "Beginning",
  selectedStatus: "All",
  selectedId: "",
  changeColor: false,
  viewDetail: false,
  editFormData: null,
  changesCancelled: false,
  normalSortValue: "",
  normalSortFlag: false,
  driverPayRequestsPK: null,
  reimbursementTabData: [],
  driversPayTabData: null,
  datesTabData: [],
  driverpayTabValid: false,
  reimbursementTabValid: false,
  datesTabValid: false,
  unitId: null,
  dispatchId: null,
  amountValid: false,
  activeTab: "driversPay",
  driverDealesed: false,
  driverActive: false,
};

const PaymentRequestSlice = createSlice({
  name: "PaymentRequestSlice",
  initialState,
  reducers: {
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
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
    setDriverPayRequestsPK: (state, action) => {
      state.driverPayRequestsPK = action.payload;
    },
    setReimbursementTabData: (state, action) => {
      state.reimbursementTabData = action.payload;
    },
    setDriversPayTabData: (state, action) => {
      state.driversPayTabData = { ...state.driversPayTabData, ...action.payload };
    },
    setDatesTabData: (state, action) => {
      state.datesTabData = action.payload;
    },
    setDriverpayTabValid: (state, action) => {
      state.driverpayTabValid = action.payload;
    },
    setReimbursementTabValid: (state, action) => {
      state.reimbursementTabValid = action.payload;
    },
    setDatesTabValid: (state, action) => {
      state.datesTabValid = action.payload;
    },
    setUnitId: (state, action) => {
      state.unitId = action.payload;
    },
    setDispatchId: (state, action) => {
      state.dispatchId = action.payload;
    },
    resetState: () => initialState,
    setAmountValid: (state, action) => {
      state.amountValid = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setDriverDeleased: (state, action) => {
      state.driverDealesed = action.payload;
    },
    setDriverActive: (state, action) => {
      state.driverActive = action.payload;
    },
  },
});

export const {
  setSelectedStatus,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setListingData,
  setSearchTerms,
  setSearchCriteria,
  setSelectedId,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangesCancelled,
  setDriverPayRequestsPK,
  setReimbursementTabData,
  setDriversPayTabData,
  setDatesTabData,
  resetState,
  setDriverpayTabValid,
  setReimbursementTabValid,
  setDatesTabValid,
  setUnitId,
  setDispatchId,
  setAmountValid,
  setActiveTab,
  setDriverDeleased,
  setDriverActive,
} = PaymentRequestSlice.actions;

export default PaymentRequestSlice;
