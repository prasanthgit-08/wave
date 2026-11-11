import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 0,
  sortValue: "",
  sortType: false,
  listingData: [],
  totalPages: 0,
  totalElements: 0,
  selectedPlate: "",
  plateNumber: "",
  selectedDriver: "",
  selectedDriverFK: "",
  emailBody: "",
  tempEmailBody: "",
  formData: null,
  operationFlag: 0,
  sortFlag: true,

  selectedId: null,
  searchTerm: "",
  searchCriteria: "Beginning",
  selectedStatus: "Active",

  onCancel: false,
  changeColor: false,

  active: true,
  searchStatus: "All",
  type: "All",
  viewPage: true,
  isSaveFlag: false,
  addDate: "",
  userPermission: 0,
  beginningDate: "",
  endDate: "",
  isBeginningDateValid: true,
  isEndDateValid: true,
};

const BondFundsLogSlice = createSlice({
  name: "bondFundsLog",
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
    setSearchCriteria: (state, { payload }) => {
      state.searchCriteria = payload;
    },
    setSelectedStatus: (state, { payload }) => {
      state.selectedStatus = payload;
    },
    setSearchStatus: (state, { payload }) => {
      state.searchStatus = payload;
    },
    setType: (state, { payload }) => {
      state.type = payload;
    },
    setBeginningDate: (state, { payload }) => {
      state.beginningDate = payload;
    },
    setEndDate: (state, { payload }) => {
      state.endDate = payload;
    },
    setIsBeginningDateValid: (state, { payload }) => {
      state.isBeginningDateValid = payload;
    },
    setIsEndDateValid: (state, { payload }) => {
      state.isEndDateValid = payload;
    },
  },
});

export const {
  updateField,
  updateMultipleFields,
  resetFields,
  setPageNumber,
  setSearchTerm,
  setSearchCriteria,
  setSelectedStatus,
  setSearchStatus,
  setType,
  setBeginningDate,
  setEndDate,
  setIsBeginningDateValid,
  setIsEndDateValid,
} = BondFundsLogSlice.actions;

export default BondFundsLogSlice;
