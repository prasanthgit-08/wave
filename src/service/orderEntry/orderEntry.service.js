import { axios } from "../../config/axiosInterceptors";
import {
  BackEnd_Base_URL,
  OrderEntry_Base_URL,
  Yards_Base_URL,
  ShuttleCitys_Base_URL,
  Credit_Base_URL,
  Email_Processor_URL,
} from "../../constants/backendUrl.constant";

class OrderEntryService {
  async getCustomerData({ searchText, pageNumber, pageSize }) {
    try {
      const response = await axios.post(`${OrderEntry_Base_URL}/fetchcustomerdetails`, {
        searchCustomer: searchText, //searchCustomer,
        pageNumber: pageNumber, //pageNumber,
        size: pageSize,
        selectedCustomerId: null, //selectedCustomerId,
      });
      const { data } = response;
      return data;
    } catch (error) {
      console.error("getCustomer error", error);
      throw error;
    }
  }
  async getPlantDetails({
    customerFK,
    isDPUCustomer,
    searchTerms,
    active = 1,
    pageNumber = 0,
    size = 100,
    customerPlants,
    advanceSortingOrder,
    sortType,
    sortValue,
    searchCriteria = "Beginning",
    selectedCustomerPlantStatus = "Complete",
    isOEPP = "Autocomplete",
    billingPlant,
  }) {
    const payload = {
      active,
      pageNumber,
      size,
      searchCriteria,
      customerPlants,
      searchTerms,
      selectedCustomerPlantStatus,
      customerFK,
      isOEPP,
      isDPUCustomer,
      billingPlant,
      advanceSortingOrder,
      sortType,
      sortValue,
    };
    try {
      const response = await axios.post(`${OrderEntry_Base_URL}/fetchCustomerPlantsLookupDetails`, payload);
      return response;
    } catch (error) {
      console.error("PlantDetails error", error);
      throw error;
    }
  }

  async getYardDetails({
    active = 1,
    pageNumber = 0,
    size = 100,
    searchCriteria = "Beginning",
    searchTerm,
    customerFK,
    customerPlantPK,
    reload,
    outbound,
    sortType,
    sortValue,
    isOEPP = "Autocomplete",
  }) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/getYardsdetails", {
        active,
        pageNumber,
        size,
        searchCriteria,
        searchTerm,
        customerFK,
        customerPlantPK,
        reload,
        outbound,
        isOEPP,
        sortType,
        sortValue,
      });

      return res;
    } catch (error) {
      console.error("YardDetails error", error);
      throw error;
    }
  }

  async getShuttleCityDetails({
    active = 1,
    pageNumber = 0,
    size = 100,
    searchCriteria = "Beginning",
    searchTerm,
    customerFK,
    customerPlantPK,
    reload,
    outbound,
    sortType,
    sortValue,
    isOEPP = "Autocomplete",
  }) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/getShuttleCitydetails/", {
        active,
        pageNumber,
        size,
        searchCriteria,
        searchTerm,
        customerFK,
        customerPlantPK,
        reload,
        outbound,
        sortType,
        sortValue,
        isOEPP,
      });

      return res;
    } catch (error) {
      console.error("shuttle error", error);
      throw error;
    }
  }

  async getYardById(id) {
    try {
      const res = await axios.get(`${Yards_Base_URL}/getyardbyid/${id} `);

      return res;
    } catch (error) {
      console.error("YardDetails error", error);
      throw error;
    }
  }
  async getCityById(id) {
    try {
      const res = await axios.get(`${ShuttleCitys_Base_URL}/getshuttlecitysdatabyid/${id} `);

      return res;
    } catch (error) {
      console.error("city error", error);
      throw error;
    }
  }

  async checkDateValid(date) {
    try {
      const res = await axios.post(`${OrderEntry_Base_URL}/checkdatevalid`, date);

      return res;
    } catch (error) {
      console.error("Error checking date", error);
      throw error;
    }
  }
  async getCustomerDealerData({
    selectedCustomerId,
    deliveryDealerFK,
    pickupCustomerPlantFK,
    deliveryCustomerPlantFK,
    pickupDealerFK,
  }) {
    try {
      const res = await axios.post(`${OrderEntry_Base_URL}/getcustomerdealerdata`, {
        selectedCustomerId,
        deliveryDealerFK,
        pickupCustomerPlantFK,
        deliveryCustomerPlantFK,
        pickupDealerFK,
      });

      return res;
    } catch (error) {
      console.error("Error getting customer dealer", error);
      throw error;
    }
  }

  /**
   * Used for Misc Pickup tab & Misc Delivery tab Lookup - Order Entry.
   * Fetch all the dealers from UnitAddresses.
   *
   */

  async fetchMiscDealer({
    pageNumber,
    unitAddresses,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortType,
  }) {
    try {
      const response = await axios.post(`${OrderEntry_Base_URL}/fetchMiscDealer`, {
        number: pageNumber,
        size: 15,
        unitAddresses,
        searchCriteria,
        advanceSortingOrder,
        searchTerms,
        sortValue,
        sortType,
      });
      const { data } = response;
      return data;
    } catch (error) {
      console.error("getMisc Dealer error", error);
      throw error;
    }
  }

  /**
   * Used for Misc Customer tab Lookup - Order Entry.
   * Fetch all the dealers from CustomerAddresses.
   *
   */

  async fetchMiscCustomer({
    pageNumber,
    customerAddresses,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortType,
  }) {
    try {
      const response = await axios.post(`${OrderEntry_Base_URL}/fetchMiscCustomerAddress`, {
        number: pageNumber,
        size: 15,
        customerAddresses,
        searchCriteria,
        advanceSortingOrder,
        searchTerms,
        sortValue,
        sortType,
      });
      const { data } = response;
      return data;
    } catch (error) {
      console.error("getMisc Customer error", error);
      throw error;
    }
  }

  /**
   * Used for Misc Pickup tab & Misc Delivery tab - Order Entry.
   * Fetch the details of selected dealer from UnitAddresses.
   *
   */

  async fetchMiscDealerById(id) {
    try {
      const res = await axios.get(`${OrderEntry_Base_URL}/fetchMiscDealerById/${id} `);

      return res;
    } catch (error) {
      console.error(" error", error);
      throw error;
    }
  }

  async findAllUnitTypes({
    pageNumber,
    pageSize = 12,
    searchCriteria = "Beginning",
    searchTerm,
    unitTypeSearchCriteria,
    hasRates,
    sortValue,
    sortFlag,
    multiUnit,
  }) {
    try {
      const res = axios.post(OrderEntry_Base_URL + "/findallunittypes", {
        pageNumber,
        pageSize,
        searchCriteria,
        searchTerm,
        unitTypeSearchCriteria,
        hasRates,
        sortValue,
        sortFlag,
        multiUnit,
      });

      return res;
    } catch (error) {
      console.error("Error fetching all unit types", error);
      throw error;
    }
  }

  async getAllDrivebys({
    pageNumber,
    stateCode,
    city,
    name,
    pageSize = 12,
    searchCriteria = "Beginning",
    searchTerm,
    sortValue,
    sortFlag,
    includePostalCodePK,
  }) {
    try {
      const res = axios.post(OrderEntry_Base_URL + "/getdrivebys", {
        pageNumber: pageNumber,
        size: pageSize,
        stateCode: stateCode,
        city: city,
        name: name,
        searchCriteria,
        searchTerms: searchTerm,
        sortValue,
        sortType: sortFlag,
        includePostalCodePK,
      });

      return res;
    } catch (error) {
      console.error("Error fetching all unit types", error);
      throw error;
    }
  }

  async fetchUnitTypesByCustomer({
    customerFK,
    selectedCustomerBillingPlantId,
    pageNumber = 0,
    pageSize = 12,
    searchCriteria = "Beginning",
    searchTerm,
    unitTypeSearchCriteria,
    hasRates,
    towable,
    sortValue,
    sortFlag,
    isOEPP = "Autocomplete",
    multiUnit,
    customerPlantFK = null,
  }) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/fetchunittypesbycustomer", {
        customerFK,
        selectedCustomerBillingPlantId,
        pageNumber,
        pageSize,
        searchCriteria,
        searchTerm,
        unitTypeSearchCriteria,
        hasRates,
        towable,
        sortValue,
        sortFlag,
        isOEPP,
        multiUnit,
        customerPlantFK,
      });

      return res;
    } catch (error) {
      console.error(" error", error);
      throw error;
    }
  }

  /**
   * Used for Misc Pickup tab & Misc Delivery tab - Order Entry.
   * Fetch the details of selected dealer from UnitAddresses.
   *
   */
  async fetchMiscCustomersById(id) {
    try {
      const res = await axios.get(`${OrderEntry_Base_URL}/fetchMiscCustomersById/${id} `);

      return res;
    } catch (error) {
      console.error(" error", error);
      throw error;
    }
  }
  /**
   * Used for Contact Tab - Order Entry.
   * Fetch the details of contacts-based on search condition
   *
   */

  async fetchCustomerContactsDetailsBasedOnFilter(
    selectedCustomerId,
    description,
    bolContactName,
    selectedCustomerBillingPlantId,
    deliveryCustomerPlantId,
    pickupCustomerPlantId,
    pickupDealersFK,
    deliveryDealersFK
  ) {
    try {
      const response = await axios.post(OrderEntry_Base_URL + "/fetchCustomerContactsDetailsBasedOnFilter", {
        selectedCustomerId,
        selectedCustomerBillingPlantId,
        pickupCustomerPlantFK: pickupCustomerPlantId,
        deliveryCustomerPlantFK: deliveryCustomerPlantId,
        pickupDealerFK: pickupDealersFK,
        deliveryDealerFK: deliveryDealersFK,
        description,
        bolContactName,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching customer contact details:", error);
      throw error;
    }
  }

  /**
   * Used for Contact Tab - Order Entry.
   * Fetch the details of contacts.
   *
   */
  async fetchCustomerContactsDetails({
    customerId,
    selectedCustomerBillingPlantId,
    deliveryCustomerPlantId,
    pickupCustomerPlantId,
    pickupDealersFK,
    deliveryDealersFK,
  }) {
    try {
      const response = await axios.post(OrderEntry_Base_URL + "/fetchCustomerContactsDetails/", {
        selectedCustomerId: customerId,
        selectedCustomerBillingPlantId,
        pickupCustomerPlantFK: pickupCustomerPlantId,
        deliveryCustomerPlantFK: deliveryCustomerPlantId,
        pickupDealerFK: pickupDealersFK,
        deliveryDealerFK: deliveryDealersFK,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching customer contact details:", error);
      throw error;
    }
  }

  async getOpenBalances(selectedCustomerId) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/getOpenBalances", {
        selectedCustomerId: selectedCustomerId,
      });
      return res;
    } catch (error) {
      console.error("Error checking unique", error);
      throw error;
    }
  }

  async fetchBulkUnitdetails({ customerFK, searchTerms }) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/getBulkInvoiceDetails/", {
        active: 1,
        pageNumber: 0,
        size: 100,
        searchCriteria: "Beginning",
        searchTerms,
        customerFK,
        isOEPP: "Autocomplete",
        closed: 0,
      });

      return res;
    } catch (error) {
      console.error("Error fetching bulk unit details:", error);
      throw error;
    }
  }

  async checkUnitNumberUnique({ unitNumber, customerFK, selectedCustomerBillingPlantId }) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/v1/checkunitnumbervalid", {
        unitNumber,
        customerFK,
        selectedCustomerBillingPlantId,
      });

      return res;
    } catch (error) {
      console.error("Error checking unique", error);
      throw error;
    }
  }

  async fetchSpecialCodedetails({
    pageNumber = 0,
    size = 100,
    searchCriteria = "Beginning",
    searchTerm,
    sortValue,
    sortType,
    isOEPP = "Autocomplete",
    type,
  }) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/getSpecialCodedetails", {
        pageNumber,
        size,
        searchCriteria,
        searchTerm,
        sortValue,
        sortType,
        isOEPP,
        type,
      });
      return res;
    } catch (error) {
      console.error("Error special code:", error);
      throw error;
    }
  }

  async fetchBrokerDetails({
    pageNumber = 0,
    size = 100,
    searchCriteria = "Beginning",
    searchTerms,
    sortValue,
    sortType,
    isOEPP = "Autocomplete",
    brokerType,
    selectedExportBrokersStatus = "Complete",
    selectedImportBrokersStatus = "Complete",
  }) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/fetchBrokerDetails", {
        pageNumber,
        size,
        searchCriteria,
        searchTerms,
        sortValue,
        sortType,
        isOEPP,
        brokerType,
        selectedExportBrokersStatus,
        selectedImportBrokersStatus,
      });
      return res;
    } catch (error) {
      console.error("Error Broker Details:", error);
      throw error;
    }
  }

  async fetchPortDetails({
    pageNumber = 0,
    size = 100,
    searchCriteria = "Beginning",
    searchTerms,
    sortValue,
    sortType,
    isOEPP = "Autocomplete",
    brokerType,
    selectedPortsOfEntryStatus = "Complete",
  }) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/getPortOfEntryDetails", {
        pageNumber,
        size,
        searchCriteria,
        searchTerm: searchTerms,
        sortValue,
        sortType,
        isOEPP,
        brokerType,
        selectedPortsOfEntryStatus,
      });
      return res;
    } catch (error) {
      console.error("Error port Of entry details:", error);
      throw error;
    }
  }

  async fetchMultiUnitLoadsDetails({
    customerFK,
    customerPlantFK,
    pickupDealerFK,
    pickupCustomerPlantFK,
    miscPickupID,
    city,
    stateCode,
  }) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/fetchallunitmultiloads", {
        customerFK,
        customerPlantFK,
        pickupDealerFK,
        pickupCustomerPlantFK,
        miscPickupID,
        city,
        stateCode,
      });
      return res;
    } catch (error) {
      console.error("Error multi unit load:", error);
      throw error;
    }
  }

  /**
   * Used for Customer tab - Order Entry.
   * Validate Batch sequence from backend.
   */
  async validateSequence(firstSequence, lastSequence) {
    try {
      const response = await axios.post(OrderEntry_Base_URL + "/validateSequence", {
        firstSequence,
        lastSequence,
      });

      return response;
    } catch (error) {
      console.error("Error validating sequence:", error);
      throw error;
    }
  }

  async sendNotificationMail(data) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/sendEmail?Flag=" + data);
      return res;
    } catch (error) {
      console.error("Error notification mail:", error);
      throw error;
    }
  }

  async getUserInvoicePercentage() {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/getuserinvoicepercentage");
      return res;
    } catch (error) {
      console.error("Error user invoice percentage:", error);
      throw error;
    }
  }
  async saveOrderEntry(payload) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/saveOrderEntry", payload);
      return res;
    } catch (error) {
      console.error("Error save Order entry:", error);
      throw error;
    }
  }
  async saveOrderEntryNew(payload) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/v1" + "/saveOrderEntry", payload);
      return res;
    } catch (error) {
      console.error("Error save Order entry:", error);
      throw error;
    }
  }

  async fetchInvoiceAndDriverFlatRates({
    selectedCustomerId = null,
    deliveryDealerFK = null,
    pickupCustomerPlantFK = null,
    deliveryCustomerPlantFK = null,
    pickupDealerFK = null,
    unitTypeFK = null,
    multiUnit,
    selectedCustomerBillingPlantId = null,
    unitsPerDispatch = 2,
    twoAsThree,
    isMilesLowBoy,
    gvwr = 0,
    cdlaRequired = false,
  }) {
    try {
      const res = await axios.post(OrderEntry_Base_URL + "/fetchinvoiceanddriverflatrates", {
        selectedCustomerId,
        deliveryDealerFK,
        pickupCustomerPlantFK,
        deliveryCustomerPlantFK,
        pickupDealerFK,
        unitTypeFK,
        multiUnit,
        selectedCustomerBillingPlantId,
        unitsPerDispatch,
        twoAsThree,
        isMilesLowBoy,
        gvwr,
        cdlaRequired,
      });
      return res;
    } catch (error) {
      console.error("Error fetch invoice and driver flat rates:", error);
      throw error;
    }
  }

  async fetchInvoiceAndDriverMiles({
    selectedCustomerId,
    deliveryDealerFK,
    pickupCustomerPlantFK,
    deliveryCustomerPlantFK,
    pickupDealerFK,
    selectedCustomerBillingPlantId,
    isMilesLowBoy,
  }) {
    try {
      const response = await axios.post(OrderEntry_Base_URL + "/fetchinvoiceanddrivermiles", {
        selectedCustomerId,
        deliveryDealerFK,
        pickupCustomerPlantFK,
        deliveryCustomerPlantFK,
        pickupDealerFK,
        selectedCustomerBillingPlantId,
        isMilesLowBoy,
      });

      return response;
    } catch (error) {
      console.error("Error fetching invoice and driver miles:", error);
      throw error;
    }
  }

  async fetchCommission({
    selectedCustomerId,
    deliveryDealerFK,
    pickupCustomerPlantFK,
    deliveryCustomerPlantFK,
    pickupDealerFK,
    selectedCustomerBillingPlantId,
  }) {
    try {
      const response = await axios.post(OrderEntry_Base_URL + "/fetchcommission", {
        selectedCustomerId,
        deliveryDealerFK,
        pickupCustomerPlantFK,
        deliveryCustomerPlantFK,
        pickupDealerFK,
        selectedCustomerBillingPlantId,
      });

      return response;
    } catch (error) {
      console.error("Error in fetch commission", error);
      throw error;
    }
  }

  async getOverInvoiceAmt(userCode) {
    try {
      const res = await axios.post(`${OrderEntry_Base_URL}/getoverinvoiceamt`, {
        overrideCode: userCode,
      });

      return res;
    } catch (error) {
      console.error("Error over invoice amount", error);
      throw error;
    }
  }

  async fetchCustomerRates({
    customerFK,
    unitTypeFK,
    selectedCustomerBillingPlantId,
    multiUnit,
    unitsPerDispatch,
    twoAsThree,
  }) {
    try {
      const res = await axios.post(`${OrderEntry_Base_URL}/getcustomerratesstructure`, {
        customerFK,
        unitTypeFK,
        selectedCustomerBillingPlantId,
        multiUnit,
        unitsPerDispatch,
        twoAsThree,
      });

      return res;
    } catch (error) {
      console.error("Error getting customer rates", error);
      throw error;
    }
  }

  async fetchSupplementalRates({
    customerFK,
    unitTypeFK,
    selectedCustomerBillingPlantId,
    deliveryDealerFK,
    stateCode,
    reload,
    returns,
  }) {
    try {
      const res = await axios.post(`${OrderEntry_Base_URL}/getsupplementalratesdata`, {
        customerFK,
        unitTypeFK,
        selectedCustomerBillingPlantId,
        deliveryDealerFK,
        stateCode,
        reload,
        returns,
      });

      return res;
    } catch (error) {
      console.error("Error getting customer rates", error);
      throw error;
    }
  }

  async fetchSpecialRates({
    customerFK,
    unitTypeFK,
    selectedCustomerBillingPlantId,
    specialCodeFK,
    reload,
    returns,
  }) {
    try {
      const res = await axios.post(`${OrderEntry_Base_URL}/getspecialratesdata`, {
        customerFK,
        unitTypeFK,
        selectedCustomerBillingPlantId,
        specialCodeFK,
        reload,
        returns,
      });

      return res;
    } catch (error) {
      console.error("Error getting special rates", error);
      throw error;
    }
  }

  async fetchAdditionalRates({ customerFK, unitTypeFK, selectedCustomerBillingPlantId, reload, returns }) {
    try {
      const res = await axios.post(`${OrderEntry_Base_URL}/getadditionalratesdata`, {
        customerFK,
        unitTypeFK,
        selectedCustomerBillingPlantId,
        reload,
        returns,
      });

      return res;
    } catch (error) {
      console.error("Error getting additional rates", error);
      throw error;
    }
  }

  async getCDLARate(CDLAParams) {
    try {
      const res = await axios.post(`${OrderEntry_Base_URL}/getCDLARate`, CDLAParams);

      return res;
    } catch (error) {
      console.error("Error getting CDLA rate", error);
      throw error;
    }
  }
  async calculateInvoiceAmount(rateVO) {
    try {
      const res = await axios.post(`${OrderEntry_Base_URL}/calculateInvoiceAndDriverAmount`, rateVO);

      return res;
    } catch (error) {
      console.error("Error calculating invoice amount", error);
      throw error;
    }
  }
  async getCalculateRates(payload) {
    try {
      const res = await axios.post(`${OrderEntry_Base_URL}/calculateCommonRate`, payload);

      return res;
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  }

  /** For credit card tab in order entry */
  async isZipCodeExisting(cardBillingZipcode) {
    try {
      const response = await axios.post(Credit_Base_URL + "/isZipCodeExisting", {
        creditCardPostalCode: cardBillingZipcode,
      });

      return response;
    } catch (error) {
      console.error("Error checking ZIP Code:", error);
      throw error;
    }
  }

  fetchcustomercreditcarddetails(id) {
    return axios.get(OrderEntry_Base_URL + "/fetchcustomercreditcarddetails/" + id);
  }

  batchLoadsUnitsCount(firstSequence, lastSequence) {
    return axios.post(OrderEntry_Base_URL + "/batchLoadsUnitsCount", {
      firstSequence: firstSequence,
      lastSequence: lastSequence,
    });
  }

  getUnitMultiLoad(unitMultiLOadParamas) {
    return axios.post(OrderEntry_Base_URL + "/getUnitMultiLoadDefault", unitMultiLOadParamas);
  }

  async generateEmailForUnitsBOL({ unitPK, email, print, emailObjectKey, userPK, printerName }) {
    try {
      const response = await axios.post(Email_Processor_URL + "/compose", {
        primaryKey: unitPK,
        primaryKeyName: "UnitPK",
        entityName: "Units",
        isEmail: email,
        isPrint: print,
        emailObjectKeyList: emailObjectKey,
        documentType: "DISP_MAIL_DOCS",
        userPK: userPK,
        printerName: printerName,
      });

      return response.data;
    } catch (error) {
      console.error("Failed to send BOL email ", error);
      throw error;
    }
  }
  async getApportionedRate({
    shippingWeight,
    invoiceCustomerRateFK,
    driverCustomerRateFK,
    reload,
    companyName,
    returns,
  }) {
    try {
      const response = await axios.post(OrderEntry_Base_URL + "/getApportionedRate", {
        shippingWeight,
        invoiceCustomerRateFK,
        driverCustomerRateFK,
        reload,
        companyName,
        return: returns,
      });

      return response.data;
    } catch (error) {
      console.error("Error getting apportioned rate ", error);
      throw error;
    }
  }

  ////////////////// End //////////////
}
const OrderEntryServices = new OrderEntryService();

export default OrderEntryServices;
