import { axios } from "../../config/axiosInterceptors";
import { ReturnTMR_BASE_URL } from "../constants/applicationConstants";

class ReturnTMRService {
  fetchReturnTMR(payload) {
    return axios.post(`${ReturnTMR_BASE_URL}process`, {
      process: payload.process,
      driverPK: payload.driverPK,
      pageNumber: payload.pageNumber,
      pageSize: payload.pageSize,
      driverTMRLogPKs: payload.driverTMRLogPKs,
      userFK: payload.userFK,
    });
  }
}

export default new ReturnTMRService();
