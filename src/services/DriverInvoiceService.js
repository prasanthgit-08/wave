import { axios } from "../config/axiosInterceptors";
import {
  Document_Blob_Base_URL,
  Driver_Invoice_CrossdbUrl,
  Driver_Invoice_Url,
  DriverReserve_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class DriverInvoiceService {
  getAll(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag, driverFK) {
    return axios.post(`${DriverReserve_Base_URL}/allDriverReserves`, {
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      sortValue: sortValue,
      sortType: sortFlag,
      driverFKInt: driverFK,
    });
  }

  getDriverReserve(id) {
    return axios.get(`${DriverReserve_Base_URL}/getDriverReserve/${id}`);
  }

  saveManualDriverEntry(manualEntryData) {
    return axios.post(`${Driver_Invoice_Url}/saveManualDriverInvoice`, manualEntryData);
  }
  saveDriverInvoice(driverInvoiceTextData, invoiceDetailsData, manualEntryData) {
    return axios.post(
      `${Driver_Invoice_Url}/save`,
      driverInvoiceTextData,
      invoiceDetailsData,
      manualEntryData
    );
  }

  getAllCompanyNames() {
    return axios.get(Driver_Invoice_Url + "/getAllCompanyNames");
  }

  /**
   * Fetch Current Company Name
   **/
  getCurrentCompanyName() {
    return axios.get(Driver_Invoice_Url + "/getCurrentCompany");
  }

  saveDriverInvoiceDetails(driverInvoiceTextData) {
    return axios.post(`${Driver_Invoice_Url}/saveDriverInvoice`, driverInvoiceTextData);
  }

  driverInvoiceEmailDetails(emailToDriver, emailToUser, emailToCustomer) {
    return axios.post(`${Driver_Invoice_CrossdbUrl}/saveDriverInvoice`, {
      emailToDriver: emailToDriver,
      emailToUser: emailToUser,
      emailToCustomer: emailToCustomer,
      programNumber: "7",
    });
  }

  savePDFFileList(
    payload,
    unitFK,
    miscellaneousUnit,
    invoicePK,
    print,
    emailToDriver,
    emailToUser,
    customerEmail
  ) {
    const formData = new FormData();
    if (unitFK === 0) {
      formData.append(`description`, miscellaneousUnit);
    } else {
      formData.append(`description`, "Invoice");
    }

    formData.append("unitFK", unitFK);
    formData.append(`name`, "Driver Invoice");
    formData.append("InvoicePK", invoicePK);
    formData.append("print", print);
    formData.append("emailToDriver", emailToDriver);
    formData.append("emailToUser", emailToUser);
    formData.append("customerEmail", customerEmail);

    if (payload?.paperworkUploadFiles?.length > 0) {
      payload?.paperworkUploadFiles?.forEach((file, fileIndex) => {
        formData.append(`PAPERWORK`, file);
      });
    }
    if (payload?.paperworkScanFiles?.length > 0) {
      payload?.paperworkScanFiles?.forEach((file, fileIndex) => {
        formData.append(`PAPERWORK`, file);
      });
    }
    return axios.post(Document_Blob_Base_URL + "/commonSave", formData);
  }

  getAllInvoiceBySearch(
    searchCriteria,
    pageNumber,
    sortType,
    sortValue,
    unitNumber,
    last5,
    unitFK,
    companyFK
  ) {
    return axios.post(Driver_Invoice_Url + "/unitSelection", {
      searchCriteria: searchCriteria,
      pageNumber: pageNumber,
      pageSize: 4,
      companyFK: companyFK,
      sortType: sortType ? 1 : 0,
      sortValue: sortValue || "",
      unitNumber,
      unitNumberLast5: last5 || "",
      unitFK: 0,
    });
  }

  getUnitNumberAutoComplete(unitNumber, unitNumberLast5, unitFK, companyFK) {
    return axios.post(Driver_Invoice_Url + "/unitNumberAutoComplete", {
      companyFK: companyFK,
      unitNumber,
      unitNumberLast5: unitNumberLast5 || "",
      unitFK,
    });
  }

  getById(unitFK, companyFK) {
    return axios.post(Driver_Invoice_Url + "/getById", {
      companyFK: companyFK,
      unitNumber: "",
      unitNumberLast5: "",
      unitFK,
    });
  }
}

export default new DriverInvoiceService();
