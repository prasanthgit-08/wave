import { createSlice } from "@reduxjs/toolkit";

const CityToYardSlice = createSlice({
  name: "CityToYard",
  initialState: {
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,

    //search
    listingData: [],
    searchTerm: "",
    searchCriteria: "Beginning",
    searchingCondititon: "",
    showAdvanceSearch: false,
    selectedId: "",
    searchCity: "",
    searchDescription: "",
    searchedUser: null,

    changeColor: false,
    viewDetail: false,
    editFormData: null,
    changesCancelled: false,

    //input
    cityToYardShuttlePK: "",
    shuttleCityFK: "",
    city: "",
    yardFK: "",
    description: "",
    towableShuttleFee: "",
    towableShuttleReturn: "",
    towableDriverFee: "",
    motorizedShuttleFee: "",
    motorizedShuttleReturn: "",
    motorizedDriverFee: "",
    miles: "",
    isYardCityUnique: false,

    //for lookup yard
    pickupYardSelection: false,
    deliveryYardSelection: false,
    pickupYardInput: "",
    pickupYardId: null,

    //for lookup shuttle city
    pickupCitySelection: false,
    deliveryCitySelection: false,
    pickupCityInput: "",
    pickupCityId: null,
    normalSortFlag: false,
    advanceSortedValue: null,
  },
  reducers: {
    setListingData: (state, action) => {
      state.listingData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSearchingCondititon: (state, action) => {
      state.searchingCondititon = action.payload;
    },
    setSearchCity: (state, action) => {
      state.searchCity = action.payload;
    },
    setSearchDescription: (state, action) => {
      state.searchDescription = action.payload;
    },
    setShowAdvanceSearch: (state, action) => {
      state.showAdvanceSearch = action.payload;
    },
    setShuttleCityFK: (state, action) => {
      state.shuttleCityFK = action.payload;
    },

    setYardFK: (state, action) => {
      state.yardFK = action.payload;
    },
    setCityToYardShuttlePK: (state, action) => {
      state.cityToYardShuttlePK = action.payload;
    },

    setCity: (state, action) => {
      state.city = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },

    setTowableShuttleFee: (state, action) => {
      state.towableShuttleFee = action.payload;
    },
    setTowableShuttleReturn: (state, action) => {
      state.towableShuttleReturn = action.payload;
    },
    setTowableDriverFee: (state, action) => {
      state.towableDriverFee = action.payload;
    },
    setMotorizedShuttleFee: (state, action) => {
      state.motorizedShuttleFee = action.payload;
    },
    setMotorizedShuttleReturn: (state, action) => {
      state.motorizedShuttleReturn = action.payload;
    },
    setMotorizedDriverFee: (state, action) => {
      state.motorizedDriverFee = action.payload;
    },
    setMiles: (state, action) => {
      state.miles = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },

    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setChangesCancelled: (state, action) => {
      state.changesCancelled = action.payload;
    },

    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setSearchedUser: (state, action) => {
      state.searchedUser = action.payload;
    },
    setDeliveryYardSelection: (state, action) => {
      state.deliveryYardSelection = action.payload;
    },
    setPickupYardInput: (state, action) => {
      state.pickupYardInput = action.payload;
    },
    setPickupYardId: (state, action) => {
      state.pickupYardId = action.payload;
    },
    setPickupYardSelection: (state, action) => {
      state.pickupYardSelection = action.payload;
    },
    setPickupCitySelection: (state, action) => {
      state.pickupCitySelection = action.payload;
    },
    setPickupCityInput: (state, action) => {
      state.pickupCityInput = action.payload;
    },
    setDeliveryCitySelection: (state, action) => {
      state.deliveryCitySelection = action.payload;
    },
    setPickupCityId: (state, action) => {
      state.pickupCityId = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },

    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setIsYardCityUnique: (state, action) => {
      state.isYardCityUnique = action.payload;
    },

    resetChanges: (state, action) => {
      state.cityToYardShuttlePK = "";
      state.shuttleCityFK = "";
      state.yardFK = "";
      state.city = "";
      state.description = "";
      state.towableShuttleFee = "";
      state.towableShuttleReturn = "";
      state.towableDriverFee = "";
      state.motorizedShuttleFee = "";
      state.motorizedShuttleReturn = "";
      state.motorizedDriverFee = "";
      state.miles = "";
      state.pickupYardInput = "";
      state.pickupYardId = null;
      state.pickupCityInput = "";
      state.pickupCityId = null;
      state.isYardCityUnique = false;
    },
  },
});
export const {
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setListingData,
  setSearchingCondititon,
  setSearchTerm,
  setSearchCriteria,
  setChangeColor,
  setViewDetail,
  setEditFormData,
  resetChanges,
  setChangesCancelled,
  setShuttleCityFK,
  setYardFK,
  setCity,
  setDescription,
  setTowableShuttleFee,
  setMotorizedShuttleFee,
  setShowAdvanceSearch,
  setSelectedId,
  setCityToYardShuttlePK,
  setTowableShuttleReturn,
  setTowableDriverFee,
  setMotorizedShuttleReturn,
  setMotorizedDriverFee,
  setMiles,
  setSearchCity,
  setSearchDescription,
  setSearchedUser,
  setDeliveryYardSelection,
  setPickupYardInput,
  setPickupYardId,
  setPickupYardSelection,
  setPickupCityId,
  setDeliveryCitySelection,
  setPickupCitySelection,
  setPickupCityInput,
  setIsYardCityUnique,
  setNormalSortValue,
  setNormalSortFlag,
} = CityToYardSlice.actions;
export default CityToYardSlice.reducer;
