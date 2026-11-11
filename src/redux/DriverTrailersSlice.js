import { createSlice } from "@reduxjs/toolkit";

const DriverTrailersSlice = createSlice({
  name: "driverTrailers",
  initialState: {
    listingdata: [],
    viewDetail: false,
    formData: null,
    driverTrailersData: null,
    driverTrailers: null,
    selectedId: null,
    searchTerm: "",
    searchCriteria: "Beginning",
    selectedStatus: "Active",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    sortValue: null,
    sortFlag: false,
    isGeneralTabValid: false,
    isComplianceTabValid: false,
    isMaintenanceTabValid: false,
    isLeaseTabValid: false,
    driverTrailersInput: "",
    descriptionUnique: true,
    driverTrailerPK: 42, // DriverFK (Driver ID)
    isFirstTrailer: false,
    isTabIdentify: "general", // 0 for Table Listing ,1 for General Tab, 2 For compliance Tab, 3 Maintenance Tab, 4 Lease Tab
    ownerCity: "",
    ownerStatecode: "",
    Canadian: false,
    ownerPostcode: "",
    onCancel: false,
    changeColor: false,
    isLeaseCondition: false,
    active: true,
    saveLoaded: false,
    paginationLoading: false,
    isTrailerForm: false,
    leaseLoading: false,
    ownerLoading: false,
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingdata = action.payload;
    },
    setLeaseLoading: (state, action) => {
      state.leaseLoading = action.payload;
    },
    setSaveLoaded: (state, action) => {
      state.saveLoaded = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setDriverTrailersData: (state, { payload }) => {
      state.driverTrailersData = { ...state.driverTrailersData, ...payload };
    },
    resetDriverTrailersData: (state) => {
      state.driverTrailersData = null;
    },
    setDriverTrailers: (state, action) => {
      state.driverTrailers = action.payload;
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
    setIsGeneralTabValid: (state, action) => {
      state.isGeneralTabValid = action.payload;
    },
    setIsComplianceTabValid: (state, action) => {
      state.isComplianceTabValid = action.payload;
    },
    setIsMaintenanceTabValid: (state, action) => {
      state.isMaintenanceTabValid = action.payload;
    },
    setDriverTrailersInput: (state, action) => {
      state.driverTrailersInput = action.payload;
    },
    setIsFirstTrailer: (state, action) => {
      state.isFirstTrailer = action.payload;
    },
    setOwnerLoading: (state, action) => {
      state.ownerLoading = action.payload;
    },
    setIsTabIdentify: (state, action) => {
      state.isTabIdentify = action.payload;
    },

    setIsLeaseTabValid: (state, action) => {
      state.isLeaseTabValid = action.payload;
    },
    setOwnerCity: (state, action) => {
      state.ownerCity = action.payload;
    },
    setOwnerStatecode: (state, action) => {
      state.ownerStatecode = action.payload;
    },
    setCanadian: (state, action) => {
      state.Canadian = action.payload;
    },
    setOwnerPostcode: (state, action) => {
      state.ownerPostcode = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setIsLeaseCondition: (state, action) => {
      state.isLeaseCondition = action.payload;
    },
    setDescriptionUnique: (state, action) => {
      state.descriptionUnique = action.payload;
    },
    setDriverTrailerPK: (state, action) => {
      state.driverTrailerPK = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setPaginationLoading: (state, action) => {
      state.paginationLoading = action.payload;
    },
    setIsTrailerForm: (state, action) => {
      state.isTrailerForm = action.payload;
    },

    resetDriverTrailers: (state) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      state.selectedId = null;
      state.sortValue = null;
      state.sortFlag = false;
      state.driverTrailersInput = "";
      state.driverTrailersData = null;
      state.active = true;
      state.selectedStatus = "Active";
      state.paginationLoading = true;
      state.isTrailerForm = false;
    },
  },
});
export const {
  setListingData,
  setViewDetail,
  setFormData,
  setDriverTrailersData,
  setDriverTrailers,
  setSelectedId,
  setSearchTerm,
  setSearchCriteria,
  setSelectedStatus,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSortValue,
  setSortFlag,
  setIsGeneralTabValid,
  setIsComplianceTabValid,
  setIsMaintenanceTabValid,
  setIsLeaseTabValid,
  setDriverTrailersInput,
  resetDriverTrailers,
  resetDriverTrailersData,
  setDescriptionUnique,
  setDriverTrailerPK,
  setIsFirstTrailer,
  setIsTabIdentify,
  setOwnerCity,
  setOwnerStatecode,
  setCanadian,
  setOwnerPostcode,
  setOnCancel,
  setChangeColor,
  setIsLeaseCondition,
  setActive,
  setSaveLoaded,
  setPaginationLoading,
  setIsTrailerForm,
  setLeaseLoading,
  setOwnerLoading,
} = DriverTrailersSlice.actions;

export default DriverTrailersSlice.reducer;
