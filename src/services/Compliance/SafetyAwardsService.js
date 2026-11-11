import { axios } from "../../config/axiosInterceptors";
import { SafetyAwards_Base_URL } from "../constants/applicationConstants";

class SafetyAwardsService {
  /******Process the Safety Award Certificate****/
  processSafetyAwards() {
    return axios.post(`${SafetyAwards_Base_URL}/process`);
  }
}
export default new SafetyAwardsService();
