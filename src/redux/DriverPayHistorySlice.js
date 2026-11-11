import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //Summary Tab
  checkHeaderList: [],
  driverId: "",
  selectedDriverData: "",
  pageNumber: 0,
  totalPages: 0,
  totalElements: 0,
  fromDate: "",
  toDate: "",
  isFromDateValid: true,
  isToDateValid: true,
  dateLoading: false,

  //Details Tab
  checkDetailList: [],
  paginatedCheckDetailList: [],
  pageNumberDetailsTab: 0,
  totalPagesDetailsTab: 0,
  totalElementsDetailsTab: 0,
  fromDateDetailsTab: "",
  toDateDetailsTab: "",
  loading: false,
  /* the two tabs fetch at the same time, so each keeps its own flag instead of the faster one ending the other's loading */
  detailLoading: false,
  activeTab: "summaryTab",

  checkQueuedList: [],
  pageNumberQueuedTab: 0,
  totalPagesQueuedTab: 0,
  totalElementsQueuedTab: 0,
  queuedLoading: false,
};

const DriverPayHistorySlice = createSlice({
  name: "driverPayHistory",
  initialState,
  reducers: {
    /* used by the Close button so the next driver does not open on the previous one's data */
    resetDriverPayHistory: () => initialState,
    //Summary Tab
    setCheckHeaderList: (state, action) => {
      state.checkHeaderList = action.payload;
    },

    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
    setSelectedDriverData: (state, action) => {
      state.selectedDriverData = action.payload;
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
    setFromDate: (state, action) => {
      state.fromDate = action.payload;
    },
    setToDate: (state, action) => {
      state.toDate = action.payload;
    },
    setIsFromDateValid: (state, action) => {
      state.isFromDateValid = action.payload;
    },
    setIsToDateValid: (state, action) => {
      state.isToDateValid = action.payload;
    },
    //Details Tab
    setCheckDetailList: (state, action) => {
      state.checkDetailList = action.payload;
    },
    setPaginatedCheckDetailList: (state, action) => {
      state.paginatedCheckDetailList = action.payload;
    },
    setPageNumberDetailsTab: (state, action) => {
      state.pageNumberDetailsTab = action.payload;
    },
    setTotalPagesDetailsTab: (state, action) => {
      state.totalPagesDetailsTab = action.payload;
    },
    setTotalElementsDetailsTab: (state, action) => {
      state.totalElementsDetailsTab = action.payload;
    },
    setFromDateDetailsTab: (state, action) => {
      state.fromDateDetailsTab = action.payload;
    },
    setToDateDetailsTab: (state, action) => {
      state.toDateDetailsTab = action.payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setDetailLoading: (state, { payload }) => {
      state.detailLoading = payload;
    },
    setDateLoading: (state, { payload }) => {
      state.dateLoading = payload;
    },
    setActiveTab: (state, { payload }) => {
      state.activeTab = payload;
    },
    //Queued Tab
    setCheckQueuedList: (state, { payload }) => {
      state.checkQueuedList = payload;
    },
    setPageNumberQueuedTab: (state, { payload }) => {
      state.pageNumberQueuedTab = payload;
    },
    setTotalPagesQueuedTab: (state, { payload }) => {
      state.totalPagesQueuedTab = payload;
    },
    setTotalElementsQueuedTab: (state, { payload }) => {
      state.totalElementsQueuedTab = payload;
    },
    setQueuedLoading: (state, { payload }) => {
      state.queuedLoading = payload;
    },
  },
});

export const {
  //Summary Tab
  setCheckHeaderList,
  setDriverId,
  setSelectedDriverData,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setToDate,
  setFromDate,
  setIsFromDateValid,
  setIsToDateValid,

  //Details Tab
  setCheckDetailList,
  setPaginatedCheckDetailList,
  setPageNumberDetailsTab,
  setTotalPagesDetailsTab,
  setTotalElementsDetailsTab,
  setFromDateDetailsTab,
  setToDateDetailsTab,
  setLoading,
  setDetailLoading,
  setActiveTab,
  setDateLoading,
  resetDriverPayHistory,

  //Queued Tab
  setCheckQueuedList,
  setPageNumberQueuedTab,
  setTotalPagesQueuedTab,
  setTotalElementsQueuedTab,
  setQueuedLoading,
} = DriverPayHistorySlice.actions;

export default DriverPayHistorySlice.reducer;
