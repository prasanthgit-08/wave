import { createSlice } from "@reduxjs/toolkit";

const PostToPassportSlice = createSlice({
  name: "posttopassport",

  initialState: {
    batchNumber: "",
    printBatch: false,
    emailBatchAsPdf: false,
    emailBatchAsExcel: false,
    postResetFlag: true,
  },
  reducers: {
    setBatchNumber: (state, action) => {
      state.batchNumber = action.payload;
    },
    setPrintBatch: (state, action) => {
      state.printBatch = action.payload;
    },

    setEmailBatchAsPdf: (state, action) => {
      state.emailBatchAsPdf = action.payload;
    },
    setEmailBatchAsExcel: (state, action) => {
      state.emailBatchAsExcel = action.payload;
    },
    setPostResetFlag: (state, action) => {
      state.postResetFlag = action.payload;
    },
    resetChanges: (state, action) => {
      state.batchNumber = "";
      state.printBatch = false;
      state.emailBatchAsPdf = false;
      state.emailBatchAsExcel = false;
    },
  },
});
export const {
  setBatchNumber,
  setPrintBatch,
  setEmailBatchAsPdf,
  setEmailBatchAsExcel,
  resetChanges,
  setPostResetFlag,
} = PostToPassportSlice.actions;

export default PostToPassportSlice.reducer;
