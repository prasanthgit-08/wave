import { axios } from "../../config/axiosInterceptors";
import {
  DriverService_BASE_URL,
  HalfScreen_RecordsPerPage,
  Payment_Request_Base_URL,
} from "../constants/applicationConstants";
class PaymentRequestService {
  getPaymentRequestList(
    searchCriteria,
    searchTerm,
    pageNumber,
    sortValue,
    sortType,
    driverId,
    selectedStatus
  ) {
    return axios.post(Payment_Request_Base_URL + "/selection", {
      pageNumber: pageNumber,
      pageSize: HalfScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerms: searchTerm,
      sortType: sortType,
      sortValue: sortValue,
      driverId: driverId,
      filterParam: selectedStatus,
    });
  }

  getById(id) {
    return axios.post(Payment_Request_Base_URL + "/details", {
      driverPayRequestsPK: id,
    });
  }

  deleteByid(id) {
    return axios.post(Payment_Request_Base_URL + "/delete", {
      driverPayRequestsPK: id,
    });
  }

  createOrUpdateRecord(formData) {
    return axios.post(Payment_Request_Base_URL + "/save", formData);
  }

  getDispatchesForAuto(selectedSearchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(Payment_Request_Base_URL + "/dispatchesSelection", {
      searchCriteria: selectedSearchCriteria,
      searchTerms: searchTerms,
      pageNumber: pageNumber,
      pageSize: 12,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getAllUnitNumbersAuto(searchUnit) {
    return axios.post(Payment_Request_Base_URL + "/getAllUnitsDPU", {
      pageNumber: 0,
      pageSize: 100,
      searchCriteria: "Beginning",
      searchTerm: searchUnit,
      type: "Autocomplete",
      sortValue: null,
      sortType: false,
    });
  }

  getAllUnitNumbersFromDispatchesAuto(searchUnit) {
    return axios.post(Payment_Request_Base_URL + "/dispatchesSelection", {
      pageNumber: 0,
      pageSize: 1000,
      searchCriteria: "Beginning",
      searchTerms: searchUnit,
      sortValue: "UnitNumber",
      sortType: false,
    });
  }

  getAllDispatchesAuto(searchUnit) {
    return axios.post(Payment_Request_Base_URL + "/dispatchesSelection", {
      pageNumber: 0,
      pageSize: 100,
      searchCriteria: "Beginning",
      searchTerms: searchUnit,
      sortValue: "",
      sortType: false,
    });
  }

  getActiveDriver(pageNumber, firstName, lastName, sortValue, sortType) {
    return axios.post(DriverService_BASE_URL + "/fetchdriversForDriverService", {
      number: pageNumber,
      size: 100,
      firstName,
      lastName,
      active: true,
      activeString: "Active",
      deleased: null,
      recruited: true,
      sortValue,
      sortType,
      searchCriteria: "Beginning",
    });
  }
}
export default new PaymentRequestService();
