import { createSlice } from "@reduxjs/toolkit";

const UnitTypeGroupSlice = createSlice({
  name: "UnitTypeGroupSlice",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    groupsData: [],
    saveData: null,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    isGroupLoading: false,
    //input
    description: "",
    checkDescription: false,
    unitClass: "",
    motorized: false,
    towable: false,
    requireELD: false,
    radioValue: "Motorized",
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    changesCancelled: false,

    //for assigned states in viewdetail

    unitTypeList: [],
    unitTypeTotalPages: 0,
    unitTypeTotalElements: 0,
    assignSortFlag: false,
    assignSortValue: null,
    //
    assignedUnitTypesList: [],
    excludeList: [],
    assignedTotalPages: 0,
    assignedTotalElements: 0,
    assignedPageNumber: 0,
    editPageLoading: false,

    //For left and right State Listing
    leftTotalPages: 0,
    leftTotalElements: 0,
    leftPageNumber: 0,
    sortValue: null,
    sortFlag: false,
    leftLoading: false,
    rightLoading: false,
    leftUnitTypeList: [],
    selectedList: [],
    unSelectedList: [],
    initialList: [],
    saveList: [],
    deleteList: [],
    exceptList: [],
    reverseFlag: false,
    saveFlag: false,
    changesInUnitTypeSelection: false,
    unitTypeSortValue: null,
    unitTypeSortFlag: false,
    closeFlag: false,
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
    setGroupsData: (state, action) => {
      state.groupsData = action.payload;
    },
    setSaveData: (state, action) => {
      state.saveData = action.payload;
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
    setIsGroupLoading: (state, action) => {
      state.isGroupLoading = action.payload;
    },
    //input
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setUnitClass: (state, action) => {
      state.unitClass = action.payload;
    },
    setMotorized: (state, action) => {
      state.motorized = action.payload;
    },
    setTowable: (state, action) => {
      state.towable = action.payload;
    },
    setRequireELD: (state, action) => {
      state.requireELD = action.payload;
    },
    setRadioValue: (state, action) => {
      state.radioValue = action.payload;
    },
    resetClose: (state, action) => {
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
    setCheckDescription: (state, action) => {
      state.checkDescription = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    resetChanges: (state, action) => {
      state.checkDescription = false;
      state.description = "";
      state.unitClass = "";
      // state.motorized = false;
      state.radioValue = "";
      state.requireELD = false;
    },
    //Assigned  list
    setExcludeList: (state, action) => {
      state.excludeList = action.payload;
    },
    setEditPageLoading: (state, action) => {
      state.editPageLoading = action.payload;
    },
    setAssignSortFlag: (state) => {
      state.assignSortFlag = !state.assignSortFlag;
    },
    setAssignSortValue: (state, action) => {
      state.assignSortValue = action.payload;
    },

    setAssignedTotalPages: (state, action) => {
      state.assignedTotalPages = action.payload;
    },
    setAssignedTotalElements: (state, action) => {
      state.assignedTotalElements = action.payload;
    },
    setAssignedPageNumber: (state, action) => {
      state.assignedPageNumber = action.payload;
    },
    setUnitTypeTotalPages: (state, action) => {
      state.unitTypeTotalPages = action.payload;
    },
    setUnitTypeTotalElements: (state, action) => {
      state.unitTypeTotalElements = action.payload;
    },
    setUnitTypePageNumber: (state, action) => {
      state.unitTypePageNumber = action.payload;
    },
    setUnitTypeList: (state, { payload }) => {
      state.unitTypeList = payload;
      state.excludeList = payload.map((unittype) => unittype.unitTypePK);
    },
    setAssignedUnitTypesList: (state, { payload }) => {
      state.assignedUnitTypesList = payload;
      state.excludeList = payload.map((unittype) => unittype.unitTypePK);
    },
    updateAssignedUnitTypesList: (state, { payload }) => {
      state.assignedUnitTypesList = [...state.assignedUnitTypesList, payload];
      state.excludeList = [...state.excludeList, payload.unitTypePK];
    },
    removeAssignedUnitTypesList: (state, { payload }) => {
      state.assignedUnitTypesList = state.assignedUnitTypesList.filter(
        (element) => element.unitTypePK !== payload.unitTypePK
      );
      state.excludeList = state.excludeList.filter((element) => element !== payload.unitTypePK);
    },
    //For left and right State Listing
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
    setSortFlag: (state) => {
      state.sortFlag = !state.sortFlag;
    },
    setLeftLoading: (state, action) => {
      state.leftLoading = action.payload;
    },
    setRightLoading: (state, action) => {
      state.rightLoading = action.payload;
    },
    setLeftUnitTypeList: (state, { payload }) => {
      if (payload) {
        state.leftUnitTypeList = payload;
      } else {
        state.leftUnitTypeList = [];
      }
    },
    setChangesInUnitTypeSelection: (state, action) => {
      state.changesInUnitTypeSelection = action.payload;
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
      state.selectedList = state.selectedList.filter(
        (element) => element.unitTypePK !== action.payload.unitTypePK
      );
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
      state.unSelectedList = state.unSelectedList.filter(
        (element) => element.unitTypePK !== action.payload.unitTypePK
      );
    },
    setReverseFlag: (state, action) => {
      state.reverseFlag = action.payload;
    },
    resetArrays: (state, action) => {
      state.saveList = [];
      state.deleteList = [];
      state.exceptList = [];
      state.selectedList = [];
      state.unSelectedList = [];
    },
    setSaveFlag: (state, action) => {
      state.saveFlag = action.payload;
    },
    setUnitTypeSortFlag: (state) => {
      state.unitTypeSortFlag = !state.unitTypeSortFlag;
    },
    setUnitTypeSortValue: (state, { payload }) => {
      state.unitTypeSortValue = payload;
    },
    setCloseFlag: (state, { payload }) => {
      state.closeFlag = payload;
    },
    resetNormalSort: (state, action) => {
      state.sortValue = null;
      state.sortFlag = false;

      state.unitTypeSortFlag = false;
      state.unitTypeSortValue = null;
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSaveData,
  setCloseFlag,
  setGroupsData,
  setCheckDescription,
  setDescription,
  setIsGroupLoading,
  setUnitClass,
  setMotorized,
  setTowable,
  setRadioValue,
  setRequireELD,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setEditFormData,
  toggleChangesCancelled,
  resetClose,
  resetChanges,
  setUnitTypeList,
  setUnitTypePageNumber,
  setUnitTypeTotalElements,
  setUnitTypeTotalPages,

  setAssignedUnitTypesList,
  setAssignedPageNumber,
  setAssignedTotalPages,
  setAssignedTotalElements,
  updateAssignedUnitTypesList,
  removeAssignedUnitTypesList,
  setEditPageLoading,
  setAssignSortFlag,
  setAssignSortValue,
  setExcludeList,
  setLeftPageNumber,
  setLeftTotalPages,
  setLeftTotalElements,
  setLeftUnitTypeList,
  setChangesInUnitTypeSelection,
  setSelectedList,
  setLeftLoading,
  setRightLoading,
  updateSelectedList,
  removeFromSelectedList,
  setExceptList,
  setStateList,
  updateExceptList,
  removeExceptList,
  setinitialList,
  setSaveList,
  updateSaveList,
  removeSaveList,
  setDeleteList,
  updateDeleteList,
  removeDeleteList,
  setSortFlag,
  setSortValue,
  setUnSelectedList,
  removeFromUnSelectedList,
  updateUnSelectedList,
  setReverseFlag,
  resetArrays,
  setSaveFlag,
  setUnitTypeSortFlag,
  setUnitTypeSortValue,
  resetNormalSort,
} = UnitTypeGroupSlice.actions;

export default UnitTypeGroupSlice.reducer;
