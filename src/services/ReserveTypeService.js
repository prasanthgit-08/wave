import { axios } from "../config/axiosInterceptors";
import {
  ReserveTypes_Base_URL,
  QuarterScreen_RecordsPerPage,
} from "../services/constants/applicationConstants";
class ReserveTypeService {
  getReserveTypeForLookup(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag) {
    return axios.post(ReserveTypes_Base_URL + "/allreservetypedata", {
      searchCriteria,
      searchTerm,
      pageNumber,
      size: 12,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }
  getReserveTypedata(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag) {
    return axios.post(ReserveTypes_Base_URL + "/allreservetypedata", {
      searchCriteria,
      searchTerm,
      pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }

  getReserveTypeForAuto(string) {
    return axios.post(ReserveTypes_Base_URL + "/allreservetypedata", {
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      type: "Autocomplete",
    });
  }
  getRecord(id) {
    return axios.get(ReserveTypes_Base_URL + "/getreserveTypeById/" + id);
  }
  createReserveTypes(reserveTypesData) {
    return axios.post(ReserveTypes_Base_URL + "/allreserveTypessave", reserveTypesData);
  }
  deleteReserveTypes(id) {
    return axios.delete(ReserveTypes_Base_URL + "/delete/" + id);
  }
  checkDescriptionExist(reserveTypePK, description) {
    return axios.post(ReserveTypes_Base_URL + "/checkdescriptionexist", {
      reserveTypePK: reserveTypePK,
      description: description,
    });
  }
  checkObjectKeyExist(reserveTypePK, objectKey) {
    return axios.post(ReserveTypes_Base_URL + "/checkobjectKeyexist", {
      objectKey: objectKey,
      reserveTypePK: reserveTypePK,
    });
  }

  checkuniquesave(description, objectKey, id) {
    return axios.post(ReserveTypes_Base_URL + "/checkuniquesave", {
      description: description,
      objectKey: objectKey,
      reserveTypePK: id,
    });
  }
}
export default new ReserveTypeService();
