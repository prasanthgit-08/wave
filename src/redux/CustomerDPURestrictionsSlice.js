import { createSlice } from "@reduxjs/toolkit";

const CustomerDPURestrictions = createSlice({
  name: "customerDPURestrictions",
  initialState: {
    // fetch data
    customerId: "",
    customerData: null,
    plantData: null,
    customerNameInput: "",
    plantNameInput: "",
    listingData: [],
    customers: [],
    customerPlants: [],
    customerPlantData: "",
    isCustomerExist: false,
    isPlantExist: false,
    isEdit: false,
    // search filter
    searchTerm: "",
    searchCriteria: "Beginning",
    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    // editing
    selectedDPUId: 1,
    customerDPURestrictionPK: "",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    //changesCancelled: false,
    // form inputs
    customerName: "",
    pickupCustomerFK: "",
    pickupCustomerFKCopy: null,
    pickupCustomerPlantFK: "",
    duplicateCustomer: false,
    duplicatePlant: false,
    duplicateCustomerError: false,
    duplicatePlantError: false,
    notes: "",
    normalSortValue: null,
    normalSortFlag: false,
  },
  reducers: {
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    setCustomerNameInput: (state, action) => {
      state.customerNameInput = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setPlantNameInput: (state, action) => {
      state.plantNameInput = action.payload;
    },
    setCustomerPlants: (state, action) => {
      state.customerPlants = action.payload;
    },
    setcustomerData: (state, action) => {
      state.customerData = action.payload;
    },
    setplantData: (state, action) => {
      state.plantData = action.payload;
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
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setSelectedDPUId: (state, action) => {
      state.selectedDPUId = action.payload;
    },
    setCustomerDPURestrictionPK: (state, action) => {
      state.customerDPURestrictionPK = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
    setPickupCustomerFK: (state, action) => {
      state.pickupCustomerFK = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setPickupCustomerFKCopy: (state, action) => {
      state.pickupCustomerFKCopy = action.payload;
    },
    setPickupCustomerPlantFK: (state, action) => {
      state.pickupCustomerPlantFK = action.payload;
    },
    setDuplicateCustomer: (state, action) => {
      state.duplicateCustomer = action.payload;
    },
    setIsCustomerExist: (state, action) => {
      state.isCustomerExist = action.payload;
    },
    setIsPlantExist: (state, action) => {
      state.isPlantExist = action.payload;
    },
    setDuplicatePlant: (state, action) => {
      state.duplicatePlant = action.payload;
    },
    setDuplicateCustomerError: (state, action) => {
      state.duplicateCustomerError = action.payload;
    },
    setDuplicatePlantError: (state, action) => {
      state.duplicatePlantError = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    resetClearCustomer: (state, action) => {
      state.pickupCustomerFK = "";
      state.customerNameInput = "";
    },
    resetClearCustomerPlant: (state, action) => {
      state.pickupCustomerPlantFK = "";
      state.plantNameInput = "";
    },
    resetChanges: (state, action) => {
      state.customerDPURestrictionPK = "";
      state.customerNameInput = "";
      state.plantNameInput = "";
      state.notes = "";
      state.pageNumber = 0;
      state.duplicateCustomer = false;
      state.duplicatePlant = false;
      state.duplicateCustomerError = false;
      state.duplicatePlantError = false;
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.changeColor = false;
    },
    resetDPURestrictions: (state, action) => {
      // state.customerDPURestrictionPK = '';
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.customerNameInput = "";
      state.plantNameInput = "";
      // state.searchTerm = '';
      // state.searchCriteria = 'Beginning';
      state.listingData = [];
      // state.selectedId = '';
      state.duplicateCustomer = false;
      state.duplicatePlant = false;
      state.duplicateCustomerError = false;
      state.duplicatePlantError = false;
    },
    resetFields: (state, action) => {
      state.customerNameInput = "";
      state.plantNameInput = "";
      state.pickupCustomerFK = "";
      state.pickupCustomerPlantFK = "";
      state.editFormData = null;
    },
  },
});

export const {
  setCustomerId,
  setcustomerData,
  setplantData,
  setIsEdit,
  setListingData,
  setCustomers,
  setCustomerNameInput,
  setCustomerPlants,
  setSearchTerm,
  setSelectedDPUId,
  setSearchCriteria,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  resetClearCustomerPlant,
  resetClearCustomer,
  setSelectedId,
  setNormalSortValue,
  setNormalSortFlag,
  setCustomerDPURestrictionPK,
  setIsPlantExist,
  setIsCustomerExist,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  toggleChangesCancelled,
  setCustomerName,
  setPlantNameInput,
  setPickupCustomerFK,
  setPickupCustomerFKCopy,
  setPickupCustomerPlantFK,
  setDuplicateCustomer,
  setDuplicatePlant,
  setDuplicateCustomerError,
  setDuplicatePlantError,
  setNotes,
  resetChanges,
  resetDPURestrictions,
  resetFields,
} = CustomerDPURestrictions.actions;

export default CustomerDPURestrictions.reducer;
