import { axios } from "../config/axiosInterceptors";
import { DamageReportBaseURL } from "./constants/applicationConstants";

class DamageReportService {
  getDamageReportCustomers({
    searchCriteria = "Beginning",
    searchTerm = "",
    pageNumber = 0,
    pageSize = 10,
    sortValue = "",
    sortType = false,
    type = "LookUp",
    firstField = "",
    secondField = "",
    thirdField = "",
    name = "",
    city = "",
    stateCode = "",
    status = "All",
  }) {
    try {
      return axios.post(DamageReportBaseURL + "/customerLookup", {
        searchCriteria,
        searchTerm,
        pageNumber,
        pageSize,
        sortValue,
        sortType,
        type,
        firstField,
        secondField,
        thirdField,
        name,
        city,
        stateCode,
        status,
      });
    } catch (error) {
      console.error("Error fetching damage report customers:", error);
    }
  }

  getDamgeReportDrivers({
    type = "Autocomplete",
    pageNumber = 0,
    pageSize = 100,
    searchTerm = "",
    sortValue = "",
    sortType = false,
    searchCriteria = "Beginning",
    statusType = "All",
    driverType = "All",
    cityType = "Mailing",
    firstField = "",
    secondField = "",
    thirdField = "",
    fourthField = "",
    advancedSearchString = "",
    all = false,
    dba = false,
    address = false,
    ssnOrEin = false,
    phone = false,
    email = false,
    vin = false,
    licensePlate = false,
    nickName = false,
    driversLicense = false,
    notes = false,
    firstName = "",
    lastName = "",
    city = "",
    state = "",
  }) {
    try {
      return axios.post(DamageReportBaseURL + "/driverLookup", {
        type,
        pageNumber,
        pageSize,
        sortValue,
        sortType,
        searchTerm,
        searchCriteria,
        statusType,
        driverType,
        cityType,
        firstField,
        secondField,
        thirdField,
        fourthField,
        advancedSearchString,
        all,
        dba,
        address,
        ssnOrEin,
        phone,
        email,
        vin,
        licensePlate,
        nickName,
        driversLicense,
        notes,
        firstName,
        lastName,
        city,
        state,
      });
    } catch (error) {
      console.log("error getting drivers", error);
    }
  }

  getDamageReportUnitNumbers({
    pageNumber = 0,
    pageSize = 100,
    sortValue = "",
    sortType = 0,
    searchCriteria = "Beginning",
    searchTerm = "",
    type = "Autocomplete",
  }) {
    try {
      return axios.post(DamageReportBaseURL + "/unitNumberLookup", {
        pageNumber,
        pageSize,
        sortValue,
        sortType,
        searchCriteria,
        searchTerm,
        type,
      });
    } catch (error) {
      console.error("Error fetching damage report unit numbers:", error);
    }
  }

  getDamageReportClaimNumbers({
    pageNumber = 0,
    pageSize = 100,
    sortValue = "",
    sortType = 0,
    searchCriteria = "Beginning",
    searchTerm = "",
    type = "Autocomplete",
    unitFK = null,
    claimNumber = null,
  }) {
    try {
      return axios.post(DamageReportBaseURL + "/claimNumberLookup", {
        pageNumber,
        pageSize,
        sortValue,
        sortType,
        searchCriteria,
        searchTerm,
        type,
        unitFK,
        claimNumber,
      });
    } catch (error) {
      console.error("Error fetching damage report claim numbers:", error);
    }
  }
}
export default new DamageReportService();
