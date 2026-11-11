import { createSlice } from "@reduxjs/toolkit";

const StateGroupsSlice = createSlice({
  name: "StateGroupsSlice",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    stateGroupsData: [],
    saveData: null,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    //input
    description: "",
    checkDescription: false,
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    changesCancelled: false,

    //for assigned states in viewdetail
    assignedPageNo: 0,
    stateList: [],
    stateTotalPages: 0,
    stateTotalElements: 0,
    //
    assignedStatesList: [],
    excludeList: [],
    assignedTotalPages: 0,
    assignedTotalElements: 0,
    assignedPageNumber: 0,
    editPageLoading: false,
    assignSortFlag: false,
    assignSortValue: null,
    //For left and right State Listing
    leftTotalPages: 0,
    leftTotalElements: 0,
    leftPageNumber: 0,
    sortValue: null,
    sortFlag: false,
    setch: false,
    leftLoading: false,
    rightLoading: false,
    leftStatesList: [],
    selectedList: [],
    unSelectedList: [],
    initialList: [],
    isInitialListLoaded: false,
    saveList: [],
    deleteList: [],
    exceptList: [],
    reverseFlag: false,
    saveFlag: false,
    changesInStatesSelection: false,
    stateSortValue: null,
    stateSortFlag: false,
    closeFlag: false,
    isStateGroupLoading: false,
    assignedStatesLoading: false,
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
    setStateGroupsData: (state, action) => {
      state.stateGroupsData = action.payload;
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
    //input
    setDescription: (state, action) => {
      state.description = action.payload;
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
    },
    //Assigned states list
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
    setStateTotalTotalPages: (state, action) => {
      state.stateTotalPages = action.payload;
    },
    setStateTotalElements: (state, action) => {
      state.stateTotalElements = action.payload;
    },
    setAssignedPageNo: (state, action) => {
      state.assignedPageNo = action.payload;
    },
    setStateList: (state, { payload }) => {
      state.stateList = payload;
      state.excludeList = payload.map((states) => states.statesPK);
    },
    setAssignedStatesList: (state, { payload }) => {
      state.assignedStatesList = payload;
      state.excludeList = payload.map((states) => states.statesPK);
    },
    updateAssignedStatesList: (state, { payload }) => {
      state.assignedStatesList = [...state.assignedStatesList, payload];
      state.excludeList = [...state.excludeList, payload.statesPK];
    },
    removeAssignedStatesList: (state, { payload }) => {
      state.assignedStatesList = state.assignedStatesList.filter(
        (element) => element.statesPK !== payload.statesPK
      );
      state.excludeList = state.excludeList.filter((element) => element !== payload.statesPK);
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
    setLeftStatesList: (state, { payload }) => {
      if (payload) {
        state.leftStatesList = payload;
      } else {
        state.leftStatesList = [];
      }
    },
    setChangesInStatesSelection: (state, action) => {
      state.changesInStatesSelection = action.payload;
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
        (element) => element.statesPK !== action.payload.statesPK
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
    // the left / right lists wait for this, otherwise they fetch once with the old initialList
    // and again when the real one arrives
    setIsInitialListLoaded: (state, { payload }) => {
      state.isInitialListLoaded = payload;
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
        (element) => element.statesPK !== action.payload.statesPK
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
    setStateSortFlag: (state) => {
      state.stateSortFlag = !state.stateSortFlag;
    },
    setStateSortValue: (state, { payload }) => {
      state.stateSortValue = payload;
    },
    setCloseFlag: (state, { payload }) => {
      state.closeFlag = payload;
    },
    setIsStateGroupLoading: (state, { payload }) => {
      state.isStateGroupLoading = payload;
    },
    setAssignedStatesLoading: (state, { payload }) => {
      state.assignedStatesLoading = payload;
    },
    resetNormalSort: (state, action) => {
      state.sortValue = null;
      state.sortFlag = false;

      state.stateSortFlag = false;
      state.stateSortValue = null;
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
  setStateGroupsData,
  setCheckDescription,
  setDescription,
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
  setAssignedPageNo,
  setStateTotalElements,
  setStateTotalTotalPages,

  setAssignedStatesList,
  setAssignedPageNumber,
  setAssignedTotalPages,
  setAssignedTotalElements,
  updateAssignedStatesList,
  removeAssignedStatesList,
  setEditPageLoading,
  setAssignSortFlag,
  setAssignSortValue,
  setExcludeList,
  setLeftPageNumber,
  setLeftTotalPages,
  setLeftTotalElements,
  setLeftStatesList,
  setChangesInStatesSelection,
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
  setIsInitialListLoaded,
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
  setStateSortFlag,
  setStateSortValue,
  resetNormalSort,
  setIsStateGroupLoading,
  setAssignedStatesLoading,
} = StateGroupsSlice.actions;

export default StateGroupsSlice.reducer;
