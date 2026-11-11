import { axios } from "../config/axiosInterceptors";
import { QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";
import { CustomerDelay_Base_URL } from "./constants/applicationConstants";

const baseUrl = CustomerDelay_Base_URL;

class CustomerDelay {
  // Get all Delay Resources for a Customer
  getCustomerDelay(number, searchCriteria, searchTerms, customerFK, sortValue, sortFlag) {
    return axios.post(baseUrl + "/fetchcustomerdelays", {
      number: number,
      size: QuarterScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerms: searchTerms,
      customerFK: customerFK,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  // Create a Delay Resource for a Customer
  create(description, phone, customerfk, customerDelayResourcePK, delay, breakdown, damage, notes) {
    return axios.post(baseUrl + "/createcustomerdelay", {
      description: description,
      phone: phone,
      customerFK: customerfk,
      customerDelayResourcePK: customerDelayResourcePK,
      delay: delay,
      breakdown: breakdown,
      damage: damage,
      notes: notes,
    });
  }

  // Delete a Delay Resource
  deleteCustomerDelay(id) {
    return axios.delete(baseUrl + "/deletecustomerdelay/" + id);
  }

  // Get a Delay Resource details
  getCustomerDelayId(id) {
    return axios.get(baseUrl + "/getcustomerdelay/" + id);
  }

  // Check a Description already exists for a Customer
  checkDescriptionExist(id, description, customerfk) {
    return axios.post(baseUrl + "/checkdescriptionexist", {
      description: description,
      customerFK: customerfk,
      customerDelayResourcePK: id,
    });
  }
}

export default new CustomerDelay();
