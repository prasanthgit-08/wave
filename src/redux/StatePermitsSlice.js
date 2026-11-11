import { createSlice } from "@reduxjs/toolkit";

const StatePermitsSlice = createSlice({
  name: "StatePermits",
  initialState: {
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,

    //search
    listingData: [],
    searchTerms: "",
    searchCriteria: "Beginning",
    selectedId: "",
    changeColor: false,
    viewDetail: false,
    editFormData: null,
    changesCancelled: false,
    normalSortValue: null,
    normalSortFlag: false,

    //editing
    statePermitPK: "",
    stateFK: "",
    towable: false,
    motorized: false,
    emailText: "",
    selectedStatus: "All",
    isStateAndTowableUnique: false,
    //lookup
    pickupStateSelection: false,
    deliveryStateSelection: false,
    pickupStateInput: "",
    pickupStateId: null,
    navigateToMainPage: false,
  },
  reducers: {
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setPickupStateSelection: (state, action) => {
      state.pickupStateSelection = action.payload;
    },
    setDeliveryStateSelection: (state, action) => {
      state.deliveryStateSelection = action.payload;
    },
    setPickupStateInput: (state, action) => {
      state.pickupStateInput = action.payload;
    },
    setPickupStateId: (state, action) => {
      state.pickupStateId = action.payload;
    },

    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },

    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setStatePermitPK: (state, action) => {
      state.statePermitPK = action.payload;
    },

    setStateFK: (state, action) => {
      state.stateFK = action.payload;
    },
    setTowable: (state, action) => {
      state.towable = action.payload;
    },
    setMotorized: (state, action) => {
      state.motorized = action.payload;
    },
    setEmailText: (state, action) => {
      state.emailText = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = action.payload;
    },

    setNavigateToMainPage: (state, action) => {
      state.navigateToMainPage = action.payload;
    },
    setIsStateAndTowableUnique: (state, action) => {
      state.isStateAndTowableUnique = action.payload;
    },

    resetChanges: (state, action) => {
      state.statePermitPK = "";
      state.stateFK = "";
      state.towable = false;
      state.motorized = false;
      state.emailText = "";
      state.pickupStateInput = "";
      state.pickupStateId = null;
      state.isStateAndTowableUnique = false;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.changesCancelled = false;
    },
  },
});
export const {
  setStatePermitPK,
  setStateFK,
  setTowable,
  setMotorized,
  setEmailText,
  setSelectedStatus,

  setPageNumber,
  setTotalElements,
  setTotalPages,
  setNavigateToMainPage,
  setListingData,
  setSearchTerms,
  setSearchCriteria,
  setSelectedId,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  resetChanges,
  setPickupStateSelection,
  setDeliveryStateSelection,
  setPickupStateInput,
  setPickupStateId,
  setNormalSortValue,
  setNormalSortFlag,
  setChangesCancelled,
  setIsStateAndTowableUnique,
} = StatePermitsSlice.actions;
export default StatePermitsSlice.reducer;
