import { createSlice } from "@reduxjs/toolkit";

const DelayProcessingSlice = createSlice({
  name: "delayProcessing",
  initialState: {
    delayedUnitPK: null,
    unitFK: null,
    dispatchFK: null,
    sisterCompanyFK: null,
    sisterDelayedUnitFK: null,
    sisterUnitFK: null,
    sisterDispatchFK: null,
    driverFK: null,
    transportCompanyFK: null,
    delayedUnitCodeFK: null,
    damagedUnitCodeFK: null,
    weatherUnitCodeFK: null,
    roadTypeUnitCodeFK: null,
    delayUnitLocationFK: null,
    workingUnitLocationFK: null,
    delayDate: null,
    reported: null,
    delayContact: "",
    delayContactPhone: null,
    delayContactExtension: null,
    delayContactFAX: null,
    atPickup: null,
    inYard: null,
    breakdown: null,
    damage: null,
    delay: null,
    returned: null,
    defaultDealerInput: "",
    defaultPickupDealerInput: "",
    pickupPlantInput: "",
    currentPlantInput: "",
    returnedBySameDriver: null,
    returnedToPickupLocation: null,
    unitReturnFK: null,
    refused: null,
    active: null,
    lastUpdate: null,
    driverReleased: null,
    driverReleaseDate: null,
    delayInHouseNotes: "",
    delayCustomerNotes: "",
    inHouseNotes: "",
    defaultPickupDealerFK: null,
    pickupPlantId: null,
    customerNotes: "",
    emailList: [],
    currentLocation: {
      name: "",
      address1: "",
      address2: "",
      city: "",
      stateCode: "",
      postalCode: "",
    },
    viewOnly: true,
    allDriversPayTaxable: false,
    deliveryCheck: false,
    user: "",
    editFlag: false,
    currentPlantId: null,
    defaultDealerFK: null,
    locationContact: "",
    locationPhone: "",
    activeKey: "general",
    isPostal: false,
    isCurrentLocEmpty: false,
    delayedUnitCodeInput: "",
    damagedUnitCodeInput: "",
    weatherUnitCodeInput: "",
    roadConditionCodeInput: "",
    roadTypeCodeInput: "",
    delayedUnitCodeID: "",
    damagedUnitCodeID: "",
    roadConditionUnitCodeID: "",
    roadTypeUnitCodeID: "",
    weatherUnitCodeID: "",
    isEmailClicked: false,
    initialEmailList: [],
    emailData: [],
    moveData: null,
    alternateLocationRedux: false,
    miscMoveDeliveryDetails: null,
    delayType: null,
    damageOrBreakdownId: null,
    isMiscPickup: false,
    isMiscDelivery: false,
    returnDetails: null,
    miscPickupDetails: null,
    miscDeliveryDetails: null,
    returnRateCalc: null,
    notes: "",
    sendNotificationEmails: false,
    sendUpdateEmails: false,
    inactiveDropzone: true,
    customerPaperworkFiles: [],
    companyPaperworkFiles: [],
    bolFiles: [],
    dafFiles: [],
    iftaFiles: [],
    customerPaperworkScanFiles: [],
    companyPaperworkScanFiles: [],
    bolScanFiles: [],
    dafScanFiles: [],
    iftaScanFiles: [],
    delayReturnSave: true,
    returnValidEntry: false,
    delayReturnByDriver: false,
    driverAtFault: false,
    delayedUnitId: null,
    delayCustomerPKList: [],
    delayCustomerPlantPKList: [],
    delayDealerPKList: [],
    isDelayLocalCompany: true,
    isDelayProc: true,
    delayMoveSave: false,
    isDelayUndispatch: false,
    //for new delay
    unitConfirmationData: null,
    newGenerlTabValid: true,
    resourceList: [],
    id: "",
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
    emailDeleteList: [],
    emailListData: [],
    newEmailTabValid: true,
    saveFormData: null,
    //editDelay

    editGenerlTabValid: true,
    editEmailList: [],
    editEmailName: "",
    editEmail: "",
    editView: false,
    editSelectedIndex: null,
    editCheckEmailExist: false,
    editAddFlag: false,
    editEmailPK: null,
    editEmailDeleteList: [],
    editmailListData: [],
    editEmailTabValid: true,
    editSaveFormData: null,
    editDetailFlag: false,
    loading: false,
    loginUserName: "",
    data: null,

    //view delay
    delayActive: false,
    viewDelayActiveTab: "general",
    viewDelayEmailListingData: [],
    viewDelayEmailPageNumber: 0,
    viewDelayEmailTotalPages: 0,
    viewDelayEmailTotalElements: 0,
    viewDelayResourcesListingData: [],
    viewDelayResourcesPageNumber: 0,
    viewDelayResourcesTotalPages: 0,
    viewDelayResourcesTotalElements: 0,
    generalData: null,
    viewLoading: false,
    activeDisable: false,
    creditCardArrayList: [],
    selectedDelayUnit: null,
    transIds: "",
    unitCardDetails: {},
    mileBalance: 0,
    returnLocationUpdated: true,
  },
  reducers: {
    setDelayedUnitPK: (state, action) => {
      state.delayedUnitPK = action.payload;
    },
    setAllDriversPayTaxable: (state, action) => {
      state.allDriversPayTaxable = action.payload;
    },
    setUnitFK: (state, action) => {
      state.unitFK = action.payload;
    },
    setDispatchFK: (state, action) => {
      state.dispatchFK = action.payload;
    },
    setSisterCompanyFK: (state, action) => {
      state.sisterCompanyFK = action.payload;
    },
    setSisterDelayedUnitFK: (state, action) => {
      state.sisterDelayedUnitFK = action.payload;
    },
    setSisterUnitFK: (state, action) => {
      state.sisterUnitFK = action.payload;
    },
    setSisterDispatchFK: (state, action) => {
      state.sisterDispatchFK = action.payload;
    },
    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },
    setTransportCompanyFK: (state, action) => {
      state.transportCompanyFK = action.payload;
    },
    setDelayedUnitCodeFK: (state, action) => {
      state.delayedUnitCodeFK = action.payload;
    },
    setDefaultPickupDealerFK: (state, { payload }) => {
      state.defaultPickupDealerFK = payload;
    },
    setDamagedUnitCodeFK: (state, action) => {
      state.damagedUnitCodeFK = action.payload;
    },
    setWeatherUnitCodeFK: (state, action) => {
      state.weatherUnitCodeFK = action.payload;
    },
    setRoadTypeUnitCodeFK: (state, action) => {
      state.roadTypeUnitCodeFK = action.payload;
    },
    setDefaultPickupDealerInput: (state, { payload }) => {
      state.defaultPickupDealerInput = payload;
    },
    setCurrentPlantInput: (state, { payload }) => {
      state.currentPlantInput = payload;
    },
    setPickupPlantInput: (state, { payload }) => {
      state.pickupPlantInput = payload;
    },
    setDefaultDealerInput: (state, { payload }) => {
      state.defaultDealerInput = payload;
    },
    setPickupPlantId: (state, { payload }) => {
      state.pickupPlantId = payload;
    },
    setDefaultDealerFK: (state, { payload }) => {
      state.defaultDealerFK = payload;
    },
    setCurrentPlantId: (state, { payload }) => {
      state.currentPlantId = payload;
    },
    setRoadConditionFK: (state, action) => {
      state.roadConditionFK = action.payload;
    },
    setDelayUnitLocationFK: (state, action) => {
      state.delayUnitLocationFK = action.payload;
    },
    setWorkingUnitLocationFK: (state, action) => {
      state.workingUnitLocationFK = action.payload;
    },
    setDelayDate: (state, action) => {
      state.delayDate = action.payload;
    },
    setReported: (state, action) => {
      state.reported = action.payload;
    },
    setDelayContact: (state, action) => {
      state.delayContact = action.payload;
    },
    setDelayContactPhone: (state, action) => {
      state.delayContactPhone = action.payload;
    },
    setDelayContactExtension: (state, action) => {
      state.delayContactExtension = action.payload;
    },
    setDelayContactFAX: (state, action) => {
      state.delayContactFAX = action.payload;
    },
    setAtPickup: (state, action) => {
      state.atPickup = action.payload;
    },
    setInYard: (state, action) => {
      state.inYard = action.payload;
    },
    setBreakdown: (state, action) => {
      state.breakdown = action.payload;
    },
    setDamage: (state, action) => {
      state.damage = action.payload;
    },
    setDelay: (state, action) => {
      state.delay = action.payload;
    },
    setReturned: (state, action) => {
      state.returned = action.payload;
    },
    setReturnedBySameDriver: (state, action) => {
      state.returnedBySameDriver = action.payload;
    },
    setReturnedToPickupLocation: (state, action) => {
      state.returnedToPickupLocation = action.payload;
    },
    setUnitReturnFK: (state, action) => {
      state.unitReturnFK = action.payload;
    },
    setRefused: (state, action) => {
      state.refused = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setLastUpdate: (state, action) => {
      state.lastUpdate = action.payload;
    },
    setDriverReleased: (state, action) => {
      state.driverReleased = action.payload;
    },
    setDriverReleaseDate: (state, action) => {
      state.driverReleaseDate = action.payload;
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
    setEmailList: (state, action) => {
      state.emailList = action.payload;
    },

    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setViewOnly: (state, action) => {
      state.viewOnly = action.payload;
    },
    setDeliveryCheck: (state, action) => {
      state.deliveryCheck = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setEditFlag: (state, action) => {
      state.editFlag = action.payload;
    },
    setLocationContact: (state, action) => {
      state.locationContact = action.payload;
    },
    setLocationPhone: (state, action) => {
      state.locationPhone = action.payload;
    },
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
    setIsPostal: (state, action) => {
      state.isPostal = action.payload;
    },
    setIsCurrentLocEmpty: (state, action) => {
      state.isCurrentLocEmpty = action.payload;
    },
    setDelayedUnitCodeInput: (state, action) => {
      state.delayedUnitCodeInput = action.payload;
    },
    setDamagedUnitCodeInput: (state, action) => {
      state.damagedUnitCodeInput = action.payload;
    },
    setWeatherUnitCodeInput: (state, action) => {
      state.weatherUnitCodeInput = action.payload;
    },
    setRoadConditionCodeInput: (state, action) => {
      state.roadConditionCodeInput = action.payload;
    },
    setRoadTypeCodeInput: (state, action) => {
      state.roadTypeCodeInput = action.payload;
    },
    setDelayedUnitCodeID: (state, action) => {
      state.delayedUnitCodeID = action.payload;
    },
    setDamagedUnitCodeID: (state, action) => {
      state.damagedUnitCodeID = action.payload;
    },

    setWeatherUnitCodeID: (state, action) => {
      state.weatherUnitCodeID = action.payload;
    },
    setRoadTypeUnitCodeID: (state, action) => {
      state.roadTypeUnitCodeID = action.payload;
    },
    setRoadConditionUnitCodeID: (state, action) => {
      state.roadConditionUnitCodeID = action.payload;
    },
    setIsEmailClicked: (state, action) => {
      state.isEmailClicked = action.payload;
    },
    setInitialEmailList: (state, action) => {
      state.initialEmailList = action.payload;
    },
    setEmailData: (state, action) => {
      state.emailData = action.payload;
    },
    setMoveData: (state, action) => {
      let payload = action.payload;
      if (payload === null) {
        state.moveData = null;
      } else {
        state.moveData = { ...state.moveData, ...payload };
      }
    },
    setMiscMoveDeliveryDetails: (state, action) => {
      let payload = action.payload;
      if (payload === null) {
        state.miscMoveDeliveryDetails = null;
      } else {
        state.miscMoveDeliveryDetails = { ...state.miscMoveDeliveryDetails, ...payload };
      }
    },
    setAlternateLocationRedux: (state, action) => {
      state.alternateLocationRedux = action.payload;
    },
    setDelayType: (state, action) => {
      state.delayType = action.payload;
    },
    setDamageOrBreakdownId: (state, action) => {
      state.damageOrBreakdownId = action.payload;
    },
    setIsMiscPickup: (state, action) => {
      state.isMiscPickup = action.payload;
    },
    setIsMiscDelivery: (state, action) => {
      state.isMiscDelivery = action.payload;
    },
    setReturnValidEntry: (state, action) => {
      state.returnValidEntry = action.payload;
    },
    setReturnDetails: (state, action) => {
      let payload = action.payload;
      if (payload === null) {
        state.returnDetails = null;
      } else {
        state.returnDetails = { ...state.returnDetails, ...payload };
      }
    },
    setMiscPickupDetails: (state, action) => {
      let payload = action.payload;
      if (payload === null) {
        state.miscPickupDetails = null;
      } else {
        state.miscPickupDetails = { ...state.miscPickupDetails, ...payload };
      }
    },
    setMiscDeliveryDetails: (state, action) => {
      let payload = action.payload;
      if (payload === null) {
        state.miscDeliveryDetails = null;
      } else {
        state.miscDeliveryDetails = { ...state.miscDeliveryDetails, ...payload };
      }
    },
    //returnRateCalc
    setReturnRateCalc: (state, action) => {
      let payload = action.payload;
      if (payload === null) {
        state.returnRateCalc = null;
      } else {
        state.returnRateCalc = { ...state.returnRateCalc, ...payload };
      }
    },
    setSendNotificationEmails: (state, action) => {
      state.sendNotificationEmails = action.payload;
    },
    setSendUpdateEmails: (state, action) => {
      state.sendUpdateEmails = action.payload;
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
    setBolFiles: (state, action) => {
      state.bolFiles = action.payload;
    },
    setDafFiles: (state, action) => {
      state.dafFiles = action.payload;
    },
    setIftaFiles: (state, action) => {
      state.iftaFiles = action.payload;
    },
    setCustomerPaperworkScanFiles: (state, action) => {
      state.customerPaperworkScanFiles = action.payload;
    },
    setCompanyPaperworkScanFiles: (state, action) => {
      state.companyPaperworkScanFiles = action.payload;
    },
    setBolScanFiles: (state, action) => {
      state.bolScanFiles = action.payload;
    },
    setDafScanFiles: (state, action) => {
      state.dafScanFiles = action.payload;
    },
    setIftaScanFiles: (state, action) => {
      state.iftaScanFiles = action.payload;
    },
    setDelayReturnSave: (state, { payload }) => {
      state.delayReturnSave = payload;
    },
    setDelayReturnByDriver: (state, { payload }) => {
      state.delayReturnByDriver = payload;
    },
    setDriverAtFault: (state, { payload }) => {
      state.driverAtFault = payload;
    },
    setDelayedUnitId: (state, { payload }) => {
      state.delayedUnitId = payload;
    },
    resetArrays: (state) => {
      state.customerPaperworkFiles = [];
      state.companyPaperworkFiles = [];
      state.bolFiles = [];
      state.dafFiles = [];
      state.iftaFiles = [];
      state.customerPaperworkScanFiles = [];
      state.companyPaperworkScanFiles = [];
      state.bolScanFiles = [];
      state.dafScanFiles = [];
      state.iftaScanFiles = [];
    },
    setDelayCustomerPKList: (state, action) => {
      state.delayCustomerPKList = action.payload;
    },
    setDelayDealerPKList: (state, action) => {
      state.delayDealerPKList = action.payload;
    },
    setDelayCustomerPlantPKList: (state, action) => {
      state.delayCustomerPlantPKList = action.payload;
    },
    setIsDelayLocalCompany: (state, action) => {
      state.isDelayLocalCompany = action.payload;
    },
    setIsDelayProc: (state, action) => {
      state.isDelayProc = action.payload;
    },
    setDelayMoveSave: (state, action) => {
      state.delayMoveSave = action.payload;
    },
    setIsDelayUndispatch: (state, action) => {
      state.isDelayUndispatch = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    resetReturn: (state) => {
      // state.delayReturnByDriver=false
      state.delayReturnSave = true;
      state.returnRateCalc = null;
      state.returnedToPickupLocation = false;
      state.miscDeliveryDetails = false;
      state.miscPickupDetails = false;
      state.customerPaperworkFiles = [];
      state.companyPaperworkFiles = [];
      state.bolFiles = [];
      state.dafFiles = [];
      state.iftaFiles = [];
      state.customerPaperworkScanFiles = [];
      state.companyPaperworkScanFiles = [];
      state.bolScanFiles = [];
      state.dafScanFiles = [];
      state.iftaScanFiles = [];
      // state.returnDetails=null
    },
    //NEW DElay
    setUnitConfirmationData: (state, action) => {
      state.unitConfirmationData = action.payload;
    },
    setNewGenerlTabValid: (state, action) => {
      state.newGenerlTabValid = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
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
    setViewDelayActiveTab: (state, action) => {
      state.viewDelayActiveTab = action.payload;
    },
    setViewDelayEmailListingData: (state, action) => {
      state.viewDelayEmailListingData = action.payload;
    },
    setViewDelayEmailPageNumber: (state, action) => {
      state.viewDelayEmailPageNumber = action.payload;
    },
    setViewDelayEmailTotalPages: (state, action) => {
      state.viewDelayEmailTotalPages = action.payload;
    },
    setViewDelayEmailTotalElements: (state, action) => {
      state.viewDelayEmailTotalElements = action.payload;
    },
    setViewDelayResourcesListingData: (state, action) => {
      state.viewDelayResourcesListingData = action.payload;
    },
    setViewDelayResourcesPageNumber: (state, action) => {
      state.viewDelayResourcesPageNumber = action.payload;
    },
    setViewDelayResourcesTotalPages: (state, action) => {
      state.viewDelayResourcesTotalPages = action.payload;
    },
    setViewDelayResourcesTotalElements: (state, action) => {
      state.viewDelayResourcesTotalElements = action.payload;
    },
    setDelayActive: (state, action) => {
      state.delayActive = action.payload;
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
    setGeneralData: (state, action) => {
      state.generalData = action.payload;
    },
    setViewLoading: (state, action) => {
      state.viewLoading = action.payload;
    },
    setActiveDisable: (state, action) => {
      state.activeDisable = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoginUserName: (state, action) => {
      state.loginUserName = action.payload;
    },
    setEditDetailFlag: (state, action) => {
      state.editDetailFlag = action.payload;
    },
    setCreditCardArrayList: (state, action) => {
      state.creditCardArrayList = action.payload;
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
    setData: (state, { payload }) => {
      state.data = payload;
    },
    setSelectedDelayUnit: (state, action) => {
      state.selectedDelayUnit = action.payload;
    },
    setTransIds: (state, action) => {
      state.transIds = action.payload;
    },
    setReturnLocationUpdated: (state, action) => {
      state.returnLocationUpdated = action.payload;
    },
    setMileBalance: (state, action) => {
      state.mileBalance = action.payload;
    },
  },
});

export const {
  setDelayedUnitPK,
  setUnitFK,
  setDispatchFK,
  setSisterCompanyFK,
  setSisterDelayedUnitFK,
  setSisterUnitFK,
  setSisterDispatchFK,
  setDriverFK,
  setTransportCompanyFK,
  setDelayedUnitCodeFK,
  setDelayUnitLocationFK,
  setWorkingUnitLocationFK,
  setDelayDate,
  setReported,
  setDelayContact,
  setDelayContactPhone,
  setDelayContactExtension,
  setDelayContactFAX,
  setAtPickup,
  setInYard,
  setBreakdown,
  setDamage,
  setCurrentPlantId,
  setDefaultDealerFK,
  setDelay,
  setReturned,
  setReturnedBySameDriver,
  setReturnedToPickupLocation,
  setUnitReturnFK,
  setRefused,
  setActive,
  setLastUpdate,
  setDriverReleased,
  setDriverReleaseDate,
  setDelayInHouseNotes,
  setDelayCustomerNotes,
  setInHouseNotes,
  setCustomerNotes,
  setDefaultDealerInput,
  setEmailList,
  setCurrentLocation,
  setViewOnly,
  setDeliveryCheck,
  setUser,
  setEditFlag,
  setLocationContact,
  setLocationPhone,
  setActiveKey,
  setIsPostal,
  setIsCurrentLocEmpty,
  setDelayedUnitCodeInput,
  setWeatherUnitCodeInput,
  setDelayedUnitCodeID,
  setWeatherUnitCodeID,
  setIsEmailClicked,
  setInitialEmailList,
  setEmailData,
  setMoveData,
  setMiscMoveDeliveryDetails,
  setAlternateLocationRedux,
  setDelayType,
  setDamageOrBreakdownId,
  setIsMiscPickup,
  setIsMiscDelivery,
  setReturnDetails,
  setMiscPickupDetails,
  setMiscDeliveryDetails,
  setReturnRateCalc,
  setNotes,
  setSendNotificationEmails,
  setSendUpdateEmails,
  setInactiveDropzone,
  setCustomerPaperworkFiles,
  setCompanyPaperworkFiles,
  setBolFiles,
  setDafFiles,
  setIftaFiles,
  setCustomerPaperworkScanFiles,
  setCompanyPaperworkScanFiles,
  setBolScanFiles,
  setDafScanFiles,
  setIftaScanFiles,
  setDelayReturnSave,
  setDelayReturnByDriver,
  setDriverAtFault,
  setDelayedUnitId,
  resetArrays,
  setDelayCustomerPKList,
  setDelayCustomerPlantPKList,
  setDelayDealerPKList,
  setIsDelayLocalCompany,
  setIsDelayProc,
  setDelayMoveSave,
  setIsDelayUndispatch,
  resetReturn,
  setReturnValidEntry,
  setAllDriversPayTaxable,
  setDefaultPickupDealerFK,
  setPickupPlantId,
  setCurrentPlantInput,
  setPickupPlantInput,
  setDefaultPickupDealerInput,
  //new dealy
  setUnitConfirmationData,
  setNewGenerlTabValid,
  setResourceChangeColor,
  setResourceNormalSortFlag,
  setResourceTotalElements,
  setResourceTotalPages,
  setResourcePageNumber,
  setResourceList,
  setId,
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
  setLoginUserName,
  setEditDetailFlag,
  setLoading,
  resetEditEmailChanges,
  setViewDelayActiveTab,
  setViewDelayEmailListingData,
  setViewDelayEmailPageNumber,
  setViewDelayEmailTotalPages,
  setViewDelayEmailTotalElements,
  setViewDelayResourcesListingData,
  setViewDelayResourcesPageNumber,
  setViewDelayResourcesTotalPages,
  setViewDelayResourcesTotalElements,
  setGeneralData,
  setDelayActive,
  setViewLoading,
  setActiveDisable,
  setData,
  setCreditCardArrayList,
  setSelectedDelayUnit,
  setTransIds,
  setReturnLocationUpdated,
  setMileBalance,
} = DelayProcessingSlice.actions;

export default DelayProcessingSlice.reducer;
