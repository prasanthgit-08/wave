import { createSlice } from "@reduxjs/toolkit";

const EditYardUnitSlice = createSlice({
  name: "editYardUnit",

  initialState: {
    specialCodeSelection: false,
    yardSelection: false,
    unitNumberLast5: "",
    unitNumberInput: "",
    unitNumberPK: null,
    unitDetails: [],
    unitsLoading: true,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    changeColor: false,
    viewDetail: true,
    editUnitData: null,
    saveData: null,
    saveDisable: true,
    activeDispatch: false,
    delay: "none",
    showUnitActivationScreen: false,
    shuttleSave: false,
    unitShuttleDelayData: null,
    plantReturnCase: false,
    cancelChanges: false,
    activeDispatchStatus: false,
  },
  reducers: {
    setSpecialCodeSelection: (state, action) => {
      state.specialCodeSelection = action.payload;
    },
    setYardSelection: (state, action) => {
      state.yardSelection = action.payload;
    },
    setUnitNumberLast5: (state, action) => {
      state.unitNumberLast5 = action.payload;
    },
    setUnitNumberInput: (state, action) => {
      state.unitNumberInput = action.payload;
    },
    setUnitNumberPK: (state, action) => {
      state.unitNumberPK = action.payload;
    },
    setUnitDetails: (state, action) => {
      state.unitDetails = action.payload;
    },
    setUnitsLoading: (state, action) => {
      state.unitsLoading = action.payload;
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
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditUnitData: (state, action) => {
      state.editUnitData = action.payload;
    },
    setSaveData: (state, action) => {
      state.saveData = action.payload;
    },
    setSaveDisable: (state, action) => {
      state.saveDisable = action.payload;
    },
    setActiveDispatch: (state, action) => {
      state.activeDispatch = action.payload;
    },
    setDelay: (state, action) => {
      state.delay = action.payload;
    },
    setShowUnitActivationScreen: (state, action) => {
      state.showUnitActivationScreen = action.payload;
    },
    setShuttleSave: (state, action) => {
      state.shuttleSave = action.payload;
    },
    setUnitShuttleDelayData: (state, action) => {
      state.unitShuttleDelayData = action.payload;
    },
    setPlantReturnCase: (state, action) => {
      state.plantReturnCase = action.payload;
    },
    setCancelChanges: (state, action) => {
      state.cancelChanges = !state.cancelChanges;
    },
    setActiveDispatchStatus: (state, action) => {
      state.activeDispatchStatus = action.payload;
    },
  },
});

export const {
  setSpecialCodeSelection,
  setYardSelection,
  setUnitNumberLast5,
  setUnitNumberInput,
  setUnitNumberPK,
  setUnitDetails,
  setUnitsLoading,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setChangeColor,
  setViewDetail,
  setEditUnitData,
  setSaveData,
  setSaveDisable,
  setActiveDispatch,
  setDelay,
  setShowUnitActivationScreen,
  setShuttleSave,
  setUnitShuttleDelayData,
  setPlantReturnCase,
  setCancelChanges,
  setActiveDispatchStatus,
} = EditYardUnitSlice.actions;

export default EditYardUnitSlice.reducer;
