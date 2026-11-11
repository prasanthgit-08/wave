import { createSlice } from "@reduxjs/toolkit";

const PlantToPlantTransferSlice = createSlice({
  name: "plantToPlantTransfer",
  initialState: {
    viewDetail: true,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    loader: true,
    plantToPlantTransferData: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    showAdvancedSearch: false,
    advancedSearchObject: null,
    sortFieldName: "",
    sortValue: false,
    changeColor: false,
    id: null,
    plantToPlantTransfer: null,

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

    saveDisable: true,
    saveData: null,
  },
  reducers: {
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
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
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setPlantToPlantTransferData: (state, action) => {
      state.plantToPlantTransferData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setShowAdvancedSearch: (state, action) => {
      state.showAdvancedSearch = action.payload;
    },
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setSortFieldName: (state, action) => {
      state.sortFieldName = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setPlantToPlantTransfer: (state, action) => {
      state.plantToPlantTransfer = action.payload;
    },

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

    setSaveDisable: (state, action) => {
      state.saveDisable = action.payload;
    },
    setSaveData: (state, action) => {
      state.saveData = action.payload;
    },

    // for data reset
    resetData: (state, action) => {
      state.viewDetail = true;
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.loader = true;
      state.plantToPlantTransferData = [];
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.showAdvancedSearch = false;
      state.advancedSearchObject = null;
      state.sortFieldName = "";
      state.sortValue = false;
      state.changeColor = false;
      state.id = null;
      state.plantToPlantTransfer = null;
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
  setViewDetail,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setLoader,
  setPlantToPlantTransferData,
  setSearchTerm,
  setSearchCriteria,
  setShowAdvancedSearch,
  setAdvancedSearchObject,
  setSortFieldName,
  setSortValue,
  setChangeColor,
  setId,
  setPlantToPlantTransfer,

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

  setSaveDisable,
  setSaveData,

  resetData,
  resetCustomerData,
} = PlantToPlantTransferSlice.actions;
export default PlantToPlantTransferSlice.reducer;
