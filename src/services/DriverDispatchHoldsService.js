/* eslint-disable import/no-anonymous-default-export */
import { axios } from "../config/axiosInterceptors";
import { DriverDispatchHolds_Base_URL, QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";

class DriverDispatchHoldsService {
  getAllDriverDispatchData(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag, driverFK) {
    return axios.post(`${DriverDispatchHolds_Base_URL}/getAllDriverDispatchHoldsData`, {
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      sortValue: sortValue,
      sortType: sortFlag,
      driverFK: driverFK,
    });
  }

  getDriverDispatchHoldById(id) {
    return axios.get(DriverDispatchHolds_Base_URL + "/getDriverDispatchHolds/" + id);
  }
  /*
   To check the current login user has corresponding permissions 
   parameters : user

*/
  getDriverDispatchHoldPermission(userId, permission) {
    return axios.post(DriverDispatchHolds_Base_URL + "/getDriverDispatchHoldsPermission", {
      userId: userId,
      userPermission: permission,
    });
  }

  saveDriverDispachHolds(driverDispatchHolddata) {
    return axios.post(DriverDispatchHolds_Base_URL + "/saveDriverDispatchHolds", driverDispatchHolddata);
  }

  checkIfDispatchers(driverId, userId) {
    return axios.post(DriverDispatchHolds_Base_URL + "/checkDispatchers", {
      userId: userId,
      driverFK: driverId,
    });
  }
}

export default new DriverDispatchHoldsService();
