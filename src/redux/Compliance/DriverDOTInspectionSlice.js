import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 0,
  searchCriteria: "Beginning",
  searchTerm: "",
  radioButtons: "All",
  driverList: [],
  totalPages: 0,
  totalElements: 0,
  sortValue: "",
  sortType: false,
  pageSize: 10,
  driverFK: 0,
  changeColor: false,
  newNotesData: "",
  newLoading: true,
  usCity: "",
  stateCode: "",
  postalCodePK: null,
  viewDetail: true,
  selectedPK: null,
  newDotActiveTab: "general",
  editDotActiveTab: "general",
  // viewDotActiveTab: "general",
  documentPageNumber: 0,
  documentsData: [],
  documentTotalElements: 0,
  docuemntTotalPages: 0,
  maintenanceViolation: false,
  newMaintenanceData: [],
  newGeneralTabValid: false,
  newMaintenanceTabValid: false,
  newDocumentsTabValid: true,
  editGeneralTabValid: false,
  editMaintenanceTabValid: false,
  editDocumentsTabValid: false,
  daysTillHold: 0,
  complianceHold: false,
  driverDotInspectionDocumentFiles: {
    uploadFiles: [],
    scanFiles: [],
  },
  documentsTabRedisKeys: [],
  saveFormData: null,
};

const DriverDOTInspection = createSlice({
  name: "driverDOTInspection",
  initialState,
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setRadioButtons: (state, action) => {
      state.radioButtons = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setUsCity: (state, action) => {
      state.usCity = action.payload;
    },
    setStateCode: (state, action) => {
      state.stateCode = action.payload;
    },
    setpostalCodePK: (state, action) => {
      state.postalCodePK = action.payload;
    },
    setNewLoading: (state, action) => {
      state.newLoading = action.payload;
    },
    setViewdetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setSelectedPK: (state, action) => {
      state.selectedPK = action.payload;
    },
    setNewDotActiveTab: (state, action) => {
      state.newDotActiveTab = action.payload;
    },
    setEditDotActiveTab: (state, action) => {
      state.editDotActiveTab = action.payload;
    },
    setDocumentPageNumber: (state, action) => {
      state.documentPageNumber = action.payload;
    },
    setDocumentsData: (state, action) => {
      state.documentsData = action.payload;
    },
    setDocumentTotalElements: (state, action) => {
      state.documentTotalElements = action.payload;
    },
    setDocuemntTotalPages: (state, action) => {
      state.docuemntTotalPages = action.payload;
    },
    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },
    setMaintenanceViolation: (state, action) => {
      state.maintenanceViolation = action.payload;
    },
    setDriverList: (state, action) => {
      state.driverList = action.payload;
    },
    resetNewGeneralTab: (state, action) => {
      state.usCity = "";
      state.stateCode = "";
      state.postalCodePK = null;
      state.newGeneralTabValid = false;
      state.saveFormData = null;
      state.maintenanceViolation = false;
      state.newLoading = true;
    },
    resetNewDocumentsTab: (state, action) => {
      state.driverDotInspectionDocumentFiles.uploadFiles = [];
      state.driverDotInspectionDocumentFiles.scanFiles = [];
      state.documentsTabRedisKeys = [];
      state.newDocumentsTabValid = true;
    },
    resetEditGeneralTab: (state, action) => {
      state.usCity = "";
      state.stateCode = "";
      state.postalCodePK = null;
      state.editGeneralTabValid = false;
      state.saveFormData = null;
      state.editDotActiveTab = "general";
      state.viewDetail = true;
    },
    resetEditDocumentsTab: (state, action) => {
      state.driverDotInspectionDocumentFiles.uploadFiles = [];
      state.driverDotInspectionDocumentFiles.scanFiles = [];
      state.documentsTabRedisKeys = [];
      state.editDocumentsTabValid = false;
    },
    resetBrowseData: (state, action) => {
      state.pageNumber = 0;
      state.searchCriteria = "Beginning";
      state.searchTerm = "";
      state.sortValue = "";
      state.sortType = false;
      state.radioButtons = "All";
      state.selectedPK = null;
    },

    // Edit
    setEditGeneralTabValid: (state, action) => {
      state.editGeneralTabValid = action.payload;
    },
    setEditMaintenanceTabValid: (state, action) => {
      state.editMaintenanceTabValid = action.payload;
    },
    setEditDocumentsTabValid: (state, action) => {
      state.editDocumentsTabValid = action.payload;
    },
    setDaysTillHold: (state, action) => {
      state.daysTillHold = action.payload;
    },
    setComplianceHold: (state, action) => {
      state.complianceHold = action.payload;
    },

    //New
    setNewNotesData: (state, action) => {
      state.newNotesData = action.payload;
    },
    setNewMaintenanceData: (state, action) => {
      state.newMaintenanceData = action.payload;
    },
    setNewGeneralTabValid: (state, action) => {
      state.newGeneralTabValid = action.payload;
    },
    setNewMaintenanceTabValid: (state, action) => {
      state.newMaintenanceTabValid = action.payload;
    },
    setNewDocumentsTabValid: (state, action) => {
      state.newDocumentsTabValid = action.payload;
    },
    setDriverDotInspectionDocumentFiles: (state, action) => {
      const { actionType, payload } = action.payload;

      // Define mapping for actionType to corresponding key in delayBreakdownDocumentFiles
      const keyMapping = {
        uploadFiles: "uploadFiles",
        scanFiles: "scanFiles",
      };

      // Get the correct key from the mapping
      const targetKey = keyMapping[actionType];

      if (targetKey) {
        state.driverDotInspectionDocumentFiles[targetKey] = payload;
      }

      if (actionType === "clear") {
        state.driverDotInspectionDocumentFiles = initialState.driverDotInspectionDocumentFiles;
      }
    },
    setDocumentsTabRedisKeys: (state, action) => {
      const { actionType, payload } = action.payload;

      if (actionType === "update") {
        state.documentsTabRedisKeys = [...state.documentsTabRedisKeys, ...payload];
      }

      if (actionType === "clear") {
        state.documentsTabRedisKeys = [];
      }
    },
    setSaveFormData: (state, action) => {
      let payload = action.payload;
      state.saveFormData = { ...state.saveFormData, ...payload };
    },
  },
});

export const {
  setSearchTerms,
  setSearchCriteria,
  setRadioButtons,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setSortValue,
  setSortType,
  setPageSize,
  setChangeColor,
  setUsCity,
  setStateCode,
  setViewdetail,
  setSelectedPK,
  setNewDotActiveTab,
  setEditDotActiveTab,
  setDocumentPageNumber,
  setDocumentsData,
  setDocumentTotalElements,
  setDocuemntTotalPages,
  setDriverFK,
  setMaintenanceViolation,
  setEditGeneralTabValid,
  setEditMaintenanceTabValid,
  setEditDocumentsTabValid,
  setNewGeneralTabValid,
  setNewMaintenanceTabValid,
  setNewDocumentsTabValid,
  setNewNotesData,
  setNewMaintenanceData,
  setDriverDotInspectionDocumentFiles,
  setDocumentsTabRedisKeys,
  setSaveFormData,
  resetNewGeneralTab,
  resetNewDocumentsTab,
  resetEditGeneralTab,
  resetEditDocumentsTab,
  resetBrowseData,
  setDriverList,
  setNewLoading,
  setpostalCodePK,
  setDaysTillHold,
  setComplianceHold,
} = DriverDOTInspection.actions;

export default DriverDOTInspection;
