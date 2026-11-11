import { axios } from "../../config/axiosInterceptors";
import { BackEnd_Base_URL } from "../../constants/backendUrl.constant";

class EnumService {
  getAllEnums() {
    try {
      return axios.get(`${BackEnd_Base_URL}enums/getall`);
    } catch (error) {
      console.error("getAllEnums error:", error);
      throw error;
    }
  }
}

export default new EnumService();
