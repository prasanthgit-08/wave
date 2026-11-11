import { axios } from "../../../config/axiosInterceptors";
import {
  Shuttle_Edit_Shuttle_Base_URL,
  UnitSelectionLookup_RecordsPerPage,
  DriverLookup_RecordsPerPage,
  Shuttle_Edit_Shuttle_CrossDB_URL,
} from "../../constants/applicationConstants";

class EditShuttleService {
  /**
   * Used for Driver selection autocomplete.
   */
  fetchDriverDetailsByName(searchDriver) {
    return axios.post(Shuttle_Edit_Shuttle_Base_URL + "/fetchDriverDetailsByName", {
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchDriver,
      type: "Autocomplete",
      active: 1,
      shuttle: "Edit Shuttle",
    });
  }

  /**
   * Used for Driver selection Lookup.
   */
  fetchDriversForLookup(
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
    return axios.post(Shuttle_Edit_Shuttle_Base_URL + "/fetchDriverDetailsByName", {
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
      type: "Lookup",
      active: 1,
      shuttle: "Edit Shuttle",
    });
  }
  /**
   * Used for Unit selection Listing.
   */
  getAllUnitNumbersForListing(
    searchUnit,
    unitLast5,
    pageNumber,
    size,
    driverData,
    startDate,
    endDate,
    companyName
  ) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/getAllUnitNumbersForListing", {
      pageNumber: pageNumber,
      pageSize: size,
      searchCriteria: "Beginning",
      searchTerm: searchUnit,
      unitNumberLast5: unitLast5,
      editShuttle: true,
      driverFK: driverData,
      startDate: startDate,
      endDate: endDate,
      shuttle: "Edit Shuttle",
      companyName: companyName,
    });
  }
  /**
   * Used for Unit selection Autocomplete and Listing.
   */
  getAllUnitNumbers(searchUnit, unitLast5, pageNumber, size, driverData, startDate, endDate, companyName) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/getAllUnitNumbers", {
      pageNumber: pageNumber,
      pageSize: size,
      searchCriteria: "Beginning",
      searchTerm: searchUnit,
      unitNumberLast5: unitLast5,
      type: "Autocomplete",
      editShuttle: true,
      driverFK: driverData,
      startDate: startDate,
      endDate: endDate,
      shuttle: "Edit Shuttle",
      companyName: companyName,
    });
  }

  /**
   * Fetch Unit Numbers for Lookup
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
    driverFK,
    companyName,
    fromDate,
    toDate
  ) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/getAllUnitNumbers", {
      unitSelection: true,
      type: "Lookup",
      shuttle: "Edit Shuttle",
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
      driverFK: driverFK,
      companyName: companyName,
      startDate: fromDate,
      endDate: toDate,
    });
  }

  /**
   *  Fetch Yard Details for Autocomplete
   */
  fetchYardByName(searchYard, companyName) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/fetchYardByName", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchYard,
      type: "Autocomplete",
      active: 1,
      companyName: companyName,
    });
  }

  /**
   *  Fetch Yard Details for Lookup
   */
  getYardsForLookup(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, companyName) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/fetchYardByName", {
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber: pageNumber,
      active: 1,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      companyName: companyName,
    });
  }

  /**
   * Fetch Shuttle City Details for Autocomplete
   */
  fetchCityDetailsByName(searchCity, companyName) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/getShuttleCitydetails/", {
      active: 1,
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchCity,
      companyName: companyName,
    });
  }

  /**
   * Fetch Shuttle City Details for Lookup
   */
  getShuttleCitysForLookup(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag, companyName) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/getShuttleCitydetails", {
      searchCriteria,
      searchTerm,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      companyName: companyName,
    });
  }

  /**
   * Fetch Plant Details for Autocomplete
   */
  fetchPlantDetailsByName(searchPlant, customerFK, isDPUCustomer, companyName) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/getPlantdetails/", {
      active: 1,
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchPlant,
      isOEPP: "Autocomplete",
      customerFK: customerFK,
      selectedCustomerPlantStatus: "Complete",
      isDPUCustomer: isDPUCustomer,
      companyName: companyName,
    });
  }

  /**
   * Fetch Plant Details for Lookup
   */
  fetchPlantDetailsForLookup(
    pageNumber,
    customerPlants,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedCustomerId,
    isDPUCustomer
  ) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/getPlantdetails/", {
      active: 1,
      pageNumber: pageNumber,
      size: 15,
      customerPlants: customerPlants,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortType: sortFlag,
      sortValue: sortValue,
      selectedCustomerPlantStatus: "Complete",
      customerFK: selectedCustomerId,
      isOEPP: "Lookup",
      isDPUCustomer: isDPUCustomer,
    });
  }
  /**
   * Check whether City to yard Combination exist or not
   */
  cityToYardExistCheckForShuttle(
    yardFK,
    shuttleCityFK,
    isSelectedUnitTowable,
    isSelectedUnitMotorized,
    companyName,
    shuttleType
  ) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/cityToYardExistCheckForShuttle", {
      yardfk: yardFK,
      shuttleCityfk: shuttleCityFK,
      towableUnit: isSelectedUnitTowable,
      motorizedUnit: isSelectedUnitMotorized,
      companyName: companyName,
      shuttleType: shuttleType,
    });
  }

  /**
   * Check whether Plant to Plant Combination exist or not
   */
  plantToPlantExistCheckForShuttle(
    pickupPlantId,
    deliveryPlantId,
    isTowableUnit,
    isMotorizedUnit,
    companyName
  ) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/plantToPlantExistCheckForShuttle", {
      customerPlant1IntFK: pickupPlantId,
      customerPlant2IntFK: deliveryPlantId,
      towableUnit: isTowableUnit,
      motorizedUnit: isMotorizedUnit,
      companyName: companyName,
    });
  }

  /**
   * Check whether Plant to Plant Combination exist or not
   */
  yardToYardExistCheckForShuttle(pickUpYardId, deliveryYardId, isTowableUnit, isMotorizedUnit, companyName) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/yardToYardExistCheckForShuttle", {
      pickUpYardfk: pickUpYardId,
      dropOffYardfk: deliveryYardId,
      towableUnit: isTowableUnit,
      motorizedUnit: isMotorizedUnit,
      companyName: companyName,
    });
  }

  /**
   *  Save UnitShuttle Data
   */
  saveUnitShuttlesData(unitShuttlesVO) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/saveUnitShuttlesData", unitShuttlesVO, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * get CustomerFK of Pickup Plant
   */
  getPlantCustomer(customerPlantsFK, companyName) {
    return axios.post(Shuttle_Edit_Shuttle_CrossDB_URL + "/getPlantCustomer", {
      pickupCustomerPlantId: customerPlantsFK,
      companyName: companyName,
    });
  }

  /**
   *  Fetch all active companies
   */
  getAllCompanyNames() {
    return axios.get(Shuttle_Edit_Shuttle_Base_URL + "/getAllCompanyNames");
  }
  /**
   * Fetch Current Company Name
   **/
  getCurrentCompanyName() {
    return axios.get(Shuttle_Edit_Shuttle_Base_URL + "/getCurrentCompanyName");
  }

  /**
   * Check whether Multiple Compnay exist or not
   */
  checkMultipleCompanyExists() {
    return axios.post(Shuttle_Edit_Shuttle_Base_URL + "/checkMultipleCompanyExists");
  }
}
export default new EditShuttleService();
