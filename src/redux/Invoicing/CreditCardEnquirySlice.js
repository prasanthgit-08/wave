import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unitNumberInput: "",
  unitNumberPK: "",
  pageNumber: 0,
  totalPages: 0,
  totalElements: 0,
  pageNumberView: 0,
  totalPagesView: 0,
  totalElementsView: 0,
  selectedId: null,
  selectedIdTab2: null,
  unitNumberLast5: "",
  creditCardEnquiryList: [],
  creditCardEnquiryView: [],
  loading: true,
  loadingView: true,
  invoiceNumber: "",
  cclast4: "",
  searchCriteria: "",
  searchTerm: "",
  selectedPK: null,
  selectedInvoiceNo: null,
  showWarning: false,
  pageNumberAuto: 0,
};

const CreditCardEnquirySlice = createSlice({
  name: "CreditCardEnquirySlice",
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
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPageNumberView: (state, action) => {
      state.pageNumberView = action.payload;
    },
    setCreditCardEnquiryView: (state, action) => {
      state.creditCardEnquiryView = action.payload;
    },
  },
});

export const {
  updateField,
  updateMultipleFields,
  resetFields,
  setPageNumber,
  setPageNumberView,
  setCreditCardEnquiryView,
} = CreditCardEnquirySlice.actions;

export default CreditCardEnquirySlice;
