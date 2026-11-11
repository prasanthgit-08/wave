import { axios } from "../config/axiosInterceptors";
import { Release_Reserve_Base_URL } from "./constants/applicationConstants";
class ReleaseReserveService {
  /*****
   * Get the Release Reserve Details
   ******/
  fetchReleaseReserveDetails(driverId) {
    return axios.post(Release_Reserve_Base_URL + "/details", {
      driverFKInt: driverId,
    });
  }
  /*****
   *Balance the Driver Reserve Fund
   ******/
  releaseReserveSave(releaseReserveFormData) {
    return axios.post(Release_Reserve_Base_URL + "/save", releaseReserveFormData);
  }
}
export default new ReleaseReserveService();
