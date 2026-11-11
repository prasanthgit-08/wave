import { createSlice } from "@reduxjs/toolkit";

const EditPrinterSlice = createSlice({
  name: "editPrinter",
  initialState: {
    printerData: null,
    printerDatafrmDB: null,
    description: "",
    printerURL: "",
    duplex: false,
    duplexControlCode: "",
    multiTrayPrinter: false,
    whiteControlCode: "",
    yellowControlCode: "",
    pinkControlCode: "",
    collateStaple: false,
    collateControlCode: "",
    stapleControlCode: "",
    viewDetail: false,
    savePrinter: false,
    descriptionValid: true,
    descriptionError: "",
    nameValid: true,
    name: "",
    printerUrlValid: true,
  },

  reducers: {
    setPrinterData: (state, action) => {
      let payload = action.payload;
      if (payload == null) {
        state.printerData = null;
      } else {
        state.printerData = { ...state.printerData, ...payload };
      }
    },
    setDescriptionValid: (state, action) => {
      state.descriptionValid = action.payload;
    },
    setNameValid: (state, action) => {
      state.nameValid = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setPrinterDatafrmDB: (state, action) => {
      state.printerDatafrmDB = action.payload;
    },
    setSavePrinter: (state, action) => {
      state.savePrinter = action.payload;
    },
    setPrinterDescription: (state, action) => {
      state.description = action.payload;
    },
    setPrinterURL: (state, action) => {
      state.printerURL = action.payload;
    },
    setDescriptionError: (state, action) => {
      state.descriptionError = action.payload;
    },

    setPrinterDuplex: (state, action) => {
      state.duplex = action.payload;
    },

    setPrinterDuplexCode: (state, action) => {
      state.duplexControlCode = action.payload;
    },
    setPrinterMultiTray: (state, action) => {
      state.multiTrayPrinter = action.payload;
    },
    setPrinterWhiteControlCode: (state, action) => {
      state.whiteControlCode = action.payload;
    },
    setPrinterYellowControlCode: (state, action) => {
      state.yellowControlCode = action.payload;
    },
    setPrinterPinkControlCode: (state, action) => {
      state.pinkControlCode = action.payload;
    },
    setPrinterCollateStaple: (state, action) => {
      state.collateStaple = action.payload;
    },
    setPrinterCollateControlCode: (state, action) => {
      state.collateControlCode = action.payload;
    },
    setPrinterStapleControlCode: (state, action) => {
      state.stapleControlCode = action.payload;
    },
    resetChanges: (state, action) => {
      state.printerDatafrmDB = null;
      state.descriptionValid = true;
      state.viewDetail = false;
      state.descriptionError = "";
      state.printerUrlValid = true;
      state.nameValid = true;
      state.descriptionValid = true;
      state.name = "";
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPrinterUrlValid: (state, action) => {
      state.printerUrlValid = action.payload;
    },
  },
});

export const {
  setDescriptionValid,
  setPrinterData,
  setPrinterDatafrmDB,
  setViewDetail,
  setSavePrinter,
  setEditPrinterData,
  setPrinterDescription,
  setPrinterURL,
  setPrinterDuplex,
  setDescriptionError,
  setPrinterDuplexCode,
  setPrinterMultiTray,
  setPrinterWhiteControlCode,
  setPrinterYellowControlCode,
  setPrinterPinkControlCode,
  setPrinterCollateStaple,
  setPrinterCollateControlCode,
  setPrinterStapleControlCode,
  resetChanges,
  toggleChangesCancelled,
  setNameValid,
  setName,
  setPrinterUrlValid,
} = EditPrinterSlice.actions;

export const printerData = (state) => state.editPrinter.value;
export default EditPrinterSlice.reducer;
