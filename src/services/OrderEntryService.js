import { axios } from "../config/axiosInterceptors";
import {
  OrderEntry_Base_URL,
  Customer_Base_URL,
  CustomerPlants_Base_URL,
  QuarterScreen_RecordsPerPage,
  COB_Base_URL,
  Dealer_Base_URL,
  Yards_Base_URL,
  ShuttleCitys_Base_URL,
  ExportBrokers_Base_URL,
  Customer_Rates_Base_URL,
  PlantRelease_Base_URL,
  OrderEntry_Crossdb_URL,
  Email_Processor_URL,
  Company_Base_URL,
} from "./constants/applicationConstants";

class OrderEntryService {
  /**
   * Used for Customer tab - Order Entry.
   * Fetch all the customers from Customers.
   * Used for customer listing table
   */
  getCustomerDetails(searchCustomer, pageNumber, selectedCustomerId) {
    return axios.post(OrderEntry_Base_URL + "/fetchcustomerdetails", {
      searchCustomer: searchCustomer,
      pageNumber: pageNumber,
      size: 15,
      selectedCustomerId: selectedCustomerId,
    });
  }

  /**
   * Used for Customer tab - Order Entry.
   * Fetch all the customers from Customers.
   * Used for autocomplete
   */
  getCustomerDetailsForAutocomplete(searchCustomer) {
    return axios.post(OrderEntry_Base_URL + "/fetchcustomerdetails", {
      searchCustomer: searchCustomer,
      pageNumber: 0,
      size: 100,
    });
  }

  /**
   * Used for Customer tab - Customer Lookup - Order Entry.
   * Fetch all the customers from Customers.     *
   */
  getAllCustomers(
    pageNumber,
    customers,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag
  ) {
    return axios.post(Customer_Base_URL + "/getallcustomersforOE", {
      active: 1,
      number: pageNumber,
      size: 15,
      customers: customers,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedCustomerStatus: "Complete",
      creditHold: false,
      orderEntry: true,
    });
  }
  /**
   * Used for Customer tab Plant Lookup - Order Entry.
   * Fetch all the plants based on selected customer (Manufacturer/DPU Customer).
   * Used for billing, pickup and delivery plant lookups.
   */
  fetchCustomerPlantsLookupDetails(
    pageNumber,
    customerPlants,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedCustomerId,
    isDPUCustomer,
    companyName,
    BillingPlant
  ) {
    return axios.post(OrderEntry_Base_URL + "/fetchCustomerPlantsLookupDetails/", {
      active: 1,
      pageNumber: pageNumber,
      size: 15,
      customerPlants: customerPlants,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortType: sortFlag,
      sortValue: sortValue,
      selectedCustomerPlantStatus: "Complete",
      customerFK: selectedCustomerId,
      isOEPP: "Lookup",
      isDPUCustomer: isDPUCustomer,
      billingPlant: BillingPlant,
    });
  }

  /**
   * Used for Customer tab Yard Lookup - Order Entry.
   * Fetch all the yards based on selected customer and plant with reload/outbound flag.
   *
   */
  fetchYardDetials(
    pageNumber,
    selectedSearchCriteria,
    searchTerm,
    sortValue,
    sortFlag,
    selectedCustomerId,
    id,
    reload,
    outbound
  ) {
    return axios.post(OrderEntry_Base_URL + "/getYardsdetails/", {
      active: 1,
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerm,
      customerFK: selectedCustomerId,
      customerPlantPK: id,
      reload: reload,
      outbound: outbound,
      sortValue: sortValue,
      sortType: sortFlag,
      isOEPP: "Lookup",
    });
  }

  /**
   * Used for Customer tab Shuttle City Lookup - Order Entry.
   * Fetch all the shuttle city based on selected customer and plant with reload/outbound flag.
   *
   */
  fetchShuttleCityDetials(
    pageNumber,
    selectedSearchCriteria,
    searchTerm,
    sortValue,
    sortFlag,
    selectedCustomerId,
    id,
    reload,
    outbound
  ) {
    return axios.post(OrderEntry_Base_URL + "/getShuttleCitydetails/", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerm,
      customerFK: selectedCustomerId,
      customerPlantPK: id,
      reload: reload,
      outbound: outbound,
      sortValue: sortValue,
      sortType: sortFlag,
      isOEPP: "Lookup",
    });
  }

  /**
   * Used for Customer tab - Plant Lookup - Order Entry.
   * Common for Billing Plant, Pickup Plant, Delivery Plant
   * Fetch all the Plants from CustomerPlants.
   */
  getAllPlants(
    pageNumber,
    customerPlants,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag
  ) {
    return axios.post(CustomerPlants_Base_URL + "/getAllPlants", {
      active: 1,
      pageNumber: pageNumber,
      size: 15,
      customerPlants: customerPlants,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedCustomerPlantStatus: "Complete",
      isOEPP: false,
    });
  }
  /**
   * Used for Customer tab - Order Entry.
   * Fetch all the plants for the selected Customer.
   * Used for Biling plants autocomplete with OEPP String as Autocomplete
   */
  fetchBillingPlantdetailsByName(customerId, isDPUCustomer, searchPlant) {
    return axios.post(OrderEntry_Base_URL + "/fetchCustomerPlantsLookupDetails", {
      active: 1,
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchPlant,
      selectedCustomerPlantStatus: "Complete",
      customerFK: customerId,
      isOEPP: "Autocomplete",
      isDPUCustomer: isDPUCustomer,
      billingPlant: true,
    });
  }

  /**
   * Used for Customer tab - Order Entry.
   * Fetch all the plants for the selected Customer.
   * Used for Pickup plants autocomplete with OEPP String as Autocomplete  
   */
  fetchPickupPlantdetailsByName(customerId, isDPUCustomer, searchPlant) {
    return axios.post(OrderEntry_Base_URL + "/fetchCustomerPlantsLookupDetails", {
      active: 1,
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchPlant,
      selectedCustomerPlantStatus: "Complete",
      customerFK: customerId,
      isOEPP: "Autocomplete",
      isDPUCustomer: isDPUCustomer,
    });
  }
  /**
   * Used for Customer tab - Order Entry.
   * Fetch all the yards for the selected Customer.
   * Used for Pickup yards autocomplete with OEPP String as Autocomplete  *
   */
  fetchYardDetailsByName(customerId, plantId, reload, outbound, searchYard) {
    return axios.post(OrderEntry_Base_URL + "/getYardsdetails/", {
      active: 1,
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchYard,
      customerFK: customerId,
      customerPlantPK: plantId,
      reload: reload,
      outbound: outbound,
      isOEPP: "Autocomplete",
    });
  }

  /**
   * Used for Customer tab - Order Entry.
   * Fetch all the ShuttleCitys for the selected Customer.
   * Used for Pickup ShuttleCitys autocomplete with OEPP String as Autocomplete  *
   */

  fetchCityDetailsByName(customerId, plantId, reload, outbound, searchCity) {
    return axios.post(OrderEntry_Base_URL + "/getShuttleCitydetails/", {
      active: 1,
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchCity,
      customerFK: customerId,
      customerPlantPK: plantId,
      reload: reload,
      outbound: outbound,
      isOEPP: "Autocomplete",
    });
  }

  /**
   * Used for Customer tab - Order Entry.
   * Fetch all the Open Bulk Invoices for the selected Customer.
   * Used for Bulk Invoices autocomplete with OEPP String as Autocomplete
   */
  fetchBulkUnitdetailsByName(customerId, searchBulkInvoice) {
    return axios.post(OrderEntry_Base_URL + "/getBulkInvoiceDetails/", {
      active: 1,
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchBulkInvoice,
      customerFK: customerId,
      isOEPP: "Autocomplete",
      closed: 0,
    });
  }
  /**
   * Used for Customer tab - Order Entry.
   * Validate Batch sequence from backend.  
   */
  validateSequence(firstSequence, lastSequence) {
    return axios.post(OrderEntry_Base_URL + "/validateSequence", {
      firstSequence: firstSequence,
      lastSequence: lastSequence,
    });
  }
  /**
   * Fetch all the plants for the selected Customer.
   * Used for Plants listing table
   */
  checkifPlantExistForSelectedCustomer(customerId) {
    return axios.get(OrderEntry_Base_URL + "/fetchcustomerplantsdetails/" + customerId);
  }

  /**
   * Fetch all the plants with plant name for the selected Customer.
   * Used for Billing plant autocomplete
   */
  getifPlantExistForSelectedCustomer(customerId, plantName) {
    return axios.post(OrderEntry_Base_URL + "/fetchcustomerplantsdetailsSearch/", {
      customerId: customerId,
      plantName: plantName,
    });
  }
  /**
   * Fetch all the yards based on selected customer and plant with reload/outbound flag.
   */
  getYardDetials(selectedCustomerId, id, reload) {
    return axios.post(OrderEntry_Base_URL + "/fetchYardsdetails/", {
      selectedCustomerId: selectedCustomerId,
      customerPlantPK: id,
      reload: reload,
    });
  }

  /**
   * Fetch all the open bulk unit invoices of the selected customer.
   *
   */
  fetchBulkUnitdetails(selectedCustomerId) {
    return axios.post(OrderEntry_Base_URL + "/fetchBulkUnitdetails/", {
      selectedCustomerId: selectedCustomerId,
    });
  }

  /**
   * Fetch all the Shuttle Citys based on selected customer and plant with reload/outbound flag.
   *
   */
  fetchPickUpCitydetails(selectedCustomerId, id, reload) {
    return axios.post(OrderEntry_Base_URL + "/fetchPickUpCitydetails/", {
      selectedCustomerId: selectedCustomerId,
      customerPlantPK: id,
      reload: reload,
    });
  }

  /**
   *
   * Fetch the details of selected yard by Id.
   *
   */
  fetchYardById(id) {
    return axios.get(Yards_Base_URL + "/getyardbyid/" + id);
  }

  /**
   *
   * Fetch the details of selected yard by Id.
   *
   */
  fetchCityById(id) {
    return axios.get(ShuttleCitys_Base_URL + "/getshuttlecitysdatabyid/" + id);
  }

  /**
   * Used for Misc Customer tab - Misc Customer Lookup - Order Entry.
   * Fetch all the Customers from CustomerAddresses.
   *
   */
  fetchMiscCustomerAddress(
    pageNumber,
    customerAddress,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag
  ) {
    return axios.post(OrderEntry_Base_URL + "/fetchMiscCustomerAddress", {
      number: pageNumber,
      size: 15,
      customerAddresses: customerAddress,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  /**
   * Used for Misc Customer tab - Order Entry.
   * Fetch all the Miscellaneous Customers from Customers.
   *
   */

  fetchMiscCustomers() {
    return axios.get(OrderEntry_Base_URL + "/fetchMiscCustomers/");
  }

  /**
   * Used for Misc Customer tab - Order Entry.
   * Fetch the details of selected Customer from CustomerAddresses.
   *
   */
  fetchMiscCustomersById(customerId) {
    return axios.get(OrderEntry_Base_URL + "/fetchMiscCustomersById/" + customerId);
  }

  /**
   * Used for Misc Pickup tab & Misc Delivery tab Lookup - Order Entry.
   * Fetch all the dealers from UnitAddresses.
   *
   */
  fetchMiscDealer(
    pageNumber,
    UnitAddresses,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag
  ) {
    return axios.post(OrderEntry_Base_URL + "/fetchMiscDealer", {
      number: pageNumber,
      size: 15,
      unitAddresses: UnitAddresses,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  /**
   * Used for Misc Pickup tab & Misc Delivery tab - Order Entry.
   * Fetch the details of selected dealer from UnitAddresses.
   *
   */
  fetchMiscDealerById(id) {
    return axios.get(OrderEntry_Base_URL + "/fetchMiscDealerById/" + id);
  }

  //Contacts Tab
  fetchCustomerContactsDetails(
    customerId,
    selectedCustomerBillingPlantId,
    deliveryCustomerPlantId,
    pickupCustomerPlantId,
    pickupDealersFK,
    deliveryDealersFK
  ) {
    return axios.post(OrderEntry_Base_URL + "/fetchCustomerContactsDetails/", {
      selectedCustomerId: customerId,
      selectedCustomerBillingPlantId: selectedCustomerBillingPlantId,
      pickupCustomerPlantFK: pickupCustomerPlantId,
      deliveryCustomerPlantFK: deliveryCustomerPlantId,
      pickupDealerFK: pickupDealersFK,
      deliveryDealerFK: deliveryDealersFK,
    });
  }

  fetchCustomerContactsDetailsBasedOnFilter(
    selectedCustomerId,
    description,
    bolContactName,
    selectedCustomerBillingPlantId,
    deliveryCustomerPlantId,
    pickupCustomerPlantId,
    pickupDealersFK,
    deliveryDealersFK
  ) {
    return axios.post(OrderEntry_Base_URL + "/fetchCustomerContactsDetailsBasedOnFilter", {
      selectedCustomerId: selectedCustomerId,
      selectedCustomerBillingPlantId: selectedCustomerBillingPlantId,
      pickupCustomerPlantFK: pickupCustomerPlantId,
      deliveryCustomerPlantFK: deliveryCustomerPlantId,
      pickupDealerFK: pickupDealersFK,
      deliveryDealerFK: deliveryDealersFK,
      description,
      bolContactName,
    });
  }

  fetchAllUnitMultiLoads(
    selectedCustomerId,
    selectedCustomerBillingPlantId,
    pickupDealerFK,
    pickupCustomerPlantId,
    miscPickupID
  ) {
    return axios.post(OrderEntry_Base_URL + "/fetchallunitmultiloads", {
      customerFK: selectedCustomerId,
      customerPlantFK: selectedCustomerBillingPlantId,
      pickupDealerFK: pickupDealerFK,
      pickupCustomerPlantFK: pickupCustomerPlantId,
      miscPickupID: miscPickupID,
    });
  }
  fetchAllUnitTypes(towableTrueAllowMultiLoadFalse) {
    return axios.get(OrderEntry_Base_URL + "/fetchallunittypes/" + towableTrueAllowMultiLoadFalse);
  }

  fetchUnitTypesByCustomer(
    customerFk,
    selectedCustomerBillingPlantId,
    pageNumber,
    searchTerm,
    selectedSearchCriteria,
    hasRates,
    towable,
    multiUnit,
    unitTypeSearchCriteria,
    sortValue,
    sortFlag
  ) {
    let activeStatus = null;
    if (unitTypeSearchCriteria === "Towable") {
      activeStatus = 1;
    } else if (unitTypeSearchCriteria === "Motorized") {
      activeStatus = 0;
    }

    return axios.post(OrderEntry_Base_URL + "/fetchunittypesbycustomer", {
      customerFK: customerFk,
      selectedCustomerBillingPlantId: selectedCustomerBillingPlantId,
      pageNumber: pageNumber,
      pageSize: 12,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerm?.trim(),
      unitTypeSearchCriteria: unitTypeSearchCriteria,
      hasRates: hasRates,
      towable: activeStatus,
      sortValue: sortValue,
      sortFlag: sortFlag,
      multiUnit: multiUnit,
    });
  }

  fetchUnitTypesByCustomerAuto(
    customerFk,
    selectedCustomerBillingPlantId,
    pageNumber,
    searchTerm,
    selectedSearchCriteria,
    hasRates,
    towable,
    multiUnit,
    unitTypeSearchCriteria,
    sortValue,
    sortFlag
  ) {
    return axios.post(OrderEntry_Base_URL + "/fetchunittypesbycustomer", {
      customerFK: customerFk,
      selectedCustomerBillingPlantId: selectedCustomerBillingPlantId,
      pageNumber: pageNumber,
      pageSize: 12,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerm?.trim(),
      unitTypeSearchCriteria: unitTypeSearchCriteria,
      hasRates: hasRates,
      towable: null,
      sortValue: sortValue,
      sortFlag: sortFlag,
      isOEPP: "Autocomplete",
      multiUnit: multiUnit,
    });
  }

  findAllUnitTypes(
    pageNumber,
    searchTerm,
    selectedSearchCriteria,
    hasRates,
    unitTypeSearchCriteria,
    sortValue,
    sortFlag,
    multiUnit
  ) {
    return axios.post(OrderEntry_Base_URL + "/findallunittypes", {
      pageNumber: pageNumber,
      pageSize: 12,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerm?.trim(),
      unitTypeSearchCriteria: unitTypeSearchCriteria,
      hasRates: hasRates,
      sortValue: sortValue,
      sortFlag: sortFlag,
      multiUnit: multiUnit,
    });
  }
  saveOrderEntry(formData) {
    return axios.post(OrderEntry_Base_URL + "/saveOrderEntry", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  generateEmailForUnitsBOL(
    dispatchPK,
    message,
    email,
    print,
    objectkey,
    emailObjectKey,
    printerName,
    pageCount,
    duplex,
    orientation,
    userPK
  ) {
    return axios.post(Email_Processor_URL + "/compose", {
      primaryKey: dispatchPK,
      primaryKeyName: "UnitPK",
      entityName: "Units",
      isEmail: email,
      isPrint: print,
      emailObjectKeyList: emailObjectKey,
      documentType: "DISP_MAIL_DOCS",
      userPK: userPK,
      printerName: printerName?.trim(),
    });
  }

  generateEmailForUnitsTollsPermits(
    dispatchPK,
    message,
    email,
    print,
    objectkey,
    emailObjectKey,
    printerName,
    pageCount,
    duplex,
    orientation
  ) {
    return axios.post(OrderEntry_Base_URL + "/generateUnitsEmail", {
      dispatchPK,
      message,
      email: email,
      print,
      objectkey,
      emailObjectKey,
      printerName,
      pageCount,
      duplex,
      orientation,
    });
  }

  generateEmailForUnitsCreditCard(
    dispatchPK,
    message,
    email,
    print,
    objectkey,
    emailObjectKey,
    printerName,
    pageCount,
    duplex,
    orientation
  ) {
    return axios.post(OrderEntry_Base_URL + "/generateUnitsEmail", {
      dispatchPK,
      message,
      email,
      print,
      objectkey,
      emailObjectKey,
      printerName,
      pageCount,
      duplex,
      orientation,
    });
  }

  saveAndFetchNewMultiLoadlist(unitMultiLoads, selectedCustomerId) {
    return axios.post(OrderEntry_Base_URL + "/saveandfetchnewmultiloadlist", {
      unitMultiLoads: unitMultiLoads,
      selectedCustomerId: selectedCustomerId,
    });
  }

  fetchInvoiceAndDriverMiles(
    pickupDealerFK,
    deliveryDealerFK,
    selectedCustomerId,
    isCustUsePlants,
    pickupCustomerPlantId,
    deliveryCustomerPlantId,
    selectedCustomerBillingPlantId,
    isMilesLowBoy
  ) {
    return axios.post(OrderEntry_Base_URL + "/fetchinvoiceanddrivermiles", {
      selectedCustomerId: selectedCustomerId,
      deliveryDealerFK: deliveryDealerFK,
      pickupCustomerPlantFK: pickupCustomerPlantId,
      deliveryCustomerPlantFK: deliveryCustomerPlantId,
      pickupDealerFK: pickupDealerFK,
      selectedCustomerBillingPlantId: selectedCustomerBillingPlantId,
      isMilesLowBoy: isMilesLowBoy,
    });
  }

  fetchInvoiceAndDriverFlatRates(
    pickupDealerFK,
    deliveryDealerFK,
    unitTypesFK,
    multiUnit,
    selectedCustomerId,
    isCustUsePlants,
    pickupCustomerPlantId,
    deliveryCustomerPlantId,
    selectedCustomerBillingPlantId,
    unitsPerDispatch,
    twoAsThree,
    isMilesLowBoy,
    gvwr
  ) {
    return axios.post(OrderEntry_Base_URL + "/fetchinvoiceanddriverflatrates", {
      selectedCustomerId: selectedCustomerId,
      deliveryDealerFK: deliveryDealerFK,
      pickupCustomerPlantFK: pickupCustomerPlantId,
      deliveryCustomerPlantFK: deliveryCustomerPlantId,
      pickupDealerFK: pickupDealerFK,
      unitTypeFK: unitTypesFK,
      multiUnit: multiUnit,
      selectedCustomerBillingPlantId: selectedCustomerBillingPlantId,
      unitsPerDispatch: unitsPerDispatch,
      twoAsThree: twoAsThree,
      isMilesLowBoy: isMilesLowBoy,
      gvwr: gvwr == "" ? 0 : gvwr,
    });
  }

  fetchCustomerRates(
    unitTypesFK,
    selectedCustomerId,
    invoiceRates,
    driverRates,
    selectedCustomerBillingPlantId,
    multiUnit,
    unitsPerDispatch,
    twoAsThree
  ) {
    return axios.post(OrderEntry_Base_URL + "/getcustomerratesstructure", {
      customerFK: selectedCustomerId,
      unitTypeFK: unitTypesFK,
      invoiceRates: invoiceRates,
      driverRates: driverRates,
      selectedCustomerBillingPlantId: selectedCustomerBillingPlantId,
      multiUnit: multiUnit,
      unitsPerDispatch: multiUnit ? unitsPerDispatch : 1,
      twoAsThree: twoAsThree,
    });
  }

  fetchSupplementalRates(
    unitTypesFK,
    selectedCustomerId,
    selectedCustomerBillingPlantId,
    deliveryDealerFK,
    stateCode,
    reload,
    returnRates
  ) {
    return axios.post(OrderEntry_Base_URL + "/getsupplementalratesdata", {
      customerFK: selectedCustomerId,
      unitTypeFK: unitTypesFK,
      selectedCustomerBillingPlantId: selectedCustomerBillingPlantId,
      deliveryDealerFK: deliveryDealerFK,
      stateCode: stateCode,
      reload: reload,
      returns: returnRates,
    });
  }

  fetchAdditionalRates(unitTypesFK, selectedCustomerId, selectedCustomerBillingPlantId, reload, returnRates) {
    return axios.post(OrderEntry_Base_URL + "/getadditionalratesdata", {
      customerFK: selectedCustomerId,
      unitTypeFK: unitTypesFK,
      selectedCustomerBillingPlantId: selectedCustomerBillingPlantId,
      reload: reload,
      returns: returnRates,
    });
  }

  fetchSpecialRates(
    unitTypesFK,
    selectedCustomerId,
    selectedCustomerBillingPlantId,
    specialCodeFK,
    reload,
    returnRates
  ) {
    return axios.post(OrderEntry_Base_URL + "/getspecialratesdata", {
      customerFK: selectedCustomerId,
      unitTypeFK: unitTypesFK,
      selectedCustomerBillingPlantId: selectedCustomerBillingPlantId,
      specialCodeFK: specialCodeFK,
      reload: reload,
      returns: returnRates,
    });
  }

  fetchCompanyDetails(companyName) {
    return axios.get(Company_Base_URL + "/getLocalCompany");
  }

  getAllDrivebys(
    pageNumber,
    stateCode,
    city,
    name,
    searchCriteria,
    searchTerm,
    sortValue,
    sortFlag,
    includePostalCodePK
  ) {
    return axios.post(OrderEntry_Base_URL + "/getdrivebys", {
      pageNumber: pageNumber,
      size: 12,
      stateCode: stateCode,
      city: city,
      name: name,
      searchCriteria: searchCriteria,
      searchTerms: searchTerm,
      sortValue: sortValue,
      sortType: sortFlag,
      includePostalCodePK: includePostalCodePK,
    });
  }

  fetchCommission(
    selectedCustomerId,
    deliveryDealerFK,
    pickupDealerFK,
    pickupCustomerPlantFK,
    deliveryCustomerPlantFK,
    selectedCustomerBillingPlantId
  ) {
    return axios.post(OrderEntry_Base_URL + "/fetchcommission", {
      selectedCustomerId: selectedCustomerId,
      deliveryDealerFK: deliveryDealerFK,
      pickupCustomerPlantFK: pickupCustomerPlantFK,
      deliveryCustomerPlantFK: deliveryCustomerPlantFK,
      pickupDealerFK: pickupDealerFK,
      // unitTypeFK : 3,
      selectedCustomerBillingPlantId: selectedCustomerBillingPlantId,
    });
  }

  checkUnitNumberValid(unitNumber, selectedCustomerId, billingPlantId) {
    return axios.post(OrderEntry_Base_URL + "/checkunitnumbervalid", {
      unitNumber: unitNumber,
      customerFK: selectedCustomerId,
      selectedCustomerBillingPlantId: billingPlantId,
    });
  }

  //Open Balance Tab
  getAllCustomerOpenBalance(
    selectedSearchCriteria,
    globalSearchTerm,
    customerOpenBalance,
    customerFK,
    pageNumber
  ) {
    return axios.post(COB_Base_URL + "/fetchcustomeropenbalances", {
      searchCriteria: selectedSearchCriteria,
      searchTerm: globalSearchTerm,
      customerOpenBalance: customerOpenBalance,
      customerId: customerFK,
      number: pageNumber,
      size: 500,
    });
  }

  getPlantById(plantId) {
    return axios.get(CustomerPlants_Base_URL + "/getcompletecustomerplant/" + plantId);
  }

  fetchAllDealersList() {
    return axios.get(OrderEntry_Base_URL + "/fetchalldealerslist");
  }

  //Open Balance Tab
  getOpenBalances(selectedCustomerId) {
    return axios.post(OrderEntry_Base_URL + "/getOpenBalances", {
      selectedCustomerId: selectedCustomerId,
    });
  }
  /**
   * Used for Unit tab - Pickup Dealer autocomplete - Order Entry.  
   */
  fetchPickupDealerByName(searchDealer, pageNumber, dealerSearchType) {
    dealerSearchType = dealerSearchType;
    let isOEPP;
    if (dealerSearchType === "Name") {
      isOEPP = "AutocompleteByName";
    } else {
      isOEPP = "AutocompleteByCityState";
    }
    return axios.post(Dealer_Base_URL + "/fetchdealers", {
      active: 1,
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchDealer,
      selectedDealerStatus: "Complete",
      isOEPP: isOEPP,
    });
  }

  /**
   * Used for Unit tab - Special Code Lookup - Order Entry.  
   */
  fetchSpecialCodedetails(pageNumber, searchCriteria, searchTerms, sortValue, sortFlag) {
    return axios.post(OrderEntry_Base_URL + "/getSpecialCodedetails", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: searchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      isOEPP: "Lookup",
    });
  }
  /**
   * Used for Unit tab - Special Code autocomplete - Order Entry.  
   */
  fetchSpecialCodeByName(searchCode, pageNumber) {
    return axios.post(OrderEntry_Base_URL + "/getSpecialCodedetails", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchCode,
      isOEPP: "Autocomplete",
    });
  }
  /**
   * Used for Unit tab - Broker Lookup - Order Entry.  
   */
  fetchBrokerDetails(pageNumber, searchCriteria, searchTerms, sortValue, sortFlag, brokerType) {
    return axios.post(OrderEntry_Base_URL + "/fetchBrokerDetails", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: searchCriteria,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      isOEPP: "Lookup",
      selectedExportBrokersStatus: "Complete",
      selectedImportBrokersStatus: "Complete",
      brokerType: brokerType,
    });
  }
  /**
   * Used for Unit tab - Broker autocomplete - Order Entry.  
   */
  fetchBrokerByName(searchBroker, pageNumber, brokerType) {
    return axios.post(OrderEntry_Base_URL + "/fetchBrokerDetails", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchBroker,
      isOEPP: "Autocomplete",
      selectedExportBrokersStatus: "Complete",
      selectedImportBrokersStatus: "Complete",
      brokerType: brokerType,
    });
  }
  /**
   * Used for Unit tab - Port of Entry Lookup - Order Entry.  
   */
  getPortOfEntryDetails(pageNumber, searchCriteria, searchTerms, sortValue, sortFlag, brokerType) {
    return axios.post(OrderEntry_Base_URL + "/getPortOfEntryDetails", {
      pageNumber: pageNumber,
      size: 12,
      searchCriteria: searchCriteria,
      searchTerm: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      isOEPP: "Lookup",
      selectedPortsOfEntryStatus: "Complete",
      brokerType: brokerType,
    });
  }
  /**
   * Used for Unit tab - Port of Entry autocomplete - Order Entry.  
   */
  fetchPortOfEntryByName(searchPort, pageNumber, brokerType) {
    return axios.post(OrderEntry_Base_URL + "/getPortOfEntryDetails", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchPort,
      isOEPP: "Autocomplete",
      selectedPortsOfEntryStatus: "Complete",
      brokerType: brokerType,
    });
  }

  getCustomerRatesDataByCustomerId(customerFK) {
    return axios.post(Customer_Rates_Base_URL + "/getcustomerratesdatabycustomerid", {
      customerFK: { customerPK: customerFK },
    });
  }

  getCustomerDealerData(
    customerFK,
    pickupDealerFK,
    deliveryDealerFK,
    pickupCustomerPlantFK,
    deliveryCustomerPlantFK
  ) {
    return axios.post(OrderEntry_Base_URL + "/getcustomerdealerdata", {
      selectedCustomerId: customerFK,
      deliveryDealerFK: deliveryDealerFK,
      pickupCustomerPlantFK: pickupCustomerPlantFK,
      deliveryCustomerPlantFK: deliveryCustomerPlantFK,
      pickupDealerFK: pickupDealerFK,
    });
  }
  getCustomerDealerRoutesData(deliveryDealerFK, customerFK, customerPlantFK) {
    return axios.post(OrderEntry_Base_URL + "/getCustomerDealerRoutes", {
      selectedCustomerId: customerFK,
      deliveryDealerFK: deliveryDealerFK,
      pickupCustomerPlantFK: customerPlantFK,
    });
  }
  getOverInvoiceAmt(userCode) {
    return axios.post(OrderEntry_Base_URL + "/getoverinvoiceamt", {
      overrideCode: userCode,
    });
  }

  getUserInvoicePercentage() {
    return axios.post(OrderEntry_Base_URL + "/getuserinvoicepercentage");
  }
  // Factory Release Process

  getPlantReleaseFlag() {
    return axios.get(OrderEntry_Base_URL + "/plantreleasecheck", {});
  }

  batchLoadsUnitsCount(firstSequence, lastSequence) {
    return axios.post(OrderEntry_Base_URL + "/batchLoadsUnitsCount", {
      firstSequence: firstSequence,
      lastSequence: lastSequence,
    });
  }

  checkDateValid(dateDetails) {
    return axios.post(OrderEntry_Base_URL + "/checkdatevalid", dateDetails);
  }

  checkDefaultDateValid(dateDetails) {
    return axios.post(OrderEntry_Base_URL + "/checkdefaultdatevalid", dateDetails);
  }

  calculateInvoiceAmount(rateVO) {
    return axios.post(OrderEntry_Base_URL + "/calculateInvoiceAndDriverAmount", rateVO);
  }

  getCDLARate(CDLAParams) {
    return axios.post(OrderEntry_Base_URL + "/getCDLARate", CDLAParams);
  }

  getApportionedRate(RateParams) {
    return axios.post(OrderEntry_Base_URL + "/getApportionedRate", RateParams);
  }

  getUnitMultiLoad(unitMultiLOadParamas) {
    return axios.post(OrderEntry_Base_URL + "/getUnitMultiLoadDefault", unitMultiLOadParamas);
  }

  sendNotificationMail(data) {
    axios.post(OrderEntry_Base_URL + "/sendEmail?Flag=" + data);
  }
}

export default new OrderEntryService();
