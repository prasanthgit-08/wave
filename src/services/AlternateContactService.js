import { axios } from "../config/axiosInterceptors";
import { Contact_Base_URL } from "../services/constants/applicationConstants";
import { QuarterScreen_RecordsPerPage } from "../services/constants/applicationConstants";

class AlternateContactService {
  getAllAlternateContacts(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag) {
    return axios.post(Contact_Base_URL + "/allcontacts", {
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getAlternateContactsById(Id) {
    return axios.get(Contact_Base_URL + "/getallcontactsbyid/" + Id);
  }

  createAlternateContacts(saveData) {
    return axios.post(Contact_Base_URL, saveData);
  }
  deleteAlternateContacts(id) {
    return axios.delete(Contact_Base_URL + "/delete/" + id);
  }
  checkDescriptionExist(id, contact, name) {
    return axios.post(Contact_Base_URL + "/checkcontactexist", {
      contact,
      name,
      alternateContactPK: id,
    });
  }
}

export default new AlternateContactService();
