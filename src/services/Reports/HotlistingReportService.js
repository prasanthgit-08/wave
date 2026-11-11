import { axios } from "../../config/axiosInterceptors";
import { HotListing_Report_Base_URL } from "../constants/applicationConstants";

class HotlistingReportService {
  getHotListingReport(payload) {
    return axios.post(HotListing_Report_Base_URL + "hotListReport", {
      Division: payload.Division,
      source: payload.source,
      minimumPriority: payload.minimumPriority,
      specialCode1: payload.specialCode1Input,
      specialCode2: payload.specialCode2Input,
      specialCode3: payload.specialCode3Input,
      specialCode4: payload.specialCode4Input,
      type: payload.type,
    });
  }
}

export default new HotlistingReportService();
