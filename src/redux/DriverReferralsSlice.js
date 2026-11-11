import { createSlice } from "@reduxjs/toolkit";
const DriverReferralsSlice = createSlice({
  name: "DriverReferrals",
  initialState: {
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    driverReferralsData: [],
    sortValue: null,
    sortType: false,
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setDriverReferralsData: (state, action) => {
      state.driverReferralsData = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    resetDriverReferrals: (state, action) => {
      state.pageNumber = 0;
      state.sortValue = null;
      state.sortType = false;
    },
  },
});
export const {
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setDriverReferralsData,
  setSortType,
  setSortValue,
  resetDriverReferrals,
} = DriverReferralsSlice.actions;

export default DriverReferralsSlice.reducer;
