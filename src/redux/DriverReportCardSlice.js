import { createSlice } from "@reduxjs/toolkit";

const DriverReportCardSlice = createSlice({
  name: "driverReportCardSlice",
  initialState: {
    formData: [],
    equipmentList: [],
    sortFlag: false,
    sortValue: null,
    pageNumber: 0,
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setEquipmentList: (state, action) => {
      state.equipmentList = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    resetData: (state, action) => {
      state.formData = [];
      state.equipmentList = [];
      state.sortFlag = false;
      state.sortValue = null;
      state.pageNumber = 0;
    },
  },
});
export const { setFormData, setEquipmentList, setSortFlag, setSortValue, setPageNumber, resetData } =
  DriverReportCardSlice.actions;

export const dTLData = (state) => state.driverReportCard.value;

export default DriverReportCardSlice.reducer;
