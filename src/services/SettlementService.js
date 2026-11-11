import { axios } from "../config/axiosInterceptors";
import {
  QuarterScreen_RecordsPerPage,
  Settlement_Base_URL,
} from "../services/constants/applicationConstants";
class SettlementService {
  getSettlementRecords(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag, driverId) {
    return axios.post(Settlement_Base_URL + "/fetch", {
      searchCriteria,
      searchTerms,
      pageNumber,
      size: 8,
      sortValue: sortValue,
      sortType: sortFlag,
      driverId: driverId,
    });
  }
  createOrUpdateRecord(formData) {
    return axios.post(Settlement_Base_URL + "/saveSettlement", formData);
  }
}
export default new SettlementService();
