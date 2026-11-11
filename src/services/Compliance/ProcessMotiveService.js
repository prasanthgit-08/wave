import { axios } from "../../config/axiosInterceptors";
import { Process_Motive_Base_URL } from "../constants/applicationConstants";

class ProcessMotiveService {
  postProcessMotive(file, type) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    return axios.post(Process_Motive_Base_URL + "upload", formData);
  }
}

export default new ProcessMotiveService();
