import { axios } from "../config/axiosInterceptors";
import {
  DriverLookup_RecordsPerPage,
  Driver_Base_URL,
  EditMasterUnitSelection_RecordsPerPage,
  Edit_Master_Base_URL,
  EquipmentCheckInOut_Base_URL,
  EquipmentHistory_Base_URL,
  QuarterScreen_RecordsPerPage,
  Shuttle_Edit_Shuttle_Base_URL,
  ThreeForthScreen_RecordsPerPage,
  UnitSelectionLookup_RecordsPerPage,
} from "./constants/applicationConstants";

class EquipmentCheckInOutService {
  getEquipmentsData(searchTerm, selectedSearchCriteria, pageNumber, sortValue, sortFlag, selectedStatus) {
    let status = null;
    if (selectedStatus === "Checked Out") {
      status = 0;
    } else if (selectedStatus === "Checked In") {
      status = 1;
    }
    return axios.post(EquipmentCheckInOut_Base_URL + "/allequipments", {
      pageNumber: pageNumber,
      size: 11,
      searchTerms: searchTerm,
      searchCriteria: selectedSearchCriteria,
      available: status,
      sortValue: sortValue,
      sortType: sortFlag,
      EquipmentCheck: true,
      assignedToDriver: false,
      active: true,
    });
  }
  getEquipmentById(Id) {
    return axios.get(EquipmentCheckInOut_Base_URL + "/getEquipmentId/" + Id);
  }

  save(data) {
    return axios.post(EquipmentHistory_Base_URL + "/savehistory", data);
  }

  checkin(pk) {
    return axios.post(EquipmentHistory_Base_URL + "/updatehistory", {
      equipmentFK: pk,
    });
  }

  getEquipmentHistoryDataByEquipmentFK(Id) {
    return axios.get(EquipmentCheckInOut_Base_URL + "/gethistorydata/" + Id);
  }
  //Driver Autocomplete

  getAllDriversForAutocomplete(searchTerm) {
    return axios.post(EquipmentCheckInOut_Base_URL + "/fetchalldrivers", {
      equipmentCheckOut: 1,
      searchTerm: searchTerm,
      statusType: "Active",
      number: 0,
      size: 100,
      searchCriteria: "Beginning",
    });
  }
  getAllUnitsForAutocomplete(searchTerm, driverData) {
    return axios.post(EquipmentCheckInOut_Base_URL + "/alldispatcheslookup", {
      driverFK: driverData,
      searchCriteria: "Beginning",
      searchTerm: searchTerm,
      pageNumber: 0,
      pageSize: 100,
      type: "Autocomplete",
      equipmentCheckOut: 1,
      unitNumberLast5: "",
    });
  }

  getAllUnitNumbersForLookup(
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
    advancedSearchString,
    advancedSearchByInputs,
    customerId,
    customerPlantId,
    dealerId,
    driverFK
  ) {
    return axios.post(EquipmentCheckInOut_Base_URL + "/alldispatcheslookup", {
      unitSelection: true,
      type: "Lookup",
      equipmentCheckOut: 1,
      searchTerm: globalSearchTerm,
      unitNumberLast5: unitLast5,
      pageNumber: pageNumber,
      pageSize: UnitSelectionLookup_RecordsPerPage,
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
      advancedSearchString: advancedSearchString,
      advancedSearchBy: advancedSearchByInputs,
      customerId: customerId,
      customerPlantsId: customerPlantId,
      dealerId: dealerId,
      driverFK: driverFK,
      // activeDispatch: true,
    });
  }

  getAllDriversForLookup(
    searchTerm,

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
      statusType: "Active",
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
      equipmentCheckOut: 1,
    });
  }
}
export default new EquipmentCheckInOutService();
