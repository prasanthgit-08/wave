import { axios } from "../../config/axiosInterceptors";
import { ScanInvoice_Base_URL_For_CrossDb } from "../constants/applicationConstants";

class ScanInvoiceService {
  /**
   *  Fetch all active companies
   */
  getAllCompanyNames() {
    return axios.get(ScanInvoice_Base_URL_For_CrossDb + "/getAllCompanyNames");
  }

  /**
   * Fetch Current Company Name
   **/
  getCurrentCompanyName() {
    return axios.get(ScanInvoice_Base_URL_For_CrossDb + "/getCurrentCompany");
  }

  /**
   * Used for Scan Invoice Selection
   * Filter by Invoice Number / Last5 / Unit Number
   */
  getAllInvoiceBySearch(
    searchCriteria,
    searchTerm,
    pageNumber,
    size,
    companyFK,
    companyName,
    sortType,
    sortValue,
    unitLast5
  ) {
    return axios.post(ScanInvoice_Base_URL_For_CrossDb + "/findInvoiceBySearchTerm", {
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      size: size,
      companyId: companyFK,
      companyName: companyName,
      sortType,
      sortValue,
      unitNumberLast5: unitLast5 || "",
    });
  }

  /**
   * Used for Scan Invoice get by id
   */
  getInvoiceById(invoicePK, companyFK, companyName, searchCriteria, searchTerm) {
    return axios.post(ScanInvoice_Base_URL_For_CrossDb + "/getInvoiceById", {
      invoicePK: invoicePK,
      companyId: companyFK,
      companyName: companyName,
      searchCriteria,
      searchTerm,
    });
  }

  /**
   * Used for Scan Invoice for Non unit search
   * Filter by Invoice Number / Last5 / Unit Number
   */
  getAllNonUnitsBySearch(
    invoiceNumber,
    unitNumber,
    poNumber,
    selectedCustomerId,
    dealerId,
    pageNumberNonUnit,
    size,
    nonUnitSortType,
    nonUnitSortValue
  ) {
    return axios.post(ScanInvoice_Base_URL_For_CrossDb + "/findNonUnitInvoice", {
      pageNumber: pageNumberNonUnit,
      size: size || 4,
      invoiceNumber: invoiceNumber || null,
      unitNumber,
      pONumber: poNumber,
      selectedCustomerId,
      dealerId,
      sortType: nonUnitSortType,
      sortValue: nonUnitSortValue,
    });
  }

  /**
    Used for Scan Invoice get by id for a non unit
**/
  getNonUnitById(invoicePK, companyFK, companyName) {
    return axios.post(ScanInvoice_Base_URL_For_CrossDb + "/getNonUnitInvoiceById", {
      invoicePK: invoicePK,
      companyId: companyFK,
      companyName: companyName,
    });
  }

  /**
   Used to get button validation flags
**/
  getbuttonValidations(companyName, companyFK, invoicePK) {
    return axios.post(ScanInvoice_Base_URL_For_CrossDb + "/getButtonFlags", {
      invoicePK: invoicePK,
      companyId: companyFK,
      companyName: companyName,
    });
  }

  savePDFFileList(payload) {
    const formData = new FormData();
    formData.append(`companyId`, payload?.companyFK);
    formData.append(`companyName`, payload?.companyName);
    formData.append(`customerFK`, payload?.customerFK);
    formData.append(`invoiceId`, payload?.invoicePK);

    if (payload?.customerUploadFiles?.length > 0) {
      payload?.customerUploadFiles?.forEach((file, fileIndex) => {
        formData.append(`CUSTOMER`, file);
      });
    }
    if (payload?.customerScanFiles?.length > 0) {
      payload?.customerScanFiles?.forEach((file, fileIndex) => {
        formData.append(`CUSTOMER`, file);
      });
    }

    if (payload?.companyUploadFiles?.length > 0) {
      payload?.companyUploadFiles.forEach((file, fileIndex) => {
        formData.append(`COMPANY`, file);
      });
    }
    if (payload?.companyScanFiles?.length > 0) {
      payload?.companyScanFiles.forEach((file, fileIndex) => {
        formData.append(`COMPANY`, file);
      });
    }

    if (payload?.bolUploadFiles?.length > 0) {
      payload?.bolUploadFiles.forEach((file, fileIndex) => {
        formData.append(`BOL`, file);
      });
    }
    if (payload?.bolScanFiles?.length > 0) {
      payload?.bolScanFiles.forEach((file, fileIndex) => {
        formData.append(`BOL`, file);
      });
    }

    if (payload?.dafUploadFiles?.length > 0) {
      payload?.dafUploadFiles.forEach((file, fileIndex) => {
        formData.append(`DAF`, file);
      });
    }
    if (payload?.dafScanFiles?.length > 0) {
      payload?.dafScanFiles.forEach((file, fileIndex) => {
        formData.append(`DAF`, file);
      });
    }

    if (payload?.iftaUploadFiles?.length > 0) {
      payload?.iftaUploadFiles.forEach((file, fileIndex) => {
        formData.append(`IFTA`, file);
      });
    }
    if (payload?.iftaScanFiles?.length > 0) {
      payload?.iftaScanFiles.forEach((file, fileIndex) => {
        formData.append(`IFTA`, file);
      });
    }

    if (payload?.breakdownUploadFiles?.length > 0) {
      payload?.breakdownUploadFiles.forEach((file, fileIndex) => {
        formData.append(`BKDN`, file);
      });
    }
    if (payload?.breakdownScanFiles?.length > 0) {
      payload?.breakdownScanFiles.forEach((file, fileIndex) => {
        formData.append(`BKDN`, file);
      });
    }

    return axios.post(ScanInvoice_Base_URL_For_CrossDb + "/savePDFFileList", formData);
  }
}
export default new ScanInvoiceService();
