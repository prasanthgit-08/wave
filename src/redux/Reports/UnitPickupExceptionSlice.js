import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  division: "ALL",
  source: "Both",
  selectedBy: "P",
  pickupYardPK: null,
  pickupYardInput: "",
  dispatcherPK: null,
  dispatcherInput: "",
  dispatcherDefaulted: false,
  driver: null,
  driverInput: "",
  customerPK: null,
  customerInput: "",
  plantPK: null,
  plantInput: "",
  dealerPK: null,
  dealerInput: "",
  userPK: null,
  userInput: "",
  deliveryStates: "",
  minimumPriority: 9,
  showTodaysDispatches: false,
  showNotes: false,
  // Browse/table states
  sortType: true,
  sortValue: "",
  pageNumber: 0,
  pageSize: 19,
  totalPages: 0,
  totalElements: 0,
  selectedDispatchPK: null,
  selectedDispatchPKList: [],
  browseList: [],
  loading: false,
  unitAdditionalNotes: "",
  reportType: "display",
  isDpu: true,
  isPlant: true,
  unitNumber: "",
  recieversEmail: "",
  driverName: "",
  model: "",
  unitType: "",
  specialCode: "",
  pickupAddress: "",
  pickupCity: "",
  pickupState: "",
  deliveryAddress: "",
  deliveryCity: "",
  deliveryState: "",
};

const UnitPickupExceptionSlice = createSlice({
  name: "unitPickupException",
  initialState: initialState,
  reducers: {
    setDivision: (state, action) => {
      state.division = action.payload;
    },
    setReportType: (state, action) => {
      state.reportType = action.payload;
    },
    setSource: (state, action) => {
      state.source = action.payload;
    },
    setSelectedBy: (state, action) => {
      state.selectedBy = action.payload;
    },
    setPickupYardPK: (state, action) => {
      state.pickupYardPK = action.payload;
    },
    setPickupYardInput: (state, action) => {
      state.pickupYardInput = action.payload;
    },
    setDispatcherPK: (state, action) => {
      state.dispatcherPK = action.payload;
    },
    setDispatcherDefaulted: (state, action) => {
      state.dispatcherDefaulted = action.payload;
    },
    setDispatcherInput: (state, action) => {
      state.dispatcherInput = action.payload;
    },
    setDriver: (state, action) => {
      state.driver = action.payload;
    },
    setDriverInput: (state, action) => {
      state.driverInput = action.payload;
    },
    setCustomerPK: (state, action) => {
      state.customerPK = action.payload;
    },
    setCustomerInput: (state, action) => {
      state.customerInput = action.payload;
    },
    setPlantPK: (state, action) => {
      state.plantPK = action.payload;
    },
    setPlantInput: (state, action) => {
      state.plantInput = action.payload;
    },
    setDealerPK: (state, action) => {
      state.dealerPK = action.payload;
    },
    setDealerInput: (state, action) => {
      state.dealerInput = action.payload;
    },
    setUserPK: (state, action) => {
      state.userPK = action.payload;
    },
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    setDeliveryStates: (state, action) => {
      state.deliveryStates = action.payload;
    },
    setMinimumPriority: (state, action) => {
      state.minimumPriority = action.payload;
    },
    setShowTodaysDispatches: (state, action) => {
      state.showTodaysDispatches = action.payload;
    },
    setShowNotes: (state, action) => {
      state.showNotes = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setSelectedDispatchPK: (state, action) => {
      state.selectedDispatchPK = action.payload;
    },
    setSelectedDispatchPKList: (state, action) => {
      state.selectedDispatchPKList = action.payload;
    },
    setBrowseList: (state, action) => {
      state.browseList = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUnitAdditionalNotes: (state, action) => {
      state.unitAdditionalNotes = action.payload;
    },
    setIsDpu: (state, action) => {
      state.isDpu = action.payload;
    },
    setIsPlant: (state, action) => {
      state.isPlant = action.payload;
    },
    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setRecieversMail: (state, action) => {
      state.recieversEmail = action.payload;
    },
    setDriverName: (state, action) => {
      state.driverName = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setUnitType: (state, action) => {
      state.unitType = action.payload;
    },
    setSpecialCode: (state, action) => {
      state.specialCode = action.payload;
    },
    setPickupAddress: (state, action) => {
      state.pickupAddress = action.payload;
    },
    setPickupCity: (state, action) => {
      state.pickupCity = action.payload;
    },
    setPickupState: (state, action) => {
      state.pickupState = action.payload;
    },
    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
    setDeliveryCity: (state, action) => {
      state.deliveryCity = action.payload;
    },
    setDeliveryState: (state, action) => {
      state.deliveryState = action.payload;
    },

    resetChanges: (state) => {
      state.sortType = true;
      state.sortValue = "";
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.selectedDispatchPK = null;
      state.selectedDispatchPKList = [];
      state.browseList = [];
      state.loading = false;
      state.unitAdditionalNotes = "";
    },

    resetStates: () => initialState,
  },
});

export const {
  setDivision,
  setSource,
  setSelectedBy,
  setPickupYardPK,
  setPickupYardInput,
  setDispatcherPK,
  setDispatcherInput,
  setDriver,
  setDriverInput,
  setCustomerPK,
  setCustomerInput,
  setPlantPK,
  setPlantInput,
  setDealerPK,
  setDealerInput,
  setUserPK,
  setUserInput,
  setDeliveryStates,
  setMinimumPriority,
  setShowTodaysDispatches,
  setShowNotes,
  setSortType,
  setSortValue,
  setPageNumber,
  setPageSize,
  setTotalPages,
  setTotalElements,
  setSelectedDispatchPK,
  setSelectedDispatchPKList,
  setBrowseList,
  setLoading,
  resetChanges,
  setUnitAdditionalNotes,
  setReportType,
  setIsDpu,
  setIsPlant,
  setDispatcherDefaulted,
  resetStates,
  setUnitNumber,
  setRecieversMail,
  setDriverName,
  setModel,
  setUnitType,
  setSpecialCode,
  setPickupAddress,
  setPickupCity,
  setPickupState,
  setDeliveryAddress,
  setDeliveryCity,
  setDeliveryState,
} = UnitPickupExceptionSlice.actions;

export default UnitPickupExceptionSlice;
