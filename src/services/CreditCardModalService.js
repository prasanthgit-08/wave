import { axios } from "../config/axiosInterceptors";
import {
  CreditCard_Base_URL,
  CreditCard_Base_URL_Crossdb,
  CreditCard_Operations_URL,
  CrossDB_URL,
  Edit_Master_Express_Base_URL,
  Transaction_Base_URL,
} from "./constants/applicationConstants";

class CreditCardModalService {
  // Fetch the list of credit cards for the given customer
  getCreditCardList(customerId) {
    return axios.get(CreditCard_Base_URL + "/fetchCustomerCreditCardDetails/" + customerId);
  }

  handleTransaction(cardVerificationDetails, authOnly) {
    return axios.post(CreditCard_Operations_URL + "/handleTransaction", {
      authorizeVOs: cardVerificationDetails,
      authOnly: authOnly,
    });
  }

  isCreditCardNumberValid(cardNumber) {
    return axios.post(CreditCard_Base_URL + "/isValidCreditCard", {
      creditCardNumber: cardNumber,
    });
  }

  isZipCodeExisting(cardBillingZipcode) {
    return axios.post(CreditCard_Base_URL + "/isZipCodeExisting", {
      creditCardPostalCode: cardBillingZipcode,
    });
  }

  fetchPreExistingCards(unitPK) {
    return axios.get(CreditCard_Base_URL + "/preExistingCards/" + unitPK);
  }

  verifyCardDetails(cardVerificationDetails) {
    return axios.post(Transaction_Base_URL + "/verify", cardVerificationDetails);
  }

  checkCardBalance(cardInformation) {
    return axios.post(Transaction_Base_URL + "/balance", cardInformation);
  }

  fetchFirstOrderEntryCreditCard(unitFK, company) {
    return axios.post(CrossDB_URL + "creditCard/" + "firstOrderEntryCreditCard", {
      unitFK: unitFK,
      company: company,
    });
  }

  fetchValidCardForRefund(unitFK, refundAmount) {
    return axios.post(CreditCard_Base_URL + "/fetchChargedCreditCard", {
      unitFK: unitFK,
      refundAmount: refundAmount,
    });
  }

  fetchFirstMonetraRecord(unitFK) {
    return axios.get(CreditCard_Base_URL + "/fetchFirstCardDetails/" + unitFK);
  }

  fetchValidCardForRefundCrossdb(unitFK, refundAmount, companyPK) {
    return axios.post(CreditCard_Base_URL_Crossdb + "/fetchChargedCreditCard", {
      unitFK: unitFK,
      refundAmount: refundAmount,
      companyPK: companyPK,
    });
  }

  fetchFirstMonetraRecordCrossdb(unitFK, companyPK) {
    return axios.post(CreditCard_Base_URL_Crossdb + "/fetchFirstCardDetails/", {
      unitFK: unitFK,
      companyPK: companyPK,
    });
  }
  verifyCardDetails(cardVerificationDetails) {
    return axios.post(CreditCard_Base_URL + "/verifyCard", cardVerificationDetails);
  }
}

export default new CreditCardModalService();
