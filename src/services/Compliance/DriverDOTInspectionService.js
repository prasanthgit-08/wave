import { axios } from "../../config/axiosInterceptors";
import {
  DriverDOTInspection_Base_URL,
  QuarterScreen_RecordsPerPage,
  Email_Processor_URL,
} from "../constants/applicationConstants";

class DriverDOTInspectionService {
  getDriverDOTInspectionData(data) {
    return axios.post(DriverDOTInspection_Base_URL + "listDotInspections", {
      pageNumber: data.pageNumber,
      // pageSize: data.pageSize,
      pageSize: 11,
      searchCriteria: data.searchCriteria,
      searchTerm: data.searchTerm,
      sortValue: data.sortValue,
      sortType: data.sortType,
      radioButtons: data.radioButtons,
      notYetResponded: data.notYetResponded,
      driverFK: data.driverFK,
    });
  }

  getDriverTrailerData(data) {
    return axios.post(DriverDOTInspection_Base_URL + "listDriverTrailers", {
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      searchCriteria: data.searchCriteria,
      searchTerm: data.searchTerm,
      sortValue: data.sortValue,
      sortType: !!data.sortType,
      driverFK: data.driverFK,
      type: data.type,
      status: data.status,
    });
  }

  getTruckData(data) {
    return axios.post(DriverDOTInspection_Base_URL + "listDriverTrucks", {
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      searchTerm: data.searchTerm,
      searchCriteria: data.searchCriteria,
      sortValue: data.sortValue,
      sortType: data.sortType || false,
      driverFK: data.driverFK,
      status: data.status,
      type: data.type,
      status: data.status,
    });
  }

  getDriverDOTInspectionDetails(data) {
    return axios.post(DriverDOTInspection_Base_URL + "fetchDriverDOTInspectionDetails", {
      driverDotInspectionPK: data.driverDotInspectionPK || -1,
      tab: data.tab,
      driverFK: data.driverFK || -1,
    });
  }

  saveDriverDotInspectionDetails(data) {
    return axios.post(DriverDOTInspection_Base_URL + "saveDriverDOTInspection", {
      driverDotInspectionPK: data.driverDotInspectionPK,
      driverFK: data.driverFK,
      driverTruckFK: data.driverTruckFK,
      driverTrailerFK: data.driverTrailerFK,
      reportNumber: data.reportNumber,
      inspectionDate: data.inspectionDate,
      city: data.city,
      stateCode: data.stateCode,
      logViolation: data.logViolation,
      safetyViolation: data.safetyViolation,
      physicalFitnessViolation: data.physicalFitnessViolation,
      drugAlcoholViolation: data.drugAlcoholViolation,
      maintenanceViolation: data.maintenanceViolation,
      notifiedByDOT: data.notifiedByDOT,
      dotFine: data.dotFine ? data.dotFine : 0,
      dotDriverFine: data.dotDriverFine ? data.dotDriverFine : 0,
      dotCompanyFine: data.dotCompanyFine ? data.dotCompanyFine : 0,
      driverPaid: data.driverPaid,
      driverAward: data.driverAward ? data.driverAward : 0,
      driverAwardMiles: data.driverAwardMiles ? data.driverAwardMiles : 0,
      driverFined: data.driverFined,
      driverFine: data.driverFine ? data.driverFine : 0,
      driverFineMiles: data.driverFineMiles ? data.driverFineMiles : 0,
      driverCompanyFine: data.driverCompanyFine ? data.driverCompanyFine : 0,
      driverHOSFine: data.driverHOSFine ? data.driverHOSFine : 0,
      driverDOTFine: data.driverDOTFine ? data.driverDOTFine : 0,
      redisKeys: data.redisKeys,
      notes: data.Notes,
      repairDate: data.RepairDate,
      dotResponceDate: data.responseDate || "",
      daysTillHold: data.daysTillHold,
      complianceHold: data.complianceHold,
      maintenanceViolationItem1: data.MaintenanceViolationItem1,
      maintenanceViolationItem2: data.MaintenanceViolationItem2,
      maintenanceViolationItem3: data.MaintenanceViolationItem3,
      maintenanceViolationItem4: data.MaintenanceViolationItem4,
      maintenanceViolationItem5: data.MaintenanceViolationItem5,
      maintenanceViolationItem6: data.MaintenanceViolationItem6,
      maintenanceViolationItem7: data.MaintenanceViolationItem7,
      maintenanceViolationItem8: data.MaintenanceViolationItem8,
    });
  }

  processCacheSave(documentTypeId, description, dotInspectionFiles) {
    const formData = new FormData();
    formData.append(`documentTypePK`, documentTypeId);
    formData.append(`description`, description);

    if (dotInspectionFiles?.length > 0) {
      dotInspectionFiles?.forEach((file, fileIndex) => {
        formData.append(`PAPERWORK`, file);
      });
    }

    return axios.post(`${DriverDOTInspection_Base_URL}saveDocumentBlobDOTInspection`, formData);
  }

  getDocumentsForDotInspectionView(documentPageNumber, id) {
    return axios.post(`${DriverDOTInspection_Base_URL}documentBlobBrowseDriverDOTInspection`, {
      documentPageNumber: documentPageNumber,
      driverDotInspectionPK: id,
      documentPageSize: 9,
    });
  }

  viewDotInspectionDocument(blobKey) {
    return axios.post(`${DriverDOTInspection_Base_URL}fetchDocumentBlobDriverDOTInspectionByID`, {
      blobKey: blobKey,
    });
  }

  checkUSCityStateCode(usCity, stateCode) {
    return axios.post(DriverDOTInspection_Base_URL + "cityState", {
      city: usCity,
      stateCode: stateCode,
    });
  }

  getDocumentType() {
    return axios.get(DriverDOTInspection_Base_URL + "by-object-key/DOTINSPECTION");
  }

  sendDOTEmail(dotInspectionPK, emailObjectKey, userPK) {
    return axios.post(Email_Processor_URL + "/compose", {
      primaryKey: dotInspectionPK,
      primaryKeyName: "DriverDOTInspectionPK",
      entityName: "DriverDOTInspections",
      isEmail: true,
      isPrint: false,
      emailObjectKeyList: emailObjectKey,
      documentType: "",
      userPK: userPK,
      printerName: "",
    });
  }
}

export default new DriverDOTInspectionService();
