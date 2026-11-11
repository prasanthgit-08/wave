import { axios } from "../../config/axiosInterceptors";
import {
  ActiveDrivers_Report_CrossDb,
  Available_Driver_List_Base_URL,
  BackEnd_Base_URL,
  blockedLog_URL,
  CommonReport_URL,
  Delivered_Unit_Report_Base_URL,
  Dispatched_Unit_Report_CrossDb,
  DriverListingReport_Base_URL,
  DriverListingReport_Columns_Base_URL,
  NoCallinReport_Base_URL,
  Project_Report_Base_URL,
  Random_Testing_Yearly_Report_Base_URL,
  Report_Base_URL,
  ShuttleCollectionReport_Base_URL,
  Unit_Listing_By_Date_Base_URL,
  YardUsageReport_Base_URL,
} from "../constants/applicationConstants";

class ReportsService {
  getProjectReport(payload) {
    return axios.post(`${Project_Report_Base_URL}'/getProjectReportList`, {
      division: payload.divisionStatus,
      source: payload.source,
      customerFK: payload.customerFK,
      projectCode: payload.projectCode,
      showCost: payload.showCost,
      canceled: payload.canceled,
      showDriver: payload.showDriver,
      type: payload.type,
    });
  }

  getUnitListingByDate(payload) {
    return axios.post(`${Unit_Listing_By_Date_Base_URL}'/unitListingByDate`, {
      divisionStatus: payload.divisionStatus,
      source: payload.source,
      orderDate: payload.orderDate,
      plantFK: payload.plantFK,
      customerFK: payload.customerFK,
      type: payload.type,
    });
  }

  getAvailableDriverList(payload) {
    return axios.post(`${Available_Driver_List_Base_URL}'/getAvailableDriverList`, {
      divisionStatus: payload.divisionStatus,
      driverOption: payload.driverOption,
      dispatchUserFK: payload.dispatchUserFK,
      dispatchUserName: payload.dispatchUserName,
      type: payload.type,
    });
  }

  sendAvailableDriverList(payload) {
    return axios.post(`${Available_Driver_List_Base_URL}'/sendAvailableDriverList`, {
      divisionStatus: payload.divisionStatus,
      driverOption: payload.driverOption,
      dispatchUserFK: payload.dispatchUserFK,
      dispatchUserName: payload.dispatchUserName,
      type: payload.type,
    });
  }

  getDeliveredUnitReport(payload) {
    return axios.post(`${Delivered_Unit_Report_Base_URL}'/getDeliveredUnitReport`, {
      divisionStatus: payload.division,
      source: payload.source,
      beginningDate: payload.beginningDate,
      endDate: payload.endDate,
      customer: payload.customerId,
      dealer: payload.dealerId,
      masterDealer: payload.masterDealer,
      includeSisterDeliveredUnits: payload.includeSisterDeliveredUnits,
      includeSisterUnits: payload.includeSisterUnits,
      type: payload.type,
    });
  }

  getDispatchedUnitReport(payload) {
    return axios.post(`${Dispatched_Unit_Report_CrossDb}'/getDispatchedUnitReport`, {
      divisionStatus: payload.divisionStatus,
      source: payload.source,
      beginningDate: payload.beginningDate,
      endDate: payload.endDate,
      customer: payload.customerFK,
      dispatcher: payload.userFK,
      includeHistory: payload.includeHistory,
      assigned: payload.assigned,
      orderByDispatchDate: payload.orderBy === "Dispatch Date" ? true : false,
      orderByOrderDate: payload.orderBy === "Order Date" ? true : false,
      type: payload.type,
    });
  }

  getActiveDriversReport(payload) {
    return axios.post(`${ActiveDrivers_Report_CrossDb}/getActiveDriversList`, {
      activeShuttleDrivers: payload?.activeDriverType === "activeShuttleDrivers" ? true : false,
      activeDriveAwayDrivers: payload?.activeDriverType === "activeDriveAwayDrivers" ? true : false,
      activePickUpDrivers: payload?.activeDriverType === "activePickUpDrivers" ? true : false,
      activeFlatBedDrivers: payload?.activeDriverType === "activeFlatBedDrivers" ? true : false,
      activeDriversWithDispatch: payload?.activeDriverType === "activeDriversWithDispatch" ? true : false,
      dispatcherUserFK: payload.dispatcherId,
      type: payload.type,
    });
  }

  getNoCallinReport(payload) {
    return axios.post(`${NoCallinReport_Base_URL}/noCallinReport`, {
      type: payload.type,
      dispatcher: payload.dispatcherId,
    });
  }

  getSummeryReport(payload) {
    return axios.post(`${Report_Base_URL}api/reports/randomYearlySummeryeport`, {
      type: payload.type,
      year: payload.year,
      driversToInclude: payload.driversToInclude,
    });
  }

  getYardUsageReport(payload) {
    return axios.post(`${YardUsageReport_Base_URL}/yardUsageReport`, {
      beginningDate: payload.beginningDate,
      endDate: payload.endDate,
      type: payload.type,
    });
  }

  getShuttleCollectionsReport(payload) {
    return axios.post(`${ShuttleCollectionReport_Base_URL}shuttleCollectionReport`, {
      beginningDate: payload.beginningDate,
      endDate: payload.endDate,
      divisionStatus: payload.division,
    });
  }

  getDriverListingReportColumns(tableName) {
    return axios.post(`${DriverListingReport_Columns_Base_URL}/columns?tableName=${tableName}`);
  }

  generateDriverListingReport(payload) {
    return axios.post(`${DriverListingReport_Base_URL}driverListingReport`, {
      driverOrTrucks: payload.driverOrTrucks,
      driverStatus: payload.driverStatus,
      selectedColumns: !payload.allColumns ? payload.selectedColumns : undefined,
      allColumns: payload.allColumns,
    });
  }

  getRandomTestingReport(id, payload, flag) {
    return axios.post(CommonReport_URL + "/common", { id, params: { ...payload }, type: flag }, {});
  }
}

export default new ReportsService();
