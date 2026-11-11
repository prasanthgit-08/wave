import { axios } from "../config/axiosInterceptors";
import {
  QuarterScreen_GroupsMaintenance_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
  UnitTypeGroup_Base_URL,
} from "../services/constants/applicationConstants";
class UnitTypeGroupsService {
  getUnitTypesGroupForAuto(unitTypeGroupPKS, string) {
    return axios.post(UnitTypeGroup_Base_URL + "/allunittype", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "AutoComplete",
      customerUnitTypeGroupFKS: unitTypeGroupPKS,
    });
  }
  //for maintenance
  getUnitTypeGroupFormaintenance(
    selectedSearchCriteria,
    searchTerms,
    unitTypeGroupPageNumber,
    normalSortFlag,
    normalSortValue
  ) {
    return axios.post(UnitTypeGroup_Base_URL + "/allunittype", {
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: unitTypeGroupPageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortType: normalSortFlag,
      sortValue: normalSortValue,
    });
  }

  getUnitTypeGroupForSupplementalRates(
    selectedSearchCriteria,
    searchTerms,
    unitTypeGroupPageNumber,
    normalSortValue,
    normalSortFlag,
    unitTypeGroupPKS
  ) {
    return axios.post(UnitTypeGroup_Base_URL + "/allunittype", {
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: unitTypeGroupPageNumber,
      size: 12,
      sortType: normalSortFlag,
      sortValue: normalSortValue,
      customerUnitTypeGroupFKS: unitTypeGroupPKS,
      customerPlantId: 9,
    });
  }
  getUnitTypeGroupForCustomerUTGroups(
    unitTypeGroupPageNumber,
    normalSortValue,
    normalSortFlag,
    unitTypeGroupPKS
  ) {
    return axios.post(UnitTypeGroup_Base_URL + "/allunittype", {
      searchCriteria: "Beginning",
      searchTerm: "",
      pageNumber: unitTypeGroupPageNumber,
      size: 12,
      sortType: normalSortFlag,
      sortValue: normalSortValue,
      customerUnitTypeGroupFKS: unitTypeGroupPKS,
    });
  }
  getRecord(id) {
    return axios.get(UnitTypeGroup_Base_URL + "/getunittypegroupdata/" + id);
  }

  getUnitTypeGroupForSupplementalRates(
    selectedSearchCriteria,
    searchTerms,
    unitTypeGroupPageNumber,
    normalSortFlag,
    normalSortValue,
    unitTypeGroupPKS
  ) {
    return axios.post(UnitTypeGroup_Base_URL + "/allunittype", {
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: unitTypeGroupPageNumber,
      size: 12,
      sortType: normalSortFlag,
      sortValue: normalSortValue,
      customerUnitTypeGroupFKS: unitTypeGroupPKS,
    });
  }
  getRecord(id) {
    return axios.get(UnitTypeGroup_Base_URL + "/getunittypegroupdata/" + id);
  }

  delete(id) {
    return axios.delete(UnitTypeGroup_Base_URL + "/deleteunittypegroup/" + id);
  }
  /*check unique description*/
  checkDescriptionExist(id, description) {
    return axios.post(UnitTypeGroup_Base_URL + "/checkdescriptionexist", {
      description,
      unitTypeGroupPK: id,
    });
  }

  save(savedata) {
    return axios.post(UnitTypeGroup_Base_URL + "/saveunittypegroups", savedata);
  }

  //Assigned Unit Types
  getAssignedUnitTypes(id, pageNo, sort, assignSortValue, radioValue) {
    let type = null;
    if (radioValue === "Towable") {
      type = 1;
    } else if (radioValue === "Motorized") {
      type = 0;
    }
    return axios.post(UnitTypeGroup_Base_URL + "/getassignedGroups", {
      unitTypeGroupPK: id,
      pageNumber: pageNo,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      sortType: sort,
      sortValue: assignSortValue,
      isTowable: type,
    });
  }
  //Leftside unitypes
  getLeftUnitTypes(
    reverseFlag,
    leftPageNumber,
    initialList,
    deleteList,
    saveList,
    exceptList,
    sortFlag,
    sortValue,
    radioValue
  ) {
    let type = 0;
    if (radioValue === "Towable") {
      type = 1;
    } else if (radioValue === "Motorized") {
      type = 0;
    }
    return axios.post(UnitTypeGroup_Base_URL + "/fetchleftunittypes", {
      pageNumber: leftPageNumber,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      reverseFlag: reverseFlag,
      initialList: initialList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      sort: sortFlag,
      sortValue: sortValue,
      isTowable: type,
    });
  }
  //Rightside unittype
  getRightUnitType(
    reverseList,
    assignedPageNumber,
    initialList,
    deleteList,
    saveList,
    exceptList,
    sort,
    assignSortValue,
    radioValue
  ) {
    let type = 0;
    if (radioValue === "Towable") {
      type = 1;
    } else if (radioValue === "Motorized") {
      type = 0;
    }
    return axios.post(UnitTypeGroup_Base_URL + "/fetchrightunittypes", {
      pageNumber: assignedPageNumber,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      initialList: initialList,
      reverseFlag: reverseList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      rightSortValue: assignSortValue,
      rightSort: sort,
      isTowable: type,
    });
  }

  getInitialList(id) {
    return axios.get(UnitTypeGroup_Base_URL + "/getunittypebyfk/" + id);
  }

  saveUnitTypeMembers(id, initialList, deleteList, saveList, exceptList, reverseFlag, radioValue) {
    let type = null;
    if (radioValue === "Towable") {
      type = 1;
    } else if (radioValue === "Motorized") {
      type = 0;
    }
    return axios.post(UnitTypeGroup_Base_URL + "/saveunittypemembers", {
      initialList: initialList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      reverseFlag: reverseFlag,
      unitTypeGroupPK: id,
      isTowable: type,
    });
  }
}
export default new UnitTypeGroupsService();
