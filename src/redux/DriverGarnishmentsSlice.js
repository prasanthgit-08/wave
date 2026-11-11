import { createSlice } from "@reduxjs/toolkit";

const DriverGarnishmentsSlice = createSlice({
  name: "DriverGarnishments",
  initialState: {
    id: "",
    driverGarnishmentPK: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    searchTerm: "",
    searchCriteria: "Beginning",
    changeColor: false,
    garnishmentData: [],
    loader: false,
    viewDetail: false,
    selectedStatus: "Active",
    garnishmentDataById: null,
    saveGarnishmentObject: null,
    active: true,
    duplicateDescription: false,
    description: "",

    //postal code components
    garnishmentCity: "",
    garnishmentStateCode: "",
    garnishmentCanedian: false,
    garnishmentPostCode: "",
    postalCodeOnChange: false,
    onCancel: false,
    garnishmentZipPostLenght: "",

    //normal sort
    normalSortValue: null,
    normalSortFlag: false,

    //tab validation
    isGeneralTabValid: false,
    isCheckTabValid: false,
    loading: false,
    currentTab: "general",
    saveLoading: false,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setSaveLoading: (state, action) => {
      state.saveLoading = action.payload;
    },

    setDriverGarnishmentPK: (state, action) => {
      state.driverGarnishmentPK = action.payload;
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
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setGarnishmentData: (state, action) => {
      state.garnishmentData = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setGarnishmentDataById: (state, action) => {
      state.garnishmentDataById = action.payload;
    },
    setSaveGarnishmentObject: (state, { payload }) => {
      state.saveGarnishmentObject = { ...state.saveGarnishmentObject, ...payload };
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setGarnishmentCity: (state, action) => {
      state.garnishmentCity = action.payload;
    },
    setGarnishmentStateCode: (state, action) => {
      state.garnishmentStateCode = action.payload;
    },
    setGarnishmentCanedian: (state, action) => {
      state.garnishmentCanedian = action.payload;
    },
    setGarnishmentPostCode: (state, action) => {
      state.garnishmentPostCode = action.payload;
    },
    setPostalCodeOnChange: (state, action) => {
      state.postalCodeOnChange = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setDuplicateDescription: (state, action) => {
      state.duplicateDescription = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setIsGeneralTabValid: (state, action) => {
      state.isGeneralTabValid = action.payload;
    },
    setIsCheckTabValid: (state, action) => {
      state.isCheckTabValid = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },

    resetChanges: (state, action) => {
      state.id = "";
      state.driverGarnishmentPK = "";
      state.description = "";
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.changeColor = false;
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.selectedStatus = "Active";
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
  },
});
export const {
  setId,
  setSaveLoading,
  setDriverGarnishmentPK,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSearchTerm,
  setSearchCriteria,
  setChangeColor,
  setGarnishmentData,
  setLoader,
  setViewDetail,
  setSelectedStatus,
  setGarnishmentDataById,
  setSaveGarnishmentObject,
  setActive,
  setGarnishmentCity,
  setGarnishmentCanedian,
  setGarnishmentPostCode,
  setGarnishmentStateCode,
  setPostalCodeOnChange,
  setOnCancel,
  setNormalSortValue,
  setNormalSortFlag,
  setIsGeneralTabValid,
  setIsCheckTabValid,
  setLoading,
  toggleChangesCancelled,
  setCurrentTab,
  resetChanges,
  setDuplicateDescription,
  setDescription,
} = DriverGarnishmentsSlice.actions;

export const driverGarnishments = (state) => state.DriverGarnishments.value;
export default DriverGarnishmentsSlice.reducer;
