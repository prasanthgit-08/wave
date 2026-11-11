import { createSlice } from "@reduxjs/toolkit";

const OEDriverBySlice = createSlice({
  name: "oeDriveBy",
  initialState: {
    pageNumberDealerModal: 0,
    totalPagesDealerModal: 0,
    totalElementsDealerModal: 0,
    pageNumberDriveModal: 0,
    totalPagesDriveModal: 0,
    totalElementsDriveModal: 0,
    city: "",
    statecode: "",
    zip: "",
  },
  reducers: {
    setPageNumberDealerModal: (state, action) => {
      state.pageNumberDealerModal = action.payload;
    },

    setTotalElementsDealerModal: (state, action) => {
      state.totalElementsDealerModal = action.payload;
    },

    setTotalPagesDealerModal: (state, action) => {
      state.totalPagesDealerModal = action.payload;
    },
    setPageNumberDriveModal: (state, action) => {
      state.pageNumberDriveModal = action.payload;
    },

    setTotalElementsDriveModal: (state, action) => {
      state.totalElementsDriveModal = action.payload;
    },

    setTotalPagesDriveModal: (state, action) => {
      state.totalPagesDriveModal = action.payload;
    },
    setReduxCity: (state, action) => {
      state.city = action.payload;
    },
    setReduxState: (state, action) => {
      state.statecode = action.payload;
    },
    setReduxZip: (state, action) => {
      state.zip = action.payload;
    },
  },
});
export const {
  setPageNumberDealerModal,
  setTotalPagesDealerModal,
  setTotalElementsDealerModal,
  setPageNumberDriveModal,
  setTotalPagesDriveModal,
  setTotalElementsDriveModal,
  setReduxCity,
  setReduxState,
  setReduxZip,
} = OEDriverBySlice.actions;

export default OEDriverBySlice.reducer;
