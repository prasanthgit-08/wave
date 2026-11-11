import { createSlice } from "@reduxjs/toolkit";

const MissingPaperworkSlice = createSlice({
  name: "missingPaperwork",
  initialState: {
    searchTerm: "",
    searchCriteria: "",
    unitNumber: "",
    unitNumberPK: null,
    unitNumberLast5: "",
    deliveryDateFrom: "",
    deliveryDateTo: "",
    dispatcherPK: null,
    dispatcher: "",
    assignedDispatcher: false,
    dispatchedBy: false,
    customer: "",
    customerPK: null,
    onlyUnitsWithNotes: false,
    unitsEnteredBy: "",
    unitsEnteredByPK: null,
    motorized: false,
    towable: false,
    flatbed: false,
    sortType: true,
    sortValue: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    selectedPK: null,
    settingsAutocompleteData: "",
    selectedDispatchPK: null,
    browseList: [],
    missingPaperworkNotes: "",
    includeNotes: false,
    loading: false,
    selectedCompanyID: null,
    driverNameInput: "",
    companyPK: null,
    companyName: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCompanyPK: (state, action) => {
      state.companyPK = action.payload;
    },
    setDriverNameInput: (state, action) => {
      state.driverNameInput = action.payload;
    },
    setSelectedCompanyID: (state, action) => {
      state.selectedCompanyID = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setUnitNumberPK: (state, action) => {
      state.unitNumberPK = action.payload;
    },
    setUnitNumberLast5: (state, action) => {
      state.unitNumberLast5 = action.payload;
    },
    setDeliveryDateFrom: (state, action) => {
      state.deliveryDateFrom = action.payload;
    },
    setDeliveryDateTo: (state, action) => {
      state.deliveryDateTo = action.payload;
    },
    setDispatcherPK: (state, action) => {
      state.dispatcherPK = action.payload;
    },
    setDispatcher: (state, action) => {
      state.dispatcher = action.payload;
    },
    setAssignedDispatcher: (state, action) => {
      state.assignedDispatcher = action.payload;
    },
    setDispatchedBy: (state, action) => {
      state.dispatchedBy = action.payload;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setCustomerPK: (state, action) => {
      state.customerPK = action.payload;
    },
    setOnlyUnitsWithNotes: (state, action) => {
      state.onlyUnitsWithNotes = action.payload;
    },
    setUnitsEnteredBy: (state, action) => {
      state.unitsEnteredBy = action.payload;
    },
    setUnitsEnteredByPK: (state, action) => {
      state.unitsEnteredByPK = action.payload;
    },
    setMotorized: (state, action) => {
      state.motorized = action.payload;
    },
    setTowable: (state, action) => {
      state.towable = action.payload;
    },
    setFlatbed: (state, action) => {
      state.flatbed = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
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
    setSettingsAutocompleteData: (state, action) => {
      state.settingsAutocompleteData = action.payload;
    },
    setSelectedDispatchPK: (state, action) => {
      state.selectedDispatchPK = action.payload;
    },
    setBrowseList: (state, action) => {
      state.browseList = action.payload;
    },
    setMissingPaperworkNotes: (state, action) => {
      state.missingPaperworkNotes = action.payload;
    },
    setIncludeNotes: (state, action) => {
      state.includeNotes = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },

    resetChanges: (state, action) => {
      state.unitNumber = "";
      state.unitNumberPK = null;
      state.customer = "";
      state.customerPK = null;
      state.dispatcher = "";
      state.dispatcherPK = null;
      state.unitsEnteredBy = "";
      state.unitsEnteredByPK = null;
      state.unitNumberLast5 = "";
      state.assignedDispatcher = true;
      state.dispatchedBy = false;
      state.onlyUnitsWithNotes = false;
      state.deliveryDateFrom = "";
      state.deliveryDateTo = new Date();
      state.motorized = false;
      state.towable = false;
      state.flatbed = false;
      state.sortType = true;
      state.sortValue = "";
      state.totalPages = 0;
      state.totalElements = 0;
      state.selectedDispatchPK = null;
      state.browseList = [];
      state.missingPaperworkNotes = [];
      state.includeNotes = false;
      state.loading = false;
      state.companyPK = null;
    },
  },
});

export const {
  setSearchTerm,
  setSearchCriteria,
  setUnitNumber,
  setUnitNumberPK,
  setUnitNumberLast5,
  setDeliveryDateFrom,
  setDeliveryDateTo,
  setDispatcherPK,
  setDispatcher,
  setAssignedDispatcher,
  setDispatchedBy,
  setCustomer,
  setCustomerPK,
  setOnlyUnitsWithNotes,
  setUnitsEnteredBy,
  setUnitsEnteredByPK,
  setMotorized,
  setTowable,
  setFlatbed,
  setSortValue,
  setSortType,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSettingsAutocompleteData,
  setSelectedDispatchPK,
  setBrowseList,
  setMissingPaperworkNotes,
  setIncludeNotes,
  resetChanges,
  setLoading,
  setSelectedCompanyID,
  setCompanyPK,
  setDriverNameInput,
  setCompanyName,
} = MissingPaperworkSlice.actions;

export default MissingPaperworkSlice;
