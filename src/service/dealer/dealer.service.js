import { axios } from "../../config/axiosInterceptors";
import { Dealer_Base_URL } from "../../constants/backendUrl.constant";

class DealerServices {
  async getCityStateCode({ city, stateCode, postalCode }) {
    try {
      const res = await axios.post(`${Dealer_Base_URL}/getcitystatecodebypostalcode`, {
        city,
        stateCode,
        postalCode,
      });
      return res;
    } catch (error) {
      console.error("cityStateCode error", error);
      throw error;
    }
  }

  async fetchDealers({
    active = 1,
    pageNumber = 0,
    size = 100,
    searchCriteria = "Beginning",
    advanceSortingOrder,
    searchTerms,
    dealer,
    isOEPP,
    selectedDealerStatus = "Complete",
    dealerSearchType,
    includePostalCodePK,
    sortType,
    sortValue,
  }) {
    try {
      const res = await axios.post(Dealer_Base_URL + "/fetchdealers", {
        active,
        number: pageNumber,
        size,
        searchCriteria,
        advanceSortingOrder,
        dealer,
        searchTerms,
        selectedDealerStatus,
        includePostalCodePK,
        sortType,
        sortValue,
        isOEPP: dealerSearchType || isOEPP,
      });
      return res;
    } catch (error) {
      console.error("fetch Dealer error", error);
      throw error;
    }
  }

  /////////// End ///////////////
}

export default new DealerServices();
