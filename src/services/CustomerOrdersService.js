import { axios } from "../config/axiosInterceptors";
import {
  CustomerOrders_Base_URL,
  Customer_Base_URL,
  QuarterScreen_RecordsPerPage,
  CustomerOrderMaintenance_Base_URL,
} from "./constants/applicationConstants";
class CustomerOrdersService {
  getAllCustomerOrders(searchCriteria, searchTerm, pageNumber, sortValue, sortType, type) {
    return axios.post(CustomerOrders_Base_URL + "/browsecustomerorders", {
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      sortType: sortType,
      sortValue: sortValue,
      type: type,
    });
  }

  deleteCustomerOrders(id) {
    return axios.delete(CustomerOrders_Base_URL + "/deletecustomerorder/" + id);
  }
  getCustomerOrdersById(id) {
    return axios.get(CustomerOrders_Base_URL + "/viewcustomerorders/" + id);
  }
  /*check unique description*/
  checkDescriptionExist(id, description) {
    return axios.post(CustomerOrders_Base_URL + "/checkdescriptionexist", {
      description,
      customerOrderPK: id,
    });
  }

  createorUpdateCustomerOrders(customerOrders) {
    return axios.post(CustomerOrders_Base_URL + "/saveoreditcustomerorder", customerOrders);
  }
  /**
   * Customer Autocomplete
   */

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
      customerOrderFlag: true,
    });
  }
  getAllCustomersForLookup(
    pageNo,
    searchedCustomer,
    selectedSearchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortFlag,
    sortValue
  ) {
    return axios.post(Customer_Base_URL + "/getallcustomers", {
      active: 1,
      number: pageNo,
      size: 15,
      customers: searchedCustomer,
      advanceSortingOrder: advanceSortingOrder,
      searchCriteria: selectedSearchCriteria,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      customerOrderFlag: true,
      selectedCustomerStatus: "Complete",
    });
  }

  processCustomerOrderFile(file, customerOrderFK, flag = "Test") {
    const formData = new FormData();
    formData.append("customer_orders", file);
    formData.append("customerOrderFK", customerOrderFK);
    formData.append("flag", flag);

    return axios.post(CustomerOrderMaintenance_Base_URL + "/processFile", formData);
  }

  getBulkOrderEntryStatus(batchCode) {
    return axios.get(`${CustomerOrderMaintenance_Base_URL}/upload/status`, { params: { batchCode } });
  }

  getOrderTemplates() {
    return axios.post(CustomerOrders_Base_URL + "/browsecustomerorders", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: "",
      sortValue: null,
      sortType: false,
      type: "Autocomplete",
    });
  }
}

export default new CustomerOrdersService();
