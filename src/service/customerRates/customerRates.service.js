import { axios } from "../../config/axiosInterceptors";
import { Customer_Rates_Base_URL } from "../../constants/backendUrl.constant";

class CustomerRatesService {
  async getCustomerRatesDataByCustomerId(customerPK) {
    try {
      const res = axios.post(Customer_Rates_Base_URL + "/getcustomerratesdatabycustomerid", {
        customerFK: { customerPK },
      });
      return res;
    } catch (error) {
      console.error("Error get customer rates:", error);
      throw error;
    }
  }
}
const CustomerRatesServices = new CustomerRatesService();

export default CustomerRatesServices;
