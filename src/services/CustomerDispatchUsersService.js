import { axios } from "../config/axiosInterceptors";
import {
  CustomerDispatchUsers_Base_URL,
  Customer_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class CustomerDispatchUsersService {
  getTableData(customerId, searchTerm, searchCriteria, pageNumber, sortValue, sortFlag, orderEntryUsers) {
    return axios.post(CustomerDispatchUsers_Base_URL + "/list", {
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      customerFK: customerId,
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      sortValue: sortValue,
      sortType: sortFlag,
      dispatchEntryUsers: orderEntryUsers,
    });
  }

  getRecord(id) {
    return axios.get(CustomerDispatchUsers_Base_URL + "/fetchcustomer/" + id);
  }

  deleteRecord(id) {
    return axios.delete(CustomerDispatchUsers_Base_URL + "/deletecustomerdispatchuser/" + id);
  }

  getAllUsers(searchTerm, searchCriteria, pageNumber) {
    return axios.post(CustomerDispatchUsers_Base_URL + "/allusers", {
      pageNumber: 0,
      size: 100,
      searchTerms: searchTerm,
      searchCriteria: "Beginning",
      type: "Autocomplete",
      active: true,
    });
  }
  getCustomerPlants(
    customerId,
    searchTerm,
    active,
    type,
    size,
    page,
    isPlantToPlantTransfer,
    searchCriteria,
    advanceSortingOrder
  ) {
    return axios.post(CustomerDispatchUsers_Base_URL + "/getcustomerplantbycustomerfk/", {
      active,
      customerFK: customerId,
      searchTerms: searchTerm,
      type,
      size,
      pageNumber: page,
      isPlantToPlantTransfer,
      searchCriteria,
      advanceSortingOrder,
    });
  }

  checkDuplicateRecord(customerId, plantId, userId) {
    return axios.post(`${CustomerDispatchUsers_Base_URL}/checkuserexists/${plantId}/${customerId}/${userId}`);
  }

  createOrUpdateRecord(formData) {
    return axios.post(CustomerDispatchUsers_Base_URL + "/savecustomerdispatchuser/", formData);
  }

  getCustomerById(customerId) {
    return axios.get(Customer_Base_URL + "/getcustomerdetailsbyid/" + customerId);
  }
}

export default new CustomerDispatchUsersService();
