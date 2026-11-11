import { axios } from "../config/axiosInterceptors";
import { PostToPassport_Base_URL } from "./constants/applicationConstants";

class PostToPassportService {
  getNextBatchNumber() {
    return axios.post(PostToPassport_Base_URL + "/getbatchvalue", {});
  }

  post(batchNumber, printBatch, emailBatchAsExcel, emailBatchAsPdf) {
    return axios.post(PostToPassport_Base_URL + "/process", {
      nextRealworldBatch: batchNumber,

      printPdf: printBatch,

      emailPdf: emailBatchAsPdf,

      excelPdf: emailBatchAsExcel,
    });
  }
}
export default new PostToPassportService();
