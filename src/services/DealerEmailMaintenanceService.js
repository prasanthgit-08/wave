import { axios } from "../config/axiosInterceptors";
import { QuarterScreen_RecordsPerPage } from "../services/constants/applicationConstants";
import { DealerEmail_Base_URL } from "../services/constants/applicationConstants";
class DealerEmailMaintenanceService {
  getAllDealerEmails(selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, id) {
    return axios.post(DealerEmail_Base_URL + "/alldealeremails", {
      searchCriteria: selectedSearchCriteria,
      searchTerm,
      pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
      dealerFK: id,
    });
  }
  getDealerEmailById(Id) {
    return axios.get(DealerEmail_Base_URL + "/getdealeremailbyid/" + Id);
  }
  createDealerEmail(saveData) {
    return axios.post(DealerEmail_Base_URL + "/saveDealerEmail", saveData);
  }
  deleteDealerEmail(id) {
    return axios.delete(DealerEmail_Base_URL + "/delete/" + id);
  }
  checkNameExist(id, dealerEmailsPK, name) {
    return axios.post(DealerEmail_Base_URL + "/nameexists", {
      dealerFK: id,
      name,
      dealerEmailsPK: dealerEmailsPK,
    });
  }

  checkEmailExist(id, dealerEmailsPK, email) {
    return axios.post(DealerEmail_Base_URL + "/emailexists", {
      dealerFK: id,
      email,
      dealerEmailsPK: dealerEmailsPK,
    });
  }
}
export default new DealerEmailMaintenanceService();
