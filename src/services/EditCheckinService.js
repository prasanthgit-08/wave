import { axios } from "../config/axiosInterceptors";
import { EditCheckin_Base_URL, HalfScreen_RecordsPerPage } from "./constants/applicationConstants";

class EditCheckinService {
  getEditCheckinRecords(pageNumber, sortValue, sortFlag, driverId, unitNumber, flag = "Lookup") {
    return axios.post(EditCheckin_Base_URL + "/checkinSelection", {
      pageNumber: pageNumber,
      pageSize: flag === "Lookup" ? HalfScreen_RecordsPerPage : 50,
      sortType: sortFlag,
      sortValue: sortValue,
      driverId: driverId,
      unitNumber: unitNumber,
      flag: flag,
    });
  }

  getRecord(checkinId) {
    return axios.post(EditCheckin_Base_URL + "/checkinRecord", {
      driverCheckInPK: checkinId,
    });
  }

  saveCheckinRecords(formData) {
    return axios.post(EditCheckin_Base_URL + "/save", {
      city: formData.city,
      stateCode: formData.stateCode,
      driverCheckInPK: formData.driverCheckInPK,
      type: "save",
    });
  }

  deleteCheckinRecord(formData) {
    return axios.post(EditCheckin_Base_URL + "/save", {
      city: "",
      stateCode: "",
      driverCheckInPK: formData.driverCheckInPK,
      type: "delete",
    });
  }

  undeliverCheckinRecord(formData) {
    return axios.post(EditCheckin_Base_URL + "/save", {
      city: formData.city,
      stateCode: formData.stateCode,
      driverCheckInPK: formData.driverCheckInPK,
      type: "undeliver",
    });
  }

  undeliverClearpickup(formData) {
    return axios.post(EditCheckin_Base_URL + "/clearPickup", {
      city: formData.city,
      stateCode: formData.stateCode,
      driverCheckInPK: formData.driverCheckInPK,
      type: "undeliver",
    });
  }

  unDeliverRecordProcess(id) {
    return axios.post(EditCheckin_Base_URL + "/undeliver", {
      driverCheckInPK: id,
    });
  }
}
export default new EditCheckinService();
