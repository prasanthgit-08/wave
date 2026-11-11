import { axios } from "../config/axiosInterceptors";
import { setShuttleCityFK } from "../redux/CityToYardSlice";
import {
  CityToYard_Base_URL,
  FullScreen_RecordsPerPage,
  HalfScreen_RecordsPerPage,
  No_Of_Record_per_page,
  ShuttleCitys_Base_URL,
  Yard_Base_URL,
} from "../services/constants/applicationConstants";

class CityYardService {
  getCityToYardData(
    searchTerm,
    searchCriteria,
    pageNumber,
    searchCity,
    searchDescription,
    sortValue,
    sortFlag
  ) {
    return axios.post(CityToYard_Base_URL + "/fetchcitytoyard", {
      searchTerm,
      searchCriteria,
      number: pageNumber,
      size: HalfScreen_RecordsPerPage,
      searchCity: searchCity,
      searchDescription: searchDescription,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }
  getRecord(id) {
    return axios.get(CityToYard_Base_URL + "/fetchsinglerecord/" + id);
  }
  getRecordForYard(id) {
    return axios.get(Yard_Base_URL + "/getyardbyid/" + id);
  }

  getShuttleCitysById(id) {
    return axios.get(ShuttleCitys_Base_URL + "/getshuttlecitysdatabyid/" + id);
  }
  createOrUpdateRecord(formData) {
    return axios.post(CityToYard_Base_URL + "/savecitytoyard", formData);
  }
  deleteRecord(id) {
    return axios.delete(CityToYard_Base_URL + "/deletebyid/" + id);
  }

  fetchYardDetailsBydes(searchTerm, searchCriteria, pageNumber) {
    return axios.post(CityToYard_Base_URL + "/allyards", {
      active: 1,
      pageNumber: 0,
      size: 100,
      searchTerm: searchTerm,
      searchCriteria: "Beginning",
    });
  }

  fetchPickupCity(searchTerm, searchCriteria, pageNumber) {
    return axios.post(CityToYard_Base_URL + "/allshuttleCity", {
      pageNumber: 0,
      size: 100,
      searchTerm: searchTerm,
      searchCriteria: "Beginning",
    });
  }
  checkYardExist(yardFK, shuttleCityFK, id) {
    return axios.post(CityToYard_Base_URL + "/YardAndCityExists", {
      yardfk: yardFK,
      shuttleCityfk: shuttleCityFK,
      cityToYardShuttlePK: id,
    });
  }
}
export default new CityYardService();
