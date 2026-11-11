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
  sortType: false,
  sortValue: "",
  selectedId: null,
  saveData: [],
  unitSearchTerm: "",
  unitSearchCriteria: "Beginning",
  unitSortType: false,
  unitSortValue: "",
  unitChangeColor: false,
  unitFormData: [],
  unitListingData: [],
  unitPageNumber: 0,
  unitTotalPages: 0,
  unitTotalElements: 0,
  selectedUnitId: null,

  scanInvoicePayload: null,
  bulkUnitReimbursementFiles: {
    customerUploadFiles: [],
    companyUploadFiles: [],
    customerScanFiles: [],
    companyScanFiles: [],
  },
  detailsData: [],
  uploadActive: false,
  description: "",
  invoiceAmount: null,
  driverAmount: null,
};

const BulkUnitReimbursementSlice = createSlice({
  name: "BulkUnitReimbursementSlice",
  initialState,
  reducers: {
    updateField: (state, { payload }) => {
      const { field, value } = payload;
      if (field in state) {
        state[field] = value;
      }
    },
    updateMultipleFields: (state, { payload }) => {
      Object.entries(payload).forEach(([field, value]) => {
        if (field in state) {
          state[field] = value;
        }
      });
    },

    resetFields: (state) => {
      Object.assign(state, initialState);
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
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
    setUnitPageNumber: (state, action) => {
      state.unitPageNumber = action.payload;
    },
    setUnitSearchCriteria: (state, action) => {
      state.unitSearchCriteria = action.payload;
    },
    setUnitSearchTerm: (state, action) => {
      state.unitSearchTerm = action.payload;
    },
    setDetailsData: (state, action) => {
      // action.payload
      state.detailsData = { ...state.detailsData, ...action.payload };
    },
    setUploadActive: (state, action) => {
      state.uploadActive = action.payload;
    },
    setInvoiceAmount: (state, action) => {
      state.invoiceAmount = action.payload;
    },
    setDriverAmount: (state, action) => {
      state.driverAmount = action.payload;
    },

    resetState: () => initialState,

    setBulkUnitReimbursementFiles: (state, action) => {
      const { actionType, payload } = action.payload;
      // Define mapping for actionType to corresponding key in scanInvoiceFiles
      const keyMapping = {
        customerUploadFiles: "customerUploadFiles",
        companyUploadFiles: "companyUploadFiles",
        customerScanFiles: "customerScanFiles",
        companyScanFiles: "companyScanFiles",
      };

      // Get the correct key from the mapping
      const targetKey = keyMapping[actionType];
      if (targetKey) {
        state.bulkUnitReimbursementFiles[targetKey] = payload;
      }
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
  setUnitPageNumber,
  setUnitSearchCriteria,
  setUnitSearchTerm,
  setBulkUnitReimbursementFiles,
  setDetailsData,
  setUploadActive,
  resetState,
  setDescription,
  setDriverAmount,
  setInvoiceAmount,
} = BulkUnitReimbursementSlice.actions;
export default BulkUnitReimbursementSlice.reducer;
