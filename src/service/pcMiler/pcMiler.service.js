import { axios } from "../../config/axiosInterceptors";
import { PcMiler_BASE_URL } from "../../constants/backendUrl.constant";

class pcMilerService {
  async calculateDistance(payload) {
    try {
      const res = await axios.post(PcMiler_BASE_URL + "/calculateDistance", payload);
      return res;
    } catch (error) {
      console.log("calculateDistance error", error);
      throw error;
    }
  }
  async calculateTripDistance(payload) {
    try {
      const res = await axios.post(PcMiler_BASE_URL + "/calculateTripDistance", payload);
      return res;
    } catch (error) {
      console.log("calculateTripDistance error", error);
      throw error;
    }
  }
  async optimiseRoute(payload) {
    try {
      const res = await axios.post(PcMiler_BASE_URL + "/optimize", { drivebyunit: payload });
      return res;
    } catch (error) {
      console.log("optimiseRoute error", error);
      throw error;
    }
  }
}

const pcMilerServices = new pcMilerService();
export default pcMilerServices;
