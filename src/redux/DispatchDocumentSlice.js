import { createSlice } from "@reduxjs/toolkit";

const DispatchDocumentSlice = createSlice({
  name: "dispatchDocuments",
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

    resetDispatchDocument: (state) => {
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.loader = true;
      state.sortValue = null;
      state.sortFlag = false;
      state.companyFK = null;
      state.selectedId = null;
    },
  },
});
export const {
  setListingData,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  resetDispatchDocument,
  setCompanyFK,
  setLoader,
  setDisptchDocumentData,
  setSortValue,
  setSortFlag,
  setSelectedId,
} = DispatchDocumentSlice.actions;

export default DispatchDocumentSlice.reducer;
