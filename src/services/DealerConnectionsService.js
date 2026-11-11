import { axios } from "../config/axiosInterceptors";
import {
  Dealer_Base_URL,
  DealersConnections_Base_URL,
  QuarterScreen_RecordsPerPage,
  StandardMaintenance_RecordsPerPage,
} from "./constants/applicationConstants";

class DealerConnectionsService {
  getDealersConnections(
    pageNumber,
    searchTerm,
    searchCriteria,
    advancedSearch,
    advanceFK1,
    advanceFK2,
    sortFlag,
    sortValue
  ) {
    return axios.post(DealersConnections_Base_URL + "/fetchDealerConnections", {
      // size:QuarterScreen_RecordsPerPage,
      size: 11,
      pageNumber: pageNumber,
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      sort: sortFlag,
      sortValue: sortValue,
      advanceSearch: advancedSearch,
      advanceSearchFK1: advanceFK1,
      advanceSearchFK2: advanceFK2,
    });
  }

  getByID(connectionPk) {
    return axios.get(DealersConnections_Base_URL + "/getByID/" + connectionPk);
  }

  deleteConnections(connectionPK) {
    return axios.delete(DealersConnections_Base_URL + "/deleteConnection/" + connectionPK);
  }

  getDealerByName(searchString) {
    return axios.post(Dealer_Base_URL + "/fetchdealers", {
      active: 1,
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchString,
      selectedDealerStatus: "Complete",
      isOEPP: "AutocompleteByName",
    });
  }
  saveDealerConnection(dealer1FK, dealer2fk, invoiceMiles, driverMiles, dealerConnectionPK) {
    return axios.post(DealersConnections_Base_URL + "/saveConnection", {
      dealerConnectionPK: dealerConnectionPK,
      dealer1Id: dealer1FK,
      dealer2Id: dealer2fk,
      invoiceMiles: invoiceMiles,
      driverMiles: driverMiles,
    });
  }

  isUnique(dealer1FK, dealer2FK) {
    return axios.get(DealersConnections_Base_URL + "/isValid/" + dealer1FK + "/" + dealer2FK);
  }
}
export default new DealerConnectionsService();
