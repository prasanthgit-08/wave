import { axios } from "../config/axiosInterceptors";
import { booleanToNumber } from "../utils/utils";
import {
  Customer_Plant_Release_BaseURL,
  QuarterScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class CustomerPlantReleaseService {
  getAllCustomerPlantReleases(searchCriteria, searchTerm, pageNumber, sortValue, sortType) {
    return axios.post(Customer_Plant_Release_BaseURL + "browse", {
      pageNumber: pageNumber,
      pageSize: QuarterScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      sortType: sortType,
      sortValue: sortValue,
      resultType: 0,
    });
  }

  plantReleaseMaintenanceSave(plantReleases) {
    return axios.post(Customer_Plant_Release_BaseURL + "browse-save", booleanToNumber(plantReleases));
  }

  plantReleaseMaintenanceDelete(id) {
    return axios.post(
      Customer_Plant_Release_BaseURL + "delete",
      booleanToNumber({ customerPlantReleaseFK: id })
    );
  }

  getPlantReleasesById({ id, flag }) {
    return axios.post(Customer_Plant_Release_BaseURL + "fetch-columns", { customerPlantReleaseFK: id, flag });
  }

  savePlantReleaseColumnFields(plantReleaseFK, columnsList) {
    return axios.post(Customer_Plant_Release_BaseURL + "save-columns ", {
      customerPlantReleaseFK: plantReleaseFK,
      columns: booleanToNumber(columnsList),
    });
  }

  SaveUploadFiles(file, customerPlantReleaseFK, flag) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("customerPlantReleaseFK", customerPlantReleaseFK);
    formData.append("flag", flag);
    return axios.post(Customer_Plant_Release_BaseURL + "upload-file", formData);
  }
}
export default new CustomerPlantReleaseService();
