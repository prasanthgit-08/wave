import { axios } from "../config/axiosInterceptors";
import {
  Regions_Base_URL,
  QuarterScreen_RecordsPerPage,
  UndispatchedListingReport_Base_URL,
} from "./constants/applicationConstants";

class RegionService {
  // if size not specified it will be defaulted to 7(added for lookup)
  getRegions(pageNumber, searchTerm, searchCriteria, sortValue, sortFlag, size) {
    return axios.post(Regions_Base_URL + "/fetchregions", {
      pageNumber: pageNumber,
      size: size || QuarterScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      sortType: sortFlag,
      sortValue: sortValue,
    });
  }

  fetchRegionForUndispatchedListing(pageNumber, searchTerm, searchCriteria, sortValue, sortFlag, size, type) {
    return axios.post(UndispatchedListingReport_Base_URL + "regionLookup", {
      pageNumber: pageNumber,
      pageSize: size || QuarterScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      sortType: sortFlag,
      sortValue: sortValue,
      type: type,
    });
  }

  getById(Id) {
    return axios.get(Regions_Base_URL + "/getregion/" + Id);
  }
  deleteregion(Id) {
    return axios.delete(Regions_Base_URL + "/deleteregion/" + Id);
  }

  isValid(regionCode) {
    return axios.get(Regions_Base_URL + "/checkvalid/" + regionCode);
  }

  saveRegion(regionId, regionCode, description, addDate, addUserFk) {
    return axios.post(Regions_Base_URL + "/saveregion", {
      regionPK: regionId,
      regionCode: regionCode,
      description: description,
      addDate: addDate,
      addUserFk: addUserFk,
    });
  }
}
export default new RegionService();
