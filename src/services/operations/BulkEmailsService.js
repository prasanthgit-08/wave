import { axios } from "../../config/axiosInterceptors";
import { BulkEmails_Base_URL } from "../constants/applicationConstants";

class BulkEmailsService {
  getBrowseData(pageNumber) {
    return axios.post(BulkEmails_Base_URL + "/review", { process: "Review", pageSize: 11, pageNumber });
  }

  exportExcel(data) {
    let xmlList = new Map(Object.entries(data));
    // Convert the Map to a JSON string
    const bulkEmailRequestData = JSON.stringify(Object.fromEntries(xmlList));
    return axios.post(BulkEmails_Base_URL + "/export", bulkEmailRequestData, {
      headers: { "Content-Type": "application/json" }, // ✅ Explicitly set JSON header
    });
  }

  sentEmail(data, recipientFile, uploadList, selectedId) {
    const formData = new FormData();
    // Convert data to JSON
    formData.append("bulkEmailRequestData", JSON.stringify(data));

    // Attach recipient file (if exists)
    if (recipientFile?.file) {
      formData.append("file", recipientFile.file);
    }

    // Attach multiple files as "attachmentFile"
    if (uploadList?.length) {
      uploadList.forEach((fileEntry) => {
        formData.append("attachmentFile", fileEntry.file);
      });
    }

    formData.append("selectedId", selectedId || 0);

    // Debugging: Check FormData content
    //  Debugging: Print formData content before sending

    return axios.post(BulkEmails_Base_URL + "/save", formData);
  }

  getPreview(id) {
    return axios.post(BulkEmails_Base_URL + "/preview", { process: "Preview", bulkEmailPK: id });
  }

  deleteRecord(id) {
    return axios.post(BulkEmails_Base_URL + "/delete", { process: "Delete", bulkEmailPK: id });
  }
}
export default new BulkEmailsService();
