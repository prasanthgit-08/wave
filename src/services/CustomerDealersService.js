import { axios } from "../config/axiosInterceptors";
import {
  CustomerDealer_Base_URL,
  StandardMaintenance_RecordsPerPage,
} from "./constants/applicationConstants";

class CustomerDealersService {
  fetchDealers(
    active,
    pageNumber,
    dealer,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    advancedSearchString,
    advancedSearchBy
  ) {
    let dealerStatus = null;
    if (active === "Active") {
      dealerStatus = 1;
    } else if (active === "Inactive") {
      dealerStatus = 0;
    }

    return axios.post(CustomerDealer_Base_URL + "/fetchdealers", {
      active: dealerStatus,
      number: pageNumber,
      size: StandardMaintenance_RecordsPerPage,
      dealer: dealer,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedDealerStatus: "Complete",
      isOEPP: "Lookup",
      advancedSearchString,
      advancedSearchBy,
    });
  }

  fetchDealerById(id) {
    return axios.post(CustomerDealer_Base_URL + "/fetchDealerById", {
      dealerId: id,
    });
  }
  fetchCustomerById(id) {
    return axios.post(CustomerDealer_Base_URL + "/fetchCustomerById", {
      customerPK: id,
    });
  }

  fetchPlantById(id) {
    return axios.post(CustomerDealer_Base_URL + "/fetchPlantById", {
      plantId: id,
    });
  }

  fetchPlantGroupById(id) {
    return axios.post(CustomerDealer_Base_URL + "/fetchPlantGroupById", {
      plantGroupId: id,
    });
  }
  fetchCustomers(id, pageNumber, sort, sortValue) {
    return axios.post(CustomerDealer_Base_URL + "/fetchCustomers", {
      pageNumber: pageNumber,
      dealerId: id,
      size: 14,
      sortValue: sortValue,
      sortType: sort,
    });
  }
  fetchCustomerPlants(id, pageNumber, sort, sortValue) {
    return axios.post(CustomerDealer_Base_URL + "/fetchPlants", {
      pageNumber: pageNumber,
      dealerId: id,
      size: 14,
      sortValue: sortValue,
      sortType: sort,
    });
  }
  fetchCustomerPlantGroups(id, pageNumber, sortValue, sort) {
    return axios.post(CustomerDealer_Base_URL + "/fetchPlantGroups", {
      pageNumber: pageNumber,
      dealerId: id,
      size: 14,
      sortValue: sortValue,
      sortType: sort,
    });
  }
  fetchCustomerAutoComplete(String, id) {
    return axios.post(CustomerDealer_Base_URL + "/fetchCustomerAutocomplete", {
      active: 1,
      pageNumber: 0,
      size: 100,
      customers: null,
      searchCriteria: "Beginning",
      advanceSortingOrder: null,
      searchTerms: String,
      sortValue: null,
      sortType: false,
      selectedCustomerStatus: "Complete",
      type: "CustomerDealer",
      dealerId: id,
    });
  }

  fetchCustomerLookup(
    pageNumber,
    searchTerm,
    searchCriteria,
    advanceSortingOrder,
    searchedCustomer,
    normalSortFlag,
    normalSortValue,
    id
  ) {
    return axios.post(CustomerDealer_Base_URL + "/fetchCustomerAutocomplete", {
      active: 1,
      pageNumber: pageNumber,
      size: 15,
      customers: searchedCustomer,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,

      searchTerms: searchTerm,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      selectedCustomerStatus: "Complete",
      type: "CustomerDealerLookup",
      dealerId: id,
    });
  }

  fetchCustomerPlantAutoComplete(String, id) {
    return axios.post(CustomerDealer_Base_URL + "/fetchPlantAutocomplete", {
      active: 1,
      pageNumber: 0,
      size: 50,
      customers: null,
      searchCriteria: "Beginning",
      advanceSortingOrder: null,
      searchTerms: String,
      sortValue: null,
      sortType: false,
      selectedCustomerPlantStatus: "Complete",
      type: "CustomerDealer",
      dealerId: id,
    });
  }

  fetchCustomerPlantLookup(
    pageNumber,
    searchTerm,
    searchCriteria,
    searchedCustomerPlant,
    normalSortFlag,
    normalSortValue,
    id
  ) {
    return axios.post(CustomerDealer_Base_URL + "/fetchPlantAutocomplete", {
      active: 1,
      pageNumber: pageNumber,
      size: 15,
      customers: null,
      customerPlants: searchedCustomerPlant,
      searchCriteria: searchCriteria,
      searchTerms: searchTerm,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      selectedCustomerPlantStatus: "Complete",
      type: "CustomerDealerLookup",
      dealerId: id,
    });
  }

  fetchCustomerPlantGroupAutoComplete(string, id) {
    return axios.post(CustomerDealer_Base_URL + "/fetchPlantGroupAutocomplete", {
      pageNumber: 0,
      size: 100,
      type: "CustomerDealer",
      searchCriteria: "Beginning",
      searchTerm: string,
      dealerId: id,
    });
  }

  fetchCustomerPlantGroupLookup(pageNumber, searchTerm, searchCriteria, sortValue, sortType, id) {
    return axios.post(CustomerDealer_Base_URL + "/fetchPlantGroupAutocomplete", {
      pageNumber: pageNumber,
      size: 15,
      type: "CustomerDealer",
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      sortValue: sortValue,
      sortType: sortType,
      dealerId: id,
    });
  }

  fetchBrokerAutoComplete(string) {
    return axios.post(CustomerDealer_Base_URL + "/fetchBrokerAutocomplete", {
      pageNumber: 0,
      size: 100,
      isOEPP: "Autocomplete",
      searchCriteria: "Beginning",
      searchTerms: string,
      selectedExportBrokersStatus: "Complete",
    });
  }

  fetchPOEAutoComplete(string, pOEList) {
    return axios.post(CustomerDealer_Base_URL + "/fetchPOEAutocomplete", {
      pageNumber: 0,
      size: 100,
      isOEPP: "AutoComplete",
      searchCriteria: "Beginning",
      searchTerm: string,
      selectedPortsOfEntryStatus: "Complete",
      brokerType: "export",
      selectedPorts: pOEList,
    });
  }
  fetchPOELookup(searchTerms, pageNumber, sortFlag, sortValue, searchCriteria, pOEList) {
    return axios.post(CustomerDealer_Base_URL + "/fetchPOEAutocomplete", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: searchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      isOEPP: "Lookup",
      selectedPortsOfEntryStatus: "Complete",
      brokerType: "export",
      selectedPorts: pOEList,
    });
  }
  fetchCustomerDealer(selectionGroup, selectionId, dealerId) {
    return axios.post(CustomerDealer_Base_URL + "/fetchCustomerDealer", {
      selectionGroup: selectionGroup,
      customerDealerfK: selectionId,
      dealerId: dealerId,
    });
  }
  fetchSelectionByID(selectionGroup, selectionId) {
    return axios.post(CustomerDealer_Base_URL + "/fetchSelectionById", {
      selectionGroup: selectionGroup,
      customerDealerfK: selectionId,
    });
  }
  deleteCustomerDealer(id) {
    return axios.delete(CustomerDealer_Base_URL + "/deleteCustomerDealer/" + id);
  }
  saveCustomerDealer(data, id, group, groupId, Pk, customerStoreCode, dpuCustomerId) {
    return axios.post(CustomerDealer_Base_URL + "/saveCustomerDealer", {
      poeId: data.poeFK,
      customerDealers: data,
      dealerId: id,
      selectionGroup: group,
      selectionId: groupId,
      customerDealerfK: Pk,
      customerStoreCode,
      ...(dpuCustomerId && { dpuCustomerId }),
    });
  }
}
export default new CustomerDealersService();
