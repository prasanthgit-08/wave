import { createSlice } from "@reduxjs/toolkit";

const CustomerPlantReleasesSlice = createSlice({
  name: "CustomerPlantReleases",
  initialState: {
    id: "",
    columnId: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    plantReleasesData: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    columnsEditFormData: null,
    editPageLoading: false,
    uniqueLoading: false,
    deleteLoading: false,
    browseLoading: false,
    columnsSaveLoading: false,
    isDescriptionUnique: true,

    sortValue: null,
    sortType: false,

    // Form input fields
    description: "",
    fileType: "txtFile",
    delimited: false,
    delimiter: "",
    hasHeaders: false,
    headerRows: "",
    disableSave: true,
    plantReleases: null,

    // Columns section
    columnsEditMode: false,
    assignedPageNumber: 0,
    plantReleaseColumnList: [],
    columnListTotalPages: 0,
    columnListTotalElements: 0,
    finalPaginatedArray: [],
    delimitedCheck: false,

    // Column form fields
    fieldWidth: "",
    fieldName: "",
    keyField: false,
    updateField: false,
    ignore: false,

    isPlantReleaseLoading: false,

    // Test file section
    testFile: [],
    testResponse: null,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setColumnId: (state, action) => {
      state.columnId = action.payload;
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
    setPlantReleasesData: (state, action) => {
      state.plantReleasesData = action.payload;
    },
    setEditPageLoading: (state, action) => {
      state.editPageLoading = action.payload;
    },
    setUniqueLoading: (state, action) => {
      state.uniqueLoading = action.payload;
    },
    setIsDescriptionUnique: (state, action) => {
      state.isDescriptionUnique = action.payload;
    },
    setDeleteLoading: (state, action) => {
      state.deleteLoading = action.payload;
    },
    setBrowseLoading: (state, action) => {
      state.browseLoading = action.payload;
    },
    setColumnsSaveLoading: (state, action) => {
      state.columnsSaveLoading = action.payload;
    },
    setColumnsEditMode: (state, action) => {
      state.columnsEditMode = action.payload;
    },
    setAssignedPageNumber: (state, action) => {
      state.assignedPageNumber = action.payload;
    },
    setPlantReleaseColumnList: (state, action) => {
      const { actionType, payload } = action.payload;

      const arrayLength = state?.plantReleaseColumnList?.length;

      if (actionType === "set") {
        state.plantReleaseColumnList = payload?.map((item, index) => ({ ...item, columnNumber: index + 1 }));
      }

      if (actionType === "add") {
        state.plantReleaseColumnList = [
          ...state.plantReleaseColumnList,
          { ...payload, columnNumber: arrayLength + 1 },
        ];
      }

      if (actionType === "update") {
        const index = state.plantReleaseColumnList?.findIndex(
          (item) => item.columnNumber === payload.columnNumber
        );
        if (index !== -1) {
          state.plantReleaseColumnList[index] = {
            ...state.plantReleaseColumnList[index],
            ...payload,
          };
        }
      }

      if (actionType === "delete") {
        state.plantReleaseColumnList = state.plantReleaseColumnList?.filter(
          (item) => item.columnNumber !== payload
        );
      }

      if (actionType === "update_current_page") {
        const { pageData, startIndex } = payload;
        state.plantReleaseColumnList.splice(startIndex, pageData.length, ...pageData);
      }

      if (actionType === "clear") {
        state.plantReleaseColumnList = [];
      }
    },
    setColumnListTotalPages: (state, action) => {
      state.columnListTotalPages = action.payload;
    },
    setColumnListTotalElements: (state, action) => {
      state.columnListTotalElements = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
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
    setColumnsEditFormData: (state, action) => {
      state.columnsEditFormData = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },

    // Form input reducers
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setFileType: (state, action) => {
      state.fileType = action.payload;
    },
    setDelimited: (state, action) => {
      state.delimited = action.payload;
    },
    setDelimiter: (state, action) => {
      state.delimiter = action.payload;
    },
    setHasHeaders: (state, action) => {
      state.hasHeaders = action.payload;
    },
    setHeaderRows: (state, action) => {
      state.headerRows = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setPlantReleases: (state, action) => {
      state.plantReleases = action.payload;
    },

    // Column form reducers
    setFieldName: (state, action) => {
      state.fieldName = action.payload;
    },
    setFieldWidth: (state, action) => {
      state.fieldWidth = action.payload;
    },
    setIgnore: (state, action) => {
      state.ignore = action.payload;
    },
    setKeyField: (state, action) => {
      state.keyField = action.payload;
    },
    setUpdateField: (state, action) => {
      state.updateField = action.payload;
    },
    setIsPlantReleaseLoading: (state, { payload }) => {
      state.isPlantReleaseLoading = payload;
    },
    setFinalPaginatedArray: (state, action) => {
      state.finalPaginatedArray = action.payload;
    },
    setTestFile: (state, action) => {
      state.testFile = action.payload;
    },
    setTestResponse: (state, action) => {
      state.testResponse = action.payload;
    },
    setDelimitedCheck: (state, action) => {
      state.delimitedCheck = action.payload;
    },

    // Reset functions
    resetChanges: (state) => {
      state.description = "";
      state.fileType = "txtFile";
      state.delimited = false;
      state.delimiter = "";
      state.hasHeaders = false;
      state.headerRows = "";
    },
    resetPlantReleaseColumnChanges: (state) => {
      state.fieldName = "";
      state.fieldWidth = "";
      state.ignore = false;
      state.keyField = false;
      state.updateField = false;
    },
    resetPlantReleases: (state) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.sortValue = null;
      state.sortType = false;
    },
  },
});

export const {
  setId,
  setColumnId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setPlantReleasesData,
  setEditPageLoading,
  setUniqueLoading,
  setIsDescriptionUnique,
  setDeleteLoading,
  setBrowseLoading,
  setColumnsSaveLoading,
  setSearchTerm,
  setSearchCriteria,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  setSortValue,
  setSortType,
  setDescription,
  setDelimited,
  setDelimiter,
  setHasHeaders,
  setHeaderRows,
  resetChanges,
  resetPlantReleases,
  setDisableSave,
  setPlantReleases,
  setFileType,
  setColumnsEditMode,
  setAssignedPageNumber,
  setPlantReleaseColumnList,
  setColumnListTotalPages,
  setColumnListTotalElements,
  setFieldName,
  setFieldWidth,
  setIgnore,
  setKeyField,
  setUpdateField,
  setDelimitedCheck,
  resetPlantReleaseColumnChanges,
  setColumnsEditFormData,
  setIsPlantReleaseLoading,
  setFinalPaginatedArray,
  setTestFile,
  setTestResponse,
} = CustomerPlantReleasesSlice.actions;

export default CustomerPlantReleasesSlice.reducer;
