import { createSlice } from "@reduxjs/toolkit";

const PlantToYardTransferSlice = createSlice({
  name: "plantToYardTransfersSlice",
  initialState: {
    plantToYardTransferPK: null,
    customerFK: null,
    customerPlantFK: null,
    yardFK: null,
    plantToYardTransferCustomerName: "",
    plantToYardTransferPlantName: "",
    plantToYardTransferYardName: "",
    towableInvoiceAmount: "",
    towableCDLInvoiceAmount: "",
    towableInvoiceAmountReturn: "",
    towableCDLInvoiceAmountReturn: "",
    towableInvoiceAmountRoundTrip: "",
    towableCDLInvoiceAmountRoundTrip: "",
    motorizedInvoiceAmount: "",
    motorizedInvoiceAmountReturn: "",
    motorizedInvoiceAmountRoundTrip: "",
    miles: null,
    customerDetail: "",
    plantDetail: "",
    yardDetail: "",

    listingData: [],
    viewDetail: false,
    saveDisable: false,
    saveEnable: false,
    saveData: null,

    pageNumber: 0,
    totalElements: 0,
    totalPages: 0,

    searchTerm: "",
    searchCriteria: "Beginning",
    sortFlag: false,
    sortValue: "",

    showAdvanceSearch: false,
    showAdvanceSort: false,
    advanceSearchTermCustomer: "",
    advanceSearchTermPlant: "",
    advanceSearchTermYard: "",

    formPageNumber: 0,
    changeColor: false,

    isPlantToYardExisting: false,

    // for customer page
    customerPageNumber: 0,
    customerTotalPages: 0,
    customerTotalElements: 0,
    customerLoader: true,
    customerData: [],
    customerSearchTerm: "",
    customerSearchCriteria: "Beginning",
    customerType: "Active",
    showCustomerAdvancedSearch: false,
    customerAdvancedSearchObject: null,
    customerSortFieldName: "",
    customerSortValue: false,
    showCustomerAdvancedSort: false,
    customerAdvanceSortValue: null,
    customerAdvancedSortOrder: null,
    customerChangeColor: false,
    customerId: null,
    plantToYardId: null,
  },
  reducers: {
    setPlantToYardId: (state, action) => {
      state.plantToYardId = action.payload;
    },
    setYardOne: (state, action) => {
      state.yardOne = action.payload;
    },
    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
    },

    setSaveData: (state, action) => {
      state.saveData = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setSaveEnable: (state, action) => {
      state.saveEnable = action.payload;
    },

    setPlantToYardTransferPK: (state, action) => {
      state.plantToYardTransferPK = action.payload;
    },
    setCustomerFK: (state, action) => {
      state.customerFK = action.payload;
    },
    setCustomerPlantFk: (state, action) => {
      state.customerPlantFK = action.payload;
    },
    setYardFk: (state, action) => {
      state.yardFK = action.payload;
    },
    setPlantToYardTransferCustomer: (state, action) => {
      state.plantToYardTransferCustomerName = action.payload;
    },
    setPlantToYardTransferPlant: (state, action) => {
      state.plantToYardTransferPlantName = action.payload;
    },
    setPlantToYardTransferYard: (state, action) => {
      state.plantToYardTransferYardName = action.payload;
    },
    setTowableInvoiceAmount: (state, action) => {
      state.towableInvoiceAmount = action.payload;
    },
    setTowableCDLInvoiceAmount: (state, action) => {
      state.towableCDLInvoiceAmount = action.payload;
    },
    setTowableInvoiceAmountReturn: (state, action) => {
      state.towableInvoiceAmountReturn = action.payload;
    },
    setTowableCDLInvoiceAmountReturn: (state, action) => {
      state.towableCDLInvoiceAmountReturn = action.payload;
    },
    setTowableInvoiceAmountRoundTrip: (state, action) => {
      state.towableInvoiceAmountRoundTrip = action.payload;
    },
    setTowableCDLInvoiceAmountRoundTrip: (state, action) => {
      state.towableCDLInvoiceAmountRoundTrip = action.payload;
    },
    setMotorizedInvoiceAmount: (state, action) => {
      state.motorizedInvoiceAmount = action.payload;
    },
    setMotorizedInvoiceAmountReturn: (state, action) => {
      state.motorizedInvoiceAmountReturn = action.payload;
    },
    setMotorizedInvoiceAmountRoundTrip: (state, action) => {
      state.motorizedInvoiceAmountRoundTrip = action.payload;
    },
    setMiles: (state, action) => {
      state.miles = action.payload;
    },
    setCustomerDetail: (state, action) => {
      state.customerDetail = action.payload;
    },
    setPlantDetail: (state, action) => {
      state.plantDetail = action.payload;
    },
    setYardDetail: (state, action) => {
      state.yardDetail = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setChangeColorCustomer: (state, action) => {
      state.changeColorCustomer = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setSaveDisable: (state, action) => {
      state.saveDisable = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setShowAdvanceSearchCustomer: (state, action) => {
      state.showAdvanceSearchCustomer = action.payload;
    },
    setAdvanceSearchTermCustomer: (state, action) => {
      state.advanceSearchTermCustomer = action.payload;
    },
    setAdvanceSearchTermPlant: (state, action) => {
      state.advanceSearchTermPlant = action.payload;
    },
    setAdvanceSearchTermYard: (state, action) => {
      state.advanceSearchTermYard = action.payload;
    },
    resetChanges: (state, action) => {
      state.plantToYardTransferPK = null;
      state.customerPlantFK = null;
      state.yardFK = null;
      state.viewDetail = false;
      state.listingData = [];
      state.plantToYardTransferCustomerName = "";
      state.plantToYardTransferPlantName = "";
      state.plantToYardTransferYardName = "";
      state.towableInvoiceAmount = "";
      state.towableCDLInvoiceAmount = "";
      state.towableInvoiceAmountReturn = "";
      state.towableCDLInvoiceAmountReturn = "";
      state.towableInvoiceAmountRoundTrip = "";
      state.towableCDLInvoiceAmountRoundTrip = "";
      state.motorizedInvoiceAmount = "";
      state.motorizedInvoiceAmountReturn = "";
      state.motorizedInvoiceAmountRoundTrip = "";
      state.miles = null;
      state.customerFK = null;
      state.advanceSearchTermCustomer = "";
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.showAdvanceSearch = false;
      state.sortFlag = false;
      state.sortValue = "";
      state.changeColor = false;
      state.pageNumber = 0;
    },
    setSort: (state, action) => {
      state.sortFlag = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setCustomerEditDetail: (state, action) => {
      state.customerEditMode = action.payload;
    },
    setFormPageNumber: (state, action) => {
      state.formPageNumber = action.payload;
    },
    setIsPlantToYardExisting: (state, action) => {
      state.isPlantToYardExisting = action.payload;
    },

    // for customer page
    // for customer page
    setCustomerPageNumber: (state, action) => {
      state.customerPageNumber = action.payload;
    },
    setCustomerTotalPages: (state, action) => {
      state.customerTotalPages = action.payload;
    },
    setCustomerTotalElements: (state, action) => {
      state.customerTotalElements = action.payload;
    },
    setCustomerLoader: (state, action) => {
      state.customerLoader = action.payload;
    },
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
    },
    setCustomerSearchTerm: (state, action) => {
      state.customerSearchTerm = action.payload;
    },
    setCustomerSearchCriteria: (state, action) => {
      state.customerSearchCriteria = action.payload;
    },
    setCustomerType: (state, action) => {
      state.customerType = action.payload;
    },
    setShowCustomerAdvancedSearch: (state, action) => {
      state.showCustomerAdvancedSearch = action.payload;
    },
    setCustomerAdvancedSearchObject: (state, action) => {
      state.customerAdvancedSearchObject = action.payload;
    },
    setCustomerSortFieldName: (state, action) => {
      state.customerSortFieldName = action.payload;
    },
    setCustomerSortValue: (state, action) => {
      state.customerSortValue = action.payload;
    },
    setShowCustomerAdvancedSort: (state, action) => {
      state.showCustomerAdvancedSort = action.payload;
    },
    setCustomerAdvanceSortValue: (state, action) => {
      state.customerAdvanceSortValue = action.payload;
    },
    setCustomerAdvancedSortOrder: (state, action) => {
      state.customerAdvancedSortOrder = action.payload;
    },
    setCustomerChangeColor: (state, action) => {
      state.customerChangeColor = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    resetCustomerData: (state, action) => {
      state.customerPageNumber = 0;
      state.customerTotalPages = 0;
      state.customerTotalElements = 0;
      state.customerLoader = true;
      state.customerData = [];
      state.customerSearchTerm = "";
      state.customerSearchCriteria = "Beginning";
      state.customerType = "Active";
      state.showCustomerAdvancedSearch = false;
      state.customerAdvancedSearchObject = null;
      state.customerSortFieldName = "";
      state.customerSortValue = false;
      state.showCustomerAdvancedSort = false;
      state.customerAdvanceSortValue = null;
      state.customerAdvancedSortOrder = null;
      state.customerChangeColor = false;
      state.customerId = null;
    },
  },
});
export const {
  setPlantToYardTransferPK,
  setCustomerFK,
  setCustomerPlantFk,
  setYardFk,
  setTowableCDLInvoiceAmountReturn,
  setPlantToYardTransferCustomer,
  setPlantToYardTransferPlant,
  setPlantToYardTransferYard,
  setTowableInvoiceAmount,
  setTowableCDLInvoiceAmount,
  setTowableInvoiceAmountReturn,
  setTowableInvoiceAmountRoundTrip,
  setTowableCDLInvoiceAmountRoundTrip,
  setMotorizedInvoiceAmount,
  setMotorizedInvoiceAmountReturn,
  setMotorizedInvoiceAmountRoundTrip,
  setMiles,
  setCustomerDetail,
  setPlantDetail,
  setYardDetail,
  setListingData,
  setViewDetail,
  setSaveDisable,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setSearchTerm,
  setSearchCriteria,
  setShowAdvanceSearch,
  setAdvanceSearchTermCustomer,
  setAdvanceSearchTermPlant,
  setAdvanceSearchTermYard,
  resetChanges,
  setLoader,
  setYardOne,
  setSelectedCustomerStatus,
  setSelectedStatus,
  setSelectedSearchCriteria,
  setComplete,
  setSearchTerms,
  setShowAdvanceSearchCustomer,
  setShowAdvanceSortCustomer,
  setShowAdvanceSort,
  setSearchedCustomer,
  setAdvancedSearchObject,
  setNormalSortValue,
  setNormalSortFlag,
  // setCustomerData,
  setChangeColorCustomer,
  setAdvanceSortingOrder,
  setAdvanceSortingCriteria,
  setAdvanceSortedValue,
  setCustomerViewDetail,
  setCustomerEditDetail,
  setSort,
  setSortValue,
  setFormPageNumber,
  setSaveData,
  setSaveEnable,
  setPlantToYardId,
  setChangeColor,
  setIsPlantToYardExisting,

  // for customer page
  setCustomerPageNumber,
  setCustomerTotalPages,
  setCustomerTotalElements,
  setCustomerLoader,
  setCustomerData,
  setCustomerSearchTerm,
  setCustomerSearchCriteria,
  setCustomerType,
  setShowCustomerAdvancedSearch,
  setCustomerAdvancedSearchObject,
  setCustomerSortFieldName,
  setCustomerSortValue,
  setShowCustomerAdvancedSort,
  setCustomerAdvanceSortValue,
  setCustomerAdvancedSortOrder,
  setCustomerChangeColor,
  setCustomerId,
  resetCustomerData,
} = PlantToYardTransferSlice.actions;

export default PlantToYardTransferSlice.reducer;
