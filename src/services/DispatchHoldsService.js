import { axios } from "../config/axiosInterceptors";
import {
  Dispatches_BASE_URL,
  DispatchHolds_Base_URL,
  QuarterScreen_RecordsPerPage,
  ThreeForthScreen_RecordsPerPage,
} from "./constants/applicationConstants";
class DispatchHoldsService {
  getAllDispatchHolds(searchCriteria, searchTerm, dispatchPageNumber, sortValue, sortFlag, active) {
    let status = null;
    if (active === "Active") {
      status = 1;
    } else if (active === "Inactive") {
      status = 0;
    }
    return axios.post(DispatchHolds_Base_URL + "/alldispatchholds", {
      searchCriteria,
      searchTerm,
      pageNumber: dispatchPageNumber,
      size: 11,
      sortValue: sortValue,
      sortType: sortFlag,
      active: status,
    });
  }
  getById(Id) {
    return axios.get(DispatchHolds_Base_URL + "/getbyid/" + Id);
  }
  descriptionExistCheck(description, pk) {
    return axios.post(DispatchHolds_Base_URL + "/descriptionexistcheck", {
      description: description,
      dispatchHoldPK: pk,
    });
  }

  driverDescriptionExistCheck(driverDescription, pk) {
    return axios.post(DispatchHolds_Base_URL + "/driverdescriptionexistcheck", {
      driverDescription: driverDescription,
      dispatchHoldPK: pk,
    });
  }

  create(saveData) {
    return axios.post(DispatchHolds_Base_URL, saveData);
  }

  delete(id) {
    return axios.delete(DispatchHolds_Base_URL + "/delete/" + id);
  }

  activate(id) {
    return axios.post(DispatchHolds_Base_URL + "/toggleactive", {
      dispatchHoldPK: id,
    });
  }

  deactivate(id) {
    return axios.post(DispatchHolds_Base_URL + "/toggleactive", {
      dispatchHoldPK: id,
    });
  }

  //checkuniquesave

  checkuniquesave(description, driverDescription, objectKey, pk) {
    return axios.post(DispatchHolds_Base_URL + "/checkuniquesave", {
      description: description,
      driverDescription: driverDescription,
      dispatchHoldPK: pk,
      objectKey: objectKey ? objectKey : null,
    });
  }

  objectkeyuniqueornot(objectKey, pk) {
    return axios.post(DispatchHolds_Base_URL + "/objectkeyunique", {
      objectKey: objectKey ? objectKey : null,
      dispatchHoldPK: pk,
    });
  }
}

export default new DispatchHoldsService();
