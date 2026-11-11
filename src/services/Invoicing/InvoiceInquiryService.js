import { axios } from "../../config/axiosInterceptors";
import { InvoiceInquiry_Base_URL } from "../constants/applicationConstants";

class InvoiceInquiryService {
  /**
   * Used for Invoice Inquiry Selection
   * Filter by Invoice Number / Last5 / Unit Number
   */
  getAllInvoiceBySearch(
    searchCriteria,
    searchTerm,
    pageNumber,
    size,
    companyFK,
    companyName,
    sortValue,
    sortType
  ) {
    return axios.post(InvoiceInquiry_Base_URL + "/findInvoiceBySearchTerm", {
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      size: size,
      companyId: companyFK,
      companyName: companyName,
      sortValue,
      sortType,
    });
  }

  /**
   * Used for Edit Invoice get by id
   */
  getInvoiceById(invoicePK, companyFK, companyName, searchCriteria, searchTerm) {
    return axios.post(InvoiceInquiry_Base_URL + "/getInvoiceById", {
      invoicePK: invoicePK,
      companyId: companyFK,
      companyName: companyName,
      searchCriteria,
      searchTerm,
    });
  }

  /**
   * Used for Edit Invoice get by id for a non unit
   */
  getNonUnitById(invoicePK, companyFK, companyName) {
    return axios.post(InvoiceInquiry_Base_URL + "/getNonUnitInvoiceById", {
      invoicePK: invoicePK,
      companyId: companyFK,
      companyName: companyName,
    });
  }

  /**
   * Used for fetching invoice details by passing invoice FK
   */
  getInvoiceDetailsById(invoicePK, companyFK, companyName, detailsPageNumber, detailsSize) {
    return axios.post(InvoiceInquiry_Base_URL + "/getInvoiceDetails", {
      invoicePK: invoicePK,
      companyId: companyFK,
      companyName: companyName,
      pageNumber: detailsPageNumber,
      size: detailsSize,
    });
  }

  /**
   * Used for Edit Invoice for Non unit search
   * Filter by Invoice Number / Last5 / Unit Number
   */
  getAllNonUnitsBySearch(
    invoiceNumber,
    unitNumber,
    poNumber,
    selectedCustomerId,
    dealerId,
    pageNumberNonUnit,
    sortValueNonUnit,
    sortTypeNonUnit
  ) {
    return axios.post(InvoiceInquiry_Base_URL + "/findNonUnitInvoice", {
      pageNumber: pageNumberNonUnit,
      size: 5,
      invoiceNumber,
      unitNumber: unitNumber?.toUpperCase(), // Convert to uppercase
      poNumber,
      selectedCustomerId,
      dealerId,
      sortValue: sortValueNonUnit,
      sortType: sortTypeNonUnit,
    });
  }

  getAllDriverInvoices(
    searchCriteria,
    searchTerm,
    pageNumber,
    size,
    companyFK,
    companyName,
    driverFK,
    sortValue,
    sortType
  ) {
    return axios.post(InvoiceInquiry_Base_URL + "/findDriverInvoice", {
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      size: size,
      companyId: companyFK,
      companyName: companyName,
      driverFK,
      sortValue,
      sortType,
    });
  }

  getDriverInvoiceById(invoicePK, companyFK, companyName, searchCriteria, searchTerm) {
    return axios.post(InvoiceInquiry_Base_URL + "/getDriverInvoiceById", {
      invoicePK: invoicePK,
      companyId: companyFK,
      companyName: companyName,
      searchCriteria,
      searchTerm,
    });
  }

  getAllCompanyNames() {
    return axios.get(InvoiceInquiry_Base_URL + "/getAllCompanyNames");
  }

  getCurrentCompanyName() {
    return axios.get(InvoiceInquiry_Base_URL + "/getCurrentCompany");
  }

  checkUnitStatus(unitId, companyId, driverInvoiceFlag) {
    return axios.post(InvoiceInquiry_Base_URL + "/checkUnit", {
      companyId: companyId,
      unitId: unitId,
      driverInvoice: driverInvoiceFlag || false,
    });
  }

  export(emailVO) {
    return axios.post(InvoiceInquiry_Base_URL + "/sendEmail", emailVO);
  }

  /**
   * Used for fetching invoice documents by passing invoice FK
   */
  getDocumentsForInvoice(invoicePK) {
    return axios.post(InvoiceInquiry_Base_URL + "/documentListForInvoice", {
      invoicePK: invoicePK,
    });
  }

  /**
   * Used for fetching invoice documents by Document id
   */
  getDocumentsById(documentFK) {
    return axios.post(InvoiceInquiry_Base_URL + "/documentById", {
      documentFK: documentFK,
    });
  }
}
export default new InvoiceInquiryService();
