import { axios } from "../config/axiosInterceptors";
import {
  DriverDeleaseRequests_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class DriverDeleaseRequestsService {
  saveDriverDelease(driverDeleaseRequests) {
    return axios.post(`${DriverDeleaseRequests_Base_URL}/createdriverdeleaserequests`, driverDeleaseRequests);
  }
  /*check unique description*/
  checkProcessedRecord(driverId) {
    return axios.post(DriverDeleaseRequests_Base_URL + "/checkprocessedrecordexist", {
      driverFK: parseInt(driverId),
    });
  }

  /******check whether a record with processed is false and canceled is false*****/
  checkNotProcessedandCanceledRecord(driverId) {
    return axios.post(DriverDeleaseRequests_Base_URL + "/checkprocessedrecordexist", {
      driverFK: driverId,
    });
  }
  /*****For Driver Delease Request Maintenance browse */
  getAllDriverDeleaseForMaintenance(searchTerms, statusType, pageNumber, selectedSearchCriteria, driverId) {
    return axios.post(DriverDeleaseRequests_Base_URL + "/getAllDriverDeleaseRequest", {
      searchTerms: searchTerms,
      statusType: statusType,
      pageNumber: pageNumber,
      size: 11,
      searchCriteria: selectedSearchCriteria,
      driverFK: driverId,
    });
  }
  getDriverDeleaseRequest(id) {
    return axios.get(DriverDeleaseRequests_Base_URL + "/getDriverDeleaseRequests/" + id);
  }
  getCurrentLoginUser() {
    return axios.post(DriverDeleaseRequests_Base_URL + "/getloginuser");
  }
  createOrUpdateDriverDeleaseRequest(driverDeleaseRequestsSaveObject) {
    return axios.post(
      `${DriverDeleaseRequests_Base_URL}/savedriverdeleaserequest`,
      driverDeleaseRequestsSaveObject
    );
  }
  /******Driver Delease Request from Compliance starts from here*****/

  /*****For Driver Delease Request for all Drivers in Compliance*/
  getAllDriverDeleaseForCompliance(searchTerms, pageNumber, selectedSearchCriteria, sortValue, sortFlag) {
    return axios.post(DriverDeleaseRequests_Base_URL + "/getNotProcessandCancelledDeleaseRequest", {
      searchTerms: searchTerms,
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      sortType: sortFlag,
      sortValue: sortValue,
    });
  }

  /*****
   * Process the driver Delease Request to view and
   * update the driver Delease Request Document
   * based on the value of StatusFlag
   ****/
  processDriverDeleaseRequest(id, flagStatus) {
    return axios.post(DriverDeleaseRequests_Base_URL + "/processDeleaseRequest", {
      driverDeleaseRequestPK: id,
      flagStatus: flagStatus,
    });
  }

  /*****
   * Update the Driver Delease Request
   * fields processed to true after
   * returning back from driver delease
   ****/
  updateDriverDeleaseRequest(deleaserequestPK) {
    return axios.post(DriverDeleaseRequests_Base_URL + "/updatedriverdeleaserequest", {
      driverDeleaseRequestPK: deleaserequestPK,
    });
  }
}
export default new DriverDeleaseRequestsService();
