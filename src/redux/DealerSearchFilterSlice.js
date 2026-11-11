import { createSlice } from "@reduxjs/toolkit";

const DealerSearchFilterSlice = createSlice({
  name: "dealerFilter",
  initialState: {
    id: "",
    changeColor: false,
    complete: true,
    dealerData: [],
    selectedDealerStatus: "Complete",
    test: "test",
    selectedStatus: "Active",
    selectedSearchCriteria: "Beginning",
    searchTerms: "",
    searchedDealer: null, // Advanced Search Payload object
    advancedSearchObject: null, // Advanced Search UI object
    showAdvanceSearch: false,
    showAdvanceSort: false,
    normalSortValue: null,
    normalSortFlag: false,
    advanceSortedValue: null,
    advanceSortingOrder: null,
    advancedSearchString: "",
    checkAllAdvancedSearchBy: false,
    advancedSearchByInputs: {
      address: false,
      postalCode: false,
      phone: false,
      contacts: false,
      notes: false,
      storeCode: false,
    },
    advancedSearchByPayload: null,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setComplete: (state, action) => {
      state.complete = action.payload;
    },

    setSelectedDealerStatus: (state, action) => {
      state.selectedDealerStatus = action.payload;
    },

    setTest: (state, action) => {
      state.test = action.payload;
    },

    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },

    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    //Advance Search reducers.
    setSearchedDealer: (state, action) => {
      state.searchedDealer = action.payload;
    },

    setAdvancedSearchObject: (state, action) => {
      state.advancedSearchObject = action.payload;
    },

    setDealerData: (state, action) => {
      state.dealerData = action.payload;
    },

    setAdvanceSortingCriteria: (state, action) => {
      state.advanceSortingOrder = action.payload;
    },

    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },

    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
    },

    setShowAdvanceSort: (state, action) => {
      state.showAdvanceSort = action.payload;
    },

    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },

    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },

    setAdvanceSortedValue: (state, action) => {
      state.advanceSortedValue = action.payload;
    },

    setAdvancedSearchString: (state, action) => {
      state.advancedSearchString = action.payload;
    },

    setCheckAllAdvancedSearchBy: (state, action) => {
      state.checkAllAdvancedSearchBy = action.payload;

      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = action.payload;
      });
    },

    setAdvancedSearchByInputs: (state, { payload }) => {
      state.advancedSearchByInputs = {
        ...state.advancedSearchByInputs,
        [payload.name]: payload.checked,
      };
    },

    setAdvancedSearchByPayload: (state, action) => {
      state.advancedSearchByPayload = action.payload;
    },

    clearAdvancedSearch: (state, action) => {
      state.advancedSearchObject = null;
      state.searchedDealer = null;
      state.advancedSearchString = "";
      state.checkAllAdvancedSearchBy = false;
      Object.keys(state.advancedSearchByInputs).forEach((key) => {
        state.advancedSearchByInputs[key] = false;
      });
      state.advancedSearchByPayload = null;
    },

    updateAdvancedSearchByInputs: (state, { payload }) => {
      if (payload === "All") {
        state.checkAllAdvancedSearchBy = true;
        state.advancedSearchByInputs = {
          address: true,
          postalCode: true,
          phones: true,
          contacts: true,
          notes: true,
          storeCode: true,
        };
      } else if (payload === "None") {
        state.checkAllAdvancedSearchBy = false;
        state.advancedSearchByInputs = {
          address: false,
          postalCode: false,
          phones: false,
          contacts: false,
          notes: false,
          storeCode: false,
        };
      }
    },
  },
});

export const {
  setId,
  setChangeColor,
  setComplete,
  setSelectedDealerStatus,
  setTest,
  setSelectedStatus,
  setSelectedSearchCriteria,
  setSearchedDealer,
  setAdvancedSearchObject,
  setDealerData,
  setAdvanceSortingCriteria,
  setSearchTerms,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  setNormalSortValue,
  setNormalSortFlag,
  setAdvanceSortedValue,
  setAdvancedSearchString,
  setCheckAllAdvancedSearchBy,
  setAdvancedSearchByInputs,
  updateAdvancedSearchByInputs,
  setAdvancedSearchByPayload,
  clearAdvancedSearch,
  // resetChangesSearchFilter
} = DealerSearchFilterSlice.actions;

export const dealer = (state) => state.dealerFilter.value;

export default DealerSearchFilterSlice.reducer;
