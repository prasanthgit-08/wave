import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const CustomerEmailMaintenanceSlice = createSlice({
  name: "customerEmailMaintenanceSlice",
  initialState: {
    name: "",
    email: "",
    searchTerms: "",
    searchCriteria: "Beginning",
    customerFK: "",
    reportsAsText: false,
    reportsAsExcel: false,
    reportsAsPDF: false,
    reportsAsCSV: false,
    unassignedUnitsReport: false,
    unassignedUnitsOutbound: false,
    unassignedUnitsReload: false,
    unassignedUnitsShippersOnly: false,
    unassignedUnitsStorageOnly: false,
    yardExitReport: false,
    onRoadReport: false,
    deliveredUnitsReport: false,
    unitInventoryMaster: false,
    invoiceDays: "",
    bolAtOrderEntry: false,
    bolAtOrderEntryDPU: false,
    bolBatchAtExitOrderEntry: false,
    bolBatchDaily: false,
    bolAtDispatch: false,
    copyOfPAPS: false,
    dispatchUpdates: false,
    deliveryOnly: false,
    dispatchOnly: false,
    returnedUpdates: false,
    specialCodeFK: null,
    defaultSpecialCodeInput: "",
    breakdowns: false,
    damaged: false,
    dispatchDelays: false,
    shuttleDelays: false,
    invoices: false,
    invoiceBOLOnly: false,
    invoiceDAFOnly: false,
    statements: false,
    creditCardCharges: false,
    dispatchTabColor: "",

    // editmode
    editMode: false,

    // tabcolor

    detailsTabValid: true,
    reportsTabValid: true,
    dispatchTabValid: true,
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    //mailValidation
    checkEmailDataValid: "",
    isMailValid: "",

    // rowid

    selectedId: "",

    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
  },
  reducers: {
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setNameRedux: (state, action) => {
      state.name = action.payload;
    },

    setEmailRedux: (state, action) => {
      state.email = action.payload;
    },

    // pagination

    setPageNumberEmail: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setDispatchTabColor: (state, action) => {
      state.dispatchTabColor = action.payload;
    },
    setDispatchTabValid: (state, action) => {
      state.dispatchTabValid = action.payload;
    },
    setCustomerFKRedux: (state, action) => {
      state.customerFK = action.payload;
    },
    setReportsAsText: (state, action) => {
      state.reportsAsText = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setReportsAsExcel: (state, action) => {
      state.reportsAsExcel = action.payload;
    },

    setReportsAsPDF: (state, action) => {
      state.reportsAsPDF = action.payload;
    },

    setReportsAsCSV: (state, action) => {
      state.reportsAsCSV = action.payload;
    },
    setUnassignedUnitsReport: (state, action) => {
      state.unassignedUnitsReport = action.payload;
    },
    setUnassignedUnitsOutbound: (state, action) => {
      state.unassignedUnitsOutbound = action.payload;
    },

    setUnassignedUnitsReload: (state, action) => {
      state.unassignedUnitsReload = action.payload;
    },
    setUnassignedUnitsShippersOnly: (state, action) => {
      state.unassignedUnitsShippersOnly = action.payload;
    },
    setUnassignedUnitsStorageOnly: (state, action) => {
      state.unassignedUnitsStorageOnly = action.payload;
    },

    setYardExitReport: (state, action) => {
      state.yardExitReport = action.payload;
    },
    setOnRoadReport: (state, action) => {
      state.onRoadReport = action.payload;
    },
    setDeliveredUnitsReport: (state, action) => {
      state.deliveredUnitsReport = action.payload;
    },
    setunitInventoryMaster: (state, action) => {
      state.unitInventoryMaster = action.payload;
    },
    setinvoiceDays: (state, action) => {
      state.invoiceDays = action.payload;
    },
    setBolAtOrderEntry: (state, action) => {
      state.bolAtOrderEntry = action.payload;
    },

    setBolAtOrderEntryDPU: (state, action) => {
      state.bolAtOrderEntryDPU = action.payload;
    },

    setBolBatchAtExitOrderEntry: (state, action) => {
      state.bolBatchAtExitOrderEntry = action.payload;
    },
    setbolBatchDaily: (state, action) => {
      state.bolBatchDaily = action.payload;
    },
    setbolAtDispatch: (state, action) => {
      state.bolAtDispatch = action.payload;
    },
    setCopyOfPAPS: (state, action) => {
      state.copyOfPAPS = action.payload;
    },
    setDispatchUpdates: (state, action) => {
      state.dispatchUpdates = action.payload;
    },
    setDeliveryOnly: (state, action) => {
      state.deliveryOnly = action.payload;
    },
    setDispatchOnly: (state, action) => {
      state.dispatchOnly = action.payload;
    },
    setReturnedUpdates: (state, action) => {
      state.returnedUpdates = action.payload;
    },
    setSpecialCodeFK: (state, action) => {
      state.specialCodeFK = action.payload;
    },

    setDefaultSpecialCodeInput: (state, action) => {
      state.defaultSpecialCodeInput = action.payload;
    },
    setBreakdowns: (state, action) => {
      state.breakdowns = action.payload;
    },
    setDamaged: (state, action) => {
      state.damaged = action.payload;
    },
    setDispatchDelays: (state, action) => {
      state.dispatchDelays = action.payload;
    },
    setShuttleDelays: (state, action) => {
      state.shuttleDelays = action.payload;
    },
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    setInvoiceBOLOnly: (state, action) => {
      state.invoiceBOLOnly = action.payload;
    },
    setInvoiceDAFOnly: (state, action) => {
      state.invoiceDAFOnly = action.payload;
    },
    setStatements: (state, action) => {
      state.statements = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setCreditCardCharges: (state, action) => {
      state.creditCardCharges = action.payload;
    },

    setReportsTabValid: (state, action) => {
      state.reportsTabValid = action.payload;
    },
    setDetailsTabValid: (state, action) => {
      state.detailsTabValid = action.payload;
    },
    setCheckEmailDataValid: (state, action) => {
      state.checkEmailDataValid = action.payload;
    },
    setIsMailValid: (state, action) => {
      state.isMailValid = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const {
  setEditMode,
  setNameRedux,
  setEmailRedux,
  setCustomerFKRedux,
  setReportsAsCSV,
  setReportsAsExcel,
  setReportsAsPDF,
  setReportsAsText,
  setUnassignedUnitsReport,
  setUnassignedUnitsOutbound,
  setUnassignedUnitsReload,
  setUnassignedUnitsShippersOnly,
  setUnassignedUnitsStorageOnly,
  setYardExitReport,
  setOnRoadReport,
  setNormalSortValue,
  setNormalSortFlag,
  setDeliveredUnitsReport,
  setunitInventoryMaster,
  setinvoiceDays,
  setBolAtOrderEntry,
  setBolAtOrderEntryDPU,
  setBolBatchAtExitOrderEntry,
  setbolBatchDaily,
  setbolAtDispatch,
  setCopyOfPAPS,
  setDispatchUpdates,
  setDeliveryOnly,
  setDispatchOnly,
  setReturnedUpdates,
  setSpecialCodeFK,
  setDefaultSpecialCodeInput,
  setBreakdowns,
  setDamaged,
  setDispatchDelays,
  setShuttleDelays,
  setInvoices,
  setInvoiceBOLOnly,
  setInvoiceDAFOnly,
  setStatements,
  setCreditCardCharges,
  setSearchTerms,
  setSearchCriteria,
  setDispatchTabColor,
  setDispatchTabValid,
  //tab valid

  setReportsTabValid,
  setDetailsTabValid,

  // mailvalid
  setCheckEmailDataValid,
  setIsMailValid,

  //setID
  setSelectedId,

  //pagination
  setPageNumberEmail,
  setTotalElements,
  setTotalPages,
} = CustomerEmailMaintenanceSlice.actions;

export default CustomerEmailMaintenanceSlice.reducer;
