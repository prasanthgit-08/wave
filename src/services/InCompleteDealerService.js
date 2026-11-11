import { axios } from "../config/axiosInterceptors";
import { InCompleteDealer_Base_URL } from "../services/constants/applicationConstants";

class InCompleteDealerService {
  getInCompleteDealerById(dealerId) {
    return axios.get(InCompleteDealer_Base_URL + "/getIncompleteDealerDataById/" + dealerId);
  }

  createDealer(dealerData) {
    return axios.post(InCompleteDealer_Base_URL + "/save", dealerData);
  }
}

export default new InCompleteDealerService();
