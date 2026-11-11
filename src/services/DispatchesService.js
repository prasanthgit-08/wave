import { axios } from "../config/axiosInterceptors";
import {
  CrossDB_URL,
  Dispatches_BASE_URL,
  Dispatches_CrossDB_URL,
  DriverTrailerService_BASE_URL,
  DriverTruckService_BASE_URL,
  Driver_Base_URL,
  Unit_Base_URL,
} from "../services/constants/applicationConstants";

class DispatchesService {
  getAllDrivers(driverFK) {
    return axios.get(Dispatches_BASE_URL + "/getdriver/" + driverFK);
  }

  getAllCompliancedata(driverId, sortValue, sortFlag, pageNumber, selectedDivison, requireFlatbed) {
    return axios.post(Dispatches_CrossDB_URL + "/fetch-compliance-items", {
      driverId: driverId,
      sortValue,
      sortFlag,
      pageNumber,
      selectedDivison,
      size: 19,
      requireFlatbed,
    });
  }
  getAllDriverTruckData(driverFK) {
    return axios.post(DriverTruckService_BASE_URL + "/fetchdrivertrucks", {
      number: 0,
      searchTerm: "",
      searchCriteria: "beginning",
      size: 100,
      driverId: driverFK,
    });
  }

  getAllDriverTrailer(driverFK) {
    return axios.post(DriverTrailerService_BASE_URL + "/fetchdrivertrailers", {
      number: 0,
      searchTerm: "",
      searchCriteria: "beginning",
      size: 100,
      driverId: driverFK,
    });
  }

  getDispatchSearchFilterData(
    driverBool,
    driverFK,
    selectedCustomerId,
    pickupCustomerPlantId,
    regionStatus,
    divisionStatus,
    includeSingles,
    includeOrphans,
    requireFlatbed,
    flatbedVisible
  ) {
    return axios.post(Dispatches_CrossDB_URL + "/fetchViewData", {
      dispatcherStatesChecked: driverBool,
      driverFK,
      selectedCustomerId,
      pickupCustomerPlantId,
      regionStatus,
      divisionStatus,
      includeSingles,
      includeOrphans,
      requireFlatbed,
      flatbedVisible,
    });
  }

  getUnitCountValidation(selectedDivison, selectedRegion, driverId) {
    return axios.post(Dispatches_BASE_URL + "/unitCountValidation", {
      driverId,
      selectedDivison,
      selectedRegion,
    });
  }

  fetchDispatchesForUnitBrowse(
    pageNumber,
    pageSize,
    regionStatus,
    divisionStatus,
    pickupStateCodes,
    unitNumber,
    selectedYardPK,
    selectedCustomerPK,
    selectedPlantPK,
    selectedDriverFKForDispatch,
    eligibleTruckPKS,
    eligibleTrailerPKS,
    minimumPriority,
    isWeekendDelivery,
    mileageFrom,
    mileageTo,
    reloadChecked,
    reloadDispatchPKSWithOutbound,
    sortByRatePerMile,
    includeSinglesChecked,
    includeOrphansChecked,
    requireFlatbed,
    flatbedVisible,
    isrequireFlatbedVisible
  ) {
    // fetchDispatchesForUnitBrowse(pageNumber ,pageSize, regionStatus, divisionStatus , pickupStateCodes, unitNumber, selectedYardPK, selectedCustomerPK, selectedPlantPK,selectedDriverFKForDispatch, eligibleTruckPKS,minimumPriority, isWeekendDelivery,mileageFrom, mileageTo, reloadChecked, reloadDispatchPKSWithOutbound,requireFlatbed,flatbedVisible) {
    return axios.post(Dispatches_CrossDB_URL + "/fetchDispatchesForUnitBrowse", {
      pageNumber,
      pageSize,
      regionStatus,
      divisionStatus,
      pickupStateCodes,
      unitNumber,
      selectedYardPK,
      selectedCustomerPK,
      selectedPlantPK,
      selectedDriverFKForDispatch,
      eligibleDriverTruckPKS: eligibleTruckPKS,
      eligibleDriverTrailerPKS: eligibleTrailerPKS,
      priority: minimumPriority,
      weekendDelivery: isWeekendDelivery,
      mileageFrom,
      mileageTo,
      onlyWithReloads: reloadChecked,
      reloadDispatchPKSWithOutbound,
      sortByRatePerMile,
      includeSingles: includeSinglesChecked,
      includeOrphans: includeOrphansChecked,
      requireFlatbed: requireFlatbed ? requireFlatbed : false,
      flatbedVisible: flatbedVisible ? flatbedVisible : false,
      isrequireFlatbedVisible,
    });
  }

  getDispatchesViewData(
    dispatchPK,
    payPickupFee,
    driverData,
    division,
    region,
    selectedTruck,
    complainceTrucks,
    rateObjFrmRedux,
    ratePerMile,
    halftonRateAdded,
    flatbedRequired,
    eligibleTrailerPKS
  ) {
    let driverFK = driverData?.driverPK;
    //return axios.get(Dispatches_BASE_URL + "/fetchDispatchViewData",{ params: { dispatchPK ,payPickupFee,driverFK} })
    return axios.post(Dispatches_CrossDB_URL + "/fetchDispatchViewData", {
      dispatchPK: dispatchPK,
      payPickupFee: payPickupFee,
      driverPK: driverFK,
      division: division,
      region: region,
      selectedTruck: selectedTruck,
      complainceTrucks: complainceTrucks,
      flatRated: rateObjFrmRedux?.Flatrated,
      ratePerMile: ratePerMile,
      flatRate: rateObjFrmRedux?.Flatrate,
      halftonRateAdded: halftonRateAdded,
      additionalFlatRate: rateObjFrmRedux?.driverAdditionalFlatRate,
      flatbedRequired,
      complainceTrailers: eligibleTrailerPKS,
    });
  }

  getDispatchesViewDataForFlatbed(
    individualUnitConfirmationVOList,
    payPickupFee,
    driverData,
    division,
    region,
    selectedTruck,
    nonComplaintTrucks,
    nonComplaintTrailers,
    index,
    selectedDispatchPKList,
    hasFlatbedTrailer
  ) {
    let driverFK = driverData?.driverPK;
    //return axios.get(Dispatches_BASE_URL + "/fetchDispatchViewData",{ params: { dispatchPK ,payPickupFee,driverFK} })
    return axios.post(Dispatches_CrossDB_URL + "/fetchDispatchViewDataForFlatbed", {
      individualUnitConfirmationVOList: individualUnitConfirmationVOList,
      payPickupFee: payPickupFee,
      driverPK: driverFK,
      division: division,
      region: region,
      selectedTruck: selectedTruck,
      nonComplaintTrucks: nonComplaintTrucks,
      nonComplaintTrailers: nonComplaintTrailers,
      index,
      selectedUnitCount: selectedDispatchPKList ? selectedDispatchPKList.length : 0,
      hasFlatbedTrailer,
    });
  }

  saveDispatchRecord(
    dispatchViewObj,
    pickupDate,
    deliveryDate,
    driverData,
    totalFee,
    poeFK,
    division,
    region,
    selectedTruck,
    rateObj,
    isFlatRatedFrmRedux,
    selectedTrailer
  ) {
    return axios.post(Dispatches_CrossDB_URL + "/saveSingleDisapatchRecord", {
      dispatchPK: dispatchViewObj.dispatchPK,
      driverFKInt: driverData?.driverPK,
      unitFK: dispatchViewObj.selectedUnitFK,
      miles: dispatchViewObj.miles,
      payMiles: dispatchViewObj.payMiles,
      reload: dispatchViewObj.reload,
      city: dispatchViewObj.pickupCity,
      stateCode: dispatchViewObj.pickupStateCode,

      payPickUpFee: driverData.payPickupFee,
      totalFee: dispatchViewObj.totalCharges,
      grossPay: dispatchViewObj.amount,
      bonusPoolIn: dispatchViewObj.bonusPoolIn,
      bonusPoolOut: dispatchViewObj.bonusPoolOut,

      flatRated: isFlatRatedFrmRedux,
      flatRate: isFlatRatedFrmRedux ? rateObj.Flatrate : null,
      rate: dispatchViewObj.rate,
      rateVO: rateObj,

      minimumPayMiles: dispatchViewObj.minimumPayMiles,
      minimumPayFlatRate: dispatchViewObj.minimumPayFlatRate,

      estimatedPickupDate: pickupDate,
      estimatedDeliveryDate: deliveryDate,
      poeFK: poeFK,

      driverQual: dispatchViewObj.driverQual,
      deductedBondAmt: dispatchViewObj.deductedBondAmt,
      division: division,
      region: region, //(region==="reload")?"reload":"outbound",
      selectedTruck: selectedTruck,
      selectedTrailer: selectedTrailer,
      reload: region === "reload" ? "true" : "false",
    });
  }
  getPickupAndDeliveryDates(dispatchViewObj, pickupDate, deliveryDate, acceptSelectedDate) {
    return axios.post(Dispatches_BASE_URL + "/getPickupAndDeliveryDates", {
      miles: dispatchViewObj?.miles,
      reload: dispatchViewObj?.reload,
      selectedPickupDate: pickupDate,
      selectedDeliveryDate: deliveryDate,
      minimumPickupDate: dispatchViewObj?.dispatchesDateVO.minimumPickupDate,
      maximumPickupDate: dispatchViewObj?.dispatchesDateVO.maximumPickupDate,
      minimumDeliveryDate: dispatchViewObj?.dispatchesDateVO.minimumDeliveryDate,
      maximumDeliveryDate: dispatchViewObj?.dispatchesDateVO.maximumDeliveryDate,
      deliverByDate: dispatchViewObj?.dispatchesDateVO.deliverByDate,

      dispatchPK: dispatchViewObj?.dispatchPK,
      pickupCustomerPlantFK: dispatchViewObj?.dispatchesDateVO.pickupCustomerPlantFK,
      deliveryCustomerPlantFK: dispatchViewObj?.dispatchesDateVO.deliveryCustomerPlantFK,
      pickupYardFK: dispatchViewObj?.dispatchesDateVO.pickupYardFK,
      deliveryYardFK: dispatchViewObj?.dispatchesDateVO.deliveryYardFK,
      pickupDealerFK: dispatchViewObj?.dispatchesDateVO.pickupDealerFK,
      deliveryDealerFK: dispatchViewObj?.dispatchesDateVO.deliveryDealerFK,
      pickupUnitAddressFK: dispatchViewObj?.dispatchesDateVO.pickupUnitAddressFK,
      deliveryUnitAddressFK: dispatchViewObj?.dispatchesDateVO.deliveryUnitAddressFK,
      canadianPickup: dispatchViewObj?.dispatchesDateVO.canadianPickup,
      canadianDelivery: dispatchViewObj?.dispatchesDateVO.canadianDelivery,
      acceptSelectedDate: acceptSelectedDate,
    });
  }

  fetchPoeSelectionData(dispatchId) {
    return axios.post(Dispatches_CrossDB_URL + "/getPOEList/" + dispatchId);
  }
  fetchPoeOverrideData(dispatchId) {
    return axios.post(Dispatches_CrossDB_URL + "/getPOEOverrideList/" + dispatchId);
  }

  checkIfHaulAndTow(truckPK) {
    return axios.post(Dispatches_BASE_URL + "/isTruckHaulAndTow/" + truckPK);
  }

  saveMultiDispatchRecords(
    dispatchViewData,
    estimatedPickupDate,
    estimatedDeliveryDate,
    driverData,
    poeFK,
    division,
    region,
    selectedTruck,
    individualUnitSaveVOList,
    selectedTrailer
  ) {
    return axios.post(Dispatches_CrossDB_URL + "/saveMultiDispatchRecords", {
      estimatedPickupDate: estimatedPickupDate,
      estimatedDeliveryDate: estimatedDeliveryDate,
      driverFKInt: driverData?.driverPK,
      payPickUpFee: driverData?.payPickupFee,
      division: division,
      region: region, //(region==="reload")?"reload":"outbound",
      selectedTruck: selectedTruck,
      individualDispatchSaveVOList: individualUnitSaveVOList,
      selectedTrailer: selectedTrailer,
      reload: region === "reload" ? "true" : "false",
      poeFK: poeFK,
    });
  }

  fetchByID(driverFK, dispatchId, division, eligibleDriverTrailerPKS, eligibleDriverTruckPKS) {
    return axios.post(Dispatches_CrossDB_URL + "/fetchByID/", {
      driverFK: driverFK,
      dispatchPK: dispatchId,
      division: division,
      eligibleDriverTrailerPKs: eligibleDriverTrailerPKS.join(","),
      eligibleDriverTruckPKs: eligibleDriverTruckPKS.join(","),
    });
  }
}

export default new DispatchesService();
