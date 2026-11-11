import { createSlice } from "@reduxjs/toolkit";
const DeleaseCodeSlice = createSlice({
  name: "DeleaseCode",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    deleaseCodeData: [],
    saveFormData: null,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    normalSortValue: null,
    normalSortFlag: false,
    selectedStatus: "Active",
    //input
    code: "",
    description: "",
    checkCode: "",
    checkDescription: false,
    changesCancelled: false,
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
    setDeleaseCodeData: (state, action) => {
      state.deleaseCodeData = action.payload;
    },
    setSaveFormData: (state, action) => {
      state.saveFormData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
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
    //input
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },

    resetChanges: (state, action) => {
      state.code = "";
      state.description = "";
      state.checkCode = "";
      state.checkDescription = false;
    },
    resetClose: (state, action) => {
      state.selectedStatus = "Active";
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
    setCheckCode: (state, action) => {
      state.checkCode = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setCheckDescription: (state, action) => {
      state.checkDescription = action.payload;
    },
  },
});
export const {
  resetClose,
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setDeleaseCodeData,
  setSaveFormData,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
  setBrowseNavigation,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setEditFormData,
  setCode,
  setDescription,
  setCheckCode,
  resetChanges,
  resetChangesClose,
  toggleChangesCancelled,
  setSelectedStatus,
  setCheckDescription,
} = DeleaseCodeSlice.actions;

export const deleaseCode = (state) => state.DeleaseCode.value;
export default DeleaseCodeSlice.reducer;
