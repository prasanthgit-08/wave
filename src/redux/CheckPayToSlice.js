import { createSlice } from "@reduxjs/toolkit";
const CheckPayToSlice = createSlice({
  name: "CheckPayTo",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    searchTerms: "",
    contactData: null,
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    browseNavigation: [],
    changeColor: false,
    editFormData: null,
    checkPayToData: [],
    selectedId: "",
    checkPayToFormData: null,
    checkPayToPK: "",
    checkPayToZipLength: "",
    checkPayToCityLength: "",
    normalSortValue: null,
    normalSortFlag: false,
    postalCodeOnChange: false,
    zipPostLenght: null,
    checkPayzipPostLenght: "",
    // ReduxPostalCode:"",
    //input
    name: "",
    description: "",
    address1: "",
    address2: "",
    checkPayToCity: "",
    checkPayToStatecode: "",
    checkPayToCanadian: false,
    checkPayToPostcode: "",
    checkPay: "",
    changesCancelled: false,
    isGeneralTabValid: true,
    isSettingsTabValid: true,
    isSettingsTabRequired: false,
    descriptionValid: true,
    onCancel: false,
    checkPayPostalCodePK: null,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
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
    setCheckPayToFormData: (state, action) => {
      state.checkPayToFormData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerms = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setDescriptionValid: (state, action) => {
      state.descriptionValid = action.payload;
    },
    //postal code
    setZipPostLenght: (state, action) => {
      state.zipPostLenght = action.payload;
    },
    setCheckPayToCityLength: (state, action) => {
      state.checkPayToCityLength = action.payload;
    },
    setCheckPayToData: (state, action) => {
      state.checkPayToData = action.payload;
    },
    setCheckPayToPK: (state, action) => {
      state.checkPayToPK = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setCheckPayToCity: (state, action) => {
      state.checkPayToCity = action.payload;
    },
    setCheckPayToStatecode: (state, action) => {
      state.checkPayToStatecode = action.payload;
    },
    setCheckPayToCanadian: (state, action) => {
      state.checkPayToCanadian = action.payload;
    },
    setCheckPayToPostcode: (state, action) => {
      state.checkPayToPostcode = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },

    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setAddress1: (state, action) => {
      state.address1 = action.payload;
    },
    setAddress2: (state, action) => {
      state.address2 = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsGeneralTabValid: (state, action) => {
      state.isGeneralTabValid = action.payload;
    },
    setIsSettingsTabValid: (state, action) => {
      state.isSettingsTabValid = action.payload;
    },

    setPostalCodeOnChange: (state, action) => {
      state.postalCodeOnChange = action.payload;
    },
    setReduxCity: (state, action) => {
      state.city = action.payload;
    },
    setReduxStateCode: (state, action) => {
      state.stateCode = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setCheckPayPostalCodePK: (state, action) => {
      state.checkPayPostalCodePK = action.payload;
    },
    setCheckPayzipPostLenght: (state, action) => {
      state.checkPayzipPostLenght = action.payload;
    },

    resetChanges: (state, action) => {
      state.name = "";
      state.description = "";
      state.address1 = "";
      state.address2 = "";
      state.city = "";
      state.stateCode = "";
      state.postalCode = "";
      state.viewDetail = false;
      state.checkPayToPK = "";
    },
    resetOrderUsers: (state, action) => {
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.changeColor = false;
      state.checkPayToData = [];
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.pageNumber = 0;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSearchTerm,
  setSelectedSearchCriteria,
  resetChanges,
  setSelectedId,
  setCheckPayToCanadian,
  setCheckPayToZipLength,
  setCheckPayToCityLength,
  setCheckPayToCity,
  setCheckPayToStatecode,
  setCheckPayToPostcode,
  setBrowseNavigation,
  setIsGeneralTabValid,
  setIsSettingsTabValid,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  setCheckPayToFormData,
  setCheckPay,
  setNormalSortValue,
  setNormalSortFlag,
  setCheckPayToPK,
  setName,
  setDescriptionValid,
  setLoading,
  setCheckPayToData,
  setDescription,
  setAddress1,
  setAddress2,
  toggleChangesCancelled,
  resetOrderUsers,
  setReduxCity,
  setReduxStateCode,
  setPostalCodeOnChange,
  setCheckPayzipPostLenght,
  setZipPostLenght,
  setOnCancel,
  setCheckPayPostalCodePK,
} = CheckPayToSlice.actions;
export default CheckPayToSlice.reducer;
