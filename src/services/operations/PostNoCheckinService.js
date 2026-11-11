import { axios } from "../../config/axiosInterceptors";
import {
  PostNoCheckin_Base_URL,
  PostNoCheckin_CrossDB_URL,
  QuarterScreen_RecordsPerPage,
} from "./../constants/applicationConstants.js";

class PostNoCheckinService {
  /**
   * Used for Driver No Checkin History Listing.
   */
  getDriverNoCheckinHistory(driverId, pageNumber) {
    return axios.post(PostNoCheckin_CrossDB_URL + "/getDriverNoCheckinHistory", {
      driverFK: driverId,
      pageNumber: pageNumber,
      size: 11,
    });
  }

  /**
   * Used for Listing active Dispatches for a Driver.
   */
  getActiveDispatchForDriver(driverId, pageNumber) {
    return axios.post(PostNoCheckin_CrossDB_URL + "/getActiveDispatchForDriver", {
      driverFK: driverId,
      pageNumber: pageNumber,
      size: 6,
    });
  }

  /**
   *  Save Driver No Checkin
   */
  saveDriverNoCheckin(saveData) {
    return axios.post(PostNoCheckin_CrossDB_URL + "/saveDriverNoCheckin", saveData);
  }
  /**
   * Used for Driver No Checkin for a dispatch on a date.
   */
  getNoCheckinRecord(driverFK, dispatchFK, missedDate) {
    return axios.post(PostNoCheckin_CrossDB_URL + "/getNoCheckinRecord", {
      driverFK: driverFK,
      dispatchFK: dispatchFK,
      missedDate: missedDate,
    });
  }
}
export default new PostNoCheckinService();
