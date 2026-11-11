import { axios } from "../../config/axiosInterceptors";
import { BulkReimbursement_Base_URL, QuarterScreen_RecordsPerPage } from "../constants/applicationConstants";

class BulkReimbursementService {
  getBulkReimbursementInvoiceList(searchCriteria, searchTerm, pageNumber, sortValue, sortType) {
    return axios.post(BulkReimbursement_Base_URL + "/invoiceSelection", {
      pageNumber: pageNumber,
      pageSize: QuarterScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerms: searchTerm,
      sortType: sortType,
      sortValue: sortValue,
    });
  }
  getBulkReimbursementUnitList(
    searchCriteria,
    searchTerm,
    pageNumber,
    sortValue,
    size,
    bulkInvoicePK,
    unitSortType
  ) {
    return axios.post(BulkReimbursement_Base_URL + "/unitSelection", {
      pageNumber: pageNumber,
      pageSize: 10,
      searchCriteria: searchCriteria,
      searchTerms: searchTerm,
      sortType: unitSortType,
      sortValue: sortValue,
      bulkInvoicePK: bulkInvoicePK,
    });
  }

  getById(id) {
    return axios.post(BulkReimbursement_Base_URL + "/details", {
      bulkUnitPK: id,
    });
  }

  createOrUpdateRecord(formData) {
    return axios.post(BulkReimbursement_Base_URL + "/save", formData);
  }

  savePDFFileList(payload) {
    const formData = new FormData();

    // "description": "Sample",
    //   "invoiceAmount": "100.00",
    //   "driverAmount": "50.00",
    //   "bulkUnitPK": 1
    formData.append(`description`, payload?.description);
    formData.append(`invoiceAmount`, payload?.invoiceAmount);
    formData.append(`driverAmount`, payload?.driverAmount);
    formData.append(`bulkUnitPK`, payload?.bulkUnitPK);
    formData.append(`allDriversPayTaxable`, payload?.allDriversPayTaxable);

    // formData.append(`unitNumber`, payload?.unitNumber);
    // formData.append(`unitNumber`, payload?.invoicePK);
    // formData.append(`dispatchId`, payload?.dispatchId);
    // formData.append(`invoiceNumber`, payload?.invoiceNumber);
    // customerUploadFiles,
    // companyUploadFiles,
    // bolUploadFiles,
    // dafUploadFiles,
    // iftaUploadFiles,
    // breakdownUploadFiles,
    // customerScanFiles,
    // companyScanFiles,
    // bolScanFiles,
    // dafScanFiles,
    // iftaScanFiles,
    // breakdownScanFiles,

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

    // });

    return axios.post(BulkReimbursement_Base_URL + "/save", formData);
  }
}
export default new BulkReimbursementService();
