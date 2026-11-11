import { axios } from "../../config/axiosInterceptors";
import { Unit_Listing_By_Date_Base_URL } from "../constants/applicationConstants";

class UnitListingByDateService {
  getUnitListingByDate(formData) {
    return axios.post(Unit_Listing_By_Date_Base_URL + "/unitListingByDate", {
      divisionStatus: formData.divisionStatus,
      source: formData.source,
      orderDate: formData.orderDate,
      plantFK: formData.plantFK,
      customerFK: formData.customerFK,
      type: formData.type,
    });
  }

  sendUnitListByDate(formData) {}
}
export default new UnitListingByDateService();
