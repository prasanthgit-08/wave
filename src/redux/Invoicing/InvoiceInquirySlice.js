import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Invoice Inquiry
  firstName: "",
  lastName: "",
  email: "",
  previousURL: "",
  invoicePK: null,
  navigateToMainPage: false,

  // Edit Invoice
  searchTerm: "",
  searchCriteria: "",
  totalPages: 0,
  totalElements: 0,
  pageNumber: 0,
  size: 0,
  localCompanyName: "",
  localCompanyId: null,
  cancelTrue: false,
  isCancel: false,
  sortValue: "",
  sortType: false,

  // Unit Selection
  invoiceNumber: "",
  unitNumberLast5: "",
  unitNumber: "",
  unitId: null,
  localCompany: false,
  selectedCompanyName: "",
  cancelUnitSelection: false,
  isInvoiceUnitValid: false,
  isDriverUnitValid: false,

  // Non-Unit Screen
  nonUnitData: [],
  pageNumberNonUnit: 0,
  sizeNonUnit: 0,
  totalPagesNonUnit: 0,
  totalElementsNonUnit: 0,
  searchTermNonUnit: "",
  searchCriteriaNonUnit: "",
  selectedCustomerId: null,
  customerName: "",
  dealerName: "",
  dealerId: null,
  changeColour: false,
  nonUnitCancel: false,
  miscellaniousFlag: false,
  nonUnitInvoiceNumber: "",
  nonUnitUnitNumber: "",
  nonUnitPoNumber: "",
  unitNumberId: null,
  nonUnitSortValue: "",
  nonUnitSortType: false,

  // Unit Confirmation
  viewDetail: false,
  changeColor: false,
  invoiceById: [],
  invoiceByIdInitially: [],

  // Details Tab
  invoiceDetailsData: [],
  invoiceDetailsInitially: [],
  invoiceDetailPK: null,
  totalDetailsPages: 0,
  totalDetailsElements: 0,
  detailsPageNumber: 0,
  detailsSize: 0,
  detailChange: false,
  isDetailsTabValid: true,
  //Documents tab
  changeColorDocuments: false,

  // Text Tab
  textChange: false,

  // Save
  saveInvoiceInquiry: null,
  editReason: "",

  // Company Details
  companyFK: null,
  companyName: "",

  // Browse Page Data
  invoiceData: [],

  // Credit Card
  amountForCreditCard: 0,
  creditCardArrayList: [],

  // When refresh, for navigation to unit selection screen
  unitSelectionReset: false,

  invoiceNumberNonUnit: "",
  unitNumberNonUnit: "",
  poNumber: "",
  sortValueNonUnit: "",
  sortTypeNonUnit: false,
  // Driver-Selection-Screen
  driverFK: null,
  invoiceNumberForDriverInvoice: "",
  unitNumberForDriverInvoice: "",
  unitLast5ForDriverInvoice: "",
  nonUnitNumberForDriverInvoice: "",
  unitIdForDriverInvoice: null,
  searchTermForDriverInvoice: "",
  searchCriteriaForDriverInvoice: "",
  //print and email
  //edit save
  print: false,
  emailToCustomer: false,
  emailToUser: false,
  includeCompanyDocument: false,
  includeCustomerDocument: false,
  emailArray: [],

  printDriver: false,
  emailToDriver: false,
  emailToUserDriver: false,
  emailArrayDriver: [],
  exportFlag: true,
  driverExportFlag: true,
  invoiceVoided: true,
  invoiceCorrected: true,
};

const InvoiceInquirySlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPreviousURL: (state, action) => {
      state.previousURL = action.payload;
    },
    setInvoicePK: (state, action) => {
      state.invoicePK = action.payload;
    },
    setNavigateToMainPage: (state, action) => {
      state.navigateToMainPage = action.payload;
    },

    // Edit Invoice
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setLocalCompanyName: (state, action) => {
      state.localCompanyName = action.payload;
    },
    setLocalCompanyId: (state, action) => {
      state.localCompanyId = action.payload;
    },
    setCancelTrue: (state, action) => {
      state.cancelTrue = action.payload;
    },
    setIsCancel: (state, action) => {
      state.isCancel = action.payload;
    },

    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },

    // Unit Selection
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },
    setUnitNumberLast5: (state, action) => {
      state.unitNumberLast5 = action.payload;
    },
    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setUnitId: (state, action) => {
      state.unitId = action.payload;
    },
    setLocalCompany: (state, action) => {
      state.localCompany = action.payload;
    },
    setSelectedCompanyName: (state, action) => {
      state.selectedCompanyName = action.payload;
    },

    setCancelUnitSelection: (state, action) => {
      state.cancelUnitSelection = !state.cancelUnitSelection;
    },
    setIsInvoiceUnitValid: (state, action) => {
      state.isInvoiceUnitValid = action.payload;
    },
    setIsDriverUnitValid: (state, action) => {
      state.isDriverUnitValid = action.payload;
    },

    setNonUnitData: (state, action) => {
      state.nonUnitData = action.payload;
    },
    setPageNumberNonUnit: (state, action) => {
      state.pageNumberNonUnit = action.payload;
    },
    setSizeNonUnit: (state, action) => {
      state.sizeNonUnit = action.payload;
    },
    setTotalPagesNonUnit: (state, action) => {
      state.totalPagesNonUnit = action.payload;
    },
    setTotalElementsNonUnit: (state, action) => {
      state.totalElementsNonUnit = action.payload;
    },
    setSearchTermNonUnit: (state, action) => {
      state.searchTermNonUnit = action.payload;
    },
    setSearchCriteriaNonUnit: (state, action) => {
      state.searchCriteriaNonUnit = action.payload;
    },
    setSelectedCustomerId: (state, action) => {
      state.selectedCustomerId = action.payload;
    },
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
    setDealerName: (state, action) => {
      state.dealerName = action.payload;
    },
    setDealerId: (state, action) => {
      state.dealerId = action.payload;
    },
    setChangeColour: (state, action) => {
      state.changeColour = action.payload;
    },
    setNonUnitCancel: (state, action) => {
      state.nonUnitCancel = action.payload;
    },
    setMiscellaniousFlag: (state, action) => {
      state.miscellaniousFlag = action.payload;
    },
    setNonUnitInvoiceNumber: (state, action) => {
      state.nonUnitInvoiceNumber = action.payload;
    },
    setNonUnitUnitNumber: (state, action) => {
      state.nonUnitUnitNumber = action.payload;
    },
    setNonUnitPoNumber: (state, action) => {
      state.nonUnitPoNumber = action.payload;
    },
    setUnitNumberId: (state, action) => {
      state.unitNumberId = action.payload;
    },
    setNonUnitSortValue: (state, action) => {
      state.nonUnitSortValue = action.payload;
    },
    setNonUnitSortType: (state, action) => {
      state.nonUnitSortType = action.payload;
    },
    setInvoiceById: (state, action) => {
      state.invoiceById = action.payload;
    },
    setInvoiceByIdInitially: (state, action) => {
      state.invoiceByIdInitially = action.payload;
    },
    setInvoiceDetailsData: (state, action) => {
      state.invoiceDetailsData = action.payload;
    },
    setInvoiceDetailsInitially: (state, action) => {
      state.invoiceDetailsInitially = action.payload;
    },
    setInvoiceDetailPK: (state, action) => {
      state.invoiceDetailPK = action.payload;
    },
    setTotalDetailsPages: (state, action) => {
      state.totalDetailsPages = action.payload;
    },
    setTotalDetailsElements: (state, action) => {
      state.totalDetailsElements = action.payload;
    },
    setDetailsPageNumber: (state, action) => {
      state.detailsPageNumber = action.payload;
    },
    setDetailsSize: (state, action) => {
      state.detailsSize = action.payload;
    },
    setDetailChange: (state, action) => {
      state.detailChange = action.payload;
    },
    setIsDetailsTabValid: (state, action) => {
      state.isDetailsTabValid = action.payload;
    },
    setChangeColorDocuments: (state, action) => {
      state.changeColorDocuments = action.payload;
    },
    setTextChange: (state, action) => {
      state.textChange = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setCompanyFK: (state, action) => {
      state.companyFK = action.payload;
    },
    setInvoiceData: (state, action) => {
      state.invoiceData = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setSaveInvoiceInquiry: (state, action) => {
      state.saveInvoiceInquiry = action.payload;
    },
    setAmountForCreditCard: (state, action) => {
      state.amountForCreditCard = action.payload;
    },
    resetFields: (state) => {
      Object.assign(state, initialState);
    },
    setInvoiceNumberNonUnit: (state, action) => {
      state.invoiceNumberNonUnit = action.payload;
    },
    setUnitNumberNonUnit: (state, action) => {
      state.unitNumberNonUnit = action.payload;
    },
    setPoNumber: (state, action) => {
      state.poNumber = action.payload;
    },
    setSortValueNonUnit: (state, action) => {
      state.sortValueNonUnit = action.payload;
    },
    setSortTypeNonUnit: (state, action) => {
      state.sortTypeNonUnit = action.payload;
    },

    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },

    setInvoiceNumberForDriverInvoice: (state, action) => {
      state.invoiceNumberForDriverInvoice = action.payload;
    },

    setUnitNumberForDriverInvoice: (state, action) => {
      state.unitNumberForDriverInvoice = action.payload;
    },

    setUnitLast5ForDriverInvoice: (state, action) => {
      state.unitLast5ForDriverInvoice = action.payload;
    },

    setNonUnitNumberForDriverInvoice: (state, action) => {
      state.nonUnitNumberForDriverInvoice = action.payload;
    },

    setUnitIdForDriverInvoice: (state, action) => {
      state.unitIdForDriverInvoice = action.payload;
    },

    setSearchTermForDriverInvoice: (state, action) => {
      state.searchTermForDriverInvoice = action.payload;
    },

    setInvoiceVoided: (state, action) => {
      state.invoiceVoided = action.payload;
    },
    setInvoiceCorrected: (state, action) => {
      state.invoiceCorrected = action.payload;
    },

    setSearchCriteriaForDriverInvoice: (state, action) => {
      state.searchCriteriaForDriverInvoice = action.payload;
    },
    setPrint: (state, action) => {
      state.print = action.payload;
    },
    setEmailToCustomer: (state, action) => {
      state.emailToCustomer = action.payload;
    },
    setEmailToUser: (state, action) => {
      state.emailToUser = action.payload;
    },
    setIncludeCompanyDocument: (state, action) => {
      state.includeCompanyDocument = action.payload;
    },
    setIncludeCustomerDocument: (state, action) => {
      state.includeCustomerDocument = action.payload;
    },
    setEmailArray: (state, action) => {
      state.emailArray = action.payload;
    },
    setPrintDriver: (state, action) => {
      state.printDriver = action.payload;
    },

    setEmailToUserDriver: (state, action) => {
      state.emailToUserDriver = action.payload;
    },
    setEmailToDriver: (state, action) => {
      state.emailToDriver = action.payload;
    },

    setEmailArrayDriver: (state, action) => {
      state.emailArrayDriver = action.payload;
    },
    setExportFlag: (state, action) => {
      state.exportFlag = action.payload;
    },
    setDriverExportFlag: (state, action) => {
      state.driverExportFlag = action.payload;
    },
  },
});

export const {
  setNonUnitData,
  setPageNumberNonUnit,
  setSizeNonUnit,
  setTotalPagesNonUnit,
  setTotalElementsNonUnit,
  setSearchTermNonUnit,
  setSearchCriteriaNonUnit,
  setSelectedCustomerId,
  setCustomerName,
  setDealerName,
  setDealerId,
  setChangeColour,
  setNonUnitCancel,
  setMiscellaniousFlag,
  setNonUnitInvoiceNumber,
  setNonUnitUnitNumber,
  setNonUnitPoNumber,
  setUnitNumberId,
  setNonUnitSortValue,
  setNonUnitSortType,
  setInvoiceById,
  setInvoiceByIdInitially,
  setInvoiceDetailsData,
  setInvoiceDetailsInitially,
  setInvoiceDetailPK,
  setTotalDetailsPages,
  setTotalDetailsElements,
  setDetailsPageNumber,
  setDetailsSize,
  setDetailChange,
  setIsDetailsTabValid,
  setChangeColorDocuments,
  setTextChange,
  setFirstName,
  setLastName,
  setEmail,
  setPreviousURL,
  setInvoicePK,
  setNavigateToMainPage,
  setSearchTerm,
  setSearchCriteria,
  setTotalPages,
  setTotalElements,
  setPageNumber,
  setSize,
  setLocalCompanyName,
  setLocalCompanyId,
  setCancelTrue,
  setIsCancel,
  setSortValue,
  setSortType,
  setInvoiceNumber,
  setUnitNumberLast5,
  setUnitNumber,
  setUnitId,
  setLocalCompany,
  setSelectedCompanyName,
  setCancelUnitSelection,
  setIsInvoiceUnitValid,
  setIsDriverUnitValid,
  setViewDetail,
  setChangeColor,
  setEditReason,
  setCompanyFK,
  setCompanyName,
  setInvoiceData,
  setAmountForCreditCard,
  setCreditCardArrayList,
  setUnitSelectionReset,
  resetFields,
  setSaveInvoiceInquiry,
  setInvoiceNumberNonUnit,
  setUnitNumberNonUnit,
  setPoNumber,
  setSortValueNonUnit,
  setSortTypeNonUnit,
  setDriverFK,
  setInvoiceNumberForDriverInvoice,
  setUnitNumberForDriverInvoice,
  setUnitLast5ForDriverInvoice,
  setNonUnitNumberForDriverInvoice,
  setUnitIdForDriverInvoice,
  setSearchTermForDriverInvoice,
  setSearchCriteriaForDriverInvoice,
  setPrint,
  setEmailToCustomer,
  setEmailToUser,
  setIncludeCompanyDocument,
  setIncludeCustomerDocument,
  setEmailArray,
  setEmailArrayDriver,
  setEmailToDriver,
  setEmailToUserDriver,
  setPrintDriver,
  setExportFlag,
  setDriverExportFlag,
  setInvoiceVoided,
  setInvoiceCorrected,
} = InvoiceInquirySlice.actions;

export default InvoiceInquirySlice.reducer;
