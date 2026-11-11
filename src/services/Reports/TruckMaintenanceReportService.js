import { axios } from "../../config/axiosInterceptors";
import { TruckMaintenanceReport_Base_URL } from "../constants/applicationConstants";

class TruckMaintenanceReportService {
  getTruckMaintenanceReport(displayCountOnly, dispatcher, status) {
    return axios.post(TruckMaintenanceReport_Base_URL + "truckMaintenanceReport", {
      displayCountOnly: displayCountOnly,
      dispatcher: dispatcher || null,
      status: status || null,
    });
  }
}

export default new TruckMaintenanceReportService();
