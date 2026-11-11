import { axios } from "../../config/axiosInterceptors";
import { CustomerPlants_Base_URL } from "../../constants/backendUrl.constant";

class CustomerPlantService {
  async fetchPlantById(plantId) {
    try {
      const res = await axios.get(CustomerPlants_Base_URL + "/getcompletecustomerplant/" + plantId);
      return res;
    } catch (error) {
      console.error("Error fetching plant:", error);
      throw error;
    }
  }
}
const CustomerPlantServices = new CustomerPlantService();

export default CustomerPlantServices;
