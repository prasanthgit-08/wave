import { axios } from "../config/axiosInterceptors";
import {
  DriverLookup_RecordsPerPage,
  HalfScreen_RecordsPerPage,
  ProcessShuttlPay_Base_URL,
  ProcessShuttlPay_CrossDB_URL,
} from "./constants/applicationConstants";

class ProcessPayService {
  getAllProcessPay(firstName) {
    return axios.post(ProcessShuttlPay_Base_URL + "/fetchDriverName", {
      size: 100,
      searchTerm: firstName,
      searchCriteria: "Beginning",
      type: "Autocomplete",
      active: 1,
      shuttle: "Process Shuttle",
    });
  }

  getAllUnitsForDrivers(pageNumber, driverId, sortValue, sortFlag, companyName, isCurrentCompany) {
    return axios.post(ProcessShuttlPay_CrossDB_URL + "/fetchUnitsForDrivers", {
      size: HalfScreen_RecordsPerPage,
      pageNumber: pageNumber,
      driverId: driverId,
      sortValue: sortValue,
      sortType: sortFlag,
      companyName: companyName,
      isCurrentCompany: isCurrentCompany,
      url: "/ShuttleProcessPay/fetchUnitsForDrivers",
    });
  }

  fetchDriversForLookup(
    searchTerm,
    statusType,
    driverType,
    cityType,
    pageNumber,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortValue,
    normalSortFlag,
    advancedSearchString,
    advancedSearchByInputs
  ) {
    return axios.post(ProcessShuttlPay_Base_URL + "/fetchDriverName", {
      searchTerm: searchTerm,
      statusType,
      driverType,
      cityType,
      number: pageNumber,
      size: DriverLookup_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      advancedSearchPayload: advancedSearchPayload,
      advancedSortingOrder: advancedSortingOrder,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      advancedSearchString: advancedSearchString,
      advancedSearchCheckboxPayload: advancedSearchByInputs,
      type: "Lookup",
      active: 1,
      shuttle: "Process Shuttle",
    });
  }

  saveProcessPay(selectedArrayList, driverId, unselectedArrayList, currentCompany, isCurrentCompany) {
    return axios.post(ProcessShuttlPay_CrossDB_URL + "/saveProcessPay", {
      processPayArray: selectedArrayList.length > 0 ? selectedArrayList : null,
      driverId: driverId,
      selectAllByDriverId: selectedArrayList.length === 0 ? driverId : null,
      unselectedArrayList: unselectedArrayList.length > 0 ? unselectedArrayList : null,
      isCurrentCompany: isCurrentCompany,
      companyName: currentCompany,
      sortType: false,
      url: "/ShuttleProcessPay/fetchUnitsForDrivers",
    });
  }

  /**
   *  Fetch all active companies
   */
  getAllCompanyNames() {
    return axios.get(ProcessShuttlPay_Base_URL + "/getAllCompanyNames");
  }
  /**
   * Fetch Current Company Name
   **/
  getCurrentCompanyName() {
    return axios.get(ProcessShuttlPay_Base_URL + "/getCurrentCompanyName");
  }

  // fetch company name and count of units in that company
  getCompanieyandCountforDriver(selectedDriverID) {
    return axios.get(ProcessShuttlPay_Base_URL + "/getCompanyAndCount/" + selectedDriverID);
  }
}
export default new ProcessPayService();
