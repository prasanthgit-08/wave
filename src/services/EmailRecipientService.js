/* eslint-disable import/no-anonymous-default-export */
import { axios } from "../config/axiosInterceptors";
import {
  EmailRecipient_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "../services/constants/applicationConstants";

class EmailRecipientService {
  /*** List All Email Recipients ***/
  listAllEmailRecipients(
    searchTerms,
    searchCriteria,
    pageNumber,
    sortValue,
    sortFlag,
    emailFormatFK,
    databaseTable,
    recordPrimaryKey
  ) {
    return axios.post(EmailRecipient_Base_URL + "/listAllEmailRecipients", {
      searchTerms,
      searchCriteria,
      pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
      emailFormatFK: emailFormatFK,
      databaseTable: databaseTable,
      recordPrimaryKey: recordPrimaryKey,
    });
  }

  /*** Get Email Recipient By ID ***/
  fetchEmailRecipientById(emailRecepientId) {
    return axios.get(EmailRecipient_Base_URL + "/fetchEmailRecipientById/" + emailRecepientId);
  }

  /*** Save Email Recipient ***/
  saveEmailRecipient(data) {
    return axios.post(EmailRecipient_Base_URL + "/saveEmailRecipients", data);
  }

  /*** Delete Email Recipients By ID ***/
  deleteEmailRecipient(emailRecepientId) {
    return axios.delete(EmailRecipient_Base_URL + "/deleteEmailRecipient/" + emailRecepientId);
  }
}
export default new EmailRecipientService();
