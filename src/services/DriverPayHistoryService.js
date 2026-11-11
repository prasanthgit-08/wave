import { axios } from "../config/axiosInterceptors";
import {
  Driver_Pay_History_URL,
  Driver_Pay_History_CrossDB_URL,
  QuarterScreen_RecordsPerPage,
} from "../services/constants/applicationConstants";

class DriverPayHistoryService {
  //Get check header list for the selected driver
  getCheckHeaderListForSelectedDriver(driverId, pageNumber, fromDate, toDate) {
    return axios.post(Driver_Pay_History_URL + "/getCheckHeaderListForSelectedDriver", {
      pageNumber: pageNumber,
      size: 9,
      sortType: true,
      programType: "payhistory",
      driverFK: driverId,
      fromDate: fromDate,
      toDate: toDate,
    });
  }

  exportSummary(driverId, fromDate, toDate, exportType, isUser) {
    return axios.post(Driver_Pay_History_URL + "/export", {
      programType: "payhistory",
      driverFK: driverId,
      fromDate: fromDate,
      toDate: toDate,
      exportType: exportType,
      exportToUser: isUser,
      tabType: null,
    });
  }

  // tabType: "queued" for the Queued tab, null for the Detail tab
  exportDetail(driverId, fromDate, toDate, exportType, isUser, tabType = null) {
    return axios.post(Driver_Pay_History_CrossDB_URL + "/export", {
      programType: "payhistory",
      driverFKInt: driverId,
      fromDate: fromDate,
      toDate: toDate,
      exportType: exportType,
      exportToUser: isUser,
      tabType: tabType,
    });
  }

  // Get driver's hired date
  getDriverHiredDate(driverId) {
    return axios.get(Driver_Pay_History_URL + "/getDriverHiredDate/" + driverId);
  }

  //Get check detail list for the selected driver
  // tabType: "queued" for the Queued tab, null for the Detail tab
  getCheckDetailListForSelectedDriver(
    driverId,
    pageNumberDetailsTab,
    fromDateDetailsTab,
    toDateDetailsTab,
    tabType = null
  ) {
    return axios.post(Driver_Pay_History_CrossDB_URL + "/getCheckDetailListForSelectedDriver", {
      pageNumber: pageNumberDetailsTab,
      driverFKInt: driverId,
      fromDate: fromDateDetailsTab,
      toDate: toDateDetailsTab,
      tabType: tabType,
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DriverPayHistoryService();
