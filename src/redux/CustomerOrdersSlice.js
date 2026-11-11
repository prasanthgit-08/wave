import { createSlice } from "@reduxjs/toolkit";
const CustomerOrdersSlice = createSlice({
  name: "CustomerOrders",
  initialState: {
    id: "",
    columnId: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    customerOrdersData: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    viewDetail: false,
    changeColor: false,
    editFormData: null,
    columnsEditFormData: null,
    editPageLoading: false,

    sortValue: null,
    sortType: false,
    saveFormData: null,
    //input
    description: "",
    radioValue: "txtFile",
    delimited: false,
    delimiter: "",
    hasHeaders: false,
    headerRows: "",
    changesCancelled: false,
    disableSave: true,
    customerOrders: null,
    //for customer lookup
    customerSelection: false,
    customerInput: "",
    specialCondition: "",
    specialConditionsList: [],
    // Which edit-screen tab is active, so the shared footer can show tab-specific buttons.
    activeOrderTab: "general",
    // Bumped by the footer's "Add Condition" button to open the Conditions add modal.
    addConditionTrigger: 0,
    customerId: null,
    customerOrderFlag: true,
    //for customer order slice
    loading: false,
    assignedCustomerOrdersList: [],
    assignedTotalPages: 0,
    assignedTotalElements: 0,
    columnSortValue: null,
    columnSortType: false,
    customerOrdersColumnList: [],
    //fields in Customer Order Columns
    customerOrderColumnsId: null,
    fieldNameUnique: false,
    fieldWidth: "",
    fieldName: "",
    ignore: false,
    fromField: "",
    fromValue: "",
    toField: "",
    splitField: false,
    splitFieldSeq: "",
    columnFooterDisableSave: false,
    delimitedCheck: false,
    /*     flag for edit and delete
     */
    singleClickFlag: false,
    /*     List for the purpose of deletion and addition of fields
     */
    saveList: [],
    tempId: 0,
    updateList: [],
    deleteList: [],
    commonSaveList: [],
    isCustomerOrderLoading: false,

    testFile: [],
    testResponse: null,
    isCustomerLoading: false,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    //columns id
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
    setCustomerOrdersData: (state, action) => {
      state.customerOrdersData = action.payload;
    },
    setEditPageLoading: (state, action) => {
      state.editPageLoading = action.payload;
    },
    //Customer Order Column browse state
    setAssignedTotalPages: (state, action) => {
      state.assignedTotalPages = action.payload;
    },
    setAssignedTotalElements: (state, action) => {
      state.assignedTotalElements = action.payload;
    },
    setAassignedCustomerOrdersList: (state, action) => {
      state.assignedCustomerOrdersList = action.payload;
    },
    setCustomerOrdersColumnList: (state, action) => {
      const { actionType, payload } = action.payload;

      const arrayLength = state?.customerOrdersColumnList?.length;

      if (actionType === "set") {
        state.customerOrdersColumnList = payload?.map((item, index) => ({ ...item, id: index }));
      }

      if (actionType === "add") {
        state.customerOrdersColumnList = [
          ...state.customerOrdersColumnList,
          { ...payload, id: arrayLength + 1 },
        ];
      }

      if (actionType === "update") {
        const index = state.customerOrdersColumnList?.findIndex((item) => item.id === payload.id);
        if (index !== -1) {
          state.customerOrdersColumnList[index] = {
            ...state.customerOrdersColumnList[index],
            ...payload,
          };
        }
      }

      if (actionType === "delete") {
        state.customerOrdersColumnList = state.customerOrdersColumnList?.filter(
          (item) => item.id !== payload
        );
      }

      if (actionType === "clear") {
        state.customerOrdersColumnList = [];
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
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
    setSingleClickFlag: (state, action) => {
      state.singleClickFlag = action.payload;
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
    setSaveFormData: (state, action) => {
      state.saveFormData = action.payload;
    },

    //input
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setRadioValue: (state, action) => {
      state.radioValue = action.payload;
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
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setCustomerSelection: (state, action) => {
      state.customerSelection = action.payload;
    },
    setCustomerInput: (state, action) => {
      state.customerInput = action.payload;
    },
    setSpecialCondition: (state, action) => {
      state.specialCondition = action.payload;
    },
    setSpecialConditionsList: (state, action) => {
      state.specialConditionsList = action.payload;
    },
    setActiveOrderTab: (state, action) => {
      state.activeOrderTab = action.payload;
    },
    triggerAddCondition: (state) => {
      state.addConditionTrigger += 1;
    },
    //customer Order Column
    setFieldName: (state, action) => {
      state.fieldName = action.payload;
    },
    setFieldWidth: (state, action) => {
      state.fieldWidth = action.payload;
    },
    setIgnore: (state, action) => {
      state.ignore = action.payload;
    },
    setFromField: (state, action) => {
      state.fromField = action.payload;
    },
    setFromValue: (state, action) => {
      state.fromValue = action.payload;
    },
    setToField: (state, action) => {
      state.toField = action.payload;
    },
    setSplitField: (state, action) => {
      state.splitField = action.payload;
    },
    setSplitFieldSeq: (state, action) => {
      state.splitFieldSeq = action.payload;
    },
    setFieldNameUnique: (state, action) => {
      state.fieldNameUnique = action.payload;
    },
    setIsCustomerOrderLoading: (state, { payload }) => {
      state.isCustomerOrderLoading = payload;
    },
    setColumnSortType: (state, { payload }) => {
      state.columnSortType = payload;
    },
    setColumnSortValue: (state, { payload }) => {
      state.columnSortValue = payload;
    },
    setColumnFooterDisableSave: (state, { payload }) => {
      state.columnFooterDisableSave = payload;
    },
    setDelimitedCheck: (state, action) => {
      state.delimitedCheck = action.payload;
    },

    setIsCustomerOrderLoading: (state, { payload }) => {
      state.isCustomerOrderLoading = payload;
    },
    setSaveList: (state, { payload }) => {
      const updateIndex = state.saveList.findIndex((data) => data.tempId === payload.tempId);

      if (updateIndex !== -1) {
        state.saveList[updateIndex] = payload;
      } else {
        state.saveList = [...state.saveList, { ...payload, tempId: state.tempId }];
        state.tempId += 1;
      }

      if (!payload) {
        state.saveList = [];
        state.tempId = 0;
      }
    },
    setUpdateList: (state, { payload }) => {
      const updateIndex = state.updateList.findIndex(
        (data) => data.customerOrderColumnPK === payload.customerOrderColumnPK
      );

      if (updateIndex !== -1) {
        state.updateList[updateIndex] = payload;
      } else {
        state.updateList = [...state.updateList, payload];
      }

      if (!payload) {
        state.updateList = [];
      }
    },
    setDeleteList: (state, { payload }) => {
      const { customerOrderColumnPK, tempId } = payload;

      const isInSaveList = state.saveList.find((data) => data.tempId === tempId);
      if (isInSaveList) {
        state.saveList = state.saveList.filter((data) => data.tempId !== tempId);
      }

      const isInUpdateList = state.updateList.find(
        (data) => data.customerOrderColumnPK === customerOrderColumnPK
      );
      if (isInUpdateList) {
        state.updateList = state.updateList.filter(
          (data) => data.customerOrderColumnPK !== customerOrderColumnPK
        );
      }

      if (!isInSaveList && !isInUpdateList) {
        if (customerOrderColumnPK) {
          state.deleteList = [...state.deleteList, customerOrderColumnPK];
        }
      }

      if (!payload) {
        state.deleteList = [];
      }
    },

    setCommonSaveList: (state, { payload }) => {
      if (payload) {
        state.commonSaveList = [...state.commonSaveList, payload];
      } else {
        state.commonSaveList = [];
      }
    },
    resetChanges: (state, action) => {
      state.description = "";
      state.radioValue = "txtFile";
      state.delimited = false;
      state.delimiter = "";
      state.hasHeaders = false;
      state.headerRows = "";
      state.customerId = null;
      state.customerInput = "";
    },
    resetCustomerOrderColumnChanges: (state, action) => {
      state.fieldName = "";
      state.fieldWidth = "";
      state.ignore = false;
      state.fromField = "";
      state.fromValue = "";
      state.toField = "";
      state.splitField = false;
      state.splitFieldSeq = "";
    },
    resetCustomerOrders: (state, action) => {
      state.searchTerm = "";
      state.searchCriteria = "Beginning";
      state.pageNumber = 0;
      state.changeColor = false;
      state.sortValue = null;
      state.sortType = false;
      state.specialConditionsList = [];
    },
    resetCustomerOrdersColumn: (state, { payload }) => {
      state.saveList = [];
      state.tempId = 0;
      state.updateList = [];
      state.deleteList = [];
      state.columnId = null;
      state.columnsEditFormData = null;
      state.fieldNameUnique = false;
      state.assignedCustomerOrdersList = [];
      state.delimitedCheck = false;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    toggleChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setCustomerOrders: (state, action) => {
      state.customerOrders = action.payload;
    },
    setCustomerOrderFlag: (state, action) => {
      state.customerOrderFlag = action.payload;
    },
    setTestFile: (state, action) => {
      state.testFile = action.payload;
    },
    setTestResponse: (state, action) => {
      state.testResponse = action.payload;
    },
    setIsCustomerLoading: (state, action) => {
      state.isCustomerLoading = action.payload;
    },
  },
});
export const {
  setId,
  setColumnId,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setCustomerOrdersData,
  setEditPageLoading,
  setSearchTerm,
  setSearchCriteria,
  setViewDetail,
  setChangeColor,
  setEditFormData,
  setSortValue,
  setSortType,
  setSaveFormData,
  setDescription,
  setDelimited,
  setDelimiter,
  setHasHeaders,
  setHeaderRows,
  resetChanges,
  resetCustomerOrders,
  setDisableSave,
  toggleChangesCancelled,
  setCustomerOrders,
  setRadioValue,
  setCustomerSelection,
  setCustomerInput,
  setSpecialCondition,
  setSpecialConditionsList,
  setActiveOrderTab,
  triggerAddCondition,
  setCustomerId,
  setCustomerOrderFlag,
  setAssignedTotalElements,
  setAssignedTotalPages,
  setAassignedCustomerOrdersList,
  setCustomerOrdersColumnList,
  setLoading,
  setFieldName,
  setFieldWidth,
  setIgnore,
  setFromField,
  setFromValue,
  setToField,
  setSplitField,
  setSplitFieldSeq,
  resetCustomerOrderColumnChanges,
  setColumnsEditFormData,
  setDelimitedCheck,
  setSingleClickFlag,
  setSaveList,
  setDeleteList,
  setUpdateList,
  setCommonSaveList,
  setFieldNameUnique,
  resetCustomerOrdersColumn,
  setIsCustomerOrderLoading,
  setColumnSortType,
  setColumnSortValue,
  setTestFile,
  setTestResponse,
  setIsCustomerLoading,
  setColumnFooterDisableSave,
} = CustomerOrdersSlice.actions;

export default CustomerOrdersSlice.reducer;
