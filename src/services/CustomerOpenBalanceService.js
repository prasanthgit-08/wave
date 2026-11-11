import { axios } from "../config/axiosInterceptors";
import { COB_Base_URL, QuarterScreen_RecordsPerPage } from "../services/constants/applicationConstants";

class CustomerOpenBalanceService {
  getAllCustomerOpenBalance(
    active,
    selectedSearchCriteria,
    globalSearchTerm,
    customerOpenBalance,
    customerFK,
    pageNumber,
    sortValue,
    sortFlag
  ) {
    let customerOpenBalanceStatus = null;
    if (active === "Active") {
      customerOpenBalanceStatus = 1;
    } else if (active === "Inactive") {
      customerOpenBalanceStatus = 0;
    }
    return axios.post(COB_Base_URL + "/fetchcustomeropenbalances", {
      active: customerOpenBalanceStatus,
      searchCriteria: selectedSearchCriteria,
      searchTerm: globalSearchTerm,
      customerOpenBalance: customerOpenBalance,
      customerId: customerFK,
      number: pageNumber,
      size: 11,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getCustomerOpenBalanceById(customerOpenBalanceById) {
    return axios.get(COB_Base_URL + "/getcustomeropenbalance/" + customerOpenBalanceById);
  }

  createCustomerOpenBalances(customeropenBalances) {
    return axios.post(COB_Base_URL + "/createcustomeropenbalances", customeropenBalances);
  }

  deleteRecord(id) {
    return axios.delete(COB_Base_URL + "/deletecustomeropenbalance/" + id);
  }

  activateDeactivate(cobData) {
    return axios.put(COB_Base_URL + "/activatedeactivatecustomeropenbalance", cobData);
  }

  checkDescription(description, id, customerfk) {
    return axios.post(COB_Base_URL + "/checkdescriptionexist", {
      description: description,
      customerOpenBalancePK: id,
      customerId: customerfk,
    });
  }
}

export default new CustomerOpenBalanceService();
