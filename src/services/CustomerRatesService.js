import { axios } from "../config/axiosInterceptors";
import {
  Customer_Rates_Base_URL,
  Customer_Base_URL,
  HalfScreen_RecordsPerPage,
} from "./constants/applicationConstants";
class CustomerRatesService {
  getCustomerRatesList(
    searchCriteria,
    searchTerms,
    pageNumber,
    sortValue,
    sortFlag,
    searchCustomer,
    searchPlant,
    searchPlantGroup,
    searchCustomerGroup,
    searchUnitTypeGroup
  ) {
    return axios.post(Customer_Rates_Base_URL + "/fetchcustomerrates", {
      searchCriteria,
      searchTerms,
      pageNumber,
      size: HalfScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
      searchCustomer: searchCustomer,
      searchPlant: searchPlant,
      searchPlantGroup: searchPlantGroup,
      searchCustomerGroup: searchCustomerGroup,
      searchUnitTypeGroup: searchUnitTypeGroup,
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
  getRecordById(id) {
    return axios.get(Customer_Rates_Base_URL + "/getcustomerratesdatabyid/" + id);
  }
  deleteCustomerRates(id) {
    return axios.delete(Customer_Rates_Base_URL + "/deletecustomerrates/" + id);
  }
  /**Save the Customer Rates Record */
  createOrUpdateCustomerRates(customerRatesData) {
    return axios.post(Customer_Rates_Base_URL + "/savecustomerrates", customerRatesData);
  }
  /**Find the Customer  FK By passing the Customer Group FK*/
  getCustomerInfoByCustomerGroupFK(customerGroupId) {
    return axios.post(Customer_Rates_Base_URL + "/findCustomersByCustomerGroupFK", {
      customerGroupId: customerGroupId,
    });
  }
  /**check unique customer for Customer selection page*/
  checkDuplicateCustomerExist(customerRatePK, customerId) {
    return axios.post(Customer_Rates_Base_URL + "/checkduplicatecustomerexist", {
      customerId: customerId,
      customerRatePK: customerRatePK,
    });
  }
  /**check unique customer plant for Customer selection page*/
  checkDuplicateCustomerPlantExist(customerRatePK, customerPlantId) {
    return axios.post(Customer_Rates_Base_URL + "/checkduplicatecustomerplantexist", {
      customerPlantId,
      customerRatePK: customerRatePK,
    });
  }
  /**check unique customer plant group for Customer selection page*/
  checkDuplicateCustomerPlantGroupExist(customerRatePK, customerPlantGroupId) {
    return axios.post(Customer_Rates_Base_URL + "/checkduplicatecustomerplantgroupexist", {
      customerPlantGroupId,
      customerRatePK: customerRatePK,
    });
  }
  /**check unique customer  group for Customer selection page*/
  checkDuplicateCustomerGroupExist(customerRatePK, customerGroupId) {
    return axios.post(Customer_Rates_Base_URL + "/checkduplicatecustomergroupexist", {
      customerGroupId,
      customerRatePK: customerRatePK,
    });
  }
}
export default new CustomerRatesService();
