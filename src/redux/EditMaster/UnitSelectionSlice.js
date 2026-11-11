import { createSlice } from "@reduxjs/toolkit";

const UnitSelectionSlice = createSlice({
  name: "unitSelection",
  initialState: {
    // Search Filter
    globalSearchTerm: "",
    selectedCompanyName: "",
    selectedSearchCriteria: "Beginning",
    unitLast5: "",
    unitType: "Both",
    orderType: "Both",
    dateType: "Entry",
    dateFrom: "",
    dateTo: "",
    unitStatus: "All",
    pickupBy: "Name",
    deliveryBy: "Name",
    unitOrderStatus: "All",
    unitDelayType: "All",
    delayedUnitType: "All",
    dispatchDelayType: "",
    selectedDispatchStatus: "Both",
    showAdvancedSearch: false,
    showAdvancedSort: false,
    // Table Listing
    companyName: "",
    loading: true,
    listingData: [],
    changeColor: false,
    selectedId: null,
    normalSortValue: null,
    normalSortFlag: false,
    // Pagination
    pageNumber: 0,
    totalElements: 0,
    totalPages: 0,
    // Advanced Search
    advancedSearchObject: null,
    advancedSearchPayload: null,
    // Advanced Sort
    advancedSortingOrder: null,
    advancedSortingCombination: null,
    // Advanced Search Sidebar
    advancedSearchString: "",
    checkAllAdvancedSearchBy: false,
    advancedSearchByInputs: {
      pars: false,
      bolNumber: false,
      vin: false,
      stockNumber: false,
      projectCode: false,
      poNumber: false,
      serialNumber: false,
      model: false,
    },
    isInnerLookupsOpen: false,
    customerInput: "",
    customerId: null,
    customerPlantInput: "",
    customerPlantId: null,
    dealerInput: "",
    dealerId: null,
    // Misc
    rowData: null,
    notes: null,
    companyPK: null,
  },
  reducers: {
    // Search Filter
    setGlobalSearchTerm: (state, action) => {
      state.globalSearchTerm = action.payload;
    },
    setSelectedCompanyName: (state, action) => {
      state.selectedCompanyName = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
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
    setDateType: (state, action) => {
      state.dateType = action.payload;
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
    setUnitOrderStatus: (state, action) => {
      state.unitOrderStatus = action.payload;
    },
    setUnitDelayType: (state, action) => {
      state.unitDelayType = action.payload;
    },
    setDelayedUnitType: (state, action) => {
      state.delayedUnitType = action.payload;
    },
    setDispatchDelayType: (state, action) => {
      state.dispatchDelayType = action.payload;
    },
    setSelectedDispatchStatus: (state, action) => {
      state.selectedDispatchStatus = action.payload;
    },

    toggleAdvancedSearch: (state, action) => {
      state.showAdvancedSearch = !state.showAdvancedSearch;
    },
    toggleAdvancedSort: (state, action) => {
      state.showAdvancedSort = !state.showAdvancedSort;
    },

    setCompanyName: (state, action) => {
      state.companyName = action.payload;
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
    // Pagination
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    // Advanced Search
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setAdvancedSearchPayload: (state, action) => {
      state.advancedSearchPayload = action.payload;
    },
    // Advanced Sort
    setAdvancedSortingOrder: (state, action) => {
      state.advancedSortingOrder = action.payload;
    },
    setAdvancedSortingCombination: (state, action) => {
      state.advancedSortingCombination = action.payload;
    },
    // Advanced Search Sidebar
    setAdvancedSearchString: (state, action) => {
      state.advancedSearchString = action.payload;
    },
    setCheckAllAdvancedSearchBy: (state, action) => {
      state.checkAllAdvancedSearchBy = action.payload;

      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = action.payload;
      });
    },
    setAdvancedSearchByInputs: (state, { payload }) => {
      state.advancedSearchByInputs = {
        ...state.advancedSearchByInputs,
        [payload.name]: payload.checked,
      };
    },
    setIsInnerLookupsOpen: (state, action) => {
      state.isInnerLookupsOpen = action.payload;
    },
    setCustomerInput: (state, action) => {
      state.customerInput = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setCustomerPlantInput: (state, action) => {
      state.customerPlantInput = action.payload;
    },
    setCustomerPlantId: (state, action) => {
      state.customerPlantId = action.payload;
    },
    setDealerInput: (state, action) => {
      state.dealerInput = action.payload;
    },
    setDealerId: (state, action) => {
      state.dealerId = action.payload;
    },
    setRowData: (state, action) => {
      state.rowData = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setCompanyPK: (state, action) => {
      state.companyPK = action.payload;
    },
    // Miscellaneous
    clearAdvancedSearch: (state, action) => {
      state.advancedSearchObject = null;
      state.advancedSearchPayload = null;
      state.advancedSearchString = "";
      state.checkAllAdvancedSearchBy = false;
      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = false;
      });
      state.customerInput = "";
      state.customerId = null;
      state.customerPlantInput = "";
      state.customerPlantId = null;
      state.dealerInput = "";
      state.dealerId = null;
    },
    resetUnitSelectionFilters: (state, action) => {
      // Search Filter
      state.globalSearchTerm = "";
      state.selectedCompanyName = "";
      state.selectedSearchCriteria = "Beginning";
      state.unitLast5 = "";
      state.unitType = "Both";
      state.orderType = "Both";
      state.dateType = "Entry";
      state.dateFrom = "";
      state.dateTo = "";
      state.unitStatus = "All";
      state.pickupBy = "Name";
      state.deliveryBy = "Name";
      state.unitOrderStatus = "All";
      state.unitDelayType = "All";
      state.dispatchDelayType = "All";
      state.selectedDispatchStatus = "Both";
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
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      // Advanced Search
      state.advancedSearchObject = null;
      state.advancedSearchPayload = null;
      // Advanced Sort
      state.advancedSortingOrder = null;
      state.advancedSortingCombination = null;
      // Advanced Search Sidebar
      state.advancedSearchString = "";
      state.checkAllAdvancedSearchBy = false;
      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = false;
      });
      state.isInnerLookupsOpen = false;
      state.customerInput = "";
      state.customerId = null;
      state.customerPlantInput = "";
      state.customerPlantId = null;
      state.dealerInput = "";
      state.dealerId = null;
    },
    resetDelayUnitSelectionFilters: (state, action) => {
      // Search Filter
      state.globalSearchTerm = "";
      state.selectedCompanyName = "";
      state.selectedSearchCriteria = "Beginning";
      state.unitLast5 = "";
      state.unitType = "Both";
      state.orderType = "Both";
      state.dateType = "Entry";
      state.dateFrom = "";
      state.dateTo = "";
      state.unitStatus = "All";
      state.pickupBy = "Name";
      state.deliveryBy = "Name";
      state.unitOrderStatus = "All";
      state.unitDelayType = "All";
      state.dispatchDelayType = "All";
      state.selectedDispatchStatus = "Both";
      state.showAdvancedSearch = false;
      state.showAdvancedSort = false;
      // Table Listing
      state.loading = true;
      state.listingData = [];
      state.changeColor = false;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      // Pagination
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      // Advanced Search
      state.advancedSearchObject = null;
      state.advancedSearchPayload = null;
      // Advanced Sort
      state.advancedSortingOrder = null;
      state.advancedSortingCombination = null;
      // Advanced Search Sidebar
      state.advancedSearchString = "";
      state.checkAllAdvancedSearchBy = false;
      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = false;
      });
      state.isInnerLookupsOpen = false;
      state.customerInput = "";
      state.customerId = null;
      state.customerPlantInput = "";
      state.customerPlantId = null;
      state.dealerInput = "";
      state.dealerId = null;
    },
  },
});

export const {
  setGlobalSearchTerm,
  setSelectedCompanyName,
  setSelectedSearchCriteria,
  setUnitLast5,
  setUnitType,
  setOrderType,
  setDateType,
  setDateFrom,
  setDateTo,
  setUnitStatus,
  setPickupBy,
  setDeliveryBy,
  setUnitOrderStatus,
  setUnitDelayType,
  setDelayedUnitType,
  setDispatchDelayType,
  setSelectedDispatchStatus,
  toggleAdvancedSearch,
  toggleAdvancedSort,
  setCompanyName,
  setListingData,
  setLoading,
  setChangeColor,
  setSelectedId,
  setNormalSortValue,
  setNormalSortFlag,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setAdvancedSortingOrder,
  setAdvancedSortingCombination,
  setAdvancedSearchString,
  setCheckAllAdvancedSearchBy,
  setAdvancedSearchByInputs,
  setIsInnerLookupsOpen,
  setCustomerInput,
  setCustomerId,
  setCustomerPlantInput,
  setCustomerPlantId,
  setDealerInput,
  setDealerId,
  setRowData,
  setNotes,
  setCompanyPK,
  clearAdvancedSearch,
  resetUnitSelectionFilters,
  resetDelayUnitSelectionFilters,
} = UnitSelectionSlice.actions;

export default UnitSelectionSlice.reducer;
