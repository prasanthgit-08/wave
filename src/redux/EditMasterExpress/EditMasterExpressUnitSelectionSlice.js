import { createSlice } from "@reduxjs/toolkit";

const EditMasterExpressUnitSelectionSlice = createSlice({
  name: "editMasterExpress",
  initialState: {
    selectedUnitData: "",
    selectedUnitFormData: "",
    selectedUnitId: "",
    isUnitDataLoading: false,
    viewDetail: false,
  },
  reducers: {
    setSelectedUnitData: (state, action) => {
      state.selectedUnitData = action.payload;
    },
    setSelectedUnitFormData: (state, action) => {
      state.selectedUnitFormData = action.payload;
    },
    setSelectedUnitId: (state, action) => {
      state.selectedUnitId = action.payload;
    },
    setIsUnitDataLoading: (state, action) => {
      state.isUnitDataLoading = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
  },
});

export const {
  setSelectedUnitData,
  setSelectedUnitFormData,
  setSelectedUnitId,
  setIsUnitDataLoading,
  setViewDetail,
} = EditMasterExpressUnitSelectionSlice.actions;

export default EditMasterExpressUnitSelectionSlice.reducer;
