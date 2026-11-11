import { createSlice } from "@reduxjs/toolkit";
const CheckRejectedLoadsSlice = createSlice({
  name: "CheckRejectedLoads",
  initialState: {
    id: "",
    checkPageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    browseData: [],
    normalSortValue: null,
    normalSortFlag: false,
    resetList: [],
    resetFlag: false,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setCheckPageNumber: (state, action) => {
      state.checkPageNumber = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setBrowseData: (state, action) => {
      state.browseData = action.payload;
    },

    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setResetFlag: (state, action) => {
      state.resetFlag = !state.resetFlag;
    },

    resetChanges: (state, action) => {
      state.checkPageNumber = 0;
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
    resetSelectionList: (state, action) => {
      state.resetList = [];
    },

    addToResetList: (state, { payload }) => {
      state.resetList = [...state.resetList, payload];
    },
    removeFromResetList: (state, { payload }) => {
      const updatedData = state.resetList.filter((item) => item !== payload);

      state.resetList = updatedData;
    },
  },
});
export const {
  setId,
  setCheckPageNumber,
  setTotalPages,
  setTotalElements,
  setBrowseData,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  resetChanges,
  addToResetList,
  setResetFlag,
  resetSelectionList,
  removeFromResetList,
} = CheckRejectedLoadsSlice.actions;

export default CheckRejectedLoadsSlice.reducer;
