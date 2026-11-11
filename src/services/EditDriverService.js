import { axios } from "../config/axiosInterceptors";
import { Driver_Edit_File_Base_URL } from "./constants/applicationConstants";

class EditDriverService {
  //  Dispatcher Auto Complete
  getAllActiveNonPseudoUsers(searchTerm) {
    return axios.post(Driver_Edit_File_Base_URL + "/fetchActiveNonPseudoUsers", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: true,
      pseudoUser: 0,
    });
  }

  // Dispatcher Lookup
  getAllUsersForLookup(
    pageNumber,
    users,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    type,
    userType
  ) {
    return axios.post(Driver_Edit_File_Base_URL + "/fetchActiveNonPseudoUsers", {
      active: true,
      pageNumber: pageNumber,
      size: 15,
      users: users,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      pseudoUser: 0,
      type,
      userType,
    });
  }

  //Military Service Dropdown
  getMilitaryService() {
    return axios.get(Driver_Edit_File_Base_URL + "/getMilitaryServices");
  }

  //Transporation Dropdown
  getTransportation() {
    return axios.get(Driver_Edit_File_Base_URL + "/getTransportationValues");
  }

  // Get driver's data
  getDriverById(driverId) {
    return axios.get(Driver_Edit_File_Base_URL + "/getDriver/" + driverId);
  }

  // Get driver's data
  getDriverDispatchHoldData(driverId) {
    return axios.get(Driver_Edit_File_Base_URL + "/getDriverDispatchHoldData/" + driverId);
  }

  //Update driver's data
  updateDriver(selectedDriverFormData) {
    return axios.post(Driver_Edit_File_Base_URL + "/updateDriverData", selectedDriverFormData);
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new EditDriverService();
