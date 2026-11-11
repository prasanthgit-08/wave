import { axios } from "../config/axiosInterceptors";
import {
  DriverCheckinHistory_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "./constants/applicationConstants";
class DriverCheckinHistoryService {
  //Fetch all the records based on driverFK
  getDriverCheckinHistory(pageNumber, sortValue, sortFlag, driverId) {
    return axios.post(DriverCheckinHistory_Base_URL + "/getDriverCheckinHistory", {
      pageNumber: pageNumber,
      pageSize: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
      driverId,
    });
  }
}
export default new DriverCheckinHistoryService();
