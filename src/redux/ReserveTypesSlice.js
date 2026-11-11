import { createSlice } from "@reduxjs/toolkit";
const ReserveTypesSlice = createSlice({
  name: "ReserveTypes",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    searchTerm: "",
    contactData: null,
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    browseNavigation: [],
    changeColor: false,
    editFormData: null,
    objectKeyData: null,
    reserveTypesData: [],
    selectedId: "",
    reserveTypesFormData: null,
    reserveTypePK: "",
    normalSortValue: null,
    normalSortFlag: false,
    descriptionError: true,
    objectKeyError: true,
    // ReduxPostalCode:"",
    //input
    description: "",
    objectKey: "",
    required: false,
    descriptionValid: true,
    objectKeyValid: true,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
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
    setReserveTypesFormData: (state, action) => {
      state.reserveTypesFormData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
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
    setObjectKeyData: (state, action) => {
      state.objectKeyData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setDescriptionValid: (state, action) => {
      state.descriptionValid = action.payload;
    },
    setObjectKeyValid: (state, action) => {
      state.objectKeyValid = action.payload;
    },
    setDescriptionError: (state, action) => {
      state.descriptionError = action.payload;
    },
    setObjectKeyError: (state, action) => {
      state.objectKeyError = action.payload;
    },
    setReserveTypesData: (state, action) => {
      state.reserveTypesData = action.payload;
    },
    setReserveTypePK: (state, action) => {
      state.reserveTypePK = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },

    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },

    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setObjectKey: (state, action) => {
      state.objectKey = action.payload;
    },
    setRequired: (state, action) => {
      state.required = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    resetChanges: (state, action) => {
      state.description = "";
      state.objectKey = "";
      state.required = "";
      // state.viewDetail=false;
      state.reserveTypePK = "";
      state.objectKeyError = true;
      state.descriptionError = true;
      state.descriptionValid = false;
      state.objectKeyValid = false;
    },
    resetOrderUsers: (state, action) => {
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.reserveTypesData = [];
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSearchTerm,
  setSelectedSearchCriteria,
  resetChanges,
  setSelectedId,
  setBrowseNavigation,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  setObjectKeyData,
  setReserveTypesFormData,
  setNormalSortValue,
  setNormalSortFlag,
  setReserveTypePK,
  setDescriptionValid,
  setObjectKeyValid,
  setLoading,
  setReserveTypesData,
  setDescriptionError,
  setObjectKeyError,
  setDescription,
  setObjectKey,
  setRequired,
  toggleChangesCancelled,
  resetOrderUsers,
} = ReserveTypesSlice.actions;
export default ReserveTypesSlice.reducer;
