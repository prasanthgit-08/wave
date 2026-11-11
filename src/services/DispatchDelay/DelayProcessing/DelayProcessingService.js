import { parseLocalDate } from "../../../utils/dateUtils";
import { axios } from "../../../config/axiosInterceptors";
import { setOtherDescription } from "../../../redux/UndispatchSlice";

import {
  AutoCompleteDropdown_No_Of_Records,
  CrossDB_CustomerPlants_Base_URL,
  CrossDB_Dealer_Base_URL,
  DelayMove_Base_URL,
  DelayProcessing_Base_URL,
  EditMasterUnitSelection_RecordsPerPage,
  HalfScreen_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
  Undispatch_CrossDB_URL,
  StandardMaintenance_RecordsPerPage,
  Delay_Operations_Crossdb_URL,
  Company_Base_URL,
  DelayProcessing_TLCBase_URL,
  DelayReturnBaseURL,
  DamageStatusReport_Base_URL,
} from "../../constants/applicationConstants";

class DelayProcessingService {
  getAllDelayedUnitNumbers(
    selectedCompanyName,
    globalSearchTerm,
    unitLast5,
    pageNumber,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortValue,
    normalSortFlag,
    unitType,
    orderType,
    dateType,
    dateFrom,
    dateTo,
    unitStatus,
    pickupBy,
    deliveryBy,
    unitOrderStatus,
    unitDelayType,
    dispatchDelayType,
    delayedUnitType,
    selectedDispatchStatus,
    advancedSearchString,
    advancedSearchByInputs,
    customerId,
    customerPlantId,
    dealerId,
    pageSize
  ) {
    // delayProcessing/getAllDelayedUnitNumbers

    return axios.post(DelayProcessing_Base_URL + "/getAllDelayedUnitNumbers", {
      unitSelection: true,
      searchTerm: globalSearchTerm,
      unitNumberLast5: unitLast5,
      pageNumber: pageNumber,
      pageSize: pageSize ? pageSize : EditMasterUnitSelection_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      advanceSearchingOrder: advancedSearchPayload,
      advanceSortingOrder: advancedSortingOrder,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      unitTypeSearchCriteria: unitType,
      orderType: orderType,
      dateType: dateType,
      fromDate: dateFrom,
      toDate: dateTo,
      unitStatus: unitStatus,
      pickupBy: pickupBy,
      deliveryBy: deliveryBy,
      unitOrderStatus: unitOrderStatus,
      unitDelayType: unitDelayType,
      dispatchDelayType: dispatchDelayType,
      dispatchStatus: selectedDispatchStatus,
      companyName: selectedCompanyName,
      advancedSearchString: advancedSearchString,
      advancedSearchBy: advancedSearchByInputs,
      customerId: customerId,
      customerPlantsId: customerPlantId,
      dealerId: dealerId,
      isDelayProcessing: true,
    });
  }

  getAllCompanyDetails() {
    return axios.get(`${DelayProcessing_Base_URL}/getAllCompanyDetails`);
  }

  getUnitDriverName(companyName, driverfk, dispatchfk, sisterunitfk) {
    return axios.get(
      `${DelayProcessing_Base_URL}/getUnitDriverName/${companyName}/${driverfk}/${dispatchfk}/${sisterunitfk}`
    );
  }

  getUnitLastLocation(companyName, unitfk) {
    return axios.get(
      `${Delay_Operations_Crossdb_URL}/getUnitLastLocation/${companyName || ""}/${unitfk || 0}`
    );
  }

  getAllDetailsOfUnitLastLocation(companyName, unitfk) {
    return axios.get(`${DelayProcessing_Base_URL}/getAllDetailsOfUnitLastLocation/${companyName}/${unitfk}`);
  }

  getTransportCompanyName(companyName, transportfk) {
    return axios.get(`${DelayProcessing_Base_URL}/getTransportCompanyName/${companyName}/${transportfk}`);
  }

  getEmailsForDelay(companyName, delayedUnitfk) {
    return axios.get(
      `${DelayProcessing_Base_URL}/getDelayedUnitEmailDetails/${companyName}/${delayedUnitfk}`
    );
  }

  getBreakdownDataForDelay(companyName, delayedUnitfk) {
    return axios.get(
      `${DelayProcessing_Base_URL}/getBreakdownDetailsForDelay/${companyName}/${delayedUnitfk}`
    );
  }

  getDamageDataForDelay(companyName, delayedUnitfk) {
    return axios.get(`${DelayProcessing_Base_URL}/getDamageDetailsForDelay/${companyName}/${delayedUnitfk}`);
  }

  getDelayInstructions(companyName, delayedUnitfk, customerPlantFK, customerFK) {
    if (!delayedUnitfk) {
      delayedUnitfk = 0;
    }
    return axios.post(
      `${DelayProcessing_Base_URL}/getDelayInstructionsForDelay/${companyName}/${delayedUnitfk}`,
      {
        customerPlantPK: customerPlantFK,
        customerFK: customerFK,
      }
    );
  }

  getResourcesForDelay(companyName, delayedUnitfk, customerPlantFK, customerFK) {
    return axios.post(
      `${DelayProcessing_Base_URL}/getResourcesDetailsForDelay/${companyName}/${delayedUnitfk}`,
      {
        customerPlantPK: customerPlantFK,
        customerFK: customerFK,
      }
    );
  }

  getDistance(from, to) {
    const addrList = [from, to];
    return axios.post(`${DelayProcessing_TLCBase_URL}/calculateDistance`, {
      addrList: addrList,
    });
  }

  getCustomerEmailDetails(companyName, customerFK) {
    return axios.get(`${DelayProcessing_Base_URL}/getCustomerEmailDetails/${companyName}/${customerFK}`);
  }

  getCustomerDelayInfo(companyName, customerFK) {
    return axios.get(`${DelayProcessing_Base_URL}/getCustomerDelayInfo/${companyName}/${customerFK}`);
  }

  getListofDelayCodes(companyName) {
    return axios.get(`${DelayProcessing_Base_URL}/getAllDelayedCodes/${companyName}`);
  }

  getDeliveryLocationDetails(
    companyName,
    deliveryCustomerPlantFK,
    deliveryYardFK,
    deliveryUnitAddressFK,
    deliveryDealerFK
  ) {
    if (deliveryCustomerPlantFK === null || deliveryCustomerPlantFK === undefined) {
      deliveryCustomerPlantFK = 0;
    }
    if (deliveryYardFK === null || deliveryYardFK === undefined) {
      deliveryYardFK = 0;
    }
    if (deliveryUnitAddressFK === null || deliveryUnitAddressFK === undefined) {
      deliveryUnitAddressFK = 0;
    }
    if (deliveryDealerFK === null || deliveryDealerFK === undefined) {
      deliveryDealerFK = 0;
    }

    return axios.get(
      `${DelayProcessing_Base_URL}/getUnitDeliveryLocation/${companyName}/${deliveryCustomerPlantFK}/${deliveryYardFK}/${deliveryUnitAddressFK}/${deliveryDealerFK}`
    );
  }

  getCurrentUserEmailDetails() {
    return axios.get(`${DelayProcessing_Base_URL}/getDelayedUnitEmailDetails`);
  }

  getDelayUnitCodesForlookup(
    searchTerm,
    searchCriteria,
    pageNumber,
    sortValue,
    sortFlag,
    status,
    companyName
  ) {
    return axios.post(DelayProcessing_Base_URL + "/delayedUnitPage", {
      searchCriteria,
      searchTerm,
      pageNumber: pageNumber,
      size: QuarterScreen_RecordsPerPage,
      sortValue: sortValue,
      sortType: sortFlag,
      delay: status === "delay" ? 1 : 0,
      damage: status === "damage" ? 1 : 0,
      weather: status === "weather" ? 1 : 0,
      roadType: status === "roadType" ? 1 : 0,
      roadcondition: status === "roadcondition" ? 1 : 0,
      isLookup: 1,
      company: companyName,
    });
  }
  fetchAllDealerDetailsByName(searchDealer, companyName) {
    return axios.post(CrossDB_Dealer_Base_URL + "/fetchdealers", {
      active: 1,
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchDealer,
      selectedDealerStatus: "Complete",
      type: "AutocompleteByName",
      companyName: companyName,
    });
  }

  fetchAllPlantdetailsByName(searchPlant, companyName, customerFK) {
    return axios.post(CrossDB_CustomerPlants_Base_URL + "/getallplantsbycustomer", {
      active: 1,
      number: 0,
      size: AutoCompleteDropdown_No_Of_Records,
      searchCriteria: "Beginning",
      searchTerms: searchPlant,
      selectedCustomerPlantStatus: "Complete",
      type: "Autocomplete",
      companyName: companyName,
      customerFK: customerFK || null,
    });
  }

  getDelayUnitCodesForAutoComplete(searchTerm, companyName) {
    return axios.post(DelayProcessing_Base_URL + "/delayedUnitPage", {
      searchCriteria: "Beginning",
      searchTerm,
      pageNumber: 0,
      size: 100,
      delay: 1,
      isLookup: 1,
      company: companyName,
    });
  }

  activateDelay(delayId, company, sisdelayId) {
    return axios.put(`${DelayProcessing_Base_URL}/activedelay/${delayId}/${company}/${sisdelayId}`);
  }

  deactivateDelay(delayId, company, sisdelayId) {
    return axios.put(`${DelayProcessing_Base_URL}/deactivedelay/${delayId}/${company}/${sisdelayId}`);
  }

  saveDelay(
    delayedUnitPK,
    unitFK,
    dispatchFK,
    sisterCompanyFK,
    sisterDelayedUnitFK,
    sisterUnitFK,
    sisterDispatchFK,
    driverFK,
    transportCompanyFK,
    delayedUnitCodeFK,
    delayUnitLocationFK,
    workingUnitLocationFK,
    delayDate,
    reported,
    delayContact,
    delayContactPhone,
    delayContactExtension,
    delayContactFAX,
    atPickup,
    inYard,
    breakdown,
    damage,
    delay,
    returned,
    returnedBySameDriver,
    returnedToPickupLocation,
    unitReturnFK,
    refused,
    active,
    lastUpdate,
    driverReleased,
    driverReleaseDate,
    delayInHouseNotes,
    delayCustomerNotes,
    inHouseNotes,
    customerNotes,
    currentLocation,
    terminateDelivery,
    releasedForDispatch,
    orderCanceled,
    leftPickupLocation,
    releasedAtYard,
    pickupAtYard,
    resolved,
    user,
    selectedCompanyName,
    sendNotificationEmails,
    sendUpdateEmails,
    locationContact,
    locationPhone,
    disableEmail,
    damagedFlag,
    damagedUnitCodeFK,
    weatherUnitCodeFK,
    roadConditionFK,
    roadTypeUnitCodeFK
  ) {
    const checkNotes = (notes) => (notes && notes?.trim().length === 0 ? null : notes);

    inHouseNotes = checkNotes(inHouseNotes);
    customerNotes = checkNotes(customerNotes);
    delayInHouseNotes = checkNotes(delayInHouseNotes);
    delayCustomerNotes = checkNotes(delayCustomerNotes);

    const utcTime = new Date().toISOString();
    const localTime = parseLocalDate(utcTime).toLocaleString();
    return axios.post(DelayProcessing_Base_URL + "/saveDelay", {
      delayedUnitPK: delayedUnitPK,
      unitFK: unitFK,
      dispatchFK: dispatchFK,
      sisterCompanyFK: sisterCompanyFK,
      sisterDelayedUnitFK: sisterDelayedUnitFK,
      sisterUnitFK: sisterUnitFK,
      sisterDispatchFK: sisterDispatchFK,
      driverFK: driverFK,
      transportCompanyFK: transportCompanyFK,
      delayedUnitCodeFK: delayedUnitCodeFK,
      delayUnitLocationFK: delayUnitLocationFK,
      workingUnitLocationFK: workingUnitLocationFK,
      delayDate: delayDate,
      reported: reported,
      delayContact: delayContact,
      delayContactPhone: delayContactPhone?.replace(/\s+/g, ""),
      delayContactExtension: delayContactExtension?.replace(/\s+/g, ""),
      delayContactFAX: delayContactFAX?.replace(/\s+/g, ""),
      atPickup: atPickup,
      inYard: inYard,
      breakdown: breakdown,
      damage: damage,
      delay: delay,
      returned: returned,
      returnedBySameDriver: returnedBySameDriver,
      returnedToPickupLocation: returnedToPickupLocation,
      unitReturnFK: unitReturnFK,
      refused: refused,
      active: active,
      lastUpdate: lastUpdate,
      driverReleased: driverReleased,
      driverReleaseDate: driverReleaseDate,
      delayInHouseNotes: delayInHouseNotes,
      delayCustomerNotes: delayCustomerNotes,
      inHouseNotes: inHouseNotes?.includes(user)
        ? `<DelayNotes>${
            inHouseNotes ? inHouseNotes.replace(/null/g, "").replace(/<DelayNotes>/g, "") : ""
          }<DelayNotes>`
        : inHouseNotes
          ? `<DelayNotes> ${inHouseNotes?.replace(/<DelayNotes>/g, "")}\n[${localTime}]\t${user}<DelayNotes>\n`
          : "",
      customerNotes: customerNotes?.includes(user)
        ? `<DelayNotes>${
            customerNotes ? customerNotes.replace(/null/g, "").replace(/<DelayNotes>/g, "") : ""
          }<DelayNotes>`
        : customerNotes
          ? `<DelayNotes> ${customerNotes?.replace(/<DelayNotes>/g, "")}\n[${localTime}]\t${user}<DelayNotes>\n`
          : "",
      currentLocation: currentLocation,
      terminateDelivery: terminateDelivery,
      releasedForDispatch: releasedForDispatch,
      orderCanceled: orderCanceled,
      leftPickupLocation: leftPickupLocation,
      releasedAtYard: releasedAtYard,
      pickupAtYard: pickupAtYard,
      resolved: resolved,
      companyName: selectedCompanyName,
      locationContact: locationContact,
      damagedFlag: damagedFlag,
      damageDelayedUnitCodeFK: damagedUnitCodeFK,
      weatherDelayedUnitCodeFK: weatherUnitCodeFK,
      roadConditionDelayedUnitCodeFK: roadConditionFK,
      roadTypeDelayedUnitCodeFK: roadTypeUnitCodeFK,
      locationPhone: String(locationPhone || "").replace(/\s+/g, ""),
      sendNotificationEmails: sendNotificationEmails,
      sendUpdateEmails: sendUpdateEmails,
      hasEmailSendPermission: !disableEmail,
    });
  }

  saveEmail(emailData, sendEmailFlag, company) {
    return axios.post(`${DelayProcessing_Base_URL}/saveEmail/${company}/${sendEmailFlag}`, emailData);
  }

  editEmail(emailData, sendEmailFlag, company) {
    return axios.post(`${DelayProcessing_Base_URL}/editEmail/${company}/${sendEmailFlag}`, emailData);
  }
  getAllCustomers(
    active,
    pageNumber,
    customers,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedCustomerStatus,
    customerPKList
  ) {
    let customerStatus = null;
    if (active === "Active") {
      customerStatus = 1;
    } else if (active === "Inactive") {
      customerStatus = 0;
    }

    return axios.post(DelayProcessing_Base_URL + "/getallcustomers", {
      active: customerStatus,
      number: pageNumber,
      size: 100,
      customers: customers,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedCustomerStatus: selectedCustomerStatus,
      customerPKList: customerPKList,
    });
  }

  fetchAllCustomersOfDelayedUnits(company) {
    return axios.get(`${DelayProcessing_Base_URL}/getAllCustomers/${company}`);
  }

  fetchAllCustomerPlantsOfDelayedUnits(company) {
    return axios.get(`${DelayProcessing_Base_URL}/getAllCustomerPlants/${company}`);
  }

  fetchAllDealersOfDelayedUnits(company) {
    return axios.get(`${DelayProcessing_Base_URL}/getAllDealers/${company}`);
  }

  getAllCustomerByName(searchCustomer, selectedCompanyName) {
    return axios.post(DelayProcessing_Base_URL + "/getallcustomers", {
      active: 1,
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchCustomer,
      selectedCustomerStatus: "Complete",
      type: "Autocomplete",
      companyName: selectedCompanyName,
    });
  }

  getAllCustomersForLookup(
    active,
    pageNumber,
    customers,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedCustomerStatus,
    customerPKList,
    selectedCompanyName
  ) {
    let customerStatus = null;
    if (active === "Active") {
      customerStatus = 1;
    } else if (active === "Inactive") {
      customerStatus = 0;
    }

    return axios.post(DelayProcessing_Base_URL + "/getallcustomers", {
      active: customerStatus,
      number: pageNumber,
      size: 15,
      customers: customers,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedCustomerStatus: selectedCustomerStatus,
      companyName: selectedCompanyName,
      customerPKList,
      type: "Lookup",
    });
  }

  /* fetchAllPlantdetailsByName(searchPlant, selectedCompanyName) {
    return axios.post(DelayProcessing_Base_URL + "/getallplantsbycustomer", {
      active: 1,
      number: 0,
      size: AutoCompleteDropdown_No_Of_Records,
      searchCriteria: "Beginning",
      searchTerms: searchPlant,
      selectedCustomerPlantStatus: "Complete",
      type: "Autocomplete",
      companyName: selectedCompanyName,
    });
  } */

  getAllPlantsByCustomer(
    selectedCustomerPlantStatus,
    active,
    selectedSearchCriteria,
    plant,
    pageNumber,
    searchTerms,
    customerId,
    customerPlantFKS,
    sortValue,
    sortFlag,
    size,
    selectedCompanyName
  ) {
    let plantStatus = null;
    if (active === "Active") {
      plantStatus = 1;
    } else if (active === "Inactive") {
      plantStatus = 0;
    }

    return axios.post(DelayProcessing_Base_URL + "/getallplantsbycustomer", {
      selectedCustomerPlantStatus: selectedCustomerPlantStatus,
      active: plantStatus,
      searchCriteria: selectedSearchCriteria,
      customerPlants: plant,
      number: pageNumber,
      size: size || HalfScreen_RecordsPerPage,
      searchTerms: searchTerms,
      customerId: customerId,
      customerPlantFKS: customerPlantFKS,
      sortValue: sortValue,
      sortType: sortFlag,
      companyName: selectedCompanyName,
    });
  }

  fetchAllDealerDetailsByName(searchDealer, selectedCompanyName) {
    return axios.post(DelayProcessing_Base_URL + "/fetchdealers", {
      active: 1,
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
      searchTerms: searchDealer,
      selectedDealerStatus: "Complete",
      type: "AutocompleteByName",
      companyName: selectedCompanyName,
    });
  }

  getDealers(
    active,
    pageNumber,
    dealer,
    searchCriteria,
    advanceSortingOrder,
    searchTerms,
    sortValue,
    sortFlag,
    selectedDealerStatus,
    advancedSearchString,
    advancedSearchBy,
    recordsPerPage,
    selectedCompanyName
  ) {
    let dealerStatus = null;
    if (active === "Active") {
      dealerStatus = 1;
    } else if (active === "Inactive") {
      dealerStatus = 0;
    }

    return axios.post(DelayProcessing_Base_URL + "/fetchdealers", {
      active: dealerStatus,
      number: pageNumber,
      size: recordsPerPage || StandardMaintenance_RecordsPerPage,
      dealer: dealer,
      searchCriteria: searchCriteria,
      advanceSortingOrder: advanceSortingOrder,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      selectedDealerStatus: selectedDealerStatus,
      isOEPP: "Lookup",
      advancedSearchString,
      advancedSearchBy,
      companyName: selectedCompanyName,
    });
  }

  getDelayDetails(delayedUnitFK, companyName) {
    return axios.get(`${DelayMove_Base_URL}/getDelayDetails/${companyName}/${delayedUnitFK}`);
  }

  saveDelayMoveDetails(delayedUnitMoveData) {
    return axios.post(DelayMove_Base_URL + "/saveDelayMoveDetails", delayedUnitMoveData);
  }

  getAllUnitNumbers(
    selectedCompanyName,
    companyPK,
    globalSearchTerm,
    unitLast5,
    pageNumber,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortValue,
    normalSortFlag,
    unitType,
    orderType,
    dateType,
    dateFrom,
    dateTo,
    unitStatus,
    pickupBy,
    deliveryBy,
    unitOrderStatus,
    unitDelayType,
    dispatchDelayType,
    selectedDispatchStatus,
    advancedSearchString,
    advancedSearchByInputs,
    customerId,
    customerPlantId,
    dealerId,
    pageSize
  ) {
    return axios.post(DelayProcessing_Base_URL + "/getAllActiveUnits", {
      unitSelection: true,
      searchTerm: globalSearchTerm,
      unitNumberLast5: unitLast5,
      pageNumber: pageNumber,
      pageSize: pageSize ? pageSize : EditMasterUnitSelection_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      units: advancedSearchPayload,
      advanceSortingOrder: advancedSortingOrder,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      unitTypeSearchCriteria: unitType,
      orderType: orderType,
      dateType: dateType,
      fromDate: dateFrom,
      toDate: dateTo,
      unitStatus: unitStatus,
      pickupBy: pickupBy,
      deliveryBy: deliveryBy,
      unitOrderStatus: unitOrderStatus,
      unitDelayType: unitDelayType,
      dispatchDelayType: dispatchDelayType,
      dispatchStatus: selectedDispatchStatus,
      companyName: selectedCompanyName,
      companyPK: companyPK,
      advancedSearchString: advancedSearchString,
      advancedSearchBy: advancedSearchByInputs,
      customerId: customerId,
      customerPlantsId: customerPlantId,
      dealerId: dealerId,
      isDelayProcessing: true,
    });
  }

  saveReturn(returnData, creditcardList, transIds, returnRate, isCurrentLocationChecked) {
    const payload = {
      delayedUnitFK: returnData?.delayedUnitId,
      dispatchFK: returnData?.dispatchFK,
      unitFK: returnData?.unitFK,
      delayedUnitId: returnData?.delayedUnitId,
      outBoundDriverMiles: returnData?.driverMiles,
      outBoundDriverFlatRate: returnData?.driverFlatRate,
      reloadDriverMiles: returnData?.driverReturnMiles,
      reloadDriverFlatRate: returnData?.driverReturnFlatRate,
      dispatchActiveStatus: returnData?.returnActive ? 1 : 0,
      delayedUnitReturnFK: 0,
      dealerRefusal: returnData?.dealerRefusal ? 1 : 0,
      toDealerFK: returnData?.deliveryDealerFK,
      toPlantFK: returnData?.deliveryCustomerPlantFK,
      fromDealerFK: returnData?.returnDealerFK,
      fromPlankFK: returnData?.returnCustomerPlantFK,
      returnByDriver: returnData?.delayReturnByDriver ? 1 : 0,
      returnToPickUpLocation: returnData?.isReturnedToPickupLocation ? 1 : 0,
      deliveryAddress: returnData?.miscDeliveryAddr,
      pickUpAddress: returnData?.miscPickupAddr,
      monetraChargesVOList: creditcardList || [],
      transIds: transIds || "",
      tolls: returnRate?.outboundtolls || 0,
      permit: returnRate?.outboundpermits || 0,
      other: returnRate?.outboundother || 0,
      otherDescription: returnRate?.outboundOtherDesc || "",
      otherType: returnRate?.payRadioButton || "",
      currentLocation: isCurrentLocationChecked,
      mileBalance: returnData?.mileBalance,
      invoiceReturnMiles: returnData?.invoiceReturnMiles || 0,
      invoiceReturnFlatrate: returnData?.invoiceReturnFlatRate || 0,
    };
    return axios.post(DelayReturnBaseURL + "/save-return", payload);
  }

  saveDelayReturnDocuments(
    delayedUnitPK,
    customerPaperworkFiles,
    companyPaperworkFiles,
    bolFiles,
    dafFiles,
    iftaFiles,
    customerPaperworkScanFiles,
    companyPaperworkScanFiles,
    bolScanFiles,
    dafScanFiles,
    iftaScanFiles,
    dispatchId
  ) {
    const formData = new FormData();

    // Append each file array to FormData with appropriate keys
    if (customerPaperworkFiles?.length > 0) {
      customerPaperworkFiles?.forEach((file, index) => {
        formData.append("customerFiles", file);
      });
    }

    if (customerPaperworkScanFiles?.length > 0) {
      customerPaperworkScanFiles?.forEach((file, index) => {
        formData.append("customerFiles", file);
      });
    }

    if (companyPaperworkFiles?.length > 0) {
      companyPaperworkFiles?.forEach((file, index) => {
        formData.append("companyFiles", file);
      });
    }

    if (companyPaperworkScanFiles?.length > 0) {
      companyPaperworkScanFiles?.forEach((file, index) => {
        formData.append("companyFiles", file);
      });
    }

    if (bolFiles?.length > 0) {
      bolFiles?.forEach((file, index) => {
        formData.append("bolFiles", file);
      });
    }

    if (bolScanFiles?.length > 0) {
      bolScanFiles?.forEach((file, index) => {
        formData.append("bolFiles", file);
      });
    }

    if (dafFiles?.length > 0) {
      dafFiles?.forEach((file, index) => {
        formData.append("dafFiles", file);
      });
    }

    if (dafScanFiles?.length > 0) {
      dafScanFiles?.forEach((file, index) => {
        formData.append("dafFiles", file);
      });
    }

    if (iftaFiles?.length > 0) {
      iftaFiles?.forEach((file, index) => {
        formData.append("iftaFiles", file);
      });
    }
    if (iftaScanFiles?.length > 0) {
      iftaScanFiles?.forEach((file, index) => {
        formData.append("iftaFiles", file);
      });
    }
    formData.append("dispatchId", dispatchId);
    formData.append("delayedUnitPK", delayedUnitPK);

    return axios.post(Undispatch_CrossDB_URL + "/savePdfs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getpaytype() {
    return axios.post(DelayReturnBaseURL + "/getpaytype");
  }

  isReturnActive(delayedUnitFK) {
    return axios.get(DelayReturnBaseURL + `/isReturnActive/${delayedUnitFK}`);
  }

  isReleaseActive(delayedUnitFK) {
    return axios.get(DelayProcessing_Base_URL + `/isReleaseActive/${delayedUnitFK}`);
  }
  /**********************************************************************************************************************/
  ///used to get units in delay new page//

  getNewDelayUnitSelectionBrowse(
    selectedCompanyName,
    companyPK,
    globalSearchTerm,
    unitLast5,
    pageNumber,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortValue,
    normalSortFlag,
    unitType,
    orderType,
    dateType,
    dateFrom,
    dateTo,
    unitStatus,
    pickupBy,
    deliveryBy,
    unitOrderStatus,
    unitDelayType,
    dispatchDelayType,
    selectedDispatchStatus,
    advancedSearchString,
    advancedSearchByInputs,
    customerId,
    customerPlantId,
    dealerId,
    pageSize
  ) {
    return axios.post(Delay_Operations_Crossdb_URL + "/getAllActiveUnits", {
      unitSelection: true,
      searchTerm: globalSearchTerm,
      unitNumberLast5: unitLast5,
      pageNumber: pageNumber,
      pageSize: pageSize ? pageSize : EditMasterUnitSelection_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      advanceSearchingOrder: advancedSearchPayload,
      advanceSortingOrder: advancedSortingOrder,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      unitTypeSearchCriteria: unitType,
      orderType: orderType,
      dateType: dateType,
      fromDate: dateFrom,
      toDate: dateTo,
      unitStatus: unitStatus,
      pickupBy: pickupBy,
      deliveryBy: deliveryBy,
      unitOrderStatus: unitOrderStatus,
      unitDelayType: unitDelayType,
      dispatchDelayType: dispatchDelayType,
      dispatchStatus: selectedDispatchStatus,
      companyName: selectedCompanyName,
      companyPK: companyPK,
      otherSearchString: advancedSearchString,
      otherSearchBy: advancedSearchByInputs,
      customerId: customerId,
      customerPlantsId: customerPlantId,
      dealerId: dealerId,
      isDelayProcessing: true,
    });
  }
  /// getAllDelayed Unit Numbers
  getUnitBrowse(
    selectedCompanyName,
    companyPK,
    globalSearchTerm,
    unitLast5,
    pageNumber,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortValue,
    normalSortFlag,
    unitType,
    orderType,
    dateType,
    dateFrom,
    dateTo,
    unitStatus,
    pickupBy,
    deliveryBy,
    unitOrderStatus,
    unitDelayType,
    dispatchDelayType,
    selectedDispatchStatus,
    advancedSearchString,
    advancedSearchByInputs,
    customerId,
    customerPlantId,
    dealerId,
    pageSize
  ) {
    return axios.post(Delay_Operations_Crossdb_URL + "/getAllDelayedUnitNumbers", {
      unitSelection: true,
      searchTerm: globalSearchTerm,
      unitNumberLast5: unitLast5,
      pageNumber: pageNumber,
      pageSize: pageSize ? pageSize : EditMasterUnitSelection_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      advanceSearchingOrder: advancedSearchPayload,
      advanceSortingOrder: advancedSortingOrder,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      unitTypeSearchCriteria: unitType,
      orderType: orderType,
      dateType: dateType,
      fromDate: dateFrom,
      toDate: dateTo,
      unitStatus: unitStatus,
      pickupBy: pickupBy,
      deliveryBy: deliveryBy,
      unitOrderStatus: unitOrderStatus,
      unitDelayType: unitDelayType,
      dispatchDelayType: dispatchDelayType,
      dispatchStatus: selectedDispatchStatus,
      companyName: selectedCompanyName,
      companyPK: companyPK,
      otherSearchString: advancedSearchString,
      otherSearchBy: advancedSearchByInputs,
      customerId: customerId,
      customerPlantsId: customerPlantId,
      dealerId: dealerId,
      isDelayProcessing: true,
    });
  }

  //used to get delay confirmation screen data
  fetchConfirmationScreenDetails(unitPK, companyName) {
    return axios.post(Delay_Operations_Crossdb_URL + "/newDelayConfirmationScreen", {
      unitPK,
      companyName,
    });
  }
  //new  delay  fetch
  fetchNewDelayDetails(unitPK, tab, companyName, pageNumber, pageSize, sortValue, sortType) {
    return axios.post(Delay_Operations_Crossdb_URL + "/newDelayDetails", {
      unitPK,
      tab,
      companyName,
      pageNumber,
      pageSize,
      sortValue,
      sortType,
    });
  }

  //new delay save
  saveNewDelay(newDelaySaveVO) {
    return axios.post(Delay_Operations_Crossdb_URL + "/newDelaySave", newDelaySaveVO);
  }

  //delay view fetch
  fetchViewDelayDetails(delayedUnitFK, tab, companyName, pageNumber, pageSize, sortValue, sortType) {
    return axios.post(Delay_Operations_Crossdb_URL + "/delayViewDetails", {
      delayedUnitFK,
      tab,
      companyName,
      pageNumber,
      pageSize,
      sortValue,
      sortType,
    });
  }
  //edit delay save
  saveEditDelay(delayEditSaveVO) {
    return axios.post(Delay_Operations_Crossdb_URL + "/delayEdit", delayEditSaveVO);
  }

  //used to get company list for delay browse page
  getAllCompanyData() {
    return axios.get(`${Company_Base_URL}/getAllCompanyDetails`);
  }

  //delay active-decactive
  activateorDeactivateDelay(active, companyName, delayedUnitPK, isActiveToInactive) {
    return axios.post(Delay_Operations_Crossdb_URL + "/delayActivateDeactivate", {
      delayedUnitPK,
      companyName,
      active,
      isActiveToInactive,
    });
  }
  //delayedunitcode lookup
  getLookupForDelayUnitCodes(
    selectedSearchCriteria,
    searchTerms,
    pageNumber,
    sortValue,
    sortFlag,
    companyName,
    delayedUnitPK
  ) {
    return axios.post(Delay_Operations_Crossdb_URL + "/delayedUniCodeDropDown", {
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: pageNumber,
      sortValue: sortValue,
      sortType: sortFlag,
      pageSize: QuarterScreen_RecordsPerPage,
      type: "DELAY",
      companyName: companyName,
      delayedUnitPK: delayedUnitPK,
    });
  }

  //DamageCodeLookup
  async getDamageCode({
    type = "AutoComplete",
    pageNumber = 0,
    pageSize = 15,
    searchCriteria = "Beginning",
    searchTerm,
    sortValue,
    sortType,
  }) {
    try {
      const res = await axios.post(DamageStatusReport_Base_URL + "damageStatusLookup", {
        type,
        pageNumber,
        pageSize,
        searchCriteria,
        searchTerm,
        sortValue,
        sortType,
      });
      return res;
    } catch (error) {
      console.error("Error in getAllUsersForTripListing:", error);
    }
  }

  //delayedunitcode autocomplete
  getAutoCompleteForDelayUnitCodes(searchTerm, companyName, delayedUnitPK) {
    return axios.post(Delay_Operations_Crossdb_URL + "/delayedUniCodeDropDown", {
      searchCriteria: "Beginning",
      searchTerm,
      pageNumber: 0,
      pageSize: 100,
      type: "DELAY",
      companyName: companyName,
      delayedUnitPK: delayedUnitPK,
    });
  }

  getData(companyName, unitfk, delayedUnitfk) {
    return axios.get(
      Delay_Operations_Crossdb_URL + `/getreturndata/${companyName}/${unitfk}/${delayedUnitfk}`
    );
  }

  getPlantsForCrossDB(
    selectedSearchCriteria,
    searchTerms,
    pageNumber,
    sortValue,
    sortFlag,
    type,
    pageSize,
    name,
    brand,
    productLine,
    company
  ) {
    return axios.post(DelayProcessing_TLCBase_URL + "getPlantLookup", {
      searchCriteria: selectedSearchCriteria,
      searchTerms: searchTerms,
      pageNumber: pageNumber || 0,
      sortValue: sortValue || "",
      sortType: sortFlag,
      type: type,
      size: pageSize || 0,
      name: name,
      brand: brand,
      productLine: productLine,
      companyName: company,
    });
  }
}

export default new DelayProcessingService();
