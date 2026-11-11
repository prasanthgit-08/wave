import { axios } from "../config/axiosInterceptors";
import { CustomerPlantGroup_Base_URL, FormTypes_Base_URL } from "../services/constants/applicationConstants";
class CustomerPlantGroupService {
  getCustomerPlantGroupForLookup(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(CustomerPlantGroup_Base_URL + "/allCustomerPlantGroupdata", {
      searchCriteria,
      searchTerm: searchTerms,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getCustomerPlantGroupForAuto(string) {
    return axios.post(CustomerPlantGroup_Base_URL + "/allCustomerPlantGroupdata", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "AutoComplete",
    });
  }
  getRecord(id) {
    return axios.get(CustomerPlantGroup_Base_URL + "/getcustomerplantgroup/" + id);
  }
}
export default new CustomerPlantGroupService();
