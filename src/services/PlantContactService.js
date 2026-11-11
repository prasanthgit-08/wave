import { axios } from "../config/axiosInterceptors";
import { PlantContacts_Base_URL, QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";

class PlantContactService {
  getAllPLantContacts(searchTerm, selectedSearchCriteria, pageNumber, sortValue, sortFlag, plantId) {
    return axios.post(PlantContacts_Base_URL + "/fetchallplantcontacts", {
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerm,
      sortType: sortFlag,
      sortValue: sortValue,
      plantId: plantId,
    });
  }
  getPlantContactsDataById(id) {
    return axios.get(PlantContacts_Base_URL + "/getplantcontactbyid/" + id);
  }

  createContacts(formData) {
    return axios.post(PlantContacts_Base_URL + "/createplantcontacts", formData);
  }

  deleteContacts(id) {
    return axios.delete(PlantContacts_Base_URL + "/deleteplantcontact/" + id);
  }
  checkContactExist(contact, plantId, id) {
    return axios.post(PlantContacts_Base_URL + "/checkcontactexist", {
      contact: contact,
      plantId: plantId,
      customerPlantContactPK: id,
    });
  }
}
export default new PlantContactService();
