import { createSlice } from "@reduxjs/toolkit";
const DeleaseItemsSlice = createSlice({
  name: "DeleaseItems",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    searchTerm: "",
    formIsValid: "",
    selecteActiveType: "Active",
    contactData: null,
    selectedSearchCriteria: "Beginning",
    viewDetail: false,
    browseNavigation: [],
    changeColor: false,
    editFormData: null,
    deleaseItemsData: [],
    selectedId: "",
    deleaseItemsFormData: null,
    deleaseItemPK: "",
    normalSortValue: null,
    normalSortFlag: false,
    editDetail: false,
    description: "",
    inActive: false,
    dateRequired: false,

    descriptionValid: true,
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
    setDeleaseItemsFormData: (state, action) => {
      state.deleaseItemsFormData = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditDetails: (state, action) => {
      state.editDetail = action.payload;
    },
    setSelecteActiveType: (state, action) => {
      state.selecteActiveType = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setFormIsValid: (state, action) => {
      state.formIsValid = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setDescriptionValid: (state, action) => {
      state.descriptionValid = action.payload;
    },

    setDeleaseItemsData: (state, action) => {
      state.deleaseItemsData = action.payload;
    },
    setDeleaseItemPK: (state, action) => {
      state.deleaseItemPK = action.payload;
    },
    setInActive: (state, action) => {
      state.inActive = action.payload;
    },
    setDateRequired: (state, action) => {
      state.dateRequired = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },

    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsGeneralTabValid: (state, action) => {
      state.isGeneralTabValid = action.payload;
    },
    setIsSettingsTabValid: (state, action) => {
      state.isSettingsTabValid = action.payload;
    },

    resetChanges: (state, action) => {
      state.description = "";
      state.inActive = "";
      state.dateRequired = "";
      state.viewDetail = false;
      state.deleaseItemPK = "";
    },
    resetDeleaseItems: (state, action) => {
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.selecteActiveType = "Active";
      state.deleaseItemsData = [];
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.changeColor = false;
      state.pageNumber = 0;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setSearchTerm,
  setSelectedSearchCriteria,
  resetChanges,
  setSelectedId,
  setBrowseNavigation,
  setIsGeneralTabValid,
  setIsSettingsTabValid,
  setViewDetail,
  setEditDetails,
  setChangeColor,
  setEditFormData,
  setDeleaseItemsFormData,
  setDeleaseItems,
  setNormalSortValue,
  setNormalSortFlag,
  setDeleaseItemPK,
  setInActive,
  setSelecteActiveType,
  setDescriptionValid,
  setLoading,
  setDeleaseItemsData,
  setDescription,
  setDateRequired,
  toggleChangesCancelled,
  resetDeleaseItems,
} = DeleaseItemsSlice.actions;

export const deleaseItems = (state) => state.DeleaseItems.value;
export default DeleaseItemsSlice.reducer;
