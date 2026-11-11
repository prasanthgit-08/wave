import { createSlice } from "@reduxjs/toolkit";
const PlantReleaseSlice = createSlice({
  name: "plantRelease",
  initialState: {
    browseUnits: false,
    singleUnits: false,
    importList: false,
    //selection Screen
    last5: "",
    unitId: "",
    release: false,
    delay: false,
    unitType: "",
    special: "",
    orderDate: "",
    miles: "",
    customer: "",
    plant: "",
    yard: "",
    dealer: "",
    unitData: null,
    unitInput: "",
    unitInUse: false,
    dealerAddress1: "",
    dealerAddress2: "",
    dealerCity: "",
    dealerState: "",
    singleFormData: null,
    loading: true,
    browseData: [],
    disableFlag: false,
    unitNo: "",
    //Options SCreen
    browseNavigation: [],
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    viewOnly: false,
    outbound: true,
    reload: false,
    motorized: false,
    towable: true,
    sortByLast5: false,
    customerId: "",
    customerInput: "",
    plantId: "",
    plantInput: "",
    yardId: "",
    yardInput: "",
    plantCustomerId: "",
    plantCustomerInput: "",
    date1: "",
    date2: "",
    dataResetFlag: false,
    radioValue: "unreleased",
    unreleased: false,
    released: false,
    all: false,
    alreadyDelayed: false,
    alreadyReleased: false,
    continueCheckFlag: false,
    date1Valid: true,
    date2Valid: true,

    //delay screen
    unitNumber: "",
    reason: "",
    authorizedBy: "",
    driverInput: "",
    driverId: "",
    userInput: "",
    userId: "",
    reportedBy: "",
    delayDate: "",
    notes: "",
    delayInputArray: [],
    delayArrayIndex: 0,
    delayFormData: null,
    unitPk: "",
    delayUnitId: "",
    delayNumber: 0,
    unitNumberValue: "",
    selectedDataArray: [],
    selectionRadioValue: "",
    planReleaseExitFlag: false,
    delayDateValid: true,
    testFile: [],
    testResponse: null,
    plantReleaseDescription: "",
    customerPlantReleaseId: null,
  },
  reducers: {
    setBrowseUnits: (state, action) => {
      state.browseUnits = action.payload;
    },
    setSingleUnits: (state, action) => {
      state.singleUnits = action.payload;
    },
    setImportList: (state, action) => {
      state.importList = action.payload;
    },
    //selection screen
    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },

    setUnitInput: (state, action) => {
      state.unitInput = action.payload;
    },
    setUnitInUse: (state, action) => {
      state.unitInUse = action.payload;
    },
    setLast5: (state, action) => {
      state.last5 = action.payload;
    },
    setUnitId: (state, action) => {
      state.unitId = action.payload;
    },
    setUnitNo: (state, action) => {
      state.unitNo = action.payload;
    },
    setRelease: (state, action) => {
      state.release = action.payload;
    },
    setDelay: (state, action) => {
      state.delay = action.payload;
    },
    setUnitType: (state, action) => {
      state.unitType = action.payload;
    },
    setSpecial: (state, action) => {
      state.special = action.payload;
    },
    setOrderDate: (state, action) => {
      state.orderDate = action.payload;
    },
    setMiles: (state, action) => {
      state.miles = action.payload;
    },

    setCustomer: (state, action) => {
      state.customer = action.payload;
    },

    setPlant: (state, action) => {
      state.plant = action.payload;
    },

    setYard: (state, action) => {
      state.yard = action.payload;
    },

    setDealer: (state, action) => {
      state.dealer = action.payload;
    },
    setDealerCity: (state, action) => {
      state.dealerCity = action.payload;
    },
    setDealerAddress1: (state, action) => {
      state.dealerAddress1 = action.payload;
    },
    setDealerAddress2: (state, action) => {
      state.dealerAddress2 = action.payload;
    },
    setDealerState: (state, action) => {
      state.dealerState = action.payload;
    },
    setUnitData: (state, action) => {
      state.unitData = action.payload;
    },
    setSingleFormData: (state, action) => {
      state.singleFormData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBrowseData: (state, action) => {
      state.browseData = action.payload;
    },
    updateBrowseDataElement: (state, { payload }) => {
      let arrayElement = state.browseData[payload.index];

      arrayElement.plantRelease = payload.element.plantRelease;
      arrayElement.unitOnShuttleDelay = payload.element.unitOnShuttleDelay;

      state.browseData[payload.index] = arrayElement;
    },
    resetChanges: (state, action) => {
      state.last5 = "";
      state.delay = false;
      state.release = false;
      state.unitId = "";
      state.unitInput = "";
      state.unitData = null;
    },
    resetSelection: (state, action) => {
      state.browseUnits = "";
      state.singleUnits = false;
      state.importList = false;
    },
    //Options SCreen

    setViewOnly: (state, action) => {
      state.viewOnly = action.payload;
    },
    setOutbound: (state, action) => {
      state.outbound = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
    setMotorized: (state, action) => {
      state.motorized = action.payload;
    },
    setTowable: (state, action) => {
      state.towable = action.payload;
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

    setSortByLast5: (state, action) => {
      state.sortByLast5 = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setCustomerInput: (state, action) => {
      state.customerInput = action.payload;
    },
    setPlantId: (state, action) => {
      state.plantId = action.payload;
    },
    setPlantInput: (state, action) => {
      state.plantInput = action.payload;
    },
    setYardId: (state, action) => {
      state.yardId = action.payload;
    },
    setYardInput: (state, action) => {
      state.yardInput = action.payload;
    },
    setPlantCustomerId: (state, action) => {
      state.plantCustomerId = action.payload;
    },
    setPlantCustomerInput: (state, action) => {
      state.plantCustomerInput = action.payload;
    },
    setDate1: (state, action) => {
      state.date1 = action.payload;
    },
    setDate2: (state, action) => {
      state.date2 = action.payload;
    },
    setUnreleased: (state, action) => {
      state.unreleased = action.payload;
    },
    setReleased: (state, action) => {
      state.released = action.payload;
    },
    setAll: (state, action) => {
      state.all = action.payload;
    },
    setRadioValue: (state, action) => {
      state.radioValue = action.payload;
    },
    setAlreadyDelayed: (state, action) => {
      state.alreadyDelayed = action.payload;
    },
    setAlreadyReleased: (state, action) => {
      state.alreadyReleased = action.payload;
    },
    setDate1Valid: (state, action) => {
      state.date1Valid = action.payload;
    },
    setDate2Valid: (state, action) => {
      state.date2Valid = action.payload;
    },
    resetBatchChanges: (state, action) => {
      state.outbound = true;
      state.viewOnly = false;
      state.reload = false;
      state.motorized = false;
      state.towable = true;
      state.sortByLast5 = false;
      state.plantId = "";
      state.plantInput = "";
      state.yardId = "";
      state.yardInput = "";
      state.customerId = "";
      state.customerInput = "";
      state.plantCustomerId = "";
      state.plantCustomerInput = "";
      state.date1 = "";
      state.date2 = "";
      state.unreleased = false;
      state.released = false;
      state.all = false;
      state.radioValue = "unreleased";
    },
    setDataResetFlag: (state, action) => {
      state.dataResetFlag = action.payload;
    },
    setContinueCheckFlag: (state, action) => {
      state.continueCheckFlag = action.payload;
    },
    setMultiUnitRelease: (state, { payload }) => {
      let arrayElement = state.browseData[payload];

      if (state.browseData[payload].plantRelease) {
        arrayElement.plantRelease = false;
      } else {
        if (!state.browseData[payload].unitOnShuttleDelay) {
          arrayElement.plantRelease = true;
        }
      }

      state.browseData[payload] = arrayElement;
    },
    setMultiUnitDelay: (state, { payload }) => {
      let arrayElement = state.browseData[payload];

      if (state.browseData[payload].unitOnShuttleDelay) {
        arrayElement.unitOnShuttleDelay = false;
      } else {
        if (!state.browseData[payload].plantRelease) {
          arrayElement.unitOnShuttleDelay = true;
        }
      }

      state.browseData[payload] = arrayElement;
    },
    //delay screen
    setUnitnumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setReason: (state, action) => {
      state.reason = action.payload;
    },
    setAuthorizedBy: (state, action) => {
      state.authorizedBy = action.payload;
    },
    setDriverInput: (state, action) => {
      state.driverInput = action.payload;
    },
    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setReportedBy: (state, action) => {
      state.reportedBy = action.payload;
    },
    setDelayDate: (state, action) => {
      state.delayDate = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setDelayInputArray: (state, action) => {
      state.delayInputArray = action.payload;
    },
    setDelayArrayIndex: (state, action) => {
      state.delayArrayIndex = action.payload;
    },
    setDelayFormData: (state, action) => {
      state.delayFormData = action.payload;
    },
    setDelayDateValid: (state, action) => {
      state.delayDateValid = action.payload;
    },
    setTestFile: (state, action) => {
      state.testFile = action.payload;
    },

    setCustomerPlantReleaseId: (state, action) => {
      state.customerPlantReleaseId = action.payload;
    },
    setTestResponse: (state, action) => {
      state.testResponse = action.payload;
    },
    setPlantReleaseDescription: (state, action) => {
      state.plantReleaseDescription = action.payload;
    },
    delayResetChanges: (state, action) => {
      state.authorizedBy = "";
      state.reason = "";
      state.reportedBy = "";
      state.delayDate = "";
      state.userId = "";
      state.userInput = "";
      state.driverId = "";
      state.driverInput = "";
      state.notes = "";
      state.unitNumber = "";
    },
    setUnitPk: (state, action) => {
      state.unitPk = action.payload;
    },
    setDisableFlag: (state, action) => {
      state.disableFlag = action.payload;
    },
    setDelayUnitId: (state, action) => {
      state.delayUnitId = action.payload;
    },
    setDelayNumber: (state, action) => {
      state.delayNumber = action.payload;
    },
    setUnitNumberValue: (state, action) => {
      state.unitNumberValue = action.payload;
    },
    setSelectedDataArray: (state, action) => {
      state.selectedDataArray = action.payload;
    },
    setSelectionRadioValue: (state, action) => {
      state.selectionRadioValue = action.payload;
    },
    setPlanReleaseExitFlag: (state, action) => {
      state.planReleaseExitFlag = action.payload;
    },
    updateSelectedDataArray: (state, { payload }) => {
      state.selectedDataArray = [...state.selectedDataArray, ...payload];
    },
    removeFromSelectedDataArray: (state, { payload }) => {
      state.selectedDataArray = state.selectedDataArray.filter(
        (element) => !payload.find((item) => item.unitPK === element.unitPK)
      );
    },
    updateSelectedDataArrayElement: (state, { payload }) => {
      if (payload?.elementToUpdate) {
        state.selectedDataArray[payload.index] = payload?.elementToUpdate;
      } else {
        let arrayElement = state.selectedDataArray[payload.index];

        // For bugfix: arrayElement gets undefined when some checked elements get removed from selectedArray
        if (arrayElement !== undefined) {
          arrayElement.plantRelease = payload.element.plantRelease;
          arrayElement.unitOnShuttleDelay = payload.element.unitOnShuttleDelay;
        }
      }
    },
    resetImportChanges: (state, action) => {
      state.customerPlantReleaseId = null;
      state.plantReleaseDescription = "";
      state.testFile = [];
      state.testResponse = null;
    },
  },
});
export const {
  setBrowseNavigation,
  setBrowseUnits,
  setImportList,
  setSingleUnits,
  setUnitInUse,
  setLast5,
  setUnitInput,
  setUnitId,
  setRelease,
  setDelay,
  setSpecial,
  setUnitType,
  setUnitNo,
  resetChanges,
  setOrderDate,
  setMiles,
  setCustomer,
  setPlant,
  setYard,
  setDealer,
  setUnitData,
  setDealerAddress1,
  setDealerAddress2,
  setDealerState,
  setDealerCity,
  setSingleFormData,
  setLoading,
  setBrowseData,
  updateBrowseDataElement,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setViewOnly,
  setReload,
  setOutbound,
  setMotorized,
  setTowable,
  setUnitPk,
  setSortByLast5,
  setCustomerId,
  setCustomerInput,
  setPlantId,
  setPlantInput,
  setYardInput,
  setYardId,
  setDate1,
  setPlantCustomerId,
  setPlantCustomerInput,
  setDate2,
  setAll,
  setRadioValue,
  setReleased,
  setUnreleased,
  setAlreadyReleased,
  setAlreadyDelayed,
  resetBatchChanges,
  setDataResetFlag,
  setContinueCheckFlag,
  setMultiUnitDelay,
  setMultiUnitRelease,
  setUnitnumber,
  setReportedBy,
  setReason,
  setDriverId,
  setDriverInput,
  setUserInput,
  setUserId,
  setNotes,
  setAuthorizedBy,
  setDelayDate,
  setDelayInputArray,
  setDelayArrayIndex,
  setDelayFormData,
  delayResetChanges,
  setUnitNumberValue,
  setDelayUnitId,
  setDisableFlag,
  setDelayNumber,
  setSelectedDataArray,
  updateSelectedDataArray,
  removeFromSelectedDataArray,
  updateSelectedDataArrayElement,
  setSelectionRadioValue,
  setPlanReleaseExitFlag,
  resetSelection,
  setDate1Valid,
  setDate2Valid,
  setDelayDateValid,
  setTestFile,
  setCustomerPlantReleaseId,
  setPlantReleaseDescription,
  setTestResponse,
  resetImportChanges,
} = PlantReleaseSlice.actions;

export const plantRelease = (state) => state.PlantRelease.value;
export default PlantReleaseSlice.reducer;
