import { axios } from "../config/axiosInterceptors";
import {
  DriverServiceTrailer_BASE_URL,
  DriverServiceTrucks_BASE_URL,
  DriverService_BASE_URL,
} from "./constants/applicationConstants";

class DriverServices {
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
    driverType,
    userId
  ) {
    return axios.post(DriverService_BASE_URL + "/fetchdriversForDriverService", {
      number: pageNumber,
      size: 11,
      searchCriteria,
      firstName,
      lastName,
      active,
      activeString,
      deleased,
      sortValue,
      sortType,
      dispatcherUserFK: userId,
      driverType,
    });
  }

  getInvoiceDriver(
    searchCriteria,
    pageNumber,
    firstName,
    lastName,
    active,
    activeString,
    deleased,
    sortValue,
    sortType,
    selectedStatus
  ) {
    let activeFlag = null;
    let deleasedFlag = null;

    switch (selectedStatus) {
      case "Active":
        activeFlag = true;
        deleasedFlag = false;
        break;

      case "InActive":
        activeFlag = false;
        deleasedFlag = false;
        break;

      case "Deleased":
        activeFlag = false;
        deleasedFlag = true;
        break;

      case "All":
        deleasedFlag = null;
        break;

      default:
        throw new Error("Invalid selectedStatus provided.");
    }
    return axios.post(DriverService_BASE_URL + "/fetchdriversForDriverService", {
      number: pageNumber,
      size: 12,
      searchCriteria,
      firstName,
      lastName,
      active: activeFlag,
      activeString,
      deleased: deleasedFlag,
      sortValue,
      sortType,
      selectedStatus,
    });
  }

  getDriverDetails(id) {
    return axios.get(DriverService_BASE_URL + "/getdriver/" + id);
  }
  getDriverTrucks(searchTerm, id) {
    return axios.post(DriverServiceTrucks_BASE_URL + "/fetchdrivertrucks", {
      size: 15,
      searchCriteria: "Beginning",
      searchTerm: searchTerm,
      driverId: id,
    });
  }
  getDriverTruckDetails(id) {
    return axios.get(DriverServiceTrucks_BASE_URL + "/getdrivertruck/" + id);
  }
  getDriverTrailers(searchTerm, id) {
    return axios.post(DriverServiceTrailer_BASE_URL + "/fetchdrivertrailers", {
      size: 15,
      searchCriteria: "Beginning",
      searchTerm: searchTerm,
      driverId: id,
    });
  }
  getDriverTrailerDetails(id) {
    return axios.get(DriverServiceTrailer_BASE_URL + "/getdrivertrailer/" + id);
  }
}

export default new DriverServices();
