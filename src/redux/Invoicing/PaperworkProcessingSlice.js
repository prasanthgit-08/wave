import { createSlice, current } from "@reduxjs/toolkit";

const PaperworkProcessing = createSlice({
  name: "paperworkProcessing",
  initialState: {
    // Misc/General
    unitSelectionDisableNext: true,
    unitViewDisableNext: true,
    additionalAmountsDisableNext: true,
    changesCancelled: false,
    currentDriverList: [],

    // Unit Selection
    searchTerm: "",
    searchCriteria: "",
    unitsList: [],
    selectedUnitsList: [],
    multiUnitSeperateInvoice: false,
    isCopyingCompleted: false,
    selectedUnitsListIndex: 0,
    unitsPageList: [],
    selectedUnit: null,
    enableAddLoadUnitButtons: false,
    responseMessage: null,
    showUnitInactiveModal: false,
    minimumDeliveryDate: "",
    unitInstructionValue: "",
    chargeFee: false,
    // Unit View
    unitInformationTabValid: false,
    unitInformationTabValidated: false,
    invoiceHoldTabValid: false,
    customerInstructions: "",
    emailDriver: false,
    // Additional Amounts
    additionalAmountsList: [],
    driverList: [],
    // Amounts Confirmation
    paperworkProcessingData: null,
    unitPK: null,
    invoiceMiles: null,
    amountsConfirmationDataList: [],
    invoiceTotalAmntConf: 0,

    // Breakdown
    isDelayedUnit: false,
    breakdownDelayLoading: false,
    breakdownDelayArray: [],
    feeDelayArray: [],
    breakdownDelayIndex: 0,
    delayedUnitExpensePK: null,
    searchTermFeeTab: "",
    searchCriteriaFeeTab: "",
    size: 10,
    pageNumber: 0,
    sortValueFeeTab: null,
    sortTypeFeeTab: false,
    totalPages: 0,
    totalElements: 0,
    totalElementsOfEquipment: 0,
    totalPageOfEquipment: 0,
    feeInvoiceTotal: 0,
    totalBreakdownPermit: 0,
    totalBreakdownTolls: 0,
    totalBreakdownDriverPermit: 0,
    totalBreakdownDriverTolls: 0,
    invoiceTollsDelayedExpenses: 0,
    invoicePermitsDelayedExpenses: 0,
    totalInvoiceForEachUnit: 0,
    totalDriverPayEachUnit: 0,
    breakdownUnitFK: null,
    delayedUnitBreakdownFKInt: null,
    unitOnInvoiceHold: false,
    releaseHoldPermission: false,
    currentTab: "general",
    selectedDelayUnitBreakdownFK: null,

    //return invoice
    delayedUnitReturnFK: null,
    isReturn: false,
    realseHoldStatus: true,
    overrideStatus: true,

    //split trip
    partialTrip: false,
    partialTripArray: [],
    partialArrayForNavigation: [],
    partialTripIndex: 0,
    partialTripArraySum: {
      tollInvoiceSum: 0,
      permitInvoiceSum: 0,
      washInvoiceSum: 0,
      otherInvoiceSum: 0,
    },
    invoiceSplitTolls: 0,
    invoiceSplitPermits: 0,
    invoiceSplitWash: 0,
    invoiceSplitOther: 0,
    splitDriverDetails: null,

    // Scan Paperwork
    isCurrentUnitValid: false,
    scanPaperworkDisableSave: true,
    inactiveDropzone: true,
    scanPaperworkSaveList: [],

    // Invoice Save
    invoiceSaveList: [],
    invoiceLineItems: [],
    checkDetails: [],
    driverPayRequests: [],
    multiUnitList: [],
    companyFK: null,
    companyName: "",
    unitId: null,

    // Missing Paperwork
    missingPaperworkObject: null,
    emailText: "",
    missingPaperworkUnit: null,
    missingPaperworkFlag: false,
    missingPaperworkDrivers: [],
    missingPaperworkDisableSave: false,

    //Drivers Email
    driversEmailObject: null,
    driversEmailList: [],
    uniqueDriversEmailList: [],
    driversEmailArray: [],
    driversEmailIndex: 0,
    driverEmailText: "",
    // Misc/General

    //  Equipment Return
    pageEquipmentNumber: 0,
    equipmentSize: 10,
    equipmentSearchTerms: "",
    equipmentSearchCriteria: "",
    equipmentActive: true,
    equipmentSortValue: null,
    equipmentSortType: false,
    equipmentDispatchIdEquipment: null,

    equipmentHistoryPk: null,
    equipmentReturnList: [],
    selectedEquipmentReturnsList: [],
    unSelectedEquipmentReturnsList: [],
    totalPage: 0,

    changeColor: false,
    selectedId: null,

    checkin: false,
    isDeliveryDateDefaultValue: [],
    unCheckin: false,
    checkInFlag: false,

    //Credit Card
    creditCardArrayList: [],
    transIds: "",
    invoiceHoldReason: "",
    notes: "",
    // Unit View > Invoice Hold: survives Next/Back and Missing Paperwork round trips
    invoiceHoldOverrideValid: false,
    invoiceHoldSnapshot: null,
  },
  reducers: {
    setUnitSelectionDisableNext: (state, action) => {
      state.unitSelectionDisableNext = action.payload;
    },
    setUnitViewDisableNext: (state, action) => {
      state.unitViewDisableNext = action.payload;
    },

    setDelayedUnitReturnFK: (state, action) => {
      state.delayedUnitReturnFK = action.payload;
    },
    setIsReturn: (state, action) => {
      state.isReturn = action.payload;
    },
    setInvoiceTotalAmntConf: (state, action) => {
      state.invoiceTotalAmntConf = action.payload;
    },

    setAdditionalAmountsDisableNext: (state, action) => {
      state.additionalAmountsDisableNext = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setCurrentDriverList: (state, action) => {
      if (action.payload) {
        state.currentDriverList = [...state.currentDriverList, action.payload];
      } else {
        state.currentDriverList = [];
      }
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setUnitsList: (state, action) => {
      state.unitsList = action.payload;
    },
    setSelectedUnitsList: (state, action) => {
      state.selectedUnitsList = action.payload;
    },
    setMinimumDeliveryDate: (state, action) => {
      state.minimumDeliveryDate = action.payload;
    },
    setUnitInstructionValue: (state, action) => {
      state.unitInstructionValue = action.payload;
    },
    setChargeFee: (state, action) => {
      state.chargeFee = action.payload;
    },
    updateSelectedUnitsList: (state, action) => {
      const { index, payload } = action.payload;
      let arrayElement = state.selectedUnitsList[index];

      arrayElement = { ...arrayElement, ...payload };

      if (arrayElement) {
        state.selectedUnitsList[index] = arrayElement;
      }
    },
    setIsCopyingCompleted: (state, action) => {
      state.isCopyingCompleted = action.payload;
    },
    setUnitsPageList: (state, action) => {
      state.unitsPageList = action.payload;
    },

    addToSelected: (state, { payload }) => {
      state.selectedUnitsList = [payload, ...state.selectedUnitsList];
      state.selectedUnitsList.sort((a, b) => a.unitPK - b.unitPK);
    },

    addArrayToSelected: (state, { payload }) => {
      state.selectedUnitsList = [...payload, ...state.selectedUnitsList];
      state.selectedUnitsList.sort((a, b) => a.unitPK - b.unitPK);
    },

    filterUnits: (state, { payload }) => {
      state.unitsList = state.unitsList.filter((unit) => unit.unitPK !== payload);
    },

    addToUnits: (state, { payload }) => {
      state.unitsList = [payload, ...state.unitsList];
    },
    filterSelected: (state, { payload }) => {
      state.selectedUnitsList = state.selectedUnitsList.filter((unit) => unit.unitPK !== payload);
    },

    setSelectedUnit: (state, action) => {
      state.selectedUnit = action.payload;
    },

    setEnableAddLoadUnitButtons: (state, action) => {
      state.enableAddLoadUnitButtons = action.payload;
    },

    setResponseMessage: (state, action) => {
      state.responseMessage = action.payload;
    },
    setCustomerInstructions: (state, action) => {
      state.customerInstructions = action.payload;
    },

    setEmailDriver: (state, action) => {
      state.emailDriver = action.payload;
    },

    setShowUnitInactiveModal: (state, action) => {
      state.showUnitInactiveModal = action.payload;
    },
    setUnitOnInvoiceHold: (state, action) => {
      state.unitOnInvoiceHold = action.payload;
    },

    setUnitInformationTabValid: (state, action) => {
      state.unitInformationTabValid = action.payload;
      state.unitInformationTabValidated = true;
    },

    setReleaseHoldPermission: (state, action) => {
      state.releaseHoldPermission = action.payload;
    },

    setInvoiceHoldTabValid: (state, action) => {
      state.invoiceHoldTabValid = action.payload;
    },

    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setUnitId: (state, action) => {
      state.unitId = action.payload;
    },

    setAdditionalAmountsList: (state, action) => {
      const { type, payload, key } = action.payload;
      const { index, element } = payload;

      if (type === "set" && state.additionalAmountsList?.length === 0 && payload) {
        state.additionalAmountsList = payload;
      }

      let additionalAmountElement = state.additionalAmountsList[index];

      if (type === "update" && additionalAmountElement) {
        additionalAmountElement = { ...additionalAmountElement, ...element };
      }

      if (key === "driver1" && additionalAmountElement) {
        let driverListElement = additionalAmountElement?.driverList[0];
        driverListElement = { ...driverListElement, ...element };
        if (driverListElement) {
          additionalAmountElement.driverList[0] = driverListElement;
        }
      }

      if (key === "driver2" && additionalAmountElement) {
        let driverListElement = additionalAmountElement.driverList[1];
        driverListElement = { ...driverListElement, ...element };
        if (driverListElement) {
          additionalAmountElement.driverList[1] = driverListElement;
        }
      }

      if (key === "driver3" && additionalAmountElement) {
        let driverListElement = additionalAmountElement.driverList[2];
        driverListElement = { ...driverListElement, ...element };
        if (driverListElement) {
          additionalAmountElement.driverList[2] = driverListElement;
        }
      }

      if (additionalAmountElement) {
        state.additionalAmountsList[index] = additionalAmountElement;
      }

      if (!payload) {
        state.additionalAmountsList = [];
      }
    },
    copyAdditionalAmountsFields: (state, action) => {
      const { invoiceWash, driverWash, invoiceTexts } = action.payload;

      state.additionalAmountsList = state.additionalAmountsList.map((element) => ({
        ...element,
        invoiceWashAmount: invoiceWash || element.invoiceWashAmount,
        driverList: [
          {
            ...element.driverList[0],
            wash: driverWash || element.driverList[0].wash,
          },
        ],
        invoiceText: invoiceTexts || element.invoiceText,
      }));
    },

    setDriverList: (state, action) => {
      state.driverList = action.payload;
    },

    setAmountsConfirmationDataList: (state, action) => {
      state.amountsConfirmationDataList = action.payload;
    },
    setPaperworkProcessingData: (state, action) => {
      state.paperworkProcessingData = action.payload;
    },
    setUnitPK: (state, action) => {
      state.unitPK = action.payload;
    },
    setInvoiceMiles: (state, action) => {
      state.invoiceMiles = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setIsDelayedUnit: (state, action) => {
      state.isDelayedUnit = action.payload;
    },
    setBreakdownDelayLoading: (state, action) => {
      state.breakdownDelayLoading = action.payload;
    },
    setBreakdownDelayArray: (state, action) => {
      state.breakdownDelayArray = action.payload;
    },
    setFeeDelayArray: (state, action) => {
      state.feeDelayArray = action.payload;
    },
    setFeeInvoiceTotal: (state, action) => {
      state.feeInvoiceTotal = action.payload;
    },
    setTotalBreakdownPermit: (state, action) => {
      state.totalBreakdownPermit = action.payload;
    },
    setTotalBreakdownTolls: (state, action) => {
      state.totalBreakdownTolls = action.payload;
    },
    setTotalBreakdownDriverPermit: (state, action) => {
      state.totalBreakdownDriverPermit = action.payload;
    },
    setTotalBreakdownDriverTolls: (state, action) => {
      state.totalBreakdownDriverTolls = action.payload;
    },
    setInvoiceTollsDelayedExpenses: (state, action) => {
      state.invoiceTollsDelayedExpenses = action.payload;
    },
    setInvoicePermitsDelayedExpenses: (state, action) => {
      state.invoicePermitsDelayedExpenses = action.payload;
    },
    setTotalInvoiceForEachUnit: (state, action) => {
      state.totalInvoiceForEachUnit = action.payload;
    },
    setTotalDriverPayEachUnit: (state, action) => {
      state.totalDriverPayEachUnit = action.payload;
    },
    setBreakdownDelayIndex: (state, action) => {
      state.breakdownDelayIndex = action.payload;
    },
    setDelayedUnitExpensePK: (state, action) => {
      state.delayedUnitExpensePK = action.payload;
    },
    setBreakdownUnitFK: (state, action) => {
      state.breakdownUnitFK = action.payload;
    },
    setDelayedUnitBreakdownFKInt: (state, action) => {
      state.delayedUnitBreakdownFKInt = action.payload;
    },
    setSearchTermFeeTab: (state, action) => {
      state.searchTermFeeTab = action.payload;
    },
    setSearchCriteriaFeeTab: (state, action) => {
      state.searchCriteriaFeeTab = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },

    setSortValueFeeTab: (state, action) => {
      state.sortValueFeeTab = action.payload;
    },
    setSortTypeFeeTab: (state, action) => {
      state.sortTypeFeeTab = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalElementsOfEquipment: (state, action) => {
      state.totalElementsOfEquipment = action.payload;
    },
    setTotalPageOfEquipment: (state, action) => {
      state.totalPageOfEquipment = action.payload;
    },

    setPartialTrip: (state, action) => {
      state.partialTrip = action.payload;
    },
    setSplitDriverDetails: (state, action) => {
      state.splitDriverDetails = action.payload;
    },
    setPartialTripArray: (state, { payload }) => {
      if (payload.type === "set") {
        state.partialTripArray = payload?.payload;
      }
      if (payload.type === "update") {
        const { index, splitUpdateObject } = payload?.payload;
        state.partialTripArray[index] = { ...state.partialTripArray[index], ...splitUpdateObject };
      }
    },
    setPartialArrayForNavigation: (state, action) => {
      state.partialArrayForNavigation = action.payload;
    },
    setPartialTripIndex: (state, action) => {
      state.partialTripIndex = action.payload;
    },
    setPartialTripArraySum: (state, action) => {
      state.partialTripArraySum = action.payload;
    },
    setInvoiceSplitTolls: (state, action) => {
      state.invoiceSplitTolls = action.payload;
    },
    setInvoiceSplitPermits: (state, action) => {
      state.invoiceSplitPermits = action.payload;
    },
    setInvoiceSplitWash: (state, action) => {
      state.invoiceSplitWash = action.payload;
    },
    setInvoiceSplitOther: (state, action) => {
      state.invoiceSplitOther = action.payload;
    },

    // Scan Paperwork
    setIsCurrentUnitValid: (state, action) => {
      state.isCurrentUnitValid = action.payload;
    },
    setScanPaperworkDisableSave: (state, action) => {
      state.scanPaperworkDisableSave = action.payload;
    },
    setInactiveDropzone: (state, action) => {
      state.inactiveDropzone = action.payload;
    },

    setSelectedUnitsListIndex: (state, action) => {
      state.selectedUnitsListIndex = action.payload;
    },

    setMultiUnitSeperateInvoice: (state, action) => {
      state.multiUnitSeperateInvoice = action.payload;
    },
    setCompanyFK: (state, action) => {
      state.companyFK = action.payload;
    },
    setPageEquipmentNumber: (state, action) => {
      state.pageEquipmentNumber = action.payload;
    },
    setEquipmentSize: (state, action) => {
      state.equipmentSize = action.payload;
    },
    setEquipmentSearchTerms: (state, action) => {
      state.equipmentSearchTerms = action.payload;
    },
    setEquipmentSearchCriteria: (state, action) => {
      state.equipmentSearchCriteria = action.payload;
    },

    setEquipmentActive: (state, action) => {
      state.equipmentActive = action.payload;
    },

    setEquipmentSortValue: (state, action) => {
      state.equipmentSortValue = action.payload;
    },

    setEquipmentSortType: (state, action) => {
      state.equipmentSortType = action.payload;
    },

    setEquipmentHistoryPk: (state, action) => {
      state.equipmentHistoryPk = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },

    setEquipmentDispatchIdEquipment: (state, action) => {
      state.equipmentDispatchIdEquipment = action.payload;
    },
    setEquipmentReturnList: (state, action) => {
      const { type, id, payload } = action.payload;

      if (type === "set") {
        let equipmentReturnList = payload;
        const selectedEquipmentReturnsList = state.selectedEquipmentReturnsList;
        if (selectedEquipmentReturnsList.length !== 0) {
          equipmentReturnList = equipmentReturnList.map((element) => {
            const isElementSelected = selectedEquipmentReturnsList.some(
              (item) => item.equipmentHistoryPK === element.equipmentHistoryPK
            );
            if (isElementSelected) {
              return { ...element, checkInUserFK: 1 };
            } else {
              return element;
            }
          });
          state.equipmentReturnList = equipmentReturnList;
        } else {
          state.equipmentReturnList = payload;
        }
      }

      if (type === "update") {
        let arrayElementIndex = state.equipmentReturnList.findIndex(
          (element) => element.equipmentHistoryPK === id
        );
        if (arrayElementIndex !== -1) {
          let arrayElement = state.equipmentReturnList[arrayElementIndex];
          arrayElement = { ...arrayElement, checkInUserFK: payload ? 1 : null };
          state.equipmentReturnList[arrayElementIndex] = arrayElement;
        }

        state.selectedEquipmentReturnsList = state.equipmentReturnList.filter(
          (element) => element.checkInUserFK !== null
        );
      }

      if (type === "clear") {
        state.equipmentReturnList = state.equipmentReturnList.map((element) => ({
          ...element,
          checkInUserFK: null,
        }));
      }
    },
    setSelectedEquipmentReturnsList: (state, action) => {
      state.selectedEquipmentReturnsList = action.payload;
    },

    setUnSelectedEquipmentReturnsList: (state, action) => {
      state.unSelectedEquipmentReturnsList = action.payload;
    },

    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },

    setCheckin: (state, action) => {
      state.checkin = action.payload;
    },
    setIsDeliveryDateDefaultValue: (state, action) => {
      state.isDeliveryDateDefaultValue = action.payload;
    },

    setUnCheckin: (state, action) => {
      state.unCheckin = action.payload;
    },

    setInvoiceSaveList: (state, action) => {
      const { type, payload } = action.payload;
      const { index, element } = payload;

      if (type === "set" && payload && state.invoiceSaveList.length === 0) {
        state.invoiceSaveList = payload;
      }

      if (type === "update") {
        state.invoiceSaveList[index] = { ...state.invoiceSaveList[index], ...element };
      }
    },

    setScanPaperworkSaveList: (state, action) => {
      const { actionType, payload } = action.payload;
      const { index, element, value } = payload;

      if (actionType === "set" && payload) {
        state.scanPaperworkSaveList = payload;
      }

      if (actionType === "update") {
        state.scanPaperworkSaveList[index] = { ...state.scanPaperworkSaveList[index], ...element };
      }

      const keyMapping = {
        customerUploadFiles: "customerUploadFiles",
        customerScanFiles: "customerScanFiles",
        companyUploadFiles: "companyUploadFiles",
        companyScanFiles: "companyScanFiles",
        bolUploadFiles: "bolUploadFiles",
        bolScanFiles: "bolScanFiles",
        dafUploadFiles: "dafUploadFiles",
        dafScanFiles: "dafScanFiles",
        iftaUploadFiles: "iftaUploadFiles",
        iftaScanFiles: "iftaScanFiles",
        breakdownUploadFiles: "breakdownUploadFiles",
        breakdownScanFiles: "breakdownScanFiles",
      };

      const targetKey = keyMapping[actionType];

      if (targetKey) {
        state.scanPaperworkSaveList[index] = { ...state.scanPaperworkSaveList[index], [targetKey]: value };
      }
    },

    setInvoiceLineItems: (state, { payload }) => {
      state.invoiceLineItems = [...state.invoiceLineItems, payload];

      if (!payload) {
        state.invoiceLineItems = [];
      }
    },

    setCheckDetails: (state, { payload }) => {
      state.checkDetails = [...state.checkDetails, payload];
    },

    setDriverPayRequests: (state, { payload }) => {
      state.driverPayRequests = [...state.driverPayRequests, payload];
    },

    setMultiUnitList: (state, { payload }) => {
      state.multiUnitList = [...state.multiUnitList, ...payload];
    },

    // ============ FIXED: Missing Paperwork Reducers ============
    setMissingPaperworkObject: (state, action) => {
      if (action.payload === null) {
        state.missingPaperworkObject = null;
        return;
      }

      if (state.missingPaperworkObject === null) {
        state.missingPaperworkObject = { ...action.payload };
      } else {
        state.missingPaperworkObject = { ...state.missingPaperworkObject, ...action.payload };
      }
    },

    // FIXED: These reducers now check if missingPaperworkObject is null
    // If null, they do NOT create a new object - they just return
    setMissingPaperworkEmailText: (state, action) => {
      if (state.missingPaperworkObject === null) {
        return;
      }
      state.missingPaperworkObject.emailText = action.payload;
    },

    setMissingPaperworkNotes: (state, action) => {
      if (state.missingPaperworkObject === null) {
        return;
      }
      state.missingPaperworkObject.notes = action.payload;
    },

    setMissingPaperworkInvoiceHold: (state, action) => {
      if (state.missingPaperworkObject === null) {
        return;
      }
      state.missingPaperworkObject.unitOnInvoiceHold = action.payload;
    },

    setMissingPaperworkHoldReason: (state, action) => {
      if (state.missingPaperworkObject === null) {
        return;
      }
      state.missingPaperworkObject.invoiceHoldReason = action.payload;
    },

    setMissingPaperworkChargeEfee: (state, action) => {
      if (state.missingPaperworkObject === null) {
        return;
      }
      state.missingPaperworkObject.chargeEfee = action.payload;
    },

    setMissingPaperworkAttachVideo: (state, action) => {
      // CRITICAL FIX: If missingPaperworkObject is null, do nothing
      // This prevents creating a new object with attachVideo: true after reset
      if (state.missingPaperworkObject === null) {
        return;
      }
      state.missingPaperworkObject.attachVideo = action.payload;
    },
    // ============ End of Missing Paperwork Reducers ============

    setEmailText: (state, action) => {
      state.emailText = action.payload;
    },

    setMissingPaperworkUnit: (state, action) => {
      state.missingPaperworkUnit = action.payload;
    },

    setMissingPaperworkFlag: (state, action) => {
      state.missingPaperworkFlag = action.payload;
    },

    setMissingPaperworkDrivers: (state, { payload }) => {
      state.missingPaperworkDrivers = [...state.missingPaperworkDrivers, payload];
    },

    setMissingPaperworkDisableSave: (state, action) => {
      state.missingPaperworkDisableSave = action.payload;
    },

    setDriversEmailObject: (state, action) => {
      state.driversEmailObject = action.payload;
    },
    setSelectedDelayUnitBreakdownFK: (state, action) => {
      state.selectedDelayUnitBreakdownFK = action.payload;
    },

    setDriversEmailList: (state, action) => {
      state.driversEmailList = action.payload;
    },

    setUniqueDriversEmailList: (state, action) => {
      state.uniqueDriversEmailList = action.payload;
    },

    setDriversEmailArray: (state, action) => {
      const { type, payload } = action.payload;
      const { index, element } = payload;

      if (type === "set" && payload) {
        state.driversEmailArray = payload;
      }

      if (type === "update") {
        state.driversEmailArray[index] = { ...state.driversEmailArray[index], ...element };
      }
    },

    setDriversEmailIndex: (state, action) => {
      state.driversEmailIndex = action.payload;
    },

    setDriverEmailText: (state, action) => {
      state.driverEmailText = action.payload;
    },

    setRealseHoldStatus: (state, action) => {
      state.realseHoldStatus = action.payload;
    },
    setOverrideStatus: (state, action) => {
      state.overrideStatus = action.payload;
    },
    setCreditCardArrayList: (state, action) => {
      state.creditCardArrayList = action.payload;
    },
    setTransIds: (state, action) => {
      state.transIds = action.payload;
    },
    setInvoiceHoldReason: (state, action) => {
      state.invoiceHoldReason = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setInvoiceHoldOverrideValid: (state, action) => {
      state.invoiceHoldOverrideValid = action.payload;
    },
    // Taken on Unit View before opening Missing Paperwork, which reloads the unit from the
    // API and would otherwise wipe a hold that was released/overridden on Unit View.
    saveInvoiceHoldSnapshot: (state) => {
      state.invoiceHoldSnapshot = {
        selectedUnitsList: current(state.selectedUnitsList)?.map((unit) => ({
          unitPK: unit?.unitPK,
          unitOnInvoiceHold: unit?.unitOnInvoiceHold,
          unitOnInvoiceHoldUI: unit?.unitOnInvoiceHoldUI,
          invoiceHoldReason: unit?.invoiceHoldReason,
          realseHoldStatus: unit?.realseHoldStatus,
          overrideStatus: unit?.overrideStatus,
        })),
        selectedUnit: state.selectedUnit ? current(state.selectedUnit) : state.selectedUnit,
        unitOnInvoiceHold: state.unitOnInvoiceHold,
        invoiceHoldReason: state.invoiceHoldReason,
      };
    },
    clearInvoiceHoldSnapshot: (state) => {
      state.invoiceHoldSnapshot = null;
    },
    // Puts back the Unit View invoice hold state when leaving Missing Paperwork without saving.
    restoreInvoiceHoldSnapshot: (state) => {
      const snapshot = state.invoiceHoldSnapshot;
      if (!snapshot) return;

      snapshot.selectedUnitsList?.forEach((saved) => {
        const index = state.selectedUnitsList?.findIndex((unit) => unit?.unitPK === saved?.unitPK);
        if (index > -1) {
          state.selectedUnitsList[index] = { ...state.selectedUnitsList[index], ...saved };
        }
      });

      if (snapshot.selectedUnit && snapshot.selectedUnit?.unitPK === state.selectedUnit?.unitPK) {
        state.selectedUnit = snapshot.selectedUnit;
      }

      state.unitOnInvoiceHold = snapshot.unitOnInvoiceHold;
      state.invoiceHoldReason = snapshot.invoiceHoldReason;
      state.invoiceHoldSnapshot = null;
    },
    resetPaperworkProcessing: (state, action) => {
      state.unitInformationTabValidated = false;
      state.searchTerm = "";
      state.searchCriteria = "";
      state.unitsList = [];
      state.selectedUnitsList = [];
      state.unitsPageList = [];
      state.selectedUnit = null;
      state.additionalAmounts = null;
      state.paperworkProcessingData = null;
      state.unitPK = null;
      state.invoiceMiles = null;
      state.amountsConfirmationDataList = null;
      state.breakdownDelayArray = [];
      state.feeDelayArray = [];
      state.partialTripArray = [];
      state.isFirstLoopCompleted = false;
      state.scanPaperworkDisableSave = true;
      state.saveInvoiceObject = null;
      state.invoiceLineItems = [];
      state.checkDetails = [];
      state.driverPayRequests = [];
      state.enableAddLoadUnitButtons = false;
      state.multiUnitList = [];
      state.driverList = [];
      state.additionalAmountsList = [];
      state.invoiceSaveList = [];
      state.scanPaperworkSaveList = [];
      state.missingPaperworkObject = null;
      state.missingPaperworkUnit = null;
      state.missingPaperworkFlag = false;
      state.missingPaperworkDrivers = [];
      state.missingPaperworkDisableSave = false;
      state.driversEmailObject = null;
      state.driversEmailList = [];
      state.currentDriverList = [];
      state.uniqueDriversEmailList = [];
      state.driversEmailArray = [];
      state.driversEmailIndex = 0;
      state.driverEmailText = "";
      state.equipmentReturnList = [];
      state.selectedEquipmentReturnsList = [];
      state.setUnSelectedEquipmentReturnsList = [];
      state.setPartialArrayForNavigation = [];
      state.invoiceHoldReason = "";
      state.notes = "";
      state.emailText = "";
      state.unitOnInvoiceHold = false;
      state.invoiceHoldReason = "";
      state.chargeFee = false;
      state.selectedUnitsListIndex = 0;
      state.invoiceHoldOverrideValid = false;
      state.invoiceHoldSnapshot = null;
    },
  },
});

export const {
  setUnitSelectionDisableNext,
  setUnitViewDisableNext,
  setAdditionalAmountsDisableNext,
  toggleChangesCancelled,
  setCurrentDriverList,
  setSearchTerm,
  setSearchCriteria,
  setUnitsList,
  setSelectedUnitsList,
  updateSelectedUnitsList,
  setIsCopyingCompleted,
  setUnitsPageList,
  setEnableAddLoadUnitButtons,
  setResponseMessage,
  setShowUnitInactiveModal,
  setAmountsConfirmationDataList,
  setPaperworkProcessingData,
  setUnitPK,
  setInvoiceMiles,
  addToSelected,
  addArrayToSelected,
  filterUnits,
  addToUnits,
  filterSelected,
  setSelectedUnit,
  setMinimumDeliveryDate,
  setUnitInstructionValue,
  setChargeFee,
  setUnitInformationTabValid,
  setAdditionalAmountsList,
  copyAdditionalAmountsFields,
  setDriverList,
  setIsCurrentUnitValid,
  setScanPaperworkDisableSave,
  setInactiveDropzone,
  setInvoiceSaveList,
  setScanPaperworkSaveList,
  setInvoiceLineItems,
  setCheckDetails,
  setDriverPayRequests,
  setMultiUnitList,
  resetPaperworkProcessing,
  setInvoiceHoldOverrideValid,
  saveInvoiceHoldSnapshot,
  clearInvoiceHoldSnapshot,
  restoreInvoiceHoldSnapshot,
  setCurrentTab,
  setIsDelayedUnit,
  setBreakdownDelayLoading,
  setBreakdownDelayArray,
  setFeeDelayArray,
  setBreakdownDelayIndex,
  setDelayedUnitExpensePK,
  setSearchTermFeeTab,
  setSearchCriteriaFeeTab,
  setSize,
  setPageNumber,
  setSortValueFeeTab,
  setSortTypeFeeTab,
  setTotalPages,
  setTotalElements,
  setFeeInvoiceTotal,
  setPartialTrip,
  setPartialTripArray,
  setPartialArrayForNavigation,
  setPartialTripIndex,
  setPartialTripArraySum,
  setInvoiceSplitTolls,
  setInvoiceSplitPermits,
  setInvoiceSplitWash,
  setInvoiceSplitOther,
  setSplitDriverDetails,
  setTotalBreakdownPermit,
  setTotalBreakdownTolls,
  setTotalBreakdownDriverPermit,
  setTotalBreakdownDriverTolls,
  setInvoicePermitsDelayedExpenses,
  setInvoiceTollsDelayedExpenses,
  setTotalInvoiceForEachUnit,
  setBreakdownUnitFK,
  setSelectedUnitsListIndex,
  setMultiUnitSeperateInvoice,
  setCustomerInstructions,
  setUnitOnInvoiceHold,
  setInvoiceHoldTabValid,
  setReleaseHoldPermission,
  setDelayedUnitBreakdownFKInt,
  setTotalDriverPayEachUnit,
  setMissingPaperworkObject,
  setMissingPaperworkEmailText,
  setMissingPaperworkNotes,
  setMissingPaperworkInvoiceHold,
  setMissingPaperworkHoldReason,
  setMissingPaperworkChargeEfee,
  setMissingPaperworkAttachVideo,
  setEmailText,
  setMissingPaperworkUnit,
  setMissingPaperworkFlag,
  setMissingPaperworkDrivers,
  setMissingPaperworkDisableSave,
  setEmailDriver,
  setDriversEmailObject,
  setDriversEmailList,
  setDelayedUnitReturnFK,
  setIsReturn,
  setCompanyFK,
  setCompanyName,
  setUnitId,
  setSelectedDelayUnitBreakdownFK,
  setUniqueDriversEmailList,
  setDriversEmailArray,
  setDriversEmailIndex,
  setDriverEmailText,
  setPageEquipmentNumber,
  setEquipmentSize,
  setEquipmentSearchTerms,
  setEquipmentSearchCriteria,
  setEquipmentActive,
  setEquipmentSortValue,
  setEquipmentSortType,
  setEquipmentDispatchIdEquipment,
  setEquipmentHistoryPk,
  setEquipmentReturnList,
  setSelectedEquipmentReturnsList,
  setUnSelectedEquipmentReturnsList,
  setChangeColor,
  setSelectedId,
  setTotalPage,
  setTotalElementsOfEquipment,
  setTotalPageOfEquipment,
  setCheckin,
  setIsDeliveryDateDefaultValue,
  setUnCheckin,
  setRealseHoldStatus,
  setOverrideStatus,
  setCreditCardArrayList,
  setTransIds,
  setInvoiceHoldReason,
  setNotes,
  setInvoiceTotalAmntConf,
} = PaperworkProcessing.actions;

export default PaperworkProcessing;
