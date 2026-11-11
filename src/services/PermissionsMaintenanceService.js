/* eslint-disable import/no-anonymous-default-export */
import { axios } from "../config/axiosInterceptors";
import { HalfScreen_RecordsPerPage, PermissionsMaintenance_Base_URL } from "./constants/applicationConstants";

class PermissionsMaintenanceService {
  getAll(
    searchTerm,
    searchCriteria,
    searchCriteria2,
    searchCriteria3,
    pageNumber,
    sortValue,
    sortFlag,
    advancedSearchPayload,
    advanceSortingOrder
  ) {
    return axios.post(`${PermissionsMaintenance_Base_URL}/getAllPermissions`, {
      pageNumber: pageNumber,
      pageSize: HalfScreen_RecordsPerPage,
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      searchCriteria2: searchCriteria2,
      searchCriteria3: searchCriteria3,
      sortValue: sortValue,
      sortType: sortFlag,
      advanceSortingOrder: advanceSortingOrder,
      searchByDescription: advancedSearchPayload?.description,
      searchByObjectKey: advancedSearchPayload?.objectKey,
    });
  }

  getPermissionById(id) {
    return axios.get(`${PermissionsMaintenance_Base_URL}/getPermissionById/${id}`);
  }

  checkUniqueDescription(description, id) {
    return axios.post(`${PermissionsMaintenance_Base_URL}/isDescriptionUnique`, {
      permissionPK: id,
      description: description,
    });
  }

  checkUniqueObjectKey(objectKey, id) {
    return axios.post(`${PermissionsMaintenance_Base_URL}/isObjectKeyUnique`, {
      permissionPK: id,
      objectKey: objectKey,
    });
  }

  savePermission(permissionsPayload) {
    return axios.post(`${PermissionsMaintenance_Base_URL}/savePermission`, permissionsPayload);
  }

  deletePermissionById(id) {
    return axios.delete(`${PermissionsMaintenance_Base_URL}/deletePermissionById/${id}`);
  }

  checkUniqueSave(description, objectKey, id) {
    return axios.post(`${PermissionsMaintenance_Base_URL}/isSaveUnique`, {
      permissionPK: id,
      objectKey: objectKey,
      description: description,
    });
  }
}

export default new PermissionsMaintenanceService();
