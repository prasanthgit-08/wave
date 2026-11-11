import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
const EditExportBrokersSlice = createSlice({
  name: "editExportBrokers",
  initialState: {
    leftTotalPages: 0,
    leftTotalElements: 0,
    leftPageNumber: 0,
    sortValue: "",
    sort: false,
    changesInPortsSelection: false,
    leftLoading: true,
    rightLoading: true,
    leftPortsList: [],
    selectedList: [],
    unSelectedList: [],
    initialList: [],
    saveList: [],
    deleteList: [],
    exceptList: [],
    excludeList: [],
    reverseList: false,
    saving: false,
    rightSortValue: "",
    rightSort: false,
    hasInitials: false,
  },
  reducers: {
    setLeftTotalElements: (state, action) => {
      state.leftTotalElements = action.payload;
    },
    setLeftTotalPages: (state, action) => {
      state.leftTotalPages = action.payload;
    },
    setLeftPageNumber: (state, action) => {
      state.leftPageNumber = action.payload;
    },
    setSortValue: (state, { payload }) => {
      state.sortValue = payload;
    },
    setSort: (state) => {
      state.sort = !state.sort;
    },
    setLeftLoading: (state, action) => {
      state.leftLoading = action.payload;
    },
    setRightLoading: (state, action) => {
      state.rightLoading = action.payload;
    },
    setleftPortsList: (state, { payload }) => {
      if (payload) {
        state.leftPortsList = payload;
      } else {
        state.leftPortsList = [];
      }
    },
    setChangesInPortsSelection: (state, action) => {
      state.changesInPortsSelection = action.payload;
    },
    setSelectedList: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.selectedList = payload;
      } else {
        if (payload) {
          state.selectedList = [payload];
        } else {
          state.selectedList = [];
        }
      }
    },
    updateSelectedList: (state, { payload, type }) => {
      if (Array.isArray(payload)) {
        state.selectedList = [...state.selectedList, ...payload];
      } else {
        state.selectedList = [...state.selectedList, payload];
      }
    },
    removeFromSelectedList: (state, action) => {
      state.selectedList = state.selectedList.filter((element) => element.poePK !== action.payload.poePK);
    },
    setExceptList: (state, { payload }) => {
      if (payload) {
        state.exceptList = [payload];
      } else {
        state.exceptList = [];
      }
    },
    updateExceptList: (state, { payload }) => {
      state.exceptList = [...state.exceptList, payload];
    },
    removeExceptList: (state, { payload }) => {
      state.exceptList = state.exceptList.filter((element) => element !== payload);
    },
    setinitialList: (state, { payload }) => {
      if (payload) {
        state.initialList = payload;
      } else {
        state.initialList = [];
      }
    },
    setSaveList: (state, { payload }) => {
      if (payload) {
        state.saveList = [payload];
      } else {
        state.saveList = [];
      }
    },
    updateSaveList: (state, { payload }) => {
      state.saveList = [...state.saveList, payload];
    },
    removeSaveList: (state, { payload }) => {
      state.saveList = state.saveList.filter((element) => payload !== element);
    },
    setDeleteList: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.deleteList = state.deleteList.filter((element) => payload !== element);
      } else {
        if (payload) {
          state.deleteList = [payload];
        } else {
          state.deleteList = [];
        }
      }
    },
    updateDeleteList: (state, { payload }) => {
      state.deleteList = [...state.deleteList, payload];
    },
    removeDeleteList: (state, { payload }) => {
      state.deleteList = state.deleteList.filter((element) => payload !== element);
    },
    setUnSelectedList: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.unSelectedList = payload;
      } else {
        if (payload) {
          state.unSelectedList = [payload];
        } else {
          state.unSelectedList = [];
        }
      }
    },
    updateUnSelectedList: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.unSelectedList = [...state.unSelectedList, ...payload];
      } else {
        state.unSelectedList = [...state.unSelectedList, payload];
      }
    },
    removeFromUnSelectedList: (state, action) => {
      state.unSelectedList = state.unSelectedList.filter((element) => element.poePK !== action.payload.poePK);
    },
    setReverseList: (state, action) => {
      state.reverseList = action.payload;
    },
    resetArrays: (state, action) => {
      state.saveList = [];
      state.deleteList = [];
      state.exceptList = [];
      state.selectedList = [];
      state.unSelectedList = [];
    },
    setSaving: (state, action) => {
      state.saving = action.payload;
    },
    resetPortsPageNormalSort: (state, action) => {
      state.sortValue = null;
      state.sort = false;
      state.rightSortValue = null;
      state.rightSort = false;
    },
    setRightSortValue: (state, { payload }) => {
      state.rightSortValue = payload;
    },
    setRightSort: (state) => {
      state.rightSort = !state.rightSort;
    },
    setHasInitials: (state, { payload }) => {
      state.hasInitials = payload;
    },
  },
});
export const {
  setLeftPageNumber,
  setLeftTotalPages,
  setLeftTotalElements,
  setleftPortsList,
  changesInPortsSelection,
  setSelectedList,
  setLeftLoading,
  setRightLoading,
  updateSelectedList,
  removeFromSelectedList,
  setChangesInPortsSelection,
  setExceptList,
  updateExceptList,
  removeExceptList,
  setinitialList,
  setSaveList,
  updateSaveList,
  removeSaveList,
  setDeleteList,
  updateDeleteList,
  removeDeleteList,
  setSort,
  setSortValue,
  setUnSelectedList,
  removeFromUnSelectedList,
  updateUnSelectedList,
  setReverseList,
  resetArrays,
  setSaving,
  resetPortsPageNormalSort,
  setRightSortValue,
  setRightSort,
  setHasInitials,
} = EditExportBrokersSlice.actions;
export default EditExportBrokersSlice.reducer;
