import { axios } from "../../../config/axiosInterceptors";
import { Delay_Unit_Damage_Base_URL } from "../../constants/applicationConstants";

class DelayUnitExpenseService {
  getData(flag, delayedunitFK, delayedunitexpensePK, breakdownFK, formData) {
    const formDataJson = JSON.stringify(formData);
    return axios.post(Delay_Unit_Damage_Base_URL + "/getData", {
      flag,
      delayedunitFK: delayedunitFK || 0,
      delayedunitexpensePK: delayedunitexpensePK || 0,
      breakdownFK: breakdownFK || 0,
      formData: formDataJson,
    });
  }
}
export default new DelayUnitExpenseService();
