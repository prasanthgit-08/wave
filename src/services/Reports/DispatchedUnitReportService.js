import { axios } from "../../config/axiosInterceptors";
import { Dispatched_Unit_Report_CrossDb } from "../constants/applicationConstants";

class DispatchedUnitReportService {
  getDispatchedUnitReport(formData) {
    return axios.post(Dispatched_Unit_Report_CrossDb + "/getDispatchedUnitReport", {
      divisionStatus: formData.divisionStatus,
      source: formData.source,
      beginningDate: formData.beginningDate,
      endDate: formData.endDate,
      customer: formData.customerFK,
      dispatcher: formData.userFK,
      includeHistory: formData.includeHistory,
      assigned: formData.assigned,
      orderByDispatchDate: formData.orderBy === "Dispatch Date" ? true : false,
      orderByOrderDate: formData.orderBy === "Order Date" ? true : false,
      type: formData.type,
    });
  }

  sendProjectReport(formData) {}
}
export default new DispatchedUnitReportService();
