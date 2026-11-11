/* eslint-disable react-hooks/exhaustive-deps */
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UnitSelectionService from "../../../services/EditMaster/UnitSelectionService";
import {
  setChangeColor,
  setListingData,
  setLoading,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
} from "../../../redux/EditMaster/UnitSelectionSlice";
import NoRecordsMessage from "../../common/NoRecordsMessage";
import LoadingText from "../../common/LoadingText";
import EditYardUnitService from "../../../services/shuttle/process/EditYardUnitService";
import { useNavigate } from "react-router-dom";
import AscendingIcon from "../../common/AscendingIcon";
import DescendingIcon from "../../common/DescendingIcon";
import moment from "moment";
import YardCheckinService from "../../../services/shuttle/process/YardCheckinService";
import EditShuttleService from "../../../services/shuttle/process/EditShuttleService";
import { UnitSelectionLookup_RecordsPerPage } from "../../../services/constants/applicationConstants";
import ShuttleInquiryService from "../../../services/shuttle/process/ShuttleInquiryService";
import UnitActivationService from "../../../services/UnitActivationService";
import EquipmentCheckInOutService from "../../../services/EquipmentCheckInOutService";
import PaperworkProcessingService from "../../../services/Invoicing/PaperworkProcessingService";
import UnitDispatchLookupService from "../../../services/UnitDispatchLookupService";
import TruncatedStringWithTooltip from "../../common/TruncatedStringWithTooltip";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  PaperworkProcessing,
  customFetchFunction,
  selectedCompanyName,
  purgeReturnUnit,
  selectedCompanyFK,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.unitSelection.loading);
  const selectedId = useSelector((state) => state.unitSelection.selectedId);
  const changeColor = useSelector((state) => state.unitSelection.changeColor);
  const listingData = useSelector((state) => state.unitSelection.listingData);
  const pageNumber = useSelector((state) => state.unitSelection.pageNumber);
  const advancedSearchObject = useSelector((state) => state.unitSelection.advancedSearchObject);
  const advancedSearchPayload = useSelector((state) => state.unitSelection.advancedSearchPayload);

  const showAdvancedSort = useSelector((state) => state.unitSelection.showAdvancedSort);
  const advancedSortingOrder = useSelector((state) => state.unitSelection.advancedSortingOrder);
  const normalSortFlag = useSelector((state) => state.unitSelection.normalSortFlag);
  const normalSortValue = useSelector((state) => state.unitSelection.normalSortValue);

  const globalSearchTerm = useSelector((state) => state.unitSelection.globalSearchTerm);
  const selectedSearchCriteria = useSelector((state) => state.unitSelection.selectedSearchCriteria);
  const unitLast5 = useSelector((state) => state.unitSelection.unitLast5);
  const unitType = useSelector((state) => state.unitSelection.unitType);
  const orderType = useSelector((state) => state.unitSelection.orderType);
  const dateType = useSelector((state) => state.unitSelection.dateType);
  const dateFrom = useSelector((state) => state.unitSelection.dateFrom);
  const dateTo = useSelector((state) => state.unitSelection.dateTo);
  const unitStatus = useSelector((state) => state.unitSelection.unitStatus);
  const pickupBy = useSelector((state) => state.unitSelection.pickupBy);
  const deliveryBy = useSelector((state) => state.unitSelection.deliveryBy);
  const unitOrderStatus = useSelector((state) => state.unitSelection.unitOrderStatus);
  const unitDelayType = useSelector((state) => state.unitSelection.unitDelayType);
  const dispatchDelayType = useSelector((state) => state.unitSelection.dispatchDelayType);
  const advancedSearchString = useSelector((state) => state.unitSelection.advancedSearchString);
  const advancedSearchByInputs = useSelector((state) => state.unitSelection.advancedSearchByInputs);
  const customerId = useSelector((state) => state.unitSelection.customerId);
  const customerPlantId = useSelector((state) => state.unitSelection.customerPlantId);
  const dealerId = useSelector((state) => state.unitSelection.dealerId);
  const companyName = useSelector((state) => state.unitSelection.companyName);

  /**
   *  Unit Selection Browse Fetch function
   **/
  const fetchUnitsForUnitDispatch = () => {
    dispatch(setLoading(true));

    if (selectedCompanyName || companyName) {
      let company = selectedCompanyName || companyName;

      UnitDispatchLookupService.getAllUnits(
        company,
        globalSearchTerm,
        selectedSearchCriteria,
        unitLast5,
        unitType,
        orderType,
        pickupBy,
        deliveryBy,
        normalSortValue,
        normalSortFlag,
        advancedSearchPayload,
        advancedSortingOrder,
        pageNumber,
        purgeReturnUnit,
        selectedCompanyFK
      )
        .then((response) => {
          const { data } = response;
          const unitLists = data.content?.map((units) => ({
            ...units,
            unitNumber: units.unitNumber?.trim(),
          }));
          dispatch(setListingData(unitLists || []));
          dispatch(setTotalElements(data.totalElements || 0));
          dispatch(setTotalPages(data.totalPages || 0));
        })
        .catch((error) => {})
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

  const onhandleNormalSort = (sortValue) => {
    if (!showAdvancedSort) {
      dispatch(setNormalSortValue(sortValue));
      dispatch(setNormalSortFlag(!normalSortFlag));
    }
  };

  /**
   * Fetch Units conditionally for differenct cases
   */
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      // Fetch Units for EditMaster
      if (MaintenanceProgram) {
        fetchUnitsForUnitDispatch();
      }

      // Fetch Units for Unit/Dispatch Lookup
      if (PaperworkProcessing) {
        fetchUnitsForUnitDispatch(UnitSelectionLookup_RecordsPerPage);
      }

      // Fetch Units using Optional Custom Fetch Function
      if (customFetchFunction) {
        customFetchFunction();
      }
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    companyName,
    pageNumber,
    globalSearchTerm,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortFlag,
    normalSortValue,
    unitLast5,
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
  ]);

  return (
    <div className="fixTableHead unitSelection">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("unitNumber");
              }}
            >
              Unit Number
              {!showAdvancedSort && normalSortValue === "unitNumber" ? (
                normalSortFlag ? (
                  <AscendingIcon />
                ) : (
                  <DescendingIcon />
                )
              ) : null}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("customerName");
              }}
            >
              Customer
              {!showAdvancedSort && normalSortValue === "customerName" ? (
                normalSortFlag ? (
                  <AscendingIcon />
                ) : (
                  <DescendingIcon />
                )
              ) : null}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("pickup");
              }}
            >
              Pickup
              {!showAdvancedSort && normalSortValue === "pickup" ? (
                normalSortFlag ? (
                  <AscendingIcon />
                ) : (
                  <DescendingIcon />
                )
              ) : null}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("delivery");
              }}
            >
              Delivery
              {!showAdvancedSort && normalSortValue === "delivery" ? (
                normalSortFlag ? (
                  <AscendingIcon />
                ) : (
                  <DescendingIcon />
                )
              ) : null}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("unitTypeDescription");
              }}
            >
              Unit Type
              {!showAdvancedSort && normalSortValue === "unitTypeDescription" ? (
                normalSortFlag ? (
                  <AscendingIcon />
                ) : (
                  <DescendingIcon />
                )
              ) : null}
            </th>
            <th className="f-w-600">Special Code</th>
          </tr>
        </thead>

        <tbody>
          {listingData?.map((unit) => (
            <tr
              id="rowId"
              key={renderItemId ? renderItemId(unit) : unit.unitPK || unit.unitShuttlePK}
              onClick={(event) => {
                handleLookupSelection(unit, event);
                dispatch(setSelectedId(renderItemId ? renderItemId(unit) : unit.unitPK));
              }}
              onDoubleClick={() => {
                dispatch(setSelectedId(renderItemId ? renderItemId(unit) : unit.unitPK));
              }}
              className={
                (renderItemId ? renderItemId(unit) : unit.unitPK) === selectedId ? "tableSelected" : ""
              }
            >
              <td className="f-w-600">{unit.unitNumber}</td>
              <td className="f-w-600">
                <TruncatedStringWithTooltip text={unit.customerName?.trim()} charLimit={25} />
              </td>
              <td className="f-w-600">
                <TruncatedStringWithTooltip
                  text={pickupBy === "City, ST" ? unit.pickupByCityState?.trim() : unit.pickupByName?.trim()}
                  charLimit={25}
                />
              </td>
              <td className="f-w-600">
                <TruncatedStringWithTooltip
                  text={
                    deliveryBy === "City, ST" ? unit.deliveryByCityState?.trim() : unit.deliveryByName?.trim()
                  }
                  charLimit={25}
                />
              </td>
              <td className="f-w-600">
                <TruncatedStringWithTooltip text={unit.unitTypeDescription?.trim()} charLimit={18} />
              </td>
              <td className="f-w-600">
                <TruncatedStringWithTooltip text={unit.specialCodeDescription?.trim()} charLimit={18} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading ? <LoadingText /> : (!listingData || listingData?.length === 0) && <NoRecordsMessage />}
    </div>
  );
};

export default TableListing;
