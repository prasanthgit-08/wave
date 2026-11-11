import { axios } from "../config/axiosInterceptors";
import {
  CustomerUnitTypeGroup_Base_URL,
  FullScreen_RecordsPerPage,
  Customer_Base_URL,
  StandardMaintenance_RecordsPerPage,
  AdvancedLookupScreen_RecordsPerPage,
  QuarterScreen_GroupsMaintenance_RecordsPerPage,
} from "./constants/applicationConstants";
class CustomerUnitTypeGroupsService {
  getCustomerUnitTypeGroup(
    searchCriteria,
    searchTerms,
    pageNumber,
    sortValue,
    sortFlag,
    searchDescription,
    searchCustomer,
    searchPlant,
    searchPlantGroup,
    searchCustomerGroup
  ) {
    return axios.post(CustomerUnitTypeGroup_Base_URL + "/customerUnitTypeGroupdata", {
      searchCriteria,
      searchTerms,
      pageNumber,
      sortValue: sortValue,
      sortType: sortFlag,
      searchDescription: searchDescription,
      searchCustomer: searchCustomer,
      searchPlant: searchPlant,
      searchPlantGroup: searchPlantGroup,
      searchCustomerGroup: searchCustomerGroup,
      size: StandardMaintenance_RecordsPerPage,
    });
  }

  getCustomerUnitTypeGroupForLookup(
    searchCriteria,
    searchTerms,
    pageNumber,
    sortValue,
    sortFlag,
    searchDescription,
    searchCustomer,
    searchPlant,
    searchPlantGroup,
    searchCustomerGroup,
    customerId,
    customerPlantId,
    customerPlantGroupId,
    customerGroupId,
    customerRateFlag
  ) {
    return axios.post(CustomerUnitTypeGroup_Base_URL + "/customerUnitTypeGroupdata", {
      searchCriteria,
      searchTerms,
      pageNumber,
      sortValue: sortValue,
      sortType: sortFlag,
      searchDescription: searchDescription,
      searchCustomer: searchCustomer,
      searchPlant: searchPlant,
      searchPlantGroup: searchPlantGroup,
      searchCustomerGroup: searchCustomerGroup,
      customerId: customerId ? customerId : null,
      customerPlantId: customerPlantId ? customerPlantId : null,
      customerPlantGroupId: customerPlantGroupId ? customerPlantGroupId : null,
      customerGroupId: customerGroupId ? customerGroupId : null,
      size: AdvancedLookupScreen_RecordsPerPage,
      customerRateFlag: customerRateFlag,
    });
  }

  getCustomerUnitTypeGroupForAuto(
    string,
    customerId,
    customerPlantId,
    customerPlantGroupId,
    customerGroupId,
    customerRateFlag
  ) {
    return axios.post(CustomerUnitTypeGroup_Base_URL + "/customerUnitTypeGroupdata", {
      searchCriteria: "Beginning",
      searchTerms: string,
      pageNumber: 0,
      size: 100,
      sortValue: "",
      sortType: false,
      type: "AutoComplete",
      customerId: customerId || null,
      customerPlantId: customerPlantId || null,
      customerPlantGroupId: customerPlantGroupId || null,
      customerGroupId: customerGroupId || null,
      customerRateFlag: customerRateFlag,
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
    });
  }

  getRecord(id) {
    return axios.get(CustomerUnitTypeGroup_Base_URL + "/getCustomerUnitTypeGroupById/" + id);
  }

  createOrUpdateRecord(formData) {
    return axios.post(CustomerUnitTypeGroup_Base_URL + "/saveCustomerUtGroups", formData);
  }

  deleteRecord(id) {
    return axios.delete(CustomerUnitTypeGroup_Base_URL + "/deletebyid/" + id);
  }

  checkDescriptionExist(description, id) {
    return axios.post(CustomerUnitTypeGroup_Base_URL + "/descriptionexists", {
      customerunittypegroupPK: id,
      description: description,
    });
  }
  //assigned unittype group

  getAssignedUnitTypeGroup(id, assignedPageNo, sort, assignSortValue, radioValue) {
    let type = null;
    if (radioValue === "Towable") {
      type = 1;
    } else if (radioValue === "Motorized") {
      type = 0;
    }
    return axios.post(CustomerUnitTypeGroup_Base_URL + "/getassignedunittypegroups", {
      customerunittypegroupPK: id,
      pageNumber: assignedPageNo,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      sortType: sort,
      sortValue: assignSortValue,
      isTowable: type,
    });
  }

  //Leftside unittype group
  getLeftUnitTypeGroups(
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
    let type = null;
    if (radioValue === "Towable") {
      type = 1;
    } else if (radioValue === "Motorized") {
      type = 0;
    }
    return axios.post(CustomerUnitTypeGroup_Base_URL + "/fetchleftunittypegroups", {
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
  //Right sise unittype groups
  getRightUnitTypeGroups(
    reverseFlag,
    assignedPageNumber,
    initialList,
    deleteList,
    saveList,
    exceptList,
    groupSortFlag,
    groupSortValue,
    radioValue
  ) {
    let type = null;
    if (radioValue === "Towable") {
      type = 1;
    } else if (radioValue === "Motorized") {
      type = 0;
    }
    return axios.post(CustomerUnitTypeGroup_Base_URL + "/fetchrightassignedunittypegroups", {
      pageNumber: assignedPageNumber,
      size: QuarterScreen_GroupsMaintenance_RecordsPerPage,
      initialList: initialList,
      reverseFlag: reverseFlag,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      rightSort: groupSortFlag,
      rightSortValue: groupSortValue,

      isTowable: type,
    });
  }

  getInitialList(id) {
    return axios.get(CustomerUnitTypeGroup_Base_URL + "/getunittypegroupbyfk/" + id);
  }

  saveMemberGroups(id, initialList, deleteList, saveList, exceptList, reverseFlag, radioValue) {
    let type = null;
    if (radioValue === "Towable") {
      type = 1;
    } else if (radioValue === "Motorized") {
      type = 0;
    }

    return axios.post(CustomerUnitTypeGroup_Base_URL + "/savememberunittypegroups", {
      initialList: initialList,
      deleteList: deleteList,
      saveList: saveList,
      exceptionList: exceptList,
      reverseFlag: reverseFlag,
      customerunittypegroupPK: id,
      isTowable: type,
    });
  }
}
export default new CustomerUnitTypeGroupsService();
