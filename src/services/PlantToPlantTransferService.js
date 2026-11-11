import { axios } from "../config/axiosInterceptors";
import {
  PlantToPlantTransfer_Base_URL,
  StandardMaintenance_RecordsPerPage,
} from "./constants/applicationConstants";

export class YardToYardShuttleService {
  fetchPlantToPlantTransfers(
    pageNumber,
    advancedSearchObject,
    searchCriteria,
    searchTerm,
    sortFieldName,
    sortValue
  ) {
    return axios.post(PlantToPlantTransfer_Base_URL + "/getallplanttoplanttransfer", {
      pageNumber,
      size: 16,
      customerName: advancedSearchObject !== null ? advancedSearchObject.firstField : null,
      plant1Name: advancedSearchObject !== null ? advancedSearchObject.secondField : null,
      plant2Name: advancedSearchObject !== null ? advancedSearchObject.thirdField : null,
      searchCriteria,
      searchTerm,
      sortFieldName,
      sortValue,
    });
  }

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
    return axios.post(PlantToPlantTransfer_Base_URL + "/getCustomers", {
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

  getPlantToPlantTransferById(id) {
    return axios.get(PlantToPlantTransfer_Base_URL + "/planttoplanttransfersbyid/" + id);
  }

  getCustomerName(customerId) {
    return axios.get(PlantToPlantTransfer_Base_URL + "/getcustomername/" + customerId);
  }

  fetchCustomerPlantDetails(
    customerId,
    searchTerm,
    active,
    type,
    size,
    page,
    isPlantToPlantTransfer,
    searchCriteria,
    advanceSortingOrder
  ) {
    return axios.post(PlantToPlantTransfer_Base_URL + "/fetchcustomerplantdetails", {
      active,
      customerFK: customerId,
      searchTerms: searchTerm,
      type,
      size,
      pageNumber: page,
      isPlantToPlantTransfer,
      searchCriteria,
      advanceSortingOrder,
    });
  }

  checkExistingPlantCombination(plantOneId, plantTwoId, customerIdRedux) {
    return axios.post(PlantToPlantTransfer_Base_URL + "/existingplanttoplantcombination", {
      customerPlant1IntFK: plantOneId,
      customerPlant2IntFK: plantTwoId,
      customerIntFK: customerIdRedux,
    });
  }

  savePlantToPlantTransfer(saveData) {
    return axios.post(PlantToPlantTransfer_Base_URL + "/saveplanttoplanttransfer", saveData);
  }

  deletePlantToPlantTransfer(id) {
    return axios.delete(PlantToPlantTransfer_Base_URL + "/deleteplanttoplanttransfer/" + id);
  }
}

// eslint-disable-next-line
export default new YardToYardShuttleService();
