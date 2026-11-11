import { axios } from "../../../config/axiosInterceptors";
import {
  Delay_CheckRequest_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "../../constants/applicationConstants";
class DelayUnitCheckRequestService {
  /*****
   * Delay Unit Check Request Browse Page
   * *****/
  getDelayUnitCheckRequest(searchCriteria, searchTerm, pageNumber, sortValue, sortType, id) {
    return axios.post(Delay_CheckRequest_Base_URL + "/browse", {
      searchCriteria: searchCriteria,
      searchTerms: searchTerm,
      pageNumber: pageNumber,
      sortValue: sortValue,
      sortType: sortType,
      pageSize: QuarterScreen_RecordsPerPage,
      delayedUnitDamagePK: id,
    });
  }

  /*****
   * Get the Delayed Unit
   * Check Request Record
   ******/
  fetchDelayUnitCheckRequestRecord(id) {
    return axios.post(Delay_CheckRequest_Base_URL + "/details", {
      delayedUnitCheckRequestPK: id,
    });
  }

  /*****
   * Check the Uniqueness of
   * Request Record description
   ******/
  checkValidDescription(description, id) {
    return axios.post(Delay_CheckRequest_Base_URL + "/descriptionCheck", {
      description: description,
      delayedUnitCheckRequestPK: id,
    });
  }
  /*****
   *Save or edit the Delay Unit check Request
   ******/
  saveOrEditDelayUnitCheckRequest(delayRequestFormData) {
    return axios.post(Delay_CheckRequest_Base_URL + "/saveEdit", delayRequestFormData);
  }

  /*****
   *Call the Print Request program to print the Request Form
   ******/
  printRequestForm(printRequestFormData) {
    return axios.post(Delay_CheckRequest_Base_URL + "/delayPrintRequest", printRequestFormData);
  }

  /*****
   *Call the Check Print and Generate the Invoice
   ******/
  checkPrintInvoice(checkPrintFormData) {
    return axios.post(Delay_CheckRequest_Base_URL + "/delayCheckPrintInvoice", checkPrintFormData);
  }

  /******Get the  DamageAmount, reserve Amount and Accumulated
   *  Bond from corresponding damage Record***/

  getCheckRequestData(id) {
    return axios.post(Delay_CheckRequest_Base_URL + "/getDamageData", {
      delayedUnitDamageFK: id,
    });
  }
}
export default new DelayUnitCheckRequestService();
