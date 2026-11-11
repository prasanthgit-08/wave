import { axios } from "../../config/axiosInterceptors";
import { State_Mileage_Report_Base_URL } from "../constants/applicationConstants";

class StateMileageReportService {
  getStateMileageReport(data) {
    return axios.post(State_Mileage_Report_Base_URL + "stateMileageReport", {
      division: data.division,
      source: data.source,
      beginningDate: data.beginningDate,
      endDate: data.endDate,
      type: data.type,
      initialFlow: 1,
    });
  }
}

export default new StateMileageReportService();
