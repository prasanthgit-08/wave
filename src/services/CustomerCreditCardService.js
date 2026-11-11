import { axios } from "../config/axiosInterceptors";
import { Credit_Base_URL, QuarterScreen_RecordsPerPage } from "../services/constants/applicationConstants";
class CustomerCreditCardService {
  getAllCustomerCreditCard(selectedSearchCriteria, searchTerm, pageNumber, customerId, sortValue, sortFlag) {
    return axios.post(Credit_Base_URL + "/allcreditcard", {
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber,
      size: QuarterScreen_RecordsPerPage,
      customerId,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getCustomerCreditCardById(Id) {
    return axios.get(Credit_Base_URL + "/getcustomercreditcardbyid/" + Id);
  }

  createCustomerCreditCards(editCustomerCreditCardData) {
    return axios.post(Credit_Base_URL, editCustomerCreditCardData);
  }

  deleteCustomerCreditCard(id) {
    return axios.delete(Credit_Base_URL + "/delete/" + id);
  }

  checkCardNumberExist(customerId, cardNumber, customerCreditCardPK) {
    return axios.post(Credit_Base_URL + "/checknumberexist", {
      customerId,
      creditCardNumber: cardNumber,
      customerCreditCardPK,
    });
  }

  checkPrimary(customerId, customerCreditCardPK) {
    return axios.post(Credit_Base_URL + "/checkprimary", {
      customerId,
      customerCreditCardPK,
    });
  }

  cancelPrimary(checkPrimary) {
    return axios.post(Credit_Base_URL + "/cancelprimary", {
      customerCreditCardPK: checkPrimary,
    });
  }

  checkLuhnValidity(cardNumber) {
    return axios.post(Credit_Base_URL + "/luhnvalidity", {
      creditCardNumber: cardNumber,
    });
  }

  checkZipCode(cardBillingZipcode) {
    return axios.post(Credit_Base_URL + "/zipcodecheck", {
      creditCardPostalCode: cardBillingZipcode,
    });
  }

  listCustomerCreditCardsByCustomerId(Id) {
    return axios.get(Credit_Base_URL + "/listcustomercreditcardsbyid/" + Id);
  }

  /** for credit card tab in order entry */
  isCreditCardNumberValid(cardNumber) {
    return axios.post(Credit_Base_URL + "/isValidCreditCard", {
      creditCardNumber: cardNumber,
    });
  }

  /** for credit card tab in order entry */
  isZipCodeExisting(cardBillingZipcode) {
    return axios.post(Credit_Base_URL + "/isZipCodeExisting", {
      creditCardPostalCode: cardBillingZipcode,
    });
  }
  /* validate zipcode check and zipcode uniqness*/
  validateSave(customerId, cardNumber, customerCreditCardPK, cardBillingZipcode) {
    return axios.post(Credit_Base_URL + "/validatesave", {
      customerId,
      creditCardNumber: cardNumber,
      customerCreditCardPK,
      creditCardPostalCode: cardBillingZipcode,
    });
  }
}
export default new CustomerCreditCardService();
