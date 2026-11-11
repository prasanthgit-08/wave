import { axios } from "../config/axiosInterceptors";
import {
  Email_Processor_URL,
  EmanifestChangeRequest_Base_URL,
  EmanifestChangeRequest_Crossdb_URL,
  HalfScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class EmanifestChangeRequestService {
  getEmanifestChangeRequest(unitSelectionRequestVO) {
    return axios.post(EmanifestChangeRequest_Base_URL + "/selection", unitSelectionRequestVO);
  }

  getEmanifestChangeRequestEmail(unitSelectionRequestVO) {
    return axios.post(Email_Processor_URL + "/compose", unitSelectionRequestVO);
  }
}
export default new EmanifestChangeRequestService();
