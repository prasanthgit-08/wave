import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leftpageNumber: 0,
  rightpageNumber: 0,
  leftTotalPages: 0,
  rightTotalPages: 0,
  leftTotalElements: 0,
  rightTotalElements: 0,
  initialList: null,
  saveList: [],
  deleteList: [],
  leftList: [],
  rightList: [],
  exceptionList: [],
  reverse: 0,
  copyUserId: null,
  copyUserName: "",
  currentUserName: "",
  selectedListRight: [],
  selectedListLeft: [],
  note: "",
  notedElement: null,
  rightPage: [],
  leftPage: [],
  loading: false,
  disableSave: true,
};

const UserPermissionGroupSlice = createSlice({
  name: "userPermissionGroup",
  initialState,
  reducers: {
    updateField: (state, { payload }) => {
      const { field, value } = payload;
      if (field in state) {
        state[field] = value;
      }
    },
    resetFields: (state) => {
      Object.assign(state, initialState);
    },
    updateMultipleFields: (state, action) => {
      const fieldsToUpdate = action.payload;
      Object.entries(fieldsToUpdate).forEach(([field, value]) => {
        if (field in state) {
          state[field] = value;
        }
      });
    },
    setRightPageNumber: (state, { payload }) => {
      state.rightpageNumber = payload;
    },
    setLefttPageNumber: (state, { payload }) => {
      state.leftpageNumber = payload;
    },
    updateUploadedFiles: (state, { payload }) => {
      state.uploadedFiles = payload;
    },
    resetOnCancel: (state) => {},
    removeDeleteList: (state, { payload }) => {
      state.deleteList = state.deleteList.filter((element) => payload !== element);
    },
    updateSaveList: (state, { payload }) => {
      state.saveList = [...state.saveList, payload];
    },
    removeExceptList: (state, { payload }) => {
      state.exceptionList = state.exceptionList.filter((element) => element !== payload);
    },
    updateExceptList: (state, { payload }) => {
      state.exceptionList = [...state.exceptionList, payload];
    },
    updateDeleteList: (state, { payload }) => {
      state.deleteList = [...state.deleteList, payload];
    },
    removeSaveList: (state, { payload }) => {
      state.saveList = state.saveList.filter((element) => payload !== element);
    },
    setSelectedLeftList: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.selectedListLeft = payload;
      } else {
        if (payload) {
          state.selectedListLeft = [payload];
        } else {
          state.selectedListLeft = [];
        }
      }
    },
    updateSelectedLeftList: (state, { payload, type }) => {
      if (Array.isArray(payload)) {
        state.selectedListLeft = [...state.selectedListLeft, ...payload];
      } else {
        state.selectedListLeft = [...state.selectedListLeft, payload];
      }
    },
    removeFromSelectedLeftList: (state, action) => {
      state.selectedListLeft = state.selectedListLeft.filter((element) => element !== action.payload);
    },
    setSelectedRightList: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.selectedListRight = payload;
      } else {
        if (payload) {
          state.selectedListRight = [payload];
        } else {
          state.selectedListRight = [];
        }
      }
    },
    updateSelectedRightList: (state, { payload, type }) => {
      if (Array.isArray(payload)) {
        state.selectedListRight = [...state.selectedListRight, ...payload];
      } else {
        state.selectedListRight = [...state.selectedListRight, payload];
      }
    },
    removeFromSelectedRightList: (state, action) => {
      state.selectedListRight = state.selectedListRight.filter((element) => element !== action.payload);
    },
    setCurrentUserName: (state, { payload }) => {
      state.currentUserName = payload;
    },
  },
});

export const {
  updateField,
  updateMultipleFields,
  resetFields,
  setLefttPageNumber,
  setRightPageNumber,
  updateUploadedFiles,
  resetOnCancel,
  updateDeleteList,
  updateExceptList,
  updateSaveList,
  removeDeleteList,
  removeExceptList,
  removeSaveList,
  updateSelectedLeftList,
  updateSelectedRightList,
  removeFromSelectedLeftList,
  removeFromSelectedRightList,
  setSelectedLeftList,
  setSelectedRightList,
  setCurrentUserName,
} = UserPermissionGroupSlice.actions;

export default UserPermissionGroupSlice;
