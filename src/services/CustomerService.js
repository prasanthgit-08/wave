import { axios } from "../config/axiosInterceptors";
import {
  CustomerActivitySummaryReport_Base_URL,
  CustomerOrderUsers_Base_URL,
  CustomerSalesReport_Base_URL,
  OnRoadNotDeliveredReport_Base_URL,
  UndispatchedListingReport_Base_URL,
  DamageReportBaseURL,
  UnitExceptionReport_Base_URL,
  CustomerTripSummaryReportBaseURL,
  CommonLookup_Base_URL,
} from "../services/constants/applicationConstants";
import { Customer_Base_URL, Customer_Contacts_Base_URL, Dealer_Base_URL } from "../services/constants/applicationConstants";
import { StandardMaintenance_RecordsPerPage } from "../services/constants/applicationConstants";
import { BackEnd_Base_URL } from "../services/constants/applicationConstants";
import { mapCustomerMaintenanceResponse } from "../utils/customerMaintenanceMapper";
import { fetchAndStoreEnums, getEnum } from "../utils/enumUtils";

let enumsLoading = null;
const pendingUnitTypeGroupRequests = new Map();

// Reads an option list from the cached `enums` (fetched once for all lists); null when it can't be loaded.
const loadCachedEnum = async (enumName) => {
  let options = getEnum(enumName);
  if (!options.length) {
    enumsLoading = enumsLoading || fetchAndStoreEnums().finally(() => (enumsLoading = null));
    await enumsLoading;
    options = getEnum(enumName);
  }
  return options.length ? options : null;
};

class CustomerService {
  getAllCustomers(
    active,
    pageNumber,
    customers,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedCustomerStatus,
    customerPKList
  ) {
    let customerStatus = null;
    if (active === "Active") {
      customerStatus = 1;
    } else if (active === "Inactive") {
      customerStatus = 0;
    }

    return axios.post(Customer_Base_URL + "/getallcustomers", {
      active: customerStatus,
      number: pageNumber,
      size: StandardMaintenance_RecordsPerPage,
      customers: customers,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedCustomerStatus: selectedCustomerStatus,
      customerPKList: customerPKList,
    });
  }
  getAllCustomerByName(searchCustomer, size) {
    return axios.post(Customer_Base_URL + "/getallcustomers", {
      active: 1,
      number: 0,
      size: size || 100,
      searchCriteria: "Beginning",
      searchTerms: searchCustomer,
      selectedCustomerStatus: "Complete",
      type: "Autocomplete",
    });
  }

  getCustomerById(customerId) {
    return axios.get(Customer_Base_URL + "/getcustomerdetailsbyid/" + customerId);
  }
  fetchCustomerMaintenance(customerPK, tab = "ALL", customerType = "Complete") {
    return axios.post(BackEnd_Base_URL + "customermaintenance/fetch", { customerPK, tab, customerType });
  }

  /**
   * TEMPORARY workaround: customermaintenance/fetch strips the spaces from multi-word cities and then
   * returns a null postalCodePK. Rebuild both from the ZIP; remove once the backend returns them correctly.
   */
  async restorePostalCodeFields(mapped) {
    const zip = String(mapped?.postalCode ?? "").trim();
    if (!mapped || mapped.postalCodePK || !zip || !mapped.city) return mapped;
    const stripSpaces = (value) => String(value ?? "").replace(/\s+/g, "").toUpperCase();
    try {
      const response = await axios.post(Dealer_Base_URL + "/getcitystatecodebypostalcode", {
        city: null,
        stateCode: mapped.stateCode?.trim() || null,
        postalCode: /^\d{5}-\d{4}$/.test(zip) ? zip.slice(0, 5) : zip,
      });
      const match = (response?.data || []).find((option) => stripSpaces(option.city) === stripSpaces(mapped.city));
      if (match?.postalCodePK) return { ...mapped, postalCodePK: match.postalCodePK, city: match.city };
    } catch (error) {
      console.warn("Could not restore postalCodePK from the ZIP code", error);
    }
    return mapped;
  }

  /**
   * Loads every tab and sub tab of a complete customer in one call. Resolves with an axios-like
   * `{ data }` in the legacy flat shape the screens already read.
   */
  async getCustomerMaintenanceData(customerId) {
    const response = await this.fetchCustomerMaintenance(customerId);
    const mapped = mapCustomerMaintenanceResponse(response?.data);
    return { ...response, data: await this.restorePostalCodeFields(mapped) };
    // Legacy multi-call load, kept for reference:
    // return this.getCustomerById(customerId);
  }

  getCustomerDetailsFromAnotherDBById(customerId) {
    return axios.get(Customer_Contacts_Base_URL + "/getcustomerdetailsbyid/" + customerId);
  }
  getAllCustomersForLookup(
    active,
    pageNumber,
    customers,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedCustomerStatus,
    customerPKList,
    isMiscInvoice
  ) {
    let customerStatus = null;
    if (active === "Active") {
      customerStatus = 1;
    } else if (active === "Inactive") {
      customerStatus = 0;
    }
    return axios.post(Customer_Base_URL + "/getallcustomers", {
      active: customerStatus,
      number: pageNumber,
      size: 15,
      customers: customers,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: isMiscInvoice ? "addDate" : sortValue,
      sortType: sortFlag,
      selectedCustomerStatus: selectedCustomerStatus,
      customerPKList,
      type: "Lookup",
      isMiscInvoice,
    });
  }

  getAllRestrictedCustomerForLookup(
    active,
    pageNumber,
    customers,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedCustomerStatus,
    restrictedCustomerId
  ) {
    let customerStatus = null;
    if (active === "Active") {
      customerStatus = 1;
    } else if (active === "Inactive") {
      customerStatus = 0;
    }

    return axios.post(Customer_Base_URL + "/getallcustomers", {
      active: customerStatus,
      number: pageNumber,
      size: 15,
      customers: customers,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedCustomerStatus: "Complete",
      customerPKList: [],
      type: "Lookup",
      restrictedCustomerId: restrictedCustomerId,
      restrictedCustomer: true,
    });
  }

  getAllDealerCustomersForLookup(
    active,
    pageNumber,
    customers,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedCustomerStatus
  ) {
    let customerStatus = null;
    if (active === "Active") {
      customerStatus = 1;
    } else if (active === "Inactive") {
      customerStatus = 0;
    }

    return axios.post(Customer_Base_URL + "/getalldealercustomers", {
      active: customerStatus,
      number: pageNumber,
      size: 15,
      customers: customers,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedCustomerStatus: selectedCustomerStatus,
      type: "Lookup",
    });
  }
  activateCustomer(id) {
    return axios.put(Customer_Base_URL + "/activatecustomers", {
      customerPK: id,
    });
  }
  // Customer Order User Record delete

  deleteRecord(id) {
    return axios.delete(CustomerOrderUsers_Base_URL + "/deletecou/" + id);
  }

  deactivateCustomer(id) {
    return axios.put(Customer_Base_URL + "/deactivecustomers", {
      customerPK: id,
    });
  }

  createCustomer(customerFormData) {
    return axios.post(Customer_Base_URL + "/savecustomer", customerFormData);
  }

  getUserCompanyName() {
    return axios.get(Customer_Base_URL + "/getUserCompanyName/");
  }

  getVisibiltyRequiereFactory() {
    return axios.get(Customer_Base_URL + "/getVisibiltyRequiereFactory/");
  }

  fetchDealerByName(searchDealer) {
    return axios.post(Customer_Base_URL + "/fetchdealers", {
      active: 1,
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchDealer,
      selectedDealerStatus: "Complete",
      type: "AutocompleteByName",
    });
  }

  getCustomerDealerById(id) {
    return axios.get(Customer_Base_URL + "/getcustomerdealerbyid/" + id);
  }

  getCustomerGroupsByName(searchCustomerGroup) {
    return axios.post(Customer_Base_URL + "/getCustomerGroupsDetails", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchCustomerGroup,
      type: "Autocomplete",
    });
  }

  getCustomerGroupsDetails(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag) {
    return axios.post(Customer_Base_URL + "/getCustomerGroupsDetails", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerm,
      sortValue: sortValue,
      sortType: sortFlag,
      type: "Lookup",
    });
  }

  getCustomerGroupsById(customerGroupsId) {
    return axios.get(Customer_Base_URL + "/getcustomergroupsbyid/" + customerGroupsId);
  }

  getUsersByName(searchUser, size) {
    return axios.post(Customer_Base_URL + "/getuserdetails", {
      pageNumber: 0,
      size: size,
      searchCriteria: "Beginning",
      searchTerms: searchUser,
      type: "Autocomplete",
      userType: "PU11002200",
      active: 1,
    });
  }

  getUserById(id) {
    return axios.get(Customer_Base_URL + "/getuserbyid/" + id);
  }

  fetchDriverByName(searchDriver) {
    return axios.post(Customer_Base_URL + "/fetchDriverByName", {
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
      statusType: "All",
      searchTerm: searchDriver,
      driverType: "All",
      cityType: "Mailing",
    });
  }

  getTermsById(id) {
    return axios.get(Customer_Base_URL + "/getTermsById/" + id);
  }

  fetchTermsforAutoComplete(searchTerm) {
    return axios.post(Customer_Base_URL + "/fetchTermsforAutoComplete", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchTerm,
      type: "Autocomplete",
    });
  }

  fetchCheckPayToByName(searchTerm) {
    return axios.post(Customer_Base_URL + "/fetchCheckPayToByName", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      type: "Autocomplete",
    });
  }

  getDriverById(id) {
    return axios.get(Customer_Base_URL + "/getDriverById/" + id);
  }

  fetchBrokerDetails(pageNumber, searchCriteria, searchTerms, sortValue, sortFlag) {
    return axios.post(Customer_Base_URL + "/fetchBrokerDetails", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: searchCriteria,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type: "Lookup",
      selectedImportBrokersStatus: "Complete",
      brokerType: "import",
    });
  }

  fetchBrokerByName(searchBroker) {
    return axios.post(Customer_Base_URL + "/fetchBrokerDetails", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchBroker,
      type: "Autocomplete",
      selectedImportBrokersStatus: "Complete",
      brokerType: "import",
    });
  }

  getBrokerById(id) {
    return axios.get(Customer_Base_URL + "/getimportbrokerbyid/" + id);
  }

  fetchSpecialCodeByName(searchSpecialCode) {
    return axios.post(Customer_Base_URL + "/fetchSpecialCodeByName", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchSpecialCode,
      type: "Autocomplete",
    });
  }

  getSpecialCodeById(id) {
    return axios.get(Customer_Base_URL + "/getSpecialCodeById/" + id);
  }

  getAllUnitTypeGroups(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(Customer_Base_URL + "/getAllUnitTypeGroups", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: searchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type: "Lookup",
    });
  }

  //customerSalesReport
  getAllUnitTypeGroupsForCustomer({
    selectedSearchCriteria = "Beginning",
    searchTerms,
    pageNumber = 0,
    pageSize,
    sortValue,
    sortFlag,
    type = "AutoComplete",
  }) {
    return axios.post(CustomerSalesReport_Base_URL + "unitTypeGroupLookup", {
      pageNumber: pageNumber,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type,
      pageSize,
    });
  }

  getAllUnitTypeGroupsByName(searchUnitTypeGroup) {
    return axios.post(Customer_Base_URL + "/getAllUnitTypeGroups", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchUnitTypeGroup,
      type: "Autocomplete",
    });
  }

  // Two fields can ask for the same unit type group in the same moment; share the in-flight request.
  getUnitTypeGroupsById(id) {
    if (!pendingUnitTypeGroupRequests.has(id)) {
      const request = axios.get(Customer_Base_URL + "/getUnitTypeGroupsById/" + id);
      pendingUnitTypeGroupRequests.set(id, request);
      const clear = () => pendingUnitTypeGroupRequests.delete(id);
      request.then(clear, clear);
    }
    return pendingUnitTypeGroupRequests.get(id);
  }

  fetchYardByName(searchYard) {
    return axios.post(Customer_Base_URL + "/fetchYardByName", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchYard,
      type: "Autocomplete",
    });
  }

  getCustomerYardById(id) {
    return axios.get(Customer_Base_URL + "/getCustomerYardById/" + id);
  }

  getCheckPayToById(id) {
    return axios.get(Customer_Base_URL + "/getCheckPayToById/" + id);
  }

  getAllCustomerPlantGroups(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(Customer_Base_URL + "/fetchPlantGroupByName", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: searchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type: "Lookup",
    });
  }

  getAllCustomerPlantGroupsForTripSummary({
    selectedSearchCriteria = "Beginning",
    searchTerms,
    pageNumber = 0,
    sortValue = null,
    sortFlag = false,
    type,
  }) {
    return axios.post(CustomerTripSummaryReportBaseURL + "plantGroupLookup", {
      pageNumber: pageNumber,
      pageSize: 12,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type,
    });
  }

  getAllCustomerPlantGroupsByName(searchCustomerPlantGroup) {
    return axios.post(Customer_Base_URL + "/fetchPlantGroupByName", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchCustomerPlantGroup,
      type: "Autocomplete",
    });
  }

  getCustomerPlantGroupsById(id) {
    return axios.get(Customer_Base_URL + "/getCustomerPlantGroupById/" + id);
  }

  getAllRegions(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(Customer_Base_URL + "/getAllRegions", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: searchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type: "Lookup",
    });
  }

  getAllRegionsByName(searchRegions) {
    return axios.post(Customer_Base_URL + "/getAllRegions", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchRegions,
      type: "Autocomplete",
    });
  }

  getRegionsByCode(code) {
    return axios.get(Customer_Base_URL + "/getRegionsByCode/" + code);
  }

  getAlternateCustomerByName(searchCustomer) {
    return axios.post(Customer_Base_URL + "/getAlternateCustomerByName", {
      active: 1,
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchCustomer,
      selectedCustomerStatus: "Complete",
      type: "Autocomplete",
    });
  }

  getAlternateCustomerById(id) {
    return axios.get(Customer_Base_URL + "/getAlternateCustomerById/" + id);
  }

  /**
   * Serves a fixed option list from the cached enums in the legacy `{ data: [{ <idKey>, <nameKey> }] }`
   * shape the screens already read; calls the legacy endpoint only when the enums are unavailable.
   */
  async getEnumOptions(enumName, idKey, nameKey, legacyRequest) {
    const options = await loadCachedEnum(enumName);
    if (!options) return legacyRequest();
    return { data: options.map(({ value, label }) => ({ [idKey]: value, [nameKey]: label })) };
  }

  getCustomerType() {
    return this.getEnumOptions("customerType", "customerTypeId", "customerTypeName", () =>
      axios.get(Customer_Base_URL + "/getcustomertype")
    );
  }

  getRegions() {
    return axios.get(Customer_Base_URL + "/getregions");
  }

  getGenerateCommission() {
    return this.getEnumOptions("generateCommission", "generateCommissionId", "generateCommissionName", () =>
      axios.get(Customer_Base_URL + "/getgeneratecommission")
    );
  }

  getOrderEntryUsers() {
    return this.getEnumOptions("orderEntryUsers", "orderEntryUserTypeId", "orderEntryUserTypeName", () =>
      axios.get(Customer_Base_URL + "/getOrderEntryUsers")
    );
  }

  getStorageBillingPeriod() {
    return this.getEnumOptions("storageBillingPeriod", "storageBillingPeriodID", "storageBillingPeriodName", () =>
      axios.get(Customer_Base_URL + "/getstoragebillingperiod")
    );
  }

  getStatementPeriod() {
    return this.getEnumOptions("statementPeriod", "statementPeriodID", "statementPeriodName", () =>
      axios.get(Customer_Base_URL + "/getstatementperiod")
    );
  }

  getInsuranceSurcharge() {
    return this.getEnumOptions("insuranceSurcharge", "insuranceSurchargeID", "insuranceSurchargeName", () =>
      axios.get(Customer_Base_URL + "/getinsurancesurcharge")
    );
  }

  getEmailInvoice() {
    return this.getEnumOptions("emailInvoice", "emailInvoiceID", "emailInvoiceName", () =>
      axios.get(Customer_Base_URL + "/getemailinvoice")
    );
  }

  getCreditCardPayments() {
    return this.getEnumOptions("creditCardPayments", "creditCardPaymentsID", "creditCardPaymentsName", () =>
      axios.get(Customer_Base_URL + "/getcreditcardpayments")
    );
  }
  getDriversName(name) {
    return axios.post(Customer_Base_URL + "/getdriversname", {
      name: name,
    });
  }
  nameExistCheck(name, customerPK, incompleteCustomerPK) {
    return axios.post(Customer_Base_URL + "/nameexistcheck", {
      name: name,
      customerPK: customerPK,
      incompletecustomerPK: incompleteCustomerPK,
    });
  }

  deleteCustomer(id) {
    return axios.delete(Customer_Base_URL + "/deletecustomers/" + id);
  }

  getDealerName(name) {
    return axios.post(Customer_Base_URL + "/getdealersname", {
      name: name,
    });
  }
  getSisterCompany(customerPK, incompleteCustomerPK) {
    return axios.post(Customer_Base_URL + "/sisterCompanyForDropdown", {
      customerPK: customerPK,
      incompletecustomerPK: incompleteCustomerPK,
    });
  }

  getAlternativePaperworkNameFrom() {
    return this.getEnumOptions(
      "alternativePaperworkNameFrom",
      "alternativePaperworkNameFromId",
      "alternativePaperworkNameFromName",
      () => axios.get(Customer_Base_URL + "/getAlternativePaperworkNameFrom")
    );
  }

  getPaperworkNameFrom() {
    return this.getEnumOptions("paperworkNameFrom", "paperworkNameFromId", "paperworkNameFromName", () =>
      axios.get(Customer_Base_URL + "/getPaperworkNameFrom")
    );
  }

  getAllCustomersForLookupReport(
    plantId,
    selectedSearchCriteria,
    searchTerms,
    pageNumber,
    sortValue,
    sortFlag,
    type,
    pageSize,
    FirstField,
    secondField,
    thirdField,
    name,
    city,
    stateCode
  ) {
    return axios.post(CustomerActivitySummaryReport_Base_URL + "lookupCustomer", {
      plantPK: plantId,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: pageNumber,
      sortValue: sortValue,
      sortType: sortFlag,
      type: type,
      firstField: FirstField,
      secondField: secondField,
      thirdField: thirdField,
      name: name,
      city: city,
      stateCode: stateCode,
      pageSize: pageSize,
    });
  }

  getAllCustomersForUndispatchedLookup(
    active,
    pageNumber,
    searchCriteria,
    searchTerms,
    sortValue,
    sortFlag,
    type,
    FirstField,
    secondField,
    thirdField,
    name,
    city,
    stateCode
  ) {
    return axios.post(UndispatchedListingReport_Base_URL + "customerLookup", {
      status: active,
      pageNumber: pageNumber,
      pageSize: 15,
      searchCriteria: searchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue ? sortValue : "",
      sortType: sortFlag,
      firstField: FirstField,
      secondField: secondField,
      thirdField: thirdField,
      name: name,
      city: city,
      stateCode: stateCode,
      type: type,
    });
  }

  //OnRoadNotDeliveredReport
  getAllCustomersForOnRoadNotDelivered(
    plantPK,
    pageNumber,
    pageSize,
    searchCriteria,
    searchTerms,
    sortValue,
    sortFlag,
    type,
    FirstField,
    secondField,
    thirdField,
    name,
    city,
    stateCode
  ) {
    return axios.post(OnRoadNotDeliveredReport_Base_URL + "customerLookup", {
      plantPK: plantPK,
      pageNumber: pageNumber,
      pageSize: pageSize,
      searchCriteria: searchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue ? sortValue : "",
      sortType: sortFlag,
      firstField: FirstField,
      secondField: secondField,
      thirdField: thirdField,
      name: name,
      city: city,
      stateCode: stateCode,
      type: type,
    });
  }

  //CustomerSalesReport
  async getAllCustomersForCustomerSalesReport({
    plantPK,
    accountManagerPK,
    pageNumber = 0,
    pageSize = 15,
    searchCriteria = "Beginning",
    searchTerms,
    sortValue,
    sortType,
    type = "AutoComplete",
    FirstField,
    secondField,
    thirdField,
    name,
    city,
    stateCode,
  }) {
    try {
      const res = await axios.post(CustomerSalesReport_Base_URL + "customerLookup", {
        plantPK,
        accountManagerFK: accountManagerPK,
        type,
        pageNumber,
        pageSize,
        searchCriteria,
        searchTerm: searchTerms,
        firstField: FirstField,
        secondField,
        thirdField,
        name,
        city,
        stateCode,
        sortValue,
        sortType,
      });
      return res;
    } catch (error) {
      console.error("Error in getAllUsersForTripListing:", error);
    }
  }

  //UnitExceptionReport
  getCustomersForUnitExceptionReport({
    plantId,
    pageNo,
    pageSize,
    selectedSearchCriteria,
    searchTerms,
    sortValue,
    sortFlag,
    type = "AutoComplete",
    firstField,
    secondField,
    thirdField,
    name,
    city,
    stateCode,
  }) {
    return axios.post(UnitExceptionReport_Base_URL + "customerLookup", {
      plantPK: plantId,
      pageNumber: pageNo,
      pageSize,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      sortValue,
      sortType: sortFlag,
      firstField,
      secondField,
      thirdField,
      name,
      city,
      stateCode,
      type,
    });
  }

  //CommonLookup
  getCustomersForCommonLookup({
    plantId,
    pageNo,
    pageSize,
    selectedSearchCriteria,
    searchTerms,
    sortValue,
    sortFlag,
    type = "AutoComplete",
    firstField,
    secondField,
    thirdField,
    name,
    city,
    stateCode,
  }) {
    return axios.post(CommonLookup_Base_URL + "customerLookup", {
      plantPK: plantId,
      pageNumber: pageNo,
      pageSize,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      sortValue,
      sortType: sortFlag,
      firstField,
      secondField,
      thirdField,
      name,
      city,
      stateCode,
      type,
    });
  }

  checkCustomerPlantExist(id) {
    return axios.get(Customer_Base_URL + "/customerPlantCheck/" + id);
  }
}

export default new CustomerService();
