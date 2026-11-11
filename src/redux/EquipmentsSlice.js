import { createSlice } from "@reduxjs/toolkit";
const EquipmentsSlice = createSlice({
  name: "EquipmentSlice",
  initialState: {
    // fetch data
    listingData: [],
    listingHistoryData: [],
    selectedEquipmentStatus: "Complete",
    selectedStatus: "Active",
    selectedId: null,
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    //input fields
    equipmentPK: "",
    equipmentNumber: "",
    description: "",
    serialNumber: "",
    assignedToDriver: false,
    assignedToUnit: false,
    requireReserve: false,
    blockDispatch: false,
    driverFK: "",
    active: true,
    available: false,
    expirationDate: "",
    deposit: false,
    depositAmount: 0.0,
    isPlate: false,
    plateState: "",
    isPlateStateValid: false,
    isDescriptionValid: false,
    unitNumber: "",
    assignToUnit: false,
    unit: null,

    // search filter
    searchTerms: "",
    searchCriteria: "Beginning",
    // pagination
    pageNumber: 0,
    pageNumberHistory: 0,
    totalPages: 0,
    totalElements: 0,
    // resetChanges,

    // editing

    viewDetail: false,
    changeColor: false,
    editFormData: null,
    changesCancelled: false,
    inputfields: false,
    isEquipmentUnique: false,
    showAdvanceSort: false,
    sortFlag: false,
    sortValue: null,
    isAnEld: false,
    reserveInput: "",
    reserveId: null,
    expirationDateValid: false,
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setPageNumberHistory: (state, action) => {
      state.pageNumberHistory = action.payload;
    },
    setListingHistoryData: (state, action) => {
      state.listingHistoryData = action.payload;
    },

    setInputfields: (state, action) => {
      state.inputfields = action.payload;
    },

    setSelectedEquipmentStatus: (state, action) => {
      state.selectedEquipmentStatus = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setEquipmentPK: (state, action) => {
      state.equipmentPK = action.payload;
    },
    setEquipmentNumber: (state, action) => {
      state.equipmentNumber = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setSerialNumber: (state, action) => {
      state.serialNumber = action.payload;
    },
    setAssignedToDriver: (state, action) => {
      state.assignedToDriver = action.payload;
    },
    setAssignedToUnit: (state, action) => {
      state.assignedToUnit = action.payload;
    },

    setBlockDispatch: (state, action) => {
      state.blockDispatch = action.payload;
    },
    setRequireReserve: (state, action) => {
      state.requireReserve = action.payload;
    },
    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setAvailable: (state, action) => {
      state.available = action.payload;
    },
    setExpirationDate: (state, action) => {
      state.expirationDate = action.payload;
    },
    setDeposit: (state, action) => {
      state.deposit = action.payload;
    },
    setDepositAmount: (state, action) => {
      state.depositAmount = action.payload;
    },
    setIsPlate: (state, action) => {
      state.isPlate = action.payload;
    },
    setPlateState: (state, action) => {
      state.plateState = action.payload;
    },
    setIsPlateStateValid: (state, action) => {
      state.isPlateStateValid = action.payload;
    },
    setIsDescriptionValid: (state, action) => {
      state.isDescriptionValid = action.payload;
    },
    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setAssignToUnit: (state, action) => {
      state.assignToUnit = action.payload;
    },

    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setShowAdvanceSort: (state, action) => {
      state.showAdvanceSort = action.payload;
    },

    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
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
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setIsEquipmentUnique: (state, action) => {
      state.isEquipmentUnique = action.payload;
    },
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
    setIsAnEld: (state, action) => {
      state.isAnEld = action.payload;
    },
    setReserveInput: (state, action) => {
      state.reserveInput = action.payload;
    },
    setExpirationDateValid: (state, action) => {
      state.expirationDateValid = action.payload;
    },

    setReserveId: (state, action) => {
      state.reserveId = action.payload;
    },
    resetChanges: (state, action) => {
      state.equipmentPK = "";
      state.equipmentNumber = "";
      state.description = "";
      state.serialNumber = "";
      state.assignedToDriver = false;
      state.requireReserve = false;
      state.blockDispatch = false;
      state.driverFK = "";
      state.available = true;
      state.expirationDate = "";
      state.deposit = false;
      state.depositAmount = "";
      state.isPlate = false;
      state.plateState = "";
      state.unitNumber = "";
      state.assignToUnit = false;
      state.active = true;
      state.isAnEld = false;
      state.selectedId = null;
      state.reserveId = null;
    },
  },
});
export const {
  setListingData,
  setSelectedEquipmentStatus,
  setSelectedStatus,
  setEquipmentPK,
  setEquipmentNumber,
  setDescription,
  setSerialNumber,
  setAssignedToDriver,
  setRequireReserve,
  setBlockDispatch,
  setNormalSortValue,
  setNormalSortFlag,
  setDriverFK,
  setDriverPK,
  setActive,
  setAvailable,
  setExpirationDate,
  setDeposit,
  setDepositAmount,
  setIsPlate,
  setPlateState,
  setSearchTerms,
  setSearchCriteria,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  resetChanges,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  setChangesCancelled,
  setSelectedId,
  setUnitNumber,
  setAssignToUnit,
  setUnitPK,
  setUnit,
  setInputfields,
  setIsPlateStateValid,
  setListingHistoryData,
  setIsDescriptionValid,
  resetEquipment,
  setAssignedToUnit,
  setIsEquipmentUnique,
  setShowAdvanceSort,
  setSortValue,
  setSortFlag,
  setIsAnEld,
  setPageNumberHistory,
  setReserveInput,
  setReserveId,
  setExpirationDateValid,
} = EquipmentsSlice.actions;

export default EquipmentsSlice.reducer;
