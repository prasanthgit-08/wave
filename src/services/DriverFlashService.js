import { axios } from "../config/axiosInterceptors";
import { DriverFlash_Base_URL } from "./constants/applicationConstants";
class DriverFlashService {
  getDriverFlash(id) {
    return axios.get(DriverFlash_Base_URL + "/getRecords/" + id);
  }
}

export default new DriverFlashService();
