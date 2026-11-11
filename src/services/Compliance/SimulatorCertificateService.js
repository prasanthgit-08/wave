import { axios } from "../../config/axiosInterceptors";
import { SimulatorCertificates_Base_URL } from "../constants/applicationConstants";

class SimulatorCertificateService {
  /******Process the Simulator Certificate with checking the date****/
  processSimulatorDate(simulatorDate, printSelection, emailSelection, simulatorStatus) {
    return axios.post(`${SimulatorCertificates_Base_URL}/processSimulator`, {
      printSelection: printSelection,
      emailSelection: emailSelection,
      simulatorDate: simulatorDate,
      simulatorStatus: simulatorStatus,
    });
  }
  /******Process the Simulator Certificate****/
  processSimulator(simulatorDate, printSelection, emailSelection, simulatorStatus) {
    return axios.post(`${SimulatorCertificates_Base_URL}/process`, {
      printSelection: printSelection,
      emailSelection: emailSelection,
      simulatorDate: simulatorDate,
      simulatorStatus: simulatorStatus,
    });
  }
}
export default new SimulatorCertificateService();
