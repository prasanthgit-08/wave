import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "summary",
  fromDate: "",
  toDate: "",
  hiredDate: "",
  summaryRows: [],
  detailRows: [],
  summaryPageNumber: 0,
  summaryTotalPages: 0,
  summaryTotalElements: 0,
  detailPageNumber: 0,
  detailTotalPages: 0,
  detailTotalElements: 0,
  selectedSummary: null,
  selectedPayee: null,
  loading: false,
  error: "",
  filters: {
    driver: true,
    garnishments: true,
    claims: true,
    payments: true,
  },
};

const driverPayLogSlice = createSlice({
  name: "driverPayLog",
  initialState,
  reducers: {
    setActiveTab: (state, { payload }) => {
      state.activeTab = payload;
    },
    setDateRange: (state, { payload }) => {
      state.fromDate = payload.fromDate;
      state.toDate = payload.toDate;
    },
    setHiredDate: (state, { payload }) => {
      state.hiredDate = payload;
    },
    setSummaryRows: (state, { payload }) => {
      state.summaryRows = payload;
    },
    setDetailRows: (state, { payload }) => {
      state.detailRows = payload;
    },
    setSummaryPagination: (state, { payload }) => {
      state.summaryPageNumber = payload.pageNumber ?? state.summaryPageNumber;
      state.summaryTotalPages = payload.totalPages ?? state.summaryTotalPages;
      state.summaryTotalElements = payload.totalElements ?? state.summaryTotalElements;
    },
    setSummaryPageNumber: (state, { payload }) => {
      state.summaryPageNumber = payload;
    },
    setDetailPagination: (state, { payload }) => {
      state.detailPageNumber = payload.pageNumber ?? state.detailPageNumber;
      state.detailTotalPages = payload.totalPages ?? state.detailTotalPages;
      state.detailTotalElements = payload.totalElements ?? state.detailTotalElements;
    },
    setDetailPageNumber: (state, { payload }) => {
      state.detailPageNumber = payload;
    },
    setSelectedSummary: (state, { payload }) => {
      state.selectedSummary = payload;
    },
    setSelectedPayee: (state, { payload }) => {
      state.selectedPayee = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setFilters: (state, { payload }) => {
      state.filters = { ...state.filters, ...payload };
    },
    resetDriverPayLog: () => initialState,
  },
});

export const {
  setActiveTab,
  setDateRange,
  setHiredDate,
  setSummaryRows,
  setDetailRows,
  setSummaryPagination,
  setDetailPagination,
  setSummaryPageNumber,
  setDetailPageNumber,
  setSelectedSummary,
  setSelectedPayee,
  setLoading,
  setError,
  setFilters,
  resetDriverPayLog,
} = driverPayLogSlice.actions;

export default driverPayLogSlice.reducer;
