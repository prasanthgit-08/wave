import { createSlice } from "@reduxjs/toolkit";
const ReleaseReserveSlice = createSlice({
  name: "ReleaseReserve",
  initialState: {
    releaseReserveFormData: null,
    disableSave: true,
    changesCancelled: false,
    refundData: null,
    hasChanges: false,
  },
  reducers: {
    setReleaseReserveFormData: (state, action) => {
      state.releaseReserveFormData = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = action.payload;
    },
    setRefundData: (state, action) => {
      state.refundData = action.payload;
    },
    setHasChanges: (state, action) => {
      state.hasChanges = action.payload;
    },
  },
});
export const {
  setReleaseReserveFormData,
  setDisableSave,
  setChangesCancelled,
  setRefundData,
  setHasChanges,
} = ReleaseReserveSlice.actions;
export default ReleaseReserveSlice.reducer;
