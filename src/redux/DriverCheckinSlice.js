import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchCriteria: "Beginning",
  firstName: "",
  lastName: "",
  active: null,
  activeString: "Active",
  deleased: null,
  driverData: [],
  driverData1: [],
  unitData: [],
  unitData1: [],
  formData: null,
  listingData: [],
  sortValue: null,
  sortType: false,
  sortValue2: "",
  sortType2: null,
  sortValueOfunit: "",
  sortType1: null,
  driverId: null,
  unitId: null,
  dispatchId: null,
  changeColor: false,
  cityvalidation: false,
  // equipmenttab state

  //states for form content
  unitNumber: "",
  model: "",
  unitType: "",
  specialCode: "",
  yard: "",
  row: "",
  position: "",
  pickupName: "",
  pickupCity: "",
  pickupState: "",
  deliveryName: "",
  deliveryCity: "",
  deliveryState: "",
  epuDate: "",
  etaDate: "",
  epuScreen: false,
  etaScreen: false,
  isCityState: false,
  isDelay: false,
  city: "",
  state: "",
  cityStateValidation: false,
  cityStateCheck: false,
  currentLocationCity: "",
  currentLocationStateCode: "",
  notes: "",
  withoutunit: false,
  postalId: null,
  // tab state
  //for pagenation
  pageNumber: 0,
  pageNumberForUnitSelection: 0,
  totalElementsForUnit: 0,
  totalPagesForUnit: 0,
  formPageNumber: 0,
  totalElements: 0,
  totalPages: 0,
  //cross db
  companyName: "",
  companyFK: null,
  sisterDispatchFK: null,
  checkinAdv: false,
  /**Added for Add
   * comments in driver service
   * */
  commentsData: null,
  disableSave: true,
  commentsClearBit: false,
  cityStateComination: false,
  cityToYardShuttlePopup: false,
  pickupAddress1: "",
  pickupAddress2: "",
  pickupPostalCode: "",
  pickupPhone: "",

  deliveryAddress1: "",
  deliveryAddress2: "",
  deliveryPostalCode: "",
  deliveryPhone: "",
  initialApiLoader: false,
  unitSelectionLoader: false,
  currentLocationPostalCode: "",
  saveType: "",
  advanceAmount: 0,
  companyNames: [],
  masterUser: false,
  unitCompanyList: [],
  checkinDate: "",
  checkinTime: "",
  checkinDateValid: true,
  lastCheckinEntryDate: null,
};

const DriverCheckinSlice = createSlice({
  name: "DriverCheckinSlice",
  initialState: initialState,
  reducers: {
    setCheckinAdv: (state, action) => {
      state.checkinAdv = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setSisterDispatchFK: (state, action) => {
      state.sisterDispatchFK = action.payload;
    },
    setCompanyFK: (state, action) => {
      state.companyFK = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setActiveString: (state, action) => {
      state.activeString = action.payload;
    },
    setDeleased: (state, action) => {
      state.deleased = action.payload;
    },
    setDriverData: (state, action) => {
      state.driverData = action.payload;
    },
    setDriverData1: (state, action) => {
      state.driverData1 = action.payload;
    },
    setUnitData: (state, action) => {
      state.unitData = action.payload;
    },
    setUnitData1: (state, action) => {
      state.unitData1 = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSortValue2: (state, action) => {
      state.sortValue2 = action.payload;
    },
    setSortType2: (state, action) => {
      state.sortType2 = action.payload;
    },
    setSortValueOfunit: (state, action) => {
      state.sortValueOfunit = action.payload;
    },
    setSortType1: (state, action) => {
      state.sortType1 = action.payload;
    },
    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
    setUnitId: (state, action) => {
      state.unitId = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPageNumberForUnitSelection: (state, action) => {
      state.pageNumberForUnitSelection = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setFormPageNumber: (state, action) => {
      state.formPageNumber = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElementsForUnit: (state, action) => {
      state.totalElementsForUnit = action.payload;
    },
    setTotalPagesForUnit: (state, action) => {
      state.totalPagesForUnit = action.payload;
    },

    setEtaDate: (state, action) => {
      state.etaDate = action.payload;
    },
    setEpuDate: (state, action) => {
      state.epuDate = action.payload;
    },
    setDeliveryState: (state, action) => {
      state.deliveryState = action.payload;
    },

    setDeliveryCity: (state, action) => {
      state.deliveryCity = action.payload;
    },

    setDeliveryName: (state, action) => {
      state.deliveryName = action.payload;
    },
    setPickupState: (state, action) => {
      state.pickupState = action.payload;
    },

    setPickupCity: (state, action) => {
      state.pickupCity = action.payload;
    },
    setPickupName: (state, action) => {
      state.pickupName = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setRow: (state, action) => {
      state.row = action.payload;
    },
    setYard: (state, action) => {
      state.yard = action.payload;
    },

    setSpecialCode: (state, action) => {
      state.specialCode = action.payload;
    },
    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setUnitType: (state, action) => {
      state.unitType = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },

    setEpuScreen: (state, action) => {
      state.epuScreen = action.payload;
    },
    setEtaScreen: (state, action) => {
      state.etaScreen = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setIsCityState: (state, action) => {
      state.isCityState = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setIsDelay: (state, action) => {
      state.isDelay = action.payload;
    },
    setCityStateValidation: (state, action) => {
      state.cityStateValidation = action.payload;
    },
    setCurrentLocationCity: (state, action) => {
      state.currentLocationCity = action.payload;
    },
    setCurrentLocationStateCode: (state, action) => {
      state.currentLocationStateCode = action.payload;
    },
    setDispatchId: (state, action) => {
      state.dispatchId = action.payload;
    },
    setWithoutunit: (state, action) => {
      state.withoutunit = action.payload;
    },
    setCityvalidation: (state, action) => {
      state.cityvalidation = action.payload;
    },
    setPostalId: (state, action) => {
      state.postalId = action.payload;
    },
    setCityStateCheck: (state, action) => {
      state.cityStateCheck = action.payload;
    },
    /**Added for Add
     * comments in driver service
     * */
    setCommentsData: (state, action) => {
      state.commentsData = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setCommentsClearBit: (state, action) => {
      state.commentsClearBit = action.payload;
    },
    setCityStateComination: (state, action) => {
      state.cityStateComination = action.payload;
    },
    setCityToYardShuttlePopup: (state, action) => {
      state.cityToYardShuttlePopup = action.payload;
    },
    setPickupAddress1: (state, action) => {
      state.pickupAddress1 = action.payload;
    },
    setPickupAddress2: (state, action) => {
      state.pickupAddress2 = action.payload;
    },
    setPickupPostalCode: (state, action) => {
      state.pickupPostalCode = action.payload;
    },
    setPickupPhone: (state, action) => {
      state.pickupPhone = action.payload;
    },
    setDeliveryAddress1: (state, action) => {
      state.deliveryAddress1 = action.payload;
    },
    setDeliveryAddress2: (state, action) => {
      state.deliveryAddress2 = action.payload;
    },
    setDeliveryPostalCode: (state, action) => {
      state.deliveryPostalCode = action.payload;
    },
    setDeliveryPhone: (state, action) => {
      state.deliveryPhone = action.payload;
    },
    setInitialApiLoader: (state, action) => {
      state.initialApiLoader = action.payload;
    },
    setUnitSelectionLoader: (state, action) => {
      state.unitSelectionLoader = action.payload;
    },
    setCurrentLocationPostalCode: (state, action) => {
      state.currentLocationPostalCode = action.payload;
    },
    setSaveType: (state, action) => {
      state.saveType = action.payload;
    },
    setAdvanceAmount: (state, action) => {
      state.advanceAmount = action.payload;
    },
    setCompanyNames: (state, action) => {
      state.companyNames = action.payload;
    },
    setMasterUser: (state, action) => {
      state.masterUser = action.payload;
    },
    setUnitCompanyList: (state, action) => {
      state.unitCompanyList = action.payload;
    },
    setCheckinDate: (state, action) => {
      state.checkinDate = action.payload;
    },
    setCheckinTime: (state, action) => {
      state.checkinTime = action.payload;
    },
    setCheckinDateValid: (state, action) => {
      state.checkinDateValid = action.payload;
    },
    setLastCheckinEntryDate: (state, action) => {
      state.lastCheckinEntryDate = action.payload;
    },
    resetDriverCheckinState: () => ({ ...initialState }),
  },
});

export const {
  setActive,
  setActiveString,
  setDeleased,
  setFirstName,
  setLastName,
  setSearchCriteria,
  setDriverData,
  setSortType,
  setSortValue,
  setSortType2,
  setSortValue2,
  setSortType1,
  setSortValueOfunit,
  setDriverId,
  setFormPageNumber,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setChangeColor,
  setUnitId,
  setPageNumberForUnitSelection,
  setTotalElementsForUnit,
  setTotalPagesForUnit,
  setUnitData,
  setDriverData1,
  setUnitData1,
  setEtaDate,
  setDeliveryState,
  setEpuDate,
  setDeliveryCity,
  setDeliveryName,
  setPickupState,
  setPickupCity,
  setPickupName,
  setPosition,
  setRow,
  setYard,
  setSpecialCode,
  setUnitNumber,
  setUnitType,
  setModel,
  setFormData,
  setListingData,
  setEpuScreen,
  setNotes,
  setEtaScreen,
  setIsCityState,
  setCity,
  setState,
  setIsDelay,
  setCityStateValidation,
  setCurrentLocationValues,
  setCurrentLocationStateCode,
  setCurrentLocationCity,
  setDispatchId,
  setWithoutunit,
  setCityvalidation,
  setPostalId,
  setCityStateCheck,
  setCompanyName,
  setCompanyFK,
  setSisterDispatchFK,
  setCheckinAdv,
  setCommentsData,
  setDisableSave,
  setCommentsClearBit,
  setCityStateComination,
  setCityToYardShuttlePopup,
  setPickupAddress1,
  setPickupAddress2,
  setPickupPostalCode,
  setPickupPhone,
  setDeliveryAddress1,
  setDeliveryAddress2,
  setDeliveryPostalCode,
  setDeliveryPhone,
  setInitialApiLoader,
  setUnitSelectionLoader,
  setCurrentLocationPostalCode,
  setSaveType,
  setAdvanceAmount,
  setCompanyNames,
  setMasterUser,
  setUnitCompanyList,
  setCheckinDate,
  setCheckinTime,
  setCheckinDateValid,
  setLastCheckinEntryDate,
  resetDriverCheckinState,
} = DriverCheckinSlice.actions;

export default DriverCheckinSlice.reducer;
