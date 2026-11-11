import { axios } from "../config/axiosInterceptors";
import { DriverReportCard_Base_URL } from "./constants/applicationConstants";

class ReportCardService {
  getDriverReportCard(driverId) {
    return axios.post(DriverReportCard_Base_URL + "/getDriverReportCard", {
      driverId: driverId,
    });
  }
  updateByFromAndTo(driverId, to, from) {
    return axios.post(DriverReportCard_Base_URL + "/updateByFromAndTo", {
      driverId: driverId,
      to: to,
      from: from,
    });
  }
}
export default new ReportCardService();
