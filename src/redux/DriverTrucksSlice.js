import { createSlice } from "@reduxjs/toolkit";

const DriverTrucksSlice = createSlice({
  name: "driverTrucks",
  selectedId: "null",
  viewDetails: false,
  initialState: {
    searchTerm: "",
    searchCriteria: "Beginning",
    selectedStatus: "Active",
    listingData: [],
    pageNumber: 0,
    totalPage: 0,
    totalElement: 0,
    normalSortValue: null,
    normalSortFlag: false,
    isGeneralTabValid: false,
    isComplianceTabValid: false,
    isMaintenanceTabValid: false,
    isLeaseTabValid: false,
    formData: null,
    driverTruckData: null,
    changeColor: false,
    descriptionUnique: false,
    driverId: 41,
    isFirstTruck: false,
    isEldChecked: false,
    ownerCity: "",
    ownerStatecode: "",
    Canadian: false,
    ownerPostcode: "",
    showPrincipleModel: false,
    onCancel: false,
    active: true,
    isTabIdentification: false,
    isRequiredReserve: false,
    saveLoad: false,
    printTruckData: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setPrintTruckData: (state, action) => {
      state.printTruckData = action.payload;
    },
    setSaveLoad: (state, action) => {
      state.saveLoad = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPage = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElement = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },

    setIsGeneralTabValid: (state, action) => {
      state.isGeneralTabValid = action.payload;
    },

    setIsComplianceTabValid: (state, action) => {
      state.isComplianceTabValid = action.payload;
    },

    setIsMaintenanceTabValid: (state, action) => {
      state.isMaintenanceTabValid = action.payload;
    },
    setIsLeaseTabValid: (state, action) => {
      state.isLeaseTabValid = action.payload;
    },
    setViewDetails: (state, action) => {
      state.viewDetails = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },

    setFormData: (state, action) => {
      state.formData = action.payload;
    },

    setDescriptionUnique: (state, action) => {
      state.descriptionUnique = action.payload;
    },
    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
    setIsFirstTruck: (state, action) => {
      state.isFirstTruck = action.payload;
    },
    setIsEldChecked: (state, action) => {
      state.isEldChecked = action.payload;
    },
    setIsTabIdentification: (state, action) => {
      state.isTabIdentification = action.payload;
    },
    setOwnerCity: (state, action) => {
      state.ownerCity = action.payload;
    },
    setOwnerStatecode: (state, action) => {
      state.ownerStatecode = action.payload;
    },
    setCanadian: (state, action) => {
      state.Canadian = action.payload;
    },
    setOwnerPostCode: (state, action) => {
      state.ownerPostcode = action.payload;
    },
    setShowPrincipleModel: (state, action) => {
      state.showPrincipleModel = action.payload;
    },
    setOnCancel: (state, action) => {
      state.onCancel = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setIsRequiredReserve: (state, action) => {
      state.isRequiredReserve = action.payload;
    },

    setDriverTruckData: (state, { payload }) => {
      state.driverTruckData = { ...state.driverTruckData, ...payload };
    },

    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    resetDriverTrucksData: (state) => {
      state.driverTruckData = null;
    },

    resetDriverTrucks: (state) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.selectedStatus = "Active";
      state.listingData = [];
      state.pageNumber = 0;
      state.totalElement = 0;
      state.totalPage = 0;
      state.selectedId = null;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.selectedId = "null";
      state.changeColor = "false";
      state.driverTruckData = null;
      state.isRequiredReserve = false;
    },
  },
});
export const {
  setSaveLoad,
  setListingData,
  setSearchTerm,
  setSearchCriteria,
  setSelectedStatus,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setNormalSortValue,
  setNormalSortFlag,
  setIsGeneralTabValid,
  setIsComplianceTabValid,
  setIsMaintenanceTabValid,
  setIsLeaseTabValid,
  setViewDetails,
  setSelectedId,
  setFormData,
  setChangeColor,
  setDriverTruckData,
  setDescriptionUnique,
  setDriverId,
  setIsFirstTruck,
  setIsEldChecked,
  setIsTabIdentification,
  setOwnerCity,
  setOwnerStatecode,
  setOwnerCanadian,
  setOwnerPostCode,
  setPostalCodeOnChange,
  setOnCancel,
  setPrintTruckData,
  setActive,
  setIsRequiredReserve,
  toggleChangesCancelled,
  setShowPrincipleModel,
  resetDriverTrucks,
  resetDriverTrucksData,
} = DriverTrucksSlice.actions;
export default DriverTrucksSlice.reducer;
