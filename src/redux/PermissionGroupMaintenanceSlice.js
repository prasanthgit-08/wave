import { createSlice } from "@reduxjs/toolkit";

const PermissionGroupMaintenanceSlice = createSlice({
  name: "permissionGroupMaintenance",
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

    normalSortValue: null,
    normalSortFlag: false,
    changesCancelled: false,
    description: "",
    isDescriptionUnique: true,
    notes: "",
    enabled: false,
    override: false,
    cancelChanges: false,
    //for assigned permission  in viewdetail

    permissionList: [],
    permissionTotalPages: 0,
    permissionTotalElements: 0,
    permissionPageNumber: 0,
    assignSortFlag: false,
    assignSortValue: null,
    //

    assignedPermissionList: [],
    excludeList: [],
    assignedTotalPages: 0,
    assignedTotalElements: 0,
    assignedPageNumber: 0,
    editPageLoading: false,
    assignedPermissionSortValue: null,
    assignedPermissionSortFlag: false,

    leftTotalPages: 0,
    leftTotalElements: 0,
    leftPageNumber: 0,
    sortValue: null,
    sortFlag: false,
    leftLoading: false,
    rightLoading: false,
    leftPermissionList: [],
    selectedList: [],
    unSelectedList: [],
    initialList: [],
    saveList: [],
    deleteList: [],
    exceptList: [],
    reverseFlag: false,
    saveFlag: false,
    modifiedPermissionList: [],
    hasOverridePermission: false,
    intialObjectList: [],
    changesInPermissioneSelection: false,
    browseLoading: false,
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
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setIsDescriptionUnique: (state, action) => {
      state.isDescriptionUnique = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    resetNormalSort: (state, action) => {
      state.sortValue = null;
      state.sortFlag = false;

      state.assignedPermissionSortFlag = false;
      state.assignedPermissionSortValue = null;
    },
    setExcludeList: (state, action) => {
      state.excludeList = action.payload;
    },
    setAssignSortFlag: (state) => {
      state.assignSortFlag = !state.assignSortFlag;
    },
    setAssignSortValue: (state, action) => {
      state.assignSortValue = action.payload;
    },
    setPermissionTotalPages: (state, action) => {
      state.permissionTotalPages = action.payload;
    },
    setPermissionTotalElements: (state, action) => {
      state.permissionTotalElements = action.payload;
    },
    setPermissionPageNumber: (state, action) => {
      state.permissionPageNumber = action.payload;
    },
    setPermissionList: (state, { payload }) => {
      state.permissionList = payload;
      state.excludeList = payload.map((permission) => permission.permissionPK);
      // state.excludeList = payload;
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
    setEnabled: (state, action) => {
      state.enabled = action.payload;
    },
    setOverride: (state, action) => {
      state.override = action.payload;
    },
    setCancelChanges: (state, action) => {
      state.cancelChanges = action.payload;
    },
    setAssignePermissionList: (state, { payload }) => {
      state.assignedPermissionList = payload;
      state.excludeList = payload.map((permission) => permission.permissionPK);
    },
    setAssignedPermissionSortFlag: (state) => {
      state.assignedPermissionSortFlag = !state.assignedPermissionSortFlag;
    },
    setAssignedPermissionSortValue: (state, action) => {
      state.assignedPermissionSortValue = action.payload;
    },
    updateAssignedPermissionList: (state, { payload }) => {
      state.assignedPermissionList = [...state.assignedPermissionList, payload];
      state.excludeList = [...state.excludeList, payload.permissionPK];
    },

    removeAssignedUnitTypesList: (state, { payload }) => {
      state.assignedPermissionList = state.assignedPermissionList.filter(
        (element) => element.permissionPK !== payload.permissionPK
      );
      state.excludeList = state.excludeList.filter((element) => element !== payload.permissionPK);
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
    setLeftPermissionList: (state, { payload }) => {
      if (payload) {
        state.leftPermissionList = payload;
      } else {
        state.leftPermissionList = [];
      }
    },
    setChangesInPermissioneSelection: (state, action) => {
      state.changesInPermissioneSelection = action.payload;
    },
    setBrowseLoading: (state, action) => {
      state.browseLoading = action.payload;
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
      if (state.selectedList) {
        if (Array.isArray(payload)) {
          state.selectedList = [...state.selectedList, ...payload];
        } else {
          state.selectedList = [...state.selectedList, payload];
        }
      } else {
        state.selectedList = [payload];
      }
    },

    removeFromSelectedList: (state, action) => {
      state.selectedList = state.selectedList.filter(
        (element) => element.permissionPK !== action.payload.permissionPK
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
      if (state.saveList) {
        state.saveList = [...state.saveList, payload];
      } else {
        state.saveList = [payload];
      }
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
        (element) => element.permissionPK !== action.payload.permissionPK
      );
    },
    setReverseFlag: (state, action) => {
      state.reverseFlag = action.payload;
    },
    setModifiedPermissionList: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.modifiedPermissionList = payload;
      } else {
        if (payload) {
          state.modifiedPermissionList = [payload];
        } else {
          state.modifiedPermissionList = [];
        }
      }
    },
    updateModifiedList: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.modifiedPermissionList = [...state.modifiedPermissionList, ...payload];
      } else {
        state.modifiedPermissionList = [...state.modifiedPermissionList, payload];
      }
    },
    removeModifiedList: (state, { payload }) => {
      state.modifiedPermissionList = state.modifiedPermissionList.filter(
        (element) => element.permissionPK !== payload
      );
    },
    resetArrays: (state, action) => {
      state.saveList = [];
      state.deleteList = [];
      state.exceptList = [];
      state.selectedList = [];
      state.unSelectedList = [];
      state.modifiedPermissionList = [];
    },
    setSaveFlag: (state, action) => {
      state.saveFlag = action.payload;
    },
    setHasOverridePermission: (state, action) => {
      state.hasOverridePermission = action.payload;
    },
    setIntialObjectList: (state, action) => {
      state.intialObjectList = action.payload;
    },
    resetChanges: (state, action) => {
      state.description = "";
      state.isDescriptionUnique = true;
      state.notes = "";
    },
    resetClose: (state, action) => {
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
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
  setSaveData,
  setCloseFlag,
  setGroupsData,
  setIsDescriptionUnique,
  setIsGroupLoading,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setEditFormData,
  toggleChangesCancelled,
  resetClose,
  setDescription,
  setNotes,
  setAssignSortFlag,
  setAssignSortValue,
  setPermissionList,
  setEnabled,
  setOverride,
  setCancelChanges,
  setPermissionPageNumber,
  setPermissionTotalElements,
  setPermissionTotalPages,
  setAssignedPageNumber,
  setAssignePermissionList,
  setAssignedPermissionSortFlag,
  setAssignedTotalElements,
  setAssignedPermissionSortValue,
  setAssignedTotalPages,
  updateAssignedPermissionList,
  removeAssignedPermissionList,
  setExcludeList,
  setLeftTotalElements,
  setLeftTotalPages,
  setLeftPageNumber,

  setSortValue,
  setSortFlag,
  setLeftLoading,
  setRightLoading,
  setLeftPermissionList,
  setChangesInPermissioneSelection,
  setBrowseLoading,
  setSelectedList,
  updateSelectedList,
  removeFromSelectedList,
  setExceptList,
  updateExceptList,
  removeExceptList,
  setinitialList,
  setSaveList,
  updateSaveList,
  removeSaveList,

  setDeleteList,
  updateDeleteList,
  removeDeleteLis,
  setUnSelectedList,
  updateUnSelectedList,
  removeFromUnSelectedList,
  setReverseFlag,
  resetArrays,
  setSaveFlag,
  setHasOverridePermission,
  setModifiedPermissionList,
  removeDeleteList,
  updateModifiedList,
  resetChanges,
  resetNormalSort,
  removeModifiedList,
  setIntialObjectList,
} = PermissionGroupMaintenanceSlice.actions;

export default PermissionGroupMaintenanceSlice.reducer;
