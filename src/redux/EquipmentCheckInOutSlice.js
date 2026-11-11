import { createSlice } from "@reduxjs/toolkit";
const EquipmentCheckInOutSlice = createSlice({
  name: "EquipmentCheckInOut",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    equipmentData: [],
    saveFormData: null,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    checkDetail: false,
    changeColor: false,
    editFormData: null,
    editFormDataCheckIn: null,
    normalSortValue: null,
    normalSortFlag: false,
    selectedStatus: "All",

    //Checkin screen
    equipmentNumber: "",
    description: "",
    serialNumber: "",
    assignedToDriver: "",
    assignedToUnit: "",
    expirationDate: "",
    depositRequired: false,
    depositAmount: "",
    isPlate: false,
    plateState: "",
    unitId: null,
    unitInput: "",
    driverId: null,
    driverInput: "",
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
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
    setEquipmentData: (state, action) => {
      state.equipmentData = action.payload;
    },
    setSaveFormData: (state, action) => {
      state.saveFormData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setCheckDetail: (state, action) => {
      state.checkDetail = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setEditFormDataCheckIn: (state, action) => {
      state.editFormDataCheckIn = action.payload;
    },

    resetChanges: (state, action) => {
      state.equipmentNumber = "";
      state.serialNumber = "";
      state.description = "";
      state.assignedToDriver = "";
      state.assignedToUnit = "";
      state.expirationDate = "";
      state.depositRequired = false;
      state.depositAmount = "";
      state.isPlate = false;
      state.plateState = "";
      state.checkDetail = false;
      state.unitInput = "";
      state.driverInput = "";
      state.driverId = null;
      state.unitId = null;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    //Checkin screen
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
    setExpirationDate: (state, action) => {
      state.expirationDate = action.payload;
    },
    setDepositRequired: (state, action) => {
      state.depositRequired = action.payload;
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
    setUnitId: (state, action) => {
      state.unitId = action.payload;
    },
    setUnitInput: (state, action) => {
      state.unitInput = action.payload;
    },
    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
    setDriverInput: (state, action) => {
      state.driverInput = action.payload;
    },
    resetClose: (state, action) => {
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.selectedStatus = "All";
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setEquipmentData,
  setSaveFormData,
  setSearchTerm,
  setSelectedSearchCriteria,
  setCheckDetail,
  setBrowseNavigation,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setEditFormData,
  setEditFormDataCheckIn,

  resetChanges,
  setSelectedStatus,
  setEquipmentNumber,
  setSerialNumber,
  setDescription,
  setAssignedToDriver,
  setAssignedToUnit,
  setDepositAmount,
  setDepositRequired,
  setPlateState,
  setIsPlate,
  setExpirationDate,
  setUnitId,
  setUnitInput,
  setDriverId,
  setDriverInput,
  resetClose,
} = EquipmentCheckInOutSlice.actions;

export const EquipmentCheckInOut = (state) => state.EquipmentCheckInOut.value;
export default EquipmentCheckInOutSlice.reducer;
