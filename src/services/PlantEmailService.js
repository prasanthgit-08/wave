import { axios } from "../config/axiosInterceptors";
import {
  PlantEmail_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "../services/constants/applicationConstants";

class PlantEmailService {
  getAllPlantEmails(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, id) {
    return axios.post(PlantEmail_Base_URL + "/allplantemails", {
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
      customerPlantFK: id,
    });
  }

  getPlantEmailById(Id) {
    return axios.get(PlantEmail_Base_URL + "/getplantemailbyid/" + Id);
  }

  createPlantEmail(saveData) {
    return axios.post(PlantEmail_Base_URL + "/savePlantEmail", saveData);
  }

  deletePlantEmail(id) {
    return axios.delete(PlantEmail_Base_URL + "/delete/" + id);
  }

  checkNameExist(name, emailPK, plantId) {
    return axios.post(PlantEmail_Base_URL + "/nameexists", {
      name: name,
      customerPlantEmailPK: emailPK,
      customerPlantFK: plantId,
    });
  }

  checkEmailExist(email, emailPK, plantId) {
    return axios.post(PlantEmail_Base_URL + "/emailexists", {
      email: email,
      customerPlantEmailPK: emailPK,
      customerPlantFK: plantId,
    });
  }
  checkNameAndEmailValid(name, email, emailPK, plantId) {
    return axios.post(PlantEmail_Base_URL + "/emailandnameexists", {
      name: name,
      email: email,
      customerPlantEmailPK: emailPK,
      customerPlantFK: plantId,
    });
  }
  getCompanyRequirePlantRelease() {
    return axios.get(PlantEmail_Base_URL + "/getRequirePlantRelease");
  }
}
export default new PlantEmailService();
