import { createSlice } from "@reduxjs/toolkit";

const DamageProcessingSlice = createSlice({
  name: "damageProcessing",
  initialState: {
    damageUnitPK: null,
    unitFK: null,
    dispatchFK: null,
    sisterCompanyFK: null,
    sisterDamageUnitFK: null,
    sisterUnitFK: null,
    sisterDispatchFK: null,
    driverFK: null,
    transportCompanyFK: null,
    damagedUnitCodeFK: null,
    damageUnitLocationFK: null,
    workingUnitLocationFK: null,
    damageDate: new Date().toISOString(),
    reported: new Date().toISOString(),
    damageContact: "",
    damageContactPhone: null,
    damageContactExtension: null,
    damageContactFAX: null,
    atPickup: null,
    inYard: null,
    breakdown: null,
    damage: null,
    delay: null,
    returned: null,
    returnedBySameDriver: null,
    returnedToPickupLocation: null,
    unitReturnFK: null,
    refused: null,
    active: null,
    lastUpdate: null,
    driverReleased: null,
    driverReleaseDate: null,
    delayInHouseNotes: "",
    delayCustomerNotes: "",
    inHouseNotes: "",
    customerNotes: "",
    emailList: [],
    currentLocation: {
      name: "",
      address1: "",
      address2: "",
      city: "",
      stateCode: "",
      postalCode: "",
    },
    viewOnly: true,
    deliveryCheck: false,
    user: "",
    editFlag: false,
    locationContact: "",
    locationPhone: "",
    activeKey: "general",
    isPostal: false,
    isCurrentLocEmpty: false,
    delayedUnitCodeInput: "",
    delayedUnitCodeID: "",
    isEmailClicked: false,
    initialEmailList: [],
    emailData: [],
  },
  reducers: {
    setDelayedUnitPK: (state, action) => {
      state.delayedUnitPK = action.payload;
    },
    setUnitFK: (state, action) => {
      state.unitFK = action.payload;
    },
    setDispatchFK: (state, action) => {
      state.dispatchFK = action.payload;
    },
    setSisterCompanyFK: (state, action) => {
      state.sisterCompanyFK = action.payload;
    },
    setSisterDelayedUnitFK: (state, action) => {
      state.sisterDelayedUnitFK = action.payload;
    },
    setSisterUnitFK: (state, action) => {
      state.sisterUnitFK = action.payload;
    },
    setSisterDispatchFK: (state, action) => {
      state.sisterDispatchFK = action.payload;
    },
    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },
    setTransportCompanyFK: (state, action) => {
      state.transportCompanyFK = action.payload;
    },
    setDelayedUnitCodeFK: (state, action) => {
      state.delayedUnitCodeFK = action.payload;
    },
    setDelayUnitLocationFK: (state, action) => {
      state.delayUnitLocationFK = action.payload;
    },
    setWorkingUnitLocationFK: (state, action) => {
      state.workingUnitLocationFK = action.payload;
    },
    setDelayDate: (state, action) => {
      state.delayDate = action.payload;
    },
    setReported: (state, action) => {
      state.reported = action.payload;
    },
    setDelayContact: (state, action) => {
      state.delayContact = action.payload;
    },
    setDelayContactPhone: (state, action) => {
      state.delayContactPhone = action.payload;
    },
    setDelayContactExtension: (state, action) => {
      state.delayContactExtension = action.payload;
    },
    setDelayContactFAX: (state, action) => {
      state.delayContactFAX = action.payload;
    },
    setAtPickup: (state, action) => {
      state.atPickup = action.payload;
    },
    setInYard: (state, action) => {
      state.inYard = action.payload;
    },
    setBreakdown: (state, action) => {
      state.breakdown = action.payload;
    },
    setDamage: (state, action) => {
      state.damage = action.payload;
    },
    setDelay: (state, action) => {
      state.delay = action.payload;
    },
    setReturned: (state, action) => {
      state.returned = action.payload;
    },
    setReturnedBySameDriver: (state, action) => {
      state.returnedBySameDriver = action.payload;
    },
    setReturnedToPickupLocation: (state, action) => {
      state.returnedToPickupLocation = action.payload;
    },
    setUnitReturnFK: (state, action) => {
      state.unitReturnFK = action.payload;
    },
    setRefused: (state, action) => {
      state.refused = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setLastUpdate: (state, action) => {
      state.lastUpdate = action.payload;
    },
    setDriverReleased: (state, action) => {
      state.driverReleased = action.payload;
    },
    setDriverReleaseDate: (state, action) => {
      state.driverReleaseDate = action.payload;
    },
    setDelayInHouseNotes: (state, action) => {
      state.delayInHouseNotes = action.payload;
    },
    setDelayCustomerNotes: (state, action) => {
      state.delayCustomerNotes = action.payload;
    },
    setInHouseNotes: (state, action) => {
      state.inHouseNotes = action.payload;
    },
    setCustomerNotes: (state, action) => {
      state.customerNotes = action.payload;
    },
    setEmailList: (state, action) => {
      state.emailList = action.payload;
    },

    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setViewOnly: (state, action) => {
      state.viewOnly = action.payload;
    },
    setDeliveryCheck: (state, action) => {
      state.deliveryCheck = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setEditFlag: (state, action) => {
      state.editFlag = action.payload;
    },
    setLocationContact: (state, action) => {
      state.locationContact = action.payload;
    },
    setLocationPhone: (state, action) => {
      state.locationPhone = action.payload;
    },
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
    setIsPostal: (state, action) => {
      state.isPostal = action.payload;
    },
    setIsCurrentLocEmpty: (state, action) => {
      state.isCurrentLocEmpty = action.payload;
    },
    setDelayedUnitCodeInput: (state, action) => {
      state.delayedUnitCodeInput = action.payload;
    },
    setDelayedUnitCodeID: (state, action) => {
      state.delayedUnitCodeID = action.payload;
    },
    setIsEmailClicked: (state, action) => {
      state.isEmailClicked = action.payload;
    },
    setInitialEmailList: (state, action) => {
      state.initialEmailList = action.payload;
    },
    setEmailData: (state, action) => {
      state.emailData = action.payload;
    },
  },
});

export const {
  setDelayedUnitPK,
  setUnitFK,
  setDispatchFK,
  setSisterCompanyFK,
  setSisterDelayedUnitFK,
  setSisterUnitFK,
  setSisterDispatchFK,
  setDriverFK,
  setTransportCompanyFK,
  setDelayedUnitCodeFK,
  setDelayUnitLocationFK,
  setWorkingUnitLocationFK,
  setDelayDate,
  setReported,
  setDelayContact,
  setDelayContactPhone,
  setDelayContactExtension,
  setDelayContactFAX,
  setAtPickup,
  setInYard,
  setBreakdown,
  setDamage,
  setDelay,
  setReturned,
  setReturnedBySameDriver,
  setReturnedToPickupLocation,
  setUnitReturnFK,
  setRefused,
  setActive,
  setLastUpdate,
  setDriverReleased,
  setDriverReleaseDate,
  setDelayInHouseNotes,
  setDelayCustomerNotes,
  setInHouseNotes,
  setCustomerNotes,
  setEmailList,
  setCurrentLocation,
  setViewOnly,
  setDeliveryCheck,
  setUser,
  setEditFlag,
  setLocationContact,
  setLocationPhone,
  setActiveKey,
  setIsPostal,
  setIsCurrentLocEmpty,
  setDelayedUnitCodeInput,
  setDelayedUnitCodeID,
  setIsEmailClicked,
  setInitialEmailList,
  setEmailData,
} = DamageProcessingSlice.actions;

export default DamageProcessingSlice.reducer;
