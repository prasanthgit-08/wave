/* eslint-disable import/no-anonymous-default-export */
import { axios } from "../config/axiosInterceptors";
import {
  EmailFormats_Base_URL,
  QuarterScreen_RecordsPerPage,
  Email_Processor_URL,
} from "../services/constants/applicationConstants";

class EmailFormatService {
  /*** List All Email Formats ***/
  listAllEmailFormats(searchTerms, searchCriteria, pageNumber, sortValue, sortFlag) {
    return axios.post(EmailFormats_Base_URL + "/listAllEmailFormats", {
      searchTerms,
      searchCriteria,
      pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  /*** Validate all tabls  ***/
  validateEmailFormats(data) {
    return axios.post(EmailFormats_Base_URL + "/validateEmailFormats", data);
  }

  /*** Get Email Format By ID ***/
  fetchEmailFormatsById(id) {
    return axios.get(EmailFormats_Base_URL + "/fetchEmailFormatsById/" + id);
  }

  /*** Save Email Format ***/
  saveEmailFormats(data) {
    return axios.post(EmailFormats_Base_URL + "/saveEmailFormats", data);
  }

  /*** Delete Email Format By ID ***/
  deleteEmailFormat(id) {
    return axios.delete(EmailFormats_Base_URL + "/deleteEmailFormat/" + id);
  }

  /*** Unique Description Check ***/
  uniqueDescriptionCheck(id, string) {
    return axios.post(EmailFormats_Base_URL + "/uniqueDescriptionCheck", {
      emailFormatPK: id,
      description: string,
    });
  }

  /*** Unique Object Key Check ***/
  uniqueObjectKeyCheck(id, string) {
    return axios.post(EmailFormats_Base_URL + "/uniqueObjectKeyCheck", {
      emailFormatPK: id,
      objectKey: string,
    });
  }
  /*** TableName exists or not Check ***/
  tableNameExistsCheck(string) {
    return axios.post(EmailFormats_Base_URL + "/tableNameExistsCheck", {
      databaseTable: string,
    });
  }

  /*** Email Generate ***/
  emailGeneration(EmailRequestVO) {
    return axios.post(Email_Processor_URL + "/compose", EmailRequestVO);
  }
}
export default new EmailFormatService();
