import { createSlice } from "@reduxjs/toolkit";

const ComplianceItemsSlice = createSlice({
  name: "complianceItems",
  initialState: {
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    browseNavigation: [],
    complianceItemsData: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    id: "",
    selectedStatus: "Active",
    changeColor: false,
    viewDetail: false,
    editFormData: null,
    normalSortValue: null,
    normalSortFlag: false,
    saveFormData: null,
    checkDescriptionExist: "",
    changesCancelled: false,
    //fields
    description: "",
    useLastDate: false,
    useNextDate: false,
    useBlockDate: false,
    driverDescription: "",
    notes: "",
    objectKey: "",
    restricted: false,
    keepHistory: false,
    checkDriverDescriptionExist: false,
    checkObjectKeyExist: false,
  },
  reducers: {
    setComplianceItemsData: (state, action) => {
      state.complianceItemsData = action.payload;
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

    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },

    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },

    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setUseLastDate: (state, action) => {
      state.useLastDate = action.payload;
    },
    setUseNextDate: (state, action) => {
      state.useNextDate = action.payload;
    },
    setUseBlockDate: (state, action) => {
      state.useBlockDate = action.payload;
    },
    setDriverDescription: (state, action) => {
      state.driverDescription = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setObjectKey: (state, action) => {
      state.objectKey = action.payload;
    },
    setKeepHistory: (state, action) => {
      state.keepHistory = action.payload;
    },
    setRestricted: (state, action) => {
      state.restricted = action.payload;
    },
    setSaveFormData: (state, action) => {
      state.saveFormData = action.payload;
    },
    setCheckDescriptionExist: (state, action) => {
      state.checkDescriptionExist = action.payload;
    },
    setCheckDriverDescriptionExist: (state, action) => {
      state.checkDriverDescriptionExist = action.payload;
    },
    setCheckObjectKeyExist: (state, action) => {
      state.checkObjectKeyExist = action.payload;
    },

    resetChanges: (state, action) => {
      state.description = "";
      state.driverDescription = "";
      state.useBlockDate = false;
      state.useLastDate = false;
      state.useNextDate = false;
      state.objectKey = "";
      state.notes = "";
      state.keepHistory = false;
      state.restricted = false;
      state.checkDescriptionExist = "";
      state.checkDriverDescriptionExist = false;
      state.checkObjectKeyExist = false;
    },
    resetClose: (state, action) => {
      state.selectedStatus = "Active";
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.normalSortFlag = false;
      state.normalSortValue = null;
    },
  },
});
export const {
  resetClose,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setComplianceItemsData,
  setSearchTerm,
  setSearchCriteria,
  setNormalSortValue,
  setNormalSortFlag,
  setId,
  setSelectedStatus,
  setCheckDescriptionExist,
  setLoader,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  resetChanges,
  toggleChangesCancelled,
  setDescription,
  setKeepHistory,
  setDriverDescription,
  setObjectKey,
  setNotes,
  setUseLastDate,
  setUseNextDate,
  setUseBlockDate,
  setRestricted,
  setCheckDriverDescriptionExist,
  setSaveFormData,
  setCheckObjectKeyExist,
} = ComplianceItemsSlice.actions;
export const complianceItems = (state) => state.complianceItems.value;
export default ComplianceItemsSlice.reducer;
