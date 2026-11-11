import { createSlice } from "@reduxjs/toolkit";
const DriverDeleaseSlice = createSlice({
  name: "DriverDelease",
  initialState: {
    id: "",
    driverDeleaseListingData: [],
    editFormData: null,
    /****save driver delease record****/
    driverDeleaseData: null,
    /**pagination***/
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    /**normal sorting***/
    sortValue: null,
    sortFlag: false,
    searchTerms: "",
    searchCriteria: "Beginning",
    changeColor: false,
    changesCancelled: false,
    viewDetail: false,
    /****For Items Tab */
    itemsTotalPages: 0,
    itemsTotalElements: 0,
    itemsPageNumber: 0,
    itemsListingData: [],
    deleaseItemsListingData: [],
    status: "inactive",
    driverDeleasedCheckedList: [],
    driverDeleaseitemsFullList: [],
    incompletedriverDeleaseitems: [],
    completedCheckFlag: false,
    changedDatesPKs: [],
    allItemsCompletedFlag: false,
    deleaseItemsListComplete: [],
    /***check the new button***/
    isInactiveOrDeleased: false,
    isInactiveNotDeleased: false,
    isProcessed: false,
    isCompletedAndVoided: false,
    driverData: null,
    userData: null,
    /****Tab validation****/
    isGeneralTabValid: false,
    isDatesTabValid: false,
    /****Items tab rows (driverDeleaseItemPK) having an invalid completed date****/
    invalidItemDatePKs: [],
    isDriverDeleaseLoading: false,
    /****Use for Items Tab driver delease items */
    loading: true,
    changedArray: [],
    addressed: false,
    addressedDate: "",
    /******Letter tab******/
    hasActiveDamage: false,
    rehire: false,
    chargeAdminFee: false,
    payBalance: "",
    bondBalance: "",
    reserveBalance: "",
    adminFee: "",
    /*****flag to disble the print button******/
    disablePrint: false,
    isStatusChangingFromInactiveToTerminated: false,
    isLetterTab: false,
    isFromDriverDelease: false,
  },
  reducers: {
    setDriverDeleaseListingData: (state, action) => {
      state.driverDeleaseListingData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSortFlag: (state, action) => {
      state.sortFlag = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = !state.changesCancelled;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setItemsListingData: (state, action) => {
      state.itemsListingData = action.payload;
    },
    setDeleaseItemsListingData: (state, action) => {
      state.deleaseItemsListingData = action.payload;
    },
    setChangedArray: (state, action) => {
      state.changedArray = action.payload;
    },
    setItemsPageNumber: (state, action) => {
      state.itemsPageNumber = action.payload;
    },
    setItemsTotalPages: (state, action) => {
      state.itemsTotalPages = action.payload;
    },
    setItemsTotalElements: (state, action) => {
      state.itemsTotalElements = action.payload;
    },
    setIsInactiveOrDeleased: (state, action) => {
      state.isInactiveOrDeleased = action.payload;
    },
    setIsInactiveNotDeleased: (state, action) => {
      state.isInactiveNotDeleased = action.payload;
    },
    setIsProcessed: (state, action) => {
      state.isProcessed = action.payload;
    },
    setIsCompletedAndVoided: (state, action) => {
      state.isCompletedAndVoided = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setDriverData: (state, action) => {
      state.driverData = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setDriverDeleaseData: (state, action) => {
      let payload = action.payload;
      state.driverDeleaseData = { ...state.driverDeleaseData, ...payload };
    },
    resetStates: (state, action) => {
      state.driverDeleaseListingData = [];
      state.editFormData = null;
      state.deleaseItemsListingData = [];
      state.itemsListingData = [];
      state.invalidItemDatePKs = [];
    },
    setItemDateValid: (state, { payload }) => {
      const { driverDeleaseItemPK, isValid } = payload;
      const isListed = state.invalidItemDatePKs.includes(driverDeleaseItemPK);
      if (isValid && isListed) {
        state.invalidItemDatePKs = state.invalidItemDatePKs.filter((key) => key !== driverDeleaseItemPK);
      } else if (!isValid && !isListed) {
        state.invalidItemDatePKs.push(driverDeleaseItemPK);
      }
    },
    resetInvalidItemDatePKs: (state) => {
      state.invalidItemDatePKs = [];
    },
    setIsGeneralTabValid: (state, action) => {
      state.isGeneralTabValid = action.payload;
    },
    setIsDatesTabValid: (state, action) => {
      state.isDatesTabValid = action.payload;
    },
    setIsDriverDeleaseLoading: (state, { payload }) => {
      state.isDriverDeleaseLoading = payload;
    },
    setHasActiveDamage: (state, action) => {
      state.hasActiveDamage = action.payload;
    },
    setRehire: (state, action) => {
      state.rehire = action.payload;
    },
    setChargeAdminFee: (state, action) => {
      state.chargeAdminFee = action.payload;
    },
    setPayBalance: (state, action) => {
      state.payBalance = action.payload;
    },
    setBondBalance: (state, action) => {
      state.bondBalance = action.payload;
    },
    setReserveBalance: (state, action) => {
      state.reserveBalance = action.payload;
    },
    setAdminFee: (state, action) => {
      state.adminFee = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    resetChangedArray: (state) => {
      state.changedArray = [];
    },
    resetDriverDeleasedCheckedList: (state) => {
      state.driverDeleasedCheckedList = [];
    },
    setAddressed: (state, { payload }) => {
      const arrayElement = state.itemsListingData[payload];
      arrayElement.addressed = !arrayElement.addressed;
      if (!arrayElement.addressed) {
        arrayElement.addressedDate = null;
      }
    },
    setDriverDeleasedCheckedList: (state, { payload }) => {
      const { driverDeleaseItemPK, isChecked } = payload;

      if (isChecked) {
        /*** Add the primary key if it's not already in the list***/
        if (!state.driverDeleasedCheckedList.includes(driverDeleaseItemPK)) {
          state.driverDeleasedCheckedList.push(driverDeleaseItemPK);
        }
      } else {
        /**Remove the primary key from the list if it exists***/
        state.driverDeleasedCheckedList = state.driverDeleasedCheckedList.filter(
          (key) => key !== driverDeleaseItemPK
        );
      }
    },
    setDriverDeleaseitemsFullList: (state, action) => {
      state.driverDeleaseitemsFullList = action.payload;
    },
    setDeleaseItemsListComplete: (state, action) => {
      state.deleaseItemsListComplete = action.payload;
    },

    setIncompletedriverDeleaseitems: (state, action) => {
      state.incompletedriverDeleaseitems = action.payload;
    },
    setCompletedCheckFlag: (state, action) => {
      state.completedCheckFlag = action.payload;
    },
    setAllItemsCompletedFlag: (state, action) => {
      state.allItemsCompletedFlag = action.payload;
    },
    setAddressedDate: (state, action) => {
      const { index, date } = action.payload;
      const item = state.itemsListingData[index];
      if (item) {
        item.addressedDate = date;
      }
    },
    updateItemsListingData: (state, action) => {
      state.itemsListingData = action.payload;
    },
    updateitemsListingDataElement: (state, { payload }) => {
      state.itemsListingData[payload.index].addressed = payload.element.addressed;
      state.itemsListingData[payload.index].addressedDate = payload.element.addressedDate;
    },
    syncItemsListingData: (state) => {
      state.itemsListingData = state.itemsListingData.map((item) => {
        const changedItem = state.changedArray.find(
          (cItem) => cItem.driverDeleaseItemPK === item.driverDeleaseItemPK
        );
        if (changedItem) {
          return { ...item, ...changedItem };
        }
        return item;
      });
    },
    resetChangedItems: (state) => {
      state.itemsListingData = state.itemsListingData.map((item) => {
        if (
          state.changedArray.some(
            (changedItem) => changedItem.driverDeleaseItemPK === item.driverDeleaseItemPK
          )
        ) {
          return {
            ...item,
            addressed: false,
            addressedDate: null,
          };
        }
        return item;
      });
      state.changedArray = [];
      state.driverDeleasedCheckedList = [];
      state.invalidItemDatePKs = [];
      state.itemsPageNumber = 0;
    },
    setDisablePrint: (state, action) => {
      state.disablePrint = action.payload;
    },
    setIsStatusChangingFromInactiveToTerminated: (state, action) => {
      state.isStatusChangingFromInactiveToTerminated = action.payload;
    },
    setIsLetterTab: (state, action) => {
      state.isLetterTab = action.payload;
    },
    setIsFromDriverDelease: (state, action) => {
      state.isFromDriverDelease = action.payload;
    },
  },
});
export const {
  setDriverDeleaseListingData,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setId,
  setSortValue,
  setSortFlag,
  setSearchTerms,
  setSearchCriteria,
  setChangeColor,
  setViewDetail,
  setItemsListingData,
  setItemsPageNumber,
  setItemsTotalElements,
  setItemsTotalPages,
  setDeleaseItemsListingData,
  setIsInactiveOrDeleased,
  setIsInactiveNotDeleased,
  setIsProcessed,
  setIsCompletedAndVoided,
  setEditFormData,
  setDriverData,
  setUserData,
  setDriverDeleaseData,
  resetStates,
  setItemDateValid,
  resetInvalidItemDatePKs,
  setIsGeneralTabValid,
  setIsDatesTabValid,
  setIsDriverDeleaseLoading,
  setChangesCancelled,
  setAddressed,
  setDriverDeleasedCheckedList,
  setAddressedDate,
  setLoading,
  updateitemsListingDataElement,
  setChangedArray,
  setFilteredArray,
  updateItemsListingData,
  syncItemsListingData,
  setHasActiveDamage,
  setRehire,
  setChargeAdminFee,
  setBondBalance,
  setReserveBalance,
  setPayBalance,
  setAdminFee,
  setStatus,
  resetChangedArray,
  resetDriverDeleasedCheckedList,
  resetChangedItems,
  setDriverDeleaseitemsFullList,
  setIncompletedriverDeleaseitems,
  setCompletedCheckFlag,
  setAllItemsCompletedFlag,
  setDisablePrint,
  setIsStatusChangingFromInactiveToTerminated,
  setDeleaseItemsListComplete,
  setIsLetterTab,
  setIsFromDriverDelease,
} = DriverDeleaseSlice.actions;

export default DriverDeleaseSlice.reducer;
