import { createSlice } from "@reduxjs/toolkit";

const DispatchHoldSearchSlice = createSlice({
  name: "dispatchHolds",
  initialState: {
    dispatchPageNumber: 0,
    dispatchTotalPages: 0,
    dispatchTotalElements: 0,
    listingData: [],
    data: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    id: "",
    selectedStatus: "Active",
    changeColor: false,
    viewDetail: false,
    editFormData: null,
    normalSortValue: null,
    normalSortFlag: false,
    saveFormData: null,
    checkDescriptionExist: "",
    changesCancelled: false,
    //fields
    description: "",
    useHoldDate: false,
    driverDescription: "",
    notes: "",
    objectKey: "",
    restricted: false,
    dispatchers: false,
    checkDriverDescriptionExist: "",
    checkObjectKeyExist: false,
    saveLoaded: false,
  },
  reducers: {
    setDispatchHoldData: (state, action) => {
      state.dispatchHoldData = action.payload;
    },
    setSaveLoaded: (state, action) => {
      state.saveLoaded = action.payload;
    },

    setData: (state, action) => {
      state.data = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setCheckDriverDescriptionExist: (state, action) => {
      state.checkDriverDescriptionExist = action.payload;
    },
    setCheckObjectKeyExist: (state, action) => {
      state.checkObjectKeyExist = action.payload;
    },
    setDispatchPageNumber: (state, action) => {
      state.dispatchPageNumber = action.payload;
    },
    setDispatchTotalPages: (state, action) => {
      state.dispatchTotalPages = action.payload;
    },
    setDispatchTotalElements: (state, action) => {
      state.dispatchTotalElements = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
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

    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },

    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setUseHoldDate: (state, action) => {
      state.useHoldDate = action.payload;
    },

    setDriverDescription: (state, action) => {
      state.driverDescription = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setObjectKey: (state, action) => {
      state.objectKey = action.payload;
    },
    setRestricted: (state, action) => {
      state.restricted = action.payload;
    },
    setDispatchers: (state, action) => {
      state.dispatchers = action.payload;
    },
    setSaveFormData: (state, action) => {
      state.saveFormData = action.payload;
    },
    setCheckDescriptionExist: (state, action) => {
      state.checkDescriptionExist = action.payload;
    },

    resetChanges: (state, action) => {
      state.description = "";
      state.driverDescription = "";
      state.useHoldDate = false;
      state.objectKey = "";
      state.notes = "";
      state.restricted = false;
      state.checkDescriptionExist = "";
      state.checkDriverDescriptionExist = "";
      state.dispatchers = false;
    },
    resetClose: (state, action) => {
      state.selectedStatus = "Active";
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.dispatchPageNumber = 0;
      state.changeColor = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
  },
});
export const {
  setPageNumber,
  // setTotalElements,
  // setTotalPages,
  setDispatchTotalElements,
  setDispatchTotalPages,
  setDispatchPageNumber,
  setDispatchHoldData,
  setListingData,
  setSearchTerm,
  setSearchCriteria,
  setNormalSortValue,
  setNormalSortFlag,
  setId,
  setSelectedStatus,
  setCheckDescriptionExist,
  setLoader,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  resetChanges,
  toggleChangesCancelled,
  setDescription,
  setDriverDescription,
  setObjectKey,
  setNotes,
  setUseHoldDate,
  setRestricted,
  setSaveFormData,
  setData,
  resetClose,
  setDispatchers,
  setCheckDriverDescriptionExist,
  setCheckObjectKeyExist,
  setSaveLoaded,
} = DispatchHoldSearchSlice.actions;
export default DispatchHoldSearchSlice.reducer;
