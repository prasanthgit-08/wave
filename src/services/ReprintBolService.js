import { axios } from "../config/axiosInterceptors";
import {
  ReprintBOL_Base_URL,
  QuarterScreen_RecordsPerPage,
  EmailProcessor_URL,
} from "./constants/applicationConstants";

class ReprintBolService {
  getDriverSelection({
    searchCriteria,
    searchTerm,
    sortValue,
    sortType,
    firstName,
    lastName,
    activeString,
    pageNumber,
  }) {
    const requestPayload = {
      searchCriteria: searchCriteria || "Beginning",
      searchTerm: searchTerm || "",
      pageNumber: pageNumber,
      pageSize: 7,
      sortValue: sortValue || "",
      sortType: sortType,
      firstName: firstName,
      lastName: lastName,
      driverStatus: activeString,
    };

    return axios.post(ReprintBOL_Base_URL + "/driverSelection", requestPayload);
  }

  /*****
   *Fetch the Unit details for Unit Confirmation Screen
   ******/
  fetchUnitForConfirmation(id) {
    return axios.post(ReprintBOL_Base_URL + "/unitConfirmation", {
      unitFK: id,
    });
  }

  fetchDispatchForConfirmation(id) {
    return axios.post(ReprintBOL_Base_URL + "/dispatchConfirmation", {
      dispatchPK: id,
    });
  }
  /*****
   *Fetch the Unit details for Unit Confirmation Screen
   ******/
  fetchBOLForUnits(unitFK) {
    return axios.post(ReprintBOL_Base_URL + "/getBOLFlags", {
      unitFK: unitFK,
    });
  }

  fetchDispatchSelectionData(payload) {
    return axios.post(ReprintBOL_Base_URL + "/dispatchSelection", payload);
  }

  composeEmail(payload) {
    return axios.post(EmailProcessor_URL + "api/email/compose", payload);
  }
}

export default new ReprintBolService();
