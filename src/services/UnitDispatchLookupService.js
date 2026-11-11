/* eslint-disable import/no-anonymous-default-export */
import { axios } from "../config/axiosInterceptors";
import {
  UnitDispatchLookup_Base_URL_For_CrossDb,
  FullScreenLookup_RecordsPerPage,
} from "./constants/applicationConstants";

class UnitDispatchLookupService {
  getAllUnits(
    company,
    searchTerm,
    searchCriteria,
    last5,
    unitType,
    orderType,
    pickupBy,
    deliveryBy,
    sortValue,
    sortFlag,
    advancedSearchPayload,
    advancedSortingOrder,
    pageNumber,
    purgeDamageReturnUnitsFlag,
    companyPK
  ) {
    return axios.post(UnitDispatchLookup_Base_URL_For_CrossDb + "/listUnitsFromDispatch", {
      companyName: company,
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      unitTypeSearchCriteria: unitType,
      orderType: orderType,
      pickupBy: pickupBy,
      deliveryBy: deliveryBy,
      pageNumber: pageNumber,
      size: FullScreenLookup_RecordsPerPage,
      active: true,
      sortValue: sortValue,
      sortFlag: sortFlag,
      // type: "Autocomplete",
      unitNumberLast5: last5,
      // isInvoicing: true,
      advancedSortingOrder: advancedSortingOrder,
      unit: advancedSearchPayload,
      purgeDamageReturnUnitsFlag,
      companyPK,
    });
  }
  getAllUnitsForAutocomplete(
    company,
    searchTerm,
    last5,
    unitType,
    orderType,
    pickupBy,
    deliveryBy,
    advancedSearchPayload,
    advancedSortingOrder,
    purgeDamageReturnUnitsFlag
  ) {
    return axios.post(UnitDispatchLookup_Base_URL_For_CrossDb + "/listUnitsFromDispatch", {
      companyName: company,
      searchTerm: searchTerm,
      searchCriteria: "Beginning",
      unitTypeSearchCriteria: unitType,
      orderType: orderType,
      pickupBy: pickupBy,
      deliveryBy: deliveryBy,
      pageNumber: 0,
      size: 100,
      active: true,
      sortValue: "",
      sortFlag: false,
      // type: "Autocomplete",
      unitNumberLast5: last5,
      // isInvoicing: true,
      advancedSortingOrder: advancedSortingOrder,
      unit: advancedSearchPayload,
      purgeDamageReturnUnitsFlag,
      type: "Autocomplete",
    });
  }
}

export default new UnitDispatchLookupService();
