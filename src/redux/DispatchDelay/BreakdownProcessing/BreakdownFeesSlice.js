import React from "react";

import { createSlice } from "@reduxjs/toolkit";
const BreakdownFeesSlice = createSlice({
  name: "BreakdownFees",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    changeColor: false,
    browseData: [],
    normalSortValue: null,
    normalSortFlag: false,
    resetFlag: false,
    description: "",
    driverAmount: "",
    invoiceAmount: "",
    pay: false,
    reimbursement: false,
    invoiced: false,
    radioValue: "Pay",
    dealayUnitFeeId: null,
    editMode: false,
    enableSave: false,
    selectedIndex: null,
    checkDescriptionExist: false,
    company: "",
    editFlag: false,
    disableSave: false,
    allDriversPayTaxable: "",
    displayFlag: false,
    feeData: [],
    feeDriverFK: null,
    isLoading: false,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setBrowseData: (state, action) => {
      state.browseData = action.payload;
    },

    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setInvoiceAmount: (state, action) => {
      state.invoiceAmount = action.payload;
    },
    setDriverAmount: (state, action) => {
      state.driverAmount = action.payload;
    },
    setPay: (state, action) => {
      state.pay = action.payload;
    },
    setReimbursement: (state, action) => {
      state.reimbursement = action.payload;
    },
    setInvoiced: (state, action) => {
      state.invoiced = action.payload;
    },
    setRadioValue: (state, action) => {
      state.radioValue = action.payload;
    },
    setDealayUnitFeeId: (state, action) => {
      state.dealayUnitFeeId = action.payload;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setEnableSave: (state, action) => {
      state.enableSave = action.payload;
    },
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
    setCheckDescriptionExist: (state, action) => {
      state.checkDescriptionExist = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setEditFlag: (state, action) => {
      state.editFlag = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setAllDriversPayTaxable: (state, action) => {
      state.allDriversPayTaxable = action.payload;
    },
    setDisplayFlag: (state, action) => {
      state.displayFlag = action.payload;
    },
    setFeeData: (state, action) => {
      state.feeData = action.payload;
    },
    setFeeDriverFK: (state, action) => {
      state.feeDriverFK = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetChanges: (state, action) => {
      state.description = "";
      state.invoiceAmount = "";
      state.driverAmount = "";
      state.radioValue = "Pay";
      state.invoiced = false;
      state.reimbursement = false;
      state.checkDescriptionExist = false;
    },
    resetSearchFilter: (state, action) => {
      state.totalElements = 0;
      state.totalPages = 0;
      state.pageNumber = 0;
      state.normalSortFlag = false;
      state.normalSortValue = null;
      //   state.changeColor=false
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setBrowseData,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setDescription,
  setDriverAmount,
  setInvoiceAmount,
  setPay,
  setReimbursement,
  setInvoiced,
  setRadioValue,
  setDealayUnitFeeId,
  setEditMode,
  setEnableSave,
  setSelectedIndex,
  resetSearchFilter,
  resetChanges,
  setCompany,
  setEditFlag,
  setDisableSave,
  setAllDriversPayTaxable,
  setCheckDescriptionExist,
  setDisplayFlag,
  setFeeData,
  setFeeDriverFK,
  setIsLoading,
} = BreakdownFeesSlice.actions;

export default BreakdownFeesSlice.reducer;
