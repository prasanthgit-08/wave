import { createSlice, current } from "@reduxjs/toolkit";

const PurgeDamageReturnUnitsSlice = createSlice({
  name: "purgeDamageReturnUnits",
  initialState: {
    listingData: [],
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    loader: true,
    companyFK: null,
    disptchDocumentData: [],
    sortValue: null,
    sortFlag: false,
    selectedId: null,
    unitNumberLast5: "",
    unitNumberInput: "",
    selectId: null,
    unitNumberPK: null,
    unitsLoading: true,
    unitDetails: [],
    updateFlag: 0,
    spResponseData: 0,
    selectionType: "BROWSE",
    navigateByNextButton: false,
    currentCompanyName: "",
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
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
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setCompanyFK: (state, action) => {
      state.companyFK = action.payload;
    },
    setDisptchDocumentData: (state, action) => {
      state.disptchDocumentData = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setUnitNumberLast5: (state, action) => {
      state.unitNumberLast5 = action.payload;
    },
    setUnitNumberInput: (state, action) => {
      state.unitNumberInput = action.payload;
    },
    setSelectId: (state, action) => {
      state.selectId = action.payload;
    },
    setUnitNumberPK: (state, action) => {
      state.unitNumberPK = action.payload;
    },
    setUnitsLoading: (state, action) => {
      state.unitsLoading = action.payload;
    },
    setUnitDetails: (state, action) => {
      state.unitDetails = action.payload;
    },
    setUpdateFlag: (state, action) => {
      state.updateFlag = action.payload;
    },
    setSpResponseData: (state, action) => {
      state.spResponseData = action.payload;
    },
    setSelectionType: (state, action) => {
      state.selectionType = action.payload;
    },
    setNavigateByNextButton: (state, action) => {
      state.navigateByNextButton = action.payload;
    },
    setCurrentCompanyName: (state, action) => {
      state.currentCompanyName = action.payload;
    },

    resetPurgeDamage: (state) => {
      state.spResponseData = 0;
      state.updateFlag = 0;
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.loader = true;
      state.sortValue = null;
      state.sortFlag = false;
      state.companyFK = null;
      state.selectedId = null;
      state.selectId = null;
      state.unitNumberLast5 = "";
      state.unitNumberPK = null;
      state.unitNumberInput = "";
      state.unitDetails = [];
      state.selectionType = "BROWSE";
      state.navigateByNextButton = false;
      state.companyFK = null;
      state.currentCompanyName = "";
    },

    resetPurgeClear: (state) => {
      state.updateFlag = 0;
      state.selectedId = null;
      state.selectId = null;
      state.selectionType = "BROWSE";
      state.navigateByNextButton = false;
    },
  },
});

export const {
  setListingData,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  resetPurgeDamage,
  setCompanyFK,
  setLoader,
  setDisptchDocumentData,
  setSortValue,
  setSortFlag,
  setSelectedId,
  setUnitNumberLast5,
  setUnitNumberInput,
  setSelectId,
  setUnitNumberPK,
  setUnitsLoading,
  setUnitDetails,
  setUpdateFlag,
  setSpResponseData,
  setSelectionType,
  setNavigateByNextButton,
  setCurrentCompanyName,
  resetPurgeClear,
} = PurgeDamageReturnUnitsSlice.actions;

export default PurgeDamageReturnUnitsSlice.reducer;
