import { createSlice } from "@reduxjs/toolkit";

const DriverTMRLogsSlice = createSlice({
  name: "DriverTMRLogs",
  initialState: {
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    browseNavigation: [],
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    dateMessage: false,
    //
    listingDriverTMRLogsData: [],
    listingDriverTruckData: [],
    listingDriverTrailerData: [],
    driverTMRLogsData: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    selectedId: null,
    changeColor: false,
    viewDetail: false,
    editFormData: null,
    driverTrailerId: null,
    driverTruckId: null,
    dateType: "All",
    dateFrom: "",
    dateTo: "",
    disableSave: true,
    //editing
    driverTMRLogPK: "",
    driverFK: "",
    driverTruckFK: "",
    driverTrailerDescription: "",
    driverTrucksDescription: "",
    driverTrailerFK: "",
    description: "",
    tmrperiod: "",
    notified: "",
    due: "",
    returned: "",
    notes: "",
    returnUserFK: "",
    userInput: "",
    userLookupFK: "",
    showUserLookup: false,
    userFK: "",
    isExpired: false,
    loginUserData: null,
    loginUserPK: null,
    isDueValid: true,
    isReturnedValid: true,
  },
  reducers: {
    setCustomerContactData: (state, action) => {
      state.customerContactData = action.payload;
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

    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },

    setListingDriverTMRLogsData: (state, action) => {
      state.listingDriverTMRLogsData = action.payload;
    },
    setListingDriverTruckData: (state, action) => {
      state.listingDriverTruckData = action.payload;
    },
    setListingDriverTrailerData: (state, action) => {
      state.listingDriverTrailerData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setDateType: (state, action) => {
      state.dateType = action.payload;
    },
    setDateFrom: (state, action) => {
      state.dateFrom = action.payload;
    },
    setDateTo: (state, action) => {
      state.dateTo = action.payload;
    },

    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setdriverTrailerId: (state, action) => {
      state.driverTrailerId = action.payload;
    },
    setDriverTruckId: (state, action) => {
      state.driverTruckId = action.payload;
    },

    setDriverTMRLogPK: (state, action) => {
      state.driverTMRLogPK = action.payload;
    },
    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },
    setDriverTruckFK: (state, action) => {
      state.driverTruckFK = action.payload;
    },
    setDriverTrailerFK: (state, action) => {
      state.driverTrailerFK = action.payload;
    },
    setDriverTrailerDescription: (state, action) => {
      state.driverTrailerDescription = action.payload;
    },
    setDriverTrucksDescription: (state, action) => {
      state.driverTrucksDescription = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
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
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setTMRPeriod: (state, action) => {
      state.tmrperiod = action.payload;
    },
    setNotified: (state, action) => {
      state.notified = action.payload;
    },
    setDue: (state, action) => {
      state.due = action.payload;
    },
    setReturned: (state, action) => {
      state.returned = action.payload;
    },
    setIsDueValid: (state, action) => {
      state.isDueValid = action.payload;
    },
    setIsReturnedValid: (state, action) => {
      state.isReturnedValid = action.payload;
    },
    setReturnUserFK: (state, action) => {
      state.returnUserFK = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    setUserFK: (state, action) => {
      state.userFK = action.payload;
    },
    setUserLookupFK: (state, action) => {
      state.userLookupFK = action.payload;
    },
    setShowUserLookup: (state, action) => {
      state.showUserLookup = action.payload;
    },

    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setIsExpired: (state, action) => {
      state.isExpired = action.payload;
    },
    setLoginUserData: (state, action) => {
      state.loginUserData = action.payload;
    },
    setLoginUserPK: (state, action) => {
      state.loginUserPK = action.payload;
    },

    resetChanges: (state, action) => {
      state.driverTMRLogPK = "";
      state.searchCriteria = "Beginning";
      state.searchTerm = "";
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.dateType = "All";
      state.dateFrom = "";
      state.dateTo = "";
      state.selectedId = "";
      state.editFormData = null;
      state.pageNumber = 0;
    },
    resetFields: (state) => {
      state.returned = "";
      state.returnUserFK = "";
      state.userInput = "";
      state.editFormData = null;
    },
  },
});

export const {
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setListingDriverTMRLogsData,
  setBrowseNavigation,
  setDriverTrailerData,
  setDriverTrucksData,
  setSearchTerm,
  setSearchCriteria,
  setDateType,
  setDateFrom,
  setDateTo,
  setSelectedStatus,
  setSelectedId,
  setDisableSave,
  setIsDueValid,
  setIsReturnedValid,
  setNormalSortValue,
  setNormalSortFlag,
  setPrimaryKey,
  setdriverTrailerId,
  setDriverTruckId,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  resetChanges,
  resetNew,
  setDriverTMRLogPK,
  setDriverTrailerFK,
  setDriverTrailerDescription,
  setDriverTrucksDescription,
  setDriverTruckFK,
  setDriverFK,
  setDescription,
  setTMRPeriod,
  setNotified,
  setDue,
  setReturned,
  setReturnUserFK,
  setNotes,
  setUserInput,
  setUserFK,
  setShowUserLookup,
  toggleChangesCancelled,
  setIsExpired,
  setLoginUserData,
  setLoginUserPK,
  resetFields,
} = DriverTMRLogsSlice.actions;

export default DriverTMRLogsSlice.reducer;
