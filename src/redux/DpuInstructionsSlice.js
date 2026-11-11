import { createSlice } from "@reduxjs/toolkit";

const DpuInstructionsSlice = createSlice({
  name: "dpuInstructionsUnit",
  initialState: {
    id: "",
    selectId: null,
    unitNumberPK: null,
    unitNumberLast5: "",
    unitNumberInput: "",
    unitDetails: [],
    unitsLoading: true,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    changeColor: false,
    viewDetail: false,
    editFormData: null,
    //sorting
    normalSortValue: "",
    normalSortFlag: false,
    dupInstructionValid: false,
    viewCancel: false,
  },

  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setSelectId: (state, action) => {
      state.selectId = action.payload;
    },
    setUnitNumberPK: (state, action) => {
      state.unitNumberPK = action.payload;
    },
    setUnitNumberLast5: (state, action) => {
      state.unitNumberLast5 = action.payload;
    },
    setUnitNumberInput: (state, action) => {
      state.unitNumberInput = action.payload;
    },
    setUnitDetails: (state, action) => {
      state.unitDetails = action.payload;
    },
    setUnitsLoading: (state, action) => {
      state.unitsLoading = action.payload;
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
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setDupInstructionValid: (state, action) => {
      state.dupInstructionValid = action.payload;
    },
    setViewCancel: (state, action) => {
      state.viewCancel = action.payload;
    },
  },
});

export const {
  setId,
  setSelectId,
  setUnitNumberPK,
  setUnitNumberLast5,
  setUnitNumberInput,
  setUnitDetails,
  setUnitsLoading,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setChangeColor,
  setEditFormData,
  setViewDetail,
  setNormalSortValue,
  setNormalSortFlag,
  setDupInstructionValid,
  setViewCancel,
} = DpuInstructionsSlice.actions;

export default DpuInstructionsSlice.reducer;
