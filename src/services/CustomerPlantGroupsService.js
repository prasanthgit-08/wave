import { axios } from "../config/axiosInterceptors";
import {
  CustomerPlantGroup_Base_URL,
  Customer_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class CustomerPlantGroupsService {
  getAllPlantGroups(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortType, size) {
    return axios.post(CustomerPlantGroup_Base_URL + "/allCustomerPlantGroupdata", {
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber: pageNumber,
      sortValue: sortValue,
      sortType: sortType,
      size: size ? size : QuarterScreen_RecordsPerPage,
    });
  }
  getPlantGroupById(Id) {
    return axios.get(CustomerPlantGroup_Base_URL + "/getcustomerplantgroup/" + Id);
  }
  createPlantGroups(saveData) {
    return axios.post(CustomerPlantGroup_Base_URL + "/saveplantgroup", saveData);
  }

  deleteRecord(id) {
    return axios.delete(CustomerPlantGroup_Base_URL + "/deleteplantgroup/" + id);
  }

  checkDescriptionExist(description) {
    return axios.post(CustomerPlantGroup_Base_URL + "/checkdescriptionexist", {
      description,
    });
  }

  fetchCustomerAutoComplete(String) {
    return axios.post(Customer_Base_URL + "/getallcustomers", {
      active: 1,
      number: 0,
      size: 100,
      customers: null,
      searchCriteria: "Beginning",
      advanceSortingOrder: null,
      searchTerms: String,
      sortValue: null,
      sortType: false,
      selectedCustomerStatus: "Complete",
      type: "Autocomplete",
      usePlants: true,
    });
  }
  getAllPlants(Id) {
    return axios.get(CustomerPlantGroup_Base_URL + "/getplantnamebycustomergroupfk/" + Id);
  }
  getInitialPlants(id) {
    return axios.get(CustomerPlantGroup_Base_URL + "/getplantbyfk/" + id);
  }

  getLeftPlants(
    reverseFlag,
    leftPageNumber,
    initialList,
    deleteList,
    saveList,
    exceptList,
    sortFlag,
    sortValue,
    customerId
  ) {
    return axios.post(CustomerPlantGroup_Base_URL + "/fetchleftplants", {
      pageNumber: leftPageNumber,
      size: 11,
      reverseFlag: reverseFlag,
      initialList: initialList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      sort: sortFlag,
      sortValue: sortValue,
      customerId,
    });
  }
  getRightPlants(
    reverseList,
    assignedPageNumber,
    initialList,
    deleteList,
    saveList,
    exceptList,
    sort,
    assignSortValue,
    customerId
  ) {
    return axios.post(CustomerPlantGroup_Base_URL + "/fetchrightplants", {
      pageNumber: assignedPageNumber,
      size: 11,
      initialList: initialList,
      reverseFlag: reverseList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      rightSortValue: assignSortValue,
      rightSort: sort,
      customerId,
    });
  }
  //Save Plants
  getSavePlants(reverseList, initialList, deleteList, saveList, exceptList, groupPK, customerId) {
    return axios.post(CustomerPlantGroup_Base_URL + "/saveMemberPlants", {
      initialList: initialList,
      reverseFlag: reverseList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      rightSortValue: null,
      rightSort: false,
      customerPlantGroupPK: groupPK,
      customerId,
    });
  }
}
export default new CustomerPlantGroupsService();
