import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listingData: [],
  selectedId: null,
  searchTerm: "",
  searchCriteria: "Beginning",
  pageNumber: 0,
  pageSize: 10,
  totalPages: 0,
  totalElements: 0,
  sortValue: "",
  sortType: false,
  normalSortValue: "",
  normalSortFlag: 0,
  viewDetail: false,
  navigateToMainPage: false,
  resultType: 0,
  dealerConnectionFK: null,

  customerSelection: false,
  customerInput: "",
  customerId: null,
  //plant lookup
  customerPlantSelection: false,
  customerPlantInput: "",
  customerPlantId: null,
  //Plant group lookup
  customerPlantGroupSelection: false,
  customerPlantGroupInput: "",
  customerPlantGroupId: null,

  //Customer Group Lookup
  customerGroupSelection: false,
  customerGroupInput: "",
  customerGroupId: null,

  unitTypeGroupSelection: false,
  unitTypeGroupInput: "",
  unitTypeGroupId: null,
  isRatesTabValid: false,

  customerFK: null,
  customerGroupFK: null,
  customerPlantFK: null,
  customerPlantGroupFK: null,

  customerUnitTypeGroupSelection: false,
  customerUnitTypeGroupInput: "",
  customerUnitTypeGroupId: null,
};

const DealerFlatRateConnectionSlice = createSlice({
  name: "dealerFlatRateConnectionSlice",
  initialState,
  reducers: {
    setCustomerUnitTypeGroupSelection: (state, action) => {
      state.customerUnitTypeGroupSelection = action.payload;
    },

    setCustomerUnitTypeGroupInput: (state, action) => {
      state.customerUnitTypeGroupInput = action.payload;
    },
    setCustomerUnitTypeGroupId: (state, action) => {
      state.customerUnitTypeGroupId = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },

    setCustomerFK: (state, action) => {
      state.customerFK = action.payload;
    },
    setCustomerGroupFK: (state, action) => {
      state.customerGroupFK = action.payload;
    },
    setCustomerPlantFK: (state, action) => {
      state.customerPlantFK = action.payload;
    },
    setCustomerPlantGroupFK: (state, action) => {
      state.customerPlantGroupFK = action.payload;
    },

    setDealerConnectionFK: (state, action) => {
      state.dealerConnectionFK = action.payload;
    },

    setIsRatesTabValid: (state, action) => {
      state.isRatesTabValid = action.payload;
    },
    setUnitTypeGroupSelection: (state, action) => {
      state.unitTypeGroupSelection = action.payload;
    },

    setUnitTypeGroupInput: (state, action) => {
      state.unitTypeGroupInput = action.payload;
    },
    setUnitTypeGroupId: (state, action) => {
      state.unitTypeGroupId = action.payload;
    },
    setCustomerPlantGroupInput: (state, action) => {
      state.customerPlantGroupInput = action.payload;
    },
    setCustomerGroupId: (state, action) => {
      state.customerGroupId = action.payload;
    },

    setCustomerGroupInput: (state, action) => {
      state.customerGroupInput = action.payload;
    },

    setCustomerGroupSelection: (state, action) => {
      state.customerGroupSelection = action.payload;
    },

    setCustomerPlantGroupId: (state, action) => {
      state.customerPlantGroupId = action.payload;
    },

    setCustomerPlantInput: (state, action) => {
      state.customerPlantInput = action.payload;
    },

    setCustomerPlantId: (state, action) => {
      state.customerPlantId = action.payload;
    },

    setCustomerPlantGroupSelection: (state, action) => {
      state.customerPlantGroupSelection = action.payload;
    },

    setCustomerPlantSelection: (state, action) => {
      state.customerPlantSelection = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },

    setCustomerInput: (state, action) => {
      state.customerInput = action.payload;
    },
    setCustomerSelection: (state, action) => {
      state.customerSelection = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setResultType: (state, action) => {
      state.resultType = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
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
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setNavigateToMainPage: (state, action) => {
      state.navigateToMainPage = action.payload;
    },
    resetChanges: () => initialState,
  },
});

export const {
  setListingData,
  setSelectedId,
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setPageSize,
  setTotalPages,
  setTotalElements,
  setSortValue,
  setSortType,
  setNormalSortValue,
  setNormalSortFlag,
  setViewDetail,
  setNavigateToMainPage,
  setResultType,
  setCustomerSelection,
  setCustomerInput,
  setCustomerId,
  setCustomerPlantSelection,
  setCustomerPlantInput,
  setCustomerPlantGroupSelection,
  setCustomerPlantId,
  setCustomerPlantGroupInput,
  setCustomerPlantGroupId,
  setCustomerGroupSelection,
  setCustomerGroupInput,
  setCustomerGroupId,
  setUnitTypeGroupId,
  setUnitTypeGroupSelection,
  setUnitTypeGroupInput,
  setIsRatesTabValid,
  setDealerConnectionFK,
  setCustomerUnitTypeGroupId,
  setCustomerUnitTypeGroupInput,
  setCustomerUnitTypeGroupSelection,
  setCustomerFK,
  setCustomerGroupFK,
  setCustomerPlantFK,
  setCustomerPlantGroupFK,
  resetChanges,
} = DealerFlatRateConnectionSlice.actions;

export const dealerFlatRateConnectionSlice = (state) => state.DealerFlatRateConnectionSlice.value;
export default DealerFlatRateConnectionSlice;
