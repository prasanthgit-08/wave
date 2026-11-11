import { axios } from "../config/axiosInterceptors";
import { CustomerProspects_Base_URL, HalfScreen_RecordsPerPage } from "./constants/applicationConstants";

class CustomerProspectsSevice {
  getCustomerProspectiveData(searchTerms, searchCriteria, pageNumber, selectedStatus, sortValue, sortFlag) {
    let activeStatus = null;
    if (selectedStatus === "Active") {
      activeStatus = 1;
    } else if (selectedStatus === "Inactive") {
      activeStatus = 0;
    }
    return axios.post(CustomerProspects_Base_URL + "/fetchcustomerprospects", {
      pageNumber: pageNumber,
      size: HalfScreen_RecordsPerPage,
      searchTerms,
      searchCriteria,
      active: activeStatus,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getRecordById(Id) {
    return axios.get(CustomerProspects_Base_URL + "/getrecordbyid/" + Id);
  }

  create(saveData) {
    return axios.post(CustomerProspects_Base_URL + "/save", saveData);
  }
  delete(id) {
    return axios.delete(CustomerProspects_Base_URL + "/delete/" + id);
  }
  nameExistCheck(name, id) {
    return axios.post(CustomerProspects_Base_URL + "/checknameexist", {
      name: name,
      customerProspectPK: id,
    });
  }
  //User Autocomplete
  getAllUserData(searchTerm) {
    return axios.post(CustomerProspects_Base_URL + "/getAllUsers", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: true,
      pseudoUser: false,
    });
  }
  activateCustomerProspects(id) {
    return axios.post(CustomerProspects_Base_URL + "/toggleactive", {
      customerProspectPK: id,
    });
  }
  deActivateCustomerProspects(id) {
    return axios.post(CustomerProspects_Base_URL + "/toggleactive", {
      customerProspectPK: id,
    });
  }
}

export default new CustomerProspectsSevice();
