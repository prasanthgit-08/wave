import { createSlice } from "@reduxjs/toolkit";

const PermissionsMaintenanceSlice = createSlice({
  name: "permissionsMaintenance",
  initialState: {
    listingData: [],
    formData: null,
    permissionsPayload: null,
    selectedId: null,
    viewDetail: false,
    disableSave: true,
    isUniqueDescription: true,
    isUniqueObjectKey: true,
    // search filter
    searchTerm: "",
    searchCriteria: "Beginning",
    searchCriteria2: "All",
    searchCriteria3: "All",
    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    // normal sorting
    sortValue: null,
    sortFlag: false,
    // advanced filters
    showAdvancedSearch: false,
    showAdvancedSort: false,
    advancedSearchObject: null,
    advancedSearchPayload: null,
    advancedSortingOrder: null,
    advancedSortingCombination: null,
    cancelChanges: false,
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setPermissionsPayload: (state, action) => {
      state.permissionsPayload = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSearchCriteria2: (state, action) => {
      state.searchCriteria2 = action.payload;
    },
    setSearchCriteria3: (state, action) => {
      state.searchCriteria3 = action.payload;
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
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
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
    setAdvancedSearchPayload: (state, action) => {
      state.advancedSearchPayload = action.payload;
    },
    setAdvancedSortingOrder: (state, action) => {
      state.advancedSortingOrder = action.payload;
    },
    setAdvancedSortingCombination: (state, action) => {
      state.advancedSortingCombination = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.cancelChanges = !state.cancelChanges;
    },
    setIsUniqueDescription: (state, action) => {
      state.isUniqueDescription = action.payload;
    },
    setIsUniqueObjectKey: (state, action) => {
      state.isUniqueObjectKey = action.payload;
    },

    resetPermissionsMaintenance: (state) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.searchCriteria2 = "All";
      state.searchCriteria3 = "All";
      state.listingData = [];
      state.isUniqueDescription = true;
      state.isUniqueObjectKey = true;
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      state.selectedId = null;
      state.sortValue = null;
      state.sortFlag = false;
      state.showAdvancedSearch = false;
      state.showAdvancedSort = false;
    },
  },
});

export const {
  setListingData,
  setFormData,
  setPermissionsPayload,
  setSelectedId,
  setViewDetail,
  setDisableSave,
  setSearchTerm,
  setSearchCriteria,
  setSearchCriteria2,
  setSearchCriteria3,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSortValue,
  setSortFlag,
  setShowAdvancedSearch,
  setShowAdvancedSort,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setAdvancedSortingOrder,
  setAdvancedSortingCombination,
  toggleChangesCancelled,
  setIsUniqueDescription,
  setIsUniqueObjectKey,
  resetPermissionsMaintenance,
} = PermissionsMaintenanceSlice.actions;

export default PermissionsMaintenanceSlice;
