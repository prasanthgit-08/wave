import { axios } from "../config/axiosInterceptors";
import {
  AutoCompleteDropdown_No_Of_Records,
  CheckPayTo_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class CheckPayToService {
  getAllcheckPayTo(selectedSearchCriteria, searchTerms, pageNumber, sortValue, sortFlag, size) {
    return axios.post(CheckPayTo_Base_URL + "/checkPayTo/getallcheckPayTo", {
      searchCriteria: selectedSearchCriteria,
      searchTerms: searchTerms,
      pageNumber: pageNumber,
      size: size || QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }
  getCheckPayToById(Id) {
    return axios.get(CheckPayTo_Base_URL + "/getCheckPayTo/" + Id);
  }

  saveCheckPayTo(saveData) {
    return axios.post(CheckPayTo_Base_URL + "/checkPayTo/savecheckPayTo", saveData);
  }
  deleteCheckPayTo(id) {
    return axios.delete(CheckPayTo_Base_URL + "/deletecheckPayTo/" + id);
  }

  checkDescriptionExist(description, checkPayToPK) {
    return axios.post(CheckPayTo_Base_URL + "/checkPayTo/checkdescription", {
      description: description,
      checkPayToPK: checkPayToPK,
    });
  }

  fetchCheckPayToAutoComplete(string) {
    return axios.post(CheckPayTo_Base_URL + "/checkPayTo/getallcheckPayTo", {
      searchCriteria: "Beginning",
      searchTerms: string,
      pageNumber: 0,
      size: AutoCompleteDropdown_No_Of_Records,
      sortValue: null,
      sortType: false,
      type: "Autocomplete",
    });
  }
}
export default new CheckPayToService();
