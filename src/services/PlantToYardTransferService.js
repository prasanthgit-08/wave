import { axios } from "../config/axiosInterceptors";
import { PlantToYardTransfer_Base_URL, FullScreen_RecordsPerPage } from "./constants/applicationConstants";

class PlantToYardTransferService {
  fetchAllPlantToYardTransfers(
    pageNumber,
    searchTerm,
    searchCriteria,
    advanceSearchTermCustomer,
    advanceSearchTermPlant,
    advanceSearchTermYard,
    sortFlag,
    sortValue
  ) {
    return axios.post(PlantToYardTransfer_Base_URL + "/fetchAllPlantToYards", {
      pageNumber,
      size: 16,
      searchTerm,
      searchCriteria,
      advanceSearchTermCustomer:
        advanceSearchTermCustomer !== null ? advanceSearchTermCustomer.firstField : null,
      advanceSearchTermPlant:
        advanceSearchTermCustomer !== null ? advanceSearchTermCustomer.secondField : null,
      advanceSearchTermYard: advanceSearchTermCustomer !== null ? advanceSearchTermCustomer.thirdField : null,
      sortFlag,
      sortValue,
    });
  }

  //for customer browse page
  getCustomers(
    customerType,
    customerPageNumber,
    customerSearchTerm,
    customerSearchCriteria,
    customerAdvancedSearchObject,
    customerSortValue,
    customerSortFieldName,
    customerAdvancedSortOrder,
    selectedCustomerStatus,
    usePlants
  ) {
    let active, customers;
    customerType === "All" ? (active = null) : customerType === "Active" ? (active = true) : (active = false);

    customerAdvancedSearchObject !== null &&
      (customers = {
        description: customerAdvancedSearchObject.firstField || "",
        name: customerAdvancedSearchObject.secondField || "",
        dba: customerAdvancedSearchObject.thirdField || "",
        city: customerAdvancedSearchObject.fourthField || "",
        stateCode: customerAdvancedSearchObject.fifthField || "",
      });
    return axios.post(PlantToYardTransfer_Base_URL + "/getCustomers", {
      active,
      number: customerPageNumber,
      size: 16,
      searchTerms: customerSearchTerm,
      searchCriteria: customerSearchCriteria,
      customers,
      sortType: customerSortValue,
      sortValue: customerSortFieldName === "" ? null : customerSortFieldName,
      advanceSortingOrder: customerAdvancedSortOrder,
      selectedCustomerStatus: selectedCustomerStatus,
      usePlants,
    });
  }

  fetchPlantToYardTransfersById(id) {
    return axios.get(PlantToYardTransfer_Base_URL + "/fetchPlantToYardDetailsById/" + id);
  }

  saveOrUpdatePlantToYardTransfers(saveData) {
    return axios.post(PlantToYardTransfer_Base_URL + "/savePlantToYardTransfers", saveData);
  }

  deletePlantToYardTransfers(plantToYardTransferPK) {
    return axios.delete(PlantToYardTransfer_Base_URL + "/deletePlantToYard/" + plantToYardTransferPK, {
      id: plantToYardTransferPK,
    });
  }

  getShuttleYardByName(searchTerm, pageNumber, active, size, searchCriteria) {
    return axios.post(PlantToYardTransfer_Base_URL + "/getYardsDetails", {
      active,
      pageNumber,
      size,
      searchCriteria,
      searchTerm,
    });
  }

  //for getting plant details according to the selected customerfk
  fetchCustomerPlantDetails(
    customerFK,
    plantToYardTransferPlantName,
    active,
    type,
    size,
    page,
    isPlantToYardTransfer,
    searchCriteria,
    advanceSortingOrder
  ) {
    return axios.post(PlantToYardTransfer_Base_URL + "/fetchcustomerplantdetails", {
      active: true,
      customerFK: customerFK,
      searchTerms: plantToYardTransferPlantName,
      type: "AutoComplete",
      size: 100,
      pageNumber: page,
      isPlantToYardTransfer,
      searchCriteria: "Beginning",
      advanceSortingOrder,
    });
  }

  getCustomerName(customerFK) {
    return axios.get(PlantToYardTransfer_Base_URL + "/getcustomername/" + customerFK);
  }
  plantAndYardExists(customerPlantFK, yardFK, plantToYardTransferPK, customerFK) {
    return axios.post(PlantToYardTransfer_Base_URL + "/plantAndYardExists", {
      customerPlantfk: customerPlantFK,
      yardfk: yardFK,
      plantToYardTransferPK: plantToYardTransferPK,
      customerfk: customerFK,
    });
  }
}

export default new PlantToYardTransferService();
