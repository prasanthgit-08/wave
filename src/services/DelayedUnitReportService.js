import { axios } from "../config/axiosInterceptors";
import {
  AdvancedLookupScreen_RecordsPerPage,
  DamageReportBaseURL,
  DelayedUnitReportBaseURL,
} from "./constants/applicationConstants";

class DelayedUnitReportService {
  getDelayedReportUnitNumbers({
    pageNumber = 0,
    pageSize = 100,
    sortValue = "",
    sortType = 0,
    searchCriteria = "Beginning",
    searchTerm = "",
    type = "Autocomplete",
  }) {
    try {
      return axios.post(DelayedUnitReportBaseURL + "/unitNumberLookup", {
        pageNumber,
        pageSize,
        sortValue,
        sortType,
        searchCriteria,
        searchTerm,
        type,
      });
    } catch (error) {
      console.error("Error fetching delayed report unit numbers:", error);
    }
  }

  getDelayCodes({
    type = "All",
    pageNumber = 0,
    pageSize = 10,
    sortValue = "",
    sortType = false,
    searchCriteria = "Beginning",
    searchTerm = "",
  }) {
    try {
      return axios.post(DelayedUnitReportBaseURL + "/delayCodeLookup", {
        pageNumber,
        pageSize,
        sortValue,
        sortType,
        searchCriteria,
        searchTerm,
        type,
      });
    } catch (error) {
      console.error("Error fetching delayed report unit numbers:", error);
    }
  }

  getCustomers({
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
    plantPK = null,
  }) {
    try {
      return axios.post(DelayedUnitReportBaseURL + "/customerLookup", {
        plantPk: plantPK,
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

  getCustomerPlants({
    customerPK = null,
    customerState = "",
    searchCriteria = "Beginning",
    searchTerm = "",
    pageNumber = 0,
    pageSize = AdvancedLookupScreen_RecordsPerPage,
    sortValue = "",
    sortType = false,
    type = "LookUp",
    firstField = "",
    secondField = "",
    thirdField = "",
    name = "",
    brand = "",
    productLine = "",
  }) {
    try {
      return axios.post(DelayedUnitReportBaseURL + "/plantLookup", {
        customerPk: customerPK,
        customerState,
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
        brand,
        productLine,
      });
    } catch (error) {
      console.error("Error fetching damage report plants:", error);
    }
  }

  getDrivers({
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
    unitFK = null,
  }) {
    try {
      return axios.post(DelayedUnitReportBaseURL + "/driverLookup", {
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
        unitFK,
      });
    } catch (error) {
      console.log("error getting drivers", error);
    }
  }

  getUnitNumbers({
    pageNumber = 0,
    pageSize = 100,
    sortValue = "",
    sortType = false,
    searchCriteria = "Beginning",
    searchTerm = "",
    type = "Autocomplete",
    unitNumberLast5 = "",
  }) {
    try {
      return axios.post(DelayedUnitReportBaseURL + "/unitNumberLookup", {
        pageNumber,
        pageSize,
        sortValue,
        sortType,
        searchCriteria,
        searchTerm,
        type,
        unitNumberLast5,
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
  }) {
    try {
      return axios.post(DelayedUnitReportBaseURL + "/claimNumberLookup", {
        pageNumber,
        pageSize,
        sortValue,
        sortType,
        searchCriteria,
        searchTerm,
        type,
      });
    } catch (error) {
      console.error("Error fetching damage report claim numbers:", error);
    }
  }

  getVinList() {
    try {
      return axios.get(DelayedUnitReportBaseURL + "/getVIN");
    } catch (error) {
      console.error("Error fetching damage report claim numbers:", error);
    }
  }

  getWorkOrderList() {
    try {
      return axios.get(DelayedUnitReportBaseURL + "/getWorkOrder");
    } catch (error) {
      console.error("Error fetching damage report claim numbers:", error);
    }
  }
}
export default new DelayedUnitReportService();
