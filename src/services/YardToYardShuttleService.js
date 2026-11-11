import { axios } from "../config/axiosInterceptors";
import {
  HalfScreen_RecordsPerPage,
  ThreeForthScreen_RecordsPerPage,
  YardToYardShuttle_Base_URL,
} from "./constants/applicationConstants";

export class YardToYardShuttleService {
  fetchall(
    pageNumber,
    searchTerm,
    searchCriteria,
    sort,
    sortValue,
    advanceSearchTermOne,
    advanceSearchTermTwo
  ) {
    return axios.post(YardToYardShuttle_Base_URL + "/fetch-all", {
      pageNumber,
      size: HalfScreen_RecordsPerPage,
      searchTerm,
      searchCriteria,
      sort,
      sortValue,
      advanceSearchTermOne,
      advanceSearchTermTwo,
    });
  }

  saveYardToYardShuttleData(saveData) {
    return axios.post(YardToYardShuttle_Base_URL + "/saveYardToYardShuttles", saveData);
  }

  deleteYardToYardShuttle(id) {
    return axios.delete(YardToYardShuttle_Base_URL + "/delete/" + id);
  }

  isExisting(pickUpYardfk, dropOffYardfk) {
    return axios.post(YardToYardShuttle_Base_URL + "/isExisting", {
      pickUpYardfk,
      dropOffYardfk,
    });
  }

  fetchYardToYardDetailsById(id) {
    return axios.get(YardToYardShuttle_Base_URL + "/fetchYardToYardDetailsById/" + id);
  }

  fetchYardDetailsByName(searchTerm, pageNumber, active, size, searchCriteria) {
    return axios.post(YardToYardShuttle_Base_URL + "/getYardsDetails/", {
      active,
      pageNumber,
      size,
      searchCriteria,
      searchTerm,
    });
  }
}

// eslint-disable-next-line
export default new YardToYardShuttleService();
