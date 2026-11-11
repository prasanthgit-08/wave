import { createSlice } from "@reduxjs/toolkit";

const YardCheckinSlice = createSlice({
  name: "yardCheckin",

  initialState: {
    //unit shuttles
    unitShuttlesPK: "",
    unitShuttleData: "",

    //Driver Selection Screen
    companyNamesForDrivers: "",
    companyNameForDriverSelection: "",
    companyNameFKForDriverSelection: "",
    selectedDriverCompanyDetails: "",
    driverNameInput: "",
    selectedDriver: "",
    selectedDriverID: "",
    driverDefaultCompanyName: "",
    selectedDriverCompanyID: null,
    enablePostPay: false,

    //Unit Selection Screen
    unitDefaultCompanyName: "",
    selectedUnitCompanyName: "",
    selectedUnitCompanyFK: "",
    allUnitsData: [],
    loader: true,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    changeColor: false,
    unitNumberLast5: "",
    unitNumberInput: "",
    unitNumberPK: "",
    unitData: null,
    specialCodeOfSelectedUnit: "",
    companySelected: "",
    isSelectedUnitTowable: "",
    isSelectedUnitMotorized: "",
    isEligibleForBonus: false,
    cancelChanges: false,
    unitPickupCustomerPlantFK: "",
    isEligibleForDelay: false,
    isShuttleDateValid: true,

    //Additional Shuttle Screen
    secondShuttle: false,
    typeOfShuttle: "",
    additionalReason: "",
    dispatchShuttle: false,

    //Unit Shuttles Table Save
    unitShuttlesVO: "",

    //Plant To Yard Shuttle Screen
    shuttleAmountForPlantToYard: "",
    shuttleMilesForPlantToYard: "",
    shuttleDateForPlantToYard: "",
    statusForPlantToYard: "inYard",
    pickupCityIDForPlantToYard: "",
    pickupCityNameForPlantToYard: "",
    deliveryYardIDForPlantToYard: "",
    deliveryYardNameForPlantToYard: "",
    deliveryYardCodeForPlantToYard: "",
    isCityYardCombinationExist: "",
    rowForPlantToYard: "",
    positionForPlantToYard: "",
    gvwrForPlantToYard: "",
    savedSuccessForPlantToYard: false,
    isPlantToYardRouteConfirmed: false,
    isToPlant: false,
    // Unit Activation
    showUnitActivationScreen: false,

    //Yard To Plant Shuttle Screen
    shuttleAmountForYardToPlant: "",
    shuttleMilesForYardToPlant: "",
    shuttleDateForYardToPlant: "",
    pickupYardIDForYardToPlant: "",
    pickupYardNameForYardToPlant: "",
    pickupYardCodeForYardToPlant: "",
    deliveryCityIDForYardToPlant: "",
    deliveryCityNameForYardToPlant: "",
    deliveryPlantIDForYardToPlant: "",
    deliveryPlantNameForYardToPlant: "",
    deliveryPlantCodeForYardToPlant: "",
    isYardCityCombinationExist: "",
    savedSuccessForYardToPlant: false,
    isYardToPlantRouteConfirmed: false,

    //Yard To Yard Shuttle Screen
    shuttleAmountForYardToYard: "",
    shuttleMilesForYardToYard: "",
    shuttleDateForYardToYard: "",
    pickupYardIDForYardToYard: "",
    pickupYardNameForYardToYard: "",
    deliveryYardIDForYardToYard: "",
    deliveryYardNameForYardToYard: "",
    pickupYardCodeForYardToYard: "",
    deliveryYardCodeForYardToYard: "",
    isYardToYardCombinationExist: "",
    rowForYardToYard: "",
    positionForYardToYard: "",
    savedSuccessForYardToYard: false,
    isYardToYardRouteConfirmed: false,

    //Plant To Plant Shuttle Screen
    pickupPlantIDForPlantToPlant: "",
    pickupPlantNameForPlantToPlant: "",
    deliveryPlantIDForPlantToPlant: "",
    deliveryPlantNameForPlantToPlant: "",
    customerFKForPlantToPlant: "",
    shuttleDateForPlantToPlant: "",
    shuttleAmountForPlantToPlant: "",
    shuttleMilesForPlantToPlant: "",
    isPlantToPlantCombinationExist: "",
    pickupPlantCodeForPlantToPlant: "",
    deliveryPlantCodeForPlantToPlant: "",
    savedSuccessForPlantToPlant: false,
    isPlantToPlantRouteConfirmed: false,

    //Dry Run Screen
    pickupCityIDForDryRun: "",
    pickupCityNameForDryRun: "",
    deliveryYardIDForDryRun: "",
    deliveryYardNameForDryRun: "",
    deliveryYardCodeForDryRun: "",
    shuttleAmountForDryRun: "",
    shuttleMilesForDryRun: "",
    shuttleDateForDryRun: "",
    isCityToYardCombinationExistForDryRun: "",
    reasonForDryRun: "",
    savedSuccessForDryRun: false,
    isDryRunRouteConfirmed: false,

    //Shuttle Bonus Screen
    shuttleAmountForShuttleBonus: "",
    reasonForShuttleBonus: "",
    savedSuccessForShuttleBonus: false,

    //Dealer Shuttle Screen
    allDealerShuttleData: [],
    selectedDealerShuttleData: "",
    dealerShuttleAmount: "",
    dealerShuttleMiles: "",
    dealerShuttleDate: "",
    savedSuccessForDealerShuttle: false,

    //Shuttle Delay Screen
    reasonForShuttleDelay: "",
    authorizedByForShuttleDelay: "",
    driverFKForShuttleDelay: "",
    reportingDriverName: "",
    userFKForShuttleDelay: "",
    reportingUsername: "",
    reportedByForShuttleDelay: "",
    dateReportedForShuttleDelay: "",
    notesForShuttleDelay: "",
    unitShuttleDelaysVO: "",
    savedSuccessForShuttleDelay: false,

    //Order Not Enter Screen
    selectedUnitCompanyNameONE: "",
    selectedUnitCompanyFKONE: "",
    unitNumberForOrderNotEnter: "",
    unitTypeMotorized: false,
    unitTypeTowable: false,
    customerSelectedForOrderNotEnter: "",
    plantSelectedForOrderNotEnter: "",
    shuttleDateForOrderNotEnter: "",
    shuttleAmountForOrderNotEnter: "",
    shuttleMilesForOrderNotEnter: "",
    pickupCityForOrderNotEnter: "",
    pickupCityNameForOrderNotEnter: "",
    deliveryYardForOrderNotEnter: "",
    deliveryYardCodeForOrderNotEnter: "",
    isCityYardCombinationExistForOrderNotEnter: "",
    rowForOrderNotEnter: "",
    positionForOrderNotEnter: "",
    unitShuttleONEsVO: "",
    isSelectedCustomerDPU: false,
    savedSuccessForOrderNotEnter: false,
    isUnitShuttleONEUnique: true,

    //Activation Delay
    reasonForActivationDelay: "",
    //Driver type
    motorized: false,
    towable: false,
  },
  reducers: {
    //unit shuttles
    setUnitShuttlesPK: (state, action) => {
      state.unitShuttlesPK = action.payload;
    },
    setUnitShuttleData: (state, action) => {
      state.unitShuttleData = action.payload;
    },
    //Driver Selection Screen
    setCompanyNamesForDrivers: (state, action) => {
      state.companyNamesForDrivers = action.payload;
    },
    setCompanyNameForDriverSelection: (state, action) => {
      state.companyNameForDriverSelection = action.payload;
    },
    setCompanyNameFKForDriverSelection: (state, action) => {
      state.companyNameFKForDriverSelection = action.payload;
    },
    setSelectedDriverCompanyDetails: (state, action) => {
      state.selectedDriverCompanyDetails = action.payload;
    },
    setDriverNameInput: (state, action) => {
      state.driverNameInput = action.payload;
    },
    setSelectedDriver: (state, action) => {
      state.selectedDriver = action.payload;
    },
    setSelectedDriverID: (state, action) => {
      state.selectedDriverID = action.payload;
    },
    setDriverDefaultCompanyName: (state, action) => {
      state.driverDefaultCompanyName = action.payload;
    },
    setSelectedDriverCompanyID: (state, action) => {
      state.selectedDriverCompanyID = action.payload;
    },
    setEnablePostPay: (state, action) => {
      state.enablePostPay = action.payload;
    },
    //Unit Selection Screen
    setSelectedUnitCompanyName: (state, action) => {
      state.selectedUnitCompanyName = action.payload;
    },
    setUnitDefaultCompanyName: (state, action) => {
      state.unitDefaultCompanyName = action.payload;
    },
    setSelectedUnitCompanyFK: (state, action) => {
      state.selectedUnitCompanyFK = action.payload;
    },
    setAllUnitsData: (state, action) => {
      state.allUnitsData = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
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
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setUnitNumberLast5: (state, action) => {
      state.unitNumberLast5 = action.payload;
    },
    setUnitNumberInput: (state, action) => {
      state.unitNumberInput = action.payload;
    },
    setUnitNumberPK: (state, action) => {
      state.unitNumberPK = action.payload;
    },
    setUnitData: (state, action) => {
      state.unitData = action.payload;
    },
    setSpecialCodeOfSelectedUnit: (state, action) => {
      state.specialCodeOfSelectedUnit = action.payload;
    },
    setCompanySelected: (state, action) => {
      state.companySelected = action.payload;
    },

    setIsSelectedUnitTowable: (state, action) => {
      state.isSelectedUnitTowable = action.payload;
    },
    setIsSelectedUnitMotorized: (state, action) => {
      state.isSelectedUnitMotorized = action.payload;
    },
    setIsEligibleForBonus: (state, action) => {
      state.isEligibleForBonus = action.payload;
    },
    toggleCancelChanges: (state, action) => {
      state.cancelChanges = !state.cancelChanges;
    },
    setUnitPickupCustomerPlantFK: (state, action) => {
      state.unitPickupCustomerPlantFK = action.payload;
    },
    setIsEligibleForDelay: (state, action) => {
      state.isEligibleForDelay = action.payload;
    },
    setIsUnitShuttleONEUnique: (state, action) => {
      state.isUnitShuttleONEUnique = action.payload;
    },
    setIsShuttleDateValid: (state, action) => {
      state.isShuttleDateValid = action.payload;
    },
    //Additional Shuttle Screen
    setSecondShuttle: (state, action) => {
      state.secondShuttle = action.payload;
    },
    setTypeOfShuttle: (state, action) => {
      state.typeOfShuttle = action.payload;
    },
    setAdditionalReason: (state, action) => {
      state.additionalReason = action.payload;
    },
    setDispatchShuttle: (state, action) => {
      state.dispatchShuttle = action.payload;
    },

    //Unit Shuttles Table Save
    setUnitShuttlesVO: (state, action) => {
      state.unitShuttlesVO = action.payload;
    },

    //Plant To Yard Shuttle Screen
    setShuttleAmountForPlantToYard: (state, action) => {
      state.shuttleAmountForPlantToYard = action.payload;
    },
    setShuttleMilesForPlantToYard: (state, action) => {
      state.shuttleMilesForPlantToYard = action.payload;
    },
    setShuttleDateForPlantToYard: (state, action) => {
      state.shuttleDateForPlantToYard = action.payload;
    },
    setStatusForPlantToYard: (state, action) => {
      state.statusForPlantToYard = action.payload;
    },
    setPickupCityIDForPlantToYard: (state, action) => {
      state.pickupCityIDForPlantToYard = action.payload;
    },
    setPickupCityNameForPlantToYard: (state, action) => {
      state.pickupCityNameForPlantToYard = action.payload;
    },
    setDeliveryYardIDForPlantToYard: (state, action) => {
      state.deliveryYardIDForPlantToYard = action.payload;
    },
    setDeliveryYardNameForPlantToYard: (state, action) => {
      state.deliveryYardNameForPlantToYard = action.payload;
    },
    setDeliveryYardCodeForPlantToYard: (state, action) => {
      state.deliveryYardCodeForPlantToYard = action.payload;
    },
    setIsCityYardCombinationExist: (state, action) => {
      state.isCityYardCombinationExist = action.payload;
    },
    setRowForPlantToYard: (state, action) => {
      state.rowForPlantToYard = action.payload;
    },
    setPositionForPlantToYard: (state, action) => {
      state.positionForPlantToYard = action.payload;
    },
    setGvwrForPlantToYard: (state, action) => {
      state.gvwrForPlantToYard = action.payload;
    },
    setShowUnitActivationScreen: (state, action) => {
      state.showUnitActivationScreen = action.payload;
    },
    setSavedSuccessForPlantToYard: (state, action) => {
      state.savedSuccessForPlantToYard = action.payload;
    },
    setIsPlantToYardRouteConfirmed: (state, action) => {
      state.isPlantToYardRouteConfirmed = action.payload;
    },
    setIsYardToPlantRouteConfirmed: (state, action) => {
      state.isYardToPlantRouteConfirmed = action.payload;
    },
    setIsYardToYardRouteConfirmed: (state, action) => {
      state.isYardToYardRouteConfirmed = action.payload;
    },
    setIsPlantToPlantRouteConfirmed: (state, action) => {
      state.isPlantToPlantRouteConfirmed = action.payload;
    },
    setIsDryRunRouteConfirmed: (state, action) => {
      state.isDryRunRouteConfirmed = action.payload;
    },
    setIsToPlant: (state, action) => {
      state.isToPlant = action.payload;
    },

    //Yard To Plant Shuttle Screen
    setShuttleAmountForYardToPlant: (state, action) => {
      state.shuttleAmountForYardToPlant = action.payload;
    },
    setShuttleMilesForYardToPlant: (state, action) => {
      state.shuttleMilesForYardToPlant = action.payload;
    },
    setShuttleDateForYardToPlant: (state, action) => {
      state.shuttleDateForYardToPlant = action.payload;
    },
    setPickupYardIDForYardToPlant: (state, action) => {
      state.pickupYardIDForYardToPlant = action.payload;
    },
    setPickupYardNameForYardToPlant: (state, action) => {
      state.pickupYardNameForYardToPlant = action.payload;
    },
    setPickupYardCodeForYardToPlant: (state, action) => {
      state.pickupYardCodeForYardToPlant = action.payload;
    },
    setDeliveryCityIDForYardToPlant: (state, action) => {
      state.deliveryCityIDForYardToPlant = action.payload;
    },
    setDeliveryCityNameForYardToPlant: (state, action) => {
      state.deliveryCityNameForYardToPlant = action.payload;
    },
    setDeliveryPlantIDForYardToPlant: (state, action) => {
      state.deliveryPlantIDForYardToPlant = action.payload;
    },
    setDeliveryPlantNameForYardToPlant: (state, action) => {
      state.deliveryPlantNameForYardToPlant = action.payload;
    },
    setDeliveryPlantCodeForYardToPlant: (state, action) => {
      state.deliveryPlantCodeForYardToPlant = action.payload;
    },
    setIsYardCityCombinationExist: (state, action) => {
      state.isYardCityCombinationExist = action.payload;
    },
    setSavedSuccessForYardToPlant: (state, action) => {
      state.savedSuccessForYardToPlant = action.payload;
    },

    //Yard To Yard Shuttle Screen
    setShuttleAmountForYardToYard: (state, action) => {
      state.shuttleAmountForYardToYard = action.payload;
    },
    setShuttleMilesForYardToYard: (state, action) => {
      state.shuttleMilesForYardToYard = action.payload;
    },
    setShuttleDateForYardToYard: (state, action) => {
      state.shuttleDateForYardToYard = action.payload;
    },
    setPickupYardIDForYardToYard: (state, action) => {
      state.pickupYardIDForYardToYard = action.payload;
    },
    setPickupYardNameForYardToYard: (state, action) => {
      state.pickupYardNameForYardToYard = action.payload;
    },
    setDeliveryYardIDForYardToYard: (state, action) => {
      state.deliveryYardIDForYardToYard = action.payload;
    },
    setDeliveryYardNameForYardToYard: (state, action) => {
      state.deliveryYardNameForYardToYard = action.payload;
    },
    setIsYardToYardCombinationExist: (state, action) => {
      state.isYardToYardCombinationExist = action.payload;
    },
    setRowForYardToYard: (state, action) => {
      state.rowForYardToYard = action.payload;
    },
    setPositionForYardToYard: (state, action) => {
      state.positionForYardToYard = action.payload;
    },
    setPickupYardCodeForYardToYard: (state, action) => {
      state.pickupYardCodeForYardToYard = action.payload;
    },
    setDeliveryYardCodeForYardToYard: (state, action) => {
      state.deliveryYardCodeForYardToYard = action.payload;
    },
    setSavedSuccessForYardToYard: (state, action) => {
      state.savedSuccessForYardToYard = action.payload;
    },

    //Plant To Plant Shuttle Screen
    setPickupPlantIDForPlantToPlant: (state, action) => {
      state.pickupPlantIDForPlantToPlant = action.payload;
    },
    setPickupPlantNameForPlantToPlant: (state, action) => {
      state.pickupPlantNameForPlantToPlant = action.payload;
    },
    setDeliveryPlantIDForPlantToPlant: (state, action) => {
      state.deliveryPlantIDForPlantToPlant = action.payload;
    },
    setDeliveryPlantNameForPlantToPlant: (state, action) => {
      state.deliveryPlantNameForPlantToPlant = action.payload;
    },
    setCustomerFKForPlantToPlant: (state, action) => {
      state.customerFKForPlantToPlant = action.payload;
    },
    setShuttleDateForPlantToPlant: (state, action) => {
      state.shuttleDateForPlantToPlant = action.payload;
    },
    setShuttleAmountForPlantToPlant: (state, action) => {
      state.shuttleAmountForPlantToPlant = action.payload;
    },
    setShuttleMilesForPlantToPlant: (state, action) => {
      state.shuttleMilesForPlantToPlant = action.payload;
    },
    setIsPlantToPlantCombinationExist: (state, action) => {
      state.isPlantToPlantCombinationExist = action.payload;
    },
    setPickupPlantCodeForPlantToPlant: (state, action) => {
      state.pickupPlantCodeForPlantToPlant = action.payload;
    },
    setDeliveryPlantCodeForPlantToPlant: (state, action) => {
      state.deliveryPlantCodeForPlantToPlant = action.payload;
    },
    setSavedSuccessForPlantToPlant: (state, action) => {
      state.savedSuccessForPlantToPlant = action.payload;
    },

    //Dry Run Screen
    setPickupCityIDForDryRun: (state, action) => {
      state.pickupCityIDForDryRun = action.payload;
    },
    setPickupCityNameForDryRun: (state, action) => {
      state.pickupCityNameForDryRun = action.payload;
    },
    setDeliveryYardIDForDryRun: (state, action) => {
      state.deliveryYardIDForDryRun = action.payload;
    },
    setDeliveryYardNameForDryRun: (state, action) => {
      state.deliveryYardNameForDryRun = action.payload;
    },
    setDeliveryYardCodeForDryRun: (state, action) => {
      state.deliveryYardCodeForDryRun = action.payload;
    },
    setShuttleAmountForDryRun: (state, action) => {
      state.shuttleAmountForDryRun = action.payload;
    },
    setShuttleMilesForDryRun: (state, action) => {
      state.shuttleMilesForDryRun = action.payload;
    },
    setShuttleDateForDryRun: (state, action) => {
      state.shuttleDateForDryRun = action.payload;
    },
    setIsCityToYardCombinationExistForDryRun: (state, action) => {
      state.isCityToYardCombinationExistForDryRun = action.payload;
    },
    setReasonForDryRun: (state, action) => {
      state.reasonForDryRun = action.payload;
    },
    setSavedSuccessForDryRun: (state, action) => {
      state.savedSuccessForDryRun = action.payload;
    },

    //Shuttle Bonus Screen
    setShuttleAmountForShuttleBonus: (state, action) => {
      state.shuttleAmountForShuttleBonus = action.payload;
    },
    setReasonForShuttleBonus: (state, action) => {
      state.reasonForShuttleBonus = action.payload;
    },
    setSavedSuccessForShuttleBonus: (state, action) => {
      state.savedSuccessForShuttleBonus = action.payload;
    },

    //Dealer Shuttle Screen
    setAllDealerShuttleData: (state, action) => {
      state.allDealerShuttleData = action.payload;
    },
    setSelectedDealerShuttleData: (state, action) => {
      state.selectedDealerShuttleData = action.payload;
    },
    setDealerShuttleAmount: (state, action) => {
      state.dealerShuttleAmount = action.payload;
    },
    setDealerShuttleMiles: (state, action) => {
      state.dealerShuttleMiles = action.payload;
    },
    setDealerShuttleDate: (state, action) => {
      state.dealerShuttleDate = action.payload;
    },
    setSavedSuccessForDealerShuttle: (state, action) => {
      state.savedSuccessForDealerShuttle = action.payload;
    },

    //Shuttle Delay Screen
    setReasonForShuttleDelay: (state, action) => {
      state.reasonForShuttleDelay = action.payload;
    },
    setAuthorizedByForShuttleDelay: (state, action) => {
      state.authorizedByForShuttleDelay = action.payload;
    },
    setDriverFKForShuttleDelay: (state, action) => {
      state.driverFKForShuttleDelay = action.payload;
    },
    setReportingDriverName: (state, action) => {
      state.reportingDriverName = action.payload;
    },
    setUserFKForShuttleDelay: (state, action) => {
      state.userFKForShuttleDelay = action.payload;
    },
    setReportingUsername: (state, action) => {
      state.reportingUsername = action.payload;
    },
    setReportedByForShuttleDelay: (state, action) => {
      state.reportedByForShuttleDelay = action.payload;
    },
    setDateReportedForShuttleDelay: (state, action) => {
      state.dateReportedForShuttleDelay = action.payload;
    },
    setNotesForShuttleDelay: (state, action) => {
      state.notesForShuttleDelay = action.payload;
    },
    setUnitShuttleDelaysVO: (state, action) => {
      state.unitShuttleDelaysVO = action.payload;
    },
    setSavedSuccessForShuttleDelay: (state, action) => {
      state.savedSuccessForShuttleDelay = action.payload;
    },

    //Order Not Enter Screen

    setSelectedUnitCompanyNameONE: (state, action) => {
      state.selectedUnitCompanyNameONE = action.payload;
    },
    setSelectedUnitCompanyFKONE: (state, action) => {
      state.selectedUnitCompanyFKONE = action.payload;
    },
    setUnitNumberForOrderNotEnter: (state, action) => {
      state.unitNumberForOrderNotEnter = action.payload;
    },
    setUnitTypeMotorized: (state, action) => {
      state.unitTypeMotorized = action.payload;
    },
    setUnitTypeTowable: (state, action) => {
      state.unitTypeTowable = action.payload;
    },

    setCustomerSelectedForOrderNotEnter: (state, action) => {
      state.customerSelectedForOrderNotEnter = action.payload;
    },
    setPlantSelectedForOrderNotEnter: (state, action) => {
      state.plantSelectedForOrderNotEnter = action.payload;
    },
    setShuttleDateForOrderNotEnter: (state, action) => {
      state.shuttleDateForOrderNotEnter = action.payload;
    },
    setShuttleAmountForOrderNotEnter: (state, action) => {
      state.shuttleAmountForOrderNotEnter = action.payload;
    },
    setShuttleMilesForOrderNotEnter: (state, action) => {
      state.shuttleMilesForOrderNotEnter = action.payload;
    },
    setPickupCityForOrderNotEnter: (state, action) => {
      state.pickupCityForOrderNotEnter = action.payload;
    },
    setPickupCityNameForOrderNotEnter: (state, action) => {
      state.pickupCityNameForOrderNotEnter = action.payload;
    },
    setDeliveryYardForOrderNotEnter: (state, action) => {
      state.deliveryYardForOrderNotEnter = action.payload;
    },
    setDeliveryYardCodeForOrderNotEnter: (state, action) => {
      state.deliveryYardCodeForOrderNotEnter = action.payload;
    },
    setIsCityYardCombinationExistForOrderNotEnter: (state, action) => {
      state.isCityYardCombinationExistForOrderNotEnter = action.payload;
    },
    setRowForOrderNotEnter: (state, action) => {
      state.rowForOrderNotEnter = action.payload;
    },
    setPositionForOrderNotEnter: (state, action) => {
      state.positionForOrderNotEnter = action.payload;
    },
    setUnitShuttleONEsVO: (state, action) => {
      state.unitShuttleONEsVO = action.payload;
    },
    setIsSelectedCustomerDPU: (state, action) => {
      state.isSelectedCustomerDPU = action.payload;
    },
    setSavedSuccessForOrderNotEnter: (state, action) => {
      state.savedSuccessForOrderNotEnter = action.payload;
    },

    //Activation Delay
    setReasonForActivationDelay: (state, action) => {
      state.reasonForActivationDelay = action.payload;
    },
    setMotorized: (state, action) => {
      state.motorized = action.payload;
    },
    setTowable: (state, action) => {
      state.towable = action.payload;
    },
  },
});

export const {
  //unit shuttles
  setUnitShuttlesPK,
  setUnitShuttleData,
  //Driver Selection Screen
  setCompanyNamesForDrivers,
  setCompanyNameForDriverSelection,
  setCompanyNameFKForDriverSelection,
  setSelectedDriverCompanyDetails,
  setDriverNameInput,
  setSelectedDriver,
  setSelectedDriverID,
  setDriverDefaultCompanyName,
  setSelectedDriverCompanyID,
  setEnablePostPay,
  setIsToPlant,
  //Unit Selection Screen
  setUnitDefaultCompanyName,
  setSelectedUnitCompanyName,
  setSelectedUnitCompanyFK,
  setUnitData,
  setAllUnitsData,
  setLoader,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setChangeColor,
  setUnitNumberLast5,
  setUnitNumberInput,
  setUnitNumberPK,
  setSpecialCodeOfSelectedUnit,
  setCompanySelected,
  setIsSelectedUnitTowable,
  setIsSelectedUnitMotorized,
  setIsEligibleForBonus,
  toggleCancelChanges,
  setUnitPickupCustomerPlantFK,
  setIsEligibleForDelay,
  setIsUnitShuttleONEUnique,
  setIsShuttleDateValid,
  //Additional Shuttle Screen
  setSecondShuttle,
  setTypeOfShuttle,
  setAdditionalReason,
  setDispatchShuttle,
  //Unit Shuttles Table Save
  setUnitShuttlesVO,
  //Plant To Yard Shuttle Screen
  setShuttleAmountForPlantToYard,
  setShuttleMilesForPlantToYard,
  setShuttleDateForPlantToYard,
  setStatusForPlantToYard,
  setPickupCityIDForPlantToYard,
  setPickupCityNameForPlantToYard,
  setDeliveryYardIDForPlantToYard,
  setDeliveryYardNameForPlantToYard,
  setDeliveryYardCodeForPlantToYard,
  setIsCityYardCombinationExist,
  setRowForPlantToYard,
  setPositionForPlantToYard,
  setGvwrForPlantToYard,
  setSavedSuccessForPlantToYard,
  setIsPlantToYardRouteConfirmed,
  setIsYardToPlantRouteConfirmed,
  setIsYardToYardRouteConfirmed,
  setIsPlantToPlantRouteConfirmed,
  setIsDryRunRouteConfirmed,
  setShowUnitActivationScreen,
  //Yard To Plant Shuttle Screen
  setShuttleAmountForYardToPlant,
  setShuttleMilesForYardToPlant,
  setShuttleDateForYardToPlant,
  setPickupYardIDForYardToPlant,
  setPickupYardNameForYardToPlant,
  setPickupYardCodeForYardToPlant,
  setDeliveryCityIDForYardToPlant,
  setDeliveryCityNameForYardToPlant,
  setDeliveryPlantIDForYardToPlant,
  setDeliveryPlantNameForYardToPlant,
  setDeliveryPlantCodeForYardToPlant,
  setIsYardCityCombinationExist,
  setSavedSuccessForYardToPlant,
  //Yard To Yard Shuttle Screen
  setShuttleAmountForYardToYard,
  setShuttleMilesForYardToYard,
  setShuttleDateForYardToYard,
  setPickupYardIDForYardToYard,
  setPickupYardNameForYardToYard,
  setPickupYardCodeForYardToYard,
  setDeliveryYardIDForYardToYard,
  setDeliveryYardNameForYardToYard,
  setDeliveryYardCodeForYardToYard,
  setIsYardToYardCombinationExist,
  setRowForYardToYard,
  setPositionForYardToYard,
  setSavedSuccessForYardToYard,
  //Plant To Plant Shuttle Screen
  setPickupPlantIDForPlantToPlant,
  setPickupPlantNameForPlantToPlant,
  setPickupPlantCodeForPlantToPlant,
  setDeliveryPlantIDForPlantToPlant,
  setDeliveryPlantNameForPlantToPlant,
  setDeliveryPlantCodeForPlantToPlant,
  setCustomerFKForPlantToPlant,
  setShuttleDateForPlantToPlant,
  setShuttleAmountForPlantToPlant,
  setShuttleMilesForPlantToPlant,
  setIsPlantToPlantCombinationExist,
  setSavedSuccessForPlantToPlant,
  //Dry Run Screen
  setPickupCityIDForDryRun,
  setPickupCityNameForDryRun,
  setDeliveryYardIDForDryRun,
  setDeliveryYardNameForDryRun,
  setDeliveryYardCodeForDryRun,
  setShuttleAmountForDryRun,
  setShuttleMilesForDryRun,
  setShuttleDateForDryRun,
  setIsCityToYardCombinationExistForDryRun,
  setReasonForDryRun,
  setSavedSuccessForDryRun,
  //Shuttle Bonus Screen
  setShuttleAmountForShuttleBonus,
  setReasonForShuttleBonus,
  setSavedSuccessForShuttleBonus,
  //Dealer Shuttle Screen
  setAllDealerShuttleData,
  setSelectedDealerShuttleData,
  setDealerShuttleAmount,
  setDealerShuttleMiles,
  setDealerShuttleDate,
  setSavedSuccessForDealerShuttle,
  //Shuttle Delay Screen
  setReasonForShuttleDelay,
  setAuthorizedByForShuttleDelay,
  setDriverFKForShuttleDelay,
  setReportingDriverName,
  setUserFKForShuttleDelay,
  setReportingUsername,
  setReportedByForShuttleDelay,
  setDateReportedForShuttleDelay,
  setNotesForShuttleDelay,
  setUnitShuttleDelaysVO,
  setSavedSuccessForShuttleDelay,
  //Order Not Enter Screen
  setSelectedUnitCompanyNameONE,
  setSelectedUnitCompanyFKONE,
  setDriverNameForOrderNotEnter,
  setUnitNumberForOrderNotEnter,
  setUnitTypeMotorized,
  setUnitTypeTowable,
  setCustomerSelectedForOrderNotEnter,
  setPlantSelectedForOrderNotEnter,
  setShuttleDateForOrderNotEnter,
  setShuttleAmountForOrderNotEnter,
  setShuttleMilesForOrderNotEnter,
  setPickupCityForOrderNotEnter,
  setPickupCityNameForOrderNotEnter,
  setDeliveryYardForOrderNotEnter,
  setDeliveryYardCodeForOrderNotEnter,
  setIsCityYardCombinationExistForOrderNotEnter,
  setRowForOrderNotEnter,
  setPositionForOrderNotEnter,
  setUnitShuttleONEsVO,
  setIsSelectedCustomerDPU,
  setSavedSuccessForOrderNotEnter,
  //Activation Delay
  setReasonForActivationDelay,
  setMotorized,
  setTowable,
} = YardCheckinSlice.actions;

export default YardCheckinSlice.reducer;
