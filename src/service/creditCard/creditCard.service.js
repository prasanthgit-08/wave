import { axios } from "../../config/axiosInterceptors";
import { CreditCard_Base_URL } from "../../constants/backendUrl.constant";

class CreditCardService {
  verifyCardDetails(cardVerificationDetails) {
    return axios.post(CreditCard_Base_URL + "/verifyCard", cardVerificationDetails);
  }
}

export default new CreditCardService();
