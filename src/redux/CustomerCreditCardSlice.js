import { createSlice } from "@reduxjs/toolkit";
const CustomerCreditCardSlice = createSlice({
  name: "CustomerCreditCard",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    customerCreditCardData: [],
    customerCreditCards: null,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    browseNavigation: [],
    changeColor: false,
    customerCreditEditData: null,
    changesCancelled: false,
    checkCardNumber: "",
    customerId: "",
    checkPrimary: "",
    cardTest: true,
    cardData: "",
    checkZip: "",
    loader: true,
    dateMessage: false,
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    //input
    nameOnCard: "",
    cardNumber: "",
    cardBillingAddress: "",
    expirationDate: "",
    cardBillingZipcode: "",
    primaryCard: false,
    customerCreditCardPK: "",
    isLoading: false,
    cvv: "",
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
    setCustomerCreditCardData: (state, action) => {
      state.customerCreditCardData = action.payload;
    },
    setCustomerCreditCards: (state, action) => {
      state.customerCreditCards = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setCustomerCreditCardEditData: (state, action) => {
      state.customerCreditEditData = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    //input
    setNameOnCard: (state, action) => {
      state.nameOnCard = action.payload;
    },
    setCardNumber: (state, action) => {
      state.cardNumber = action.payload;
    },
    setCardBillingAddress: (state, action) => {
      state.cardBillingAddress = action.payload;
    },
    setCardBillingZipcode: (state, action) => {
      state.cardBillingZipcode = action.payload;
    },
    setPrimaryCard: (state, action) => {
      state.primaryCard = action.payload;
    },
    setExpirationDate: (state, action) => {
      state.expirationDate = action.payload;
    },
    setCustomerCreditCardPK: (state, action) => {
      state.customerCreditCardPK = action.payload;
    },
    resetChanges: (state, action) => {
      state.cardBillingAddress = "";
      state.nameOnCard = "";
      state.cardNumber = "";
      state.cardBillingZipcode = "";
      state.customerCreditCardPK = "";
      state.primaryCard = "";
      state.expirationDate = "";
      state.checkCardNumber = "";
      state.cardTest = true;
      state.checkZip = "";
      state.cvv = "";
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setCheckCardNumber: (state, action) => {
      state.checkCardNumber = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setCheckPrimary: (state, action) => {
      state.checkPrimary = action.payload;
    },
    setCardTest: (state, action) => {
      state.cardTest = action.payload;
    },
    setCardData: (state, action) => {
      state.cardData = action.payload;
    },
    setCheckZip: (state, action) => {
      state.checkZip = action.payload;
    },
    setDateMessage: (state, action) => {
      state.dateMessage = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCVV: (state, { payload }) => {
      state.cvv = payload;
    },
    resetCreditCardSearchFilter: (state, action) => {
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setCustomerCreditCardData,
  setCustomerCreditCards,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
  setBrowseNavigation,
  setChangeColor,
  setCustomerCreditCardEditData,
  toggleChangesCancelled,
  setCheckCardNumber,
  setCustomerId,
  setCheckPrimary,
  setLoader,
  setCardTest,
  setCardData,
  setCheckZip,
  setNormalSortValue,
  setNormalSortFlag,
  setNameOnCard,
  setCardNumber,
  setCardBillingZipcode,
  setPrimaryCard,
  setCardBillingAddress,
  setExpirationDate,
  setCustomerCreditCardPK,
  resetChanges,
  resetCreditCardSearchFilter,
  setDateMessage,
  setIsLoading,
  setCVV,
} = CustomerCreditCardSlice.actions;

export const customerCreditCard = (state) => state.CustomerCreditCard.value;
export default CustomerCreditCardSlice.reducer;
