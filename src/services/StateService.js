import { axios } from "../config/axiosInterceptors";
import {
  ShuttleCitys_Base_URL,
  QuarterScreen_RecordsPerPage,
  States_Base_URL,
} from "../services/constants/applicationConstants";
class StateService {
  getStatesForLookup(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(States_Base_URL + "/allstates", {
      searchCriteria,
      searchTerms,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  fetchPickupState(searchTerm) {
    return axios.post(States_Base_URL + "/allstates", {
      pageNumber: 0,
      size: 50,
      searchTerms: searchTerm,
      searchCriteria: "Beginning",
    });
  }
}
export default new StateService();
