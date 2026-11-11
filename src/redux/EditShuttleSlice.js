import { createSlice } from "@reduxjs/toolkit";

const EditShuttleSlice = createSlice({
  name: "editShuttle",

  initialState: {
    //Driver Selecton screen
    driverSelection: false,
    driverNameInput: "",
    driverId: null,
    driverData: [],
    fromDate: "",
    toDate: "",

    //Unit Selection screen
    unitNumberPK: null,
    unitShuttlePK: null,
    sisterUnitShuttleFK: null,
    unitNumberInput: "",
    unitNumberSelection: false,
    unitNumberList: [],
    unitNumberBrowse: [],
    unitShuttleData: [],
    unitsLoading: true,
    unitNumberLast5: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    changeColor: false,
    shuttleType: "",
    viewDetail: true,
    companyName: "",
    companyFK: null,
    currentCompanyName: "",
    cancelChanges: false,
    currentCompanyFetch: true,
    restoreEditShuttleUnit: false,
    pickupcustomerFK: null,
    isDateValid: true,

    //Plant to yard / Yard to Plant / Plant to plant / Yard to Yard
    yardSelection: false,
    shuttleCitySelection: false,
    pickupPlantSelection: false,
    deliveryPlantSelection: false,
    pickupYardSelection: false,
    deliveryYardSelection: false,
    shuttleAmount: 0,
    shuttleDate: "",
    deliveryYardId: null,
    pickupCityId: null,
    pickupCityInput: "",
    pickupYardId: null,
    deliveryCityId: null,
    deliveryCityInput: "",
    pickupPlantId: null,
    deliveryPlantId: null,
    row: "",
    position: "",
    isTowableUnit: false,
    isMotorizedUnit: false,
    warningMessage: "",
    saveUnitShuttleData: null,
    saveDisable: false,
    editReason: "",
    miles: 0,
    isCrossDB: false,
    dropSisterYardCode: "",
    pickupSisterYardCode: "",
    dropSisterPlantCode: "",
    pickupSisterPlantCode: "",
    yardToYardCity: "",
    yardToYardState: "",
    yardToYardPostCode: "",
    isShuttleDateValid: true,
  },
  reducers: {
    setDriverSelection: (state, action) => {
      state.driverSelection = action.payload;
    },
    setDriverNameInput: (state, action) => {
      state.driverNameInput = action.payload;
    },
    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
    setDriverData: (state, action) => {
      state.driverData = action.payload;
    },
    setFromDate: (state, action) => {
      state.fromDate = action.payload;
    },
    setToDate: (state, action) => {
      state.toDate = action.payload;
    },
    setUnitNumberPK: (state, action) => {
      state.unitNumberPK = action.payload;
    },
    setUnitShuttlePK: (state, action) => {
      state.unitShuttlePK = action.payload;
    },
    setSisterUnitShuttleFK: (state, action) => {
      state.sisterUnitShuttleFK = action.payload;
    },
    setUnitNumberInput: (state, action) => {
      state.unitNumberInput = action.payload;
    },
    setUnitNumberSelection: (state, action) => {
      state.unitNumberSelection = action.payload;
    },
    setUnitNumberList: (state, action) => {
      state.unitNumberList = action.payload;
    },
    setUnitNumberBrowse: (state, action) => {
      state.unitNumberBrowse = action.payload;
    },
    setUnitShuttleData: (state, action) => {
      state.unitShuttleData = action.payload;
    },
    setUnitsLoading: (state, action) => {
      state.unitsLoading = action.payload;
    },
    setYardSelection: (state, action) => {
      state.yardSelection = action.payload;
    },
    setShuttleCitySelection: (state, action) => {
      state.shuttleCitySelection = action.payload;
    },
    setPickupPlantSelection: (state, action) => {
      state.pickupPlantSelection = action.payload;
    },
    setDeliveryPlantSelection: (state, action) => {
      state.deliveryPlantSelection = action.payload;
    },
    setPickupYardSelection: (state, action) => {
      state.pickupYardSelection = action.payload;
    },
    setDeliveryYardSelection: (state, action) => {
      state.deliveryYardSelection = action.payload;
    },
    setShuttleAmount: (state, action) => {
      state.shuttleAmount = action.payload;
    },
    setShuttleDate: (state, action) => {
      state.shuttleDate = action.payload;
    },
    setDeliveryYardId: (state, action) => {
      state.deliveryYardId = action.payload;
    },
    setPickupCityId: (state, action) => {
      state.pickupCityId = action.payload;
    },
    setPickupCityInput: (state, action) => {
      state.pickupCityInput = action.payload;
    },
    setPickupYardId: (state, action) => {
      state.pickupYardId = action.payload;
    },
    setDeliveryCityId: (state, action) => {
      state.deliveryCityId = action.payload;
    },
    setDeliveryCityInput: (state, action) => {
      state.deliveryCityInput = action.payload;
    },
    setPickupPlantId: (state, action) => {
      state.pickupPlantId = action.payload;
    },
    setDeliveryPlantId: (state, action) => {
      state.deliveryPlantId = action.payload;
    },
    setRow: (state, action) => {
      state.row = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setUnitNumberLast5: (state, action) => {
      state.unitNumberLast5 = action.payload;
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
    setShuttleType: (state, action) => {
      state.shuttleType = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setCompanyFK: (state, action) => {
      state.companyFK = action.payload;
    },
    setCurrentCompanyName: (state, action) => {
      state.currentCompanyName = action.payload;
    },
    setSaveUnitShuttleData: (state, action) => {
      state.saveUnitShuttleData = action.payload;
    },
    setSaveDisable: (state, action) => {
      state.saveDisable = action.payload;
    },
    setIsTowableUnit: (state, action) => {
      state.isTowableUnit = action.payload;
    },
    setIsMotorizedUnit: (state, action) => {
      state.isMotorizedUnit = action.payload;
    },
    setWarningMessage: (state, action) => {
      state.warningMessage = action.payload;
    },
    setEditReason: (state, action) => {
      state.editReason = action.payload;
    },
    setMiles: (state, action) => {
      state.miles = action.payload;
    },

    setIsCrossDB: (state, action) => {
      state.isCrossDB = action.payload;
    },
    setDropSisterYardCode: (state, action) => {
      state.dropSisterYardCode = action.payload;
    },
    setPickupSisterYardCode: (state, action) => {
      state.pickupSisterYardCode = action.payload;
    },
    setDropSisterPlantCode: (state, action) => {
      state.dropSisterPlantCode = action.payload;
    },
    setPickupSisterPlantCode: (state, action) => {
      state.pickupSisterPlantCode = action.payload;
    },
    toggleCancelChanges: (state, action) => {
      state.cancelChanges = !state.cancelChanges;
    },
    setCurrentCompanyFetch: (state, action) => {
      state.currentCompanyFetch = action.payload;
    },
    setRestoreEditShuttleUnit: (state, action) => {
      state.restoreEditShuttleUnit = action.payload;
    },
    setPickupCustomerFK: (state, action) => {
      state.pickupCustomerFK = action.payload;
    },
    setIsDateValid: (state, action) => {
      state.isDateValid = action.payload;
    },
    setYardToYardCity: (state, action) => {
      state.yardToYardCity = action.payload;
    },
    setYardToYardState: (state, action) => {
      state.yardToYardState = action.payload;
    },
    setYardToYardPostCode: (state, action) => {
      state.yardToYardPostCode = action.payload;
    },
    setIsShuttleDateValid: (state, action) => {
      state.isShuttleDateValid = action.payload;
    },

    resetUnitDetails: (state, action) => {
      state.unitNumberInput = "";
      state.unitNumberPK = null;
      state.unitShuttlePK = null;
      state.pageNumber = 0;
      state.shuttleType = "";
      state.unitNumberBrowse = [];
      state.unitNumberLast5 = "";
    },
    resetDriver: (state) => {
      state.driverData = null;
      state.driverNameInput = "";
      state.driverId = null;
      state.fromDate = "";
      state.toDate = "";
      state.isDateValid = true;
    },
    resetYardToYard: (state) => {
      state.shuttleAmount = 0;
      state.shuttleDate = "";
      state.isShuttleDateValid = true;
      state.deliveryYardId = null;
      state.pickupYardId = null;
      state.row = "";
      state.position = "";
      state.isTowableUnit = false;
      state.isMotorizedUnit = false;
      state.editReason = "";
      state.miles = 0;
    },
    resetPlantToYard: (state) => {
      state.shuttleAmount = 0;
      state.shuttleDate = "";
      state.isShuttleDateValid = true;
      state.deliveryYardId = null;
      state.pickupCityId = null;
      state.row = "";
      state.position = "";
      state.isTowableUnit = false;
      state.isMotorizedUnit = false;
      state.editReason = "";
      state.miles = 0;
      state.pickupCityInput = "";
      state.dropSisterYardCode = "";
    },
    resetYardToPlant: (state) => {
      state.shuttleAmount = 0;
      state.shuttleDate = "";
      state.isShuttleDateValid = true;
      state.deliveryCityId = null;
      state.pickupYardId = null;
      state.isTowableUnit = false;
      state.isMotorizedUnit = false;
      state.editReason = "";
      state.miles = 0;
      state.deliveryCityInput = "";
      state.pickupSisterYardCode = "";
    },
    resetPlantToPlant: (state) => {
      state.shuttleAmount = 0;
      state.shuttleDate = "";
      state.isShuttleDateValid = true;
      state.deliveryPlantId = null;
      state.pickupPlantId = null;
      state.isTowableUnit = false;
      state.isMotorizedUnit = false;
      state.editReason = "";
      state.miles = 0;
      state.dropSisterPlantCode = "";
      state.pickupSisterPlantCode = "";
    },
  },
});

export const {
  setDriverSelection,
  setDriverNameInput,
  setDriverId,
  setDriverData,
  setFromDate,
  setToDate,
  setUnitNumberPK,
  setUnitShuttlePK,
  setSisterUnitShuttleFK,
  setUnitNumberInput,
  setUnitNumberSelection,
  setUnitNumberList,
  setUnitNumberBrowse,
  setUnitShuttleData,
  setUnitsLoading,
  setYardSelection,
  setShuttleCitySelection,
  setPickupPlantSelection,
  setDeliveryPlantSelection,
  setPickupYardSelection,
  setDeliveryYardSelection,
  setShuttleAmount,
  setShuttleDate,
  setIsShuttleDateValid,
  setDeliveryYardId,
  setPickupCityId,
  setPickupCityInput,
  setPickupYardId,
  setDeliveryCityId,
  setDeliveryCityInput,
  setPickupPlantId,
  setDeliveryPlantId,
  setRow,
  setPosition,
  setUnitNumberLast5,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setChangeColor,
  setShuttleType,
  setViewDetail,
  setCompanyName,
  setCompanyFK,
  setCurrentCompanyName,
  setSaveUnitShuttleData,
  setSaveDisable,
  setIsTowableUnit,
  setIsMotorizedUnit,
  setWarningMessage,
  setEditReason,
  setMiles,
  resetUnitDetails,
  setIsCrossDB,
  setDropSisterYardCode,
  setPickupSisterYardCode,
  setDropSisterPlantCode,
  setPickupSisterPlantCode,
  resetDriver,
  resetYardToYard,
  resetPlantToYard,
  resetYardToPlant,
  resetPlantToPlant,
  toggleCancelChanges,
  setCurrentCompanyFetch,
  setRestoreEditShuttleUnit,
  setPickupCustomerFK,
  setIsDateValid,
  setYardToYardCity,
  setYardToYardState,
  setYardToYardPostCode,
} = EditShuttleSlice.actions;

export default EditShuttleSlice.reducer;
