import { axios } from "../../config/axiosInterceptors";
import {
  DelayedUnitExpenses_Base_URL_For_CrossDB,
  DelayedUnitFee_Base_URL_For_CrossDB,
  DriverCheckin_Base_URL,
  Invoicing_Base_URL_For_CrossDb,
  QuarterScreen_RecordsPerPage,
  FullScreenLookup_RecordsPerPage2,
  BackEnd_Base_URL,
  AmountScreen_Base_URL_For_CrossDb,
  Paperwork_Base_URL_For_Repos,
  Invoicing_New_Base_URL,
} from "../constants/applicationConstants";
class PaperworkProcessingService {
  getUnitDetailsById(unitPK, companyFK, companyName) {
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/getSelectedUnit", {
      unitId: unitPK,
      companyId: companyFK,
      companyName: companyName,
    });
  }

  /**
   * Used for Invoicing Paperwork Processing Unit Selection
   * Filter by BOL Number / Last5
   */
  getAllUnitsBySearch(searchCriteria, searchTerm, companyFK, companyName) {
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/findUnitsBySearchTerm", {
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      companyId: companyFK,
      companyName: companyName,
    });
  }

  /**
   * Used for Invoicing Paperwork Processing Unit Selection
   * List Active Units for AutoComplete and Lookup
   * Filter by Unit Number
   */
  listAllActveUnitsByUnitNumber(searchCriteria, searchTerm, bolNumber, last5, pageNumber) {
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/listActiveUnits", {
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      size: 10,
      type: "Autocomplete",
      bOLNumber: bolNumber,
      unitNumberLast5: last5,
    });
  }

  getAllUnitsForAutocomplete(
    searchCriteria,
    searchTerm,
    bolNumber,
    last5,
    pageNumber,
    companyFK,
    companyName
  ) {
    return axios.post(Invoicing_New_Base_URL + "/lookUp", {
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      size: 100,
      active: true,
      type: "Autocomplete",
      bolNumber: bolNumber,
      unitNumberLast5: last5,
      isInvoicing: true,
      companyId: companyFK,
      companyName: companyName,
    });
  }

  getAllUnitsForUnitDispatchLookup(
    company,
    searchTerm,
    searchCriteria,
    last5,
    unitType,
    orderType,
    pickupBy,
    deliveryBy,
    sortValue,
    sortFlag,
    advancedSearchPayload,
    advancedSortingOrder,
    pageNumber
  ) {
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/listUnitsFromDispatch", {
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      unitTypeSearchCriteria: unitType,
      orderType: orderType,
      pickupBy: pickupBy,
      deliveryBy: deliveryBy,
      pageNumber: pageNumber,
      size: FullScreenLookup_RecordsPerPage2,
      active: true,
      // type: "Autocomplete",
      unitNumberLast5: last5,
      // isInvoicing: true,
      advanceSortingOrder: advancedSortingOrder,
      units: advancedSearchPayload,
    });
  }

  /**
   * Used for Invoicing Paperwork Processing Unit selection for amount confirmation screen
   */
  getUnitsAmountConfirmation(additionalAmountsList, companyFK, companyName) {
    return axios.post(Paperwork_Base_URL_For_Repos + "/processAmountConfirmation", {
      additionalAmountsList,
      companyId: companyFK,
      companyName: companyName,
    });
  }

  getIsUnitDelayed(arrayOfUnitIds, companyName) {
    return axios.post(Paperwork_Base_URL_For_Repos + "/isDelayPresentForUnits", {
      arrayOfUnitIds,
      companyName: companyName,
    });
  }

  getPartialTrip(partialTripIds, companyName, companyId) {
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/splitTripDispatchRecords", {
      partialTripIds: partialTripIds,
      companyName: companyName,
      companyId: companyId,
    });
  }

  // Used for breakdown delay
  getBreakdownDelayDetails(arrayOfUnitIds, companyName) {
    return axios.post(DelayedUnitExpenses_Base_URL_For_CrossDB + "/fetchExpensesForUnit", {
      arrayOfUnitIds: arrayOfUnitIds,
      companyName: companyName,
    });
  }

  // used for fees tab in breakdown
  getFeesDetailsForExpense(
    arrayOfUnitIds,
    size,
    pageNumber,
    sortValue,
    sortType,
    delayedUnitBreakdownFKInt,
    companyName
  ) {
    return axios.post(DelayedUnitFee_Base_URL_For_CrossDB + "/fetchfeesfordelayedexpenses", {
      arrayOfUnitIds: arrayOfUnitIds,
      size: size,
      pageNumber: pageNumber,
      searchCriteria: "",
      searchTerm: "",
      sortValue: sortValue,
      sortType: sortType,
      delayedUnitBreakdownFKInt: delayedUnitBreakdownFKInt,
      companyName: companyName,
    });
  }
  // to calculate invoice total in fee tab
  getFeeInvoiceTotal(arrayOfUnitIds, delayedUnitBreakdownFKInt, companyName) {
    return axios.post(DelayedUnitFee_Base_URL_For_CrossDB + "/totalAmount", {
      arrayOfUnitIds: arrayOfUnitIds,
      delayedUnitBreakdownFKInt: delayedUnitBreakdownFKInt,
      companyName: companyName,
    });
  }

  getPercentageCalculation(currentUnitPayload, overrideInputValue) {
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/allowedPercentageComparison", {
      ...currentUnitPayload,
      overrideCode: overrideInputValue,
    });
  }

  checkOverrideExistsorNot(inputValue) {
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/isexistingoverridecode", {
      overrideCode: inputValue,
    });
  }

  getButtonFlags(unitPK, companyName, companyId) {
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/getButtonFlags/", {
      unitId: unitPK,
      companyName: companyName,
      companyId: companyId,
    });
  }

  saveScanPaperworkByFileType(unitPK, fileType, invoiceNumber, files) {
    const formData = new FormData();
    // Append each file to the formData
    files.forEach((file, index) => {
      formData.append(`file`, file);
    });
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/savePdf", formData, {
      // Sending payload as query params
      params: {
        unitId: unitPK,
        fileType: fileType,
        invoiceNumber: invoiceNumber,
      },
    });
  }

  saveScanPaperworkFiles(
    unitPK,
    dispatchPK,
    invoiceNumber,
    customerPaperworkFiles,
    companyPaperworkFiles,
    bolFiles,
    dafFiles,
    iftaFiles,
    breakdownFiles
  ) {
    const formData = new FormData();
    customerPaperworkFiles?.length > 0 &&
      customerPaperworkFiles?.forEach((file, index) => {
        formData.append(`customer`, file);
      });
    companyPaperworkFiles?.length > 0 &&
      companyPaperworkFiles?.forEach((file, index) => {
        formData.append(`company`, file);
      });
    bolFiles?.length > 0 &&
      bolFiles?.forEach((file, index) => {
        formData.append(`bol`, file);
      });
    dafFiles?.length > 0 &&
      dafFiles?.forEach((file, index) => {
        formData.append(`daf`, file);
      });
    iftaFiles?.length > 0 &&
      iftaFiles?.forEach((file, index) => {
        formData.append(`ifta`, file);
      });
    breakdownFiles?.length > 0 &&
      breakdownFiles?.forEach((file, index) => {
        formData.append(`breakdown`, file);
      });
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/savePdfs", formData, {
      params: {
        unitPK: unitPK,
        dispatchId: dispatchPK,
        invoiceNumber: invoiceNumber,
      },
    });
  }

  savePDFFileList(invoiceResponse, scanPaperworkSaveList, companyName, selectedUnit, companyFK, unitNumber) {
    const formData = new FormData();

    formData.append(`numberOfUnits`, scanPaperworkSaveList?.length);
    formData.append(`companyName`, companyName);
    formData.append(`billAlternateCustomer`, selectedUnit?.billAlternateCustomer);
    formData.append(`companyId`, companyFK);
    formData.append(`customerFK`, selectedUnit?.customerFK);
    formData.append(`documentDetailsList`, JSON.stringify(invoiceResponse));

    scanPaperworkSaveList.forEach((scanPaperwork, unitIndex) => {
      const { unitPK } = scanPaperwork;
      if (scanPaperwork?.customerUploadFiles?.length > 0) {
        scanPaperwork.customerUploadFiles.forEach((file, i) => {
          formData.append(`CUSTOMER_${unitPK}_${i}`, file);
        });
      }
      if (scanPaperwork?.customerScanFiles?.length > 0) {
        scanPaperwork.customerScanFiles.forEach((file, i) => {
          formData.append(`CUSTOMER_${unitPK}_${i}`, file);
        });
      }

      if (scanPaperwork?.companyUploadFiles?.length > 0) {
        scanPaperwork.companyUploadFiles.forEach((file, i) => {
          formData.append(`COMPANY_${unitPK}_${i}`, file);
        });
      }
      if (scanPaperwork?.companyScanFiles?.length > 0) {
        scanPaperwork.companyScanFiles.forEach((file, i) => {
          formData.append(`COMPANY_${unitPK}_${i}`, file);
        });
      }

      if (scanPaperwork?.bolUploadFiles?.length > 0) {
        scanPaperwork.bolUploadFiles.forEach((file, i) => {
          formData.append(`BOL_${unitPK}_${i}`, file);
        });
      }
      if (scanPaperwork?.bolScanFiles?.length > 0) {
        scanPaperwork.bolScanFiles.forEach((file, i) => {
          formData.append(`BOL_${unitPK}_${i}`, file);
        });
      }

      if (scanPaperwork?.dafUploadFiles?.length > 0) {
        scanPaperwork.dafUploadFiles.forEach((file, i) => {
          formData.append(`DAF_${unitPK}_${i}`, file);
        });
      }
      if (scanPaperwork?.dafScanFiles?.length > 0) {
        scanPaperwork.dafScanFiles.forEach((file, i) => {
          formData.append(`DAF_${unitPK}_${i}`, file);
        });
      }

      if (scanPaperwork?.iftaUploadFiles?.length > 0) {
        scanPaperwork.iftaUploadFiles.forEach((file, i) => {
          formData.append(`IFTA_${unitPK}_${i}`, file);
        });
      }
      if (scanPaperwork?.iftaScanFiles?.length > 0) {
        scanPaperwork.iftaScanFiles.forEach((file, i) => {
          formData.append(`IFTA_${unitPK}_${i}`, file);
        });
      }

      if (scanPaperwork?.breakdownUploadFiles?.length > 0) {
        scanPaperwork.breakdownUploadFiles.forEach((file, i) => {
          formData.append(`BKDN_${unitPK}_${i}`, file);
        });
      }
      if (scanPaperwork?.breakdownScanFiles?.length > 0) {
        scanPaperwork.breakdownScanFiles.forEach((file, i) => {
          formData.append(`BKDN_${unitPK}_${i}`, file);
        });
      }
    });

    // return axios.post(Invoicing_Base_URL_For_CrossDb + '/savePDFFileList', formData);
    return axios.post(Paperwork_Base_URL_For_Repos + "/savePDFFileList", formData);
  }

  /**
   * Used for Save Invoice
   */
  saveInvoice(saveInvoiceObject) {
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/saveInvoiceData", saveInvoiceObject);
  }

  saveInvoiceWithSP(saveInvoiceObject) {
    return axios.post(Paperwork_Base_URL_For_Repos + "/paperworkProcessSave", saveInvoiceObject);
  }

  generateInvoice(response) {
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/generateInvoice", response);
  }

  /**
   * Used for Fetch all matched units in Multi-Unit Load
   */
  fetchAllMultiUnitsLoads(multiUnitData) {
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/fetchmultiunitloads", multiUnitData);
  }

  // New method for releasing hold
  releaseHold(unitId) {
    return axios.post(`${Invoicing_Base_URL_For_CrossDb}/release-hold/${unitId}`);
  }

  getReleaseHoldPermission(userId, permission) {
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/getReleaseHoldsPermission", {
      userId: userId,
      userPermission: permission,
    });
  }
  updateUnitOnHold(unitPK) {
    return axios.post(`${Invoicing_Base_URL_For_CrossDb}/unitInvoiceHold/${unitPK}`);
  }
  getEquipmentList(dispatchIdsList, companyName, companyFK) {
    return axios.post(Invoicing_Base_URL_For_CrossDb + "/checkEquipmentHistory", {
      size: QuarterScreen_RecordsPerPage,
      dispatchId: dispatchIdsList,
      companyName: companyName,
      companyId: companyFK,
    });
  }

  saveMissingPaperwork(missingPaperworkObject) {
    return axios.post(`${Invoicing_Base_URL_For_CrossDb}/saveMissingPaperwork`, missingPaperworkObject);
  }

  /**
   *  Fetch all active companies
   */
  getAllCompanyNames() {
    return axios.get(DriverCheckin_Base_URL + "/getAllCompanyNames");
  }
  /**
   * Fetch Current Company Name
   **/
  getCurrentCompanyName() {
    return axios.get(DriverCheckin_Base_URL + "/getCurrentCompanyName");
  }

  fetchDriverEmailDetails(invoiceDataList, companyName) {
    return axios.post(`${Invoicing_Base_URL_For_CrossDb}/fetchUnitListData`, {
      invoiceDataList: invoiceDataList,
      companyName: companyName,
    });
  }
}
export default new PaperworkProcessingService();
