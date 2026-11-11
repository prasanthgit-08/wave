import { faLaptopHouse } from "@fortawesome/free-solid-svg-icons";
import { createSlice } from "@reduxjs/toolkit";
const ReprintBolSlice = createSlice({
  name: "reprintBOLSlice",
  initialState: {
    rePrintBOL: false,
    rePrintBOLShuttle: false,
    bolFor: "driver",
    tEnabled: null,
    searchCriteria: "Beginning",
    firstName: "",
    lastName: "",
    active: null,
    activeString: "Active",
    deleased: null,
    driverData: [],
    sortValue: null,
    sortType: 1,
    driverId: null,
    totalPages: 0,
    unitConfirmationData: null,
    pageNumber: 0,
    dispatchConfirmationData: null,
    unitFK: null,

    // Search Filter
    dispatchSearchTerm: "",
    dispatchSearchCriteria: "Beginning",
    unitLast5: "",
    unitType: "Both",
    orderType: "Both",
    dateFrom: "",
    dateTo: "",
    unitStatus: "All",
    pickupBy: "Name",
    deliveryBy: "Name",
    showAdvancedSearch: false,
    showAdvancedSort: false,
    // Table Listing
    loading: true,
    listingData: [],
    changeColor: false,
    selectedId: null,
    normalSortValue: null,
    normalSortFlag: false,
    // Pagination
    dispatchPageNumber: 0,
    dispatchTotalElements: 0,
    dispatchTotalPages: 0,
    // Advanced Search
    advancedSearchObject: null,
    advancedSearchPayload: null,
    // Advanced Sort
    advancedSortingOrder: null,
    advancedSortingCombination: null,
    printBOLOutputData: null,
    printYardFlag: false,
    dispatchId: null,
    nextEnabled: null,
    //output screen states
    email: "",
    printAtYard: false,
    print: false,
    emailToCustomer: false,
    emailToPlant: false,
    emailToDealer: false,
    emailToUser: false,
    emailToDriver: false,
    driverDispatchName: null,
    isBackButtonClicked: false,
    defaultsApplied: false,
  },
  reducers: {
    setRePrintBOL: (state, action) => {
      state.rePrintBOL = action.payload;
    },
    setDriverDispatchName: (state, action) => {
      state.driverDispatchName = action.payload;
    },
    setNextEnabled: (state, action) => {
      state.nextEnabled = action.payload;
    },
    setRePrintBOLShuttle: (state, action) => {
      state.rePrintBOLShuttle = action.payload;
    },
    setBolFor: (state, action) => {
      state.bolFor = action.payload;
    },

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
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setUnitConfirmationData: (state, action) => {
      state.unitConfirmationData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },

    setDispatchConfirmationData: (state, action) => {
      state.dispatchConfirmationData = action.payload;
    },

    setUnitFK: (state, action) => {
      state.unitFK = action.payload;
    },
    setDispatchSearchTerm: (state, action) => {
      state.dispatchSearchTerm = action.payload;
    },
    setDispatchSearchCriteria: (state, action) => {
      state.dispatchSearchCriteria = action.payload;
    },
    setUnitLast5: (state, action) => {
      state.unitLast5 = action.payload;
    },
    setUnitType: (state, action) => {
      state.unitType = action.payload;
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    setDateFrom: (state, action) => {
      state.dateFrom = action.payload;
    },
    setDateTo: (state, action) => {
      state.dateTo = action.payload;
    },
    setUnitStatus: (state, action) => {
      state.unitStatus = action.payload;
    },
    setPickupBy: (state, action) => {
      state.pickupBy = action.payload;
    },
    setDeliveryBy: (state, action) => {
      state.deliveryBy = action.payload;
    },
    setShowAdvancedSearch: (state, action) => {
      state.showAdvancedSearch = action.payload;
    },
    setShowAdvancedSort: (state, action) => {
      state.showAdvancedSort = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setDispatchPageNumber: (state, action) => {
      state.dispatchPageNumber = action.payload;
    },
    setDispatchTotalElements: (state, action) => {
      state.dispatchTotalElements = action.payload;
    },
    setDispatchTotalPages: (state, action) => {
      state.dispatchTotalPages = action.payload;
    },
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setAdvancedSearchPayload: (state, action) => {
      state.advancedSearchPayload = action.payload;
    },
    setAdvancedSortingOrder: (state, action) => {
      state.advancedSortingOrder = action.payload;
    },
    setAdvancedSortingCombination: (state, action) => {
      state.advancedSortingCombination = action.payload;
    },
    setPrintBOLOutputData: (state, action) => {
      state.printBOLOutputData = action.payload;
    },
    setPrintYardFlag: (state, action) => {
      state.printYardFlag = action.payload;
    },
    setDispatchId: (state, action) => {
      state.dispatchId = action.payload;
    },

    setTenable: (state, action) => {
      state.tEnabled = action.payload;
    },
    //set states for output screen
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPrintAtYard: (state, action) => {
      state.printAtYard = action.payload;
    },
    setPrint: (state, action) => {
      state.print = action.payload;
    },
    setEmailToCustomer: (state, action) => {
      state.emailToCustomer = action.payload;
    },
    setEmailToPlant: (state, action) => {
      state.emailToPlant = action.payload;
    },
    setEmailToDealer: (state, action) => {
      state.emailToDealer = action.payload;
    },
    setEmailToUser: (state, action) => {
      state.emailToUser = action.payload;
    },
    setEmailToDriver: (state, action) => {
      state.emailToDriver = action.payload;
    },
    setIsBackButtonClicked: (state, action) => {
      state.isBackButtonClicked = action.payload;
    },
    setDefaultsApplied: (state, action) => {
      state.defaultsApplied = action.payload;
    },
    resetOutputconfirmationScreen: (state, action) => {
      state.email = "";
      state.printAtYard = false;
      state.print = false;
      state.emailToCustomer = false;
      state.emailToDealer = false;
      state.emailToDriver = false;
      state.emailToPlant = false;
      state.emailToUser = false;
      state.isBackButtonClicked = false;
      state.defaultsApplied = false;
    },
    resetDispatchSelectionFilters: (state, action) => {
      // Search Filter
      state.dispatchSearchTerm = "";
      state.dispatchSearchCriteria = "Beginning";
      state.unitLast5 = "";
      state.unitType = "Both";
      state.orderType = "Both";
      state.dateType = "Entry";
      state.dateFrom = "";
      state.dateTo = "";
      state.unitStatus = "All";
      state.pickupBy = "Name";
      state.deliveryBy = "Name";
      state.showAdvancedSearch = false;
      state.showAdvancedSort = false;
      // Table Listing
      state.loading = true;
      state.listingData = [];
      state.changeColor = false;
      state.selectedId = null;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      // Pagination
      state.dispatchPageNumber = 0;
      state.dispatchTotalElements = 0;
      state.dispatchTotalPages = 0;
      // Advanced Search
      state.advancedSearchObject = null;
      state.advancedSearchPayload = null;
      // Advanced Sort
      state.advancedSortingOrder = null;
      state.advancedSortingCombination = null;
      // Advanced Search Sidebar
      state.advancedSearchString = "";
      state.checkAllAdvancedSearchBy = false;
    },
  },
});
export const {
  setBolFor,
  setRePrintBOL,
  setRePrintBOLShuttle,
  setSearchCriteria,
  setFirstName,
  setLastName,
  setActive,
  setActiveString,
  setDeleased,
  setDriverData,
  setSortValue,
  setSortType,
  setDriverId,
  setTotalPages,
  setUnitConfirmationData,
  setUnitFK,
  setDispatchSearchTerm,
  setDispatchSearchCriteria,
  setUnitLast5,
  setUnitType,
  setOrderType,
  setDateFrom,
  setDateTo,
  setUnitStatus,
  setPickupBy,
  setDeliveryBy,
  setShowAdvancedSearch,
  setShowAdvancedSort,
  setLoading,
  setListingData,
  setChangeColor,
  setSelectedId,
  setNormalSortValue,
  setNormalSortFlag,
  setDispatchPageNumber,
  setDispatchTotalElements,
  setDispatchTotalPages,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setAdvancedSortingOrder,
  setAdvancedSortingCombination,
  resetDispatchSelectionFilters,
  setPageNumber,
  setDispatchConfirmationData,
  setPrintBOLOutputData,
  setPrintYardFlag,
  setDispatchId,
  setNextEnabled,
  setTenable,
  setEmail,
  setEmailToCustomer,
  setEmailToDealer,
  setEmailToDriver,
  setEmailToPlant,
  setEmailToUser,
  setPrint,
  setPrintAtYard,
  resetOutputconfirmationScreen,
  setDriverDispatchName,
  setIsBackButtonClicked,
  setDefaultsApplied,
} = ReprintBolSlice.actions;

export default ReprintBolSlice.reducer;
