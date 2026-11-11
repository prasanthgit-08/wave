import { axios } from "../config/axiosInterceptors";
import {
  Customer_Base_URL,
  DriverService_BASE_URL,
  PrintCheck_Base_URL,
} from "./constants/applicationConstants";
class PrintCheckService {
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
  getActiveDriver(pageNumber, firstName, lastName, sortValue, sortType) {
    return axios.post(DriverService_BASE_URL + "/fetchdriversForDriverService", {
      number: pageNumber,
      size: 5,
      firstName,
      lastName,
      active: true,
      activeString: "Active",
      deleased: null,
      sortValue,
      sortType,
      searchCriteria: "Beginning",
    });
  }

  save(
    source,
    who,
    reason,
    checkAmount,
    checkPayToId,
    address1,
    address2,
    name,
    city,
    canadian,
    stateCode,
    postalCode,
    transportCompanyFK,
    driverFK,
    textArray
  ) {
    return axios.post(PrintCheck_Base_URL + "/savePrintCheck", {
      source,
      who,
      reason,
      checkAmount,
      checkPayToId,
      address1,
      address2,
      name,
      city,
      canadian,
      stateCode,
      postalCode,
      transportCompanyFK,
      driverFK,
      textArray,
    });
  }
}
export default new PrintCheckService();
