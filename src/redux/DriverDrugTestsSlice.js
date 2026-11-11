import { createSlice } from "@reduxjs/toolkit";

const DriverDrugTestsSlice = createSlice({
  name: "driverDrugTests",
  initialState: {
    listingData: [],
    viewDetail: false,
    formData: null,
    addTestData: null,
    driverDrugTestData: null,
    selectedId: null,
    searchTerm: "",
    searchCriteria: "All",
    searchStatus: "All",
    type: "All",
    selectedStatus: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    sortValue: null,
    sortFlag: false,
    changeColor: false,
    active: true,
    onCancel: false,
    isSaveEnabled: false,
    isEditFooterSaveEnabled: false,
    dateFrom: "",
    dateTo: "",
    notify: false,
    resultClicked: false,
    notTestedValue: false,
    isGeneralTabValid: false,
    isDrugTabValid: false,
    isAlcoholTabValid: false,
    isClinicTabValid: false,
    isTabIdentify: "general",
    overWritePermission: false,
    isAlcoholCondition: false,
    isDrugCondition: false,
    isClinicCondition: false,
    testDateCheck: false,
    isDrugStateValidation: false,
    isAlcoholStateValidation: false,
    drugLoading: false,
    resultUser: null,
    isDrugTestForm: false,
    isCloseButtonPopUp: false,
    cancelled: false,
    paginationLoader: true,
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setDrugLoading: (state, action) => {
      state.drugLoading = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setAddTestData: (state, action) => {
      state.addTestData = action.payload;
    },
    resetAddTestData: (state) => {
      state.addTestData = null;
    },
    setDriverDrugTestData: (state, { payload }) => {
      state.driverDrugTestData = { ...state.driverDrugTestData, ...payload };
    },
    resetDriverDrugTestData: (state) => {
      state.driverDrugTestData = null;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSearchStatus: (state, action) => {
      state.searchStatus = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
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
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setIsSaveEnabled: (state, action) => {
      state.isSaveEnabled = action.payload;
    },
    setIsEditFooterSaveEnabled: (state, action) => {
      state.isEditFooterSaveEnabled = action.payload;
    },
    setDateFrom: (state, action) => {
      state.dateFrom = action.payload;
    },
    setDateTo: (state, action) => {
      state.dateTo = action.payload;
    },
    setNotify: (state, action) => {
      state.notify = action.payload;
    },
    setResultClicked: (state, action) => {
      state.resultClicked = action.payload;
    },
    setNotTestedValue: (state, action) => {
      state.notTestedValue = action.payload;
    },
    setIsGeneralTabValid: (state, action) => {
      state.isGeneralTabValid = action.payload;
    },
    setIsDrugTabValid: (state, action) => {
      state.isDrugTabValid = action.payload;
    },
    setIsAlcoholTabValid: (state, action) => {
      state.isAlcoholTabValid = action.payload;
    },
    setIsClinicTabValid: (state, action) => {
      state.isClinicTabValid = action.payload;
    },
    setIsTabIdentify: (state, action) => {
      state.isTabIdentify = action.payload;
    },
    setOverWritePermission: (state, action) => {
      state.overWritePermission = action.payload;
    },
    setIsAlcoholCondition: (state, action) => {
      state.isAlcoholCondition = action.payload;
    },
    setIsDrugCondition: (state, action) => {
      state.isDrugCondition = action.payload;
    },
    setIsClinicCondition: (state, action) => {
      state.isClinicCondition = action.payload;
    },
    setTestDateCheck: (state, action) => {
      state.testDateCheck = action.payload;
    },
    setIsDrugStateValidation: (state, action) => {
      state.isDrugStateValidation = action.payload;
    },
    setIsAlcoholStateValidation: (state, action) => {
      state.isAlcoholStateValidation = action.payload;
    },
    setResultuser: (state, action) => {
      state.resultUser = action.payload;
    },
    setIsDrugTestForm: (state, action) => {
      state.isDrugTestForm = action.payload;
    },
    setIsCloseButtonPopUp: (state, action) => {
      state.isCloseButtonPopUp = action.payload;
    },
    setCancelled: (state, action) => {
      state.cancelled = action.payload;
    },
    setPaginationLoader: (state, action) => {
      state.paginationLoader = action.payload;
    },

    resetDriverDrugTests: (state) => {
      state.viewDetail = false;
      state.pageNumber = 0;
      state.totalPages = 0;
      state.formData = null;
      state.addTestData = null;
      state.selectedId = null;
      state.searchCriteria = "All";
      state.searchStatus = "All";
      state.type = "All";
      state.totalElements = 0;
      state.sortValue = null;
      state.sortFlag = false;
      state.changeColor = false;
      state.active = true;
      state.dateFrom = "";
      state.dateTo = "";
      state.onCancel = false;
      state.isSaveEnabled = false;
      state.isEditFooterSaveEnabled = false;
      state.notify = false;
      state.resultClicked = false;
      state.notTestedValue = false;
      state.isGeneralTabValid = false;
      state.isDrugTabValid = false;
      state.isAlcoholTabValid = false;
      state.isClinicTabValid = false;
      state.overWritePermission = false;
      state.isTabIdentify = "general";
      state.isAlcoholCondition = false;
      state.isDrugCondition = false;
      state.isClinicCondition = false;
      state.testDateCheck = false;
      state.isDrugStateValidation = false;
      state.isAlcoholStateValidation = false;
      state.resultUser = null;
      state.isDrugTestForm = false;
      state.drugLoading = false;
      state.isCloseButtonPopUp = false;
      state.paginationLoader = true;
    },
  },
});

export const {
  setDrugLoading,
  setListingData,
  setViewDetail,
  setFormData,
  setAddTestData,
  setDriverDrugTestData,
  resetDriverDrugTestData,
  setSelectedId,
  setSearchTerm,
  setSearchCriteria,
  setSelectedStatus,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSortValue,
  setSortFlag,
  setChangeColor,
  setActive,
  resetAddTestData,
  setOnCancel,
  setCancelled,
  setIsSaveEnabled,
  setIsEditFooterSaveEnabled,
  resetDriverDrugTests,
  setDateFrom,
  setDateTo,
  setSearchStatus,
  setType,
  setNotify,
  setResultClicked,
  setNotTestedValue,
  setIsGeneralTabValid,
  setIsDrugTabValid,
  setIsAlcoholTabValid,
  setIsClinicTabValid,
  setIsTabIdentify,
  setOverWritePermission,
  setIsAlcoholCondition,
  setIsDrugCondition,
  setIsClinicCondition,
  setTestDateCheck,
  setIsDrugStateValidation,
  setIsAlcoholStateValidation,
  setResultuser,
  setIsDrugTestForm,
  setIsCloseButtonPopUp,
  setPaginationLoader,
} = DriverDrugTestsSlice.actions;

export default DriverDrugTestsSlice.reducer;
