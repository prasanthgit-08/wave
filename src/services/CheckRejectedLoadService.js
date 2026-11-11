import { axios } from "../config/axiosInterceptors";
import { CheckRejectedLoad_Base_URL } from "./constants/applicationConstants";

class CheckRejectedLoadService {
  getCheckRejectedBrowseData(pageNumber, size, sortValue, sortType) {
    return axios.post(CheckRejectedLoad_Base_URL + "/get-browse-data", {
      pageNumber,
      size,
      sortValue,
      sortType,
    });
  }

  resetDebitCardDetailRecords(debitCardDetailList) {
    return axios.post(CheckRejectedLoad_Base_URL + "/reset-debitcard-detail-records", {
      debitCardDetailList,
    });
  }
}
export default new CheckRejectedLoadService();
