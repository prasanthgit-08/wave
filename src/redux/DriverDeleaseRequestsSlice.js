import { createSlice } from "@reduxjs/toolkit";

const DriverDeleaseRequestsSlice = createSlice({
  name: "DriverDeleaseRequests",
  initialState: {
    driverDeleaseRequests: null,
    disableSave: true,
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    deleaseRequestData: [],
    saveFormData: null,
    searchTerms: "",
    selectedSearchCriteria: "Beginning",
    statusType: "All",
    loading: true,
    selectedId: null,
    driverDeleaseRequestsSaveObject: null,
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    sortValue: null,
    sortFlag: false,
    isProcessedandCanceledBit: false,
    activeDriver: false,
    deleasedDriver: false,
    userData: null,
    changesCancelled: false,
    /*****Used on DeleaseButton operation-Delease Request****/
    isDeleaseProcess: false,
    /****Used in delease program****/
    driverDeleaseRequestObject: null,
    /****
     * Used in delease-request program to disable the deleasebutton
     * ****/
    disableDeleaseButton: false,
    isSettingDeleaseRequestProcessed: false,
    isDoubleClick: false,
    isDeleaseRequestEdit: false,
  },
  reducers: {
    setDriverDeleaseRequests: (state, action) => {
      state.driverDeleaseRequests = action.payload;
    },
    setDriverDeleaseRequestsSaveObject: (state, action) => {
      state.driverDeleaseRequestsSaveObject = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
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
    setSaveFormData: (state, action) => {
      state.saveFormData = action.payload;
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
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setStatusType: (state, action) => {
      state.statusType = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setIsProcessedandCanceledBit: (state, action) => {
      state.isProcessedandCanceledBit = action.payload;
    },
    setIsDeleaseProcess: (state, action) => {
      state.isDeleaseProcess = action.payload;
    },
    setDisableDeleaseButton: (state, action) => {
      state.disableDeleaseButton = action.payload;
    },
    setIsSettingDeleaseRequestProcessed: (state, action) => {
      state.isSettingDeleaseRequestProcessed = action.payload;
    },
    setActiveDriver: (state, action) => {
      state.activeDriver = action.payload;
    },
    setDeleasedDriver: (state, action) => {
      state.deleasedDriver = action.payload;
    },
    setDriverDeleaseRequestObject: (state, action) => {
      state.driverDeleaseRequestObject = action.payload;
    },

    resetDeleaseRequest: (state, action) => {
      // Search Filter
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.statusType = "All";

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
      state.isProcessedandCanceledBit = false;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setIsDoubleClick: (state, action) => {
      state.isDoubleClick = action.payload;
    },
    setIsDeleaseRequestEdit: (state, action) => {
      state.isDeleaseRequestEdit = action.payload;
    },
  },
});

export const {
  setDriverDeleaseRequests,
  setDisableSave,
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setDeleaseRequestData,
  setSaveFormData,
  setSearchTerms,
  setSelectedSearchCriteria,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  setSortValue,
  setSortFlag,
  setStatusType,
  setLoading,
  resetDeleaseRequest,
  setSelectedId,
  setIsProcessedandCanceledBit,
  setActiveDriver,
  setUserData,
  setDriverDeleaseRequestsSaveObject,
  toggleChangesCancelled,
  setDeleasedDriver,
  setIsDeleaseProcess,
  setDriverDeleaseRequestObject,
  setDisableDeleaseButton,
  setIsSettingDeleaseRequestProcessed,
  setIsDoubleClick,
  setIsDeleaseRequestEdit,
} = DriverDeleaseRequestsSlice.actions;

export default DriverDeleaseRequestsSlice.reducer;
