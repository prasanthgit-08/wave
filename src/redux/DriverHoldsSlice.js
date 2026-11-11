import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  holdData: [],
  loading: false,
  error: null,
  totalElementsData: 0,
  totalPages: 0,
  pageNumber: 0,
  sortValue: "",
  sortFlag: true,
  selectedHold: null,
  filterType: "all",
  searchTerm: "",
  driverData: null,
};

const DriverHoldsSlice = createSlice({
  name: "driverHolds",
  initialState,
  reducers: {
    setHoldData: (state, action) => {
      state.holdData = action.payload;
    },
    setDriverData: (state, action) => {
      state.driverData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTotalElementsData: (state, action) => {
      state.totalElementsData = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },
    setSelectedHold: (state, action) => {
      state.selectedHold = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addHold: (state, action) => {
      state.holdData.unshift(action.payload);
      state.totalElements += 1;
    },
    updateHold: (state, action) => {
      const index = state.holdData.findIndex((hold) => hold.id === action.payload.id);
      if (index !== -1) {
        state.holdData[index] = action.payload;
      }
    },
    removeHold: (state, action) => {
      state.holdData = state.holdData.filter((hold) => hold.id !== action.payload);
      state.totalElements -= 1;
    },
    clearHolds: (state) => {
      state.holdData = [];
      state.totalElements = 0;
      state.totalPages = 0;
    },
    resetHoldsState: () => initialState,
  },
});

// Export all actions
export const {
  setHoldData,
  setLoading,
  setError,
  setTotalElementsData,
  setTotalPages,
  setPageNumber,
  setSortValue,
  setSortFlag,
  setSelectedHold,
  setFilterType,
  setSearchTerm,
  addHold,
  updateHold,
  removeHold,
  clearHolds,
  resetHoldsState,
  setDriverData,
} = DriverHoldsSlice.actions;

// Export the reducer as default
export default DriverHoldsSlice.reducer;
