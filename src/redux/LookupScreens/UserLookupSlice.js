import { createSlice } from "@reduxjs/toolkit";

const UserLookupSlice = createSlice({
  name: "userlookup",
  initialState: {
    viewDetail: true,

    id: "",
    userLookupPageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    changeColor: false,
    selectedUserStatus: "Actual",
    selectedStatus: "Active",
    selectedSearchCriteria: "Beginning",
    usersData: [],
    rowPosition: [],
    columnPosition: [],
    advanceSortingOrder: null,
    searchTerms: "",
    showAdvanceSearch: false,
    showAdvanceSort: false,
    normalSortValue: null,
    normalSortFlag: false,
    advanceSortedValue: null,
    searchedUser: null,
    loading: true,
    advancedSearchObject: null,
  },
  reducers: {
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },

    setId: (state, action) => {
      state.id = action.payload;
    },

    setUserLookupPageNumber: (state, action) => {
      state.userLookupPageNumber = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setSelectedUserStatus: (state, action) => {
      state.selectedUserStatus = action.payload;
    },

    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },

    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },

    setSearchedUser: (state, action) => {
      state.searchedUser = action.payload;
    },

    setUsersData: (state, action) => {
      state.usersData = action.payload;
    },

    setSortPositions: (state, action) => {
      state.rowPosition = action.payload;
      state.columnPosition = action.payload;
    },

    setAdvanceSortingCriteria: (state, action) => {
      state.advanceSortingOrder = action.payload;
    },

    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },

    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
    },
    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },
    setShowAdvanceSort: (state, action) => {
      state.showAdvanceSort = action.payload;
    },

    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },

    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },

    setAdvanceSortedValue: (state, action) => {
      state.advanceSortedValue = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    resetSettingUser: (state, action) => {
      state.usersData = [];
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.changeColor = false;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.rowPosition = [];
      state.columnPosition = [];
      state.userLookupPageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.advanceSortingOrder = null;
      state.showAdvanceSearch = false;
      state.showAdvanceSort = false;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.advanceSortedValue = null;
      state.loading = true;
      state.searchedUser = null;
      state.id = "";
      state.advancedSearchObject = null;
    },
  },
});

export const {
  setViewDetail,
  setId,
  setUserLookupPageNumber,
  resetSettingUser,
  setTotalPages,
  setTotalElements,
  setChangeColor,
  setSelectedUserStatus,
  setSelectedStatus,
  setSelectedSearchCriteria,
  setSearchedUser,
  setUsersData,
  setSortPositions,
  setAdvanceSortingCriteria,
  setSearchTerms,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  setNormalSortValue,
  setNormalSortFlag,
  setLoading,
  setAdvanceSortedValue,
  setAdvancedSearchObject,
} = UserLookupSlice.actions;

export default UserLookupSlice.reducer;
