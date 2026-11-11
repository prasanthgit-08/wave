import { axios } from "../config/axiosInterceptors";
import { QuarterScreen_RecordsPerPage } from "./constants/applicationConstants";
import { CustomerEmail_Base_URL } from "./constants/applicationConstants";

// customer base url

const baseUrl = CustomerEmail_Base_URL;

class CustomerEmailMain {
  getEmail(number, searchCriteria, searchTerms, customerPk, sortValue, sortFlag) {
    return axios.post(baseUrl + "/fetchcustomeremails", {
      number: number,
      size: QuarterScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerms: searchTerms,
      customerFK: customerPk,
      sortValue: sortValue,
      sortType: sortFlag,
    });
  }
  create(
    name,
    email,
    customerFK,
    customerEmailPK,
    reportsAsText,
    reportsAsExcel,
    reportsAsPDF,
    reportsAsCSV,
    unassignedUnitsReport,
    unassignedUnitsOutbound,
    unassignedUnitsReload,
    unassignedUnitsShippersOnly,
    unassignedUnitsStorageOnly,
    yardExitReport,
    onRoadReport,
    deliveredUnitsReport,
    unitInventoryMaster,
    invoiceDays,
    bolAtOrderEntry,
    bolAtOrderEntryDPU,
    bolBatchAtExitOrderEntry,
    bolBatchDaily,
    bolAtDispatch,
    copyOfPAPS,
    dispatchUpdates,
    deliveryOnly,
    dispatchOnly,
    returnedUpdates,
    specialCodeFK,
    breakdowns,
    damaged,
    dispatchDelays,
    shuttleDelays,
    invoices,
    invoiceBOLOnly,
    invoiceDAFOnly,
    statements,
    creditCardCharges
  ) {
    return axios.post(baseUrl + "/createcustomeremail", {
      name: name,
      email: email,
      customerFK: customerFK,
      customerEmailPK: customerEmailPK,
      reportsAsText: reportsAsText,
      reportsAsExcel: reportsAsExcel,
      reportsAsPDF: reportsAsPDF,
      reportsAsCSV: reportsAsCSV,
      unassignedUnitsReport: unassignedUnitsReport,
      unassignedUnitsOutbound: unassignedUnitsOutbound,
      unassignedUnitsReload: unassignedUnitsReload,
      unassignedUnitsShippersOnly: unassignedUnitsShippersOnly,
      unassignedUnitsStorageOnly: unassignedUnitsStorageOnly,
      yardExitReport: yardExitReport,
      onRoadReport: onRoadReport,
      deliveredUnitsReport: deliveredUnitsReport,
      allUnits: unitInventoryMaster,
      allUnitsInvoiceDays: parseInt(invoiceDays),
      bolAtOrderEntry: bolAtOrderEntry,
      bolAtOrderEntryDpu: bolAtOrderEntryDPU,
      bolBatchAtExitOrderEntry: bolBatchAtExitOrderEntry,
      bolBatchDaily: bolBatchDaily,
      bolAtDispatch: bolAtDispatch,
      copyOfPAPS: copyOfPAPS,
      dispatchUpdates: dispatchUpdates,
      deliveryOnly: deliveryOnly,
      dispatchOnly: dispatchOnly,
      returnedUpdates: returnedUpdates,
      specialCodeFK: specialCodeFK,
      breakdowns: breakdowns,
      damaged: damaged,
      dispatchDelays: dispatchDelays,
      shuttleDelays: shuttleDelays,
      invoices: invoices,
      invoiceBOLOnly: invoiceBOLOnly,
      invoiceDAFOnly: invoiceDAFOnly,
      statements: statements,
      creditCardCharges: creditCardCharges,
    });
  }
  deleteCustomerEmail(id) {
    return axios.delete(baseUrl + "/deletecustomeremails/" + id);
  }
  getCustomerEmail(id) {
    return axios.get(baseUrl + "/getcustomeremail/" + id);
  }
  checkEmail(email, id, customerfk) {
    return axios.post(baseUrl + "/checkemailexist", {
      email: email,
      customerEmailPK: id,
      customerFK: customerfk,
    });
  }

  checkNameExist(yardFK, yardEmailPK, name) {
    return axios.post(baseUrl + "/nameexists", {
      yardFK,
      yardEmailPK,
      name,
    });
  }
}

export default new CustomerEmailMain();
