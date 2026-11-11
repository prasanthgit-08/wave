import { createSlice } from "@reduxjs/toolkit";

const UnitTypeSlice = createSlice({
  name: "UnitType",
  initialState: {
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,

    //search
    listingData: [],
    searchTerms: "",
    searchCriteria: "Beginning",
    selectedStatus: "All",
    selectedId: "",
    changeColor: false,
    viewDetail: false,
    editFormData: null,
    changesCancelled: false,
    normalSortValue: null,
    normalSortFlag: false,

    //editing
    unitTypePK: "",
    unitCode: "",
    descriptionShort: "",
    descriptionLong: "",
    motorized: false,
    towable: false,
    length: "",
    type: "Motorized",
    overwidth: false,
    overwidthformtypefk: "",
    ptiformfk: "",
    specialinstruction: "",
    allowmultiunit: false,
    allowonthirtyfive: false,
    requiresflagsandsigns: false,
    requireseld: false,
    allowPopup: false,
    allowOnTruckCamperTrailor: false,

    //lookup
    formTypeSelection: false,
    formSelection: false,
    formTypeInput: "",
    formInput: "",
    formTypeId: null,
    formId: null,
    //validation
    isUnitCodeUnique: true,
    isDescriptionUnique: true,
  },
  reducers: {
    setFormTypeSelection: (state, action) => {
      state.formTypeSelection = action.payload;
    },
    setFormSelection: (state, action) => {
      state.formSelection = action.payload;
    },
    setFormTypeInput: (state, action) => {
      state.formTypeInput = action.payload;
    },
    setFormInput: (state, action) => {
      state.formInput = action.payload;
    },
    setFormTypeId: (state, action) => {
      state.formTypeId = action.payload;
    },
    setFormId: (state, action) => {
      state.formId = action.payload;
    },

    setUnitTypePK: (state, action) => {
      state.unitTypePK = action.payload;
    },
    setUnitCode: (state, action) => {
      state.unitCode = action.payload;
    },
    setDescriptionShort: (state, action) => {
      state.descriptionShort = action.payload;
    },
    setDescriptionLong: (state, action) => {
      state.descriptionLong = action.payload;
    },
    setMotorized: (state, action) => {
      state.motorized = action.payload;
    },
    setTowable: (state, action) => {
      state.towable = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setLength: (state, action) => {
      state.length = action.payload;
    },
    setOverwidth: (state, action) => {
      state.overwidth = action.payload;
    },
    setOverwidthformtypefk: (state, action) => {
      state.overwidthformtypefk = action.payload;
    },
    setPtiformfk: (state, action) => {
      state.ptiformfk = action.payload;
    },
    setSpecialinstruction: (state, action) => {
      state.specialinstruction = action.payload;
    },
    setAllowmultiunit: (state, action) => {
      state.allowmultiunit = action.payload;
    },
    setAllowonthirtyfive: (state, action) => {
      state.allowonthirtyfive = action.payload;
    },
    setRequiresflagsandsigns: (state, action) => {
      state.requiresflagsandsigns = action.payload;
    },
    setRequireseld: (state, action) => {
      state.requireseld = action.payload;
    },
    setAllowPopup: (state, action) => {
      state.allowPopup = action.payload;
    },
    setAllowOnTruckCamperTrailor: (state, action) => {
      state.allowOnTruckCamperTrailor = action.payload;
    },

    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },

    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
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
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },

    setChangesCancelled: (state, action) => {
      state.changesCancelled = action.payload;
    },
    setIsUnitCodeUnique: (state, action) => {
      state.isUnitCodeUnique = action.payload;
    },
    setIsDescriptionUnique: (state, action) => {
      state.isDescriptionUnique = action.payload;
    },
    resetChanges: (state, action) => {
      state.unitTypePK = "";
      state.unitCode = "";
      state.descriptionShort = "";
      state.descriptionLong = "";
      state.type = "Motorized";
      state.length = "";
      state.overwidth = false;
      state.overwidthformtypefk = "";
      state.ptiformfk = "";
      state.allowmultiunit = false;
      state.allowonthirtyfive = false;
      state.specialinstruction = "";
      state.requiresflagsandsigns = false;
      state.allowOnTruckCamperTrailor = false;
      state.requireseld = false;
      state.allowPopup = false;
      state.formTypeId = null;
      state.formId = null;
      state.formInput = "";
      state.formTypeInput = "";
      state.isDescriptionUnique = false;
      state.isUnitCodeUnique = false;
      state.editFormData = null;
    },
  },
});
export const {
  setUnitCode,
  setDescriptionShort,
  setDescriptionLong,
  setMotorized,
  setTowable,
  setLength,
  setOverwidth,
  setOverwidthformtypefk,
  setPtiformfk,
  setSpecialinstruction,
  setAllowmultiunit,
  setAllowonthirtyfive,
  setRequiresflagsandsigns,
  setRequireseld,
  setSelectedStatus,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setListingData,
  setSearchTerms,
  setSearchCriteria,
  setSelectedId,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  resetChanges,
  setNormalSortValue,
  setNormalSortFlag,
  setChangesCancelled,
  setActiveStatus,
  setUnitTypePK,
  setFormTypeSelection,
  setFormSelection,
  setFormInput,
  setFormTypeInput,
  setFormTypeId,
  setFormId,
  setIsUnitCodeUnique,
  setIsDescriptionUnique,
  setType,
  setAllowPopup,
  setAllowOnTruckCamperTrailor,
} = UnitTypeSlice.actions;
export default UnitTypeSlice.reducer;
