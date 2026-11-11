import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 0,
  totalPages: 0,
  totalElements: 0,
  listingData: [],
  searchTerm: "",
  searchCriteria: "Beginning",
  changeColor: false,
  viewDetail: false,
  editFormData: null,
  changesCancelled: false,
  sortType: false,
  sortValue: "",
  selectedId: null,
  saveData: [],
  resetForm: false,
  chargeCreditCardBit: false,
  unitPk: null,
  companyName: "",
  dispatchStatus: false,
};

const BulkInvoiceSlice = createSlice({
  name: "BulkInvoiceSlice",
  initialState,
  reducers: {
    updateField: (state, { payload }) => {
      const { field, value } = payload;
      if (field in state) {
        state[field] = value;
      }
    },
    updateMultipleFields: (state, { payload }) => {
      Object.entries(payload).forEach(([field, value]) => {
        if (field in state) {
          state[field] = value;
        }
      });
    },
    resetFormData: (state) => {
      state.resetForm = true;
    },
    resetFields: (state) => {
      Object.assign(state, initialState);
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSaveData: (state, action) => {
      state.saveData = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = action.payload;
    },
    setChargeCreditCardBit: (state, action) => {
      state.chargeCreditCardBit = action.payload;
    },
    setUnitPk: (state, action) => {
      state.unitPk = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setDispatchStatus: (state, action) => {
      state.dispatchStatus = action.payload;
    },
  },
});

export const {
  updateField,
  updateMultipleFields,
  resetFields,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setSaveData,
  setChangesCancelled,
  resetFormData,
  setChargeCreditCardBit,
  setUnitPk,
  setCompanyName,
  setDispatchStatus,
} = BulkInvoiceSlice.actions;
export default BulkInvoiceSlice.reducer;
