import { faAslInterpreting } from "@fortawesome/free-solid-svg-icons";
import { createSlice } from "@reduxjs/toolkit";

const DealerDriverSearchSlice = createSlice({
  name: "dealerDriverSearchSlice",
  initialState: {
    selectedDivison: "driveaway",
    initialScreen: false,
    driveawayScreen: false,
    towawayScreen: false,
    flatbedScreen: false,
    driverCDL: "both",
    dispatcher: [],
    dispatcherId: "",
    dealername: "",
    dealerId: "",
    states: "",
    zipcode: "",
    miles: 0,
    twicOnly: false,
    canadianOnly: false,
    transportation: "none",
    busQualified: false,
    tractorQualified: false,
    tenorMore38: false,
    hitchTowBar: false,
    truckType: "both",
    hasPintalHook: false,
    eldOnly: false,
    truckCodeId: "",
    output: "Display",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    changeColor: false,
    selectedDriverId: null,
    hasBeenReloaded: true,
    isZipcodesValid: false,
    isStatesValid: false,
    sortValue: null,
    sortFlag: false,
    searchBy: "Both",
  },
  reducers: {
    setSelectedDivison: (state, action) => {
      state.selectedDivison = action.payload;
    },
    setInitialScreen: (state, action) => {
      state.initialScreen = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setSelectedDriverId: (state, action) => {
      state.selectedDriverId = action.payload;
    },
    setDricerCDL: (state, action) => {
      state.driverCDL = action.payload;
    },
    setDispatcher: (state, action) => {
      state.dispatcher = action.payload;
    },
    setFlatbedScreen: (state, action) => {
      state.flatbedScreen = action.payload;
    },
    setTowawayScreen: (state, action) => {
      state.towawayScreen = action.payload;
    },
    setDriveawayScreen: (state, action) => {
      state.driveawayScreen = action.payload;
    },
    setDispatchUserId: (state, action) => {
      state.dispatcherId = action.payload;
    },
    setDealer: (state, action) => {
      state.dealername = action.payload;
    },
    setDealerFK: (state, action) => {
      state.dealerId = action.payload;
    },
    setStates: (state, action) => {
      state.states = action.payload;
    },
    setZipcode: (state, action) => {
      state.zipcode = action.payload;
    },
    setMiles: (state, action) => {
      state.miles = action.payload;
    },
    setTwicOnly: (state, action) => {
      state.twicOnly = action.payload;
    },
    setCanadianOnly: (state, action) => {
      state.canadianOnly = action.payload;
    },
    setTruckCodeId: (state, action) => {
      state.truckCodeId = action.payload;
    },
    setEldOnly: (state, action) => {
      state.eldOnly = action.payload;
    },
    setHasPintalHook: (state, action) => {
      state.hasPintalHook = action.payload;
    },
    setTruckType: (state, action) => {
      state.truckType = action.payload;
    },
    setTransportation: (state, action) => {
      state.transportation = action.payload;
    },
    setBusQualified: (state, action) => {
      state.busQualified = action.payload;
    },
    settractorQualified: (state, action) => {
      state.tractorQualified = action.payload;
    },
    setTenorMore38: (state, action) => {
      state.tenorMore38 = action.payload;
    },
    setHitchTowBar: (state, action) => {
      state.hitchTowBar = action.payload;
    },
    setOutput: (state, action) => {
      state.output = action.payload;
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
    setIsStatesValid: (state, action) => {
      state.isStatesValid = action.payload;
    },
    setIsZipcodeValid: (state, action) => {
      state.isZipcodesValid = action.payload;
    },
    setHasBeenReloaded: (state, action) => {
      state.hasBeenReloaded = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSearchBy: (state, action) => {
      state.searchBy = action.payload;
    },
    resetSearch: (state) => {
      state.driverCDL = "both";
      state.dispatcherId = "";
      state.truckCodeId = "";
      state.dealername = "";
      state.dealerId = "";
      state.twicOnly = false;
      state.canadianOnly = false;
      state.transportation = "none";
      state.busQualified = false;
      state.tractorQualified = false;
      state.tenorMore38 = false;
      state.hitchTowBar = false;
      state.truckType = "both";
      state.hasPintalHook = false;
      state.eldOnly = false;
      state.output = "Display";
      state.zipcode = "";
      state.miles = 0;
      state.states = "";
      state.isZipcodesValid = false;
      state.isStatesValid = false;
      state.searchBy = "Both";
    },
    resetListing: (state) => {
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.selectedDriverId = 0;
      state.changeColor = 0;
      state.sortFlag = false;
      state.sortValue = null;
    },
  },
});

export const {
  setSelectedDivison,
  setInitialScreen,
  setDricerCDL,
  setDispatcher,
  setBusQualified,
  setCanadianOnly,
  setDealer,
  setDealerFK,
  setDispatchUserId,
  setDriveawayScreen,
  setEldOnly,
  setFlatbedScreen,
  setHasPintalHook,
  setHitchTowBar,
  setTenorMore38,
  setTowawayScreen,
  setTransportation,
  setTruckCodeId,
  setTruckType,
  setTwicOnly,
  settractorQualified,
  setOutput,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setChangeColor,
  setSelectedDriverId,
  setMiles,
  setStates,
  setZipcode,
  setIsStatesValid,
  setIsZipcodeValid,
  setHasBeenReloaded,
  resetListing,
  resetSearch,
  setSortFlag,
  setSortValue,
  setSearchBy,
} = DealerDriverSearchSlice.actions;

export default DealerDriverSearchSlice.reducer;
