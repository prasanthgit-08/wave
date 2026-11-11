import { createSlice } from "@reduxjs/toolkit";

const ProcessPaySlice = createSlice({
  name: "processPay",
  initialState: {
    driverId: null,
    driverData: [],
    driverSelection: false,
    loading: true,
    //pagination
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    unitShuttlePK: "",
    driverNameInput: "",
    selectedDriver: "",
    selectedDriverID: "",

    //driver selection input
    driverName: "",
    processPayData: [],
    // Multi Page Selection & SelectAll
    selectedArrayList: [],
    unselectedArrayList: [],
    // unselectedArrayList: [1,2],
    selectAll: false,
    // cancelInput: false,
    pickUp: "",
    delivery: "",
    shuttleType: "",
    shuttlePay: "",
    editFormData: null,
    process: false,
    //search
    searchTerm: "",
    searchCriteria: "Beginning",
    //normal sort
    normalSortValue: null,
    normalSortFlag: false,

    //company selection
    companyName: "",
    companyFK: null,
    currentCompanyName: "",
    isCurrentCompany: false,

    //company name and count for selected driver
    companyDataforCount: [],
    changeColor: false,
  },

  reducers: {
    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDriverData: (state, action) => {
      state.driverData = action.payload;
    },
    setDriverSelection: (state, action) => {
      state.driverSelection = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setProcess: (state, action) => {
      state.process = action.payload;
    },
    setEditFormData: (state, action) => {
      state.editFormData = action.payload;
    },
    setShuttleType: (state, action) => {
      state.shuttleType = action.payload;
    },
    setShuttlePay: (state, action) => {
      state.shuttlePay = action.payload;
    },
    setPickUp: (state, action) => {
      state.pickUp = action.payload;
    },
    setDelivery: (state, action) => {
      state.delivery = action.payload;
    },
    setDriverName: (state, action) => {
      state.driverName = action.payload;
    },
    setProcessPayData: (state, action) => {
      state.processPayData = action.payload;
    },
    updateProcessPayData: (state, { payload }) => {
      const { index, id } = payload;
      let arrayElement = state.processPayData[index];
      //if id is present and post is true, then that element is removed from selected array list (unselection from selected array)
      if (id) {
        if (state.processPayData[index].post) {
          // remove from selectedArray
          if (!state.selectAll) {
            state.selectedArrayList = state.selectedArrayList.filter(
              (element) => element.unitShuttlePK !== id
            );
          }
          // && add to unselectedArrayList(for selectAll)
          if (
            state.selectAll &&
            state.unselectedArrayList?.every((element) => element.unitShuttlePK !== id)
          ) {
            state.unselectedArrayList = [...state.unselectedArrayList, { unitShuttlePK: id }];
          }
        } else {
          // add to selectedArraylist
          if (!state.selectAll && state.selectedArrayList?.every((element) => element.unitShuttlePK !== id)) {
            state.selectedArrayList = [...state.selectedArrayList, { unitShuttlePK: id }];
          }
          //removeFrom unselected if selectAll state is true.
          if (state.selectAll) {
            state.unselectedArrayList = state.unselectedArrayList.filter(
              (element) => element.unitShuttlePK !== id
            );
          }
        }
      }
      // used to toggle value of post
      arrayElement.post = !state.processPayData[index].post;
      state.processPayData[index] = arrayElement;
    },
    setSelectedArrayList: (state, action) => {
      state.selectedArrayList = action.payload;
    },
    updateSelectedArrayList: (state, { payload }) => {
      state.selectedArrayList = [...state.selectedArrayList, ...payload];
    },
    setUnselectedArrayList: (state, action) => {
      state.unselectedArrayList = action.payload;
    },
    handleSelectAll: (state, action) => {
      if (
        (state.unselectedArrayList.length > 0 || !state.selectAll) &&
        state.totalElements !== state.selectedArrayList?.length
      ) {
        state.selectAll = true;
        state.unselectedArrayList = [];
        state.processPayData = state.processPayData.map((data) => ({ ...data, post: true }));
        state.selectedArrayList = state.processPayData.map((data) => ({
          unitShuttlePK: data.unitShuttlePK,
        }));
      } else {
        state.selectAll = false;
        state.processPayData = state.processPayData.map((data) => ({ ...data, post: false }));
        state.selectedArrayList = [];
      }
    },

    selectAllRecord: (state, { payload }) => {
      // Finding duplicate elements between unselectedArrayList and processPayData
      let duplicateElements = state.unselectedArrayList.filter((element) =>
        state.processPayData.some((data) => data.unitShuttlePK === element.unitShuttlePK)
      );
      let indexList = [];
      // Finding indexes of duplicateElements in processPayData for excluding from selectAll mode
      if (duplicateElements?.length > 0) {
        duplicateElements?.forEach((unit) => {
          const indexToUpate = state.processPayData.findIndex(
            (element) => element.unitShuttlePK === unit.unitShuttlePK
          );
          indexList.push(indexToUpate);
        });
      }
      // Change post flag to false for unselected items; ie exclude unselected items in selectAll mode
      state.processPayData = state.processPayData.map((data, index) => {
        return { ...data, post: indexList.some((i) => i === index) ? false : true };
      });
    },
    unselectAllRecord: (state) => {
      state.processPayData = state.processPayData.map((data) => ({ ...data, post: false }));
    },
    resetSelection: (state) => {
      state.selectAll = false;
      state.selectedArrayList = [];
      state.unselectedArrayList = [];
      state.normalSortValue = null;
      state.pageNumber = 0;
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
    setDriverNameInput: (state, action) => {
      state.driverNameInput = action.payload;
    },
    setSelectedDriver: (state, action) => {
      state.selectedDriver = action.payload;
    },
    setSelectedDriverID: (state, action) => {
      state.selectedDriverID = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setCompanyFK: (state, action) => {
      state.companyFK = action.payload;
    },
    setCurrentCompanyName: (state, action) => {
      state.currentCompanyName = action.payload;
    },
    setCompanyDataforCount: (state, action) => {
      state.companyDataforCount = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setIsCurrentCompany: (state, action) => {
      state.isCurrentCompany = action.payload;
    },
  },
});

export const {
  setLoading,
  setIsCurrentCompany,
  setSelectedArrayList,
  updateSelectedArrayList,
  setUnselectedArrayList,
  setNormalSortFlag,
  setNormalSortValue,
  setDriverSelection,
  setDriverId,
  setDriverData,
  selectAllRecord,
  unselectAllRecord,
  resetSelection,
  handleSelectAll,
  setSearchCriteria,
  setSearchTerm,
  setProcess,
  setEditFormData,
  setPickUp,
  setDelivery,
  setShuttlePay,
  setShuttleType,
  setDriverNameInput,
  setSelectedDriver,
  setSelectedDriverID,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setDriverName,
  setProcessPayData,
  updateProcessPayData,
  setCompanyFK,
  setCompanyName,
  setCurrentCompanyName,
  setCompanyDataforCount,
  setChangeColor,
} = ProcessPaySlice.actions;

export default ProcessPaySlice.reducer;
