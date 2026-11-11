import { axios } from "../config/axiosInterceptors";
import {
  AdvancedLookupScreen_RecordsPerPage,
  PostalCode_Base_URL,
  Reroute_Base_URL,
} from "./constants/applicationConstants";

class RerouteService {
  /**
   *Unit Selection Screen - Fetch undelivered active units from dispatch
   ***/
  getAllUnitsForSelectedDriver(driverId, pageNumber, sortValue, sortFlag) {
    return axios.post(Reroute_Base_URL + "/fetch-units", {
      driverFK: driverId,
      pageNumber: pageNumber,
      pageSize: 11,
      sortValue: sortValue || "",
      sortType: sortFlag,
    });
  }

  /***
   * Details Screen - Get Dealer Customer
   * ***/
  getDealerCustomerForAutocomplete(searchCustomer, companyId) {
    return axios.post(Reroute_Base_URL + "/customers", {
      searchTerm: searchCustomer,
      pageNumber: 0,
      pageSize: 100,
      active: 1,
      selectedCustomerStatus: "Complete",
      searchCriteria: "Beginning",
      type: "Autocomplete",
      isReroute: true,
      companyId,
    });
  }

  /***
   * Pickup Normal Dealer Screen - Get dealer by id
   ***/
  getNormalDealerById(dealerId, companyPK) {
    return axios.get(`${Reroute_Base_URL}/dealers/${dealerId}/${companyPK}`);
  }

  getUnitById(dispatchPK) {
    return axios.post(Reroute_Base_URL + "/fetch-unit-by-id/", { dispatchPK: dispatchPK });
  }

  /***
   * Pickup Normal Dealer Screen - Get miscellaneous dealer by id
   ***/
  fetchMiscellaneousDealerById(id, companyPK) {
    return axios.get(Reroute_Base_URL + "/fetch-misc-dealer/" + id, { params: { companyPK } });
  }

  /**
   * Pickup Normal Dealer Screen  - Pickup Dealer autocomplete
   */
  fetchNormalDealersByName(searchDealer, dealerSearchType) {
    let isOEPP;
    if (dealerSearchType === "Name") {
      isOEPP = "AutocompleteByName";
    } else {
      isOEPP = "AutocompleteByCityState";
    }
    return axios.post(Reroute_Base_URL + "/fetchDealers", {
      active: 1,
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchDealer,
      selectedDealerStatus: "Complete",
      isOEPP: isOEPP,
    });
  }

  /**
   * Pickup Normal Dealer Screen  - Pickup Dealer autocomplete
   */
  fetchDealersForReroutes(searchDealer, companyId, searchType) {
    return axios.post(Reroute_Base_URL + "/dealers/multi-db", {
      activeDealer: true,
      pageNumber: 0,
      pageSize: 100,
      searchCriteria: "Beginning",
      searchTerm: searchDealer,
      companyId: companyId,
      searchType: searchType || "",
      sortType: 0,
    });
  }

  getDealersForLookupSP({
    active,
    pageNumber,
    searchCriteria,
    advancedSortingOrder,
    searchTerm,
    sortValue,
    sortFlag,
    companyId,
    // selectedDealerStatus,
    advancedSearchString,
    recordsPerPage = AdvancedLookupScreen_RecordsPerPage,
  }) {
    let dealerStatus = null;
    if (active === "Active") {
      dealerStatus = 1;
    } else if (active === "Inactive") {
      dealerStatus = 0;
    }

    return axios.post(Reroute_Base_URL + "/dealers/multi-db", {
      activeDealer: dealerStatus,
      pageNumber: pageNumber,
      pageSize: recordsPerPage,
      searchCriteria: searchCriteria,
      // advanceSortingOrder: advancedSortingOrder,
      advanceSortVOForLocalAndCrossDB: advancedSortingOrder,
      searchTerm: searchTerm,
      sortValue: sortValue,
      sortType: sortFlag,
      // selectedDealerStatus: selectedDealerStatus,
      // isOEPP:"Lookup",
      // advancedSearchStringVO: advancedSearchString,
      advanceSearchVOForLocalAndCrossDB: advancedSearchString,
      companyId: companyId,
      // advancedSearchBy
    });
  }

  saveReroute(userId, driverFK, dispatchId, notes, creditCardArrayList, unitFK) {
    return axios.post(Reroute_Base_URL + "/onReroute", {
      userId: userId,
      driverFK: driverFK,
      dispatchId: dispatchId,
      notes: notes,
      monetraChargesVOList: creditCardArrayList,
      unitId: unitFK,
    });
  }

  saveRerouteProcess(unitRerouteSaveVO) {
    return axios.post(Reroute_Base_URL + "/save-reroute", unitRerouteSaveVO);
  }

  //Edit Master Express
  unassignedDriverUnitSave(unAssignedDriverUnitSaveEditMasterExpressVO) {
    return axios.post(
      Reroute_Base_URL + "/unassigned-driver-unit-save",
      unAssignedDriverUnitSaveEditMasterExpressVO
    );
  }
  //customer
  getAllDealerCustomersForLookup(
    active,
    pageNumber,
    customers,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedCustomerStatus,
    companyId
  ) {
    let customerStatus = null;
    if (active === "Active") {
      customerStatus = 1;
    } else if (active === "Inactive") {
      customerStatus = 0;
    }

    return axios.post(Reroute_Base_URL + "/customers", {
      active: customerStatus,
      pageNumber: pageNumber,
      pageSize: 15,
      advanceSearch: !searchTerms ? true : false,
      advanceSearchVOForLocalAndCrossDB: customers,
      searchCriteria: searchCriteria,
      advanceSortVOForLocalAndCrossDB: advanceSortingOrder,
      advanceSort: !sortValue ? true : false,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedCustomerStatus: selectedCustomerStatus,
      type: "Lookup",
      companyId,
    });
  }
  //miscdealer
  /**
   * Used for Misc Pickup tab & Misc Delivery tab Lookup - Order Entry.
   * Fetch all the dealers from UnitAddresses.
   *
   */
  fetchMiscDealer(
    pageNumber,
    UnitAddresses,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    companyPK
  ) {
    return axios.post(Reroute_Base_URL + "/misc-dealers/multi-db", {
      pageNumber: pageNumber,
      size: 15,
      advanceSearchVOForLocalAndCrossDB: UnitAddresses,
      searchCriteria: searchCriteria,
      advanceSortVOForLocalAndCrossDB: advanceSortingOrder,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      companyId: companyPK,
    });
  }

  saveMiscDealer(saveXML, companyId) {
    return axios.post(Reroute_Base_URL + "/save-misc-dealer", {
      saveXML,
      companyId,
    });
  }

  fetchRates(
    companyFK,
    pickupDealerFK,
    deliveryDealerFK,
    invoiceMiles,
    driverMiles,
    pickupCustomerPlantFK,
    deliveryCustomerPlantFK,
    unitFK,
    dispatchFK,
    customerPlantFK,
    customerFK,
    pickupState,
    deliveryState
  ) {
    return axios.post(Reroute_Base_URL + "/calculate-rates", {
      companyFK,
      pickupDealerFK,
      deliveryDealerFK,
      invoiceMiles,
      driverMiles,
      pickupCustomerPlantFK,
      deliveryCustomerPlantFK,
      unitFK,
      dispatchFK,
      customerPlantFK,
      customerFK,
      pickupState,
      deliveryState,
    });
  }

  findDriverQual(driverQualVO) {
    return axios.post(Reroute_Base_URL + "/find-driver-qual", driverQualVO);
  }

  getLastUnitLocationForTheUnit(companyPK, unitFK) {
    return axios.get(Reroute_Base_URL + "/unit/last-unit-location", {
      params: { companyPK, unitFK },
    });
  }

  getPostalCodeid(postalCodeVo) {
    return axios.post(PostalCode_Base_URL + "/getPostalCodeid", postalCodeVo);
  }

  getReturnCreditCardData(unitFK, companyId) {
    return axios.get(Reroute_Base_URL + "/get-credit-card", {
      params: { companyId, unitFK },
    });
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new RerouteService();
