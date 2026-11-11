import { axios } from "../../../config/axiosInterceptors";
import {
  Shuttle_Yard_Checkin_Base_URL,
  UnitSelectionLookup_RecordsPerPage,
  FullScreenLookup_RecordsPerPage,
  AutoCompleteDropdown_No_Of_Records,
  HalfScreen_RecordsPerPage,
  Shuttle_Yard_Checkin_CrossDB_URL,
  Yard_SecondShuttle_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "../../../services/constants/applicationConstants";

class YardCheckinService {
  /*****Common *****/
  getCompanyByName() {
    return axios.get(Shuttle_Yard_Checkin_Base_URL + "/fetchCompanyByName");
  }

  /***** Driver Selection Screen *****/
  //Fetch driver name for autocomplete
  fetchDriverDetailsByName(searchDriver, companyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/fetchDriverDetailsByName", {
      pageNumber: 0,
      size: 100,
      statusType: "Active",
      searchCriteria: "Beginning",
      searchTerm: searchDriver,
      shuttle: "Yard Checkin",
      companyName: companyName,
    });
  }

  //Fetch driver name for lookup screen
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
    advancedSearchByInputs,
    companyName
  ) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/fetchDriverDetailsByName", {
      searchTerm: searchTerm,
      statusType,
      driverType,
      cityType,
      number: pageNumber,
      size: FullScreenLookup_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      advancedSearchPayload: advancedSearchPayload,
      advancedSortingOrder: advancedSortingOrder,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      advancedSearchString: advancedSearchString,
      advancedSearchCheckboxPayload: advancedSearchByInputs,
      type: "Lookup",
      shuttle: "Yard Checkin",
      companyName: companyName,
    });
  }

  // Selected driver's company details
  getDriverCompanyDetails(companyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/getDriverCompanyDetails", {
      companyName: companyName,
    });
  }

  /***** Unit Selection Screen *****/
  //Get unit numbers for auto complete
  getAllUnitNumbers(searchUnit, unitLast5, pageNumber, size, companyName, motorized, towable) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/getAllUnitNumbers", {
      pageNumber: pageNumber,
      pageSize: 5,
      searchCriteria: "Beginning",
      searchTerm: searchUnit,
      unitNumberLast5: unitLast5,
      type: "Autocomplete",
      shuttle: "Yard Checkin",
      companyName: companyName,
      motorized,
      towable,
    });
  }

  //Fetch Unit Numbers for Lookup
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
    unitCompanyName,
    motorized,
    towable
  ) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/getAllUnitNumbers", {
      unitSelection: true,
      type: "Lookup",
      shuttle: "Yard Checkin",
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
      companyName: unitCompanyName,
      motorized,
      towable,
    });
  }

  //Fetch Open Shuttle Record
  openShuttleRecordExistCheck(unitFK, selectedUnitCompanyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/openShuttleRecordExistCheck", {
      unitFKInt: unitFK,
      companyName: selectedUnitCompanyName,
    });
  }

  // Fetch Unit Shuttle by driver and unit
  getUnitShuttleByDriverAndUnit(selectedDriverFK, unitNumberPK, selectedUnitCompanyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/getUnitShuttleByDriverAndUnit", {
      driverId: selectedDriverFK,
      unitFKInt: unitNumberPK,
      companyName: selectedUnitCompanyName,
    });
  }

  checkEligibleForDelay(unitNumberPK, selectedUnitCompanyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/checkEligibleForDelay/", {
      unitFKInt: unitNumberPK,
      selectedUnitCompanyName: selectedUnitCompanyName,
    });
  }

  /*** Dispatch Shuttle - Additional Shuttle Screen ***/
  getDispatchShuttleForAdditonalShuttle(unitNumberPK, selectedUnitCompanyName) {
    return axios.get(
      `${Shuttle_Yard_Checkin_CrossDB_URL}/dispatchShuttleForAdditonalShuttle/${unitNumberPK}/${selectedUnitCompanyName}`
    );
  }

  /*** Get Shuttle City PK by City Name ***/
  getShuttleCityPK(cityName, selectedUnitCompanyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/getShuttleCityPK", {
      cityName: cityName,
      selectedUnitCompanyName: selectedUnitCompanyName,
    });
  }

  /****** Shuttle ******/
  /*** Plant To Yard Screen ***/
  //Fetch Cities by name
  getShuttleCityByName(cityName, selectedCompanyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/fetchShuttleCitybyName", {
      searchCriteria: "Beginning",
      searchTerm: cityName,
      pageNumber: 0,
      size: AutoCompleteDropdown_No_Of_Records,
      companyName: selectedCompanyName,
    });
  }

  //Fetch Cities for Lookup Screen
  getShuttleCitysForLookup(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag, selectedCompanyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/fetchShuttleCitybyName", {
      searchCriteria,
      searchTerm,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      companyName: selectedCompanyName,
    });
  }

  //get yard by name
  getShuttleYardByName(searchYard, selectedCompanyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/fetchYardByName", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchYard,
      type: "Autocomplete",
      active: 1,
      companyName: selectedCompanyName,
    });
  }

  //Fetch Yards for Lookup Screen
  getYardsForLookup(
    selectedSearchCriteria,
    searchTerm,
    pageNumber,
    sortValue,
    sortFlag,
    active,
    selectedCompanyName
  ) {
    let status = null;
    if (active === "Active") {
      status = 1;
    } else if (active === "Inactive") {
      status = 0;
    }
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/fetchYardByName", {
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber: pageNumber,
      active: status,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      companyName: selectedCompanyName,
    });
  }

  //City to Yard combination check
  cityToYardCombinationCheckForShuttle(
    shuttleCityFK,
    yardFK,
    isSelectedUnitTowable,
    isSelectedUnitMotorized,
    selectedUnitCompanyName,
    dryrun
  ) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/YardAndCityExistsForShuttleProcess", {
      yardfk: yardFK,
      shuttleCityfk: shuttleCityFK,
      towableUnit: isSelectedUnitTowable,
      motorizedUnit: isSelectedUnitMotorized,
      companyName: selectedUnitCompanyName,
      isDryRun: dryrun || false,
    });
  }

  // Check Unit Activation Status
  checkUnitActivationStatus(unitFK) {
    return axios.get(Shuttle_Yard_Checkin_Base_URL + "/checkUnitActivationStatus/" + unitFK);
  }

  /*** Yard To Plant Screen ***/
  // Fetch All Customer Plants
  getAllPlantsByName(searchPlant, selectedCompanyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/getAllPlants", {
      active: 1,
      number: 0,
      size: AutoCompleteDropdown_No_Of_Records,
      searchCriteria: "Beginning",
      searchTerms: searchPlant,
      selectedCustomerPlantStatus: "Complete",
      type: "Autocomplete",
      companyName: selectedCompanyName,
    });
  }

  // Fetch All Customer Plants For Lookup
  getAllPlantsByCustomerForLookup(
    selectedCustomerPlantStatus,
    active,
    selectedSearchCriteria,
    plant,
    pageNumber,
    searchTerms,
    customerId,
    customerPlantFKS,
    sortValue,
    sortFlag,
    selectedCompanyName
  ) {
    let plantStatus = null;
    if (active === "Active") {
      plantStatus = 1;
    } else if (active === "Inactive") {
      plantStatus = 0;
    }

    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/getAllPlants", {
      selectedCustomerPlantStatus: selectedCustomerPlantStatus,
      active: plantStatus,
      searchCriteria: selectedSearchCriteria,
      customerPlants: plant,
      number: pageNumber,
      size: HalfScreen_RecordsPerPage,
      searchTerms: searchTerms,
      customerId: customerId,
      customerPlantFKS: customerPlantFKS,
      sortValue: sortValue,
      sortType: sortFlag,
      companyName: selectedCompanyName,
    });
  }

  /*** Yard To Yard Screen ***/
  //Yard to Yard combination check
  yardToYardCombinationCheckForShuttle(
    pickUpYardfk,
    deliveryYardfk,
    isSelectedUnitTowable,
    isSelectedUnitMotorized,
    selectedUnitCompanyName
  ) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/yardToYardExistsForShuttleProcess", {
      pickUpYardfk: pickUpYardfk,
      dropOffYardfk: deliveryYardfk,
      towableUnit: isSelectedUnitTowable,
      motorizedUnit: isSelectedUnitMotorized,
      companyName: selectedUnitCompanyName,
    });
  }

  /*** Plant To Plant Screen ***/
  //Fetch all the plants for the selected Customer.
  //Used for Pickup plants autocomplete with OEPP String as Autocomplete
  fetchPickupPlantdetailsByName(customerId, isDPUCustomer, searchPlant, selectedCompanyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/fetchCustomerPlantsLookupDetails", {
      active: 1,
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchPlant,
      selectedCustomerPlantStatus: "Complete",
      customerFK: customerId,
      isOEPP: "Autocomplete",
      isDPUCustomer: isDPUCustomer,
      companyName: selectedCompanyName,
    });
  }

  getCustomerById(customerId, selectedCompanyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/getCustomerDetailsbyId", {
      customerPK: customerId,
      companyName: selectedCompanyName,
    });
  }

  //Plant To Plant combination check
  plantToPlantCombinationCheckForShuttle(
    pickupPlantIDForPlantToPlant,
    deliveryPlantIDForPlantToPlant,
    isSelectedUnitTowable,
    isSelectedUnitMotorized,
    selectedUnitCompanyName
  ) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/plantToPlantExistsForShuttleProcess", {
      customerPlant1IntFK: pickupPlantIDForPlantToPlant,
      customerPlant2IntFK: deliveryPlantIDForPlantToPlant,
      towableUnit: isSelectedUnitTowable,
      motorizedUnit: isSelectedUnitMotorized,
      companyName: selectedUnitCompanyName,
    });
  }

  /*** Dealer Shuttle Screen ***/
  //Dealer Shuttle
  getDealerShuttleList() {
    return axios.post(Shuttle_Yard_Checkin_Base_URL + "/dealerShuttleList");
  }

  /***** Order Not Enter Screen *****/
  getCustomerDetailsForAutocomplete(searchCustomer, companyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/getAllCustomers", {
      searchTerms: searchCustomer,
      pageNumber: 0,
      size: 100,
      isDPUCustomer: true,
      usePlants: true,
      active: 1,
      selectedCustomerStatus: "Complete",
      searchCriteria: "Beginning",
      type: "Autocomplete",
      shuttle: true,
      companyName: companyName,
    });
  }

  /**Customer Lookup - shuttle process.Fetch all the customers from Customers.*/
  getAllCustomerDetails(
    pageNumber,
    customers,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    companyName
  ) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/getAllCustomers", {
      active: 1,
      number: pageNumber,
      size: 15,
      customers: customers,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedCustomerStatus: "Complete",
      creditHold: false,
      type: "Lookup",
      shuttle: true,
      isDPUCustomer: true,
      usePlants: true,
      companyName: companyName,
    });
  }

  //Fetch all the plants for the selected Customer for Autocomplete
  fetchBillingPlantdetailsByName(customerId, isDPUCustomer, searchPlant, companyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/fetchCustomerPlantsLookupDetails", {
      active: 1,
      pageNumber: 0,
      size: 1000,
      searchCriteria: "Beginning",
      searchTerms: searchPlant,
      selectedCustomerPlantStatus: "Complete",
      customerFK: customerId,
      isOEPP: "Autocomplete",
      isDPUCustomer: isDPUCustomer,
      companyName: companyName,
    });
  }

  fetchBillingPlantDetails({
    customerId,
    isDPUCustomer,
    searchPlant,
    companyName,
    size = 100,
    searchCriteria = "Beginning",
    selectedCustomerPlantStatus = "Complete",
    pageNumber = 0,
    active = 1,
    isOEPP = "Autocomplete",
    sortValue,
    sortType,
    advancedSortingOrder,
    advancedSearchObject,
  }) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/fetchCustomerPlantsLookupDetails", {
      active: active,
      pageNumber,
      size,
      searchCriteria: searchCriteria,
      searchTerms: searchPlant,
      selectedCustomerPlantStatus: selectedCustomerPlantStatus,
      customerFK: customerId,
      isOEPP: isOEPP,
      isDPUCustomer: isDPUCustomer,
      companyName: companyName,
      sortValue,
      sortType,
      customerPlants: advancedSearchObject,
      advanceSortingOrder: advancedSortingOrder,
    });
  }

  //Fetch all the plants for the selected Customer for Lookup
  /**
   * Used for Customer tab Plant Lookup - Order Entry.
   * Fetch all the plants based on selected customer (Manufacturer/DPU Customer).
   * Used for billing, pickup and delivery plant lookups.
   */
  fetchCustomerPlantsLookupDetails(
    pageNumber,
    customerPlants,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedCustomerId,
    isDPUCustomer,
    selectedCompanyName
  ) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/fetchCustomerPlantsLookupDetails", {
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
      companyName: selectedCompanyName,
    });
  }

  /*** Shuttle Delay Screen ***/
  //User Autocomplete
  getAllUserData(searchTerm, selectedCompanyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/fetchallusers", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: true,
      companyName: selectedCompanyName,
    });
  }

  // User Look up
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
    let active = null;
    if (userStatus === "Active") {
      active = 1;
    } else if (userStatus === "Inactive") {
      active = 0;
    } else {
      active = null;
    }
    let pseudoUser = null;
    if (selectedUserStatus === "Pseudo") {
      pseudoUser = 1;
    } else if (selectedUserStatus === "Actual") {
      pseudoUser = 0;
    } else {
      pseudoUser = null;
    }
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/getAllUsersLookup", {
      active: active,
      pageNumber: pageNumber,
      size: 15,
      users: users,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      pseudoUser: pseudoUser,
      type,
      userType,
      companyName: companyName,
    });
  }

  //Save UnitShuttles
  saveUnitShuttlesRecord(unitShuttlesVO) {
    return axios.post(Shuttle_Yard_Checkin_Base_URL + "/saveUnitShuttlesRecord", unitShuttlesVO);
  }

  //Save shuttle delay
  unitShuttleDelaySave(unitShuttleDelaysVO) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/shuttleDelaySave", unitShuttleDelaysVO);
  }

  // Save ONE
  shuttleONESave(unitShuttlesVO) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/shuttleDriverONESave", unitShuttlesVO);
  }

  // Save Dealer Shuttle
  dealerShuttleSave(unitShuttlesVO) {
    return axios.post(Shuttle_Yard_Checkin_Base_URL + "/dealerShuttleSave", unitShuttlesVO);
  }

  // Save Shuttle Bonus
  shuttleBonusSave(unitShuttlesVO) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/shuttleBonusSave", unitShuttlesVO);
  }

  // Save Dry Run
  shuttleDryRunSave(unitShuttlesVO) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/shuttleDryRunSave", unitShuttlesVO);
  }

  //Handle Driver Pay
  handleDriversPay(driverFK, selectedDriverCompany) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/postPay", {
      driverId: driverFK,
      companyName: selectedDriverCompany,
    });
  }

  //Fetch Current Company Name
  getCurrentCompanyName() {
    return axios.get(Shuttle_Yard_Checkin_Base_URL + "/getCurrentCompanyName");
  }

  /*** Activation Delay Screen ***/
  // Save Activation Delay
  saveActivationDelay(unitShuttlesVO) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/activationDelay", unitShuttlesVO);
  }

  /*Second Shuttle Browse in Yard Checkin */
  getSecondShuttleBrowse(
    unitNumberPK,
    selectedUnitCompanyName,
    selectedDriverCompanyID,
    pageNumber,
    pageSize,
    sortValue,
    sortFlag
  ) {
    return axios.post(Shuttle_Yard_Checkin_Base_URL + "/fetchSecondShuttleUnits", {
      unitPK: unitNumberPK,
      companyName: selectedUnitCompanyName,
      pageNumber,
      pageSize: 11,
      sortValue,
      sortType: sortFlag,
      selectedDriverCompanyID,
    });
  }

  /*Get dispatchID from unit activation */
  getUnitsDispatch(unitFK, sisterUnitFK, unitCompanyFK) {
    return axios.post(Shuttle_Yard_Checkin_Base_URL + "/fetchDispatchId", {
      unitFKInt: unitFK,
      sisterUnitFK,
      unitCompanyFKInt: unitCompanyFK,
    });
  }

  /*Unique check for unit shuttle one unit number */
  checkUnitSHuttleOneUniqueness(unitShuttleOneUnitNUmber) {
    return axios.post(Shuttle_Yard_Checkin_Base_URL + "/unitShuttleOneUnitNUmber", {
      unitNumber: unitShuttleOneUnitNUmber,
    });
  }

  //Fetch Multiple Shuttle Records from Order entry
  multipleShuttleRecordExistCheck(unitFK, selectedUnitCompanyName) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/multipleShuttleRecordExistCheck", {
      unitFKInt: unitFK,
      companyName: selectedUnitCompanyName,
    });
  }

  checkPostPayStatus(selectedCompanyName, selectedDriverFK) {
    return axios.post(Shuttle_Yard_Checkin_CrossDB_URL + "/checkPostPayStatus", {
      driverId: selectedDriverFK,
      companyName: selectedCompanyName,
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new YardCheckinService();
