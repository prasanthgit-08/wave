import { axios } from "../config/axiosInterceptors";
import {
  Customer_Base_URL,
  CustomerGroup_Base_URL,
  CustomerPlantGroup_Base_URL,
  CustomerPlants_Base_URL,
  DealerFlatRate_Base_URL,
  QuarterScreen_RecordsPerPage,
  UnitTypeGroup_Base_URL,
} from "./constants/applicationConstants";

class DealerConnectionFlatrateService {
  getDealerConnectionFlatRate({
    pageNumber,
    pageSize,
    sortValue,
    sortType,
    searchCriteria,
    searchTerms,
    resultType,
    dealerConnectionFK,
  }) {
    return axios.post(DealerFlatRate_Base_URL + "/dealer-connection-flat-rate", {
      pageNumber: pageNumber,
      pageSize: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortType,
      searchCriteria: searchCriteria,
      searchTerms: searchTerms || "",
      resultType: resultType,
      dealerConnectionFK: dealerConnectionFK,
    });
  }

  fetchDealerConnectionFlatRate(data) {
    return axios
      .post(DealerFlatRate_Base_URL + "/dealer-connection-flat-rate-fetch", data)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching dealer flat rate:", error);
        throw error;
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

  getCustomerGroupForAuto(string, customerId) {
    return axios.post(`${CustomerGroup_Base_URL}/getAllCustomerGroups`, {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "AutoComplete",
      customerId,
    });
  }

  getAllPlantsByCustomerAuto(string) {
    return axios.post(CustomerPlants_Base_URL + "/getallplantsbycustomer", {
      selectedCustomerPlantStatus: "Complete",
      active: 1,
      searchCriteria: "Beginning",
      number: 0,
      size: 50,
      searchTerms: string,
      customerId: null,
      sortValue: null,
      sortType: false,
      isOEPP: "Autocomplete",
    });
  }

  getCustomerPlantGroupForAuto(string) {
    return axios.post(CustomerPlantGroup_Base_URL + "/allCustomerPlantGroupdata", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "AutoComplete",
    });
  }

  getUnitTypesGroupForAuto(unitTypeGroupPKS, string) {
    return axios.post(UnitTypeGroup_Base_URL + "/allunittype", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "AutoComplete",
      customerUnitTypeGroupFKS: unitTypeGroupPKS,
    });
  }

  saveOrUpdateOrDeleteFlatRate(data) {
    return axios
      .post(DealerFlatRate_Base_URL + "/dealer-connection-flat-rate-action", data)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error saving/editing/deleting flat rate:", error);
        throw error;
      });
  }
}

export default new DealerConnectionFlatrateService();
