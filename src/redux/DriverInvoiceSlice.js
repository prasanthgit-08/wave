import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Search filters
  searchTerm: "",
  poNumber: "",
  searchCriteria: "",
  driverSearchCriteria: "Beginning",

  listingData: [],
  driverData: [],
  invoiceDetailsData: [],
  manualEntryData: [],
  driverInvoiceTextData: [],
  invoiceDetailPK: null,

  // Form data
  firstName: "",
  lastName: "",
  driverId: null,
  description: "",
  totalAmount: 0,

  // Pagination
  pageNumber: 0,
  totalPages: 1,
  totalElements: 0,

  unitPageNumber: 0,
  unitTotalPages: 0,
  unitTotalElements: 0,

  // Normal sorting
  normalSortValue: "",
  normalSortFlag: false,
  sortValue: null,
  sortType: null,

  // Additional state
  changeColor: false,
  active: false,
  activeString: "",
  deleased: false,
  selectedStatus: "All",
  editFormData: {},
  manualPhoneValidation: false,
  emailFormat: false,
  manualSaveFlag: false,
  changesCancelled: false,
  detailAddFlag: false,
  sum: 0,
  customerEmail: "",
  emailToDriver: false,
  emailToUser: false,
  invoicePK: null,
  isDetailTabValid: false,

  // Unit Selection
  unitSelectionReset: false,
  unitNumber: "",
  unitNumberLast5: "",
  unitNumberId: null,
  invoiceNumber: "",
  selectedCompanyName: "",
  companyFK: null,
  invoiceData: [],
  nonUnitData: [],
  viewDetail: false,
  sisterUnitFK: null,
  textTabDescription: "",

  // Unit Info
  companyName: "",
  invoiceById: [],

  driverInvoiceFiles: {
    paperworkUploadFiles: [],
    paperworkScanFiles: [],
  },

  unitNumberData: [],
  unitFK: 0,
  selectedId: null,
  uploadActive: false,
  documentFiles: [],
  isNonUnit: false,
  descriptionValid: false,
  print: false,
  loadSave: false,
  activeDriver: false,
};

const DriverInvoiceSlice = createSlice({
  name: "DriverInvoiceSlice",
  initialState: initialState,
  reducers: {
    setSearchTerms: (state, action) => {
      state.searchTerm = action.payload;
    },
    setPoNumber: (state, action) => {
      state.poNumber = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setDriverSearchCriteria: (state, action) => {
      state.driverSearchCriteria = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setDriverData: (state, action) => {
      state.driverData = action.payload;
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
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setActiveString: (state, action) => {
      state.activeString = action.payload;
    },
    setDeleased: (state, action) => {
      state.deleased = action.payload;
    },
    setCustomerEmail: (state, action) => {
      state.customerEmail = action.payload;
    },
    setInvoiceDetailsData: (state, action) => {
      const { index, type, payload } = action.payload;
      if (type === "set") {
        state.invoiceDetailsData = payload;
      } else if (type === "update") {
        state.invoiceDetailsData[index] = {
          ...state.invoiceDetailsData[index],
          ...payload,
        };
      } else if (type === "add") {
        state.invoiceDetailsData.push(payload);
      } else if (type === "clear") {
        state.invoiceDetailsData = [];
      }
    },
    setManualEntryData: (state, action) => {
      state.manualEntryData = action.payload;
    },
    setDriverInvoiceTextData: (state, action) => {
      state.driverInvoiceTextData = action.payload;
    },
    setInvoiceDetailPK: (state, action) => {
      state.invoiceDetailPK = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setManualPhoneValidation: (state, action) => {
      state.manualPhoneValidation = action.payload;
    },
    setEmailFormat: (state, action) => {
      state.emailFormat = action.payload;
    },
    setManualSaveFlag: (state, action) => {
      state.manualSaveFlag = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = action.payload;
    },
    setDetailAddFlag: (state, action) => {
      state.detailAddFlag = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setSum: (state, action) => {
      state.sum = action.payload;
    },
    setIsDetailTabValid: (state, action) => {
      state.isDetailTabValid = action.payload;
    },
    setInvoiceData: (state, action) => {
      state.invoiceData = action.payload;
    },
    setInvoicePK: (state, action) => {
      state.invoicePK = action.payload;
    },
    setNonUnitData: (state, action) => {
      state.nonUnitData = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setUnitSelectionReset: (state, action) => {
      state.unitSelectionReset = action.payload;
    },
    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setUnitNumberLast5: (state, action) => {
      state.unitNumberLast5 = action.payload;
    },
    setUnitNumberId: (state, action) => {
      state.unitNumberId = action.payload;
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },
    setSelectedCompanyName: (state, action) => {
      state.selectedCompanyName = action.payload;
    },
    setCompanyFK: (state, action) => {
      state.companyFK = action.payload;
    },
    toggleCancelChanges: (state, action) => {
      state.changesCancelled = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setInvoiceById: (state, action) => {
      state.invoiceById = action.payload;
    },
    setUnitNumberData: (state, action) => {
      state.unitNumberData = action.payload;
    },
    setUnitFK: (state, action) => {
      state.unitFK = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },

    setDescriptionValid: (state, action) => {
      state.descriptionValid = action.payload;
    },
    resetFields: (state) => initialState,
    resetChanges: (state) => {
      state.invoiceDetailsData = [];
      state.manualEntryData = [];
      state.driverInvoiceTextData = [];
      state.firstName = "";
      state.lastName = "";
      state.driverId = null;
      state.selectedStatus = "All";
      state.editFormData = {};
      state.textTabDescription = "";
    },
    setFormData: (state, action) => {
      const { firstName, lastName, driverId, pageNumber, sortType, sortValue } = action.payload;
      if (firstName !== undefined) state.firstName = firstName;
      if (lastName !== undefined) state.lastName = lastName;
      if (driverId !== undefined) state.driverId = driverId;
      if (pageNumber !== undefined) state.pageNumber = pageNumber;
      if (sortType !== undefined) state.sortType = sortType;
      if (sortValue !== undefined) state.sortValue = sortValue;
    },
    setDriverInvoiceFiles: (state, action) => {
      const { actionType, payload } = action.payload;

      // Define mapping for actionType to corresponding key in dpuInvoicePaperworkFiles
      const keyMapping = {
        paperworkUploadFiles: "paperworkUploadFiles",
        paperworkScanFiles: "paperworkScanFiles",
      };

      // Get the correct key from the mapping
      const targetKey = keyMapping[actionType];

      if (targetKey) {
        state.driverInvoiceFiles[targetKey] = payload;
      }

      if (actionType === "clear") {
        state.driverInvoiceFiles = initialState.driverInvoiceFiles;
      }
    },
    setUploadActive: (state, action) => {
      state.uploadActive = action.payload;
    },
    setDocumentFiles: (state, action) => {
      state.documentFiles = action.payload;
    },
    setUnitPageNumber: (state, action) => {
      state.unitPageNumber = action.payload;
    },
    setUnitTotalPages: (state, action) => {
      state.unitTotalPages = action.payload;
    },
    setUnitTotalElements: (state, action) => {
      state.unitTotalElements = action.payload;
    },
    setSisterUnitFK: (state, action) => {
      state.sisterUnitFK = action.payload;
    },
    setTextTabDescription: (state, action) => {
      state.textTabDescription = action.payload;
    },
    setIsNonUnit: (state, action) => {
      state.isNonUnit = action.payload;
    },

    setEmailToDriver: (state, action) => {
      state.emailToDriver = action.payload;
    },
    setPrint: (state, action) => {
      state.print = action.payload;
    },
    setLoadSave: (state, action) => {
      state.loadSave = action.payload;
    },

    setEmaiToUser: (state, action) => {
      state.emailToUser = action.payload;
    },
    setActiveDriver: (state, action) => {
      state.activeDriver = action.payload;
    },
    setDeleasedDriver: (state, action) => {
      state.deleasedDriver = action.payload;
    },
  },
});

export const {
  setSearchTerms,
  setPoNumber,
  setSearchCriteria,
  setListingData,
  setDriverData,
  setFirstName,
  setLastName,
  setDriverId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setNormalSortValue,
  setNormalSortFlag,
  setSortValue,
  setSortType,
  setChangeColor,
  setActive,
  setActiveString,
  setDeleased,
  setDescription,
  setInvoiceDetailsData,
  setManualEntryData,
  setDriverInvoiceTextData,
  setInvoiceDetailPK,
  setSelectedStatus,
  setEditFormData,
  resetChanges,
  setFormData,
  setManualPhoneValidation,
  setEmailFormat,
  setManualSaveFlag,
  setChangesCancelled,
  setDetailAddFlag,
  setTotalAmount,
  setSum,
  setCustomerEmail,
  setInvoicePK,
  setIsDetailTabValid,
  setInvoiceData,
  setNonUnitData,
  setViewDetail,
  setUnitSelectionReset,
  setUnitNumber,
  setUnitNumberLast5,
  setUnitNumberId,
  setInvoiceNumber,
  setSelectedCompanyName,
  setCompanyFK,
  toggleCancelChanges,
  setCompanyName,
  setInvoiceById,
  setDriverInvoiceFiles,
  resetFields,
  setUnitNumberData,
  setUnitFK,
  setSelectedId,
  setUploadActive,
  setDocumentFiles,
  setUnitPageNumber,
  setUnitTotalPages,
  setUnitTotalElements,
  setTextTabDescription,
  setSisterUnitFK,
  setIsNonUnit,
  setDriverSearchCriteria,
  setEmailToDriver,
  setEmaiToUser,
  setDescriptionValid,
  setPrint,
  setLoadSave,
  setActiveDriver,
  setDeleasedDriver,
} = DriverInvoiceSlice.actions;

export default DriverInvoiceSlice.reducer;
