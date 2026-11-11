import { axios } from "../config/axiosInterceptors";
import { UserPermission_Base_URL } from "./constants/applicationConstants";

class UserPermissionsService {
  getBrowse(pageNumber, searchCriteria, searchTerms, sortValue, sortFlag, type, status, category, userPk) {
    return axios.post(UserPermission_Base_URL + "/get-browse-list", {
      pageNumber: pageNumber,
      size: 16,
      searchCriteria: searchCriteria,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type,
      userPK: userPk,
      status: status,
      category: category,
    });
  }
  updatePermissions(editList) {
    return axios.post(`${UserPermission_Base_URL}/update`, editList);
  }
}
export default new UserPermissionsService();
