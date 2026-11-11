import { axios } from "../config/axiosInterceptors";
import {
  DPU_Instructions_Base_URL,
  DPU_InstructionsCrossDB_Base_URL,
  Email_Processor_URL,
} from "./constants/applicationConstants";
class DpuInstructionsService {
  getAllUnitNumbers(searchUnit, unitLast5, pageNumber, size, sortValue, sortFlag) {
    return axios.post(DPU_Instructions_Base_URL + "/browse", {
      pageNumber: pageNumber,
      pageSize: size,
      searchCriteria: "Beginning",
      searchTerm: searchUnit,
      unitNumberLast5: unitLast5,
      sortValue: sortValue,
      sortType: sortFlag,
      autocomplete: 0,
    });
  }

  getAllUnitNumbersAuto(searchUnit, unitLast5) {
    return axios.post(DPU_Instructions_Base_URL + "/browse", {
      pageNumber: 0,
      pageSize: 100,
      searchCriteria: "Beginning",
      searchTerm: searchUnit,
      unitNumberLast5: unitLast5,
      autocomplete: 1,
      sortValue: "",
      sortType: false,
    });
  }

  getEformz(searchUnit, unitLast5) {
    return axios.post(DPU_Instructions_Base_URL + "/browse", {
      pageNumber: 0,
      pageSize: 100,
      searchCriteria: "Beginning",
      searchTerm: searchUnit,
      unitNumberLast5: unitLast5,
      autocomplete: 1,
      sortValue: "",
      sortType: false,
    });
  }

  getDPUInstructionsById(id) {
    return axios.get(DPU_Instructions_Base_URL + "/getDpuInstructionsById/" + id);
  }

  generateForms(unitSelectionRequestVO) {
    return axios.post(DPU_InstructionsCrossDB_Base_URL + "/generateUnitsEmail", unitSelectionRequestVO);
  }

  sendEmail(unitSelectionRequestVO) {
    return axios.post(Email_Processor_URL + "/compose", unitSelectionRequestVO);
  }
}
export default new DpuInstructionsService();
