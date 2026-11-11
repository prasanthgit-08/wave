import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unitNumber: "",
  orderDate: null,
  pickupName: null,
  deliveryName: null,
  pageNumber: 0,
  pageSize: 6,
  totalElements: 0,
  normalSortFlag: false,
  normalSortValue: null,
  searchTerm: "",
  searchCriteria: "Beginning",
  unitNumberLast5: "",
  bolNumber: "",
  sortType: true,
  dpuInvoiceData: [],
  sortValue: "",
  dpuInvoiceDataAutocomplete: "",
  dpuInvoiceConfirmationData: [],
  model: "",
  totalPages: 0,
  vin: "",
  unitCode: "",
  customerCity: "",
  customerName: "",
  customerStateCode: "",
  customerFK: null,
  deliveryState: "",
  deliverycity: "",
  pickUpName: "",
  pickUpState: "",
  pickUpcity: "",
  specialCode: "",
  invoiceTextData: [],
  creditCardArrayList: [],
  invoiceSaveStatus: false,
  changeColor: false,
  unitPK: null,
  invoiceText1: "",
  invoiceText2: "",
  invoiceText3: "",
  invoiceText4: "",
  invoiceAmount: 0,
  storageFees: "",
  startAndRunFees: "",
  disableSave: false,
  selectedId: "",
  isCreditCardPrepaid: false,
  remainingAmount: 0,
  creditCardClicked: false,
  unitNumberConfirmation: "",

  inputInvoiceText: Array(4).fill(""),

  dpuInvoicePaperworkFiles: {
    customerUploadFiles: [],
    companyUploadFiles: [],
    customerScanFiles: [],
    companyScanFiles: [],
  },
  isButtonsLoopingCompleted: false,
  dpuInvoicePayload: null,
  dispatchStatus: false,
  transIds: "",
};

const DPUInvoiceSlice = createSlice({
  name: "dpuInvoice",
  initialState: {
    unitNumber: "",
    orderDate: null,
    pickupName: null,
    deliveryName: null,
    pageNumber: 0,
    pageSize: 6,
    totalElements: 0,
    normalSortFlag: false,
    normalSortValue: null,
    searchTerm: "",
    searchCriteria: "Beginning",
    unitNumberLast5: "",
    bolNumber: "",
    sortType: true,
    dpuInvoiceData: [],
    sortValue: "",

    dpuInvoiceDataAutocomplete: [],
    dpuInvoiceConfirmationData: [],
    model: "",
    totalPages: 0,
    vin: "",
    unitCode: "",
    customerCity: "",
    customerName: "",
    customerStateCode: "",
    deliveryState: "",
    deliverycity: "",
    pickUpName: "",
    pickUpState: "",
    pickUpcity: "",
    specialCode: "",
    invoiceTextData: [],
    creditCardArrayList: [],
    invoiceSaveStatus: false,
    changeColor: false,
    unitPK: null,
    invoiceText1: "",
    invoiceText2: "",
    invoiceText3: "",
    invoiceText4: "",
    invoiceAmount: "",
    storageFees: "",
    startAndRunFees: "",
    disableSave: false,
    selectedId: "",

    inputInvoiceText: Array(4).fill(""),

    dpuInvoicePaperworkFiles: {
      customerUploadFiles: [],
      companyUploadFiles: [],
      customerScanFiles: [],
      companyScanFiles: [],
    },
    isButtonsLoopingCompleted: false,
    dpuInvoicePayload: null,
    dispatchStatus: false,
    transIds: "",
  },
  reducers: {
    setUnitPK: (state, action) => {
      state.unitPK = action.payload;
    },
    setUnitNumberConfirmation: (state, action) => {
      state.unitNumberConfirmation = action.payload;
    },

    setInvoiceText1: (state, action) => {
      state.invoiceText1 = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setInvoiceText2: (state, action) => {
      state.invoiceText2 = action.payload;
    },
    setInvoiceText3: (state, action) => {
      state.invoiceText3 = action.payload;
    },
    setInputInvoiceText: (state, action) => {
      state.inputInvoiceText = action.payload;
    },

    setCustomerFK: (state, action) => {
      state.customerFK = action.payload;
    },

    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },

    setInvoiceText4: (state, action) => {
      state.invoiceText4 = action.payload;
    },
    setInvoiceAmount: (state, action) => {
      state.invoiceAmount = action.payload;
    },
    setStorageFees: (state, action) => {
      state.storageFees = action.payload;
    },
    setStartAndRunFees: (state, action) => {
      state.startAndRunFees = action.payload;
    },

    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setUnitCode: (state, action) => {
      state.unitCode = action.payload;
    },
    setInvoiceSaveStatus: (state, action) => {
      state.invoiceSaveStatus = action.payload;
    },
    setInvoiceTextData: (state, action) => {
      state.invoiceTextData = action.payload;
    },
    setSpecialCode: (state, action) => {
      state.specialCode = action.payload;
    },
    setPickUpcity: (state, action) => {
      state.pickUpcity = action.payload;
    },
    setPickUpState: (state, action) => {
      state.pickUpState = action.payload;
    },
    setPickUpName: (state, action) => {
      state.pickUpName = action.payload;
    },
    setDeliverycity: (state, action) => {
      state.deliverycity = action.payload;
    },
    setDeliveryState: (state, action) => {
      state.deliveryState = action.payload;
    },
    setCustomerStateCode: (state, action) => {
      state.customerStateCode = action.payload;
    },
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
    setCreditCardClicked: (state, { payload }) => {
      state.creditCardClicked = payload;
    },

    setCustomerCity: (state, action) => {
      state.customerCity = action.payload;
    },

    setModel: (state, action) => {
      state.model = action.payload;
    },
    setVin: (state, action) => {
      state.vin = action.payload;
    },
    setDpuInvoiceConfirmationData: (state, action) => {
      state.dpuInvoiceConfirmationData = action.payload;
    },
    setOrderDate: (state, action) => {
      state.orderDate = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setPickupName: (state, action) => {
      state.pickupName = action.payload;
    },
    setDeliveryName: (state, action) => {
      state.deliveryName = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setUnitNumberLast5: (state, action) => {
      state.unitNumberLast5 = action.payload;
    },
    setBolNumber: (state, action) => {
      state.bolNumber = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setCreditCardArrayList: (state, action) => {
      state.creditCardArrayList = action.payload;
    },
    setDpuInvoiceData: (state, action) => {
      state.dpuInvoiceData = action.payload;
    },

    setInvoiceTextInputValues: (state, action) => {
      state.invoiceTextInputValues = action.payload;
    },

    setDpuInvoiceDataAutocomplete: (state, action) => {
      state.dpuInvoiceDataAutocomplete = action.payload;
    },

    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setIsCreditCardPrepaid: (state, action) => {
      state.isCreditCardPrepaid = action.payload;
    },
    setRemainingAmount: (state, action) => {
      state.remainingAmount = action.payload;
    },

    setDpuInvoicePaperworkFiles: (state, action) => {
      const { actionType, payload } = action.payload;

      // Define mapping for actionType to corresponding key in dpuInvoicePaperworkFiles
      const keyMapping = {
        customerUploadFiles: "customerUploadFiles",
        companyUploadFiles: "companyUploadFiles",
        customerScanFiles: "customerScanFiles",
        companyScanFiles: "companyScanFiles",
      };

      // Get the correct key from the mapping
      const targetKey = keyMapping[actionType];

      if (targetKey) {
        state.dpuInvoicePaperworkFiles[targetKey] = payload;
      }

      if (actionType === "clear") {
        state.dpuInvoicePaperworkFiles = initialState.dpuInvoicePaperworkFiles;
        state.isButtonsLoopingCompleted = initialState.isButtonsLoopingCompleted;
      }
    },
    setIsButtonsLoopingCompleted: (state, action) => {
      state.isButtonsLoopingCompleted = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },

    setDpuInvoicePayload: (state, action) => {
      state.dpuInvoicePayload = { ...state.dpuInvoicePayload, ...action.payload };
    },
    setDispatchStatus: (state, action) => {
      state.dispatchStatus = action.payload;
    },
    setTransIds: (state, action) => {
      state.transIds = action.payload;
    },
    resetChanges: (state, action) => {
      state.unitNumber = "";
      state.unitPK = null;
      state.unitNumberConfirmation = "";
      state.dpuInvoiceData = [];
      state.bolNumber = "";
      state.unitNumberLast5 = "";
      state.dpuInvoicePaperworkFiles = {
        customerUploadFiles: [],
        companyUploadFiles: [],
        customerScanFiles: [],
        companyScanFiles: [],
      };
      state.inputInvoiceText = Array(4).fill("");
      state.transIds = "";
      state.dispatchStatus = false;
    },
  },
});

export const {
  setUnitNumber,
  setChangeColor,
  setOrderDate,
  setPickupName,
  setDeliveryName,
  setTotalNumber,
  setTotalElements,
  setSortValue,
  setNormalSortFlag,
  setSearchTerm,
  setSearchCriteria,
  setUnitNumberLast5,
  setBolNumber,
  setPageNumber,
  setDpuInvoiceData,
  setSortType,
  setDpuInvoiceDataAutocomplete,
  setDpuInvoiceConfirmationData,
  setModel,
  setVin,
  setUnitCode,
  setCustomerCity,
  setCustomerName,
  setCustomerStateCode,
  setDeliveryState,
  setDeliverycity,
  setPickUpName,
  setPickUpState,
  setPickUpcity,
  setSpecialCode,
  setInvoiceTextData,
  setInvoiceSaveStatus,
  setCreditCardArrayList,
  setUnitPK,
  setInvoiceText1,
  setInvoiceText2,
  setInvoiceText3,
  setInvoiceText4,
  setInvoiceTextInputValues,
  setStartAndRunFees,
  setStorageFees,
  setInvoiceAmount,
  updateInvoiceTextValue,
  setInputInvoiceText,
  setDpuInvoicePaperworkFiles,
  setIsButtonsLoopingCompleted,
  setDpuInvoicePayload,
  setDisableSave,
  setNormalSortValue,
  setSelectedId,
  setTotalPages,
  setIsCreditCardPrepaid,
  setRemainingAmount,
  setCustomerFK,
  setCreditCardClicked,
  setUnitNumberConfirmation,
  resetChanges,
  setDispatchStatus,
  setTransIds,
} = DPUInvoiceSlice.actions;

export default DPUInvoiceSlice;
