import { createSlice } from "@reduxjs/toolkit";

// Move initialState out of createSlice
const initialState = {
  // pagination
  pageNumber: 0,
  totalPages: 0,
  totalElements: 0,
  listingData: [],
  selectedId: "",
  selectedStatus: "Active",

  // fields
  transportCompanyPK: null,
  name: "",
  address1: "",
  address2: "",
  phone: null,
  alternatePhone: null,
  fAXNumber: "",
  ein: "",
  email: "",
  dispatcher: "",
  dispatcherPhone: "",
  dispatcherCellPhone: "",
  dispatcherEmail: "",
  dispatchEmail: "",
  towaway: false,
  haulAndTow: false,
  lowboy: false,
  popup: false,
  truckCamper: false,
  motorized: false,
  city: "",
  stateCode: "",
  insuranceCompany: "",
  insuranceAddress1: "",
  insuranceAddress2: "",
  insuranceCity: "",
  insuranceStateCode: "",
  insurancePostalCode: "",
  insuranceContact: "",
  insuranceEmail: "",
  insuranceFAX: "",
  insurancePhone: "",
  insuranceCanadian: false,
  insurancePolicyNumber: "",
  notes: "",
  postalCode: "",
  postalCodeOnChange: false,
  onCancel: false,
  einFormat: true,
  emailFormat: true,

  // search
  searchTerm: "",
  searchCriteria: "Beginning",
  changeColor: false,
  viewDetail: false,
  editFormData: null,
  changesCancelled: false,
  normalSortValue: null,
  normalSortFlag: false,
  active: true,
  canadianRedux: false,
  isNameExist: false,
  isEinExist: false,
  dispatchEmailValid: true,
  dispatcherEmailValid: true,
  postalCodePK: null,
  insurancePostalCodePK: null,
  insuranceEmailValid: true,
};

const TransportCompaniesSlice = createSlice({
  name: "transportCompaniesSlice",
  initialState,
  reducers: {
    setPostalCode: (state, action) => {
      state.postalCode = action.payload;
    },
    setStateCode: (state, action) => {
      state.stateCode = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setChangesCancelled: (state) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAddress1: (state, action) => {
      state.address1 = action.payload;
    },
    setAddress2: (state, action) => {
      state.address2 = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setAlternatePhone: (state, action) => {
      state.alternatePhone = action.payload;
    },
    setFAXNumber: (state, action) => {
      state.fAXNumber = action.payload;
    },
    setEIN: (state, action) => {
      state.ein = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setDispatcher: (state, action) => {
      state.dispatcher = action.payload;
    },
    setDispatcherPhone: (state, action) => {
      state.dispatcherPhone = action.payload;
    },
    setDispatcherCellPhone: (state, action) => {
      state.dispatcherCellPhone = action.payload;
    },
    setDispatcherEmail: (state, action) => {
      state.dispatcherEmail = action.payload;
    },
    setDispatchEmail: (state, action) => {
      state.dispatchEmail = action.payload;
    },
    setTowaway: (state, action) => {
      state.towaway = action.payload;
    },
    setHaulAndTow: (state, action) => {
      state.haulAndTow = action.payload;
    },
    setLowboy: (state, action) => {
      state.lowboy = action.payload;
    },
    setPopup: (state, action) => {
      state.popup = action.payload;
    },
    setTruckCamper: (state, action) => {
      state.truckCamper = action.payload;
    },
    setMotorized: (state, action) => {
      state.motorized = action.payload;
    },
    setTransportCompanyPK: (state, action) => {
      state.transportCompanyPK = action.payload;
    },
    setPostalCodeCity: (state, action) => {
      state.city = action.payload;
    },
    setPostalCodeStateCode: (state, action) => {
      state.stateCode = action.payload;
    },
    setTransportCompanyPostalCode: (state, action) => {
      state.postalCode = action.payload;
    },
    setPostalCodeOnChange: (state, action) => {
      state.postalCodeOnChange = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setInsuranceCompany: (state, action) => {
      state.insuranceCompany = action.payload;
    },
    setInsuranceAddress1: (state, action) => {
      state.insuranceAddress1 = action.payload;
    },
    setInsuranceAddress2: (state, action) => {
      state.insuranceAddress2 = action.payload;
    },
    setInsuranceCity: (state, action) => {
      state.insuranceCity = action.payload;
    },
    setInsuranceStateCode: (state, action) => {
      state.insuranceStateCode = action.payload;
    },
    setInsurancePostalCode: (state, action) => {
      state.insurancePostalCode = action.payload;
    },
    setInsuranceContact: (state, action) => {
      state.insuranceContact = action.payload;
    },
    setInsuranceEmail: (state, action) => {
      state.insuranceEmail = action.payload;
    },
    setInsuranceFAX: (state, action) => {
      state.insuranceFAX = action.payload;
    },
    setInsurancePhone: (state, action) => {
      state.insurancePhone = action.payload;
    },
    setInsuranceCanadian: (state, action) => {
      state.insuranceCanadian = action.payload;
    },
    setInsurancePolicyNumber: (state, action) => {
      state.insurancePolicyNumber = action.payload;
    },
    setInsuranceNotes: (state, action) => {
      state.notes = action.payload;
    },
    setEinFormat: (state, action) => {
      state.einFormat = action.payload;
    },
    setEmailFormat: (state, action) => {
      state.emailFormat = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setCanadianRedux: (state, action) => {
      state.canadianRedux = action.payload;
    },
    setIsNameExist: (state, action) => {
      state.isNameExist = action.payload;
    },
    setIsEinExist: (state, action) => {
      state.isEinExist = action.payload;
    },
    setDispatcherEmailValid: (state, action) => {
      state.dispatcherEmailValid = action.payload;
    },
    setDispatchEmailValid: (state, action) => {
      state.dispatchEmailValid = action.payload;
    },
    setPostalCodePKS: (state, action) => {
      state.postalCodePK = action.payload;
    },
    setInsurancePostalCodePKS: (state, action) => {
      state.insurancePostalCodePK = action.payload;
    },
    setInsuranceEmailValid: (state, action) => {
      state.insuranceEmailValid = action.payload;
    },

    //  Reset the entire slice to initial state
    resetAll: () => initialState,
  },
});

//  Export all actions including resetAll
export const {
  setPageNumber,
  setPostalCodeCity,
  setPostalCodeStateCode,
  setTransportCompanyPostalCode,
  setTotalElements,
  setTotalPages,
  setSearchTerm,
  setSearchCriteria,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  resetChanges,
  resetAll,
  setListingData,
  setSelectedId,
  setChangesCancelled,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedStatus,
  setName,
  setAddress1,
  setAddress2,
  setPhone,
  setAlternatePhone,
  setFAXNumber,
  setEIN,
  setEmail,
  setDispatcher,
  setDispatcherPhone,
  setDispatcherCellPhone,
  setDispatcherEmail,
  setDispatchEmail,
  setTowaway,
  setHaulAndTow,
  setLowboy,
  setPopup,
  setTruckCamper,
  setMotorized,
  setTransportCompanyPK,
  setPostalCodeOnChange,
  setOnCancel,
  setInsuranceCompany,
  setInsuranceAddress1,
  setInsuranceAddress2,
  setInsuranceCity,
  setInsuranceStateCode,
  setInsurancePostalCode,
  setInsuranceContact,
  setInsuranceEmail,
  setInsuranceFAX,
  setInsurancePhone,
  setInsuranceCanadian,
  setInsurancePolicyNumber,
  setInsuranceNotes,
  setEinFormat,
  setEmailFormat,
  setStateCode,
  setCity,
  setPostalCode,
  setActive,
  setCanadianRedux,
  setIsNameExist,
  setIsEinExist,
  setDispatchEmailValid,
  setDispatcherEmailValid,
  setPostalCodePKS,
  setInsurancePostalCodePKS,
  setInsuranceEmailValid,
} = TransportCompaniesSlice.actions;

export default TransportCompaniesSlice.reducer;
