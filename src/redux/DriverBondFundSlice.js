import { createSlice } from "@reduxjs/toolkit";
const DriverBondFundSlice = createSlice({
  name: "DriverBondFund",
  initialState: {
    driverBondFund: null,
    disableSave: true,
    postalCodeOnChange: false,
    onCancel: false,
    changesCancelled: false,
  },
  reducers: {
    setDriverBondFund: (state, action) => {
      state.driverBondFund = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setPostalCodeOnChange: (state, action) => {
      state.postalCodeOnChange = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = action.payload;
    },
  },
});
export const { setDriverBondFund, setDisableSave, setPostalCodeOnChange, setOnCancel, setChangesCancelled } =
  DriverBondFundSlice.actions;
export default DriverBondFundSlice.reducer;
