import { axios } from "../config/axiosInterceptors";
import {
  EquipmentHistory_Base_URL,
  Equipment_Base_URL,
  No_Of_Record_per_page,
  QuarterScreen_RecordsPerPage,
  Reserves_Base_URL,
  ThreeForthScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class EquipmentService {
  getEquipmentData(searchTerms, searchCriteria, pageNumber, selectedStatus, sortValue, sortFlag) {
    let activeStatus = null;
    if (selectedStatus === "Active") {
      activeStatus = 1;
    } else if (selectedStatus === "Inactive") {
      activeStatus = 0;
    }
    return axios.post(Equipment_Base_URL + "/fetchequipments", {
      number: pageNumber,
      size: 11,
      searchTerms,
      searchCriteria,
      active: activeStatus,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  //this api call id for fetching  assigned driver  records from the equipment table

  getAssignedEquipmentData(
    searchTerms,
    searchCriteria,
    pageNumber,
    selectedStatus,
    sortValue,
    sortFlag,
    driverFK
  ) {
    return axios.post(Equipment_Base_URL + "/fetchequipments", {
      number: pageNumber,
      size: 11,
      searchTerms,
      searchCriteria,
      sortValue: sortValue,
      sortType: sortFlag,
      isEquipmentAssignedToDriver: true,
      isAvailableForAssignedToDriver: false,

      driverFK: driverFK,
    });
  }
  //this api call id for fetching active true and avilable true records from the equipment table
  getAddEquipmentData(
    searchTerms,
    searchCriteria,
    pageNumber,
    selectedStatus,
    sortValue,
    sortFlag,
    driverFK
  ) {
    let activeStatus = null;
    if (selectedStatus === "Active") {
      activeStatus = 1;
    } else if (selectedStatus === "Inactive") {
      activeStatus = 0;
    }
    return axios.post(Equipment_Base_URL + "/fetchequipments", {
      number: pageNumber,
      size: 11,
      searchTerms,
      searchCriteria: searchCriteria,
      active: activeStatus,
      sortValue: sortValue,
      sortType: sortFlag,
      isEquipmentAssignedToDriver: false,
      isAvailableForAssignedToDriver: true,
      driverFK: driverFK,
    });
  }

  getEquipmentHistoryListing(pageNumberOfHistory, sortValue, sortFlag, id) {
    return axios.post(EquipmentHistory_Base_URL + "/fetchEquipmentHistory", {
      number: pageNumberOfHistory,
      size: 11,
      searchTerms: "",
      searchCriteria: "Beginning",
      sortValue: sortValue,
      sortType: sortFlag,
      equipmentFK: id,
    });
  }

  getRecord(id) {
    return axios.get(Equipment_Base_URL + "/getEquipmentId/" + id);
  }
  geUnitNumber(name) {
    return axios.post(Equipment_Base_URL + "/getunitsnumber", {
      unitNumber: name,
    });
  }
  createOrUpdateRecord(formData) {
    return axios.post(Equipment_Base_URL + "/saveequipments", formData);
  }

  addEquipmentrecord(formData) {
    return axios.post(Equipment_Base_URL + "/addequipments", formData);
  }

  removeEquipmentrecord(formData) {
    return axios.post(Equipment_Base_URL + "/removeequipments", formData);
  }
  deleteRecord(id) {
    return axios.delete(Equipment_Base_URL + "/deletebyid/" + id);
  }
  getEquipmentHistoryData(pageNumber) {
    return axios.get(EquipmentHistory_Base_URL + "/getallEquipmentHistory", {
      number: pageNumber,
      size: No_Of_Record_per_page,
    });
  }

  activateEquipment(equipmentPK) {
    return axios.put(Equipment_Base_URL + "/activateequipment", {
      equipmentPK: equipmentPK,
    });
  }

  deactivateEquipment(equipmentPK) {
    return axios.put(Equipment_Base_URL + "/deactiveequipment", {
      equipmentPK: equipmentPK,
    });
  }

  checkPlateState(state) {
    return axios.post(Equipment_Base_URL + "/checkplatestateexist", {
      plateState: state,
    });
  }

  checkDescriptionExist(equipmentNumber, description, id) {
    return axios.post(Equipment_Base_URL + "/descriptionexists", {
      equipmentNumber: equipmentNumber,
      description: description,
      equipmentPK: id,
    });
  }

  checkEquipmentExist(equipmentNumber, id) {
    return axios.post(Equipment_Base_URL + "/equipmentexists", {
      equipmentNumber: equipmentNumber,
      equipmentPK: id,
    });
  }

  getReserveTypeAuto(string, isLease, isEld, isIRP) {
    return axios.post(Reserves_Base_URL + "/allreserves", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      isEld: isEld,
      isIRP: isIRP,
      isLease: isLease,
    });
  }

  getEquipmentForLookup(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(Equipment_Base_URL + "/fetchequipments", {
      searchCriteria,
      searchTerms,
      number: pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      driverTruckFlag: true,
    });
  }
  getEquipmentIRPForLookup(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag) {
    return axios.post(Equipment_Base_URL + "/fetchequipments", {
      searchCriteria,
      searchTerms,
      number: pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
      driverTruckFlags: true,
    });
  }
}

export default new EquipmentService();
