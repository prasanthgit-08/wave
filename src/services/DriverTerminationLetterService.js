import { axios } from "../config/axiosInterceptors";
import {
  DriverTerminationLetter_Base_URL,
  HalfScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class DriverTerminationLetterService {
  getDriverTerminationLetters(pageNumber, searchCriteria, searchTerm, sort, sortValue) {
    return axios.post(DriverTerminationLetter_Base_URL + "/fetchTerminationLetters", {
      pageNumber: pageNumber,
      size: HalfScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerm: searchTerm,
      sort: sort,
      sortValue: sortValue,
    });
  }

  fetchById(id) {
    return axios.get(DriverTerminationLetter_Base_URL + "/getLetterById/" + id);
  }

  saveDriverTerminationLetter(
    description,
    damage,
    rehire,
    adminCharge,
    adminAmount,
    adminDays,
    formId,
    letter,
    id
  ) {
    return axios.post(DriverTerminationLetter_Base_URL + "/saveTerminationLetter", {
      description: description,
      damage: damage,
      rehire: rehire,
      adminCharge: adminCharge,
      adminAmount: adminAmount,
      adminChargeDays: adminDays,
      letter: letter,
      formId: formId,
      driverTerminationLetterPK: id,
    });
  }

  deleteDriverTerminationLetter(id) {
    return axios.get(DriverTerminationLetter_Base_URL + "/deleteLetter/" + id);
  }

  getFormsForAuto(string) {
    return axios.post(DriverTerminationLetter_Base_URL + "/fetchFormAutoComplete", {
      searchCriteria: "Beginning",
      searchTerms: string,
      pageNumber: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      formTypeObjectKey: "DriverTerm",
    });
  }

  checkUnique(string) {
    return axios.post(DriverTerminationLetter_Base_URL + "/checkUniqueDescription", {
      description: string,
    });
  }
  getByCombination(damage, rehire, adminCharge) {
    return axios.post(DriverTerminationLetter_Base_URL + "/getByCombination", {
      damage,
      rehire,
      adminCharge,
    });
  }
}

export default new DriverTerminationLetterService();
