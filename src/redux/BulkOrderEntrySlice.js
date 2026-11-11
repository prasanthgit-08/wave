import { createSlice } from "@reduxjs/toolkit";

const BulkOrderEntrySlice = createSlice({
  name: "bulkOrderEntry",
  initialState: {
    testFile: null,
  },
  reducers: {
    setTestFile: (state, action) => {
      state.testFile = action.payload;
    },
  },
});
export const { setTestFile } = BulkOrderEntrySlice.actions;
export default BulkOrderEntrySlice;
