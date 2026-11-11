import { axios } from "../config/axiosInterceptors";
import {
  CustomerContact_Base_URL,
  QuarterScreen_RecordsPerPage,
  ThreeForthScreen_RecordsPerPage,
} from "../services/constants/applicationConstants";
class CustomerContactService {
  getCustomerContacts(searchTerm, searchCriteria, pageNumber, customerId, sortValue, sortFlag) {
    return axios.post(CustomerContact_Base_URL + "/fetchcontact", {
      searchCriteria,
      searchTerm,
      number: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      customerId,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getCustomerContactsDataById(id) {
    return axios.get(CustomerContact_Base_URL + "/getcustomercontactsdatabyid/" + id);
  }

  createContacts(formData) {
    return axios.post(CustomerContact_Base_URL + "/createcontact", formData);
  }
  deleteContacts(id) {
    return axios.delete(CustomerContact_Base_URL + "/deletecustomercontacts/" + id);
  }
  checkContactExist(contact, customerId, id) {
    return axios.post(CustomerContact_Base_URL + "/checkcontactexist", {
      contact: contact,
      customerId: customerId,
      customercontactpk: id,
    });
  }
}
export default new CustomerContactService();
