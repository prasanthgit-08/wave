import { createSlice } from "@reduxjs/toolkit";

const ApproveHeldSlice = createSlice({
  name: "approveHeld",
  initialState: {
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    searchCriteria: "both",
    unitShuttlePK: "",
    approveData: null,
    approveOrDeigned: false,

    //filering
    approveHeldShuttleData: [],
    id: "",
    viewDetail: false,
    changeColor: false,
    editFormData: null,

    //unitSelection
    isSisterUnit: false,
    approveHeldUnitData: [],
    selectedId: null,
    changeColorUnit: false,
    unitPageNumber: 0,
    unitTotalPages: 0,
    unitTotalElements: 0,

    //normal sort
    normalSortValue: null,
    normalSortFlag: false,
    innerSortValue: null,
    innerSortFlag: false,

    //input
    driverName: "",
    pickUp: "",
    whatPickUp: "",
    whatDelivery: "",
    delivery: "",
    unitNumber: "",
    shuttleAmount: "",
    runType: "shuttle",
    unitNum: "",
    amount: "",
    reason: "",
    shuttleDate: "",
    deignedReason: "",
    approve: false,
    deigned: false,
  },

  reducers: {
    setApproveOrDeigned: (state, action) => {
      state.approveOrDeigned = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setInnerSortValue: (state, action) => {
      state.innerSortValue = action.payload;
    },
    setInnerSortFlag: (state, action) => {
      state.innerSortFlag = action.payload;
    },
    setWhatDelivery: (state, action) => {
      state.whatDelivery = action.payload;
    },
    setWhatPickUp: (state, action) => {
      state.whatPickUp = action.payload;
    },
    setApprove: (state, action) => {
      state.approve = action.payload;
    },
    setDeigned: (state, action) => {
      state.deigned = action.payload;
    },
    setDeignedReason: (state, action) => {
      state.deignedReason = action.payload;
    },
    setShuttleDate: (state, action) => {
      state.shuttleDate = action.payload;
    },
    setReason: (state, action) => {
      state.reason = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setApproveData: (state, action) => {
      state.approveData = action.payload;
    },
    setApproveHeldShuttleData: (state, action) => {
      state.approveHeldShuttleData = action.payload;
    },
    setApproveHeldUnitData: (state, action) => {
      state.approveHeldUnitData = action.payload;
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
    setId: (state, action) => {
      state.id = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setDriverName: (state, action) => {
      state.driverName = action.payload;
    },
    setUnitNum: (state, action) => {
      state.unitNum = action.payload;
    },
    setRunType: (state, action) => {
      state.runType = action.payload;
    },
    setPickUp: (state, action) => {
      state.pickUp = action.payload;
    },
    setDelivery: (state, action) => {
      state.delivery = action.payload;
    },
    setIsSisterUnit: (state, action) => {
      state.isSisterUnit = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setChangeColorUnit: (state, action) => {
      state.changeColorUnit = action.payload;
    },
    setUnitPageNumber: (state, action) => {
      state.unitPageNumber = action.payload;
    },
    setUnitTotalPages: (state, action) => {
      state.unitTotalPages = action.payload;
    },
    setUnitTotalElements: (state, action) => {
      state.unitTotalElements = action.payload;
    },
    resetChanges: (state, action) => {
      state.driverName = "";
      state.pickUp = "";
      state.delivery = "";
      state.searchCriteria = "both";
      state.unitNum = "";
      state.amount = "";
      state.reason = "";
      state.shuttleDate = "";
      state.deignedReason = "";
      state.approve = false;
      state.deigned = false;
    },
    resetApproveHeld: (state, action) => {
      state.approveHeldShuttleData = [];
      state.approveHeldUnitData = [];
      state.id = "";
      state.selectedId = null;
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.innerSortFlag = false;
      state.innerSortValue = null;
      state.searchCriteria = "both";
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.changeColor = false;
    },
  },
});
export const {
  setApproveOrDeigned,
  setNormalSortFlag,
  setNormalSortValue,
  setWhatDelivery,
  setWhatPickUp,
  setApprove,
  setDeigned,
  setDeignedReason,
  setShuttleDate,
  setReason,
  setAmount,
  setApproveData,
  setSearchCriteria,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setId,
  setApproveHeldShuttleData,
  setChangeColor,
  setEditFormData,
  setDriverName,
  setUnitNum,
  setRunType,
  setPickUp,
  setDelivery,
  setViewDetail,
  resetChanges,
  resetApproveHeld,
  setIsSisterUnit,
  setApproveHeldUnitData,
  setSelectedId,
  setChangeColorUnit,
  setUnitPageNumber,
  setUnitTotalElements,
  setUnitTotalPages,
  setInnerSortFlag,
  setInnerSortValue,
} = ApproveHeldSlice.actions;

export default ApproveHeldSlice.reducer;
