import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const CustomerBulkInvoice = createSlice({
  name: "customerBulkInvoice",
  initialState: {
    // *searchfilter section
    searchType: "",
    // radioType: 'Beginning',
    // selectedValue: 'Beginning',
    searchCriteria: "Beginning",
    selecteActiveType: "All",
    customerData: [],
    searchTerms: "",
    loader: true,
    // add bulk invoice
    bulkInvoiceData: null,
    description: "",
    poNumber: "",
    projectCode: "",
    chargeCreditCard: false,
    invoiced: "",
    notes: "",
    creditCardNumber: "",
    creditCardExpirationDate: "",
    creditCardName: "",
    creditCardAddress: "",
    creditCardPostalCode: "",
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    //edit mode
    editModeRedux: false,
    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,

    //selected id
    selectedId: "",
    isCardValid: "",
    checkZip: "",
    cardNumber: "",
    isConfiguredCustomer: false,
    checkCardUnique: "",
    isInvalidDate: false,
    checkDesExist: "",
    checkProCodeExist: "",
    isNormalZipValid: true,
    isCanadianZipValid: true,
    cvv: "",
    unMaskedCreditCardNumber: "",

    dateErr: false,
  },
  reducers: {
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setDateErr: (state, action) => {
      state.dateErr = action.payload;
    },
    setRadioType: (state, action) => {
      state.radioType = action.payload;
    },
    setCustomerData: (state, actions) => {
      state.customerData = actions.payload;
    },
    setSearchCriteria: (state, actions) => {
      state.searchCriteria = actions.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setSelecteActiveType: (state, action) => {
      state.selecteActiveType = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSelectedValue: (state, action) => {
      state.selectedValue = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    // add bulk invoice
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setEditBulkInvoice: (state, action) => {
      state.bulkInvoiceData = action.payload;
    },

    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setPoNumber: (state, action) => {
      state.poNumber = action.payload;
    },

    setProjectCode: (state, action) => {
      state.projectCode = action.payload;
    },
    setChargeCreditCard: (state, action) => {
      state.chargeCreditCard = action.payload;
    },
    setInvoiced: (state, action) => {
      state.invoiced = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setCreditCardNumber: (state, action) => {
      state.creditCardNumber = action.payload;
    },
    setCreditCardExpirationDate: (state, action) => {
      state.creditCardExpirationDate = action.payload;
    },
    setCreditCardName: (state, action) => {
      state.creditCardName = action.payload;
    },
    setCreditCardAddress: (state, action) => {
      state.creditCardAddress = action.payload;
    },
    setCreditCardPostalCode: (state, action) => {
      state.creditCardPostalCode = action.payload;
    },

    // edit mode

    setEditModeRedux: (state, action) => {
      state.editModeRedux = action.payload;
    },
    //selected id

    setSelectedIdInvoice: (state, action) => {
      state.selectedId = action.payload;
    },
    setCheckZip: (state, action) => {
      state.checkZip = action.payload;
    },
    setCardNumber: (state, action) => {
      state.cardNumber = action.payload;
    },
    setIsConfiguredCustomer: (state, action) => {
      state.isConfiguredCustomer = action.payload;
    },
    // pagination

    setPageNumberInvoice: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalPagesInvoice: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElementsInvoice: (state, action) => {
      state.totalElements = action.payload;
    },
    setIsCardValid: (state, action) => {
      state.isCardValid = action.payload;
    },
    setCheckCardUnique: (state, action) => {
      state.checkCardUnique = action.payload;
    },

    setIsInvalidDate: (state, action) => {
      state.isInvalidDate = action.payload;
    },

    setCheckDesExist: (state, action) => {
      state.checkDesExist = action.payload;
    },

    setCheckProCodeExist: (state, action) => {
      state.checkProCodeExist = action.payload;
    },

    setIsNormalZipValid: (state, action) => {
      state.isNormalZipValid = action.payload;
    },

    setIsCanadianZipValid: (state, action) => {
      state.isCanadianZipValid = action.payload;
    },

    resetFiels: (state) => {
      state.description = "";
      state.poNumber = "";
      state.projectCode = "";
      state.creditCardName = "";
      state.cardNumber = "";
      state.creditCardExpirationDate = "";
      state.creditCardAddress = "";
      state.creditCardPostalCode = "";
      state.cvv = "";
      state.unMaskedCreditCardNumber = "";
      state.dateErr = false;
    },
    setCVV: (state, { payload }) => {
      state.cvv = payload;
    },
    setUnMaskedCreditCardNumber: (state, { payload }) => {
      state.unMaskedCreditCardNumber = payload;
    },
  },
});

export const {
  setSearchType,
  setPageNumber,
  setCustomerData,
  setRadioType,
  setSearchTerms,
  setNormalSortValue,
  setNormalSortFlag,
  // add bulk invoice
  setEditBulkInvoice,
  setDescription,
  setPoNumber,
  setProjectCode,
  setNotes,
  setInvoiced,
  setSelectedValue,
  setChargeCreditCard,
  setCreditCardAddress,
  setCreditCardExpirationDate,
  setCreditCardNumber,
  setCreditCardPostalCode,
  setCreditCardName,
  // edit mode
  setSelecteActiveType,
  setEditModeRedux,
  setLoader,
  //seleted id
  setSearchCriteria,
  setSelectedIdInvoice,
  setPageNumberInvoice,
  setTotalElementsInvoice,
  setTotalPagesInvoice,
  setCheckZip,
  setCardNumber,
  setIsConfiguredCustomer,
  setIsCardValid,
  setCheckCardUnique,
  setIsInvalidDate,
  resetFiels,
  setCheckDesExist,
  setCheckProCodeExist,
  setIsNormalZipValid,
  setIsCanadianZipValid,
  setCVV,
  setUnMaskedCreditCardNumber,
  setDateErr,
} = CustomerBulkInvoice.actions;

export default CustomerBulkInvoice.reducer;
