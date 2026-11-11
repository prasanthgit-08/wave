import { axios } from "../../config/axiosInterceptors";
import { Customer_Base_URL } from "../../constants/backendUrl.constant";

class CustomerService {
  async getAllCustomersOEDetails({
    active = 1,
    pageNumber = 0,
    size = 15,
    customers,
    searchCriteria = "Beginning",
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortType,
    selectedCustomerStatus = "Complete",
    creditHold = false,
    orderEntry = true,
  }) {
    try {
      const res = await axios.post(`${Customer_Base_URL}/getallcustomersforOE`, {
        active,
        number: pageNumber,
        size,
        customers,
        searchCriteria,
        advanceSortingOrder,
        searchTerms,
        sortValue,
        sortType,
        selectedCustomerStatus,
        creditHold,
        orderEntry,
      });
      return res;
    } catch (error) {
      console.log("customer", error);
      throw error;
    }
  }

  async getAllCustomersDetails({
    active = 1,
    number = 0,
    size = 15,
    customers,
    searchCriteria = "Beginning",
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortType,
    selectedCustomerStatus = "Complete",
    creditHold = false,
    customerPKList = [0],
    restrictedCustomerId = [0],
    restrictedCustomer = false,
    type = "", // here will pass Lookup || Autocomplete
  }) {
    try {
      const res = await axios.post(`${Customer_Base_URL}/getallcustomers`, {
        active,
        number,
        size,
        customers,
        searchCriteria,
        advanceSortingOrder,
        searchTerms,
        sortValue,
        sortType,
        selectedCustomerStatus,
        creditHold,
        customerPKList,
        restrictedCustomerId,
        restrictedCustomer,
        type,
      });
      return res;
    } catch (error) {
      console.log("customer", error);
      throw error;
    }
  }
}

export default new CustomerService();
