import { createSlice } from "@reduxjs/toolkit";
const ExportBrokersSlice = createSlice({
  name: "ExportBrokers",
  initialState: {
    id: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    exportBrokersData: [],
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
    bolText: "",
    phone: "",
    fax: "",
    email: "",
    notes: "",
    changesCancelled: false,
    disableSave: true,
    exportBrokers: null,
    //for assigned ports in viewdetail
    assignedPortsList: [],
    brokerPortsList: [],
    excludeList: [],
    assignedTotalPages: 0,
    assignedTotalElements: 0,
    assignedPageNumber: 0,
    brokerTotalPages: 0,
    brokerPageNumber: 0,
    brokerTotalElements: 0,
    editPageLoading: false,
    sort: false,
    assignSortValue: null,
    iscloseflag: true,
    isExportBrokerLoading: false,
    assignedListingLoader: false,
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
    setExportBrokersData: (state, action) => {
      state.exportBrokersData = action.payload;
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
    setBolText: (state, action) => {
      state.bolText = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setFax: (state, action) => {
      state.fax = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setBrokerTotalPages: (state, action) => {
      state.brokerTotalPages = action.payload;
    },
    setBrokerTotalElements: (state, action) => {
      state.brokerTotalElements = action.payload;
    },
    setBrokerPageNumber: (state, action) => {
      state.brokerPageNumber = action.payload;
    },
    setBrokerPortsList: (state, { payload }) => {
      state.brokerPortsList = payload;
      state.excludeList = payload.map((ports) => ports.poePK);
    },
    setAssignedTotalPages: (state, action) => {
      state.assignedTotalPages = action.payload;
    },
    setAssignedTotalElements: (state, action) => {
      state.assignedTotalElements = action.payload;
    },
    setAssignedPageNumber: (state, action) => {
      state.assignedPageNumber = action.payload;
    },
    setAssignedPortsList: (state, { payload }) => {
      state.assignedPortsList = payload;
      state.excludeList = payload.map((ports) => ports.poePK);
    },
    updateAssignedPortsList: (state, { payload }) => {
      state.assignedPortsList = [...state.assignedPortsList, payload];
      state.excludeList = [...state.excludeList, payload.poePK];
    },
    removeAssignedPortsList: (state, { payload }) => {
      state.assignedPortsList = state.assignedPortsList.filter((element) => element.poePK !== payload.poePK);
      state.excludeList = state.excludeList.filter((element) => element !== payload.poePK);
    },

    setExcludeList: (state, action) => {
      state.excludeList = action.payload;
    },
    setEditPageLoading: (state, action) => {
      state.editPageLoading = action.payload;
    },
    setSort: (state) => {
      state.sort = !state.sort;
    },
    setAssignSortValue: (state, action) => {
      state.assignSortValue = action.payload;
    },
    resetChanges: (state, action) => {
      state.description = "";
      state.name = "";
      state.bolText = "";
      state.phone = "";
      state.fax = "";
      state.email = "";
      state.notes = "";
    },
    resetExportBrokers: (state, action) => {
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
    setExportBrokers: (state, action) => {
      state.exportBrokers = action.payload;
    },
    resetRightNormalSort: (state, action) => {
      state.sort = false;
      state.assignSortValue = null;
    },
    setIsCloseFlag: (state, action) => {
      state.iscloseflag = action.payload;
    },
    setIsExportBrokerLoading: (state, { payload }) => {
      state.isExportBrokerLoading = payload;
    },
    setAssignedListingLoader: (state, action) => {
      state.assignedListingLoader = action.payload;
    },
  },
});
export const {
  setId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setExportBrokersData,
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
  setBolText,
  setPhone,
  setFax,
  setEmail,
  setNotes,
  setDisableSave,
  resetChanges,
  toggleChangesCancelled,
  resetExportBrokers,
  setExportBrokers,
  setAssignedPageNumber,
  setAssignedPortsList,
  setAssignedTotalPages,
  setAssignedTotalElements,
  updateAssignedPortsList,
  removeAssignedPortsList,
  setBrokerPageNumber,
  setBrokerPortsList,
  setBrokerTotalElements,
  setBrokerTotalPages,
  setEditPageLoading,
  setSort,
  setAssignSortValue,
  setExcludeList,
  resetRightNormalSort,
  setIsCloseFlag,
  setIsExportBrokerLoading,
  setAssignedListingLoader,
} = ExportBrokersSlice.actions;

export default ExportBrokersSlice.reducer;
