import { axios } from "../config/axiosInterceptors";
import {
  UnitType_Base_URL,
  ThreeForthScreen_RecordsPerPage,
  HalfScreen_RecordsPerPage,
  UndispatchedListingReport_Base_URL,
  YardInventoryReport_Base_URL,
} from "./constants/applicationConstants";
class UnitTypeService {
  fetchUnitTypes(searchCriteria, searchTerm, pageNumber, selectedStatus, sortValue, sortFlag, size, props) {
    let activeStatus = null;
    if (selectedStatus === "Towable") {
      activeStatus = 1;
    } else if (selectedStatus === "Motorized") {
      activeStatus = 0;
    }
    return axios.post(UnitType_Base_URL + "/fetchUnitTypeData", {
      searchCriteria,
      searchTerm,
      pageNumber,
      size: size || HalfScreen_RecordsPerPage,
      towable: activeStatus,
      sortValue: sortValue,
      sortType: sortFlag,
      customerUnitTypeGroupFKS: props?.customerUnitTypeGroupId ? [props?.customerUnitTypeGroupId] : null,
      formsFlag: props?.formsFlag || null,
    });
  }

  getRecord(id) {
    return axios.get(UnitType_Base_URL + "/getUnitTypeRecord/" + id);
  }
  createOrUpdateRecord(formData) {
    return axios.post(UnitType_Base_URL + "/saveUnitType", formData);
  }

  deleteUnitTypeRecord(id) {
    return axios.delete(UnitType_Base_URL + "/deletebyid/" + id);
  }
  checkUnitCodeExist(id, string) {
    return axios.post(UnitType_Base_URL + "/unitcodeexists", {
      unitTypePK: id,
      unitCode: string,
    });
  }
  checkDescriptionExist(id, string) {
    return axios.post(UnitType_Base_URL + "/descriptionexists", {
      unitTypePK: id,
      descriptionLong: string,
    });
  }

  getUnitTypeServiceForAuto(string) {
    return axios.post(UnitType_Base_URL + "/fetchUnitTypeData", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "AutoComplete",
    });
  }

  checkuniquesave(unitCode, description, id) {
    return axios.post(UnitType_Base_URL + "/checkuniquesave", {
      unitCode: unitCode,
      descriptionLong: description,
      unitTypePK: id,
    });
  }

  fetchUndispatchedListing(
    searchCriteria,
    searchTerm,
    pageNumber,
    selectedStatus,
    sortValue,
    sortFlag,
    size,
    type
  ) {
    return axios.post(UndispatchedListingReport_Base_URL + "unitTypesLookup", {
      searchCriteria,
      searchTerm,
      pageNumber,
      pageSize: size || HalfScreen_RecordsPerPage,
      unitTypeSearchCriteria: selectedStatus,
      sortValue: sortValue,
      sortType: sortFlag,
      type: type,
    });
  }

  fetchUnitTypeYardInventory({
    searchCriteria = "Beginning",
    searchTerms,
    pageNumber = 0,
    unitTypeSearchCriteria,
    sortValue = "",
    sortFlag = false,
    pageSize,
    resultType,
  }) {
    return axios.post(YardInventoryReport_Base_URL + "lookup", {
      type: "UNITTYPE",
      searchCriteria,
      searchTerm: searchTerms,
      pageNumber,
      pageSize: pageSize || HalfScreen_RecordsPerPage,
      unitType: unitTypeSearchCriteria,
      sortValue: sortValue,
      sortType: sortFlag,
      resultType: resultType,
    });
  }
}
export default new UnitTypeService();
