import { axios } from "../config/axiosInterceptors";
import {
  StatePermits_Base_URL,
  ThreeForthScreen_RecordsPerPage,
} from "../services/constants/applicationConstants";
class StatePermitsService {
  fetchstatepermits(searchCriteria, searchTerm, pageNumber, selectedStatus, sortValue, sortFlag) {
    let activeStatus = null;
    if (selectedStatus === "Towable") {
      activeStatus = 1;
    } else if (selectedStatus === "Motorized") {
      activeStatus = 0;
    }
    return axios.post(StatePermits_Base_URL + "/fetchstatepermits", {
      searchCriteria,
      searchTerms: searchTerm,
      pageNumber,
      size: 11,
      towable: activeStatus,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getRecord(id) {
    return axios.get(StatePermits_Base_URL + "/getStatePermitId/" + id);
  }

  createOrUpdateRecord(formData) {
    return axios.post(StatePermits_Base_URL + "/saveStatePermits", formData);
  }

  deleteStatePermits(id) {
    return axios.delete(StatePermits_Base_URL + "/deletebyid/" + id);
  }
  checkStateExist(stateFK, towable, motorized, id) {
    return axios.post(StatePermits_Base_URL + "/stateexists", {
      statePermitPK: id,
      stateId: stateFK,
      towable: towable,
      motorized: motorized,
    });
  }
}
export default new StatePermitsService();
