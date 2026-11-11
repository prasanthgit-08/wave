import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 0,
  searchTerm: "",
  searchCriteria: "Beginning",
  breakdownBrowseData: [],
  breakdownData: [],
  normalSortValue: "",
  normalSortFlag: true,
  changeColor: false,
  id: null,
  totalElements: 0,
  totalPages: 0,
  driverName: "",
  unitNumber: "",
  model: "",
  vin: "",
  unitType: "",
  specialCode: "",
  damageTime: "",
  reportedDate: "",
  reportedTime: "",
  damageCode: "",
  weatherCode: "",
  roadTypeCode: "",
  roadConditionCode: "",
  unitPK: null,
  pickupName: "",
  pickupCity: "",
  pickupState: "",
  deliveryName: "",
  deliveryCity: "",
  deliveryState: "",
  lastLocationName: "",
  lastLocationCity: "",
  lastLocationState: "",
  currentLocationName: "",
  currentLocationAdd1: "",
  currentLocationAdd2: "",
  currentLocationCity: "",
  currentLocationState: "",
  emailDamageData: [],
  damageDate: new Date().toISOString(),
  reported: new Date().toISOString(),
  viewOnly: false,
  user: "",
  isEmailClicked: false,
  initialEmailList: [],
  emailList: [],
  emailData: [],
  generalTabData: [],
  emailTabData: [],
  commentsTabData: [],
  instructionsTabData: [],
  resourcesTabData: [],
  delayedUnitCodeInput: "",
  delayedUnitCodeID: "",
  delayedUnitCodeFK: null,
  breakdownContact: "",
  breakdownContactPhone: null,
  breakdownContactExtension: null,
  breakdownContactFAX: null,
  repairedDate: new Date().toISOString(),
  delayInHouseNotes: "",
  delayCustomerNotes: "",
  inHouseNotes: "",
  customerNotes: "",
  notes: "",
  activeKey: "general",
  editFlag: false,
  deliveryCheck: false,
  isPostal: false,
  breakdownSaveFlag: false,
  editBrkdownOfExistingDelayUnitFlag: false,
  editTabData: [],
  emailFlag: false,
  emailTabVisible: true,
  activateUnit: false,
  breakdownbrowseClicked: false,
  sendEmail: false,
  updateEmail: false,
  isEmailBreakdownTabValid: false,
  navigateToMainPage: false,

  // Delay Unit Breakdown Invoice
  navigateToInvoice: false,
  navigateToSettlement: false,
  repaired: false,
  furtherRepairRequired: false,
  feePageNumber: 0,
  creditCardFlag: false,
  paidFlag: false,
  unitFK: null,
  customerFK: null,
  creditCardPayment: "",
  breakdownInvoiceDetails: [],
  breakdownInvoicePayload: null,
  breakdownInvoiceSaveObject: null,
  feesTabLisiting: [],
  feesTabNormalSortValue: "",
  feesTabNormalSortFlag: true,
  breakdownInvoiceFiles: {
    customerUploadFiles: [],
    companyUploadFiles: [],
    customerScanFiles: [],
    companyScanFiles: [],
  },
  isButtonsLoopingCompleted: false,
  creditCardArrayList: [],
  remainingAmount: 0,
  bolFileAdded: false,
  // Document Tab
  documentPageNumber: 0,
  documentsData: [],
  documentTotalElements: 0,
  docuemntTotalPages: 0,
  delayBreakdownDocumentFiles: {
    uploadFiles: [],
    scanFiles: [],
  },
  documentsTabRedisKeys: [],

  //for new breakdown
  unitConfirmationData: null,
  newGenerlTabValid: true,
  resourceList: [],
  resourcePageNumber: 0,
  resourceTotalPages: 0,
  resourceTotalElements: 0,
  resourceChangeColor: false,
  resourceNormalSortValue: null,
  resourceNormalSortFlag: false,
  newEmailList: [],
  emailSortValue: null,
  emailSortFlag: false,
  emailName: "",
  email: "",
  editMode: false,
  selectedIndex: null,
  checkEmailExist: false,
  addFlag: false,
  emailPK: null,
  emailListData: [],
  newEmailTabValid: true,
  saveFormData: null,
  breakdownFlag: false,
  generalLoading: false,
  //editbreakdown

  editGenerlTabValid: true,
  editEmailList: [],
  editEmailName: "",
  editEmail: "",
  editView: false,
  editSelectedIndex: null,
  editCheckEmailExist: false,
  editAddFlag: false,
  editEmailPK: null,
  editmailListData: [],
  editEmailTabValid: true,
  editSaveFormData: null,
  breakdownDetailFlag: false,
  loading: false,
  editDocumentTabValid: true,
  loginUserName: "",
  repairPlantFlag: "",
  // View Breakdown
  viewBreakdownActiveTab: "general",
  viewBreakdownEmailListingData: [],
  viewBreakdownEmailPageNumber: 0,
  viewBreakdownEmailTotalPages: 0,
  viewBreakdownEmailTotalElements: 0,
  viewBreakdownResourcesListingData: [],
  viewBreakdownResourcesPageNumber: 0,
  viewBreakdownResourcesTotalPages: 0,
  viewBreakdownResourcesTotalElements: 0,
  //For breakdown invoice scan
  sisterUnitFk: null,
  unitFkScanInvoice: null,
  dispatchStatus: false,
  transIds: "",
};

const BreakdownProcessingSlice = createSlice({
  name: "delaybreakdown",
  initialState,
  reducers: {
    setUnitPK: (state, action) => {
      state.unitPK = action.payload;
    },
    setEmailDamageData: (state, action) => {
      state.emailDamageData = action.payload;
    },
    setCurrentLocationName: (state, action) => {
      state.currentLocationName = action.payload;
    },

    setCurrentLocationAdd1: (state, action) => {
      state.currentLocationAdd1 = action.payload;
    },

    setCurrentLocationAdd2: (state, action) => {
      state.currentLocationAdd2 = action.payload;
    },
    setCurrentLocationCity: (state, action) => {
      state.currentLocationCity = action.payload;
    },

    setCurrentLocationState: (state, action) => {
      state.currentLocationState = action.payload;
    },
    setDelayedUnitCodeInput: (state, action) => {
      state.delayedUnitCodeInput = action.payload;
    },
    setDelayedUnitCodeID: (state, action) => {
      state.delayedUnitCodeID = action.payload;
    },
    setLastLocationName: (state, action) => {
      state.lastLocationName = action.payload;
    },

    setLastLocationCity: (state, action) => {
      state.lastLocationCity = action.payload;
    },

    setLastLocationState: (state, action) => {
      state.lastLocationState = action.payload;
    },
    setDeliveryName: (state, action) => {
      state.deliveryName = action.payload;
    },

    setDeliveryCity: (state, action) => {
      state.deliveryCity = action.payload;
    },

    setDeliveryState: (state, action) => {
      state.deliveryState = action.payload;
    },
    setDriverName: (state, action) => {
      state.driverName = action.payload;
    },
    setPickupName: (state, action) => {
      state.pickupName = action.payload;
    },

    setPickupCity: (state, action) => {
      state.pickupCity = action.payload;
    },

    setPickupState: (state, action) => {
      state.pickupState = action.payload;
    },
    setRoadConditionCode: (state, action) => {
      state.roadConditionCode = action.payload;
    },
    setRoadTypeCode: (state, action) => {
      state.roadTypeCode = action.payload;
    },
    setDamageCode: (state, action) => {
      state.damageCode = action.payload;
    },
    setWeatherCode: (state, action) => {
      state.weatherCode = action.payload;
    },
    setReportedDate: (state, action) => {
      state.reportedDate = action.payload;
    },
    setReportedTime: (state, action) => {
      state.reportedTime = action.payload;
    },
    setDamageTime: (state, action) => {
      state.damageTime = action.payload;
    },
    setDamageDate: (state, action) => {
      state.damageDate = action.payload;
    },
    setSpecialCode: (state, action) => {
      state.specialCode = action.payload;
    },
    setUnitType: (state, action) => {
      state.unitType = action.payload;
    },
    setVin: (state, action) => {
      state.vin = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setBreakdownData: (state, action) => {
      state.breakdownData = action.payload;
    },
    setBreakdownBrowseData: (state, action) => {
      state.breakdownBrowseData = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setEmailData: (state, action) => {
      state.emailData = action.payload;
    },
    setViewOnly: (state, action) => {
      state.viewOnly = action.payload;
    },
    setGeneralTabData: (state, action) => {
      state.generalTabData = action.payload;
    }, //editTabData
    setEditTabData: (state, action) => {
      state.editTabData = action.payload;
    },
    setEmailTabData: (state, action) => {
      state.emailTabData = action.payload;
    },
    setBolFileAdded: (state, action) => {
      state.bolFileAdded = action.payload;
    },
    setCommentsTabData: (state, action) => {
      state.commentsTabData = action.payload;
    },
    setInstructionsTabData: (state, action) => {
      state.instructionsTabData = action.payload;
    },
    setResourcesTabData: (state, action) => {
      state.resourcesTabData = action.payload;
    },
    setIsEmailClicked: (state, action) => {
      state.isEmailClicked = action.payload;
    },
    setInitialEmailList: (state, action) => {
      state.initialEmailList = action.payload;
    },
    setEmailTabVisible: (state, action) => {
      state.emailTabVisible = action.payload;
    },
    setEmailList: (state, action) => {
      state.emailList = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setDelayedUnitCodeFK: (state, action) => {
      state.delayedUnitCodeFK = action.payload;
    },
    setBreakdownContact: (state, action) => {
      state.breakdownContact = action.payload;
    },
    setBreakdownContactPhone: (state, action) => {
      state.breakdownContactPhone = action.payload;
    },
    setBreakdownContactExtension: (state, action) => {
      state.breakdownContactExtension = action.payload;
    },
    setBreakdownContactFAX: (state, action) => {
      state.breakdownContactFAX = action.payload;
    },
    setDelayDate: (state, action) => {
      state.delayDate = action.payload;
    },
    setReported: (state, action) => {
      state.reported = action.payload;
    },
    setRepairedDate: (state, action) => {
      state.repairedDate = action.payload;
    },
    setDelayInHouseNotes: (state, action) => {
      state.delayInHouseNotes = action.payload;
    },
    setDelayCustomerNotes: (state, action) => {
      state.delayCustomerNotes = action.payload;
    },
    setInHouseNotes: (state, action) => {
      state.inHouseNotes = action.payload;
    },
    setCustomerNotes: (state, action) => {
      state.customerNotes = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
    setEditFlag: (state, action) => {
      state.editFlag = action.payload;
    },
    setDeliveryCheck: (state, action) => {
      state.deliveryCheck = action.payload;
    },
    setIsPostal: (state, action) => {
      state.isPostal = action.payload;
    },
    setBreakdownSaveFlag: (state, action) => {
      state.breakdownSaveFlag = action.payload;
    },
    setEditBrkdownOfExistingDelayUnitFlag: (state, action) => {
      state.editBrkdownOfExistingDelayUnitFlag = action.payload;
    },
    setEmailFlag: (state, action) => {
      state.emailFlag = action.payload;
    },
    setActivateUnit: (state, action) => {
      state.activateUnit = action.payload;
    },
    setNavigateToInvoice: (state, action) => {
      state.navigateToInvoice = action.payload;
    },
    setNavigateToSettlement: (state, action) => {
      state.navigateToSettlement = action.payload;
    },
    setRepaired: (state, action) => {
      state.repaired = action.payload;
    },
    setFurtherRepairRequired: (state, action) => {
      state.furtherRepairRequired = action.payload;
    },
    setFeePageNumber: (state, action) => {
      state.feePageNumber = action.payload;
    },
    setCreditCardFlag: (state, action) => {
      state.creditCardFlag = action.payload;
    },
    setPaidFlag: (state, action) => {
      state.paidFlag = action.payload;
    },
    setUnitFK: (state, action) => {
      state.unitFK = action.payload;
    },
    setCustomerFK: (state, action) => {
      state.customerFK = action.payload;
    },
    setCreditCardPayment: (state, action) => {
      state.creditCardPayment = action.payload;
    },
    setBreakdownbrowseClicked: (state, action) => {
      state.breakdownbrowseClicked = action.payload;
    },
    setSendEmail: (state, action) => {
      state.sendEmail = action.payload;
    },
    setUpdateEmail: (state, action) => {
      state.updateEmail = action.payload;
    },
    setIsEmailBreakdownTabValid: (state, action) => {
      state.isEmailBreakdownTabValid = action.payload;
    },
    setNavigateToMainPage: (state, action) => {
      state.navigateToMainPage = action.payload;
    },
    setBreakdownInvoiceSaveObject: (state, action) => {
      state.breakdownInvoiceSaveObject = action.payload;
    },
    setBreakdownInvoiceDetails: (state, action) => {
      state.breakdownInvoiceDetails = action.payload;
    },
    setFeesTabLisiting: (state, action) => {
      state.feesTabLisiting = action.payload;
    },
    setFeesTabNormalSortValue: (state, action) => {
      state.feesTabNormalSortValue = action.payload;
    },
    setFeesTabNormalSortFlag: (state, action) => {
      state.feesTabNormalSortFlag = action.payload;
    },

    setIsButtonsLoopingCompleted: (state, action) => {
      state.isButtonsLoopingCompleted = action.payload;
    },
    setBreakdownInvoicePayload: (state, { payload }) => {
      state.breakdownInvoicePayload = { ...state.breakdownInvoicePayload, ...payload };
    },
    setBreakdownInvoiceFiles: (state, action) => {
      const { actionType, payload } = action.payload;

      // Define mapping for actionType to corresponding key in breakdownInvoiceFiles
      const keyMapping = {
        customerUploadFiles: "customerUploadFiles",
        companyUploadFiles: "companyUploadFiles",
        customerScanFiles: "customerScanFiles",
        companyScanFiles: "companyScanFiles",
      };

      // Get the correct key from the mapping
      const targetKey = keyMapping[actionType];

      if (targetKey) {
        state.breakdownInvoiceFiles[targetKey] = payload;
      }

      if (actionType === "clear") {
        state.breakdownInvoiceFiles = {
          customerUploadFiles: [],
          companyUploadFiles: [],
          customerScanFiles: [],
          companyScanFiles: [],
        };
        state.isButtonsLoopingCompleted = false;
      }
    },
    setCreditCardArrayList: (state, action) => {
      state.creditCardArrayList = action.payload;
    },
    setRemainingAmount: (state, action) => {
      state.remainingAmount = action.payload;
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
    setDelayBreakdownDocumentFiles: (state, action) => {
      const { actionType, payload } = action.payload;

      // Define mapping for actionType to corresponding key in delayBreakdownDocumentFiles
      const keyMapping = {
        uploadFiles: "uploadFiles",
        scanFiles: "scanFiles",
      };

      // Get the correct key from the mapping
      const targetKey = keyMapping[actionType];

      if (targetKey) {
        state.delayBreakdownDocumentFiles[targetKey] = payload;
      }

      if (actionType === "clear") {
        state.delayBreakdownDocumentFiles = initialState.delayBreakdownDocumentFiles;
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
    //NEW DElay
    setUnitConfirmationData: (state, action) => {
      state.unitConfirmationData = action.payload;
    },
    setNewGenerlTabValid: (state, action) => {
      state.newGenerlTabValid = action.payload;
    },
    setResourcePageNumber: (state, action) => {
      state.resourcePageNumber = action.payload;
    },
    setResourceTotalPages: (state, action) => {
      state.resourceTotalPages = action.payload;
    },
    setResourceTotalElements: (state, action) => {
      state.resourceTotalElements = action.payload;
    },
    setResourceList: (state, action) => {
      state.resourceList = action.payload;
    },

    setResourceNormalSortValue: (state, action) => {
      state.resourceNormalSortValue = action.payload;
    },
    setResourceNormalSortFlag: (state, action) => {
      state.resourceNormalSortFlag = action.payload;
    },

    setResourceChangeColor: (state, action) => {
      state.resourceChangeColor = action.payload;
    },
    setNewEmailList: (state, action) => {
      state.newEmailList = action.payload;
    },
    setEmailSortFlag: (state, action) => {
      state.emailSortFlag = action.payload;
    },
    setEmailSortValue: (state, action) => {
      state.emailSortValue = action.payload;
    },
    setEmailName: (state, action) => {
      state.emailName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
    setCheckEmailExist: (state, action) => {
      state.checkEmailExist = action.payload;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setAddFlag: (state, action) => {
      state.addFlag = action.payload;
    },
    setEmailPK: (state, action) => {
      state.emailPK = action.payload;
    },
    setEmailDeleteList: (state, action) => {
      state.emailDeleteList = action.payload;
    },
    setEmailListData: (state, action) => {
      state.emailListData = action.payload;
    },
    setNewEmailTabValid: (state, action) => {
      state.newEmailTabValid = action.payload;
    },
    setBreakdownFlag: (state, action) => {
      state.breakdownFlag = action.payload;
    },
    setGeneralLoading: (state, action) => {
      state.generalLoading = action.payload;
    },

    resetEmailChanges: (state, action) => {
      state.emailPK = null;
      state.emailName = "";
      state.email = "";
      state.checkEmailExist = false;
      state.emailSortValue = null;
      state.emailSortFlag = false;
    },
    resetResourceList: (state, action) => {
      state.resourceNormalSortFlag = false;
      state.resourceNormalSortValue = null;
      state.resourcePageNumber = 0;
      state.resourceTotalElements = 0;
      state.resourceTotalPages = 0;
    },
    setSaveFormData: (state, action) => {
      let payload = action.payload;
      state.saveFormData = { ...state.saveFormData, ...payload };
    },
    //EDIT DELAY
    setEditGenerlTabValid: (state, action) => {
      state.editGenerlTabValid = action.payload;
    },

    setEditEmailList: (state, action) => {
      state.editEmailList = action.payload;
    },

    setEditEmailName: (state, action) => {
      state.editEmailName = action.payload;
    },
    setEditEmail: (state, action) => {
      state.editEmail = action.payload;
    },
    setEditCheckEmailExist: (state, action) => {
      state.editCheckEmailExist = action.payload;
    },
    setCheckEmailExist: (state, action) => {
      state.checkEmailExist = action.payload;
    },
    setEditView: (state, action) => {
      state.editView = action.payload;
    },
    setEditAddFlag: (state, action) => {
      state.editAddFlag = action.payload;
    },
    setEditEmailPK: (state, action) => {
      state.editEmailPK = action.payload;
    },
    setEditEmailDeleteList: (state, action) => {
      state.editEmailDeleteList = action.payload;
    },
    setEditmailListData: (state, action) => {
      state.editmailListData = action.payload;
    },
    setEditEmailTabValid: (state, action) => {
      state.editEmailTabValid = action.payload;
    },
    setEditSelectedIndex: (state, action) => {
      state.editSelectedIndex = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEditDocumentTabValid: (state, action) => {
      state.editDocumentTabValid = action.payload;
    },
    setLoginUserName: (state, action) => {
      state.loginUserName = action.payload;
    },
    setBreakdownDetailFlag: (state, action) => {
      state.breakdownDetailFlag = action.payload;
    },
    setEditDetailFlag: (state, action) => {
      state.editDetailFlag = action.payload;
    },
    setViewBreakdownActiveTab: (state, action) => {
      state.viewBreakdownActiveTab = action.payload;
    },
    setRepairPlantFlag: (state, action) => {
      state.repairPlantFlag = action.payload;
    },
    resetEditEmailChanges: (state, action) => {
      state.editEmailPK = null;
      state.editEmailName = "";
      state.editEmail = "";
      state.editCheckEmailExist = false;
    },

    setEditSaveFormData: (state, action) => {
      let payload = action.payload;
      state.editSaveFormData = { ...state.editSaveFormData, ...payload };
    },

    setViewBreakdownEmailListingData: (state, action) => {
      state.viewBreakdownEmailListingData = action.payload;
    },
    setViewBreakdownEmailPageNumber: (state, action) => {
      state.viewBreakdownEmailPageNumber = action.payload;
    },
    setViewBreakdownEmailTotalPages: (state, action) => {
      state.viewBreakdownEmailTotalPages = action.payload;
    },
    setViewBreakdownEmailTotalElements: (state, action) => {
      state.viewBreakdownEmailTotalElements = action.payload;
    },
    setViewBreakdownResourcesListingData: (state, action) => {
      state.viewBreakdownResourcesListingData = action.payload;
    },
    setViewBreakdownResourcesPageNumber: (state, action) => {
      state.viewBreakdownResourcesPageNumber = action.payload;
    },
    setViewBreakdownResourcesTotalPages: (state, action) => {
      state.viewBreakdownResourcesTotalPages = action.payload;
    },
    setViewBreakdownResourcesTotalElements: (state, action) => {
      state.viewBreakdownResourcesTotalElements = action.payload;
    },
    setSisterUnitFk: (state, action) => {
      state.sisterUnitFk = action.payload;
    },
    setUnitFkScanInvoice: (state, action) => {
      state.unitFkScanInvoice = action.payload;
    },
    setDispatchStatus: (state, action) => {
      state.dispatchStatus = action.payload;
    },
    setTransIds: (state, action) => {
      state.transIds = action.payload;
    },
    resetBreakdowbBrowsePage: (state, action) => {
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.changeColor = false;
      state.id = null;
      state.sisterUnitFk = null;
      state.unitFkScanInvoice = null;
    },
  },
});

export const {
  setUnitPK,
  setEmailDamageData,
  setVin,
  setUnitType,
  setRoadTypeCode,
  setWeatherCode,
  setRoadConditionCode,
  setReportedDate,
  setModel,
  setUnitNumber,
  setDriverName,
  setPageNumber,
  setSearchTerm,
  setSearchCriteria,
  setBreakdownData,
  setBreakdownBrowseData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setId,
  setTotalElements,
  setTotalPages,
  setSpecialCode,
  setDamageDate,
  setDamageTime,
  setReportedTime,
  setDamageCode,
  setPickupName,
  setPickupCity,
  setPickupState,
  setDeliveryName,
  setDeliveryCity,
  setDeliveryState,
  setLastLocationName,
  setLastLocationCity,
  setLastLocationState,
  setCurrentLocationName,
  setCurrentLocationAdd1,
  setCurrentLocationAdd2,
  setCurrentLocationCity,
  setCurrentLocationState,
  setViewOnly,
  setGeneralTabData,
  setEmailTabData,
  setInstructionsTabData,
  setResourcesTabData,
  setCommentsTabData,
  setIsEmailClicked,
  setBolFileAdded,
  setInitialEmailList,
  setEmailData,
  setEmailList,
  setUser,
  setDelayedUnitCodeInput,
  setDelayedUnitCodeID,
  setDelayedUnitCodeFK,
  setBreakdownContact,
  setBreakdownContactPhone,
  setBreakdownContactExtension,
  setBreakdownContactFAX,
  setDelayDate,
  setReported,
  setRepairedDate,
  setDelayInHouseNotes,
  setDelayCustomerNotes,
  setInHouseNotes,
  setCustomerNotes,
  setNotes,
  setActiveKey,
  setEditFlag,
  setDeliveryCheck,
  setIsPostal,
  setBreakdownSaveFlag,
  setEditBrkdownOfExistingDelayUnitFlag,
  setEditTabData,
  setEmailFlag,
  setEmailTabVisible,
  setActivateUnit,
  setNavigateToInvoice,
  setNavigateToSettlement,
  setRepaired,
  setFurtherRepairRequired,
  setFeePageNumber,
  setCreditCardFlag,
  setPaidFlag,
  setUnitFK,
  setCustomerFK,
  setCreditCardPayment,
  setBreakdownbrowseClicked,
  setSendEmail,
  setUpdateEmail,
  setFeesTabLisiting,
  setFeesTabNormalSortValue,
  setFeesTabNormalSortFlag,
  setBreakdownInvoiceFiles,
  setIsButtonsLoopingCompleted,
  setCreditCardArrayList,
  setRemainingAmount,
  setBreakdownInvoiceSaveObject,
  setBreakdownInvoiceDetails,
  setBreakdownInvoicePayload,
  setIsEmailBreakdownTabValid,
  setNavigateToMainPage,
  setDocumentPageNumber,
  setDocumentsData,
  setDocumentTotalElements,
  setDocuemntTotalPages,
  setDelayBreakdownDocumentFiles,
  setDocumentsTabRedisKeys,
  //new breakdown
  setUnitConfirmationData,
  setNewGenerlTabValid,
  setResourceChangeColor,
  setResourceNormalSortFlag,
  setResourceTotalElements,
  setResourceTotalPages,
  setResourcePageNumber,
  setResourceList,
  setResourceNormalSortValue,
  setNewEmailList,
  setEmailSortFlag,
  setEmailSortValue,
  setEmailName,
  setEmail,
  setAddFlag,
  setEditMode,
  setCheckEmailExist,
  setSelectedIndex,
  setEmailPK,
  resetEmailChanges,
  setEmailDeleteList,
  setEmailListData,
  setNewEmailTabValid,
  setSaveFormData,
  resetResourceList,
  setEditGenerlTabValid,
  setEditEmailList,
  setEditEmailName,
  setEditEmail,
  setEditView,
  setEditSelectedIndex,
  setEditCheckEmailExist,
  setEditAddFlag,
  setEditEmailPK,
  setEditEmailDeleteList,
  setEditmailListData,
  setEditEmailTabValid,
  setEditSaveFormData,
  setEditDetailFlag,
  setLoading,
  setEditDocumentTabValid,
  setLoginUserName,
  setBreakdownDetailFlag,
  setBreakdownFlag,
  setGeneralLoading,
  resetEditEmailChanges,
  setViewBreakdownActiveTab,
  setRepairPlantFlag,
  setViewBreakdownEmailListingData,
  setViewBreakdownEmailPageNumber,
  setViewBreakdownEmailTotalPages,
  setViewBreakdownEmailTotalElements,
  setViewBreakdownResourcesListingData,
  setViewBreakdownResourcesPageNumber,
  setViewBreakdownResourcesTotalPages,
  setViewBreakdownResourcesTotalElements,
  setSisterUnitFk,
  setUnitFkScanInvoice,
  setDispatchStatus,
  setTransIds,
  resetBreakdowbBrowsePage,
} = BreakdownProcessingSlice.actions;

export default BreakdownProcessingSlice.reducer;
