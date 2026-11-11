import { createSlice } from "@reduxjs/toolkit";
const CustomerDealerRoutesSlice = createSlice({
  name: "CustomerDealerRoutes",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    sortValue: null,
    sortFlag: false,
    changeColor: false,
    sequenceChangeColor: false,
    searchTerm: "",
    searchCriteria: "Beginning",
    selectedId: "",
    viewDetail: true,
    listingData: [],
    sequencePageListingData: [],
    loadedPage: [],
    currentPage: 0,
    editFormData: null,
    city: "",
    state: "",
    postalCode: "",
    ziplength: "",
    cancelChanges: false,
    disableUp: true,
    disableDown: true,
    poeId: "",
    poeCity: "",
    isPOE: false,
    motorized: false,
    towable: false,
    disableSave: false,
    disableSaveSequence: true,
    onCancel: false,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setSequenceChangeColor: (state, action) => {
      state.sequenceChangeColor = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
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
      state.sortFlag = !state.sortFlag;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setSequencePagelistingData: (state, action) => {
      state.sequencePageListingData = action.payload;
    },
    setLoadedPage: (state, action) => {
      state.loadedPage = action.payload;
    },
    setReduxCity: (state, action) => {
      state.city = action.payload;
    },
    setReduxState: (state, action) => {
      state.state = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setReduxPostalCode: (state, action) => {
      state.postalCode = action.payload;
    },
    setReduxZiplength: (state, action) => {
      state.ziplength = action.payload;
    },
    setDisableDown: (state, action) => {
      state.disableDown = action.payload;
    },
    setDisableUp: (state, action) => {
      state.disableUp = action.payload;
    },
    setPOEId: (state, action) => {
      state.poeId = action.payload;
    },
    setPOECity: (state, action) => {
      state.poeCity = action.payload;
    },
    setIsPOE: (state, action) => {
      state.isPOE = action.payload;
    },
    setMotorised: (state, action) => {
      state.motorized = action.payload;
    },
    setTowable: (state, action) => {
      state.towable = action.payload;
    },
    setCancelChanges: (state, action) => {
      state.cancelChanges = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setDisableSaveSequence: (state, action) => {
      state.disableSaveSequence = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    resetSearch: (state, action) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.sortFlag = false;
      state.sortValue = null;
      state.currentPage = 0;
    },
    resetEdit: (state, actions) => {
      state.motorized = state.editFormData.motorized;
      state.towable = state.editFormData.towable;
      state.city = state.editFormData.city;
      state.state = state.editFormData.stateCode;
      state.postalCode = state.editFormData.postalCode;
      state.isPOE = state.editFormData.isPOE;
      state.poeCity = state.editFormData.poeCity;
      state.poeId = state.editFormData.poeId;
    },
    resetData: (state, action) => {
      state.motorized = false;
      state.towable = false;
      state.city = "";
      state.state = "";
      state.postalCode = "";
      state.isPOE = false;
      state.poeCity = "";
      state.poeId = "";
    },
  },
});
export const {
  setId,
  setListingData,
  setSequencePagelistingData,
  setLoadedPage,
  setSortFlag,
  setSortValue,
  setPageNumber,
  setCurrentPage,
  setSearchCriteria,
  setSearchTerm,
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  setChangeColor,
  setSequenceChangeColor,
  setReduxCity,
  setReduxPostalCode,
  setReduxState,
  setReduxZiplength,
  setDisableDown,
  setDisableUp,
  setIsPOE,
  setMotorised,
  setPOECity,
  setPOEId,
  setTowable,
  setDisableSave,
  setEditFormData,
  setCancelChanges,
  setDisableSaveSequence,
  setOnCancel,
  resetSearch,
  resetEdit,
  resetData,
} = CustomerDealerRoutesSlice.actions;

export const CustomerDealerRoutes = (state) => state.customerDealerRoutes.value;
export default CustomerDealerRoutesSlice.reducer;
