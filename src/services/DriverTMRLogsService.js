import { axios } from "../config/axiosInterceptors";
import { DriverTMRLogs_Base_URL } from "../services/constants/applicationConstants";
class DriverTMRLogsService {
  //Fetch all the records based on driverFK
  getDriverTMRLogs(
    searchTerm,
    searchCriteria,
    pageNumber,
    sortValue,
    sortFlag,
    dateType,
    dateFrom,
    dateTo,
    id
  ) {
    return axios.post(DriverTMRLogs_Base_URL + "/allDriverTMRLogs", {
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      size: 11,
      sortValue: sortValue,
      sortType: sortFlag,
      dateType,
      fromDate: dateFrom,
      toDate: dateTo,
      driverFK: id,
    });
  }

  getAllActiveNonPseudoUsers(searchTerm) {
    return axios.post(DriverTMRLogs_Base_URL + "/fetchActiveNonPseudoUsers", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: true,
      pseudoUser: 0,
    });
  }

  getCurrentLoginUser() {
    return axios.post(DriverTMRLogs_Base_URL + "/getloginuser");
  }

  getRecordById(id) {
    return axios.get(DriverTMRLogs_Base_URL + "/getDriverTMRLogById/" + id);
  }

  createDriverTMRLogs(formData) {
    return axios.post(DriverTMRLogs_Base_URL + "/allDriverTMRLogSave", formData);
  }
  deleteDriverTMRLogs(id) {
    return axios.delete(DriverTMRLogs_Base_URL + "/delete/" + id);
  }
}
export default new DriverTMRLogsService();
