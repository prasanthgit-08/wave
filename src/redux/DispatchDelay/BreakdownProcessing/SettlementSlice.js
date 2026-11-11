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
  sortTypeFeeTab: false,
  sortValueFeeTab: null,
  selectedId: null,
  saveData: [],
  resetForm: false,
  chargeCreditCardBit: false,

  generalTabData: [],
  delayedUnitBreakDownFK: null,
  companyName: "",
  generalTabFormData: [],
  feeData: [],
  delayedUnitExpensePK: null,
  defaultTab: "",
  isDataLoaded: false,
};

const SettlementSlice = createSlice({
  name: "SettlementSlice",
  initialState,
  reducers: {
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
    setGeneralTabData: (state, action) => {
      state.generalTabData = action.payload;
    },
    setDelayedUnitBreakDownFK: (state, action) => {
      state.delayedUnitBreakDownFK = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setGeneralTabFormData: (state, action) => {
      state.generalTabFormData = action.payload;
    },
    setSortTypeFeeTab: (state, action) => {
      state.sortTypeFeeTab = action.payload;
    },
    setSortValueFeeTab: (state, action) => {
      state.sortValueFeeTab = action.payload;
    },
    setFeeData: (state, action) => {
      state.feeData = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setDelayedUnitExpensePK: (state, action) => {
      state.delayedUnitExpensePK = action.payload;
    },
    setDefaultTab: (state, action) => {
      state.defaultTab = action.payload;
    },
    setIsDataLoaded: (state, action) => {
      state.isDataLoaded = action.payload;
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
  setGeneralTabData,
  setDelayedUnitBreakDownFK,
  setCompanyName,
  setGeneralTabFormData,
  setSortTypeFeeTab,
  setSortValueFeeTab,
  setFeeData,
  setTotalPages,
  setTotalElements,
  setDelayedUnitExpensePK,
  setDefaultTab,
  setIsDataLoaded,
} = SettlementSlice.actions;
export default SettlementSlice.reducer;
