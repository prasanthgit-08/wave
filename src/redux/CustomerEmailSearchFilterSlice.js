import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const CustomerEmailSearchFilter = createSlice({
  name: "cutomerEmailFilter",
  initialState: {
    searchType: "",
    radioType: "Beginning",
    customerData: [],
  },
  reducers: {
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setRadioType: (state, action) => {
      state.radioType = action.payload;
    },
    setcustomerData: (state, action) => {
      state.customerData = action.payload;
    },
  },
});

export const { setRadioType, setSearchType, setcustomerData } = CustomerEmailSearchFilter.actions;

export default CustomerEmailSearchFilter.reducer;
