import { axios } from "../config/axiosInterceptors";
import {
  DriverDrugTests_Base_URL,
  drugTest_Crossdb_URL,
  Email_Processor_URL,
  EmailProcessor_URL,
} from "./constants/applicationConstants";

class DriverDrugTestsService {
  saveDriverDrugTests(driverDrugTestsData) {
    return axios.post(DriverDrugTests_Base_URL + "/saveDriverDrugTests", driverDrugTestsData);
  }

  getDriverDrugTests(
    searchTerm,
    searchCriteria,
    pageNumber,
    sortValue,
    sortFlag,
    dateFrom,
    dateTo,
    id,
    searchStatus,
    type
  ) {
    return axios.post(DriverDrugTests_Base_URL + "/getAllDriverDrugTestsData", {
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      number: pageNumber,
      size: 11,
      sortValue: sortValue,
      sortType: sortFlag,
      fromDate: dateFrom,
      toDate: dateTo,
      driverId: id,
      searchStatus: searchStatus,
      type: type,
    });
  }

  getDriverDrugTestsById(id) {
    return axios.get(`${DriverDrugTests_Base_URL}/getdriverdrugtests/${id}`);
  }

  notifyAction(id) {
    return axios.post(`${DriverDrugTests_Base_URL}/notify/${id}`);
  }

  getDriverDispatchHoldPermission(permission) {
    return axios.post(DriverDrugTests_Base_URL + "/getdrugtestoverwritepermission", {
      userPermission: permission,
    });
  }

  getCurrentLoggedUser() {
    return axios.get(`${DriverDrugTests_Base_URL}/loggeduser`);
  }

  sendEmail(unitSelectionRequestVO) {
    return axios.post(Email_Processor_URL + "/compose", unitSelectionRequestVO);
  }
}

export default new DriverDrugTestsService();
