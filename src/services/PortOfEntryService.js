import { axios } from "../config/axiosInterceptors";
import { PortOfEntry_Base_URL } from "./constants/applicationConstants";

class PortOfEntryService {
  getPOEforLookup(pageNumber, searchCriteria, searchTerms, sortValue, sortFlag, brokerType) {
    return axios.post(PortOfEntry_Base_URL + "/fetchPOEforLookup", {
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
export default new PortOfEntryService();
