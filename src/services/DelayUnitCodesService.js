import { axios } from "../config/axiosInterceptors";
import {
  Delayed_Units_Base_URL,
  QuarterScreen_RecordsPerPage,
  ThreeForthScreen_RecordsPerPage,
} from "../services/constants/applicationConstants";

class DelayUnitCodesService {
  getDelayUnitCodes(searchTerm, searchCriteria, pageNumber, delayUnitCodeId, sortValue, sortFlag) {
    return axios.post(Delayed_Units_Base_URL + "/delayedUnitPage", {
      searchCriteria,
      searchTerm,
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      delayUnitCodeId,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getDelayedUnitCodesById(id) {
    return axios.get(Delayed_Units_Base_URL + "/getUnitsById/" + id);
  }

  checkDescription(description, delayedUnitCodePK) {
    return axios.post(Delayed_Units_Base_URL + "/uniqedescription", {
      description: description,
      delayedUnitCodePK: delayedUnitCodePK,
    });
  }

  saveOrEditDelayCode(data) {
    return axios.post(Delayed_Units_Base_URL + "/saveDelayedUnits", data);
  }

  deleteDelayedCode(id) {
    return axios.delete(Delayed_Units_Base_URL + "/deleteDelayedCode/" + id);
  }

  checkSisterCode(sisterDelayCode, delayedUnitCodePK) {
    return axios.post(Delayed_Units_Base_URL + "/uniqeSisterCode", {
      sisterDelayCode: sisterDelayCode,
      delayedUnitCodePK: delayedUnitCodePK,
    });
  }

  checkuniquesave(description, sisterDelayCode, id) {
    return axios.post(Delayed_Units_Base_URL + "/checkuniquesave", {
      description: description,
      sisterDelayCode: sisterDelayCode,
      delayedUnitCodePK: id,
    });
  }
}
export default new DelayUnitCodesService();
