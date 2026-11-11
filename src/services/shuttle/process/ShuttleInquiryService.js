import { axios } from "../../../config/axiosInterceptors";
import {
  Driver_Base_URL,
  UnitSelectionLookup_RecordsPerPage,
  Shuttle_Inquiry_Base_URL,
  Shuttle_Inquiry_CrossDB_URL,
  Report_Base_URL,
} from "../../constants/applicationConstants";

class ShuttleInquiryService {
  //Get all Shuttle data
  getAllShuttleData(shuttleInquiryVO) {
    return axios.post(Shuttle_Inquiry_Base_URL + "/getallshuttledata", shuttleInquiryVO);
  }

  //Fetch Driver name for Autocomplete
  fetchDriverDetailsByName(driverSearchStr) {
    return axios.post(Shuttle_Inquiry_Base_URL, {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: driverSearchStr,
      type: "Autocomplete",
      active: 1,
      url: "/yardcheckin/fetchDriverDetailsByName",
    });
  }
  /* Fetch driver For autoComplete */

  getAllDriversForAutocomplete = (driverSearchStr) => {
    return axios.post(Driver_Base_URL + "/fetchdriversforlookup", {
      searchTerm: driverSearchStr,
      statusType: "All",
      driverType: driverSearchStr ? (driverSearchStr?.trim().length === 0 ? "Shuttle" : "All") : "Shuttle",
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
    });
  };
  /**Fetch unit numbers */
  getAllUnitNumbers(unitNumberStr, unitLast5, driverFK, companyName, driverCompanyName, pageNumber, size) {
    return axios.post(Shuttle_Inquiry_CrossDB_URL + "/getAllUnitNumbers", {
      pageNumber: pageNumber,
      pageSize: size,
      searchCriteria: "Beginning",
      searchTerm: unitNumberStr,
      unitNumberLast5: unitLast5,
      selectedDriverFK: driverFK,
      companyName: companyName,
      type: "Autocomplete",
      shuttle: "Shuttle Inquiry",
      driverCompanyName: driverCompanyName,
    });
  }
  /**
   *  Fetch all active companies
   */
  getAllCompanyNames() {
    return axios.get(Shuttle_Inquiry_Base_URL + "/getAllCompanyNames");
  }
  getShuttleData(id) {
    return axios.post(Shuttle_Inquiry_CrossDB_URL + "/getshuttledata", {
      unitShuttlePK: Number(id),
    });
  }

  /**
   * Fetch Unit Numbers for Lookup
   */
  getAllUnitNumbersForLookup(
    globalSearchTerm,
    unitLast5,
    pageNumber,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortValue,
    normalSortFlag,
    unitType,
    orderType,
    dateType,
    dateFrom,
    dateTo,
    unitStatus,
    pickupBy,
    deliveryBy,
    unitOrderStatus,
    unitDelayType,
    dispatchDelayType,
    advancedSearchString,
    advancedSearchByInputs,
    customerId,
    customerPlantId,
    dealerId,
    driverFK,
    companyName,
    selectedDriverFK,
    driverCompanyName
  ) {
    return axios.post(Shuttle_Inquiry_CrossDB_URL + "/getAllUnitNumbers", {
      unitSelection: true,
      type: "Lookup",
      shuttle: "Shuttle Inquiry",
      searchTerm: globalSearchTerm,
      unitNumberLast5: unitLast5,
      pageNumber: pageNumber,
      pageSize: UnitSelectionLookup_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      units: advancedSearchPayload,
      advanceSortingOrder: advancedSortingOrder,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      unitTypeSearchCriteria: unitType,
      orderType: orderType,
      dateType: dateType,
      fromDate: dateFrom,
      toDate: dateTo,
      unitStatus: unitStatus,
      pickupBy: pickupBy,
      deliveryBy: deliveryBy,
      unitOrderStatus: unitOrderStatus,
      unitDelayType: unitDelayType,
      dispatchDelayType: dispatchDelayType,
      advancedSearchString: advancedSearchString,
      advancedSearchBy: advancedSearchByInputs,
      customerId: customerId,
      customerPlantsId: customerPlantId,
      dealerId: dealerId,
      driverFK: driverFK,
      selectedDriverFK: selectedDriverFK,
      companyName: companyName,
      driverCompanyName: driverCompanyName,
    });
  }

  //Get all Shuttle data
  getDataForShuttleInquiryExport(shuttleInquiryVO) {
    return axios.post(Report_Base_URL + "/generate", shuttleInquiryVO);
  }
}

export default new ShuttleInquiryService();
