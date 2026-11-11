import { createSlice } from "@reduxjs/toolkit";
const SimulatorCertificateSlice = createSlice({
  name: "SimulatorCertificate",
  initialState: {
    simulatorCertificateData: null,
  },
  reducers: {
    setSimulatorCertificateData: (state, action) => {
      state.simulatorCertificateData = action.payload;
    },
  },
});
export const { setSimulatorCertificateData } = SimulatorCertificateSlice.actions;
export default SimulatorCertificateSlice.reducer;
