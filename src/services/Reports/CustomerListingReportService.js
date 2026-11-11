import { axios } from "../../config/axiosInterceptors";
import {
  CustomerListingReport_Base_URL,
  Customer_Base_URL,
  AdvancedLookupScreen_RecordsPerPage,
} from "../constants/applicationConstants";

class CustomerListingReportService {
  getUserList({
    searchCriteria = "Beginning",
    searchTerm = "",
    pageNumber = 0,
    pageSize = AdvancedLookupScreen_RecordsPerPage,
    sortValue = "",
    sortType = false,
    type = "LookUp",
    firstField = "",
    secondField = "",
    name = "",
    login = "",
  }) {
    return axios.post(CustomerListingReport_Base_URL + "/accountManagerLookup", {
      searchCriteria,
      searchTerm,
      pageNumber,
      pageSize,
      sortValue,
      sortType,
      type,
      firstField,
      secondField,
      name,
      login,
    });
  }

  getCustomerList({
    plantPK = null,
    accountManagerFK = null,
    customerState = "",
    searchCriteria = "Beginning",
    searchTerm = "",
    pageNumber = 0,
    pageSize = AdvancedLookupScreen_RecordsPerPage,
    sortValue = "",
    sortType = false,
    type = "LookUp",
    // type = "AutoComplete",
    firstField = "",
    secondField = "",
    thirdField = "",
    name = "",
    city = "",
    stateCode = "",
  }) {
    return axios.post(CustomerListingReport_Base_URL + "/customerLookup", {
      plantPK,
      accountManagerFK,
      customerState,
      searchCriteria,
      searchTerm,
      pageNumber,
      pageSize,
      sortValue,
      sortType,
      type,
      firstField,
      secondField,
      thirdField,
      name,
      city,
      stateCode,
    });
  }

  getPlantList({
    customerPK = null,
    customerState = "",
    searchCriteria = "Beginning",
    searchTerm = "",
    pageNumber = 0,
    pageSize = AdvancedLookupScreen_RecordsPerPage,
    sortValue = "",
    sortType = false,
    type = "LookUp",
    firstField = "",
    secondField = "",
    thirdField = "",
    name = "",
    brand = "",
    productLine = "",
  }) {
    return axios.post(CustomerListingReport_Base_URL + "/plantLookup", {
      customerPK,
      customerState,
      searchCriteria,
      searchTerm,
      pageNumber,
      pageSize,
      sortValue,
      sortType,
      type,
      firstField,
      secondField,
      thirdField,
      name,
      brand,
      productLine,
    });
  }

  getCustomerStateCodeList({ customerPK = null }) {
    return axios.post(CustomerListingReport_Base_URL + "/statesLookup", {
      customerPK,
    });
  }
}

export default new CustomerListingReportService();
