import { axios } from "../config/axiosInterceptors";
import {
  CustomerGroup_Base_URL,
  CustomerSalesReport_Base_URL,
  NormalLookupScreen_RecordsPerPage,
  QuarterScreen_GroupsMaintenance_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
} from "../services/constants/applicationConstants";
class CustomerGroupService {
  //       /* for Customer Group Lookup */
  getCustomerGroupForLookup(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag, customerId) {
    return axios.post(`${CustomerGroup_Base_URL}/getAllCustomerGroups`, {
      searchCriteria,
      searchTerm: searchTerms,
      pageNumber,
      size: NormalLookupScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
      customerId,
    });
  }
  /* for Customer Group Autocomplete*/
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
  /* for fetching  record by id */
  getRecord(id) {
    return axios.get(CustomerGroup_Base_URL + "/getCustomerGroupById/" + id);
  }
  /* for Customer Group Maintenance Browse page */
  getAllCustomerGroups(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag) {
    return axios.post(`${CustomerGroup_Base_URL}/getAllCustomerGroups`, {
      searchCriteria,
      searchTerm: searchTerm,
      pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }
  /* for saving  Customer Group*/
  saveCustomerGroup(customerGroups) {
    return axios.post(`${CustomerGroup_Base_URL}/saveCustomerGroup`, customerGroups);
  }

  /* for deleting  Customer Group*/

  deleteCustomerGroup(id) {
    return axios.delete(`${CustomerGroup_Base_URL}/deleteCustomerGroup/${id}`);
  }
  /*
   * Used check the Description unique or not
   */
  isDescriptionUnique(description, id) {
    return axios.post(CustomerGroup_Base_URL + "/checkdescriptionexist", {
      description,
      customerGroupPK: id,
    });
  }

  /**
   * Used  to get all Customers assigned for the selected CustomerGroupFK
   **/
  getAssignedCustomers(id, pageNo, sort, assignSortValue) {
    return axios.post(CustomerGroup_Base_URL + "/getCustomersListing", {
      customerGroupPK: id,
      pageNumber: pageNo,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      sortType: sort,
      sortValue: assignSortValue,
    });
  }
  /**
   * Used for to get all Customers -list left side customers
   **/
  getLeftCustomers(
    reverseFlag,
    leftPageNumber,
    initialList,
    deleteList,
    saveList,
    exceptList,
    sortFlag,
    sortValue
  ) {
    return axios.post(CustomerGroup_Base_URL + "/fetchleftunassignedcustomers", {
      pageNumber: leftPageNumber,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      reverseFlag: reverseFlag,
      initialList: initialList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      sort: sortFlag,
      sortValue: sortValue,
    });
  }
  /**
   * Used  to get all Customers assigned for the selected CustomerGroupFK -list right side customers
   **/
  getRightCustomers(
    reverseList,
    assignedPageNumber,
    initialList,
    deleteList,
    saveList,
    exceptList,
    sort,
    assignSortValue
  ) {
    return axios.post(CustomerGroup_Base_URL + "/fetchrightassignedcustomers", {
      pageNumber: assignedPageNumber,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      initialList: initialList,
      reverseFlag: reverseList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      rightSortValue: assignSortValue,
      rightSort: sort,
    });
  }

  /**
   * Used  to Fetch initial  Customer list for the selected CustomerGroupFK
   */
  getInitialList(id) {
    return axios.get(CustomerGroup_Base_URL + "/getcustomerbyfk/" + id);
  }
  /**
   * Used to save assigned Customers in to Customer
   * Group Members table for the selected CustomerGroupFK
   */
  saveCustomers(id, initialList, deleteList, saveList, exceptList, reverseFlag) {
    return axios.post(CustomerGroup_Base_URL + "/savecustomergroupmember", {
      initialList: initialList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      reverseFlag: reverseFlag,
      customerGroupPK: id,
    });
  }

  //customerSalesReport
  getAllCustomerGroupsForCustomer({
    selectedSearchCriteria = "Beginning",
    searchTerms,
    pageNumber = 0,
    pageSize,
    sortValue,
    sortFlag,
    type = "AutoComplete",
  }) {
    return axios.post(CustomerSalesReport_Base_URL + "customerGroupLookup", {
      pageNumber: pageNumber,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type,
      pageSize,
    });
  }
}
export default new CustomerGroupService();
