import {
  Customer_Base_URL,
  Dispatch_Restrictions_Base_URL,
  QuarterScreen_RecordsPerPage,
  SpecialCode_Base_URL,
  States_Base_URL,
} from "./constants/applicationConstants";
import { axios } from "../config/axiosInterceptors";

class DispatchRestrictionsService {
  fetchDispatchRestrictionsData(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag, driverId) {
    return axios.post(Dispatch_Restrictions_Base_URL + "/fetchdriverDispatchRestrictions", {
      searchCriteria,
      searchTerm,
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
      driverFK: driverId,
    });
  }

  getRecordById(id) {
    return axios.get(Dispatch_Restrictions_Base_URL + "/getDispatchRestrictionRecord/" + id);
  }
  createOrUpdateRecord(formData) {
    return axios.post(Dispatch_Restrictions_Base_URL + "/saveDispatchRestrctions", formData);
  }
  deleteRecord(id) {
    return axios.delete(Dispatch_Restrictions_Base_URL + "/deletebyid/" + id);
  }

  fetchCustomerAutoComplete(String) {
    return axios.post(Customer_Base_URL + "/getallcustomers", {
      active: 1,
      number: 0,
      size: 100,
      customers: null,
      searchCriteria: "Beginning",
      advanceSortingOrder: null,
      searchTerms: String,
      sortValue: null,
      sortType: false,
      selectedCustomerStatus: "Complete",
      type: "Autocomplete",
    });
  }
  fetchDealerByName(searchDealer) {
    return axios.post(Customer_Base_URL + "/fetchdealers", {
      active: 1,
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchDealer,
      selectedDealerStatus: "Complete",
      type: "AutocompleteByName",
    });
  }
  getSpecialCodeForAuto(string) {
    return axios.post(SpecialCode_Base_URL + "/specialCodesPage", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "Autocomplete",
      isOEPP: "Autocomplete",
    });
  }

  fetchPickupState(searchTerm) {
    return axios.post(States_Base_URL + "/allstates", {
      pageNumber: 0,
      size: 100,
      searchTerms: searchTerm,
      searchCriteria: "Beginning",
    });
  }
  checkCombination(driverId, customerId, dealerId, specialCodeId, stateCode) {
    return axios.post(Dispatch_Restrictions_Base_URL + "/comibationExist", {
      driverFK: driverId,
      customerFK: customerId,
      dealerFK: dealerId,
      specialCodeFK: specialCodeId,
      stateCode: stateCode,
    });
  }
}
export default new DispatchRestrictionsService();
