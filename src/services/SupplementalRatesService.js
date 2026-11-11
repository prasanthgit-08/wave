import { axios } from "../config/axiosInterceptors";
import {
  Customer_Base_URL,
  HalfScreen_RecordsPerPage,
  StandardMaintenance_RecordsPerPage,
  SupplementalRates_Base_URL,
} from "./constants/applicationConstants";
class SupplementalRatesService {
  getSupplementalRatesRecords(
    searchCriteria,
    searchTerms,
    pageNumber,
    sortValue,
    sortFlag,
    searchDescription,
    searchCustomer,
    searchPlant,
    searchPlantGroup,
    searchCustomerGroup
  ) {
    return axios.post(SupplementalRates_Base_URL + "/fetchSupplementalRates", {
      searchCriteria,
      searchTerms,
      pageNumber,
      size: HalfScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
      searchDescription: searchDescription,
      searchCustomer: searchCustomer,
      searchPlant: searchPlant,
      searchPlantGroup: searchPlantGroup,
      searchCustomerGroup: searchCustomerGroup,
    });
  }
  fetchCustomerAutoComplete(String) {
    return axios.post(Customer_Base_URL + "/getallcustomers", {
      active: 1,
      number: 0,
      size: 2000,
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

  getRecordById(id) {
    return axios.get(SupplementalRates_Base_URL + "/getSupplementalRecord/" + id);
  }

  createOrUpdateRecord(formData) {
    return axios.post(SupplementalRates_Base_URL + "/saveSupplementalRecords", formData);
  }

  deleteRecord(id) {
    return axios.delete(SupplementalRates_Base_URL + "/deletebyid/" + id);
  }

  checkDescriptionExist(supplementalRatePK, string) {
    return axios.post(SupplementalRates_Base_URL + "/descriptionexists", {
      supplementalRatePK: supplementalRatePK,
      description: string,
    });
  }

  getRestrictedCustomerId(id) {
    return axios.get(SupplementalRates_Base_URL + "/getDpuRestrictedCustomer/" + id);
  }

  getListOfPlantsRestricted(id) {
    return axios.get(SupplementalRates_Base_URL + "/getDpuRestrictedPlantIdsByCustomer/" + id);
  }
}
export default new SupplementalRatesService();
