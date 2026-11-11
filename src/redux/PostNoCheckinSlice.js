import { createSlice } from "@reduxjs/toolkit";

const PostNoCheckinSlice = createSlice({
  name: "postNoCheckin",

  initialState: {
    driverFK: null,
    postNoCheckinHistoryList: [],
    activeDispatchList: [],
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    pageNumberAdd: 0,
    totalPagesAdd: 0,
    totalElementsAdd: 0,
    changeColor: false,
    dispatchPK: null,
    missedDates: [],

    warningMessage: "",
    saveDisable: false,

    unitsLoading: true,
    historyLoading: true,
    saveData: null,
    companyName: null,
    loader: true,
    dateArrayIndex: 0,
    postLoading: false,
  },
  reducers: {
    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },
    setPostLoading: (state, action) => {
      state.postLoading = action.payload;
    },
    setPostNoCheckinHistoryList: (state, action) => {
      state.postNoCheckinHistoryList = action.payload;
    },
    setActiveDispatchList: (state, action) => {
      state.activeDispatchList = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setPageNumberAdd: (state, action) => {
      state.pageNumberAdd = action.payload;
    },
    setTotalPagesAdd: (state, action) => {
      state.totalPagesAdd = action.payload;
    },
    setTotalElementsAdd: (state, action) => {
      state.totalElementsAdd = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setDispatchPK: (state, action) => {
      state.dispatchPK = action.payload;
    },
    setMissedDates: (state, action) => {
      state.missedDates = action.payload;
    },
    setSaveDisable: (state, action) => {
      state.saveDisable = action.payload;
    },
    setWarningMessage: (state, action) => {
      state.warningMessage = action.payload;
    },
    setUnitsLoading: (state, action) => {
      state.unitsLoading = action.payload;
    },
    setHistoryLoading: (state, action) => {
      state.historyLoading = action.payload;
    },
    setSaveData: (state, action) => {
      state.saveData = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setDateArrayIndex: (state, action) => {
      state.dateArrayIndex = action.payload;
    },
    resetUnitDetails: (state, action) => {
      state.dispatchPK = null;
      state.saveData = null;
      state.pageNumber = 0;
      state.companyName = null;
      state.missedDates = [];
      state.dateArrayIndex = 0;
      state.pageNumberAdd = 0;
    },
  },
});

export const {
  setDriverFK,
  setPostNoCheckinHistoryList,
  setActiveDispatchList,
  setPageNumber,
  setTotalPages,
  setPageNumberAdd,
  setTotalPagesAdd,
  setTotalElementsAdd,
  setTotalElements,
  setChangeColor,
  setDispatchPK,
  setMissedDates,
  setSaveDisable,
  setWarningMessage,
  setUnitsLoading,
  setHistoryLoading,
  setSaveData,
  setCompanyName,
  setLoader,
  resetUnitDetails,
  setDateArrayIndex,
  setPostLoading,
} = PostNoCheckinSlice.actions;

export default PostNoCheckinSlice.reducer;
