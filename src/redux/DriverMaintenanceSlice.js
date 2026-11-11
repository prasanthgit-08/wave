import { createSlice } from "@reduxjs/toolkit";

const DriverMaintenanceSlice = createSlice({
  name: "DriverMaintenance",
  initialState: {
    id: "",
    changeColor: false,
    viewDetail: false,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    statusType: "All",
    driverType: "All",
    cityType: "Mailing",
    showAdvancedSearch: false,
    showAdvancedSort: false,
    // Table Listing
    loading: true,
    listingData: [],
    selectedId: null,
    normalSortValue: null,
    normalSortFlag: false,
    // Pagination
    pageNumber: 0,
    totalElements: 0,
    totalPages: 0,
    // Advanced Search
    advancedSearchObject: null,
    advancedSearchPayload: null,
    // Advanced Sort
    advancedSortingOrder: null,
    advancedSortingCombination: null,
    // Advanced Search Sidebar
    advancedSearchString: "",
    checkAllAdvancedSearchBy: false,
    advancedSearchByInputs: {
      dba: false,
      address: false,
      ssn: false,
      phone: false,
      email: false,
      vin: false,
      licensePlate: false,
      nickName: false,
      driversLicense: false,
      notes: false,
      onCancel: false,
    },
    editFormData: null,
    saveFormData: null,
    postalCodeOnChange: false,

    onCancel: false,
    isDriverLoading: false,

    motorizedDriver: false,
    towableDriver: false,
    driverActive: false,
    driverFlatbed: false,
    driverDeleased: false,
    driverHireDate: "",
    companyData: null,
    checkDriverDeleaseExist: false,
    driverPrepaidBond: false,
    driverHoldPay: false,
    driverAlert: false,
    driverAlertClear: false,
    driverHasDebitCard: false,
    isGeneralTabValid: true,
    isSettingsTabValid: true,
    isComplianceTabValid: true,
    isDriverFundTabValid: true,
    isDatesTabValid: true,
    isOthersTabValid: true,
    isAwardTabValid: true,
    changesCancelled: false,
    physicalPostalCodeOnChange: false,
    cancelFlag: false,
    pictureFile: [],
    documentFile: null,
    fileType: "",
    pictureFileName: "",
    displayFlag: false,
    imageFile: [],
    clearFlag: false,
    userData: null,
    driverSSN: "",
    adsLogin: "",
    adsLoginValid: true,
    alertClearUserLoading: false,
    alertUserLoading: false,
    checkinLoading: false,
    checkinUserLoading: false,
    yesterdayUserLoading: false,
    primaryLoading: false,
    regionLoad: false,
    mentoringLoading: false,
    recruitingLoading: false,
    cardLoading: false,
    holdLoading: false,
    driverLoader: false,

    //added for orientation
    orientationFlag: false,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },

    // Search Filter
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setStatusType: (state, action) => {
      state.statusType = action.payload;
    },
    setDriverType: (state, action) => {
      state.driverType = action.payload;
    },
    setCityType: (state, action) => {
      state.cityType = action.payload;
    },
    toggleAdvancedSearch: (state, action) => {
      state.showAdvancedSearch = !state.showAdvancedSearch;
    },
    toggleAdvancedSort: (state, action) => {
      state.showAdvancedSort = !state.showAdvancedSort;
    },
    // Table Listing
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    // Pagination
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    // Advanced Search
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setAdvancedSearchPayload: (state, action) => {
      state.advancedSearchPayload = action.payload;
    },
    // Advanced Sort
    setAdvancedSortingOrder: (state, action) => {
      state.advancedSortingOrder = action.payload;
    },
    setAdvancedSortingCombination: (state, action) => {
      state.advancedSortingCombination = action.payload;
    },
    // Advanced Search Sidebar
    setAdvancedSearchString: (state, action) => {
      state.advancedSearchString = action.payload;
    },
    setCheckAllAdvancedSearchBy: (state, action) => {
      state.checkAllAdvancedSearchBy = action.payload;

      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = action.payload;
      });
    },
    setAdvancedSearchByInputs: (state, { payload }) => {
      state.advancedSearchByInputs = {
        ...state.advancedSearchByInputs,
        [payload.name]: payload.checked,
      };
    },
    // Miscellaneous
    clearAdvancedSearch: (state, action) => {
      state.advancedSearchObject = null;
      state.advancedSearchPayload = null;
      state.advancedSearchString = "";
      state.checkAllAdvancedSearchBy = false;
      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = false;
      });
    },
    resetDriver: (state, action) => {
      // Search Filter
      state.adsLoginValid = true;
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.statusType = "All";
      state.driverType = "All";
      state.cityType = "Mailing";
      state.showAdvancedSearch = false;
      state.showAdvancedSort = false;
      state.changeColor = false;
      // Table Listing
      state.loading = true;
      state.listingData = [];
      state.selectedId = null;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      // Pagination
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      // Advanced Search
      state.advancedSearchObject = null;
      state.advancedSearchPayload = null;
      // Advanced Sort
      state.advancedSortingOrder = null;
      state.advancedSortingCombination = null;
      // Advanced Search Sidebar
      state.advancedSearchString = "";
      state.checkAllAdvancedSearchBy = false;
      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = false;
      });
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setSaveFormData: (state, action) => {
      let payload = action.payload;
      state.saveFormData = { ...state.saveFormData, ...payload };
    },

    setPostalCodeOnChange: (state, action) => {
      state.postalCodeOnChange = action.payload;
    },

    setIsDriverLoading: (state, action) => {
      state.isDriverLoading = action.payload;
    },
    setMotorizedDriver: (state, action) => {
      state.motorizedDriver = action.payload;
    },

    setTowableDriver: (state, action) => {
      state.towableDriver = action.payload;
    },
    setDriverActive: (state, action) => {
      state.driverActive = action.payload;
    },
    setDriverDeleased: (state, action) => {
      state.driverDeleased = action.payload;
    },
    setCompanyData: (state, action) => {
      state.companyData = action.payload;
    },
    setDriverHireDate: (state, action) => {
      state.driverHireDate = action.payload;
    },
    setDriverFlatbed: (state, action) => {
      state.driverFlatbed = action.payload;
    },
    setCheckDriverDeleaseExist: (state, action) => {
      state.checkDriverDeleaseExist = action.payload;
    },
    setIsGeneralTabValid: (state, action) => {
      state.isGeneralTabValid = action.payload;
    },
    setIsSettingsTabValid: (state, action) => {
      state.isSettingsTabValid = action.payload;
    },
    setIsComplianceTabValid: (state, action) => {
      state.isComplianceTabValid = action.payload;
    },
    setIsDriverFundTabValid: (state, action) => {
      state.isDriverFundTabValid = action.payload;
    },
    setIsDatesTabValid: (state, action) => {
      state.isDatesTabValid = action.payload;
    },
    setIsOthersTabValid: (state, action) => {
      state.isOthersTabValid = action.payload;
    },
    setIsAwardTabValid: (state, action) => {
      state.isAwardTabValid = action.payload;
    },
    setDriverPrepaidBond: (state, action) => {
      state.driverPrepaidBond = action.payload;
    },
    setDriverHoldPay: (state, action) => {
      state.driverHoldPay = action.payload;
    },
    setDriverHasDebitCard: (state, action) => {
      state.driverHasDebitCard = action.payload;
    },
    setDriverAlert: (state, action) => {
      state.driverAlert = action.payload;
    },
    setDriverAlertClear: (state, action) => {
      state.driverAlertClear = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setPhysicalPostalCodeOnChange: (state, action) => {
      state.physicalPostalCodeOnChange = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setCancelFlag: (state, action) => {
      state.cancelFlag = action.payload;
    },
    setPictureFile: (state, action) => {
      state.pictureFile = action.payload;
    },
    setDocumentFile: (state, action) => {
      state.documentFile = action.payload;
    },
    setFileType: (state, action) => {
      state.fileType = action.payload;
    },
    setPictureFileName: (state, action) => {
      state.pictureFileName = action.payload;
    },
    setDisplayFlag: (state, action) => {
      state.displayFlag = action.payload;
    },
    setImageFile: (state, action) => {
      state.imageFile = action.payload;
    },
    setClearFlag: (state, action) => {
      state.clearFlag = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setDriverSSN: (state, action) => {
      state.driverSSN = action.payload;
    },
    setAdsLogin: (state, action) => {
      state.adsLogin = action.payload;
    },
    setAdsLoginValid: (state, action) => {
      state.adsLoginValid = action.payload;
    },
    setAlertClearUserLoad: (state, action) => {
      state.alertClearUserLoading = action.payload;
    },
    setAlertUserLoading: (state, action) => {
      state.alertUserLoading = action.payload;
    },
    setCheckinLoading: (state, action) => {
      state.checkinLoading = action.payload;
    },
    setCheckinUserLoading: (state, action) => {
      state.checkinUserLoading = action.payload;
    },
    setYesterdayUserLoading: (state, action) => {
      state.yesterdayUserLoading = action.payload;
    },
    setPrimaryLoading: (state, action) => {
      state.primaryLoading = action.payload;
    },
    setRegionLoad: (state, action) => {
      state.regionLoad = action.payload;
    },
    setMentoringLoading: (state, action) => {
      state.mentoringLoading = action.payload;
    },
    setRecruitingLoading: (state, action) => {
      state.recruitingLoading = action.payload;
    },
    setCardLoading: (state, action) => {
      state.cardLoading = action.payload;
    },
    setHoldLoading: (state, action) => {
      state.holdLoading = action.payload;
    },
    setDriverLoader: (state, action) => {
      state.driverLoader = action.payload;
    },
    setOrientationFlag: (state, action) => {
      state.orientationFlag = action.payload;
    },
  },
});
export const {
  setId,
  setChangeColor,
  setViewDetail,
  setSelectedSearchCriteria,
  setStatusType,
  setDriverType,
  setCityType,
  toggleAdvancedSearch,
  toggleAdvancedSort,
  setListingData,
  setLoading,
  setSelectedId,
  setNormalSortValue,
  setNormalSortFlag,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setAdvancedSortingOrder,
  setAdvancedSortingCombination,
  setAdvancedSearchString,
  setCheckAllAdvancedSearchBy,
  setAdvancedSearchByInputs,
  clearAdvancedSearch,
  resetDriver,
  setSearchTerm,
  setEditFormData,
  setSaveFormData,
  setPostalCodeOnChange,

  setOnCancel,
  setIsDriverLoading,
  setMotorizedDriver,
  setTowableDriver,
  setDriverDeleased,
  setDriverActive,
  setCompanyData,
  setDriverHireDate,
  setDriverFlatbed,
  setDriverAlert,
  setDriverAlertClear,
  setDriverHoldPay,
  setDriverPrepaidBond,
  setDriverHasDebitCard,
  setCheckDriverDeleaseExist,
  setIsGeneralTabValid,
  setIsSettingsTabValid,
  setIsComplianceTabValid,
  setIsDriverFundTabValid,
  setIsDatesTabValid,
  setIsOthersTabValid,
  toggleChangesCancelled,
  setPhysicalPostalCodeOnChange,
  setCancelFlag,
  setIsAwardTabValid,
  setPictureFile,
  setFileType,
  setDocumentFile,
  setPictureFileName,
  setDisplayFlag,
  setImageFile,
  setClearFlag,
  setUserData,
  setDriverSSN,
  setAdsLogin,
  setAdsLoginValid,
  setAlertUserLoading,
  setAlertClearUserLoad,
  setCheckinLoading,
  setCheckinUserLoading,
  setYesterdayUserLoading,
  setPrimaryLoading,
  setRegionLoad,
  setMentoringLoading,
  setRecruitingLoading,
  setCardLoading,
  setHoldLoading,
  setDriverLoader,
  setOrientationFlag,
} = DriverMaintenanceSlice.actions;

export default DriverMaintenanceSlice.reducer;
