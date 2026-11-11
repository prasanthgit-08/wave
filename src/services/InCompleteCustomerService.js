import { axios } from "../config/axiosInterceptors";
import { InCompleteCustomer_Base_URL } from "../services/constants/applicationConstants";
class InCompleteCustomerService {
  createCustomer(customerFormData) {
    return axios.post(InCompleteCustomer_Base_URL + "/savecustomerdetails", customerFormData);
  }

  getIncompleteCustomerById(InCompleteCustomerId) {
    return axios.get(InCompleteCustomer_Base_URL + "/getincompletecustomersdatabyid/" + InCompleteCustomerId);
  }
}

export default new InCompleteCustomerService();
