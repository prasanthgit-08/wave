import { createSlice } from "@reduxjs/toolkit";
const UndispatchSlice = createSlice({
  name: "UndispatchSlice",
  initialState: {
    browseData: [],
    milesNotUpdated: true,
    dispatchData: null,
    sortFlag: false,
    sortValue: null,
    browseFlag: false,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    selectedDispatch: null,
    paybackAmount: 0,
    conditionIssues: "None",
    activationStatus: "Active",
    equipment: "Next Driver",
    sisterNotification: "Neither",
    unitOnHold: false,
    deleteUnit: false,
    attemptedPickup: false,
    undispatchReason: "",
    equipmentHistoryData: [],
    checkedinList: [],
    holdReason: "",
    holdNote: "",
    holdAuthorizedBy: "",
    equipmentHistorySortFlag: false,
    equipmentHistorySortValue: null,
    equipmentHistoryPageNumber: 0,
    equipmentHistoryTotalPages: 0,
    equipmentHistoryTotalElements: 0,
    checkEquipment: false,
    saving: false,
    reasonForActivationDelay: "",
    dispatchDate: null,
    //SpitTrip
    miscellaneousDealerId: null,
    miscellaneousDealerData: null,
    miscellaneousFormDealerData: null,
    splittripScreenValid: false,
    postalCodePK: null,
    onCancel: false,
    name: "",
    address1: "",
    address2: "",
    phone: "",
    email: "",
    contact: "",
    contactPhone: "",
    email: "",
    hours: "",
    directions: "",
    cityNew: "",
    postalCodeNew: "",
    stateCodeNew: "",
    canadianNew: false,
    postalCodeOnChange: false,
    openSunday: false,
    openMonday: true,
    openTuesday: true,
    openWednesday: true,
    openThursday: true,
    openFriday: true,
    openSaturday: false,
    backButtonFlag: false,
    isButtonsLoopingCompleted: false,
    //Miles
    splitTripMilesData: null,
    invoiceMiles: "",
    driverTotalMiles: "",
    completedDriverMiles: "",
    dispatchDriverMiles: "",
    firstHalfDriverMiles: "",
    secondHalfDriverMiles: "",
    secondHalfActive: false,
    driverAbandonedUnit: false,
    invoiceFlatrate: "",
    driverTotalFlatrate: "",
    completedDriverFlatrate: "",
    dispatchDriverFlatrate: "",
    firstHalfDriverFlatrate: "",
    secondHalfDriverFlatrate: "",
    tolls: "",
    permits: "",
    other: "",
    payRadioButton: "Pay",
    otherDescription: "",
    isFlatrated: false,
    hasSplitOverrridePermission: false,
    allAmountTaxable: false,
    deleteReason: "",
    deleteHasCreditCard: false,
    deleteValidCreditCard: true,
    splitTripFlag: false,
    undispatchFlag: false,
    splitTripSave: true,
    //Documents
    isCurrentUnitValid: false,

    inactiveDropzone: true,
    customerPaperworkFiles: [],
    companyPaperworkFiles: [],
    bolFiles: [],
    dafFiles: [],
    iftaFiles: [],
    splitTripFiles: {
      customerUploadFiles: [],
      companyUploadFiles: [],
      bolUploadFiles: [],
      dafUploadFiles: [],
      iftaUploadFiles: [],
      customerScanFiles: [],
      companyScanFiles: [],
      bolScanFiles: [],
      dafScanFiles: [],
      iftaScanFiles: [],
    },
    //Apu
    apuData: null,
    driverAmount: "",
    invoiceAmount: "",
    billingCustomer: "No",
    billingCustomerId: null,
    billingCustomerInput: "",
    chargeCreditcard: false,
    apuAuthorizedBy: "",
    invoiceTrextArray: Array(4).fill(""),
    invoicetext1: "",
    invoicetext2: "",
    invoicetext3: "",
    invoicetext4: "",
    unitId: null,
    customerId: null,
    miscellaneousInvoiceTextArray: Array(9).fill(""),
    miscellaneousInvoicetext1: "",
    miscellaneousInvoicetext2: "",
    miscellaneousInvoicetext3: "",
    miscellaneousInvoicetext4: "",
    miscellaneousInvoicetext5: "",
    miscellaneousInvoicetext6: "",
    miscellaneousInvoicetext7: "",
    miscellaneousInvoicetext8: "",
    miscellaneousInvoicetext9: "",
    //Apu documents
    inactiveAPUDropzone: true,
    customerApuPaperworkFiles: [],
    companyApuPaperworkFiles: [],
    apuFiles: {
      customerUploadFiles: [],
      companyUploadFiles: [],
      customerScanFiles: [],
      companyScanFiles: [],
    },
    apuSave: false,
    releaseAtPickupLocation: false,
    postingCompanyFK: 0,
    customerFK: 0,
    creditCardData: [],
    invoiceBillingCustomerId: null,
    apuBackButtonFlag: false,
    //credit card
    creditCardArrayList: [],
    apuCreditCardArrayList: [],
    remainingAmount: 0,
    apuRemainingAmount: 0,
    creditCardConfirmationFlag: false,
    undispatchBreakdownFlag: false,
    undispatchdelayFlag: false,
    creditCardLoder: false,
    driverName: "",
    driverPhone: "",
    //releasedriver
    releaseDispatchPK: null,
    delayedUnitReleaseDriver: false,
    delayedUnitbreakdownFlag: false,
    delayedUnitdamageFlag: false,
    isDelayBreakdown: false,
  },
  reducers: {
    setBrowseData: (state, { payload }) => {
      state.browseData = payload;
    },
    setDispatchData: (state, { payload }) => {
      state.dispatchData = payload;
    },
    setSaving: (state, { payload }) => {
      state.saving = payload;
    },
    setSortFlag: (state, { payload }) => {
      state.sortFlag = payload;
    },
    setMilesNotUpdated: (state, { payload }) => {
      state.milesNotUpdated = payload;
    },
    setSortValue: (state, { payload }) => {
      state.sortValue = payload;
    },
    setBrowseFlag: (state, { payload }) => {
      state.browseFlag = payload;
    },
    setPageNumber: (state, { payload }) => {
      state.pageNumber = payload;
    },
    setTotalElements: (state, { payload }) => {
      state.totalElements = payload;
    },
    setTotalPages: (state, { payload }) => {
      state.totalPages = payload;
    },
    setSelectedDispatch: (state, { payload }) => {
      state.selectedDispatch = payload;
    },
    setPaybackAmount: (state, { payload }) => {
      state.paybackAmount = payload;
    },
    setConditionIssues: (state, { payload }) => {
      state.conditionIssues = payload;
    },
    setActivationStatus: (state, { payload }) => {
      state.activationStatus = payload;
    },
    setSisterNotification: (state, { payload }) => {
      state.sisterNotification = payload;
    },
    setEquipment: (state, { payload }) => {
      state.equipment = payload;
    },
    setHoldReason: (state, { payload }) => {
      state.holdReason = payload;
    },
    setHoldNote: (state, { payload }) => {
      state.holdNote = payload;
    },
    setHoldAuthorizedBy: (state, { payload }) => {
      state.holdAuthorizedBy = payload;
    },
    setUnitOnHold: (state, { payload }) => {
      state.unitOnHold = payload;
    },
    setDeleteUnit: (state, { payload }) => {
      state.deleteUnit = payload;
    },
    setAttemptedPickup: (state, { payload }) => {
      state.attemptedPickup = payload;
    },
    setUndispatchReason: (state, { payload }) => {
      state.undispatchReason = payload;
    },
    setDeleteReason: (state, { payload }) => {
      state.deleteReason = payload;
    },
    setDeleteHasCreditCard: (state, { payload }) => {
      state.deleteHasCreditCard = payload;
    },
    setDeleteValidCreditCard: (state, { payload }) => {
      state.deleteValidCreditCard = payload;
    },
    setEquipmentHistoryData: (state, { payload }) => {
      state.equipmentHistoryData = payload;
    },
    addToCheckinList: (state, { payload }) => {
      state.checkedinList = [...state.checkedinList, payload];
    },
    removeFromCheckinList: (state, { payload }) => {
      const updatedData = state.checkedinList.filter((item) => item !== payload);
      state.checkedinList = updatedData;
    },
    setCheckEquipment: (state, { payload }) => {
      state.checkEquipment = payload;
    },

    setEquipmentHistorySortFlag: (state, { payload }) => {
      state.equipmentHistorySortFlag = payload;
    },
    setEquipmentHistorySortValue: (state, { payload }) => {
      state.equipmentHistorySortValue = payload;
    },
    setEquipmentHistoryPageNumber: (state, { payload }) => {
      state.equipmentHistoryPageNumber = payload;
    },
    setEquipmentHistoryTotalElements: (state, { payload }) => {
      state.equipmentHistoryTotalElements = payload;
    },
    setEquipmentHistoryTotalPages: (state, { payload }) => {
      state.equipmentHistoryTotalPages = payload;
    },
    setEquipmentReturned: (state, { payload }) => {
      const updatedData = state.equipmentHistoryData.map((item, index) => {
        if (index === payload) {
          return {
            ...item,
            returned: !item.returned, // Toggle the returned field
          };
        }
        return item;
      });

      state.equipmentHistoryData = updatedData;
    },
    setReasonForActivationDelay: (state, { payload }) => {
      state.reasonForActivationDelay = payload;
    },
    setDispatchDate: (state, { payload }) => {
      state.dispatchDate = payload;
    },

    resetBrowsePage: (state) => {
      state.pageNumber = 0;
      state.sortValue = null;
      state.sortFlag = false;
      state.selectedDispatch = null;
      state.browseData = [];
      state.totalElements = 0;
      state.totalPages = 0;
      state.dispatchDate = null;
    },
    resetUndispatchDetails: (state) => {
      state.paybackAmount = "";
      state.activationStatus = "Active";
      state.conditionIssues = "None";
      state.equipment = "Next Driver";
      state.sisterNotification = "Neither";
      state.unitOnHold = false;
      state.deleteUnit = false;
      state.attemptedPickup = false;
      state.undispatchReason = "";
      state.reasonForActivationDelay = "";
      state.holdReason = "";
      state.holdNote = "";
      state.holdAuthorizedBy = "";
      state.checkedinList = [];
      state.deleteReason = "";
      state.creditCardArrayList = [];
      state.apuCreditCardArrayList = [];
      state.remainingAmount = 0;
      state.apuRemainingAmount = 0;
    },
    setMiscellaneousDealerId: (state, action) => {
      state.miscellaneousDealerId = action.payload;
    },
    setMiscellaneousDealerData: (state, action) => {
      state.miscellaneousDealerData = action.payload;
    },
    setMiscellaneousFormDealerData: (state, action) => {
      state.miscellaneousFormDealerData = action.payload;
    },

    setSplittripScreenValid: (state, action) => {
      state.splittripScreenValid = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setSplitTripMilesData: (state, { payload }) => {
      state.splitTripMilesData = payload;
    },
    setSplitTripSaveData: (state, { payload }) => {
      state.splitTripSaveData = payload;
    },
    setInvoiceMiles: (state, action) => {
      state.invoiceMiles = action.payload;
    },
    setDriverTotalMiles: (state, action) => {
      state.driverTotalMiles = action.payload;
    },
    setCompletedDriverMiles: (state, action) => {
      state.completedDriverMiles = action.payload;
    },
    setDispatchDriverMiles: (state, action) => {
      state.dispatchDriverMiles = action.payload;
    },
    setCustomerFK: (state, action) => {
      state.customerFK = action.payload;
    },
    setFirstHalfDriverMiles: (state, action) => {
      state.firstHalfDriverMiles = action.payload;
    },
    setSecondHalfDriverMiles: (state, action) => {
      state.secondHalfDriverMiles = action.payload;
    },
    setSecondHalfActive: (state, action) => {
      state.secondHalfActive = action.payload;
    },
    setDriverAbandonedUnit: (state, action) => {
      state.driverAbandonedUnit = action.payload;
    },
    setInvoiceFlatrate: (state, action) => {
      state.invoiceFlatrate = action.payload;
    },
    setDriverTotalFlatrate: (state, action) => {
      state.driverTotalFlatrate = action.payload;
    },
    setCompletedDriverFlatrate: (state, action) => {
      state.completedDriverFlatrate = action.payload;
    },
    setDispatchDriverFlatrate: (state, action) => {
      state.dispatchDriverFlatrate = action.payload;
    },
    setFirstHalfDriverFlatrate: (state, action) => {
      state.firstHalfDriverFlatrate = action.payload;
    },
    setSecondHalfDriverFlatrate: (state, action) => {
      state.secondHalfDriverFlatrate = action.payload;
    },
    setTolls: (state, action) => {
      state.tolls = action.payload;
    },
    setPermits: (state, action) => {
      state.permits = action.payload;
    },
    setOther: (state, action) => {
      state.other = action.payload;
    },
    setPayRadioButton: (state, action) => {
      state.payRadioButton = action.payload;
    },
    setOtherDescription: (state, action) => {
      state.otherDescription = action.payload;
    },
    setIsFlatrated: (state, action) => {
      state.isFlatrated = action.payload;
    },
    setHasSplitOverrridePermission: (state, action) => {
      state.hasSplitOverrridePermission = action.payload;
    },
    setAllAmountTaxable: (state, action) => {
      state.allAmountTaxable = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAddress1: (state, action) => {
      state.address1 = action.payload;
    },
    setAddress2: (state, action) => {
      state.address2 = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setContactPhone: (state, action) => {
      state.contactPhone = action.payload;
    },
    setPostalCodeOnChange: (state, action) => {
      state.postalCodeOnChange = action.payload;
    },
    setCanadian1: (state, action) => {
      state.canadianNew = action.payload;
    },
    setCityNew: (state, action) => {
      state.cityNew = action.payload;
    },
    setStateCodeNew: (state, action) => {
      state.stateCodeNew = action.payload;
    },
    setPostalCodeNew: (state, action) => {
      state.postalCodeNew = action.payload;
    },
    setHours: (state, action) => {
      state.hours = action.payload;
    },
    setDirections: (state, action) => {
      state.directions = action.payload;
    },
    setOpenSunday: (state, action) => {
      state.openSunday = action.payload;
    },
    setOpenMonday: (state, action) => {
      state.openMonday = action.payload;
    },
    setOpenTuesday: (state, action) => {
      state.openTuesday = action.payload;
    },
    setOpenWednesday: (state, action) => {
      state.openWednesday = action.payload;
    },
    setOpenThursday: (state, action) => {
      state.openThursday = action.payload;
    },
    setOpenFriday: (state, action) => {
      state.openFriday = action.payload;
    },
    setOpenSaturday: (state, action) => {
      state.openSaturday = action.payload;
    },
    setBackButtonFlag: (state, action) => {
      state.backButtonFlag = action.payload;
    },
    resetSplitTripLocation: (state) => {
      state.miscellaneousDealerData = null;
      state.miscellaneousFormDealerData = null;
      state.name = "";
      state.address1 = "";
      state.address2 = "";
      state.email = "";
      state.phone = "";
      state.contact = "";
      state.contactPhone = "";
      state.directions = "";
      state.hours = "";
      state.cityNew = "";
      state.postalCodeNew = "";
      state.postalCodePK = null;
      state.stateCodeNew = "";
      state.openMonday = true;
      state.openTuesday = true;
      state.openThursday = true;
      state.openMonday = true;
      state.openWednesday = true;
      state.openFriday = true;
      state.openSaturday = false;
      state.openSunday = false;
      state.miscellaneousDealerData = null;
      state.miscellaneousDealerId = null;
      state.invoiceMiles = 0;
      state.driverTotalMiles = 0;
      state.completedDriverMiles = 0;
      state.dispatchDriverMiles = 0;
      state.firstHalfDriverMiles = 0;
      state.secondHalfDriverMiles = 0;
      state.secondHalfActive = 0;
      state.driverAbandonedUnit = 0;
      state.invoiceFlatrate = 0;
      state.driverTotalFlatrate = 0;
      state.completedDriverFlatrate = 0;
      state.dispatchDriverFlatrate = 0;
      state.firstHalfDriverFlatrate = 0;
      state.secondHalfDriverFlatrate = 0;
      state.miscellaneousDealerData = null;
      state.tolls = 0;
      state.permits = 0;
      state.other = 0;
      state.payRadioButton = false;
      state.otherDescription = 0;
      state.isFlatrated = false;
      state.hasSplitOverrridePermission = false;
      state.splitTripMilesData = false;
      state.allAmountTaxable = false;
      state.releaseAtPickupLocation = false;
    },
    setPostingCompanyFK: (state, { payload }) => {
      state.postingCompanyFK = payload;
    },
    setIsCurrentUnitValid: (state, action) => {
      state.isCurrentUnitValid = action.payload;
    },
    setSplitTripFlag: (state, action) => {
      state.splitTripFlag = action.payload;
    },
    setUndispatchFlag: (state, action) => {
      state.undispatchFlag = action.payload;
    },
    setSplitTripSave: (state, action) => {
      state.splitTripSave = action.payload;
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
    setSplitTripFiles: (state, action) => {
      const { actionType, payload } = action.payload;

      // Define mapping for actionType to corresponding key in scanInvoiceFiles
      const keyMapping = {
        customerUploadFiles: "customerUploadFiles",
        companyUploadFiles: "companyUploadFiles",
        bolUploadFiles: "bolUploadFiles",
        dafUploadFiles: "dafUploadFiles",
        iftaUploadFiles: "iftaUploadFiles",
        customerScanFiles: "customerScanFiles",
        companyScanFiles: "companyScanFiles",
        bolScanFiles: "bolScanFiles",
        dafScanFiles: "dafScanFiles",
        iftaScanFiles: "iftaScanFiles",
      };

      // Get the correct key from the mapping
      const targetKey = keyMapping[actionType];

      if (targetKey) {
        state.splitTripFiles[targetKey] = payload;
      }

      if (actionType === "clear") {
        state.splitTripFiles = {
          customerUploadFiles: [],
          companyUploadFiles: [],
          bolUploadFiles: [],
          dafUploadFiles: [],
          iftaUploadFiles: [],
          customerScanFiles: [],
          companyScanFiles: [],
          bolScanFiles: [],
          dafScanFiles: [],
          iftaScanFiles: [],
        };
        state.isButtonsLoopingCompleted = false;
      }
    },
    setApuFiles: (state, action) => {
      const { actionType, payload } = action.payload;

      // Define mapping for actionType to corresponding key in scanInvoiceFiles
      const keyMapping = {
        customerUploadFiles: "customerUploadFiles",
        companyUploadFiles: "companyUploadFiles",
        customerScanFiles: "customerScanFiles",
        companyScanFiles: "companyScanFiles",
      };

      // Get the correct key from the mapping
      const targetKey = keyMapping[actionType];

      if (targetKey) {
        state.apuFiles[targetKey] = payload;
      }

      if (actionType === "clear") {
        state.apuFiles = {
          customerUploadFiles: [],
          companyUploadFiles: [],
          customerScanFiles: [],
          companyScanFiles: [],
        };
      }
    },

    resetArrays: (state) => {
      state.customerPaperworkFiles = [];
      state.companyPaperworkFiles = [];
      state.bolFiles = [];
      state.dafFiles = [];
      state.iftaFiles = [];
    },
    setApuData: (state, action) => {
      state.apuData = action.payload;
    },
    setDriverAmount: (state, action) => {
      state.driverAmount = action.payload;
    },
    setInvoiceAmount: (state, action) => {
      state.invoiceAmount = action.payload;
    },
    setBillingCustomer: (state, action) => {
      state.billingCustomer = action.payload;
    },
    setBillingCustomerId: (state, action) => {
      state.billingCustomerId = action.payload;
    },
    setBillingCustomerInput: (state, action) => {
      state.billingCustomerInput = action.payload;
    },
    setChargeCreditcard: (state, action) => {
      state.chargeCreditcard = action.payload;
    },
    setApuAuthorizedBy: (state, action) => {
      state.apuAuthorizedBy = action.payload;
    },
    setInvoiceTrextArray: (state, action) => {
      state.invoiceTrextArray = action.payload;
    },
    setInvoiceText1: (state, action) => {
      state.invoicetext1 = action.payload;
    },
    setInvoiceText2: (state, action) => {
      state.invoicetext2 = action.payload;
    },
    setInvoiceText3: (state, action) => {
      state.invoicetext3 = action.payload;
    },
    setInvoiceText4: (state, action) => {
      state.invoicetext4 = action.payload;
    },
    setMiscellaneousInvoiceTextArray: (state, action) => {
      state.miscellaneousInvoiceTextArray = action.payload;
    },
    setMiscellaneousInvoicetext1: (state, action) => {
      state.miscellaneousInvoicetext1 = action.payload;
    },
    setMiscellaneousInvoicetext2: (state, action) => {
      state.miscellaneousInvoicetext2 = action.payload;
    },
    setMiscellaneousInvoicetext3: (state, action) => {
      state.miscellaneousInvoicetext3 = action.payload;
    },
    setMiscellaneousInvoicetext4: (state, action) => {
      state.miscellaneousInvoicetext4 = action.payload;
    },
    setMiscellaneousInvoicetext5: (state, action) => {
      state.miscellaneousInvoicetext5 = action.payload;
    },
    setMiscellaneousInvoicetext6: (state, action) => {
      state.miscellaneousInvoicetext6 = action.payload;
    },
    setMiscellaneousInvoicetext7: (state, action) => {
      state.miscellaneousInvoicetext7 = action.payload;
    },
    setMiscellaneousInvoicetext8: (state, action) => {
      state.miscellaneousInvoicetext8 = action.payload;
    },
    setMiscellaneousInvoicetext9: (state, action) => {
      state.miscellaneousInvoicetext9 = action.payload;
    },
    setInactiveAPUDropzone: (state, action) => {
      state.inactiveAPUDropzone = action.payload;
    },
    setCustomerApuPaperworkFiles: (state, action) => {
      state.customerApuPaperworkFiles = action.payload;
    },
    setCompanyApuPaperworkFiles: (state, action) => {
      state.companyApuPaperworkFiles = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setUnitId: (state, action) => {
      state.unitId = action.payload;
    },
    setApuSave: (state, action) => {
      state.apuSave = action.payload;
    },
    setPostalCodePK: (state, { payload }) => {
      state.postalCodePK = payload;
    },
    setReleaseAtPickupLocation: (state, { payload }) => {
      state.releaseAtPickupLocation = payload;
    },
    setCreditCardArrayList: (state, action) => {
      state.creditCardArrayList = action.payload;
    },
    setAPUCreditCardArrayList: (state, action) => {
      state.apuCreditCardArrayList = action.payload;
    },
    setApuBackButtonFlag: (state, action) => {
      state.apuBackButtonFlag = action.payload;
    },
    setRemainingAmount: (state, action) => {
      state.remainingAmount = action.payload;
    },
    setApuRemainingAmount: (state, action) => {
      state.apuRemainingAmount = action.payload;
    },
    setCreditCardData: (state, action) => {
      state.creditCardData = action.payload;
    },
    setInvoiceBillingCustomerId: (state, action) => {
      state.invoiceBillingCustomerId = action.payload;
    },
    setCreditCardConfirmationFlag: (state, action) => {
      state.creditCardConfirmationFlag = action.payload;
    },
    setUndispatchdelayFlag: (state, action) => {
      state.undispatchdelayFlag = action.payload;
    },
    setCreditCardLoder: (state, action) => {
      state.creditCardLoder = action.payload;
    },
    setReleaseDispatchPK: (state, action) => {
      state.releaseDispatchPK = action.payload;
    },
    setDelayedUnitReleaseDriver: (state, action) => {
      state.delayedUnitReleaseDriver = action.payload;
    },
    setUndispatchBreakdownFlag: (state, action) => {
      state.undispatchBreakdownFlag = action.payload;
    },
    setDelayedUnitbreakdownFlag: (state, action) => {
      state.delayedUnitbreakdownFlag = action.payload;
    },
    setDelayedUnitdamageFlag: (state, action) => {
      state.delayedUnitdamageFlag = action.payload;
    },
    setIsDelayBreakdown: (state, action) => {
      state.isDelayBreakdown = action.payload;
    },
    setDriverName: (state, action) => {
      state.driverName = action.payload;
    },
    setDriverPhone: (state, action) => {
      state.driverPhone = action.payload;
    },
    resetApuArrays: (state) => {
      state.customerApuPaperworkFiles = [];
      state.companyApuPaperworkFiles = [];
    },
    setIsButtonsLoopingCompleted: (state, action) => {
      state.isButtonsLoopingCompleted = action.payload;
    },
    resetApuScreen: (state) => {
      state.billingCustomer = "No";
      state.driverAmount = "";
      state.chargeCreditcard = false;
      state.apuAuthorizedBy = "";
      state.invoicetext1 = "";
      state.invoicetext2 = "";
      state.invoicetext3 = "";
      state.invoicetext4 = "";
      state.invoiceTrextArray = [];
      state.billingCustomerId = null;
      state.billingCustomerInput = "";
      state.invoiceAmount = "";
      state.apuData = null;
      state.apuCreditCardArrayList = [];
      state.apuRemainingAmount = 0;
      state.miscellaneousInvoicetext1 = "";
      state.miscellaneousInvoicetext2 = "";
      state.miscellaneousInvoicetext3 = "";
      state.miscellaneousInvoicetext4 = "";
      state.miscellaneousInvoicetext5 = "";
      state.miscellaneousInvoicetext6 = "";
      state.miscellaneousInvoicetext7 = "";
      state.miscellaneousInvoicetext8 = "";
      state.miscellaneousInvoicetext9 = "";
      state.miscellaneousInvoiceTextArray = [];
    },
  },
});
export const {
  setBrowseData,
  setDispatchData,
  setPageNumber,
  setSortFlag,
  setSortValue,
  setBrowseFlag,
  setTotalElements,
  setTotalPages,
  setSelectedDispatch,
  resetBrowsePage,
  setPaybackAmount,
  setConditionIssues,
  setActivationStatus,
  setSisterNotification,
  setEquipment,
  setUnitOnHold,
  setHoldAuthorizedBy,
  setDeleteReason,
  setHoldNote,
  setHoldReason,
  setDeleteUnit,
  setAttemptedPickup,
  setUndispatchReason,
  setEquipmentHistoryData,
  setEquipmentHistoryPageNumber,
  setEquipmentHistorySortValue,
  setEquipmentHistoryTotalElements,
  setEquipmentHistoryTotalPages,
  setEquipmentHistorySortFlag,
  resetUndispatchDetails,
  setCheckEquipment,
  setEquipmentReturned,
  setReasonForActivationDelay,
  setDispatchDate,
  setSaving,
  addToCheckinList,
  removeFromCheckinList,
  setMiscellaneousDealerId,
  setMiscellaneousDealerData,
  setMiscellaneousFormDealerData,
  setSplittripScreenValid,
  setOnCancel,
  setSplitTripMilesData,
  setSplitTripSaveData,
  setInvoiceMiles,
  setDriverTotalMiles,
  setCompletedDriverMiles,
  setDispatchDriverMiles,
  setFirstHalfDriverMiles,
  setSecondHalfDriverMiles,
  setSecondHalfActive,
  setDriverAbandonedUnit,
  setInvoiceFlatrate,
  setDriverTotalFlatrate,
  setCompletedDriverFlatrate,
  setDispatchDriverFlatrate,
  setFirstHalfDriverFlatrate,
  setSecondHalfDriverFlatrate,
  setTolls,
  setPermits,
  setOther,
  setPayRadioButton,
  setOtherDescription,
  setIsFlatrated,
  setHasSplitOverrridePermission,
  setAllAmountTaxable,
  setAddress1,
  setName,
  setAddress2,
  setEmail,
  setCanadian1,
  setPhone,
  setCityNew,
  setPostalCodeNew,
  setStateCodeNew,
  setPostalCodeOnChange,
  setContact,
  setContactPhone,
  setDirections,
  setHours,
  setCustomerFK,
  setOpenMonday,
  setOpenSunday,
  setOpenTuesday,
  setOpenWednesday,
  setOpenThursday,
  setOpenFriday,
  setOpenSaturday,
  resetSplitTripLocation,
  setBackButtonFlag,
  setSplitTripFlag,
  setUndispatchFlag,
  setInactiveDropzone,
  setIsCurrentUnitValid,
  setSplitTripSave,
  setCustomerPaperworkFiles,
  setCompanyPaperworkFiles,
  setBolFiles,
  setDafFiles,
  setIftaFiles,
  setBreakdownFiles,
  setSplitTripFiles,
  setApuFiles,
  setDeleteHasCreditCard,
  setDeleteValidCreditCard,
  setPostingCompanyFK,
  resetArrays,
  setApuData,
  setInvoiceAmount,
  setDriverAmount,
  setChargeCreditcard,
  setBillingCustomer,
  setBillingCustomerInput,
  setBillingCustomerId,
  setApuAuthorizedBy,
  setInvoiceTrextArray,
  setInvoiceText1,
  setInvoiceText2,
  setInvoiceText3,
  setInvoiceText4,
  setCompanyApuPaperworkFiles,
  setCustomerApuPaperworkFiles,
  setCustomerId,
  setUnitId,
  setInactiveAPUDropzone,
  resetApuArrays,
  resetApuScreen,
  setPostalCodePK,
  setCreditCardConfirmationFlag,
  setApuSave,
  setReleaseAtPickupLocation,
  setRemainingAmount,
  setApuRemainingAmount,
  setCreditCardData,
  setInvoiceBillingCustomerId,
  setApuBackButtonFlag,
  setCreditCardArrayList,
  setAPUCreditCardArrayList,
  setIsButtonsLoopingCompleted,
  setMilesNotUpdated,
  setUndispatchBreakdownFlag,
  setUndispatchdelayFlag,
  setReleaseDispatchPK,
  setDelayedUnitReleaseDriver,
  setDelayedUnitbreakdownFlag,
  setDelayedUnitdamageFlag,
  setIsDelayBreakdown,
  setCreditCardLoder,
  setMiscellaneousInvoiceTextArray,
  setMiscellaneousInvoicetext1,
  setMiscellaneousInvoicetext2,
  setMiscellaneousInvoicetext3,
  setMiscellaneousInvoicetext4,
  setMiscellaneousInvoicetext5,
  setMiscellaneousInvoicetext6,
  setMiscellaneousInvoicetext7,
  setMiscellaneousInvoicetext8,
  setMiscellaneousInvoicetext9,
  setDriverName,
  setDriverPhone,
} = UndispatchSlice.actions;

export default UndispatchSlice.reducer;
