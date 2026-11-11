import { createSlice } from "@reduxjs/toolkit";

const PrintCheckSlice = createSlice({
  name: "PrintCheckSlice",
  initialState: {
    source: "Taxable",
    who: "Driver",
    sortFlag: false,
    name: "",
    address1: "",
    address2: "",
    cityNew: "",
    postalCodeNew: "",
    stateCodeNew: "",
    canadianNew: false,
    postalCodePKNew: null,
    checkAmount: "",
    reason: "",
    checkPayInput: "",
    checkPayId: null,
    checkPayToData: null,
    transportCompanyId: null,
    transportCompanyInput: "",
    pageNumber: 0,
    firstName: "",
    lastName: "",
    totalElements: 0,
    totalPages: 0,
    sortValue: null,
    sortType: null,
    driverId: null,
    driverData: [],
    companyData: [],
    checkPayFlag: false,
    changeColor: false,
    textArray: [],
    printCheckFlag: false,
    checkStupText1: "",
    checkStupText2: "",
    checkStupText3: "",
    checkStupText4: "",
    checkStupText5: "",
    checkStupText6: "",
    checkStupText7: "",
    checkStupText8: "",
    checkStupText9: "",
    checkStupText10: "",
    checkStupText11: "",
    checkStupText12: "",
    checkStupText13: "",
    checkStupText14: "",
    checkStupText15: "",
    reverseFlag: false,
  },
  reducers: {
    setSource: (state, { payload }) => {
      state.source = payload;
    },
    setWho: (state, { payload }) => {
      state.who = payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAddress1: (state, action) => {
      state.address1 = action.payload;
    },
    setAddress2: (state, action) => {
      state.address2 = action.payload;
    },
    setCheckAmount: (state, action) => {
      state.checkAmount = action.payload;
    },
    setReason: (state, action) => {
      state.reason = action.payload;
    },
    setCityNew: (state, action) => {
      state.cityNew = action.payload;
    },
    setStateCodeNew: (state, action) => {
      state.stateCodeNew = action.payload;
    },
    setPostalCodeNew: (state, action) => {
      state.postalCodeNew = action.payload;
    },
    setCanandianNew: (state, action) => {
      state.canadianNew = action.payload;
    },
    setPostalCodePKNew: (state, action) => {
      state.postalCodePKNew = action.payload;
    },
    setCheckPayInput: (state, action) => {
      state.checkPayInput = action.payload;
    },
    setCheckPayId: (state, action) => {
      state.checkPayId = action.payload;
    },
    setcheckPayToData: (state, action) => {
      state.checkPayToData = action.payload;
    },
    setTransportCompanyInput: (state, action) => {
      state.transportCompanyInput = action.payload;
    },
    setTransportCompanyId: (state, action) => {
      state.transportCompanyId = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setDriverData: (state, action) => {
      state.driverData = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setTextArray: (state, action) => {
      state.textArray = action.payload;
    },
    setCompanyData: (state, action) => {
      state.companyData = action.payload;
    },
    setCheckPayFlag: (state, action) => {
      state.checkPayFlag = action.payload;
    },
    setCheckStupText1: (state, action) => {
      state.checkStupText1 = action.payload;
    },
    setCheckStupText2: (state, action) => {
      state.checkStupText2 = action.payload;
    },
    setCheckStupText3: (state, action) => {
      state.checkStupText3 = action.payload;
    },
    setCheckStupText4: (state, action) => {
      state.checkStupText4 = action.payload;
    },
    setCheckStupText5: (state, action) => {
      state.checkStupText5 = action.payload;
    },
    setPrintCheckFlag: (state, action) => {
      state.printCheckFlag = action.payload;
    },
    setReverseFlag: (state, action) => {
      state.reverseFlag = action.payload;
    },
    resetChanges: (state, action) => {
      state.driverId = null;
      state.driverData = [];
      // state.checkPayFlag = false;
      state.changeColor = false;
      state.name = "";
      state.postalCodePKNew = null;
      state.address1 = "";
      state.address2 = "";
      state.checkAmount = "";
      state.reason = "";
      state.cityNew = "";
      state.postalCodeNew = "";
      state.stateCodeNew = "";
      state.checkPayId = null;
      state.checkPayInput = "";
      state.postalCodePKNew = null;
      state.checkPayToData = null;
      state.transportCompanyId = null;
      state.transportCompanyInput = "";
      state.pageNumber = 0;
      state.firstName = "";
      state.lastName = "";
      state.totalElements = 0;
      state.totalPages = 0;
      state.sortValue = null;
      state.sortType = null;
      state.textArray = [];
    },
  },
});

export const {
  setSource,
  setWho,
  setName,
  setAddress1,
  setAddress2,
  setCityNew,
  setCanandianNew,
  setPostalCodeNew,
  setStateCodeNew,
  setPostalCodePKNew,
  setCheckPayId,
  setCheckPayInput,
  setCheckAmount,
  setReason,
  setcheckPayToData,
  setTransportCompanyId,
  setTransportCompanyInput,
  setFirstName,
  setLastName,
  setDriverId,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setSortType,
  setSortValue,
  setDriverData,
  setChangeColor,
  setTextArray,
  setCheckPayFlag,
  setCompanyData,
  setPrintCheckFlag,
  resetChanges,
  setReverseFlag,
} = PrintCheckSlice.actions;

export default PrintCheckSlice.reducer;
