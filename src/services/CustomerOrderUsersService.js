import { axios } from "../config/axiosInterceptors";
import {
  CustomerOrderUsers_Base_URL,
  CustomerPlants_Base_URL,
  QuarterScreen_RecordsPerPage,
  Customer_Base_URL,
  Users_Base_URL,
} from "./constants/applicationConstants";

class CustomerOrderUsersService {
  getTableData(customerId, searchTerm, searchCriteria, pageNumber, sortValue, sortFlag, orderEntryUsers) {
    return axios.post(CustomerOrderUsers_Base_URL + "/list", {
      number: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      customerId,
      searchTerm,
      searchCriteria,
      sortValue: sortValue,
      sortType: sortFlag,
      orderEntryUsers,
    });
  }

  getRecord(id) {
    return axios.get(CustomerOrderUsers_Base_URL + "/cou/" + id);
  }

  createOrUpdateRecord(formData) {
    return axios.post(CustomerOrderUsers_Base_URL + "/savecou/", formData);
  }

  deleteRecord(id) {
    return axios.delete(CustomerOrderUsers_Base_URL + "/deletecou/" + id);
  }

  getAllUsers(searchTerm, searchCriteria, pageNumber) {
    return axios.post(CustomerOrderUsers_Base_URL + "/allusers", {
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
    return axios.post(CustomerPlants_Base_URL + "/getcustomerplantbycustomerfk/", {
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
  fetchPickupPlant(id, searchTerm, searchCriteria, pageNumber) {
    return axios.post(CustomerOrderUsers_Base_URL + "/allcustomerplants" + id, {
      pageNumber: 0,
      size: 100,
      searchTerms: searchTerm,
      searchCriteria: "Beginning",
    });
  }

  checkDuplicateRecord(customerId, plantId, userId, formData) {
    return axios.post(
      `${CustomerOrderUsers_Base_URL}/checkuserexists/${plantId}/${customerId}/${userId}`,
      formData
    );
  }
}

export default new CustomerOrderUsersService();
