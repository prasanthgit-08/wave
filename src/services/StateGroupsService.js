import { axios } from "../config/axiosInterceptors";
import {
  QuarterScreen_GroupsMaintenance_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
  StateGroups_Base_URL,
} from "../services/constants/applicationConstants";
class StateGroupsService {
  getStateGroupForLookup(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(StateGroups_Base_URL + "/allstategroups", {
      searchCriteria,
      searchTerms,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  //For maintenance
  getStateGroupForMaintenance(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(StateGroups_Base_URL + "/allstategroups", {
      searchCriteria,
      searchTerms,
      pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }
  getStateGroupForAuto(string) {
    return axios.post(StateGroups_Base_URL + "/allstategroups", {
      searchCriteria: "Beginning",
      searchTerms: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "AutoComplete",
    });
  }
  getRecord(id) {
    return axios.get(StateGroups_Base_URL + "/getStateGroupById/" + id);
  }

  createStateGrops(saveData) {
    return axios.post(StateGroups_Base_URL + "/save", saveData);
  }

  DescriptionExist(description, id) {
    return axios.post(StateGroups_Base_URL + "/checkdescriptionexist", {
      stateGroupPK: id,
      description: description,
    });
  }
  delete(id) {
    return axios.delete(StateGroups_Base_URL + "/delete/" + id);
  }
  //Assigned states
  getAssignedStates(id, assignedPageNo, sort, assignSortValue) {
    return axios.post(StateGroups_Base_URL + "/getassignedstates", {
      stateGroupPK: id,
      pageNumber: assignedPageNo,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      sortType: sort,
      sortValue: assignSortValue,
    });
  }
  //Leftside states
  getLeftStates(
    reverseFlag,
    leftPageNumber,
    initialList,
    deleteList,
    saveList,
    exceptList,
    sortFlag,
    sortValue
  ) {
    return axios.post(StateGroups_Base_URL + "/fetchleftstates", {
      pageNumber: leftPageNumber,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      reverseFlag: reverseFlag,
      initialList: initialList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      sort: sortFlag,
      sortValue: sortValue,
    });
  }
  //Rightside states
  getRightStates(
    reverseList,
    assignedPageNumber,
    initialList,
    deleteList,
    saveList,
    exceptList,
    sort,
    assignSortValue
  ) {
    return axios.post(StateGroups_Base_URL + "/fetchrightstates", {
      pageNumber: assignedPageNumber,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      initialList: initialList,
      reverseFlag: reverseList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      rightSortValue: assignSortValue,
      rightSort: sort,
    });
  }

  getInitialList(id) {
    return axios.get(StateGroups_Base_URL + "/getstatebyfk/" + id);
  }

  saveMemberStates(id, initialList, deleteList, saveList, exceptList, reverseFlag) {
    return axios.post(StateGroups_Base_URL + "/savememberstates", {
      initialList: initialList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      reverseFlag: reverseFlag,
      stateGroupPK: id,
    });
  }
  getRecordById(id) {
    return axios.get(StateGroups_Base_URL + "/getrecordbyid/" + id);
  }
}
export default new StateGroupsService();
