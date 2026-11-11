import { createSlice } from "@reduxjs/toolkit";

const OrderEntryFilter = createSlice({
  name: "OrderEntryFilter",
  initialState: {
    /*********Customer Tab data -starts here************/

    //to save in Unit table from Customer tab---starts here
    selectedCustomerId: null,
    selectedCustomerBillingPlantId: null,
    selectedBillingPlantDetails: null,

    isCustomerMisc: false,
    deliverToPlant: false,
    deliveryCustomerPlantId: null,
    shuttleFromYard: false,
    deliveryCustomerYardId: null,
    deliveryCustomerShuttleCityId: null,
    pickupAtPlant: false,
    pickupCustomerPlantId: "",
    shuttleToYard: false,
    pickupCustomerYardId: null,
    pickupCustomerShuttleCityId: null,
    reload: false,
    returnRates: false,
    bulkUnits: false,
    checkPrepaid: false,
    plantCode: "",
    noPickupPulloutFee: false,
    noDeliveryPulloutFee: false,
    duplicateLoad: false,
    printBol: false,
    bolPrinterFK: 0,
    bulkInvoiceFK: "",
    batchLoadCustomerTab: false,
    firstBatchSequence: "",
    lastBatchSequence: "",
    showAddBulkInvoice: false,
    invoiceMilesAdjustment: 0,
    driverMilesAdjustment: 0,

    //Tab Validation
    isCustomerTabValid: false,

    //only used for the pagination for customer tab
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,

    isCustomerDpu: false,
    customerData: null,
    plantData: null,
    changeColor: false,
    customerPlantData: null,
    customerPickupPlantData: null,
    customerPickupYardData: null,
    customerDeliveryPlantData: null,
    customerDeliveryYardData: null,
    changeColorForPlantTable: false,
    selectedCustomerPlantId: null,
    chargeCreditCharge: false,
    useOpenBalance: false,
    billingPlantSelection: false,
    pickupPlantSelection: false,
    deliveryPlantSelection: false,
    pickupYardSelection: false,
    deliveryYardSelection: false,
    pickupShuttleCitySelection: false,
    deliveryShuttleCitySelection: false,
    pickupYardId: null,
    quickPayCustomer: false,
    customerPlant: [],
    isPlantExist: false,
    outbound: false,

    customerNameInput: "",
    customerPlantName: "",
    pickupPlantInput: "",
    deliveryPlantInput: "",
    pickupYardInput: "",
    deliveryYardInput: "",
    pickupCityInput: "",
    deliveryCityInput: "",
    bulkInvoiceInput: "",
    pickupPlantOutbound: false,
    deliveryPlantOutbound: false,

    /*********Customer Tab data - ends here************/

    units: null,
    miscellaneousPickup: false,
    unitOverWidthPermitsData: null,
    formDataOnHold: null,

    //misc Customer tab
    miscCustomerData: null,
    miscCustomerTabIsValid: false,
    miscCustomerId: null,
    miscCustomerSelection: false,

    //misc pickup dealer
    miscPickupDealerData: null,
    miscPickupDealerTabIsValid: false,
    miscPickupID: "",
    miscPickupDealerSelection: false,

    //misc delivery dealer
    miscDeliveryDealerFormData: null,
    miscDeliveryDealerTabIsValid: false,
    miscDeliveryID: "",
    miscDeliveryDealerSelection: false,

    // Unit Tab
    unitTabData: null,
    unitNumber: null,
    model: null,
    modelCode: null,
    vin: null,
    serialNumber: null,
    stockNumber: null,
    unitTypeInput: "",
    unitTypesFK: "",
    unitTypeData: null,
    towableRedux: false,
    hasRates: false,
    engineGas: false,
    engineDiesel: false,
    specialCodesFK: null,
    pickupDealersFK: null,
    deliveryDealersFK: null,
    miscellaneousDelivery: false,
    collectForCustomer: 0.0,
    poNumberRedux: null,
    authorizedByUnit: null,
    projectCodeUnit: null,
    bankUnit: null,
    clientUnit: null,
    GVWRUnit: 0,
    shippingWeightUnit: 0,
    driverTollsUnit: null,
    driverPermitsUnit: null,
    driverWashUnit: null,
    portEscortFeeUnit: 0,
    invoiceMiles: 0,
    driverMiles: 0,
    defaultInvoiceMiles: 0,
    defaultDriverMiles: 0,
    driverMilesBalance: 0,
    invoiceFlatrate: 0,
    driverFlatrate: 0,
    invoiceFlatrate2: 0,
    driverFlatrate2: 0,
    isInvoiceFlatrateVisible: false,
    isDriverFlatrateVisible: false,
    dealerConnectionFlatrateFK: null,
    rateType: "Motorized",
    commissionUnit: 0,
    commissionDriverFK: null,
    brokerFKUnit: null,
    portOfEntryFKUnit: null,
    freezePortOFEntryUnit: false,
    requiredCDLAUnit: false,
    tankerUnit: false,
    requiredTWICUnit: false,
    requiredIFTAUnit: false,
    DPUUnit: false,
    storageUnit: false,
    hasDriveBy: false,
    onHold: false,
    doNotInvoiceUnit: false,
    doNotDispatchUnit: false,
    activateDispatchUnit: false,
    dispatchPriorityUnit: null,
    unitsPerDispatchUnit: null,
    multiUnilLoad: false,
    unitMultiLoadsFK: null,
    unitMultiLoads: null,
    invoice2as3Unit: false,
    requireFlatbedUnit: false,
    contactDealerDelayUnit: false,
    invoiceDealerBreakdownUnit: false,
    invoiceHold: false,
    miscellaneousBolTextUnit: [],
    miscellaneousBolTextUnit1: null,
    miscellaneousBolTextUnit2: null,
    miscellaneousBolTextUnit3: null,
    miscellaneousBolTextUnit4: null,
    miscellaneousBolTextUnit5: null,
    miscellaneousBolTextUnit6: null,
    miscellaneousBolTextUnit7: null,
    orderDateUnit: "",
    releaseDateUnit: "",
    deliveryByDateUnit: "",
    earliestPickUpDateUnit: "",
    latestPickUpDateUnit: "",
    earliestDeliveryDateUnit: "",
    latestDeliveryDateUnit: "",
    unitTypeSelection: false,
    specialCodeSelection: false,
    pickupDealerSelection1: false,
    pickupDealerSelection2: false,
    deliveryDealerSelection1: false,
    deliveryDealerSelection2: false,
    selectedSpecialCode: null,
    selectedPickupDealer: null,
    selectedDeliveryDealer: null,
    brokerInput: "",
    brokerId: null,
    brokerSelection: false,
    selectedBroker: null,
    unitMultiLoadSelection: false,
    overWidthLoad: false,
    unitTabIsValid: false,
    selectedCustomerAllDetails: null,
    selectedCustomerPlantDetails: null,
    specialCodeInput: "",
    specialCodeId: "",
    pickupDealerInput: "",
    pickupDealerId: "",
    deliveryDealerInput: "",
    customerRatesList: [],
    isInvoiceMileageRateRedux: false,
    isDriverMileageRateRedux: false,
    customerRateStructureRedux: "",
    invoiceAmount: 0,
    invoiceAmountBackend: 0,
    invoiceAmountForOpenBalances: 0,
    invoiceFuelSurchargeAmount: "",
    driverAmount: 0,
    driverFuelSurchargeAmount: "",
    brokerType: "default",
    portOfEntryInput: "",
    portOfEntryId: "",
    portOfEntrySelection: false,
    selectedPortOfEntry: null,
    isDefaultDriverMilesRedux: false,
    isDefaultInvoiceMilesRedux: false,
    canadianPickup: false,
    canadianDelivery: false,
    allowedInvoicePercentageRedux: 0,
    invoiceSupplementalRate: 0,
    invoiceSupplementalFuelSurchargeRate: 0,
    invoiceSupplementalDescription: "",
    driverSupplementalRate: 0,
    driverSupplementalFuelSurchargeRate: 0,
    driverSupplementalDescription: "",
    invoiceSpecialRate: 0,
    invoiceSpecialFuelSurchargeRate: 0,
    invoiceSpecialDescription: "",
    driverSpecialRate: 0,
    driverSpecialFuelSurchargeRate: 0,
    driverSpecialDescription: "",
    invoiceAdditionalRate: 0,
    invoiceAdditionalFuelSurchargeRate: 0,
    invoiceAdditionalDescription: "",
    additionalFlatRateDescription: "",
    invoiceAdditionalFlatRate: 0,
    driverAdditionalRate: 0,
    driverAdditionalFuelSurchargeRate: 0,
    driverAdditionalDescription: "",
    driverAdditionalFlatRate: 0,
    invoiceCanadianCharge: 0,
    driverCanadianCharge: 0,
    invoiceUSCharge: 0,
    driverUSCharge: 0,
    invoiceCDLARate: 0,
    driverCDLARate: 0,
    invoiceCDLAReturn: false,
    driverCDLAReturn: false,
    invoiceReturnFlatRate: 0,
    driverReturnFlatRate: 0,
    invoiceRate: 0,
    driverRate: 0,
    invoiceFuelSurchargeRate: 0,
    driverFuelSurchargeRate: 0,
    invoiceReturnRate: 0,
    driverReturnRate: 0,
    invoiceLengthRate: 0,
    driverLengthRate: 0,
    isFODInvoice: false,
    invoiceCanadianRate: 0,
    invoiceCanadianFuelSurchargeRate: 0,
    invoiceCanadianDescription: "",
    driverCanadianRate: 0,
    driverCanadianFuelSurchargeRate: 0,
    driverCanadianDescription: "",
    ELDRequiredRedux: false,
    invoiceELDFeeRedux: 0,
    driverELDFeeRedux: 0,
    invoiceELDDescription: "",
    companyName: null,
    DPUPickupOwnerRedux: null,
    driverCDLARequiredRedux: false,
    plantOrderNumber: "",
    isMilesLowBoyRedux: false,
    pcMilerError: "",
    invoiceCustomerRateFK: "",
    driverCustomerRateFK: "",
    preInvoiced: false,
    payTolls: false,
    fodTolls: false,
    billTolls: false,
    payPermits: false,
    fodPermits: false,
    billPermits: false,
    payWash: false,
    billWash: false,
    invoiceSupplementalReturn: false,
    invoiceSpecialReturn: false,
    invoiceAdditionalReturn: false,
    driverSupplementalReturn: false,
    driverSpecialReturn: false,
    driverAdditionalReturn: false,
    invoiceLengthReturn: false,
    driverLengthReturn: false,
    showSingleUnitActivation: false,
    oeUnitData: [],
    invoiceMinimumRate: false,
    driverMinimumRate: false,
    unitOverride: false,
    showUnitOverride: false,
    saveTollsAndPermits: false,
    emailBOLAtOrderEntry: false,
    batchEmailBOLAtOrderEntry: false,
    batchEmailBOLDaily: false,
    // For Billing Plants
    emailPlantBOLAtOrderEntry: false,
    emailPlantBOLAtOrderEntryDPU: false,
    batchEmailPlantBOLAtOrderEntry: false,
    batchEmailPlantBOLDaily: false,

    // FODInvoice
    // FODInvoiceAmount
    // DriverMilesBalance

    // Contacts Tab
    contactId: "",
    seletedCustomerContactsList: null,
    availableContacts: [],
    assignedContacts: [],

    //Notes Tab
    notes: "",
    dispatchNotesRedux: "",

    //Invoice Hold
    invoiceHoldNotes: "",
    invoiceHoldTabIsValid: false,

    // credit Card
    isMandatoryCreditCardTab: true,
    creditCardData: null,
    chargePerUnitCreditCard: 0, // invoice of a single unit
    isCreditCardDetailsInComplete: false,
    isCreditCardDetailsPartial: false,
    dupLoadForCreditCard: false,
    totalBatchLoadCount: 0, // for storing the count of batch load units

    //Instructions
    instructions: null,

    //on hold tab
    onHoldTab: false,

    //over-width
    overWidthValidationFlag: true,

    //driveby
    drivebyArray: [],
    indexForNavigation: "",
    itemSelected: false,
    updateData: null,
    driveByValidationFlag: false,
    driveByAuthorised: "",
    driveByDealerSelection: false,
    showDriveByLookup: false,
    // isPoeSet: false, //should be false ,for testing set to true
    reduxDriverFlatRate: 0,
    flatRateErrorMsg: "",
    showOverrideButton: "",
    mileagedErrorMsg: "",

    //Open Balance
    openBalanceArray: [],
    unitOpenBalanceData: null,
    appliedAmountSum: 0,
    isOpenBalanceValid: false,
    isOpenBalancesDetailsInComplete: false,
    isOpenBalancesDetailsPartial: false,
    remainingAmt: 0,
    dupLoadForOpenBal: false,
    chargePerUnit: 0, //inbvoice of a single unit
    isSaving: false,

    //switch tabs
    activeKey: "customer",
    //for clearing fields after save
    dataReset: false,

    //for unitRoutes
    unitRouteArray: [],

    onCancel: false,

    // Factory Release Process
    releaseProcessFlag: "",
    plantRelease: false,
    plantReleaseDate: "",
    enableAppliedAmount: false,
    appliedAmount: 0, // Applied Amount In Open Blances Tab
    editPartialOrInCompleteOpenBalance: false,
    fodDealer: false,
  },
  reducers: {
    //switch tabs reducer
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
    //for reseting fields after save
    setDataReset: (state, action) => {
      state.dataReset = action.payload;
    },
    setIsCustomerTabValid: (state, action) => {
      state.isCustomerTabValid = action.payload;
    },
    setcustomerData: (state, action) => {
      state.customerData = action.payload;
    },
    setPlantData: (state, action) => {
      state.plantData = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setSelectedCustomerId: (state, action) => {
      state.selectedCustomerId = action.payload;
    },

    setIsCustomerMisc: (state, action) => {
      state.isCustomerMisc = action.payload;
    },
    setDeliverToPlant: (state, action) => {
      state.deliverToPlant = action.payload;
    },
    setShuttleFromYard: (state, action) => {
      state.shuttleFromYard = action.payload;
    },
    setDeliveryCustomerYardId: (state, action) => {
      state.deliveryCustomerYardId = action.payload;
    },
    setDeliveryCustomerShuttleCityId: (state, action) => {
      state.deliveryCustomerShuttleCityId = action.payload;
    },
    setPickupAtPlant: (state, action) => {
      state.pickupAtPlant = action.payload;
    },
    setPickupCustomerPlantId: (state, action) => {
      state.pickupCustomerPlantId = action.payload;
    },
    setShuttleToYard: (state, action) => {
      state.shuttleToYard = action.payload;
    },
    setPickupCustomerYardId: (state, action) => {
      state.pickupCustomerYardId = action.payload;
    },
    setPickupCustomerShuttleCityId: (state, action) => {
      state.pickupCustomerShuttleCityId = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },

    setReturnRates: (state, action) => {
      state.returnRates = action.payload;
    },
    setPrintBol: (state, action) => {
      state.printBol = action.payload;
    },
    setBOLPrinterFK: (state, action) => {
      state.bolPrinterFK = action.payload;
    },
    setBulkUnits: (state, action) => {
      state.bulkUnits = action.payload;
    },
    setBulkInvoiceFK: (state, action) => {
      state.bulkInvoiceFK = action.payload;
    },
    setCheckPrepaid: (state, action) => {
      state.checkPrepaid = action.payload;
    },
    setPlantCode: (state, action) => {
      state.plantCode = action.payload;
    },
    setNoPickupPulloutFee: (state, action) => {
      state.noPickupPulloutFee = action.payload;
    },
    setNoDeliveryPulloutFee: (state, action) => {
      state.noDeliveryPulloutFee = action.payload;
    },
    setQuickPayCustomer: (state, action) => {
      state.quickPayCustomer = action.payload;
    },
    setCustomerPlant: (state, action) => {
      state.customerPlant = action.payload;
    },
    updateCustomerPlant: (state, { payload }) => {
      let temp = state.customerPlant[0];
      state.customerPlant[0] = payload.item;
      state.customerPlant[payload.findIndex] = temp;
    },

    setIsPlantExist: (state, action) => {
      state.isPlantExist = action.payload;
    },

    setIsCustomerDpu: (state, action) => {
      state.isCustomerDpu = action.payload;
    },

    setBillingPlantSelection: (state, action) => {
      state.billingPlantSelection = action.payload;
    },

    setPickupPlantSelection: (state, action) => {
      state.pickupPlantSelection = action.payload;
    },

    setDeliveryPlantSelection: (state, action) => {
      state.deliveryPlantSelection = action.payload;
    },
    setPickupYardSelection: (state, action) => {
      state.pickupYardSelection = action.payload;
    },
    setDeliveryYardSelection: (state, action) => {
      state.deliveryYardSelection = action.payload;
    },

    setPickupShuttleCitySelection: (state, action) => {
      state.pickupShuttleCitySelection = action.payload;
    },
    setDeliveryShuttleCitySelection: (state, action) => {
      state.deliveryShuttleCitySelection = action.payload;
    },

    setCustomerPlantData: (state, action) => {
      state.customerPlantData = action.payload;
    },

    setCustomerPickupPlantData: (state, action) => {
      state.customerPickupPlantData = action.payload;
    },

    setCustomerPickupYardData: (state, action) => {
      state.customerPickupYardData = action.payload;
    },
    setCustomerDeliveryPlantData: (state, action) => {
      state.customerDeliveryPlantData = action.payload;
    },

    setCustomerDeliveryYardData: (state, action) => {
      state.customerDeliveryYardData = action.payload;
    },

    setChangeColorForPlantTable: (state, action) => {
      state.changeColorForPlantTable = action.payload;
    },

    setSelectedCustomerPlantId: (state, action) => {
      state.selectedCustomerPlantId = action.payload;
    },
    setSelectedCustomerBillingPlantId: (state, action) => {
      state.selectedCustomerBillingPlantId = action.payload;
    },
    setPickupYardId: (state, action) => {
      state.pickupYardId = action.payload;
    },
    setOutbound: (state, action) => {
      state.outbound = action.payload;
    },

    setDeliveryCustomerPlantId: (state, action) => {
      state.deliveryCustomerPlantId = action.payload;
    },

    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setDuplicateLoadFlag: (state, action) => {
      state.duplicateLoad = action.payload;
    },
    setBatchLoadCustomerTab: (state, action) => {
      state.batchLoadCustomerTab = action.payload;
    },
    setFirstBatchSequence: (state, action) => {
      state.firstBatchSequence = action.payload;
    },
    setLastBatchSequence: (state, action) => {
      state.lastBatchSequence = action.payload;
    },
    setShowAddBulkInvoice: (state, action) => {
      state.showAddBulkInvoice = action.payload;
    },
    setInvoiceMilesAdjustment: (state, action) => {
      state.invoiceMilesAdjustment = action.payload;
    },
    setDriverMilesAdjustment: (state, action) => {
      state.driverMilesAdjustment = action.payload;
    },

    setCustomerNameInput: (state, action) => {
      state.customerNameInput = action.payload;
    },
    setCustomerPlantName: (state, action) => {
      state.customerPlantName = action.payload;
    },
    setPickupPlantInput: (state, action) => {
      state.pickupPlantInput = action.payload;
    },
    setDeliveryPlantInput: (state, action) => {
      state.deliveryPlantInput = action.payload;
    },
    setPickupYardInput: (state, action) => {
      state.pickupYardInput = action.payload;
    },
    setDeliveryYardInput: (state, action) => {
      state.deliveryYardInput = action.payload;
    },
    setPickupCityInput: (state, action) => {
      state.pickupCityInput = action.payload;
    },
    setDeliveryCityInput: (state, action) => {
      state.deliveryCityInput = action.payload;
    },
    setBulkInvoiceInput: (state, action) => {
      state.bulkInvoiceInput = action.payload;
    },
    setPickupPlantOutbound: (state, action) => {
      state.pickupPlantOutbound = action.payload;
    },
    setDeliveryPlantOutbound: (state, action) => {
      state.deliveryPlantOutbound = action.payload;
    },

    // Unit Tab
    setUnitTabData: (state, action) => {},
    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setModelCode: (state, action) => {
      state.modelCode = action.payload;
    },
    setVin: (state, action) => {
      state.vin = action.payload;
    },
    setSerialNumber: (state, action) => {
      state.serialNumber = action.payload;
    },
    setStockNumber: (state, action) => {
      state.stockNumber = action.payload;
    },
    setUnitTypeInput: (state, action) => {
      state.unitTypeInput = action.payload;
    },
    setUnitTypesFK: (state, action) => {
      state.unitTypesFK = action.payload;
    },
    setUnitTypeData: (state, action) => {
      state.unitTypeData = action.payload;
    },
    setTowableRedux: (state, action) => {
      state.towableRedux = action.payload;
    },
    setHasRates: (state, action) => {
      state.hasRates = action.payload;
    },
    setEngineGas: (state, action) => {
      state.engineGas = action.payload;
    },
    setEngineDiesel: (state, action) => {
      state.engineDiesel = action.payload;
    },
    setSpecialCodesFK: (state, action) => {
      state.specialCodesFK = action.payload;
    },
    setPickupDealersFK: (state, action) => {
      state.pickupDealersFK = action.payload;
    },
    setMiscPickup: (state, action) => {
      state.miscellaneousPickup = action.payload;
    },
    setDeliveryDealersFK: (state, action) => {
      state.deliveryDealersFK = action.payload;
    },
    setMiscellaneousDelivery: (state, action) => {
      state.miscellaneousDelivery = action.payload;
    },
    setCollectForCustomer: (state, action) => {
      state.collectForCustomer = action.payload;
    },
    setPoNumberRedux: (state, action) => {
      state.poNumberRedux = action.payload;
    },
    setAuthorizedByUnit: (state, action) => {
      state.authorizedByUnit = action.payload;
    },
    setProjectCodeUnit: (state, action) => {
      state.projectCodeUnit = action.payload;
    },
    setBankUnit: (state, action) => {
      state.bankUnit = action.payload;
    },
    setClientUnit: (state, action) => {
      state.clientUnit = action.payload;
    },
    setGVWRUnit: (state, action) => {
      state.GVWRUnit = action.payload;
    },
    setShippingWeightUnit: (state, action) => {
      state.shippingWeightUnit = action.payload;
    },
    setDriverTollsUnit: (state, action) => {
      state.driverTollsUnit = action.payload;
    },
    setDriverPermitsUnit: (state, action) => {
      state.driverPermitsUnit = action.payload;
    },
    setDriverWashUnit: (state, action) => {
      state.driverWashUnit = action.payload;
    },
    setPortEscortFeeUnit: (state, action) => {
      state.portEscortFeeUnit = action.payload;
    },
    setInvoiceMiles: (state, action) => {
      state.invoiceMiles = action.payload;
    },
    setDriverMiles: (state, action) => {
      state.driverMiles = action.payload;
    },
    setDefaultInvoiceMiles: (state, action) => {
      state.defaultInvoiceMiles = action.payload;
    },
    setDefaultDriverMiles: (state, action) => {
      state.defaultDriverMiles = action.payload;
    },
    setDriverMilesBalance: (state, action) => {
      state.driverMilesBalance = action.payload;
    },
    setInvoiceFlatrate: (state, action) => {
      state.invoiceFlatrate = action.payload;
    },
    setDriverFlatrate: (state, action) => {
      state.driverFlatrate = action.payload;
    },
    setInvoiceFlatrate2: (state, action) => {
      state.invoiceFlatrate2 = action.payload;
    },
    setDriverFlatrate2: (state, action) => {
      state.driverFlatrate2 = action.payload;
    },
    setIsInvoiceFlatrateVisible: (state, action) => {
      state.isInvoiceFlatrateVisible = action.payload;
    },
    setIsDriverFlatrateVisible: (state, action) => {
      state.isDriverFlatrateVisible = action.payload;
    },
    setDealerConnectionFlatrateFK: (state, action) => {
      state.dealerConnectionFlatrateFK = action.payload;
    },
    setRateType: (state, action) => {
      state.rateType = action.payload;
    },
    setIsFlatRatesFromUnit: (state, action) => {
      state.isFlatRatesFromUnit = action.payload;
    },
    setCommissionUnit: (state, action) => {
      state.commissionUnit = action.payload;
    },
    setCommissionDriverFK: (state, action) => {
      state.commissionDriverFK = action.payload;
    },
    setBrokerFKUnit: (state, action) => {
      state.brokerFKUnit = action.payload;
    },
    setPortOfEntryFKUnit: (state, action) => {
      state.portOfEntryFKUnit = action.payload;
    },
    setFreezePortOFEntryUnit: (state, action) => {
      state.freezePortOFEntryUnit = action.payload;
    },
    setRequiredCDLAUnit: (state, action) => {
      state.requiredCDLAUnit = action.payload;
    },
    setTankerUnit: (state, action) => {
      state.tankerUnit = action.payload;
    },
    setRequiredTWICUnit: (state, action) => {
      state.requiredTWICUnit = action.payload;
    },
    setRequiredIFTAUnit: (state, action) => {
      state.requiredIFTAUnit = action.payload;
    },
    setHasDriveBys: (state, action) => {
      state.hasDriveBy = action.payload;
    },
    setDPUUnit: (state, action) => {
      state.DPUUnit = action.payload;
    },
    setStorageUnit: (state, action) => {
      state.storageUnit = action.payload;
    },
    setOnHold: (state, action) => {
      state.onHold = action.payload;
    },
    setDoNotInvoiceUnit: (state, action) => {
      state.doNotInvoiceUnit = action.payload;
    },
    setDoNotDispatchUnit: (state, action) => {
      state.doNotDispatchUnit = action.payload;
    },
    setActivateDispatchUnit: (state, action) => {
      state.activateDispatchUnit = action.payload;
    },
    setDispatchPriorityUnit: (state, action) => {
      state.dispatchPriorityUnit = action.payload;
    },
    setUnitsPerDispatchUnit: (state, action) => {
      state.unitsPerDispatchUnit = action.payload;
    },
    setMultiUnilLoad: (state, action) => {
      state.multiUnilLoad = action.payload;
    },
    setunitMultiLoadsFK: (state, action) => {
      state.unitMultiLoadsFK = action.payload;
    },
    setUnitMultiLoads: (state, action) => {
      state.unitMultiLoads = action.payload;
    },

    setInvoice2as3Unit: (state, action) => {
      state.invoice2as3Unit = action.payload;
    },

    setRequireFlatbedUnit: (state, action) => {
      state.requireFlatbedUnit = action.payload;
    },

    setContactDealerDelayUnit: (state, action) => {
      state.contactDealerDelayUnit = action.payload;
    },

    setInvoiceDealerBreakdownUnit: (state, action) => {
      state.invoiceDealerBreakdownUnit = action.payload;
    },
    setInvoiceHold: (state, action) => {
      state.invoiceHold = action.payload;
    },
    setMiscellaneousBolTextUnit: (state, action) => {
      state.miscellaneousBolTextUnit = action.payload;
    },
    setMiscellaneousBolTextUnit1: (state, action) => {
      state.miscellaneousBolTextUnit1 = action.payload;
    },
    setMiscellaneousBolTextUnit2: (state, action) => {
      state.miscellaneousBolTextUnit2 = action.payload;
    },
    setMiscellaneousBolTextUnit3: (state, action) => {
      state.miscellaneousBolTextUnit3 = action.payload;
    },
    setMiscellaneousBolTextUnit4: (state, action) => {
      state.miscellaneousBolTextUnit4 = action.payload;
    },
    setMiscellaneousBolTextUnit5: (state, action) => {
      state.miscellaneousBolTextUnit5 = action.payload;
    },
    setMiscellaneousBolTextUnit6: (state, action) => {
      state.miscellaneousBolTextUnit6 = action.payload;
    },
    setMiscellaneousBolTextUnit7: (state, action) => {
      state.miscellaneousBolTextUnit7 = action.payload;
    },
    setOrderDateUnit: (state, action) => {
      state.orderDateUnit = action.payload;
    },
    setReleaseDateUnit: (state, action) => {
      state.releaseDateUnit = action.payload;
    },
    setDeliveryByDateUnit: (state, action) => {
      state.deliveryByDateUnit = action.payload;
    },
    setEarliestPickUpDateUnit: (state, action) => {
      state.earliestPickUpDateUnit = action.payload;
    },
    setEarliestDeliveryDateUnit: (state, action) => {
      state.earliestDeliveryDateUnit = action.payload;
    },
    setLatestPickUpDateUnit: (state, action) => {
      state.latestPickUpDateUnit = action.payload;
    },
    setLatestDeliveryDateUnit: (state, action) => {
      state.latestDeliveryDateUnit = action.payload;
    },
    setOverWidthLoad: (state, action) => {
      state.overWidthLoad = action.payload;
    },
    setIsDefaultDriverMilesRedux: (state, action) => {
      state.isDefaultDriverMilesRedux = action.payload;
    },
    setIsDefaultInvoiceMilesRedux: (state, action) => {
      state.isDefaultInvoiceMilesRedux = action.payload;
    },

    setCanadianPickup: (state, action) => {
      state.canadianPickup = action.payload;
    },

    setCanadianDelivery: (state, action) => {
      state.canadianDelivery = action.payload;
    },

    // Unit Tab

    setUnitsData: (state, action) => {
      let payload = action.payload;
      state.units = {
        ...state.units,
        ...payload,
      };
    },

    setUnitTypeSelection: (state, action) => {
      state.unitTypeSelection = action.payload;
    },
    setSpecialCodeSelection: (state, action) => {
      state.specialCodeSelection = action.payload;
    },
    setPickupDealerSelection1: (state, action) => {
      state.pickupDealerSelection1 = action.payload;
    },
    setPickupDealerSelection2: (state, action) => {
      state.pickupDealerSelection2 = action.payload;
    },
    setDeliveryDealerSelection1: (state, action) => {
      state.deliveryDealerSelection1 = action.payload;
    },
    setDeliveryDealerSelection2: (state, action) => {
      state.deliveryDealerSelection2 = action.payload;
    },
    setInvoiceMinimumRate: (state, action) => {
      state.invoiceMinimumRate = action.payload;
    },
    setDriverMinimumRate: (state, action) => {
      state.driverMinimumRate = action.payload;
    },
    setSelectedSpecialCode: (state, action) => {
      state.selectedSpecialCode = action.payload;
    },
    setSelectedBroker: (state, action) => {
      state.selectedBroker = action.payload;
    },
    setSelectedPickupDealer: (state, action) => {
      state.selectedPickupDealer = action.payload;
    },
    setSelectedDeliveryDealer: (state, action) => {
      state.selectedDeliveryDealer = action.payload;
    },
    setBrokerInput: (state, action) => {
      state.brokerInput = action.payload;
    },
    setBrokerId: (state, action) => {
      state.brokerId = action.payload;
    },
    setBrokerSelection: (state, action) => {
      state.brokerSelection = action.payload;
    },

    setUnitMultiLoadSelection: (state, action) => {
      state.unitMultiLoadSelection = action.payload;
    },

    setFocusOnUnitTab: (state, action) => {
      state.focusOnUnitTab = action.payload;
    },

    setOnHoldForm: (state, action) => {
      // state.formDataOnHold = action.payload;
      let payload = action.payload;
      state.formDataOnHold = {
        ...state.formDataOnHold,
        ...payload,
      };
    },

    setChargeCreditCard: (state, action) => {
      state.chargeCreditCharge = action.payload;
    },
    setCreditCardData: (state, action) => {
      state.creditCardData = action.payload;
    },
    setUseOpenBalance: (state, action) => {
      state.useOpenBalance = action.payload;
    },
    setBulkinvoices: (state, action) => {
      state.bulkInvoices = action.payload;
    },

    setUnitOverWidthPermitsData: (state, action) => {
      let payload = action.payload;
      state.unitOverWidthPermitsData = {
        ...state.unitOverWidthPermitsData,
        ...payload,
      };
    },
    setUnitTabIsValid: (state, action) => {
      state.unitTabIsValid = action.payload;
    },

    setSelectedCustomerAllDetails: (state, action) => {
      state.selectedCustomerAllDetails = action.payload;
    },

    setSelectedCustomerPlantDetails: (state, action) => {
      state.selectedCustomerPlantDetails = action.payload;
    },
    setSpecialCodeInput: (state, action) => {
      state.specialCodeInput = action.payload;
    },
    setSpecialCodeId: (state, action) => {
      state.specialCodeId = action.payload;
    },

    setPickupDealerInput: (state, action) => {
      state.pickupDealerInput = action.payload;
    },

    setPickupDealerId: (state, action) => {
      state.pickupDealerId = action.payload;
    },

    setDeliveryDealerInput: (state, action) => {
      state.deliveryDealerInput = action.payload;
    },

    setCustomerRatesList: (state, action) => {
      state.customerRatesList = action.payload;
    },
    setCustomerRateStructureRedux: (state, action) => {
      state.customerRateStructureRedux = action.payload;
    },
    setIsInvoiceMileageRateRedux: (state, action) => {
      state.isInvoiceMileageRateRedux = action.payload;
    },
    setIsDriverMileageRateRedux: (state, action) => {
      state.isDriverMileageRateRedux = action.payload;
    },
    setInvoiceAmount: (state, action) => {
      state.invoiceAmount = action.payload;
    },
    setInvoiceAmountBackend: (state, action) => {
      state.invoiceAmountBackend = action.payload;
    },

    setInvoiceAmountForOpenBalances: (state, action) => {
      state.invoiceAmountForOpenBalances = action.payload;
    },

    setInvoiceFuelSurchargeAmount: (state, action) => {
      state.invoiceFuelSurchargeAmount = action.payload;
    },
    setDriverAmount: (state, action) => {
      state.driverAmount = action.payload;
    },
    setDriverFuelSurchargeAmount: (state, action) => {
      state.driverFuelSurchargeAmount = action.payload;
    },
    setBrokerType: (state, action) => {
      state.brokerType = action.payload;
    },

    setPortOfEntryInput: (state, action) => {
      state.portOfEntryInput = action.payload;
    },

    setPortOfEntryId: (state, action) => {
      state.portOfEntryId = action.payload;
    },

    setPortOfEntrySelection: (state, action) => {
      state.portOfEntrySelection = action.payload;
    },

    setSelectedPortOfEntry: (state, action) => {
      state.selectedPortOfEntry = action.payload;
    },
    setSelectedBillingPlantDetails: (state, action) => {
      state.selectedBillingPlantDetails = action.payload;
    },
    setAllowedInvoicePercentageRedux: (state, action) => {
      state.allowedInvoicePercentageRedux = action.payload;
    },

    setInvoiceSupplementalRate: (state, action) => {
      state.invoiceSupplementalRate = action.payload;
    },
    setInvoiceSupplementalFuelSurchargeRate: (state, action) => {
      state.invoiceSupplementalFuelSurchargeRate = action.payload;
    },
    setInvoiceSupplementalDescription: (state, action) => {
      state.invoiceSupplementalDescription = action.payload;
    },

    setDriverSupplementalRate: (state, action) => {
      state.driverSupplementalRate = action.payload;
    },
    setDriverSupplementalFuelSurchargeRate: (state, action) => {
      state.driverSupplementalFuelSurchargeRate = action.payload;
    },
    setDriverSupplementalDescription: (state, action) => {
      state.driverSupplementalDescription = action.payload;
    },

    setInvoiceSpecialRate: (state, action) => {
      state.invoiceSpecialRate = action.payload;
    },
    setInvoiceSpecialFuelSurchargeRate: (state, action) => {
      state.invoiceSpecialFuelSurchargeRate = action.payload;
    },
    setInvoiceSpecialDescription: (state, action) => {
      state.invoiceSpecialDescription = action.payload;
    },

    setDriverSpecialRate: (state, action) => {
      state.driverSpecialRate = action.payload;
    },
    setDriverSpecialFuelSurchargeRate: (state, action) => {
      state.driverSpecialFuelSurchargeRate = action.payload;
    },
    setDriverSpecialDescription: (state, action) => {
      state.driverSpecialDescription = action.payload;
    },

    setInvoiceAdditionalRate: (state, action) => {
      state.invoiceAdditionalRate = action.payload;
    },
    setInvoiceAdditionalFuelSurchargeRate: (state, action) => {
      state.invoiceAdditionalFuelSurchargeRate = action.payload;
    },
    setInvoiceAdditionalDescription: (state, action) => {
      state.invoiceAdditionalDescription = action.payload;
    },

    setInvoiceAdditionalFlatRate: (state, action) => {
      state.invoiceAdditionalFlatRate = action.payload;
    },

    setAdditionalFlatRateDescription: (state, action) => {
      state.additionalFlatRateDescription = action.payload;
    },

    setDriverAdditionalFlatRate: (state, action) => {
      state.driverAdditionalFlatRate = action.payload;
    },

    setDriverAdditionalRate: (state, action) => {
      state.driverAdditionalRate = action.payload;
    },
    setDriverAdditionalFuelSurchargeRate: (state, action) => {
      state.driverAdditionalFuelSurchargeRate = action.payload;
    },
    setDriverAdditionalDescription: (state, action) => {
      state.driverAdditionalDescription = action.payload;
    },

    setInvoiceCanadianCharge: (state, action) => {
      state.invoiceCanadianCharge = action.payload;
    },

    setDriverCanadianCharge: (state, action) => {
      state.driverCanadianCharge = action.payload;
    },

    setInvoiceUSCharge: (state, action) => {
      state.invoiceUSCharge = action.payload;
    },

    setDriverUSCharge: (state, action) => {
      state.driverUSCharge = action.payload;
    },

    setInvoiceCDLARate: (state, action) => {
      state.invoiceCDLARate = action.payload;
    },

    setDriverCDLARate: (state, action) => {
      state.driverCDLARate = action.payload;
    },

    setInvoiceCDLAReturn: (state, action) => {
      state.invoiceCDLAReturn = action.payload;
    },

    setDriverCDLAReturn: (state, action) => {
      state.driverCDLAReturn = action.payload;
    },

    setInvoiceReturnFlatRate: (state, action) => {
      state.invoiceReturnFlatRate = action.payload;
    },

    setDriverReturnFlatRate: (state, action) => {
      state.driverReturnFlatRate = action.payload;
    },
    setInvoiceRate: (state, action) => {
      state.invoiceRate = action.payload;
    },

    setDriverRate: (state, action) => {
      state.driverRate = action.payload;
    },

    setInvoiceFuelSurchargeRate: (state, action) => {
      state.invoiceFuelSurchargeRate = action.payload;
    },

    setDriverFuelSurchargeRate: (state, action) => {
      state.driverFuelSurchargeRate = action.payload;
    },

    setInvoiceReturnRate: (state, action) => {
      state.invoiceReturnRate = action.payload;
    },

    setDriverReturnRate: (state, action) => {
      state.driverReturnRate = action.payload;
    },

    setInvoiceLengthRate: (state, action) => {
      state.invoiceLengthRate = action.payload;
    },

    setDriverLengthRate: (state, action) => {
      state.driverLengthRate = action.payload;
    },
    setIsFODInvoice: (state, action) => {
      state.isFODInvoice = action.payload;
    },

    setInvoiceCanadianRate: (state, action) => {
      state.invoiceCanadianRate = action.payload;
    },

    setInvoiceCanadianFuelSurchargeRate: (state, action) => {
      state.invoiceCanadianFuelSurchargeRate = action.payload;
    },

    setInvoiceCanadianDescription: (state, action) => {
      state.invoiceCanadianDescription = action.payload;
    },

    setDriverCanadianRate: (state, action) => {
      state.driverCanadianRate = action.payload;
    },
    setDriverCanadianFuelSurchargeRate: (state, action) => {
      state.driverCanadianFuelSurchargeRate = action.payload;
    },
    setDriverCanadianDescription: (state, action) => {
      state.invoiceCanadianDescription = action.payload;
    },

    setELDRequiredRedux: (state, action) => {
      state.ELDRequiredRedux = action.payload;
    },

    setInvoiceELDFeeRedux: (state, action) => {
      state.invoiceELDFeeRedux = action.payload;
    },
    setDriverELDFeeRedux: (state, action) => {
      state.driverELDFeeRedux = action.payload;
    },
    setInvoiceELDDescription: (state, action) => {
      state.invoiceELDDescription = action.payload;
    },

    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setDPUPickupOwnerRedux: (state, action) => {
      let payload = action.payload;
      state.DPUPickupOwnerRedux = {
        ...state.DPUPickupOwnerRedux,
        ...payload,
      };
    },
    setDriverCDLARequiredRedux: (state, action) => {
      state.driverCDLARequiredRedux = action.payload;
    },

    setPlantOrderNumber: (state, action) => {
      state.plantOrderNumber = action.payload;
    },

    setIsMilesLowBoyRedux: (state, action) => {
      state.isMilesLowBoyRedux = action.payload;
    },

    setPcMilerError: (state, action) => {
      state.pcMilerError = action.payload;
    },

    setInvoiceCustomerRateFK: (state, action) => {
      state.invoiceCustomerRateFK = action.payload;
    },

    setDriverCustomerRateFK: (state, action) => {
      state.driverCustomerRateFK = action.payload;
    },

    setPreInvoiced: (state, action) => {
      state.preInvoiced = action.payload;
    },
    setPayTolls: (state, action) => {
      state.payTolls = action.payload;
    },
    setFODTolls: (state, action) => {
      state.fodTolls = action.payload;
    },
    setBillTolls: (state, action) => {
      state.billTolls = action.payload;
    },
    setPayPermits: (state, action) => {
      state.payPermits = action.payload;
    },
    setFODPermits: (state, action) => {
      state.fodPermits = action.payload;
    },
    setBillPermits: (state, action) => {
      state.billPermits = action.payload;
    },
    setPayWash: (state, action) => {
      state.payWash = action.payload;
    },
    setBillWash: (state, action) => {
      state.billWash = action.payload;
    },
    setInvoiceSupplementalReturn: (state, action) => {
      state.invoiceSupplementalReturn = action.payload;
    },
    setInvoiceSpecialReturn: (state, action) => {
      state.invoiceSpecialReturn = action.payload;
    },
    setInvoiceAdditionalReturn: (state, action) => {
      state.invoiceAdditionalReturn = action.payload;
    },
    setDriverSupplementalReturn: (state, action) => {
      state.driverSupplementalReturn = action.payload;
    },
    setDriverSpecialReturn: (state, action) => {
      state.driverSpecialReturn = action.payload;
    },
    setDriverAdditionalReturn: (state, action) => {
      state.driverAdditionalReturn = action.payload;
    },

    setInvoiceLengthReturn: (state, action) => {
      state.invoiceLengthReturn = action.payload;
    },
    setDriverLengthReturn: (state, action) => {
      state.driverLengthReturn = action.payload;
    },
    setShowSingleUnitActivation: (state, action) => {
      state.showSingleUnitActivation = action.payload;
    },

    setOeUnitData: (state, action) => {
      state.oeUnitData = action.payload;
    },

    setUnitOverride: (state, action) => {
      state.unitOverride = action.payload;
    },

    setShowUnitOverride: (state, action) => {
      state.showUnitOverride = action.payload;
    },
    setSaveTollsAndPermits: (state, action) => {
      state.saveTollsAndPermits = action.payload;
    },

    setEmailBOLAtOrderEntry: (state, action) => {
      state.emailBOLAtOrderEntry = action.payload;
    },

    setBatchEmailBOLAtOrderEntry: (state, action) => {
      state.batchEmailBOLAtOrderEntry = action.payload;
    },
    setBatchEmailBOLDaily: (state, action) => {
      state.batchEmailBOLDaily = action.payload;
    },

    // For Plants
    setEmailPlantBOLAtOrderEntry: (state, action) => {
      state.emailPlantBOLAtOrderEntry = action.payload;
    },

    setEmailPlantBOLAtOrderEntryDPU: (state, action) => {
      state.emailPlantBOLAtOrderEntryDPU = action.payload;
    },

    setBatchEmailPlantBOLAtOrderEntry: (state, action) => {
      state.batchEmailPlantBOLAtOrderEntry = action.payload;
    },
    setBatchEmailPlantBOLDaily: (state, action) => {
      state.batchEmailPlantBOLDaily = action.payload;
    },
    // for credit card

    setIsMandatoryCreditCardTab: (state, action) => {
      state.isMandatoryCreditCardTab = action.payload;
    },
    setChargePerUnitCreditCard: (state, action) => {
      state.chargePerUnitCreditCard = action.payload;
    },
    setIsCreditCardDetailsInComplete: (state, action) => {
      state.isCreditCardDetailsInComplete = action.payload;
    },
    setIsCreditCardDetailsPartial: (state, action) => {
      state.isCreditCardDetailsPartial = action.payload;
    },
    setDupLoadForCreditCard: (state, action) => {
      state.dupLoadForCreditCard = action.payload;
    },
    setTotalBatchLoadCount: (state, action) => {
      state.totalBatchLoadCount = action.payload;
    },
    setEnableAppliedAmount: (state, action) => {
      state.enableAppliedAmount = action.payload;
    },
    setAppliedAmount: (state, action) => {
      state.appliedAmount = action.payload;
    },

    // UnitRoutes
    resetUnitRoutesArray: (state, action) => {
      // state.unitRouteArray = [];
      resetDriveByArray();
      if (state.pickupAtPlant && state.deliverToPlant) {
      } else if (state.pickupAtPlant && state.unitRouteArray.length > 0) {
        let pickUp = [state.unitRouteArray[0]];
        state.unitRouteArray = pickUp;
      } else if (state.deliverToPlant && state.unitRouteArray.length > 0) {
        let delivery = [state.unitRouteArray[state.unitRouteArray.length - 1]];
        state.unitRouteArray = delivery;
      } else {
        state.unitRouteArray = [];
      }
    },

    updateUniteRoutesArray: (state, action) => {
      let payload = action.payload;
      state.unitRouteArray = [...state.unitRouteArray, payload];
    },
    updateCustomerDealerRoutes: (state, action) => {
      let payload = action.payload;
      let routes = [...state.unitRouteArray];
      if (state.unitRouteArray != null && state.unitRouteArray.length > 0) {
        //add customer dealer routes to the last.
        routes = state.unitRouteArray.filter((unitRoute) => !unitRoute.id.toString().startsWith("routes"));
      }

      if (payload != null && payload !== undefined && payload.length > 0) {
        payload.forEach(function (i, index) {
          //  remove customer dealer routes if any.
          let idString = "routes" + index;
          routes.splice(1, 0, {
            id: idString,
            postalCode: i.postalCode,
            city: i.city,
            stateCode: i.stateCode,
            name: "CUSTOMER DEALER ROUTE",
            address1: "",
            address2: "",
          });
        });
      }
      state.unitRouteArray = routes;
    },
    setUnitRouteData: (state, action) => {
      //state.unitRouteData = action.payload;
    },
    setUnitRoutesArray: (state, action) => {
      state.unitRouteArray = action.payload;
    },
    setPickUpInUnitRouteArray: (state, action) => {
      state.unitRouteArray[0] = action.payload;

      state.unitRouteArray = state.unitRouteArray.filter(
        (unitRoute) => !unitRoute.id.toString().startsWith("routes")
      ); //remove routes related data
      state.unitRouteArray = state.unitRouteArray.filter(
        (unitRoute) => !unitRoute.id.toString().startsWith("POE")
      ); //remove POE related data
    },
    setDeliveryInUnitRouteArray: (state, action) => {
      var length = state.unitRouteArray.length;
      if (length > 1) {
        state.unitRouteArray[length - 1] = action.payload;
      } else {
        state.unitRouteArray[length] = action.payload;
      }
    },
    setDriveByInUnitRoutes: (state, action) => {
      if (
        state.unitRouteArray != null &&
        state.unitRouteArray.length > 0 &&
        state.drivebyArray != null &&
        state.drivebyArray.length > 0
      ) {
        let newState = state.unitRouteArray;
        state.drivebyArray.forEach(function (item, index) {
          item.id = "drive" + index;
          item.postalCode = item.postalcode;
          let len = state.unitRouteArray.length;

          newState.splice(2, 0, item); //adding drivebys after first record
        });
      }
    },

    //For DriveBy tab
    setDriveByArray: (state, action) => {
      let payload = action.payload;

      state.drivebyArray = [...state.drivebyArray, payload];

      if (state.selectedPortOfEntry !== null && state.selectedPortOfEntry !== undefined) {
        let unitRoute = [...state.unitRouteArray];
        let item = payload;
        item.id = "drive" + payload.id;
        item.postalCode = item.postalcode;

        let POEindex = state.unitRouteArray.findIndex((drive) => drive.name === "POE");

        //   if((state.brokerType === 'export' && !isCanandian(item.postalCode)) || (state.brokerType === 'import' && isCanandian(item.postalCode ))){
        if (
          (state.brokerType === "export" && !item.canadian) ||
          (state.brokerType === "import" && item.canadian)
        ) {
          unitRoute.splice(POEindex, 0, item);
        } else if (
          (state.brokerType === "export" && item.canadian) ||
          (state.brokerType === "import" && !item.canadian)
        ) {
          // } else if((state.brokerType === 'export' && isCanandian(item.PostalCode ) )|| (state.brokerType === 'import' && !isCanandian(item.postalCode ) )){
          unitRoute.splice(POEindex + 1, 0, item);
        }
        state.unitRouteArray = unitRoute;
      } else {
        let item = payload;
        item.id = "drive" + payload.id;
        item.postalCode = item.postalcode;
        state.unitRouteArray.splice(1, 0, item);
      }

      const newState = [...state.drivebyArray]; //need to set authorised by in all the drive bys

      newState.forEach(function (item, index) {
        item.authorizedBy = state.driveByAuthorised;
      });
      state.drivebyArray = newState;
    },
    setItemSelected: (state, action) => {
      state.itemSelected = action.payload;
    },

    setUpdateData: (state, action) => {
      let payload = action.payload;

      let item = state.drivebyArray[payload.selectedIndex];
      item.name = payload.name;
      item.address1 = payload.address1;
      item.address2 = payload.address2;
      item.contact = payload.contact;
      item.postalcode = payload.postalCode;
      item.canadian = payload.canadian;
      item.city = payload.city;
      item.stateCode = payload.stateCode;
      item.instruction1 = payload.instruction1;
      item.instruction2 = payload.instruction2;
      item.instruction3 = payload.instruction3;
      item.instruction4 = payload.instruction4;

      state.drivebyArray[payload.selectedIndex] = item;

      let i = 0;
      state.unitRouteArray.forEach((route) => {
        if (route.id === item.id) {
          state.unitRouteArray.splice(i, 1);
          state.unitRouteArray.splice(i, 0, item);
        }
        i++;
      });
    },
    deleteSeletedItem: (state, { payload }) => {
      // selected item should be removed from drivebys and unit routes

      state.drivebyArray = state.drivebyArray.filter((drive) => drive.id !== payload);
      state.unitRouteArray = state.unitRouteArray.filter((unitRoute) => unitRoute.id !== payload);
    },

    setDriveByValidationFlag: (state, action) => {
      state.driveByValidationFlag = action.payload;
    },
    setDriveByAuthorised: (state, action) => {
      //whenever authorised by is changed, need to set that to all drive bys

      state.driveByAuthorised = action.payload;
      const newState = [...state.drivebyArray];

      newState.forEach(function (item, index) {
        item.authorizedBy = state.driveByAuthorised;
      });
      state.drivebyArray = newState;
    },
    setDriveByDealerSelection: (state, action) => {
      state.driveByDealerSelection = action.payload;
    },
    setShowDriveByLookup: (state, action) => {
      state.showDriveByLookup = action.payload;
    },

    resetDriveByArray: (state, action) => {
      state.drivebyArray = [];
      // Clear driveby related routes in unitRouteArray
      if (state.unitRouteArray && state.unitRouteArray.length > 2) {
        const first = state.unitRouteArray[0];
        const last = state.unitRouteArray[state.unitRouteArray.length - 1];

        state.unitRouteArray = [first, last];
      }
    },
    setReduxDriverFlatRate: (state, action) => {
      state.reduxDriverFlatRate = action.payload;
    },
    setPoeInRedux: (state, action) => {
      state.isPoeSet = action.payload;
    },
    setFlatRateErrorMsg: (state, action) => {
      state.flatRateErrorMsg = action.payload;
    },
    setShowOverrideButton: (state, action) => {
      state.showOverrideButton = action.payload;
    },
    setMileagedErrorMsg: (state, action) => {
      state.mileagedErrorMsg = action.payload;
    },
    //Driveby ends

    //misc Customer
    setMiscCustomerData: (state, action) => {
      let payload = action.payload;
      state.miscCustomerData = {
        ...state.miscCustomerData,
        ...payload,
      };
    },
    setMiscCustomerTabIsValid: (state, action) => {
      state.miscCustomerTabIsValid = action.payload;
    },
    setMiscCustomerId: (state, action) => {
      state.miscCustomerId = action.payload;
    },
    setMiscCustomerSelection: (state, action) => {
      state.miscCustomerSelection = action.payload;
    },

    //misc Pickup Dealer
    setMiscPickupDealerData: (state, action) => {
      let payload = action.payload;
      state.miscPickupDealerData = {
        ...state.miscPickupDealerData,
        ...payload,
      };
    },
    setMiscPickupDealerTabIsValid: (state, action) => {
      state.miscPickupDealerTabIsValid = action.payload;
    },
    setMiscPickupID: (state, action) => {
      state.miscPickupID = action.payload;
    },
    setMiscPickupDealerSelection: (state, action) => {
      state.miscPickupDealerSelection = action.payload;
    },

    //misc Delivery Dealer
    setMiscDeliveryDealerFormData: (state, action) => {
      let payload = action.payload;
      state.miscDeliveryDealerFormData = { ...state.miscDeliveryDealerFormData, ...payload };
    },
    setMiscDeliveryDealerTabIsValid: (state, action) => {
      state.miscDeliveryDealerTabIsValid = action.payload;
    },
    setMiscDeliveryID: (state, action) => {
      state.miscDeliveryID = action.payload;
    },
    setMiscDeliveryDealerSelection: (state, action) => {
      state.miscDeliveryDealerSelection = action.payload;
    },

    //overWidth tab
    setOverWidthValidationFlag: (state, action) => {
      state.overWidthValidationFlag = action.payload;
    },
    //Contacts Tab
    setContactId: (state, action) => {
      state.contactId = action.payload;
    },
    setSeletedCustomerContactsList: (state, action) => {
      state.seletedCustomerContactsList = action.payload;
    },
    setAvailableContacts: (state, action) => {
      state.availableContacts = action.payload;
    },
    setAssignedContacts: (state, action) => {
      state.assignedContacts = action.payload;
    },
    addToAssigned: (state, { payload }) => {
      state.assignedContacts = [payload, ...state.assignedContacts];
    },
    addToAvailabe: (state, { payload }) => {
      state.availableContacts = [payload, ...state.availableContacts];
    },
    filterAvailableContacts: (state, { payload }) => {
      state.availableContacts = state.availableContacts.filter((contact) => contact.tempId !== payload);
    },
    filterAssignedContacts: (state, { payload }) => {
      state.assignedContacts = state.assignedContacts.filter((contact) => contact.tempId !== payload);
    },
    updateAssignedContactsElement: (state, { payload }) => {
      let arrayElement = state.assignedContacts[payload.selectedIndex];

      arrayElement.contact = payload.contact;
      arrayElement.name = payload.name;
      arrayElement.phone = payload.phone;
      arrayElement.email = payload.email;
      arrayElement.bolFaxNumber = payload.bolFaxNumber;

      state.assignedContacts[payload.selectedIndex] = arrayElement;
    },
    updateUseOnBOL: (state, { payload }) => {
      let arrayElement = state.assignedContacts[payload];

      const masterContactSelected = state.assignedContacts.some((contact) => contact.useOnBOL === true);

      if (masterContactSelected) {
        if (state.assignedContacts[payload].useOnBOL) {
          arrayElement.useOnBOL = false;
        }
      } else {
        if (state.assignedContacts[payload].useOnBOL) {
          arrayElement.useOnBOL = false;
        } else {
          arrayElement.useOnBOL = true;
        }
      }

      state.assignedContacts[payload] = arrayElement;
    },
    updateDelayContact: (state, { payload }) => {
      let arrayElement = state.assignedContacts[payload];

      arrayElement.delayContact = !state.assignedContacts[payload].delayContact;

      state.assignedContacts[payload] = arrayElement;
    },

    // Open Balance
    setUnitOpenBalanceData: (state, action) => {
      state.unitOpenBalanceData = action.payload;
    },
    setAppliedAmountSum: (state, action) => {
      state.appliedAmountSum = parseFloat(state.appliedAmountSum) + parseFloat(action.payload);
    },
    setIsOpenBalanceValid: (state, action) => {
      state.isOpenBalanceValid = action.payload;
    },
    setOpenBalanceArray: (state, { payload }) => {
      if (payload) {
        state.openBalanceArray = [...state.openBalanceArray, payload];
        //state.openBalanceArray = action.payload
      } else {
        state.openBalanceArray = [];
      }
    },

    setIsOpenBalancesDetailsInComplete: (state, action) => {
      state.isOpenBalancesDetailsInComplete = action.payload;
    },

    setisOpenBalancesDetailsPartial: (state, action) => {
      state.isOpenBalancesDetailsPartial = action.payload;
    },

    setUpdatOpenBalanceArray: (state, action) => {
      state.openBalanceArray = action.payload;
    },
    resetChangesOpenBalance: (state, action) => {
      state.openBalanceArray = [];
      state.unitOpenBalanceData = null;
    },
    setRemainingAmt: (state, action) => {
      state.remainingAmt = action.payload;
    },
    setDupLoadForOpenBal: (state, action) => {
      state.dupLoadForOpenBal = action.payload;
    },
    setChargePerUnit: (state, action) => {
      state.chargePerUnit = action.payload;
    },
    setIsSaving: (state, action) => {
      state.isSaving = action.payload;
    },
    //Notes Tab
    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    setDispatchNotesRedux: (state, action) => {
      state.dispatchNotesRedux = action.payload;
    },

    //Invoice Hold Notes Tab
    setInvoiceHoldNotes: (state, action) => {
      state.invoiceHoldNotes = action.payload;
    },

    setInvoiceHoldTabIsValid: (state, action) => {
      state.invoiceHoldTabIsValid = action.payload;
    },

    //Instructions Tab
    setInstructions: (state, action) => {
      state.instructions = action.payload;
    },

    //onHold tab validation
    setOnHoldTab: (state, action) => {
      state.onHoldTab = action.payload;
    },

    // Factory Release Process

    setReleaseProcessFlag: (state, action) => {
      state.releaseProcessFlag = action.payload;
    },
    setPlantRelease: (state, action) => {
      state.plantRelease = action.payload;
    },
    setPlantReleaseDate: (state, action) => {
      state.plantReleaseDate = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setEditPartialOrInCompleteOpenBalance: (state, action) => {
      state.editPartialOrInCompleteOpenBalance = action.payload;
    },
    setFodDealer: (state, action) => {
      state.fodDealer = action.payload;
    },
  },
});

export const {
  setActiveKey,
  setDataReset,

  setcustomerData,
  setPlantData,
  setChangeColor,

  setSelectedCustomerId,
  setSelectedCustomerBillingPlantId,
  setDeliverToPlant,
  setShuttleFromYard,
  setDeliveryCustomerYardId,
  setDeliveryCustomerShuttleCityId,
  setPickupAtPlant,
  setPickupCustomerPlantId,
  setShuttleToYard,
  setPickupCustomerYardId,
  setPickupCustomerShuttleCityId,
  setReload,
  setReturnRates,
  setBulkUnits,
  setCheckPrepaid,
  setPlantCode,
  setNoPickupPulloutFee,
  setNoDeliveryPulloutFee,
  setBulkInvoiceFK,

  setPickupYardId,
  setQuickPayCustomer,
  setCustomerPlantData,
  setCustomerPickupPlantData,
  setCustomerPickupYardData,
  setCustomerDeliveryPlantData,
  setCustomerDeliveryYardData,
  setChangeColorForPlantTable,
  setSelectedCustomerPlantId,
  setCustomerPlant,
  updateCustomerPlant,

  setPageNumber,
  setTotalPages,
  setTotalElements,
  setUnitsData,
  setMiscPickup,

  setBillingPlantSelection,
  setPickupPlantSelection,
  setDeliveryPlantSelection,
  setPickupYardSelection,
  setDeliveryYardSelection,
  setPickupShuttleCitySelection,
  setDeliveryShuttleCitySelection,
  setIsCustomerMisc,
  setIsPlantExist,
  setOutbound,
  setIsCustomerDpu,

  setCustomerNameInput,
  setCustomerPlantName,
  setPickupPlantInput,
  setDeliveryPlantInput,
  setPickupYardInput,
  setDeliveryYardInput,
  setPickupCityInput,
  setDeliveryCityInput,
  setBulkInvoiceInput,
  setFirstBatchSequence,
  setLastBatchSequence,
  setPrintBol,
  setBOLPrinterFK,
  setShowAddBulkInvoice,
  setInvoiceMilesAdjustment,
  setDriverMilesAdjustment,
  setPickupPlantOutbound,
  setDeliveryPlantOutbound,

  setDeliveryCustomerPlantId,

  setIsCustomerTabValid,
  setDuplicateLoadFlag,

  //Misc Delivery Dealer
  setMiscDeliveryDealerFormData,
  setMiscDeliveryDealerTabIsValid,
  setMiscDeliveryID,
  setMiscDeliveryDealerSelection,

  //Unit Tab
  setUnitNumber,
  setModel,
  setModelCode,
  setVin,
  setSerialNumber,
  setStockNumber,
  setUnitTypeInput,
  setUnitTypesFK,
  setUnitTypeData,
  setTowableRedux,
  setHasRates,
  setEngineGas,
  setEngineDiesel,
  setSpecialCodesFK,
  setPickupDealersFK,
  setDeliveryDealersFK,
  setMiscellaneousDelivery,
  setCollectForCustomer,
  setPoNumberRedux,
  setAuthorizedByUnit,
  setProjectCodeUnit,
  setBankUnit,
  setClientUnit,
  setGVWRUnit,
  setShippingWeightUnit,
  setDriverTollsUnit,
  setDriverPermitsUnit,
  setDriverWashUnit,
  setPortEscortFeeUnit,
  setInvoiceMiles,
  setDriverMiles,
  setDefaultInvoiceMiles,
  setDefaultDriverMiles,
  setDriverMilesBalance,
  setInvoiceFlatrate,
  setDriverFlatrate,
  setInvoiceFlatrate2,
  setDriverFlatrate2,
  setIsInvoiceFlatrateVisible,
  setIsDriverFlatrateVisible,
  setDealerConnectionFlatrateFK,
  setRateType,
  setCommissionUnit,
  setCommissionDriverFK,
  setBrokerFKUnit,
  setBrokerId,
  setPortOfEntryFKUnit,
  setFreezePortOFEntryUnit,
  setRequiredCDLAUnit,
  setTankerUnit,
  setRequiredTWICUnit,
  setRequiredIFTAUnit,
  setHasDriveBys,
  setDPUUnit,
  setStorageUnit,
  setOnHold,
  setDoNotInvoiceUnit,
  setDoNotDispatchUnit,
  setActivateDispatchUnit,
  setDispatchPriorityUnit,
  setUnitsPerDispatchUnit,
  setMultiUnilLoad,
  setunitMultiLoadsFK,
  setUnitMultiLoads,
  setInvoice2as3Unit,
  setRequireFlatbedUnit,
  setContactDealerDelayUnit,
  setInvoiceDealerBreakdownUnit,
  setInvoiceHold,
  setMiscellaneousBolTextUnit,
  setMiscellaneousBolTextUnit1,
  setMiscellaneousBolTextUnit2,
  setMiscellaneousBolTextUnit3,
  setMiscellaneousBolTextUnit4,
  setMiscellaneousBolTextUnit5,
  setMiscellaneousBolTextUnit6,
  setMiscellaneousBolTextUnit7,
  setOrderDateUnit,
  setReleaseDateUnit,
  setDeliveryByDateUnit,
  setEarliestPickUpDateUnit,
  setEarliestDeliveryDateUnit,
  setLatestPickUpDateUnit,
  setLatestDeliveryDateUnit,
  setOnHoldForm,
  setInvoiceAmountBackend,
  setChargeCreditCard,
  setBulkinvoices,

  setUseOpenBalance,
  setUnitOverWidthPermitsData,
  setOverWidthLoad,
  setUnitTabIsValid,
  setSelectedCustomerAllDetails,
  setSelectedCustomerPlantDetails,
  setSpecialCodeInput,
  setSpecialCodeId,
  setPickupDealerInput,
  setPickupDealerId,
  setDeliveryDealerInput,
  setCustomerRatesList,
  setCustomerRateStructureRedux,
  setIsInvoiceMileageRateRedux,
  setIsDriverMileageRateRedux,
  setInvoiceAmount,
  setInvoiceFuelSurchargeAmount,
  setDriverAmount,
  setDriverFuelSurchargeAmount,
  setBrokerInput,
  setBrokerSelection,
  setBrokerType,
  setPortOfEntryId,
  setPortOfEntryInput,
  setPortOfEntrySelection,
  setSelectedPortOfEntry,
  setSelectedBillingPlantDetails,
  setIsDefaultDriverMilesRedux,
  setIsDefaultInvoiceMilesRedux,
  setCanadianPickup,
  setCanadianDelivery,
  setAllowedInvoicePercentageRedux,
  setInvoiceSupplementalRate,
  setInvoiceSupplementalFuelSurchargeRate,
  setInvoiceSupplementalDescription,
  setDriverSupplementalRate,
  setDriverSupplementalFuelSurchargeRate,
  setDriverSupplementalDescription,
  setInvoiceSpecialRate,
  setInvoiceSpecialFuelSurchargeRate,
  setInvoiceSpecialDescription,
  setDriverSpecialRate,
  setDriverSpecialFuelSurchargeRate,
  setDriverSpecialDescription,
  setInvoiceAdditionalRate,
  setInvoiceAdditionalFuelSurchargeRate,
  setInvoiceAdditionalDescription,
  setInvoiceAdditionalFlatRate,
  setAdditionalFlatRateDescription,
  setDriverAdditionalFlatRate,
  setDriverAdditionalRate,
  setDriverAdditionalFuelSurchargeRate,
  setDriverAdditionalDescription,
  setInvoiceCanadianCharge,
  setDriverCanadianCharge,
  setInvoiceUSCharge,
  setDriverUSCharge,
  setInvoiceCDLARate,
  setDriverCDLARate,
  setInvoiceCDLAReturn,
  setDriverCDLAReturn,
  setInvoiceReturnFlatRate,
  setDriverReturnFlatRate,
  setInvoiceRate,
  setDriverRate,
  setInvoiceFuelSurchargeRate,
  setDriverFuelSurchargeRate,
  setInvoiceReturnRate,
  setDriverReturnRate,
  setInvoiceLengthRate,
  setDriverLengthRate,
  setIsFODInvoice,

  setInvoiceCanadianRate,
  setInvoiceCanadianFuelSurchargeRate,
  setInvoiceCanadianDescription,
  setDriverCanadianRate,
  setDriverCanadianFuelSurchargeRate,
  setDriverCanadianDescription,
  setELDRequiredRedux,
  setInvoiceELDFeeRedux,
  setDriverELDFeeRedux,
  setInvoiceELDDescription,
  setCompanyName,
  setDPUPickupOwnerRedux,
  setDriverCDLARequiredRedux,
  setPlantOrderNumber,
  setIsMilesLowBoyRedux,
  setPcMilerError,
  setInvoiceCustomerRateFK,
  setDriverCustomerRateFK,
  setPreInvoiced,
  setPayTolls,
  setFODTolls,
  setBillTolls,
  setPayPermits,
  setFODPermits,
  setBillPermits,
  setPayWash,
  setBillWash,
  setInvoiceSupplementalReturn,
  setInvoiceSpecialReturn,
  setInvoiceAdditionalReturn,
  setDriverSupplementalReturn,
  setDriverSpecialReturn,
  setDriverAdditionalReturn,
  setInvoiceLengthReturn,
  setDriverLengthReturn,

  setShowSingleUnitActivation,
  setOeUnitData,
  setInvoiceMinimumRate,
  setDriverMinimumRate,
  setUnitOverride,
  setShowUnitOverride,
  setSaveTollsAndPermits,
  setEmailBOLAtOrderEntry,
  setBatchEmailBOLAtOrderEntry,
  setBatchEmailBOLDaily,
  setEmailPlantBOLAtOrderEntry,
  setEmailPlantBOLAtOrderEntryDPU,
  setBatchEmailPlantBOLAtOrderEntry,
  setBatchEmailPlantBOLDaily,

  //creditCard
  setCreditCardData,
  setIsMandatoryCreditCardTab,
  setBatchLoadCustomerTab,
  setIsCreditCardDetailsInComplete,
  setIsCreditCardDetailsPartial,
  setDupLoadForCreditCard,
  setChargePerUnitCreditCard,
  setTotalBatchLoadCount,

  //unitRoutes
  resetUnitRoutesArray,
  updateUniteRoutesArray,
  setUnitRouteData,
  setUnitRoutesArray,
  moveUpUniteRoutesArray,
  moveDownUniteRoutesArray,
  setPickUpInUnitRouteArray,
  setDeliveryInUnitRouteArray,
  setDriveByInUnitRoutes,
  updateCustomerDealerRoutes,

  //driveBy tab
  setDriveByArray,
  setItemSelected,
  deleteSeletedItem,
  setDriveByValidationFlag,
  setDriveByAuthorised,
  setUpdateData,
  setDriveByDealerSelection,
  setShowDriveByLookup,
  resetDriveByArray,
  setPoeInRedux,
  setReduxDriverFlatRate,
  setFlatRateErrorMsg,
  setShowOverrideButton,
  setMileagedErrorMsg,

  //Misc Customer
  setMiscCustomerData,
  setMiscCustomerTabIsValid,
  setMiscCustomerId,
  setMiscCustomerSelection,

  //Misc Pickup Dealer
  setMiscPickupDealerData,
  setMiscPickupDealerTabIsValid,
  setMiscPickupID,
  setMiscPickupDealerSelection,

  //overWidth
  setOverWidthValidationFlag,

  //Notes Tab
  setNotes,
  setDispatchNotesRedux,

  //Invoice Hold Notes
  setInvoiceHoldNotes,
  setInvoiceHoldTabIsValid,

  //Instructions Tab
  setInstructions,

  setUnitTypeSelection,
  setSpecialCodeSelection,
  setPickupDealerSelection1,
  setPickupDealerSelection2,
  setDeliveryDealerSelection1,
  setDeliveryDealerSelection2,
  setSelectedSpecialCode,
  setSelectedBroker,
  setSelectedPickupDealer,
  setSelectedDeliveryDealer,

  setUnitMultiLoadSelection,
  setID,
  setSeletedCustomerContactsList,
  setAvailableContacts,
  setAssignedContacts,
  addToAssigned,
  addToAvailabe,
  filterAvailableContacts,
  filterAssignedContacts,
  updateAssignedContactsElement,
  updateDelayContact,
  updateUseOnBOL,
  setContactId,
  setOnHoldTab,
  // Openbalance tab
  setUnitOpenBalanceData,
  setAppliedAmountSum,
  setIsOpenBalanceValid,
  setIsOpenBalancesDetailsInComplete,
  setisOpenBalancesDetailsPartial,
  setOpenBalanceArray,
  setUpdatOpenBalanceArray,
  resetChangesOpenBalance,
  setRemainingAmt,
  setDupLoadForOpenBal,
  setChargePerUnit,
  setIsSaving,
  setEnableAppliedAmount,
  setAppliedAmount,
  setInvoiceAmountForOpenBalances,
  setEditPartialOrInCompleteOpenBalance,
  //Factory release
  setReleaseProcessFlag,
  setPlantRelease,
  setPlantReleaseDate,
  setOnCancel,
  // Order Entry - To check whether a unit's delivery dealer is foddealer or not in CustomerDealer Table
  setFodDealer,
} = OrderEntryFilter.actions;

function isCanandian(zipCode) {
  if (zipCode != null && zipCode.match(/^((\d{5}-\d{4})|(\d{5}))$/)) {
    return false;
  } else if (zipCode != null && zipCode.match(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/)) {
    return true;
  }
}
export default OrderEntryFilter.reducer;
