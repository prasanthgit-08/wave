import { axios } from "../config/axiosInterceptors";
import { DriverAddNotes_Base_URL } from "./constants/applicationConstants";

class DriverAddNotesService {
  saveDriverAddNotes(driverAddNotes) {
    return axios.post(`${DriverAddNotes_Base_URL}/add-notes`, driverAddNotes);
  }
}
export default new DriverAddNotesService();
