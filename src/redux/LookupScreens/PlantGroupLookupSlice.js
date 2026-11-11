import { createSlice } from "@reduxjs/toolkit";

const PlantGroupLookupSlice = createSlice({
  name: "plantgrouplookup",
  initialState: {
    plantGroupLookupData: [],
    // search filter
    searchTerms: "",
    selectedSearchCriteria: "Beginning",

    // pagination
    plantGroupPageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    plantGroupSelectedId: "",
    changeColor: false,
    normalSortValue: null,
    normalSortFlag: false,
    loading: true,
  },
  reducers: {
    setPlantGroupSelectedId: (state, action) => {
      state.plantGroupSelectedId = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPlantGroupLookupData: (state, action) => {
      state.plantGroupLookupData = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setSelectedSearchCriteria: (state, action) => {
      state.selectedSearchCriteria = action.payload;
    },
    setPlantGroupPageNumber: (state, action) => {
      state.plantGroupPageNumber = action.payload;
    },
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    resetPlantGroupSearchSettings: (state, action) => {
      state.plantGroupLookupData = [];
      state.searchTerms = "";
      state.selectedSearchCriteria = "Beginning";
      state.plantGroupSelectedId = "";
      state.changeColor = false;
      state.normalSortValue = null;
      state.normalSortFlag = false;
      state.plantGroupPageNumber = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.loading = true;
    },
  },
});

export const {
  setPlantGroupSelectedId,
  setChangeColor,
  setPlantGroupLookupData,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSortPositions,
  setTotalElements,
  setTotalPages,
  setPlantGroupPageNumber,
  setLoading,
  resetPlantGroupSearchSettings,
} = PlantGroupLookupSlice.actions;

export default PlantGroupLookupSlice.reducer;
