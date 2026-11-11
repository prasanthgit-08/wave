import {
  ImportBroker_Base_URL,
  QuarterScreen_RecordsPerPage,
  ThreeForthScreen_RecordsPerPage,
} from "./constants/applicationConstants";
import { axios } from "../config/axiosInterceptors";
class ImportBrokersService {
  /**
   * Fetch Import Broker Details for Return Broker Lookup
   */
  fetchBrokerDetails(pageNumberBrokerLookup, selectedSearchCriteria, searchTerms, sortValue, sortFlag) {
    return axios.post(ImportBroker_Base_URL + "/getImportBrokers", {
      pageNumber: pageNumberBrokerLookup,
      size: QuarterScreen_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type: "Lookup",
      selectedImportBrokersStatus: "Complete",
      brokerType: "import",
    });
  }
  /* for Import Broker Maintenance */
  getAllImportBrokers(selectedSearchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(ImportBroker_Base_URL + "/getallimportbrokers", {
      pageNumber: pageNumber,
      size: ThreeForthScreen_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      searchTerms: searchTerms,
      sortType: sortFlag,
      sortValue: sortValue,
    });
  }
  getImportBrokersById(id) {
    return axios.get(ImportBroker_Base_URL + "/getimportbrokerdata/" + id);
  }

  deleteImportBrokers(id) {
    return axios.delete(ImportBroker_Base_URL + "/deleteimportbrokers/" + id);
  }
  /*check unique description*/
  checkDescriptionExist(id, description) {
    return axios.post(ImportBroker_Base_URL + "/checkdescriptionexist", {
      description,
      importBrokerPK: id,
    });
  }

  saveImportBrokers(importBrokers) {
    return axios.post(ImportBroker_Base_URL + "/saveimportbrokers", importBrokers);
  }
}
export default new ImportBrokersService();
