import { createSlice } from "@reduxjs/toolkit";
const DealerEmailSlice = createSlice({
  name: "DealerEmail",
  initialState: {
    id: null,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    emailData: [],
    editEmailData: null,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    browseNavigation: [],
    changeColor: false,
    saveFormData: null,
    changesCancelled: false,
    checkName: "",
    //input
    name: "",
    email: "",
    dispatchUpdate: false,
    dispatchOnly: false,
    deliveryOnly: false,
    emailBolOrderEntry: false,
    emailBolDispatch: false,
    normalSortValue: null,
    normalSortFlag: false,
    isNameUnique: false,
    isEmailUnique: false,
    emailBOLatDelivery: false,
    emailBolatYardExit: false,
    deleteLoader: false,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
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
    setEmailData: (state, action) => {
      state.emailData = action.payload;
    },
    setEditEmailData: (state, action) => {
      state.editEmailData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setSaveFormData: (state, action) => {
      state.saveFormData = action.payload;
    },
    //input
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setDispatchUpdate: (state, action) => {
      state.dispatchUpdate = action.payload;
    },
    setDispatchOnly: (state, action) => {
      state.dispatchOnly = action.payload;
    },
    setDeliveryOnly: (state, action) => {
      state.deliveryOnly = action.payload;
    },
    setEmailBolOrderEntry: (state, action) => {
      state.emailBolOrderEntry = action.payload;
    },

    setEmailBOLatDelivery: (state, action) => {
      state.emailBOLatDelivery = action.payload;
    },

    setEmailBolDispatch: (state, action) => {
      state.emailBolDispatch = action.payload;
    },

    setEmailBolatYardExit: (state, action) => {
      state.emailBolatYardExit = action.payload;
    },

    setCheckName: (state, action) => {
      state.checkName = action.payload;
    },
    setDeleteLoader: (state, action) => {
      state.deleteLoader = action.payload;
    },
    setIsNameUnique: (state, action) => {
      state.isNameUnique = action.payload;
    },
    resetChanges: (state, action) => {
      state.email = "";
      state.name = "";
      state.dispatchUpdate = false;
      state.dispatchOnly = false;
      state.deliveryOnly = false;
      state.emailBolOrderEntry = false;
      state.emailBolDispatch = false;
    },

    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setIsEmailUnique: (state, action) => {
      state.isEmailUnique = action.payload;
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setEmailData,
  setEditEmailData,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
  setBrowseNavigation,
  setChangeColor,
  setSaveFormData,
  resetChanges,
  toggleChangesCancelled,
  setEmail,
  setName,
  setCheckName,
  setDeliveryOnly,
  setDispatchOnly,
  setDispatchUpdate,
  setEmailBolOrderEntry,
  setEmailBolDispatch,
  setNormalSortValue,
  setNormalSortFlag,
  setIsNameUnique,
  setIsEmailUnique,
  setEmailBOLatDelivery,
  setEmailBolatYardExit,
  setDeleteLoader,
} = DealerEmailSlice.actions;

export const dealerEmail = (state) => state.dealerEmail.value;
export default DealerEmailSlice.reducer;
