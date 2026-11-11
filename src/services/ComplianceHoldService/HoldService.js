import { axios } from "../../config/axiosInterceptors";
import { ComplianceHold_BASE_URL } from "../constants/applicationConstants";

class HoldService {
  getAllCompliancedata(id, pageNumber, pageSize) {
    return axios.get(`${ComplianceHold_BASE_URL}/getComplianceHolds/${id}`, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
  }
}

export default new HoldService();
