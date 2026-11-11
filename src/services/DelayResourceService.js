import { axios } from "../config/axiosInterceptors";
import { DelayResource_Base_URL, QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";

class DelayResourceService {
  listDelayResources(pageNumber, searchTerm, searchCriteria, sortValue, sortFlag) {
    return axios.post(DelayResource_Base_URL + "/fetchDelayResources", {
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      sortType: sortFlag,
      sortValue: sortValue,
    });
  }

  saveDelayResource(description, phone, delay, breakdown, damage, notes, delayResourcePK) {
    return axios.post(DelayResource_Base_URL + "/saveDelayResource", {
      description,
      phone,
      notes,
      delay,
      breakdown,
      damage,
      delayResourcePK,
    });
  }

  fetchById(id) {
    return axios.get(DelayResource_Base_URL + "/fetchById/" + id);
  }

  deleteById(id) {
    return axios.delete(DelayResource_Base_URL + "/deleteDelayResource/" + id);
  }
  isDescriptionUnique(description, id) {
    return axios.post(DelayResource_Base_URL + "/isDescriptionUnique", {
      description,
      delayResourcePK: id,
    });
  }
}

export default new DelayResourceService();
