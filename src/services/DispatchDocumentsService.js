import { axios } from "../config/axiosInterceptors";
import {
  DispatchDocuments_Base_URL,
  DispatchDocuments_CrossDB_Base_URL,
  EmailProcessor_URL,
} from "./constants/applicationConstants";

class DispatchDocumentsService {
  getAllCompanyNames() {
    return axios.get(DispatchDocuments_Base_URL + "/getAllCompanyNames");
  }

  fetchDispatchDocumentsData(pageNumber, driverId, sortValue, sortFlag, companyFK) {
    return axios.post(DispatchDocuments_Base_URL + "/getList", {
      // return axios.post(DispatchDocuments_CrossDB_Base_URL + "/getList", {
      pageNumber: pageNumber,
      pageSize: 6,
      driverId: driverId,
      sortValue: sortValue,
      sortType: sortFlag,

      companyId: companyFK,
      active: true,
      delivered: false,

      // url:"http://localhost:8082/driverCheckin/fetchUnitDataForDriverCheckinForCross"
    });
  }

  sendEmail(unitSelectionRequestVO) {
    return axios.post(EmailProcessor_URL + "api/email/compose", unitSelectionRequestVO);
  }
}
export default new DispatchDocumentsService();
