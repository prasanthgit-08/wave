import { axios } from "../../config/axiosInterceptors";
import { Random_Testing_Base_URL } from "../constants/applicationConstants";

class RandomTestingService {
  /*****Process the Random Testing****/
  processRandomTesting(randomTestingData) {
    return axios.post(`${Random_Testing_Base_URL}/process`, randomTestingData);
  }

  /****Validate the Drugtest Date*****/
  validateDrugTestDate() {
    return axios.post(`${Random_Testing_Base_URL}/checkRandomCheck`);
  }
}
export default new RandomTestingService();
