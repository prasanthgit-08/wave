import { axios } from "../config/axiosInterceptors";
import { Customer_Base_URL, DriverBondFund_Base_URL } from "./constants/applicationConstants";

class DriverBondFundService {
  saveDriverBondFundRecord(driverBondFund) {
    return axios.post(`${DriverBondFund_Base_URL}/create`, driverBondFund);
  }
  fetchCheckPayToByName(searchTerm) {
    return axios.post(Customer_Base_URL + "/fetchCheckPayToByName", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      type: "Autocomplete",
    });
  }
  getCheckPayToById(id) {
    return axios.get(Customer_Base_URL + "/getCheckPayToById/" + id);
  }
}
export default new DriverBondFundService();
