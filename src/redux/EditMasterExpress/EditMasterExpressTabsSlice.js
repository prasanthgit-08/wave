import { createSlice } from "@reduxjs/toolkit";

const EditMasterExpressTabsSlice = createSlice({
  name: "editMasterExpressTabs",
  initialState: {
    //Save Button
    enableSave: false,
    editedUnitDataToSaveForUnitTab: "",
    editedUnitDataToSaveForSettingsTab: "",
    editedUnitDataToSaveForCustomerTab: "",
    editedUnitDataToSaveForMiscCustomerTab: "",
    editedUnitDataToSaveForMiscPickupTab: "",
    editedUnitDataToSaveForMiscDeliveryTab: "",
    editedUnitDataToSaveForOverWidthTab: "",
    editedUnitDataToSaveForInfoTab: "",
    editedUnitDataToSaveForRerouteTab: "",
    editedUnitDispatchDataToSaveForDispatchesTab: "",
    // Tabs currently disabled on the edit page ({ [tabKey]: true }); their data is left out of the save payload
    disabledTabs: {},
    /*********************/
    //Unit Tab
    unitNumberUniquenessCheckMsg: "",
    unitTypeFKReduxValue: null,
    gvwrReduxValue: "",
    specialCodeFKReduxValue: null,
    flagChanged: null,
    isUnitTypeOverWidth: false,
    isUnitTabValid: false,
    isUnitTabTabColumn1Valid: false,
    isUnitTabTabColumn2Valid: true,
    isUnitTabTabColumn3Valid: false,
    /*********************/
    //Settings Tabs
    unitTypeELDRequired: false,
    unitTypeLength: 0,
    isUnitReload: false,
    unitOverWidthLoadRequired: false,
    isSettingsTabValid: false,
    isSettingsTabColumn3Valid: false,
    isSettingsTabColumn4Valid: false,
    dispatchReleaseDateSettingsTab: "",
    deliverByDateSettingsTab: "",
    minimumPickupDateSettingsTab: "",
    maximumPickupDateSettingsTab: "",
    minimumDeliveryDateSettingsTab: "",
    maximumDeliveryDateSettingsTab: "",

    /*********************/
    //Customer Tab
    isCustomerTabValid: false,
    isCustomerTabColumn1TabValidation: false,
    isCustomerTabColumn2TabValidation: false,
    /*********************/
    //Misc Customer
    isMiscCustomerTabValid: false,
    /*********************/
    //Misc Pickup Dealer
    isMiscPickupTabValid: false,
    //Misc Delivery Dealer
    miscDeliveryDealerCity: "",
    miscDeliveryDealerStateCode: "",
    miscDeliveryDealerPostalCode: "",
    miscDeliveryDealerOnCancel: false,
    miscDeliveryDealerPostalCodeOnChange: false,
    isMiscDeliveryTabValid: false,
    //Over width Tab
    isOverWidthTabValid: false,
    overWidthLoad: false,
    unitOverWidthData: null,
    overWidthFormData: null,
    //Contacts Tab
    descriptionSearch: "",
    bolContactNameSearch: "",
    contactId: "",
    loader: true,
    seletedCustomerContactsList: null,
    availableContacts: [],
    assignedContacts: [],
    allContactsSelectedId: "",
    assignedContactsSelectedId: "",
    contactEditMode: false,
    selectedContact: null,
    selectedIndex: "",
    frontendRecord: false,
    disableNew: false,
    disableDelete: false,
    disableEdit: false,
    disableSave: false,
    contactDescription: "",
    bolContactName: "",
    bolContactPhone: "",
    contactEmail: "",
    bolFaxNumber: "",
    isManuallyAddedRecord: false,
    isContactTabValid: false,
    //Info Tab
    isInfoTabValid: false,
    isInfoNotesTabValid: false,
    isInfoHoldsTabValid: false,
    isInfoDelaysTabValid: false,
    isInfoDelaysTabActivationDelayValid: false,
    isInfoDelaysTabShuttleDelayValid: false,

    unitOnActivationDelay: false,
    unitOnShuttleDelay: false,

    infoCancelledFlag: false,
    infoOnInvoiceHoldFlag: false,
    infoOnUnitHold: false,

    // DriveBy's Tab
    unitRoutesListing: [],
    isDriveBysTabValid: true,

    //Reroute Tab
    isRerouteTabValid: false,

    //Dispatches Tab
    isDispatchTabValid: false,
    isDispatchGeneralTabValid: false,
    isDatesTabValid: false,
    isDatesTabColumn1Valid: false,
    isDatesTabColumn2Valid: false,
    // Dispatch Tab - Dates Sub Tab
    pickedUpReduxValue: false,
    pickUpDateReduxValue: "",
    pickUpYardExitReduxValue: false,
    deliveredReduxValue: false,
    deliveryYardEntranceReduxValue: false,

    //Open Balances Tab
    cancelledEdit: false,
    //Shuttle Button
    showEditMasterExpressShuttle: false,
    shuttleSaveData: null,
    shuttleSaveFlag: true,
    bolData: null,
    printerDescription: "",
    unitData: [],
    showDamageShuttle: false,
    showBreakdownShuttle: false,
  },
  reducers: {
    //Save Button & its implementation
    setEnableSave: (state, action) => {
      state.enableSave = action.payload;
    },
    setEditedUnitDataToSaveForUnitTab: (state, action) => {
      let payload = action.payload;
      state.editedUnitDataToSaveForUnitTab = { ...state.editedUnitDataToSaveForUnitTab, ...payload };
    },
    setEditedUnitDataToSaveForSettingsTab: (state, action) => {
      let payload = action.payload;
      state.editedUnitDataToSaveForSettingsTab = { ...state.editedUnitDataToSaveForSettingsTab, ...payload };
    },
    setEditedUnitDataToSaveForCustomerTab: (state, action) => {
      let payload = action.payload;
      state.editedUnitDataToSaveForCustomerTab = { ...state.editedUnitDataToSaveForCustomerTab, ...payload };
    },
    setEditedUnitDataToSaveForMiscCustomerTab: (state, action) => {
      state.editedUnitDataToSaveForMiscCustomerTab = action.payload;
    },
    setEditedUnitDataToSaveForMiscPickupTab: (state, action) => {
      state.editedUnitDataToSaveForMiscPickupTab = action.payload;
    },
    setEditedUnitDataToSaveForMiscDeliveryTab: (state, action) => {
      let payload = action.payload;
      state.editedUnitDataToSaveForMiscDeliveryTab = {
        ...state.editedUnitDataToSaveForMiscDeliveryTab,
        ...payload,
      };
    },
    setEditedUnitDataToSaveForOverWidthTab: (state, action) => {
      state.editedUnitDataToSaveForOverWidthTab = action.payload;
    },
    setEditedUnitDataToSaveForInfoTab: (state, action) => {
      let payload = action.payload;
      state.editedUnitDataToSaveForInfoTab = {
        ...state.editedUnitDataToSaveForInfoTab,
        ...payload,
      };
    },
    setEditedUnitDataToSaveForRerouteTab: (state, action) => {
      state.editedUnitDataToSaveForRerouteTab = action.payload;
    },
    setEditedUnitDispatchDataToSaveForDispatchesTab: (state, action) => {
      let payload = action.payload;
      state.editedUnitDispatchDataToSaveForDispatchesTab = {
        ...state.editedUnitDispatchDataToSaveForDispatchesTab,
        ...payload,
      };
    },
    /*********************/
    //Unit Tab
    setUnitNumberUniquenessCheckMsg: (state, action) => {
      state.unitNumberUniquenessCheckMsg = action.payload;
    },
    setUnitTypeFKReduxValue: (state, action) => {
      state.unitTypeFKReduxValue = action.payload;
    },
    setGvwrReduxValue: (state, action) => {
      state.gvwrReduxValue = action.payload;
    },
    setSpecialCodeFKReduxValue: (state, action) => {
      state.specialCodeFKReduxValue = action.payload;
    },
    setFlagChanged: (state, action) => {
      state.flagChanged = action.payload;
    },
    setDisabledTabs: (state, action) => {
      state.disabledTabs = action.payload;
    },
    setIsUnitTypeOverWidth: (state, action) => {
      state.isUnitTypeOverWidth = action.payload;
    },
    setIsUnitTabValid: (state, action) => {
      state.isUnitTabValid = action.payload;
    },
    setIsUnitTabTabColumn1Valid: (state, action) => {
      state.isUnitTabTabColumn1Valid = action.payload;
    },
    setIsUnitTabTabColumn2Valid: (state, action) => {
      state.isUnitTabTabColumn2Valid = action.payload;
    },
    setIsUnitTabTabColumn3Valid: (state, action) => {
      state.isUnitTabTabColumn3Valid = action.payload;
    },
    /*********************/
    //Settings Tab
    setUnitTypeELDRequired: (state, action) => {
      state.unitTypeELDRequired = action.payload;
    },
    setUnitTypeLength: (state, action) => {
      state.unitTypeLength = action.payload;
    },
    setIsUnitReload: (state, action) => {
      state.isUnitReload = action.payload;
    },
    setUnitOverWidthLoadRequired: (state, action) => {
      state.unitOverWidthLoadRequired = action.payload;
    },
    setIsSettingsTabValid: (state, action) => {
      state.isSettingsTabValid = action.payload;
    },
    setIsSettingsTabColumn3Valid: (state, action) => {
      state.isSettingsTabColumn3Valid = action.payload;
    },
    setIsSettingsTabColumn4Valid: (state, action) => {
      state.isSettingsTabColumn4Valid = action.payload;
    },
    setDispatchReleaseDateSettingsTab: (state, action) => {
      state.dispatchReleaseDateSettingsTab = action.payload;
    },
    setDeliverByDateSettingsTab: (state, action) => {
      state.deliverByDateSettingsTab = action.payload;
    },
    setMinimumPickupDateSettingsTab: (state, action) => {
      state.minimumPickupDateSettingsTab = action.payload;
    },
    setMaximumPickupDateSettingsTab: (state, action) => {
      state.maximumPickupDateSettingsTab = action.payload;
    },
    setMinimumDeliveryDateSettingsTab: (state, action) => {
      state.minimumDeliveryDateSettingsTab = action.payload;
    },
    setMaximumDeliveryDateSettingsTab: (state, action) => {
      state.maximumDeliveryDateSettingsTab = action.payload;
    },
    /*********************/
    //Customer Tab
    setIsCustomerTabValid: (state, action) => {
      state.isCustomerTabValid = action.payload;
    },
    setIsCustomerTabColumn1TabValidation: (state, action) => {
      state.isCustomerTabColumn1TabValidation = action.payload;
    },
    setIsCustomerTabColumn2TabValidation: (state, action) => {
      state.isCustomerTabColumn2TabValidation = action.payload;
    },
    /*********************/
    //Misc Customer
    setIsMiscCustomerTabValid: (state, action) => {
      state.isMiscCustomerTabValid = action.payload;
    },
    /*********************/
    //Misc Pickup dealer
    setIsMiscPickupTabValid: (state, action) => {
      state.isMiscPickupTabValid = action.payload;
    },
    /*********************/
    //Misc Delivery Dealer
    setIsMiscDeliveryTabValid: (state, action) => {
      state.isMiscDeliveryTabValid = action.payload;
    },
    /*********************/
    //Over width Tab
    setIsOverWidthTabValid: (state, action) => {
      state.isOverWidthTabValid = action.payload;
    },
    setOverWidthLoad: (state, action) => {
      state.overWidthLoad = action.payload;
    },
    setUnitOverWidthData: (state, action) => {
      let payload = action.payload;
      state.unitOverWidthData = {
        ...state.unitOverWidthData,
        ...payload,
      };
    },
    setOverWidthFormData: (state, action) => {
      state.overWidthFormData = action.payload;
    },
    /*********************/
    //Contacts Tab
    setDescriptionSearch: (state, action) => {
      state.descriptionSearch = action.payload;
    },
    setBolContactNameSearch: (state, action) => {
      state.bolContactNameSearch = action.payload;
    },
    setContactId: (state, action) => {
      state.contactId = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setSeletedCustomerContactsList: (state, action) => {
      state.seletedCustomerContactsList = action.payload;
    },
    setAvailableContacts: (state, action) => {
      state.availableContacts = action.payload;
    },
    setAssignedContacts: (state, action) => {
      state.assignedContacts = action.payload;
    },
    setAllContactsSelectedId: (state, action) => {
      state.allContactsSelectedId = action.payload;
    },
    setAssignedContactsSelectedId: (state, action) => {
      state.assignedContactsSelectedId = action.payload;
    },
    setContactEditMode: (state, action) => {
      state.contactEditMode = action.payload;
    },
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    setselectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
    setFrontendRecord: (state, action) => {
      state.frontendRecord = action.payload;
    },
    setDisableNew: (state, action) => {
      state.disableNew = action.payload;
    },
    setDisableDelete: (state, action) => {
      state.disableDelete = action.payload;
    },
    setDisableEdit: (state, action) => {
      state.disableEdit = action.payload;
    },
    setDisableSave: (state, action) => {
      state.disableSave = action.payload;
    },
    setContactDescription: (state, action) => {
      state.contactDescription = action.payload;
    },
    setBolContactName: (state, action) => {
      state.bolContactName = action.payload;
    },
    setBolContactPhone: (state, action) => {
      state.bolContactPhone = action.payload;
    },
    setContactEmail: (state, action) => {
      state.contactEmail = action.payload;
    },
    setBolFaxNumber: (state, action) => {
      state.bolFaxNumber = action.payload;
    },
    setIsManuallyAddedRecord: (state, action) => {
      state.isManuallyAddedRecord = action.payload;
    },
    addToAssigned: (state, { payload }) => {
      state.assignedContacts = [payload, ...state.assignedContacts];
    },
    addToAvailabe: (state, { payload }) => {
      state.availableContacts = [payload, ...state.availableContacts];
    },
    filterAvailableContacts: (state, { payload }) => {
      state.availableContacts = state.availableContacts.filter((contact) => contact.tempId !== payload);
    },
    filterAssignedContacts: (state, { payload }) => {
      state.assignedContacts = state.assignedContacts.filter((contact) => contact.tempId !== payload);
    },
    updateAssignedContactsElement: (state, { payload }) => {
      let arrayElement = state.assignedContacts[payload.selectedIndex];

      arrayElement.contact = payload.contact;
      arrayElement.name = payload.name;
      arrayElement.phone = payload.phone;
      arrayElement.email = payload.email;
      arrayElement.bolFaxNumber = payload.bolFaxNumber;
      arrayElement.fax = payload.fax;

      state.assignedContacts[payload.selectedIndex] = arrayElement;
    },
    updateUseOnBOL: (state, { payload }) => {
      let arrayElement = state.assignedContacts[payload];

      const masterContactSelected = state.assignedContacts?.some((contact) => contact.useOnBOL === true);

      if (masterContactSelected) {
        if (state.assignedContacts[payload].useOnBOL) {
          arrayElement.useOnBOL = false;
        }
      } else {
        if (state.assignedContacts[payload].useOnBOL) {
          arrayElement.useOnBOL = false;
        } else {
          arrayElement.useOnBOL = true;
        }
      }

      state.assignedContacts[payload] = arrayElement;
    },
    updateDelayContact: (state, { payload }) => {
      let arrayElement = state.assignedContacts[payload];

      arrayElement.delayContact = !state.assignedContacts[payload].delayContact;

      state.assignedContacts[payload] = arrayElement;
    },
    setIsContactTabValid: (state, action) => {
      state.isContactTabValid = action.payload;
    },
    //Info Tab
    setIsInfoTabValid: (state, action) => {
      state.isInfoTabValid = action.payload;
    },
    setIsInfoNotesTabValid: (state, action) => {
      state.isInfoNotesTabValid = action.payload;
    },
    setIsInfoHoldsTabValid: (state, action) => {
      state.isInfoHoldsTabValid = action.payload;
    },
    setIsInfoDelaysTabValid: (state, action) => {
      state.isInfoDelaysTabValid = action.payload;
    },
    setIsInfoDelaysTabActivationDelayValid: (state, action) => {
      state.isInfoDelaysTabActivationDelayValid = action.payload;
    },
    setIsInfoDelaysTabShuttleDelayValid: (state, action) => {
      state.isInfoDelaysTabShuttleDelayValid = action.payload;
    },

    setUnitOnActivationDelay: (state, action) => {
      state.unitOnActivationDelay = action.payload;
    },
    setUnitOnShuttleDelay: (state, action) => {
      state.unitOnShuttleDelay = action.payload;
    },
    setInfoCancelledFlag: (state, action) => {
      state.infoCancelledFlag = action.payload;
    },
    setInfoOnInvoiceHoldFlag: (state, action) => {
      state.infoOnInvoiceHoldFlag = action.payload;
    },
    setInfoOnUnitHold: (state, action) => {
      state.infoOnUnitHold = action.payload;
    },

    // DriveBy's Tab
    setUnitRoutesListing: (state, action) => {
      const { actionType, payload } = action.payload;

      const unitRoutesLength = state.unitRoutesListing?.length;
      const isCanadianPickup = state.unitRoutesListing?.[0]?.isCanadian || false;
      const isCanadianDelivery = state.unitRoutesListing?.[unitRoutesLength - 1]?.isCanadian || false;

      const poeRecordIndex = state.unitRoutesListing?.findIndex((item) => item?.poeFK);

      if (actionType === "set") {
        state.unitRoutesListing = payload;
      }

      if (actionType === "add") {
        const elementToAdd = { ...payload, frontEndPK: unitRoutesLength + 1 };
        // CASE I : US -> US or Canada -> Canada
        // TODO
        // if pickup & delivery is same ie us or canada,
        // we have to add the new item in the last index & push down the last element
        if (
          ((!isCanadianPickup && !isCanadianDelivery) || (isCanadianPickup && isCanadianDelivery)) &&
          poeRecordIndex === -1
        ) {
          state.unitRoutesListing?.splice(unitRoutesLength - 1, 0, elementToAdd);
        }

        // CASE II : US -> Canada
        if (!isCanadianPickup && isCanadianDelivery && poeRecordIndex !== -1) {
          // TODO: if US record, add above POE record
          // if Canadian record, add above last record
          if (!payload?.isCanadian) {
            state.unitRoutesListing?.splice(poeRecordIndex, 0, elementToAdd);
          } else {
            state.unitRoutesListing?.splice(unitRoutesLength - 1, 0, elementToAdd);
          }
        }

        // CASE III : Canada -> US
        if (isCanadianPickup && !isCanadianDelivery && poeRecordIndex !== -1) {
          // TODO: if US record, add above last record
          // if Canadian record, add above POE record
          if (!payload?.isCanadian) {
            state.unitRoutesListing?.splice(unitRoutesLength - 1, 0, {
              ...payload,
              frontEndPK: unitRoutesLength + 1,
            });
          } else {
            state.unitRoutesListing?.splice(poeRecordIndex, 0, {
              ...payload,
              frontEndPK: unitRoutesLength + 1,
            });
          }
        }
      }

      // Updating new authorizedBy for all records
      if (actionType === "updateAuthorizedBy") {
        state.unitRoutesListing = state.unitRoutesListing?.map((item) => ({
          ...item,
          driveBysAuthorizedBy: payload,
          authorizedBy: payload,
        }));
      }

      if (actionType === "edit") {
        // state.unitRoutesListing[payload?.index] = payload?.formData;
        state.unitRoutesListing[payload?.index] = {
          ...state.unitRoutesListing[payload?.index],
          ...payload?.formData,
        };
      }

      if (actionType === "moveUp") {
        const elementToSwap = state.unitRoutesListing[payload - 1];
        state.unitRoutesListing[payload - 1] = state.unitRoutesListing[payload];
        state.unitRoutesListing[payload] = elementToSwap;
      }

      if (actionType === "moveDown") {
        const elementToSwap = state.unitRoutesListing[payload + 1];
        state.unitRoutesListing[payload + 1] = state.unitRoutesListing[payload];
        state.unitRoutesListing[payload] = elementToSwap;
      }

      if (actionType === "delete") {
        const selectedDriveBy = state.unitRoutesListing[payload];

        state.unitRoutesListing = state.unitRoutesListing?.filter(
          (item) => item?.frontEndPK !== selectedDriveBy?.frontEndPK
        );
      }

      if (actionType === "recall") {
        state.unitRoutesListing[payload] = {
          ...state.unitRoutesListing[payload],
          driveBysCancelled: false,
          driveBysCanceledReason: "",
        };
      }

      if (actionType === "clear") {
        state.unitRoutesListing = [];
      }
    },

    setIsDriveBysTabValid: (state, action) => {
      state.isDriveBysTabValid = action.payload;
    },

    //Reroute Tab
    setIsRerouteTabValid: (state, action) => {
      state.isRerouteTabValid = action.payload;
    },

    //Dispatches Tab
    setIsDispatchTabValid: (state, action) => {
      state.isDispatchTabValid = action.payload;
    },
    setIsDispatchGeneralTabValid: (state, action) => {
      state.isDispatchGeneralTabValid = action.payload;
    },
    setIsDatesTabValid: (state, action) => {
      state.isDatesTabValid = action.payload;
    },
    setIsDatesTabColumn1Valid: (state, action) => {
      state.isDatesTabColumn1Valid = action.payload;
    },
    setIsDatesTabColumn2Valid: (state, action) => {
      state.isDatesTabColumn2Valid = action.payload;
    },

    //Dispatches Tab  - Dates Sub Tab
    setPickedUpReduxValue: (state, action) => {
      state.pickedUpReduxValue = action.payload;
    },
    setPickUpDateReduxValue: (state, action) => {
      state.pickUpDateReduxValue = action.payload;
    },
    setPickUpYardExitReduxValue: (state, action) => {
      state.pickUpYardExitReduxValue = action.payload;
    },
    setDeliveredReduxValue: (state, action) => {
      state.deliveredReduxValue = action.payload;
    },
    setDeliveryYardEntranceReduxValue: (state, action) => {
      state.deliveryYardEntranceReduxValue = action.payload;
    },

    //Shuttle Button
    setShowEditMasterExpressShuttle: (state, action) => {
      state.showEditMasterExpressShuttle = action.payload;
    },
    setShuttleSaveData: (state, action) => {
      state.shuttleSaveData = action.payload;
    },
    setShuttleSaveFlag: (state, action) => {
      state.shuttleSaveFlag = action.payload;
    },
    setBolData: (state, action) => {
      state.bolData = action.payload;
    },
    setPrinterDescription: (state, action) => {
      state.printerDescription = action.payload;
    },
    setUnitData: (state, action) => {
      state.unitData = action.payload;
    },
    setShowDamageShuttle: (state, action) => {
      state.showDamageShuttle = action.payload;
    },
    setShowBreakdownShuttle: (state, action) => {
      state.showBreakdownShuttle = action.payload;
    },

    resetSelectedUnitData: (state, action) => {
      state.unitNumberUniquenessCheckMsg = "";
      state.assignedContactsSelectedId = "";
      state.allContactsSelectedId = "";
      state.descriptionSearch = "";
      state.bolContactNameSearch = "";
      state.contactDescription = "";
      state.bolContactName = "";
      state.bolContactPhone = "";
      state.contactEmail = "";
      state.bolFaxNumber = "";
      state.contactEditMode = false;
      state.disableNew = false;
      state.isManuallyAddedRecord = false;
      state.selectedContact = null;
    },

    // Open Balances Tab

    setCancelledEdit: (state, action) => {
      state.cancelledEdit = !state.cancelledEdit;
    },
  },
});

export const {
  //Save Button
  /*********************/
  setEnableSave,
  setEditedUnitDataToSaveForUnitTab,
  setEditedUnitDataToSaveForSettingsTab,
  setEditedUnitDataToSaveForCustomerTab,
  setEditedUnitDataToSaveForMiscCustomerTab,
  setEditedUnitDataToSaveForMiscPickupTab,
  setEditedUnitDataToSaveForMiscDeliveryTab,
  setEditedUnitDataToSaveForOverWidthTab,
  setEditedUnitDataToSaveForInfoTab,
  setEditedUnitDataToSaveForRerouteTab,
  setEditedUnitDispatchDataToSaveForDispatchesTab,
  //Reset Data
  resetSelectedUnitData,
  //Unit Tab
  setUnitNumberUniquenessCheckMsg,
  setUnitTypeFKReduxValue,
  setGvwrReduxValue,
  setSpecialCodeFKReduxValue,
  setFlagChanged,
  setDisabledTabs,
  setIsUnitTypeOverWidth,
  setIsUnitTabValid,
  setIsUnitTabTabColumn1Valid,
  setIsUnitTabTabColumn2Valid,
  setIsUnitTabTabColumn3Valid,
  /*********************/
  //Settings Tabs
  setUnitTypeELDRequired,
  setUnitTypeLength,
  setIsUnitReload,
  setUnitOverWidthLoadRequired,
  setIsSettingsTabValid,
  setIsSettingsTabColumn3Valid,
  setIsSettingsTabColumn4Valid,
  setDispatchReleaseDateSettingsTab,
  setDeliverByDateSettingsTab,
  setMinimumPickupDateSettingsTab,
  setMaximumPickupDateSettingsTab,
  setMinimumDeliveryDateSettingsTab,
  setMaximumDeliveryDateSettingsTab,

  /*********************/
  //Customer Tab
  setIsCustomerTabValid,
  setIsCustomerTabColumn1TabValidation,
  setIsCustomerTabColumn2TabValidation,
  /*********************/
  //Misc Customer
  setIsMiscCustomerTabValid,
  /*********************/
  //Misc Pickup Dealer
  setIsMiscPickupTabValid,
  //Misc Delivery Dealer
  setIsMiscDeliveryTabValid,
  /*********************/
  //Over width Tab
  setIsOverWidthTabValid,
  setOverWidthLoad,
  setUnitOverWidthData,
  setOverWidthFormData,
  /*********************/
  //Contacts Tab
  setDescriptionSearch,
  setBolContactNameSearch,
  setContactId,
  setLoader,
  setSeletedCustomerContactsList,
  setAvailableContacts,
  setAssignedContacts,
  setAllContactsSelectedId,
  setAssignedContactsSelectedId,
  setContactEditMode,
  setSelectedContact,
  setselectedIndex,
  setFrontendRecord,
  setDisableNew,
  setDisableDelete,
  setDisableEdit,
  setDisableSave,
  setContactDescription,
  setBolContactName,
  setBolContactPhone,
  setContactEmail,
  setBolFaxNumber,
  setIsManuallyAddedRecord,
  addToAssigned,
  addToAvailabe,
  filterAvailableContacts,
  filterAssignedContacts,
  updateAssignedContactsElement,
  updateUseOnBOL,
  updateDelayContact,
  setIsContactTabValid,
  //Info Tab
  setIsInfoTabValid,
  setIsInfoNotesTabValid,
  setIsInfoHoldsTabValid,
  setIsInfoDelaysTabValid,
  setIsInfoDelaysTabActivationDelayValid,
  setIsInfoDelaysTabShuttleDelayValid,

  setUnitOnActivationDelay,
  setUnitOnShuttleDelay,

  setInfoCancelledFlag,
  setInfoOnInvoiceHoldFlag,
  setInfoOnUnitHold,

  // DriveBy's Tab
  setUnitRoutesListing,
  setIsDriveBysTabValid,

  //Reroute Tab
  setIsRerouteTabValid,
  //Dispatches Tab
  setIsDispatchTabValid,
  setIsDispatchGeneralTabValid,
  setIsDatesTabValid,
  setIsDatesTabColumn1Valid,
  setIsDatesTabColumn2Valid,
  //Dispatches Tab - Dates Sub Tab
  setPickedUpReduxValue,
  setPickUpDateReduxValue,
  setPickUpYardExitReduxValue,
  setDeliveredReduxValue,
  setDeliveryYardEntranceReduxValue,

  //Shuttle Button
  setShowEditMasterExpressShuttle,
  setShuttleSaveData,
  setShuttleSaveFlag,
  setBolData,
  setPrinterDescription,
  setUnitData,
  setShowDamageShuttle,
  setShowBreakdownShuttle,

  //Open Balances Tab
  setCancelledEdit,
} = EditMasterExpressTabsSlice.actions;

export default EditMasterExpressTabsSlice.reducer;
