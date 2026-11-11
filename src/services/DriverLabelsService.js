import { axios } from "../config/axiosInterceptors";
import { Driver_labels_URL } from "./constants/applicationConstants";

class DriverLabelsService {
  processRequest(
    labelBy,
    status,
    division,
    startDay,
    endDay,
    startFirstName,
    endFirstName,
    startLastName,
    endLastName,
    lastDispatch,
    maximumAge,
    request
  ) {
    return axios.post(Driver_labels_URL + "/process-request", {
      labelBy: labelBy,
      status: status,
      division: division,
      startDay,
      endDay,
      startFirstName,
      endFirstName,
      startLastName,
      endLastName,
      lastDispatch,
      maximumAge,
      request,
    });
  }
}
export default new DriverLabelsService();
