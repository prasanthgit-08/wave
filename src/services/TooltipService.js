import { axios } from "../config/axiosInterceptors";
import { Tooltip_Base_URL } from "./constants/applicationConstants";

class TooltipService {
  getTooltipMessage(programName, tabName, fieldName) {
    return axios.get(
      Tooltip_Base_URL + "/getTooltipMessage/" + programName + "/" + tabName + "/" + fieldName
    );
  }

  updateTooltipDescription(id, description) {
    return axios.post(Tooltip_Base_URL + "/updateTooltipInfo", {
      tooltipPK: id,
      description,
    });
  }
}
export default new TooltipService();
