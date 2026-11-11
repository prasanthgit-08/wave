import { axios } from "../config/axiosInterceptors";
import {
  BondFundsLog_Base_URL,
  HalfScreen_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
  ReserveFundsLog_Base_URL,
  ReserveFundsLogPrint_Base_URL,
} from "./constants/applicationConstants";

class ReserveFundsLogService {
  getReserveFundLogRecords(
    pageNumber,
    sortValue,
    sortType,
    driverPK,
    type,
    beginningDate,
    endDate,
    description
  ) {
    return axios.post(ReserveFundsLog_Base_URL + "/selection", {
      pageNumber: pageNumber,
      size: !type ? 11 : 50,
      sortType: sortType,
      sortValue: sortValue,
      driverPK: driverPK,
      type: type,
      beginningDate: beginningDate,
      endDate: endDate,
      description: description,
    });
  }

  setReserveFundLogRecords(driverPK, type, emailTo, pageNumber, beginningDate, endDate, description) {
    return axios.post(ReserveFundsLogPrint_Base_URL + "/reserveFundsLog", {
      driverPK: driverPK,
      type: type,
      emailTo: emailTo,
      pageNumber: pageNumber,
      beginningDate: beginningDate,
      endDate: endDate,
      description,
    });
  }
}
export default new ReserveFundsLogService();
