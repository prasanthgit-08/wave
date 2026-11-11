import { createSlice } from "@reduxjs/toolkit";

const CustomerUnitTypeGroupSlice = createSlice({
  name: "CustomerUnitTypeGroupSlice",
  initialState: {
    customerUnitTypeGroupData: [],
    unitTypeGroupPKS: [],
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    viewDetail: false,
    changesCancelled: false,

    // search filter
    searchTerms: "",
    searchCriteria: "Beginning",
    changeColor: false,
    selectId: "",

    normalSortValue: null,
    normalSortFlag: false,

    //advance search
    advancedSearchObject: null,
    showAdvanceSearch: false,
    showAdvanceSort: false,
    advanceSortedValue: null,
    advanceSortingOrder: null,
    advancedSearchString: "",
    advancedSearchByPayload: null,
    checkAllAdvancedSearchBy: false,

    searchDescription: "",
    searchCustomer: "",
    searchPlant: "",
    searchPlantGroup: "",
    searchCustomerGroup: "",

    //fields
    description: "",
    type: "Motorized",
    notes: "",
    motorized: false,
    towable: false,
    radioValue: "Motorized",
    editFormData: null,
    isDescriptionUnique: false,
    whichOne: "",
    //for customer lookup
    customerSelection: false,
    customerInput: "",
    customerId: null,
    //plant lookup
    customerPlantSelection: false,
    customerPlantInput: "",
    customerPlantId: null,
    //Plant group lookup
    customerPlantGroupSelection: false,
    customerPlantGroupInput: "",
    customerPlantGroupId: null,

    //Customer Group Lookup
    customerGroupSelection: false,
    customerGroupInput: "",
    customerGroupId: null,

    //for assigned unitype groups in viewdetail

    pageNumberUT: 0,
    totalPagesUT: 0,
    totalElementsUT: 0,
    unitTypeGroupData: [],

    assignedUnitTypeGroupList: [],
    excludeList: [],
    assignedTotalPages: 0,
    assignedTotalElements: 0,
    assignedPageNumber: 0,
    editPageLoading: false,
    assignSortFlag: false,
    assignSortValue: null,
  },
  //For left and right State Listing
  leftTotalPages: 0,
  leftTotalElements: 0,
  leftPageNumber: 0,
  sortValue: null,
  sortFlag: false,
  leftLoading: false,
  rightLoading: false,
  leftGroupList: [],
  selectedList: [],
  unSelectedList: [],
  initialList: [],
  saveList: [],
  deleteList: [],
  exceptList: [],
  reverseFlag: false,
  saveFlag: false,
  changesInSelection: false,
  groupSortValue: null,
  groupSortFlag: false,
  isGroupLoading: false,

  reducers: {
    setUnitTypeGroupData: (state, { payload }) => {
      state.unitTypeGroupData = payload;
      state.excludeList = payload.map((unittypegroups) => unittypegroups.unitTypeGroupPK);
    },
    setSearchDescription: (state, action) => {
      state.searchDescription = action.payload;
    },
    setUnitTypeGroupPKS: (state, action) => {
      state.unitTypeGroupPKS = action.payload;
    },
    setSelectId: (state, action) => {
      state.selectId = action.payload;
    },
    setWhichOne: (state, action) => {
      state.whichOne = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },

    setChangesCancelled: (state, action) => {
      state.changesCancelled = action.payload;
    },
    setSearchCustomer: (state, action) => {
      state.searchCustomer = action.payload;
    },

    setSearchPlant: (state, action) => {
      state.searchPlant = action.payload;
    },
    setSearchPlantGroup: (state, action) => {
      state.searchPlantGroup = action.payload;
    },
    setSearchCustomerGroup: (state, action) => {
      state.searchCustomerGroup = action.payload;
    },
    setAdvancedSearchString: (state, action) => {
      state.advancedSearchString = action.payload;
    },
    setAdvancedSearchByPayload: (state, action) => {
      state.advancedSearchByPayload = action.payload;
    },
    setCheckAllAdvancedSearchBy: (state, action) => {
      state.checkAllAdvancedSearchBy = action.payload;
    },
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
    },
    setAdvancedSearchByInputs: (state, { payload }) => {
      state.advancedSearchByInputs = {
        ...state.advancedSearchByInputs,
        [payload.name]: payload.checked,
      };
    },
    setSearchedData: (state, action) => {
      state.searchedData = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setIsDescriptionUnique: (state, action) => {
      state.isDescriptionUnique = action.payload;
    },
    setCustomerUnitTypeGroupData: (state, action) => {
      state.customerUnitTypeGroupData = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPageNumberUT: (state, action) => {
      state.pageNumberUT = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElementsUT: (state, action) => {
      state.totalElementsUT = action.payload;
    },
    setTotalPagesUT: (state, action) => {
      state.totalPagesUT = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setCustomerSelection: (state, action) => {
      state.customerSelection = action.payload;
    },
    setCustomerInput: (state, action) => {
      state.customerInput = action.payload;
    },

    setCustomerPlantId: (state, action) => {
      state.customerPlantId = action.payload;
    },
    setCustomerPlantSelection: (state, action) => {
      state.customerPlantSelection = action.payload;
    },
    setCustomerPlantInput: (state, action) => {
      state.customerPlantInput = action.payload;
    },
    setCustomerPlantGroupId: (state, action) => {
      state.customerPlantGroupId = action.payload;
    },
    setCustomerPlantGroupSelection: (state, action) => {
      state.customerPlantGroupSelection = action.payload;
    },
    setCustomerPlantGroupInput: (state, action) => {
      state.customerPlantGroupInput = action.payload;
    },
    setCustomerGroupId: (state, action) => {
      state.customerGroupId = action.payload;
    },
    setCustomerGroupSelection: (state, action) => {
      state.customerGroupSelection = action.payload;
    },
    setCustomerGroupInput: (state, action) => {
      state.customerGroupInput = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setMotorized: (state, action) => {
      state.motorized = action.payload;
    },
    setTowable: (state, action) => {
      state.towable = action.payload;
    },
    setRadioValue: (state, action) => {
      state.radioValue = action.payload;
    },
    resetStates: (state, action) => {
      state.description = "";
      state.isDescriptionUnique = false;
      state.customerId = null;
      state.customerPlantId = null;
      state.customerPlantGroupId = null;
      state.customerGroupId = null;
      state.notes = "";
      state.customerInput = "";
      state.customerPlantInput = "";
      state.customerPlantGroupInput = "";
      state.customerGroupInput = "";
      state.motorized = false;
      state.towable = false;
    },
    resetClose: (state, action) => {
      state.searchTerms = "";
      state.searchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.showAdvanceSearch = false;
      state.advancedSearchObject = null;
      state.searchedData = null;
      state.advancedSearchString = "";
      state.searchDescription = "";
      state.searchCustomer = "";
      state.searchPlant = "";
      state.searchPlantGroup = "";
      state.searchCustomerGroup = "";
      state.selectId = null;
    },
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
    setAssignedUnitTypeGroupList: (state, { payload }) => {
      state.assignedUnitTypeGroupList = payload;
      state.excludeList = payload.map((unittypegroups) => unittypegroups.unitTypeGroupPK);
    },
    updateAssignedUnitTypeGroupList: (state, { payload }) => {
      state.assignedUnitTypeGroupList = [...state.assignedUnitTypeGroupList, payload];
      state.excludeList = [...state.excludeList, payload.unitTypeGroupPK];
    },
    removeAssignedUnitTypeGroupList: (state, { payload }) => {
      state.assignedUnitTypeGroupList = state.assignedUnitTypeGroupList.filter(
        (element) => element.unitTypeGroupPK !== payload.unitTypeGroupPK
      );
      state.excludeList = state.excludeList.filter((element) => element !== payload.unitTypeGroupPK);
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
    setLeftGroupList: (state, { payload }) => {
      if (payload) {
        state.leftGroupList = payload;
      } else {
        state.leftGroupList = [];
      }
    },
    setChangesInSelection: (state, action) => {
      state.changesInSelection = action.payload;
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
        (element) => element.unitTypeGroupPK !== action.payload.unitTypeGroupPK
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
        (element) => element.unitTypeGroupPK !== action.payload.unitTypeGroupPK
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
    setGroupSortFlag: (state) => {
      state.groupSortFlag = !state.groupSortFlag;
    },
    setGroupSortValue: (state, { payload }) => {
      state.groupSortValue = payload;
    },

    setIsGroupLoading: (state, { payload }) => {
      state.isGroupLoading = payload;
    },
    resetNormalSort: (state, action) => {
      state.sortValue = null;
      state.sortFlag = false;

      state.groupSortFlag = false;
      state.groupSortValue = null;
    },
  },
});

export const {
  setChangeColor,
  setCustomerUnitTypeGroupData,
  setNormalSortValue,
  setNormalSortFlag,
  setSearchCriteria,
  setSearchTerms,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setPageNumberUT,
  setWhichOne,
  setTotalElementsUT,
  setTotalPagesUT,
  setEditFormData,
  resetSearchSettingsState,
  setAdvancedSearchString,
  setAdvancedSearchByPayload,
  setCheckAllAdvancedSearchBy,
  setAdvancedSearchObject,
  setShowAdvanceSearch,
  setAdvancedSearchByInputs,
  setSearchedData,
  setSearchDescription,
  setSearchCustomer,
  setSearchPlant,
  setSearchPlantGroup,
  setSearchCustomerGroup,
  setCustomerSelection,
  setCustomerInput,
  setCustomerId,
  setCustomerPlantId,
  setCustomerPlantInput,
  setCustomerPlantSelection,
  setCustomerPlantGroupId,
  setCustomerPlantGroupSelection,
  setCustomerPlantGroupInput,
  setCustomerGroupId,
  setCustomerGroupSelection,
  setCustomerGroupInput,
  setDescription,
  setIsDescriptionUnique,
  setViewDetail,
  setChangesCancelled,
  setSelectId,
  resetStates,
  setType,
  setNotes,
  setMotorized,
  setTowable,
  setRadioValue,
  setUnitTypeGroupPKS,
  setUnitTypeGroupData,

  setAssignedUnitTypeGroupList,
  setAssignedPageNumber,
  setAssignedTotalPages,
  setAssignedTotalElements,
  updateAssignedUnitTypeGroupList,
  removeAssignedUnitTypeGroupList,
  setEditPageLoading,
  setAssignSortFlag,
  setAssignSortValue,
  setExcludeList,
  setLeftPageNumber,
  setLeftTotalPages,
  setLeftTotalElements,
  setLeftGroupList,
  setChangesInSelection,
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
  setSortFlag,
  setSortValue,
  setUnSelectedList,
  removeFromUnSelectedList,
  updateUnSelectedList,
  setReverseFlag,
  resetArrays,
  setSaveFlag,
  setGroupSortValue,
  setGroupSortFlag,
  resetNormalSort,
  setIsGroupLoading,
  resetClose,
} = CustomerUnitTypeGroupSlice.actions;

export default CustomerUnitTypeGroupSlice.reducer;
