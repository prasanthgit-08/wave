import { createSlice } from "@reduxjs/toolkit";
import { setAdvanceSearchTermTwo } from "./YardToYardShuttleSlice";
import { act } from "react-dom/test-utils";

const CustomerDealerSlice = createSlice({
  name: "customerDealerFilter",
  initialState: {
    id: "",
    changeColor: false,
    searchCriteria: "Beginning",
    dealerData: [],
    searchTerm: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    activeTab: "Dealer",

    dealerName: "",
    dealerAddress1: "",
    dealerAddress2: "",
    dealerCity: "",
    dealerState: "",
    dealerZip: "",
    dealerID: "",

    customerData: [],
    customerPageNumber: 0,
    customerTotalPages: 0,
    customerTotalElements: 0,
    customerSearchString: "",
    customerName: "",
    customerId: "",
    customerSort: false,
    customerSortValue: null,
    customerSelectedId: "",

    plantData: [],
    plantPageNumber: 0,
    plantTotalPages: 0,
    plantTotalElements: 0,
    plantSearchString: "",
    plantName: "",
    plantId: "",
    plantSort: false,
    plantSortValue: null,
    plantSelectedId: "",

    plantGroupData: [],
    plantGroupPageNumber: 0,
    plantGroupTotalPages: 0,
    plantGroupTotalElements: 0,
    plantGroupSearchString: "",
    plantGroupId: "",
    plantGroupName: "",
    plantGroupSort: false,
    plantGroupSortValue: null,
    plantGroupSelectionId: "",
    customerLoading: false,
    plantLoading: false,
    plantGroupLoading: false,

    sortValue: null,
    sortFlag: false,
    isActive: "Active",
    viewDetails: true,
    advancedSearchObject: null,
    showAdvancedSearch: false,
    showAdvancedSort: false,
    searchedDealer: null,
    advanceSortedValue: null,
    advanceSortingOrder: null,
    advancedSearchString: "",
    advancedSearchByPayload: null,
    checkAllAdvancedSearchBy: false,
    advancedSearchByInputs: {
      address: false,
      postalCode: false,
      phone: false,
      contacts: false,
      notes: false,
      storeCode: false,
    },
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setCustomerLoading: (state, action) => {
      state.customerLoading = action.payload;
    },
    setPlantLoading: (state, action) => {
      state.plantLoading = action.payload;
    },
    setPlantGroupLoading: (state, action) => {
      state.plantGroupLoading = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setDealerData: (state, { payload }) => {
      state.dealerData = payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setViewDetails: (state, action) => {
      state.viewDetails = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },
    setCustomerSelectedId: (state, action) => {
      state.customerSelectedId = action.payload;
    },
    setPlantSelectedId: (state, action) => {
      state.plantSelectedId = action.payload;
    },
    setPlantGroupSelectionId: (state, action) => {
      state.plantGroupSelectionId = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerm = action.payload;
    },
    setIsActivce: (state, action) => {
      state.isActive = action.payload;
    },
    setShowAdvancedSearch: (state, action) => {
      state.showAdvancedSearch = action.payload;
    },
    setShowAdvancedSort: (state, action) => {
      state.showAdvancedSort = action.payload;
    },
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setSearchedDealer: (state, action) => {
      state.searchedDealer = action.payload;
    },
    setAdvanceSortingCriteria: (state, action) => {
      state.advanceSortingOrder = action.payload;
    },
    setAdvanceSortedValue: (state, action) => {
      state.advanceSortedValue = action.payload;
    },
    setAdvanceSortingOrder: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setAdvancedSearchString: (state, action) => {
      state.advancedSearchString = action.payload;
    },
    setDealerName: (state, action) => {
      state.dealerName = action.payload;
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
    setDealerId: (state, action) => {
      state.dealerID = action.payload;
    },
    setDealerCity: (state, action) => {
      state.dealerCity = action.payload;
    },
    setDealerZip: (state, action) => {
      state.dealerZip = action.payload;
    },
    resetDealerDetails: (state) => {
      state.dealerName = "";
      state.dealerAddress1 = "";
      state.dealerAddress2 = "";
      state.dealerCity = "";
      state.dealerState = "";
      state.dealerZip = "";
    },
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
    },
    setCustomerPageNumber: (state, action) => {
      state.customerPageNumber = action.payload;
    },
    setCustomerTotalPages: (state, action) => {
      state.customerTotalPages = action.payload;
    },
    setCustomerTotalElements: (state, action) => {
      state.customerTotalElements = action.payload;
    },
    setPlantData: (state, action) => {
      state.plantData = action.payload;
    },
    setPlantPageNumber: (state, action) => {
      state.plantPageNumber = action.payload;
    },
    setPlantTotalPages: (state, action) => {
      state.plantTotalPages = action.payload;
    },
    setPlantTotalElements: (state, action) => {
      state.plantTotalElements = action.payload;
    },
    setPlantGroupData: (state, action) => {
      state.plantGroupData = action.payload;
    },
    setPlantGroupPageNumber: (state, action) => {
      state.plantGroupPageNumber = action.payload;
    },
    setPlantGroupTotalPages: (state, action) => {
      state.plantGroupTotalPages = action.payload;
    },
    setPlantGroupTotalElements: (state, action) => {
      state.plantGroupTotalElements = action.payload;
    },
    setCustomerSearchString: (state, action) => {
      state.customerSearchString = action.payload;
    },
    setPlantSearchString: (state, action) => {
      state.plantSearchString = action.payload;
    },
    setPlantGroupSearchString: (state, action) => {
      state.plantGroupSearchString = action.payload;
    },
    setPlantGroupName: (state, action) => {
      state.plantGroupName = action.payload;
    },
    setPlantGroupID: (state, action) => {
      state.plantGroupId = action.payload;
    },
    setPlantName: (state, action) => {
      state.plantName = action.payload;
    },
    setPlantID: (state, action) => {
      state.plantId = action.payload;
    },
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
    setCustomerID: (state, action) => {
      state.customerId = action.payload;
    },
    setCustomerSort: (state, action) => {
      state.customerSort = !state.customerSort;
    },
    setCustomerSortValue: (state, action) => {
      state.customerSortValue = action.payload;
    },
    setPlantSort: (state, action) => {
      state.plantSort = !state.plantSort;
    },
    setPlantSortValue: (state, action) => {
      state.plantSortValue = action.payload;
    },
    setPlantGroupSort: (state, action) => {
      state.plantGroupSort = !state.plantGroupSort;
    },
    setPlantGroupSortValue: (state, action) => {
      state.plantGroupSortValue = action.payload;
    },
    resetSearchSettings: (state, action) => {
      state.changeColor = false;
      state.searchCriteria = "Beginning";
      state.searchTerm = "";
      state.pageNumber = 0;
      state.sortValue = null;
      state.sortFlag = false;
      state.showAdvancedSearch = false;
      state.showAdvancedSort = false;
      state.advanceSortedValue = null;
      state.advanceSortingOrder = null;
    },
    setAdvancedSearchByPayload: (state, action) => {
      state.advancedSearchByPayload = action.payload;
    },
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

    clearAdvancedSearch: (state, action) => {
      state.advancedSearchObject = null;
      state.searchedDealer = null;
      state.advancedSearchString = "";
      state.checkAllAdvancedSearchBy = false;
      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = false;
      });
      state.advancedSearchByPayload = null;
    },
    updateAdvancedSearchByInputs: (state, { payload }) => {
      if (payload === "All") {
        state.checkAllAdvancedSearchBy = true;
        state.advancedSearchByInputs = {
          address: true,
          postalCode: true,
          phones: true,
          contacts: true,
          notes: true,
          storeCode: true,
        };
      } else if (payload === "None") {
        state.checkAllAdvancedSearchBy = false;
        state.advancedSearchByInputs = {
          address: false,
          postalCode: false,
          phones: false,
          contacts: false,
          notes: false,
          storeCode: false,
        };
      }
    },
    resetNewPage: (state) => {
      state.customerSearchString = "";
      state.customerId = "";
      state.customerName = "";
      state.plantGroupId = "";
      state.plantGroupName = "";
      state.plantGroupSearchString = "";
      state.plantId = "";
      state.plantSearchString = "";
      state.plantName = "";
    },
  },
});

export const {
  setId,
  setChangeColor,
  setSearchCriteria,
  setAdvancedSearchByInputs,
  setCheckAllAdvancedSearchBy,
  setSearchTerms,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setSortFlag,
  setSortValue,
  setIsActivce,
  setDealerData,
  setCustomerSort,
  setCustomerSortValue,
  setPlantGroupSort,
  setPlantGroupSortValue,
  setPlantSort,
  setPlantSortValue,
  setViewDetails,
  setDealerAddress1,
  setDealerAddress2,
  setDealerCity,
  setDealerId,
  setDealerName,
  setDealerState,
  setDealerZip,
  resetDealerDetails,
  setCustomerData,
  setCustomerPageNumber,
  setCustomerTotalElements,
  setCustomerTotalPages,
  setPlantData,
  setCustomerLoading,
  setPlantGroupLoading,
  setPlantLoading,
  setPlantPageNumber,
  setPlantTotalElements,
  setPlantTotalPages,
  setPlantGroupData,
  setPlantGroupPageNumber,
  setPlantGroupTotalElements,
  setPlantGroupTotalPages,
  setCustomerSearchString,
  setPlantGroupSearchString,
  setPlantSearchString,
  setCustomerID,
  setCustomerName,
  setPlantGroupID,
  setPlantGroupName,
  setPlantID,
  setPlantName,
  setCustomerSelectedId,
  setPlantGroupSelectionId,
  setPlantSelectedId,
  setShowAdvancedSearch,
  setShowAdvancedSort,
  setSearchedDealer,
  setAdvanceSortedValue,
  setAdvanceSortingCriteria,
  setAdvancedSearchObject,
  setAdvancedSearchByPayload,
  setAdvancedSearchString,
  setActiveTab,
  setAdvanceSortingOrder,
  resetSearchSettings,
  updateAdvancedSearchByInputs,
  resetNewPage,
  clearAdvancedSearch,
} = CustomerDealerSlice.actions;

export const customerDealers = (state) => state.customerDealersFilter.value;

export default CustomerDealerSlice.reducer;
