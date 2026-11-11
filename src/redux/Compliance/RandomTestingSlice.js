import { createSlice } from "@reduxjs/toolkit";

const RandomTestingSlice = createSlice({
  name: "randomTesting",
  initialState: {
    disableProcess: false,
    printSelection: false,
    emailSelection: false,
    randomTestingData: null,
    isValidateFlag: false,
  },
  reducers: {
    setRandomTestingData: (state, action) => {
      state.randomTestingData = action.payload;
    },
    setDisableProcess: (state, action) => {
      state.disableProcess = action.payload;
    },
    setPrintSelection: (state, action) => {
      state.printSelection = action.payload;
    },
    setEmailSelection: (state, action) => {
      state.emailSelection = action.payload;
    },
    setIsValidateFlag: (state, action) => {
      state.isValidateFlag = action.payload;
    },
  },
});
export const {
  setRandomTestingData,
  setDisableProcess,
  setPrintSelection,
  setEmailSelection,
  setIsValidateFlag,
} = RandomTestingSlice.actions;

export default RandomTestingSlice.reducer;
