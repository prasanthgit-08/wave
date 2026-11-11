import { createSlice } from "@reduxjs/toolkit";

const CustomerOrderUsersSlice = createSlice({
  name: "customerOrderUsers",
  initialState: {
    // fetch data
    customerId: "",
    orderEntryUsers: "",
    listingData: [],
    allUsers: [],
    customerPlants: [],
    // search filter
    searchTerm: "",
    searchCriteria: "Beginning",
    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    // editing
    selectedId: "",
    customerOrderUserPK: "",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    changesCancelled: false,

    disableSave: false,
    disableAutocomplete: false,
    // form inputs
    orderUserFK: "",
    customerPlantFK: "",
    duplicateRecord: false,
    usersDataInput: "",
    userSelection: false,
    pickupUserSelection: false,
    isuserandplantUnique: false,
    pickupPlantInput: "",
    pickupPlantSelection: false,
    plantstatus: false,
  },
  reducers: {
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setIsuserandplantUnique: (state, action) => {
      state.isuserandplantUnique = action.payload;
    },
    setUsersDataInput: (state, action) => {
      state.usersDataInput = action.payload;
    },
    setPickupUserSelection: (state, action) => {
      state.pickupUserSelection = action.payload;
    },
    setUserSelection: (state, action) => {
      state.userSelection = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setPickupPlantInput: (state, action) => {
      state.pickupPlantInput = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setCustomerPlants: (state, action) => {
      state.customerPlants = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setDisableAutocomplete: (state, action) => {
      state.disableAutocomplete = action.payload;
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

    setPickupPlantSelection: (state, action) => {
      state.pickupPlantSelection = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setCustomerOrderUserPK: (state, action) => {
      state.customerOrderUserPK = action.payload;
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
    setChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setPlantstatus: (state, action) => {
      state.plantstatus = action.payload;
    },
    setOrderUserFK: (state, action) => {
      state.orderUserFK = action.payload;
    },
    setCustomerPlantFK: (state, action) => {
      state.customerPlantFK = action.payload;
    },
    setDuplicateRecord: (state, action) => {
      state.duplicateRecord = action.payload;
    },
    resetChanges: (state, action) => {
      state.customerOrderUserPK = "";
      state.orderUserFK = "";
      state.usersData = "";
      state.customerPlantFK = "";
      // state.selectedId = '';
      state.duplicateRecord = false;
      state.pickupPlantInput = "";
      state.usersDataInput = "";
    },
    resetOrderUsers: (state, action) => {
      state.searchTerm = "";
      state.pageNumber = 0;
      state.searchCriteria = "Beginning";
      state.listingData = [];
      state.selectedId = "";
      state.disableAutocomplete = false;
      state.duplicateRecord = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
    resetFields: (state, action) => {
      state.editFormData = null;
      state.usersDataInput = "";
      state.pickupPlantInput = "";
    },
  },
});

export const {
  setCustomerId,
  setListingData,
  setPlantstatus,
  setUserSelection,
  setAllUsers,
  setPickupPlantInput,
  setPickupPlantSelection,
  setCustomerPlants,
  setSearchTerm,
  setPickupUserSelection,
  setSearchCriteria,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSelectedId,
  setDisableSave,
  setDisableAutocomplete,
  setIsuserandplantUnique,
  setPickupUserLookupSelection,
  setCustomerOrderUserPK,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  setChangesCancelled,
  setOrderUserFK,
  setNormalSortValue,
  setNormalSortFlag,
  setWhitelist,
  setBlacklist,
  setCustomerPlantFK,
  setDuplicateRecord,
  resetChanges,
  resetOrderUsers,
  setUsersDataInput,
  resetFields,
} = CustomerOrderUsersSlice.actions;

export default CustomerOrderUsersSlice.reducer;
