import { axios } from "../config/axiosInterceptors";
import { DebitCard_Base_URL, QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";

class DebitCardService {
  getDebitCard(searchTerms, searchCriteria, pageNumber, debitCardId, sortValue, sortFlag) {
    return axios.post(DebitCard_Base_URL + "/getalldebitcards", {
      searchCriteria,
      searchTerms,
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      debitCardId,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }
  getDebitCardById(id) {
    return axios.get(DebitCard_Base_URL + "/getDebitCardById/" + id);
  }

  checkProvider(provider, debitCardPK) {
    return axios.post(DebitCard_Base_URL + "/uniqueProvider", {
      provider: provider,
      debitCardPK: debitCardPK,
    });
  }
  saveOrEditDebitCard(data) {
    return axios.post(DebitCard_Base_URL + "/saveOrUpdateDebitCardData", data);
  }

  activateDebitCard(id) {
    return axios.post(`${DebitCard_Base_URL}/toggleActiveStatus/${id}`, {
      debitCardPK: id,
    });
  }

  deactivateDebitCard(id) {
    return axios.post(`${DebitCard_Base_URL}/toggleActiveStatus/${id}`, {
      debitCardPK: id,
    });
  }

  checkObjectkey(objectKey, debitCardPK) {
    return axios.post(DebitCard_Base_URL + "/uniqueObjectKey", {
      objectKey: objectKey,
      debitCardPK: debitCardPK,
    });
  }
}
export default new DebitCardService();
