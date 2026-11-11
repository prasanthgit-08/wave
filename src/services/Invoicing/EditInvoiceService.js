import { axios } from "../../config/axiosInterceptors";
import {
  EditInvoice_Base_URL_For_CrossDb,
  UnitActivation_CrossDB_URL,
} from "../constants/applicationConstants";

class EditInvoiceService {
  /**
   *  Fetch all active companies
   */
  getAllCompanyNames() {
    return axios.get(EditInvoice_Base_URL_For_CrossDb + "/getAllCompanyNames");
  }

  /**
   * Fetch Current Company Name
   **/
  getCurrentCompanyName() {
    return axios.get(EditInvoice_Base_URL_For_CrossDb + "/getCurrentCompany");
  }

  /**
   * Used for Edit Invoice Selection
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
    return axios.post(EditInvoice_Base_URL_For_CrossDb + "/findInvoiceBySearchTerm", {
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
   * Used for Edit Invoice get by id
   */
  getInvoiceById(invoicePK, companyFK, companyName, searchCriteria, searchTerm) {
    return axios.post(EditInvoice_Base_URL_For_CrossDb + "/getInvoiceById", {
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
    return axios.post(EditInvoice_Base_URL_For_CrossDb + "/getNonUnitInvoiceById", {
      invoicePK: invoicePK,
      companyId: companyFK,
      companyName: companyName,
    });
  }

  /**
   * Used for fetching invoice details by passing invoice FK
   */
  getInvoiceDetailsById(invoicePK, companyFK, companyName, detailsPageNumber, detailsSize) {
    return axios.post(EditInvoice_Base_URL_For_CrossDb + "/getInvoiceDetails", {
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
    pONumber,
    selectedCustomerId,
    dealerId,
    pageNumberNonUnit,
    size,
    nonUnitSortType,
    nonUnitSortValue
  ) {
    return axios.post(EditInvoice_Base_URL_For_CrossDb + "/findNonUnitInvoice", {
      pageNumber: pageNumberNonUnit,
      size: size || 4,
      invoiceNumber: invoiceNumber || null,
      unitNumber,
      pONumber,
      selectedCustomerId,
      dealerId,
      sortType: nonUnitSortType,
      sortValue: nonUnitSortValue,
    });
  }

  saveNewInvoice(saveEditInvoice) {
    return axios.post(EditInvoice_Base_URL_For_CrossDb + "/saveEditInvoice", saveEditInvoice);
  }

  getAllUnitNumbersLookupforInvoice(
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
      // miscInvoice: 1,
    };
    // Make the API call
    return axios.post(UnitActivation_CrossDB_URL + "/getAllUnitNumbers", payload);
  }

  isCreditCrdRequired(invoicePK) {
    return axios.post(EditInvoice_Base_URL_For_CrossDb + "/isCreditCrdRequired", { invoicePK: invoicePK });
  }
}
export default new EditInvoiceService();
