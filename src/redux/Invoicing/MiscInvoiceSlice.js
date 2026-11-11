import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  searchCriteria: "",
  totalPages: 0,
  totalElements: 0,
  pageNumber: 0,
  size: 0,
  id: null,
  viewDetail: false,
  /****companyDetails***/
  companyFK: null,
  companyName: "",
  localCompany: false,
  isLocalCompany: false,
  /******
   * Auto Complete Drop down
   * ******/
  selectId: null,
  unitNumberPK: null,
  unitNumberLast5: "",
  unitNumberInput: "",
  unitNumber: "",
  unitDetails: [],
  unitsLoading: true,
  unitSelected: null,
  selectedUnit: null,
  changeColor: false,
  isUnitInvoice: false,
  /*****
   * Miscellaneous Invoice Browse Page Data
   * ****/
  miscInvoiceData: [],
  unitRecordData: null,
  miscInvoiceFormData: null,
  /*****Invoice detaila tab and Text Tab****/
  totalAmount: null,
  description: "",
  amount: "",
  isDetailsTabValid: false,
  flagAddorEdit: false,
  invoiceText1: "",
  invoiceText2: "",
  invoiceText3: "",
  invoiceText4: "",
  invoiceTextInputs: [],
  isAddOrEditClicked: false,
  /****List of amounts and description */
  list: [],
  /*****For Documents Screen****/
  inactiveDropzone: true,
  customerPaperworkFiles: [],
  companyPaperworkFiles: [],
  /******Customer Lookup */
  customerSelection: false,
  customerInput: "",
  customerId: "",
  customerFK: "",
  /******Dealer Lookup******/
  dealerSelection: false,
  dealerInput: "",
  dealerId: "",
  dealerFK: "",
  /*****Flag for non Unit unit number****/
  isNonUnitNumberPresent: false,
  isRequirePO: false,
  nonUnitNumber: "",
  poNumber: "",
  isNonUnitInvoice: false,
  /*****existing Invoices****/
  existingInvoices: [],
  existingInvoiceDetails: [],
  existingMiscInvoice: false,
  isExistingMiscInvoice: false,
  existingInvoicepageNumber: 0,
  invoiceFK: null,
  existingChangeColor: false,
  selectedExistingInvoice: null,

  /****credit card */
  creditCardArrayList: [],
  creditCardNavigation: "",
  creditCardCase: "",
  transIds: "",
  dispatchStatus: false,

  miscInvoiceFiles: {
    customerUploadFiles: [],
    companyUploadFiles: [],
    customerScanFiles: [],
    companyScanFiles: [],
    isScanning: false,
  },
  /******flag for crossdb */
  invoiceSisterCustomer: false,
  isSisterCompany: false,
  localCompanyName: "",
  /******For Alternate customer screen*****/
  notCrossCompany: [],
  notCrossCompanydata2: [],

  selectedOption: "Customer",
  cancelChanges: false,
  selectedCompanyName: "",
};

const MiscInvoice = createSlice({
  name: "miscInvoice",
  initialState: initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setUnitRecordData: (state, action) => {
      state.unitRecordData = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setSelectId: (state, action) => {
      state.selectId = action.payload;
    },
    setUnitNumberPK: (state, action) => {
      state.unitNumberPK = action.payload;
    },
    setUnitNumberLast5: (state, action) => {
      state.unitNumberLast5 = action.payload;
    },
    setUnitNumberInput: (state, action) => {
      state.unitNumberInput = action.payload;
    },
    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setUnitDetails: (state, action) => {
      state.unitDetails = action.payload;
    },
    setUnitSelected: (state, action) => {
      state.unitSelected = action.payload;
    },
    setSelectedUnit: (state, action) => {
      state.selectedUnit = action.payload;
    },
    setUnitsLoading: (state, action) => {
      state.unitsLoading = action.payload;
    },
    setMiscInvoiceFormData: (state, action) => {
      let payload = action.payload;
      state.miscInvoiceFormData = { ...state.miscInvoiceFormData, ...payload };
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
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setCompanyFK: (state, action) => {
      state.companyFK = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setMiscInvoiceData: (state, action) => {
      state.miscInvoiceData = action.payload;
    },
    setIsDetailsTabValid: (state, action) => {
      state.isDetailsTabValid = action.payload;
    },
    setFlagAddorEdit: (state, action) => {
      state.flagAddorEdit = action.payload;
    },
    setInvoiceText1: (state, action) => {
      state.invoiceText1 = action.payload;
    },
    setInvoiceText2: (state, action) => {
      state.invoiceText2 = action.payload;
    },
    setInvoiceText3: (state, action) => {
      state.invoiceText3 = action.payload;
    },
    setInvoiceText4: (state, action) => {
      state.invoiceText4 = action.payload;
    },
    setList: (state, action) => {
      state.list = action.payload;
    },
    setCreditCardArrayList: (state, action) => {
      state.creditCardArrayList = action.payload;
    },
    resetChanges: (state, action) => {
      state.pageNumber = 0;
      state.totalPages = 0;
      state.searchCriteria = 0;
      state.searchTerm = 0;
      state.totalElements = 0;
      state.companyFK = null;
      state.companyName = "";
      state.isUnitInvoice = false;
    },
    resetDetailsandTextTabValues: (state, action) => {
      state.invoiceText1 = "";
      state.invoiceText2 = "";
      state.invoiceText3 = "";
      state.invoiceText4 = "";
      state.amount = "";
      state.description = "";
      state.list = [];
      state.invoiceTextInputs = [];
      state.isAddOrEditClicked = false;
      state.flagAddorEdit = false;
    },
    resetCustomerDealer: (state, action) => {
      state.customerInput = "";
      state.customerId = "";
      state.dealerInput = "";
      state.dealerId = "";
      state.nonUnitNumber = "";
      state.poNumber = "";
      state.isNonUnitInvoice = false;
      state.customerFK = "";
    },
    resetExistingMiscellaneous: (state, action) => {
      state.existingInvoices = [];
      state.existingInvoiceDetails = [];
      state.existingMiscInvoice = false;
      state.isExistingMiscInvoice = false;
      state.existingInvoicepageNumber = 0;
      state.invoiceFK = null;
      state.existingChangeColor = false;
      state.selectedExistingInvoice = null;
    },
    resetCreditCardStates: (state, action) => {
      state.creditCardArrayList = [];
      state.creditCardNavigation = "";
      state.creditCardCase = "";
    },
    setInactiveDropzone: (state, action) => {
      state.inactiveDropzone = action.payload;
    },
    setCustomerPaperworkFiles: (state, action) => {
      state.customerPaperworkFiles = action.payload;
    },
    setCompanyPaperworkFiles: (state, action) => {
      state.companyPaperworkFiles = action.payload;
    },
    setInvoiceTextInputs: (state, action) => {
      state.invoiceTextInputs = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setCustomerFK: (state, action) => {
      state.customerFK = action.payload;
    },
    setCustomerSelection: (state, action) => {
      state.customerSelection = action.payload;
    },
    setCustomerInput: (state, action) => {
      state.customerInput = action.payload;
    },
    setDealerId: (state, action) => {
      state.dealerId = action.payload;
    },
    setDealerFK: (state, action) => {
      state.dealerFK = action.payload;
    },
    setDealerSelection: (state, action) => {
      state.dealerSelection = action.payload;
    },
    setDealerInput: (state, action) => {
      state.dealerInput = action.payload;
    },
    setIsNonUnitNumberPresent: (state, action) => {
      state.isNonUnitNumberPresent = action.payload;
    },
    setIsRequirePO: (state, action) => {
      state.isRequirePO = action.payload;
    },
    setExistingInvoices: (state, action) => {
      state.existingInvoices = action.payload;
    },
    setExistingInvoiceDetails: (state, action) => {
      state.existingInvoiceDetails = action.payload;
    },
    setExistingMiscInvoice: (state, action) => {
      state.existingMiscInvoice = action.payload;
    },
    setExistingInvoicepageNumber: (state, action) => {
      state.existingInvoicepageNumber = action.payload;
    },
    setInvoiceFK: (state, action) => {
      state.invoiceFK = action.payload;
    },
    setExistingChangeColor: (state, action) => {
      state.existingChangeColor = action.payload;
    },
    setSelectedExistingInvoice: (state, action) => {
      state.selectedExistingInvoice = action.payload;
    },
    setIsExistingMiscInvoice: (state, action) => {
      state.isExistingMiscInvoice = action.payload;
    },
    setNonUnitNumber: (state, action) => {
      state.nonUnitNumber = action.payload;
    },
    setPoNumber: (state, action) => {
      state.poNumber = action.payload;
    },
    setCreditCardNavigation: (state, action) => {
      state.creditCardNavigation = action.payload;
    },
    setCreditCardCase: (state, action) => {
      state.creditCardCase = action.payload;
    },
    setTransIds: (state, action) => {
      state.transIds = action.payload;
    },
    setDispatchStatus: (state, action) => {
      state.dispatchStatus = action.payload;
    },
    setIsAddOrEditClicked: (state, action) => {
      state.isAddOrEditClicked = action.payload;
    },
    setIsNonUnitInvoice: (state, action) => {
      state.isNonUnitInvoice = action.payload;
    },
    setIsUnitInvoice: (state, action) => {
      state.isUnitInvoice = action.payload;
    },
    setLocalCompany: (state, action) => {
      state.localCompany = action.payload;
    },
    setInvoiceSisterCustomer: (state, action) => {
      state.invoiceSisterCustomer = action.payload;
    },
    setIsSisterCompany: (state, action) => {
      state.isSisterCompany = action.payload;
    },
    setLocalCompanyName: (state, action) => {
      state.localCompanyName = action.payload;
    },

    setIsLocalCompany: (state, action) => {
      state.isLocalCompany = action.payload;
    },
    setMiscInvoiceFiles: (state, action) => {
      const { actionType, payload } = action.payload;
      // Define mapping for actionType to corresponding key in miscInvoiceFiles
      const keyMapping = {
        customerUploadFiles: "customerUploadFiles",
        companyUploadFiles: "companyUploadFiles",
        customerScanFiles: "customerScanFiles",
        companyScanFiles: "companyScanFiles",
      };

      // Get the correct key from the mapping
      const targetKey = keyMapping[actionType];

      if (targetKey) {
        state.miscInvoiceFiles[targetKey] = payload;
      }

      if (actionType === "setScanStatus") {
        state.miscInvoiceFiles["isScanning"] = payload;
      }

      if (actionType === "clear") {
        state.miscInvoiceFiles = initialState.miscInvoiceFiles;
      }
    },

    resetFields: (state) => {
      state = initialState;
    },
    setNotCrossCompany: (state, action) => {
      state.notCrossCompany = action.payload;
    },
    setNotCrossCompanydata2: (state, action) => {
      state.notCrossCompanydata2 = action.payload;
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    toggleCancelChanges: (state) => {
      state.cancelChanges = !state.cancelChanges;
    },
    setSelectedCompanyName: (state, action) => {
      state.selectedCompanyName = action.payload;
    },
  },
});
export const {
  setId,
  setUnitRecordData,
  setSelectId,
  setUnitNumberPK,
  setUnitNumberLast5,
  setUnitNumberInput,
  setUnitDetails,
  setUnitsLoading,
  setSearchTerm,
  setSearchCriteria,
  setTotalPages,
  setTotalElements,
  setPageNumber,
  setSize,
  setCompanyFK,
  setCompanyName,
  setMiscInvoiceData,
  resetChanges,
  setUnitSelected,
  setUnitNumber,
  setSelectedUnit,
  setChangeColor,
  setViewDetail,
  setMiscInvoiceFormData,
  setTotalAmount,
  setDescription,
  setIsDetailsTabValid,
  setFlagAddorEdit,
  setInactiveDropzone,
  setCompanyPaperworkFiles,
  setCustomerPaperworkFiles,
  setInvoiceText1,
  setInvoiceText2,
  setInvoiceText3,
  setInvoiceText4,
  setAmount,
  setList,
  resetDetailsandTextTabValues,
  setInvoiceTextInputs,
  setCustomerId,
  setCustomerInput,
  setCustomerSelection,
  setCustomerFK,
  setDealerFK,
  setDealerId,
  setDealerInput,
  setDealerSelection,
  resetCustomerDealer,
  setIsNonUnitNumberPresent,
  setIsRequirePO,
  setExistingInvoices,
  setExistingInvoiceDetails,
  setExistingMiscInvoice,
  setExistingInvoicepageNumber,
  setInvoiceFK,
  setExistingChangeColor,
  setSelectedExistingInvoice,
  setIsExistingMiscInvoice,
  resetExistingMiscellaneous,
  setNonUnitNumber,
  setPoNumber,
  setCreditCardArrayList,
  setCreditCardNavigation,
  setCreditCardCase,
  setTransIds,
  setDispatchStatus,
  resetCreditCardStates,
  setIsAddOrEditClicked,
  setMiscInvoiceFiles,
  setIsNonUnitInvoice,
  setIsUnitInvoice,
  setLocalCompany,
  setInvoiceSisterCustomer,
  setIsSisterCompany,
  setLocalCompanyName,
  setNotCrossCompany,
  setNotCrossCompanydata2,
  setIsLocalCompany,
  setSelectedOption,
  toggleCancelChanges,
  setSelectedCompanyName,
} = MiscInvoice.actions;

export default MiscInvoice.reducer;
