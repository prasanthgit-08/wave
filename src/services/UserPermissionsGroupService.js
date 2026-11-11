import { axios } from "../config/axiosInterceptors";
import { UserPermissionGroup_Base_URL } from "./constants/applicationConstants";

class UserPermissionsGroupService {
  requestData(flag, initialList, saveList, deleteList, reverse, exceptionList, copyUserId, selectedUserId) {
    return axios.post(UserPermissionGroup_Base_URL + "/request-data", {
      type: flag,
      initialList: initialList || [],
      saveList: saveList || [],
      deleteList: deleteList || [],
      exceptionList: exceptionList || [],
      copyUser: copyUserId || 0,
      reverse,
      currentUser: selectedUserId || 0,
    });
  }

  save(permissionGroupList, user) {
    const data = {
      permissionGroupList: permissionGroupList,
      user: user,
    };
    return axios.post(UserPermissionGroup_Base_URL + "/save-data", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new UserPermissionsGroupService();
