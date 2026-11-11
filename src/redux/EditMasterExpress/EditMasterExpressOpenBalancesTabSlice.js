import { createSlice } from "@reduxjs/toolkit";

const EditMasterExpressOpenBalancesTabSlice = createSlice({
  name: "EditMasterExpressOpenBalancesTabSlice",
  initialState: {
    openBalancesArrayList: [],
    unitOpenBalanceData: null,
    appliedAmountSum: 0,
    isOpenBalanceValid: false,
    isOpenBalancesDetailsInComplete: false,
    isOpenBalancesDetailsPartial: false,
    remainingAmt: 0,
    dupLoadForOpenBal: false,
    chargePerUnit: 0, //inbvoice of a single unit
    isSaving: false,
    enableAppliedAmount: false,
    appliedAmount: 0,
    selectedAppliedAmount: 0,
    invoiceAmountForOpenBalances: 0,
    invoiceAmount: 0,
    changeColor: false,
    clickedOpenBalancesWarningYes: false,
    previouslySelectedCustomerOpenBalanceIdList: [],
  },
  reducers: {
    setUnitOpenBalanceData: (state, action) => {
      state.unitOpenBalanceData = action.payload;
    },
    setAppliedAmountSum: (state, action) => {
      state.appliedAmountSum = parseFloat(state.appliedAmountSum) + parseFloat(action.payload);
    },
    setIsOpenBalanceValid: (state, action) => {
      state.isOpenBalanceValid = action.payload;
    },
    setOpenBalancesArrayList: (state, action) => {
      const { actionType, payload } = action.payload || {};

      if (actionType === "set") {
        state.openBalancesArrayList = payload || [];
      }

      if (actionType === "update") {
        const index = state.openBalancesArrayList.findIndex(
          (item) => item.openBalancePK === payload.openBalancePK
        );
        if (index !== -1) {
          state.openBalancesArrayList[index] = { ...state.openBalancesArrayList[index], ...payload };
        }
      }

      if (actionType === "clear") {
        state.openBalancesArrayList = [];
      }
    },

    setIsOpenBalancesDetailsInComplete: (state, action) => {
      state.isOpenBalancesDetailsInComplete = action.payload;
    },

    setisOpenBalancesDetailsPartial: (state, action) => {
      state.isOpenBalancesDetailsPartial = action.payload;
    },

    setUpdatOpenBalanceArray: (state, action) => {
      state.openBalancesArrayList = action.payload;
    },
    resetChangesOpenBalance: (state, action) => {
      state.openBalancesArrayList = [];
      state.unitOpenBalanceData = null;
    },
    setRemainingAmt: (state, action) => {
      state.remainingAmt = action.payload;
    },
    setDupLoadForOpenBal: (state, action) => {
      state.dupLoadForOpenBal = action.payload;
    },
    setChargePerUnit: (state, action) => {
      state.chargePerUnit = action.payload;
    },
    setIsSaving: (state, action) => {
      state.isSaving = action.payload;
    },
    setEnableAppliedAmount: (state, action) => {
      state.enableAppliedAmount = action.payload;
    },
    setAppliedAmount: (state, action) => {
      state.appliedAmount = action.payload;
    },
    setSelectedAppliedAmount: (state, action) => {
      state.selectedAppliedAmount = action.payload;
    },
    setInvoiceAmountForOpenBalances: (state, action) => {
      state.invoiceAmountForOpenBalances = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setClickedOpenBalancesWarningYes: (state, action) => {
      state.clickedOpenBalancesWarningYes = action.payload;
    },
    setPreviouslySelectedCustomerOpenBalanceIdList: (state, action) => {
      state.previouslySelectedCustomerOpenBalanceIdList = action.payload;
    },
  },
});

export const {
  setUnitOpenBalanceData,
  setAppliedAmountSum,
  setIsOpenBalanceValid,
  setIsOpenBalancesDetailsInComplete,
  setisOpenBalancesDetailsPartial,
  setOpenBalancesArrayList,
  setUpdatOpenBalanceArray,
  resetChangesOpenBalance,
  setRemainingAmt,
  setDupLoadForOpenBal,
  setChargePerUnit,
  setIsSaving,
  setEnableAppliedAmount,
  setAppliedAmount,
  setSelectedAppliedAmount,
  setInvoiceAmountForOpenBalances,
  setChangeColor,
  setClickedOpenBalancesWarningYes,
  setPreviouslySelectedCustomerOpenBalanceIdList,
} = EditMasterExpressOpenBalancesTabSlice.actions;

export default EditMasterExpressOpenBalancesTabSlice.reducer;
