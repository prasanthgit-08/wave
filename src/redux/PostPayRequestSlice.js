import { createSlice } from "@reduxjs/toolkit";

const PostPayRequestSlice = createSlice({
  name: "postPayRequest",
  initialState: {
    selectedId: null,
    viewDetail: false,
    totalPages: 0,
    totalElements: 0,
    changeColor: false,
    editFormData: null,
    pageNumber: 0,
    sortValue: "",
    searchTerm: "",
    sortFlag: false,
    searchCriteria: "Beginning",
    sortType: false,
    normalSortFlag: false,
    normalSortValue: "",
    unitNumber: "",
    downtimeHours: "",
    downtimeRate: "",
    downtimeAmount: "",
    additionalMiles: "",
    mileageRate: "",
    mileageAmount: "",
    recruitingBonus: false,
    recruitingBonusAmount: "",
    recruitedDriver: "",
    shuttleAmount: "",
    shuttleDescription: "",
    otherAmount1: "",
    otherAmountDescription1: "",
    otherAmount2: "",
    otherAmountDescription2: "",
    notes: "",
    listingData: [],
    navigateToMainPage: false,
    totalAmount: 0,
    chargeDPM: 0,
    reimbursementData: [],
  },
  reducers: {
    setNormalSortValue: (state, { payload }) => {
      state.normalSortValue = payload;
    },
    setChargeDPM: (state, { payload }) => {
      state.chargeDPM = payload;
    },
    setTotalAmount: (state, { payload }) => {
      state.totalAmount = payload;
    },
    setListingData: (state, { payload }) => {
      state.listingData = payload;
    },
    setNavigateToMainPage: (state, { payload }) => {
      state.navigateToMainPage = payload;
    },
    setSearchCriteria: (state, { payload }) => {
      state.searchCriteria = payload;
    },

    setNormalSortFlag: (state, { payload }) => {
      state.normalSortFlag = payload;
    },

    setUnitNumber: (state, { payload }) => {
      state.unitNumber = payload;
    },
    setDowntimeHours: (state, { payload }) => {
      state.downtimeHours = payload;
    },

    setDowntimeRate: (state, { payload }) => {
      state.downtimeRate = payload;
    },

    setDowntimeAmount: (state, { payload }) => {
      state.downtimeAmount = payload;
    },

    setAdditionalMiles: (state, { payload }) => {
      state.additionalMiles = payload;
    },

    setMileageRate: (state, { payload }) => {
      state.mileageRate = payload;
    },

    setMileageAmount: (state, { payload }) => {
      state.mileageAmount = payload;
    },

    setRecruitingBonus: (state, { payload }) => {
      state.recruitingBonus = payload;
    },

    setRecruitingBonusAmount: (state, { payload }) => {
      state.recruitingBonusAmount = payload;
    },

    setRecruitedDriver: (state, { payload }) => {
      state.recruitedDriver = payload;
    },

    setShuttleAmount: (state, { payload }) => {
      state.shuttleAmount = payload;
    },

    setShuttleDescription: (state, { payload }) => {
      state.shuttleDescription = payload;
    },

    setOtherAmount1: (state, { payload }) => {
      state.otherAmount1 = payload;
    },

    setOtherAmountDescription1: (state, { payload }) => {
      state.otherAmountDescription1 = payload;
    },

    setOtherAmountDescription2: (state, { payload }) => {
      state.otherAmountDescription2 = payload;
    },

    setNotes: (state, { payload }) => {
      state.notes = payload;
    },

    setSelectedId: (state, { payload }) => {
      state.selectedId = payload;
    },
    setSortValue: (state, { payload }) => {
      state.sortValue = payload;
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
    setSortFlag: (state, { payload }) => {
      state.normalSortFlag = payload;
    },
    setViewDetail: (state, { payload }) => {
      state.viewDetail = payload;
    },
    setPageNumber: (state, { payload }) => {
      state.pageNumber = payload;
    },
    setTotalPages: (state, { payload }) => {
      state.totalPages = payload;
    },
    setTotalElements: (state, { payload }) => {
      state.totalElements = payload;
    },
    setChangeColor: (state, { payload }) => {
      state.changeColor = payload;
    },
    setEditFormData: (state, { payload }) => {
      state.editFormData = payload;
    },
    setSortType: (state, { payload }) => {
      state.sortType = payload;
    },
    setReimbursementData: (state, { payload }) => {
      state.reimbursementData = payload;
    },

    resetChanges: (state, action) => {
      state.selectedId = null;
      state.viewDetail = false;
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.changeColor = false;
      state.editFormData = null;
      state.sortValue = "";
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.sortType = false;
      state.normalSortFlag = false;
      state.normalSortValue = "";
      state.reimbursementData = [];
    },
  },
});

export const {
  setDowntimeHours,
  setDowntimeRate,
  setDowntimeAmount,
  setAdditionalMiles,
  setMileageRate,
  setMileageAmount,
  setRecruitingBonus,
  setRecruitingBonusAmount,
  setRecruitedDriver,
  setShuttleAmount,
  setShuttleDescription,
  setOtherAmount1,
  setOtherAmountDescription1,
  setOtherAmountDescription2,
  setNotes,
  setUnitNumber,
  setSelectedId,
  setViewDetail,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setChangeColor,
  setEditFormData,
  resetChanges,
  setSortValue,
  setSearchTerm,
  setSortFlag,
  setSortType,
  setNormalSortValue,
  setNormalSortFlag,
  setListingData,
  setSearchCriteria,
  setNavigateToMainPage,
  setChargeDPM,
  setReimbursementData,
} = PostPayRequestSlice.actions;

export default PostPayRequestSlice.reducer;
