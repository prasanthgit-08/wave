import { axios } from "../config/axiosInterceptors";
import { QuarterScreen_RecordsPerPage, Holiday_Base_URL } from "../services/constants/applicationConstants";
class HolidayService {
  getHolidayData(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag) {
    return axios.post(Holiday_Base_URL + "/fetchholidays", {
      searchCriteria,
      searchTerm,
      number: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getHolidayById(id) {
    return axios.get(Holiday_Base_URL + "/getHoliday/" + id);
  }
  createOrUpdateRecord(formData) {
    return axios.post(Holiday_Base_URL + "/saveHoliday", formData);
  }

  checkDateExist(date, id) {
    return axios.post(Holiday_Base_URL + "/dateexists", {
      date: date,
      holidayPK: id,
    });
  }

  deleteRecord(id) {
    return axios.delete(Holiday_Base_URL + "/deletebyid/" + id);
  }
}
export default new HolidayService();
