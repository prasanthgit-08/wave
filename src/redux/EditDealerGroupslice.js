import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  dealerGroup: "",
  description: "",
  notes: "",
  name: "",
  dba: "",
  state: "",
  city: "",
  initialDescription: "",
  initialNotes: "",
  loading: false,
  saving: false,
  editPageLoading: false,
  leftLoading: false,
  rightLoading: false,
  changesInDealerSelection: false,

  searchTerm: "",
  searchCriteria: "Beginning",
  isActive: "Active",
  isComplete: "Complete",
  sortValue: "",
  sort: false,
  assignedSort: false,
  assignedSortValue: null,
  activeDealer: "All",

  reverseSearchTerm: "",
  reverseSearchCriteria: "Beginning",
  reverseIsActive: "Active",
  reverseIsComplete: "Complete",

  dealerListView: [],
  assignedDealerList: [],
  totalDealerList: [],
  excludeList: [],
  selectedList: [],
  unSelectedList: [],
  initialList: [],
  saveList: [],
  deleteList: [],
  searchList: [],
  exceptList: [],

  edit: false,
  reverseList: false,
  isUniqueDescription: true,
  editDealerSort: false,
  editDealerSortValue: "",

  assignedTotalPages: 0,
  assignedTotalElements: 0,
  assignedPageNumber: 0,
  totalTotalPages: 0,
  totalTotalElements: 0,
  totalPageNumber: 0,

  dealerTotalPages: 0,
  dealerTotalElements: 0,
  dealerPageNumber: 0,

  advancedSearchObject: null,
  showAdvanceSearch: false,
  showAdvanceSort: false,
  advanceSortedValue: null,
  advanceSortingOrder: null,
  advancedSearchString: "",
  advancedSearchByPayload: null,
  checkAllAdvancedSearchBy: false,
  advancedSearchByInputs: {
    address: false,
    postalCode: false,
    phones: false,
    contacts: false,
    notes: false,
    storeCode: false,
  },
};

const EditDealerGroupSlice = createSlice({
  name: "editDealerGroup",
  initialState: initialState,
  reducers: {
    setDealerGroup: (state, action) => {
      state.dealerGroup = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSaving: (state, action) => {
      state.saving = action.payload;
    },
    setLeftLoading: (state, action) => {
      state.leftLoading = action.payload;
    },
    setRightLoading: (state, action) => {
      state.rightLoading = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDBA: (state, action) => {
      state.dba = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setinitialDescription: (state, action) => {
      state.initialDescription = action.payload;
    },
    setinitialNotes: (state, action) => {
      state.initialNotes = action.payload;
    },
    setSortValue: (state, { payload }) => {
      state.sortValue = payload;
    },
    setSort: (state) => {
      state.sort = !state.sort;
    },
    setAssignedSort: (state) => {
      state.assignedSort = !state.assignedSort;
    },
    setAssignedSortValue: (state, { payload }) => {
      state.assignedSortValue = payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
    setIsComplete: (state, action) => {
      state.isComplete = action.payload;
    },
    setReverseSearchTerm: (state, action) => {
      state.reverseSearchTerm = action.payload;
    },
    setReverseSearchCriteria: (state, action) => {
      state.reverseSearchCriteria = action.payload;
    },
    setActiveDealer: (state, action) => {
      state.activeDealer = action.payload;
    },
    setReverseIsActive: (state, action) => {
      state.reverseIsActive = action.payload;
    },
    setReverseIsComplete: (state, action) => {
      state.reverseIsComplete = action.payload;
    },
    setDealerListView: (state, action) => {
      state.dealerListView = action.payload;
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
      state.selectedList = state.selectedList.filter((element) =>
        element.dealerPK
          ? element.dealerPK !== action.payload.dealerPK
          : element.incompletedearlerPK !== action.payload.incompletedearlerPK
      );
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
      state.unSelectedList = state.unSelectedList.filter((element) =>
        element.dealerPK
          ? element.dealerPK !== action.payload.dealerPK
          : element.incompletedearlerPK !== action.payload.incompletedearlerPK
      );
    },
    setAssignedDealerList: (state, { payload }) => {
      state.assignedDealerList = payload;
      state.excludeList = payload.map((dealer) =>
        dealer.dealerPK !== null ? dealer.dealerPK : dealer.incompletedealerPK
      );
    },
    updateAssignedDealerList: (state, { payload }) => {
      state.assignedDealerList = [...state.assignedDealerList, payload];
      state.excludeList = [
        ...state.excludeList,
        payload.dealerPK !== null ? payload.dealerPK : payload.incompletedealerPK,
      ];
    },
    removeAssignedDealerList: (state, { payload }) => {
      state.assignedDealerList = state.assignedDealerList.filter((element) =>
        element.dealerPK
          ? element.dealerPK !== payload.dealerPK
          : element.incompletedearlerPK !== payload.incompletedearlerPK
      );
      state.excludeList = state.excludeList.filter((element) =>
        payload.dealerPK ? element !== payload.dealerPK : element !== payload.incompletedealerPK
      );
    },
    setReverseList: (state, action) => {
      state.reverseList = action.payload;
    },
    setExceptList: (state, { payload }) => {
      if (payload) {
        state.exceptList = [payload];
      } else {
        state.exceptList = [];
      }
    },
    updateExceptList: (state, { payload }) => {
      if (payload) {
        state.exceptList = [...state.exceptList, payload];
      } else {
        state.exceptList = [];
      }
    },
    removeExcpetList: (state, { payload }) => {
      state.exceptList = state.exceptList.filter((element) => element !== payload);
    },
    setIsUniqueDescription: (state, action) => {
      state.isUniqueDescription = action.payload;
    },

    setinitialList: (state, { payload }) => {
      if (payload) {
        state.initialList = payload;
      } else {
        state.initialList = [];
      }
    },
    setEditDealerSort: (state, { payload }) => {
      state.editDealerSort = payload;
    },
    setEditDealerSortValue: (state, { payload }) => {
      state.editDealerSortValue = payload;
    },
    updateTotalDealerList: (state, { payload }) => {
      state.totalDealerList = [...state.totalDealerList, payload];
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
      if (payload) {
        state.deleteList = state.deleteList.filter((element) => payload !== element);
      } else {
        state.deleteList = [];
      }
    },
    setAllToDeleteList: (state, { payload }) => {
      state.deleteList = payload;
    },
    updateDeleteList: (state, { payload }) => {
      state.deleteList = [...state.deleteList, payload];
    },
    removeDeleteList: (state, { payload }) => {
      state.deleteList = state.deleteList.filter((element) => payload !== element);
    },
    setSearchList: (state, { payload }) => {
      if (payload) {
        state.searchList = [...state.searchList, payload];
      } else {
        state.searchList = [];
      }
    },
    removeSearchList: (state, { payload }) => {
      state.searchList = state.searchList.filter((element) => payload !== element);
    },
    updateSearchList: (state, { payload }) => {
      state.searchList = [...state.searchList, payload];
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
    setTotalTotalElements: (state, action) => {
      state.totalTotalElements = action.payload;
    },
    setTotalTotalPages: (state, action) => {
      state.totalTotalPages = action.payload;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setTotalPageNumber: (state, action) => {
      state.totalPageNumber = action.payload;
    },
    setTotalDealerList: (state, { payload }) => {
      if (payload) {
        state.totalDealerList = payload;
      } else {
        state.totalDealerList = [];
      }
    },
    setEditDealerSort: (state, { payload }) => {
      state.editDealerSort = payload;
    },
    setEditDealerSortValue: (state, { payload }) => {
      state.editDealerSortValue = payload;
    },
    removeFromTotalDealerList: (state, { payload }) => {
      state.totalDealerList = state.totalDealerList.filter((element) =>
        payload.dealerPK
          ? element.dealerPK !== payload.dealerPK
          : element.incompletedearlerPK !== payload.incompletedearlerPK
      );
    },
    setExcludeList: (state, action) => {
      state.excludeList = action.payload;
    },
    setShowAdvancedSearch: (state, action) => {
      state.showAdvanceSearch = !state.showAdvanceSearch;
    },
    setShowAdvancedSort: (state, action) => {
      state.showAdvanceSort = !state.showAdvanceSort;
    },
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setAdvancedSortingCriteria: (state, { payload }) => {
      state.advanceSortingOrder = payload;
    },
    setAdvanceSortedValue: (state, action) => {
      state.advanceSortedValue = action.payload;
    },
    setEditPageLoading: (state, action) => {
      state.editPageLoading = action.payload;
    },
    setChangesInDealerSelection: (state, action) => {
      state.changesInDealerSelection = action.payload;
    },
    setDealerPageNumber: (state, action) => {
      state.dealerPageNumber = action.payload;
    },
    setDealerTotalElements: (state, action) => {
      state.dealerTotalElements = action.payload;
    },
    setDealerTotalPages: (state, action) => {
      state.dealerTotalPages = action.payload;
    },

    resetData: (state, action) => {
      state.description = "";
      state.notes = "";
      state.assignedPageNumber = 0;
    },
    resetDealerSelectionSearch: (state, action) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.isActive = "Active";
      state.isComplete = "Complete";
      state.sortValue = "";
      state.sort = false;
      state.assignedSort = false;
      state.assignedSortValue = "";
      //state.state.advancedSearchObject= null;
      state.showAdvanceSearch = false;
      state.showAdvanceSort = false;
      state.advanceSortedValue = null;
      state.advanceSortingOrder = null;
      // state.advancedSearchString= '';
      state.advancedSearchByPayload = null;
      state.checkAllAdvancedSearchBy = false;
      state.advancedSearchByInputs = {
        address: false,
        postalCode: false,
        phones: false,
        contacts: false,
        notes: false,
        storeCode: false,
      };
      state.name = "";
      state.dba = "";
      state.state = "";
      state.city = "";
      state.changesInDealerSelection = true;
    },
    resetArrays: (state, action) => {
      state.saveList = [];
      state.deleteList = [];
      state.searchList = [];
      state.exceptList = [];
      state.selectedList = [];
      state.unSelectedList = [];
    },
    resetDealerGroups: (state, action) => {
      state = initialState;
    },
  },
});

export const {
  setDescription,
  setNotes,
  setSaving,
  setLeftLoading,
  setRightLoading,
  setinitialDescription,
  setinitialNotes,
  setCity,
  setDBA,
  setName,
  setState,
  setLoading,
  setSearchTerm,
  setSort,
  setSortValue,
  setAssignedSort,
  setAssignedSortValue,
  setSearchCriteria,
  setIsActive,
  setIsComplete,
  setReverseIsActive,
  setReverseIsComplete,
  setReverseSearchCriteria,
  setReverseSearchTerm,
  setSelectedList,
  updateSelectedList,
  removeFromSelectedList,
  setUnSelectedList,
  updateUnSelectedList,
  removeFromUnSelectedList,

  setDeleteList,
  setAllToDeleteList,
  setSaveList,
  setinitialList,
  removeDeleteList,
  removeSaveList,
  updateDeleteList,
  updateSaveList,
  setSearchList,
  updateSearchList,
  removeSearchList,
  updateExceptList,
  removeExcpetList,
  setExceptList,

  setDealerGroup,
  setEdit,
  setAssignedDealerList,
  updateAssignedDealerList,
  removeAssignedDealerList,
  setAssignedPageNumber,
  setAssignedTotalElements,
  setAssignedTotalPages,
  setTotalPageNumber,
  setTotalDealerList,
  updateTotalDealerList,
  removeFromTotalDealerList,
  setReverseList,
  setEditPageLoading,
  setExcludeList,
  setTotalTotalPages,
  setTotalTotalElements,
  setShowAdvancedSearch,
  setShowAdvancedSort,
  setAdvancedSearchObject,
  setAdvanceSortedValue,
  setAdvancedSortingCriteria,
  setIsUniqueDescription,
  setChangesInDealerSelection,
  resetDealerSelectionSearch,
  resetData,
  resetArrays,
  setActiveDealer,
  setDealerPageNumber,
  setDealerTotalElements,
  setDealerTotalPages,
  setDealerListView,
  setEditDealerSort,
  setEditDealerSortValue,
  resetDealerGroups,
} = EditDealerGroupSlice.actions;

export const dealerGroupData = (state) => state.editDealerGroup.value;

export default EditDealerGroupSlice.reducer;
