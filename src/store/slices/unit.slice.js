import { createSlice } from "@reduxjs/toolkit";

const initialStateOE = {
  orderEntrySchemaConditions: {
    customer: {},
    miscCustomer: {},
    unit: {},
    miscPickup: {},
    miscDelivery: {},
    overWidth: {},
    unitRoutes: {},
    driveBy: {},
    onHold: {},
    creditCard: {},
    openBalance: {},
    contacts: {},
    notes: {},
    invoiceHolds: {},
    instructions: {},
    documents: {},
    customerTabValid: false,
    allowedPercentage: false,
    invoiceFlatRateRequired: true,
    driverFlatRateRequired: true,
    // not needed fields will remove in future
    miscCustomerTabValid: false,
    unitTabValid: false,
    miscPickupTabValid: false,
    miscDeliveryTabValid: false,
    overWidthTabValid: false,
    unitRoutesTabValid: false,
    driveByTabValid: false,
    onHoldTabValid: false,
    creditCardTabValid: false,
    openBalanceTabValid: false,
    contactsTabValid: false,
    notesTabValid: false,
    invoiceHoldsTabValid: false,
    instructionsTabValid: false,
    documentsTabValid: false,
    unitNumberValidity: null,
  },
  selectedCustomer: {},
  selectedPlant: {},
  selectedCustomerPickupPlant: null,
  selectedPickupYard: null,
  allowedInvoicePercentage: 0,
  unitOverride: false,
  miscPickupID: null,
  miscDeliveryID: null,
  invoiceRateObj: {},
  driverRateObj: {},
  invoiceRate: 0,
  driverRate: 0,

  // Open Balances Tab State
  isOpenBalanceValid: false,
  isOpenBalancesDetailsInComplete: true,
  isOpenBalancesDetailsPartial: false,
  invoiceAmountForOpenBalances: 0,
  invoiceAmount: 0,
  invoiceFlat: 0,
  driverAmount: 0,
  driverFlat: 0,
  deliveryDealer: null,
  selectedDeliveryDealer: null,
  pickupDealer: null,
  selectedPickupDealer: null,
  selectedDeliveryPlant: null,
  selectedUnitType: null,
  invoiceRateStructure: null,
  driverRateStructure: null,
  customerRateStructure: null,
  isInvoiceMileageRate: false,
  isDriverMileageRate: false,
  supplementalRateStructure: "",
  specialRateStructure: "",
  additionalRateStructure: "",
  selectedMultiUnitLoad: null,
  multiUnitPopupLoad: false,
  customerDealerList: null,

  // Unit Routes Tab State
  unitRoutesListing: [],
  driveBysListing: [],

  //creditCard:
  isCreditCardRequired: false,
  isCreditCardDetailsInComplete: true,
  isCreditCardDetailsPartial: false,
  openBalanceClear: false,
  openBalanceTriggerKey: false,
  creditCardTriggerKey: false,
  calculateRatesTriggerKey: 0,
  pcMilerVisible: true,

  isEngineNAVisible: false,
  cdlCutoffs: false,
  requiredCDLA: false,
  batchLoadCount: 0,
  apportionedRate: null,
  calculateInvoiceLoading: false,
  calculateDriverLoading: false,
  activeDispatchValid: false,
};

const unitSlice = createSlice({
  name: "unit",
  initialState: initialStateOE,
  reducers: {
    setOrderEntrySchemaConditions(state, action) {
      state.orderEntrySchemaConditions = { ...state.orderEntrySchemaConditions, ...action.payload };
    },
    setSelectedCustomer(state, action) {
      state.selectedCustomer = action.payload;
    },
    setSelectedPlant(state, action) {
      state.selectedPlant = action.payload;
    },
    setSelectedCustomerPickupPlant(state, action) {
      state.selectedCustomerPickupPlant = action.payload;
    },
    setSelectedPickupYard(state, action) {
      state.selectedPickupYard = action.payload;
    },
    setAllowedInvoicePercentage(state, action) {
      state.allowedInvoicePercentage = action.payload;
    },
    setUnitOverride(state, action) {
      state.unitOverride = action.payload;
    },
    setMiscPickupID(state, action) {
      state.miscPickupID = action.payload;
    },
    setMiscDeliveryID(state, action) {
      state.miscDeliveryID = action.payload;
    },
    // Open Balances Tab Reducers
    setIsOpenBalanceValid: (state, action) => {
      state.isOpenBalanceValid = action.payload;
    },

    setIsOpenBalancesDetailsInComplete: (state, action) => {
      state.isOpenBalancesDetailsInComplete = action.payload;
    },

    setisOpenBalancesDetailsPartial: (state, action) => {
      state.isOpenBalancesDetailsPartial = action.payload;
    },
    setInvoiceAmountForOpenBalances: (state, action) => {
      state.invoiceAmountForOpenBalances = action.payload;
    },
    setSelectedDeliveryPlant: (state, { payload }) => {
      state.selectedDeliveryPlant = payload;
    },
    setInvoiceAmount: (state, action) => {
      state.invoiceAmount = action.payload;
    },
    setInvoiceFlat: (state, action) => {
      state.invoiceFlat = action.payload;
    },
    setDriverAmount: (state, action) => {
      state.driverAmount = action.payload;
    },
    setDriverFlat: (state, action) => {
      state.driverFlat = action.payload;
    },
    setDeliveryDealer: (state, action) => {
      state.deliveryDealer = action.payload;
    },
    setSelectedDeliveryDealer: (state, action) => {
      state.selectedDeliveryDealer = action.payload;
    },
    setPickupDealer: (state, action) => {
      state.pickupDealer = action.payload;
    },
    setSelectedPickupDealer: (state, action) => {
      state.selectedPickupDealer = action.payload;
    },
    setSelectedUnitType: (state, action) => {
      state.selectedUnitType = action.payload;
    },
    setInvoiceRateStructure: (state, action) => {
      state.invoiceRateStructure = action.payload;
    },
    setDriverRateStructure: (state, action) => {
      state.driverRateStructure = action.payload;
    },
    setCustomerRateStructure: (state, action) => {
      state.customerRateStructure = action.payload;
    },
    setIsInvoiceMileageRate: (state, action) => {
      state.isInvoiceMileageRate = action.payload;
    },
    setIsDriverMileageRate: (state, action) => {
      state.isDriverMileageRate = action.payload;
    },
    setSupplementalRateStructure: (state, action) => {
      state.supplementalRateStructure = action.payload;
    },
    setSpecialRateStructure: (state, action) => {
      state.specialRateStructure = action.payload;
    },
    setAdditionalRateStructure: (state, action) => {
      state.additionalRateStructure = action.payload;
    },
    setSelectedMultiUnitLoad: (state, action) => {
      state.selectedMultiUnitLoad = action.payload;
    },
    setMultiUnitPopupLoad: (state, action) => {
      state.multiUnitPopupLoad = action.payload;
    },
    setCustomerDealerList: (state, action) => {
      state.customerDealerList = action.payload;
    },
    setBatchLoadCount: (state, action) => {
      state.batchLoadCount = action.payload;
    },
    setApportionedRate: (state, action) => {
      state.apportionedRate = action.payload;
    },
    setCalculateInvoiceLoading: (state, action) => {
      state.calculateInvoiceLoading = action.payload;
    },
    setCalculateDriverLoading: (state, action) => {
      state.calculateDriverLoading = action.payload;
    },
    setActiveDispatchValid: (state, action) => {
      state.activeDispatchValid = action.payload;
    },
    // Unit Routes Tab Reducers
    setUnitRoutesListing: (state, action) => {
      const { actionType, payload } = action.payload;

      const unitRoutesLength = state.unitRoutesListing?.length;
      const isCanadianPickup = state.unitRoutesListing[0]?.isCanadian || false;
      const isCanadianDelivery = state.unitRoutesListing[unitRoutesLength - 1]?.isCanadian || false;
      const usToCanada = !isCanadianPickup && isCanadianDelivery;
      const canadaToUs = isCanadianPickup && !isCanadianDelivery;
      const usDriveBy = !isCanadianPickup && !isCanadianDelivery;
      const canadianDriveBy = isCanadianPickup && isCanadianDelivery;

      const poeRecordIndex = state.unitRoutesListing?.findIndex((item) => item?.poeFK);
      const firstCanadianIndex = state.unitRoutesListing?.findIndex((item) => item?.isCanadian);
      const firstUsIndex = state.unitRoutesListing?.findIndex((item) => !item?.isCanadian);

      if (actionType === "set") {
        state.unitRoutesListing = payload;
      }

      if (actionType === "addPickup") {
        const pickupIndex = state.unitRoutesListing?.findIndex((item) => item?.isPickup);
        // Change existing Pickup
        if (pickupIndex >= 0) {
          state.unitRoutesListing[pickupIndex] = payload;
        } else {
          // Add new Pickup
          state.unitRoutesListing = [payload, ...state.unitRoutesListing];
        }
      }

      if (actionType === "addDelivery") {
        const deliveryIndex = state.unitRoutesListing?.findIndex((item) => item?.isDelivery);
        // Change existing Delivery
        if (deliveryIndex >= 0) {
          state.unitRoutesListing[deliveryIndex] = payload;
        } else {
          // Add new Delivery
          state.unitRoutesListing = [...state.unitRoutesListing, payload];
        }
      }

      if (actionType === "addPortOfEntry") {
        // Edit POE
        if (poeRecordIndex >= 0) {
          state.unitRoutesListing[poeRecordIndex] = payload;
        } else {
          // Add POE

          // TODO: handle existing driveBys
          if (usToCanada) {
            // if US -> Canada, add above the first Canadian record
            state.unitRoutesListing.splice(firstCanadianIndex, 0, payload);
          } else if (canadaToUs) {
            // if Canada -> US, add above the first US record
            state.unitRoutesListing.splice(firstUsIndex, 0, payload);
          } else {
            // DEFAULT CASE: add above delivery
            state.unitRoutesListing.splice(unitRoutesLength - 1, 0, payload);
          }
        }
      }

      if (actionType === "add") {
        const elementToAdd = { ...payload, frontEndPK: unitRoutesLength + 1 };

        // Add element to driveBysList
        state.driveBysListing.push(elementToAdd);

        // CASE I : US -> US or Canada -> Canada
        // TODO
        // if pickup & delivery is same ie us or canada,
        // we have to add the new item in the last index & push down the last element
        if ((usDriveBy || canadianDriveBy) && poeRecordIndex === -1) {
          state.unitRoutesListing.splice(unitRoutesLength - 1, 0, elementToAdd);
        }

        // CASE II : US -> Canada
        if (usToCanada) {
          if (poeRecordIndex !== -1) {
            // if POE already present
            // TODO: if US record, add above POE record
            // if Canadian record, add above last record
            if (!payload?.isCanadian) {
              state.unitRoutesListing.splice(poeRecordIndex, 0, elementToAdd);
            } else {
              state.unitRoutesListing.splice(unitRoutesLength - 1, 0, elementToAdd);
            }
          } else {
            // if POE not selected yet
            // TODO: if US record, add above the first Canadian record
            // if Canadian record, add above last record
            if (!payload?.isCanadian) {
              state.unitRoutesListing.splice(firstCanadianIndex, 0, elementToAdd);
            } else {
              state.unitRoutesListing.splice(unitRoutesLength - 1, 0, elementToAdd);
            }
          }
        }

        // CASE III : Canada -> US
        if (canadaToUs) {
          if (poeRecordIndex !== -1) {
            // TODO: if US record, add above last record
            // if Canadian record, add above POE record
            if (!payload?.isCanadian) {
              state.unitRoutesListing.splice(unitRoutesLength - 1, 0, elementToAdd);
            } else {
              state.unitRoutesListing.splice(poeRecordIndex, 0, elementToAdd);
            }
          } else {
            // if POE not selected yet
            // TODO: if US record, add above last record
            // if Canadian record, add above first US record
            if (!payload?.isCanadian) {
              state.unitRoutesListing.splice(unitRoutesLength - 1, 0, elementToAdd);
            } else {
              state.unitRoutesListing.splice(firstUsIndex, 0, elementToAdd);
            }
          }
        }
      }

      // Updating new authorizedBy for all records
      if (actionType === "updateAuthorizedBy") {
        state.unitRoutesListing = state.unitRoutesListing?.map((item) => ({
          ...item,
          driveBysAuthorizedBy: payload,
          authorizedBy: payload,
        }));
      }

      if (actionType === "edit") {
        // state.unitRoutesListing[payload?.index] = payload?.formData;
        const unitRoutesIndex = state.unitRoutesListing?.findIndex(
          (item) => item?.frontEndPK === payload?.id
        );
        const driveBysIndex = state.driveBysListing?.findIndex((item) => item?.frontEndPK === payload?.id);

        state.unitRoutesListing[unitRoutesIndex] = {
          ...state.unitRoutesListing[unitRoutesIndex],
          ...payload?.formData,
        };

        state.driveBysListing[driveBysIndex] = {
          ...state.driveBysListing[driveBysIndex],
          ...payload?.formData,
        };
      }

      if (actionType === "delete") {
        state.unitRoutesListing = state.unitRoutesListing?.filter((item) => item?.frontEndPK !== payload);

        state.driveBysListing = state.driveBysListing?.filter((item) => item?.frontEndPK !== payload);
      }

      if (actionType === "moveUp") {
        const elementToSwap = state.unitRoutesListing[payload - 1];
        state.unitRoutesListing[payload - 1] = state.unitRoutesListing[payload];
        state.unitRoutesListing[payload] = elementToSwap;
      }

      if (actionType === "moveDown") {
        const elementToSwap = state.unitRoutesListing[payload + 1];
        state.unitRoutesListing[payload + 1] = state.unitRoutesListing[payload];
        state.unitRoutesListing[payload] = elementToSwap;
      }

      if (actionType === "removePickup") {
        state.unitRoutesListing = state.unitRoutesListing?.filter(
          (item) => !item.isPickup || item.isMiscPickup
        );
      }

      if (actionType === "removeMiscPickup") {
        state.unitRoutesListing = state.unitRoutesListing?.filter((item) => !item.isMiscPickup);
      }

      if (actionType === "removeDelivery") {
        state.unitRoutesListing = state.unitRoutesListing?.filter(
          (item) => !item?.isDelivery || item?.isMiscDelivery
        );
      }

      if (actionType === "removeMiscDelivery") {
        state.unitRoutesListing = state.unitRoutesListing?.filter((item) => !item?.isMiscDelivery);
      }

      if (actionType === "removePoe") {
        state.unitRoutesListing = state.unitRoutesListing?.filter((item) => !item?.isPoe);
      }

      if (actionType === "clear") {
        state.unitRoutesListing = [];
        state.driveBysListing = [];
      }

      if (actionType === "clearDriveBys") {
        state.driveBysListing = [];
        state.unitRoutesListing = state.unitRoutesListing?.filter((item) => !item?.isDriveBy);
      }
    },

    setIsCreditCardRequired: (state, action) => {
      state.isCreditCardRequired = action.payload;
    },
    setCreditCardDetailsInComplete: (state, action) => {
      state.isCreditCardDetailsInComplete = action.payload;
    },
    setIsCreditCardDetailsPartial: (state, action) => {
      state.isCreditCardDetailsPartial = action.payload;
    },
    setOpenBalanceClear: (state, action) => {
      state.openBalanceClear = action.payload;
    },
    setOpenBalanceTriggerKey: (state, action) => {
      state.openBalanceTriggerKey = !state.openBalanceTriggerKey;
    },
    setCreditCardTriggerKey: (state, action) => {
      state.creditCardTriggerKey = action.payload;
    },
    triggerCalculateRates: (state) => {
      state.calculateRatesTriggerKey += 1;
    },
    setPcMilerVisible: (state, action) => {
      state.pcMilerVisible = action.payload;
    },
    setInvoiceRateObj: (state, { payload }) => {
      state.invoiceRateObj = payload;
    },
    setDriverRateObj: (state, { payload }) => {
      state.driverRateObj = payload;
    },
    setInvoiceRate: (state, { payload }) => {
      state.invoiceRate = payload;
    },
    setDriverRate: (state, { payload }) => {
      state.driverRate = payload;
    },
    setIsEngineNAVisible: (state, { payload }) => {
      state.isEngineNAVisible = payload;
    },
    setCdlCutoffs: (state, { payload }) => {
      state.cdlCutoffs = payload;
    },
    setRequiredCDLA: (state, { payload }) => {
      state.requiredCDLA = payload;
    },
  },
});

export const {
  setOrderEntrySchemaConditions,
  setSelectedCustomer,
  setSelectedPlant,
  setSelectedCustomerPickupPlant,
  setSelectedPickupYard,
  setAllowedInvoicePercentage,
  setUnitOverride,
  setMiscPickupID,
  setMiscDeliveryID,
  setIsOpenBalanceValid,
  setIsOpenBalancesDetailsInComplete,
  setisOpenBalancesDetailsPartial,
  setInvoiceAmountForOpenBalances,
  setUnitRoutesListing,
  setInvoiceAmount,
  setDriverAmount,
  setDriverFlat,
  setInvoiceFlat,
  setDeliveryDealer,
  setPickupDealer,
  setSelectedUnitType,
  setInvoiceRateStructure,
  setDriverRateStructure,
  setCustomerRateStructure,
  setIsInvoiceMileageRate,
  setIsDriverMileageRate,
  setSupplementalRateStructure,
  setSpecialRateStructure,
  setAdditionalRateStructure,
  setSelectedMultiUnitLoad,
  setMultiUnitPopupLoad,
  setSelectedDeliveryDealer,
  setSelectedPickupDealer,
  setIsCreditCardDetailsPartial,
  setCreditCardDetailsInComplete,
  setIsCreditCardRequired,
  setOpenBalanceClear,
  setOpenBalanceTriggerKey,
  setCreditCardTriggerKey,
  triggerCalculateRates,
  setPcMilerVisible,
  setDriverRateObj,
  setInvoiceRateObj,
  setDriverRate,
  setInvoiceRate,
  setSelectedDeliveryPlant,
  setIsEngineNAVisible,
  setCdlCutoffs,
  setRequiredCDLA,
  setCustomerDealerList,
  setBatchLoadCount,
  setApportionedRate,
  setCalculateInvoiceLoading,
  setCalculateDriverLoading,
  setActiveDispatchValid,
} = unitSlice.actions;
export default unitSlice.reducer;
