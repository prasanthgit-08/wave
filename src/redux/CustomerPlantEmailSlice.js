import { createSlice } from "@reduxjs/toolkit";

const CustomerPlantEmailSlice = createSlice({
  name: "CustomerPlantEmail",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    emailData: [],
    saveFormData: null,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    normalSortValue: null,
    normalSortFlag: false,
    selectedStatus: "Active",
    //input
    checkName: "",
    checkEmail: "",
    name: "",
    email: "",
    reportsAsText: false,
    reportsAsExcel: false,
    reportsAsPDF: false,
    reportsAsCSV: false,
    unassignedUnitsReport: false,
    unassignedUnitsOutbound: false,
    unassignedUnitsReload: false,
    unassignedUnitsShippersOnly: false,
    unassignedUnitsStorageOnly: false,
    yardExitReport: false,
    deliveredUnitsReport: false,
    unitInventoryMaster: false,
    invoiceDays: "",
    bolAtOrderEntry: false,
    bolAtOrderEntryForDPUCustomers: false,
    bolBatchAtExitOrderEntry: false,
    bolBatchDaily: false,
    bolAtDispatch: false,
    copyOfPAPS: false,
    dispatchUpdates: false,
    deliveryOnly: false,
    dispatchOnly: false,
    returnedUpdates: false,
    breakdowns: false,
    damaged: false,
    dispatchDelays: false,
    shuttleDelays: false,
    invoices: false,
    invoiceBOLOnly: false,
    invoiceDAFOnly: false,
    creditCardCharges: false,
    changesCancelled: false,
    isReportsTabValid: true,
    isDetailsTabValid: true,
    isDispatchTabValid: true,
    specialCodeInput: "",
    specialCodeId: null,
    onRoadReport: false,
    unreleasedUnits: false,
    requirePlantRelease: false,
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
    setEmailData: (state, action) => {
      state.emailData = action.payload;
    },
    setSaveFormData: (state, action) => {
      let payload = action.payload;
      state.saveFormData = { ...state.saveFormData, ...payload };
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
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
    //input
    setReportsAsText: (state, action) => {
      state.reportsAsText = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setCheckName: (state, action) => {
      state.checkName = action.payload;
    },
    setCheckEmail: (state, action) => {
      state.checkEmail = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setReportsAsExcel: (state, action) => {
      state.reportsAsExcel = action.payload;
    },

    setReportsAsPDF: (state, action) => {
      state.reportsAsPDF = action.payload;
    },

    setReportsAsCSV: (state, action) => {
      state.reportsAsCSV = action.payload;
    },
    setUnassignedUnitsReport: (state, action) => {
      state.unassignedUnitsReport = action.payload;
    },
    setUnassignedUnitsOutbound: (state, action) => {
      state.unassignedUnitsOutbound = action.payload;
    },

    setUnassignedUnitsReload: (state, action) => {
      state.unassignedUnitsReload = action.payload;
    },
    setUnassignedUnitsShippersOnly: (state, action) => {
      state.unassignedUnitsShippersOnly = action.payload;
    },
    setUnassignedUnitsStorageOnly: (state, action) => {
      state.unassignedUnitsStorageOnly = action.payload;
    },

    setYardExitReport: (state, action) => {
      state.yardExitReport = action.payload;
    },
    setDeliveredUnitsReport: (state, action) => {
      state.deliveredUnitsReport = action.payload;
    },
    setunitInventoryMaster: (state, action) => {
      state.unitInventoryMaster = action.payload;
    },
    setinvoiceDays: (state, action) => {
      state.invoiceDays = action.payload;
    },
    setBolAtOrderEntry: (state, action) => {
      state.bolAtOrderEntry = action.payload;
    },
    setBolAtOrderEntryForDPUCustomers: (state, action) => {
      state.bolAtOrderEntryForDPUCustomers = action.payload;
    },
    setBolBatchAtExitOrderEntry: (state, action) => {
      state.bolBatchAtExitOrderEntry = action.payload;
    },
    setbolBatchDaily: (state, action) => {
      state.bolBatchDaily = action.payload;
    },
    setbolAtDispatch: (state, action) => {
      state.bolAtDispatch = action.payload;
    },
    setCopyOfPAPS: (state, action) => {
      state.copyOfPAPS = action.payload;
    },
    setDispatchUpdates: (state, action) => {
      state.dispatchUpdates = action.payload;
    },
    setDeliveryOnly: (state, action) => {
      state.deliveryOnly = action.payload;
    },
    setDispatchOnly: (state, action) => {
      state.dispatchOnly = action.payload;
    },
    setReturnedUpdates: (state, action) => {
      state.returnedUpdates = action.payload;
    },
    setSpecialCodeId: (state, action) => {
      state.specialCodeId = action.payload;
    },
    setSpecialCodeInput: (state, action) => {
      state.specialCodeInput = action.payload;
    },
    setBreakdowns: (state, action) => {
      state.breakdowns = action.payload;
    },
    setDamaged: (state, action) => {
      state.damaged = action.payload;
    },
    setDispatchDelays: (state, action) => {
      state.dispatchDelays = action.payload;
    },
    setShuttleDelays: (state, action) => {
      state.shuttleDelays = action.payload;
    },
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    setInvoiceBOLOnly: (state, action) => {
      state.invoiceBOLOnly = action.payload;
    },
    setInvoiceDAFOnly: (state, action) => {
      state.invoiceDAFOnly = action.payload;
    },

    setCreditCardCharges: (state, action) => {
      state.creditCardCharges = action.payload;
    },
    setOnRoadReport: (state, action) => {
      state.onRoadReport = action.payload;
    },
    setUnreleasedUnits: (state, action) => {
      state.unreleasedUnits = action.payload;
    },
    setRequirePlantRelease: (state, action) => {
      state.requirePlantRelease = action.payload;
    },

    resetChanges: (state, action) => {
      state.name = "";
      state.email = "";
      state.checkName = "";
      state.checkEmail = "";
      state.invoiceDays = "";
      state.reportsAsCSV = false;
      state.reportsAsExcel = false;
      state.reportsAsPDF = false;
      state.reportsAsText = false;
      state.unassignedUnitsOutbound = false;
      state.unassignedUnitsReload = false;
      state.unassignedUnitsShippersOnly = false;
      state.unassignedUnitsStorageOnly = false;
      state.unassignedUnitsReport = false;
      state.yardExitReport = false;
      state.deliveredUnitsReport = false;
      state.unitInventoryMaster = false;
      state.invoiceDays = "";
      state.bolAtOrderEntry = false;
      state.bolAtOrderEntryForDPUCustomers = false;
      state.bolBatchDaily = false;
      state.bolBatchAtExitOrderEntry = false;
      state.bolBatchDaily = false;
      state.bolAtDispatch = false;
      state.copyOfPAPS = false;
      state.dispatchUpdates = false;
      state.deliveryOnly = false;
      state.dispatchOnly = false;
      state.returnedUpdates = false;
      state.breakdowns = false;
      state.damaged = false;
      state.dispatchDelays = false;
      state.shuttleDelays = false;
      state.invoices = false;
      state.invoiceBOLOnly = false;
      state.invoiceDAFOnly = false;
      state.creditCardCharges = false;
      state.specialCodeId = null;
      state.specialCodeInput = "";
      state.onRoadReport = false;
      state.unreleasedUnits = false;
      state.requirePlantRelease = false;
    },

    setCheckCode: (state, action) => {
      state.checkCode = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setIsDetailsTabValid: (state, action) => {
      state.isDetailsTabValid = action.payload;
    },
    setIsReportsTabValid: (state, action) => {
      state.isReportsTabValid = action.payload;
    },
    setIsDispatchTabValid: (state, action) => {
      state.isDispatchTabValid = action.payload;
    },
    resetClose: (state, action) => {
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
  setEmailData,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setDeleaseCodeData,
  setSaveFormData,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
  setBrowseNavigation,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setEditFormData,
  setCode,
  setDescription,
  setCheckCode,
  resetChanges,
  toggleChangesCancelled,
  setSelectedStatus,
  setName,
  setCheckName,
  setCheckEmail,
  setEmail,
  setReportsAsCSV,
  setReportsAsExcel,
  setReportsAsPDF,
  setReportsAsText,
  setUnassignedUnitsReport,
  setUnassignedUnitsOutbound,
  setUnassignedUnitsReload,
  setUnassignedUnitsShippersOnly,
  setUnassignedUnitsStorageOnly,
  setYardExitReport,
  setDeliveredUnitsReport,
  setunitInventoryMaster,
  setinvoiceDays,
  setBolAtOrderEntry,
  setBolAtOrderEntryForDPUCustomers,
  setBolBatchAtExitOrderEntry,
  setbolBatchDaily,
  setbolAtDispatch,
  setCopyOfPAPS,
  setDispatchUpdates,
  setDeliveryOnly,
  setDispatchOnly,
  setReturnedUpdates,
  setSpecialCodeId,
  setSpecialCodeInput,
  setBreakdowns,
  setDamaged,
  setDispatchDelays,
  setShuttleDelays,
  setInvoices,
  setInvoiceBOLOnly,
  setInvoiceDAFOnly,
  setCreditCardCharges,
  setUnreleasedUnits,
  setRequirePlantRelease,
  setOnRoadReport,
  resetClose,
  setIsDetailsTabValid,
  setIsReportsTabValid,
  setIsDispatchTabValid,
} = CustomerPlantEmailSlice.actions;

export const customerPlant = (state) => state.customerPlant.value;
export default CustomerPlantEmailSlice.reducer;
