import { createSlice } from "@reduxjs/toolkit";

const DriverReserveSlice = createSlice({
  name: "driverReserveSlice",
  initialState: {
    listingData: [],
    formData: null,
    driverReserves: null,
    selectedId: null,
    viewDetail: false,
    disableSave: true,
    duplicateDescription: false,
    changeColor: false,
    overrideAmounts: false,
    restricted: false,
    percentageRequired: false,
    mileageRequired: false,
    activeButton: false,
    driverActive: false,
    restrictedReserve: false,
    requiredReserve: false,
    reserveDeductMonthly: false,
    reserveDeductYearly: false,
    reserveDeductDelease: false,
    newRestricted: false,
    // search filter
    searchTerm: "",
    searchCriteria: "Beginning",
    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    // normal sorting
    sortValue: null,
    sortFlag: false,
    reserveAdjustData: null,
    reserveAdjustPayload: null,
    cancelChanges: false,
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setDriverReserves: (state, action) => {
      state.driverReserves = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setDuplicateDescription: (state, action) => {
      state.duplicateDescription = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setOverrideAmounts: (state, action) => {
      state.overrideAmounts = action.payload;
    },
    setRestricted: (state, action) => {
      state.restricted = action.payload;
    },
    setPercentageRequired: (state, action) => {
      state.percentageRequired = action.payload;
    },
    setMileageRequired: (state, action) => {
      state.mileageRequired = action.payload;
    },
    setActiveButton: (state, action) => {
      state.activeButton = action.payload;
    },
    setDriverActive: (state, action) => {
      state.driverActive = action.payload;
    },
    setRestrictedReserve: (state, action) => {
      state.restrictedReserve = action.payload;
    },
    setRequiredReserve: (state, action) => {
      state.requiredReserve = action.payload;
    },
    setReserveDeductMonthly: (state, action) => {
      state.reserveDeductMonthly = action.payload;
    },
    setReserveDeductYearly: (state, action) => {
      state.reserveDeductYearly = action.payload;
    },
    setReserveDeductDelease: (state, action) => {
      state.reserveDeductDelease = action.payload;
    },
    setNewRestricted: (state, action) => {
      state.newRestricted = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
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
    setReserveAdjustData: (state, action) => {
      state.reserveAdjustData = action.payload;
    },
    setReserveAdjustPayload: (state, action) => {
      state.reserveAdjustPayload = action.payload;
    },
    toggleCancelChanges: (state, action) => {
      state.cancelChanges = !state.cancelChanges;
    },

    resetDriverReserves: (state) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.listingData = [];
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      state.selectedId = null;
      state.sortValue = null;
      state.sortFlag = false;
      state.driverReserves = null;
    },
  },
});

export const {
  setListingData,
  setFormData,
  setDriverReserves,
  setSelectedId,
  setViewDetail,
  setDisableSave,
  setDuplicateDescription,
  setChangeColor,
  setOverrideAmounts,
  setRestricted,
  setPercentageRequired,
  setMileageRequired,
  setActiveButton,
  setDriverActive,
  setRequiredReserve,
  setRestrictedReserve,
  setReserveDeductMonthly,
  setReserveDeductYearly,
  setReserveDeductDelease,
  setNewRestricted,
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSortValue,
  setSortFlag,
  resetDriverReserves,
  setReserveAdjustData,
  setReserveAdjustPayload,
  toggleCancelChanges,
} = DriverReserveSlice.actions;

export default DriverReserveSlice.reducer;
