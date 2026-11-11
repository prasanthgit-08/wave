import { axios } from "../config/axiosInterceptors";
import {
  ExportBrokers_Base_URL,
  QuarterScreen_GroupsMaintenance_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
} from "./constants/applicationConstants";
class ExportBrokersService {
  fetchBrokerDetails(pageNumberBrokerLookup, selectedSearchCriteria, searchTerms, sortValue, sortFlag) {
    return axios.post(ExportBrokers_Base_URL + "/getExportBrokers", {
      pageNumber: pageNumberBrokerLookup,
      size: 12,
      searchCriteria: selectedSearchCriteria,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type: "Lookup",
      selectedExportBrokersStatus: "Complete",
      brokerType: "export",
    });
  }

  /* for Export Broker Maintenance */
  getAllExportBrokers(selectedSearchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(ExportBrokers_Base_URL + "/getallexportbrokers", {
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      searchTerms: searchTerms,
      sortType: sortFlag,
      sortValue: sortValue,
    });
  }
  getExportBrokersById(id) {
    return axios.get(ExportBrokers_Base_URL + "/getExportBrokerId/" + id);
  }

  deleteExportBrokers(id) {
    return axios.delete(ExportBrokers_Base_URL + "/deleteexportbroker/" + id);
  }
  /*check unique description*/
  checkDescriptionExist(id, description) {
    return axios.post(ExportBrokers_Base_URL + "/checkdescriptionexist", {
      description,
      exportBrokerPK: id,
    });
  }
  saveExportBrokers(exportBrokers) {
    return axios.post(ExportBrokers_Base_URL + "/createexportbroker", exportBrokers);
  }

  getAssignedPorts(id, brokerPageNumber, sort, assignSortValue) {
    return axios.post(ExportBrokers_Base_URL + "/getassignedports", {
      exportBrokerPK: id,
      pageNumber: brokerPageNumber,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      sortType: sort,
      sortValue: assignSortValue,
    });
  }
  getLeftPorts(
    reverseList,
    leftPageNumber,
    size,
    initialList,
    deleteList,
    saveList,
    exceptList,
    sort,
    sortvalue
  ) {
    return axios.post(ExportBrokers_Base_URL + "/fetchleftports", {
      pageNumber: leftPageNumber,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      reverseFlag: reverseList,
      initialList: initialList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      sort: sort,
      sortValue: sortvalue,
    });
  }
  getInitialList(id) {
    return axios.get(ExportBrokers_Base_URL + "/getportofentryfk/" + id);
  }
  getRightPorts(
    reverseList,
    assignedPageNumber,
    size,
    initialList,
    deleteList,
    saveList,
    exceptList,
    rightSort,
    rightSortValue
  ) {
    return axios.post(ExportBrokers_Base_URL + "/fetchrightports", {
      pageNumber: assignedPageNumber,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      initialList: initialList,
      reverseFlag: reverseList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      rightSortValue: rightSortValue,
      rightSort: rightSort,
    });
  }
  saveMemberPorts(id, initialList, deleteList, saveList, exceptList, reverseList) {
    return axios.post(ExportBrokers_Base_URL + "/savememberports", {
      initialList: initialList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      reverseFlag: reverseList,
      exportBrokerPK: id,
    });
  }
}
export default new ExportBrokersService();
