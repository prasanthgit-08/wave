import { axios } from "../config/axiosInterceptors";
import {
  ShuttleCitys_Base_URL,
  QuarterScreen_RecordsPerPage,
  AutoCompleteDropdown_No_Of_Records,
} from "../services/constants/applicationConstants";
class ShuttleCitysService {
  getShuttleCitys(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag) {
    return axios.post(ShuttleCitys_Base_URL + "/fetchshuttlecitys", {
      searchCriteria,
      searchTerm,
      pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getShuttleCitysById(id) {
    return axios.get(ShuttleCitys_Base_URL + "/getshuttlecitysdatabyid/" + id);
  }

  createShuttleCitys(formData) {
    return axios.post(ShuttleCitys_Base_URL + "/createshuttlecity", formData);
  }

  deleteShuttleCitys(id) {
    return axios.delete(ShuttleCitys_Base_URL + "/deleteshuttlecity/" + id);
  }
  checkCityExist(city, id) {
    return axios.post(ShuttleCitys_Base_URL + "/checkcityexist", {
      city,
      shuttleCityPK: id,
    });
  }

  getShuttleCitysForLookup(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag) {
    return axios.post(ShuttleCitys_Base_URL + "/fetchshuttlecitys", {
      searchCriteria,
      searchTerm,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getShuttleCitysForLookupForPlantMaintenance(
    searchCriteria,
    searchTerm,
    pageNumber,
    sortValue,
    sortFlag,
    outbound
  ) {
    return axios.post(ShuttleCitys_Base_URL + "/fetchshuttlecitys", {
      searchCriteria,
      searchTerm,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      outbound: outbound,
      isCustomerPlantMaintenance: 1,
    });
  }

  getShuttleCityByName(cityName) {
    return axios.post(ShuttleCitys_Base_URL + "/fetchshuttlecitybyname", {
      city: cityName,
      size: 100,
    });
  }

  getShuttleCitysForAutoComplete(searchTerm) {
    return axios.post(ShuttleCitys_Base_URL + "/fetchshuttlecitys", {
      searchCriteria: "Beginning",
      searchTerm,
      pageNumber: 0,
      size: AutoCompleteDropdown_No_Of_Records,
    });
  }
}
export default new ShuttleCitysService();
