import { axios } from "../config/axiosInterceptors";
import { PortsOfEntry_Base_URL, QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";

class PortsOfEntryService {
  getAllPortsOfEntry(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, size) {
    return axios.post(PortsOfEntry_Base_URL + "/listportsofentry", {
      pageNumber: pageNumber,
      size: size ? size : QuarterScreen_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerm,
      sortType: sortFlag,
      sortValue: sortValue,
    });
  }
  getPortsOfEntryById(id) {
    return axios.get(PortsOfEntry_Base_URL + "/getportsofentry/" + id);
  }
  deletePortsOfEntry(id) {
    return axios.delete(PortsOfEntry_Base_URL + "/deleteportsofentry/" + id);
  }
  checkUSCityStateCode(usCity, stateCode) {
    return axios.post(PortsOfEntry_Base_URL + "/checkuscitystate", {
      city: usCity,
      stateCode: stateCode,
    });
  }

  checkCanadianCityProvence(canadianCity, provence) {
    return axios.post(PortsOfEntry_Base_URL + "/checkcanadiancitystate", {
      city: canadianCity,
      stateCode: provence,
    });
  }
  checkSequenceExist(id, sequence) {
    return axios.post(PortsOfEntry_Base_URL + "/checksequenceexist", {
      sequence,
      poePK: id,
    });
  }
  checkCityStateExists(poePk, usCity, stateCode, canadianCity, provence) {
    return axios.post(PortsOfEntry_Base_URL + "/checkcombinationexist", {
      poePK: poePk,
      usCity: usCity,
      stateCode: stateCode,
      canadianCity: canadianCity,
      provence: provence,
    });
  }
  savePortsofEntry(portsOfEntry) {
    return axios.post(`${PortsOfEntry_Base_URL}/createportsofentry`, portsOfEntry);
  }
  getPOEforLookup(pageNumber, searchCriteria, searchTerms, sortValue, sortFlag, brokerType) {
    return axios.post(PortsOfEntry_Base_URL + "/listportsofentry", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: searchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      isOEPP: "Lookup",
      selectedPortsOfEntryStatus: "Complete",
      brokerType: brokerType,
    });
  }
}

export default new PortsOfEntryService();
