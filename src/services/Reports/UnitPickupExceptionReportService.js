import { axios } from "../../config/axiosInterceptors";
import {
  Unit_Pickup_Exception_Mail_BASE_URL,
  UnitExceptionReport_Base_URL,
} from "../constants/applicationConstants";

class UnitPickupExceptionReportService {
  getUnitDetails({
    division,
    source,
    pickupYardPK,
    dispatcherPK,
    driver,
    customerPK,
    plantPK,
    deliveryStates,
    selectedBy,
    minimumPriority,
    showTodaysDispatches,
    showNotes,
    pageNumber,
    pageSize,
    sortValue,
    sortType,
  }) {
    return axios.post(UnitExceptionReport_Base_URL + "report", {
      division,
      source,
      yardFK: pickupYardPK,
      dispatchUserFK: dispatcherPK,
      driverFK: driver,
      deliveryStates: deliveryStates,
      customerFK: customerPK,
      plantFK: plantPK,
      selectedBy: selectedBy,
      minPriority: minimumPriority || 9,
      showTodaysDispatches: showTodaysDispatches,
      showNotes,
      pageNumber,
      pageSize: 19,
      sortValue,
      sortType,
    });
  }

  saveUnitExceptionAdditionalNotes(params) {
    return axios.post(UnitExceptionReport_Base_URL + "saveComment", {
      dispatchPK: params.selectedDispatchPK,
      commentText: params.additionalNotes,
    });
  }

  sendUnitPickupExceptionEmail(emailObject) {
    return axios.post(Unit_Pickup_Exception_Mail_BASE_URL + "sendEmail", emailObject);
  }
}

export default new UnitPickupExceptionReportService();
