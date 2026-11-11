import { axios } from "../config/axiosInterceptors";
import { ThreeForthScreen_RecordsPerPage } from "./constants/applicationConstants";
import { CustomerBulkInvoices_Base_URL } from "./constants/applicationConstants";

// CustomerBulkInvoices_Base_URL
const baseUrl = CustomerBulkInvoices_Base_URL;

class BulkInvoicesService {
  getBulkInvoices(number, searchCriteria, searchTerms, selecteActiveType, customerFK, sortValue, sortFlag) {
    let invoiceStatus = null;
    if (selecteActiveType === "Active") {
      invoiceStatus = 1;
    } else if (selecteActiveType === "Closed") {
      invoiceStatus = 0;
    }
    return axios.post(baseUrl + "/fetchbulkinvoices", {
      number: number,
      size: 11,
      searchCriteria: searchCriteria,
      searchTerms: searchTerms,
      active: invoiceStatus,
      customerFK: customerFK,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }
  createBulkInvoice(
    description,
    poNumber,
    projectCode,
    bulkInvoicepk,
    chargeCreditCard,
    notes,
    creditCardNumber,
    creditCardExpirationDate,
    creditCardName,
    creditCardAddress,
    creditCardPostalCode,
    customerFK,
    cvv
  ) {
    return axios.post(baseUrl + "/createbulkinvoices", {
      description: description,
      poNumber: poNumber,
      projectCode: projectCode,
      customerFK: customerFK,
      bulkInvoicePK: bulkInvoicepk,
      closed: false,
      chargeCreditCard: chargeCreditCard,
      notes: notes,
      creditCardNumber: creditCardNumber || "",
      creditCardExpirationDate: creditCardExpirationDate,
      creditCardName: creditCardName,
      creditCardAddress: creditCardAddress,
      creditCardPostalCode: creditCardPostalCode,
      creditCardSecurityCode: cvv,
    });
  }
  getBulkInvoicesEdit(id) {
    return axios.get(baseUrl + "/getbulkinvoice/" + id);
  }
  deleteBulkInvoices(id) {
    return axios.delete(baseUrl + "/deletebulkinvoice/" + id);
  }

  // Check a Description already exists for a Customer
  checkDescriptionExist(id, description, customerfk) {
    return axios.post(baseUrl + "/checkdescriptionexist", {
      description: description,
      customerFK: customerfk,
      bulkInvoicePK: id,
    });
  }

  // Check a Project Code already exists for a Customer
  checkProjectCodeExist(id, projectCode, customerfk) {
    return axios.post(baseUrl + "/checkprojectcodeexist", {
      projectCode: projectCode,
      customerFK: customerfk,
      bulkInvoicePK: id,
    });
  }
}

export default new BulkInvoicesService();
