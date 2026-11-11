import { axios } from "../config/axiosInterceptors";
import { FormTypes_Base_URL, QuarterScreen_RecordsPerPage } from "../services/constants/applicationConstants";
class FormTypesService {
  getFormTypesForMaintenance(searchTerms, searchCriteria, pageNumber, sortValue, sortFlag) {
    return axios.post(FormTypes_Base_URL + "/allFormTypeData", {
      searchTerms,
      searchCriteria,
      pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getFormsTypesForLookup(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(FormTypes_Base_URL + "/allFormTypeData", {
      searchCriteria,
      searchTerms,
      pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getFormsTypeForAuto(string) {
    return axios.post(FormTypes_Base_URL + "/allFormTypeData", {
      searchCriteria: "Beginning",
      searchTerms: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "Autocomplete",
    });
  }
  getRecord(id) {
    return axios.get(FormTypes_Base_URL + "/getFormTypeById/" + id);
  }

  saveOrEditFormType(data) {
    return axios.post(FormTypes_Base_URL + "/saveFormType", data);
  }

  deleteFormType(id) {
    return axios.delete(FormTypes_Base_URL + "/deleteFormType/" + id);
  }

  checkUniqueDescription(id, string) {
    return axios.post(FormTypes_Base_URL + "/uniqueDescription", {
      formTypePK: id,
      description: string,
    });
  }

  checkUniqueObjectkey(id, string) {
    return axios.post(FormTypes_Base_URL + "/uniqueObjectKey", {
      formTypePK: id,
      objectKey: string,
    });
  }
}
export default new FormTypesService();
