import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { createSlice } from "@reduxjs/toolkit";
import { formatForApi } from "../utils/dateUtils";

// yesterday as a local YYYY-MM-DD (toISOString would give the UTC day)
const yesterday = () => formatForApi(new Date(new Date().setDate(new Date().getDate() - 1)));

const PayDebitcardInvoiceSlice = createSlice({
  name: "PayDebitcardInvoice",
  initialState: {
    saveData: null,
    processFlag: false,
    saveFlag: false,
    driverpayCheckNumber: "",
    reimbursementCheckNumber: "",
    debitcardIssuedId: "",
    invoiceNumber: "",
    driverPay: "",
    reimbursement: "",
    debitcardIssuedInput: "",
    postedDate: yesterday(),
  },
  reducers: {
    setSaveData: (state, action) => {
      state.saveData = action.payload;
    },
    setProcessFlag: (state, action) => {
      state.processFlag = action.payload;
    },
    setSaveFlag: (state, action) => {
      state.saveFlag = action.payload;
    },

    setDriverpayCheckNumber: (state, action) => {
      state.driverpayCheckNumber = action.payload;
    },

    setReimbursementCheckNumber: (state, action) => {
      state.reimbursementCheckNumber = action.payload;
    },
    setDebitcardIssuedId: (state, action) => {
      state.debitcardIssuedId = action.payload;
    },

    setDebitcardIssuedInput: (state, action) => {
      state.debitcardIssuedInput = action.payload;
    },
    setDriverPay: (state, action) => {
      state.driverPay = action.payload;
    },

    setReimbursement: (state, action) => {
      state.reimbursement = action.payload;
    },
    setPostedDate: (state, action) => {
      state.postedDate = action.payload;
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },

    resetChanges: (state, action) => {
      state.driverPay = false;
      state.invoiceNumber = "";
      state.reimbursementCheckNumber = "";
      state.postedDate = yesterday();
      state.debitcardIssuedId = "";
      state.debitcardIssuedInput = "";
      state.driverpayCheckNumber = false;

      state.reimbursement = "";
    },
  },
});
export const {
  setSaveData,
  setProcessFlag,
  setSaveFlag,
  setDriverpayCheckNumber,
  setReimbursementCheckNumber,
  setDebitcardIssuedId,
  setDebitcardIssuedInput,
  setReimbursement,
  setDriverPay,
  setPostedDate,
  setInvoiceNumber,
  resetChanges,
} = PayDebitcardInvoiceSlice.actions;

export default PayDebitcardInvoiceSlice.reducer;
