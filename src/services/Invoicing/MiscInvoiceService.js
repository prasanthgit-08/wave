import { axios } from "../../config/axiosInterceptors";
import {
  Customer_Base_URL,
  Dealer_Base_URL,
  Misc_Invoice_Base_URL,
  Misc_Invoice_CrossDb_Base_URL,
  StandardMaintenance_RecordsPerPage,
  UnitActivation_CrossDB_URL,
} from "../constants/applicationConstants";
class MiscInvoiceService {
  /**
   *  Fetch all active companies
   */
  getAllCompanyNames() {
    return axios.get(Misc_Invoice_CrossDb_Base_URL + "/fetchAllCompanyNames");
  }

  /**
   * Fetch Current Company Name
   **/
  getCurrentCompanyName() {
    return axios.get(Misc_Invoice_CrossDb_Base_URL + "/getCurrentCompany");
  }

  /**
   * Used for Miscellaneous Invoice Selection
   * Filter by  Last5 / Unit Number
   */
  getAllUnitsBySearch(searchCriteria, searchTerm, pageNumber, size = 7, companyFK, companyName, last5, type) {
    return axios.post(Misc_Invoice_CrossDb_Base_URL + "/listUnitsForMiscellaneousInvoice", {
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      size: size,
      companyFK: companyFK,
      companyName: companyName,
      unitPK: -1,
      unitNumberLast5: last5,
      type,
    });
  }

  /**
   * Fetch Unit Details by Id
   */
  fetchUnitDetailsById(unit, companyName) {
    return axios.post(UnitActivation_CrossDB_URL + "/fetchunitdetailsbyid/", {
      unit: unit,
      companyName: companyName,
    });
  }
  /**
   * Fetch the Unit By Id
   **/
  getTheUnitDetailsById(companyFK, id) {
    return axios.get(`${Misc_Invoice_CrossDb_Base_URL}/getUnitsDataById/${companyFK}/${id}`);
  }

  /*****Get Button flags to Enable/Disable the Buttons*****/
  getButtonFlags(unitPK, companyName) {
    return axios.post(Misc_Invoice_CrossDb_Base_URL + "/fetchunitdetailsbyid/", {
      unitPK: unitPK,
      companyName: companyName,
    });
  }

  /*****
   * Save the Invoice data together with the uploaded documents from the document screen
   * in a single call (SP_Prog_MiscInvoiceSave saves the invoice and the documents together).
   * The invoice data goes as a plain JSON text field "miscellaneousInvoiceVO" (same payload as
   * before, readable in the network tab); only the files are binary ("customerFiles" / "companyFiles").
   *****/
  saveInvoiceData(miscInvoiceFormData, customerPaperworkFiles, companyPaperworkFiles) {
    const formData = new FormData();
    formData.append("miscellaneousInvoiceVO", JSON.stringify(miscInvoiceFormData ?? {}));
    customerPaperworkFiles?.forEach((file) => {
      formData.append("customerFiles", file);
    });
    companyPaperworkFiles?.forEach((file) => {
      formData.append("companyFiles", file);
    });
    return axios.post(`${Misc_Invoice_Base_URL}/saveMiscellaneousInvoiceData`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // savePDFFileList(payload) {
  //   const formData = new FormData();
  //   formData.append(`companyId`, payload?.companyFK);
  //   formData.append(`companyName`, payload?.companyName);
  //   formData.append(`customerFK`, payload?.customerFK);
  //   formData.append(`invoiceId`, payload?.invoicePK);

  //   if (payload?.customerUploadFiles?.length > 0) {
  //     payload?.customerUploadFiles?.forEach((file, fileIndex) => {
  //       formData.append(`CUSTOMER`, file);
  //     });
  //   }
  //   if (payload?.customerScanFiles?.length > 0) {
  //     payload?.customerScanFiles?.forEach((file, fileIndex) => {
  //       formData.append(`CUSTOMER`, file);
  //     });
  //   }

  //   if (payload?.companyUploadFiles?.length > 0) {
  //     payload?.companyUploadFiles.forEach((file, fileIndex) => {
  //       formData.append(`COMPANY`, file);
  //     });
  //   }
  //   if (payload?.companyScanFiles?.length > 0) {
  //     payload?.companyScanFiles.forEach((file, fileIndex) => {
  //       formData.append(`COMPANY`, file);
  //     });
  //   }

  //   return axios.post(Misc_Invoice_CrossDb_Base_URL + "/savePDFFileList", formData);
  // }

  /*****
   * Used for Unit selection Lookup in the
   * Unit Selection page
   *****/
  getAllUnitNumbersLookupforMiscInvoice(
    globalSearchTerm,
    unitLast5,
    pageNumber,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortValue,
    normalSortFlag,
    unitType,
    orderType,
    dateType,
    dateFrom,
    dateTo,
    unitStatus,
    pickupBy,
    deliveryBy,
    unitOrderStatus,
    unitDelayType,
    dispatchDelayType,
    advancedSearchString,
    advancedSearchByInputs,
    customerId,
    customerPlantId,
    dealerId,
    companyName
  ) {
    // Construct the payload
    const payload = {
      unitSelection: true,
      type: "Lookup",
      searchTerm: globalSearchTerm,
      unitNumberLast5: unitLast5,
      pageNumber: pageNumber,
      pageSize: 18,
      searchCriteria: selectedSearchCriteria,
      units: { ...advancedSearchPayload, pageNumber: pageNumber, pageSize: 18, miscInvoice: 1 },
      advanceSortingOrder: advancedSortingOrder,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      unitTypeSearchCriteria: unitType,
      orderType: orderType,
      dateType: dateType,
      fromDate: dateFrom,
      toDate: dateTo,
      unitStatus: unitStatus,
      pickupBy: pickupBy,
      deliveryBy: deliveryBy,
      unitOrderStatus: unitOrderStatus,
      unitDelayType: unitDelayType,
      dispatchDelayType: dispatchDelayType,
      advancedSearchString: advancedSearchString,
      advancedSearchBy: advancedSearchByInputs,
      customerId: customerId,
      customerPlantsId: customerPlantId,
      dealerId: dealerId,
      companyName: companyName,
      miscInvoice: 1,
    };
    // Make the API call
    return axios.post(UnitActivation_CrossDB_URL + "/getAllUnitNumbers", payload);
  }

  /******
   * Used For Customer Auto Complete in Misc Invoice
   * ****/
  fetchCustomerAutoComplete(String) {
    return axios.post(Customer_Base_URL + "/getallcustomers", {
      active: 1,
      number: 0,
      size: 100,
      customers: null,
      searchCriteria: "Beginning",
      advanceSortingOrder: null,
      searchTerms: String,
      sortValue: "addDate",
      sortType: false,
      selectedCustomerStatus: "Complete",
      type: "Autocomplete",
      isMiscInvoice: 1,
    });
  }
  /*********
   * Get the Dealer for Auto Complete dropdowns for non unit miscellaneos Invoice
   * ****/
  getDealerByName(searchString, customerId) {
    return axios.post(Dealer_Base_URL + "/fetchdealers", {
      active: null,
      number: 0,
      size: 9,
      searchCriteria: "Beginning",
      searchTerms: searchString,
      selectedDealerStatus: "Complete",
      isOEPP: "AutocompleteByName",
      isMiscInvoice: 1,
      customerFK: customerId,
    });
  }

  getDealers(
    active,
    pageNumber,
    dealer,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedDealerStatus,
    advancedSearchString,
    advancedSearchBy,
    recordsPerPage,
    customerId
  ) {
    let dealerStatus = null;
    if (active === "Active") {
      dealerStatus = 1;
    } else if (active === "Inactive") {
      dealerStatus = 0;
    }

    return axios.post(Dealer_Base_URL + "/fetchdealers", {
      active: dealerStatus,
      number: pageNumber,
      size: recordsPerPage || StandardMaintenance_RecordsPerPage,
      dealer: dealer,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedDealerStatus: selectedDealerStatus,
      isOEPP: "Lookup",
      advancedSearchString,
      advancedSearchBy,
      isMiscInvoice: true,
      customerFK: customerId,
    });
  }
  /**
   * Fetch the Existing Invoices By UnitId
   **/
  getExistingInvoicesById(unitId) {
    return axios.get(`${Misc_Invoice_Base_URL}/getexistingmiscinvoices/${unitId}`);
  }

  getExistingMiscInvoicesStatus(unitId) {
    return axios.get(`${Misc_Invoice_CrossDb_Base_URL}/checkmiscellaneous/${unitId}`);
  }

  /**
   * Fetch the Existing InvoiceDetails By invoiceId
   **/
  getExistingInvoiceDetailsByInvoiceId(invoiceFK) {
    return axios.get(`${Misc_Invoice_Base_URL}/getexistingmiscinvoicesdetails/${invoiceFK}`);
  }
  /****
   * Get the status to navigate to the credit Card Screen
   ****/
  getCreditCardStatus(id, customerId, companyPK, invoiceSisterCustomer, isSisterCompany) {
    return axios.post(Misc_Invoice_Base_URL + "/getcreditcardscreenstatus/", {
      unitId: id !== undefined ? id : -1, // Pass id if defined, otherwise -1
      customerId,
      companyPK,
      invoiceSisterCustomer,
      isSisterCompany,
    });
  }

  // /******
  //  * Create a new record on Statement Details and
  //  * Invoice Batches table
  //  * ****/
  // saveStatementDetailsandInvoiceBatches(
  //   unitPK,
  //   customerId,
  //   companyFK,
  //   invoiceId,
  //   invoiceAmount,
  //   invoiceSisterCustomer,
  //   isSisterCompany,
  //   sisterUnitPK,
  //   sisterCustomerId,
  //   sisterInvoiceId,
  //   sisterInvoiceAmount,
  //   isNonUnitInvoice
  // ) {
  //   const formData = new FormData();
  //   // Append other form fields
  //   formData.append("customerId", customerId);
  //   formData.append("invoiceId", invoiceId);
  //   formData.append("invoiceAmount", invoiceAmount);
  //   // Conditionally append unitPK (omit if isNonUnitInvoice is true)
  //   if (!isNonUnitInvoice) {
  //     if (unitPK != null) {
  //       formData.append("unitPK", unitPK);
  //     } else {
  //       formData.append("unitPK", sisterUnitPK);
  //     }
  //   }
  //   if (isNonUnitInvoice) {
  //     formData.append("customerId", customerId);
  //   }
  //   formData.append("isNonUnitInvoice", isNonUnitInvoice);
  //   formData.append("isSisterCompany", isSisterCompany);
  //   formData.append("invoiceSisterCustomer", invoiceSisterCustomer);
  //   formData.append("companyFK", companyFK);
  //   if (sisterInvoiceId != null) formData.append("sisterInvoiceId", sisterInvoiceId);
  //   if (sisterCustomerId != null) formData.append("sisterCustomerId", sisterCustomerId);
  //   if (sisterUnitPK != null) formData.append("sisterUnitPK", sisterUnitPK);
  //   if (sisterInvoiceAmount != null) formData.append("sisterInvoiceAmount", sisterInvoiceAmount);
  //   return axios.post(Misc_Invoice_Base_URL + "/saveInvoiceDetailsandStatements", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // }

  /********Alternate customer screen API */
  getNotCrossCompanyAlternateCustomer(unitFK) {
    return axios.get(`${Misc_Invoice_Base_URL}/getNotCrossCompanyAlternateCustomer/${unitFK}`);
  }

  /******Get the company daya by given id******/
  getCompanyDataByid(id) {
    return axios.get(`${Misc_Invoice_Base_URL}/getCompanyData/${id}`);
  }

  /**
   * Get the dispatch status of a unit.
   **/
  getDispatchStatus(id, companyName) {
    return axios.post(Misc_Invoice_CrossDb_Base_URL + "/getDispatchStatus", {
      unitPK: id,
      companyName: companyName ? companyName?.trim() : "",
    });
  }
}
export default new MiscInvoiceService();
