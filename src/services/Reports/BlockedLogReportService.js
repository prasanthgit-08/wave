import { axios } from "../../config/axiosInterceptors";
import { blockedLog_URL } from "../constants/applicationConstants";

class BlockedLogReportService {
  // Dispatcher AutoComplete Service
  fetchDispatcherBlockedLogAutoComplete(string) {
    return axios.post(blockedLog_URL + "/details", {
      type: "Dispatcher", // Fixed: parameter usage
      pageNumber: 0,
      pageSize: 100,
      sortValue: "",
      sortType: false,
      searchCriteria: "Beginning",
      searchTerm: string,
    });
  }

  // Compliance Item AutoComplete Service
  fetchComplianceBlockedLogAutoComplete(string) {
    return axios.post(blockedLog_URL + "/details", {
      type: "ComplianceItem",
      pageNumber: 0,
      pageSize: 100,
      sortValue: "",
      sortType: false,
      searchCriteria: "Beginning",
      searchTerm: string,
    });
  }

  getBlockedLogReport(payload) {
    return axios.post(`${blockedLog_URL}/blockedLogList`, {
      displayCountOnly: payload.displayCountOnly,
      dispatcherPK: payload.dispatcherPK,
      complianceItemPK: payload.complianceItemPK,
      type: payload.type,
    });
  }

  fetchComplianceBlockedLogLookup(searchTerm, searchCriteria, pageNumber, sortType, sortValue) {
    return axios.post(blockedLog_URL + "/details", {
      type: "ComplianceItem",
      pageNumber: pageNumber,
      pageSize: 12,
      sortValue: sortValue,
      sortType: sortType,
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
    });
  }
}

export default new BlockedLogReportService();
