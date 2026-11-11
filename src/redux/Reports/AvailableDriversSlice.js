import { createSlice } from "@reduxjs/toolkit";

const AvailableDriversSlice = createSlice({
  name: "auth",
  initialState: {
    sortType: true,
    sortValue: "",
    pageNumber: 0,
    pageSize: 20,
    totalPages: 0,
    totalElements: 0,
    browseList: [],
    loading: false,
    selectedDriverPK: null,
    driverDivision: "all",
    option: "all",
    dispatchUserId:null,
    dispatchUserName: "",
    /* set once the permission default has been applied, so returning to the report keeps the
       dispatcher the user left behind - including one they cleared on purpose */
    dispatcherDefaulted: false,
  },
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setBrowseList: (state, action) => {
      state.browseList = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedDriverPK: (state, action) => {
      state.selectedDriverPK = action.payload;
    },
    setDriverDivision: (state, action) => {
      state.driverDivision = action.payload;
    },
    setOption: (state, action) => {
      state.option = action.payload;
    },
    setDispatchUserId: (state, action) => {
      state.dispatchUserId = action.payload;
    },
    setDispatchUserName: (state, action) => {
      state.dispatchUserName = action.payload;
    },
    setDispatcherDefaulted: (state, action) => {
      state.dispatcherDefaulted = action.payload;
    },
    resetChanges: (state) => {
      state.sortType = true;
      state.sortValue = "";
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.selectedDispatchPK = null;
      state.selectedDispatchPKList = [];
      state.browseList = [];
      state.loading = false;
      state.unitAdditionalNotes = "";
      state.selectedDriverPK = null;
    },
  },
});

export const {
  setBrowseFormData,
  setSortType,
  setSortValue,
  setPageNumber,
  setPageSize,
  setBrowseList,
  setLoading,
  resetChanges,
  setTotalPages,
  setTotalElements,
  setSelectedDriverPK,
  setDispatchUserId,
  setDispatchUserName,
  setDispatcherDefaulted,
  setOption,
  setDriverDivision
} = AvailableDriversSlice.actions;

export default AvailableDriversSlice.reducer;
