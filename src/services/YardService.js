import { axios } from "../config/axiosInterceptors";
import {
  AutoCompleteDropdown_No_Of_Records,
  HalfScreen_RecordsPerPage,
  UndispatchedListingReport_Base_URL,
  UnitExceptionReport_Base_URL,
  Yard_Base_URL,
  YardInventoryReport_Base_URL,
} from "./constants/applicationConstants";
import { No_Of_Record_per_page } from "./constants/applicationConstants";
import { Users_Base_URL } from "./constants/applicationConstants";
class YardService {
  getAllYards(selectedSearchCriteria, searchTerm, pageNumber, active, sortValue, sortFlag, yardPKList) {
    let status = null;
    if (active === "Active") {
      status = 1;
    } else if (active === "Inactive") {
      status = 0;
    }
    return axios.post(Yard_Base_URL + "/allyards", {
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber: pageNumber,
      active: status,
      size: HalfScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
      yardPKList: yardPKList,
    });
  }

  getPickupYards(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, size, type) {
    return axios.post(UndispatchedListingReport_Base_URL + "yardLookup", {
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber: pageNumber,
      pageSize: size,
      sortValue: sortValue,
      sortType: sortFlag,
      type: type,
    });
  }

  //unitException Report
  getPickupYardForUnitException(
    selectedSearchCriteria,
    searchTerm,
    pageNumber,
    sortValue,
    sortFlag,
    size,
    type
  ) {
    return axios.post(UnitExceptionReport_Base_URL + "yardLookup", {
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber: pageNumber,
      pageSize: size,
      sortValue: sortValue,
      sortType: sortFlag,
      type: type,
    });
  }

  //yardInventoty Report
  getYardForYardInventory({
    searchCriteria = "Beginning",
    searchTerm,
    pageNumber = 0,
    sortValue = "",
    sortFlag = false,
    pageSize,
    resultType,
  }) {
    return axios.post(YardInventoryReport_Base_URL + "lookup", {
      type: "PICKUP_YARD",
      searchCriteria,
      searchTerm,
      pageNumber,
      pageSize,
      sortValue,
      sortType: sortFlag,
      resultType,
    });
  }

  getYardById(Id) {
    return axios.get(Yard_Base_URL + "/getyardbyid/" + Id);
  }

  createYard(saveData) {
    return axios.post(Yard_Base_URL, saveData);
  }
  deleteYard(id) {
    return axios.delete(Yard_Base_URL + "/delete/" + id);
  }
  activateYard(id) {
    return axios.post(Yard_Base_URL + "/toggleactive", {
      yardPK: id,
    });
  }

  getYardsForLookup(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, active) {
    let status = null;
    if (active === "Active") {
      status = 1;
    } else if (active === "Inactive") {
      status = 0;
    }
    return axios.post(Yard_Base_URL + "/allyards", {
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber: pageNumber,
      active: status,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  deactivateYard(id) {
    return axios.post(Yard_Base_URL + "/toggleactive", {
      yardPK: id,
    });
  }
  descriptionExistCheck(description, yardPK) {
    return axios.post(Yard_Base_URL + "/descriptionexistcheck", {
      description,
      yardPK,
    });
  }

  //Dealer Autocomplete
  getAllDealers(searchTerm) {
    return axios.post(Yard_Base_URL + "/fetchalldealers", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      isOEPP: "AutocompleteByName",
      selectedDealerStatus: "Complete",
      active: true,
      pageNumber: 0,
      size: 100,
    });
  }
  //Printer Lookup
  fetchPrinterDetails(pageNumberPrinterLookup, selectedSearchCriteria, searchTerm, sortValue, sortFlag) {
    return axios.post(Yard_Base_URL + "/fetchprinter", {
      pageNumber: pageNumberPrinterLookup,
      searchCriteria: selectedSearchCriteria,
      searchTerms: searchTerm,
      size: 12,
      // autoLookup: "Autocomplete",
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }
  //Printer Autocomplete
  getAllYPrinter(searchTerm) {
    return axios.post(Yard_Base_URL + "/fetchprinter", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      autoLookup: "Autocomplete",
    });
  }
  //User Autocomplete
  getAllDispatchUserData(searchTerm) {
    return axios.post(Yard_Base_URL + "/fetchallusers", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: true,
      dispatchUserFilter: "dispatchUserFilter",
    });
  }

  //User Autocomplete
  getAllUsersWithActiveDriversUserFilter(searchTerm) {
    return axios.post(Yard_Base_URL + "/fetchallusers", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: true,
      activeDriversUserFilter: "activeDriversUserFilter",
    });
  }

  //User Autocomplete
  getAllUserData(searchTerm) {
    return axios.post(Yard_Base_URL + "/fetchallusers", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: true,
    });
  }
  //user data by id
  getUserById(Id) {
    return axios.get(Users_Base_URL + "/getuserbyid/" + Id);
  }

  //get yard by name
  getShuttleYardByName(yardName) {
    return axios.post(Yard_Base_URL + "/fetchshuttleyardbyname", {
      name: yardName,
    });
  }

  getAllYardsForAutoComplete(searchTerm) {
    return axios.post(Yard_Base_URL + "/allyards", {
      searchCriteria: "Beginning",
      searchTerm,
      pageNumber: 0,
      active: 1,
      size: AutoCompleteDropdown_No_Of_Records,
    });
  }

  //User Autocomplete for available driver list report
  getAllDispatchUserData(searchTerm) {
    return axios.post(Yard_Base_URL + "/fetchallusers", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: true,
      dispatchUserFilter: "dispatchUserFilter",
    });
  }

  checkYardCode(sisterYardCode, id) {
    return axios.post(Yard_Base_URL + "/sisteryardcodeexist", {
      sisterYardCode: sisterYardCode,
      yardPK: id,
    });
  }
}
export default new YardService();
