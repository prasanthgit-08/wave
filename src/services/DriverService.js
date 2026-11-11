import { axios } from "../config/axiosInterceptors";
import {
  Driver_Base_URL,
  DriverLookup_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
  DebitCards_Base_URL,
  StandardMaintenance_RecordsPerPage,
  HalfScreen_RecordsPerPage,
  Reload_Search_URL,
  Driver_Recruit_Report_AutoComplete_Base_URL,
  Driver_Shuttle_Base_URL,
  UnitExceptionReport_Base_URL,
  DamageReportBaseURL,
} from "../services/constants/applicationConstants";

class DriverService {
  getAllDrivers(driverVO) {
    return axios.post(Driver_Base_URL + "/fetchalldrivers", driverVO);
  }
  getAllDriversForLookup(
    searchTerm,
    statusType,
    driverType,
    cityType,
    pageNumber,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortValue,
    normalSortFlag,
    advancedSearchString,
    advancedSearchByInputs,
    excludeDriverId
  ) {
    return axios.post(Driver_Base_URL + "/fetchdriversforlookup", {
      searchTerm: searchTerm,
      statusType,
      driverType,
      cityType,
      number: pageNumber,
      size: DriverLookup_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      advancedSearchPayload: advancedSearchPayload,
      advancedSortingOrder: advancedSortingOrder,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      advancedSearchString: advancedSearchString,
      advancedSearchCheckboxPayload: advancedSearchByInputs,
      excludeDriverId: excludeDriverId,
    });
  }

  getDriverForAuto(string, active, excludeDriverId) {
    return axios.post(Driver_Base_URL + "/fetchdrivers", {
      searchCriteria: "Beginning",
      searchTerm: string,
      number: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      activeFlag: true,
      excludeDriverId: excludeDriverId,
    });
  }

  fetchDriversBasedOntheReloadSearch(
    searchTerm,
    searchCriteria,
    pageNumberOfdriver,
    divisionStatus,
    driverCdlStatus,
    listOfSelectedStates,
    sortValue1,
    sortType1,
    pageSize,
    unitId,
    miles
  ) {
    return axios.post(Driver_Base_URL + "/reloadSearchFilter", {
      searchTerm,
      searchCriteria,
      pageNumber: pageNumberOfdriver,
      divisionStatus,
      driverCdlStatus,
      listOfSelectedStates,
      sortValue1: sortValue1,
      sortType1: sortType1,
      pageSize: 18,
      unitId,
      miles,
    });
  }

  fetchUnitAndDriverBasedOntheReloadSearch(
    searchCriteria,
    searchTerm,
    pageNumber,
    pageSize,
    divisionStatus,
    driverCdlStatus,
    listOfSelectedStates,
    sortValue,
    sortType,
    selectedCustomerId,
    miles,
    outputType,
    dispatchPK
  ) {
    return axios.post(Reload_Search_URL + "/reloadSearchFilterReport", {
      division: divisionStatus,
      pageNumber: pageNumber,
      pageSize: 18,
      sortValue: "",
      sortType: 0,
      driverCDL: driverCdlStatus,
      stateCode: listOfSelectedStates.join(","),
      miles: miles,
      customerFK: selectedCustomerId,
      resultType: 0,
      flag: "both",
      zipcode: "",
      type: outputType,
      dispatchPK,
    });
  }

  fetchUnitBasedOntheReloadSearch(
    searchCriteria,
    searchTerm,
    pageNumber,
    pageSize,
    divisionStatus,
    driverCdlStatus,
    listOfSelectedStates,
    sortValue,
    sortType,
    selectedCustomerId,
    miles
  ) {
    return axios.post(Reload_Search_URL + "/reloadSearchFilter", {
      division: divisionStatus,
      pageNumber: pageNumber,
      pageSize: 18,
      sortValue: sortValue,
      sortType: sortType,
      driverCDL: driverCdlStatus,
      stateCode: listOfSelectedStates.join(","),
      miles: miles,
      customerFK: selectedCustomerId,
      resultType: 0,
      flag: "units",
      zipcode: "",
    });
  }

  driverFetch(
    searchCriteria,
    searchTerm,
    pageNumber,
    pageSize,
    divisionStatus,
    driverCdlStatus,
    listOfSelectedStates,
    sortValue,
    sortType,
    selectedCustomerId,
    miles,
    dispatchPK
  ) {
    return axios.post(Reload_Search_URL + "/reloadSearchFilter", {
      division: divisionStatus,
      pageNumber: pageNumber,
      pageSize: 18,
      sortValue: sortValue,
      sortType: sortType,
      driverCDL: driverCdlStatus,
      stateCode: listOfSelectedStates.join(","),
      miles: miles,
      customerFK: selectedCustomerId,
      resultType: 0,
      flag: "driver",
      zipcode: "",
      dispatchPK,
    });
  }

  findValidStateCode(listOfSelectedStates) {
    return axios.post(Driver_Base_URL + "/pickupstatesValidation", {
      listOfSelectedStates: listOfSelectedStates,
    });
  }
  getDriverReferrals(pageNumber, driverId, sortValue, sortType) {
    return axios.post(Driver_Base_URL + "/getreferreddrivers", {
      pageNumber: pageNumber,
      driverFK: parseInt(driverId),
      size: 11,
      sortType: sortType,
      sortValue: sortValue,
    });
  }

  getHireDateById(Id) {
    return axios.get(Driver_Base_URL + "/getHireDate/" + Id);
  }

  /**Get the details of driver by Id */
  getById(Id) {
    return axios.get(Driver_Base_URL + "/getdriverfordispatch/" + Id);
  }

  /***********************Driver Maintenance **************************/

  /**
   *Used for Browse page to display all Drivers
   */
  getAllDriversForMaintenance(
    searchTerm,
    statusType,
    driverType,
    cityType,
    pageNumber,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortValue,
    normalSortFlag,
    advancedSearchString,
    advancedSearchByInputs,
    size
  ) {
    return axios.post(Driver_Base_URL + "/fetchdriversforlookup", {
      searchTerm: searchTerm,
      statusType,
      driverType,
      cityType,
      number: pageNumber,
      size: size || 18,
      searchCriteria: selectedSearchCriteria,
      advancedSearchPayload: advancedSearchPayload,
      advancedSortingOrder: advancedSortingOrder,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      advancedSearchString: advancedSearchString,
      advancedSearchCheckboxPayload: advancedSearchByInputs,
    });
  }

  /**
   *Used for Save or Update
   */
  createDriverRecord(saveData) {
    return axios.post(Driver_Base_URL + "/createdriver", saveData);
  }
  /**
   *Used to checkk SSN is unique or not
   */
  ssnExist(ssn, id) {
    return axios.post(Driver_Base_URL + "/checkssnexist", {
      driverPK: id,
      ssn: ssn,
    });
  }

  /**
   *Used to get details of driver by Id
   */
  getDriverRecordById(Id) {
    return axios.get(Driver_Base_URL + "/getdriverrecordbyid/" + Id);
  }
  /**
   * User Autocomplete
   */

  getAllUserData(searchTerm, active) {
    return axios.post(Driver_Base_URL + "/getAllUsers", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: active,
    });
  }
  /**
   * Custom UserLookup
   */

  getAllUserDataForLookup(
    active,
    pageNumber,
    advancedSearchPayload,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedUserStatus,
    type,
    userType,
    currentUserId
  ) {
    let pseudoUser = null;
    if (selectedUserStatus === "Pseudo") {
      pseudoUser = 1;
    } else if (selectedUserStatus === "Actual") {
      pseudoUser = 0;
    } else {
      pseudoUser = null;
    }
    return axios.post(Driver_Base_URL + "/getAllUsers", {
      active: active,
      pageNumber: pageNumber,
      size: HalfScreen_RecordsPerPage,
      users: advancedSearchPayload,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      pseudoUser: pseudoUser,
      type,
      userType,
      currentUserId,
    });
  }
  /**
   * Region Autocomplete
   */

  getAllRegionsByName(searchRegions) {
    return axios.post(Driver_Base_URL + "/getAllRegions", {
      pageNumber: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerm: searchRegions,
      type: "Autocompleteforcode",
    });
  }
  /**
   * Used to get Gender dropdown values
   */

  getGender() {
    return axios.get(Driver_Base_URL + "/gendervalue");
  }
  /**
   * Used to ge Military Service dropdown values
   */
  getMilitaryService() {
    return axios.get(Driver_Base_URL + "/getmilitaryservices");
  }
  /**
   * Used to get Transportation dropdown values
   */
  getTransportation() {
    return axios.get(Driver_Base_URL + "/gettransportationvalues");
  }
  /**
   * Used to get LicenseType dropdown values
   */
  getLicenseType() {
    return axios.get(Driver_Base_URL + "/getlicensetype");
  }
  /**
   * Used to get Company values
   */

  getCompanyDetails() {
    return axios.get(Driver_Base_URL + "/complanydetails", {});
  }

  /**
   * Driver(Active) Autocomplete
   */
  getActiveDriverForAuto(string, statusType, id) {
    return axios.post(Driver_Base_URL + "/fetchdrivers", {
      searchCriteria: "Beginning",
      searchTerm: string,
      number: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      statusType: statusType,
      excludeDriverId: id,
    });
  }

  /**
   * Used to check StateCode exist or not
   */
  checkStateCodeExist(stateCode) {
    return axios.post(Driver_Base_URL + "/checkstatecodeexist", {
      stateCode: stateCode,
    });
  }

  /**
   * Debitcard  Autocomplete
   */
  getAllDebitCardData(searchTerm) {
    return axios.post(Driver_Base_URL + "/getalldebitcards", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: true,
    });
  }

  /**
   * Used to get Debitcard detaild by id
   */
  getDebitCardRecordById(id) {
    return axios.get(DebitCards_Base_URL + "/getDebitCardById/" + id);
  }
  /**
   * Used to check Debitcard is valid or not
   */
  checkDebitCardValidOrNot(cardNumber) {
    return axios.post(Driver_Base_URL + "/luhnvalidity", {
      debitCardNumber: cardNumber,
    });
  }
  /**
   * Used to check Whether DriverDEleasetecord exist for the Driver
   */
  checkDriverDeleaseRecorExistOrNot(driverFK) {
    return axios.post(
      Driver_Base_URL + "/checkdriverdeleaserecordexistornot",
      { driverFK } // Wrap in an object to match DriverDeleasesVO
    );
  }

  /**
   * Used to save driver picture
   */
  savePicture(formData, id) {
    return axios.post(`${Driver_Base_URL}/upload?blobId=${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Used to get Driver picture
   */

  getDriverPicById = (id) => {
    return axios.get(`${Driver_Base_URL}/picture/${id}`, {
      responseType: "blob",
    });
  };
  /**
   *Used for fetching Primay Driver in Driver Maintenance
   * Fetch Drivers who are not set as Primary Drivers
   **/
  getPrimaryDriverLookup(
    searchTerm,
    statusType,
    driverType,
    cityType,
    pageNumber,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortValue,
    normalSortFlag,
    advancedSearchString,
    advancedSearchByInputs,
    excludeDriverId,
    primaryDriverFK
  ) {
    return axios.post(Driver_Base_URL + "/fetchdriversforlookup", {
      searchTerm: searchTerm,
      statusType,
      driverType,
      cityType,
      number: pageNumber,
      size: DriverLookup_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      advancedSearchPayload: advancedSearchPayload,
      advancedSortingOrder: advancedSortingOrder,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      advancedSearchString: advancedSearchString,
      advancedSearchCheckboxPayload: advancedSearchByInputs,
      excludeDriverId: excludeDriverId,
      primaryDriverFK: primaryDriverFK ? primaryDriverFK : 0,
      primaryDriver: true,
    });
  }
  /**
   *Used for fetching Primay Driver in Driver Maintenance
   * Fetch Drivers who are not set as Primary Drivers-Autocomplete
   **/
  getPrimaryDriversForAutocomplete(string, statusType, id, primaryDriverFK) {
    return axios.post(Driver_Base_URL + "/fetchdrivers", {
      searchCriteria: "Beginning",
      searchTerm: string,
      number: 0,
      size: 100,
      sortValue: null,
      sortType: false,
      statusType: statusType,
      excludeDriverId: id,
      primaryDriverFK: primaryDriverFK ? primaryDriverFK : 0,
      primaryDriver: true,
    });
  }
  getCurrentLoginUser() {
    return axios.post(Driver_Base_URL + "/getloginuser");
  }

  getDriversForAutocomplete(string, searchType, activeFlag) {
    return axios.post(Driver_Base_URL + "/fetchdriversForAutoComplete", {
      searchCriteria: "Beginning",
      searchTerm: string,
      number: 0,
      size: 100,
      searchType,
      activeFlag,
    });
  }

  checkUniqueAdsLogin(adsLogin, id) {
    return axios.post(Driver_Base_URL + "/uniqueAdsLogin", {
      adsLogin: adsLogin,
      driverPK: id,
    });
  }

  /**
   * Custom UserLookup
   */

  getAllUserDataForLookupwithDispatcherPermission(
    active,
    pageNumber,
    advancedSearchPayload,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedUserStatus,
    type,
    userType
  ) {
    let pseudoUser = null;
    if (selectedUserStatus === "Pseudo") {
      pseudoUser = 1;
    } else if (selectedUserStatus === "Actual") {
      pseudoUser = 0;
    } else {
      pseudoUser = null;
    }
    return axios.post(Driver_Base_URL + "/getAllUsersWithPermission", {
      active: 1,
      pageNumber: pageNumber,
      size: HalfScreen_RecordsPerPage,
      users: advancedSearchPayload,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      pseudoUser: pseudoUser,
      type,
      userType,
      driverProgram: 1,
    });
  }

  getAllUserDataForAutocompletewithDispatcherPermission(searchTerm) {
    return axios.post(Driver_Base_URL + "/getAllUsersWithPermission", {
      searchCriteria: "Beginning",
      searchTerms: searchTerm,
      pageNumber: 0,
      size: 100,
      type: "Autocomplete",
      active: 1,
      driverProgram: 1,
      pseudoUser: 0,
    });
  }
  getDriverForReport(string) {
    return axios.post(Driver_Recruit_Report_AutoComplete_Base_URL + "lookUp", {
      status: "ALL",
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      pageSize: 10,
      sortValue: "",
      sortType: true,
      type: "LookUp",
    });
  }

  getDriverForReport(string) {
    return axios.post(Driver_Recruit_Report_AutoComplete_Base_URL + "lookUp", {
      status: "ALL",
      searchCriteria: "Beginning",
      searchTerm: string,
      pageNumber: 0,
      pageSize: 10,
      sortValue: "",
      sortType: true,
      type: "LookUp",
    });
  }

  //Api for driver lookup and Autocomplete for driverRecruit Report
  getDriverForAutoAndLookUP({
    type,
    pageNumber,
    pageSize,
    sortValue,
    sortType,
    searchTerm,
    searchCriteria,
    unitTypeSearchCriteria,
    status,
    addressType,
    firstField,
    secondField,
    thirdField,
    fourthField,
    advancedSearchString,
    all,
    dba,
    address,
    ssnOrEin,
    phone,
    email,
    vin,
    licensePlate,
    nickName,
    driversLicense,
    notes,
    firstName,
    lastName,
    city,
    stateCode,
  }) {
    return axios.post(Driver_Base_URL + "/driverRecruitReportLookup", {
      type,
      pageNumber,
      pageSize,
      sortValue,
      sortType,
      searchTerm,
      searchCriteria,
      unitTypeSearchCriteria,
      status,
      addressType,
      firstField: firstField || "",
      secondField: secondField || "",
      thirdField: thirdField || "",
      fourthField: fourthField || "",
      advancedSearchString,
      all,
      dba,
      address,
      ssnOrEin,
      phone,
      email,
      vin,
      licensePlate,
      nickName,
      driversLicense,
      notes,
      firstName: firstName || "",
      lastName: lastName || "",
      city: city || "",
      state: stateCode || "",
    });
  }

  //unitException
  getDriverForForUnitException({
    type = "Autocomplete",
    pageNumber,
    pageSize,
    sortValue,
    sortType,
    searchTerm,
    searchCriteria,
    unitTypeSearchCriteria,
    status,
    addressType,
    firstField,
    secondField,
    thirdField,
    fourthField,
    advancedSearchString,
    all,
    dba,
    address,
    ssnOrEin,
    phone,
    email,
    vin,
    licensePlate,
    nickName,
    driversLicense,
    notes,
    firstName,
    lastName,
    city,
    stateCode,
  }) {
    return axios.post(UnitExceptionReport_Base_URL + "driverLookup", {
      type,
      pageNumber,
      pageSize,
      sortValue,
      sortType,
      searchTerm,
      searchCriteria,
      unitTypeSearchCriteria,
      status,
      addressType,
      firstField: firstField,
      secondField: secondField,
      thirdField: thirdField,
      fourthField: fourthField,
      advancedSearchString,
      all,
      dba,
      address,
      ssnOrEin,
      phone,
      email,
      vin,
      licensePlate,
      nickName,
      driversLicense,
      notes,
      firstName: firstName,
      lastName: lastName,
      city: city,
      state: stateCode,
    });
  }

  //shuttleReport
  getDriverShuttleForAutoAndLookUP({
    type,
    pageNumber,
    pageSize,
    sortValue,
    sortType,
    searchTerm,
    searchCriteria,
    unitTypeSearchCriteria,
    status,
    addressType,
    firstField,
    secondField,
    thirdField,
    fourthField,
    advancedSearchString,
    all,
    dba,
    address,
    ssnOrEin,
    phone,
    email,
    vin,
    licensePlate,
    nickName,
    driversLicense,
    notes,
    firstName,
    lastName,
    city,
    stateCode,
  }) {
    return axios.post(Driver_Shuttle_Base_URL + "lookup", {
      type: type,
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortValue: sortValue || "",
      sortType: sortType,
      searchTerm: searchTerm,
      searchCriteria: searchCriteria,
      driverType: unitTypeSearchCriteria,
      statusType: status,
      cityType: addressType,
      firstField: firstField || "",
      secondField: secondField || "",
      thirdField: thirdField || "",
      fourthField: fourthField || "",
      advancedSearchString: advancedSearchString,
      all: all,
      dba: dba,
      address: address,
      ssnOrEin: ssnOrEin,
      phone: phone,
      email: email,
      vin: vin,
      licensePlate: licensePlate,
      nickName: nickName,
      driversLicense: driversLicense,
      notes: notes,
      firstName: firstName || "",
      lastName: lastName || "",
      city: city || "",
      state: stateCode || "",
    });
  }

  updateCompanyNextDebitCardNumber = (flag) => {
    return axios.post(Driver_Base_URL + "/updateCompanyNextDebitCardNumber", null, {
      params: {
        flag: flag,
      },
    });
  };

  /**
   *Used to check debitCardUnitNumber is unique or not
   */
  isDebitcardUnitnumberExist(debitCardUnitNumber, id) {
    return axios.post(Driver_Base_URL + "/isdebitcardunitnumberexist", {
      driverPK: id,
      debitCardUnitNumber: debitCardUnitNumber,
    });
  }

  /**************************Ends**************************/
}

export default new DriverService();
