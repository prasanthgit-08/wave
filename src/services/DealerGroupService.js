import { axios } from "../config/axiosInterceptors";
import {
  Dealer_Base_URL,
  DealerGroups_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "../services/constants/applicationConstants";
class DealerGroupService {
  getDealerGroup(pageNumber, searchCriteria, searchTerm, sort, sortValue) {
    return axios.post(DealerGroups_Base_URL + "/getDealerGroups", {
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      sortType: sort,
      sortValue: sortValue,
    });
  }

  isUniqueDescription(description) {
    return axios.post(DealerGroups_Base_URL + "/isUniqueDescription", {
      description: description,
    });
  }

  getDealerGroupById(Id) {
    return axios.get(DealerGroups_Base_URL + "/getById/" + Id);
  }
  getDealers(id, pageNumber, sort, sortvalue) {
    return axios.post(DealerGroups_Base_URL + "/getDealers", {
      dealerGroupPK: id,
      pageNumber: pageNumber,
      size: 7,
      sortType: sort,
      sortValue: sortvalue,
    });
  }
  saveDealerGroup(description, notes, id) {
    return axios.post(DealerGroups_Base_URL + "/saveDealerGroup", {
      description: description,
      notes: notes,
      dealerGroupPK: id,
    });
  }

  saveDealers(id, initialList, deleteList, saveList, searchList, exceptList) {
    return axios.post(DealerGroups_Base_URL + "/dealerGroupSave", {
      initialList: initialList,
      deleteList: deleteList,
      saveList: saveList,
      conditionList: searchList,
      exceptionList: exceptList,
      dealerGroupPK: id,
    });
  }

  getInitialList(id) {
    return axios.get(DealerGroups_Base_URL + "/getDealerFK/" + id);
  }

  getLeftDealers(
    rightPageNumber,
    rightSize,
    leftPageNumber,
    leftSize,
    searchCriteria,
    searchTerm,
    id,
    deleteList,
    saveList,
    searchList,
    exceptList,
    leftSort,
    rightSort,
    leftSortValue,
    rightSortValue,
    city,
    dba,
    state,
    name,
    advanceSortOrder,
    isActive,
    reverseList
  ) {
    const hasAdvancedSearch =
      (city && city?.trim() !== "") ||
      (dba && dba?.trim() !== "") ||
      (state && state?.trim() !== "") ||
      (name && name?.trim() !== "");

    const hasAdvanceSort =
      advanceSortOrder &&
      (advanceSortOrder.firstField ||
        advanceSortOrder.secondField ||
        advanceSortOrder.thirdField ||
        advanceSortOrder.fourthField ||
        advanceSortOrder.fifthField);
    return axios.post(DealerGroups_Base_URL + "/fetchLeftDealers", {
      leftPageNumber: leftPageNumber,
      leftSize: leftSize || 20,
      leftSortValue: leftSortValue,
      leftSort: leftSort,
      rightPageNumber: rightPageNumber,
      rightSize: rightSize || 20,
      rightSortValue: rightSortValue,
      rightSort: rightSort,
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      saveList: saveList,
      dealerGroupPK: id,
      exceptionList: exceptList,
      deleteList: deleteList,
      conditionList: searchList,
      advancedSearch: hasAdvancedSearch ? true : false,
      city: city,
      dba: dba,
      stateCode: state,
      name: name,
      advanceSort: hasAdvanceSort ? true : false,
      advanceSortingOrder: advanceSortOrder,
      firstField: advanceSortOrder?.firstField || "",
      secondField: advanceSortOrder?.secondField || "",
      thirdField: advanceSortOrder?.thirdField || "",
      fourthField: advanceSortOrder?.fourthField || "",
      activeDealer: isActive,
      reverseInitials: reverseList,
    });
  }

  fetchDealerListForEdit(
    rightPageNumber,
    rightSize,
    leftPageNumber,
    leftSize,
    searchCriteria,
    searchTerm,
    initialList,
    deleteList,
    saveList,
    searchList,
    exceptList,
    leftSort,
    rightSort,
    leftSortValue,
    rightSortValue
  ) {
    return axios.post(DealerGroups_Base_URL + "/fetchDealerListForEdit", {
      leftPageNumber: leftPageNumber,
      leftSize: leftSize || 20,
      leftSortValue: leftSortValue,
      leftSort: leftSort,
      rightPageNumber: rightPageNumber,
      rightSize: rightSize || 20,
      rightSortValue: rightSortValue,
      rightSort: rightSort,
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      saveList: saveList,
      initialList: initialList,
      exceptionList: exceptList,
      deleteList: deleteList,
      conditionList: searchList,
    });
  }

  getDealerGroupsForLookup(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag) {
    return axios.post(DealerGroups_Base_URL + "/getDealerGroups", {
      searchCriteria,
      searchTerm,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getDealerGroupsForAuto(searchTerm) {
    return axios.post(DealerGroups_Base_URL + "/getDealerGroups", {
      pageNumber: 0,
      size: 50,
      searchTerm: searchTerm,
      searchCriteria: "Beginning",
    });
  }

  fetchunselectedDealers(pageNumber, excludeList, searchCriteria, searchTerm, isActive, isComplete) {
    var active = null;
    if (isActive === "Active") {
      active = true;
    } else if (isActive === "Inactive") {
      active = false;
    }

    return axios.post(Dealer_Base_URL + "/fetchdealers", {
      number: pageNumber,
      size: 10,
      searchCriteria: searchCriteria,
      searchTerms: searchTerm,
      sortFlag: true,
      sortValue: null,
      isOEPP: "DealerGroupListing",
      excludeList: excludeList,
      selectedDealerStatus: isComplete,
      active: active,
    });
  }

  deleteDealerGroup(id) {
    return axios.delete(DealerGroups_Base_URL + "/deleteDealerGroup/" + id);
  }

  getDealerListBySearch(active, searchCriteria, searchTerms, name, dba, city, state) {
    let dealerStatus = null;
    if (active === "Active") {
      dealerStatus = 1;
    } else if (active === "Inactive") {
      dealerStatus = 0;
    }
    let dealer = null;
    if (name || dba || city || state) {
      dealer = {
        name: name,
        dba: dba,
        city: city,
        stateCode: state,
      };
    }

    return axios.post(DealerGroups_Base_URL + "/getDealerListForCondition", {
      active: dealerStatus,
      dealer: dealer,
      searchCriteria: searchCriteria,
      advanceSortingOrder: null,
      searchTerms: searchTerms,
      sortValue: null,
      sortType: false,
      selectedDealerStatus: "Complete",
      isOEPP: "Lookup",
    });
  }
}

export default new DealerGroupService();
