import { createSlice } from "@reduxjs/toolkit";

const ReservesSlice = createSlice({
  name: "reserves",
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
    //search
    listingReserveTypesData: [],
    reservesData: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    selectedStatus: "Active",
    selectedId: null,
    changeColor: false,
    viewDetail: false,
    editFormData: null,
    reserveTypeId: null,
    //editing
    reservePK: "",
    reserveTypeFK: "",
    reserveTypePK: "",
    description: "",
    amountToBeReserved: "0.00",
    deductMonthly: "0.00",
    deductYearly: "0.00",
    deductionDate: "",
    deductDelease: "0.00",
    deductionPercentage: "0.00",
    percentageRequired: false,
    deductionMileageRate: "0.00",
    mileageRequired: false,
    monthlyActivityOverride: false,
    restricted: false,
    concurrent: false,
    required: false,
    reserveTypeRequired: false,
    overrideAmounts: false,
    reserveTypeInput: "",
    reserveTypeSelection: false,
    isDescriptionUnique: false,
    descriptionUnique: false,
    warningMessage: false,
    isToDateValidation: true,
    cancelFlag: false,
    unitLocation: "",
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

    setReservesData: (state, action) => {
      state.reservesData = action.payload;
    },
    setListingReserveTypesData: (state, action) => {
      state.listingReserveTypesData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setReserveTypeId: (state, action) => {
      state.reserveTypeId = action.payload;
    },
    setIsDescriptionUnique: (state, action) => {
      state.isDescriptionUnique = action.payload;
    },
    setDescriptionUnique: (state, action) => {
      state.descriptionUnique = action.payload;
    },
    setDateMessage: (state, action) => {
      state.dateMessage = action.payload;
    },
    setReservePK: (state, action) => {
      state.reservePK = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setReserveTypeFK: (state, action) => {
      state.reserveTypeFK = action.payload;
    },
    setReserveTypePK: (state, action) => {
      state.reserveTypePK = action.payload;
    },
    setReserveTypeInput: (state, action) => {
      state.reserveTypeInput = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setReserveTypeSelection: (state, action) => {
      state.reserveTypeSelection = action.payload;
    },

    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setAmountToBeReserved: (state, action) => {
      state.amountToBeReserved = action.payload;
    },
    setDeductMonthly: (state, action) => {
      state.deductMonthly = action.payload;
    },
    setDeductYearly: (state, action) => {
      state.deductYearly = action.payload;
    },
    setDeductionDate: (state, action) => {
      state.deductionDate = action.payload;
    },
    setDeductDelease: (state, action) => {
      state.deductDelease = action.payload;
    },
    setDeductionPercentage: (state, action) => {
      state.deductionPercentage = action.payload;
    },
    setPercentageRequired: (state, action) => {
      state.percentageRequired = action.payload;
    },
    setDeductionMileageRate: (state, action) => {
      state.deductionMileageRate = action.payload;
    },
    setMileageRequired: (state, action) => {
      state.mileageRequired = action.payload;
    },
    setMonthlyActivityOverride: (state, action) => {
      state.monthlyActivityOverride = action.payload;
    },
    setRestricted: (state, action) => {
      state.restricted = action.payload;
    },
    setConcurrent: (state, action) => {
      state.concurrent = action.payload;
    },
    setRequired: (state, action) => {
      state.required = action.payload;
    },
    setReserveTypeRequired: (state, action) => {
      state.reserveTypeRequired = action.payload;
    },
    setOverrideAmounts: (state, action) => {
      state.overrideAmounts = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setWarningMessage: (state, action) => {
      state.warningMessage = !state.changesCancelled;
    },
    setIsToDateValidation: (state, action) => {
      state.isToDateValidation = action.payload;
    },
    setCancelFlag: (state, action) => {
      state.cancelFlag = action.payload;
    },

    resetPercentage: (state, action) => {
      state.deductionPercentage = "0.00";
    },
    resetMileageRate: (state, action) => {
      state.deductionMileageRate = "0.00";
    },
    resetNew: (state, action) => {
      state.reservePK = "";
      state.reserveTypeFK = "";
      state.description = "";
      state.reserveTypeId = null;
      state.reserveTypeInput = "";
      state.amountToBeReserved = "";
      state.deductMonthly = "";
      state.deductYearly = "";
      state.deductionDate = "";
      state.deductDelease = "";
      state.deductionPercentage = "";
      state.percentageRequired = false;
      state.deductionMileageRate = "";
      state.mileageRequired = false;
      state.restricted = false;
      state.concurrent = false;
      state.required = false;
      state.overrideAmounts = false;
      state.descriptionUnique = false;
    },

    resetChanges: (state, action) => {
      state.viewDetail = false;
      state.reservePK = "";
      state.reserveTypeFK = "";
      state.description = "";
      state.reserveTypeId = null;
      state.reserveTypeInput = "";
      state.amountToBeReserved = "";
      state.deductMonthly = "";
      state.deductYearly = "";
      state.deductionDate = "";
      state.deductDelease = "";
      state.deductionPercentage = "";
      state.percentageRequired = false;
      state.deductionMileageRate = " ";
      state.mileageRequired = false;
      state.restricted = false;
      state.concurrent = false;
      state.required = false;
      state.overrideAmounts = false;
      state.editFormData = null;
    },
    setUnitLocation: (state, action) => {
      state.unitLocation = action.payload;
    },
  },
});

export const {
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setListingReserveTypesData,
  setBrowseNavigation,
  setCustomerContactData,
  setSearchTerm,
  setSearchCriteria,
  setSelectedId,
  setReservesData,
  setNormalSortValue,
  setSelectedStatus,
  setNormalSortFlag,
  setPrimaryKey,
  setReserveTypeId,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  setReserveTypeSelection,
  resetChanges,
  resetNew,
  resetRestricted,
  unresetRestricted,
  resetPercentage,
  resetMileageRate,
  setReservePK,
  setReserveTypeFK,
  setReserveTypePK,
  setReserveTypeInput,
  setDescription,
  setAmountToBeReserved,
  setDeductMonthly,
  setDeductYearly,
  setDeductionDate,
  setDeductDelease,
  setDeductionPercentage,
  setPercentageRequired,
  setDeductionMileageRate,
  setMileageRequired,
  setMonthlyActivityOverride,
  setRestricted,
  setConcurrent,
  setRequired,
  setOverrideAmounts,
  toggleChangesCancelled,
  setIsDescriptionUnique,
  setDescriptionUnique,
  setDateMessage,
  setWarningMessage,
  setIsToDateValidation,
  setCancelFlag,
  setReserveTypeRequired,
} = ReservesSlice.actions;

export default ReservesSlice.reducer;
