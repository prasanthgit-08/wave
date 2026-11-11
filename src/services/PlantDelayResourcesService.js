import { axios } from "../config/axiosInterceptors";
import { PlantResources_Base_URL, QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";

class PlantDelayResourcesService {
  getAllPlantDelayResources(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, id) {
    return axios.post(PlantResources_Base_URL + "/fetchcustomerplantdelays", {
      searchCriteria: selectedSearchCriteria,
      searchTerms: searchTerm,
      number: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
      customerPlantFK: id,
    });
  }

  getPlantDelayResourcesById(Id) {
    return axios.get(PlantResources_Base_URL + "/getcustomerplantdelay/" + Id);
  }

  createPlantDelay(saveData) {
    return axios.post(PlantResources_Base_URL + "/createcustomerplantdelay", saveData);
  }

  deletePlantdelay(id) {
    return axios.delete(PlantResources_Base_URL + "/deletecustomerplantdelay/" + id);
  }

  checkdescriptionExist(description, PK, plantId) {
    return axios.post(PlantResources_Base_URL + "/checkdescriptionexist", {
      description: description,
      customerDelayResourcePK: PK,
      customerPlantFK: plantId,
    });
  }
}
export default new PlantDelayResourcesService();
