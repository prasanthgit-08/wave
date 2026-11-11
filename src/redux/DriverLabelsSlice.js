import { createSlice } from "@reduxjs/toolkit";

const DriverLabelsSlice = createSlice({
  name: "driverLabelsSlice",
  initialState: {
    labelBy: "status",
    status: "active",
    division: "all",
    startDay: "",
    endDay: "",
    startFirstName: "",
    endFirstName: "",
    startLastName: "",
    endLastName: "",
    lastDispatch: null,
    isLastDateValid: false,
    maximumAge: 0,
    showStatus: false,
    showDivison: false,
    showDeleased: false,
    showName: false,
    showAnniversary: false,
    isThankYouCard: false,
  },
  reducers: {
    setLabelBy: (state, { payload }) => {
      state.labelBy = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    setDivision: (state, { payload }) => {
      state.division = payload;
    },
    setShowDivison: (state, { payload }) => {
      state.showDivison = payload;
    },
    setShowStatus: (state, { payload }) => {
      state.showStatus = payload;
    },
    setShowDeleased: (state, { payload }) => {
      state.showDeleased = payload;
    },
    setShowName: (state, { payload }) => {
      state.showName = payload;
    },
    setShowAnniversary: (state, { payload }) => {
      state.showAnniversary = payload;
    },
    setIsThankYouCard: (state, { payload }) => {
      state.isThankYouCard = payload;
    },
    setStartDay: (state, { payload }) => {
      state.startDay = payload;
    },
    setEndDay: (state, { payload }) => {
      state.endDay = payload;
    },
    setStartFirstName: (state, { payload }) => {
      state.startFirstName = payload;
    },
    setEndFirstName: (state, { payload }) => {
      state.endFirstName = payload;
    },
    setStartLastName: (state, { payload }) => {
      state.startLastName = payload;
    },
    setEndLastName: (state, { payload }) => {
      state.endLastName = payload;
    },
    setLastDispatch: (state, { payload }) => {
      state.lastDispatch = payload;
    },
    setIsLastDateValid: (state, { payload }) => {
      state.isLastDateValid = payload;
    },
    setMaximumAge: (state, { payload }) => {
      state.maximumAge = payload;
    },
    reset(state) {
      state.endFirstName = "";
      state.endLastName = "";
      state.startFirstName = "";
      state.startLastName = "";
      state.startDay = "";
      state.endDay = "";
      state.division = "all";
      state.status = "active";
      state.labelBy = "status";
      state.maximumAge = 0;
      state.lastDispatch = null;
      state.isThankYouCard = false;
      state.showAnniversary = false;
      state.showDeleased = false;
      state.showDivison = false;
      state.showName = false;
      state.showStatus = false;
      state.isLastDateValid = false;
    },
  },
});
export const {
  setLabelBy,
  setStatus,
  setDivision,
  setIsThankYouCard,
  setShowAnniversary,
  setShowDeleased,
  setShowDivison,
  setShowName,
  setShowStatus,
  setEndDay,
  setEndFirstName,
  setEndLastName,
  setLastDispatch,
  setMaximumAge,
  setStartDay,
  setStartFirstName,
  setStartLastName,
  setIsLastDateValid,
  reset,
} = DriverLabelsSlice.actions;

export default DriverLabelsSlice.reducer;
