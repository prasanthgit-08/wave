import { axios } from "../config/axiosInterceptors";
import { DealerContacts_Base_URL, QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";

class DealerContactServices {
  getAllDealerContacts(dealerId, SearchCriteria, searchTerm, pageNumber, sortValue, sortType) {
    return axios.post(DealerContacts_Base_URL + "/fetchdealercontact", {
      dealerId: dealerId,
      searchCriteria: SearchCriteria,
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue,
      sortType,
    });
  }
  saveDealerContacts(
    dealerId,
    contact,
    name,
    position,
    phone,
    fax,
    email,
    birthday,
    callback,
    lastcall,
    notes,
    dealerContactPK
  ) {
    return axios.post(DealerContacts_Base_URL + "/createdealercontact", {
      dealerId: dealerId,
      contact: contact,
      name: name,
      position: position,
      phone,
      fax,
      email,
      birthday,
      callback,
      lastcall,
      notes,
      dealerContactPK,
    });
  }
  getDealerContacts(id) {
    return axios.get(DealerContacts_Base_URL + "/getdealercontactsdatabyid/" + id);
  }

  checkContactExist(id, pk, contact) {
    return axios.post(DealerContacts_Base_URL + "/checkcontactexist", {
      dealerId: id,
      dealerContactPK: pk,
      contact: contact,
    });
  }
  deleteDealerContact(dcfk) {
    return axios.delete(DealerContacts_Base_URL + "/deletedealercontacts/" + dcfk);
  }
}

export default new DealerContactServices();
