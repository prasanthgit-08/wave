import { axios } from "../config/axiosInterceptors";
import { Printer_Base_URL } from "./constants/applicationConstants";

class PrinterService {
  savePrinter(printerData) {
    return axios.post(Printer_Base_URL + "/saveprinter", printerData);
  }

  getPrinters(pageNumber, searchTerm, searchCriteria, sortValue, sortType) {
    return axios.post(Printer_Base_URL + "/getallprinters", {
      pageNumber: pageNumber,
      size: 17,
      searchCriteria: searchCriteria,
      searchTerms: searchTerm,
      sortValue,
      sortType,
    });
  }
  getPrinterById(printerId) {
    return axios.get(Printer_Base_URL + "/getprinterbyid/" + printerId);
  }
  deletePrinter(id) {
    return axios.delete(Printer_Base_URL + "/deleteprinter/" + id);
  }
  checkDescription(description, printerPK) {
    return axios.post(Printer_Base_URL + "/checkdescription/", {
      description: description,
      printerPK: printerPK,
    });
  }

  checkName(name, printerPK) {
    return axios.post(Printer_Base_URL + "/checkName/", {
      printerName: name,
      printerPK: printerPK,
    });
  }
  checkUrl(url, printerPK) {
    return axios.post(Printer_Base_URL + "/checkUrl/", {
      printerURL: url,
      printerPK: printerPK,
    });
  }
}

export default new PrinterService();
