import { axios } from "../../../config/axiosInterceptors";
import {
  AutoCompleteDropdown_No_Of_Records,
  DriverLookup_RecordsPerPage,
  Shuttle_Edit_Yard_Unit_Base_URL,
  Shuttle_Edit_Yard_Unit_CrossDB_URL,
  UnitSelectionLookup_RecordsPerPage,
} from "../../constants/applicationConstants";

class EditYardUnitService {
  /**
   * Fetch Unit Numbers for Autocomplete
   */
  getAllUnitNumbers(unitLast5, searchUnit, pageNumber, size, type) {
    return axios.post(Shuttle_Edit_Yard_Unit_Base_URL + "/getAllUnitNumbers", {
      pageNumber: pageNumber,
      pageSize: size,
      searchCriteria: "Beginning",
      searchTerm: searchUnit,
      unitNumberLast5: unitLast5,
      type: type,
      shuttle: "Edit Yard Unit",
    });
  }
  /**
   * Used for Unit selection Lookup
   */
  getAllUnitNumbersForLookup(
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
    dealerId
  ) {
    return axios.post(Shuttle_Edit_Yard_Unit_Base_URL + "/getAllUnitNumbers", {
      unitSelection: true,
      type: "Lookup",
      searchTerm: globalSearchTerm,
      unitNumberLast5: unitLast5,
      pageNumber: pageNumber,
      pageSize: UnitSelectionLookup_RecordsPerPage,
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
      shuttle: "Edit Yard Unit",
    });
  }

  getUnitsById(unitPK) {
    return axios.get(Shuttle_Edit_Yard_Unit_Base_URL + "/getUnitsById/" + unitPK);
  }

  /**
   * Fetch Special Code Details for Autocomplete
   */
  fetchSpecialCodeByName(searchSpecialCode) {
    return axios.post(Shuttle_Edit_Yard_Unit_Base_URL + "/fetchSpecialCodeByName", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchSpecialCode,
      type: "Lookup",
    });
  }
  /**
   * Fetch Special Code by ID
   */
  getSpecialCodeById(id) {
    return axios.get(Shuttle_Edit_Yard_Unit_Base_URL + "/getSpecialCodeById/" + id);
  }

  /**
   *  Fetch Yard Details for Autocomplete
   */
  fetchYardByName(searchYard) {
    return axios.post(Shuttle_Edit_Yard_Unit_Base_URL + "/fetchYardByName", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchYard,
      type: "Autocomplete",
    });
  }
  /**
   *  Fetch Yard by ID
   */
  getYardById(id) {
    return axios.get(Shuttle_Edit_Yard_Unit_Base_URL + "/getYardById/" + id);
  }
  /**
   *  Fetch Unit on Hold Details if UnitONHold is set
   */
  fetchUnitOnHoldDetails(id) {
    return axios.get(Shuttle_Edit_Yard_Unit_Base_URL + "/fetchUnitOnHoldDetails/" + id);
  }
  /**
   *  Fetch Company details
   */
  getSisterCompanyNames(companyName) {
    return axios.get(Shuttle_Edit_Yard_Unit_Base_URL + "/getSisterCompanyNames/" + companyName);
  }

  saveEditYardUnit(saveData) {
    return axios.post(Shuttle_Edit_Yard_Unit_CrossDB_URL + "/saveEditYardUnit/", saveData);
  }

  checkUnitActivationStatus(unitFK) {
    return axios.get(Shuttle_Edit_Yard_Unit_Base_URL + "/checkUnitActivationStatus/" + unitFK);
  }

  checkDispatchStatus(unitFK) {
    return axios.get(Shuttle_Edit_Yard_Unit_Base_URL + "/checkDispatchStatus/" + unitFK);
  }

  checkEligibleForDelayOrHold(unitFK) {
    return axios.get(Shuttle_Edit_Yard_Unit_Base_URL + "/checkEligibleForDelayOrHold/" + unitFK);
  }

  isParsVisible(unitFK) {
    return axios.get(Shuttle_Edit_Yard_Unit_Base_URL + "/isParsVisible/" + unitFK);
  }
  /**
   * Used for User selection autocomplete.
   */
  getReportingUsers(pageNumber, searchCriteria, searchTerms) {
    return axios.post(Shuttle_Edit_Yard_Unit_Base_URL + "/getreportingusers", {
      pageNumber,
      size: AutoCompleteDropdown_No_Of_Records,
      searchCriteria,
      searchTerms,
      active: 1,
      type: "Autocomplete",
    });
  }

  /**
   * Used for User selection Lookup.
   */
  getAllUsersForLookup(
    userStatus,
    pageNumber,
    users,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedUserStatus,
    companyName,
    type,
    userType
  ) {
    return axios.post(Shuttle_Edit_Yard_Unit_Base_URL + "/getreportingusers", {
      active: 1,
      pageNumber: pageNumber,
      size: 15,
      users: users,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type,
      userType,
      companyName: companyName,
    });
  }

  /**
   * Used for Driver selection autocomplete.
   */
  getAllDrivers(pageNumber, searchCriteria, type, searchDriver) {
    return axios.post(Shuttle_Edit_Yard_Unit_Base_URL + "/getalldrivers", {
      number: pageNumber,
      size: AutoCompleteDropdown_No_Of_Records,
      active: 1,
      shuttle: "Edit Yard Unit",
      searchCriteria,
      searchTerm: searchDriver,
      type,
    });
  }

  /**
   * Used for Driver selection Lookup.
   */
  getAllDriversForLookup(
    searchTerm,
    statusType,
    driverType,
    cityType,
    pageNumber,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortValue,
    normalSortFlag,
    advancedSearchString,
    advancedSearchByInputs
  ) {
    return axios.post(Shuttle_Edit_Yard_Unit_Base_URL + "/getalldrivers", {
      searchTerm: searchTerm,
      statusType,
      driverType,
      cityType,
      number: pageNumber,
      size: DriverLookup_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      advancedSearchPayload: advancedSearchPayload,
      advancedSortingOrder: advancedSortingOrder,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      advancedSearchString: advancedSearchString,
      advancedSearchCheckboxPayload: advancedSearchByInputs,
      active: 1,
      shuttle: "Edit Yard Unit",
    });
  }

  getUnitsShuttleDelayById(unitPK) {
    return axios.get(Shuttle_Edit_Yard_Unit_Base_URL + "/getUnitsShuttleDelayById/" + unitPK);
  }

  fetchYardToPlantDetails(yardFK, customerPlant, motorized, roundTrip, cdlaRequird) {
    return axios.post(Shuttle_Edit_Yard_Unit_Base_URL + "/fetchYardToPlantDetails", {
      pickupYardFK: yardFK,
      deliveryCustomerPlantFK: customerPlant,
      motorized,
      roundTrip,
      cdlaRequird,
    });
  }

  fetchPickupCustomerPlant(unitFK) {
    return axios.get(Shuttle_Edit_Yard_Unit_Base_URL + "/fetchPickupCustomerPlant/" + unitFK);
  }

  getCurrentCompanyName() {
    return axios.get(Shuttle_Edit_Yard_Unit_Base_URL + "/fetchCurrentCompanyName");
  }
}
export default new EditYardUnitService();
