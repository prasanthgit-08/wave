import { createSlice } from "@reduxjs/toolkit";

const DriverComplianceItemsSlice = createSlice({
  name: "DriverComplianceItemsSlice",
  initialState: {
    // fetch data

    listingData: [],
    // search filter
    searchTerm: "",
    searchCriteria: "Beginning",
    // pagination
    pageNumber: 0,
    pageNumberForDriver: 0,

    number: 0,
    totalPages: 0,
    totalPagesOfHistory: 0,
    totalElementsOfHistory: 0,

    totalElements: 0,
    // editing
    selectedId: "",
    viewDetail: false,
    changeColor: false,
    changeColorOfHistory: false,

    editFormData: null,
    changesCancelled: false,
    // normal sorting
    normalSortValue: null,
    normalSortFlag: false,
    sortValue: null,
    sortFlag: false,

    //fields
    description: "",
    driverDescription: "",
    complianceNotes: "",
    lastComplianceDate: null,
    nextComplianceDate: null,
    blockDate: null,
    blockReason: "",
    historyBlockReason: "",
    historyBlockDate: null,

    complianceHistoryData: [],
    formData: [],
    driverComplianceItemFK: null,
    complianceItemId: null,
    useBlockDate: false,
    useLastDate: false,
    useNextDate: false,
    blockDateValid: true,
    lastComplianceDateValid: true,
    nextComplianceDateValid: true,
    driverFK: null,
    driverComplianceItemHistoryPK: null,
    blockFlag: false,
    descriptionExist: false,
    driverDescriptionExist: false,
  },

  reducers: {
    setHistoryBlockDate: (state, action) => {
      state.historyBlockDate = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
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
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setChangeColorOfHistory: (state, action) => {
      state.changeColorOfHistory = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setDriverDescription: (state, action) => {
      state.driverDescription = action.payload;
    },
    setComplianceNotes: (state, action) => {
      state.complianceNotes = action.payload;
    },
    setLastComplianceDate: (state, action) => {
      state.lastComplianceDate = action.payload;
    },
    setNextComplianceDate: (state, action) => {
      state.nextComplianceDate = action.payload;
    },
    setBlockDate: (state, action) => {
      state.blockDate = action.payload;
    },
    setBlockReason: (state, action) => {
      state.blockReason = action.payload;
    },
    setComplianceHistoryData: (state, action) => {
      state.complianceHistoryData = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setDriverComplianceItemFK: (state, action) => {
      state.driverComplianceItemFK = action.payload;
    },
    setComplianceItemId: (state, action) => {
      state.complianceItemId = action.payload;
    },
    setUseBlockDate: (state, action) => {
      state.useBlockDate = action.payload;
    },
    setUseLastDate: (state, action) => {
      state.useLastDate = action.payload;
    },
    setUseNextDate: (state, action) => {
      state.useNextDate = action.payload;
    },
    setNumber: (state, action) => {
      state.number = action.payload;
    },
    setBlockdateValid: (state, action) => {
      state.blockDateValid = action.payload;
    },
    setLastComplianceDateValid: (state, action) => {
      state.lastComplianceDateValid = action.payload;
    },
    setNextComplianceDateValid: (state, action) => {
      state.nextComplianceDateValid = action.payload;
    },
    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },
    setHistoryBlockReason: (state, action) => {
      state.historyBlockReason = action.payload;
    },
    setDriverComplianceItemHistoryPK: (state, action) => {
      state.driverComplianceItemHistoryPK = action.payload;
    },
    setBlockFlag: (state, action) => {
      state.blockFlag = action.payload;
    },
    setTotalElementsOfHistory: (state, action) => {
      state.totalElementsOfHistory = action.payload;
    },
    setTotalPagesOfHistory: (state, action) => {
      state.totalPagesOfHistory = action.payload;
    },
    setDescriptionExist: (state, action) => {
      state.descriptionExist = action.payload;
    },
    setDriverDescriptionExist: (state, action) => {
      state.driverDescriptionExist = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },
    setPageNumberOfdriver: (state, action) => {
      state.pageNumberForDriver = action.payload;
    },
  },
});

export const {
  setListingData,
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedId,
  setLoader,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  setChangesCancelled,
  setDescription,
  setDriverDescription,
  setComplianceNotes,
  setLastComplianceDate,
  setNextComplianceDate,
  setBlockDate,
  setBlockReason,
  setComplianceHistoryData,
  setFormData,
  setDriverComplianceItemFK,
  setComplianceItemId,
  setUseBlockDate,
  setUseLastDate,
  setUseNextDate,
  setNumber,
  setBlockdateValid,
  setLastComplianceDateValid,
  setNextComplianceDateValid,
  setDriverFK,
  setHistoryBlockReason,
  setDriverComplianceItemHistoryPK,
  setBlockFlag,
  setHistoryBlockDate,
  setTotalPagesOfHistory,
  setTotalElementsOfHistory,
  setDescriptionExist,
  setDriverDescriptionExist,
  setChangeColorOfHistory,
  setSortValue,
  setSortFlag,
  setPageNumberOfdriver,
} = DriverComplianceItemsSlice.actions;

export default DriverComplianceItemsSlice.reducer;
