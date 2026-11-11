import { axios } from "../config/axiosInterceptors";
import {
  DriverCompliance_Base_URL,
  DriverDeleaseRequests_Base_URL,
  HalfScreen_RecordsPerPage,
  ThreeForthScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class DriverComplianceItemsService {
  fetchDriverComplianceItems(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag, driverFK) {
    return axios.post(DriverCompliance_Base_URL + "/fetchdriverComplianceItem", {
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      size: ThreeForthScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
      driverId: driverFK,
    });
  }

  fetchDriverComplianceItemsForHistory(
    searchCriteria,
    searchTerm,
    number,
    sortValue,
    sortFlag,
    driverComplianceItemPK
  ) {
    return axios.post(DriverCompliance_Base_URL + "/fetchdriverComplianceItemHistory", {
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      pageNumber: number,
      size: 5,
      sortValue: sortValue,
      sortType: sortFlag,
      driverComplianceItemId: driverComplianceItemPK,
    });
  }

  getRecord(id) {
    return axios.get(DriverCompliance_Base_URL + "/getdriverComplianceRecord/" + id);
  }
  getComplianceHistoryRecord(id) {
    return axios.get(DriverCompliance_Base_URL + "/getdriverComplianceHistoryRecord/" + id);
  }


  createOrUpdateRecord(formData) {
    return axios.post(DriverCompliance_Base_URL + "/saveDriverComplianceItems", formData);
  }

  unBlockRecord(id) {
    return axios.put(DriverCompliance_Base_URL + "/unBlocking", {
      driverComplianceItemPK: id,
    });
  }

  saveDriverDelease(driverDeleaseRequests) {
    return axios.post(`${DriverDeleaseRequests_Base_URL}/createdriverdeleaserequests`, driverDeleaseRequests);
  }
  /*check unique description*/
  checkProcessedRecord(driverId) {
    return axios.post(DriverDeleaseRequests_Base_URL + "/checkprocessedrecordexist", {
      driverFK: parseInt(driverId),
    });
  }
}
export default new DriverComplianceItemsService();
