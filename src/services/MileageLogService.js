import { axios } from "../config/axiosInterceptors";
import { MileageLog_CrossDB_URL } from "./constants/applicationConstants";

class MileageLogService {
  getAllSafetyMilesRecords(driverId, sortValue, sortFlag, pageNumber, selectionType, beginningDate, endDate) {
    return axios.post(MileageLog_CrossDB_URL + "/getMileageLogRecord", {
      pageNumber: pageNumber,
      pageSize: 11,
      driverFK: driverId,
      sortValue: sortValue,
      sortType: sortFlag,
      selectionType: selectionType,
      beginningDate: beginningDate,
      endDate: endDate,
    });
  }

  setMileageLogRecords(
    driverPK,
    type,
    emailTo,
    pageNumber,
    selectionType,
    sortValue,
    sortFlag,
    beginningDate,
    endDate
  ) {
    return axios.post(MileageLog_CrossDB_URL + "/getMileageLogReport", {
      driverFK: driverPK,
      type: type,
      emailTo: emailTo,
      pageNumber: pageNumber,
      selectionType: selectionType,
      sortValue: sortValue,
      sortType: sortFlag,
      beginningDate: beginningDate,
      endDate: endDate,
    });
  }
}
export default new MileageLogService();
