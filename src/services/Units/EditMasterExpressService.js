import { axios } from "../../config/axiosInterceptors";
import {
  EditMasterUnitSelection_RecordsPerPage,
  Edit_Master_Express_Base_URL,
  Edit_Master_Express_Base_CrossDB_URL,
  YardToYardShuttle_Base_URL,
  Yard_Base_URL,
  Email_Processor_URL,
  Edit_Master_Base_URL,
} from "../../services/constants/applicationConstants";

class EditMasterExpressService {
  //Fetch Unit Numbers for Browse List
  getAllUnitNumbersForEditMasterExpressBrowseList(
    globalSearchTerm,
    unitLast5,
    pageNumber,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortValue,
    normalSortFlag,
    unitType,
    orderType,
    dateType,
    dateFrom,
    dateTo,
    unitStatus,
    pickupBy,
    deliveryBy,
    unitOrderStatus,
    unitDelayType,
    dispatchDelayType,
    advancedSearchString,
    advancedSearchByInputs,
    customerId,
    customerPlantId,
    dealerId,
    pageSize
  ) {
    return axios.post(Edit_Master_Express_Base_URL + "/getAllUnitNumbers", {
      unitSelection: true,
      searchTerm: globalSearchTerm,
      unitNumberLast5: unitLast5,
      pageNumber: pageNumber,
      pageSize: pageSize ? pageSize : EditMasterUnitSelection_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      units: advancedSearchPayload,
      advanceSortingOrder: advancedSortingOrder,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      unitTypeSearchCriteria: unitType,
      orderType: orderType,
      dateType: dateType,
      fromDate: dateFrom,
      toDate: dateTo,
      unitStatus: unitStatus,
      pickupBy: pickupBy,
      deliveryBy: deliveryBy,
      unitOrderStatus: unitOrderStatus,
      unitDelayType: unitDelayType,
      dispatchDelayType: dispatchDelayType,
      advancedSearchString: advancedSearchString,
      advancedSearchBy: advancedSearchByInputs,
      customerId: customerId,
      customerPlantsId: customerPlantId,
      dealerId: dealerId,
      editMasterExpress: 1,
    });
  }

  // Get Unit data by Id
  getUnitDataById(unitPK) {
    return axios.get(Edit_Master_Express_Base_URL + "/fetchUnitById/" + unitPK);
  }

  //Unit Number Uniqueness Check
  checkUnitNumberValid(unitNumber, selectedUnitCustomerFK, selectedUnitId) {
    return axios.post(Edit_Master_Express_Base_URL + "/checkUnitNumberValid", {
      unitNumber: unitNumber,
      customerFK: selectedUnitCustomerFK,
      selectedUnitId: selectedUnitId,
    });
  }

  fetchSpecialCodeByName(searchCode) {
    return axios.post(Edit_Master_Express_Base_URL + "/getSpecialCodedetails", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchCode,
      isOEPP: "Lookup",
    });
  }

  fetchUnitType(
    searchString,
    unitTypeMotorized,
    unitTypeTowable,
    allowMultiUnit,
    allowPopup,
    allowTruckCamper,
    unitTypeGroupFKsList
  ) {
    return axios.post(Edit_Master_Express_Base_URL + "/listAllUnitTypes", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchString,
      type: "Autocomplete",
      towable: unitTypeTowable,
      motorized: unitTypeMotorized,
      allowMultiUnit: allowMultiUnit,
      allowPopup: allowPopup,
      allowTruckCamper: allowTruckCamper,
      unitTypeGroupIds: unitTypeGroupFKsList,
    });
  }

  findAllUnitTypesLookUp(
    pageNumber,
    searchTerms,
    selectedSearchCriteria,
    sortValue,
    sortType,
    unitTypeMotorized,
    unitTypeTowable,
    allowMultiUnit,
    allowPopup,
    allowTruckCamper,
    unitTypeGroupIds
  ) {
    return axios.post(Edit_Master_Express_Base_URL + "/listAllUnitTypes", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortType,
      towable: unitTypeTowable,
      motorized: unitTypeMotorized,
      allowMultiUnit: allowMultiUnit,
      allowPopup: allowPopup,
      allowTruckCamper: allowTruckCamper,
      unitTypeGroupIds: unitTypeGroupIds,
    });
  }

  rateCalculation(payload) {
    try {
      return axios.post(Edit_Master_Base_URL + "/calculateRates", payload);
    } catch (error) {}
  }

  amountCalculation(invoiceTabData, editedUnitDataToSave) {
    return axios.post(
      Edit_Master_Express_Base_URL + "/calculateInvoiceAmount",
      invoiceTabData,
      editedUnitDataToSave
    );
  }

  amountCalculationForDriver(driverTabData, editedUnitDataToSave) {
    return axios.post(
      Edit_Master_Express_Base_URL + "/calculateDriverAmount",
      driverTabData,
      editedUnitDataToSave
    );
  }

  //Save edited unit data
  saveEditedUnitData(editedUnitDataToSave) {
    return axios.post(Edit_Master_Express_Base_URL + "/editedUnitDataToSave", editedUnitDataToSave);
  }

  //User Autocomplete
  getAllUserData(searchTerm) {
    return axios.post(Edit_Master_Express_Base_URL + "/fetchallusers", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: true,
    });
  }

  //Fetch driver name for autocomplete
  fetchDriverDetailsByName(searchDriver) {
    return axios.post(Edit_Master_Express_Base_URL + "/fetchDriverDetailsByName", {
      pageNumber: 0,
      size: 100,
      statusType: "Active",
      searchCriteria: "Beginning",
      searchTerm: searchDriver,
      shuttle: "Yard Checkin",
    });
  }

  //Shuttle Dispatch - Fetch Yards with printers
  fetchYardsWithPrinter(searchTerm, pageNumber, active, size, searchCriteria) {
    return axios.post(YardToYardShuttle_Base_URL + "/getYardsDetails/", {
      active,
      pageNumber,
      size,
      searchCriteria,
      searchTerm,
      isBolPrinter: true,
      hasPrinters: true,
    });
  }

  getYardsForLookup(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, active) {
    let status = null;
    if (active === "Active") {
      status = 1;
    } else if (active === "Inactive") {
      status = 0;
    }
    return axios.post(Yard_Base_URL + "/allyards", {
      isBolPrinter: true,
      hasPrinters: true,
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber: pageNumber,
      active: status,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  /**
   * Check whether Plant to Plant Combination exist or not
   */

  plantToPlantExistCheckForDispatchShuttle(
    pickupPlantId,
    deliveryPlantId,
    isTowableUnit,
    isMotorizedUnit,
    isCDLUnit
  ) {
    return axios.post(Edit_Master_Express_Base_URL + "/plantToPlantExistsForDispatchShuttleProcess", {
      pickupPlantFK: pickupPlantId,
      deliveryPlantFK: deliveryPlantId,
      towableUnit: isTowableUnit,
      motorizedUnit: isMotorizedUnit,
      cdlUnit: isCDLUnit,
    });
  }

  plantToYardExistCheckForShuttle(
    pickupPlantID,
    deliveryPlantID,
    pickupYardID,
    deliveryYardID,
    isTowableUnit,
    isMotorizedUnit,
    shuttleCityFK,
    isCDLUnit
  ) {
    return axios.post(Edit_Master_Express_Base_URL + "/plantToYardExistsForDispatchShuttleProcess", {
      pickupPlantFK: pickupPlantID,
      deliveryPlantFK: deliveryPlantID,
      towableUnit: isTowableUnit,
      motorizedUnit: isMotorizedUnit,
      pickupYardFK: pickupYardID,
      deliveryYardFK: deliveryYardID,
      shuttleCityFK: shuttleCityFK,
      cdlUnit: isCDLUnit,
    });
  }

  yardToPlantRoundTrip(
    deliveryPlantID,
    pickupYardID,
    isTowableUnit,
    isMotorizedUnit,
    shuttleCityFK,
    isCDLUnit
  ) {
    return axios.post(Edit_Master_Express_Base_URL + "/yardToPlantRoundTrip", {
      pickupYardFK: pickupYardID,
      deliveryPlantFK: deliveryPlantID,
      towableUnit: isTowableUnit,
      motorizedUnit: isMotorizedUnit,
      shuttleCityFK: shuttleCityFK,
      cdlUnit: isCDLUnit,
    });
  }

  newcreateShuttleREcord(saveData) {
    return axios.post(Edit_Master_Express_Base_URL, saveData);
  }

  createShuttleRecord = (saveData) => {
    return axios.post(`${Edit_Master_Express_Base_URL}/createShuttleRecord`, saveData);
  };

  getShuttleButtonStatus(unitPK) {
    return axios.get(Edit_Master_Express_Base_URL + "/shuttle-button-status/" + unitPK);
  }

  getUnitInformation(unitPK) {
    return axios.post(Edit_Master_Express_Base_URL + "/unit-value/" + unitPK);
  }

  getUnitInformation(unitPK) {
    return axios.post(Edit_Master_Express_Base_URL + "/unit-value/" + unitPK);
  }

  generateandprintBol = (saveData) => {
    return axios.post(`${Email_Processor_URL}/compose`, saveData);
  };
}

export default new EditMasterExpressService();
