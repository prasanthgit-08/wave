import { axios } from "../../config/axiosInterceptors";
import { Available_Driver_List_Base_URL } from "../constants/applicationConstants";

class AvailableDriverListService {
  getAvailableDriverList(formData) {
    return axios.post(Available_Driver_List_Base_URL + "/getAvailableDriverList", {
      divisionStatus: formData.divisionStatus,
      driverOption: formData.driverOption,
      dispatchUserFK: formData.dispatchUserFK,
      dispatchUserName: formData.dispatchUserName,
      type: formData.type,
    });
  }

  sendAvaialbleDriverList(formData) {
    return axios.post(Available_Driver_List_Base_URL + "/sendAvailableDriverList", {
      divisionStatus: formData.divisionStatus,
      driverOption: formData.driverOption,
      dispatchUserFK: formData.dispatchUserFK,
      dispatchUserName: formData.dispatchUserName,
      type: formData.type,
    });
  }

  avaialbleDriverListBrowse(
    divisionStatus,
    driverOption,
    dispatchUserFK,
    pageNumber,
    size,
    sortType,
    sortValue
  ) {
    return axios.post(Available_Driver_List_Base_URL + "/browseDrivers", {
      divisionStatus: divisionStatus,
      driverOption: driverOption,
      dispatchUserFK: dispatchUserFK,
      pageNumber: pageNumber,
      size: size,
      type: "Display",
      sortType: sortType,
      sortValue: sortValue,
    });
  }
  getDriverComments(Id) {
    return axios.get(Available_Driver_List_Base_URL + "/getDriverComment/" + Id);
  }

  saveDriverComment(driverPK, comment, city, stateCode, availableDate, notes) {
    return axios.post(Available_Driver_List_Base_URL + "/saveDriverComment", {
      driverPK,
      comment,
      city,
      stateCode,
      availableDate,
      notes,
    });
  }
}
export default new AvailableDriverListService();
