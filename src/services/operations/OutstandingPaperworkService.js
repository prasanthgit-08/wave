import { axios } from "../../config/axiosInterceptors";
import { OutstandingPaperwork_Base_URL } from "../constants/applicationConstants";

class OutstandingPaperworkService {
  getOutstandingPaperworkSettings(value, lookupButton, assignedDispatcher, dispatchedBy, companyPK) {
    return axios.post(OutstandingPaperwork_Base_URL + "/settings", {
      searchTerm: value || "",
      lookupButton: lookupButton,
      assignedDispatcher: assignedDispatcher,
      dispatchedBy: dispatchedBy,
      companyPK: companyPK,
    });
  }

  getOutstandingPaperworkBrowse(
    deliveryDateFrom,
    deliveryDateTo,
    assignedDispatcher,
    dispatchedBy,
    dispatcherPK,
    customerPK,
    unitNumberPK,
    unitNumberLast5,
    onlyUnitsWithNotes,
    unitsEnteredByPK,
    motorized,
    towable,
    flatbed,
    pageNumber,
    pageSize,
    sortValue,
    sortType,
    emailOrPdf,
    includeNotes,
    companyPK
  ) {
    return axios.post(OutstandingPaperwork_Base_URL + "/browse", {
      unitNumberPK: unitNumberPK,
      unitNumberLast5: unitNumberLast5,
      assignedDispatcher: assignedDispatcher,
      dispatcher: dispatcherPK,
      deliveryDateFrom: deliveryDateFrom,
      deliveryDateTo: deliveryDateTo,
      customerPK: customerPK,
      unitsEnteredByPK: unitsEnteredByPK,
      onlyUnitsWithNotes: onlyUnitsWithNotes,
      motorized: motorized,
      towable: towable,
      dispatchedBy: dispatchedBy,
      flatbed: flatbed,
      pageNumber: Number(pageNumber),
      pageSize: 19,
      sortValue: sortValue,
      sortType: sortType,
      excel: emailOrPdf === "excel" ? true : false,
      pdf: emailOrPdf === "pdf" ? true : false,
      email: emailOrPdf === "excel" || emailOrPdf === "pdf" ? true : false,
      print: emailOrPdf === "print" ? true : false,
      includeNotes: includeNotes,
      companyPK: companyPK,
    });
  }

  saveOutstandingPaperworkNotes(dispatchPK, outstandingPaperworkNotes) {
    return axios.post(OutstandingPaperwork_Base_URL + "/saveComments", {
      dispatchPK: dispatchPK,
      latePaperworkNotes: outstandingPaperworkNotes,
    });
  }

  getOutstandingPaperworkEmailDetails(dispatchPK) {
    return axios.post(OutstandingPaperwork_Base_URL + "/emailDetails", {
      dispatchPK: dispatchPK,
    });
  }

  sendOutstandingPaperworkEmail(updatedEmailObject) {
    return axios.post(OutstandingPaperwork_Base_URL + "/sendEmail", updatedEmailObject);
  }
}

export default new OutstandingPaperworkService();
