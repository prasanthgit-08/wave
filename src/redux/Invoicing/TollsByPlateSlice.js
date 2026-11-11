import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 0,
  sortValue: "",
  sortType: false,
  listingData: [],
  totalPages: 0,
  totalElements: 0,
  selectedPlate: "",
  plateNumber: "",
  selectedDriver: "",
  selectedDriverFK: "",
  selectedDescription: "",
  selectedSource: "",
  driver: "",
  description: "",
  source: "",
  plate: "",
  tollDate: "",
  isTollDateValid: false,
  amount: "",
  invoiceNumber: "",
  reference: "",
  tollAgency: "",
  checkPayToFK: null,
  checkPayToValue: "",
  checkPayToName: "",
  checkPayToAddress1: "",
  checkPayToAddress2: "",
  checkPayToCity: "",
  checkPayToState: "",
  checkPayToZip: "",
  checkPayToCanadian: false,
  checkPayToPostalCodePK: null,
  checkSubDetails: ["", "", "", "", "", ""],
  uploadedFiles: [],
  scannedFiles: [],
  detailsLoading: false,
  checkLoading: false,
  isUploadActive: false,
  isScanActive: false,
};

const TollsByPlateSlice = createSlice({
  name: "tollsByPlate",
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
    setPageNumber: (state, { payload }) => {
      state.pageNumber = payload;
    },
    updateUploadedFiles: (state, { payload }) => {
      state.uploadedFiles = payload;
    },
    updateScannedFiles: (state, { payload }) => {
      state.scannedFiles = payload;
    },
    resetOnCancel: (state) => {
      state.driver = "";
      state.description = "";
      state.source = "";
      state.plate = "";
      state.tollDate = "";
      state.isTollDateValid = false;
      state.amount = "";
      state.invoiceNumber = "";
      state.reference = "";
      state.tollAgency = "";
      state.checkPayToFK = null;
      state.checkPayToValue = "";
      state.checkPayToName = "";
      state.checkPayToAddress1 = "";
      state.checkPayToAddress2 = "";
      state.checkPayToCity = "";
      state.checkPayToState = "";
      state.checkPayToZip = "";
      state.checkPayToCanadian = false;
      state.checkPayToPostalCodePK = null;
      state.checkSubDetails = ["", "", "", "", "", ""];
      state.uploadedFiles = [];
      state.detailsLoading = false;
      state.checkLoading = false;
    },
  },
});

export const {
  updateField,
  updateMultipleFields,
  resetFields,
  setPageNumber,
  updateUploadedFiles,
  updateScannedFiles,
  resetOnCancel,
} = TollsByPlateSlice.actions;

export default TollsByPlateSlice;
