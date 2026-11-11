import { createSlice } from "@reduxjs/toolkit";

const OECreditCardSlice = createSlice({
  name: "oeCreditCardSlice",
  initialState: {
    isCanadianOeCreditCard: false,
  },
  reducers: {
    setIsCanadianOeCreditCard: (state, action) => {
      state.isCanadianOeCreditCard = action.payload;
    },
  },
});
export const { setIsCanadianOeCreditCard } = OECreditCardSlice.actions;

export default OECreditCardSlice.reducer;
