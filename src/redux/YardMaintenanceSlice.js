import { createSlice } from "@reduxjs/toolkit";

const YardMaintenanceSlice = createSlice({
  name: "yard",
  initialState: {
    id: "",
    changeColor: false,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    browseNavigation: [],
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    selectedStatus: "Active",
    viewDetail: false,
    yardData: [],
    editYardData: null,
    yardFormData: null,
    loader: true,
    yardZipLength: "",
    yardCityLength: "",
    changesCancelled: false,
    clearValue: false,
    normalSortValue: null,
    normalSortFlag: false,

    //General Tab
    yardDescription: "",
    yardName: "",
    yardAddress: "",
    yardCity: "",
    yardStatecode: "",
    yardCanadian: false,
    yardPostcode: "",
    yardPhone: "",
    yardFax: "",
    checkDEscriptionExist: "",
    showDealerLookup: false,
    dealerInput: "",
    dealerLookupFK: "",
    userInput: "",
    userLookupFK: "",
    userManagerInput: "",
    showSupervisorLookup: false,
    showManagerLookup: false,
    userManagerFK: "",
    postalCodeOnChange: false,
    yardSisterCode: "",
    checkYardCode: false,
    yardPostalCodePK: null,
    //Settings Tab
    yardOutbound: false,
    yardReload: false,
    yardNewPrinter: "",
    yardHasPrinter: false,
    showPrinterLookup: false,
    printerInput: "",
    printerFK: "",
    showBolPrinterLookup: false,
    bolPrinterInput: "",
    bolPrinterFK: "",
    showKioskPrinterLookup: false,
    kioskPrinterInput: "",
    kioskPrinterFK: "",
    yardDriverMilesAdjustment: "",
    yardInvoiceMilesAdjustment: "",
    yardCapacity: "",
    yardAcres: "",
    accessGroup: "",
    yardHasOpener: false,
    //Tab Validation
    isGeneralTabValid: true,
    isSettingsTabValid: true,
    isSettingsTabRequired: false,
    isSettingColor: true,
    onCancel: false,
    yardLoading: false,
  },

  reducers: {
    resetChanges: (state, action) => {
      state.dealerInput = "";
      state.dealerLookupFK = "";
      state.userLookupFK = "";
      state.userManagerFK = "";
      state.userManagerInput = "";
      state.userInput = "";
      state.printerFK = "";
      state.printerInput = "";
      state.bolPrinterFK = "";
      state.bolPrinterInput = "";
      state.kioskPrinterFK = "";
      state.kioskPrinterInput = "";
      state.accessGroup = "";
    },
    resetClose: (state, action) => {
      state.selectedStatus = "Active";
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
    setYardDescription: (state, action) => {
      state.yardDescription = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },

    setId: (state, action) => {
      state.id = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
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

    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setYardData: (state, action) => {
      state.yardData = action.payload;
    },
    setEditYardData: (state, action) => {
      state.editYardData = action.payload;
    },
    setYardFormData: (state, action) => {
      let payload = action.payload;
      state.yardFormData = { ...state.yardFormData, ...payload };
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setClearValue: (state, action) => {
      state.clearValue = !state.clearValue;
    },
    //General Tab
    setYardZipLength: (state, action) => {
      state.yardZipLength = action.payload;
    },
    setYardCityLength: (state, action) => {
      state.yardCityLength = action.payload;
    },
    setYardName: (state, action) => {
      state.yardName = action.payload;
    },
    setYardAddress: (state, action) => {
      state.yardAddress = action.payload;
    },
    setYardCity: (state, action) => {
      state.yardCity = action.payload;
    },
    setYardStatecode: (state, action) => {
      state.yardStatecode = action.payload;
    },
    setYardCanadian: (state, action) => {
      state.yardCanadian = action.payload;
    },
    setYardPostcode: (state, action) => {
      state.yardPostcode = action.payload;
    },
    setYardPhone: (state, action) => {
      state.yardPhone = action.payload;
    },
    setYardFax: (state, action) => {
      state.yardFax = action.payload;
    },
    setCheckDEscriptionExist: (state, action) => {
      state.checkDEscriptionExist = action.payload;
    },
    setShowDealerLookup: (state, action) => {
      state.showDealerLookup = action.payload;
    },
    setDealerInput: (state, action) => {
      state.dealerInput = action.payload;
    },
    setDealerLookupFK: (state, action) => {
      state.dealerLookupFK = action.payload;
    },
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    setUserLookupFK: (state, action) => {
      state.userLookupFK = action.payload;
    },
    setUserManagerInput: (state, action) => {
      state.userManagerInput = action.payload;
    },
    setUserManagerFK: (state, action) => {
      state.userManagerFK = action.payload;
    },
    setShowSupervisorLookup: (state, action) => {
      state.showSupervisorLookup = action.payload;
    },
    setShowManagerLookup: (state, action) => {
      state.showManagerLookup = action.payload;
    },
    setPostalCodeOnChange: (state, action) => {
      state.postalCodeOnChange = action.payload;
    },
    setYardSisterCode: (state, action) => {
      state.yardSisterCode = action.payload;
    },
    setCheckYardCode: (state, action) => {
      state.checkYardCode = action.payload;
    },
    setYardPostalCodePK: (state, action) => {
      state.yardPostalCodePK = action.payload;
    },
    //settings
    setYardNewPrinter: (state, action) => {
      state.yardNewPrinter = action.payload;
    },

    setYardHasPrinter: (state, action) => {
      state.yardHasPrinter = action.payload;
    },
    setYardOutbound: (state, action) => {
      state.yardOutbound = action.payload;
    },
    setYardReload: (state, action) => {
      state.yardReload = action.payload;
    },

    setShowPrinterLookup: (state, action) => {
      state.showPrinterLookup = action.payload;
    },
    setPrinterInput: (state, action) => {
      state.printerInput = action.payload;
    },
    setPrinterFK: (state, action) => {
      state.printerFK = action.payload;
    },
    setShowBolPrinterLookup: (state, action) => {
      state.showBolPrinterLookup = action.payload;
    },
    setBolPrinterInput: (state, action) => {
      state.bolPrinterInput = action.payload;
    },
    setBolPrinterFK: (state, action) => {
      state.bolPrinterFK = action.payload;
    },
    setShowKioskPrinterLookup: (state, action) => {
      state.showKioskPrinterLookup = action.payload;
    },
    setKioskPrinterInput: (state, action) => {
      state.kioskPrinterInput = action.payload;
    },
    setKioskPrinterFK: (state, action) => {
      state.kioskPrinterFK = action.payload;
    },
    resetYard: (state, action) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.checkPayToData = [];
    },
    setYardDriverMilesAdjustment: (state, action) => {
      state.yardDriverMilesAdjustment = action.payload;
    },
    setYardInvoiceMilesAdjustment: (state, action) => {
      state.yardInvoiceMilesAdjustment = action.payload;
    },
    setYardCapacity: (state, action) => {
      state.yardCapacity = action.payload;
    },
    setYardAcres: (state, action) => {
      state.yardAcres = action.payload;
    },
    setAccessGroup: (state, action) => {
      state.accessGroup = action.payload;
    },
    setYardHasOpener: (state, action) => {
      state.yardHasOpener = action.payload;
    },
    //tab validation
    setIsGeneralTabValid: (state, action) => {
      state.isGeneralTabValid = action.payload;
    },
    setIsSettingsTabValid: (state, action) => {
      state.isSettingsTabValid = action.payload;
    },
    setIsSettingsTabRequired: (state, action) => {
      state.isSettingsTabRequired = action.payload;
    },
    setIsSettingColor: (state, action) => {
      state.isSettingColor = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setYardLoading: (state, action) => {
      state.yardLoading = action.payload;
    },
  },
});

export const {
  toggleChangesCancelled,
  setClearValue,
  resetChanges,
  resetClose,
  setNotes,
  setId,
  setChangeColor,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setBrowseNavigation,
  setSearchTerm,
  setSelectedSearchCriteria,
  setSelectedStatus,
  setViewDetail,
  setYardData,
  setEditYardData,
  setYardFormData,
  setCheckDEscriptionExist,
  setYardCanadian,
  setYardAddress,
  setYardZipLength,
  setYardCityLength,
  setYardFax,
  setYardName,
  setYardDescription,
  setNormalSortValue,
  setNormalSortFlag,
  setYardCity,
  setYardStatecode,
  setYardPostcode,
  setYardPhone,
  setShowDealerLookup,
  setDealerLookupFK,
  setUserLookupFK,
  setUserInput,
  setDealerInput,
  setUserManagerInput,
  setUserManagerFK,
  setShowSupervisorLookup,
  setShowManagerLookup,
  setYardOutbound,
  setYardReload,
  setPrinterFK,
  setShowPrinterLookup,
  setPrinterInput,
  setBolPrinterFK,
  setBolPrinterInput,
  setShowKioskPrinterLookup,
  setKioskPrinterFK,
  setKioskPrinterInput,
  setShowBolPrinterLookup,
  setYardDriverMilesAdjustment,
  setYardInvoiceMilesAdjustment,
  setYardAcres,
  setAccessGroup,
  setYardHasOpener,
  setYardCapacity,
  setIsGeneralTabValid,
  setIsSettingsTabValid,
  setLoader,
  resetYard,
  setYardHasPrinter,
  setYardNewPrinter,
  setIsSettingsTabRequired,
  setIsSettingColor,
  setPostalCodeOnChange,
  setOnCancel,
  setYardSisterCode,
  setCheckYardCode,
  setYardPostalCodePK,
  setYardLoading,
} = YardMaintenanceSlice.actions;

export const yard = (state) => state.YardMaintenanceSlice.value;

export default YardMaintenanceSlice.reducer;
