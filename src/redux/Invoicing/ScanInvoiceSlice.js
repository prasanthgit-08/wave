import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  searchCriteria: "",
  totalPages: 0,
  totalElements: 0,
  pageNumber: 0,
  size: 0,
  localCompanyName: "",
  localCompanyId: null,
  cancelTrue: false,
  cancelChanges: false,
  selectedCompanyName: "",
  invoiceNumber: "",
  unitNumber: "",
  unitNumberLast5: "",
  unitNumberFK: null,
  nonUnitInvoiceNumber: "",
  nonUnitUnitnumber: "",
  nonUnitPONumber: "",
  unitNumberId: null,
  customerName: "",
  sortValue: "",
  sortType: false,

  // Non-unit screen
  nonUnitData: [],
  pageNumberNonUnit: 0,
  sizeNonUnit: 0,
  totalPagesNonUnit: 0,
  totalElementsNonUnit: 0,
  searchTermNonUnit: "",
  searchCriteriaNonUnit: "",
  selectedCustomerId: null,
  nonUnitSortValue: "",
  nonUnitSortType: false,
  // customerName: '',
  dealerName: "",
  dealerId: null,
  changeColour: false,
  nonUnitCancel: false,
  miscellaniousFlag: false,

  // Unit confirmation
  invoicePK: null,
  viewDetail: false,
  changeColor: false,
  invoiceById: [],
  invoiceByIdInitially: [],

  // Company details
  companyFK: null,
  companyName: "",

  // Browse page data
  invoiceData: [],
  // When refresh, for navigation
  // to unit selection screen
  unitSelectionReset: false,

  scanInvoicePayload: null,
  disableSave: true,
  scanInvoiceFiles: {
    customerUploadFiles: [],
    companyUploadFiles: [],
    bolUploadFiles: [],
    dafUploadFiles: [],
    iftaUploadFiles: [],
    breakdownUploadFiles: [],
    customerScanFiles: [],
    companyScanFiles: [],
    bolScanFiles: [],
    dafScanFiles: [],
    iftaScanFiles: [],
    breakdownScanFiles: [],
  },
};

const ScanInvoiceSlice = createSlice({
  name: "ScanInvoiceSlice",
  initialState,
  reducers: {
    updateField: (state, { payload }) => {
      const { field, value } = payload;
      if (field in state) {
        state[field] = value;
      }
    },
    resetFields: (state) => {
      Object.assign(state, initialState);
    },
    updateMultipleFields: (state, action) => {
      const fieldsToUpdate = action.payload;
      Object.entries(fieldsToUpdate).forEach(([field, value]) => {
        if (field in state) {
          state[field] = value;
        }
      });
    },
    toggleCancelChanges: (state) => {
      state.cancelChanges = !state.cancelChanges;
    },
    setPageNumber: (state, { payload }) => {
      state.pageNumber = payload;
    },
    setPageNumberNonUnit: (state, { payload }) => {
      state.pageNumberNonUnit = payload;
    },
    setScanInvoicePayload: (state, { payload }) => {
      state.scanInvoicePayload = { ...state.scanInvoicePayload, ...payload };
    },
    setDisableSave: (state, { payload }) => {
      state.disableSave = payload;
    },
    setUnitSelectionReset: (state, { payload }) => {
      state.unitSelectionReset = payload;
    },
    setScanInvoiceFiles: (state, action) => {
      const { actionType, payload } = action.payload;

      // Define mapping for actionType to corresponding key in scanInvoiceFiles
      const keyMapping = {
        customerUploadFiles: "customerUploadFiles",
        companyUploadFiles: "companyUploadFiles",
        bolUploadFiles: "bolUploadFiles",
        dafUploadFiles: "dafUploadFiles",
        iftaUploadFiles: "iftaUploadFiles",
        breakdownUploadFiles: "breakdownUploadFiles",
        customerScanFiles: "customerScanFiles",
        companyScanFiles: "companyScanFiles",
        bolScanFiles: "bolScanFiles",
        dafScanFiles: "dafScanFiles",
        iftaScanFiles: "iftaScanFiles",
        breakdownScanFiles: "breakdownScanFiles",
      };

      // Get the correct key from the mapping
      const targetKey = keyMapping[actionType];

      if (targetKey) {
        state.scanInvoiceFiles[targetKey] = payload;
      }

      if (actionType === "clear") {
        state.scanInvoiceFiles = initialState.scanInvoiceFiles;
      }
    },
  },
});

export const {
  updateField,
  updateMultipleFields,
  resetFields,
  toggleCancelChanges,
  setPageNumber,
  setPageNumberNonUnit,
  setScanInvoicePayload,
  setDisableSave,
  setScanInvoiceFiles,
  setUnitSelectionReset,
} = ScanInvoiceSlice.actions;
export default ScanInvoiceSlice.reducer;
