import { createSlice, isAction } from "@reduxjs/toolkit";

const EditRegionSlice = createSlice({
  name: "editRegions",
  initialState: {
    regionDataList: null,
    regionCode: "",
    description: "",
    editDetail: false,
    saveRegion: false,
    cancelChange: false,
    uniqueRgCode: true,
  },
  reducers: {
    setRegionsDataList: (state, action) => {
      state.regionDataList = action.payload;
    },
    setRegionCode: (state, action) => {
      state.regionCode = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setEditDetails: (state, action) => {
      state.editDetail = action.payload;
    },
    setSaveRegion: (state, action) => {
      state.saveRegion = action.payload;
    },
    setCancelChange: (state, action) => {
      state.cancelChange = !state.cancelChange;
    },
    setUnqiueRegionCode: (state, action) => {
      state.uniqueRgCode = action.payload;
    },
    resetEditRegions: (state, action) => {
      state.regionCode = "";
      state.description = "";
      state.regionDataList = null;
    },
    resetEditData: (state, action) => {
      state.regionCode = state.regionDataList.regionCode;
      state.description = state.regionDataList.description;
    },
  },
});

export const {
  setDescription,
  setEditDetails,
  setRegionCode,
  setRegionsDataList,
  setSaveRegion,
  setCancelChange,
  setUnqiueRegionCode,
  resetEditRegions,
  resetEditData,
} = EditRegionSlice.actions;

export const regionData = (state) => state.editDealer.value;

export default EditRegionSlice.reducer;
