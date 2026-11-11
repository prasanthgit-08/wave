import { axios } from "../config/axiosInterceptors";
import {
  DriverCheckin_Base_URL,
  DriverCheckin_CrossDb_Base_URL,
  Driver_Base_URL,
  Holiday_Base_URL,
  PostalCode_Base_URL,
} from "./constants/applicationConstants";

class DriverCheckinService {
  fetchUnitSelectionData(
    pageNumberForUnitSelection,
    driverId,
    sortValueOfunit,
    sortType1,
    companyName,
    companyFK,
    sisterDispatchFK
  ) {
    return axios.post(DriverCheckin_CrossDb_Base_URL + "/fetchUnitDataForDriverCheckin", {
      pageNumber: pageNumberForUnitSelection,
      pageSize: 8,
      driverId: driverId,
      sortType: sortType1,
      sortValue1: sortValueOfunit,
      companyName: companyName,
      companyId: companyFK,
      sisterDispatchId: sisterDispatchFK,
    });
  }
  getHolidayData() {
    return axios.post(Holiday_Base_URL + "/fetchholidays", {
      searchCriteria: "Beginning",
      searchTerm: "",
      number: 0,
      size: 50,
      sortValue: null,
      sortType: false,
    });
  }

  getRecord(id, companyName, companyFK) {
    return axios.post(DriverCheckin_CrossDb_Base_URL + "/getDriverCheckinDataId", {
      unitId: id,
      companyName: companyName,
      companyId: companyFK,
    });
  }

  getAdvanceAmount(dispatchPK, driverFK) {
    return axios.post(DriverCheckin_Base_URL + "/paymentCalculation", {
      dispatchFK: dispatchPK,
      driverId: driverFK,
    });
  }

  getAllDataForListing(dispatchId, sortValue, sortType, companyName) {
    return axios.post(DriverCheckin_Base_URL + "/getAllRecordByDispatchFK", {
      dispatchFK: dispatchId,
      sortType: sortType,
      sortValue: sortValue,
    });
  }

  createRecord(formDataVO) {
    return axios.post(DriverCheckin_Base_URL + "/checkinSave", formDataVO);
  }

  checkCityStateCode(city, stateCode) {
    return axios.post(PostalCode_Base_URL + "/fetchCityStateCode", {
      city: city,
      stateCode: stateCode,
      type: "search",
    });
  }

  checkOverride(string) {
    return axios.post(DriverCheckin_Base_URL + "/overrideexists", {
      overrideCode: string,
    });
  }

  checkCityState(currentLocationCity, currentLocationStateCode) {
    return axios.post(PostalCode_Base_URL + "/fetchCityStateCode", {
      city: currentLocationCity,
      stateCode: currentLocationStateCode,
      type: "verify",
    });
  }

  /**
   *  Fetch all active companies
   */
  getAllCompanyNames() {
    return axios.get(DriverCheckin_Base_URL + "/getAllCompanyNames");
  }
  /**
   * Fetch Current Company Name
   **/
  getCurrentCompanyName() {
    return axios.get(DriverCheckin_Base_URL + "/getCurrentCompanyName");
  }

  getDriver(
    searchCriteria,
    pageNumber,
    firstName,
    lastName,
    active,
    activeString,
    deleased,
    sortValue,
    sortType,
    companyName,
    companyFK
  ) {
    return axios.post(DriverCheckin_CrossDb_Base_URL + "/fetchDriverListBasedOnTheCompany", {
      number: pageNumber,
      size: 11,
      searchCriteria,
      searchTerm: firstName + (lastName ? " " + lastName?.trim() : ""),
      firstName,
      lastName,
      active,
      activeString,
      deleased,
      sortValue,
      sortType,
      companyFK: companyFK,
      companyId: companyFK,
      companyName: companyName,
    });
  }

  getUunitLocationLastCityandState(companyFK, companyName, unitId) {
    return axios.post(DriverCheckin_Base_URL + "/getCityandStateFromUnitLocationForCrossCompany", {
      companyId: companyFK,
      companyName: companyName,
      unitId: unitId,
    });
  }

  /**Used in Add comments module to save comments in Driver Checkin Table */
  saveCommentsDriverService(commentsData) {
    return axios.post(`${DriverCheckin_Base_URL}/createaddcommentsrecord`, commentsData);
  }
}
export default new DriverCheckinService();
