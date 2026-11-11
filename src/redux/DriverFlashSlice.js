import { createSlice } from "@reduxjs/toolkit";

const DriverFlashSlice = createSlice({
  name: "driverFlashSlice",
  initialState: {
    searchCriteria: "Beginning",
    active: null,
    sortValue: "statecode",
    sortType: true,
    driverId: null,
    state: "",
    units: "",
    percentage: "",
    last11: "",
    last12: "",
    pageNumber: 0,
    formPageNumber: 0,
    totalElements: 0,
    totalPages: 0,
    activeDriver: null,
    formData: [],
    normalSortValue: "statecode",
    normalSortFlag: true,
    statewiseList: [],
    viewDetail: false,
  },
  reducers: {
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setUnits: (state, action) => {
      state.units = action.payload;
    },

    setPercentage: (state, action) => {
      state.percentage = action.payload;
    },

    setLast11: (state, action) => {
      state.last11 = action.payload;
    },

    setLast12: (state, action) => {
      state.last12 = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setActiveString: (state, action) => {
      state.activeString = action.payload;
    },

    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },

    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setFormPageNumber: (state, action) => {
      state.formPageNumber = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setActiveDriver: (state, action) => {
      state.activeDriver = action.payload;
    },
    setStatewiseList: (state, action) => {
      state.statewiseList = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },

    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});
export const {
  setActive,
  setActiveString,
  setSearchCriteria,
  setDriverData,
  setSortType,
  setSortValue,
  setDriverId,
  setActiveKey,
  setState,
  setUnits,
  setPercentage,
  setLast11,
  setLast12,
  setStatewiseList,
  setFormData,
  setFormPageNumber,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setActiveDriver,
  setNormalSortValue,
  setViewDetail,
  setNormalSortFlag,
} = DriverFlashSlice.actions;

export default DriverFlashSlice.reducer;
