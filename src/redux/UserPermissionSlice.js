import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortType: true,
  sortValue: "",
  searchCriteria: "Beginning",
  listingData: [],
  searchTerm: "",
  pageNumber: 0,
  totalPages: 0,
  totalElements: 0,
  status: "All",
  category: "All",
  type: "Browse",
  editedList: [],
  enableSave: false,
  isSaving: false,
  selectedId: null,
};

const UserPermissionSlice = createSlice({
  name: "userPermission",
  initialState,
  reducers: {
    updateField: (state, { payload }) => {
      const { field, value } = payload;
      if (field in state) {
        state[field] = value;
      }
    },
    resetFields: (state) => {
      Object.assign(state, initialState);
    },
    updateMultipleFields: (state, action) => {
      const fieldsToUpdate = action.payload;
      Object.entries(fieldsToUpdate).forEach(([field, value]) => {
        if (field in state) {
          state[field] = value;
        }
      });
    },
    setPageNumber: (state, { payload }) => {
      state.pageNumber = payload;
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
    setUPSearchCriteria: (state, { payload }) => {
      state.searchCriteria = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    setCategory: (state, { payload }) => {
      state.category = payload;
    },
    updateEditData: (state, action) => {
      const { item, type, val } = action.payload;

      if (!Array.isArray(state.editedList)) {
        state.editedList = [];
      }

      const existingRecord = state.editedList.find(
        (record) => record.UserPermissionPK === item.UserPermissionPK
      );

      if (existingRecord) {
        existingRecord[type] = val; // Directly update the existing object
      } else {
        state.editedList.push({ ...item, [type]: val });
      }
    },
  },
});
export const {
  updateField,
  updateMultipleFields,
  resetFields,
  setPageNumber,
  setUPSearchCriteria,
  setSearchTerm,
  setStatus,
  setCategory,
  updateEditData,
} = UserPermissionSlice.actions;

export default UserPermissionSlice;
