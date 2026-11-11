import { createSlice } from "@reduxjs/toolkit";

const CustomerPlantMaintenanceSlice = createSlice({
  name: "plantmaintenanceslice",
  initialState: {
    customerPlantData: [],
    plantData: [],
    viewDetail: false,
    customerPlantSpecialCondition: "",
    editPlantData: null,
    plantFormData: null,
    customerFK: "",
    plantLoader: true,
    changesCancelled: false,
    clearValue: false,
    zipPostLenght: null,
    //Tabs Validation
    IsGeneralTabValid: true,
    IsSettingsTabValid: true,
    IsOrderDetailTabValid: true,
    IsOrderSettingTabValid: true,
    IsOrderSettingTabRequired: false,
    IsInvoiceSettingTabValid: true,
    IsInvoiceFeesTabRequired: false,
    IsInvoiceFeesTabValid: true,
    IsDelaysDelayTabValid: true,
    IsDelaysBreakdownTabValid: true,
    IsDelaysDamageTabValid: true,
    IsCustomerOrderTabValid: true,

    IsDelaysHotlineTabValid: true,
    IsDelaysHotlineTabRequired: false,
    IsPickupTabValid: true,
    IsPickupTabRequired: false,
    //general tab
    customerName: "",
    plantName: "",
    plantAddress: "",
    plantCity: "",
    plantStateCode: "",
    plantCanadian: false,
    plantPostCode: "",
    plantEstimatedUnit: "",
    plantytdunit: "",
    plantPhone: "",
    plantFax: "",
    plantCheckName: "",
    postalCodeOnChange: false,
    postalPK: null,
    //Settings tab

    settingInvoiceDpuPickupFee: "",
    settingInvoiceDpuPickup: false,
    settingMotorized: false,
    settingTowable: false,
    settingLongUnitRestriction: false,
    settingLongUnitRestrictionUnits: "",
    settingLongUnitRateUnits: "",
    settingLongUnitRate: "",
    settingLongUnitRateDescription: "",
    settingReloadDays: "",
    showUnitTypeGroupLookup: false,
    unitTypeGroupInput: "",
    unitTypeGroupFK: "",
    showPlantGroupLookup: false,
    plantGroupInput: "",
    plantGroupFK: "",
    issettingsAutocompleteValid: false,
    plantLogin: "",
    plantPassword: "",
    qualifyingUnitTypeGroupInput: "",
    qualifyingUnitTypeGroupId: null,
    settingsisterPlantCode: "",

    checkPlantCode: "",
    //Order/Details
    orderDetailsDispatcher: "",
    orderDetailsPhone: "",
    orderDetailsFAX: "",
    orderDetailsEmail: "",
    showBrockerLookup: false,
    brockerInput: "",
    brockerFK: "",
    //Order/Settings
    orderSettingsFAXBolAtOrderEntry: false,
    orderSettingsFAXbolatOrderEntryDPU: false,
    orderSettingsFAXBOLAtDispatch: false,
    orderSettingsFAXBOLAtDispatchDPU: false,
    orderSettingsBOLFaxNumber: "",
    orderSettingsPrintintBOLAtAlternateYard: false,
    showShuttleCityLookup: false,
    shuttleCityInput: "",
    shuttleCityFK: "",
    yardLookup: false,
    yardInput: "",
    settingYardFK: "",
    showAlternateYardLookup: false,
    alternateYardFK: "",
    alternateYardInput: "",
    orderEmailShuttleDelays: "",

    //Invoice/Settings
    invoiceSettingsInvoiceAttemptedPickup: "",
    invoiceSettingsDriverAttemptedPickup: "",
    invoiceSettingsInvoicePercentage: "",
    invoiceSettingsPercentageTruckingCompany: "",
    invoiceELDSettingsFeeCheckbox: false,
    invoiceSettingsELDFee: "",
    invoiceSettingsDriverELDFee: "",
    invoiceSettingsAskFlagsAndSignsCheckbox: false,
    invoiceSettingsInvoiceFlagsAndSigns: "",
    invoiceSettingsDriverFlagsAndSigns: "",
    //Invoice/Fees
    invoiceFeesInvoice2unitUnloadFee: "",
    invoiceFeesDriver2UnitUnloadFee: "",
    invoiceFeesUnit2UnloadFeeDescription: "",
    invoiceFeesInvoice3PlusUnitUnloadFee: "",
    invoiceFeesDriver3PlusUnitUnloadFee: "",
    invoiceFeesPlus3UnitUnloadFeeDescription: "",
    invoiceFeesInvoicePopupUnloadFee: "",
    invoiceFeesDriverPopupUnloadFee: "",
    invoiceFeesPopupUnloadFeeDescription: "",
    invoiceFeesInvoiceUSSurcharge: "",
    invoiceFeesDriverUSSurcharge: "",
    invoiceFeesUsSurchargeDescription: "",
    invoiceFeesInvoiceCanadianSurcharge: "",
    invoiceFeesDriverCanadianSurcharge: "",
    invoiceFeesCanadianSurchargeDescription: "",
    invoiceFeesInvoiceSplitDropUnloadFee: "",
    invoiceFeesDriverSplitDropUnloadFee: "",
    invoiceFeesPopupSplitDropFeeDescription: "",
    //Delays/Delay
    delaysDelayContact: "",
    delaysDelayPhone: "",
    delaysDelayFAXDelayUpdates: false,
    delaysDelayFAX: "",
    delaysDelayPhoneExtn: "",

    //Delays/Breakdown
    delaysBreakdown: "",
    delaysBreakdownPhone: "",
    delaysbreakdownPhoneExtension: "",
    delaysBreakdownFAXbreakdownUpdates: false,
    delaysBreakdownFAX: "",

    //Delays/Damage
    delaysDamageContact: "",
    delaysDamagePhone: "",
    delaysFaxDamageUpdates: false,
    delaysDamageFAX: "",
    delaysDamagePhoneExtension: "",

    //Delays/Hotline
    delaysHotlineDescription: "",
    delayHotlinePhone: "",
    //PickupLot

    pickupLotSupervisorPhone: "",
    pickupLotSupervisorEmail: "",
    pickupLotPointContactEmail: "",
    pickupLotPointContactPhone: "",
    pickupLotPointContactPhoneExtn: "",
    pickupLotSupervisorPhoneExtn: "",

    onCancel: false,
    //For loading
    isCustomerPlantLoading: false,
    //customer tab
    orderPlantCodeNew: "",
    //Autocomplete Implementation for outbound
    outbound: false,
    lastOrderDateValid: false,
    isSettingPlantLoading: false,
    isSettingLongUnitLoading: false,
    isSettingQualifyingLongLoading: false,
  },

  reducers: {
    resetChanges: (state, action) => {
      state.unitTypeGroupFK = "";
      state.unitTypeGroupInput = "";
      state.plantGroupInput = "";
      state.plantGroupFK = "";
      state.shuttleCityFK = "";
      state.shuttleCityInput = "";
      state.yardInput = "";
      state.settingYardFK = "";
      state.alternateYardFK = "";
      state.alternateYardInput = "";
      state.brockerInput = "";
      state.brockerFK = "";
      state.qualifyingUnitTypeGroupId = null;
      state.qualifyingUnitTypeGroupInput = "";
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setPlantLoader: (state, action) => {
      state.plantLoader = action.payload;
    },
    setPlantData: (state, action) => {
      state.plantData = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setCustomerPlantSpecialCondition: (state, action) => {
      state.customerPlantSpecialCondition = action.payload;
    },
    setCustomerPlantData: (state, action) => {
      state.customerPlantData = action.payload;
    },
    setEditPlantData: (state, action) => {
      state.editPlantData = action.payload;
    },

    setPlantFormData: (state, action) => {
      let payload = action.payload;
      state.plantFormData = { ...state.plantFormData, ...payload };
    },

    setCustomerFK: (state, action) => {
      state.customerFK = action.payload;
    },
    setClearValue: (state, action) => {
      state.clearValue = action.payload;
    },
    //Tabs Validation
    setIsGeneralTabValid: (state, action) => {
      state.IsGeneralTabValid = action.payload;
    },
    setIsSettingsTabValid: (state, action) => {
      state.IsSettingsTabValid = action.payload;
    },
    setIsOrderDetailTabValid: (state, action) => {
      state.IsOrderDetailTabValid = action.payload;
    },
    setIsOrderSettingTabValid: (state, action) => {
      state.IsOrderSettingTabValid = action.payload;
    },
    setIsInvoiceSettingTabValid: (state, action) => {
      state.IsInvoiceSettingTabValid = action.payload;
    },
    setIsInvoiceFeesTabValid: (state, action) => {
      state.IsInvoiceFeesTabValid = action.payload;
    },
    setIsDelaysDelayTabValid: (state, action) => {
      state.IsDelaysDelayTabValid = action.payload;
    },
    setIsDelaysBreakdownTabValid: (state, action) => {
      state.IsDelaysBreakdownTabValid = action.payload;
    },
    setIsDelaysDamageTabValid: (state, action) => {
      state.IsDelaysDamageTabValid = action.payload;
    },
    setIsDelaysHotlineTabValid: (state, action) => {
      state.IsDelaysHotlineTabValid = action.payload;
    },
    setIsInvoiceFeesTabRequired: (state, action) => {
      state.IsInvoiceFeesTabRequired = action.payload;
    },
    setIsOrderSettingTabRequired: (state, action) => {
      state.IsOrderSettingTabRequired = action.payload;
    },
    setIsDelaysHotlineTabRequired: (state, action) => {
      state.IsDelaysHotlineTabRequired = action.payload;
    },

    setIsPickupTabValid: (state, action) => {
      state.IsPickupTabValid = action.payload;
    },
    setIsPickupTabRequired: (state, action) => {
      state.IsPickupTabRequired = action.payload;
    },
    setIsCustomerOrderTabValid: (state, action) => {
      state.IsCustomerOrderTabValid = action.payload;
    },
    //general tab
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
    setPlantName: (state, action) => {
      state.plantName = action.payload;
    },
    setPlantAddress: (state, action) => {
      state.plantAddress = action.payload;
    },

    setPlantCity: (state, action) => {
      state.plantCity = action.payload;
    },
    setPlantStateCode: (state, action) => {
      state.plantStateCode = action.payload;
    },
    setPlantCanadian: (state, action) => {
      state.plantCanadian = action.payload;
    },
    setPlantPostCode: (state, action) => {
      state.plantPostCode = action.payload;
    },
    setDealerZipPostLenght: (state, action) => {
      state.zipPostLenght = action.payload;
    },
    setPlantEstimateUnit: (state, action) => {
      state.plantEstimatedUnit = action.payload;
    },
    setplantYtdunit: (state, action) => {
      state.plantytdunit = action.payload;
    },
    setPlantPhone: (state, action) => {
      state.plantPhone = action.payload;
    },
    setPlantFax: (state, action) => {
      state.plantFax = action.payload;
    },
    setPlantCheckName: (state, action) => {
      state.plantCheckName = action.payload;
    },
    setPostalPK: (state, action) => {
      state.postalPK = action.payload;
    },
    //Settings tab

    setSettingReloadDays: (state, action) => {
      state.settingReloadDays = action.payload;
    },
    setSettingInvoiceDpuPickupFee: (state, action) => {
      state.settingInvoiceDpuPickupFee = action.payload;
    },
    setSettingInvoiceDpuPickup: (state, action) => {
      state.settingInvoiceDpuPickup = action.payload;
    },
    setSettingMotorized: (state, action) => {
      state.settingMotorized = action.payload;
    },
    setSettingTowable: (state, action) => {
      state.settingTowable = action.payload;
    },
    setSettingLongUnitRestriction: (state, action) => {
      state.settingLongUnitRestriction = action.payload;
    },
    setSettingLongUnitRestrictionUnits: (state, action) => {
      state.settingLongUnitRestrictionUnits = action.payload;
    },
    setSettingLongUnitRateUnits: (state, action) => {
      state.settingLongUnitRateUnits = action.payload;
    },
    setSettingLongUnitRate: (state, action) => {
      state.settingLongUnitRate = action.payload;
    },
    setSettingLongUnitRateDescription: (state, action) => {
      state.settingLongUnitRateDescription = action.payload;
    },

    setShowUnitTypeGroupLookup: (state, action) => {
      state.showUnitTypeGroupLookup = action.payload;
    },
    setUnitTypeGroupFK: (state, action) => {
      state.unitTypeGroupFK = action.payload;
    },
    setUnitTypeGroupInput: (state, action) => {
      state.unitTypeGroupInput = action.payload;
    },
    setQualifyingUnitTypeGroupId: (state, action) => {
      state.qualifyingUnitTypeGroupId = action.payload;
    },
    setQualifyingUnitTypeGroupInput: (state, action) => {
      state.qualifyingUnitTypeGroupInput = action.payload;
    },

    setShowPlantGroupLookup: (state, action) => {
      state.showPlantGroupLookup = action.payload;
    },
    setPlantGroupInput: (state, action) => {
      state.plantGroupInput = action.payload;
    },
    setPlantGroupFK: (state, action) => {
      state.plantGroupFK = action.payload;
    },
    setPlantLogin: (state, action) => {
      state.plantLogin = action.payload;
    },
    setPlantPassword: (state, action) => {
      state.plantPassword = action.payload;
    },
    setPostalCodeOnChange: (state, action) => {
      state.postalCodeOnChange = action.payload;
    },

    setCheckPlantCode: (state, action) => {
      state.checkPlantCode = action.payload;
    },
    setSettingsisterPlantCode: (state, action) => {
      state.settingsisterPlantCode = action.payload;
    },

    //order/deatils
    setOrderDetailsDispatcher: (state, action) => {
      state.orderDetailsDispatcher = action.payload;
    },

    setOrderDetailsPhone: (state, action) => {
      state.orderDetailsPhone = action.payload;
    },

    setOrderDetailsFAX: (state, action) => {
      state.orderDetailsFAX = action.payload;
    },

    setOrderDetailsEmail: (state, action) => {
      state.orderDetailsEmail = action.payload;
    },
    setShowBrockerLookup: (state, action) => {
      state.showBrockerLookup = action.payload;
    },
    setBrockerInput: (state, action) => {
      state.brockerInput = action.payload;
    },
    setBrockerFK: (state, action) => {
      state.brockerFK = action.payload;
    },
    //Order/Settings

    setOrderSettingsFAXBolAtOrderEntry: (state, action) => {
      state.orderSettingsFAXBolAtOrderEntry = action.payload;
    },
    setOrderSettingsFAXbolatOrderEntryDPU: (state, action) => {
      state.orderSettingsFAXbolatOrderEntryDPU = action.payload;
    },
    setOrderSettingsFAXBOLAtDispatch: (state, action) => {
      state.orderSettingsFAXBOLAtDispatch = action.payload;
    },
    setOrderSettingsFAXBOLAtDispatchDPU: (state, action) => {
      state.orderSettingsFAXBOLAtDispatchDPU = action.payload;
    },
    setOrderSettingsBOLFaxNumber: (state, action) => {
      state.orderSettingsBOLFaxNumber = action.payload;
    },
    setOrderSettingsPrintintBOLAtAlternateYard: (state, action) => {
      state.orderSettingsPrintintBOLAtAlternateYard = action.payload;
    },

    setShowShuttleCityLookup: (state, action) => {
      state.showShuttleCityLookup = action.payload;
    },
    setShuttleCityInput: (state, action) => {
      state.shuttleCityInput = action.payload;
    },
    setShuttleCityFK: (state, action) => {
      state.shuttleCityFK = action.payload;
    },
    setOrderEmailShuttleDelays: (state, action) => {
      state.orderEmailShuttleDelays = action.payload;
    },

    setYardLookup: (state, action) => {
      state.yardLookup = action.payload;
    },
    setYardInput: (state, action) => {
      state.yardInput = action.payload;
    },
    setSettingYardFK: (state, action) => {
      state.settingYardFK = action.payload;
    },
    setShowAlternateYardLookup: (state, action) => {
      state.showAlternateYardLookup = action.payload;
    },
    setAlternateYardFK: (state, action) => {
      state.alternateYardFK = action.payload;
    },
    setAlternateYardInput: (state, action) => {
      state.alternateYardInput = action.payload;
    },

    //Invoice/Settings

    setInvoiceSettingsELDFeeCheckbox: (state, action) => {
      state.invoiceELDSettingsFeeCheckbox = action.payload;
    },

    setInvoiceSettingsELDFee: (state, action) => {
      state.invoiceSettingsELDFee = action.payload;
    },

    setInvoiceSettingsDriverELDFee: (state, action) => {
      state.invoiceSettingsDriverELDFee = action.payload;
    },
    setInvoiceSettingsAskFlagsAndSignsCheckbox: (state, action) => {
      state.invoiceSettingsAskFlagsAndSignsCheckbox = action.payload;
    },
    setInvoiceSettingsInvoiceFlagsAndSigns: (state, action) => {
      state.invoiceSettingsInvoiceFlagsAndSigns = action.payload;
    },
    setInvoiceSettingsDriverFlagsAndSigns: (state, action) => {
      state.invoiceSettingsDriverFlagsAndSigns = action.payload;
    },
    setInvoiceSettingsInvoiceAttemptedPickup: (state, action) => {
      state.invoiceSettingsInvoiceAttemptedPickup = action.payload;
    },
    setInvoiceSettingsDriverAttemptedPickup: (state, action) => {
      state.invoiceSettingsDriverAttemptedPickup = action.payload;
    },
    setInvoiceSettingsInvoicePercentage: (state, action) => {
      state.invoiceSettingsInvoicePercentage = action.payload;
    },
    setInvoiceSettingsPercentageTruckingCompany: (state, action) => {
      state.invoiceSettingsPercentageTruckingCompany = action.payload;
    },
    //Invoice/Fees

    setInvoiceFeesInvoice2unitUnloadFee: (state, action) => {
      state.invoiceFeesInvoice2unitUnloadFee = action.payload;
    },
    setInvoiceFeesDriver2UnitUnloadFee: (state, action) => {
      state.invoiceFeesDriver2UnitUnloadFee = action.payload;
    },
    setInvoiceFeesUnit2UnloadFeeDescription: (state, action) => {
      state.invoiceFeesUnit2UnloadFeeDescription = action.payload;
    },
    setInvoiceFeesInvoice3PlusUnitUnloadFee: (state, action) => {
      state.invoiceFeesInvoice3PlusUnitUnloadFee = action.payload;
    },
    setInvoiceFeesDriver3PlusUnitUnloadFee: (state, action) => {
      state.invoiceFeesDriver3PlusUnitUnloadFee = action.payload;
    },
    setInvoiceFeesPlus3UnitUnloadFeeDescription: (state, action) => {
      state.invoiceFeesPlus3UnitUnloadFeeDescription = action.payload;
    },
    setInvoiceFeesInvoicePopupUnloadFee: (state, action) => {
      state.invoiceFeesInvoicePopupUnloadFee = action.payload;
    },
    setInvoiceFeesDriverPopupUnloadFee: (state, action) => {
      state.invoiceFeesDriverPopupUnloadFee = action.payload;
    },
    setInvoiceFeesPopupUnloadFeeDescription: (state, action) => {
      state.invoiceFeesPopupUnloadFeeDescription = action.payload;
    },
    setInvoiceFeesInvoiceUSSurcharge: (state, action) => {
      state.invoiceFeesInvoiceUSSurcharge = action.payload;
    },
    setInvoiceFeesDriverUSSurcharge: (state, action) => {
      state.invoiceFeesDriverUSSurcharge = action.payload;
    },
    setInvoiceFeesUsSurchargeDescription: (state, action) => {
      state.invoiceFeesUsSurchargeDescription = action.payload;
    },
    setInvoiceFeesInvoiceCanadianSurcharge: (state, action) => {
      state.invoiceFeesInvoiceCanadianSurcharge = action.payload;
    },
    setInvoiceFeesDriverCanadianSurcharge: (state, action) => {
      state.invoiceFeesDriverCanadianSurcharge = action.payload;
    },
    setInvoiceFeesCanadianSurchargeDescription: (state, action) => {
      state.invoiceFeesCanadianSurchargeDescription = action.payload;
    },
    setInvoiceFeesInvoiceSplitDropUnloadFee: (state, action) => {
      state.invoiceFeesInvoiceSplitDropUnloadFee = action.payload;
    },
    setInvoiceFeesDriverSplitDropUnloadFee: (state, action) => {
      state.invoiceFeesDriverSplitDropUnloadFee = action.payload;
    },
    setInvoiceFeesPopupSplitDropFeeDescription: (state, action) => {
      state.invoiceFeesPopupSplitDropFeeDescription = action.payload;
    },
    //Delays/Delay
    setDelaysDelayContact: (state, action) => {
      state.delaysDelayContact = action.payload;
    },

    setDelaysDelayPhone: (state, action) => {
      state.delaysDelayPhone = action.payload;
    },

    setDelaysDelayFAXDelayUpdates: (state, action) => {
      state.delaysDelayFAXDelayUpdates = action.payload;
    },

    setDelaysDelayFAX: (state, action) => {
      state.delaysDelayFAX = action.payload;
    },

    //Delays/Breakdown
    setDelaysBreakdown: (state, action) => {
      state.delaysBreakdown = action.payload;
    },

    setDelaysBreakdownPhone: (state, action) => {
      state.delaysBreakdownPhone = action.payload;
    },

    setDelaysBreakdownFAXbreakdownUpdates: (state, action) => {
      state.delaysBreakdownFAXbreakdownUpdates = action.payload;
    },

    setDelaysBreakdownFAX: (state, action) => {
      state.delaysBreakdownFAX = action.payload;
    },

    //Delays/Damage
    setDelaysDamageContact: (state, action) => {
      state.delaysDamageContact = action.payload;
    },
    setDelaysDamagePhone: (state, action) => {
      state.delaysDamagePhone = action.payload;
    },

    setDelaysFaxDamageUpdates: (state, action) => {
      state.delaysFaxDamageUpdates = action.payload;
    },

    setDelaysDamageFAX: (state, action) => {
      state.delaysDamageFAX = action.payload;
    },

    //Delays/Hotline
    setDelaysHotlineDescription: (state, action) => {
      state.delaysHotlineDescription = action.payload;
    },

    setDelayHotlinePhone: (state, action) => {
      state.delayHotlinePhone = action.payload;
    },
    //PickupLot

    setPickupLotSupervisorPhone: (state, action) => {
      state.pickupLotSupervisorPhone = action.payload;
    },

    setPickupLotSupervisorEmail: (state, action) => {
      state.pickupLotSupervisorEmail = action.payload;
    },

    setPickupLotPointContactEmail: (state, action) => {
      state.pickupLotPointContactEmail = action.payload;
    },
    setPickupLotPointContactPhone: (state, action) => {
      state.pickupLotPointContactPhone = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    //for loading
    setIsCustomerPlantLoading: (state, action) => {
      state.isCustomerPlantLoading = action.payload;
    },

    //customer tab
    setOrderPlantCodeNew: (state, action) => {
      state.orderPlantCodeNew = action.payload;
    },
    setOutbound: (state, action) => {
      state.outbound = action.payload;
    },
    setLastOrderDateValid: (state, action) => {
      state.lastOrderDateValid = action.payload;
    },
    setDelaysBreakdownPhoneExtension: (state, action) => {
      state.delaysbreakdownPhoneExtension = action.payload;
    },
    setDelaysDamagePhoneExtension: (state, action) => {
      state.delaysDamagePhoneExtension = action.payload;
    },
    setDelaysDelayPhoneExtn: (state, action) => {
      state.delaysDelayPhoneExtn = action.payload;
    },
    setPickupLotSupervisorPhoneExtn: (state, action) => {
      state.pickupLotSupervisorPhoneExtn = action.payload;
    },
    setPickupLotPointContactPhoneExtn: (state, action) => {
      state.pickupLotPointContactPhoneExtn = action.payload;
    },
    setIsSettingPlantLoading: (state, action) => {
      state.isSettingPlantLoading = action.payload;
    },
    setIsSettingLongUnitLoading: (state, action) => {
      state.isSettingLongUnitLoading = action.payload;
    },
    setIsSettingQualifyingLongLoading: (state, action) => {
      state.isSettingQualifyingLongLoading = action.payload;
    },
  },
});

export const {
  toggleChangesCancelled,
  resetChanges,
  setCustomerFK,
  setCustomerName,
  setPlantData,
  setViewDetail,
  setCustomerPlantSpecialCondition,
  setCustomerPlantData,
  setEditPlantData,
  setPostalPK,
  setPlantFormData,
  setPlantAddress,
  setPlantName,
  setPlantLoader,
  setOrderPlantCodeNew,
  setClearValue,
  setSettingsisterPlantCode,
  setIsGeneralTabValid,
  setIsSettingsTabValid,
  setIsOrderDetailTabValid,
  setIsOrderSettingTabValid,
  setIsInvoiceSettingTabValid,
  setIsInvoiceFeesTabValid,
  setIsDelaysDelayTabValid,
  setIsDelaysBreakdownTabValid,
  setIsCustomerOrderTabValid,
  setIsDelaysDamageTabValid,
  setIsDelaysHotlineTabValid,
  setIsInvoiceFeesTabRequired,
  setIsOrderSettingTabRequired,
  setIsDelaysHotlineTabRequired,
  setIsPickupTabRequired,
  setIsPickupTabValid,
  setPlantCity,
  setPlantStateCode,
  setPlantCanadian,
  setPlantPostCode,
  setPlantPhone,
  setPlantFax,
  setPlantCheckName,
  setplantYtdunit,
  setPlantEstimateUnit,
  setSettingInvoiceDpuPickupFee,
  setSettingMotorized,
  setSettingTowable,
  setSettingReloadDays,
  setSettingLongUnitRate,
  setQualifyingUnitTypeGroupInput,
  setQualifyingUnitTypeGroupId,
  setSettingLongUnitRestriction,
  setSettingLongUnitRestrictionUnits,
  setSettingLongUnitRateUnits,
  setSettingLongUnitRateDescription,
  setUnitTypeGroupFK,
  setSettingInvoiceDpuPickup,
  setShowUnitTypeGroupLookup,
  setUnitTypeGroupInput,
  setShowPlantGroupLookup,
  setPlantGroupInput,
  setPlantGroupFK,
  setPlantLogin,
  setPlantPassword,
  setCheckPlantCode,
  setOrderDetailsDispatcher,
  setOrderDetailsPhone,
  setOrderDetailsEmail,
  setOrderDetailsFAX,
  setOrderSettingsFAXBolAtOrderEntry,
  setOrderSettingsFAXbolatOrderEntryDPU,
  setOrderSettingsFAXBOLAtDispatch,
  setOrderSettingsFAXBOLAtDispatchDPU,
  setOrderSettingsBOLFaxNumber,
  setShowShuttleCityLookup,
  setShuttleCityInput,
  setShuttleCityFK,
  setOrderEmailShuttleDelays,
  setYardLookup,
  setYardInput,
  setSettingYardFK,
  setShowAlternateYardLookup,
  setAlternateYardFK,
  setAlternateYardInput,
  setShowBrockerLookup,
  setBrockerFK,
  setBrockerInput,
  setOrderSettingsPrintintBOLAtAlternateYard,
  setInvoiceSettingsELDFeeCheckbox,
  setInvoiceSettingsELDFee,
  setInvoiceSettingsDriverELDFee,
  setInvoiceSettingsAskFlagsAndSignsCheckbox,
  setInvoiceSettingsInvoiceFlagsAndSigns,
  setInvoiceSettingsDriverFlagsAndSigns,
  setInvoiceSettingsInvoiceAttemptedPickup,
  setInvoiceSettingsDriverAttemptedPickup,
  setInvoiceSettingsInvoicePercentage,
  setInvoiceSettingsPercentageTruckingCompany,
  setInvoiceFeesInvoice2unitUnloadFee,
  setInvoiceFeesDriver2UnitUnloadFee,
  setInvoiceFeesUnit2UnloadFeeDescription,
  setInvoiceFeesInvoice3PlusUnitUnloadFee,
  setInvoiceFeesDriver3PlusUnitUnloadFee,
  setInvoiceFeesPlus3UnitUnloadFeeDescription,
  setInvoiceFeesInvoicePopupUnloadFee,
  setInvoiceFeesDriverPopupUnloadFee,
  setInvoiceFeesPopupUnloadFeeDescription,
  setInvoiceFeesInvoiceUSSurcharge,
  setInvoiceFeesDriverUSSurcharge,
  setInvoiceFeesUsSurchargeDescription,
  setInvoiceFeesInvoiceCanadianSurcharge,
  setInvoiceFeesDriverCanadianSurcharge,
  setInvoiceFeesCanadianSurchargeDescription,
  setInvoiceFeesInvoiceSplitDropUnloadFee,
  setInvoiceFeesDriverSplitDropUnloadFee,
  setInvoiceFeesPopupSplitDropFeeDescription,
  setDelaysDelayContact,
  setDelaysDelayPhone,
  setDelaysDelayFAXDelayUpdates,
  setDelaysDelayFAX,
  setDelaysBreakdown,
  setDelaysBreakdownPhone,
  setDelaysBreakdownFAXbreakdownUpdates,
  setDelaysBreakdownFAX,
  setDelaysDamageContact,
  setDelaysDamagePhone,
  setDelaysFaxDamageUpdates,
  setDelaysDamageFAX,
  setDelaysHotlineDescription,
  setDelayHotlinePhone,
  setPickupLotSupervisorEmail,
  setPickupLotSupervisorPhone,
  setPickupLotPointContactEmail,
  setPickupLotPointContactPhone,
  setPostalCodeOnChange,
  setDealerZipPostLenght,
  setOnCancel,
  setIsCustomerPlantLoading,
  setOutbound,
  setLastOrderDateValid,
  setBreakdownPhone,
  setDelaysBreakdownPhoneExtension,
  setDelaysDamagePhoneExtension,
  setDelaysDelayPhoneExtn,
  setPickupLotSupervisorPhoneExtn,
  setPickupLotPointContactPhoneExtn,
  setIsSettingPlantLoading,
  setIsSettingLongUnitLoading,
  setIsSettingQualifyingLongLoading,
} = CustomerPlantMaintenanceSlice.actions;

export default CustomerPlantMaintenanceSlice.reducer;
