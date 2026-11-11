import { axios } from "../../config/axiosInterceptors";
import { Delivered_Unit_Report_Base_URL } from "../constants/applicationConstants";

class DeliveredUnitReportService {
  getDeliveredUnitReport(json) {
    return axios.post(Delivered_Unit_Report_Base_URL + "/getDeliveredUnitReport", {
      divisionStatus: json.division,
      source: json.source,
      beginningDate: json.beginningDate,
      endDate: json.endDate,
      customer: json.customerId,
      dealer: json.dealerId,
      masterDealer: json.masterDealer,
      includeSisterDeliveredUnits: json.includeSisterDeliveredUnits,
      includeSisterUnits: json.includeSisterUnits,
      type: json.type,
    });
  }
}

export default new DeliveredUnitReportService();
