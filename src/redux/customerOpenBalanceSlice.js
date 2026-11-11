import { createSlice } from "@reduxjs/toolkit";

const customerOpenBalanceSlice = createSlice({
  name: "customerOpenBalance",
  initialState: {
    id: "",
    changeColor: false,
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    selecteActiveType: "Active",
    active: false,
    browseNavigation: [],
    customerOpenBalanceData: [],
    cobData: [],
    customerOpenBalances: null,
    searchTerm: "",
    selectedSearchCriteria: "Beginning",
    customerFK: "",
    viewDetail: false,
    changesCancelled: false,
    description: "",
    amount: "",
    balance: "",
    cobDescriptionExist: "",
    notes: "",
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
  },

  reducers: {
    setCustomerOpenBalances: (state, action) => {
      let payload = action.payload;
      state.customerOpenBalances = {
        ...state.customerOpenBalances,
        ...payload,
      };
    },

    setId: (state, action) => {
      state.id = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSelecteActiveType: (state, action) => {
      state.selecteActiveType = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },

    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },
    setCustomerOpenBalanceData: (state, action) => {
      state.customerOpenBalanceData = action.payload;
    },
    setCobData: (state, action) => {
      state.cobData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setCustomerFK: (state, action) => {
      state.customerFK = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    openBalanceSearchFilter: (state, action) => {
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setCobDescriptionExist: (state, action) => {
      state.cobDescriptionExist = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    resetChanges: (state, action) => {
      state.notes = "";
      state.amount = "";
      state.description = "";
      state.customerOpenBalanceData = [];
      state.balance = "";
    },
  },
});

export const {
  setNotes,
  setId,
  setChangeColor,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setBrowseNavigation,
  setCustomerOpenBalanceData,
  setCobData,
  setActive,
  setSelecteActiveType,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
  setNormalSortValue,
  setNormalSortFlag,
  setCustomerOpenBalances,
  setCustomerFK,
  openBalanceSearchFilter,
  toggleChangesCancelled,
  setDescription,
  setAmount,
  setBalance,
  setCobDescriptionExist,
  resetChanges,
} = customerOpenBalanceSlice.actions;

export const customerOpenBalance = (state) => state.customerOpenBalance.value;

export default customerOpenBalanceSlice.reducer;
