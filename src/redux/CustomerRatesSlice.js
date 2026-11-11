import { createSlice } from "@reduxjs/toolkit";
const CustomerRatesSlice = createSlice({
  name: "CustomerRatesSlice",
  initialState: {
    customerRatesListData: [],
    /**search filter */
    searchTerms: "",
    searchCriteria: "Beginning",
    changeColor: false,
    selectId: "",
    editFormData: null,
    sortValue: null,
    sortFlag: false,
    /***FLag to check duplicate customer
     *  or plant or plantgroup or customergroup in customer selection */
    isSelectedDuplicate: false,
    /* pagination*/
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    viewDetail: false,
    changesCancelled: false,

    /**advance search*/
    advancedSearchObject: null,
    showAdvanceSearch: false,
    advancedSearchString: "",
    advancedSearchByPayload: null,
    checkAllAdvancedSearchBy: false,

    searchCustomer: "",
    searchPlant: "",
    searchPlantGroup: "",
    searchCustomerGroup: "",
    searchUnitTypeGroup: "",

    /*customer lookup*/
    customerSelection: false,
    customerInput: "",
    customerId: "",
    /*added for getting invoice percentage*/
    customerInvoicePercentage: "",
    customerFK: "",

    /*plant lookup*/
    customerPlantSelection: false,
    customerPlantInput: "",
    customerPlantId: "",

    /*Plant group lookup*/
    customerPlantGroupSelection: false,
    customerPlantGroupInput: "",
    customerPlantGroupId: "",

    /*Customer Group Lookup*/
    customerGroupSelection: false,
    customerGroupInput: "",
    customerGroupId: "",

    /*customer Unit type group Lookup*/
    customerUnitTypeGroupSelection: false,
    customerUnitTypeGroupInput: "",
    customerUnitTypeGroupId: "",

    /*General Tab*/
    customerRatePK: "",
    whichOne: "",
    invoiceRates: false,
    driverRates: false,
    useMilageTiers: false,
    flatRateTiers: false,
    useLengthTiers: false,
    numberOfUnitsMinimum: "",
    numberOfUnitsMaximum: "",
    outboundInvoiceRate: "",
    reloadInvoiceRate: "",
    returnInvoiceRate: "",
    outBoundDriverRate: "",
    reloadDriverRate: "",
    returnDriverRate: "",
    updateOutboundInvoiceRates: false,
    updateReloadInvoiceRates: false,
    updateReturnInvoiceRates: false,
    updateOutboundDriverRates: false,
    updateReloadDriverRates: false,
    updateReturnDriverRates: false,
    allowLongUnitRate: false,
    oneOfMany: false,

    /*Tiers Mileage Tab*/
    /* mileage rate*/
    mileageRateBreak1: "",
    mileageRateBreak2: "",
    mileageRateBreak3: "",
    mileageRateBreak4: "",
    mileageRateBreak5: "",
    mileageRateBreak6: "",
    /*Invoice Rate*/
    invoiceRate1: "",
    invoiceRate2: "",
    invoiceRate3: "",
    invoiceRate4: "",
    invoiceRate5: "",
    invoiceRate6: "",
    invoiceRate7: "",

    invoiceReloadRate1: "",
    invoiceReloadRate2: "",
    invoiceReloadRate3: "",
    invoiceReloadRate4: "",
    invoiceReloadRate5: "",
    invoiceReloadRate6: "",
    invoiceReloadRate7: "",

    invoiceReturnRate1: "",
    invoiceReturnRate2: "",
    invoiceReturnRate3: "",
    invoiceReturnRate4: "",
    invoiceReturnRate5: "",
    invoiceReturnRate6: "",
    invoiceReturnRate7: "",

    /*Driver Rates*/
    driverRate1: "",
    driverRate2: "",
    driverRate3: "",
    driverRate4: "",
    driverRate5: "",
    driverRate6: "",
    driverRate7: "",

    driverReloadRate1: "",
    driverReloadRate2: "",
    driverReloadRate3: "",
    driverReloadRate4: "",
    driverReloadRate5: "",
    driverReloadRate6: "",
    driverReloadRate7: "",

    driverReturnRate1: "",
    driverReturnRate2: "",
    driverReturnRate3: "",
    driverReturnRate4: "",
    driverReturnRate5: "",
    driverReturnRate6: "",
    driverReturnRate7: "",

    /*Tiers FlatRate Tab*/
    /*Flat Rate Miles*/
    flatRateMileageBreak1: "",
    flatRateMileageBreak2: "",
    flatRateMileageBreak3: "",
    flatRateMileageBreak4: "",
    flatRateMileageBreak5: "",
    flatRateMileageBreak6: "",
    /*Invoice Rate*/
    invoiceFlatRate1: "",
    invoiceFlatRate2: "",
    invoiceFlatRate3: "",
    invoiceFlatRate4: "",
    invoiceFlatRate5: "",
    invoiceFlatRate6: "",
    invoiceFlatRate7: "",

    invoiceReloadFlatRate1: "",
    invoiceReloadFlatRate2: "",
    invoiceReloadFlatRate3: "",
    invoiceReloadFlatRate4: "",
    invoiceReloadFlatRate5: "",
    invoiceReloadFlatRate6: "",
    invoiceReloadFlatRate7: "",

    invoiceReturnFlatRate1: "",
    invoiceReturnFlatRate2: "",
    invoiceReturnFlatRate3: "",
    invoiceReturnFlatRate4: "",
    invoiceReturnFlatRate5: "",
    invoiceReturnFlatRate6: "",
    invoiceReturnFlatRate7: "",

    /*Driver Rates*/
    driverFlatRate1: "",
    driverFlatRate2: "",
    driverFlatRate3: "",
    driverFlatRate4: "",
    driverFlatRate5: "",
    driverFlatRate6: "",
    driverFlatRate7: "",

    driverReloadFlatRate1: "",
    driverReloadFlatRate2: "",
    driverReloadFlatRate3: "",
    driverReloadFlatRate4: "",
    driverReloadFlatRate5: "",
    driverReloadFlatRate6: "",
    driverReloadFlatRate7: "",

    driverReturnFlatRate1: "",
    driverReturnFlatRate2: "",
    driverReturnFlatRate3: "",
    driverReturnFlatRate4: "",
    driverReturnFlatRate5: "",
    driverReturnFlatRate6: "",
    driverReturnFlatRate7: "",

    invoiceFlatRateAddFS: false,

    /*Tiers Length Tab*/
    unitLength1: "",
    unitLength2: "",
    invoiceLengthRate1: "",
    driverLengthRate1: "",
    invoiceLengthRate2: "",
    driverLengthRate2: "",
    invoiceLengthRate3: "",
    driverLengthRate3: "",
    useLengthTiersReload: false,
    useLengthTiersReturns: false,

    /*minimum tab*/
    invoiceMinimumCharge: "",
    invoiceMinimumMiles: null,
    invoiceMinimumChargeReload: "",
    invoiceMinimumMilesReload: null,
    invoiceMinimumChargeReturn: "",
    invoiceMinimumMilesReturn: null,
    invoiceMinimumAsFlatrate: true,
    invoiceMinimumAddFuelSurcharge: false,
    driverMinimumCharge: "",
    driverMinimumMiles: null,
    driverMinimumChargeReload: "",
    driverMinimumMilesReload: null,
    driverMinimumChargeReturn: "",
    driverMinimumMilesReturn: null,
    driverMinimumAsFlatRate: true,

    /*surcharges Tab*/
    invoiceFuelSurchargeGas: "",
    invoiceFuelSurchargeDiesel: "",
    invoiceFuelSurchargeGasCanada: "",
    invoiceFuelSurchargeDieselCanada: "",
    driverFuelSurchargeGas: "",
    driverFuelSurchargeDiesel: "",
    driverFuelSurchargeGasCanada: "",
    driverFuelSurchargeDieselCanada: "",
    invoiceApportionedSurcharge: "",
    invoiceApportionedWeightCutoff: "",
    driverApportionedSurcharge: "",
    driverApportionedWeightCutoff: "",
    useApportionedOnReloads: false,
    useApportionedOnReturns: false,
    invoiceCDLSurcharge: "",
    invoiceCDLSurchargeCanada: "",
    invoiceCDLGVWRCutoff: null,
    invoiceCDLLengthCutoff: null,
    driverCDLSurcharge: "",
    driverCDLSurchargeCanada: "",
    driverCDLGVWRCutoff: null,
    driverCDLLengthCutoff: null,
    invoiceCDLSurchargeB: "",
    invoiceCDLSurchargeCanadaB: "",
    invoiceCDLGVWRCutoffB: null,
    invoiceCDLLengthCutoffB: null,
    driverCDLSurchargeB: "",
    driverCDLSurchargeCanadaB: "",
    driverCDLGVWRCutoffB: null,
    driverCDLLengthCutoffB: null,
    useCDLReload: false,
    useCDLReturns: false,

    /*Tab Validation*/
    isGeneralTabValid: false,
    isTiersTabValid: false,
    isTiersMileageTabValid: false,
    isTiersFlatRateTabValid: false,
    isTiersLengthTabValid: false,
    isMinimumTabValid: false,
    isSurchargesTabValid: false,
    customerRatesData: null,
    isCustomerRateLoading: false,
  },
  reducers: {
    setCustomerRatesListData: (state, action) => {
      state.customerRatesListData = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setSelectId: (state, action) => {
      state.selectId = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
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
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setIsSelectedDuplicate: (state, action) => {
      state.isSelectedDuplicate = action.payload;
    },

    setChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
    },
    setAdvancedSearchString: (state, action) => {
      state.advancedSearchString = action.payload;
    },
    setAdvancedSearchByPayload: (state, action) => {
      state.advancedSearchByPayload = action.payload;
    },
    setCheckAllAdvancedSearchBy: (state, action) => {
      state.checkAllAdvancedSearchBy = action.payload;
    },
    setSearchCustomer: (state, action) => {
      state.searchCustomer = action.payload;
    },
    setSearchPlant: (state, action) => {
      state.searchPlant = action.payload;
    },
    setSearchPlantGroup: (state, action) => {
      state.searchPlantGroup = action.payload;
    },
    setSearchCustomerGroup: (state, action) => {
      state.searchCustomerGroup = action.payload;
    },
    setSearchUnitTypeGroup: (state, action) => {
      state.searchUnitTypeGroup = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setSearchedData: (state, action) => {
      state.searchedData = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setCustomerSelection: (state, action) => {
      state.customerSelection = action.payload;
    },
    setCustomerInput: (state, action) => {
      state.customerInput = action.payload;
    },
    setCustomerPlantId: (state, action) => {
      state.customerPlantId = action.payload;
    },
    /*Added for getting invoice percentage*/
    setCustomerInvoicePercentage: (state, action) => {
      state.customerInvoicePercentage = action.payload;
    },
    setCustomerFK: (state, action) => {
      state.customerFK = action.payload;
    },
    setCustomerPlantSelection: (state, action) => {
      state.customerPlantSelection = action.payload;
    },
    setCustomerPlantInput: (state, action) => {
      state.customerPlantInput = action.payload;
    },
    setCustomerPlantGroupId: (state, action) => {
      state.customerPlantGroupId = action.payload;
    },
    setCustomerPlantGroupSelection: (state, action) => {
      state.customerPlantGroupSelection = action.payload;
    },
    setCustomerPlantGroupInput: (state, action) => {
      state.customerPlantGroupInput = action.payload;
    },
    setCustomerGroupId: (state, action) => {
      state.customerGroupId = action.payload;
    },
    setCustomerGroupSelection: (state, action) => {
      state.customerGroupSelection = action.payload;
    },
    setCustomerGroupInput: (state, action) => {
      state.customerGroupInput = action.payload;
    },
    setCustomerUnitTypeGroupId: (state, action) => {
      state.customerUnitTypeGroupId = action.payload;
    },
    setCustomerUnitTypeGroupSelection: (state, action) => {
      state.customerUnitTypeGroupSelection = action.payload;
    },
    setCustomerUnitTypeGroupInput: (state, action) => {
      state.customerUnitTypeGroupInput = action.payload;
    },
    setCustomerRatesData: (state, action) => {
      let payload = action.payload;
      state.customerRatesData = { ...state.customerRatesData, ...payload };
    },
    setIsCustomerRateLoading: (state, { payload }) => {
      state.isCustomerRateLoading = payload;
    },
    resetStates: (state, action) => {
      state.customerRatesListData = [];
      state.editFormData = null;
      state.customerId = "";
      state.customerPlantId = "";
      state.customerPlantGroupId = "";
      state.customerGroupId = "";
      state.customerUnitTypeGroupId = "";
      state.customerInput = "";
      state.customerPlantInput = "";
      state.customerPlantGroupInput = "";
      state.customerGroupInput = "";
      state.customerUnitTypeGroupInput = "";
    },
    resetGeneralTab: (state, action) => {
      state.whichOne = "";
      state.invoiceRates = false;
      state.driverRates = false;
      state.useMilageTiers = false;
      state.flatRateTiers = false;
      state.useLengthTiers = false;
      state.numberOfUnitsMinimum = "";
      state.numberOfUnitsMaximum = "";
      state.outboundInvoiceRate = "";
      state.reloadInvoiceRate = "";
      state.returnInvoiceRate = "";
      state.outBoundDriverRate = "";
      state.reloadDriverRate = "";
      state.returnDriverRate = "";
      state.updateOutboundInvoiceRates = false;
      state.updateReloadInvoiceRates = false;
      state.updateReturnInvoiceRates = false;
      state.updateOutboundDriverRates = false;
      state.updateReloadDriverRates = false;
      state.updateReturnDriverRates = false;
      state.allowLongUnitRate = false;
      state.oneOfMany = false;
    },
    resetTiersMileageTab: (state, action) => {
      /*mileage rate*/
      state.mileageRateBreak1 = "";
      state.mileageRateBreak2 = "";
      state.mileageRateBreak3 = "";
      state.mileageRateBreak4 = "";
      state.mileageRateBreak5 = "";
      state.mileageRateBreak6 = "";
      /*Invoice Rate*/
      state.invoiceRate1 = "";
      state.invoiceRate2 = "";
      state.invoiceRate3 = "";
      state.invoiceRate4 = "";
      state.invoiceRate5 = "";
      state.invoiceRate6 = "";
      state.invoiceRate7 = "";

      state.invoiceReloadRate1 = "";
      state.invoiceReloadRate2 = "";
      state.invoiceReloadRate3 = "";
      state.invoiceReloadRate4 = "";
      state.invoiceReloadRate5 = "";
      state.invoiceReloadRate6 = "";
      state.invoiceReloadRate7 = "";

      state.invoiceReturnRate1 = "";
      state.invoiceReturnRate2 = "";
      state.invoiceReturnRate3 = "";
      state.invoiceReturnRate4 = "";
      state.invoiceReturnRate5 = "";
      state.invoiceReturnRate6 = "";
      state.invoiceReturnRate7 = "";

      /*Driver Rates*/
      state.driverRate1 = "";
      state.driverRate2 = "";
      state.driverRate3 = "";
      state.driverRate4 = "";
      state.driverRate5 = "";
      state.driverRate6 = "";
      state.driverRate7 = "";

      state.driverReloadRate1 = "";
      state.driverReloadRate2 = "";
      state.driverReloadRate3 = "";
      state.driverReloadRate4 = "";
      state.driverReloadRate5 = "";
      state.driverReloadRate6 = "";
      state.driverReloadRate7 = "";

      state.driverReturnRate1 = "";
      state.driverReturnRate2 = "";
      state.driverReturnRate3 = "";
      state.driverReturnRate4 = "";
      state.driverReturnRate5 = "";
      state.driverReturnRate6 = "";
      state.driverReturnRate7 = "";
    },
    resetTiersFlatrateTab: (state, action) => {
      /*Miles*/
      state.flatRateMileageBreak1 = "";
      state.flatRateMileageBreak2 = "";
      state.flatRateMileageBreak3 = "";
      state.flatRateMileageBreak4 = "";
      state.flatRateMileageBreak5 = "";
      state.flatRateMileageBreak6 = "";

      /* Invoice Rate*/
      state.invoiceFlatRate1 = "";
      state.invoiceFlatRate2 = "";
      state.invoiceFlatRate3 = "";
      state.invoiceFlatRate4 = "";
      state.invoiceFlatRate5 = "";
      state.invoiceFlatRate6 = "";
      state.invoiceFlatRate7 = "";

      state.invoiceReloadFlatRate1 = "";
      state.invoiceReloadFlatRate2 = "";
      state.invoiceReloadFlatRate3 = "";
      state.invoiceReloadFlatRate4 = "";
      state.invoiceReloadFlatRate5 = "";
      state.invoiceReloadFlatRate6 = "";
      state.invoiceReloadFlatRate7 = "";

      state.invoiceReturnFlatRate1 = "";
      state.invoiceReturnFlatRate2 = "";
      state.invoiceReturnFlatRate3 = "";
      state.invoiceReturnFlatRate4 = "";
      state.invoiceReturnFlatRate5 = "";
      state.invoiceReturnFlatRate6 = "";
      state.invoiceReturnFlatRate7 = "";

      /* Driver Rates*/
      state.driverFlatRate1 = "";
      state.driverFlatRate2 = "";
      state.driverFlatRate3 = "";
      state.driverFlatRate4 = "";
      state.driverFlatRate5 = "";
      state.driverFlatRate6 = "";
      state.driverFlatRate7 = "";

      state.driverReloadFlatRate1 = "";
      state.driverReloadFlatRate2 = "";
      state.driverReloadFlatRate3 = "";
      state.driverReloadFlatRate4 = "";
      state.driverReloadFlatRate5 = "";
      state.driverReloadFlatRate6 = "";
      state.driverReloadFlatRate7 = "";

      state.driverReturnFlatRate1 = "";
      state.driverReturnFlatRate2 = "";
      state.driverReturnFlatRate3 = "";
      state.driverReturnFlatRate4 = "";
      state.driverReturnFlatRate5 = "";
      state.driverReturnFlatRate6 = "";
      state.driverReturnFlatRate7 = "";

      state.invoiceFlatRateAddFS = false;
    },
    resetMinimumTab: (state, action) => {
      state.invoiceMinimumCharge = "";
      state.invoiceMinimumMiles = null;
      state.invoiceMinimumChargeReload = "";
      state.invoiceMinimumMilesReload = null;
      state.invoiceMinimumChargeReturn = "";
      state.invoiceMinimumMilesReturn = null;
      state.invoiceMinimumAsFlatrate = true;
      state.invoiceMinimumAddFuelSurcharge = false;
      state.driverMinimumCharge = "";
      state.driverMinimumMiles = null;
      state.driverMinimumChargeReload = "";
      state.driverMinimumMilesReload = null;
      state.driverMinimumChargeReturn = "";
      state.driverMinimumMilesReturn = null;
      state.driverMinimumAsFlatRate = true;
    },
    resetSurchargesTab: (state, action) => {
      state.invoiceFuelSurchargeGas = "";
      state.invoiceFuelSurchargeDiesel = "";
      state.invoiceFuelSurchargeGasCanada = "";
      state.invoiceFuelSurchargeDieselCanada = "";
      state.driverFuelSurchargeGas = "";
      state.driverFuelSurchargeDiesel = "";
      state.driverFuelSurchargeGasCanada = "";
      state.driverFuelSurchargeDieselCanada = "";
      state.invoiceApportionedSurcharge = "";
      state.invoiceApportionedWeightCutoff = "";
      state.driverApportionedSurcharge = "";
      state.driverApportionedWeightCutoff = "";
      state.useApportionedOnReloads = false;
      state.useApportionedOnReturns = false;
      state.invoiceCDLSurcharge = "";
      state.invoiceCDLSurchargeCanada = "";
      state.invoiceCDLGVWRCutoff = null;
      state.invoiceCDLLengthCutoff = null;
      state.driverCDLSurcharge = "";
      state.driverCDLSurchargeCanada = "";
      state.driverCDLGVWRCutoff = null;
      state.driverCDLLengthCutoff = null;
      state.invoiceCDLSurchargeB = "";
      state.invoiceCDLSurchargeCanadaB = "";
      state.invoiceCDLGVWRCutoffB = null;
      state.invoiceCDLLengthCutoffB = null;
      state.driverCDLSurchargeB = "";
      state.driverCDLSurchargeCanadaB = "";
      state.driverCDLGVWRCutoffB = null;
      state.driverCDLLengthCutoffB = null;
      state.useCDLReload = false;
      state.useCDLReturns = false;
    },
    resetLengthTab: (state, action) => {
      state.unitLength1 = "";
      state.unitLength2 = "";
      state.invoiceLengthRate1 = "";
      state.driverLengthRate1 = "";
      state.invoiceLengthRate2 = "";
      state.driverLengthRate2 = "";
      state.invoiceLengthRate3 = "";
      state.driverLengthRate3 = "";
      state.useLengthTiersReload = false;
      state.useLengthTiersReturns = false;
    },
    /*General Tab*/
    setCustomerRatePK: (state, action) => {
      state.customerRatePK = action.payload;
    },
    setWhichOne: (state, action) => {
      state.whichOne = action.payload;
    },
    setInvoiceRates: (state, action) => {
      state.invoiceRates = action.payload;
    },
    setDriverRates: (state, action) => {
      state.driverRates = action.payload;
    },
    setUseMilageTiers: (state, action) => {
      state.useMilageTiers = action.payload;
    },
    setFlatRateTiers: (state, action) => {
      state.flatRateTiers = action.payload;
    },
    setUseLengthTiers: (state, action) => {
      state.useLengthTiers = action.payload;
    },
    setNumberOfUnitsMinimum: (state, action) => {
      state.numberOfUnitsMinimum = action.payload;
    },
    setNumberOfUnitsMaximum: (state, action) => {
      state.numberOfUnitsMaximum = action.payload;
    },
    setOutboundInvoiceRate: (state, action) => {
      state.outboundInvoiceRate = action.payload;
    },
    setReloadInvoiceRate: (state, action) => {
      state.reloadInvoiceRate = action.payload;
    },
    setReturnInvoiceRate: (state, action) => {
      state.returnInvoiceRate = action.payload;
    },
    setOutboundDriverRate: (state, action) => {
      state.outBoundDriverRate = action.payload;
    },
    setReloadDriverRate: (state, action) => {
      state.reloadDriverRate = action.payload;
    },
    setReturnDriverRate: (state, action) => {
      state.returnDriverRate = action.payload;
    },
    setUpdateOutboundInvoiceRates: (state, action) => {
      state.updateOutboundInvoiceRates = action.payload;
    },
    setUpdateReloadInvoiceRates: (state, action) => {
      state.updateReloadInvoiceRates = action.payload;
    },
    setUpdateReturnInvoiceRates: (state, action) => {
      state.updateReturnInvoiceRates = action.payload;
    },
    setUpdateOutboundDriverRates: (state, action) => {
      state.updateOutboundDriverRates = action.payload;
    },
    setUpdateReloadDriverRates: (state, action) => {
      state.updateReloadDriverRates = action.payload;
    },
    setUpdateReturnDriverRates: (state, action) => {
      state.updateReturnDriverRates = action.payload;
    },
    setAllowLongUnitRate: (state, action) => {
      state.allowLongUnitRate = action.payload;
    },
    setOneOfMany: (state, action) => {
      state.oneOfMany = action.payload;
    },

    /*Tiers Mileage Tab*/
    setMileageRateBreak1: (state, action) => {
      state.mileageRateBreak1 = action.payload;
    },
    setMileageRateBreak2: (state, action) => {
      state.mileageRateBreak2 = action.payload;
    },
    setMileageRateBreak3: (state, action) => {
      state.mileageRateBreak3 = action.payload;
    },
    setMileageRateBreak4: (state, action) => {
      state.mileageRateBreak4 = action.payload;
    },
    setMileageRateBreak5: (state, action) => {
      state.mileageRateBreak5 = action.payload;
    },
    setMileageRateBreak6: (state, action) => {
      state.mileageRateBreak6 = action.payload;
    },
    /* mileage rate-  Invoice Rate*/

    setInvoiceRate1: (state, action) => {
      state.invoiceRate1 = action.payload;
    },
    setInvoiceRate2: (state, action) => {
      state.invoiceRate2 = action.payload;
    },
    setInvoiceRate3: (state, action) => {
      state.invoiceRate3 = action.payload;
    },
    setInvoiceRate4: (state, action) => {
      state.invoiceRate4 = action.payload;
    },
    setInvoiceRate5: (state, action) => {
      state.invoiceRate5 = action.payload;
    },
    setInvoiceRate6: (state, action) => {
      state.invoiceRate6 = action.payload;
    },
    setInvoiceRate7: (state, action) => {
      state.invoiceRate7 = action.payload;
    },
    /* mileage rate-  Invoice Reload*/
    setInvoiceReloadRate1: (state, action) => {
      state.invoiceReloadRate1 = action.payload;
    },
    setInvoiceReloadRate2: (state, action) => {
      state.invoiceReloadRate2 = action.payload;
    },
    setInvoiceReloadRate3: (state, action) => {
      state.invoiceReloadRate3 = action.payload;
    },
    setInvoiceReloadRate4: (state, action) => {
      state.invoiceReloadRate4 = action.payload;
    },
    setInvoiceReloadRate5: (state, action) => {
      state.invoiceReloadRate5 = action.payload;
    },
    setInvoiceReloadRate6: (state, action) => {
      state.invoiceReloadRate6 = action.payload;
    },
    setInvoiceReloadRate7: (state, action) => {
      state.invoiceReloadRate7 = action.payload;
    },
    /*mileage rate-  Invoice Return*/
    setInvoiceReturnRate1: (state, action) => {
      state.invoiceReturnRate1 = action.payload;
    },
    setInvoiceReturnRate2: (state, action) => {
      state.invoiceReturnRate2 = action.payload;
    },
    setInvoiceReturnRate3: (state, action) => {
      state.invoiceReturnRate3 = action.payload;
    },
    setInvoiceReturnRate4: (state, action) => {
      state.invoiceReturnRate4 = action.payload;
    },
    setInvoiceReturnRate5: (state, action) => {
      state.invoiceReturnRate5 = action.payload;
    },
    setInvoiceReturnRate6: (state, action) => {
      state.invoiceReturnRate6 = action.payload;
    },
    setInvoiceReturnRate7: (state, action) => {
      state.invoiceReturnRate7 = action.payload;
    },

    /* mileage rate-  Driver Rate*/
    setDriverRate1: (state, action) => {
      state.driverRate1 = action.payload;
    },
    setDriverRate2: (state, action) => {
      state.driverRate2 = action.payload;
    },
    setDriverRate3: (state, action) => {
      state.driverRate3 = action.payload;
    },
    setDriverRate4: (state, action) => {
      state.driverRate4 = action.payload;
    },
    setDriverRate5: (state, action) => {
      state.driverRate5 = action.payload;
    },
    setDriverRate6: (state, action) => {
      state.driverRate6 = action.payload;
    },
    setDriverRate7: (state, action) => {
      state.driverRate7 = action.payload;
    },
    /*mileage rate-  Driver Reload Rate*/
    setDriverReloadRate1: (state, action) => {
      state.driverReloadRate1 = action.payload;
    },
    setDriverReloadRate2: (state, action) => {
      state.driverReloadRate2 = action.payload;
    },
    setDriverReloadRate3: (state, action) => {
      state.driverReloadRate3 = action.payload;
    },
    setDriverReloadRate4: (state, action) => {
      state.driverReloadRate4 = action.payload;
    },
    setDriverReloadRate5: (state, action) => {
      state.driverReloadRate5 = action.payload;
    },
    setDriverReloadRate6: (state, action) => {
      state.driverReloadRate6 = action.payload;
    },
    setDriverReloadRate7: (state, action) => {
      state.driverReloadRate7 = action.payload;
    },
    /*mileage rate-  Driver Return Rate*/
    setDriverReturnRate1: (state, action) => {
      state.driverReturnRate1 = action.payload;
    },
    setDriverReturnRate2: (state, action) => {
      state.driverReturnRate2 = action.payload;
    },
    setDriverReturnRate3: (state, action) => {
      state.driverReturnRate3 = action.payload;
    },
    setDriverReturnRate4: (state, action) => {
      state.driverReturnRate4 = action.payload;
    },
    setDriverReturnRate5: (state, action) => {
      state.driverReturnRate5 = action.payload;
    },
    setDriverReturnRate6: (state, action) => {
      state.driverReturnRate6 = action.payload;
    },
    setDriverReturnRate7: (state, action) => {
      state.driverReturnRate7 = action.payload;
    },
    /* Flatrate-  Miles*/
    setFlatRateMileageBreak1: (state, action) => {
      state.flatRateMileageBreak1 = action.payload;
    },
    setFlatRateMileageBreak2: (state, action) => {
      state.flatRateMileageBreak2 = action.payload;
    },
    setFlatRateMileageBreak3: (state, action) => {
      state.flatRateMileageBreak3 = action.payload;
    },
    setFlatRateMileageBreak4: (state, action) => {
      state.flatRateMileageBreak4 = action.payload;
    },
    setFlatRateMileageBreak5: (state, action) => {
      state.flatRateMileageBreak5 = action.payload;
    },
    setFlatRateMileageBreak6: (state, action) => {
      state.flatRateMileageBreak6 = action.payload;
    },
    /* Flatrate-  Invoice Rate*/
    setInvoiceFlatRate1: (state, action) => {
      state.invoiceFlatRate1 = action.payload;
    },
    setInvoiceFlatRate2: (state, action) => {
      state.invoiceFlatRate2 = action.payload;
    },
    setInvoiceFlatRate3: (state, action) => {
      state.invoiceFlatRate3 = action.payload;
    },
    setInvoiceFlatRate4: (state, action) => {
      state.invoiceFlatRate4 = action.payload;
    },
    setInvoiceFlatRate5: (state, action) => {
      state.invoiceFlatRate5 = action.payload;
    },
    setInvoiceFlatRate6: (state, action) => {
      state.invoiceFlatRate6 = action.payload;
    },
    setInvoiceFlatRate7: (state, action) => {
      state.invoiceFlatRate7 = action.payload;
    },

    /*Flat rate-  Invoice Reload*/
    setInvoiceReloadFlatRate1: (state, action) => {
      state.invoiceReloadFlatRate1 = action.payload;
    },
    setInvoiceReloadFlatRate2: (state, action) => {
      state.invoiceReloadFlatRate2 = action.payload;
    },
    setInvoiceReloadFlatRate3: (state, action) => {
      state.invoiceReloadFlatRate3 = action.payload;
    },
    setInvoiceReloadFlatRate4: (state, action) => {
      state.invoiceReloadFlatRate4 = action.payload;
    },
    setInvoiceReloadFlatRate5: (state, action) => {
      state.invoiceReloadFlatRate5 = action.payload;
    },
    setInvoiceReloadFlatRate6: (state, action) => {
      state.invoiceReloadFlatRate6 = action.payload;
    },
    setInvoiceReloadFlatRate7: (state, action) => {
      state.invoiceReloadFlatRate7 = action.payload;
    },

    /*Flat rate-  Invoice Return*/
    setInvoiceReturnFlatRate1: (state, action) => {
      state.invoiceReturnFlatRate1 = action.payload;
    },
    setInvoiceReturnFlatRate2: (state, action) => {
      state.invoiceReturnFlatRate2 = action.payload;
    },
    setInvoiceReturnFlatRate3: (state, action) => {
      state.invoiceReturnFlatRate3 = action.payload;
    },
    setInvoiceReturnFlatRate4: (state, action) => {
      state.invoiceReturnFlatRate4 = action.payload;
    },
    setInvoiceReturnFlatRate5: (state, action) => {
      state.invoiceReturnFlatRate5 = action.payload;
    },
    setInvoiceReturnFlatRate6: (state, action) => {
      state.invoiceReturnFlatRate6 = action.payload;
    },
    setInvoiceReturnFlatRate7: (state, action) => {
      state.invoiceReturnFlatRate7 = action.payload;
    },

    /*Flat rate-  Driver Rate*/
    setDriverFlatRate1: (state, action) => {
      state.driverFlatRate1 = action.payload;
    },
    setDriverFlatRate2: (state, action) => {
      state.driverFlatRate2 = action.payload;
    },
    setDriverFlatRate3: (state, action) => {
      state.driverFlatRate3 = action.payload;
    },
    setDriverFlatRate4: (state, action) => {
      state.driverFlatRate4 = action.payload;
    },
    setDriverFlatRate5: (state, action) => {
      state.driverFlatRate5 = action.payload;
    },
    setDriverFlatRate6: (state, action) => {
      state.driverFlatRate6 = action.payload;
    },
    setDriverFlatRate7: (state, action) => {
      state.driverFlatRate7 = action.payload;
    },
    /*Flat rate-  Driver Reload Rate*/
    setDriverReloadFlatRate1: (state, action) => {
      state.driverReloadFlatRate1 = action.payload;
    },
    setDriverReloadFlatRate2: (state, action) => {
      state.driverReloadFlatRate2 = action.payload;
    },
    setDriverReloadFlatRate3: (state, action) => {
      state.driverReloadFlatRate3 = action.payload;
    },
    setDriverReloadFlatRate4: (state, action) => {
      state.driverReloadFlatRate4 = action.payload;
    },
    setDriverReloadFlatRate5: (state, action) => {
      state.driverReloadFlatRate5 = action.payload;
    },
    setDriverReloadFlatRate6: (state, action) => {
      state.driverReloadFlatRate6 = action.payload;
    },
    setDriverReloadFlatRate7: (state, action) => {
      state.driverReloadFlatRate7 = action.payload;
    },

    /* Flat rate-  Driver Return Rate*/
    setDriverReturnFlatRate1: (state, action) => {
      state.driverReturnFlatRate1 = action.payload;
    },
    setDriverReturnFlatRate2: (state, action) => {
      state.driverReturnFlatRate2 = action.payload;
    },
    setDriverReturnFlatRate3: (state, action) => {
      state.driverReturnFlatRate3 = action.payload;
    },
    setDriverReturnFlatRate4: (state, action) => {
      state.driverReturnFlatRate4 = action.payload;
    },
    setDriverReturnFlatRate5: (state, action) => {
      state.driverReturnFlatRate5 = action.payload;
    },
    setDriverReturnFlatRate6: (state, action) => {
      state.driverReturnFlatRate6 = action.payload;
    },
    setDriverReturnFlatRate7: (state, action) => {
      state.driverReturnFlatRate7 = action.payload;
    },
    setInvoiceFlatRateAddFS: (state, action) => {
      state.invoiceFlatRateAddFS = action.payload;
    },

    /*length tab*/
    setUnitLength1: (state, action) => {
      state.unitLength1 = action.payload;
    },
    setUnitLength2: (state, action) => {
      state.unitLength2 = action.payload;
    },
    setInvoiceLengthRate1: (state, action) => {
      state.invoiceLengthRate1 = action.payload;
    },
    setdriverLengthRate1: (state, action) => {
      state.driverLengthRate1 = action.payload;
    },
    setInvoiceLengthRate2: (state, action) => {
      state.invoiceLengthRate2 = action.payload;
    },
    setdriverLengthRate2: (state, action) => {
      state.driverLengthRate2 = action.payload;
    },
    setInvoiceLengthRate3: (state, action) => {
      state.invoiceLengthRate3 = action.payload;
    },
    setdriverLengthRate3: (state, action) => {
      state.driverLengthRate3 = action.payload;
    },
    setUseLengthTiersReload: (state, action) => {
      state.useLengthTiersReload = action.payload;
    },
    setUseLengthTiersReturns: (state, action) => {
      state.useLengthTiersReturns = action.payload;
    },
    /*minimum tab*/
    setInvoiceMinimumCharge: (state, action) => {
      state.invoiceMinimumCharge = action.payload;
    },
    setInvoiceMinimumMiles: (state, action) => {
      state.invoiceMinimumMiles = action.payload;
    },
    setInvoiceMinimumChargeReload: (state, action) => {
      state.invoiceMinimumChargeReload = action.payload;
    },
    setInvoiceMinimumMilesReload: (state, action) => {
      state.invoiceMinimumMilesReload = action.payload;
    },
    setInvoiceMinimumChargeReturn: (state, action) => {
      state.invoiceMinimumChargeReturn = action.payload;
    },
    setInvoiceMinimumMilesReturn: (state, action) => {
      state.invoiceMinimumMilesReturn = action.payload;
    },
    setInvoiceMinimumAsFlatrate: (state, action) => {
      state.invoiceMinimumAsFlatrate = action.payload;
    },
    setInvoiceMinimumAddFuelSurcharge: (state, action) => {
      state.invoiceMinimumAddFuelSurcharge = action.payload;
    },
    setDriverMinimumCharge: (state, action) => {
      state.driverMinimumCharge = action.payload;
    },
    setDriverMinimumMiles: (state, action) => {
      state.driverMinimumMiles = action.payload;
    },
    setDriverMinimumChargeReload: (state, action) => {
      state.driverMinimumChargeReload = action.payload;
    },
    setDriverMinimumMilesReload: (state, action) => {
      state.driverMinimumMilesReload = action.payload;
    },
    setDriverMinimumChargeReturn: (state, action) => {
      state.driverMinimumChargeReturn = action.payload;
    },
    setDriverMinimumMilesReturn: (state, action) => {
      state.driverMinimumMilesReturn = action.payload;
    },
    setDriverMinimumAsFlatRate: (state, action) => {
      state.driverMinimumAsFlatRate = action.payload;
    },
    /*surcharges tab*/
    setInvoiceFuelSurchargeGas: (state, action) => {
      state.invoiceFuelSurchargeGas = action.payload;
    },
    setInvoiceFuelSurchargeDiesel: (state, action) => {
      state.invoiceFuelSurchargeDiesel = action.payload;
    },
    setInvoiceFuelSurchargeGasCanada: (state, action) => {
      state.invoiceFuelSurchargeGasCanada = action.payload;
    },
    setInvoiceFuelSurchargeDieselCanada: (state, action) => {
      state.invoiceFuelSurchargeDieselCanada = action.payload;
    },
    setDriverFuelSurchargeGas: (state, action) => {
      state.driverFuelSurchargeGas = action.payload;
    },
    setDriverFuelSurchargeDiesel: (state, action) => {
      state.driverFuelSurchargeDiesel = action.payload;
    },
    setdriverFuelSurchargeGasCanada: (state, action) => {
      state.driverFuelSurchargeGasCanada = action.payload;
    },
    setdriverFuelSurchargeDieselCanada: (state, action) => {
      state.driverFuelSurchargeDieselCanada = action.payload;
    },
    setInvoiceApportionedSurcharge: (state, action) => {
      state.invoiceApportionedSurcharge = action.payload;
    },
    setInvoiceApportionedWeightCutoff: (state, action) => {
      state.invoiceApportionedWeightCutoff = action.payload;
    },
    setDriverApportionedSurcharge: (state, action) => {
      state.driverApportionedSurcharge = action.payload;
    },
    setDriverApportionedWeightCutoff: (state, action) => {
      state.driverApportionedWeightCutoff = action.payload;
    },
    setUseApportionedOnReloads: (state, action) => {
      state.useApportionedOnReloads = action.payload;
    },
    setUseApportionedOnReturns: (state, action) => {
      state.useApportionedOnReturns = action.payload;
    },
    setinvoiceCDLSurcharge: (state, action) => {
      state.invoiceCDLSurcharge = action.payload;
    },
    setInvoiceCDLSurchargeCanada: (state, action) => {
      state.invoiceCDLSurchargeCanada = action.payload;
    },
    setinvoiceCDLGVWRCutoff: (state, action) => {
      state.invoiceCDLGVWRCutoff = action.payload;
    },
    setinvoiceCDLLengthCutoff: (state, action) => {
      state.invoiceCDLLengthCutoff = action.payload;
    },
    setDriverCDLSurcharge: (state, action) => {
      state.driverCDLSurcharge = action.payload;
    },
    setDriverCDLSurchargeCanada: (state, action) => {
      state.driverCDLSurchargeCanada = action.payload;
    },
    setDriverCDLGVWRCutoff: (state, action) => {
      state.driverCDLGVWRCutoff = action.payload;
    },
    setDriverCDLLengthCutoff: (state, action) => {
      state.driverCDLLengthCutoff = action.payload;
    },
    setinvoiceCDLSurchargeB: (state, action) => {
      state.invoiceCDLSurchargeB = action.payload;
    },
    setInvoiceCDLSurchargeCanadaB: (state, action) => {
      state.invoiceCDLSurchargeCanadaB = action.payload;
    },
    setinvoiceCDLGVWRCutoffB: (state, action) => {
      state.invoiceCDLGVWRCutoffB = action.payload;
    },
    setinvoiceCDLLengthCutoffB: (state, action) => {
      state.invoiceCDLLengthCutoffB = action.payload;
    },
    setDriverCDLSurchargeB: (state, action) => {
      state.driverCDLSurchargeB = action.payload;
    },
    setDriverCDLSurchargeCanadaB: (state, action) => {
      state.driverCDLSurchargeCanadaB = action.payload;
    },
    setDriverCDLGVWRCutoffB: (state, action) => {
      state.driverCDLGVWRCutoffB = action.payload;
    },
    setDriverCDLLengthCutoffB: (state, action) => {
      state.driverCDLLengthCutoffB = action.payload;
    },
    setUseCDLReload: (state, action) => {
      state.useCDLReload = action.payload;
    },
    setUseCDLReturns: (state, action) => {
      state.useCDLReturns = action.payload;
    },
    /*Tab and save valid*/

    setIsGeneralTabValid: (state, action) => {
      state.isGeneralTabValid = action.payload;
    },
    setIsTiersTabValid: (state, action) => {
      state.isTiersTabValid = action.payload;
    },
    setIsTiersMileageTabValid: (state, action) => {
      state.isTiersMileageTabValid = action.payload;
    },
    setIsTiersFlatRateTabValid: (state, action) => {
      state.isTiersFlatRateTabValid = action.payload;
    },
    setIsTiersLengthTabValid: (state, action) => {
      state.isTiersLengthTabValid = action.payload;
    },
    setIsMinimumTabValid: (state, action) => {
      state.isMinimumTabValid = action.payload;
    },
    setIsSurchargesTabValid: (state, action) => {
      state.isSurchargesTabValid = action.payload;
    },
  },
});
export const {
  setCustomerRatesListData,
  setSearchTerms,
  setSearchCriteria,
  setChangeColor,
  setSelectId,
  setSortValue,
  setSortFlag,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setViewDetail,
  setChangesCancelled,
  setAdvancedSearchObject,
  setShowAdvanceSearch,
  setAdvancedSearchString,
  setAdvancedSearchByPayload,
  setCheckAllAdvancedSearchBy,
  setSearchCustomer,
  setSearchPlant,
  setSearchPlantGroup,
  setSearchCustomerGroup,
  setSearchUnitTypeGroup,
  setEditFormData,
  setSearchedData,
  setCustomerId,
  setCustomerInput,
  setCustomerSelection,
  setCustomerInvoicePercentage,
  setCustomerFK,
  setCustomerPlantId,
  setCustomerPlantInput,
  setCustomerPlantSelection,
  setCustomerPlantGroupId,
  setCustomerPlantGroupSelection,
  setCustomerPlantGroupInput,
  setCustomerGroupId,
  setCustomerGroupSelection,
  setCustomerGroupInput,
  setCustomerUnitTypeGroupId,
  setCustomerUnitTypeGroupSelection,
  setCustomerUnitTypeGroupInput,
  resetStates,
  resetGeneralTab,
  resetTiersMileageTab,
  resetTiersFlatrateTab,
  resetLengthTab,
  resetMinimumTab,
  resetSurchargesTab,
  /*general tab*/
  setCustomerRatePK,
  setWhichOne,
  setInvoiceRates,
  setDriverRates,
  setUseMilageTiers,
  setFlatRateTiers,
  setUseLengthTiers,
  setNumberOfUnitsMaximum,
  setNumberOfUnitsMinimum,
  setOutboundInvoiceRate,
  setReloadInvoiceRate,
  setReturnInvoiceRate,
  setOutboundDriverRate,
  setReloadDriverRate,
  setReturnDriverRate,
  setUpdateOutboundInvoiceRates,
  setUpdateReloadInvoiceRates,
  setUpdateReturnInvoiceRates,
  setUpdateOutboundDriverRates,
  setUpdateReloadDriverRates,
  setUpdateReturnDriverRates,
  setAllowLongUnitRate,
  setOneOfMany,
  /*Tiers Mileage Tab*/
  setMileageRateBreak1,
  setMileageRateBreak2,
  setMileageRateBreak3,
  setMileageRateBreak4,
  setMileageRateBreak5,
  setMileageRateBreak6,
  /* mileage rate*/
  /* mileage rate-  Invoice Rate*/
  setInvoiceRate1,
  setInvoiceRate2,
  setInvoiceRate3,
  setInvoiceRate4,
  setInvoiceRate5,
  setInvoiceRate6,
  setInvoiceRate7,
  /*mileage rate-  Invoice Reload Rate*/
  setInvoiceReloadRate1,
  setInvoiceReloadRate2,
  setInvoiceReloadRate3,
  setInvoiceReloadRate4,
  setInvoiceReloadRate5,
  setInvoiceReloadRate6,
  setInvoiceReloadRate7,
  /*mileage rate-  Invoice Return Rate*/
  setInvoiceReturnRate1,
  setInvoiceReturnRate2,
  setInvoiceReturnRate3,
  setInvoiceReturnRate4,
  setInvoiceReturnRate5,
  setInvoiceReturnRate6,
  setInvoiceReturnRate7,
  /*mileage rate-  Driver Rate*/
  setDriverRate1,
  setDriverRate2,
  setDriverRate3,
  setDriverRate4,
  setDriverRate5,
  setDriverRate6,
  setDriverRate7,
  /* mileage rate-  Driver Reload Rate*/
  setDriverReloadRate1,
  setDriverReloadRate2,
  setDriverReloadRate3,
  setDriverReloadRate4,
  setDriverReloadRate5,
  setDriverReloadRate6,
  setDriverReloadRate7,
  /*mileage rate-  Driver Return Rate*/
  setDriverReturnRate1,
  setDriverReturnRate2,
  setDriverReturnRate3,
  setDriverReturnRate4,
  setDriverReturnRate5,
  setDriverReturnRate6,
  setDriverReturnRate7,
  //Tiers Flatrate Tab
  /*Flat rate - Miles*/
  setFlatRateMileageBreak1,
  setFlatRateMileageBreak2,
  setFlatRateMileageBreak3,
  setFlatRateMileageBreak4,
  setFlatRateMileageBreak5,
  setFlatRateMileageBreak6,
  /*Flat rate-  Invoice Rate*/
  setInvoiceFlatRate1,
  setInvoiceFlatRate2,
  setInvoiceFlatRate3,
  setInvoiceFlatRate4,
  setInvoiceFlatRate5,
  setInvoiceFlatRate6,
  setInvoiceFlatRate7,
  /*Flat rate-  Invoice Reload*/
  setInvoiceReloadFlatRate1,
  setInvoiceReloadFlatRate2,
  setInvoiceReloadFlatRate3,
  setInvoiceReloadFlatRate4,
  setInvoiceReloadFlatRate5,
  setInvoiceReloadFlatRate6,
  setInvoiceReloadFlatRate7,
  /*Flat rate-  Invoice Return*/
  setInvoiceReturnFlatRate1,
  setInvoiceReturnFlatRate2,
  setInvoiceReturnFlatRate3,
  setInvoiceReturnFlatRate4,
  setInvoiceReturnFlatRate5,
  setInvoiceReturnFlatRate6,
  setInvoiceReturnFlatRate7,
  /*Flat rate-  Driver Rate*/
  setDriverFlatRate1,
  setDriverFlatRate2,
  setDriverFlatRate3,
  setDriverFlatRate4,
  setDriverFlatRate5,
  setDriverFlatRate6,
  setDriverFlatRate7,
  /*Flat rate-  Driver Reload Rate*/
  setDriverReloadFlatRate1,
  setDriverReloadFlatRate2,
  setDriverReloadFlatRate3,
  setDriverReloadFlatRate4,
  setDriverReloadFlatRate5,
  setDriverReloadFlatRate6,
  setDriverReloadFlatRate7,
  /*Flat rate-  Driver Return Rate*/
  setDriverReturnFlatRate1,
  setDriverReturnFlatRate2,
  setDriverReturnFlatRate3,
  setDriverReturnFlatRate4,
  setDriverReturnFlatRate5,
  setDriverReturnFlatRate6,
  setDriverReturnFlatRate7,
  setInvoiceFlatRateAddFS,

  /*length tab*/
  setUnitLength1,
  setUnitLength2,
  setInvoiceLengthRate1,
  setInvoiceLengthRate2,
  setInvoiceLengthRate3,
  setdriverLengthRate1,
  setdriverLengthRate2,
  setdriverLengthRate3,
  setUseLengthTiersReload,
  setUseLengthTiersReturns,
  /*minimum tab*/
  setInvoiceMinimumCharge,
  setInvoiceMinimumMiles,
  setInvoiceMinimumChargeReload,
  setInvoiceMinimumMilesReload,
  setInvoiceMinimumChargeReturn,
  setInvoiceMinimumMilesReturn,
  setInvoiceMinimumAsFlatrate,
  setInvoiceMinimumAddFuelSurcharge,
  setDriverMinimumCharge,
  setDriverMinimumMiles,
  setDriverMinimumChargeReload,
  setDriverMinimumMilesReload,
  setDriverMinimumChargeReturn,
  setDriverMinimumMilesReturn,
  setDriverMinimumAsFlatRate,
  /*surcharges*/
  setInvoiceFuelSurchargeGas,
  setInvoiceFuelSurchargeDiesel,
  setInvoiceFuelSurchargeGasCanada,
  setInvoiceFuelSurchargeDieselCanada,
  setDriverFuelSurchargeGas,
  setDriverFuelSurchargeDiesel,
  setdriverFuelSurchargeGasCanada,
  setdriverFuelSurchargeDieselCanada,
  setInvoiceApportionedSurcharge,
  setInvoiceApportionedWeightCutoff,
  setDriverApportionedSurcharge,
  setDriverApportionedWeightCutoff,
  setUseApportionedOnReloads,
  setUseApportionedOnReturns,
  setinvoiceCDLSurcharge,
  setInvoiceCDLSurchargeCanada,
  setinvoiceCDLGVWRCutoff,
  setinvoiceCDLLengthCutoff,
  setDriverCDLSurcharge,
  setDriverCDLSurchargeCanada,
  setDriverCDLLengthCutoff,
  setDriverCDLGVWRCutoff,
  setinvoiceCDLSurchargeB,
  setInvoiceCDLSurchargeCanadaB,
  setinvoiceCDLGVWRCutoffB,
  setinvoiceCDLLengthCutoffB,
  setDriverCDLSurchargeB,
  setDriverCDLSurchargeCanadaB,
  setDriverCDLLengthCutoffB,
  setDriverCDLGVWRCutoffB,
  setUseCDLReload,
  setUseCDLReturns,
  /*tab validation*/

  setIsGeneralTabValid,
  setIsTiersTabValid,
  setIsTiersMileageTabValid,
  setIsTiersFlatRateTabValid,
  setIsTiersLengthTabValid,
  setIsMinimumTabValid,
  setIsSurchargesTabValid,
  setCustomerRatesData,
  setIsCustomerRateLoading,
  setIsSelectedDuplicate,
} = CustomerRatesSlice.actions;
export default CustomerRatesSlice.reducer;
