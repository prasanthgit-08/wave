import { createSlice } from "@reduxjs/toolkit";

const CompanySlice = createSlice({
  name: "Company",

  initialState: {
    companyPK: null,
    companyData: null,
    viewDetail: true,
    editFormData: null,
    pageNumber: 0,
    companyCity: "",
    companyStatecode: "",
    companyCanadian: false,
    companyPostcode: "",
    saveCompanyObject: null,
    isGeneralTabValid: false,
    isSwitchesTabValid: false,
    isDriverTabValid: false,
    isNextsTabValid: false,
    isBonusesTabValid: false,
    isDefaultsTabValid: false,
    isUsersTabValid: false,
    currentTab: "general",
    onCancel: false,
    postalCodeOnChange: false,
    allDriversPayTaxable: false,
    reimbursementPrinterName: "",
    reimbursementPrinterId: null,
    nextReimbursmentCheckNumber: "",
    towableBonusProgram: false,
    loading: false,
    haltInvoicing: false,
    chargeEfee: false,
  },

  reducers: {
    setCompanyPK: (state, action) => {
      state.companyPK = action.payload;
    },
    setCompanyData: (state, action) => {
      state.companyData = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setCompanyCity: (state, action) => {
      state.companyCity = action.payload;
    },
    setCompanyStatecode: (state, action) => {
      state.companyStatecode = action.payload;
    },
    setCompanyCanedian: (state, action) => {
      state.companyCanadian = action.payload;
    },
    setCompanyPostcode: (state, action) => {
      state.companyPostcode = action.payload;
    },
    setSaveCompanyObject: (state, { payload }) => {
      state.saveCompanyObject = { ...state.saveCompanyObject, ...payload };
    },
    setIsGeneralTabValid: (state, action) => {
      state.isGeneralTabValid = action.payload;
    },
    setIsSwitchesTabValid: (state, action) => {
      state.isSwitchesTabValid = action.payload;
    },
    setIsDriverTabValid: (state, action) => {
      state.isDriverTabValid = action.payload;
    },
    setIsNextsTabValid: (state, action) => {
      state.isNextsTabValid = action.payload;
    },
    setIsBonusesTabValid: (state, action) => {
      state.isBonusesTabValid = action.payload;
    },
    setIsDefaultsTabValid: (state, action) => {
      state.isDefaultsTabValid = action.payload;
    },
    setIsUsersTabValid: (state, action) => {
      state.isUsersTabValid = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setPostalCodeOnChange: (state, action) => {
      state.postalCodeOnChange = action.payload;
    },
    setAllDriversPayTaxable: (state, action) => {
      state.allDriversPayTaxable = action.payload;
    },
    setReimbursementPrinterName: (state, action) => {
      state.reimbursementPrinterName = action.payload;
    },
    setReimbursementPrinterId: (state, action) => {
      state.reimbursementPrinterId = action.payload;
    },
    setNextReimbursmentCheckNumber: (state, action) => {
      state.nextReimbursmentCheckNumber = action.payload;
    },
    setTowableBonusProgram: (state, action) => {
      state.towableBonusProgram = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setHaltInvoicing: (state, action) => {
      state.haltInvoicing = action.payload;
    },
    setChargeEfee: (state, action) => {
      state.chargeEfee = action.payload;
    },
  },
});

export const {
  setCompanyPK,
  setCompanyData,
  setViewDetail,
  setEditFormData,
  setPageNumber,
  setCompanyCity,
  setCompanyStatecode,
  setCompanyCanedian,
  setCompanyPostcode,
  setSaveCompanyObject,
  setIsGeneralTabValid,
  setIsSwitchesTabValid,
  setIsDriverTabValid,
  setIsNextsTabValid,
  setIsBonusesTabValid,
  setIsDefaultsTabValid,
  setIsUsersTabValid,
  setCurrentTab,
  setOnCancel,
  setPostalCodeOnChange,
  setAllDriversPayTaxable,
  setReimbursementPrinterId,
  setReimbursementPrinterName,
  setNextReimbursmentCheckNumber,
  setTowableBonusProgram,
  setLoading,
  setHaltInvoicing,
  setChargeEfee,
} = CompanySlice.actions;

export default CompanySlice.reducer;
