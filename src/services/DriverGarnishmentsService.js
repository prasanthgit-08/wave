import { axios } from "../config/axiosInterceptors";
import {
  DriverGarnishments_Base_URL,
  DriverGarnishments_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class DriverGarnishmentsService {
  getGarnishmentData(searchTerm, searchCriteria, pageNumber, selectedStatus, sortFlag, sortValue, id) {
    let active = null;
    if (selectedStatus === "Active") {
      active = 1;
    } else if (selectedStatus === "Inactive") {
      active = 0;
    }
    return axios.post(DriverGarnishments_Base_URL + "/driverGarnishmentList", {
      pageNumber,
      size: DriverGarnishments_RecordsPerPage,
      searchTerm,
      searchCriteria,
      active: active,
      sortValue,
      sortType: sortFlag,
      driverFKInt: id,
    });
  }
  getGarnishmentById(driverGarnishmentPK) {
    return axios.get(DriverGarnishments_Base_URL + "/getGarnishmentUnitsById/" + driverGarnishmentPK);
  }

  checkDuplicateDescription(description, id, driverGarnishmentPK) {
    return axios.post(`${DriverGarnishments_Base_URL}/checkDuplicateDescription`, {
      driverGarnishmentPK: driverGarnishmentPK,
      driverFKInt: id,
      description: description,
    });
  }

  saveGarnishment(saveGarnishmentObject) {
    return axios.post(DriverGarnishments_Base_URL + "/saveDriverGarnishment", saveGarnishmentObject);
  }

  activateGarnishment(id) {
    return axios.put(`${DriverGarnishments_Base_URL}/activateGarnishment`, {
      driverGarnishmentPK: id,
    });
  }

  deactivateGarnishment(id) {
    return axios.put(`${DriverGarnishments_Base_URL}/deactiveGarnishment`, {
      driverGarnishmentPK: id,
    });
  }

  fetchPeriods() {
    return axios.get(DriverGarnishments_Base_URL + "/fetchperiod");
  }
}
export default new DriverGarnishmentsService();
