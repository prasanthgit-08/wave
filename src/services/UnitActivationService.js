import { axios } from "../config/axiosInterceptors";
import {
  AutoCompleteDropdown_No_Of_Records,
  BackEnd_Base_URL,
  DriverLookup_RecordsPerPage,
  No_Of_Record_per_page,
  UndispatchedListingReport_Base_URL,
  UnitActivation_Base_URL,
  UnitActivation_CrossDB_URL,
  UnitSelectionLookup_RecordsPerPage,
  YardInventoryReport_Base_URL,
} from "./constants/applicationConstants";

class UnitActivationService {
  /**
   * Used for Special code autocomplete.
   */
  fetchSpecialCodes(pageNumber, searchCriteria, type, searchTerm, companyName) {
    return axios.post(UnitActivation_CrossDB_URL + "/getspecialcodes", {
      pageNumber,
      size: AutoCompleteDropdown_No_Of_Records,
      searchCriteria,
      searchTerm,
      type,
      companyName,
    });
  }

  getAllSpecialCodesForLookup(pageNumber, searchCriteria, searchTerms, sortValue, sortFlag) {
    return axios.post(UnitActivation_CrossDB_URL + "/getspecialcodes", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: searchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      isOEPP: "Lookup",
      type: "Lookup",
    });
  }

  getUndispatchedSpecialCodesForLookup(
    pageNumber,
    searchCriteria,
    searchTerms,
    sortValue,
    sortFlag,
    size,
    type
  ) {
    return axios.post(UndispatchedListingReport_Base_URL + "specialCodeLookup", {
      pageNumber: pageNumber,
      pageSize: size,
      searchCriteria: searchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type: type,
    });
  }

  getyardInventorySpecialCodesForLookup({
    pageNumberSpecialCodeLookup = 0,
    selectedSearchCriteria = "Beginning",
    searchTerms,
    sortValue = "",
    sortFlag = false,
    pageSize,
    resultType,
  }) {
    return axios.post(YardInventoryReport_Base_URL + "lookup", {
      type: "SPECIALCODE",
      pageNumber: pageNumberSpecialCodeLookup,
      pageSize,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      resultType: resultType,
    });
  }

  /**
   * Used for Driver selection autocomplete.
   */
  getAllDrivers(pageNumber, searchCriteria, type, searchDriver, companyName) {
    return axios.post(UnitActivation_CrossDB_URL + "/getalldrivers", {
      number: pageNumber,
      size: AutoCompleteDropdown_No_Of_Records,
      active: 1,
      searchCriteria,
      searchTerm: searchDriver,
      type,
      unitActivation: 1,
      companyName: companyName,
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
    advancedSearchByInputs,
    companyName
  ) {
    return axios.post(UnitActivation_CrossDB_URL + "/getalldrivers", {
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
      unitActivation: 1,
      companyName: companyName,
    });
  }

  getAllSisterCompanies() {
    return axios.get(UnitActivation_Base_URL + "/getallsistercompany");
  }

  saveSingleUnitActivation(saveData) {
    return axios.post(UnitActivation_CrossDB_URL + "/savesingleunitactivation/", saveData);
  }
  saveUnitActivation(saveData) {
    return axios.post(UnitActivation_Base_URL + "/saveunitactivation", {
      ...saveData,
      SessionID: saveData?.SessionID || null,
    });
  }
  /**
   * Used for User selection Autocomplete.
   */
  getReportingUsers(pageNumber, searchCriteria, searchTerms, companyName) {
    return axios.post(UnitActivation_CrossDB_URL + "/getreportingusers", {
      pageNumber,
      size: AutoCompleteDropdown_No_Of_Records,
      searchCriteria,
      searchTerms,
      active: 1,
      type: "Autocomplete",
      companyName: companyName,
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
    companyName
  ) {
    return axios.post(UnitActivation_CrossDB_URL + "/getreportingusers", {
      active: 1,
      pageNumber: pageNumber,
      size: 15,
      users: users,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      companyName: companyName,
    });
  }

  /**
   * Used for Unit selection Autocomplete.
   */
  getAllUnitNumbers(searchUnit, unitLast5, pageNumber, size, companyName) {
    return axios.post(UnitActivation_CrossDB_URL + "/getAllUnitNumbers", {
      pageNumber: pageNumber,
      pageSize: size,
      searchCriteria: "Beginning",
      searchTerm: searchUnit,
      unitNumberLast5: unitLast5,
      type: "Autocomplete",
      unitActivation: 1,
      companyName: companyName,
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
    dealerId,
    companyName
  ) {
    return axios.post(UnitActivation_CrossDB_URL + "/getAllUnitNumbers", {
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
      companyName: companyName,
      unitActivation: 1,
    });
  }

  /**
   * Fetch Unit Details by Id
   */
  fetchUnitDetailsById(unit, companyName) {
    return axios.post(UnitActivation_CrossDB_URL + "/fetchunitdetailsbyid/", {
      unit: unit,
      companyName: companyName,
    });
  }
  /**
   *  Fetch all active companies
   */
  getAllCompanyNames() {
    return axios.get(UnitActivation_Base_URL + "/getAllCompanyNames");
  }
  /**
   * Fetch Current Company Name
   **/
  getCurrentCompanyName() {
    return axios.get(UnitActivation_Base_URL + "/getCurrentCompanyName");
  }

  getUnitsShuttleDelayById(unitPK) {
    return axios.get(UnitActivation_Base_URL + "/getUnitsShuttleDelayById/" + unitPK);
  }

  /**
   * Fetch all the customers from Customers.
   * Used for autocomplete
   */
  getCustomerDetails(searchTerms) {
    return axios.post(UnitActivation_Base_URL + "/getAllCustomers", {
      active: true,
      searchCriteria: "Beginning",
      number: 0,
      size: No_Of_Record_per_page,
      searchTerms,
      selectedCustomerStatus: "Complete",
      type: "Autocomplete",
    });
  }

  /**
   * Fetch all the active plants for the selected Customer if any.
   * Otherwise fetch all the active plants.
   * Used for plants autocomplete
   */
  fetchPlantdetails(customerId, isDPUCustomer, searchPlant) {
    return axios.post(UnitActivation_Base_URL + "/fetchPlantdetails", {
      active: 1,
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchPlant,
      selectedCustomerPlantStatus: "Complete",
      customerFK: customerId,
      isOEPP: "Autocomplete",
      isDPUCustomer: isDPUCustomer,
    });
  }

  /**
   * Fetch all the active yards.
   * Used for yards autocomplete.
   */
  fetchYardDetails(searchYard) {
    return axios.post(UnitActivation_Base_URL + "/fetchYardDetails/", {
      active: 1,
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchYard,
      type: "Autocomplete",
    });
  }
  /**
   * Fetch all Unit Type Groups.
   * Used for Unit Type Groups autocomplete.
   */
  fetchAllUnitTypeGroups(searchUnitTypeGroup) {
    return axios.post(UnitActivation_Base_URL + "/fetchAllUnitTypeGroups", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchUnitTypeGroup,
      type: "Autocomplete",
    });
  }

  /**
   * Used for Unit selection Autocomplete.
   */
  getUnitBrowseList(
    pageNumber,
    size,
    sortBy,
    active,
    adsView,
    adsActive,
    reload,
    outbound,
    motorized,
    towable,
    haulAndTow,
    flatbed,
    popup,
    truckCamper,
    customerId,
    plantId,
    yardId,
    unitTypeGroupId,
    lengthFrom,
    lengthTo,
    orderDate,
    canadaOnly,
    pickupState,
    deliveryState
  ) {
    return axios.post(UnitActivation_CrossDB_URL + "/getUnitBrowseList", {
      pageNumber: pageNumber,
      pageSize: size,
      sortBy: sortBy,
      active: active,
      adsView: adsView,
      adsActive: adsActive,
      reload: reload,
      outbound: outbound,
      motorized: motorized,
      haulAndTow: haulAndTow,
      flatbed: flatbed,
      popup: popup,
      truckCamper: truckCamper,
      towable: towable,
      customerFK: customerId,
      plantFK: plantId,
      yardFK: yardId,
      unitTypeGroupFK: unitTypeGroupId,
      lengthFrom: lengthFrom,
      lengthTo: lengthTo,
      orderDateFilter: orderDate,
      canadaOnly: canadaOnly,
      pickupState: pickupState,
      deliveryState: deliveryState,
    });
  }

  /**
   * Save Multi Browse Unit Activation
   */
  saveMultiBrowseActivation(saveArrayList) {
    return axios.post(UnitActivation_CrossDB_URL + "/saveMultiBrowseActivation", {
      activationVOArray: saveArrayList,
    });
  }

  getAllStateCodes() {
    return axios.post(UnitActivation_Base_URL + "/getAllStates/");
  }

  getUnitsForActivation(payload) {
    try {
      return axios.post(UnitActivation_Base_URL + "/getUnitsForActivation", {
        ...payload,
        showDelay: payload?.showDelay || false,
      });
    } catch (error) {
      console.error("Error fetching units for activation:", error);
    }
  }

  lockReleaseUnitActivation({
    sessionId,
    processName = null,
    channel = "WEB",
    lockType = "ProcessLock",
    eventName = "Release",
    releaseFlag = "N",
    notRequiredLock = 0,
    driverPK = null,
    fieldName = null,
    tableName = null,
    reason = null,
    recordKey = 0,
    userId = null,
  }) {
    try {
      const userData = localStorage.getItem("loggedInUserData");
      const user = JSON.parse(userData);
      return axios.post(`${BackEnd_Base_URL}commonLock/acquireReleaseLock`, {
        sessionId,
        processName,
        channel,
        lockType,
        eventName,
        releaseFlag,
        notRequiredLock,
        driverPK,
        fieldName,
        tableName,
        reason,
        recordKey,
        userId: userId || user?.userPK,
      });
    } catch (error) {
      console.error("Error fetching units for activation:", error);
    }
  }

  /**
   * Used for Unit selection Autocomplete.
   */
  getUnitByPk(searchUnit, unitLast5, pageNumber, size, companyName, unitId) {
    return axios.post(UnitActivation_CrossDB_URL + "/getUnitByPk", {
      pageNumber: pageNumber,
      pageSize: size,
      searchCriteria: "Beginning",
      searchTerm: searchUnit,
      unitNumberLast5: unitLast5,
      type: "Autocomplete",
      unitActivation: 1,
      companyName: companyName,
      unitPK: unitId,
      isDelayStatus: true,
    });
  }
}
export default new UnitActivationService();
