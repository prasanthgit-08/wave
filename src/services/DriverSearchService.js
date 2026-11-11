import { axios } from "../config/axiosInterceptors";
import { DriverSearch_Base_URL } from "./constants/applicationConstants";

class DriverSearchService {
  getDispachers() {
    return axios.post(DriverSearch_Base_URL + "/getDispachers");
  }

  getTruckCode() {
    return axios.get(DriverSearch_Base_URL + "/getTruckCode");
  }

  fetchDealerByName(searchDealer) {
    return axios.post(DriverSearch_Base_URL + "/fetchdealers", {
      active: 1,
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchDealer,
      selectedDealerStatus: "Complete",
      type: "AutocompleteByName",
    });
  }

  fetchDriver(
    division,
    pageNumber,
    size,
    driverCDL,
    dispatcherId,
    dealerFK,
    state,
    zipcode,
    twicOnly,
    canadianOnly,
    truckCodeId,
    eldOnly,
    hasPintalHook,
    truckType,
    transportation,
    busQualified,
    tractorQualified,
    tenorMore38,
    hitchTowBar,
    sortValue,
    sortType,
    miles,
    searchBy
  ) {
    return axios.post(DriverSearch_Base_URL + "/getDriverList", {
      division: division,
      pageNumber: pageNumber,
      size: size,
      driverCDL: driverCDL,
      dispatcher: dispatcherId,
      twicOnly: twicOnly,
      dealer: dealerFK,
      state: state,
      zipCode: zipcode,
      canadianOnly: canadianOnly,
      transportation: transportation,
      busQualified: busQualified,
      tractorQualified: tractorQualified,
      tenOrMore38FeetPlusUnits: tenorMore38,
      hitchTowBar: hitchTowBar,
      truckType: truckType,
      truckCode: truckCodeId,
      eldOnly: eldOnly,
      hasPintalHook: hasPintalHook,
      sortType: sortType,
      sortValue: sortValue,
      miles: miles,
      searchBy: searchBy || "Both",
    });
  }

  getReport(
    division,
    driverCDL,
    dispatcherId,
    dealerFK,
    state,
    zipcode,
    twicOnly,
    canadianOnly,
    truckCodeId,
    eldOnly,
    hasPintalHook,
    truckType,
    transportation,
    busQualified,
    tractorQualified,
    tenorMore38,
    hitchTowBar,
    type,
    miles,
    searchBy
  ) {
    console.log(searchBy);
    return axios.post(DriverSearch_Base_URL + "/getReport", {
      division: division,
      driverCDL: driverCDL,
      dispatcher: dispatcherId,
      twicOnly: twicOnly,
      dealer: dealerFK,
      state: state,
      zipCode: zipcode,
      canadianOnly: canadianOnly,
      transportation: transportation,
      busQualified: busQualified,
      tractorQualified: tractorQualified,
      tenOrMore38FeetPlusUnits: tenorMore38,
      hitchTowBar: hitchTowBar,
      truckType: truckType,
      truckCode: truckCodeId,
      eldOnly: eldOnly,
      hasPintalHook: hasPintalHook,
      type: type,
      miles: miles,
      searchBy: searchBy || "Both",
    });
  }

  isValidStates(states) {
    return axios.post(DriverSearch_Base_URL + "/isValidStates", {
      state: states,
    });
  }
  isValidZipcode(zipcode) {
    return axios.post(DriverSearch_Base_URL + "/isValidZipcode", {
      zipCode: zipcode,
    });
  }
}
export default new DriverSearchService();
