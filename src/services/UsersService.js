import { axios } from "../config/axiosInterceptors";
import {
  Driver_Dispatcher_Base_URL,
  FullScreen_RecordsPerPage,
  HalfScreen_RecordsPerPage,
  No_Of_Record_per_page,
  TripListingByCustomerReport_Base_URL,
  UnitExceptionReport_Base_URL,
  Users_Base_URL,
} from "./constants/applicationConstants";

class UsersService {
  getAllUsers(
    userStatus,
    pageNumber,
    users,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedUserStatus,
    type,
    userType,
    currentUserId,
    dispatchUserFilter,
    size
  ) {
    let active = null;
    if (userStatus === "Active") {
      active = 1;
    } else if (userStatus === "Inactive") {
      active = 0;
    } else {
      active = null;
    }
    let pseudoUser = null;
    if (selectedUserStatus === "Pseudo") {
      pseudoUser = 1;
    } else if (selectedUserStatus === "Actual") {
      pseudoUser = 0;
    } else {
      pseudoUser = null;
    }
    return axios.post(Users_Base_URL + "/getAllUsers", {
      active: active,
      pageNumber: pageNumber,
      size: size || HalfScreen_RecordsPerPage,
      users: users,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      pseudoUser: pseudoUser,
      type,
      userType,
      currentUserId,
      dispatchUserFilter: dispatchUserFilter ? "dispatchUserFilter" : undefined,
    });
  }

  isExistingLogin(id, login) {
    return axios.post(Users_Base_URL + "/isexistinglogin", {
      userPK: id,
      login,
    });
  }

  checkPasswordFormat(id, password) {
    return axios.post(Users_Base_URL + "/checkpasswordformat", {
      userPK: id,
      password,
    });
  }

  isExistingEmail(id, email) {
    return axios.post(Users_Base_URL + "/isexistingemail", {
      userPK: id,
      email,
    });
  }

  isExistingPhone(id, phone) {
    return axios.post(Users_Base_URL + "/isexistingphone", {
      userPK: id,
      phone,
    });
  }

  isExistingPhoneExtension(id, phoneExtension) {
    return axios.post(Users_Base_URL + "/isexistingphoneextension", {
      userPK: id,
      phoneExtension,
    });
  }

  isExistingOverrideCode(id, overrideCode) {
    return axios.post(Users_Base_URL + "/isexistingoverridecode", {
      userPK: id,
      overrideCode,
    });
  }

  activateUser(id) {
    return axios.put(Users_Base_URL + "/activateUsers", {
      userPK: id,
    });
  }

  deactivateUser(id) {
    return axios.put(Users_Base_URL + "/deactivateUsersForMaintenance", {
      userPK: id,
    });
  }

  getAllCustomers(searchTerms, pageNumber) {
    return axios.post(Users_Base_URL + "/getallcustomers", {
      active: true,
      searchCriteria: "Beginning",
      number: 0,
      size: No_Of_Record_per_page,
      searchTerms,
      pageNumber,
      selectedCustomerStatus: "Complete",
      type: "Autocomplete",
      // isOEPP: "AutocompleteByName",
    });
  }

  //nocallinReport
  async getAllDispatchUser({
    type = "AutoComplete",
    pageNumber = 0,
    pageSize = 15,
    searchCriteria = "Beginning",
    searchTerm,
    firstField,
    secondField,
    name,
    login,
    sortValue,
    sortType,
  }) {
    try {
      const res = await axios.post(Driver_Dispatcher_Base_URL + "/lookup", {
        type,
        pageNumber,
        pageSize,
        searchCriteria,
        searchTerm,
        firstField,
        secondField,
        name,
        login,
        sortValue,
        sortType,
      });
      return res;
    } catch (error) {
      console.error("Error in getAllDispatchUser:", error);
    }
  }

  //tripListingByCustomer Report
  async getAllUsersForTripListing({
    type = "AutoComplete",
    pageNumber = 0,
    pageSize = 15,
    searchCriteria = "Beginning",
    searchTerm,
    firstField,
    secondField,
    name,
    login,
    sortValue,
    sortType,
  }) {
    try {
      const res = await axios.post(TripListingByCustomerReport_Base_URL + "accountManagerLookup", {
        type,
        pageNumber,
        pageSize,
        searchCriteria,
        searchTerm,
        firstField,
        secondField,
        name,
        login,
        sortValue,
        sortType,
      });
      return res;
    } catch (error) {
      console.error("Error in getAllUsersForTripListing:", error);
    }
  }

  //tripListingByCustomer Report
  async getDispatcherForUnitException({
    type = "AutoComplete",
    pageNumber = 0,
    pageSize = 15,
    searchCriteria = "Beginning",
    searchTerm,
    firstField,
    secondField,
    name,
    login,
    sortValue,
    sortType,
  }) {
    try {
      const res = await axios.post(UnitExceptionReport_Base_URL + "dispatcherLookup", {
        type,
        pageNumber,
        pageSize,
        searchCriteria,
        searchTerm,
        firstField,
        secondField,
        name,
        login,
        sortValue,
        sortType,
      });
      return res;
    } catch (error) {
      console.error("Error in getAllUsersForTripListing:", error);
    }
  }

  getDispatcherUserByPermission(userPK) {
    return axios.post(Driver_Dispatcher_Base_URL + "/isDispatcherLogged", {
      userPK,
    });
  }

  getAllPlant(searchTerms, number) {
    return axios.post(Users_Base_URL + "/getallplant", {
      active: true,
      searchCriteria: "Beginning",
      number,
      size: No_Of_Record_per_page,
      searchTerms,
      selectedCustomerPlantStatus: "Complete",
      isOEPP: "Autocomplete",
      isDPUCustomer: false,
    });
  }

  getAllDealers(searchTerms, number) {
    return axios.post(Users_Base_URL + "/getalldealers", {
      active: true,
      searchCriteria: "Beginning",
      number,
      size: No_Of_Record_per_page,
      searchTerms,
      selectedDealerStatus: "Complete",
      isOEPP: "AutocompleteByName",
    });
  }

  getAllDrivers(searchTerm, number, deleased) {
    return axios.post(Users_Base_URL + "/getalldriver", {
      active: true,
      deleased,
      searchCriteria: "Beginning",
      number,
      firstName: searchTerm,
      searchTerm: searchTerm,
      size: No_Of_Record_per_page,
    });
  }

  fetchDivision() {
    return axios.get(Users_Base_URL + "/fetchdivision");
  }

  fetchReloadStateGroups(pageNumber, size, searchCriteria, sortField, sortValue) {
    return axios.post(Users_Base_URL + "/fetchreloadstategroups", {
      pageNumber,
      size,
      searchCriteria,
      sortField,
      sortValue,
    });
  }

  fetchPasswordRegex() {
    return axios.get(Users_Base_URL + "/fetchpasswordregex");
  }

  checkMasterExist() {
    return axios.get(Users_Base_URL + "/checkmasterexist");
  }

  fetchUserById(id) {
    return axios.get(Users_Base_URL + "/getuserbyid/" + id);
  }

  deleteUserData(id) {
    return axios.delete(Users_Base_URL + "/deleteuserbyid/" + id);
  }

  saveUserData(saveData) {
    return axios.post(Users_Base_URL + "/saveuser", saveData);
  }

  hasPermission(objectKey) {
    return axios.post(Users_Base_URL + "/userHasPermission", {
      permissionObjectKey: objectKey,
    });
  }
  hasOverridePermission(objectKey, overrideCode) {
    return axios.post(Users_Base_URL + "/userHasOverridePermission", {
      permissionObjectKey: objectKey,
      overrideCode,
    });
  }

  checkuniquesave(
    id,
    overrideCode,
    phoneExtensionNumber,
    directDialPhone,
    companyEmail,
    password,
    login,
    pseudo
  ) {
    return axios.post(Users_Base_URL + "/checkUniqueSave", {
      userPK: id,
      overrideCode,
      phoneExtension: phoneExtensionNumber,
      phone: directDialPhone,
      email: companyEmail,
      password,
      login,
      pseudoUser: pseudo,
    });
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new UsersService();
