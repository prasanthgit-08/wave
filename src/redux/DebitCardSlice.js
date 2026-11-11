import { createSlice, isAction } from "@reduxjs/toolkit";
const DebitCardSlice = createSlice({
  name: "DebitCard",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    searchTerm: "",
    searchCriteria: "Beginning",
    changeColor: false,
    debitCardData: [],
    viewDetail: false,
    editFormData: null,
    debitCardPK: "",
    debitData: null,
    selectedStatus: "Active",
    provider: "",
    processCards: false,
    delaySettlements: false,
    objectKey: "",
    active: true,
    providerValid: true,
    originalProvider: "",
    providerError: "",
    normalSortValue: null,
    normalSortFlag: false,
    debitCardId: "",
    Canadian: false,
    debitCardPostcode: "",
    onCancel: false,
    address1: "",
    address2: "",
    disableSave: true,
    zip: "",
    canadian: false,
    debitCardzipPostLenght: "",
    debitCardCity: "",
    debitCardStatecode: "",
    postalCodePK: null,
    objectkeyValid: true,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setObjectkeyValid: (state, action) => {
      state.objectkeyValid = action.payload;
    },
    setDebitCardCity: (state, action) => {
      state.debitCardCity = action.payload;
    },
    setPostalCodePK: (state, action) => {
      state.postalCodePK = action.payload;
    },
    setDebitCardzipPostLenght: (state, action) => {
      state.debitCardzipPostLenght = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setAddress1: (state, action) => {
      state.address1 = action.payload;
    },

    setAddress2: (state, action) => {
      state.address2 = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setDebitCardData: (state, action) => {
      state.debitCardData = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setDebitCardPK: (state, action) => {
      state.debitCardPK = action.payload;
    },

    setDebitData: (state, action) => {
      state.debitData = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },

    setDebitCardId: (state, action) => {
      state.debitCardId = action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },

    setProcessCards: (state, action) => {
      state.processCards = action.payload;
    },
    setDelaySettlements: (state, action) => {
      state.delaySettlements = action.payload;
    },
    setObjectKey: (state, action) => {
      state.objectKey = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setProviderValid: (state, action) => {
      state.providerValid = action.payload;
    },

    setOriginalProvider: (state, action) => {
      state.originalProvider = action.payload;
    },
    setProviderError: (state, action) => {
      state.providerError = action.payload;
    },

    setCanadian: (state, action) => {
      state.Canadian = action.payload;
    },

    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setZipPostLenght: (state, action) => {
      state.zipPostLenght = action.payload;
    },
    setPostalCodeOnChange: (state, action) => {
      state.postalCodeOnChange = action.payload;
    },

    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setCheckPayToCity: (state, action) => {
      state.checkPayToCity = action.payload;
    },
    setDebitCardStatecode: (state, action) => {
      state.debitCardStatecode = action.payload;
    },
    setCheckPayToCanadian: (state, action) => {
      state.checkPayToCanadian = action.payload;
    },
    setDebitCardPostcode: (state, action) => {
      state.debitCardPostcode = action.payload;
    },
    setReduxCity: (state, action) => {
      state.city = action.payload;
    },
    setReduxStateCode: (state, action) => {
      state.stateCode = action.payload;
    },

    resetChanges: (state, action) => {
      state.debitCardPK = "";
      state.provider = "";
      state.processCards = false;
      state.delaySettlements = false;
      state.objectKey = "";
      state.address1 = "";
      state.address2 = "";
      state.selectedStatus = "Active";
      state.postalCodePK = null;
      state.editFormData = null;
      state.zip = "";
      state.canadian = false;
      state.debitCardzipPostLenght = "";
      state.debitCardCity = "";
      state.debitCardStatecode = "";
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSearchTerm,
  setSearchCriteria,
  setChangeColor,
  setDebitCardData,
  setViewDetail,
  setEditFormData,
  setDebitCardPK,
  setDescriptionValid,
  setDebitData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedStatus,
  setDebitCardId,
  setProvider,
  setProcessCards,
  setDelaySettlements,
  setObjectKey,
  setActive,
  setOriginalProvider,
  setProviderValid,
  setProviderError,
  setOwnerCanadian,
  setOnCancel,
  setAddress1,
  setAddress2,
  toggleChangesCancelled,
  setZipPostLenght,
  setPostalCodeOnChange,
  setDebitCardPostcode,
  resetChanges,
  setDebitCardCity,
  setDebitCardzipPostLenght,
  setDebitCardStatecode,
  setPostalCodePK,
  setObjectkeyValid,
} = DebitCardSlice.actions;

export const debitCard = (state) => state.DebitCard.value;
export default DebitCardSlice.reducer;
