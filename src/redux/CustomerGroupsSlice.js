import { createSlice } from "@reduxjs/toolkit";

const CustomerGroups = createSlice({
  name: "customerGroups",
  initialState: {
    listingData: [],
    formData: null,
    customerGroups: null,
    viewDetail: false,
    selectedId: null,
    disableSave: true,
    isDescriptionUnique: false,
    // search filter
    searchTerm: "",
    searchCriteria: "Beginning",
    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    // normal sorting
    sortValue: null,
    sortFlag: false,

    //Assigned customers
    customerList: [],
    customerTotalPages: 0,
    customerTotalElements: 0,
    customerPageNumber: 0,
    assignSortFlag: false,
    assignSortValue: null,
    //
    assignedCustomerList: [],
    excludeList: [],
    assignedTotalPages: 0,
    assignedTotalElements: 0,
    assignedPageNumber: 0,
    editPageLoading: false,
    initialListFetched: false,
    //For left and right State Listing
    leftTotalPages: 0,
    leftTotalElements: 0,
    leftPageNumber: 0,
    normalSortValue: null,
    normalSortFlag: false,
    leftLoading: false,
    rightLoading: false,
    leftCustomerList: [],
    selectedList: [],
    unSelectedList: [],
    initialList: [],
    saveList: [],
    deleteList: [],
    exceptList: [],
    reverseFlag: false,
    saveFlag: false,
    changesInCustomerSelection: false,
    rightSortValue: null,
    rightSortFlag: false,
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setCustomerGroups: (state, action) => {
      state.customerGroups = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
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
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    toggleSortFlag: (state, action) => {
      state.sortFlag = !state.sortFlag;
    },

    resetCustomerGroups: (state) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.listingData = [];
      state.pageNumber = 0;
      state.totalElements = 0;
      state.totalPages = 0;
      state.selectedId = null;
      state.sortValue = null;
      state.sortFlag = false;
    },
    setIsDescriptionUnique: (state, action) => {
      state.isDescriptionUnique = action.payload;
    },
    //Assigned  list
    setExcludeList: (state, action) => {
      state.excludeList = action.payload;
    },
    setEditPageLoading: (state, action) => {
      state.editPageLoading = action.payload;
    },
    setInitialListFetched: (state, action) => {
      state.initialListFetched = action.payload;
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
    setCustomerTotalPages: (state, action) => {
      state.customerTotalPages = action.payload;
    },
    setCustomerTotalElements: (state, action) => {
      state.customerTotalElements = action.payload;
    },
    setCustomerPageNumber: (state, action) => {
      state.customerPageNumber = action.payload;
    },
    setCustomerList: (state, { payload }) => {
      state.customerList = payload;
      state.excludeList = payload.map((customer) => customer.CustomerPK);
    },
    setAssignedCustomerList: (state, { payload }) => {
      state.assignedCustomerList = payload;
      state.excludeList = payload.map((customer) => customer.CustomerPK);
    },
    updateAssignedCustomerList: (state, { payload }) => {
      state.assignedCustomerList = [...state.assignedCustomerList, payload];
      state.excludeList = [...state.excludeList, payload.CustomerPK];
    },
    removeAssignedCustomerList: (state, { payload }) => {
      state.assignedCustomerList = state.assignedCustomerList.filter(
        (element) => element.CustomerPK !== payload.CustomerPK
      );
      state.excludeList = state.excludeList.filter((element) => element !== payload.CustomerPK);
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

    setNormalSortValue: (state, { payload }) => {
      state.normalSortValue = payload;
    },
    setNormalSortFlag: (state) => {
      state.normalSortFlag = !state.normalSortFlag;
    },
    setLeftLoading: (state, action) => {
      state.leftLoading = action.payload;
    },
    setRightLoading: (state, action) => {
      state.rightLoading = action.payload;
    },
    setLeftCustomerList: (state, { payload }) => {
      if (payload) {
        state.leftCustomerList = payload;
      } else {
        state.leftCustomerList = [];
      }
    },
    setChangesInCustomerSelection: (state, action) => {
      state.changesInCustomerSelection = action.payload;
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
        (element) => element.CustomerPK !== action.payload.CustomerPK
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
        (element) => element.CustomerPK !== action.payload.CustomerPK
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

    setCloseFlag: (state, { payload }) => {
      state.closeFlag = payload;
    },
    resetNormalSort: (state, action) => {
      state.normalSortValue = null;
      state.normalSortFlag = false;

      state.rightSortFlag = false;
      state.rightSortValue = null;
    },
    setRightSortValue: (state, { payload }) => {
      state.rightSortValue = payload;
    },
    setRightSortFlag: (state) => {
      state.rightSortFlag = !state.rightSortFlag;
    },
  },
});

export const {
  setListingData,
  setFormData,
  setCustomerGroups,
  setViewDetail,
  setSelectedId,
  setDisableSave,
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSortValue,
  toggleSortFlag,
  setIsDescriptionUnique,
  resetCustomerGroups,
  setExcludeList,
  setAssignedCustomerList,
  setAssignSortValue,
  setInitialListFetched,
  setAssignSortFlag,
  setAssignedTotalElements,
  setAssignedTotalPages,
  setAssignedPageNumber,
  setEditPageLoading,
  setCustomerPageNumber,
  setCustomerTotalPages,
  setCustomerTotalElements,
  setCustomerList,
  updateAssignedCustomerList,
  removeAssignedCustomerList,

  setLeftPageNumber,
  setLeftTotalPages,
  setLeftTotalElements,
  setLeftCustomerList,
  setChangesInCustomerSelection,
  setSelectedList,
  setLeftLoading,
  setRightLoading,
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
  removeDeleteList,
  setNormalSortFlag,
  setNormalSortValue,
  setUnSelectedList,
  removeFromUnSelectedList,
  updateUnSelectedList,
  setReverseFlag,
  resetArrays,
  setSaveFlag,
  setRightSortValue,
  setRightSortFlag,
  resetNormalSort,
} = CustomerGroups.actions;

export default CustomerGroups.reducer;
