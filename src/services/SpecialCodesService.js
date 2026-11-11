import { axios } from "../config/axiosInterceptors";
import { SpecialCode_Base_URL } from "./constants/applicationConstants";
import { QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";

class SpecialCodesService {
  getAllSpecialCodes(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag) {
    return axios.post(SpecialCode_Base_URL + "/specialCodesPage", {
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }
  getSpecialCodesById(Id) {
    return axios.get(SpecialCode_Base_URL + "/getSpecialCodeById/" + Id);
  }

  createSpecialCodes(form) {
    return axios.post(SpecialCode_Base_URL + "/specialcodes/save", form);
  }
  deleteSpecialCodes(id) {
    return axios.delete(SpecialCode_Base_URL + "/specialcodes/delete/" + id);
  }

  //For Customer Emails special code autocomplete
  getSpecialCodesForCustomerEmails() {
    return axios.get(SpecialCode_Base_URL + "/specialCodesPage");
  }

  checkCode(code, specialCodePK) {
    return axios.post(SpecialCode_Base_URL + "/uniquecode", {
      code: code,
      specialCodePK: specialCodePK,
    });
  }
  checkDescription(description, specialCodePK) {
    return axios.post(SpecialCode_Base_URL + "/uniqedescription", {
      description: description,
      specialCodePK: specialCodePK,
    });
  }

  getAllSpecialCodesForLookup(pageNumber, searchCriteria, searchTerms, sortValue, sortFlag) {
    return axios.post(SpecialCode_Base_URL + "/specialCodesPage", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: searchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      isOEPP: "Lookup",
      type: "Lookup",
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

  checkuniquesave(description, code, id) {
    return axios.post(SpecialCode_Base_URL + "/checkuniquesave", {
      description: description,
      code: code,
      specialCodePK: id,
    });
  }
}
export default new SpecialCodesService();
