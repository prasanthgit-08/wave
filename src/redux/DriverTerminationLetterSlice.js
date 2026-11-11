import { createSlice } from "@reduxjs/toolkit";

const DriverTerminationLetterSlice = createSlice({
  name: "driverTerminationLetterSlice",
  initialState: {
    searchTerm: "",
    searchCriteria: "Beginning",
    pageNumber: 0,
    letterListingData: [],
    totalPages: 0,
    totalElements: 0,
    sort: false,
    sortValue: null,
    unqiueDescription: true,
    id: "",
    changeColor: false,
    description: "",
    damage: false,
    rehire: false,
    adminCharge: false,
    adminAmount: 0,
    adminDays: 0,
    formTypeValue: "",
    formTypeId: "",
    formValue: "",
    formId: "",
    letter: "",
    viewData: null,
    editPage: false,
    uniqueCombination: true,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setLetterListingData: (state, action) => {
      state.letterListingData = action.payload;
    },
    setUnqiueDescription: (state, action) => {
      state.unqiueDescription = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setSort: (state, action) => {
      state.sort = !state.sort;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setDamage: (state, action) => {
      state.damage = action.payload;
    },
    setRehire: (state, action) => {
      state.rehire = action.payload;
    },
    setAdminCharge: (state, action) => {
      state.adminCharge = action.payload;
    },
    setAdminAmount: (state, action) => {
      state.adminAmount = action.payload;
    },
    setAdminDays: (state, action) => {
      state.adminDays = action.payload;
    },
    setFormTypeValue: (state, action) => {
      state.formTypeValue = action.payload;
    },
    setFormTypeId: (state, action) => {
      state.formTypeId = action.payload;
    },
    setFormValue: (state, action) => {
      state.formValue = action.payload;
    },
    setFormId: (state, action) => {
      state.formId = action.payload;
    },
    setLetter: (state, action) => {
      state.letter = action.payload;
    },
    setViewData: (state, action) => {
      state.viewData = action.payload;
    },
    setEditPage: (state, action) => {
      state.editPage = action.payload;
    },
    setUniqueCombination: (state, action) => {
      state.uniqueCombination = action.payload;
    },
    resetEdit: (state, action) => {
      state.adminCharge = false;
      state.description = "";
      state.adminAmount = 0;
      state.letter = "";
      state.formId = "";
      state.formValue = "";
      state.formTypeId = "";
      state.formTypeValue = "";
      state.adminDays = 0;
      state.damage = false;
      state.rehire = false;
      state.viewData = null;
      state.uniqueCombination = true;
    },
    resetEditData: (state, action) => {
      state.adminCharge = state.viewData.adminCharge;
      state.description = state.viewData.description;
      state.damage = state.viewData.damage;
      state.rehire = state.viewData.rehire;
      state.letter = state.viewData.letter;
      state.adminAmount = state.viewData.adminAmount;
      state.adminDays = state.viewData.adminChargeDays;
      state.formId = state.viewData.formId;
      state.formTypeId = state.viewData.formTypeId;
      state.formValue = state.viewData.formName;
      state.formTypeValue = state.viewData.formTypeName;
      state.uniqueCombination = true;
    },
    resetSearch: (state, action) => {
      state.searchCriteria = "Beginning";
      state.searchTerm = "";
      state.pageNumber = 0;
      state.sort = false;
      state.sortValue = null;
      state.changeColor = false;
      state.uniqueCombination = true;
    },
  },
});

export const {
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setLetterListingData,
  setTotalElements,
  setUnqiueDescription,
  setTotalPages,
  setSort,
  setSortValue,
  setChangeColor,
  setId,
  setDescription,
  setDamage,
  setRehire,
  setAdminCharge,
  setAdminAmount,
  setAdminDays,
  setFormTypeValue,
  setFormTypeId,
  setFormValue,
  setFormId,
  setLetter,
  setViewData,
  setEditPage,
  setUniqueCombination,
  resetEdit,
  resetEditData,
  resetSearch,
} = DriverTerminationLetterSlice.actions;

export const dTLData = (state) => state.driverTerminationLetterReducer.value;

export default DriverTerminationLetterSlice.reducer;
