import { createSlice } from "@reduxjs/toolkit";

const DelayUnitCodesSlice = createSlice({
  name: "DelayedUnits",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    searchTerm: "",
    searchCriteria: "Beginning",
    changeColor: false,
    delayedUnitsData: [],
    viewDetail: false,
    editFormData: null,
    delayedUnitCodePK: "",
    descriptionValid: true,
    sisterDelayCodeValid: true,
    delayedData: null,

    //input
    description: "",
    delay: false,
    damage: false,
    breakdown: false,
    weather: false,
    roadType: false,
    roadcondition: false,
    sisterDelayCode: "",

    //normal sort
    normalSortValue: null,
    normalSortFlag: false,

    //editing
    delayUnitCodesId: "",
    //for delay claim tab
    filterType: "",
    filterActive: "",
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
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setDelayedUnitsData: (state, action) => {
      state.delayedUnitsData = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setDelayedUnitCodePK: (state, action) => {
      state.delayedUnitCodePK = action.payload;
    },
    setDescriptionValid: (state, action) => {
      state.descriptionValid = action.payload;
    },
    setSisterDelayCodeValid: (state, action) => {
      state.sisterDelayCodeValid = action.payload;
    },
    setDelayedData: (state, action) => {
      state.delayedData = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setDelayUnitCodesId: (state, action) => {
      state.delayUnitCodesId = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setDelay: (state, action) => {
      state.delay = action.payload;
    },
    setDamage: (state, action) => {
      state.damage = action.payload;
    },
    setBreakdown: (state, action) => {
      state.breakdown = action.payload;
    },
    setWeather: (state, action) => {
      state.weather = action.payload;
    },
    setRoadType: (state, action) => {
      state.roadType = action.payload;
    },
    setRoadcondition: (state, action) => {
      state.roadcondition = action.payload;
    },
    setSisterDelayCode: (state, action) => {
      state.sisterDelayCode = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
    setFilterActive: (state, action) => {
      state.filterActive = action.payload;
    },
    resetChanges: (state, action) => {
      state.delayedUnitCodePK = "";
      state.description = "";
      state.delay = false;
      state.damage = false;
      state.breakdown = false;
      state.weather = false;
      state.roadType = false;
      state.roadcondition = false;
      state.sisterDelayCode = "";
    },
    resetFields: (state, action) => {
      state.description = "";
      state.delay = false;
      state.damage = false;
      state.breakdown = false;
      state.weather = false;
      state.roadType = false;
      state.roadcondition = false;
      state.sisterDelayCode = "";
      state.editFormData = null;
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSearchTerm,
  setSearchCriteria,
  setChangeColor,
  setDelayedUnitsData,
  setViewDetail,
  setEditFormData,
  setDelayedUnitCodePK,
  setDescriptionValid,
  setSisterDelayCodeValid,
  setDelayedData,
  setNormalSortValue,
  setNormalSortFlag,
  setDelayUnitCodesId,
  setDescription,
  setDelay,
  setDamage,
  setBreakdown,
  setWeather,
  setRoadType,
  setRoadcondition,
  setSisterDelayCode,
  toggleChangesCancelled,
  resetChanges,
  resetFields,
  setFilterType,
  setFilterActive,
} = DelayUnitCodesSlice.actions;

export const delayedUnits = (state) => state.DelayedUnits.value;
export default DelayUnitCodesSlice.reducer;
