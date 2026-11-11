import { createSlice } from "@reduxjs/toolkit";

const DispatchesSlice = createSlice({
  name: "DispatchesSlice",
  initialState: {
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    driverData: null,
    driverTrailerData: [],
    driverTruckData: [],
    complianceData: [],
    driverFK: "",
    regionStatus: "outbound",
    divisionStatus: "driveaway",
    dispatcherStatesChecked: true,
    normalSortValue: null,
    normalSortFlag: false,
    hasExpiredItems: null,
    viewDetail: false,
    selectedPOE: "",
    disablePOEContinue: false,
    isValidationsSuccess: true,
    dispatchPKS: [],
    pickupStateCodes: [],
    enteredUnitNumber: null,
    selectedYardPK: null,
    selectedCustomerPK: null,
    selectedPlantPK: null,

    unitDatesFlag: false,
    pickupDate: null, //new Date(),
    deliveryDate: null, //new Date(),
    selectedDispatchPK: null,
    dispatchViewObject: null,
    totalFee: 0,
    showOverrideModal: false,
    deliveryYardsInput: "",
    customerNameInput: "",
    pickupPlantInput: "",
    eligibleTruckPKS: [], // Incompliance trucks
    eligibleTrailerPKS: [], //Incompliance trailers
    shortListedTrucKMap: null, // trucks after doing the gvwr & classA/B filteration
    selectedShortListedTruckPK: null,
    minimumPriority: null,
    mileageFrom: 0,
    mileageTo: 9999,
    isWeekendDelivery: false, // default selected truck which is 0th element from shortlistedTruckMap
    gvwrEligibleTrucks: [],
    eligibleTrailers: [],
    selectedTruckPK: null,
    selectedTrailerPK: null,
    ratePerMile: null,
    rateObj: null,
    flatRated: false,
    disableDispatch: false,
    disableDates: false,
    reloadChecked: false,
    reloadDispatchPKSWithOutbound: null,
    reloadCountWithOutbound: 0,
    selectedDispatchPKList: [],
    selectedUnitMultiLoadFK: null,
    sortByRatePerMile: false,
    includeSinglesChecked: false,
    includeOrphansChecked: false,
    isMultiUnitDispatch: false,
    isPrevious: false,
    isNext: false,
    index: 0,
    hasPrevious: false,
    hasNext: false,
    multiUnitConfirmationVO: null,
    individualUnitConfirmationVO: null,
    individualUnitConfirmationVOList: [],
    totalCurrentUnitsCount: null,
    isUnitSelected: false,
    filteredDispatchPKList: null,
    previousFilteredDispatchPKList: null,
    multiUnitsMap: null,
    totalUnitsCountRedux: 0,
    eligibleTrailerPKS: [],
    selectedTrailerPK: null,
    eligibleTrailerPKSMap: [],
    isFlatBedRequired: false,
    isFlatBedVisible: false,
    isTrailerDisable: false,
    requireFlatbedFromBackEnd: false,
    individualUnitSaveVOList: [],
    multiUnitBrowseDataMap: null,
    unitBrowseMap: null,
    canOnlyDispatchTwoUnits: false,
    selectedSinglesCount: 0,
    isSinglesSelectedPreviously: false,
    clickedDispatchPK: null,
    validFlatbedTruck: false,
    validFlatbedTrailer: false,
    validHaulAndTowTruck: false,
    hasFlatbedTrailer: false,
    hasCodriverComplianceExpired: false,
    hasBobtaildriverComplianceExpired: false,
    codriver: null,
    bobTaildriver: null,
    hasCodriverOrBobtaildriverPassport: false,
    canadianPickup: false,
    canadianDelivery: false,
  },
  reducers: {
    setHasExpiredItems: (state, action) => {
      state.hasExpiredItems = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setDriverData: (state, action) => {
      state.driverData = action.payload;
    },
    setDriverTrailerData: (state, action) => {
      state.driverTrailerData = action.payload;
    },
    setDriverTruckData: (state, action) => {
      state.driverTruckData = action.payload;
    },
    setComplianceData: (state, action) => {
      state.complianceData = action.payload;
    },
    setDisablePOEContinue: (state, action) => {
      state.disablePOEContinue = action.payload;
    },
    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },
    setRigionStatus: (state, action) => {
      state.regionStatus = action.payload;
    },

    setDivisionStatus: (state, action) => {
      state.divisionStatus = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setIsValidationSuccess: (state, action) => {
      state.isValidationsSuccess = action.payload;
    },
    setSelectedPOE: (state, action) => {
      state.selectedPOE = action.payload;
    },
    setDispatchPKS: (state, action) => {
      state.dispatchPKS = action.payload;
    },
    setPickupStateCodes: (state, action) => {
      state.pickupStateCodes = action.payload;
    },
    setEnteredUnitNumber: (state, action) => {
      state.enteredUnitNumber = action.payload;
    },
    setSelectedYardPK: (state, action) => {
      state.selectedYardPK = action.payload;
    },
    setSelectedCustomerPK: (state, action) => {
      state.selectedCustomerPK = action.payload;
    },
    setSelectedPlantPK: (state, action) => {
      state.selectedPlantPK = action.payload;
    },
    setUnitDatesFlag: (state, action) => {
      state.unitDatesFlag = action.payload;
    },
    setPickupDate: (state, action) => {
      state.pickupDate = action.payload;
    },
    setDeliveryDate: (state, action) => {
      state.deliveryDate = action.payload;
    },
    setSelectedDispatchPK: (state, action) => {
      state.selectedDispatchPK = action.payload;
    },
    setDispatchViewObject: (state, action) => {
      state.dispatchViewObject = action.payload;
    },
    setTotalFee: (state, action) => {
      state.totalFee = action.payload;
    },
    setEligibleTruckPKS: (state, action) => {
      state.eligibleTruckPKS = action.payload;
    },
    setEligibleTrailerPKS: (state, action) => {
      state.eligibleTrailerPKS = action.payload;
    },

    setShortListedTrucKMap: (state, action) => {
      state.shortListedTrucKMap = action.payload;
    },
    setSelectedDispatchPKList: (state, action) => {
      state.selectedDispatchPKList = action.payload;
    },
    setSelectedUnitMultiLoadFK: (state, action) => {
      state.selectedUnitMultiLoadFK = action.payload;
    },
    resetDispatches: (state, action) => {
      state.unitDatesFlag = false;
      state.pickupDate = null;
      state.deliveryDate = null;
      state.selectedDispatchPK = null;
      state.dispatchViewObject = null;
      state.totalFee = 0;
      state.selectedPOE = "";
      state.driverData = null;
      state.divisionStatus = "driveaway";
      state.regionStatus = "outbound";
      state.enteredUnitNumber = null;
      state.pageNumber = 0;
      state.pickupStateCodes = [];
      state.selectedYardPK = null;
      state.deliveryYardsInput = null;
      state.selectedCustomerPK = null;
      state.customerNameInput = null;
      state.selectedPlantPK = null;
      state.pickupPlantInput = null;
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.pickupDate = null;
      state.deliveryDate = null;
      state.flatRated = false;
      state.rate = null;
      state.disableDispatch = false;
      state.disableDates = false;
      state.mileageFrom = 0;
      state.mileageTo = 9999;
      state.isWeekendDelivery = false;
      state.reloadChecked = false;
      state.minimumPriority = null;
      state.ratePerMile = null;
      state.isFlatBedRequired = false;
      state.isFlatBedVisible = false;
      state.eligibleTrailers = [];
      state.eligibleTruckPKS = [];
      state.eligibleTrailerPKS = [];
      state.isTrailerDisable = false;
      state.requireFlatbedFromBackEnd = false;
      state.selectedUnitMultiLoadFK = null;
      state.multiUnitsMap = null;
      state.selectedDispatchPK = null;
      state.index = 0;
      state.selectedDispatchPKList = [];
      state.individualUnitSaveVOList = [];
      state.validFlatbedTruck = false;
      state.validFlatbedTrailer = false;
      state.validHaulAndTowTruck = false;
      state.includeSinglesChecked = false;
      state.includeOrphansChecked = false;
      state.isMultiUnitDispatch = false;
      state.totalUnitsCountRedux = 0;
      state.hasFlatbedTrailer = false;
      state.selectedSinglesCount = 0;
      state.canadianDelivery = false;
      state.canadianPickup = false;
    },
    setShowOverrideModal: (state, action) => {
      state.showOverrideModal = action.payload;
    },
    setDeliveryYardsInput: (state, action) => {
      state.deliveryYardsInput = action.payload;
    },
    setCustomerNameInput: (state, action) => {
      state.customerNameInput = action.payload;
    },
    setPickupPlantInput: (state, action) => {
      state.pickupPlantInput = action.payload;
    },
    setSelectedShortListedTruckPK: (state, action) => {
      state.selectedShortListedTruckPK = action.payload;
    },
    setGvwrEligibleTrucks: (state, action) => {
      state.gvwrEligibleTrucks = action.payload;
    },
    setEligibleTrailers: (state, action) => {
      state.eligibleTrailers = action.payload;
    },
    setSelectedTruckPK: (state, action) => {
      state.selectedTruckPK = action.payload;
    },
    setSelectedTrailerPK: (state, action) => {
      state.selectedTrailerPK = action.payload;
    },

    setMinimumPriority: (state, action) => {
      state.minimumPriority = action.payload;
    },

    setMileageFrom: (state, action) => {
      state.mileageFrom = action.payload;
    },

    setMileageTo: (state, action) => {
      state.mileageTo = action.payload;
    },
    setWeekendDelivery: (state, action) => {
      state.isWeekendDelivery = action.payload;
    },
    setRatePerMile: (state, action) => {
      state.ratePerMile = action.payload;
    },
    setFlatRated: (state, action) => {
      state.flatRated = action.payload;
    },
    setRateObj: (state, action) => {
      state.rateObj = action.payload;
    },
    setDisableDispatch: (state, action) => {
      state.disableDispatch = action.payload;
    },
    setDisableDates: (state, action) => {
      state.disableDates = action.payload;
    },

    setReloadChecked: (state, action) => {
      state.reloadChecked = action.payload;
    },

    setReloadDispatchPKSWithOutbound: (state, action) => {
      state.reloadDispatchPKSWithOutbound = action.payload;
    },

    setReloadCountWithOutbound: (state, action) => {
      state.reloadCountWithOutbound = action.payload;
    },
    setSortByRatePerMile: (state, action) => {
      state.sortByRatePerMile = action.payload;
    },
    setIncludeSinglesChecked: (state, action) => {
      state.includeSinglesChecked = action.payload;
    },
    setIncludeOrphansChecked: (state, action) => {
      state.includeOrphansChecked = action.payload;
    },
    setIsMultiUnitDispatch: (state, action) => {
      state.isMultiUnitDispatch = action.payload;
    },
    setIsPrevious: (state, action) => {
      state.isPrevious = action.payload;
    },
    setIsNext: (state, action) => {
      state.isNext = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setHasNext: (state, action) => {
      state.hasNext = action.payload;
    },
    setHasPrevious: (state, action) => {
      state.hasPrevious = action.payload;
    },
    setMultiUnitConfirmationVO: (state, action) => {
      state.multiUnitConfirmationVO = action.payload;
    },
    setIndividualUnitConfirmationVO: (state, action) => {
      state.individualUnitConfirmationVO = action.payload;
    },
    setIndividualUnitConfirmationVOList: (state, action) => {
      state.individualUnitConfirmationVOList = action.payload;
    },
    setTotalCurrentUnitsCount: (state, action) => {
      state.totalCurrentUnitsCount = action.payload;
    },
    setIsUnitSelected: (state, action) => {
      state.isUnitSelected = action.payload;
    },
    setFilteredDispatchPKList: (state, action) => {
      state.filteredDispatchPKList = action.payload;
    },
    setPreviousFilteredDispatchPKList: (state, action) => {
      state.previousFilteredDispatchPKList = action.payload;
    },
    setMultiUnitsMap: (state, action) => {
      state.multiUnitsMap = action.payload;
    },
    setTotalUnitsCountRedux: (state, action) => {
      state.totalUnitsCountRedux = action.payload;
    },
    setEligibleTrailerPKS: (state, action) => {
      state.eligibleTrailerPKS = action.payload;
    },
    setSelectedTrailerPK: (state, action) => {
      state.selectedTrailerPK = action.payload;
    },
    setEligibleTrailerPKSMap: (state, action) => {
      state.eligibleTrailerPKSMap = action.payload;
    },
    setRequiredFlatBed: (state, action) => {
      state.isFlatBedRequired = action.payload;
    },
    setFlatBedVisible: (state, action) => {
      state.isFlatBedVisible = action.payload;
    },
    setTrailerDisable: (state, action) => {
      state.isTrailerDisable = action.payload;
    },
    setRequireFlatbedFromBackEnd: (state, action) => {
      state.requireFlatbedFromBackEnd = action.payload;
    },
    setIndividualUnitSaveVOList: (state, action) => {
      state.individualUnitSaveVOList = action.payload;
    },
    setMultiUnitBrowseDataMap: (state, action) => {
      state.multiUnitBrowseDataMap = action.payload;
    },
    setUnitBrowseMap: (state, action) => {
      state.unitBrowseMap = action.payload;
    },
    setCanOnlyDispatchTwoUnits: (state, action) => {
      state.canOnlyDispatchTwoUnits = action.payload;
    },
    setSelectedSinglesCount: (state, action) => {
      state.selectedSinglesCount = action.payload;
    },
    setIsSinglesSelectedPreviously: (state, action) => {
      state.isSinglesSelectedPreviously = action.payload;
    },
    setClickedDispatchPK: (state, action) => {
      state.clickedDispatchPK = action.payload;
    },
    setValidFlatbedTruck: (state, action) => {
      state.validFlatbedTruck = action.payload;
    },
    setValidFlatbedTrailer: (state, action) => {
      state.validFlatbedTrailer = action.payload;
    },
    setValidHaulAndTowTruck: (state, action) => {
      state.validHaulAndTowTruck = action.payload;
    },

    setHasFlatbedTrailer: (state, action) => {
      state.hasFlatbedTrailer = action.payload;
    },

    setHasCodriverComplianceExpired: (state, action) => {
      state.hasCodriverComplianceExpired = action.payload;
    },

    setHasBobtaildriverComplianceExpired: (state, action) => {
      state.hasBobtaildriverComplianceExpired = action.payload;
    },

    setCodriver: (state, action) => {
      state.codriver = action.payload;
    },

    setBobTaildriver: (state, action) => {
      state.bobTaildriver = action.payload;
    },
    setHasCodriverOrBobtaildriverPassport: (state, action) => {
      state.hasCodriverOrBobtaildriverPassport = action.payload;
    },
    setCanadianDelivery: (state, action) => {
      state.canadianDelivery = action.payload;
    },

    setCanadianPickup: (state, action) => {
      state.canadianPickup = action.payload;
    },
  },
});

export const {
  setPageNumber,

  setDriverData,
  setDriverFK,
  setDriverTrailerData,
  setDriverTruckData,
  setRigionStatus,
  setDivisionStatus,
  setComplianceData,
  setTotalPages,
  setTotalElements,
  setNormalSortValue,
  setNormalSortFlag,
  setHasExpiredItems,
  setViewDetail,
  setIsValidationSuccess,
  setSelectedPOE,
  setDisablePOEContinue,
  setDispatchPKS,
  setPickupStateCodes,
  setSelectedYardPK,
  setSelectedCustomerPK,
  setSelectedPlantPK,
  setEnteredUnitNumber,
  setUnitDatesFlag,
  setPickupDate,
  setDeliveryDate,
  setSelectedDispatchPK,
  setDispatchViewObject,
  setTotalFee,
  resetDispatches,
  setShowOverrideModal,
  setDeliveryYardsInput,
  setCustomerNameInput,
  setPickupPlantInput,
  setEligibleTruckPKS,
  setEligibleTrailerPKS,
  setShortListedTrucKMap,
  setSelectedShortListedTruckPK,
  setSelectedTruckPK,
  setSelectedTrailerPK,
  setGvwrEligibleTrucks,
  setEligibleTrailers,
  setMinimumPriority,
  setMileageFrom,
  setMileageTo,
  setWeekendDelivery,
  setRateObj,
  setRatePerMile,
  setFlatRated,
  setDisableDispatch,
  setDisableDates,
  setReloadChecked,
  setReloadDispatchPKSWithOutbound,
  setReloadCountWithOutbound,
  setSelectedDispatchPKList,
  setSelectedUnitMultiLoadFK,
  setSortByRatePerMile,
  setIncludeSinglesChecked,
  setIncludeOrphansChecked,
  setIsMultiUnitDispatch,
  setIsPrevious,
  setIsNext,
  setIndex,
  setHasPrevious,
  setHasNext,
  setMultiUnitConfirmationVO,
  setIndividualUnitConfirmationVO,
  setIndividualUnitConfirmationVOList,
  setTotalCurrentUnitsCount,
  setIsUnitSelected,
  setFilteredDispatchPKList,
  setPreviousFilteredDispatchPKList,
  setMultiUnitsMap,
  setTotalUnitsCountRedux,
  setEligibleTrailerPKSMap,
  setRequiredFlatBed,
  setFlatBedVisible,
  setTrailerDisable,
  setRequireFlatbedFromBackEnd,
  setIndividualUnitSaveVOList,
  setMultiUnitBrowseDataMap,
  setUnitBrowseMap,
  setCanOnlyDispatchTwoUnits,
  setSelectedSinglesCount,
  setIsSinglesSelectedPreviously,
  setClickedDispatchPK,
  setValidFlatbedTrailer,
  setValidFlatbedTruck,
  setValidHaulAndTowTruck,
  setHasFlatbedTrailer,
  setHasCodriverComplianceExpired,
  setHasBobtaildriverComplianceExpired,
  setCodriver,
  setBobTaildriver,
  setHasCodriverOrBobtaildriverPassport,
  setCanadianDelivery,
  setCanadianPickup,
} = DispatchesSlice.actions;

export default DispatchesSlice.reducer;
