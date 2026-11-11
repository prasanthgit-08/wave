import { axios } from "../config/axiosInterceptors";
import {
  PermissionGroups_Base_URL,
  QuarterScreen_GroupsMaintenance_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class PermissionGroupService {
  getAllPermissionGroups(selectedSearchCriteria, searchTerms, pageNumber, normalSortFlag, normalSortValue) {
    return axios.post(PermissionGroups_Base_URL + "/getAllPermissionGroups", {
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: pageNumber,
      pageSize: QuarterScreen_RecordsPerPage,
      sortType: normalSortFlag,
      sortValue: normalSortValue,
    });
  }

  getRecord(id) {
    return axios.get(`${PermissionGroups_Base_URL}/getPermissionGrpById/${id}`, {
      userPK: 10,
    });
  }

  //Assigned Permission
  getAssignedPermission(id, pageNo, sortFlag, assignSortValue) {
    return axios.post(PermissionGroups_Base_URL + "/getPermissionsByGrp", {
      permissionGroupPK: id,
      pageNumber: pageNo,
      pageSize: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      sortType: sortFlag,
      sortValue: assignSortValue,
    });
  }

  /*check unique description*/
  checkDescriptionExist(id, description) {
    return axios.post(PermissionGroups_Base_URL + "/isDescriptionUnique", {
      description,
      permissionGroupPK: id,
    });
  }

  save(savedata) {
    return axios.post(PermissionGroups_Base_URL + "/savePermissionGroup", savedata);
  }

  delete(id) {
    return axios.delete(PermissionGroups_Base_URL + "/deletePermissionGrpById/" + id);
  }

  //Leftside Permission(Unassigned)
  getLeftPermissions(
    reverseFlag,
    leftPageNumber,
    initialList,
    deleteList,
    saveList,
    exceptList,
    sortFlag,
    sortValue
  ) {
    return axios.post(PermissionGroups_Base_URL + "/fetchLeftPermissions", {
      pageNumber: leftPageNumber,
      pageSize: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      reverseFlag: reverseFlag,
      initialList: initialList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      sortType: sortFlag,
      sortValue: sortValue,
    });
  }
  //Rightside Permission(assigned)
  getRightPermission(
    reverseList,
    assignedPageNumber,
    initialList,
    deleteList,
    saveList,
    exceptList,
    sort,
    assignSortValue
  ) {
    return axios.post(PermissionGroups_Base_URL + "/fetchRightPermissions", {
      pageNumber: assignedPageNumber,
      pageSize: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      initialList: initialList,
      reverseFlag: reverseList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      rightSortValue: assignSortValue,
      rightSort: sort,
    });
  }

  savePermissionsGroupMembers(
    id,
    initialList,
    deleteList,
    saveList,
    exceptList,
    modifiedPermissionList,
    reverseFlag
  ) {
    return axios.post(PermissionGroups_Base_URL + "/savePermissions", {
      initialList: initialList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      reverseFlag: reverseFlag,
      permissionGroupPK: id,
      modifiedPermissionList: modifiedPermissionList,
    });
  }

  getInitialList(id) {
    return axios.get(PermissionGroups_Base_URL + "/getPermissionKeysOfGroup/" + id);
  }
}
export default new PermissionGroupService();
