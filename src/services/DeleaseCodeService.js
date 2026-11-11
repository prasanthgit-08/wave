import { axios } from "../config/axiosInterceptors";
import {
  DeleaseCode_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "../services/constants/applicationConstants";

class DeleaseCodeService {
  getAllDeleaseCodes(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, active) {
    let status = null;
    if (active === "Active") {
      status = 1;
    } else if (active === "Inactive") {
      status = 0;
    }
    return axios.post(DeleaseCode_Base_URL + "/alldeleasecodes", {
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber,
      size: 11,
      sortValue: sortValue,
      sortType: sortFlag,
      active: status,
    });
  }
  getDeleaseCodesById(Id) {
    return axios.get(DeleaseCode_Base_URL + "/getdeleasecodesbyid/" + Id);
  }

  createDeleaseCode(saveData) {
    return axios.post(DeleaseCode_Base_URL, saveData);
  }
  checkCodeExist(code, id) {
    return axios.post(DeleaseCode_Base_URL + "/checkcodeexist", {
      deleaseCodePK: id,
      deleaseCode: code,
    });
  }
  deleteDeleaseCode(id) {
    return axios.delete(DeleaseCode_Base_URL + "/delete/" + id);
  }
  activateDeleaseCode(id) {
    return axios.post(DeleaseCode_Base_URL + "/toggleactive", {
      deleaseCodePK: id,
    });
  }
  deactivateDeleaseCode(id) {
    return axios.post(DeleaseCode_Base_URL + "/toggleactive", {
      deleaseCodePK: id,
    });
  }
  checkdescriptionExist(description, id) {
    return axios.post(DeleaseCode_Base_URL + "/checkdescriptionexist", {
      deleaseCodePK: id,
      description: description,
    });
  }
  getDeleaseCodeForLookup(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag) {
    return axios.post(DeleaseCode_Base_URL + "/alldeleasecodes", {
      searchCriteria,
      searchTerm,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      active: true,
    });
  }
  getDeleaseCodeForAuto(string) {
    return axios.post(DeleaseCode_Base_URL + "/alldeleasecodes", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      active: true,
      type: "Autocomplete",
    });
  }

  checkuniquesave(code, description, id) {
    return axios.post(DeleaseCode_Base_URL + "/checkuniquesave", {
      deleaseCode: code,
      deleaseCodePK: id,
      description: description,
    });
  }
}
export default new DeleaseCodeService();
