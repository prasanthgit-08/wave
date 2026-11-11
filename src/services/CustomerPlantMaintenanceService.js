import { axios } from "../config/axiosInterceptors";
import {
  AutoCompleteDropdown_No_Of_Records,
  CommonLookup_Base_URL,
  CustomerActivitySummaryReport_Base_URL,
  CustomerPlants_Base_URL,
  CustomerSalesReport_Base_URL,
  HalfScreen_RecordsPerPage,
  OnRoadNotDeliveredReport_Base_URL,
  StandardMaintenance_RecordsPerPage,
  TripListingByCustomerReport_Base_URL,
  UnitExceptionReport_Base_URL,
  YardInventoryReport_Base_URL,
} from "./constants/applicationConstants";
import { Customer_Base_URL } from "./constants/applicationConstants";
import { ImportBroker_Base_URL } from "./constants/applicationConstants";
import { UnitTypeGroup_Base_URL } from "./constants/applicationConstants";
import { CustomerPlantGroup_Base_URL } from "./constants/applicationConstants";
class CustomerPlantMaintenanceService {
  //customer useplants=true
  getAlluseplantsCustomers(
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
    let usePlant = true;
    return axios.post(Customer_Base_URL + "/getalluseplantscustomers", {
      usePlants: usePlant,
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
    });
  }
  //list of plants
  getAllPlantsByCustomer(
    selectedCustomerPlantStatus,
    active,
    selectedSearchCriteria,
    plant,
    pageNumber,
    searchTerms,
    customerId,
    customerPlantFKS,
    sortValue,
    sortFlag,
    size
  ) {
    let plantStatus = null;
    if (active === "Active") {
      plantStatus = 1;
    } else if (active === "Inactive") {
      plantStatus = 0;
    }

    return axios.post(CustomerPlants_Base_URL + "/getallplantsbycustomer", {
      selectedCustomerPlantStatus: selectedCustomerPlantStatus,
      active: plantStatus,
      searchCriteria: selectedSearchCriteria,
      customerPlants: plant,
      number: pageNumber,
      size: size || HalfScreen_RecordsPerPage,
      searchTerms: searchTerms,
      customerId: customerId,
      customerPlantFKS: customerPlantFKS,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getRestrictedCustomerPlants(
    selectedCustomerPlantStatus,
    active,
    selectedSearchCriteria,
    plant,
    pageNumber,
    searchTerms,
    customerId,
    customerPlantFKS,
    sortValue,
    sortFlag,
    size,
    restrictedPlantLists
  ) {
    let plantStatus = null;
    if (active === "Active") {
      plantStatus = 1;
    } else if (active === "Inactive") {
      plantStatus = 0;
    }

    return axios.post(CustomerPlants_Base_URL + "/getAllPlantsByCustomerForRestricted", {
      selectedCustomerPlantStatus: selectedCustomerPlantStatus,
      active: plantStatus,
      searchCriteria: selectedSearchCriteria,
      customerPlants: plant,
      number: pageNumber,
      size: size || HalfScreen_RecordsPerPage,
      searchTerms: searchTerms,
      customerId: customerId,
      customerPlantFKS: [],
      sortValue: sortValue,
      sortType: sortFlag,
      // restrictedPlantLists:restrictedPlantLists,
      // restrictedPlant:true,
      type: "CustomerDealerLookup",
      existingCustomerList: restrictedPlantLists,
    });
  }

  getAllPlantsByCustomerAuto(string) {
    return axios.post(CustomerPlants_Base_URL + "/getallplantsbycustomer", {
      selectedCustomerPlantStatus: "Complete",
      active: 1,
      searchCriteria: "Beginning",
      number: 0,
      size: 50,
      searchTerms: string,
      customerId: null,

      sortValue: null,
      sortType: false,
      isOEPP: "Autocomplete",
    });
  }

  getcompleteCustomerPlantsById(Id) {
    return axios.get(CustomerPlants_Base_URL + "/getcompletecustomerplant/" + Id);
  }
  //save
  createCustomer(plantFormData) {
    return axios.post(CustomerPlants_Base_URL + "/createcustomerplants", plantFormData);
  }
  //uniqness checking
  checkNameExist(name, customerId, pk, incompletePlantPK) {
    return axios.post(CustomerPlants_Base_URL + "/checknameexists", {
      customerFK: customerId,
      name: name,
      customerPlantPK: pk,
      incompleteCustomerPlantPK: incompletePlantPK,
    });
  }
  //activate-deactivate
  activateCustomerPlant(customerPlantPK) {
    return axios.put(CustomerPlants_Base_URL + "/activatecustomerplants", {
      customerPlantPK: customerPlantPK,
    });
  }

  deactivateCustomerPlant(customerPlantPK) {
    return axios.put(CustomerPlants_Base_URL + "/deactivatecustomerplants", {
      customerPlantPK: customerPlantPK,
    });
  }
  //delete
  deleteCustomerPlant(id) {
    return axios.delete(CustomerPlants_Base_URL + "/deletecustomerplant/" + id);
  }
  //plantgroup autocomplete
  getCustomerPlantGroups(customerId) {
    return axios.post(CustomerPlants_Base_URL + "/getplantgroupdescription", {
      customerFK: customerId,
    });
  }

  //Shuttlecity Autocomplete
  getShuttleCity(searchTerm, outbound) {
    return axios.post(CustomerPlants_Base_URL + "/fetchshuttlecitys", {
      searchCriteria: "Beginning",
      searchTerm,
      outbound,
      pageNumber: 0,
      size: 10,
      isCustomerPlantMaintenance: 1,
    });
  }

  //Yard Autocomplete
  getAllYardsData(searchTerm) {
    return axios.post(CustomerPlants_Base_URL + "/allyards", {
      searchCriteria: "Beginning",
      searchTerm,
      pageNumber: 0,
      size: 10,
      active: true,
    });
  }
  //broker autocomplete
  getBrokerData(searchTerm) {
    return axios.post(CustomerPlants_Base_URL + "/allimportbroker", {
      searchCriteria: "Beginning",
      searchTerm,
      pageNumber: 0,
      size: 100,
      iscustomerPlant: "Autocomplete",
    });
  }

  //unit type group lookup
  getUnitTypeGroupForlookup(
    selectedSearchCriteria,
    searchTerms,
    unitTypeGroupPageNumber,
    normalSortFlag,
    normalSortValue,
    unitTypeGroupPKS
  ) {
    return axios.post(CustomerPlants_Base_URL + "/allunittypegroups", {
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: unitTypeGroupPageNumber,
      size: 12,
      sortType: normalSortFlag,
      sortValue: normalSortValue,
      customerUnitTypeGroupFKS: unitTypeGroupPKS,
    });
  }

  //yardInventoryReport
  fetchUnitTypeGroupForYardInventory({
    selectedSearchCriteria = "Beginning",
    searchTerms,
    unitTypeGroupPageNumber = 0,
    normalSortFlag = false,
    normalSortValue = "",
    resultType,
    pageSize = 12,
    unitTypePK,
  }) {
    return axios.post(YardInventoryReport_Base_URL + "lookup", {
      type: "UNITTYPE_GROUP",
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: unitTypeGroupPageNumber,
      pageSize,
      sortType: normalSortFlag,
      sortValue: normalSortValue,
      resultType,
      unitTypeFK: unitTypePK || null,
    });
  }
  //unit type group autocomplete
  getUnitTypeGroupAutocomplete(searchTerm) {
    return axios.post(CustomerPlants_Base_URL + "/allunittypegroups", {
      searchCriteria: "Beginning",
      searchTerm,
      pageNumber: 0,
      size: 100,
    });
  }
  //Customer Plant Group Lookup
  getPlantGroupData(
    customerFK,
    selectedSearchCriteria,
    searchTerms,
    plantGroupPageNumber,
    normalSortFlag,
    normalSortValue
  ) {
    return axios.post(CustomerPlants_Base_URL + "/allplantgroupsforplantlookup", {
      customerId: customerFK,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: plantGroupPageNumber,
      size: 12,
      sortType: normalSortFlag,
      sortValue: normalSortValue,
      iscustomerPlant: "Autocomplete",
    });
  }
  //Customer Plant Group Lookup Autocomplete
  getPlantGroupAutocomplete(searchTerms, customerFK) {
    return axios.post(CustomerPlants_Base_URL + "/allplantgroupsforplantlookup", {
      searchCriteria: "Beginning",
      searchTerm: searchTerms,
      pageNumber: 0,
      size: 100,
      customerId: customerFK,
      iscustomerPlant: "Autocomplete",
    });
  }
  //customerplants/fetchBrokerDetails
  //Import Broker lookup

  //unittype data by id
  getUnittypeGroupsById(Id) {
    return axios.get(UnitTypeGroup_Base_URL + "/getunittypegroupdata/" + Id);
  }
  //import broker byid
  getImportBrokerById(Id) {
    return axios.get(ImportBroker_Base_URL + "/getimportbrokerdata/" + Id);
  }
  //plant group byid
  getPlantGroupById(Id) {
    return axios.get(CustomerPlantGroup_Base_URL + "/getcustomerplantgroup/" + Id);
  }
  //Yard lookup -(yards having printers)-(Fieldname:alternate yard for BOL)
  getYardsForLookupWithPrinters(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, active) {
    let status = null;
    if (active === "Active") {
      status = 1;
    } else if (active === "Inactive") {
      status = 0;
    }

    return axios.post(CustomerPlants_Base_URL + "/allyardswithprinters", {
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber: pageNumber,
      active: 1,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      isPrinter: true,
      hasPrinters: true,
    });
  }
  //Yard Autocomplete-(yards having printers)-(Fieldname:alternate yard for BOL)
  getAllYardsWithPrinters(searchTerm) {
    return axios.post(CustomerPlants_Base_URL + "/allyards", {
      searchCriteria: "Beginning",
      searchTerm,
      pageNumber: 0,
      size: 10,
      active: true,
      isPrinter: true,
      hasPrinters: true,
    });
  }

  //uniqness checking-sister plant cde
  checkPlantCode(code, pk, incompletePlantPK) {
    return axios.post(CustomerPlants_Base_URL + "/checkplantcodeexists", {
      sisterPlantCode: code,
      customerPlantPK: pk,
      incompleteCustomerPlantPK: incompletePlantPK,
    });
  }

  //Ytd units
  getYtdUnitsValue(year, pk) {
    return axios.post(CustomerPlants_Base_URL + "/totalunits", {
      year: year,
      customerPlantFK: pk,
    });
  }

  fetchAllPlantdetailsByName(searchPlant) {
    return axios.post(CustomerPlants_Base_URL + "/getallplantsbycustomer", {
      active: 1,
      number: 0,
      size: AutoCompleteDropdown_No_Of_Records,
      searchCriteria: "Beginning",
      searchTerms: searchPlant,
      selectedCustomerPlantStatus: "Complete",
      type: "Autocomplete",
    });
  }

  //customerActivitySummaryReport
  getCustomerPlantsForReport(
    customerId,
    selectedSearchCriteria,
    searchTerms,
    pageNumber,
    sortValue,
    sortFlag,
    type,
    pageSize,
    name,
    brand,
    productLine
  ) {
    return axios.post(CustomerActivitySummaryReport_Base_URL + "lookupPlant", {
      customerPK: customerId,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: pageNumber,
      sortValue: sortValue || "",
      sortType: sortFlag,
      type: type,
      pageSize: pageSize,
      name: name,
      brand: brand,
      productLine: productLine,
    });
  }

  //TripListingByCustomerReport
  getPlantsForTripListingReport(
    selectedSearchCriteria,
    searchTerms,
    pageNumber,
    sortValue,
    sortFlag,
    type,
    pageSize,
    name,
    brand,
    productLine
  ) {
    return axios.post(TripListingByCustomerReport_Base_URL + "plantLookup", {
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: pageNumber,
      sortValue: sortValue || "",
      sortType: sortFlag,
      type: type,
      pageSize: pageSize,
      name: name,
      brand: brand,
      productLine: productLine,
    });
  }

  //OnRoadNotDeliveredReport
  getPlantsForOnRoadNotDeliveredReport(
    customerPK,
    selectedSearchCriteria,
    searchTerms,
    pageNumber,
    sortValue,
    sortFlag,
    type,
    pageSize,
    name,
    brand,
    productLine
  ) {
    return axios.post(OnRoadNotDeliveredReport_Base_URL + "plantLookup", {
      customerPK: customerPK,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: pageNumber,
      sortValue: sortValue || "",
      sortType: sortFlag,
      type: type,
      pageSize: pageSize,
      name: name,
      brand: brand,
      productLine: productLine,
    });
  }

  //CustomerSalesReport
  async getPlantsForCustomerSalesReport({
    customerPK,
    pageNumber = 0,
    pageSize = 15,
    searchCriteria = "Beginning",
    searchTerms = "",
    sortValue,
    sortType,
    type = "AutoComplete",
    FirstField,
    secondField,
    thirdField,
    name,
    brand,
    productLine,
  }) {
    try {
      const res = await axios.post(CustomerSalesReport_Base_URL + "plantLookup", {
        customerPK,
        type,
        pageNumber,
        pageSize,
        searchCriteria,
        searchTerm: searchTerms,
        firstField: FirstField,
        secondField,
        thirdField,
        name,
        brand,
        productLine,
        sortValue,
        sortType,
      });
      return res;
    } catch (error) {
      console.error("Error in getAllUsersForTripListing:", error);
    }
  }

  //CommonLookup
  getPlantsForCommonLookup({
    reportType,
    customerPK = null,
    pageNumber = 0,
    pageSize = 15,
    searchCriteria = "Beginning",
    searchTerms = "",
    sortValue = "Name",
    sortType = false,
    type = "AutoComplete",
    firstField = "",
    secondField = "",
    thirdField = "",
    name = "",
    brand = "",
    productLine = "",
  }) {
    return axios.post(CommonLookup_Base_URL + "plantLookup", {
      reportType,
      type,
      customerPK,
      searchCriteria,
      searchTerm: searchTerms,
      pageNumber,
      pageSize,
      sortValue,
      sortType,
      firstField,
      secondField,
      thirdField,
      name,
      brand,
      productLine,
    });
  }

  // unitExceptionReport
  async getPlantsForUnitExceptionReport({
    customerPK,
    selectedSearchCriteria = "Beginning",
    searchTerms,
    pageNumber = 0,
    sortValue = "",
    sortFlag,
    type = "AutoComplete",
    pageSize = 15,
    firstField = null,
    secondField = null,
    thirdField = null,
    name,
    brand,
    productLine,
  }) {
    try {
      const res = await axios.post(UnitExceptionReport_Base_URL + "plantLookup", {
        customerPK,
        searchCriteria: selectedSearchCriteria,
        searchTerm: searchTerms,
        pageNumber,
        sortValue,
        sortType: sortFlag,
        type,
        pageSize,
        firstField,
        secondField,
        thirdField,
        name,
        brand,
        productLine,
      });
      return res;
    } catch (error) {
      console.error("Error", error);
    }
  }

  getPlantReleaseFlag() {
    return axios.post(TripListingByCustomerReport_Base_URL + "plantReleaseFlag", {});
  }

  /**
   * Used to get Transportation dropdown values
   */
  getEmailShuttleDelays() {
    return axios.get(CustomerPlants_Base_URL + "/getemailshuttledelays");
  }

  checksaveuniqness;

  checksaveuniqness(name, code, customerId, pk, incompletePlantPK) {
    return axios.post(CustomerPlants_Base_URL + "/checksaveuniqness", {
      name: name,
      sisterPlantCode: code,
      customerPlantPK: pk,
      incompleteCustomerPlantPK: incompletePlantPK,
      customerFK: customerId,
    });
  }
  async getPlantsForReturn({
    customerPK,
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
    brand,
    productline,
    companyName,
    unitFK,
  }) {
    try {
      const res = await axios.post(CustomerPlants_Base_URL + "/getPlantsForReturn", {
        customerFK: customerPK,
        type,
        pageNumber,
        pageSize,
        searchCriteria,
        searchTerm: searchTerms,
        firstField: FirstField,
        secondField,
        thirdField,
        name,
        brand,
        productline,
        sortValue,
        sortType,
        companyName,
        unitFK,
      });
      return res;
    } catch (error) {
      console.error("Error in getAllUsersForTripListing:", error);
    }
  }
}
export default new CustomerPlantMaintenanceService();
