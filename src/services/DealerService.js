import { axios } from "../config/axiosInterceptors";
import {
  CommonLookup_Base_URL,
  Customer_Base_URL,
  Dealer_Base_URL,
  ExportBrokers_Base_URL,
  OnRoadNotDeliveredReport_Base_URL,
  StandardMaintenance_RecordsPerPage,
  TripListingByCustomerReport_Base_URL,
} from "../services/constants/applicationConstants";

class DealerService {
  //CommonLookup
  getDealersForCommonLookup({
    reportType,
    customerPK = null,
    pageNumber = 0,
    pageSize = 15,
    searchCriteria = "Beginning",
    searchTerms = "",
    sortValue = "",
    sortType = false,
    type = "AutoComplete",
    firstField = "",
    secondField = "",
    thirdField = "",
    fourthField = "",
    name = "",
    dba = "",
    city = "",
    stateCode = "",
  }) {
    return axios.post(CommonLookup_Base_URL + "dealerLookup", {
      reportType,
      type,
      customerPK,
      searchCriteria,
      searchTerm: searchTerms,
      pageNumber,
      pageSize,
      sortValue,
      sortType,
      firstField,
      secondField,
      thirdField,
      fourthField,
      name,
      dba,
      city,
      stateCode,
    });
  }

  getDealers(
    active,
    pageNumber,
    dealer,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedDealerStatus,
    advancedSearchString,
    advancedSearchBy,
    recordsPerPage
  ) {
    let dealerStatus = null;
    if (active === "Active") {
      dealerStatus = 1;
    } else if (active === "Inactive") {
      dealerStatus = 0;
    }

    return axios.post(Dealer_Base_URL + "/fetchdealers", {
      active: dealerStatus,
      number: pageNumber,
      size: recordsPerPage || StandardMaintenance_RecordsPerPage,
      dealer: dealer,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedDealerStatus: selectedDealerStatus,
      isOEPP: "Lookup",
      advancedSearchString,
      advancedSearchBy,
    });
  }

  getDealersForLookup(
    active,
    pageNumber,
    dealer,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedDealerStatus,
    advancedSearchString,
    advancedSearchBy,
    recordsPerPage,
    includePostalCodePK
  ) {
    let dealerStatus = null;
    if (active === "Active") {
      dealerStatus = 1;
    } else if (active === "Inactive") {
      dealerStatus = 0;
    }

    return axios.post(Dealer_Base_URL + "/fetchdealers", {
      active: dealerStatus,
      number: pageNumber,
      size: recordsPerPage || StandardMaintenance_RecordsPerPage,
      dealer: dealer,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedDealerStatus: selectedDealerStatus,
      isOEPP: "Lookup",
      advancedSearchString,
      advancedSearchBy,
      includePostalCodePK,
    });
  }

  getDealersForTripListingLookup(
    pageNumber,
    searchTerms,
    sortValue,
    sortFlag,
    searchCriteria,
    type,
    recordsPerPage,
    name,
    dba,
    city,
    stateCode,
    firstField,
    secondField,
    thirdField,
    fourthField
  ) {
    return axios.post(TripListingByCustomerReport_Base_URL + "dealerLookup", {
      pageNumber: pageNumber,
      pageSize: recordsPerPage || StandardMaintenance_RecordsPerPage,
      searchCriteria: searchCriteria,
      name: name || null,
      dba: dba || null,
      city: city || null,
      stateCode: stateCode || null,
      firstField: firstField || null,
      secondField: secondField || null,
      thirdField: thirdField || null,
      fourthField: fourthField || null,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type: type,
    });
  }

  //OroadNotDeliveredReport
  getDealersForOnRoadNotDelivered(
    pageNumber,
    searchTerms,
    sortValue,
    sortFlag,
    searchCriteria,
    type,
    recordsPerPage,
    name,
    dba,
    city,
    stateCode,
    firstField,
    secondField,
    thirdField,
    fourthField
  ) {
    return axios.post(OnRoadNotDeliveredReport_Base_URL + "dealerLookup", {
      pageNumber: pageNumber,
      pageSize: recordsPerPage || StandardMaintenance_RecordsPerPage,
      searchCriteria: searchCriteria,
      name: name || null,
      dba: dba || null,
      city: city || null,
      stateCode: stateCode || null,
      firstField: firstField || null,
      secondField: secondField || null,
      thirdField: thirdField || null,
      fourthField: fourthField || null,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type: type,
    });
  }

  getDealerById(dealerId) {
    return axios.get(Dealer_Base_URL + "/getcompletedealer/" + dealerId);
  }

  DealerId;

  createDealer(dealer) {
    return axios.post(Dealer_Base_URL + "/createdealer", dealer);
  }
  deleteDealer(id) {
    return axios.delete(Dealer_Base_URL + "/deletedealers/" + id);
  }

  updateDealer(dealer) {
    return axios.put(Dealer_Base_URL, dealer);
  }
  activateDealer(dealer) {
    return axios.put(Dealer_Base_URL + "/activatedealers", {
      dealerPK: dealer,
    });
  }

  deactivateDealer(dealer) {
    return axios.put(Dealer_Base_URL + "/deactivedealers", {
      dealerPK: dealer,
    });
  }

  getCityStateCodeByPostalCode(city, stateCode, postalCode) {
    return axios.post(Dealer_Base_URL + "/getcitystatecodebypostalcode", {
      city: city,
      stateCode: stateCode,
      postalCode: postalCode,
    });
  }

  getAllDealers(active, pageNumber, dealer, searchCriteria, selectedDealerStatus) {
    let dealerStatus = null;
    if (active === "Active") {
      dealerStatus = 1;
    } else if (active === "Inactive") {
      dealerStatus = 0;
    }

    return axios.post(Dealer_Base_URL + "/fetchdealers", {
      active: dealerStatus,
      number: pageNumber,
      size: 7,
      dealer: dealer,
      searchCriteria: searchCriteria,
      selectedDealerStatus: selectedDealerStatus,
    });
  }
  fetchBrokerAutoComplete(String) {
    return axios.post(ExportBrokers_Base_URL + "/getExportBrokers", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: String,
      isOEPP: "Autocomplete",
      selectedExportBrokersStatus: "Complete",
      brokerType: "export",
    });
  }
  fetchCustomerAutoComplete(String) {
    return axios.post(Customer_Base_URL + "/getallcustomers", {
      active: 1,
      number: 0,
      size: 100,
      customers: null,
      searchCriteria: "Beginning",
      advanceSortingOrder: null,
      searchTerms: String,
      sortValue: null,
      sortType: false,
      selectedCustomerStatus: "Complete",
      type: "Autocomplete",
    });
  }
  fetchDealerForAuto(String) {
    return axios.post(Dealer_Base_URL + "/fetchdealers", {
      active: 1,
      number: 0,
      size: StandardMaintenance_RecordsPerPage,
      dealer: null,
      searchCriteria: "Beginning",
      advanceSortingOrder: null,
      searchTerms: String,
      sortValue: null,
      sortType: false,
      selectedDealerStatus: "Complete",
      isOEPP: "AutocompleteByName",
      advancedSearchString: "",
      advancedSearchBy: null,
    });
  }
  getRecordExportBroker(brokerId) {
    return axios.get(ExportBrokers_Base_URL + "/getExportBrokerId/" + brokerId);
  }
  getCustomerById(customerId) {
    return axios.get(Customer_Base_URL + "/getcustomerdetailsbyid/" + customerId);
  }

  fetchLastOrderDate(dealerId) {
    return axios.get(Dealer_Base_URL + "/getLastOrderById/" + dealerId);
  }

  fetchAllDealerDetailsByName(searchDealer) {
    return axios.post(Dealer_Base_URL + "/fetchdealers", {
      active: 1,
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchDealer,
      selectedDealerStatus: "Complete",
      type: "AutocompleteByName",
    });
  }
}

export default new DealerService();
