import { axios } from "../config/axiosInterceptors";
import { DeleaseItems_Base_URL, QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";

class DeleaseItemsService {
  getAlldeleaseItems(
    pageNumber,
    selectedSearchCriteria,
    searchTerm,
    selecteActiveType,
    deleaseItemPK,
    sortValue,
    sortFlag
  ) {
    let deleaseItemsStatus = null;
    if (selecteActiveType === "Active") {
      deleaseItemsStatus = 0;
    } else if (selecteActiveType === "Inactive") {
      deleaseItemsStatus = 1;
    }
    return axios.post(DeleaseItems_Base_URL + "/deleaseItems/getalldeleaseItems", {
      pageNumber: pageNumber,
      size: 11,
      searchCriteria: selectedSearchCriteria,
      searchTerms: searchTerm,
      active: deleaseItemsStatus,
      deleaseItemPK: deleaseItemPK,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }
  getDeleaseItemsById(Id) {
    return axios.get(DeleaseItems_Base_URL + "/getDeleaseItems/" + Id);
  }

  saveDeleaseItems(saveData) {
    return axios.post(DeleaseItems_Base_URL + "/deleaseItems/savedeleaseItems", saveData);
  }
  deleteDeleaseItems(id) {
    return axios.delete(DeleaseItems_Base_URL + "/deletedeleaseItems/" + id);
  }
  activatedeleaseItems(deleaseItemPK) {
    return axios.put(DeleaseItems_Base_URL + "/deleaseItems/activatedeleaseItems", {
      deleaseItemPK: deleaseItemPK,
    });
  }

  deactivedeleaseItems(deleaseItemPK) {
    return axios.put(DeleaseItems_Base_URL + "/deleaseItems/deactivedeleaseItems", {
      deleaseItemPK: deleaseItemPK,
    });
  }

  checkDescriptionExist(description, deleaseItemPK) {
    return axios.post(DeleaseItems_Base_URL + "/deleaseItems/checkdescription", {
      description: description,
      deleaseItemPK: deleaseItemPK,
    });
  }
}
export default new DeleaseItemsService();
