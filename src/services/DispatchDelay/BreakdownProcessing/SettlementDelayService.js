import { axios } from "../../../config/axiosInterceptors";
import { Settlement_Delay_Base_URL } from "../../constants/applicationConstants";
class SettlementDelayService {
  getFeesDetailsForExpense(
    delayedUnitBreakDownFK,
    pageSize,
    pageNumber,
    sortValueFeeTab,
    sortTypeFeeTab,
    companyName
  ) {
    return axios.post(Settlement_Delay_Base_URL + "/settlementFetch", {
      delayedUnitBreakDownFK: delayedUnitBreakDownFK,
      companyName: companyName,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortType: sortTypeFeeTab,
      sortValue: sortValueFeeTab,
      flag: 1,
    });
  }
  saveData(formData) {
    return axios.post(Settlement_Delay_Base_URL + "/save", formData);
  }
}
export default new SettlementDelayService();
