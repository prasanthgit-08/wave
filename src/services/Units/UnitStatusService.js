import { axios } from "../../config/axiosInterceptors";
import { Unit_Status_Base_URL } from "../../services/constants/applicationConstants";

class UnitStatusService {
  getUnitStatusData(unitPK, tabName) {
    return axios.post(Unit_Status_Base_URL + "/getUnitStatusData", {
      unitPk: unitPK,
      tab: tabName,
    });
  }
  getUnitStatusDataForPaginationAndSort(unitPK, tabName, pageNumber, pageSize, sortValue, sortType) {
    return axios.post(Unit_Status_Base_URL + "/getUnitStatusData", {
      unitPk: unitPK,
      tab: tabName,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortValue: sortValue,
      sortType: sortType,
    });
  }
  getUnitStatusDataForUnitLocation(unitPK, tabName, pageNumber, pageSize, sortValue, sortType) {
    return axios.post(Unit_Status_Base_URL + "/getUnitStatusData", {
      unitPk: unitPK,
      tab: tabName,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortValue: sortValue,
      sortType: sortType,
    });
  }

  getUnitStatusDataForHolds(unitPK, tabName, pageNumber, pageSize, sortValue, sortType) {
    return axios.post(Unit_Status_Base_URL + "/getUnitStatusData", {
      unitPk: unitPK,
      tab: tabName,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortValue: sortValue,
      sortType: sortType,
    });
  }

  getUnitStatusUnitRouteData(unitPK, tabName, pageNumber, size, sortType, sortValue) {
    return axios.post(Unit_Status_Base_URL + "/getUnitStatusData", {
      unitPk: unitPK,
      tab: tabName,
      pageNumber: pageNumber,
      pageSize: size,
      sortType,
      sortValue,
    });
  }
  getUnitStatusDataForOpenBalance(unitPK, tabName, pageNumber, pageSize, sortValue, sortType) {
    return axios.post(Unit_Status_Base_URL + "/getUnitStatusData", {
      unitPk: unitPK,
      tab: tabName,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortValue: sortValue,
      sortType: sortType,
    });
  }

  getUnitStatusDataInvoiceDetail(invoicePK, tabName, pageNumber, pageSize, sortValue, sortType) {
    return axios.post(Unit_Status_Base_URL + "/getUnitStatusData", {
      unitPk: invoicePK,
      tab: tabName,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortValue: sortValue,
      sortType: sortType,
    });
  }

  getUnitSelectionLookUp(unitSelectionRequestVO) {
    return axios.post(Unit_Status_Base_URL + "/lookUp", {
      ...unitSelectionRequestVO,
      editMasterExpressLookUp: unitSelectionRequestVO?.editMasterExpressLookUp || 0,
    });
  }
}

export default new UnitStatusService();
