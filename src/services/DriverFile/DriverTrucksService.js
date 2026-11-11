import { axios } from "../../config/axiosInterceptors";
import {
  DriverTrucks_Base_URL,
  EmailProcessor_URL,
  Equipment_Base_URL,
  HalfScreen_RecordsPerPage,
  States_Base_URL,
} from "../constants/applicationConstants";

class DriverTrucksService {
  getTruckId(searchTerm, searchCriteria, selectedStatus, pageNumber, sortValue, sortFlag, driverId, size) {
    let status = null;
    if (selectedStatus === "Active") {
      status = 1;
    } else if (selectedStatus === "Inactive") {
      status = 0;
    }
    return axios.post(`${DriverTrucks_Base_URL}/fetchdrivertrucks`, {
      active: status,
      number: pageNumber,
      size: size || HalfScreen_RecordsPerPage,
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      sortValue: sortValue,
      sortType: sortFlag,
      driverId: driverId,

      truckMaintenanceProgram: true,
    });
  }

  getActiveTrucksForAutocomplete(string, driverId) {
    return axios.post(DriverTrucks_Base_URL + "/fetchdrivertrucks", {
      searchCriteria: "Beginning",
      searchTerm: string,
      number: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      active: true,
      isAutoComplete: true,
      driverId: driverId,
    });
  }

  getTruckCode(isHalftonChecked, isHaulAndTowChecked, isSemiTractorChecked) {
    return axios.post(`${DriverTrucks_Base_URL}/gettruckcode/`, {
      isHalftonChecked: isHalftonChecked,
      isHaulAndTowChecked: isHaulAndTowChecked,
      isSemiTractorChecked: isSemiTractorChecked,
    });
  }

  getAssignedEld(string) {
    return axios.post(`${Equipment_Base_URL}/fetchequipments`, {
      number: 0,
      size: 100,
      searchTerms: string,
      searchCriteria: "Beginning",
      sortValue: null,
      sortType: false,
      driverTruckFlag: true,
    });
  }

  getAssignedIrpPlate(string) {
    return axios.post(`${Equipment_Base_URL}/fetchequipments`, {
      number: 0,
      size: 100,
      searchTerms: string,
      searchCriteria: "Beginning",
      sortValue: null,
      sortType: false,
      driverTruckFlags: true,
    });
  }

  getDriverTruckById(id) {
    return axios.get(`${DriverTrucks_Base_URL}/getdrivertruck/${id}`);
  }

  getDriverById(id) {
    return axios.get(`${DriverTrucks_Base_URL}/getdriver/${id}`);
  }
  saveDriverTruck(driverTruckData) {
    return axios.post(`${DriverTrucks_Base_URL}/savedrivertruck/`, driverTruckData);
  }
  checkDescriptionExist(id, string, selectedTruckId) {
    return axios.post(DriverTrucks_Base_URL + "/descriptionexists", {
      driverId: id,
      description: string,
      driverTruckPK: selectedTruckId,
    });
  }
  getPrincipleTruck(id) {
    return axios.get(`${DriverTrucks_Base_URL}/principletruckexist/${id}`);
  }

  getIsFirstTruck(id) {
    return axios.get(`${DriverTrucks_Base_URL}/firsttruckbydriver/${id}`);
  }

  activateTruck(id) {
    return axios.post(`${DriverTrucks_Base_URL}/toggleactive/${id}`);
  }
  deactivateTruck(id) {
    return axios.post(`${DriverTrucks_Base_URL}/toggleactive/${id}`);
  }

  getAllStateData(searchTerm) {
    return axios.post(States_Base_URL + "/allstates", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: true,
    });
  }

  findActiveTrucks(id) {
    return axios.post(`${DriverTrucks_Base_URL}/activetrucks/${id}`);
  }

  composeEmail(payload) {
    return axios.post(EmailProcessor_URL + "api/email/compose", payload);
  }

  checkAndCreateTMR(driverID, truckID, month) {
    return axios.post(`${DriverTrucks_Base_URL}/tmr/check-create-pk/${driverID}/${truckID}/${month}`);
  }
}

export default new DriverTrucksService();
