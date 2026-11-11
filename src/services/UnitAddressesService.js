import React from "react";
import { axios } from "../config/axiosInterceptors";
import { Unit_Addresses_Base_URL } from "./constants/applicationConstants";

class UnitAddressesService {
  /**
   * Used for Misc Pickup tab & Misc Delivery tab Lookup - Order Entry.
   * Fetch all the dealers from UnitAddresses.
   *
   */
  fetchMiscDealer(
    pageNumber,
    UnitAddresses,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    showAdvanceSearch,
    showAdvanceSort,
    companyFK
  ) {
    return axios.post(Unit_Addresses_Base_URL + "/getListingDataBySP", {
      pagenumber: pageNumber,
      size: 15,
      unitAddresses: UnitAddresses,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerm: searchTerms,
      sortValue: sortValue || "",
      sortFlag: sortFlag,
      advanceSearch: showAdvanceSearch,
      advanceSort: showAdvanceSort,
      company: companyFK,
    });
  }
}

export default new UnitAddressesService();
