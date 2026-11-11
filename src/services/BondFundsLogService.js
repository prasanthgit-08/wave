import { axios } from "../config/axiosInterceptors";
import {
  BondFundsLog_Base_URL,
  BondFundsLogPrint_Base_URL,
  HalfScreen_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class BondFundsLogService {
  getBondFundLogRecords(pageNumber, sortValue, sortType, driverPK, type, beginningDate, endDate) {
    return axios.post(BondFundsLog_Base_URL + "/selection", {
      pageNumber: pageNumber,
      size: 11,
      sortType: sortType,
      sortValue: sortValue,
      driverPK: driverPK,
      type: type,
      beginningDate: beginningDate,
      endDate: endDate,
    });
  }

  setBondFundLogRecords(driverPK, type, emailTo, pageNumber, beginningDate, endDate) {
    return axios.post(BondFundsLogPrint_Base_URL + "/bondFundsLog", {
      driverPK: driverPK,
      type: type,
      emailTo: emailTo,
      pageNumber: pageNumber,
      beginningDate: beginningDate,
      endDate: endDate,
    });
  }
}
export default new BondFundsLogService();
