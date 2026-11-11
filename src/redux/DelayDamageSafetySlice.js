import { createSlice } from "@reduxjs/toolkit";
const DelayDamageSafetySlice = createSlice({
  name: "DamageSafety",
  initialState: {
    saveData: null,
    delayDamageValue: [],
    saveFlag: false,
    adjustSafetyMiles: false,
    deductAllSafetyMiles: false,
    milesToDeduct: "",
    adjustBondTotal: false,
    bondTotal: "",
    reserve: "",
    releaseReserve: false,
    requireAttendSafetySchool: false,
    nextSafetySchoolDate: "",
    requireAttendSmartSimulator: false,
    nextSmartSimulatorDate: "",
    damageSafetyFlag: false,
  },
  reducers: {
    setSaveData: (state, action) => {
      state.saveData = action.payload;
    },
    setDelayDamageValue: (state, action) => {
      state.delayDamageValue = action.payload;
    },
    setSaveFlag: (state, action) => {
      state.saveFlag = action.payload;
    },
    setAdjustSafetyMiles: (state, action) => {
      state.adjustSafetyMiles = action.payload;
    },
    setDeductAllSafetyMiles: (state, action) => {
      state.deductAllSafetyMiles = action.payload;
    },
    setMilesToDeduct: (state, action) => {
      state.milesToDeduct = action.payload;
    },
    setAdjustBondTotal: (state, action) => {
      state.adjustBondTotal = action.payload;
    },
    setBondTotal: (state, action) => {
      state.bondTotal = action.payload;
    },
    setReserve: (state, action) => {
      state.reserve = action.payload;
    },
    setReleaseReserve: (state, action) => {
      state.releaseReserve = action.payload;
    },
    setRequireAttendSafetySchool: (state, action) => {
      state.requireAttendSafetySchool = action.payload;
    },

    setNextSafetySchoolDate: (state, action) => {
      state.nextSafetySchoolDate = action.payload;
    },

    setRequireAttendSmartSimulator: (state, action) => {
      state.requireAttendSmartSimulator = action.payload;
    },
    setNextSmartSimulatorDate: (state, action) => {
      state.nextSmartSimulatorDate = action.payload;
    },
    setDamageSafetyFlag: (state, action) => {
      state.damageSafetyFlag = action.payload;
    },
    resetChanges: (state, action) => {
      state.delayDamageValue = [];
      state.adjustSafetyMiles = false;
      state.deductAllSafetyMiles = false;
      state.milesToDeduct = "";
      state.adjustBondTotal = false;
      state.bondTotal = "";
      state.reserve = "";
      state.releaseReserve = false;
      state.requireAttendSafetySchool = false;
      state.nextSafetySchoolDate = "";
      state.requireAttendSmartSimulator = false;
      state.nextSmartSimulatorDate = "";
    },
  },
});
export const {
  setSaveData,
  setDelayDamageValue,
  setSaveFlag,
  setAdjustSafetyMiles,
  setMilesToDeduct,
  setDeductAllSafetyMiles,
  setAdjustBondTotal,
  setBondTotal,
  setReserve,
  setReleaseReserve,
  setRequireAttendSafetySchool,
  setNextSafetySchoolDate,
  setRequireAttendSmartSimulator,
  setNextSmartSimulatorDate,
  resetChanges,
  setDamageSafetyFlag,
} = DelayDamageSafetySlice.actions;

export default DelayDamageSafetySlice.reducer;
