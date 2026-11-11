import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // pagination
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
  selectedCompanyName: "",

  //unit selection
  invoiceNumber: "",
  unitNumberLast5: "",
  unitNumber: "",

  //non unit screen
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

  //unit confirmtaion
  invoicePK: null,
  viewDetail: false,
  changeColor: false,
  invoiceById: [],
  invoiceByIdInitially: [],

  //Details tab
  invoiceDetailsData: [],
  invoiceDetailsInitially: [],
  invoiceDetailPK: null,
  totalDetailsPages: 0,
  totalDetailsElements: 0,
  detailsPageNumber: 0,
  detailsSize: 0,
  detailChange: false,
  isDetailsTabValid: true,
  //Text tab
  textChange: false,
  //save
  saveEditInvoice: null,
  editReason: "",

  //companyDetails
  companyFK: null,
  companyName: "",

  //browse page data
  invoiceData: [],

  //credit card
  amountForCreditCard: 0,
  creditCardArrayList: [],
  remainingAmount: 0,
  transIds: "",
  dispatchStatus: true,
  isCreditCardRequired: false,

  // When refresh, for navigation
  // to unit selection screen
  unitSelectionReset: false,
  cancelChanges: false,
  //edit save
  print: false,
  emailToCustomer: false,
  emailToUser: false,
  includeDocument: false,
};

const EditInvoice = createSlice({
  name: "editInvoice",
  initialState: initialState,
  reducers: {
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
    setSelectedCompanyName: (state, action) => {
      state.selectedCompanyName = action.payload;
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },
    setUnitNumberLast5: (state, action) => {
      state.unitNumberLast5 = action.payload;
    },
    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
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
    setInvoicePK: (state, action) => {
      state.invoicePK = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
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
    setTextChange: (state, action) => {
      state.textChange = action.payload;
    },
    setUnitSelectionReset: (state, action) => {
      state.unitSelectionReset = action.payload;
    },
    toggleCancelChanges: (state) => {
      state.cancelChanges = !state.cancelChanges;
    },
    setSaveEditInvoice: (state, action) => {
      if (!action?.payload) {
        state.saveEditInvoice = null;
      }
      const { payload, key } = action?.payload;

      if (key === "invoiceText") {
        state.saveEditInvoice = { ...state?.saveEditInvoice, invoiceTextsCombined: payload };
      }
      if (key === "invoiceById") {
        state.saveEditInvoice = {
          ...state?.saveEditInvoice,
          invoiceById: payload?.invoiceById,
          invoiceDetailsData: payload?.invoiceDetailsData,
        };
      }
      if (key === "editReason") {
        state.saveEditInvoice = { ...state?.saveEditInvoice, editReason: payload };
      }
      if (key === "voidedReason") {
        // state.saveEditInvoice = {...state?.saveEditInvoice, voidedReason:payload.voidReason, voidFlag:payload.voidFlag}
        state.saveEditInvoice = { ...state?.saveEditInvoice, ...payload };
      }
      if (key === "creditCardArrayList") {
        state.saveEditInvoice = { ...state.saveEditInvoice, monetraChargesVOList: payload };
      }
      if (key === "print") {
        state.saveEditInvoice = { ...state.saveEditInvoice, print: payload };
      }
      if (key === "emailToCustomer") {
        state.saveEditInvoice = { ...state.saveEditInvoice, emailToCustomer: payload };
      }
      if (key === "emailToUser") {
        state.saveEditInvoice = { ...state.saveEditInvoice, emailToUser: payload };
      }
      if (key === "includeDocument") {
        state.saveEditInvoice = { ...state.saveEditInvoice, includeDocument: payload };
      }
      if (key === "transIds") {
        state.saveEditInvoice = { ...state.saveEditInvoice, transIds: payload };
      }
    },
    setEditReason: (state, action) => {
      state.editReason = action.payload;
    },
    setCompanyFK: (state, action) => {
      state.companyFK = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setInvoiceData: (state, action) => {
      state.invoiceData = action.payload;
    },
    setAmountForCreditCard: (state, action) => {
      state.amountForCreditCard = action.payload;
    },
    setCreditCardArrayList: (state, action) => {
      state.creditCardArrayList = action.payload;
    },
    setRemainingAmount: (state, action) => {
      state.remainingAmount = action.payload;
    },
    setTransIds: (state, action) => {
      state.transIds = action.payload;
    },
    setDispatchStatus: (state, action) => {
      state.dispatchStatus = action.payload;
    },
    setIsCreditCardRequired: (state, action) => {
      state.isCreditCardRequired = action.payload;
    },
    resetFields: (state) => {
      Object.assign(state, initialState);
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
    setIncludeDocument: (state, action) => {
      state.includeDocument = action.payload;
    },
  },
});

export const {
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
  setSortType,
  setSelectedCompanyName,
  setSortValue,
  setInvoiceNumber,
  setUnitNumberLast5,
  setUnitNumber,
  setNonUnitData,
  setPageNumberNonUnit,
  setSizeNonUnit,
  setTotalElementsNonUnit,
  setSearchCriteriaNonUnit,
  setSelectedCustomerId,
  setCustomerName,
  setDealerId,
  setDealerName,
  setChangeColour,
  setNonUnitCancel,
  setMiscellaniousFlag,
  setNonUnitInvoiceNumber,
  setNonUnitUnitNumber,
  setNonUnitPoNumber,
  setUnitNumberId,
  setNonUnitSortType,
  setNonUnitSortValue,
  setSearchTermNonUnit,
  setTotalPagesNonUnit,
  setInvoicePK,
  setViewDetail,
  setChangeColor,
  setInvoiceById,
  setInvoiceByIdInitially,
  setInvoiceDetailsInitially,
  setInvoiceDetailsData,
  setInvoiceDetailPK,
  setTotalDetailsPages,
  setTotalDetailsElements,
  setDetailsPageNumber,
  setDetailsSize,
  setDetailChange,
  setIsDetailsTabValid,
  setTextChange,
  setUnitSelectionReset,
  setSaveEditInvoice,
  setEditReason,
  setCompanyFK,
  setCompanyName,
  setInvoiceData,
  setAmountForCreditCard,
  setCreditCardArrayList,
  setRemainingAmount,
  setTransIds,
  setDispatchStatus,
  setIsCreditCardRequired,
  resetFields,
  toggleCancelChanges,
  setPrint,
  setEmailToCustomer,
  setEmailToUser,
  setIncludeDocument,
} = EditInvoice.actions;

export default EditInvoice.reducer;
