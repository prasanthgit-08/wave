import { axios } from "../config/axiosInterceptors";
import { DriverAwards_Base_URL } from "./constants/applicationConstants";

class DriverAwardsService {
  getDriverDetails(id) {
    return axios.get(DriverAwards_Base_URL + "/getdriver/" + id);
  }
}

export default new DriverAwardsService();
