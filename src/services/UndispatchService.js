import { axios } from "../config/axiosInterceptors";
import {
  Customer_Base_URL,
  Undispatch_CrossDB_URL,
  Unit_Addresses_Base_URL,
  Undispatch_Base_URL,
  Undispatch_Cross_DB_URL,
} from "./constants/applicationConstants";

class UndispatchService {
  /**
   * Unit selection list
   */
  getUnitSelectionBrowseData(driverFK, pageNumber, size, sortValue, sortType) {
    return axios.post(Undispatch_Cross_DB_URL + "/getAllDispatches", {
      driverFK,
      pageNumber,
      size,
      sortValue: sortValue ? sortValue : "",
      sortType: sortType ? 1 : 0,
    });
  }

  /**
   * Used to get details of dispatch record
   */
  getDispatchData(dispatchId) {
    return axios.get(Undispatch_Cross_DB_URL + "/get-dispatch/" + dispatchId);
  }

  /**
   * Used to check EquipmentHistory record exist for selected DispatchFK
   */
  checkEquipmentHistoryRecordExist(dispatchId) {
    return axios.get(Undispatch_Cross_DB_URL + "/check-equipment-history/" + dispatchId);
  }

  //undispatch save
  undispatchRecord(
    dispatchId,
    conditionIssue,
    activationStatus,
    equipment,
    unitOnHold,
    deleteUnit,
    attemptedPickup,
    undispatchReason,
    payback,
    checkedinList,
    reasonForActivationDelay,
    holdAuthorizedBy,
    holdNote,
    holdReason,
    deleteReason,
    driverAmount,
    invoiceAmount,
    apuAuthorizedBy,
    invoiceText1,
    invoiceText2,
    invoiceText3,
    invoiceText4,
    invoiceBillingCustomerId,
    releaseDriver,
    delayedUnitPK,
    monetraChargesVOList,
    transIds,
    unitId,
    company,
    deliveryDealerFlag,
    overWidth,
    sisterNotification,
    documentFlag,
    chargeCreditCard,
    deleteChargeCreditCard,
    breakdown,
    miscellaneousText2,
    miscellaneousText3,
    miscellaneousText4,
    miscellaneousText5,
    miscellaneousText6,
    miscellaneousText7,
    miscellaneousText8,
    miscellaneousText9,
    miscellaneousText10
  ) {
    return axios.post(Undispatch_Cross_DB_URL + "/onUndispatch", {
      dispatchId,
      conditionIssue,
      activationStatus,
      equipment,
      unitOnHold,
      deleteUnit,
      attemptedPickup,
      undispatchReason,
      payback,
      equipmentList: checkedinList,
      reasonForDispatchDelay: reasonForActivationDelay,
      authorizedBy: holdAuthorizedBy,
      noteForHold: holdNote,
      reasonForHold: holdReason,
      deleteReason,
      driverAmount,
      invoiceAmount,
      apuAuthorizedBy,
      invoiceText1,
      invoiceText2,
      invoiceText3,
      invoiceText4,
      invoiceBillingCustomerId,
      releaseDriver,
      delayedUnitPK,
      monetraChargesVOList,
      transIds,
      unitId,
      company,
      deliveryDealerFlag,
      overWidth,
      sisterNotification,
      documentFlag,
      chargeCreditCard,
      deleteChargeCreditCard,
      breakdown,
      miscellaneousText2,
      miscellaneousText3,
      miscellaneousText4,
      miscellaneousText5,
      miscellaneousText6,
      miscellaneousText7,
      miscellaneousText8,
      miscellaneousText9,
      miscellaneousText10,
    });
  }

  /**
   *Equipment History list
   */
  getEquipmentHistoryData(dispatchFK, pageNumber, size, sortValue, sortType) {
    return axios.post(Undispatch_Cross_DB_URL + "/equipment-history-data", {
      dispatchFK,
      pageNumber,
      size,
      sortValue,
      sortType,
    });
  }

  getSplitTripMilesData(dispatchFK, miscellaneousDealer) {
    return axios.post(Undispatch_Cross_DB_URL + "/get-split-trip-data", {
      dispatchPK: dispatchFK,
      unitAddressesVO: miscellaneousDealer,
    });
  }

  getButtonFlags(dispatchPK) {
    return axios.get(Undispatch_Cross_DB_URL + "/getButtonFlags/" + dispatchPK);
  }

  saveSplitTripDocuments(
    dispatchPK,
    customerPaperworkFiles,
    companyPaperworkFiles,
    bolFiles,
    dafFiles,
    iftaFiles,
    releaseAtPickupLocation
  ) {
    const formData = new FormData();

    // Append each file array to FormData with appropriate keys
    if (customerPaperworkFiles?.length > 0) {
      customerPaperworkFiles?.forEach((file, index) => {
        formData.append("customerFiles", file);
      });
    }

    if (companyPaperworkFiles?.length > 0) {
      companyPaperworkFiles?.forEach((file, index) => {
        formData.append("companyFiles", file);
      });
    }

    if (bolFiles?.length > 0) {
      bolFiles?.forEach((file, index) => {
        formData.append("bolFiles", file);
      });
    }

    if (dafFiles?.length > 0) {
      dafFiles?.forEach((file, index) => {
        formData.append("dafFiles", file);
      });
    }

    if (iftaFiles?.length > 0) {
      iftaFiles?.forEach((file, index) => {
        formData.append("iftaFiles", file);
      });
    }
    formData.append("dispatchId", dispatchPK);
    formData.append("releaseAtPickupLocation", releaseAtPickupLocation);
    return axios.post(Undispatch_Cross_DB_URL + "/savePdfs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  onSplit(data) {
    return axios.post(Undispatch_Cross_DB_URL + "/on-split", data);
  }

  getAPUData(dispatchId) {
    return axios.get(Undispatch_Cross_DB_URL + "/get-apu-data/" + dispatchId);
  }
  //customers
  getAllCustomersForLookup(
    pageNo,
    searchedCustomer,
    selectedSearchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    alternateAPUCustomerGroupFK,
    customerPK,
    companyName
  ) {
    return axios.post(Undispatch_Cross_DB_URL + "/getCustomerList", {
      number: pageNo,
      size: 15,
      customers: searchedCustomer,
      searchCriteria: selectedSearchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedCustomerStatus: "Complete",
      alternateAPUCustomerGroupFK: alternateAPUCustomerGroupFK,
      isApu: 1,
      customerPK: customerPK,
      companyName: companyName,
      active: 1,
    });
  }

  getAllCustomerByName(searchCustomer, alternateAPUCustomerGroupFK, customerPK, companyName) {
    return axios.post(Undispatch_Cross_DB_URL + "/getCustomerList", {
      active: 1,
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchCustomer,
      selectedCustomerStatus: "Complete",
      type: "Autocomplete",
      alternateAPUCustomerGroupFK: alternateAPUCustomerGroupFK,
      isApu: 1,
      customerPK: customerPK,
      companyName: companyName,
    });
  }

  saveApuDocuments(
    dispatchPK,
    invoiceId,
    localCompanyName,
    sisterInvoiceId,
    invoiceNumber,
    sisterInvoiceNumber,
    sisterCompanyName,
    sisterUserFK,
    invoiceBillingCustomerId,
    customerApuPaperworkFiles,
    companyApuPaperworkFiles,
    chargeCreditcard
  ) {
    const formData = new FormData();

    // Append each file array to FormData with appropriate keys
    if (customerApuPaperworkFiles?.length > 0) {
      customerApuPaperworkFiles?.forEach((file, index) => {
        formData.append("customerFiles", file);
      });
    }

    if (companyApuPaperworkFiles?.length > 0) {
      companyApuPaperworkFiles?.forEach((file, index) => {
        formData.append("companyFiles", file);
      });
    }

    formData.append("dispatchId", dispatchPK);
    formData.append("invoiceId", invoiceId);
    formData.append("sisterInvoiceId", sisterInvoiceId);
    formData.append("invoiceNumber", invoiceNumber);
    formData.append("sisterInvoiceNumber", sisterInvoiceNumber);
    formData.append("invoiceBillingCustomerId", invoiceBillingCustomerId);
    formData.append("localCompanyName", localCompanyName);
    formData.append("sisterCompanyName", sisterCompanyName);
    formData.append("sisterUserFK", sisterUserFK);
    formData.append("chargeCreditcard", chargeCreditcard);
    return axios.post(Undispatch_Cross_DB_URL + "/saveApuPdfs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  hasCreditCardOnDelete(dispatchPK) {
    return axios.get(Undispatch_Cross_DB_URL + "/hasCreditCardOnDelete/" + dispatchPK);
  }

  fetchMiscDealerByIdCrossDB(id, companyId) {
    return axios.get(Unit_Addresses_Base_URL + "/fetchMiscDealerById/" + id + "/" + companyId);
  }

  /****
   * Get the status to navigate to the credit Card Screen
   ****/
  getCreditCardStatus(unitPK, customerPK, companyPK, isSisterCompany) {
    return axios.post(Undispatch_Base_URL + "/getcreditcardscreenstatus/", {
      unitPK,
      customerPK,
      companyPK,
      invoiceSisterCustomer: isSisterCompany ? 1 : 0,
      isSisterCompany,
    });
  }
}
export default new UndispatchService();
