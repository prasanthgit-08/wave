import { axios } from "../config/axiosInterceptors";
import { TransportCompany_Base_URL } from "../services/constants/applicationConstants";
class TransportCompanysService {
  getTransportCompanyForLookup(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(TransportCompany_Base_URL + "/alltransportcompanysdata", {
      searchCriteria,
      searchTerms,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      active: null,
    });
  }
  getTransportCompanyList(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag, selectedStatus) {
    let activeStatus = null;
    if (selectedStatus === "Active") {
      activeStatus = 1;
    } else if (selectedStatus === "Inactive") {
      activeStatus = 0;
    }
    return axios.post(TransportCompany_Base_URL + "/alltransportcompanysdata", {
      searchCriteria,
      searchTerms,
      pageNumber,
      size: 11,
      sortValue: sortValue,
      sortType: sortFlag,
      active: activeStatus,
    });
  }

  getTransportCompanyForAuto(string) {
    return axios.post(TransportCompany_Base_URL + "/alltransportcompanysdata", {
      searchCriteria: "Beginning",
      searchTerms: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "AutoComplete",
      active: null,
    });
  }
  getRecord(id) {
    return axios.get(TransportCompany_Base_URL + "/getTransportCompanyById/" + id);
  }
  createOrUpdateRecord(formData) {
    return axios.post(TransportCompany_Base_URL + "/saveTransportCompanies", formData);
  }

  deleteRecord(id) {
    return axios.delete(TransportCompany_Base_URL + "/deletebyid/" + id);
  }

  activateTransportCompany(id) {
    return axios.post(TransportCompany_Base_URL + "/activateTransportCompany", {
      transportCompanyPK: id,
    });
  }

  deActivateTransportCompany(id) {
    return axios.post(TransportCompany_Base_URL + "/deActivateTransportCompany", {
      transportCompanyPK: id,
    });
  }
  checknameExist(string, id) {
    return axios.post(TransportCompany_Base_URL + "/nameExists", {
      name: string,
      transportCompanyPK: id,
    });
  }
  checkEinExist(string, id) {
    return axios.post(TransportCompany_Base_URL + "/einExists", {
      ein: string,
      transportCompanyPK: id,
    });
  }
}
export default new TransportCompanysService();
