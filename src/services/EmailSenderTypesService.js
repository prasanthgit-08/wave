/* eslint-disable import/no-anonymous-default-export */
import { axios } from "../config/axiosInterceptors";
import { EmailSenderTypes_Base_URL, QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";

class EmailSenderTypesService {
  getAll(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag) {
    return axios.post(`${EmailSenderTypes_Base_URL}/getAll`, {
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      sortValue: sortValue,
      sortFlag: sortFlag,
    });
  }

  getEmailSenderType(id) {
    return axios.get(`${EmailSenderTypes_Base_URL}/${id}`);
  }

  checkDuplicateDescription(description, id) {
    return axios.post(`${EmailSenderTypes_Base_URL}/checkDuplicateDescription`, {
      emailSenderTypePK: id,
      description: description,
    });
  }

  saveEmailSenderType(emailSenderTypes) {
    return axios.post(`${EmailSenderTypes_Base_URL}/save`, emailSenderTypes);
  }

  checkDeleteDependency(id) {
    return axios.get(`${EmailSenderTypes_Base_URL}/checkDeleteDependency/${id}`);
  }

  deleteEmailSenderType(id) {
    return axios.delete(`${EmailSenderTypes_Base_URL}/delete/${id}`);
  }
}

export default new EmailSenderTypesService();
