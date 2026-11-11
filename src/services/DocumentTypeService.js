import { axios } from "../config/axiosInterceptors";
import { DocumentTypes_Base_URL, QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";
class DocumentTypeService {
  getDocumentTypeForLookup(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(DocumentTypes_Base_URL + "/lookup", {
      searchCriteria,
      searchTerms,
      pageNumber,
      pageSize: QuarterScreen_RecordsPerPage,
      sortValue: sortValue || "",
      sortType: sortFlag,
    });
  }

  getDocumentTypeForAutoComplete(string) {
    return axios.post(DocumentTypes_Base_URL + "/lookup", {
      searchCriteria: "Beginning",
      searchTerms: string,
      pageNumber: 0,
      pageSize: 100,
      sortValue: "",
      sortType: false,
      type: "Autocomplete",
    });
  }
}
export default new DocumentTypeService();
