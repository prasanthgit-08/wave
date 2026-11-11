import { axios } from "../config/axiosInterceptors";
import {
  FullScreen_RecordsPerPage,
  HalfScreen_RecordsPerPage,
  No_Of_Record_per_page,
  PostalCode_Base_URL,
} from "./constants/applicationConstants";

class PostalCodeService {
  getPostalCodes(
    searchTerms,
    searchCriteria,
    pageNumber,
    searchedPostalCode,
    advanceSortingOrder,
    selectedStatus,
    sortValue,
    sortFlag
  ) {
    let activeStatus = null;
    if (selectedStatus === "Canadian") {
      activeStatus = 1;
    } else if (selectedStatus === "US") {
      activeStatus = 0;
    }
    return axios.post(PostalCode_Base_URL + "/fetchPostalCodes", {
      pageNumber: pageNumber,
      size: HalfScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerms: searchTerms,
      postalCodes: searchedPostalCode,
      advanceSortingOrder: advanceSortingOrder,
      canadian: activeStatus,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getRecord(id) {
    return axios.get(PostalCode_Base_URL + "/getPostalCodeById/" + id);
  }
  createOrUpdateRecord(formData) {
    return axios.post(PostalCode_Base_URL + "/savePostalCode", formData);
  }
  deleteRecord(id) {
    return axios.delete(PostalCode_Base_URL + "/deletebyid/" + id);
  }
  checkState(state) {
    return axios.post(PostalCode_Base_URL + "/checkStateExist", {
      stateCode: state,
    });
  }
}

export default new PostalCodeService();
