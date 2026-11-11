import { axios } from "../config/axiosInterceptors";
import {
  Complianceitems_Base_URL,
  HalfScreen_RecordsPerPage,
} from "../services/constants/applicationConstants";
class ComplianceItemsService {
  getComplianceItemsData(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag, active) {
    let status = null;
    if (active === "Active") {
      status = 1;
    } else if (active === "Inactive") {
      status = 0;
    }

    return axios.post(Complianceitems_Base_URL + "/allcomplianceitems", {
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      pageNumber: pageNumber,
      size: HalfScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
      active: status,
    });
  }
  getComplianceItemsById(Id) {
    return axios.get(Complianceitems_Base_URL + "/getcomplianceitemsbyid/" + Id);
  }

  createComplianceItems(saveData) {
    return axios.post(Complianceitems_Base_URL + "/saveComplianceItems", saveData);
  }
  deleteComplianceItems(id) {
    return axios.delete(Complianceitems_Base_URL + "/delete/" + id);
  }
  checkDescription(description, id) {
    return axios.post(Complianceitems_Base_URL + "/checkdescriptionexist", {
      description: description,
      complianceItemPK: id,
    });
  }

  activateComplianceItems(id) {
    return axios.post(Complianceitems_Base_URL + "/toggleactive", {
      complianceItemPK: id,
    });
  }
  deActivateComplianceItems(id) {
    return axios.post(Complianceitems_Base_URL + "/toggleactive", {
      complianceItemPK: id,
    });
  }

  checkDriversDescription(driverDescription, id) {
    return axios.post(Complianceitems_Base_URL + "/checkdriverdescriptionexist", {
      driverDescription: driverDescription,
      complianceItemPK: id,
    });
  }
  checkuniquesave(description, driverDescription, objectKey, id) {
    return axios.post(Complianceitems_Base_URL + "/checkuniquesave", {
      description: description,
      driverDescription: driverDescription,
      complianceItemPK: id,
      objectKey: objectKey ? objectKey : null,
    });
  }

  objectkeyuniqueornot(objectKey, pk) {
    return axios.post(Complianceitems_Base_URL + "/objectkeyunique", {
      objectKey: objectKey ? objectKey : null,
      complianceItemPK: pk,
    });
  }
}
export default new ComplianceItemsService();
