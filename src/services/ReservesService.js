import { axios } from "../config/axiosInterceptors";
import {
  HalfScreen_RecordsPerPage,
  NormalLookupScreen_RecordsPerPage,
  Reserves_Base_URL,
} from "../services/constants/applicationConstants";
class ReservesService {
  getReservesForLookup(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag, isLease, isEld, isIRP) {
    return axios.post(Reserves_Base_URL + "/allreserves", {
      searchCriteria,
      searchTerm,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      isEld: isEld,
      isIRP: isIRP,
      isLease: isLease,
    });
  }
  getReservesForLookupforEquipment(
    searchCriteria,
    searchTerm,
    pageNumber,
    sortValue,
    sortFlag,
    isLease,
    isEld,
    isIRP
  ) {
    return axios.post(Reserves_Base_URL + "/allreserves", {
      searchCriteria,
      searchTerm,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      reservesPK: "",
    });
  }
  getReservesForAutoforEquipment(string) {
    return axios.post(Reserves_Base_URL + "/allreserves", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      // isEquipmentFlag:true,
      reservesPK: "",
    });
  }

  getReserves(searchTerm, searchCriteria, pageNumber, reservesPK, sortValue, sortFlag, active) {
    let status = null;
    if (active === "Active") {
      status = 1;
    } else if (active === "Inactive") {
      status = 0;
    }
    return axios.post(Reserves_Base_URL + "/allreserves", {
      searchCriteria,
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      size: HalfScreen_RecordsPerPage,
      reservesPK,
      sortValue: sortValue,
      sortType: sortFlag,
      active: status,
    });
  }

  getReservesForAuto(string, driverFK) {
    return axios.post(Reserves_Base_URL + "/allreserves", {
      driverFK: driverFK,
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "DriverReservesAutocomplete",
    });
  }
  getReservesForDriverReserveLookup(searchCriteria, string, pageNumber, sortValue, sortType, driverFK) {
    return axios.post(Reserves_Base_URL + "/allreserves", {
      searchCriteria: searchCriteria,
      searchTerm: string,
      pageNumber: pageNumber,
      size: NormalLookupScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortType,
      type: "DriverReservesAutocomplete",
      driverFK: driverFK,
    });
  }

  getReservesForLookup(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag, isLease, isEld, isIRP) {
    return axios.post(Reserves_Base_URL + "/allreserves", {
      searchCriteria,
      searchTerm,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      isEld: isEld,
      isIRP: isIRP,
      isLease: isLease,
    });
  }

  getReserveTypeAuto(string, isLease, isEld, isIRP) {
    return axios.post(Reserves_Base_URL + "/allreserves", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      isEld: isEld,
      isIRP: isIRP,
      isLease: isLease,
    });
  }

  getReservesDataById(id) {
    return axios.get(Reserves_Base_URL + "/getallreservesbyid/" + id);
  }

  createReserves(formData) {
    return axios.post(Reserves_Base_URL + "/allreservessave", formData);
  }

  checkDescriptionExist(reservePK, description) {
    return axios.post(Reserves_Base_URL + "/checkdescriptionexist", {
      description: description,
      reservePK: reservePK,
    });
  }
  activateReserve(id) {
    return axios.put(`${Reserves_Base_URL}/activateReserve`, {
      reservePK: id,
    });
  }

  deactivateReserve(id) {
    return axios.put(`${Reserves_Base_URL}/deactiveReserve`, {
      reservePK: id,
    });
  }
}
export default new ReservesService();
