import { axios } from "../config/axiosInterceptors";
import { Driver_Base_URL, PayDebitcardInvoice_Base_URL } from "./constants/applicationConstants";

class PayDebitcardInvoiceService {
  /**
   * Debitcard  Autocomplete
   */
  getAllDebitCardData(searchTerm) {
    return axios.post(Driver_Base_URL + "/getalldebitcards", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      autoComplete: true,
    });
  }

  processDebitCardInvoice(payDebitcardInvoiceVO) {
    return axios.post(PayDebitcardInvoice_Base_URL + "/processpaydebitcard", payDebitcardInvoiceVO);
  }
}

export default new PayDebitcardInvoiceService();
