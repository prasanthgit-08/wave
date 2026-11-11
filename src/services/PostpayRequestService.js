import { axios } from "../config/axiosInterceptors";
import {
  PostpayRequest_Base_URL,
  HalfScreen_RecordsPerPage,
  Email_Processor_URL,
} from "./constants/applicationConstants";

class PostpayRequestService {
  getDriverPayRequests(pageNumber, sortValue, sortType, searchCriteria, searchTerms) {
    return axios.post(PostpayRequest_Base_URL + "/selection", {
      pageNumber: pageNumber,
      pageSize: 17,
      sortValue: sortValue,
      sortType: sortType,
      searchCriteria: searchCriteria,
      searchTerms: searchTerms || "",
    });
  }

  getDriverPayRequestDetails(driverPayRequestsPK) {
    return axios
      .post(PostpayRequest_Base_URL + "/details", {
        driverPayRequestsPK: driverPayRequestsPK,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching driver pay request details:", error);
        throw error;
      });
  }

  savePostDriverPayRequest(data) {
    return axios
      .post(PostpayRequest_Base_URL + "/save", {
        denied: data.denied,
        deniedReason: data.deniedReason || "",
        paid: data.paid,
        driverPayRequestsPK: data.driverPayRequestsPK,
        otherAmountDPM: data.otherAmountDPM,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error saving post driver pay request:", error);
        throw error;
      });
  }

  postDriverPayRequestInvoice(driverPayRequestsPK) {
    return axios
      .post(PostpayRequest_Base_URL + "/invoice", {
        driverPayRequestsPK: driverPayRequestsPK,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error posting driver pay request invoice:", error);
      });
  }

  emailInvoiceGenerated(invoicePK, emailObjectKey, userPK) {
    return axios.post(Email_Processor_URL + "/compose", {
      primaryKey: invoicePK,
      primaryKeyName: "InvoicePK",
      entityName: "Invoices",
      isEmail: true,
      isPrint: false,
      emailObjectKeyList: emailObjectKey,
      documentType: "INVOICE",
      userPK: userPK,
      printerName: "",
    });
  }
}

export default new PostpayRequestService();
