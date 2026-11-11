import { axios } from "../../config/axiosInterceptors";
import {
  BulkInvoice_Base_URL,
  Misc_Invoice_CrossDb_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "../constants/applicationConstants";

class BulkInvoiceService {
  // if size not specified it will be defaulted to 7(added for lookup)
  getBulkInvoiceList(searchCriteria, searchTerm, pageNumber, sortValue, sortType) {
    return axios.post(BulkInvoice_Base_URL + "/selection", {
      pageNumber: pageNumber,
      pageSize: QuarterScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerms: searchTerm,
      sortType: sortType,
      sortValue: sortValue,
    });
  }

  getById(id) {
    return axios.post(BulkInvoice_Base_URL + "/details", {
      bulkInvoicePK: id,
    });
  }

  createOrUpdateRecord(formData) {
    return axios.post(BulkInvoice_Base_URL + "/save", formData);
  }
}
export default new BulkInvoiceService();
