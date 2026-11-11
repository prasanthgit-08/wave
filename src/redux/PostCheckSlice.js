import { createSlice } from "@reduxjs/toolkit";

const PostCheckSlice = createSlice({
  name: "printerFilter",

  initialState: {
    taxable: false,
    reimbursement: false,
    taxableBeginningDate: "",
    taxableEndingDate: "",
    taxableBeginningCheckNumber: "",
    taxableEndingCheckNumber: "",
    taxableTotalAmount: "",
    taxablePrintBatch: false,
    taxableEmailBatchAsPDF: false,
    taxableEmailBatchAsExcel: false,
    reimbursementBeginningDate: "",
    reimbursementEndingDate: "",
    reimbursementBeginningCheckNumber: "",
    reimbursementEndingCheckNumber: "",
    reimbursementTotalAmount: "",
    reimbursementPrintBatch: false,
    reimbursementEmailBatchAsPDF: false,
    reimbursementEmailBatchAsExcel: false,
    editData: null,
    saveFlag: true,
  },
  reducers: {
    setTaxable: (state, action) => {
      state.taxable = action.payload;
    },
    setReimbursement: (state, action) => {
      state.reimbursement = action.payload;
    },

    setTaxableBeginningCheckNumber: (state, action) => {
      state.taxableBeginningCheckNumber = action.payload;
    },
    setTaxableEndingCheckNumber: (state, action) => {
      state.taxableEndingCheckNumber = action.payload;
    },
    setTaxableTotalAmount: (state, action) => {
      state.taxableTotalAmount = action.payload;
    },

    setTaxableBeginningDate: (state, action) => {
      state.taxableBeginningDate = action.payload;
    },
    setTaxableEndingDate: (state, action) => {
      state.taxableEndingDate = action.payload;
    },
    setTaxablePrintBatch: (state, action) => {
      state.taxablePrintBatch = action.payload;
    },
    setTaxableEmailBatchAsPDF: (state, action) => {
      state.taxableEmailBatchAsPDF = action.payload;
    },
    setTaxableEmailBatchAsExcel: (state, action) => {
      state.taxableEmailBatchAsExcel = action.payload;
    },

    setReimbursementBeginningCheckNumber: (state, action) => {
      state.reimbursementBeginningCheckNumber = action.payload;
    },
    setReimbursementEndingCheckNumber: (state, action) => {
      state.reimbursementEndingCheckNumber = action.payload;
    },
    setReimbursementTotalAmount: (state, action) => {
      state.reimbursementTotalAmount = action.payload;
    },

    setReimbursementBeginningDate: (state, action) => {
      state.reimbursementBeginningDate = action.payload;
    },
    setReimbursementEndingDate: (state, action) => {
      state.reimbursementEndingDate = action.payload;
    },
    setReimbursementPrintBatch: (state, action) => {
      state.reimbursementPrintBatch = action.payload;
    },
    setReimbursementEmailBatchAsPDF: (state, action) => {
      state.reimbursementEmailBatchAsPDF = action.payload;
    },
    setReimbursementEmailBatchAsExcel: (state, action) => {
      state.reimbursementEmailBatchAsExcel = action.payload;
    },
    setEditData: (state, action) => {
      state.editData = action.payload;
    },
    setSaveFlag: (state, action) => {
      state.saveFlag = action.payload;
    },
    resetChanges: (state, action) => {
      state.taxable = false;
      state.taxableBeginningCheckNumber = "";
      state.taxableBeginningDate = "";
      state.taxableEndingCheckNumber = "";
      state.taxableEndingCheckNumber = "";
      state.taxableEmailBatchAsPDF = false;
      state.taxableEmailBatchAsExcel = false;
      state.taxablePrintBatch = false;
      state.taxableTotalAmount = "";
      state.editData = null;

      state.reimbursement = false;
      state.reimbursementBeginningCheckNumber = "";
      state.reimbursementBeginningDate = "";
      state.reimbursementEndingCheckNumber = "";
      state.reimbursementEndingCheckNumber = "";
      state.reimbursementEmailBatchAsPDF = false;
      state.reimbursementEmailBatchAsExcel = false;
      state.reimbursementPrintBatch = false;
      state.reimbursementTotalAmount = "";
    },
  },
});

export const {
  setTaxable,
  setTaxableBeginningCheckNumber,
  setTaxableEndingCheckNumber,
  setTaxableBeginningDate,
  setTaxableEndingDate,
  setTaxableTotalAmount,
  setTaxablePrintBatch,
  setTaxableEmailBatchAsExcel,
  setTaxableEmailBatchAsPDF,

  setReimbursement,
  setReimbursementBeginningCheckNumber,
  setReimbursementEndingCheckNumber,
  setReimbursementBeginningDate,
  setReimbursementEndingDate,
  setReimbursementTotalAmount,
  setReimbursementPrintBatch,
  setReimbursementEmailBatchAsExcel,
  setReimbursementEmailBatchAsPDF,
  setEditData,
  setSaveFlag,
  resetChanges,
} = PostCheckSlice.actions;

export default PostCheckSlice.reducer;
