import { axios } from "../config/axiosInterceptors";
import {
  AutoCompleteDropdown_No_Of_Records,
  Menu_Base_URL,
  MenuMaintenance_Base_URL,
  NormalLookupScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class MenuService {
  getAllMenu() {
    return axios.get(Menu_Base_URL);
  }

  getMenuListingForLookup(pageNumber, searchCriteria, searchTerm, sortValue, sortFlag) {
    return axios.post(MenuMaintenance_Base_URL + "/getAllMenus", {
      pageNumber: pageNumber,
      pageSize: NormalLookupScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      sortValue: sortValue,
      sortType: sortFlag,
      type: "Lookup",
    });
  }

  getMenuListingForAutoComplete(searchTerm) {
    return axios.post(MenuMaintenance_Base_URL + "/getAllMenus", {
      pageNumber: 0,
      pageSize: AutoCompleteDropdown_No_Of_Records,
      searchCriteria: "Beginning",
      searchTerm: searchTerm,
      sortValue: null,
      sortType: null,
      type: "Autocomplete",
    });
  }
}
export default new MenuService();
