import { createSlice } from "@reduxjs/toolkit";

const EditDriverFileSlice = createSlice({
  name: "editDriverFile",
  initialState: {
    driverId: "",
    selectedDriverData: "",
    selectedDriverFormData: "",
    isDriverLoading: false,
    postalCodeOnChange: false,
    physicalPostalCodeOnChange: false,
    onCancel: false,
    dispatcherData: [],
    enableSave: false,
    driverDispatchHoldsData: "",
  },
  reducers: {
    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
    setSelectedDriverData: (state, action) => {
      state.selectedDriverData = action.payload;
    },
    setSelectedDriverFormData: (state, action) => {
      state.selectedDriverFormData = action.payload;
    },
    setIsDriverLoading: (state, action) => {
      state.isDriverLoading = action.payload;
    },
    setPostalCodeOnChange: (state, action) => {
      state.postalCodeOnChange = action.payload;
    },
    setPhysicalPostalCodeOnChange: (state, action) => {
      state.physicalPostalCodeOnChange = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setDispatcherData: (state, action) => {
      state.dispatcherData = action.payload;
    },
    setEnableSave: (state, action) => {
      state.enableSave = action.payload;
    },
    setDriverDispatchHoldsData: (state, action) => {
      state.driverDispatchHoldsData = action.payload;
    },
  },
});

export const {
  setDriverId,
  setSelectedDriverData,
  setSelectedDriverFormData,
  setIsDriverLoading,
  setPostalCodeOnChange,
  setPhysicalPostalCodeOnChange,
  setOnCancel,
  setDispatcherData,
  setEnableSave,
  setDriverDispatchHoldsData,
} = EditDriverFileSlice.actions;

export default EditDriverFileSlice.reducer;
