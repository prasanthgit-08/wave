import { createSlice } from "@reduxjs/toolkit";
const CustomerPlantDelaySlice = createSlice({
  name: "CustomerPlantDelaySlice",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    plantDelayData: [],
    saveData: null,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    //input
    description: "",
    phone: "",
    delay: false,
    breakdown: false,
    damage: false,
    notes: "",
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    checkDescription: "",
    changesCancelled: false,
    plantPk: "",
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
    setPlantDelayData: (state, action) => {
      state.plantDelayData = action.payload;
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
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setDelay: (state, action) => {
      state.delay = action.payload;
    },
    setBreakdown: (state, action) => {
      state.breakdown = action.payload;
    },
    setDamage: (state, action) => {
      state.damage = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setPlantPk: (state, action) => {
      state.plantPk = action.payload;
    },
    resetChanges: (state, action) => {
      state.description = "";
      state.delay = "";
      state.damage = "";
      state.breakdown = "";
      state.phone = "";
      state.notes = "";
      state.checkDescription = "";
    },

    setCheckDescription: (state, action) => {
      state.checkDescription = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    resetClose: (state, action) => {
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setPlantDelayData,
  setSaveData,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
  setChangeColor,
  setDescription,
  setPhone,
  setBreakdown,
  setDamage,
  setDelay,
  setNotes,
  setEditFormData,
  setNormalSortValue,
  setNormalSortFlag,
  setCheckDescription,
  toggleChangesCancelled,
  setPlantPk,
  resetChanges,
  resetClose,
} = CustomerPlantDelaySlice.actions;

export default CustomerPlantDelaySlice.reducer;
