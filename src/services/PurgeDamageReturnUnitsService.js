import { axios } from "../config/axiosInterceptors";
import {
  DPU_Instructions_Base_URL,
  Invoicing_Base_URL_For_CrossDb,
  PurgeDamadeReturn_Base_URL,
  UnitDispatchLookup_Base_URL_For_CrossDb,
} from "./constants/applicationConstants";

class PurgeDamageReturnUnitsService {
  getAllCompanyNames() {
    return axios.get(PurgeDamadeReturn_Base_URL + "/getAllCompanyNames");
  }

  getPurgeDamageReturnRecords(
    searchCriteria,
    searchTerm,
    pageNumber,
    sortValue,
    sortFlag,
    selectionType,
    dispatchFK,
    updateFlag,
    searchUnitNumber,
    lastFive,
    companyPK
  ) {
    return axios.post(PurgeDamadeReturn_Base_URL + "/getPurgeDamageReturnUnitRecord", {
      pageNumber,
      pageSize: 6,
      sortValue: sortValue,
      sortType: sortFlag,
      selectionType: selectionType,
      dispatchFK: dispatchFK,
      updateFlag: updateFlag,
      searchUnitNumber: searchUnitNumber,
      lastFive: lastFive,
      companyPK: companyPK,
    });
  }

  getAllUnitNumbersAuto(searchUnit, unitLast5) {
    return axios.post(DPU_Instructions_Base_URL + "/getAllUnitsDPU", {
      pageNumber: 0,
      pageSize: 100,
      searchCriteria: "Beginning",
      searchTerm: searchUnit,
      unitNumberLast5: unitLast5,
      type: "Autocomplete",
      sortValue: null,
      sortType: false,
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
    purgeDamageReturnUnitsFlag,
    companyPK
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
      unitNumberLast5: last5,
      advancedSortingOrder: advancedSortingOrder,
      unit: advancedSearchPayload,
      purgeDamageReturnUnitsFlag,
      type: "Autocomplete",
      companyPK: companyPK,
    });
  }
}
export default new PurgeDamageReturnUnitsService();
