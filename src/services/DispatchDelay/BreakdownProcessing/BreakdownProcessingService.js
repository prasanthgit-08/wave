import {
  BackEnd_Base_URL,
  Breakdown_Invoice_Base_URL,
  Breakdown_Operations_Crossdb_URL,
  CrossDB_CustomerPlants_Base_URL,
  CrossDB_Dealer_Base_URL,
  Delay_Operations_Crossdb_URL,
  HalfScreen_RecordsPerPage,
} from "../../../services/constants/applicationConstants";
import { axios } from "../../../config/axiosInterceptors";

import {
  AutoCompleteDropdown_No_Of_Records,
  Breakdown_Browse_URL,
  DelayProcessing_Base_URL,
  EditMasterUnitSelection_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
} from "../../constants/applicationConstants";

class BreakdownProcessingService {
  getBreakdownBrowseDetails(browseInput) {
    return axios.post(`${Breakdown_Browse_URL}/browse`, browseInput);
  }

  getBreakdownInfo(breakdownInput) {
    return axios.post(`${Breakdown_Browse_URL}/fetchBreakdown`, breakdownInput);
  }

  saveBreakdown(breakdownData) {
    return axios.post(`${Breakdown_Browse_URL}/save`, breakdownData);
  }

  getDelayBreakdownDetails(tab, unitPK, companyName, breakdownPk, pageNumber, pageSize, sortValue, sortType) {
    return axios.post(`${Breakdown_Browse_URL}/details`, {
      tab,
      unitPK: unitPK,
      company: companyName,
      breakdownPk: breakdownPk,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortValue: sortValue,
      sortType: sortType,
    });
  }

  getBreakdownUnitCodesForAutoComplete(searchTerm, companyName) {
    return axios.post(DelayProcessing_Base_URL + "/delayedUnitPage", {
      searchCriteria: "Beginning",
      searchTerm,
      pageNumber: 0,
      size: 100,
      breakdown: 1,
      delay: 1,
      isLookup: 1,
      company: companyName,
    });
  }

  fetchAllDealerDetailsByName(searchDealer, companyName) {
    return axios.post(CrossDB_Dealer_Base_URL + "/fetchdealers", {
      active: 1,
      number: 0,
      size: 14,
      searchCriteria: "Beginning",
      searchTerms: searchDealer,
      selectedDealerStatus: "Complete",
      type: "AutocompleteByName",
      companyName: companyName,
      includePostalCodePK: 1,
    });
  }

  fetchAllPlantdetailsByName(searchPlant, companyName) {
    return axios.post(CrossDB_CustomerPlants_Base_URL + "/getallplantsbycustomer", {
      active: 1,
      number: 0,
      size: 19,
      searchCriteria: "Beginning",
      searchTerms: searchPlant,
      selectedCustomerPlantStatus: "Complete",
      type: "Autocomplete",
      companyName: companyName,
      includePostalCodePK: 1,
      usePlants: true,
    });
  }

  getBreakdownInvoiceData(id, companyName, sortValue, sortFlag) {
    return axios.post(`${BackEnd_Base_URL}delayBreakdownInvoice/expenseAndFeeFetch`, {
      delayedUnitBreakDownFK: id,
      companyName: companyName,
      pageNumber: 0,
      pageSize: 100,
      sortValue: sortValue,
      sortType: sortFlag,
      Flag: 1,
    });
  }

  saveBreakdownInvoice(saveExpensesRequest) {
    return axios.post(Breakdown_Invoice_Base_URL + "/expenseAndFeeInvoiceSave", saveExpensesRequest);
  }

  savePDFFileList(payload) {
    const formData = new FormData();
    formData.append("invoicePK", payload?.invoicePK);
    formData.append("companyName", payload?.companyName);
    formData.append("localCompany", payload?.localCompany);
    formData.append("sisterInvoicePK", payload?.sisterInvoicePK);
    formData.append("delayedUnitBreakDownFK", payload?.delayedUnitBreakDownFK);

    if (payload?.customerUploadFiles?.length > 0) {
      payload?.customerUploadFiles?.forEach((file, fileIndex) => {
        formData.append("CUSTOMER", file);
      });
    }
    if (payload?.customerScanFiles?.length > 0) {
      payload?.customerScanFiles?.forEach((file, fileIndex) => {
        formData.append("CUSTOMER", file);
      });
    }

    if (payload?.companyUploadFiles?.length > 0) {
      payload?.companyUploadFiles.forEach((file, fileIndex) => {
        formData.append("COMPANY", file);
      });
    }
    if (payload?.companyScanFiles?.length > 0) {
      payload?.companyScanFiles.forEach((file, fileIndex) => {
        formData.append("COMPANY", file);
      });
    }

    return axios.post(Breakdown_Invoice_Base_URL + "/save", formData);
  }

  //used for Breakdown shuttle
  getDelayBreakdownInformation(id) {
    return axios.post(Breakdown_Browse_URL + "/delay-breakdown-values/" + id);
  }

  sendNotificationEmail(company, source, id) {
    //sendEmail/{companyName}/{emailSource}/{id}
    return axios.post(DelayProcessing_Base_URL + "/sendEmail/" + company + "/" + source + "/" + id);
  }

  sendUpdateNotificationEmail(company, source, id) {
    //sendUpdateEmail/{companyName}/{emailSource}/{id}
    return axios.post(DelayProcessing_Base_URL + "/sendUpdateEmail/" + company + "/" + source + "/" + id);
  }

  getDocumentsForBreakdownView(documentPageNumber, id) {
    return axios.post(`${Breakdown_Browse_URL}/documentBlobBrowseDelayBreakdown`, {
      documentPageNumber: documentPageNumber,
      delayedUnitBreakdownPK: id,
      documentPageSize: 16,
    });
  }

  viewBreakdownDocument(blobKey) {
    return axios.post(`${Breakdown_Browse_URL}/fetchDocumentBlobDelayBreakdownByID`, {
      blobKey: blobKey,
    });
  }

  processCacheSave(documentTypeId, description, damageFiles) {
    const formData = new FormData();

    formData.append(`documentTypePK`, documentTypeId);
    formData.append(`description`, description);

    if (damageFiles?.length > 0) {
      damageFiles?.forEach((file, fileIndex) => {
        formData.append(`PAPERWORK`, file);
      });
    }

    return axios.post(`${Breakdown_Browse_URL}/saveDocumentBlobDelayBreakdown`, formData);
  }

  //breakdown view fetch
  getBreakdownViewDetails(tab, breakdownPK, pageNumber, pageSize, sortValue, sortType, companyName) {
    return axios.post(Breakdown_Operations_Crossdb_URL + "/getBreakdownViewDetail", {
      tab,
      breakdownPK,
      pageNumber,
      pageSize,
      sortValue,
      sortType,
      companyName,
    });
  }
  //delayedunitcode lookup-breakdown
  getLookupForBreakdownCodes(
    selectedSearchCriteria,
    searchTerms,
    pageNumber,
    sortValue,
    sortFlag,
    companyName,
    breakdownPK
  ) {
    return axios.post(Delay_Operations_Crossdb_URL + "/delayedUniCodeDropDown", {
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: pageNumber,
      sortValue: sortValue,
      sortType: sortFlag,
      pageSize: QuarterScreen_RecordsPerPage,
      type: "BREAKDOWN",
      companyName: companyName,
      delayedUnitPK: breakdownPK,
    });
  }

  //delayedunitcode autocomplete-breakdown
  getAutoCompleteForBreakdownCodes(searchTerm, companyName, breakdownPK) {
    return axios.post(Delay_Operations_Crossdb_URL + "/delayedUniCodeDropDown", {
      searchCriteria: "Beginning",
      searchTerm,
      pageNumber: 0,
      pageSize: 100,
      type: "BREAKDOWN",
      companyName: companyName,
      delayedUnitPK: breakdownPK,
    });
  }

  //Documenttype Lookup
  getDocumentTypeForLookup(documentPayload) {
    return axios.post(Breakdown_Browse_URL + "/dealerPlantLookup", {
      searchCriteria: documentPayload?.selectedSearchCriteria,
      searchTerm: documentPayload?.searchTerms,
      pageNumber: documentPayload?.pageNumber,
      pageSize: QuarterScreen_RecordsPerPage,
      sortValue: documentPayload?.normalSortValue,
      sortType: documentPayload?.normalSortFlag,
      companyName: documentPayload?.breakdownCompanyName,
      unitFK: documentPayload?.breakdownUnitFK,
      type: "DOCUMENT",
    });
  }

  //Documenttype autocomplete
  getDocumentTypeForAutoComplete(string, company, unitFK) {
    return axios.post(Breakdown_Browse_URL + "/dealerPlantLookup", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      pageSize: 100,
      sortValue: "",
      sortType: 0,
      companyName: company,
      type: "DOCUMENT",
      unitFK: unitFK,
    });
  }

  //Repair Plant Autocomplete
  geActiveRepairPlantForAutoComplete(string, company, unitFK) {
    return axios.post(Breakdown_Browse_URL + "/dealerPlantLookup", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      pageSize: 100,
      sortValue: "",
      sortType: 0,
      companyName: company,
      type: "PLANT",
      unitFK: unitFK,
    });
  }

  //Repair Dealer Autocomplete
  geActiveRepairDealerForAutoComplete(string, company, unitFK) {
    return axios.post(Breakdown_Browse_URL + "/dealerPlantLookup", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      pageSize: 100,
      sortValue: "",
      sortType: 0,
      companyName: company,
      type: "DEALER",
      unitFK: unitFK,
    });
  }

  //Repair Plant Lookup
  getAllActiveCustomerPlants(plantPayload) {
    return axios.post(Breakdown_Browse_URL + "/dealerPlantLookup", {
      searchCriteria: plantPayload?.plantSelectedSearchCriteria,
      searchTerm: plantPayload?.plantSearchTerms,
      pageNumber: plantPayload?.plantPageNumber,
      pageSize: HalfScreen_RecordsPerPage,
      sortValue: plantPayload?.plantSortValue,
      sortType: plantPayload?.plantSortFlag,
      companyName: plantPayload?.breakdownCompanyName,
      unitFK: plantPayload?.breakdownUnitFK,
      type: "PLANT",
      name: plantPayload?.searchedCustomerPlant?.name,
      brand: plantPayload?.searchedCustomerPlant?.brand,
      productLine: plantPayload?.searchedCustomerPlant?.productLine,
      advanceSearch: !!(
        plantPayload?.searchedCustomerPlant?.name?.trim() ||
        plantPayload?.searchedCustomerPlant?.brand?.trim() ||
        plantPayload?.searchedCustomerPlant?.productLine?.trim()
      ),
    });
  }
  //Repair Dealer Lookup
  getAllDealersForLookup(dealerPayload) {
    return axios.post(Breakdown_Browse_URL + "/dealerPlantLookup", {
      searchCriteria: dealerPayload?.dealerSelectedSearchCriteria,
      searchTerm: dealerPayload?.dealerSearchTerm,
      pageNumber: dealerPayload?.dealerPageNumber,
      pageSize: HalfScreen_RecordsPerPage,
      sortValue: dealerPayload?.dealerSortValue,
      sortType: dealerPayload?.dealerSortFlag,
      companyName: dealerPayload?.breakdownCompanyName,
      type: "DEALER",
      name: dealerPayload?.searchedDealer?.name,
      dba: dealerPayload?.searchedDealer?.dba,
      city: dealerPayload?.searchedDealer?.city,
      stateCode: dealerPayload?.searchedDealer?.stateCode,
      unitFK: dealerPayload?.breakdownUnitFK,
      advanceSearch: !!(
        dealerPayload?.searchedDealer?.name?.trim() ||
        dealerPayload?.searchedDealer?.dba?.trim() ||
        dealerPayload?.searchedDealer?.stateCode?.trim() ||
        dealerPayload?.searchedDealer?.city?.trim()
      ),
      firstField: dealerPayload?.advanceSortingOrder?.firstField,
      secondField: dealerPayload?.advanceSortingOrder?.secondField,
      thirdField: dealerPayload?.advanceSortingOrder?.thirdField,
      fourthField: dealerPayload?.advanceSortingOrder?.fourthField,
      advanceSort: !!(
        dealerPayload?.advanceSortingOrder?.firstField?.trim() ||
        dealerPayload?.advanceSortingOrder?.secondField?.trim() ||
        dealerPayload?.advanceSortingOrder?.thirdField?.trim() ||
        dealerPayload?.advanceSortingOrder?.fourthField?.trim()
      ),
    });
  }

  // Delay Breakdown Invoice - BOL pdf fetch call
  getBOLpdf(unitFkScanInvoice, sisterUnitFk, breakdownCompanyName) {
    return axios.post(Breakdown_Invoice_Base_URL + "/BOLpdf", {
      unitFK: unitFkScanInvoice || sisterUnitFk,
      companyName: breakdownCompanyName,
    });
  }
}
export default new BreakdownProcessingService();
