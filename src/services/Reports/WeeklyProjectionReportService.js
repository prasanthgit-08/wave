import { axios } from "../../config/axiosInterceptors";
import { WeeklyProjection_Report_Base_URL } from "../constants/applicationConstants";

class WeeklyProjectionReportService {
  getFuelDetails(division) {
    return axios.post(WeeklyProjection_Report_Base_URL + "getFuelAndMileageDetails", {
      division: division,
    });
  }
}

export default new WeeklyProjectionReportService();
