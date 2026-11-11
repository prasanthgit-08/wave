import { axios } from "../../config/axiosInterceptors";
import { setCompanyId } from "../../redux/RerouteSlice";
import { DriverCheckin_Base_URL, MissingPaperwork_Base_URL } from "../constants/applicationConstants";

class MissingPaperworkService {
  getMissingPaperworkSettings(value, lookupButton, assignedDispatcher, dispatchedBy, companyPK) {
    return axios.post(MissingPaperwork_Base_URL + "/settings", {
      searchTerm: value || "",
      lookupButton: lookupButton,
      assignedDispatcher: assignedDispatcher,
      dispatchedBy: dispatchedBy,
      companyPK: companyPK,
    });
  }

  getMissingPaperworkBrowse(
    deliveryDateFrom,
    deliveryDateTo,
    assignedDispatcher,
    dispatchedBy,
    dispatcherPK,
    customerPK,
    unitNumberPK,
    unitNumberLast5,
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
    return axios.post(MissingPaperwork_Base_URL + "/browse", {
      unitNumberPK: unitNumberPK,
      unitNumberLast5: unitNumberLast5,
      assignedDispatcher: assignedDispatcher,
      dispatcher: dispatcherPK,
      deliveryDateFrom: deliveryDateFrom,
      deliveryDateTo: deliveryDateTo,
      customerPK: customerPK,
      unitsEnteredByPK: unitsEnteredByPK,
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
      print: emailOrPdf === "print" ? true : false,
      email: emailOrPdf === "excel" || emailOrPdf === "pdf" ? true : false,
      includeNotes: includeNotes,
      companyPK: companyPK,
    });
  }

  saveMissingPaperworkNotes(dispatchPK, missingPaperworkNotes) {
    return axios.post(MissingPaperwork_Base_URL + "/saveComments", {
      dispatchPK: dispatchPK,
      missingPaperworkNotes: missingPaperworkNotes,
    });
  }

  getMissingPaperworkEmailDetails(dispatchPK) {
    return axios.post(MissingPaperwork_Base_URL + "/emailDetails", {
      dispatchPK: dispatchPK,
    });
  }

  sendMissingPaperworkEmail(updatedEmailObject) {
    return axios.post(MissingPaperwork_Base_URL + "/sendEmail", updatedEmailObject);
  }

  getCurrentCompanyName() {
    return axios.get(DriverCheckin_Base_URL + "/getCurrentCompanyName");
  }
}

export default new MissingPaperworkService();
