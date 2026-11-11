import { axios } from "../config/axiosInterceptors";
import { QuarterScreen_RecordsPerPage, Terms_Base_URL } from "./constants/applicationConstants";

class TermsService {
  addTerms(termsId, description, terms, invoiceDays, passportTermsCode) {
    return axios.post(Terms_Base_URL + "/addTerms", {
      termsPK: termsId,
      description: description,
      terms: terms,
      invoiceDays: invoiceDays,
      passportTermsCode: passportTermsCode,
    });
  }

  deleteTerms(Id) {
    return axios.delete(Terms_Base_URL + "/deleteTerms/" + Id);
  }

  saveTerms(termsId, description, terms, invoiceDays, passportTermsCode) {
    return axios.put(Terms_Base_URL + "/saveTerms", {
      termsPK: termsId,
      description: description,
      terms: terms,
      invoiceDueDays: invoiceDays,
      termsCode: passportTermsCode,
    });
  }

  getAllTerms(searchCriteria, searchTerm, pageNumber, normalSortValue, normalSortFlag) {
    return axios.post(Terms_Base_URL + "/fetchTerms", {
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
    });
  }
  fetchAllTerms(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag, size) {
    return axios.post(Terms_Base_URL + "/fetchTerms", {
      searchCriteria,
      searchTerm,
      pageNumber,
      sortValue: sortValue,
      sortType: sortFlag,
      size: size ? size : QuarterScreen_RecordsPerPage,
    });
  }

  getTermsById(Id) {
    return axios.get(Terms_Base_URL + "/getTerms/" + Id);
  }

  checkDescription(description, termsPK) {
    return axios.post(Terms_Base_URL + "/uniquedescription", {
      description: description,
      termsPK: termsPK,
    });
  }

  checkPassport(termsCode, termsPK) {
    return axios.post(Terms_Base_URL + "/uniquecode", {
      termsCode: termsCode,
      termsPK: termsPK,
    });
  }

  checkTerms(terms, termsPK) {
    return axios.post(Terms_Base_URL + "/uniqueterms", {
      terms: terms,
      termsPK: termsPK,
    });
  }
  checkUniqueSave(terms, description, termsPK, termsCode) {
    return axios.post(Terms_Base_URL + "/checkUniqueSave", {
      terms: terms,
      description: description,
      termsPK: termsPK,
      termsCode: termsCode,
    });
  }
}
export default new TermsService();
