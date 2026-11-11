import { createSlice } from "@reduxjs/toolkit";

const UserMaintenanceSearchFilterSlice = createSlice({
  name: "userFilter",
  initialState: {
    viewDetail: true,
    loader: true,
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    changeColor: false,
    selectedUserStatus: "Actual",
    selectedStatus: "Active",
    selectedSearchCriteria: "Beginning",
    searchedUser: null,
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
    //fields
    overrideCodeExist: false,
    overrideCode: "",
    phoneExtensionNumber: "",
    phoneExtensionExist: false,
    directDialPhone: "",
    phoneExist: false,
    emailExist: false,
    companyEmail: "",
    password: "",
    passwordOk: true,
    login: "",
    loginExist: false,
    decryptedPassword: "",
    pseudo: false,

    //for form
    saveData: null,
    active: true,
    saveDisable: true,
    loginValid: true,
  },
  reducers: {
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },

    setLoader: (state, action) => {
      state.loader = action.payload;
    },

    setId: (state, action) => {
      state.id = action.payload;
    },

    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
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
    setOverrideCodeExist: (state, action) => {
      state.overrideCodeExist = action.payload;
    },
    setOverrideCode: (state, action) => {
      state.overrideCode = action.payload;
    },
    setPhoneExtensionNumber: (state, action) => {
      state.phoneExtensionNumber = action.payload;
    },
    setPhoneExtensionExist: (state, action) => {
      state.phoneExtensionExist = action.payload;
    },
    setDirectDialPhone: (state, action) => {
      state.directDialPhone = action.payload;
    },
    setPhoneExist: (state, action) => {
      state.phoneExist = action.payload;
    },
    setEmailExist: (state, action) => {
      state.emailExist = action.payload;
    },
    setCompanyEmail: (state, action) => {
      state.companyEmail = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordOk: (state, action) => {
      state.passwordOk = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setLoginExist: (state, action) => {
      state.loginExist = action.payload;
    },
    setDecryptedPassword: (state, action) => {
      state.decryptedPassword = action.payload;
    },
    setPseudo: (state, action) => {
      state.pseudo = action.payload;
    },

    // for form
    setSaveData: (state, action) => {
      state.saveData = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },

    setSaveDisable: (state, action) => {
      state.saveDisable = action.payload;
    },
    setLoginValid: (state, action) => {
      state.loginValid = action.payload;
    },
    resetUserMaintenance: (state) => {
      state.viewDetail = true;
      state.loader = true;
      state.id = "";
      state.pageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.changeColor = false;
      state.selectedUserStatus = "Actual";
      state.selectedStatus = "Active";
      state.selectedSearchCriteria = "Beginning";
      state.searchedUser = null;
      state.usersData = [];
      state.rowPosition = [];
      state.columnPosition = [];
      state.advanceSortingOrder = null;
      state.searchTerms = "";
      state.showAdvanceSearch = false;
      state.showAdvanceSort = false;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.advanceSortedValue = null;
      state.overrideCodeExist = false;
      state.overrideCode = "";
      state.phoneExtensionNumber = "";
      state.phoneExtensionExist = false;
      state.directDialPhone = "";
      state.phoneExist = false;
      state.emailExist = false;
      state.companyEmail = "";
      state.password = "";
      state.passwordOk = true;
      state.login = "";
      state.decryptedPassword = "";
      state.pseudo = false;
      state.loginExist = false;
      state.saveData = null;
      state.usersData = [];
    },
    resetFields: (state) => {
      state.overrideCodeExist = false;
      state.overrideCode = "";
      state.phoneExtensionNumber = "";
      state.phoneExtensionExist = false;
      state.directDialPhone = "";
      state.phoneExist = false;
      state.emailExist = false;
      state.companyEmail = "";
      state.password = "";
      state.passwordOk = true;
      state.login = "";
      state.loginExist = false;
      state.decryptedPassword = "";
      state.pseudo = false;
      state.saveData = null;
    },
  },
});

export const {
  setViewDetail,
  setLoader,
  setId,
  setPageNumber,
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
  setAdvanceSortedValue,
  setSaveData,
  setActive,
  setSaveDisable,
  setLoginValid,
  resetUserMaintenance,
  setOverrideCodeExist,
  setOverrideCode,
  setPhoneExtensionNumber,
  setPhoneExtensionExist,
  setDirectDialPhone,
  setPhoneExist,
  setEmailExist,
  setCompanyEmail,
  setPassword,
  setPasswordOk,
  setLogin,
  setLoginExist,
  setDecryptedPassword,
  setPseudo,
  resetFields,
} = UserMaintenanceSearchFilterSlice.actions;

export const user = (state) => state.userFilter.value;

export default UserMaintenanceSearchFilterSlice.reducer;
