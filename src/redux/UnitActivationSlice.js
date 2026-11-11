import { createSlice } from "@reduxjs/toolkit";

const UnitActivationSlice = createSlice({
  name: "unitActivation",
  initialState: {
    browseType: "",
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
    unitId: null,
    unitNumber: "",
    selectedUnit: null,
    saveData: null,
    saveDisable: true,
    inProgress: false,
    companyName: "",
    companyFK: null,
    currentCompanyName: "",
    cancelChanges: false,
    currentCompanyFetch: true,
    unitShuttleDelayData: null,
    unitSelected: null,
    reason: "",
    authorizedBy: "",
    reportingDriverId: null,
    reportingDriverName: "",
    reportingUserId: null,
    reportingUserName: "",
    reportedBy: "",
    dateReported: "",
    notes: "",
    delay: "none",
    active: false,
    activeDispatch: false,
    unitNumberLastFive: "",
    isInnerLookupsOpen: false,
    showUnitActivationDelay: false,
    showUnitActivationSoftPost: false,
    postToSister: "no",
    selectedCompanies: [],
    unitBrowseFilter: null,
    unitBrowseList: [],
    unitBrowseLoading: true,
    changeColor: false,
    viewOnly: false,
    delayDispatchReason: "",
    saveUnitBrowseList: [],
    loader: false,
    currentCompanyData: null,
    activationArrayList: [],
    holdArrayList: [],
    postArrayList: [],
    changedPostArrayList: [],
    shuttleDelayArrayList: [],
    dispatchDelayArrayList: [],
    dispatchDelayIndex: 0,
    unitIndex: null,
    delayDispatch: false,
    delayArrayIndex: 0,
    holdArrayIndex: 0,
    oeUnitIndex: 0,
    dispatchID: null,
    newDelayNavigation: null,
    radioSelection: "weight",
    enforceScalePlateWeights: false,
  },
  reducers: {
    setBrowseType: (state, action) => {
      state.browseType = action.payload;
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
    setUnitId: (state, action) => {
      state.unitId = action.payload;
    },
    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setSelectedUnit: (state, action) => {
      state.selectedUnit = action.payload;
    },
    setSaveData: (state, action) => {
      state.saveData = action.payload;
    },
    setSaveDisable: (state, action) => {
      state.saveDisable = action.payload;
    },
    setInProgress: (state, action) => {
      state.inProgress = action.payload;
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
    toggleCancelChanges: (state, action) => {
      state.cancelChanges = !state.cancelChanges;
    },
    setCurrentCompanyFetch: (state, action) => {
      state.currentCompanyFetch = action.payload;
    },
    setUnitShuttleDelayData: (state, action) => {
      state.unitShuttleDelayData = action.payload;
    },
    setUnitSelected: (state, action) => {
      state.unitSelected = action.payload;
    },
    setReason: (state, action) => {
      state.reason = action.payload;
    },
    setAuthorizedBy: (state, action) => {
      state.authorizedBy = action.payload;
    },
    setReportingDriverId: (state, action) => {
      state.reportingDriverId = action.payload;
    },
    setReportingDriverName: (state, action) => {
      state.reportingDriverName = action.payload;
    },
    setReportingUserId: (state, action) => {
      state.reportingUserId = action.payload;
    },
    setReportingUserName: (state, action) => {
      state.reportingUserName = action.payload;
    },
    setReportedBy: (state, action) => {
      state.reportedBy = action.payload;
    },
    setDateReported: (state, action) => {
      state.dateReported = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setDelay: (state, action) => {
      state.delay = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setActiveDispatch: (state, action) => {
      state.activeDispatch = action.payload;
    },
    setUnitNumberLastFive: (state, action) => {
      state.unitNumberLastFive = action.payload;
    },
    setIsInnerLookupsOpen: (state, action) => {
      state.isInnerLookupsOpen = action.payload;
    },
    setShowUnitActivationDelay: (state, action) => {
      state.showUnitActivationDelay = action.payload;
    },
    setShowUnitActivationSoftPost: (state, action) => {
      state.showUnitActivationSoftPost = action.payload;
    },
    setPostToSister: (state, action) => {
      state.postToSister = action.payload;
    },
    setSelectedCompanies: (state, action) => {
      state.selectedCompanies = action.payload;
    },
    setUnitBrowseList: (state, action) => {
      state.unitBrowseList = action.payload;

      let postToArray = state.unitBrowseList?.filter((element) => element.postedTo);

      if (postToArray?.length > 0) {
        postToArray?.forEach((unit) => {
          const indexToUpdate = state.postArrayList.findIndex(
            (element) => element.unitPK === unit.unitPK && element.company === unit.company
          );
          if (indexToUpdate !== -1) {
            state.postArrayList[indexToUpdate] = unit;
          } else {
            state.postArrayList = [...state.postArrayList, unit];
          }
        });
      }
    },
    setUnitBrowseFilter: (state, action) => {
      state.unitBrowseFilter = action.payload;
    },
    setUnitBrowseLoading: (state, action) => {
      state.unitBrowseLoading = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setViewOnly: (state, action) => {
      state.viewOnly = action.payload;
    },
    setDelayDispatchReason: (state, action) => {
      state.delayDispatchReason = action.payload;
    },
    setDelayArrayIndex: (state, action) => {
      state.delayArrayIndex = action.payload;
    },
    setHoldArrayIndex: (state, action) => {
      state.holdArrayIndex = action.payload;
    },
    setOeUnitIndex: (state, action) => {
      state.oeUnitIndex = action.payload;
    },
    setDispatchDelayIndex: (state, action) => {
      state.dispatchDelayIndex = action.payload;
    },
    setDispatchID: (state, action) => {
      state.dispatchID = action.payload;
    },
    /**
     * List is updated based on key element and index
     * 5 List are used for save
     * 1. activationArrayList - to save normal activation record (including adsView, adsDispatch, delayDispatch and underDelay)
     * 2. holdArrayList - to save activation record with hold
     * 3. postArrayList - to save activation record with posting
     * 4. shuttleDelayArrayList - to save activation record with shuttledelay
     * 5. dispatcheDelayArrayList - to save activation record with dispatchdelay
     **/
    updateUnitBrowseList: (state, action) => {
      const { key, index, value, element, type } = action.payload;

      let arrayElement = state.unitBrowseList[index];

      // Normal Activation ArrayList index
      let activationArrayUpdateIndex = state.activationArrayList.findIndex(
        (element) => element?.unitPK === arrayElement?.unitPK && element?.company === arrayElement?.company
      );
      // Hold ArrayList index
      let holdArrayUpdateIndex = state.holdArrayList.findIndex(
        (element) => element?.unitPK === arrayElement?.unitPK && element?.company === arrayElement?.company
      );
      // Post ArrayList index
      let postArrayUpdateIndex = state.postArrayList.findIndex(
        (element) => element?.unitPK === arrayElement?.unitPK && element?.company === arrayElement?.company
      );
      // Shuttle Delay ArrayList index
      let shuttleDelayArrayUpdateIndex = state.shuttleDelayArrayList.findIndex(
        (element) => element?.unitPK === arrayElement?.unitPK && element?.company === arrayElement?.company
      );
      // Dispatch Delay ArrayList index
      let dispatchDelayArrayUpdateIndex = state.dispatchDelayArrayList.findIndex(
        (element) => element?.unitPK === arrayElement?.unitPK && element?.company === arrayElement?.company
      );

      // If Active is changed
      if (key === "active") {
        arrayElement.active = value;
        if (arrayElement.activeDispatch) {
          arrayElement.activeDispatch = false;
          arrayElement.postedTo = false;
          // Remove from postArrayList if already there
          if (postArrayUpdateIndex !== -1) {
            state.postArrayList.splice(postArrayUpdateIndex, 1);
          }
        } else {
          arrayElement.activeDispatch = true;
        }
      }
      // If Pay is changed
      if (key === "pay") {
        arrayElement.bonusPoolRate = value;
      }
      // If Priority is changed
      if (key === "priority") {
        arrayElement.priority = value;
      }
      // If Post is changed
      if (key === "post") {
        if (arrayElement.postedTo) {
          arrayElement.postedTo = false;
          // Remove from postArrayList if already there
          if (postArrayUpdateIndex !== -1) {
            state.postArrayList.splice(postArrayUpdateIndex, 1);
          }
        } else {
          arrayElement.postedTo = true;
          // Remove from activationArrayList if already there
          if (activationArrayUpdateIndex !== -1) {
            state.activationArrayList.splice(activationArrayUpdateIndex, 1);
          }
        }
      }
      // If ADS View is changed
      if (key === "adsView") {
        if (arrayElement.driverViewOnly) {
          arrayElement.driverViewOnly = false;
        } else {
          arrayElement.driverViewOnly = true;
          arrayElement.driverDispatch = false;
        }
      }
      // If ADS Dispatch is changed
      if (key === "adsDispatch") {
        if (arrayElement.driverDispatch) {
          arrayElement.driverDispatch = false;
        } else {
          arrayElement.driverDispatch = true;
          arrayElement.driverViewOnly = false;
        }
      }
      // If Hold is changed
      if (key === "hold") {
        if (arrayElement.unitOnHold) {
          arrayElement.unitOnHold = false;
          // If the element exists in holdArrayList, remove it
          if (holdArrayUpdateIndex !== -1) {
            state.holdArrayList.splice(holdArrayUpdateIndex, 1);
          }
        } else {
          arrayElement.unitOnHold = true;
          arrayElement.delayDispatch = false;
          arrayElement.unitOnShuttleDelay = false;
          arrayElement.underDelay = false;
          // Remove from activationArrayList if already there
          if (activationArrayUpdateIndex !== -1) {
            state.activationArrayList.splice(activationArrayUpdateIndex, 1);
          }
        }
      }
      // If A.Delay is changed
      if (key === "activationDelay") {
        if (arrayElement.delayDispatch) {
          arrayElement.delayDispatch = false;
          arrayElement.delayDispatchReason = "";
        } else {
          arrayElement.delayDispatch = true;
          arrayElement.delayDispatchReason =
            arrayElement.previousDelayDispatchReason || arrayElement.delayDispatchReason;
          arrayElement.unitOnShuttleDelay = false;
          arrayElement.underDelay = false;
          arrayElement.unitOnHold = false;
        }
      }
      // If S.Delay is changed
      if (key === "shuttleDelay") {
        if (arrayElement.unitOnShuttleDelay) {
          arrayElement.unitOnShuttleDelay = false;
          // If the element exists in shuttleDelayArrayList, remove it
          if (shuttleDelayArrayUpdateIndex !== -1) {
            state.shuttleDelayArrayList.splice(shuttleDelayArrayUpdateIndex, 1);
          }
        } else {
          arrayElement.unitOnShuttleDelay = true;
          arrayElement.delayDispatch = false;
          arrayElement.underDelay = false;
          arrayElement.unitOnHold = false;
          // Remove from activationArrayList if already there
          if (activationArrayUpdateIndex !== -1) {
            state.activationArrayList.splice(activationArrayUpdateIndex, 1);
          }
        }
      }
      // If D.Delay is changed
      if (key === "dispatchDelay") {
        if (arrayElement.underDelay) {
          arrayElement.underDelay = false;
          // If the element exists in dispatchDelayArrayList, remove it
          if (dispatchDelayArrayUpdateIndex !== -1) {
            state.dispatchDelayArrayList.splice(dispatchDelayArrayUpdateIndex, 1);
          }
        } else {
          arrayElement.underDelay = true;
          arrayElement.unitOnShuttleDelay = false;
          arrayElement.delayDispatch = false;
          arrayElement.unitOnHold = false;
        }
      }
      // If A.Delay reason is changed
      if (key === "delayDispatchReason") {
        arrayElement.delayDispatchReason = value;
      }
      // If GVWR is changed
      if (key === "gvwr") {
        arrayElement.gvwr = value;
      }
      // If Shipping Weight is changed
      if (key === "shippingWeight") {
        arrayElement.shippingWeight = value;
      }

      /** If there is any change from backend values in any of the key fields add it to the activationArrayList.
       *  If the user is editing the element which is already present in the activationArrayList, update it.
       **/
      if (
        arrayElement !== undefined &&
        (arrayElement.activeDispatch !== arrayElement.alreadyActivated ||
          Number(arrayElement.bonusPoolRate) !== Number(arrayElement.previousBonusPoolRate) ||
          Number(arrayElement.gvwr) !== Number(arrayElement.previousGvwr) ||
          Number(arrayElement.shippingWeight) !== Number(arrayElement.previousShippingWeight) ||
          Number(arrayElement.priority) !== Number(arrayElement.previousPriority) ||
          arrayElement.driverViewOnly !== arrayElement.alreadyDriverViewOnly ||
          arrayElement.driverDispatch !== arrayElement.alreadyDriverDispatch ||
          arrayElement.unitOnHold !== arrayElement.alreadyOnHold ||
          arrayElement.delayDispatch !== arrayElement.alreadyDelayed ||
          arrayElement.unitOnShuttleDelay !== arrayElement.alreadyShuttleDelayed ||
          arrayElement.underDelay !== arrayElement.alreadyDispatchDelayed ||
          arrayElement.delayDispatchReason !== arrayElement.previousDelayDispatchReason ||
          arrayElement.postedTo !== arrayElement.alreadyPosted)
      ) {
        if (arrayElement.unitOnHold && arrayElement.unitOnHold !== arrayElement.alreadyOnHold) {
          if (holdArrayUpdateIndex !== -1) {
            // update hold array
            state.holdArrayList[holdArrayUpdateIndex] = arrayElement;
          } else {
            // add new elements
            state.holdArrayList = [...state.holdArrayList, arrayElement];
          }
        } else if (
          arrayElement.unitOnShuttleDelay &&
          arrayElement.unitOnShuttleDelay !== arrayElement.alreadyShuttleDelayed
        ) {
          if (shuttleDelayArrayUpdateIndex !== -1) {
            // update shuttle delay array
            state.shuttleDelayArrayList[shuttleDelayArrayUpdateIndex] = arrayElement;
          } else {
            // add new elements
            state.shuttleDelayArrayList = [...state.shuttleDelayArrayList, arrayElement];
          }
        } else if (
          arrayElement.underDelay &&
          arrayElement.underDelay !== arrayElement.alreadyDispatchDelayed
        ) {
          if (dispatchDelayArrayUpdateIndex !== -1) {
            // update dispatch delay array
            state.dispatchDelayArrayList[dispatchDelayArrayUpdateIndex] = arrayElement;
          } else {
            // add new elements
            state.dispatchDelayArrayList = [...state.dispatchDelayArrayList, arrayElement];
          }
        } else if (arrayElement.postedTo) {
          if (postArrayUpdateIndex !== -1) {
            // update post array
            state.postArrayList[postArrayUpdateIndex] = arrayElement;
          } else {
            // add new elements
            state.postArrayList = [...state.postArrayList, arrayElement];
          }
        } else if (
          !arrayElement.unitOnHold &&
          !arrayElement.unitOnShuttleDelay &&
          !arrayElement.postedTo &&
          arrayElement.unitOnShuttleDelay === arrayElement.alreadyShuttleDelayed &&
          // ADD IF NEEDED FOR DISPATCH DELAY
          // arrayElement.underDelay === arrayElement.alreadyDispatchDelayed &&
          arrayElement.unitOnHold === arrayElement.alreadyOnHold
        ) {
          if (activationArrayUpdateIndex !== -1) {
            // update activation array
            state.activationArrayList[activationArrayUpdateIndex] = arrayElement;
          } else {
            // add new elements
            state.activationArrayList = [...state.activationArrayList, arrayElement];
          }
        }
      }

      // If element is in original state from backend, remove from activationArrayList
      if (
        arrayElement !== undefined &&
        arrayElement.activeDispatch === arrayElement.alreadyActivated &&
        Number(arrayElement.bonusPoolRate) === Number(arrayElement.previousBonusPoolRate) &&
        Number(arrayElement.gvwr) === Number(arrayElement.previousGvwr) &&
        Number(arrayElement.shippingWeight) === Number(arrayElement.previousShippingWeight) &&
        Number(arrayElement.priority) === Number(arrayElement.previousPriority) &&
        arrayElement.driverViewOnly === arrayElement.alreadyDriverViewOnly &&
        arrayElement.driverDispatch === arrayElement.alreadyDriverDispatch &&
        arrayElement.delayDispatch === arrayElement.alreadyDelayed &&
        arrayElement.underDelay === arrayElement.alreadyDispatchDelayed &&
        arrayElement.unitOnShuttleDelay === arrayElement.alreadyShuttleDelayed &&
        arrayElement.unitOnHold === arrayElement.alreadyOnHold &&
        arrayElement.delayDispatchReason === arrayElement.previousDelayDispatchReason &&
        arrayElement.postedTo === arrayElement.alreadyPosted
      ) {
        // If the element exists in shuttleDelayArrayList, remove it
        if (activationArrayUpdateIndex !== -1) {
          state.activationArrayList.splice(activationArrayUpdateIndex, 1);
        }
      }

      // Copy the moodified data to original list
      if (arrayElement !== undefined) {
        state.unitBrowseList[index] = arrayElement;
      }
    },
    persistMultiPageSelection: (state, action) => {
      const { index, element } = action.payload;

      let arrayElement = state.unitBrowseList[index];

      /**
       * Used for Pagination. Remember changed data while pagination is used.
       * **/
      if (arrayElement !== undefined) {
        arrayElement.activeDispatch = element.activeDispatch;
        arrayElement.bonusPoolRate = element.bonusPoolRate;
        arrayElement.priority = element.priority;
        arrayElement.driverViewOnly = element.driverViewOnly;
        arrayElement.driverDispatch = element.driverDispatch;
        arrayElement.unitOnHold = element.unitOnHold;
        arrayElement.delayDispatch = element.delayDispatch;
        arrayElement.unitOnShuttleDelay = element.unitOnShuttleDelay;
        arrayElement.underDelay = element.underDelay;
        arrayElement.delayDispatchReason = element.delayDispatchReason;
        arrayElement.postedTo = element.postedTo;
      }
      // Copy the modified data to original list
      if (arrayElement !== undefined) {
        state.unitBrowseList[index] = arrayElement;
      }
    },
    setSaveUnitBrowseList: (state, { payload }) => {
      state.saveUnitBrowseList = [...state.saveUnitBrowseList, ...payload];
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setCurrentCompanyData: (state, action) => {
      state.currentCompanyData = action.payload;
    },
    resetSaveList: (state, action) => {
      const { key } = action.payload;

      if (key === "activation") {
        state.activationArrayList = [];
      }
      if (key === "post") {
        state.postArrayList = [];
        state.changedPostArrayList = [];
      }
      if (key === "shuttleDelay") {
        state.shuttleDelayArrayList = [];
      }
      if (key === "dispatchDelay") {
        state.dispatchDelayArrayList = [];
      }
      if (key === "hold") {
        state.holdArrayList = [];
      }
      if (key === "all") {
        state.activationArrayList = [];
        state.holdArrayList = [];
        state.postArrayList = [];
        state.shuttleDelayArrayList = [];
        state.changedPostArrayList = [];
        state.dispatchDelayArrayList = [];
        state.pageNumber = 0;
      }
    },
    setUnitIndex: (state, action) => {
      state.unitIndex = action.payload;
    },
    setDelayDispatch: (state, action) => {
      state.delayDispatch = action.payload;
    },
    updateHoldArrayList: (state, action) => {
      const { key, index, reason, authorizedBy, notes } = action.payload;
      let arrayElement = state.holdArrayList[index];
      // If save is clicked
      if (key === "save") {
        arrayElement.reason = reason;
        arrayElement.authorizedBy = authorizedBy;
        arrayElement.notes = notes;
      }
      // If No Hold is clicked
      if (key === "noHold") {
        arrayElement.reason = "";
        arrayElement.authorizedBy = "";
        arrayElement.notes = "";
        arrayElement.unitOnHold = false;
      }
      // Copy the modified data to original list
      if (arrayElement !== undefined) {
        state.holdArrayList[index] = arrayElement;
      }
    },

    updateShuttleDelayArrayList: (state, action) => {
      const {
        key,
        index,
        reason,
        authorizedBy,
        reportingDriverFK,
        reportingUserFK,
        reportedBy,
        delayDate,
        notes,
      } = action.payload;
      let arrayElement = state.shuttleDelayArrayList[index];
      // If save is clicked
      if (key === "save") {
        arrayElement.reason = reason;
        arrayElement.authorizedBy = authorizedBy;
        arrayElement.reportingDriverFK = reportingDriverFK;
        arrayElement.reportingUserFK = reportingUserFK;
        arrayElement.reportedBy = reportedBy;
        arrayElement.delayDate = delayDate;
        arrayElement.notes = notes;
      }
      // If No Delay is clicked
      if (key === "noDelay") {
        arrayElement.reason = "";
        arrayElement.authorizedBy = "";
        arrayElement.reportingDriverFK = null;
        arrayElement.reportingUserFK = null;
        arrayElement.reportedBy = "";
        arrayElement.delayDate = "";
        arrayElement.notes = "";
        arrayElement.unitOnShuttleDelay = false;
      }
      // Copy the modified data to original list
      if (arrayElement !== undefined) {
        state.shuttleDelayArrayList[index] = arrayElement;
      }
    },
    updatePostArrayList: (state, action) => {
      const { key, id, index, value, companyPK } = action.payload;
      const [unitPK, companyName] = id?.split("-");
      const indexToUpdate = state.postArrayList.findIndex(
        (element) => Number(element.unitPK) === Number(unitPK) && element.company === companyName
      );
      const changedArrayIndex = state.changedPostArrayList.findIndex(
        (element) => Number(element.unitPK) === Number(unitPK) && element.company === companyName
      );
      let arrayElement = state.postArrayList[indexToUpdate];

      const isArraysEqual = (arr1, arr2) => {
        return arr1?.length === arr2?.length && arr1?.every((value, index) => arr2?.includes(value));
      };
      // If key is hardPost
      if (key === "hardPost" && arrayElement !== undefined) {
        arrayElement.sisterCompanyPKList = [];
        if (arrayElement.hardPost) {
          arrayElement.hardPost = false;
        } else {
          arrayElement.hardPost = true;
          arrayElement.softPost = false;
        }
      }
      // If key is softPost
      if (key === "softPost" && arrayElement !== undefined) {
        arrayElement.sisterCompanyPKList = [];
        if (arrayElement.softPost) {
          arrayElement.softPost = false;
        } else {
          arrayElement.softPost = true;
          arrayElement.hardPost = false;
        }
      }
      // If key is company
      if (key === "company" && arrayElement !== undefined) {
        if (arrayElement.hardPost) {
          if (value) {
            arrayElement.sisterCompanyPKList = [companyPK];
          } else {
            arrayElement.sisterCompanyPKList = [];
          }
        }

        if (arrayElement.softPost) {
          if (value) {
            if (!arrayElement.sisterCompanyPKList?.includes(companyPK)) {
              arrayElement.sisterCompanyPKList = [...arrayElement.sisterCompanyPKList, companyPK];
            }
          } else {
            arrayElement.sisterCompanyPKList = arrayElement.sisterCompanyPKList.filter(
              (id) => id !== companyPK
            );
          }
        }
      }
      if (
        arrayElement !== undefined &&
        (arrayElement.hardPost !== arrayElement.alreadyHardPosted ||
          arrayElement.softPost !== arrayElement.alreadySoftPosted ||
          !isArraysEqual(arrayElement.sisterCompanyPKList, arrayElement.previousSisterCompanyPKList))
      ) {
        if (changedArrayIndex !== -1) {
          // update activation array
          state.changedPostArrayList[changedArrayIndex] = arrayElement;
        } else {
          // add new elements
          state.changedPostArrayList = [...state.changedPostArrayList, arrayElement];
        }
      }

      if (
        arrayElement !== undefined &&
        arrayElement.hardPost === arrayElement.alreadyHardPosted &&
        arrayElement.softPost === arrayElement.alreadySoftPosted &&
        isArraysEqual(arrayElement.sisterCompanyPKList, arrayElement.previousSisterCompanyPKList)
      ) {
        if (indexToUpdate !== -1) {
          state.changedPostArrayList.splice(changedArrayIndex, 1);
        }
      }

      // Copy the modified data to original list
      if (arrayElement !== undefined) {
        state.postArrayList[indexToUpdate] = arrayElement;
      }
    },
    setChangedPostArrayList: (state, { payload }) => {
      state.changedPostArrayList = [...state.changedPostArrayList, ...payload];
    },
    setNewDelayNavigation: (state, { payload }) => {
      state.newDelayNavigation = payload;
    },
    setRadioSelection: (state, action) => {
      state.radioSelection = action.payload;
    },
    setEnforceScalePlateWeights: (state, action) => {
      state.enforceScalePlateWeights = action.payload;
    },
  },
});

export const {
  setBrowseType,
  setPageNumber,
  setUnitId,
  setUnitNumber,
  setSelectedUnit,
  setSaveData,
  setSaveDisable,
  setInProgress,
  setCompanyName,
  setCompanyFK,
  setCurrentCompanyName,
  toggleCancelChanges,
  setCurrentCompanyFetch,
  setUnitShuttleDelayData,
  setUnitSelected,
  setReason,
  setAuthorizedBy,
  setReportingDriverId,
  setReportingDriverName,
  setReportingUserId,
  setReportingUserName,
  setReportedBy,
  setDateReported,
  setNotes,
  setDelay,
  setActive,
  setActiveDispatch,
  setUnitNumberLastFive,
  setIsInnerLookupsOpen,
  setShowUnitActivationDelay,
  setShowUnitActivationSoftPost,
  setPostToSister,
  setSelectedCompanies,
  setUnitBrowseFilter,
  setUnitBrowseList,
  setUnitBrowseLoading,
  setChangeColor,
  setViewOnly,
  setDelayDispatchReason,
  setDelayArrayIndex,
  setHoldArrayIndex,
  setOeUnitIndex,
  setDispatchDelayIndex,
  setDispatchID,
  setTotalPages,
  setTotalElements,
  updateUnitBrowseList,
  persistMultiPageSelection,
  setSaveUnitBrowseList,
  setLoader,
  setCurrentCompanyData,
  resetSaveList,
  setUnitIndex,
  setDelayDispatch,
  updateHoldArrayList,
  updateShuttleDelayArrayList,
  updatePostArrayList,
  setChangedPostArrayList,
  setNewDelayNavigation,
  setRadioSelection,
  setEnforceScalePlateWeights,
} = UnitActivationSlice.actions;
export default UnitActivationSlice.reducer;
