import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    browseNavigation: [],
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setBrowseNavigation: (state, action) => {
      state.browseNavigation = action.payload;
    },
  },
});

export const { setPageNumber, setTotalPages, setTotalElements, setBrowseNavigation } =
  paginationSlice.actions;

export const pagination = (state) => state.pagination.value;

export default paginationSlice.reducer;
