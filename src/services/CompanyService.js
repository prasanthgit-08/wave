import { axios } from "../config/axiosInterceptors";
import {
  AdvancedLookupScreen_RecordsPerPage,
  AutoCompleteDropdown_No_Of_Records,
  Company_Base_URL,
  Printer_Base_URL,
  Users_Base_URL,
} from "./constants/applicationConstants";

class CompanyService {
  getCompanyData() {
    return axios.get(Company_Base_URL + "/getLocalCompany");
  }

  getAllCompanyData() {
    return axios.get(`${Company_Base_URL}/getAllCompanyDetails`);
  }

  fetchPrinters(string, autoLookup) {
    return axios.post(Printer_Base_URL + "/getallprinters", {
      pageNumber: 0,
      size: 15,
      searchCriteria: "Beginning",
      searchTerms: string,
      sortValue: "",
      sortType: true,
      autoLookup: autoLookup,
    });
  }

  checkDirectoryExists(documentDirectoryRoot, CompanyPK) {
    return axios.post(Company_Base_URL + "/directoryexists", {
      documentDirectoryRoot: documentDirectoryRoot,
      CompanyPK: CompanyPK,
    });
  }

  updateCompanyData(companyData) {
    return axios.post(Company_Base_URL + "/saveCompany", companyData);
  }

  fetchUsers(string, label) {
    let typeForCompany = "";
    if (label === "systemAdmin") {
      typeForCompany = "companySystemAdmin";
    }
    if (label === "customerUser") {
      typeForCompany = "companyCustomerUser";
    }
    if (label === "dealerUser") {
      typeForCompany = "companyDealerUser";
    }
    if (label === "driverUser") {
      typeForCompany = "companyDriverUser";
    }
    if (label === "shuttleDriverUser") {
      typeForCompany = "companyShuttleDriverUser";
    }

    return axios.post(Users_Base_URL + "/getAllUsers", {
      active: true,
      pageNumber: 0,
      size: AutoCompleteDropdown_No_Of_Records,
      users: null,
      searchCriteria: "Beginning",
      advanceSortingOrder: null,
      searchTerms: string,
      sortValue: null,
      sortType: true,
      type: "Autocomplete",
      typeForCompany: typeForCompany,
    });
  }

  fetchUsersLookup(
    pageNumber,
    searchTerms,
    searchCriteria,
    searchedUser,
    sortValue,
    sortType,
    advanceSortingOrder,
    label
  ) {
    let typeForCompany = "";
    if (label === "systemAdmin") {
      typeForCompany = "companySystemAdmin";
    }
    if (label === "customerUser") {
      typeForCompany = "companyCustomerUser";
    }
    if (label === "dealerUser") {
      typeForCompany = "companyDealerUser";
    }
    if (label === "driverUser") {
      typeForCompany = "companyDriverUser";
    }
    if (label === "shuttleDriverUser") {
      typeForCompany = "companyShuttleDriverUser";
    }

    return axios.post(Users_Base_URL + "/getAllUsers", {
      active: true,
      pageNumber: pageNumber,
      size: AdvancedLookupScreen_RecordsPerPage,
      users: searchedUser,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortType,
      typeForCompany: typeForCompany,
    });
  }

  getMinimumPriority() {
    return axios.get(Company_Base_URL + "/minimumpriority");
  }

  getCompanyPKByName(companyName) {
    return axios.post(
      Company_Base_URL + "/getCompanyPK",
      companyName // ✅ Send company name directly in body
    );
  }
}
export default new CompanyService();
