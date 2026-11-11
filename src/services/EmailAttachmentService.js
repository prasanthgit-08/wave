import { axios } from "../config/axiosInterceptors";
import { EmailAttachment_Base_URL, QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";

class EmailAttachmentService {
  getAll(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag, emailFormatFK) {
    return axios.post(EmailAttachment_Base_URL + "/allFormData", {
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      sortValue: sortValue,
      sortType: sortFlag,
      emailFormatFK: emailFormatFK,
    });
  }

  getEmailAttachmentById(id) {
    return axios.get(EmailAttachment_Base_URL + "/getEmailAttachmentById/" + id);
  }

  saveOrEditEmailAttachment(data) {
    return axios.post(EmailAttachment_Base_URL + "/saveEmailAttachment", data);
  }

  deleteEmailAttachment(id) {
    return axios.delete(EmailAttachment_Base_URL + "/deleteEmailAttachment/" + id);
  }

  checkUniqueFormDescription(emailFormatFK, description, type, id) {
    return axios.post(EmailAttachment_Base_URL + "/uniqueDescription", {
      emailFormatFK: emailFormatFK,
      formDescription: description,
      documentForm: type,
      id: id,
    });
  }
}
export default new EmailAttachmentService();
