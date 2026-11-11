import { axios } from "../../../config/axiosInterceptors";
import {
  DelayDamage_Base_URL,
  DelayProcessing_Base_URL,
  Delay_Damage_Operations_Crossdb_URL,
  Delay_Operations_Crossdb_URL,
  Document_Blob_Base_URL,
  HalfScreen_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
} from "../../constants/applicationConstants";

import {
  CrossDB_Dealer_Base_URL,
  CrossDB_CustomerPlants_Base_URL,
} from "../../../services/constants/applicationConstants";

class DelayDamageService {
  getDelayDamageBrowse(payload) {
    return axios.post(`${DelayDamage_Base_URL}/browse`, {
      pageNumber: payload.pageNumber,
      pageSize: payload.pageSize,
      sortValue: payload.sortValue,
      sortType: payload.sortType,
      searchCriteria: payload.searchCriteria,
      searchTerm: payload.searchTerm,
      delayedUnitFK: payload.delayedUnitFK,
      companyName: payload.companyName,
    });
  }

  getDelayDamageDetails(tab, unitPK) {
    /* return axios.post(`${DelayDamage_Base_URL}/details`, {
      tab,
      unitPK:unitPK
    }); */
    return axios.post(`${DelayDamage_Base_URL}/details`, {
      // tab,
      // unitPK:unitPK,
      unitPK: unitPK,
      tab: tab,
      pageNumber: 0,
      pageSize: 0,
      sortValue: "",
      sortType: "",
      companyName: "Horizon Transport",
      resultType: "",
    });
  }

  getDelayDamageLookup(payload) {
    return axios.post(`${DelayDamage_Base_URL}/lookup`, {
      flag: payload.flag,
      searchTerm: payload.searchTerm,
      searchCriteria: payload.searchCriteria,
      pageNumber: payload.pageNumber,
      pageSize: payload.pageSize,
      sortValue: payload.sortValue,
      sortType: payload.sortType,
    });
  }

  fetchAllDealerDetailsByName(searchDealer, companyName) {
    return axios.post(DelayProcessing_Base_URL + "/fetchdealers", {
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
    return axios.post(DelayProcessing_Base_URL + "/getallplantsbycustomer", {
      active: 1,
      number: 0,
      size: 19,
      searchCriteria: "Beginning",
      searchTerms: searchPlant,
      selectedCustomerPlantStatus: "Complete",
      type: "Autocomplete",
      companyName: companyName,
      includePostalCodePK: 1,
    });
  }

  editDelayDamage(payload) {
    return axios.post(`${DelayDamage_Base_URL}/editViewDelayDamage`, payload);
  }

  /*****Get the details for the claims tab for delay*****/
  getClaimsTabDetails(id) {
    return axios.post(`${DelayDamage_Base_URL}/getClaimsTabDetails`, {
      delayedUnitDamagePK: id,
    });
  }

  getdelayUnitCodeForAutoComplete(string, pageNumber, size, searchCriteria, sortValue, sortType, filterType) {
    return axios.post(DelayDamage_Base_URL + "/delayUnitCodelookup", {
      searchTerm: string,
      pageNumber: pageNumber || 0,
      size: size || 100,
      searchCriteria: searchCriteria || "Beginning", // keep this if the backend expects a string here
      sortValue: sortValue,
      sortType: sortType, // ensure it's a boolean
      filterType: filterType,
      filterActive: 1,
    });
  }

  /******Update the Delay Unit Damages Record*****/
  updateDelayDamage(payload) {
    return axios.post(`${DelayDamage_Base_URL}/updateDelayDamage`, payload);
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

    // return axios.post(`${Document_Blob_Base_URL}/commonSave`, formData);
    return axios.post(`${DelayDamage_Base_URL}/saveDocumentBlobDelayDamage`, formData);
  }

  /******
   * Delay damage Document View Screen
   ******/
  getDocumentsForDamagesView(documentPageNumber, id) {
    return axios.post(DelayDamage_Base_URL + "/documentBlobBrowseDelayDamage", {
      documentPageNumber: documentPageNumber,
      delayedUnitDamagePK: id,
      documentPageSize: QuarterScreen_RecordsPerPage,
    });
  }

  /******
   * Delay damage Document View Screen to display the file
   ******/
  viewDamageDocument(blobKey) {
    return axios.post(DelayDamage_Base_URL + "/fetchDocumentBlobDelayDamageByID", {
      blobKey: blobKey,
    });
  }

  /****
   * Update the existing Delay Unit Damage
   * Record by combining the different tabs
   * *****/
  editandSaveDelayDamage(payload) {
    return axios.post(`${DelayDamage_Base_URL}/editSaveDelayDamage`, payload);
  }

  //used for Delay Damage Shuttle Program
  getDelayDamageInformation(delayDamageUnitPK) {
    return axios.post(DelayDamage_Base_URL + "/delay-damage-values/" + delayDamageUnitPK);
  }
  //used to save damage safety sub program
  saveDamageSafety(saveData) {
    return axios.post(DelayDamage_Base_URL + "/save-damage-safety", saveData);
  }

  //delayedunitcode lookup-breakdown
  getLookupForDamageCodes(
    selectedSearchCriteria,
    searchTerms,
    pageNumber,
    sortValue,
    sortFlag,
    companyName,
    damagePK,
    type
  ) {
    return axios.post(Delay_Operations_Crossdb_URL + "/delayedUniCodeDropDown", {
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: pageNumber,
      sortValue: sortValue,
      sortType: sortFlag,
      pageSize: QuarterScreen_RecordsPerPage,
      type: type,
      companyName: companyName,
      delayedUnitPK: damagePK,
    });
  }

  //delayedunitcode autocomplete-breakdown
  getAutoCompleteForDamageCodes(searchTerm, companyName, damagePK, type) {
    return axios.post(Delay_Operations_Crossdb_URL + "/delayedUniCodeDropDown", {
      searchCriteria: "Beginning",
      searchTerm,
      pageNumber: 0,
      pageSize: 100,
      type: type,
      companyName: companyName,
      delayedUnitPK: damagePK,
    });
  }

  //used to get new damge details based on unitfk
  getNewDelayDamgeDetails(tab, unitPK, companyName, pageNumber, pageSize, sortValue, sortType) {
    return axios.post(`${Delay_Damage_Operations_Crossdb_URL}/details`, {
      tab,
      unitPK: unitPK,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortValue: sortValue,
      sortType: sortType,
      companyName: companyName,
    });
  }

  //Documenttype Lookup
  getDocumentTypeForLookup(documentPayload) {
    return axios.post(DelayDamage_Base_URL + "/dealerPlantLookup", {
      searchCriteria: documentPayload?.selectedSearchCriteria,
      searchTerm: documentPayload?.searchTerms,
      pageNumber: documentPayload?.pageNumber,
      pageSize: QuarterScreen_RecordsPerPage,
      sortValue: documentPayload?.normalSortValue,
      sortType: documentPayload?.normalSortFlag,
      // companyName: documentPayload?.companyName,
      companyName: "Horizon Transport",
      type: "DOCUMENT",
    });
  }

  //Documenttype autocomplete
  getDocumentTypeForAutoComplete(string, company) {
    return axios.post(DelayDamage_Base_URL + "/dealerPlantLookup", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      pageSize: 100,
      sortValue: "",
      sortType: 0,
      // companyName: company,
      companyName: "Horizon Transport",
      type: "DOCUMENT",
    });
  }

  //Repair Plant Autocomplete
  geActiveRepairPlantForAutoComplete(string, company) {
    return axios.post(DelayDamage_Base_URL + "/dealerPlantLookup", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      pageSize: 100,
      sortValue: "",
      sortType: 0,
      companyName: "Horizon Transport",
      type: "PLANT",
    });
  }

  //Repair Dealer Autocomplete
  geActiveRepairDealerForAutoComplete(string, company) {
    return axios.post(DelayDamage_Base_URL + "/dealerPlantLookup", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      pageSize: 100,
      sortValue: "",
      sortType: 0,
      companyName: "Horizon Transport",
      type: "DEALER",
    });
  }

  //Repair Plant Lookup
  getAllActiveCustomerPlants(plantPayload) {
    return axios.post(DelayDamage_Base_URL + "/dealerPlantLookup", {
      searchCriteria: plantPayload?.plantSelectedSearchCriteria,
      searchTerm: plantPayload?.plantSearchTerms,
      pageNumber: plantPayload?.plantPageNumber,
      pageSize: HalfScreen_RecordsPerPage,
      sortValue: plantPayload?.plantSortValue,
      sortType: plantPayload?.plantSortFlag,
      // companyName: plantPayload?.companyName,
      companyName: "Horizon Transport",
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
    return axios.post(DelayDamage_Base_URL + "/dealerPlantLookup", {
      searchCriteria: dealerPayload?.dealerSelectedSearchCriteria,
      searchTerm: dealerPayload?.dealerSearchTerm,
      pageNumber: dealerPayload?.dealerPageNumber,
      pageSize: HalfScreen_RecordsPerPage,
      sortValue: dealerPayload?.dealerSortValue,
      sortType: dealerPayload?.dealerSortFlag,
      // companyName: dealerPayload?.companyName,
      companyName: "Horizon Transport",
      type: "DEALER",
      name: dealerPayload?.searchedDealer?.name,
      dba: dealerPayload?.searchedDealer?.dba,
      city: dealerPayload?.searchedDealer?.city,
      stateCode: dealerPayload?.searchedDealer?.stateCode,
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

  //used to save Delay Damage

  saveDelayDamge(damageData) {
    return axios.post(`${Delay_Damage_Operations_Crossdb_URL}/save`, damageData);
  }

  //Damages fetch for edit and view
  getDelayDamageViewDetails(delayedUnitDamagePK, tab, pageNumber, pageSize, sortValue, sortType) {
    return axios.post(Delay_Damage_Operations_Crossdb_URL + "/view", {
      delayedUnitDamagePK,
      tab,
      pageNumber,
      pageSize,
      sortValue,
      sortType,
    });
  }
}

export default new DelayDamageService();
