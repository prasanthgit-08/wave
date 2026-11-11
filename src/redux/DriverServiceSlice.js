import { createSlice } from "@reduxjs/toolkit";

const DriverServicesSlice = createSlice({
  name: "driverServiceSlice",
  initialState: {
    searchCriteria: "Beginning",
    firstName: "",
    lastName: "",
    active: null,
    activeString: "All",
    driverType: "All",
    deleased: null,
    driverData: [],
    sortValue: null,
    sortType: null,
    driverId: null,
    dispatcherInput: "",
    dispatcherId: null,

    // equipmenttab state

    truckSearch: "",
    trailerSearch: "",

    // tab state
    activeKey: "general",
    isEquipmentTabValid: true,
    //for pagenation
    pageNumber: 0,
    formPageNumber: 0,
    totalElements: 0,
    totalPages: 0,
    activeDriver: null,
    truckId: null,
    trailerId: null,
    deleasedDriver: null,
    /**FOr Driver Delease Request Button */
    isProcessedBit: false,
    truckDriverId: null,
    trailerDriverId: null,
    driverPictureId: null,
  },
  reducers: {
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setActiveString: (state, action) => {
      state.activeString = action.payload;
    },
    setDriverType: (state, action) => {
      state.driverType = action.payload;
    },
    setDeleased: (state, action) => {
      state.deleased = action.payload;
    },
    setDriverData: (state, action) => {
      state.driverData = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
    setDispatcherInput: (state, action) => {
      state.dispatcherInput = action.payload;
    },
    setDispatcherId: (state, action) => {
      state.dispatcherId = action.payload;
    },
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
    setIsEquipmentTabValid: (state, action) => {
      state.isEquipmentTabValid = action.payload;
    },
    setTruckSearch: (state, action) => {
      state.truckSearch = action.payload;
    },
    setTrailerSearch: (state, action) => {
      state.trailerSearch = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setFormPageNumber: (state, action) => {
      state.formPageNumber = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setActiveDriver: (state, action) => {
      state.activeDriver = action.payload;
    },
    setTruckId: (state, action) => {
      state.truckId = action.payload;
    },
    setTrailerId: (state, action) => {
      state.trailerId = action.payload;
    },
    setIsProcessedBit: (state, action) => {
      state.isProcessedBit = action.payload;
    },
    setDeleasedDriver: (state, action) => {
      state.deleasedDriver = action.payload;
    },
    setTruckDriverId: (state, action) => {
      state.truckDriverId = action.payload;
    },

    setTrailerDriverId: (state, action) => {
      state.trailerDriverId = action.payload;
    },
    setDriverPictureId: (state, action) => {
      state.driverPictureId = action.payload;
    },
  },
});

export const {
  setActive,
  setActiveString,
  setDeleased,
  setFirstName,
  setLastName,
  setSearchCriteria,
  setDriverData,
  setSortType,
  setSortValue,
  setDriverId,
  setActiveKey,
  setIsEquipmentTabValid,
  setTrailerSearch,
  setTruckSearch,
  setFormPageNumber,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setActiveDriver,
  setTruckId,
  setTrailerId,
  setIsProcessedBit,
  setDeleasedDriver,
  setTruckDriverId,
  setTrailerDriverId,
  setDriverPictureId,
  setDriverType,
  setDispatcherInput,
  setDispatcherId,
} = DriverServicesSlice.actions;

export default DriverServicesSlice.reducer;
