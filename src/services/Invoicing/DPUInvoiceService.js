import { axios } from "../../config/axiosInterceptors";
import { DpuInvoices_Base_URL } from "../constants/applicationConstants";

class DPUInvoiceService {
  getDpuInvoiceUnitSelection(
    unitNumber,
    unitNumberLast5,
    bolNumber,
    pageNumber,
    pageSize,
    sortValue,
    sortType
  ) {
    return axios.post(DpuInvoices_Base_URL + "/selection", {
      unitNumber: unitNumber,
      unitNumberLast5: unitNumberLast5,
      bolNumber: bolNumber,
      pageNumber: Number(pageNumber),
      pageSize: pageSize,
      sortValue: sortValue,
      sortType: sortType,
    });
  }

  getDpuInvoiceUnitConfirmation(unitNumber) {
    return axios.post(DpuInvoices_Base_URL + "/confirmation", {
      unitNumber: unitNumber,
    });
  }

  getDpuInvoiceTextScreen(unitNumber) {
    return axios.post(DpuInvoices_Base_URL + "/textScreen", {
      unitNumber: unitNumber,
    });
  }

  savePDFFileList(payload) {
    const formData = new FormData();
    formData.append("unitPK", payload?.unitPK);
    formData.append("unitNumber", payload?.unitNumber);
    formData.append("invoiceText1", payload?.invoiceText1);
    formData.append("invoiceText2", payload?.invoiceText2);
    formData.append("invoiceText3", payload?.invoiceText3);
    formData.append("invoiceText4", payload?.invoiceText4);
    formData.append("invoiceAmount", payload?.invoiceAmount || 0);
    formData.append("storageFees", payload?.storageFee || 0);
    formData.append("startAndRunFees", payload?.startAndrunFee || 0);
    formData.append(`monetraChargesVOList`, JSON.stringify(payload?.monetraChargesVOList));
    formData.append(`transIds`, payload?.transIds);
    formData.append(`IsCreditCardSelect`, payload?.IsCreditCardSelect);
    if (payload?.customerUploadFiles?.length > 0) {
      payload?.customerUploadFiles?.forEach((file, fileIndex) => {
        formData.append("CUSTOMER", file);
      });
    }
    if (payload?.customerScanFiles?.length > 0) {
      payload?.customerScanFiles?.forEach((file, fileIndex) => {
        formData.append("CUSTOMER", file);
      });
    }

    if (payload?.companyUploadFiles?.length > 0) {
      payload?.companyUploadFiles.forEach((file, fileIndex) => {
        formData.append("COMPANY", file);
      });
    }
    if (payload?.companyScanFiles?.length > 0) {
      payload?.companyScanFiles.forEach((file, fileIndex) => {
        formData.append("COMPANY", file);
      });
    }

    return axios.post(DpuInvoices_Base_URL + "/save", formData);
  }
}

export default new DPUInvoiceService();
