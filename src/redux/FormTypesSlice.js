import { createSlice } from "@reduxjs/toolkit";

const FormTypesSlice = createSlice({
  name: "FormTypes",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    searchTerm: "",
    searchCriteria: "Beginning",
    changeColor: false,
    listingData: [],
    viewDetail: true,
    editFormData: null,
    formTypePK: "",
    formDescriptionId: "",
    formTypeData: null,
    changesCancelled: false,

    //input
    objectKey: "",
    description: "",

    //normal sort
    normalSortValue: null,
    normalSortFlag: false,

    //validation
    isDescriptionUnique: true,
    formTypeValid: false,
    isObjectKeyUnique: true,
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
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setFormTypePK: (state, action) => {
      state.formTypePK = action.payload;
    },
    setFormDescriptionId: (state, action) => {
      state.formDescriptionId = action.payload;
    },
    setObjectKey: (state, action) => {
      state.objectKey = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setFormTypeData: (state, action) => {
      state.formTypeData = action.payload;
    },
    setIsDescriptionUnique: (state, action) => {
      state.isDescriptionUnique = action.payload;
    },
    setFormTypeValid: (state, action) => {
      state.formTypeValid = action.payload;
    },
    setIsObjectKeyUnique: (state, action) => {
      state.isObjectKeyUnique = action.payload;
    },

    resetChanges: (state, action) => {
      state.formTypePK = null;
      state.objectKey = "";
      state.description = "";
    },

    resetFormTypes: (state, action) => {
      state.searchTerm = "";
      state.pageNumber = 0;
      state.searchCriteria = "Beginning";
      state.id = "";
      state.changeColor = false;
      state.isDescriptionUnique = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.formTypeValid = false;
      state.isObjectKeyUnique = true;
      state.viewDetail = true;
    },
  },
});

export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSearchTerm,
  setSearchCriteria,
  setChangeColor,
  setListingData,
  setViewDetail,
  setEditFormData,
  setFormTypePK,
  setFormDescriptionId,
  setChangesCancelled,
  setObjectKey,
  setDescription,
  setNormalSortValue,
  setNormalSortFlag,
  setFormTypeData,
  setIsDescriptionUnique,
  resetChanges,
  resetFormTypes,
  setFormTypeValid,
  setIsObjectKeyUnique,
} = FormTypesSlice.actions;

export default FormTypesSlice.reducer;
