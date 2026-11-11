import { axios } from "../../config/axiosInterceptors";
import { CreditCardEnquiry_Base_URL, DPU_Instructions_Base_URL } from "../constants/applicationConstants";

class CreditCardEnquiryService {
  //   API for Credit card Enquiry browse list
  getCreditCardEnquiryList(value) {
    return axios.post(CreditCardEnquiry_Base_URL + "/details", {
      unitNumber: value.unitNumber,
      unitNumberLast5: value.unitNumberLast5,
      invoiceNumber: value.invoiceNumber,
      creditCardLast4: value.creditCardLast4,
      pageNumber: value.pageNumber,
      pageSize: 4,
      sortValue: "",
      sortType: false,
    });
  }

  //   API to Get Credit card Enquiry by Unit Number
  getCreditCardEnquiryByUnitNumber(value) {
    return axios.post(CreditCardEnquiry_Base_URL + "/view", {
      unitFK: value.unitFK,
      unitNumber: value.unitNumber,
      pageNumber: value.pageNumber,
      pageSize: 11,
      sortValue: "",
      sortType: false,
    });
  }

  //   API to get all Units for Dropdown
  getAllUnitNumbersAuto(searchUnit, unitLast5) {
    return axios.post(DPU_Instructions_Base_URL + "/getAllUnitsDPU", {
      pageNumber: 0,
      pageSize: 100,
      searchCriteria: "Beginning",
      searchTerm: searchUnit,
      unitNumberLast5: unitLast5,
      type: "Autocomplete",
      sortValue: null,
      sortType: false,
    });
  }

  getReports(unitFK, type, miscUnit) {
    return axios.post(CreditCardEnquiry_Base_URL + "/getCreditCardEnquiryReport", {
      unitFK: unitFK || -1,
      miscUnit: miscUnit || "",
      type: type,
    });
  }
}

export default new CreditCardEnquiryService();
