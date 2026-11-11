import { createSlice } from "@reduxjs/toolkit";

const DriverSearchFilterSlice = createSlice({
  name: "DriverSearchFilterSlice",
  initialState: {
    searchCriteria: "Beginning",
    unitId: null,
    dispatchPK: null,
    active: 1,
    divisionStatus: "driveaway",
    driverCdlStatus: "both",
    sortValue: "",
    sortType: 0,
    sortValue1: "",
    sortType1: 0,
    driverId: null,
    miles: 0,
    customerNameInput: "",
    unitData: [],
    driverData: [],
    //for pagination
    searchTerm: "",
    pageNumber: 0,
    pageNumberOfDriver: 0,
    totalElements: 0,
    totalPages: 0,
    totalElementsOfDriver: 0,
    totalPagesOfDriver: 0,
    cancelbtn: false,
    activeDriver: null,
    pageSize: 18,
    listOfSelectedStates: [],
    isDeliveryStatesValid: false,
    changeColor: false,
    changeColorofdriver: false,
    selectedCustomerId: 0,
    outputType: "display",
    pdfLoader: false,
  },
  reducers: {
    setOutputType: (state, action) => {
      state.outputType = action.payload;
    },
    setUnitId: (state, action) => {
      state.unitId = action.payload;
    },
    setDispatchPK: (state, action) => {
      state.dispatchPK = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setCustomerNameInput: (state, action) => {
      state.customerNameInput = action.payload;
    },
    setChangeColorofdriver: (state, action) => {
      state.changeColorofdriver = action.payload;
    },
    setCancelbtn: (state, action) => {
      state.cancelbtn = action.payload;
    },
    setMiles: (state, action) => {
      state.miles = action.payload;
    },
    setListOfSelectedStates: (state, action) => {
      state.listOfSelectedStates = action.payload;
    },
    setIsDeliveryStatesValid: (state, action) => {
      state.isDeliveryStatesValid = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSelectedCustomerId: (state, action) => {
      state.selectedCustomerId = action.payload;
    },

    setActive: (state, action) => {
      state.active = action.payload;
    },

    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortValue1: (state, action) => {
      state.sortValue1 = action.payload;
    },
    setSortType1: (state, action) => {
      state.sortType1 = action.payload;
    },
    setUnitData: (state, action) => {
      state.unitData = action.payload;
    },
    setDriverData: (state, action) => {
      state.driverData = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setDriverId: (state, action) => {
      state.driverId = action.payload;
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
    setPageNumberOfdriver: (state, action) => {
      state.pageNumberOfDriver = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElementsOfDriver: (state, action) => {
      state.totalElementsOfDriver = action.payload;
    },
    setTotalPagesOfDriver: (state, action) => {
      state.totalPagesOfDriver = action.payload;
    },
    setActiveDriver: (state, action) => {
      state.activeDriver = action.payload;
    },
    setpageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setDivisionStatus: (state, action) => {
      state.divisionStatus = action.payload;
    },
    setDriverCdlStatus: (state, action) => {
      state.driverCdlStatus = action.payload;
    },
    setPdfLoader: (state, action) => {
      state.pdfLoader = action.payload;
    },
  },
});

export const {
  setActive,
  setTotalElementsOfDriver,
  setTotalPagesOfDriver,
  setActiveString,
  setDeleased,
  setFirstName,
  setLastName,
  setSearchCriteria,
  setUnitData,
  setSortType,
  setSortValue,
  setSortType1,
  setSortValue1,
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
  setSelectedCustomerId,
  setpageSize,
  setMiles,
  setListOfSelectedStates,
  setIsDeliveryStatesValid,
  setDivisionStatus,
  setDriverCdlStatus,
  setUnitId,
  setDispatchPK,
  setChangeColor,
  setDriverData,
  setPageNumberOfdriver,
  setCancelbtn,
  setChangeColorofdriver,
  setCustomerNameInput,
  setOutputType,
  setPdfLoader,
} = DriverSearchFilterSlice.actions;

export default DriverSearchFilterSlice.reducer;
