import { createSlice } from "@reduxjs/toolkit";

const RerouteSlice = createSlice({
  name: "RerouteSlice",

  initialState: {
    //Unit Selection Screen
    dispatchPK: "",
    driverFK: "",
    unitFK: "",
    undeliveredActiveDispatchList: [],
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    changeColor: false,
    isunitsLoading: false,
    companyId: null,

    //Details Screen
    rerouteType: "",
    requestedBy: "Customer",
    dealerCustomerFK: null,
    dealerCustomerName: "",
    authorizedBy: "",
    reRouteMultiUnitLoad: false,
    notes: "",
    isPartialTrip: false,
    pickupDealerFK: null,
    pickupUnitAddressFK: null,
    deliveryDealerFK: null,
    deliveryUnitAddressFK: null,

    //Pickup Normal Dealer Screen
    normalDealerData: "",
    normalDealersList: [],
    normalDealerName: "",
    pickupNormalDealerFK: null,
    miscellaneousDealerData: "",
    selectedNewPickupNormalDealerData: "",
    miscellaneousPickup: false,
    selectedPickupDealer: null,
    hasSelectedPickupDealer: false,
    //Pickup Miscellaneous Dealer Screen
    pickupMiscellaneousDealerFK: null,
    selectedNewPickupMiscellneousDealerData: "",
    miscPickupID: null,
    updatedPickupMiscDealerData: null,

    //Delivery Normal Dealer Screen
    currentDeliveryNormalDealerData: "",
    currentDeliveryMiscellaneousDealerData: "",
    deliveryDealersList: [],
    deliveryDealerName: "",
    deliveryNormalDealerFK: null,
    selectedNewDeliveryNormalDealerData: "",
    miscellaneousDelivery: false,
    selectedDeliveryDealer: null,
    hasSelectedDeliveryDealer: false,
    //Delivery Miscellaneous Dealer Screen
    deliveryMiscellaneousDealerFK: null,
    selectedNewDeliveryMiscellneousDealerData: "",
    sortFlag: false,
    sortValue: null,
    selectedUnitInfo: null,
    miscDeliveryID: null,
    updatedDeliveryMiscDealerData: null,

    //Reroute Confirmation Screen
    invoiceMiles: 0,
    driverMiles: 0,
    isDefaultDriverMilesRedux: false,
    isDefaultInvoiceMilesRedux: false,
    mileagedErrorMsg: "",
    invoiceAmount: 0,
    driverAmount: 0,
    allowedInvoicePercentageRedux: 0,
    flatRateErrorMsg: "",
    showOverrideButton: "",
    defaultInvoiceMiles: 0,
    defaultDriverMiles: 0,
    invoiceFlatrate: 0,
    driverFlatrate: 0,
    dealerConnectionFlatrateFK: null,
    rateType: "Motorized",
    previousURL: null,
    navigatedFromRerouteBrowse: false,
    pcMilerError: "",
    isInvoiceFlatrateVisible: false,
    isDriverFlatrateVisible: false,
    invoiceFlatrate2: 0,
    driverFlatrate2: 0,

    //Edit Master Express Flag
    fromEditMasterExpress: false,

    //Credit Card
    creditCardArrayList: [],

    //state for fetching new misc delivery dealer
    newDeliveryUnitAddressFK: null,
    rateObj: null,
    //state for fetching new misc pickup dealer
    newPickupUnitAddressFK: null,
    disableRerouteButton: true,
    deliveryDealersearchType: "searchByStateCity",
    pickupDealersearchType: "searchByStateCity",
    isMiscDeliveryDealerValid: false,
    isMiscPickupDealerValid: false,
    unitLocation: "",
    rerouteLocationRedux: null,
    lastLocationRedux: null,
    visitedLocationScreen: false,
    isLocationValid: false,
    sendDriverPaperwork: false,
    hasChangedDeliveryMiscDealer: false,
    hasChangedPickupMiscDealer: false,
    hasClearedDeliveryDealerAutoComplete: false,
    hasClearedPickupDealerAutoComplete: false,
    hasChangedDeliveryMiscDealerStateCode: false,
    hasChangedPickupMiscDealerStateCode: false,
    fromDelayProcessing: false,
    unitCardDetails: [],
    initialUnitCardDetails: [],
  },
  reducers: {
    //Unit Selection Screen
    setDispatchPK: (state, action) => {
      state.dispatchPK = action.payload;
    },
    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },
    setUnitFK: (state, action) => {
      state.unitFK = action.payload;
    },
    setUndeliveredActiveDispatchList: (state, action) => {
      state.undeliveredActiveDispatchList = action.payload;
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
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setIsunitsLoading: (state, action) => {
      state.isunitsLoading = action.payload;
    },
    setCompanyId: (state, action) => {
      state.companyId = action.payload;
    },

    //Details Screen

    setRerouteType: (state, action) => {
      state.rerouteType = action.payload;
    },
    setRequestedBy: (state, action) => {
      state.requestedBy = action.payload;
    },
    setDealerCustomerFK: (state, action) => {
      state.dealerCustomerFK = action.payload;
    },
    setDealerCustomerName: (state, action) => {
      state.dealerCustomerName = action.payload;
    },
    setAuthorizedBy: (state, action) => {
      state.authorizedBy = action.payload;
    },
    setReRouteMultiUnitLoad: (state, action) => {
      state.reRouteMultiUnitLoad = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setIsPartialTrip: (state, action) => {
      state.isPartialTrip = action.payload;
    },
    setPickupDealerFK: (state, action) => {
      state.pickupDealerFK = action.payload;
    },
    setPickupUnitAddressFK: (state, action) => {
      state.pickupUnitAddressFK = action.payload;
    },
    setDeliveryDealerFK: (state, action) => {
      state.deliveryDealerFK = action.payload;
    },
    setDeliveryUnitAddressFK: (state, action) => {
      state.deliveryUnitAddressFK = action.payload;
    },

    //Pickup Normal Dealer Screen
    setNormalDealerData: (state, action) => {
      state.normalDealerData = action.payload;
    },
    setNormalDealersList: (state, action) => {
      state.normalDealersList = action.payload;
    },
    setNormalDealerName: (state, action) => {
      state.normalDealerName = action.payload;
    },
    setPickupNormalDealerFK: (state, action) => {
      state.pickupNormalDealerFK = action.payload;
    },
    setMiscellaneousDealerData: (state, action) => {
      state.miscellaneousDealerData = action.payload;
    },
    setSelectedNewPickupNormalDealerData: (state, action) => {
      state.selectedNewPickupNormalDealerData = action.payload;
    },
    setMiscellaneousPickup: (state, action) => {
      state.miscellaneousPickup = action.payload;
    },
    setHasSelectedPickupDealer: (state, action) => {
      state.hasSelectedPickupDealer = action.payload;
    },

    //Pickup Miscellaneous Dealer Screen
    setPickupMiscellaneousDealerFK: (state, action) => {
      state.pickupMiscellaneousDealerFK = action.payload;
    },
    setSelectedNewPickupMiscellneousDealerData: (state, action) => {
      state.selectedNewPickupMiscellneousDealerData = action.payload;
    },
    setMiscPickupID: (state, action) => {
      state.miscPickupID = action.payload;
    },

    //Delivery Normal Dealer Screen
    setCurrentDeliveryNormalDealerData: (state, action) => {
      state.currentDeliveryNormalDealerData = action.payload;
    },
    setCurrentDeliveryMiscellaneousDealerData: (state, action) => {
      state.currentDeliveryMiscellaneousDealerData = action.payload;
    },
    setDeliveryDealersList: (state, action) => {
      state.deliveryDealersList = action.payload;
    },
    setDeliveryDealerName: (state, action) => {
      state.deliveryDealerName = action.payload;
    },
    setDeliveryNormalDealerFK: (state, action) => {
      state.deliveryNormalDealerFK = action.payload;
    },
    setSelectedNewDeliveryNormalDealerData: (state, action) => {
      state.selectedNewDeliveryNormalDealerData = action.payload;
    },
    setMiscellaneousDelivery: (state, action) => {
      state.miscellaneousDelivery = action.payload;
    },
    setHasSelectedDeliveryDealer: (state, action) => {
      state.hasSelectedDeliveryDealer = action.payload;
    },

    //Delivery Miscellaneous Dealer Screen
    setDeliveryMiscellaneousDealerFK: (state, action) => {
      state.deliveryMiscellaneousDealerFK = action.payload;
    },
    setSelectedNewDeliveryMiscellneousDealerData: (state, action) => {
      state.selectedNewDeliveryMiscellneousDealerData = action.payload;
    },
    setSortFlag: (state, { payload }) => {
      state.sortFlag = payload;
    },
    setSortValue: (state, { payload }) => {
      state.sortValue = payload;
    },
    setSelectedUnitInfo: (state, { payload }) => {
      state.selectedUnitInfo = payload;
    },
    setMiscDeliveryID: (state, { payload }) => {
      state.miscDeliveryID = payload;
    },
    setUpdatedDeliveryMiscDealerData: (state, { payload }) => {
      state.updatedDeliveryMiscDealerData = payload;
    },

    setUpdatedPickupMiscDealerData: (state, { payload }) => {
      state.updatedPickupMiscDealerData = payload;
    },
    // Reroute Confirmation Screen
    setInvoiceMiles: (state, action) => {
      state.invoiceMiles = action.payload;
    },
    setDriverMiles: (state, action) => {
      state.driverMiles = action.payload;
    },
    setIsDefaultDriverMilesRedux: (state, action) => {
      state.isDefaultDriverMilesRedux = action.payload;
    },
    setIsDefaultInvoiceMilesRedux: (state, action) => {
      state.isDefaultInvoiceMilesRedux = action.payload;
    },

    setMileagedErrorMsg: (state, action) => {
      state.mileagedErrorMsg = action.payload;
    },

    setInvoiceAmount: (state, action) => {
      state.invoiceAmount = action.payload;
    },

    setDriverAmount: (state, action) => {
      state.driverAmount = action.payload;
    },

    setAllowedInvoicePercentageRedux: (state, action) => {
      state.allowedInvoicePercentageRedux = action.payload;
    },

    setFlatRateErrorMsg: (state, action) => {
      state.flatRateErrorMsg = action.payload;
    },

    setShowOverrideButton: (state, action) => {
      state.showOverrideButton = action.payload;
    },

    setDefaultInvoiceMiles: (state, action) => {
      state.defaultInvoiceMiles = action.payload;
    },
    setDefaultDriverMiles: (state, action) => {
      state.defaultDriverMiles = action.payload;
    },

    setInvoiceFlatrate: (state, action) => {
      state.invoiceFlatrate = action.payload;
    },
    setDriverFlatrate: (state, action) => {
      state.driverFlatrate = action.payload;
    },

    setDealerConnectionFlatrateFK: (state, action) => {
      state.dealerConnectionFlatrateFK = action.payload;
    },

    setRateType: (state, action) => {
      state.rateType = action.payload;
    },

    setPreviousURL: (state, action) => {
      state.previousURL = action.payload;
    },

    setNavigatedFromRerouteBrowse: (state, action) => {
      state.navigatedFromRerouteBrowse = action.payload;
    },

    setPcMilerError: (state, action) => {
      state.pcMilerError = action.payload;
    },

    setIsInvoiceFlatrateVisible: (state, action) => {
      state.isInvoiceFlatrateVisible = action.payload;
    },

    setIsDriverFlatrateVisible: (state, action) => {
      state.isDriverFlatrateVisible = action.payload;
    },
    setInvoiceFlatrate2: (state, action) => {
      state.invoiceFlatrate2 = action.payload;
    },
    setDriverFlatrate2: (state, action) => {
      state.driverFlatrate2 = action.payload;
    },
    //Edit Master Express Flag
    setFromEditMasterExpress: (state, action) => {
      state.fromEditMasterExpress = action.payload;
    },

    setCreditCardArrayList: (state, action) => {
      state.creditCardArrayList = action.payload;
    },

    setRateObj: (state, action) => {
      state.rateObj = action.payload;
    },

    setIsLocationValid: (state, action) => {
      state.isLocationValid = action.payload;
    },
    setSendDriverPaperwork: (state, action) => {
      state.sendDriverPaperwork = action.payload;
    },

    //Reset
    resetUnitDetails: (state, action) => {
      //Unit Selection Screen
      state.dispatchPK = "";
      state.unitFK = "";
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.changeColor = false;
      state.isunitsLoading = false;

      //Details Screen
      state.rerouteType = "";
      state.requestedBy = "Customer";
      state.dealerCustomerFK = null;
      state.dealerCustomerName = "";
      state.authorizedBy = "";
      state.reRouteMultiUnitLoad = false;
      state.notes = "";
      state.isPartialTrip = false;
      state.pickupDealerFK = null;
      state.pickupUnitAddressFK = null;
      state.deliveryDealerFK = null;
      state.deliveryUnitAddressFK = null;

      //Pickup Normal Dealer Screen
      state.normalDealerData = "";
      state.normalDealersList = [];
      state.normalDealerName = null;
      state.pickupNormalDealerFK = null;
      state.miscellaneousDealerData = "";
      state.selectedNewPickupNormalDealerData = "";
      state.miscellaneousPickup = false;
      state.selectedPickupDealer = null;
      state.hasSelectedPickupDealer = false;

      //Pickup Miscellaneous Dealer Screen
      state.pickupMiscellaneousDealerFK = null;
      state.selectedNewPickupMiscellneousDealerData = "";
      state.miscPickupID = null;

      //Delivery Normal Dealer Screen
      state.currentDeliveryNormalDealerData = "";
      state.currentDeliveryMiscellaneousDealerData = "";
      state.deliveryDealersList = [];
      state.deliveryDealerName = "";
      state.deliveryNormalDealerFK = null;
      state.selectedNewDeliveryNormalDealerData = "";
      state.miscellaneousDelivery = false;
      state.selectedDeliveryDealer = null;
      state.hasSelectedDeliveryDealer = false;

      //Delivery Miscellaneous Dealer Screen
      state.deliveryMiscellaneousDealerFK = null;
      state.selectedNewDeliveryMiscellneousDealerData = "";
      state.sortFlag = false;
      state.sortValue = null;
      state.miscDeliveryID = null;

      //Reroute Confirmation Screen

      state.rateObj = null;
      state.invoiceFlatrate = 0;
      state.invoiceFlatrate2 = 0;
      state.driverFlatrate = 0;
      state.driverFlatrate2 = 0;
      state.invoiceMiles = 0;
      state.driverMiles = 0;

      //Edit Master Express
      state.fromEditMasterExpress = false;

      //Credit Card
      state.creditCardArrayList = [];
      //Newly Edited Misc Pickup Dealer
      state.updatedPickupMiscDealerData = null;
      //Newly Edited Misc Delivery Dealer
      state.updatedDeliveryMiscDealerData = null;
      state.unitLocation = "";
      state.rerouteLocationRedux = null;
      state.lastLocationRedux = null;
      state.updatedDeliveryMiscDealerData = null;
      state.updatedPickupMiscDealerData = null;
      state.hasChangedDeliveryMiscDealer = false;
      state.hasChangedPickupMiscDealer = false;
      state.hasClearedDeliveryDealerAutoComplete = false;
      state.hasClearedPickupDealerAutoComplete = false;
      state.hasChangedDeliveryMiscDealerStateCode = false;
      state.hasChangedPickupMiscDealerStateCode = false;
    },
    setNewDeliveryUnitAddressFK: (state, action) => {
      state.newDeliveryUnitAddressFK = action.payload;
    },
    setNewPickupUnitAddressFK: (state, action) => {
      state.newPickupUnitAddressFK = action.payload;
    },
    setDisableRerouteButton: (state, action) => {
      state.disableRerouteButton = action.payload;
    },
    setDeliveryDealersearchType: (state, action) => {
      state.deliveryDealersearchType = action.payload;
    },
    setPickupDealersearchType: (state, action) => {
      state.pickupDealersearchType = action.payload;
    },
    setIsMiscDeliveryDealerValid: (state, action) => {
      state.isMiscDeliveryDealerValid = action.payload;
    },
    setIsMiscPickupDealerValid: (state, action) => {
      state.isMiscPickupDealerValid = action.payload;
    },
    setUnitLocation: (state, action) => {
      state.unitLocation = action.payload;
    },
    setRerouteLocationRedux: (state, action) => {
      state.rerouteLocationRedux = action.payload;
    },

    setLastLocationRedux: (state, action) => {
      state.lastLocationRedux = action.payload;
    },
    setVisitedLocationScreen: (state, action) => {
      state.visitedLocationScreen = action.payload;
    },
    setHasChangedDeliveryMiscDealer: (state, action) => {
      state.hasChangedDeliveryMiscDealer = action.payload;
    },
    setHasChangedPickupMiscDealer: (state, action) => {
      state.hasChangedPickupMiscDealer = action.payload;
    },
    setHasClearedDeliveryDealerAutoComplete: (state, action) => {
      state.hasClearedDeliveryDealerAutoComplete = action.payload;
    },
    setHasClearedPickupDealerAutoComplete: (state, action) => {
      state.hasClearedPickupDealerAutoComplete = action.payload;
    },

    setHasChangedDeliveryMiscDealerStateCode: (state, action) => {
      state.hasChangedDeliveryMiscDealerStateCode = action.payload;
    },
    setHasChangedPickupMiscDealerStateCode: (state, action) => {
      state.hasChangedPickupMiscDealerStateCode = action.payload;
    },
    setSelectedPickupDealer: (state, action) => {
      state.selectedPickupDealer = action.payload;
    },
    setSelectedDeliveryDealer: (state, action) => {
      state.selectedDeliveryDealer = action.payload;
    },
    setFromDelayProcessing: (state, action) => {
      state.fromDelayProcessing = action.payload;
    },
    setUnitCardDetails: (state, action) => {
      state.unitCardDetails = action.payload;
    },
    setInitialUnitCardDetails: (state, action) => {
      state.initialUnitCardDetails = action.payload;
    },
  },
});

export const {
  //Unit Selection Screen
  setDispatchPK,
  setDriverFK,
  setUnitFK,
  setUndeliveredActiveDispatchList,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setChangeColor,
  setIsunitsLoading,
  setCompanyId,
  resetUnitDetails,

  //Details Screen
  setRerouteType,
  setRequestedBy,
  setDealerCustomerFK,
  setDealerCustomerName,
  setAuthorizedBy,
  setReRouteMultiUnitLoad,
  setNotes,
  setIsPartialTrip,
  setPickupDealerFK,
  setPickupUnitAddressFK,
  setDeliveryDealerFK,
  setDeliveryUnitAddressFK,

  //Pickup Normal Dealer Screen
  setNormalDealerData,
  setNormalDealersList,
  setNormalDealerName,
  setPickupNormalDealerFK,
  setMiscellaneousDealerData,
  setSelectedNewPickupNormalDealerData,
  setMiscellaneousPickup,
  setSelectedPickupDealer,
  setHasSelectedPickupDealer,

  //Pickup Miscellaneous Dealer Screen
  setPickupMiscellaneousDealerFK,
  setSelectedNewPickupMiscellneousDealerData,
  setMiscPickupID,
  setUpdatedPickupMiscDealerData,

  //Delivery Normal Dealer Screen
  setCurrentDeliveryNormalDealerData,
  setCurrentDeliveryMiscellaneousDealerData,
  setDeliveryDealersList,
  setDeliveryDealerName,
  setDeliveryNormalDealerFK,
  setSelectedNewDeliveryNormalDealerData,
  setMiscellaneousDelivery,
  setSelectedDeliveryDealer,
  setHasSelectedDeliveryDealer,

  //Delivery Miscellaneous Dealer Screen
  setDeliveryMiscellaneousDealerFK,
  setSelectedNewDeliveryMiscellneousDealerData,
  setSortFlag,
  setSortValue,
  setSelectedUnitInfo,
  setMiscDeliveryID,
  setUpdatedDeliveryMiscDealerData,

  // Reroute Confirmation Screen
  setInvoiceMiles,
  setDriverMiles,
  setIsDefaultDriverMilesRedux,
  setIsDefaultInvoiceMilesRedux,
  setMileagedErrorMsg,
  setDriverAmount,
  setInvoiceAmount,
  setAllowedInvoicePercentageRedux,
  setFlatRateErrorMsg,
  setShowOverrideButton,
  setDefaultDriverMiles,
  setDefaultInvoiceMiles,
  setInvoiceFlatrate,
  setDriverFlatrate,
  setDealerConnectionFlatrateFK,
  setRateType,
  setPreviousURL,
  setNavigatedFromRerouteBrowse,
  setPcMilerError,
  setIsInvoiceFlatrateVisible,
  setIsDriverFlatrateVisible,
  setInvoiceFlatrate2,
  setDriverFlatrate2,
  setRateObj,

  //Edit Master Express
  setFromEditMasterExpress,
  setCreditCardArrayList,

  setNewDeliveryUnitAddressFK,
  setNewPickupUnitAddressFK,
  setDisableRerouteButton,
  setDeliveryDealersearchType,
  setPickupDealersearchType,
  setIsMiscDeliveryDealerValid,
  setIsMiscPickupDealerValid,
  setUnitLocation,
  setRerouteLocationRedux,
  setLastLocationRedux,
  setVisitedLocationScreen,
  setIsLocationValid,
  setHasChangedDeliveryMiscDealer,
  setHasChangedPickupMiscDealer,
  setHasClearedDeliveryDealerAutoComplete,
  setHasClearedPickupDealerAutoComplete,
  setHasChangedDeliveryMiscDealerStateCode,
  setHasChangedPickupMiscDealerStateCode,
  setFromDelayProcessing,
  setSendDriverPaperwork,
  setUnitCardDetails,
  setInitialUnitCardDetails,
} = RerouteSlice.actions;

export default RerouteSlice.reducer;
