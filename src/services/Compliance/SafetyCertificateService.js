import { axios } from "../../config/axiosInterceptors";
import { Safety_Certrficate_Base_URL } from "../constants/applicationConstants";

class SafetyCertificateService {
  /******Process the Safety Certificate to check the date****/
  processSafetyDate(safetyDate, printSelection, emailSelection, safetyStatus) {
    return axios.post(`${Safety_Certrficate_Base_URL}/processSafety`, {
      printSelection: printSelection,
      emailSelection: emailSelection,
      safetyDate: safetyDate,
      safetyStatus: safetyStatus,
    });
  }
  /******Process the Safety Certificate****/
  processSafety(safetyDate, printSelection, emailSelection, safetyStatus) {
    return axios.post(`${Safety_Certrficate_Base_URL}/process`, {
      printSelection: printSelection,
      emailSelection: emailSelection,
      safetyDate: safetyDate,
      safetyStatus: safetyStatus,
    });
  }
}
export default new SafetyCertificateService();
