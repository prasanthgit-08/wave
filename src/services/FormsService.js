import { axios } from "../config/axiosInterceptors";
import {
  Customer_Base_URL,
  Email_Processor_URL,
  Forms_Base_URL,
  StandardMaintenance_RecordsPerPage,
  UnitTypeGroup_Base_URL,
  UnitType_Base_URL,
} from "../services/constants/applicationConstants";
class FormsService {
  getFormsForMaintenance(searchTerms, searchCriteria, pageNumber, sortValue, sortFlag) {
    return axios.post(Forms_Base_URL + "/allformdata", {
      searchTerms,
      searchCriteria,
      pageNumber,
      size: StandardMaintenance_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }
  getFormsForLookup(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag, formTypeObjectKey) {
    return axios.post(Forms_Base_URL + "/allformdata", {
      searchCriteria,
      searchTerms,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      formTypeObjectKey: formTypeObjectKey,
    });
  }
  getFormsForAuto(string) {
    return axios.post(Forms_Base_URL + "/allformdata", {
      searchCriteria: "Beginning",
      searchTerms: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
    });
  }
  getRecord(id) {
    return axios.get(Forms_Base_URL + "/getFormById/" + id);
  }

  saveOrEditForm(data) {
    return axios.post(Forms_Base_URL + "/saveForm", data);
  }

  deleteFormById(id) {
    return axios.delete(Forms_Base_URL + "/deleteFormById/" + id);
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

  checkUniqueDescription(description, id) {
    return axios.post(Forms_Base_URL + "/uniqueDescription", {
      description: description,
      formPK: id,
    });
  }
  checkUniqueObjectKey(objectKey, id) {
    return axios.post(Forms_Base_URL + "/uniqueObjectKey", {
      objectKey: objectKey,
      formPK: id,
    });
  }

  getUnitTypeServiceForAuto(string, unitTypeGroupPKS) {
    return axios.post(UnitType_Base_URL + "/fetchUnitTypeData", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "AutoComplete",
      customerUnitTypeGroupFKS: unitTypeGroupPKS ? [unitTypeGroupPKS] : null,
      formsFlag: true,
    });
  }

  getUnitTypesGroupForAuto(unitTypeGroupPKS, string) {
    return axios.post(UnitTypeGroup_Base_URL + "/allunittype", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "AutoComplete",
      customerUnitTypeGroupFKS: unitTypeGroupPKS ? [unitTypeGroupPKS] : null,
      //customerUnitTypeGroupFK:customerUnitTypeGroupId,
      formsFlag: true,
    });
  }

  checkDirectoryExists(documentDirectoryRoot, formPK) {
    return axios.post(Forms_Base_URL + "/directoryexists", {
      formPK: formPK,
      documentDirectoryRoot: documentDirectoryRoot,
    });
  }

  generateForms(unitSelectionRequestVO) {
    return axios.post(Email_Processor_URL + "/compose", unitSelectionRequestVO);
  }

  checkUniqueSave(objectKey, description, id) {
    return axios.post(Forms_Base_URL + "/uniqueSave", {
      objectKey: objectKey,
      description: description,
      formPK: id,
    });
  }
}
export default new FormsService();
