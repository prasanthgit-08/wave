import { axios } from "../config/axiosInterceptors";
import {
  Approve_Base_URL,
  Approve_CrossDB_URL,
  HalfScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class ApproveHeldService {
  getAllApproveHeld(searchCriteria, pageNumber, sortValue, sortFlag) {
    return axios.post(Approve_Base_URL + "/ApproveHeldlist", {
      pageNumber: pageNumber,
      searchCriteria: searchCriteria,
      size: 15,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getApproveHeldById(Id) {
    return axios.get(Approve_CrossDB_URL + "/getApproveHeldById/" + Id);
  }

  updateApproveHeld(formData, approve) {
    return axios.post(Approve_CrossDB_URL + "/saveApproveHeld", {
      ...formData,
      approve: approve,
    });
  }
  getAllShuttleForSelectedUnit(pageNumber, sortValue, sortFlag, selectedUnit, isSisterUnit, id) {
    return axios.post(Approve_Base_URL + "/getshuttledataforselectedunit", {
      pageNumber: pageNumber,
      sortFieldName: sortValue,
      sortFlag: sortFlag,
      size: HalfScreen_RecordsPerPage,
      unitId: !isSisterUnit ? selectedUnit : null,
      sisterUnitFK: isSisterUnit ? selectedUnit : null,
      unitShuttlePK: id,
    });
  }
}

export default new ApproveHeldService();
