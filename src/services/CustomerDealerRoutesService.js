import { axios } from "../config/axiosInterceptors";
import { CustomerDealerRoutes_Base_URL } from "./constants/applicationConstants";

class CustomerDealerRoutesService {
  fetchRoutesforCustomerDealer(
    pageNumber,
    searchTerm,
    searchCriteria,
    sortValue,
    sortFlag,
    customerDealerId
  ) {
    return axios.post(CustomerDealerRoutes_Base_URL + "/fetchRoutes", {
      pageNumber: pageNumber,
      size: 7,
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      sortType: sortFlag,
      sortValue: sortValue,
      customerDealerFK: customerDealerId,
    });
  }

  fetchRoutesList(id) {
    return axios.post(CustomerDealerRoutes_Base_URL + "/getRoutesByCustomerDealer", {
      customerDealerFK: id,
    });
  }

  saveSequence(routesList) {
    return axios.post(CustomerDealerRoutes_Base_URL + "/saveSequence", {
      routesList: routesList,
    });
  }

  getPOEforAutoComplete(searchTerms) {
    return axios.post(CustomerDealerRoutes_Base_URL + "/fetchPOEforAutoComplete", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchTerms,
      isOEPP: "AutoComplete",
      selectedPortsOfEntryStatus: "Complete",
      brokerType: "export",
      sortType: false,
    });
  }

  getById(id) {
    return axios.get(CustomerDealerRoutes_Base_URL + "/getRouteById/" + id);
  }

  deleteRoute(id) {
    return axios.delete(CustomerDealerRoutes_Base_URL + "/deleteRouteById/" + id);
  }

  saveRoute(customerDealerId, city, state, postalCode, isPOE, poeId, motorized, towable, routesid) {
    return axios.post(CustomerDealerRoutes_Base_URL + "/saveRoute", {
      customerDealerFK: customerDealerId,
      postalCode: postalCode,
      isPOE: isPOE,
      city: city,
      stateCode: state,
      poeId: poeId,
      towable: towable,
      motorized: motorized,
      customerDealerRoutePK: routesid,
    });
  }
}

export default new CustomerDealerRoutesService();
