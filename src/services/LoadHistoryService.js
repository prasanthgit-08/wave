import { axios } from "../config/axiosInterceptors";
import { Load_History_Base_URL, Load_History_CrossDB_Base_URL } from "./constants/applicationConstants";

class LoadHistoryService {
  getLoadHistoryData(pageNumber, size, sortValue, sortType, driverFK, toDate, fromDate) {
    return axios.post(Load_History_Base_URL + "/get-browse-data", {
      driverFK,
      pageNumber,
      size,
      sortValue,
      sortType,
      toDate: toDate || new Date(),
      fromDate: fromDate || new Date(),
      reportType: "0",
    });
  }

  generateReport(driverFK, reportType, toDate, fromDate) {
    return axios.post(Load_History_Base_URL + "/generate-report", {
      driverFK,
      pageNumber: 0,
      size: 0,
      sortValue: "",
      sortType: "",
      toDate: toDate,
      fromDate: fromDate,
      reportType: reportType,
    });
  }

  getDispatchData(dispatchId) {
    return axios.get(Load_History_CrossDB_Base_URL + "/get-view-data/" + dispatchId);
  }

  getCheckinSortedList(dispatchPK, sortType, sortValue) {
    return axios.post(Load_History_CrossDB_Base_URL + "/get-checkin-sorted-list", {
      dispatchPK,
      sortValue,
      sortType,
    });
  }

  getGateCode(dispatchPK, driverFK, type) {
    return axios.post(Load_History_CrossDB_Base_URL + "/generate-yard-code", {
      dispatchPK,
      driverFK,
      type,
    });
  }
}

export default new LoadHistoryService();
