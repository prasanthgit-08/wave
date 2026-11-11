import { createSlice } from "@reduxjs/toolkit";

const InventoryStatusFlashReportSlice = createSlice({
  name: "inventoryStatusFlashReportSlice",
  initialState: {
    outboundTowableSingle: false,
    outboundTowableMultiUnit: false,
    outboundMotorized: false,
    reloadTowableSingle: false,
    reloadTowableMultiUnit: false,
    reloadMotorized: false,
    listingData: { "": null },
    index: 0,
    pageNumbers: { "": 0 },
    keys: [],
  },
  reducers: {
    setOutboundTowableSingle: (state, { payload }) => {
      state.outboundTowableSingle = payload;
    },
    setOutboundTowableMultiUnit: (state, { payload }) => {
      state.outboundTowableMultiUnit = payload;
    },
    setOutboundMotorized: (state, { payload }) => {
      state.outboundMotorized = payload;
    },
    setReloadTowableSingle: (state, { payload }) => {
      state.reloadTowableSingle = payload;
    },
    setReloadTowableMultiUnit: (state, { payload }) => {
      state.reloadTowableMultiUnit = payload;
    },
    setReloadMotorized: (state, { payload }) => {
      state.reloadMotorized = payload;
    },
    setListingData: (state, { payload }) => {
      state.listingData = payload;
    },
    setPageNumber: (state, { payload }) => {
      state.pageNumbers = payload;
    },
    setUpdatedPageNumber: (state, { payload }) => {
      const key = state.keys[state.index];
      const temp = { ...state.pageNumbers, [key]: payload };
      state.pageNumbers = temp;
    },
    setIndex: (state, { payload }) => {
      state.index = payload;
    },
    setKeys: (state, { payload }) => {
      state.keys = payload;
    },
    reset: (state) => {
      state.outboundTowableSingle = false;
      state.outboundTowableMultiUnit = false;
      state.outboundMotorized = false;
      state.reloadTowableSingle = false;
      state.reloadTowableMultiUnit = false;
      state.reloadMotorized = false;
      state.listingData = { "": null };
      state.index = 0;
      state.pageNumbers = { "": 0 };
      state.keys = [];
    },
    resetInner: (state) => {
      state.listingData = { "": null };
      state.index = 0;
      state.pageNumbers = { "": 0 };
      state.keys = [];
    },
  },
});

export const {
  setOutboundMotorized,
  setOutboundTowableMultiUnit,
  setOutboundTowableSingle,
  setReloadMotorized,
  setReloadTowableMultiUnit,
  setReloadTowableSingle,
  setListingData,
  setIndex,
  setPageNumber,
  setKeys,
  setUpdatedPageNumber,
  reset,
  resetInner,
} = InventoryStatusFlashReportSlice.actions;

export default InventoryStatusFlashReportSlice;
