import { axios } from "../../../config/axiosInterceptors";
import {
  Delayed_Breakdown_Fees_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "../../constants/applicationConstants";

class BreakdownFeesService {
  /*Fee Browse Listing*/
  fetchBrowseData(pageNumber, sortValue, sortType, delayedUnitBreakDownFK, companyName, flag) {
    return axios.post(Delayed_Breakdown_Fees_Base_URL + "/breakdownFeeBrowse", {
      pageNumber,
      pageSize: 11,
      sortValue,
      sortType,
      delayedUnitBreakDownFK,
      companyName,
      flag,
    });
  }

  /*check unique description*/
  checkDescriptionExist(description, delayedUnitFeePK) {
    return axios.post(Delayed_Breakdown_Fees_Base_URL + "/checkdescriptionexist", {
      description,
      delayedUnitFeePK,
    });
  }

  /*save  */
  saveBreakdownFee(DelayBreakdownFeesVO) {
    return axios.post(Delayed_Breakdown_Fees_Base_URL + "/breakdownFeeSave", DelayBreakdownFeesVO);
  }

  getbreakdowninfo(breakdownPK) {
    return axios.get(Delayed_Breakdown_Fees_Base_URL + "/breakdown-values/" + breakdownPK);
  }
}

export default new BreakdownFeesService();
