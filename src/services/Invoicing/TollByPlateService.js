import { axios } from "../../config/axiosInterceptors";
import { Toll_By_Plate_Base_URL } from "../constants/applicationConstants";

class TollByPlateService {
  fetchList(searchPlate, pageNumber, size, sortType, sortValue) {
    return axios.post(Toll_By_Plate_Base_URL + "/getListingData", {
      searchTerm: searchPlate,
      pageNumber,
      size,
      sortType,
      sortValue,
    });
  }

  onSave(flag, CheckyTo, data, uploadedFiles) {
    const formData = new FormData();
    // Append each file to the formData
    let xmlList = new Map(Object.entries(data));
    // Convert the Map to a JSON string
    const jsonString = JSON.stringify(Object.fromEntries(xmlList));
    formData.append("flag", flag);
    formData.append("checkPayToFK", CheckyTo || 0);
    formData.append("xmlList", jsonString);
    uploadedFiles?.forEach((file, index) => {
      formData.append(`${file.name}`, file);
    });

    return axios.post(Toll_By_Plate_Base_URL + "/onSave", formData);
  }
}

export default new TollByPlateService();
