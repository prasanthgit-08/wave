import { createSlice } from "@reduxjs/toolkit";

const SupplementalRatesSlice = createSlice({
  name: "SupplementalRatesSlice",
  initialState: {
    supplementalRatesData: [],
    // search filter
    searchTerms: "",
    searchCriteria: "Beginning",
    changeColor: false,
    selectId: "",

    normalSortValue: null,
    normalSortFlag: false,

    // pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    listingLoading: false,
    viewDetail: false,
    changesCancelled: false,

    //advance search
    advancedSearchObject: null,
    showAdvanceSearch: false,
    showAdvanceSort: false,
    advanceSortedValue: null,
    advanceSortingOrder: null,
    advancedSearchString: "",
    advancedSearchByPayload: null,
    checkAllAdvancedSearchBy: false,

    searchDescription: "",
    searchCustomer: "",
    searchPlant: "",
    searchPlantGroup: "",
    searchCustomerGroup: "",

    //fields
    description: "",
    whichOne: "",
    inVoiceRate: null,
    invoiceFuelSurchargeRate: null,
    invoiceFullRate: false,
    driverRate: null,
    invoiceAdditionalFlatRate: null,
    driverAdditionalFlatRate: null,

    driverFuelSurchargeRate: null,
    driverFullRate: false,
    additional: false,
    additionalDescription: "",
    outbound: false,
    reload: false,
    returns: false,
    editFormData: null,
    isDescriptionUnique: false,
    checkDpu: false,
    additionalFlatRate: false,

    //for customer lookup
    customerSelection: false,
    customerInput: "",
    customerId: null,
    //plant lookup
    customerPlantSelection: false,
    customerPlantInput: "",
    customerPlantId: null,
    //Plant group lookup
    customerPlantGroupSelection: false,
    customerPlantGroupInput: "",
    customerPlantGroupId: null,

    //Customer Group Lookup
    customerGroupSelection: false,
    customerGroupInput: "",
    customerGroupId: null,

    // customer Unit type group Lookup
    customerUnitTypeGroupSelection: false,
    customerUnitTypeGroupInput: "",
    customerUnitTypeGroupId: null,

    //Unit type group Lookup
    unitTypeGroupSelection: false,
    unitTypeGroupInput: "",
    unitTypeGroupId: null,

    //unit Type Lookup
    unitTypeSelection: false,
    unitTypeInput: "",
    unitTypeId: null,

    //TransportCompany Lookup
    transportCompanySelection: false,
    transportCompanyInput: "",
    transportCompanyId: null,

    //Dealer Group lookup

    dealerGroupSelection: false,
    dealerGroupInput: "",
    dealerGroupId: null,

    //Dealer Lookup
    dealerSelection: false,
    dealerInput: "",
    dealerId: null,
    //Driver Lookup

    driverSelection: false,
    driverInput: "",
    driverId: null,

    //state Groups lookup
    stateGroupsSelection: false,
    stateGroupsInput: "",
    stateGroupsId: null,

    //special code lookup
    specialCodeSelection: false,
    specialCodeInput: "",
    specialCodeId: null,

    //pickup customer Lookup
    pickupCustomerSelection: false,
    pickupCustomerInput: "",
    pickupCustomerId: null,

    //pickup customer Plant Lookup
    pickupCustomerPlantSelection: false,
    pickupCustomerPlantInput: "",
    pickupCustomerPlantId: null,
    restrictedCustomer: null,
  },
  reducers: {
    setSearchDescription: (state, action) => {
      state.searchDescription = action.payload;
    },
    setSelectId: (state, action) => {
      state.selectId = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },

    setChangesCancelled: (state, action) => {
      state.changesCancelled = action.payload;
    },
    setSearchCustomer: (state, action) => {
      state.searchCustomer = action.payload;
    },
    setCheckDpu: (state, action) => {
      state.checkDpu = action.payload;
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

    setAdvancedSearchString: (state, action) => {
      state.advancedSearchString = action.payload;
    },

    setAdvancedSearchByPayload: (state, action) => {
      state.advancedSearchByPayload = action.payload;
    },

    setCheckAllAdvancedSearchBy: (state, action) => {
      state.checkAllAdvancedSearchBy = action.payload;
    },
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
    },
    setAdvancedSearchByInputs: (state, { payload }) => {
      state.advancedSearchByInputs = {
        ...state.advancedSearchByInputs,
        [payload.name]: payload.checked,
      };
    },
    setSearchedData: (state, action) => {
      state.searchedData = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setIsDescriptionUnique: (state, action) => {
      state.isDescriptionUnique = action.payload;
    },
    setSupplementalRatesData: (state, action) => {
      state.supplementalRatesData = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },

    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setWhichOne: (state, action) => {
      state.whichOne = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setListingLoading: (state, action) => {
      state.listingLoading = action.payload;
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
    setUnitTypeGroupId: (state, action) => {
      state.unitTypeGroupId = action.payload;
    },
    setUnitTypeGroupSelection: (state, action) => {
      state.unitTypeGroupSelection = action.payload;
    },
    setUnitTypeGroupInput: (state, action) => {
      state.unitTypeGroupInput = action.payload;
    },

    setUnitTypeId: (state, action) => {
      state.unitTypeId = action.payload;
    },
    setUnitTypeSelection: (state, action) => {
      state.unitTypeSelection = action.payload;
    },
    setUnitTypeInput: (state, action) => {
      state.unitTypeInput = action.payload;
    },
    setTransportCompanyId: (state, action) => {
      state.transportCompanyId = action.payload;
    },
    setTransportCompanySelection: (state, action) => {
      state.transportCompanySelection = action.payload;
    },
    setTransportCompanyInput: (state, action) => {
      state.transportCompanyInput = action.payload;
    },
    setDealerGroupId: (state, action) => {
      state.dealerGroupId = action.payload;
    },
    setDealerGroupSelection: (state, action) => {
      state.dealerGroupSelection = action.payload;
    },
    setDealerGroupInput: (state, action) => {
      state.dealerGroupInput = action.payload;
    },
    setDealerId: (state, action) => {
      state.dealerId = action.payload;
    },
    setDealerSelection: (state, action) => {
      state.dealerSelection = action.payload;
    },
    setDealerInput: (state, action) => {
      state.dealerInput = action.payload;
    },
    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
    setDriverSelection: (state, action) => {
      state.driverSelection = action.payload;
    },
    setDriverInput: (state, action) => {
      state.driverInput = action.payload;
    },
    setStateGroupsId: (state, action) => {
      state.stateGroupsId = action.payload;
    },
    setStateGroupsSelection: (state, action) => {
      state.stateGroupsSelection = action.payload;
    },
    setStateGroupsInput: (state, action) => {
      state.stateGroupsInput = action.payload;
    },
    setSpecialCodeId: (state, action) => {
      state.specialCodeId = action.payload;
    },
    setSpecialCodeSelection: (state, action) => {
      state.specialCodeSelection = action.payload;
    },
    setSpecialCodeInput: (state, action) => {
      state.specialCodeInput = action.payload;
    },
    setPickupCustomerId: (state, action) => {
      state.pickupCustomerId = action.payload;
    },
    setPickupCustomerSelection: (state, action) => {
      state.pickupCustomerSelection = action.payload;
    },
    setPickupCustomerInput: (state, action) => {
      state.pickupCustomerInput = action.payload;
    },
    setPickupCustomerPlantId: (state, action) => {
      state.pickupCustomerPlantId = action.payload;
    },
    setPickupCustomerPlantSelection: (state, action) => {
      state.pickupCustomerPlantSelection = action.payload;
    },
    setPickupCustomerPlantInput: (state, action) => {
      state.pickupCustomerPlantInput = action.payload;
    },

    setDescription: (state, action) => {
      state.description = action.payload;
    },

    setInVoiceRate: (state, action) => {
      state.inVoiceRate = action.payload;
    },

    setInvoiceFuelSurchargeRate: (state, action) => {
      state.invoiceFuelSurchargeRate = action.payload;
    },
    setInvoiceAdditionalFlatRate: (state, action) => {
      state.invoiceAdditionalFlatRate = action.payload;
    },
    setDriverAdditionalFlatRate: (state, action) => {
      state.driverAdditionalFlatRate = action.payload;
    },
    setInvoiceFullRate: (state, action) => {
      state.invoiceFullRate = action.payload;
    },

    setDriverRate: (state, action) => {
      state.driverRate = action.payload;
    },

    setDriverFuelSurchargeRate: (state, action) => {
      state.driverFuelSurchargeRate = action.payload;
    },

    setDriverFullRate: (state, action) => {
      state.driverFullRate = action.payload;
    },

    setAdditional: (state, action) => {
      state.additional = action.payload;
    },
    setAdditionalDescription: (state, action) => {
      state.additionalDescription = action.payload;
    },

    setAdditionalFlatRate: (state, action) => {
      state.additionalFlatRate = action.payload;
    },

    setOutbound: (state, action) => {
      state.outbound = action.payload;
    },

    setReload: (state, action) => {
      state.reload = action.payload;
    },
    setReturns: (state, action) => {
      state.returns = action.payload;
    },
    resetStates: (state, action) => {
      state.supplementalRatesData = [];
      state.description = "";
      state.inVoiceRate = null;
      state.invoiceFuelSurchargeRate = null;
      state.invoiceFullRate = false;
      state.driverRate = null;
      state.driverFuelSurchargeRate = null;
      state.driverFullRate = false;
      state.additional = false;
      state.additional = false;
      state.additionalFlatRate = false;
      state.additionalDescription = "";
      state.outbound = false;
      state.reload = false;
      state.returns = false;
      state.editFormData = null;
      state.isDescriptionUnique = true;
      state.customerId = null;
      state.customerPlantId = null;
      state.customerPlantGroupId = null;
      state.customerGroupId = null;
      state.customerUnitTypeGroupId = null;
      state.unitTypeId = null;
      state.transportCompanyId = null;
      state.dealerGroupId = null;
      state.dealerId = null;
      state.driverId = null;
      state.stateGroupsId = null;
      state.specialCodeId = null;
      state.pickupCustomerId = null;
      state.pickupCustomerPlantId = null;
      state.unitTypeGroupId = null;
      state.customerInput = "";
      state.customerPlantInput = "";
      state.customerPlantGroupInput = "";
      state.customerGroupInput = "";
      state.customerUnitTypeGroupInput = "";
      state.unitTypeGroupInput = "";
      state.unitTypeInput = "";
      state.transportCompanyInput = "";
      state.dealerGroupInput = "";
      state.dealerInput = "";
      state.driverInput = "";
      state.stateGroupsInput = "";
      state.specialCodeInput = "";
      state.pickupCustomerInput = "";
      state.pickupCustomerPlantInput = "";
      state.invoiceAdditionalFlatRate = null;
      state.driverAdditionalFlatRate = null;
    },

    setRestrictedCustomer: (state, action) => {
      state.restrictedCustomer = action.payload;
    },
  },
});

export const {
  setChangeColor,
  setSupplementalRatesData,
  setNormalSortValue,
  setNormalSortFlag,
  setSearchCriteria,
  setSearchTerms,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setListingLoading,
  setEditFormData,
  resetSearchSettingsState,
  setAdvancedSearchString,
  setAdvancedSearchByPayload,
  setCheckAllAdvancedSearchBy,
  setAdvancedSearchObject,
  setShowAdvanceSearch,
  setAdvancedSearchByInputs,
  setSearchedData,
  setSearchDescription,
  setSearchCustomer,
  setSearchPlant,
  setSearchPlantGroup,
  setSearchCustomerGroup,
  setCustomerSelection,
  setCustomerInput,
  setCustomerId,
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
  setUnitTypeSelection,
  setUnitTypeInput,
  setUnitTypeId,
  setTransportCompanyId,
  setTransportCompanySelection,
  setTransportCompanyInput,
  setDealerGroupId,
  setDealerGroupSelection,
  setDealerGroupInput,
  setDealerId,
  setDealerSelection,
  setDealerInput,
  setDriverId,
  setDriverSelection,
  setDriverInput,
  setStateGroupsId,
  setStateGroupsSelection,
  setStateGroupsInput,
  setSpecialCodeSelection,
  setSpecialCodeInput,
  setSpecialCodeId,
  setPickupCustomerId,
  setPickupCustomerSelection,
  setPickupCustomerInput,
  setPickupCustomerPlantId,
  setPickupCustomerPlantSelection,
  setPickupCustomerPlantInput,
  setDescription,
  setInVoiceRate,
  setInvoiceFuelSurchargeRate,
  setInvoiceFullRate,
  setDriverRate,
  setDriverFuelSurchargeRate,
  setDriverFullRate,
  setAdditional,
  setAdditionalDescription,
  setOutbound,
  setReload,
  setReturns,
  setIsDescriptionUnique,
  setUnitTypeGroupId,
  setUnitTypeGroupSelection,
  setUnitTypeGroupInput,
  setCheckDpu,
  setViewDetail,
  setChangesCancelled,
  setSelectId,
  resetStates,
  setWhichOne,
  setAdditionalFlatRate,
  setInvoiceAdditionalFlatRate,
  setDriverAdditionalFlatRate,
  setRestrictedCustomer,
} = SupplementalRatesSlice.actions;

export default SupplementalRatesSlice.reducer;
