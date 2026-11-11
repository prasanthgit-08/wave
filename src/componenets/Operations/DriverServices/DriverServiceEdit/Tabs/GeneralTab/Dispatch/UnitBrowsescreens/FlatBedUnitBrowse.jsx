import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../../../../../../componenets/common/PaginationComponent";
import UnitBrowseFooter from "./UnitBrowseFooter";
import UnitBrowseHeader from "./UnitBrowseHeader";
import {
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPage,
  setPageNumber,
  setTotalPages,
  setHasExpiredItems,
  setShortListedTrucKMap,
  setSelectedDispatchPK,
  setRatePerMile,
  setFlatRated,
  setRateObj,
  setReloadCountWithOutbound,
  setReloadDispatchPKSWithOutbound,
  setSelectedUnitMultiLoadFK,
  setSelectedDispatchPKList,
  setIndidualUnitConfirmationVO,
  setIndividualUnitConfirmationVO,
  setIndividualUnitConfirmationVOList,
  setTotalCurrentUnitsCount,
  setIsUnitSelected,
  setFilteredDispatchPKList,
  setPreviousFilteredDispatchPKList,
  setMultiUnitsMap,
  setTotalUnitsCountRedux,
  setMultiUnitBrowseDataMap,
  setUnitBrowseMap,
  setCanOnlyDispatchTwoUnits,
  setSelectedSinglesCount,
  setIsSinglesSelectedPreviously,
  setClickedDispatchPK,
  setHasFlatbedTrailer,
  setHasCodriverOrBobtaildriverPassport,
  setCanadianPickup,
  setCanadianDelivery,
} from "../../../../../../../../redux/DispatchesSlice";
import DispatchesService from "../../../../../../../../services/DispatchesService";
import { useParams } from "react-router-dom";
import DispatchHeader from "../DriverDispatchHeader";
import NoRecordsMessage from "../../../../../../../../componenets/common/NoRecordsMessage";
import ModalComponent from "../../../../../../../common/ModalComponent";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function FlatBedUnitBrowse() {
  const dispatch = useDispatch();
  const selectedDispatchPK = useSelector((state) => state.dispatchesReducer.selectedDispatchPK);
  const pickupStateCodes = useSelector((state) => state.dispatchesReducer.pickupStateCodes);
  const isWeekendDelivery = useSelector((state) => state.dispatchesReducer.isWeekendDelivery);
  const reloadChecked = useSelector((state) => state.dispatchesReducer.reloadChecked);
  const minimumPriority = useSelector((state) => state.dispatchesReducer.minimumPriority);
  const selectedYardPK = useSelector((state) => state.dispatchesReducer.selectedYardPK);
  const selectedCustomerPK = useSelector((state) => state.dispatchesReducer.selectedCustomerPK);
  const selectedPlantPK = useSelector((state) => state.dispatchesReducer.selectedPlantPK);
  const unitNumber = useSelector((state) => state.dispatchesReducer.enteredUnitNumber);
  const driverData = useSelector((state) => state.dispatchesReducer.driverData);
  const eligibleTruckPKS = useSelector((state) => state.dispatchesReducer.eligibleTruckPKS);
  const regionStatus = useSelector((state) => state.dispatchesReducer.regionStatus);
  const divisionStatus = useSelector((state) => state.dispatchesReducer.divisionStatus);
  const pageNumber = useSelector((state) => state.dispatchesReducer.pageNumber);
  const mileageFrom = useSelector((state) => state.dispatchesReducer.mileageFrom);
  const mileageTo = useSelector((state) => state.dispatchesReducer.mileageTo);
  let selectedDispatchPKList = useSelector((state) => state.dispatchesReducer.selectedDispatchPKList);
  const selectedUnitMultiLoadFK = useSelector((state) => state.dispatchesReducer.selectedUnitMultiLoadFK);
  const sortByRatePerMile = useSelector((state) => state.dispatchesReducer.sortByRatePerMile);
  const includeSinglesChecked = useSelector((state) => state.dispatchesReducer.includeSinglesChecked);
  const includeOrphansChecked = useSelector((state) => state.dispatchesReducer.includeOrphansChecked);
  const eligibleTrailerPKS = useSelector((state) => state.dispatchesReducer.eligibleTrailerPKS);
  const individualUnitConfirmationVO = useSelector(
    (state) => state.dispatchesReducer.individualUnitConfirmationVO
  );
  const individualUnitConfirmationVOList = useSelector(
    (state) => state.dispatchesReducer.individualUnitConfirmationVOList
  );
  const reloadDispatchPKSWithOutbound = useSelector(
    (state) => state.dispatchesReducer.reloadDispatchPKSWithOutbound
  );
  let [dispatchPKList, setDispatchPKList] = useState([]);
  let multiUnitsMapVariable = new Map();
  const totalElements = useSelector((state) => state.dispatchesReducer.totalElements);
  const totalPages = useSelector((state) => state.dispatchesReducer.totalPages);
  const [unitData, setUnitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageContent, setPageContent] = useState("");
  const selectedDriverFKForDispatch = driverData?.driverPK;
  const [response, setResponse] = useState(null);
  const totalUnitsCountRedux = useSelector((state) => state.dispatchesReducer.totalUnitsCountRedux);
  let totalCurrentUnitsCount = useSelector((state) => state.dispatchesReducer.totalCurrentUnitsCount);
  let totalCurrentUnits = 0;
  let totalUnits = 0;
  let dispatchPKS = [];
  const isUnitSelected = useSelector((state) => state.dispatchesReducer.isUnitSelected);
  let previousList = null;
  let newUnitAdded = false;
  let filteredDispatchPKList = useSelector((state) => state.dispatchesReducer.filteredDispatchPKList);
  const previousFilteredDispatchPKList = useSelector(
    (state) => state.dispatchesReducer.previousFilteredDispatchPKList
  );
  let multiUnitsMap = useSelector((state) => state.dispatchesReducer.multiUnitsMap);
  let unitBrowseMap = useSelector((state) => state.dispatchesReducer.unitBrowseMap);
  let selectedSinglesCount = useSelector((state) => state.dispatchesReducer.selectedSinglesCount);
  let canOnlyDispatchTwoUnits = useSelector((state) => state.dispatchesReducer.canOnlyDispatchTwoUnits);
  const [clearedMultiUnitsMapVariable, setClearedMultiUnitsMapVariable] = useState(false);
  const [exceededTotalUnitLimit, setExceededTotalUnitLimit] = useState(false);
  const isSinglesSelectedPreviously = useSelector(
    (state) => state.dispatchesReducer.isSinglesSelectedPreviously
  );
  const clickedDispatchPK = useSelector((state) => state.dispatchesReducer.clickedDispatchPK);
  let [clickedDispatchPKDataLocal, setClickedDispatchPKDataLocal] = useState(null);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: unitData,
  };

  const fetchDispatchesForUnitBrowse = () => {
    setLoading(true);
    DispatchesService.fetchDispatchesForUnitBrowse(
      pageNumber,
      19,
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
      false,
      false,
      false
    )
      .then((response) => {
        const { data } = response;
        setResponse(response);
        if (data?.dispatchUnitBrowseData) {
          setUnitData(data?.dispatchUnitBrowseData);
        }
        dispatch(setTotalElements(data?.pagination[0]?.TotalElements));
        dispatch(setTotalPages(data?.pagination[0]?.TotalPages));
        setLoading(false);
        if (unitBrowseMap) {
          let map = new Map(unitBrowseMap);
          let multiUnitsMapVariable = new Map(multiUnitsMap);
          let selectedDispatchPKListNew = selectedDispatchPKList;
          data?.dispatchUnitBrowsedata?.forEach((data) => {
            if (!map?.has(data?.DispatchPK) && data?.MultiDispatch) {
              const containsMatchingUnitMultiLoadFK = Array.from(map.values())?.some(
                (value) => value.UnitMultiLoadFK === data?.UnitMultiLoadFK
              );
              if (containsMatchingUnitMultiLoadFK) {
                multiUnitsMapVariable.set(data?.DispatchPK, true);
                selectedDispatchPKListNew = [...selectedDispatchPKListNew, data?.DispatchPK];
              }
            }
          });
          response.data?.dispatchUnitBrowsedata?.forEach((data) => {
            if (!map?.has(data?.DispatchPK)) {
              map.set(data?.DispatchPK, data);
            }
          });
          dispatch(setUnitBrowseMap(map));
          dispatch(setSelectedDispatchPKList(selectedDispatchPKListNew));
          dispatch(setMultiUnitsMap(multiUnitsMapVariable));
        }
        dispatch(setCanOnlyDispatchTwoUnits(data?.dispatchUnitBrowseData[0]?.canOnlyDispatchTwoUnits));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDispatchesForUnitBrowse();
  }, [pageNumber]);

  useEffect(() => {}, []);

  const handleYes = () => {
    const data = unitBrowseMap?.get(clickedDispatchPK);
    if (data?.MultiDispatch) {
      dispatch(setTotalUnitsCountRedux(data?.TotalUnits));
    }
    handleOnClickNew2(data, true, true);
    setExceededTotalUnitLimit(false);
  };
  const handleNo = () => {
    setExceededTotalUnitLimit(false);
  };

  const handleMultiUnitSelection = (
    data,
    totalUnitsLocal,
    totalCurrentUnitsNew,
    initiallyAddedToMap,
    isAnyMultiUnitSelected,
    singlesSelectedBefore,
    selectedSinglesUnitCount,
    clearedMultiUnitsMapVariable
  ) => {
    if (
      ((((totalCurrentUnitsCount === null ||
        (totalUnitsLocal > 0 &&
          ((totalCurrentUnitsNew > 0 &&
            totalCurrentUnitsNew <= totalUnitsLocal &&
            !multiUnitsMap.has(data?.DispatchPK)) ||
            (totalCurrentUnitsNew === 0 &&
              totalCurrentUnitsCount !== null &&
              ((selectedDispatchPKList.length < totalUnitsLocal &&
                (data?.CurrentUnits < data?.TotalUnits ||
                  (data?.CurrentUnits === data?.TotalUnits && !singlesSelectedBefore))) ||
                (selectedDispatchPKList.length === totalUnitsLocal &&
                  data?.TotalUnits !== data?.CurrentUnits))))) ||
        (((selectedSinglesUnitCount <= 2 && divisionStatus === "flatbed") ||
          (selectedSinglesUnitCount <= 10 && divisionStatus === "popup") ||
          (selectedSinglesUnitCount <= 5 && divisionStatus === "truckCamper")) &&
          data?.MultiDispatch === false &&
          totalUnitsLocal === 0)) &&
        ((selectedDispatchPKList.length > 0 &&
          ((data?.MultiDispatch === true &&
            (data?.TotalUnits > data?.CurrentUnits ||
              ((selectedDispatchPKList.some((dispatchPK) => dispatchPK === data?.DispatchPK) ||
                !multiUnitsMap.get(data?.DispatchPK)) &&
                data?.TotalUnits === data?.CurrentUnits))) ||
            (data?.MultiDispatch === false &&
              ((selectedSinglesUnitCount <= 2 && divisionStatus === "flatbed") ||
                (selectedSinglesUnitCount <= 10 && divisionStatus === "popup") ||
                (selectedSinglesUnitCount <= 5 && divisionStatus === "truckCamper"))))) ||
          selectedDispatchPKList.length === 0)) ||
        (data?.MultiDispatch === false &&
          selectedDispatchPKList.some((dispatchPK) => (dispatchPK = data?.DispatchPK)) &&
          selectedDispatchPKList.length < totalUnitsLocal) ||
        (selectedDispatchPKList.every(
          (dispatchPK) => unitBrowseMap.get(dispatchPK)?.UnitMultiLoadFK === data?.UnitMultiLoadFK
        ) &&
          data?.CurrentUnits === data?.TotalUnits &&
          data?.MultiDispatch) ||
        selectedDispatchPKList.some(
          (dispatchPK) => dispatchPK === data?.DispatchPK && data?.MultiDispatch === false
        )) &&
        (!data?.canOnlyDispatchTwoUnits ||
          (divisionStatus === "flatbed" &&
            data?.canOnlyDispatchTwoUnits &&
            ((selectedDispatchPKList.length < 2 &&
              !selectedDispatchPKList.some((dispatchPK) => dispatchPK === data?.DispatchPK)) ||
              selectedDispatchPKList.some((dispatchPK) => dispatchPK === data?.DispatchPK)))) &&
        (totalUnitsCountRedux === 0 ||
          (totalUnitsCountRedux > 0 && !data?.MultiDispatch) ||
          (totalUnitsCountRedux > 0 &&
            data?.MultiDispatch === true &&
            ((selectedDispatchPKList.length > 0 &&
              ((selectedDispatchPKList.some(
                (dispatchPK) => unitBrowseMap.get(dispatchPK).MultiDispatch === true
              ) &&
                totalUnitsCountRedux === data?.TotalUnits) ||
                !selectedDispatchPKList.some(
                  (dispatchPK) => unitBrowseMap.get(dispatchPK).MultiDispatch === true
                ))) ||
              selectedDispatchPKList.length === 0)))) ||
      clearedMultiUnitsMapVariable
    ) {
      let selectedSinglesCountLocal = selectedSinglesCount;
      let map = unitBrowseMap
        ? new Map(unitBrowseMap)
        : new Map(response.data?.dispatchUnitBrowseData.map((item) => [item.DispatchPK, item]));
      if (unitBrowseMap) {
        response.data?.dispatchUnitBrowseData.forEach((data) => {
          map.set(data?.DispatchPK, data);
        });
      }
      dispatch(setUnitBrowseMap(map));
      let dispatchPKSWithSameUnitMultiLoadFK = [];
      ({ dispatchPKSWithSameUnitMultiLoadFK, multiUnitsMapVariable, totalUnits } =
        determineTotalUnitLimitForALoad(data, map));
      if (
        data?.MultiDispatch === false &&
        ((multiUnitsMapVariable.has(data?.DispatchPK) &&
          multiUnitsMapVariable.get(data?.DispatchPK) === false) ||
          !multiUnitsMapVariable.has(data?.DispatchPK))
      ) {
        ({ selectedSinglesCountLocal, totalCurrentUnits, multiUnitsMapVariable } =
          determineTotalCurrentlySelectedUnitsOnSelectingSinglesUnit(
            data,
            selectedSinglesCountLocal,
            isAnyMultiUnitSelected,
            clearedMultiUnitsMapVariable
          ));
      } else {
        ({ totalCurrentUnits, multiUnitsMapVariable, selectedSinglesCountLocal, totalUnits } =
          determineTotalCurrentlySelectedUnitsCountOnSelectingAnOrphan(
            data,
            dispatchPKSWithSameUnitMultiLoadFK,
            selectedSinglesCountLocal,
            clearedMultiUnitsMapVariable
          ));
      }
      if (data?.TotalUnits && data?.CurrentUnits) {
        ({ totalCurrentUnits } = setTotallySelectedUnitsCountOnSelectingACompleteLoadOrOrphan(
          data,
          dispatchPKSWithSameUnitMultiLoadFK
        ));
      }
      let isAlreadySelectedSingle = false;
      let isAlreadyDeselectedSinglesUnit = false;
      if (!multiUnitsMapVariable?.has(data?.DispatchPK)) {
        ({ initiallyAddedToMap, dispatchPKS, multiUnitsMapVariable, dispatchPKSWithSameUnitMultiLoadFK } =
          handleTheNewUnitSelection(data, initiallyAddedToMap, dispatchPKSWithSameUnitMultiLoadFK));
      } else {
        ({
          multiUnitsMapVariable,
          selectedSinglesCountLocal,
          totalCurrentUnits,
          isAlreadySelectedSingle,
          isAlreadyDeselectedSinglesUnit,
        } = handleDeselectionOfCompleteLoadOrSingles(data, selectedSinglesCountLocal));
      }
      ({ multiUnitsMapVariable, totalCurrentUnits } = handleSelectionAndDeSelectionOfSinglesAndOrphans(
        data,
        initiallyAddedToMap,
        isAlreadySelectedSingle,
        isAlreadyDeselectedSinglesUnit
      ));
      dispatch(setTotalCurrentUnitsCount(totalCurrentUnits));
      dispatch(setSelectedUnitMultiLoadFK(data?.UnitMultiLoadFK));
      dispatch(setMultiUnitsMap(multiUnitsMapVariable));
      handleUnitInfoForSelectedUnits(data, map, selectedSinglesCountLocal);
    }
  };

  const handleOnClickNew2 = (data, exceededTotalUnitLimit, clearedMultiUnitsMapVariable) => {
    let initiallyAddedToMap = false;
    let totalUnitsLocal = 0;
    let selectedSinglesUnitCount = 0;
    let isAnyMultiUnitSelected = false;
    let singlesSelectedBefore = false;
    dispatch(setCanadianPickup(data?.canadianPickup));
    dispatch(setCanadianDelivery(data?.canadianDelivery));
    dispatch(setHasCodriverOrBobtaildriverPassport(data?.hasCodriverOrBobtaildriverPassport));
    selectedDispatchPKList.forEach((DispatchPK) => {
      if (unitBrowseMap?.get(DispatchPK).MultiDispatch === false) {
        if (multiUnitsMap?.get(DispatchPK)) {
          selectedSinglesUnitCount = selectedSinglesUnitCount + 1;
          singlesSelectedBefore = true;
        }
      } else {
        totalUnitsLocal = unitBrowseMap?.get(DispatchPK).TotalUnits || 1;
        selectedSinglesUnitCount = 0;
        isAnyMultiUnitSelected = true;
      }
    });

    if (
      data?.MultiDispatch === false &&
      ((multiUnitsMap && (!multiUnitsMap?.get(data?.DispatchPK) || !multiUnitsMap?.has(data?.DispatchPK))) ||
        !multiUnitsMap)
    ) {
      selectedSinglesUnitCount = selectedSinglesUnitCount + 1;
    }
    let totalCurrentUnitsNew = 0;
    dispatch(setTotalCurrentUnitsCount(selectedDispatchPKList.length));
    if (data?.MultiDispatch === true) {
      totalUnitsLocal = data?.TotalUnits;
      isAnyMultiUnitSelected = true;
      selectedSinglesUnitCount = 0;
    }
    if (isAnyMultiUnitSelected) {
      selectedSinglesUnitCount = 0;
    }

    if (multiUnitsMap && !multiUnitsMap?.has(data?.DispatchPK)) {
      if (data?.MultiDispatch) {
        totalCurrentUnitsNew = selectedDispatchPKList.length;
        totalCurrentUnitsNew = totalCurrentUnitsNew + data?.CurrentUnits;
      } else {
        totalCurrentUnitsNew = selectedDispatchPKList.length;
        totalCurrentUnitsNew = totalCurrentUnitsNew + 1;
      }
    }
    setClickedDispatchPKDataLocal(data);
    if (
      ((totalCurrentUnitsCount !== null &&
        totalUnitsLocal > 0 &&
        selectedDispatchPKList.length > 0 &&
        ((totalCurrentUnitsNew > 0 &&
          totalCurrentUnitsNew > totalUnitsLocal &&
          !multiUnitsMap.has(data?.DispatchPK)) ||
          (totalCurrentUnitsNew === 0 &&
            selectedDispatchPKList.length >= totalUnitsLocal &&
            !multiUnitsMap.get(data?.DispatchPK) &&
            data?.CurrentUnits !== data?.TotalUnits))) ||
        (((selectedSinglesUnitCount > 2 && divisionStatus === "flatbed") ||
          (selectedSinglesUnitCount > 10 && divisionStatus === "popup") ||
          (selectedSinglesUnitCount > 5 && divisionStatus === "truckCamper")) &&
          totalUnitsLocal === 0 &&
          (!multiUnitsMap.has(data?.DispatchPK) || !multiUnitsMap.get(data?.DispatchPK)) &&
          data?.MultiDispatch === false) ||
        (selectedDispatchPKList.length > 0 &&
          data?.TotalUnits === data?.CurrentUnits &&
          data?.MultiDispatch === true &&
          !selectedDispatchPKList.some((dispatchPK) => dispatchPK === data?.DispatchPK) &&
          !selectedDispatchPKList.every(
            (dispatchPK) => unitBrowseMap.get(dispatchPK).UnitMultiLoadFK === data?.UnitMultiLoadFK
          ) &&
          (multiUnitsMap.get(data?.DispatchPK) ||
            !multiUnitsMap.has(data?.DispatchPK) ||
            (selectedSinglesUnitCount === 0 &&
              isAnyMultiUnitSelected &&
              !multiUnitsMap.get(data?.DispatchPK)))) ||
        (divisionStatus === "flatbed" &&
          data?.canOnlyDispatchTwoUnits &&
          selectedDispatchPKList.length === 2 &&
          !selectedDispatchPKList.some((dispatchPK) => dispatchPK === data?.DispatchPK)) ||
        (totalUnitsCountRedux > 0 &&
          data?.MultiDispatch === true &&
          totalUnitsCountRedux !== data?.TotalUnits &&
          selectedDispatchPKList.length > 0 &&
          selectedDispatchPKList.some(
            (dispatchPK) => unitBrowseMap.get(dispatchPK).MultiDispatch === true
          ))) &&
      !exceededTotalUnitLimit
    ) {
      setExceededTotalUnitLimit(true);
      dispatch(setClickedDispatchPK(data?.DispatchPK));
    }
    handleMultiUnitSelection(
      data,
      totalUnitsLocal,
      totalCurrentUnitsNew,
      initiallyAddedToMap,
      isAnyMultiUnitSelected,
      singlesSelectedBefore,
      selectedSinglesUnitCount,
      clearedMultiUnitsMapVariable
    );
  };

  const determineTotalUnitLimitForALoad = (data, map) => {
    let dispatchPKSWithSameUnitMultiLoadFK =
      data?.MultiDispatch === true
        ? Array.from(map.values())
            .filter((item) => item.UnitMultiLoadFK === data?.UnitMultiLoadFK)
            .map((item) => item.DispatchPK)
            .sort((a, b) => a - b)
        : [data?.DispatchPK];
    multiUnitsMapVariable = multiUnitsMap ? new Map(multiUnitsMap) : new Map(multiUnitsMapVariable);
    if ((totalUnitsCountRedux === 0 || !totalUnitsCountRedux) && data?.MultiDispatch === true) {
      dispatch(setTotalUnitsCountRedux(data?.TotalUnits));
      totalUnits = data?.TotalUnits;
    } else {
      totalUnits = totalUnitsCountRedux;
    }
    return { dispatchPKSWithSameUnitMultiLoadFK, multiUnitsMapVariable, totalUnits };
  };

  const determineTotalCurrentlySelectedUnitsOnSelectingSinglesUnit = (
    data,
    selectedSinglesCountLocal,
    isAnyMultiUnitSelected,
    clearedMultiUnitsMapVariable
  ) => {
    selectedSinglesCountLocal += 1;
    if (totalCurrentUnitsCount) {
      totalCurrentUnits = selectedDispatchPKList.length;
    } else {
      totalCurrentUnits = 0;
    }
    totalCurrentUnits += 1;
    if (
      (totalUnits > 0 && totalUnits < totalCurrentUnits) ||
      (((selectedSinglesCountLocal > 2 && divisionStatus === "flatbed") ||
        (selectedSinglesCountLocal > 10 && divisionStatus === "popup") ||
        (selectedSinglesCountLocal > 5 && divisionStatus === "truckCamper")) &&
        !isAnyMultiUnitSelected) ||
      clearedMultiUnitsMapVariable
    ) {
      totalCurrentUnits = 1;
      multiUnitsMapVariable.clear();
      selectedSinglesCountLocal = 1;
    }
    dispatch(setIsSinglesSelectedPreviously(true));
    return { selectedSinglesCountLocal, totalCurrentUnits, multiUnitsMapVariable };
  };

  const determineTotalCurrentlySelectedUnitsCountOnSelectingAnOrphan = (
    data,
    dispatchPKSWithSameUnitMultiLoadFK,
    selectedSinglesCountLocal,
    clearedMultiUnitsMapVariable
  ) => {
    totalCurrentUnits = totalCurrentUnitsCount ? selectedDispatchPKList.length : 0;
    if (
      data?.TotalUnits === data?.CurrentUnits ||
      (totalUnits > 0 && totalUnits !== data?.TotalUnits) ||
      (totalUnits > 0 && totalUnits === totalCurrentUnits) ||
      (totalUnits > 0 && totalUnits < data?.CurrentUnits + totalCurrentUnits) ||
      clearedMultiUnitsMapVariable
    ) {
      if (
        (data?.MultiDispatch === true &&
          dispatchPKSWithSameUnitMultiLoadFK.every((element) => !multiUnitsMapVariable.has(element)) &&
          selectedDispatchPKList.some(
            (dispatchPK) => unitBrowseMap.get(dispatchPK).MultiDispatch === true
          )) ||
        clearedMultiUnitsMapVariable
      ) {
        multiUnitsMapVariable.clear();
        selectedSinglesCountLocal = 0;
        dispatch(setSelectedSinglesCount(selectedSinglesCountLocal));
        dispatch(setIsSinglesSelectedPreviously(false));
      }
      if (totalUnits !== data?.TotalUnits && data?.MultiDispatch === true) {
        totalUnits = data?.TotalUnits;
        dispatch(setTotalUnitsCountRedux(data?.TotalUnits));
      }
    }
    return { totalCurrentUnits, multiUnitsMapVariable, selectedSinglesCountLocal, totalUnits };
  };

  const setTotallySelectedUnitsCountOnSelectingACompleteLoadOrOrphan = (
    data,
    dispatchPKSWithSameUnitMultiLoadFK
  ) => {
    if (data?.TotalUnits === data?.CurrentUnits) {
      totalCurrentUnits = data?.CurrentUnits;
    } else {
      if (
        !multiUnitsMapVariable?.has(data?.DispatchPK) ||
        dispatchPKSWithSameUnitMultiLoadFK?.every(
          (dispatchPK) =>
            multiUnitsMapVariable?.has(dispatchPK) && multiUnitsMapVariable?.get(dispatchPK) === false
        )
      ) {
        if (totalUnits >= data?.CurrentUnits + totalCurrentUnits) {
          totalCurrentUnits = totalCurrentUnits + data?.CurrentUnits;
        } else {
          totalCurrentUnits = data?.CurrentUnits;
        }
      }
    }
    return { totalCurrentUnits };
  };

  const handleTheNewUnitSelection = (data, initiallyAddedToMap, dispatchPKSWithSameUnitMultiLoadFK) => {
    initiallyAddedToMap = true;
    dispatchPKS = [...dispatchPKS, data?.DispatchPK];
    multiUnitsMapVariable.set(data?.DispatchPK, true);
    dispatchPKSWithSameUnitMultiLoadFK = dispatchPKSWithSameUnitMultiLoadFK.filter(
      (dispatchPK) => dispatchPK !== data?.DispatchPK
    );
    if (
      !multiUnitsMapVariable ||
      dispatchPKSWithSameUnitMultiLoadFK?.every(
        (dispatchPK) =>
          !multiUnitsMapVariable?.has(dispatchPK) || multiUnitsMapVariable?.get(dispatchPK) === false
      )
    ) {
      dispatchPKSWithSameUnitMultiLoadFK.forEach((dispatchPK) => {
        if (!multiUnitsMapVariable?.has(dispatchPK)) {
          dispatchPKS = [...dispatchPKS, dispatchPK];
          multiUnitsMapVariable.set(dispatchPK, true);
        }
      });
    }
    return { initiallyAddedToMap, dispatchPKS, multiUnitsMapVariable, dispatchPKSWithSameUnitMultiLoadFK };
  };

  const handleDeselectionOfCompleteLoadOrSingles = (data, selectedSinglesCountLocal) => {
    let isAlreadySelectedSingle = false;
    let isAlreadyDeselectedSinglesUnit = false;
    if (
      (data?.TotalUnits === data?.CurrentUnits && data?.MultiDispatch) ||
      (!data?.MultiDispatch &&
        unitBrowseMap &&
        selectedDispatchPKList.every(
          (dispatchPK) =>
            unitBrowseMap.get(dispatchPK) != null && unitBrowseMap.get(dispatchPK).MultiDispatch === false
        ))
    ) {
      if (
        multiUnitsMapVariable.has(data?.DispatchPK) &&
        multiUnitsMapVariable.get(data?.DispatchPK) === true
      ) {
        multiUnitsMapVariable.set(data?.DispatchPK, false);
        if (!data?.MultiDispatch) {
          isAlreadySelectedSingle = true;
          selectedSinglesCountLocal = selectedSinglesCountLocal - 1;
          totalCurrentUnits = totalCurrentUnits - 1;
          //dispatch(setTotalCurrentUnitsCount(totalCurrentUnits-1));
        }
      } else {
        if (
          multiUnitsMapVariable?.has(data?.DispatchPK) &&
          multiUnitsMapVariable?.get(data?.DispatchPK) === false
        ) {
          multiUnitsMapVariable.set(data?.DispatchPK, true);
          if (data?.MultiDispatch === false) {
            isAlreadyDeselectedSinglesUnit = true;
          }
          if (data?.MultiDispatch === true) {
            let dispatchPKSWithSameMultiLoadFK = Array.from(unitBrowseMap.entries())
              .filter(([key, value]) => {
                return value.UnitMultiLoadFK === data?.UnitMultiLoadFK && key !== data?.DispatchPK;
              })
              .map(([key]) => key);

            dispatchPKSWithSameMultiLoadFK.forEach((dispatchPK) =>
              multiUnitsMapVariable.set(dispatchPK, true)
            );
          }
        }
      }
    }
    return {
      multiUnitsMapVariable,
      selectedSinglesCountLocal,
      totalCurrentUnits,
      isAlreadySelectedSingle,
      isAlreadyDeselectedSinglesUnit,
    };
  };

  const handleSelectionAndDeSelectionOfSinglesAndOrphans = (
    data,
    initiallyAddedToMap,
    isAlreadySelectedSingle,
    isAlreadyDeselectedSinglesUnit
  ) => {
    if (
      ((data?.MultiDispatch === true &&
        data?.TotalUnits >= totalCurrentUnits &&
        data?.TotalUnits !== data?.CurrentUnits) ||
        (data?.MultiDispatch === false &&
          totalUnitsCountRedux > 0 &&
          totalUnitsCountRedux >= totalCurrentUnits)) &&
      !initiallyAddedToMap &&
      !isAlreadySelectedSingle &&
      !isAlreadyDeselectedSinglesUnit
    ) {
      if (
        ((multiUnitsMapVariable?.has(data?.DispatchPK) &&
          multiUnitsMapVariable?.get(data?.DispatchPK) === false) ||
          !multiUnitsMapVariable?.has(data?.DispatchPK)) &&
        data?.MultiDispatch
      ) {
        multiUnitsMapVariable.set(data?.DispatchPK, true);
      } else {
        if (!initiallyAddedToMap) {
          if (multiUnitsMapVariable?.get(data?.DispatchPK) === true) {
            multiUnitsMapVariable.set(data?.DispatchPK, false);
            totalCurrentUnits = totalCurrentUnits - 1;
          } else if (
            data?.MultiDispatch === false &&
            multiUnitsMapVariable?.get(data?.DispatchPK) === false
          ) {
            multiUnitsMapVariable.set(data?.DispatchPK, true);
          }
        }
      }
    } else {
      if (totalUnitsCountRedux === 0 && !data?.MultiDispatch && !isAlreadySelectedSingle) {
        if (multiUnitsMapVariable?.get(data?.DispatchPK) === false) {
          multiUnitsMapVariable.set(data?.DispatchPK, true);
        }
      }
    }
    return { multiUnitsMapVariable, totalCurrentUnits };
  };

  const handleUnitInfoForSelectedUnits = (data, map, selectedSinglesCountLocal) => {
    let individualUnitConfirmationVOListConst = [];
    dispatchPKS = [];
    multiUnitsMapVariable.forEach((value, key) => {
      if (value) {
        dispatchPKS.push(key);
      }
    });
    if (dispatchPKS.length > 0) {
      dispatch(setSelectedDispatchPK(dispatchPKS[0]));
    } else {
      dispatch(setSelectedDispatchPK(null));
    }
    dispatch(setSelectedDispatchPKList(dispatchPKS));
    dispatchPKS.forEach((dispatchPK) => {
      const obj = map?.get(dispatchPK);
      let halftonRateAdded = false;
      if (obj.dispatchesRateData?.halfTonAdjustmentRate) {
        halftonRateAdded = true;
      }
      dispatch(
        setIndividualUnitConfirmationVO({
          dispatchPK: dispatchPK,
          flatRated: obj.dispatchesRateData?.flatRated,
          flatRate: obj.dispatchesRateData?.flatRate,
          ratePerMile: obj.ratePerMile,
          halftonRateAdded: halftonRateAdded,
          additionalFlatRate: obj.dispatchesRateData?.driverAdditionalFlatRate,
        })
      );
      let individualUnitConfirmationVOConst = {
        dispatchPK: dispatchPK,
        flatRated: obj.dispatchesRateData?.flatRated,
        flatRate: obj.dispatchesRateData?.flatRate,
        ratePerMile: obj.ratePerMile,
        halftonRateAdded: halftonRateAdded,
        additionalFlatRate: obj.dispatchesRateData?.driverAdditionalFlatRate,
      };

      individualUnitConfirmationVOListConst.push(individualUnitConfirmationVOConst);
    });
    let multiUnitBrowseDataMap = new Map(
      dispatchPKS.filter((key) => map?.has(key)).map((key) => [key, map?.get(key)])
    );
    dispatch(setMultiUnitBrowseDataMap(multiUnitBrowseDataMap));
    dispatch(setIndividualUnitConfirmationVOList(individualUnitConfirmationVOListConst));
    dispatch(setReloadCountWithOutbound(data?.reloads));
    dispatch(setReloadDispatchPKSWithOutbound(data?.reloadDispatchPKSWithOutbound));
    dispatch(setSelectedSinglesCount(selectedSinglesCountLocal));
  };
  return (
    <div className="customMaintenanceFormWidthContainer">
      <div
        className="add-form-component customMaintenanceFormWidth   border border-dark border-2 "
        style={{ minWidth: "1800px" }}
      >
        <DispatchHeader />
        <div className="d-flex col-12 fit-heightDispatchBrowse " style={{ minHeight: "720px" }}>
          <div className="flex-grow-1">
            <div className="fixTableHead  h-100 " style={{ display: "flex", flexDirection: "column" }}>
              <table className="table border-bottom  f-w-600">
                <thead>
                  <tr>
                    <th className="f-w-600">Select</th>
                    <th className="f-w-600">Priority</th>

                    <th className="f-w-600">Unit Number</th>
                    <th className="f-w-600">Unit Type</th>
                    <th className="f-w-600">Special</th>
                    <th className="f-w-600">Pickup</th>
                    <th className="f-w-600">Delivery</th>
                    <th className="f-w-600">Deliver By</th>
                    <th className="f-w-600">Miles</th>
                    <th className="f-w-600">Rate/Mile</th>
                    <th className="f-w-600">Customer</th>
                    <th className="f-w-600">Restricted</th>
                    <th className="f-w-600">Sat Delv</th>
                    <th className="f-w-600">Sun Delv</th>
                  </tr>
                </thead>
                <tbody>
                  {unitData?.length >= 1 &&
                    unitData?.map((data, index) => (
                      <tr
                        className={
                          multiUnitsMap &&
                          multiUnitsMap?.has(data?.DispatchPK) &&
                          multiUnitsMap?.get(data?.DispatchPK) === true
                            ? "tableSelected"
                            : data?.MultiDispatch === true && data?.CurrentUnits === data?.TotalUnits
                              ? "completeload"
                              : data?.MultiDispatch === true && data?.CurrentUnits !== data?.TotalUnits
                                ? "orphan"
                                : "singles"
                        }
                        onClick={() => {}}
                        key={index}
                      >
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input p-0"
                            id=""
                            name=""
                            onClick={() => {
                              handleOnClickNew2(data, exceededTotalUnitLimit, clearedMultiUnitsMapVariable);
                            }}
                            checked={
                              multiUnitsMap &&
                              multiUnitsMap?.has(data?.DispatchPK) &&
                              multiUnitsMap?.get(data?.DispatchPK) === true
                            }
                            disabled={false}
                          />
                        </td>
                        <td>{data?.Priority}</td>
                        <td>{data?.UnitNumber}</td>
                        <td>{data?.UnitType}</td>
                        <td>{data?.Special}</td>
                        <td>{data?.Pickup}</td>
                        <td>{data?.Delivery}</td>
                        <td>{data?.DeliverBy}</td>
                        <td>{data?.Miles}</td>
                        <td>{data?.RatePerMile}</td>
                        <td>{data?.Customer}</td>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input p-0"
                            id=""
                            name=""
                            checked={data?.Restricted}
                            disabled={true}
                          />
                        </td>
                        <td style={{ minWidth: "100px" }}>
                          <input
                            type="checkbox"
                            className="form-check-input p-0"
                            id=""
                            name=""
                            checked={data?.SatDelivery}
                            disabled={true}
                          />
                        </td>
                        <td style={{ minWidth: "100px" }}>
                          <input
                            type="checkbox"
                            className="form-check-input p-0"
                            id=""
                            name=""
                            checked={data?.SunDelivery}
                            disabled={true}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading ? <LoadingIcon /> : unitData?.length === 0 && <NoRecordsMessage />}
            </div>
          </div>
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={3}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
            doubleArrowUp
            doubleArrowDown
            hideBorderBottom
            hideBorderRight
            hideBorderTop
            loading={loading}
          />
        </div>
        <UnitBrowseFooter />
        <ModalComponent
          show={exceededTotalUnitLimit}
          onHide={handleNo}
          title={"Confirm the deselection of currently selected Units"}
          body={
            totalUnitsCountRedux > 0 &&
            clickedDispatchPKDataLocal !== null &&
            clickedDispatchPKDataLocal.TotalUnits !== null &&
            totalUnitsCountRedux !== clickedDispatchPKDataLocal.TotalUnits
              ? "Units from a load of capacity " +
                totalUnitsCountRedux +
                " can not mix and match with the unit from a load of capacity " +
                clickedDispatchPKDataLocal.TotalUnits +
                ". Do you want to proceed with the deselection of currently selected units? "
              : "This unit or load  can not be selected since The Total Unit Capacity of the load can not exceed " +
                (divisionStatus === "flatbed" &&
                clickedDispatchPKDataLocal !== null &&
                clickedDispatchPKDataLocal.canOnlyDispatchTwoUnits
                  ? 2
                  : totalUnitsCountRedux === 0
                    ? clickedDispatchPKDataLocal
                      ? clickedDispatchPKDataLocal.TotalUnits
                        ? clickedDispatchPKDataLocal.TotalUnits
                        : totalCurrentUnitsCount > 0
                          ? totalCurrentUnitsCount
                          : 2
                      : 0
                    : totalUnitsCountRedux) +
                ". Do you want to proceed with the deselection of currently selected units?"
          }
          handleYES={handleYes}
          handleNO={handleNo}
        />
      </div>
    </div>
  );
}

export default FlatBedUnitBrowse;
