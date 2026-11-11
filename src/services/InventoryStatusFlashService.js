import { axios } from "../config/axiosInterceptors";
import { InventoryStatus_Report_Base_URL } from "./constants/applicationConstants";

class InventoryStatusFlashService {
  getListingData(params) {
    return axios.post(InventoryStatus_Report_Base_URL + "/getListingData", { request: params });
  }
}
export default new InventoryStatusFlashService();
