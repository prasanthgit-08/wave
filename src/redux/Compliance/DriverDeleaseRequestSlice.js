import { createSlice } from "@reduxjs/toolkit";

const DriverDeleaseRequestSlice = createSlice({
  name: "DriverDeleaseRequest",
  initialState: {
    deleaserequestPK: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    deleaseRequestData: [],
    searchTerms: "",
    selectedSearchCriteria: "Beginning",
    loading: true,
    selectedId: null,
    viewDetail: false,
    changeColor: false,
    sortValue: null,
    sortFlag: false,
    changesCancelled: false,
    deleaseRequestRecord: null,
    flagStatus: "",
    isDeleaseCompliance: false,
    driverId: "",
    returnFromDelease: false,
  },
  reducers: {
    setDeleaserequestPK: (state, action) => {
      state.deleaserequestPK = action.payload;
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
    setDeleaseRequestData: (state, action) => {
      state.deleaseRequestData = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setDeleaseRequestRecord: (state, action) => {
      state.deleaseRequestRecord = action.payload;
    },
    setFlagStatus: (state, action) => {
      state.flagStatus = action.payload;
    },
    setIsDeleaseCompliance: (state, action) => {
      state.isDeleaseCompliance = action.payload;
    },
    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
    setReturnFromDelease: (state, action) => {
      state.returnFromDelease = action.payload;
    },
    resetDeleaseRequest: (state, action) => {
      // Search Filter
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.selectedId = null;
      state.driverId = "";
      state.changeColor = false;
      // Table Listing
      state.loading = true;
      state.deleaseRequestData = [];
      state.selectedId = null;
      state.sortValue = null;
      state.sortFlag = false;
      // Pagination
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      //Other flags
      state.returnFromDelease = false;
      state.isDeleaseCompliance = false;
      state.deleaseRequestRecord = null;
      state.flagStatus = "";
    },
    resetDeleaseRequestBrowseData: (state, action) => {
      // Search Filter
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.selectedId = null;
      state.changeColor = false;
      state.pageNumber = 0;
      state.driverId = "";

      // Table Listing
      state.loading = true;
      state.deleaseRequestData = [];
      state.selectedId = null;
      state.sortValue = null;
      state.sortFlag = false;
      state.totalElements = 0;
      state.totalPages = 0;
    },
  },
});
export const {
  setDeleaserequestPK,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setDeleaseRequestData,
  setSearchTerms,
  setSelectedSearchCriteria,
  setSortFlag,
  setSortValue,
  setViewDetail,
  setChangeColor,
  setLoading,
  setSelectedId,
  toggleChangesCancelled,
  setDeleaseRequestRecord,
  setFlagStatus,
  setIsDeleaseCompliance,
  setDriverId,
  setReturnFromDelease,
  resetDeleaseRequest,
  resetDeleaseRequestBrowseData,
} = DriverDeleaseRequestSlice.actions;
export default DriverDeleaseRequestSlice.reducer;
