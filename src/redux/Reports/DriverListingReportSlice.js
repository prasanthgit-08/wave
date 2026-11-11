import { createSlice } from "@reduxjs/toolkit";

const DriverListingReportSlice = createSlice({
  name: "driverListingReport",
  initialState: {
    driverListingReportPayload: null,
  },
  reducers: {
    setDriverListingReportPayload: (state, action) => {
      if (action.payload) {
        state.driverListingReportPayload = { ...state.driverListingReportPayload, ...action.payload };
      } else {
        state.driverListingReportPayload = null;
      }
    },
  },
});

export const { setDriverListingReportPayload } = DriverListingReportSlice.actions;

export default DriverListingReportSlice;
