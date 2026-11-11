import { axios } from "../config/axiosInterceptors";
import {
  Customer_Plant_Release_BaseURL,
  PlantReleaseManual_BASE_URL,
  ShuttleDelay_BASE_URL,
  UnitSelectionLookup_RecordsPerPage,
} from "../services/constants/applicationConstants";

class PlantReleaseService {
  /**
   * Used Unit Autocomplete
   */

  getAllUnitsbyLast5(last5, searchTerm) {
    return axios.post(PlantReleaseManual_BASE_URL + "/batchreleasebybrowse", {
      unitNumberLast5: last5,
      inPickupYard: false,
      reload: 1,
      outbound: 1,
      towable: 1,
      motorized: 1,
      sortByLast5: 0,
      pageNumber: 0,
      customerPK: null,
      customerPlantPK: null,
      pickupYardPK: null,
      sortType: true,
      pageSize: 15,
      startDate: null,
      endDate: null,
      unreleased: 0,
      released: 0,
      type: "Autocomplete",
      all: 1,
      searchTerm: searchTerm,
      pickupAtPlant: true,
      active: true,
    });
  }
  /**
   * Used for get unit by id
   */
  getUnitById(Id) {
    return axios.get(PlantReleaseManual_BASE_URL + "/getunitbyid/" + Id);
  }

  /**
   * Used for Single unit  Save
   */
  releasePlant(unitId, release, delay) {
    return axios.post(PlantReleaseManual_BASE_URL + "/dosingleunitrelease", {
      unitPK: unitId,
      plantRelease: release,
      unitOnShuttleDelay: delay,
    });
  }
  /**
   * Used for Filter Data in option screen
   */
  checkMulibrowseRelease(
    reload,
    outbound,
    towable,
    motorized,
    sortByLast5,
    pageNumber,
    customerId,
    plantId,
    yardId,
    date1,
    date2,
    unreleased,
    released,
    all,
    plantCustomerId
  ) {
    let id = "";
    if (customerId) {
      id = customerId;
    } else if (plantCustomerId) {
      id = plantCustomerId;
    }
    return axios.post(PlantReleaseManual_BASE_URL + "/batchreleasebybrowse", {
      reload: reload,
      outbound: outbound,
      towable: towable,
      motorized: motorized,

      sortByLast5: sortByLast5,
      pageNumber: pageNumber,
      //customerPK: customerId,
      customerPlantPK: plantId,
      pickupYardPK: yardId,
      sortType: true,
      pageSize: 20,
      startDate: date1,
      endDate: date2,

      unreleased: unreleased,
      released: released,
      all: all,
      customerPK: id,
      // inPickupYard:false,
      // pickupAtPlant:true,
      active: true,
      //   activeDispatch:1
    });
  }

  /**
   * yard Autocomplete
   */
  getAllYards(reload, searchTerm, motorized, towable, outbound, unreleased, released) {
    return axios.post(PlantReleaseManual_BASE_URL + "/fetchallyards", {
      active: 1,
      reloadOrder: reload,
      searchCriteria: "Beginning",
      searchTerm: searchTerm,
      number: 0,
      size: 100,
      motorized: motorized,
      plantRelease: 1,
      towable: towable,
      outbound: outbound,
      activeUnit: true,
      unreleased: unreleased,
      released: released,
    });
  }

  /**
   * Customer Autocomplete
   */
  getAllCustomerForAutocomplete(reload, motorized, searchTerm, towable, outbound, unreleased, released) {
    return axios.post(PlantReleaseManual_BASE_URL + "/fetchallcustomers", {
      reloadOrder: reload,
      motorized: motorized,
      searchTerms: searchTerm,
      towable: towable,
      outbound: outbound,
      searchCriteria: "Beginning",
      number: 0,
      size: 100,
      active: 1,
      plantRelease: 1,
      selectedCustomerStatus: "Complete",
      creditHold: 0,
      isPlantRelease: "Autocomplete",
      activeUnit: true,
      type: "Autocomplete",
      unreleased: unreleased,
      released: released,
    });
  }

  /**
   * plant-customer Autocomplete
   */
  getAllPlantCustomerForAutocomplete(reload, motorized, searchTerm, towable, outbound, unreleased, released) {
    return axios.post(PlantReleaseManual_BASE_URL + "/fetchallcustomers", {
      reloadOrder: reload,
      motorized: motorized,
      searchTerms: searchTerm,
      towable: towable,
      outbound: outbound,
      searchCriteria: "Beginning",
      number: 0,
      size: 100,
      active: 1,
      plantRelease: 1,
      selectedCustomerStatus: "Complete",
      creditHold: 0,
      isPlantRelease: "Autocomplete",
      activeUnit: true,
      type: "Autocomplete",
      unreleased: unreleased,
      released: released,
      plantCustomer: true,
    });
  }
  /**
   * plant Autocomplete
   */
  getAllPlantForAutocomplete(reload, motorized, towable, searchTerm, outbound, unreleased, released) {
    return axios.post(PlantReleaseManual_BASE_URL + "/fetchallplants", {
      reloadOrder: reload,
      motorized: motorized,
      towable: towable,
      outbound: outbound,
      searchTerms: searchTerm,
      active: 1,
      searchCriteria: "Beginning",
      selectedCustomerPlantStatus: "Complete",
      number: 0,
      size: 100,
      plantRelease: 1,
      isPlantRelease: "Autocomplete",
      activeUnit: true,
      unreleased: unreleased,
      released: released,
    });
  }

  /**
   * Save -multiple units
   */
  releaseBatchUnit(dataArray) {
    return axios.post(PlantReleaseManual_BASE_URL + "/dobatchrelease", {
      plantReleaseVOArray: dataArray,
    });
  }

  savePlantRelease(data) {
    return axios.post(PlantReleaseManual_BASE_URL + "/save", data);
  }

  /**
   * Save delay
   */
  saveDelay(delayFormData) {
    return axios.post(ShuttleDelay_BASE_URL + "/savedelay", delayFormData);
  }

  /**
   * No delay
   */
  noDelay(unitPk) {
    return axios.post(ShuttleDelay_BASE_URL + "/nodelay", {
      unitFK: unitPk,
    });
  }
  /**
   * yard Lookup
   */
  getYardsForLookup(
    reload,
    pageNumberYardLookup,
    selectedSearchCriteria,
    searchTerms,
    motorized,
    sortFlag,
    sortValue,
    towable,
    outbound,
    unreleased,
    released
  ) {
    return axios.post(PlantReleaseManual_BASE_URL + "/fetchallyards", {
      active: 1,
      reloadOrder: reload,
      pageNumber: pageNumberYardLookup,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      motorized: motorized,
      plantRelease: 1,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      towable: towable,
      outbound: outbound,
      activeUnit: true,
      unreleased: unreleased,
      released: released,
    });
  }

  /**
   * plant lookup
   */
  fetchCustomerPlantsLookupDetails(
    pageNoPlantsLookup,
    searchedCustomerPlant,
    selectedSearchCriteriaForPlant,
    advanceSortingOrder,
    searchTermsForPlant,
    plantSortValue,
    plantSortFlag,
    reload,
    motorized,
    towable,
    outbound,
    unreleased,
    released
  ) {
    return axios.post(PlantReleaseManual_BASE_URL + "/fetchallplants", {
      active: 1,
      number: pageNoPlantsLookup,
      size: 15,
      customerPlants: searchedCustomerPlant,
      searchCriteria: selectedSearchCriteriaForPlant,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTermsForPlant,
      sortValue: plantSortValue,
      sortType: plantSortFlag,
      selectedCustomerPlantStatus: "Complete",
      reloadOrder: reload,
      motorized: motorized,
      plantRelease: 1,
      towable: towable,
      outbound: outbound,
      isPlantRelease: "Autocomplete",
      activeUnit: true,
      unreleased: unreleased,
      released: released,
    });
  }
  /**
   * Customer Lookup
   */
  getCustomers(
    pageNo,
    searchedCustomer,
    selectedSearchCriteriaForCustomer,
    advanceSortingOrderForCustomer,
    searchTermsForCustomer,
    normalSortFlag,
    normalSortValue,
    motorized,
    reload,
    towable,
    outbound,
    unreleased,
    released
  ) {
    return axios.post(PlantReleaseManual_BASE_URL + "/fetchallcustomers", {
      active: 1,
      number: pageNo,
      customers: searchedCustomer,
      advanceSortingOrder: advanceSortingOrderForCustomer,
      size: 15,
      searchCriteria: selectedSearchCriteriaForCustomer,
      searchTerms: searchTermsForCustomer,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      selectedCustomerStatus: "Complete",
      creditHold: 0,
      motorized: motorized,
      plantRelease: 1,
      reloadOrder: reload,
      activeUnit: true,
      towable: towable,
      outbound: outbound,
      type: "Autocomplete",
      unreleased: unreleased,
      released: released,
      type: "Lookup",
    });
  }
  /**
   * Plant-Customer Lookup
   */
  getPlantCustomers(
    pageNo,
    searchedCustomer,
    selectedSearchCriteriaForCustomer,
    advanceSortingOrderForCustomer,
    searchTermsForCustomer,
    normalSortFlag,
    normalSortValue,
    motorized,
    reload,
    towable,
    outbound,
    unreleased,
    released
  ) {
    return axios.post(PlantReleaseManual_BASE_URL + "/fetchallcustomers", {
      active: 1,
      number: pageNo,
      customers: searchedCustomer,
      advanceSortingOrder: advanceSortingOrderForCustomer,
      size: 15,
      searchCriteria: selectedSearchCriteriaForCustomer,
      searchTerms: searchTermsForCustomer,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      selectedCustomerStatus: "Complete",
      creditHold: 0,
      motorized: motorized,
      plantRelease: 1,
      reloadOrder: reload,
      activeUnit: true,
      towable: towable,
      outbound: outbound,
      type: "Autocomplete",
      unreleased: unreleased,
      released: released,
      type: "Lookup",
      plantCustomer: true,
    });
  }
  /**
   * User Autocomplete
   */
  getAllUsersForAutocomplete(searchTerm) {
    return axios.post(ShuttleDelay_BASE_URL + "/getAllUsers", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: true,
    });
  }

  /**
   * Used for Unit selection Autocomplete.
   */
  getAllUnitNumbers(searchUnit, unitLast5, pageNumber, size) {
    return axios.post(PlantReleaseManual_BASE_URL + "/getAllUnitNumbers", {
      pageNumber: pageNumber,
      pageSize: size,
      searchCriteria: "Beginning",
      searchTerm: searchUnit,
      unitNumberLast5: unitLast5,
      type: "Autocomplete",
      plantRelease: 1,
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
    return axios.post(PlantReleaseManual_BASE_URL + "/getAllUnitNumbers", {
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
      plantRelease: 1,
    });
  }
  getCompanyDetails() {
    return axios.get(PlantReleaseManual_BASE_URL + "/complanydetails", {});
  }

  /**
   * Used to generate and send Email
   */
  generateBolAndSendEmail(unitPKList) {
    return axios.post(PlantReleaseManual_BASE_URL + "/generate-bol", {
      unitPKList: unitPKList,
    });
  }

  /**
   * Customer Plant Release Autocomplete
   */
  getAllCustomerPlantReleases(searchTerm) {
    return axios.post(Customer_Plant_Release_BaseURL + "browse", {
      pageNumber: 0,
      pageSize: 100,
      searchCriteria: "Beginning",
      searchTerm: searchTerm,
      sortType: false,
      sortValue: null,
      resultType: 0,
    });
  }
}

export default new PlantReleaseService();
