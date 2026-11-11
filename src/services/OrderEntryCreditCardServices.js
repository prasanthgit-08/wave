import { axios } from "../config/axiosInterceptors";
import { OrderEntry_Base_URL } from "./constants/applicationConstants";

class OrderEntryCreditCardServices {
  getMapping(id) {
    return axios.get(OrderEntry_Base_URL + "/fetchcustomercreditcarddetails/" + id);
  }
}

export default new OrderEntryCreditCardServices();
