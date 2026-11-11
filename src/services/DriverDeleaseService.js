import { axios } from "../config/axiosInterceptors";
import {
  DriverDelease_Base_URL,
  HalfScreen_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class DriverDeleaseService {
  /* for Driver Delease browse Page Maintenance */
  getDriverDeleaseForDriver(searchCriteria, searchTerms, pageNumber, sortValue, sortFlag, driverId) {
    return axios.post(DriverDelease_Base_URL + "/fetchdriverdeleasedata", {
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerms: searchTerms,
      sortType: sortFlag,
      sortValue: sortValue,
      driverFK: driverId,
    });
  }
  /*check whether the driver is inactive and deleased*/
  checkInactiveDeleasedDriver(driverId) {
    return axios.post(DriverDelease_Base_URL + "/checkinactiveordeleasedDriver", {
      driverFK: parseInt(driverId),
    });
  }
  /*check whether the driver is inactive and deleased*/
  checkInactiveandNotDeleasedDriver(driverId) {
    return axios.post(DriverDelease_Base_URL + "/findInactiveandNotdeleasedDriver", {
      driverFK: parseInt(driverId),
    });
  }
  /*check whether the driver is having processed request*/
  checkDeleaseRequestRecordExist(driverId) {
    return axios.post(DriverDelease_Base_URL + "/checkprocessedrecordexist", {
      driverFK: parseInt(driverId),
    });
  }
  /*check whether the driver is having completed and voided record*/
  checkCompletedandVoided(driverId) {
    return axios.post(DriverDelease_Base_URL + "/checkcompletedandvoidedrecordexist", {
      driverFK: parseInt(driverId),
    });
  }
  getDriverDeleaseById(id) {
    return axios.get(DriverDelease_Base_URL + "/getdriverdeleasedata/" + id);
  }

  /****Save the Driver Delease Object***/
  createOrUpdateDriverDelease(driverDeleaseData) {
    return axios.post(DriverDelease_Base_URL + "/savedriverdeleases", driverDeleaseData);
  }
  /***Get the Driver Delease Items Records for Driver */
  getDriverDeleaseItems(id, itemsPageNumber, normalSortValue, normalSortFlag) {
    return axios.post(DriverDelease_Base_URL + "/getdriverdeleaseitems", {
      driverDeleaseFK: id,
      pageNumber: itemsPageNumber,
      size: 13,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
    });
  }
  /***Get the Driver Delease Items Records for Driver */
  getDeleaseItems(driverId, itemsPageNumber, status, normalSortValue, normalSortFlag) {
    /** Convert the status to boolean values***/
    const isInactive = status === "inactive";
    const isTerminated = status === "terminated";

    return axios.post(DriverDelease_Base_URL + "/getdeleaseitems", {
      driverFK: parseInt(driverId),
      pageNumber: itemsPageNumber,
      size: 16,
      inActiveItem: Boolean(status === "inactive"),
      terminated: Boolean(status === "terminated"),
      sortType: normalSortFlag,
      sortValue: normalSortValue,
    });
  }

  /*****Get the checkpay balance for the letter tab ****/
  getCheckPayBalanceByDriverId(driverId) {
    return axios.get(DriverDelease_Base_URL + "/getcheckdetailpaybalance/" + driverId);
  }
  /*****Get the bond balance for the letter tab ****/
  getBondBalanceByDriverId(driverId) {
    return axios.get(DriverDelease_Base_URL + "/getbondbalance/" + driverId);
  }
  /*****Get the Reserve  balance for the letter tab ****/
  getReserveBalanceByDriverId(driverId) {
    return axios.get(DriverDelease_Base_URL + "/getreservebalance/" + driverId);
  }
  /******Used for Letter tab*****/
  checkActiveandDamagedDelayUnits(driverId) {
    return axios.post(DriverDelease_Base_URL + "/checkactiveanddamageddelayunit", {
      driverFK: driverId,
    });
  }
  /******Used for Letter tab Outstanding Paper work for the driver*****/
  checkActiveDispatches(driverId) {
    return axios.post(DriverDelease_Base_URL + "/checkactivedispatches", {
      driverFK: driverId,
    });
  }
  /****Get the number of Days between hire date and termination date*****/
  getDaysBetweenHireandTermination(id) {
    return axios.get(DriverDelease_Base_URL + "/getdayshiredateandtermination/" + id);
  }
  /******check whether a matching records present for drivertermination letters****/
  checkMatchingRecordsForDriverTermination(hasActiveDamage, rehire) {
    return axios.post(DriverDelease_Base_URL + "/checkmatchingrecordsforactivedamage", {
      hasActiveDamage: hasActiveDamage,
      rehire: rehire,
    });
  }
  /*****Calculate the admin fee for letter tab*****/
  getTheAdminFee(hasActiveDamage, rehire) {
    return axios.post(DriverDelease_Base_URL + "/setadminfeeforlettertab", {
      hasActiveDamage: hasActiveDamage,
      rehire: rehire,
    });
  }
  /****List the missing equipments******/
  getTheMissingEquipments(driverId) {
    return axios.post(DriverDelease_Base_URL + "/listmissingequipments", {
      driverFK: driverId,
    });
    /******Print the termination letter for the driver ****/
  }

  /****check whether the completed is true and termination letter sent is false*****/
  checkCompletedandNotTerminationLetterSent(id) {
    return axios.get(DriverDelease_Base_URL + "/checkcompletedandnotterminationlettersent/" + id);
  }
  /*****Get the termination Letter for the
   * driver based on the Rehire,HasActiveDamage and ChargeAdminFee flags
   * *****/
  printTerminationLettersForDriver(driverId, hasActiveDamage, rehire, chargeAdminFee, id, objectKey) {
    return axios.post(DriverDelease_Base_URL + "/getterminationletter", {
      driverFK: driverId,
      hasActiveDamage: hasActiveDamage,
      rehire: rehire,
      chargeAdminFee: chargeAdminFee,
      driverDeleasePK: id,
      objectKey: objectKey,
    });
  }
  /*******
   * Balance the remaining driver bond funds
   *  from driver bond funds table for corresponding driver
   * ******/
  balanceDriverBondFunds(driverId, bondBalance) {
    return axios.post(DriverDelease_Base_URL + "/balancebondfundrecords", {
      driverFK: driverId,
      bondBalance: bondBalance,
    });
  }
  /*******
   * Balance the remaining Driver Reserve Funds from
   *  driver reserves funds table for corresponding driver
   * ******/
  balanceDriverReserveFunds(driverId, reserveBalance) {
    return axios.post(DriverDelease_Base_URL + "/balancereservefundrecords", {
      driverFK: driverId,
      reserveBalance: reserveBalance,
    });
  }
  createChecKDetailForAdMinFee(driverId, adminFee, chargeAdminFee) {
    return axios.post(DriverDelease_Base_URL + "/createcheckdetailrecord", {
      driverFK: driverId,
      adminFee: adminFee,
      chargeAdminFee: chargeAdminFee,
    });
  }
  getCurrentLoginUser() {
    return axios.post(DriverDelease_Base_URL + "/getloginuser");
  }
  getAllDriverDeleaseItemsList(id) {
    return axios.get(DriverDelease_Base_URL + "/getdriverdeleaseItemsListdata/" + id);
  }
  /*****Get All Delease Items ***/
  listAllDeleaseItems(driverId, status) {
    const isInactive = status === "inactive";
    const isTerminated = status === "terminated";
    return axios.post(DriverDelease_Base_URL + "/listcompletedeleaseitems", {
      driverFK: parseInt(driverId),
      inActiveItem: Boolean(status === "inactive"),
      terminated: Boolean(status === "terminated"),
    });
  }
  /******
   * Fetch The DocumentBLOB Record for the
   * Terminated Driver to for Print PDF
   * ****/
  displayTerminationLetter(driverId, objectKey) {
    return axios.post(DriverDelease_Base_URL + "/getTerminationletterForTerminatedDriver", {
      driverFK: driverId,
      objectKey: objectKey,
    });
  }
}
export default new DriverDeleaseService();
