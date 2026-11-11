import { axios } from "../config/axiosInterceptors";
import { PcMiler_BASE_URL } from "./constants/applicationConstants";

class PcmilerService {
  OptimiseRoute(drivebyunit) {
    return axios.post(PcMiler_BASE_URL + "/optimize", {
      drivebyunit,
    });
  }

  calculateTripDistance(drivebyunit) {
    return axios.post(PcMiler_BASE_URL + "/calculateTripDistance", {
      drivebyunit,
    });
  }

  calculateDistance(srcdst) {
    return axios.post(PcMiler_BASE_URL + "/calculateDistance", {
      src: {
        city: srcdst.src.city?.trim(),
        stateCode: srcdst.src.stateCode,
      },
      dst: {
        city: srcdst.dst.city?.trim(),
        stateCode: srcdst.dst.stateCode,
      },
    });
  }
}

export default new PcmilerService();
