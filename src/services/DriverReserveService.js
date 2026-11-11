import { axios } from "../config/axiosInterceptors";
import { DriverReserve_Base_URL, QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";

class DriverReserveService {
  getAll(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag, driverFK) {
    return axios.post(`${DriverReserve_Base_URL}/allDriverReserves`, {
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      sortValue: sortValue,
      sortType: sortFlag,
      driverFKInt: driverFK,
    });
  }

  getDriverReserve(id) {
    return axios.get(`${DriverReserve_Base_URL}/getDriverReserve/${id}`);
  }

  saveDriverReserve(driverReserve) {
    return axios.post(`${DriverReserve_Base_URL}/saveDriverReserve`, driverReserve);
  }

  deleteDriverReserve(id) {
    return axios.delete(`${DriverReserve_Base_URL}/deleteDriverReserve/${id}`);
  }

  getDescriptionList() {
    return axios.post(`${DriverReserve_Base_URL}/descriptionList`);
  }

  activateDriverReserve(id, driverId, reserveAmount) {
    return axios.put(`${DriverReserve_Base_URL}/activateDriverReserve`, {
      driverReservePK: id,
      driverId: driverId,
      amountToBeReserved: reserveAmount,
    });
  }

  deactivateDriverReserve(id, driverId, reserveAmount) {
    return axios.put(`${DriverReserve_Base_URL}/deactiveDriverReserve`, {
      driverReservePK: id,
      driverId: driverId,
      amountToBeReserved: reserveAmount,
    });
  }

  checkDescriptionExists(description, driverFK, id) {
    return axios.post(`${DriverReserve_Base_URL}/descriptionExists`, {
      driverReservePK: id,
      driverFKInt: driverFK,
      description: description,
    });
  }

  /****Get the Adjust Screen data for th4e selected Driver Reserve Record****/
  getReserveAdjust(payload) {
    return axios.post(`${DriverReserve_Base_URL}/adjustScreenDetails`, payload);
  }

  /****Enable or disable the adjust Button in the view Page****/
  getAdjustButtonFlag(payload) {
    return axios.post(`${DriverReserve_Base_URL}/enableAdjustButtonFlag`, payload);
  }

  saveandAdjustDriverReserve(reserveAdjustPayload) {
    return axios.post(`${DriverReserve_Base_URL}/saveAdjust`, reserveAdjustPayload);
  }
}

export default new DriverReserveService();
