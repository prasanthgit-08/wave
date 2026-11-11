import { axios } from "../config/axiosInterceptors";
import { Orientation_Forms_Base_URL } from "./constants/applicationConstants";

class OrientationFormsService {
  saveEmailOrientationForm(orientationFormRequestVO) {
    return axios.post(Orientation_Forms_Base_URL + "emailOrientationForm", orientationFormRequestVO);
  }
}
export default new OrientationFormsService();
