import { axios } from "../../config/axiosInterceptors";
import { CommonReport_URL } from "../constants/applicationConstants";

class CommonReportService {
  getReport(id, payload, flag) {
    return axios.post(CommonReport_URL + "/common", { id, params: { ...payload }, type: flag }, {});
  }
}

export default new CommonReportService();
