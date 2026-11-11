import { createSlice } from "@reduxjs/toolkit";

const CustomerPlantGroupSlice = createSlice({
  name: "customerPlantGroups",
  initialState: {
    listingData: [],
    allPlants: [],
    selectedPlants: [],
    unselectedPlants: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    sortType: false,
    sortValue: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    disableSave: false,
    id: "",
    selectedCustomer: null,
    primaryKey: "",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    uniqueResponse: "",
    changesCancelled: false,
    saveData: null,
    saving: false,
    description: "",
    customer: "",
    notes: "",

    assignedPageNo: 0,
    plantList: [],
    plantTotalPages: 0,
    plantTotalElements: 0,
    plantsort: false,
    plantsortValue: null,

    leftPlantsList: [],
    leftPlantsPageno: 0,
    leftPlantsTotalPages: 0,
    leftPlantsTotalElements: 0,
    leftPlantsSort: false,
    leftPlantsSortValue: null,

    rightPlantsList: [],
    rightPlantsPageno: 0,
    rightPlantsTotalPages: 0,
    rightPlantsTotalElements: 0,
    rightPlantsSort: false,
    rightPlantsSortValue: null,

    selectedList: [],
    unSelectedList: [],
    initialList: [],
    saveList: [],
    deleteList: [],
    exceptList: [],
    reverseFlag: false,
  },
  reducers: {
    setSaveData: (state, action) => {
      state.saveData = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setAllPlants: (state, action) => {
      state.allPlants = action.payload;
    },
    setSelectedPlants: (state, action) => {
      state.selectedPlants = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setUnselectedPlants: (state, action) => {
      state.unselectedPlants = action.payload;
    },
    filterAvailabeCustomers: (state, { payload }) => {
      state.unselectedCustomers = state.unselectedCustomers.filter(
        (customer) => customer.customerPK !== payload
      );
    },
    addSelectedCustomer: (state, { payload }) => {
      state.selectedCustomers = [payload, ...state.selectedCustomers];
    },
    filterSelectedCustomers: (state, { payload }) => {
      state.selectedCustomers = state.selectedCustomers.filter((customer) => customer.customerPK !== payload);
    },
    removeSelectedCustomer: (state, { payload }) => {
      state.unselectedCustomers = [payload, ...state.unselectedCustomers];
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSortType: (state) => {
      state.sortType = !state.sortType;
    },
    setSortValue: (state, { payload }) => {
      state.sortValue = payload;
    },
    setSaving: (state, { payload }) => {
      state.saving = payload;
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

    setId: (state, action) => {
      state.id = action.payload;
    },
    setSelectedCustomer: (state, { payload }) => {
      state.selectedCustomer = payload;
    },
    setPrimaryKey: (state, action) => {
      state.primaryKey = action.payload;
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
    setUniqueResponse: (state, action) => {
      state.uniqueResponse = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },

    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },

    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setAssignedPageNo: (state, action) => {
      state.assignedPageNo = action.payload;
    },
    setPlantTotalPages: (state, action) => {
      state.plantTotalPages = action.payload;
    },
    setPlantTotalElements: (state, action) => {
      state.plantTotalElements = action.payload;
    },
    setPlantSort: (state) => {
      state.plantsort = !state.plantsort;
    },
    setPlantSortValue: (state, { payload }) => {
      state.plantsortValue = payload;
    },
    setPlantList: (state, { payload }) => {
      state.plantList = payload;
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
    setRightPlantsList: (state, action) => {
      state.rightPlantsList = action.payload;
    },
    setLeftPlantsList: (state, action) => {
      state.leftPlantsList = action.payload;
    },
    setRightPlantsPageno: (state, action) => {
      state.rightPlantsPageno = action.payload;
    },
    setLeftPlantsPageno: (state, action) => {
      state.leftPlantsPageno = action.payload;
    },
    setRightPlantsSort: (state, action) => {
      state.rightPlantsSort = !state.rightPlantsSort;
    },
    setLeftPlantsSort: (state, action) => {
      state.leftPlantsSort = !state.leftPlantsSort;
    },
    setRightPlantsSortValue: (state, action) => {
      state.rightPlantsSortValue = action.payload;
    },
    setLeftPlantsSortValue: (state, action) => {
      state.leftPlantsSortValue = action.payload;
    },
    setRightPlantsTotalElements: (state, action) => {
      state.rightPlantsTotalElements = action.payload;
    },
    setLeftPlantsTotalElements: (state, action) => {
      state.leftPlantsTotalElements = action.payload;
    },
    setRightPlantsTotalPages: (state, action) => {
      state.rightPlantsTotalPages = action.payload;
    },
    setLeftPlantsTotalPages: (state, action) => {
      state.leftPlantsTotalPages = action.payload;
    },
    resetEditPlants: (state) => {
      state.leftPlantsList = [];
      state.leftPlantsPageno = 0;
      state.leftPlantsTotalPages = 0;
      state.leftPlantsTotalElements = 0;
      state.leftPlantsSort = false;
      state.leftPlantsSortValue = null;

      state.rightPlantsList = [];
      state.rightPlantsPageno = 0;
      state.rightPlantsTotalPages = 0;
      state.rightPlantsTotalElements = 0;
      state.rightPlantsSort = false;
      state.rightPlantsSortValue = null;

      state.selectedList = [];
      state.unSelectedList = [];
      state.initialList = [];
      state.saveList = [];
      state.deleteList = [];
      state.exceptList = [];
      state.reverseFlag = false;
    },
    resetGroupEdit: (state) => {
      state.plantTotalPages = 0;
      state.plantTotalElements = 0;
      state.description = "";
      state.customer = "";
      state.notes = "";
    },
    resetChanges: (state, action) => {
      state.primaryKey = "";
      state.description = "";
      state.customer = "";
      state.notes = "";
      state.searchCriteria = "Beginning";
      state.searchTerm = "";
      state.sortType = false;
      state.sortValue = "";
      state.pageNumber = 0;
      state.changeColor = false;
      state.id = "";
    },
  },
});

export const {
  setSaveData,
  setListingData,
  setAllPlants,
  setUnselectedPlants,
  setSelectedPlants,
  setDisableSave,

  filterAvailabeCustomers,
  addSelectedCustomer,
  filterSelectedCustomers,
  removeSelectedCustomer,
  setSearchTerm,
  setSearchCriteria,
  setSortType,
  setSortValue,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setId,
  setPrimaryKey,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  setUniqueResponse,
  toggleChangesCancelled,
  setDescription,
  setCustomer,
  setNotes,
  setAssignedPageNo,
  setPlantList,
  setPlantTotalElements,
  setPlantTotalPages,
  setPlantSort,
  setPlantSortValue,
  setDeleteList,
  setExceptList,
  setReverseFlag,
  setSaveList,
  setSelectedList,
  setUnSelectedList,
  setinitialList,
  updateDeleteList,
  updateExceptList,
  updateSaveList,
  updateSelectedList,
  updateUnSelectedList,
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  removeFromUnSelectedList,
  removeSaveList,
  setRightPlantsList,
  setLeftPlantsList,
  setLeftPlantsPageno,
  setLeftPlantsSort,
  setLeftPlantsSortValue,
  setLeftPlantsTotalElements,
  setLeftPlantsTotalPages,
  setRightPlantsPageno,
  setRightPlantsSort,
  setRightPlantsSortValue,
  setRightPlantsTotalElements,
  setRightPlantsTotalPages,
  setSelectedCustomer,
  resetEditPlants,
  resetGroupEdit,
  resetChanges,
  setSaving,
} = CustomerPlantGroupSlice.actions;
export default CustomerPlantGroupSlice.reducer;
