import { createSlice } from "@reduxjs/toolkit";

const CertificateUpdateSlice = createSlice({
  name: "certificateUpdate",
  initialState: {
    driverData: [],
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setDriverData: (state, action) => {
      state.driverData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    resetCertificateUpdate: (state) => {
      state.driverData = [];
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
  },
});

export const { setDriverData, setPageNumber, setTotalPages, setTotalElements, resetCertificateUpdate } =
  CertificateUpdateSlice.actions;

export default CertificateUpdateSlice.reducer;
