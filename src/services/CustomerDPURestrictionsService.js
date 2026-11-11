import { axios } from "../config/axiosInterceptors";
import {
  CustomerDPU_Base_URL,
  CustomerPlants_Base_URL,
  Customer_Base_URL,
  Customers_Base_URL,
  OrderEntry_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class CustomerDPURestrictionsService {
  getTableData(customerId, searchTerm, searchCriteria, pageNumber, sortValue, sortFlag) {
    return axios.post(CustomerDPU_Base_URL + "/data", {
      number: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      customerId,
      searchTerm,
      searchCriteria,
      sortType: sortFlag,
      sortValue: sortValue,
    });
  }

  getRecord(selectedDPUId) {
    return axios.get(CustomerDPU_Base_URL + "/record/" + selectedDPUId);
  }
  createOrUpdateRecord(formData) {
    return axios.post(CustomerDPU_Base_URL + "/savedpurestrictiondetails", formData);
  }

  deleteRecord(id) {
    return axios.delete(CustomerDPU_Base_URL + "/delete/" + id);
  }

  getCustomersByUsePlants(searchTerm) {
    return axios.post(CustomerDPU_Base_URL + "/getcustomernamebyuseplants", {
      pageNumber: 0,
      size: 100,
      searchTerm: searchTerm,
      searchCriteria: "Beginning",
    });
  }

  getCustomersByUsePlantsLookup(
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
      size: 15,
      customers: customers,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedCustomerStatus: selectedCustomerStatus,
    });
  }
  fetchCustomerPlantDetails(
    selectedCustomerPlantStatus,
    active,
    selectedSearchCriteria,
    plant,
    pageNumber,
    searchTerm,
    sortValue,
    sortFlag
  ) {
    return axios.post(CustomerPlants_Base_URL + "/getallplantsbycustomerlookup", {
      selectedCustomerPlantStatus: selectedCustomerPlantStatus,
      active: 1,
      searchCriteria: selectedSearchCriteria,
      customerPlants: plant,
      number: pageNumber,
      size: 15,
      searchTerms: searchTerm,
      sortValue,
      sortType: sortFlag,
    });
  }

  checkPickupCustomer(customerId, pickupCustomerFK, selectedDPUId, isEdit) {
    return axios.get(
      `${CustomerDPU_Base_URL}/checkpickupcustomer/${customerId}/${pickupCustomerFK}/${selectedDPUId}/${isEdit}`
    );
  }

  checkPickupPlant(customerId, pickupCustomerPlantFK, selectedDPUId, isEdit) {
    return axios.get(
      `${CustomerDPU_Base_URL}/checkpickupcustomerplant/${customerId}/${pickupCustomerPlantFK}/${selectedDPUId}/${isEdit}`
    );
  }

  getCustomerName(name) {
    return axios.post(CustomerDPU_Base_URL + "/getcustomernamebyuseplants", {
      name: name,
    });
  }
}
export default new CustomerDPURestrictionsService();
