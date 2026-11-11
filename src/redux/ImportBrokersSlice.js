import { createSlice } from "@reduxjs/toolkit";
const ImportBrokersSlice = createSlice({
  name: "ImportBrokers",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    importBrokersData: [],
    saveFormData: null,
    searchTerms: "",
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    sortValue: null,
    sortFlag: false,
    //input
    description: "",
    name: "",
    phone: "",
    fax: "",
    formFK: "",
    notes: "",
    //lookup
    formTypeSelection: false,
    formSelection: false,
    formTypeInput: "",
    formInput: "",
    formTypeId: null,
    //formId: null,
    changesCancelled: false,
    disableSave: true,
    importBrokers: null,
  },
  reducers: {
    //lookup
    setFormTypeSelection: (state, action) => {
      state.formTypeSelection = action.payload;
    },
    setFormSelection: (state, action) => {
      state.formSelection = action.payload;
    },
    setFormTypeInput: (state, action) => {
      state.formTypeInput = action.payload;
    },
    setFormInput: (state, action) => {
      state.formInput = action.payload;
    },
    setFormTypeId: (state, action) => {
      state.formTypeId = action.payload;
    },
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
    setImportBrokersData: (state, action) => {
      state.importBrokersData = action.payload;
    },
    setSaveFormData: (state, action) => {
      state.saveFormData = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
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
    //input
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setFax: (state, action) => {
      state.fax = action.payload;
    },
    setFormFK: (state, action) => {
      state.formFK = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },

    resetChanges: (state, action) => {
      state.description = "";
      state.name = "";
      state.phone = "";
      state.fax = "";
      state.formFK = "";
      state.notes = "";
      state.formTypeId = null;
      state.formFK = null;
      state.formInput = "";
      state.formTypeInput = "";
    },
    resetImportBrokers: (state, action) => {
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.sortFlag = false;
      state.sortValue = null;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setImportBrokers: (state, action) => {
      state.portsOfEntry = action.payload;
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setImportBrokersData,
  setSaveFormData,
  setSearchTerms,
  setSelectedSearchCriteria,
  setViewDetail,
  setBrowseNavigation,
  setChangeColor,
  setSortValue,
  setSortFlag,
  setEditFormData,
  setDescription,
  setName,
  setPhone,
  setFax,
  setFormFK,
  setNotes,
  setDisableSave,
  resetChanges,
  toggleChangesCancelled,
  resetImportBrokers,
  setImportBrokers,
  setFormTypeSelection,
  setFormSelection,
  setFormInput,
  setFormTypeInput,
  setFormTypeId,
  //setFormId,
} = ImportBrokersSlice.actions;

export default ImportBrokersSlice.reducer;
