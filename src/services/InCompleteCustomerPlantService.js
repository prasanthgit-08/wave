import { axios } from "../config/axiosInterceptors";
import { InCompletePlant_Base_URL } from "./constants/applicationConstants";
class InCompleteCustomerPlantService {
  getincompletePlantById(InCompletePlantId) {
    return axios.get(InCompletePlant_Base_URL + "/getincompletecustomerplant/" + InCompletePlantId);
  }
  createCustomer(plantFormData) {
    return axios.post(InCompletePlant_Base_URL + "/save", plantFormData);
  }
}

export default new InCompleteCustomerPlantService();
