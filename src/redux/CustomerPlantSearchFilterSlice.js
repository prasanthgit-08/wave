import { createSlice } from "@reduxjs/toolkit";

const CustomerPlantSearchFilterSlice = createSlice({
  name: "customePlantSearchFilter",

  initialState: {
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    browseNavigation: [],
    selectedCustomerPlantStatus: "Complete",
    selectedStatus: "Active",
    selectedSearchCriteria: "Beginning",
    complete: true,
    searchTerms: "",
    showAdvanceSearch: false,
    searchedCustomerPlant: null,
    customerPlantData: [],
    changeColor: false,
    id: "",
    plantSortFlag: false,
    plantSortValue: null,
  },

  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },
    setSelectedCustomerPlantStatus: (state, action) => {
      state.selectedCustomerPlantStatus = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setComplete: (state, action) => {
      state.complete = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
    },

    setSearchedCustomerPlant: (state, action) => {
      state.searchedCustomerPlant = action.payload;
    },

    setCustomerPlantData: (state, action) => {
      state.customerPlantData = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setId: (state, action) => {
      state.id = action.payload;
    },
    resetPlantSearchFilter: (state, action) => {
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.selectedCustomerPlantStatus = "Complete";
      state.plantSortFlag = false;
      state.plantSortValue = null;
      state.selectedStatus = "Active";
    },
    setPlantSortValue: (state, action) => {
      state.plantSortValue = action.payload;
    },

    setPlantSortFlag: (state, action) => {
      state.plantSortFlag = action.payload;
    },
    setSortPositions: (state, action) => {
      state.rowPosition = action.payload;
      state.columnPosition = action.payload;
    },

    resetAdvanceSearchSortCustomerPlant: (state, action) => {
      state.showAdvanceSearch = false;
      state.searchedCustomerPlant = null;
      state.id = "";
    },
  },
});

export const {
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setBrowseNavigation,
  setSelectedCustomerPlantStatus,
  setSelectedStatus,
  setSelectedSearchCriteria,
  setComplete,
  setSearchTerms,
  setShowAdvanceSearch,
  setSearchedCustomerPlant,
  setCustomerPlantData,
  setChangeColor,
  setId,
  resetPlantSearchFilter,
  setPlantSortFlag,
  setPlantSortValue,
  setSortPositions,
  resetAdvanceSearchSortCustomerPlant,
} = CustomerPlantSearchFilterSlice.actions;

export default CustomerPlantSearchFilterSlice.reducer;
