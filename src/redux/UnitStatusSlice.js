import { createSlice } from "@reduxjs/toolkit";

const UnitStatusSlice = createSlice({
  name: "UnitStatusSlice",
  initialState: {
    // for data list
    unitRouteListingData: [],

    // for pagination
    unitRoutePageNumber: 0,
    unitRouteTotalElements: 0,
    unitRouteTotalPages: 0,

    // for search and sort
    unitRouteSortType: false,
    unitRouteSortValue: "",
  },
  reducers: {
    setUnitRouteListingData: (state, action) => {
      state.unitRouteListingData = action.payload;
    },
    setUnitRoutePageNumber: (state, action) => {
      state.unitRoutePageNumber = action.payload;
    },
    setUnitRouteSortType: (state, action) => {
      state.unitRouteSortType = action.payload;
    },
    setUnitRouteSortValue: (state, action) => {
      state.unitRouteSortValue = action.payload;
    },
    setUnitRouteTotalElements: (state, action) => {
      state.unitRouteTotalElements = action.payload;
    },

    setUnitRouteTotalPages: (state, action) => {
      state.unitRouteTotalPages = action.payload;
    },
  },
});

export const {
  setUnitRouteListingData,
  setChangeColor,
  setUnitRoutePageNumber,
  setTotalElements,
  setTotalPages,
  setSearchTerm,
  setSearchCriteria,
  setUnitRouteSortType,
  setUnitRouteSortValue,
  setLoader,
  resetPageValues,
} = UnitStatusSlice.actions;
export default UnitStatusSlice.reducer;
