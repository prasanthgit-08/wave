import { createSlice } from "@reduxjs/toolkit";

const DriverAddNotesSlice = createSlice({
  name: "driverAddNotesReducer",
  initialState: {
    disableSave: true,
    viewDetail: false,
    driverAddNotesData: null,
    formData: null,
    driverServicesNotes: "",
    dispatchNotes: "",
    currentTab: "notes",
    loading: false,
  },
  reducers: {
    setDriverAddNotes: (state, action) => {
      state.driverAddNotes = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setDriverServicesNotes: (state, action) => {
      state.driverServicesNotes = action.payload;
    },
    setDispatchNotes: (state, action) => {
      state.dispatchNotes = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    resetChanges: (state, action) => {
      state.driverServicesNotes = "";
    },
    setDriverAddNotesData: (state, { payload }) => {
      state.driverAddNotesData = { ...state.driverAddNotesData, ...payload };
    },
  },
});

export const {
  setDriverAddNotes,
  setDriverAddNotesData,
  setDisableSave,
  setFormData,
  setViewDetail,
  setDriverServicesNotes,
  setDispatchNotes,
  setCurrentTab,
  setLoading,
  resetChanges,
} = DriverAddNotesSlice.actions;

export default DriverAddNotesSlice.reducer;
