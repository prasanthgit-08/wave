import { axios } from "../config/axiosInterceptors";
import { formatDate } from "../utils/dateUtils";
import { PostCheck_Base_URL } from "./constants/applicationConstants";

class PostCheckService {
  getPostCheckData(
    taxableBeginningCheckNumber,
    taxableEndingCheckNumber,
    taxableBeginningDate,
    taxableEndingDate,

    reimbursementBeginningCheckNumber,
    reimbursementEndingCheckNumber,
    reimbursementBeginningDate,
    reimbursementEndingDate,
    post,
    reimbursementPrintBatch,
    reimbursementEmailBatchAsPDF,
    reimbursementEmailBatchAsExcel,
    taxablePrintBatch,
    taxableEmailBatchAsPDF,
    taxableEmailBatchAsExcel
  ) {
    return axios.post(PostCheck_Base_URL + "/process", {
      taxableBeginningCheckNumber,
      taxableEndingCheckNumber,
      taxableBeginningDate: formatDate(taxableBeginningDate),
      taxableEndingDate: formatDate(taxableEndingDate),

      reimbursementBeginningCheckNumber,
      reimbursementEndingCheckNumber,
      reimbursementBeginningDate: formatDate(reimbursementBeginningDate),
      reimbursementEndingDate: formatDate(reimbursementEndingDate),
      post: post,
      reimbursementPrintBatch,
      reimbursementEmailBatchAsPDF,
      reimbursementEmailBatchAsExcel,
      taxablePrintBatch,
      taxableEmailBatchAsPDF,
      taxableEmailBatchAsExcel,
    });
  }
}
export default new PostCheckService();
