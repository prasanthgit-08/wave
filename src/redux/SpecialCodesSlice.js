import { createSlice } from "@reduxjs/toolkit";
const SpecialCodesSlice = createSlice({
  name: "SpecialCodes",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    specialCodesData: [],
    specialCodePK: "",
    codesData: null,
    changesCancelled: false,
    codeValid: true,
    descriptionValid: true,

    //input
    code: "",
    description: "",
    urgent: false,
    dispatchRestrictions: false,

    //normal sort
    normalSortValue: null,
    normalSortFlag: false,
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
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
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
    setSpecialCodesData: (state, action) => {
      state.specialCodesData = action.payload;
    },
    setSpecialCodePK: (state, action) => {
      state.specialCodePK = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setUrgent: (state, action) => {
      state.urgent = action.payload;
    },
    setDispatchRestrictions: (state, action) => {
      state.dispatchRestrictions = action.payload;
    },
    setCodeValid: (state, action) => {
      state.codeValid = action.payload;
    },

    setDescriptionValid: (state, action) => {
      state.descriptionValid = action.payload;
    },

    setCodesData: (state, action) => {
      state.codesData = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    resetChanges: (state, action) => {
      state.specialCodePK = "";
      state.code = "";
      state.description = "";
      state.urgent = false;
      state.dispatchRestrictions = false;
      state.changeColor = false;
    },
  },
});
export const {
  setNormalSortValue,
  setNormalSortFlag,
  setCodeValid,
  setDescriptionValid,
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
  setEditFormData,
  setCode,
  setCodesData,
  setDescription,
  setUrgent,
  setDispatchRestrictions,
  setSpecialCodesData,
  setSpecialCodePK,
  resetChanges,
  setCheckCode,
  toggleChangesCancelled,
  setChangeColor,
} = SpecialCodesSlice.actions;

export const specailCodes = (state) => state.SpecialCodes.value;
export default SpecialCodesSlice.reducer;
