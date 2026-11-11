/* eslint-disable import/no-anonymous-default-export */
import { axios } from "../config/axiosInterceptors";
import { ThankYouCards_Base_URL, QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";

class ThankYouCardsService {
  getAll(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag) {
    return axios.post(`${ThankYouCards_Base_URL}/getAll`, {
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      sortValue: sortValue,
      sortFlag: sortFlag,
    });
  }

  getThankYouCard(id) {
    return axios.get(`${ThankYouCards_Base_URL}/${id}`);
  }

  saveThankYouCard(formData) {
    return axios.post(`${ThankYouCards_Base_URL}/save`, formData);
  }

  deleteThankYouCard(id) {
    return axios.delete(`${ThankYouCards_Base_URL}/delete/${id}`);
  }
}

export default new ThankYouCardsService();
