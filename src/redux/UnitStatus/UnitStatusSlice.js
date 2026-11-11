import { createSlice } from "@reduxjs/toolkit";

const UnitStatusSlice = createSlice({
  name: "UnitStatus",
  initialState: {
    isUnitTypeOverWidth: false,
    isOpenBalancePrepaid: false,
    isCreditCardPrepaid: false,
    hasDriveBy: false,
    miscellaneousCustomer: false,
    miscellaneousPickup: false,
    miscellaneousDelivery: false,
    invoicePK: null,
    // invoice texts of the invoice selected on the Invoice > Header tab, shown on the Invoice > Text tab,
    // in stored order [InvoiceText1..4, MiscellaneousText1..10]
    invoiceTextInputs: [],
    isMiscellaneousInvoice: false,
    activeTab: null,
    UnitShuttlePK: null,
    unitShuttleDetailData: null,
    currentStatus: "",
    // pagination
    totalElements: 0,
    totalPages: 0,
    driveByPageNumber: 0,
    driveByTotalPages: 0,
    driveByTotalElements: 0,
    locationPageNumber: 0,
    locationTotalPages: 0,
    locationTotalElements: 0,
    contactPageNumber: 0,
    contactTotalPages: 0,
    contactTotalElements: 0,
    openBalancePageNumber: 0,
    openBalanceTotalPages: 0,
    openBalanceTotalElements: 0,
    documentPageNumber: 0,
    documentTotalPages: 0,
    documentTotalElements: 0,
    holdTotalElements: 0,
    holdPageNumber: 0,
    holdTotalPages: 0,
    invoiceHeaderPageNumber: 0,
    invoiceHeaderTotalPages: 0,
    invoiceHeaderTotalElements: 0,

    invoiceDetailPageNumber: 0,
    invoiceDetailTotalPages: 0,
    inVoiceDetailTotalElements: 0,

    dispatchGeneralPageNumber: 0,
    dispatchGeneralTotalPages: 0,
    dispatchGeneralTotalElements: 0,

    unitChangesPageNumber: 0,
    unitChangesTotalPages: 0,
    unitChangesTotalElements: 0,
    // filters
    driveBySortFlag: false,
    driveBySortValue: "",
    locationSortFlag: false,
    locationSortValue: "",
    contactSortFlag: false,
    contactSortValue: "",
    openBalanceSortFlag: false,
    openBalanceSortValue: "",
    creditCardSortValue: "",
    creditCardSortFlag: false,
    documentSortValue: "",
    documentSortFlag: false,
    holdSortFlag: false,
    holdSortValue: "",
    invoiceDetailSortFlag: false,
    invoiceDetailSortValue: "",

    shuttleDelaySortFlag: false,
    shuttleDelaySortValue: "",
    shuttleDelayTotalElements: 0,
    shuttleDelayPageNumber: 0,
    shuttleDelayTotalPages: 0,
    driversPayTotalElements: 0,
    driversPayPageNumber: 0,
    driversPayTotalPages: 0,

    rerouteTotalElements: 0,
    reroutePageNumber: 0,
    rerouteTotalPages: 0,
    rerouteSortFlag: false,
    rerouteSortValue: "",

    unitRoutePageNumber: 0,
    unitRouteTotalElements: 0,
    unitRouteTotalPages: 0,
    shuttlePageNumber: 0,
    shuttleTotalPages: 0,
    shuttleTotalElements: 0,

    // for search and sort
    unitRouteSortType: false,
    unitRouteSortValue: "",

    dispatchGeneralSortValue: "",
    dispatchGeneralSortFlag: false,

    invoiceHeaderSortValue: "",
    invoiceHeaderSortFlag: false,
    unitChangesSortFlag: false,
    unitChangesSortValue: "",
    driversPaySortFlag: false,
    driversPaySortValue: "",
    shuttleSortFlag: false,
    shuttleSortValue: "",

    /***********Unit Status- Unit Selection Screen- Begins*************** */

    // Search Filter
    globalSearchTerm: "",
    selectedCompanyName: "",
    selectedSearchCriteria: "Beginning",
    unitLast5: "",
    unitType: "Both",
    orderType: "Both",
    dateType: "Entry",
    dateFrom: "",
    dateTo: "",
    unitStatus: "Active",
    pickupBy: "Name",
    deliveryBy: "Name",
    unitOrderStatus: "All",
    unitDelayType: "All",
    delayedUnitType: "All",
    dispatchDelayType: "All",
    selectedDispatchStatus: "Both",
    showAdvancedSearch: false,
    showAdvancedSort: false,

    // Table Listing
    companyName: "",
    loading: false,
    unitSelectionData: {},
    changeColor: false,
    selectedId: null,
    browseNormalSortValue: "",
    browseNormalSortFlag: false,
    // Pagination
    browseTotalPages: 0,
    browseTotalElements: 0,
    browsePageNumber: 0,
    // Advanced Search
    advancedSearchObject: null,
    advancedSearchPayload: null,
    // Advanced Sort
    advancedSortingOrder: null,
    advancedSortingCombination: null,
    // Advanced Search Sidebar
    advancedSearchString: "",
    checkAllAdvancedSearchBy: false,
    advancedSearchByInputs: {
      pars: false,
      bolNumber: false,
      vin: false,
      stockNumber: false,
      projectCode: false,
      poNumber: false,
      serialNumber: false,
      model: false,
      invoiceNumber: false,
    },
    isInnerLookupsOpen: false,
    customerInput: "",
    customerId: null,
    customerPlantInput: "",
    customerPlantId: null,
    dealerInput: "",
    dealerId: null,
    // Misc
    rowData: null,
    notes: null,
    companyPK: null,
    /***********Unit Status- Unit Selection Screen- ends*************** */
  },
  reducers: {
    // filters

    setIsUnitTypeOverWidth: (state, action) => {
      state.isUnitTypeOverWidth = action.payload;
    },

    setBrowseNormalSortValue: (state, action) => {
      state.browseNormalSortValue = action.payload;
    },

    setBrowseNormalSortFlag: (state, action) => {
      state.browseNormalSortFlag = action.payload;
    },
    setIsCreditCardPrepaid: (state, action) => {
      state.isCreditCardPrepaid = action.payload;
    },
    setMiscellaneousCustomer: (state, action) => {
      state.miscellaneousCustomer = action.payload;
    },
    setMiscellaneousPickup: (state, action) => {
      state.miscellaneousPickup = action.payload;
    },
    setMiscellaneousDelivery: (state, action) => {
      state.miscellaneousDelivery = action.payload;
    },
    setBrowseTotalPages: (state, action) => {
      state.browseTotalPages = action.payload;
    },

    setBrowseTotalElements: (state, action) => {
      state.browseTotalElements = action.payload;
    },

    setBrowsePageNumber: (state, action) => {
      state.browsePageNumber = action.payload;
    },
    setIsOpenBalancePrepaid: (state, action) => {
      state.isOpenBalancePrepaid = action.payload;
    },
    setHasDriveBy: (state, action) => {
      state.hasDriveBy = action.payload;
    },
    setInvoicePK: (state, action) => {
      state.invoicePK = action.payload;
    },
    setInvoiceTextInputs: (state, action) => {
      state.invoiceTextInputs = action.payload;
    },
    setIsMiscellaneousInvoice: (state, action) => {
      state.isMiscellaneousInvoice = action.payload;
    },
    setUnitShuttlePK: (state, action) => {
      state.UnitShuttlePK = action.payload;
    },
    setUnitShuttleDetailData: (state, action) => {
      state.unitShuttleDetailData = action.payload;
    },
    setCurrentStatus: (state, action) => {
      state.currentStatus = action.payload;
    },

    // pagination
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setDriveByPageNumber: (state, action) => {
      state.driveByPageNumber = action.payload;
    },

    setDriveByTotalElements: (state, action) => {
      state.driveByTotalElements = action.payload;
    },

    setDriveByTotalPages: (state, action) => {
      state.driveByTotalPages = action.payload;
    },
    setLocationPageNumber: (state, action) => {
      state.locationPageNumber = action.payload;
    },

    setLocationTotalElements: (state, action) => {
      state.locationTotalElements = action.payload;
    },

    setLocationTotalPages: (state, action) => {
      state.locationTotalPages = action.payload;
    },
    setContactPageNumber: (state, action) => {
      state.contactPageNumber = action.payload;
    },

    setContactTotalElements: (state, action) => {
      state.contactTotalElements = action.payload;
    },

    setContactTotalPages: (state, action) => {
      state.contactTotalPages = action.payload;
    },
    setOpenBalancePageNumber: (state, action) => {
      state.openBalancePageNumber = action.payload;
    },

    setOpenBalanceTotalElements: (state, action) => {
      state.openBalanceTotalElements = action.payload;
    },

    setOpenBalanceTotalPages: (state, action) => {
      state.openBalanceTotalPages = action.payload;
    },
    setDocumentPageNumber: (state, action) => {
      state.documentPageNumber = action.payload;
    },

    setDocumentTotalElements: (state, action) => {
      state.documentTotalElements = action.payload;
    },

    setDocumentTotalPages: (state, action) => {
      state.documentTotalPages = action.payload;
    },
    setDispatchGeneralPageNumber: (state, action) => {
      state.dispatchGeneralPageNumber = action.payload;
    },

    setDispatchGeneralTotalPages: (state, action) => {
      state.dispatchGeneralTotalPages = action.payload;
    },

    setDispatchGeneralTotalElements: (state, action) => {
      state.dispatchGeneralTotalElements = action.payload;
    },
    setInvoiceHeaderPageNumber: (state, action) => {
      state.invoiceHeaderPageNumber = action.payload;
    },

    setInvoiceHeaderTotalPages: (state, action) => {
      state.invoiceHeaderTotalPages = action.payload;
    },

    setInvoiceHeaderTotalElements: (state, action) => {
      state.invoiceHeaderTotalElements = action.payload;
    },

    setInvoiceDetailPageNumber: (state, action) => {
      state.invoiceDetailPageNumber = action.payload;
    },
    setInvoiceDetailTotalPages: (state, action) => {
      state.invoiceDetailTotalPages = action.payload;
    },

    setInVoiceDetailTotalElements: (state, action) => {
      state.inVoiceDetailTotalElements = action.payload;
    },
    setUnitChangesTotalPages: (state, action) => {
      state.unitChangesTotalPages = action.payload;
    },
    setUnitChangesTotalElements: (state, action) => {
      state.unitChangesTotalElements = action.payload;
    },

    setUnitChangesPageNumber: (state, action) => {
      state.unitChangesPageNumber = action.payload;
    },
    setShuttlePageNumber: (state, action) => {
      state.shuttlePageNumber = action.payload;
    },

    setShuttleTotalElements: (state, action) => {
      state.shuttleTotalElements = action.payload;
    },

    setShuttleTotalPages: (state, action) => {
      state.shuttleTotalPages = action.payload;
    },
    setDriveBySortFlag: (state, action) => {
      state.driveBySortFlag = action.payload;
    },
    setDriveBySortValue: (state, action) => {
      state.driveBySortValue = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },

    setLocationSortFlag: (state, action) => {
      state.locationSortFlag = action.payload;
    },
    setLocationSortValue: (state, action) => {
      state.locationSortValue = action.payload;
    },
    setContactSortFlag: (state, action) => {
      state.contactSortFlag = action.payload;
    },
    setContactSortValue: (state, action) => {
      state.contactSortValue = action.payload;
    },
    setOpenBalanceSortFlag: (state, action) => {
      state.openBalanceSortFlag = action.payload;
    },
    setOpenBalanceSortValue: (state, action) => {
      state.openBalanceSortValue = action.payload;
    },
    setCreditCardSortFlag: (state, action) => {
      state.creditCardSortFlag = action.payload;
    },
    setCreditCardSortValue: (state, action) => {
      state.creditCardSortValue = action.payload;
    },
    setDocumentSortFlag: (state, action) => {
      state.documentSortFlag = action.payload;
    },
    setDocumentSortValue: (state, action) => {
      state.documentSortValue = action.payload;
    },
    setHoldTotalElements: (state, action) => {
      state.holdTotalElements = action.payload;
    },
    setHoldPageNumber: (state, action) => {
      state.holdPageNumber = action.payload;
    },
    setHoldTotalPages: (state, action) => {
      state.holdTotalPages = action.payload;
    },
    setHoldSortFlag: (state, action) => {
      state.holdSortFlag = action.payload;
    },
    setHoldSortValue: (state, action) => {
      state.holdSortValue = action.payload;
    },
    setShuttleDelayTotalElements: (state, action) => {
      state.shuttleDelayTotalElements = action.payload;
    },
    setShuttleDelayPageNumber: (state, action) => {
      state.shuttleDelayPageNumber = action.payload;
    },
    setShuttleDelayTotalPages: (state, action) => {
      state.shuttleDelayTotalPages = action.payload;
    },
    setDriversPayTotalElements: (state, action) => {
      state.driversPayTotalElements = action.payload;
    },
    setDriversPayPageNumber: (state, action) => {
      state.driversPayPageNumber = action.payload;
    },
    setDriversPayTotalPages: (state, action) => {
      state.driversPayTotalPages = action.payload;
    },
    setShuttleDelaySortFlag: (state, action) => {
      state.shuttleDelaySortFlag = action.payload;
    },
    setShuttleDelaySortValue: (state, action) => {
      state.shuttleDelaySortValue = action.payload;
    },
    setRerouteTotalElements: (state, action) => {
      state.rerouteTotalElements = action.payload;
    },

    setReroutePageNumber: (state, action) => {
      state.reroutePageNumber = action.payload;
    },

    setRerouteTotalPages: (state, action) => {
      state.rerouteTotalPages = action.payload;
    },

    setRerouteSortFlag: (state, action) => {
      state.rerouteSortFlag = action.payload;
    },
    setRerouteSortValue: (state, action) => {
      state.rerouteSortValue = action.payload;
    },

    setDispatchGeneralSortFlag: (state, action) => {
      state.dispatchGeneralSortFlag = action.payload;
    },
    setDispatchGeneralSortValue: (state, action) => {
      state.dispatchGeneralSortValue = action.payload;
    },
    setUnitRoutePageNumber: (state, action) => {
      state.unitRoutePageNumber = action.payload;
    },
    setUnitRouteSortType: (state, action) => {
      state.unitRouteSortType = action.payload;
    },
    setUnitRouteSortValue: (state, action) => {
      state.unitRouteSortValue = action.payload;
    },
    setUnitRouteTotalElements: (state, action) => {
      state.unitRouteTotalElements = action.payload;
    },

    setUnitRouteTotalPages: (state, action) => {
      state.unitRouteTotalPages = action.payload;
    },
    setInvoiceHeaderSortFlag: (state, action) => {
      state.invoiceHeaderSortFlag = action.payload;
    },
    setInvoiceHeaderSortValue: (state, action) => {
      state.invoiceHeaderSortValue = action.payload;
    },
    setInvoiceDetailSortFlag: (state, action) => {
      state.invoiceDetailSortFlag = action.payload;
    },
    setInvoiceDetailSortValue: (state, action) => {
      state.invoiceDetailSortValue = action.payload;
    },
    setUnitChangesSortFlag: (state, action) => {
      state.unitChangesSortFlag = action.payload;
    },
    setUnitChangesSortValue: (state, action) => {
      state.unitChangesSortValue = action.payload;
    },
    setDriversPaySortFlag: (state, action) => {
      state.driversPaySortFlag = action.payload;
    },
    setDriversPaySortValue: (state, action) => {
      state.driversPaySortValue = action.payload;
    },
    setShuttleSortFlag: (state, action) => {
      state.shuttleSortFlag = action.payload;
    },
    setShuttleSortValue: (state, action) => {
      state.shuttleSortValue = action.payload;
    },

    setUnitSelectionData: (state, action) => {
      state.unitSelectionData = action.payload;
    },

    resetUnitStatusInnerStates: (state, action) => {
      state.isUnitTypeOverWidth = false;
      state.isOpenBalancePrepaid = false;
      state.isCreditCardPrepaid = false;
      state.hasDriveBy = false;
      state.miscellaneousCustomer = false;
      state.miscellaneousPickup = false;
      state.miscellaneousDelivery = false;
      state.invoicePK = null;
      state.invoiceTextInputs = [];
      state.isMiscellaneousInvoice = false;
      state.UnitShuttlePK = null;
      state.unitShuttleDetailData = {};
      state.selectedId = null;
      // pagination
      state.totalElements = 0;
      state.totalPages = 0;
      state.driveByPageNumber = 0;
      state.driveByTotalPages = 0;
      state.driveByTotalElements = 0;
      state.locationPageNumber = 0;
      state.locationTotalPages = 0;
      state.locationTotalElements = 0;
      state.contactPageNumber = 0;
      state.contactTotalPages = 0;
      state.contactTotalElements = 0;
      state.openBalancePageNumber = 0;
      state.openBalanceTotalPages = 0;
      state.openBalanceTotalElements = 0;
      state.documentPageNumber = 0;
      state.documentTotalPages = 0;
      state.documentTotalElements = 0;
      state.holdTotalElements = 0;
      state.holdPageNumber = 0;
      state.holdTotalPages = 0;
      state.invoiceHeaderPageNumber = 0;
      state.invoiceHeaderTotalPages = 0;
      state.invoiceHeaderTotalElements = 0;

      state.invoiceDetailPageNumber = 0;
      state.invoiceDetailTotalPages = 0;
      state.inVoiceDetailTotalElements = 0;

      state.dispatchGeneralPageNumber = 0;
      state.dispatchGeneralTotalPages = 0;
      state.dispatchGeneralTotalElements = 0;

      state.unitChangesPageNumber = 0;
      state.unitChangesTotalPages = 0;
      state.unitChangesTotalElements = 0;
      // filters
      state.driveBySortFlag = false;
      state.driveBySortValue = "";
      state.locationSortFlag = false;
      state.locationSortValue = "";
      state.contactSortFlag = false;
      state.contactSortValue = "";
      state.openBalanceSortFlag = false;
      state.openBalanceSortValue = "";
      state.creditCardSortValue = "";
      state.creditCardSortFlag = false;
      state.documentSortValue = "";
      state.documentSortFlag = false;
      state.holdSortFlag = false;
      state.holdSortValue = "";
      state.invoiceDetailSortFlag = false;
      state.invoiceDetailSortValue = "";

      state.shuttleDelaySortFlag = false;
      state.shuttleDelaySortValue = "";
      state.shuttleDelayTotalElements = 0;
      state.shuttleDelayPageNumber = 0;
      state.shuttleDelayTotalPages = 0;
      state.driversPayTotalElements = 0;
      state.driversPayPageNumber = 0;
      state.driversPayTotalPages = 0;

      state.rerouteTotalElements = 0;
      state.reroutePageNumber = 0;
      state.rerouteTotalPages = 0;
      state.rerouteSortFlag = false;
      state.rerouteSortValue = "";

      state.unitRoutePageNumber = 0;
      state.unitRouteTotalElements = 0;
      state.unitRouteTotalPages = 0;
      state.shuttlePageNumber = 0;
      state.shuttleTotalPages = 0;
      state.shuttleTotalElements = 0;

      // for search and sort
      state.unitRouteSortType = false;
      state.unitRouteSortValue = "";

      state.dispatchGeneralSortValue = "";
      state.dispatchGeneralSortFlag = false;

      state.invoiceHeaderSortValue = "";
      state.invoiceHeaderSortFlag = false;
      state.unitChangesSortFlag = false;
      state.unitChangesSortValue = "";
      state.driversPaySortFlag = false;
      state.driversPaySortValue = "";
      state.shuttleSortFlag = false;
      state.shuttleSortValue = "";
    },

    resetUnitStatusInnerStatesCancel: (state, action) => {
      // pagination
      state.totalElements = 0;
      state.totalPages = 0;
      state.driveByPageNumber = 0;
      state.driveByTotalPages = 0;
      state.driveByTotalElements = 0;
      state.locationPageNumber = 0;
      state.locationTotalPages = 0;
      state.locationTotalElements = 0;
      state.contactPageNumber = 0;
      state.contactTotalPages = 0;
      state.contactTotalElements = 0;
      state.openBalancePageNumber = 0;
      state.openBalanceTotalPages = 0;
      state.openBalanceTotalElements = 0;
      state.documentPageNumber = 0;
      state.documentTotalPages = 0;
      state.documentTotalElements = 0;
      state.holdTotalElements = 0;
      state.holdPageNumber = 0;
      state.holdTotalPages = 0;
      state.invoiceHeaderPageNumber = 0;
      state.invoiceHeaderTotalPages = 0;
      state.invoiceHeaderTotalElements = 0;

      state.invoiceDetailPageNumber = 0;
      state.invoiceDetailTotalPages = 0;
      state.inVoiceDetailTotalElements = 0;

      state.dispatchGeneralPageNumber = 0;
      state.dispatchGeneralTotalPages = 0;
      state.dispatchGeneralTotalElements = 0;

      state.unitChangesPageNumber = 0;
      state.unitChangesTotalPages = 0;
      state.unitChangesTotalElements = 0;
      // filters
      state.driveBySortFlag = false;
      state.driveBySortValue = "";
      state.locationSortFlag = false;
      state.locationSortValue = "";
      state.contactSortFlag = false;
      state.contactSortValue = "";
      state.openBalanceSortFlag = false;
      state.openBalanceSortValue = "";
      state.creditCardSortValue = "";
      state.creditCardSortFlag = false;
      state.documentSortValue = "";
      state.documentSortFlag = false;
      state.holdSortFlag = false;
      state.holdSortValue = "";
      state.invoiceDetailSortFlag = false;
      state.invoiceDetailSortValue = "";

      state.shuttleDelaySortFlag = false;
      state.shuttleDelaySortValue = "";
      state.shuttleDelayTotalElements = 0;
      state.shuttleDelayPageNumber = 0;
      state.shuttleDelayTotalPages = 0;
      state.driversPayTotalElements = 0;
      state.driversPayPageNumber = 0;
      state.driversPayTotalPages = 0;

      state.rerouteTotalElements = 0;
      state.reroutePageNumber = 0;
      state.rerouteTotalPages = 0;
      state.rerouteSortFlag = false;
      state.rerouteSortValue = "";

      state.unitRoutePageNumber = 0;
      state.unitRouteTotalElements = 0;
      state.unitRouteTotalPages = 0;
      state.shuttlePageNumber = 0;
      state.shuttleTotalPages = 0;
      state.shuttleTotalElements = 0;

      // for search and sort
      state.unitRouteSortType = false;
      state.unitRouteSortValue = "";

      state.dispatchGeneralSortValue = "";
      state.dispatchGeneralSortFlag = false;

      state.invoiceHeaderSortValue = "";
      state.invoiceHeaderSortFlag = false;
      state.unitChangesSortFlag = false;
      state.unitChangesSortValue = "";
      state.driversPaySortFlag = false;
      state.driversPaySortValue = "";
      state.shuttleSortFlag = false;
      state.shuttleSortValue = "";
    },
    /****************************************Unit Status Unit Selection Screen-begins********************************/
    // Search Filter
    setGlobalSearchTerm: (state, action) => {
      state.globalSearchTerm = action.payload;
    },
    setSelectedCompanyName: (state, action) => {
      state.selectedCompanyName = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setUnitLast5: (state, action) => {
      state.unitLast5 = action.payload;
    },
    setUnitType: (state, action) => {
      state.unitType = action.payload;
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    setDateType: (state, action) => {
      state.dateType = action.payload;
    },
    setDateFrom: (state, action) => {
      state.dateFrom = action.payload;
    },
    setDateTo: (state, action) => {
      state.dateTo = action.payload;
    },
    setUnitStatus: (state, action) => {
      state.unitStatus = action.payload;
    },
    setPickupBy: (state, action) => {
      state.pickupBy = action.payload;
    },
    setDeliveryBy: (state, action) => {
      state.deliveryBy = action.payload;
    },
    setUnitOrderStatus: (state, action) => {
      state.unitOrderStatus = action.payload;
    },
    setUnitDelayType: (state, action) => {
      state.unitDelayType = action.payload;
    },
    setDelayedUnitType: (state, action) => {
      state.delayedUnitType = action.payload;
    },
    setDispatchDelayType: (state, action) => {
      state.dispatchDelayType = action.payload;
    },
    setSelectedDispatchStatus: (state, action) => {
      state.selectedDispatchStatus = action.payload;
    },

    toggleAdvancedSearch: (state, action) => {
      state.showAdvancedSearch = !state.showAdvancedSearch;
    },
    toggleAdvancedSort: (state, action) => {
      state.showAdvancedSort = !state.showAdvancedSort;
    },

    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },

    // Advanced Search
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setAdvancedSearchPayload: (state, action) => {
      state.advancedSearchPayload = action.payload;
    },
    // Advanced Sort
    setAdvancedSortingOrder: (state, action) => {
      state.advancedSortingOrder = action.payload;
    },
    setAdvancedSortingCombination: (state, action) => {
      state.advancedSortingCombination = action.payload;
    },
    // Advanced Search Sidebar
    setAdvancedSearchString: (state, action) => {
      state.advancedSearchString = action.payload;
    },
    setCheckAllAdvancedSearchBy: (state, action) => {
      state.checkAllAdvancedSearchBy = action.payload;

      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = action.payload;
      });
    },
    setAdvancedSearchByInputs: (state, { payload }) => {
      state.advancedSearchByInputs = {
        ...state.advancedSearchByInputs,
        [payload.name]: payload.checked,
      };
    },
    setIsInnerLookupsOpen: (state, action) => {
      state.isInnerLookupsOpen = action.payload;
    },
    setCustomerInput: (state, action) => {
      state.customerInput = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setCustomerPlantInput: (state, action) => {
      state.customerPlantInput = action.payload;
    },
    setCustomerPlantId: (state, action) => {
      state.customerPlantId = action.payload;
    },
    setDealerInput: (state, action) => {
      state.dealerInput = action.payload;
    },
    setDealerId: (state, action) => {
      state.dealerId = action.payload;
    },
    setRowData: (state, action) => {
      state.rowData = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setCompanyPK: (state, action) => {
      state.companyPK = action.payload;
    },

    // Miscellaneous
    clearAdvancedSearch: (state, action) => {
      state.advancedSearchObject = null;
      state.advancedSearchPayload = null;
      state.advancedSearchString = "";
      state.checkAllAdvancedSearchBy = false;
      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = false;
      });
      state.customerInput = "";
      state.customerId = null;
      state.customerPlantInput = "";
      state.customerPlantId = null;
      state.dealerInput = "";
      state.dealerId = null;
    },
    resetUnitSelectionFilters: (state, action) => {
      // Search Filter
      state.globalSearchTerm = "";
      state.selectedCompanyName = "";
      state.selectedSearchCriteria = "Beginning";
      state.unitLast5 = "";
      state.unitType = "Both";
      state.orderType = "Both";
      state.dateType = "Entry";
      state.dateFrom = "";
      state.dateTo = "";
      state.unitStatus = "All";
      state.pickupBy = "Name";
      state.deliveryBy = "Name";
      state.unitOrderStatus = "All";
      state.unitDelayType = "All";
      state.dispatchDelayType = "All";
      state.selectedDispatchStatus = "Both";
      state.showAdvancedSearch = false;
      state.showAdvancedSort = false;
      // Table Listing
      state.loading = true;
      state.browseNormalSortValue = [];
      state.changeColor = false;
      state.selectedId = null;
      state.browseNormalSortValue = null;
      state.browseNormalSortFlag = false;
      // Pagination
      state.browsePageNumber = 0;
      state.browseTotalElements = 0;
      state.browseTotalPages = 0;
      // Advanced Search
      state.advancedSearchObject = null;
      state.advancedSearchPayload = null;
      // Advanced Sort
      state.advancedSortingOrder = null;
      state.advancedSortingCombination = null;
      // Advanced Search Sidebar
      state.advancedSearchString = "";
      state.checkAllAdvancedSearchBy = false;
      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = false;
      });
      state.isInnerLookupsOpen = false;
      state.customerInput = "";
      state.customerId = null;
      state.customerPlantInput = "";
      state.customerPlantId = null;
      state.dealerInput = "";
      state.dealerId = null;

      // Inner Tabs states clear
      state.isUnitTypeOverWidth = false;
      state.isOpenBalancePrepaid = false;
      state.isCreditCardPrepaid = false;
      state.hasDriveBy = false;
      state.miscellaneousCustomer = false;
      state.miscellaneousPickup = false;
      state.miscellaneousDelivery = false;
      state.invoicePK = null;
      state.invoiceTextInputs = [];
      state.isMiscellaneousInvoice = false;
      state.UnitShuttlePK = null;
      state.unitShuttleDetailData = {};
      // pagination
      state.totalElements = 0;
      state.totalPages = 0;
      state.driveByPageNumber = 0;
      state.driveByTotalPages = 0;
      state.driveByTotalElements = 0;
      state.locationPageNumber = 0;
      state.locationTotalPages = 0;
      state.locationTotalElements = 0;
      state.contactPageNumber = 0;
      state.contactTotalPages = 0;
      state.contactTotalElements = 0;
      state.openBalancePageNumber = 0;
      state.openBalanceTotalPages = 0;
      state.openBalanceTotalElements = 0;
      state.documentPageNumber = 0;
      state.documentTotalPages = 0;
      state.documentTotalElements = 0;
      state.holdTotalElements = 0;
      state.holdPageNumber = 0;
      state.holdTotalPages = 0;
      state.invoiceHeaderPageNumber = 0;
      state.invoiceHeaderTotalPages = 0;
      state.invoiceHeaderTotalElements = 0;

      state.invoiceDetailPageNumber = 0;
      state.invoiceDetailTotalPages = 0;
      state.inVoiceDetailTotalElements = 0;

      state.dispatchGeneralPageNumber = 0;
      state.dispatchGeneralTotalPages = 0;
      state.dispatchGeneralTotalElements = 0;

      state.unitChangesPageNumber = 0;
      state.unitChangesTotalPages = 0;
      state.unitChangesTotalElements = 0;
      // filters
      state.driveBySortFlag = false;
      state.driveBySortValue = "";
      state.locationSortFlag = false;
      state.locationSortValue = "";
      state.contactSortFlag = false;
      state.contactSortValue = "";
      state.openBalanceSortFlag = false;
      state.openBalanceSortValue = "";
      state.creditCardSortValue = "";
      state.creditCardSortFlag = false;
      state.documentSortValue = "";
      state.documentSortFlag = false;
      state.holdSortFlag = false;
      state.holdSortValue = "";
      state.invoiceDetailSortFlag = false;
      state.invoiceDetailSortValue = "";

      state.shuttleDelaySortFlag = false;
      state.shuttleDelaySortValue = "";
      state.shuttleDelayTotalElements = 0;
      state.shuttleDelayPageNumber = 0;
      state.shuttleDelayTotalPages = 0;
      state.driversPayTotalElements = 0;
      state.driversPayPageNumber = 0;
      state.driversPayTotalPages = 0;

      state.rerouteTotalElements = 0;
      state.reroutePageNumber = 0;
      state.rerouteTotalPages = 0;
      state.rerouteSortFlag = false;
      state.rerouteSortValue = "";

      state.unitRoutePageNumber = 0;
      state.unitRouteTotalElements = 0;
      state.unitRouteTotalPages = 0;
      state.shuttlePageNumber = 0;
      state.shuttleTotalPages = 0;
      state.shuttleTotalElements = 0;

      // for search and sort
      state.unitRouteSortType = false;
      state.unitRouteSortValue = "";

      state.dispatchGeneralSortValue = "";
      state.dispatchGeneralSortFlag = false;

      state.invoiceHeaderSortValue = "";
      state.invoiceHeaderSortFlag = false;
      state.unitChangesSortFlag = false;
      state.unitChangesSortValue = "";
      state.driversPaySortFlag = false;
      state.driversPaySortValue = "";
      state.shuttleSortFlag = false;
      state.shuttleSortValue = "";
    },
    /*********Unit Status Unit Selection Screen-ends*************/
  },
});

export const {
  setIsUnitTypeOverWidth,
  setIsCreditCardPrepaid,
  setIsOpenBalancePrepaid,
  setHasDriveBy,
  setMiscellaneousCustomer,
  setMiscellaneousPickup,
  setMiscellaneousDelivery,
  setInvoicePK,
  setInvoiceTextInputs,
  setIsMiscellaneousInvoice,
  setUnitShuttlePK,
  setUnitShuttleDetailData,
  setCurrentStatus,
  setTotalElements,
  setTotalPages,
  setDriveByPageNumber,
  setDriveByTotalElements,
  setDriveByTotalPages,
  setLocationPageNumber,
  setLocationTotalElements,
  setLocationTotalPages,
  setContactPageNumber,
  setContactTotalElements,
  setContactTotalPages,
  setOpenBalancePageNumber,
  setOpenBalanceTotalElements,
  setOpenBalanceTotalPages,
  setDocumentPageNumber,
  setDocumentTotalElements,
  setDocumentTotalPages,
  setDispatchGeneralPageNumber,
  setDispatchGeneralTotalElements,
  setDispatchGeneralTotalPages,
  setInvoiceHeaderPageNumber,
  setInvoiceHeaderTotalElements,
  setInvoiceHeaderTotalPages,
  setInVoiceDetailTotalElements,
  setInvoiceDetailPageNumber,
  setInvoiceDetailTotalPages,
  setUnitChangesTotalElements,
  setUnitChangesPageNumber,
  setUnitChangesTotalPages,
  setShuttlePageNumber,
  setShuttleTotalPages,
  setShuttleTotalElements,
  setDriveBySortFlag,
  setDriveBySortValue,
  setLocationSortFlag,
  setLocationSortValue,
  setContactSortFlag,
  setContactSortValue,
  setOpenBalanceSortFlag,
  setOpenBalanceSortValue,
  setCreditCardSortFlag,
  setCreditCardSortValue,
  setDocumentSortFlag,
  setDocumentSortValue,
  setHoldTotalElements,
  setHoldPageNumber,
  setHoldTotalPages,
  setHoldSortFlag,
  setHoldSortValue,
  setShuttleDelayTotalElements,
  setShuttleDelayPageNumber,
  setDriversPayPageNumber,
  setDriversPayTotalPages,
  setDriversPayTotalElements,
  setShuttleDelayTotalPages,
  setShuttleDelaySortFlag,
  setShuttleDelaySortValue,
  setRerouteTotalElements,
  setReroutePageNumber,
  setRerouteTotalPages,
  setRerouteSortFlag,
  setRerouteSortValue,
  setDispatchGeneralSortFlag,
  setDispatchGeneralSortValue,
  setUnitRoutePageNumber,
  setUnitRouteSortType,
  setUnitRouteSortValue,
  setUnitRouteTotalElements,
  setUnitRouteTotalPages,
  setInvoiceHeaderSortFlag,
  setInvoiceHeaderSortValue,
  setInvoiceDetailSortFlag,
  setInvoiceDetailSortValue,
  setUnitChangesSortFlag,
  setUnitChangesSortValue,
  setDriversPaySortFlag,
  setDriversPaySortValue,
  setShuttleSortFlag,
  setShuttleSortValue,
  resetUnitStatusInnerStates,
  resetUnitStatusInnerStatesCancel,
  /*********Unit Status Unit Selection Screen-begins*************/
  setUnitSelectionData,
  setBrowseTotalElements,
  setBrowseTotalPages,
  setBrowsePageNumber,
  setBrowseNormalSortValue,
  setBrowseNormalSortFlag,
  setGlobalSearchTerm,
  setSelectedCompanyName,
  setSelectedSearchCriteria,
  setUnitLast5,
  setUnitType,
  setOrderType,
  setDateType,
  setDateFrom,
  setDateTo,
  setUnitStatus,
  setPickupBy,
  setDeliveryBy,
  setUnitOrderStatus,
  setUnitDelayType,
  setDelayedUnitType,
  setDispatchDelayType,
  setSelectedDispatchStatus,
  toggleAdvancedSearch,
  toggleAdvancedSort,
  setCompanyName,
  setListingData,
  setLoading,
  setChangeColor,
  setSelectedId,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setAdvancedSortingOrder,
  setAdvancedSortingCombination,
  setAdvancedSearchString,
  setCheckAllAdvancedSearchBy,
  setAdvancedSearchByInputs,
  setIsInnerLookupsOpen,
  setCustomerInput,
  setCustomerId,
  setCustomerPlantInput,
  setCustomerPlantId,
  setDealerInput,
  setDealerId,
  setRowData,
  setNotes,
  setCompanyPK,
  clearAdvancedSearch,
  resetUnitSelectionFilters,
  setActiveTab,

  /*********Unit Status Unit Selection Screen-ends*************/
} = UnitStatusSlice.actions;

export default UnitStatusSlice.reducer;
