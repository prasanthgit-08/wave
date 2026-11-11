import { axios } from "../config/axiosInterceptors";
import { QuarterScreen_RecordsPerPage, Yard_Email_Base_URL } from "./constants/applicationConstants";

class YardEmailService {
  getYardEmailData(searchTerm, searchCriteria, pageNo, yardFK, sortValue, sortFlag) {
    return axios.post(Yard_Email_Base_URL + "/fetchyardemails", {
      number: pageNo,
      size: QuarterScreen_RecordsPerPage,
      searchTerm,
      searchCriteria,
      yardFK: yardFK,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }
  getRecord(yardEmailPK) {
    return axios.get(Yard_Email_Base_URL + "/getyardemail/" + yardEmailPK);
  }
  createOrUpdateRecord(formData) {
    return axios.post(Yard_Email_Base_URL + "/saveyardemail", formData);
  }

  deleteRecord(id) {
    return axios.delete(Yard_Email_Base_URL + "/deletebyid/" + id);
  }
  checkNameExist(yardFK, yardEmailPK, name) {
    return axios.post(Yard_Email_Base_URL + "/nameexists", {
      yardFK,
      yardEmailPK,
      name,
    });
  }

  checkEmailExist(yardFK, yardEmailPK, email) {
    return axios.post(Yard_Email_Base_URL + "/emailexists", {
      yardFK,
      yardEmailPK,
      email,
    });
  }
}

export default new YardEmailService();
