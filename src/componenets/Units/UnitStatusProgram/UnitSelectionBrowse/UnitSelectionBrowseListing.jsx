import React, { useEffect, useState } from "react";
import UnitStatusService from "../../../../services/Units/UnitStatusService";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { useDispatch, useSelector } from "react-redux";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";
import { t } from "i18next";
import {
  setBrowseNormalSortFlag,
  setBrowseNormalSortValue,
  setBrowsePageNumber,
  setBrowseTotalElements,
  setBrowseTotalPages,
  setChangeColor,
  setSelectedId,
  setUnitSelectionData,
  setLoading,
  resetUnitStatusInnerStatesCancel,
  setUnitStatus,
  setOrderType,
  setUnitType,
  setUnitShuttleDetailData,
} from "../../../../redux/UnitStatus/UnitStatusSlice";
import { useLocation, useNavigate } from "react-router-dom";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import LoadingText from "../../../common/LoadingText";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";
import { setDefaultsApplied, setRePrintBOL } from "../../../../redux/ReprintBolSlice";
import useDebouncer from "../../../../hooks/useDebouncer";
import LoadingIcon from "../../../common/LoadingIcon";

function UnitSelectionBrowseListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const browsePageNumber = useSelector((state) => state.unitStatusReducer.browsePageNumber);
  const unitSelectionData = useSelector((state) => state.unitStatusReducer.unitSelectionData);
  const browseNormalSortFlag = useSelector((state) => state.unitStatusReducer.browseNormalSortFlag);
  const browseNormalSortValue = useSelector((state) => state.unitStatusReducer.browseNormalSortValue);

  const loading = useSelector((state) => state.unitStatusReducer.loading);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const advancedSearchPayload = useSelector((state) => state.unitStatusReducer.advancedSearchPayload);

  const showAdvancedSort = useSelector((state) => state.unitStatusReducer.showAdvancedSort);
  const advancedSortingOrder = useSelector((state) => state.unitStatusReducer.advancedSortingOrder);
  const normalSortFlag = useSelector((state) => state.unitStatusReducer.normalSortFlag);
  const normalSortValue = useSelector((state) => state.unitStatusReducer.normalSortValue);

  const globalSearchTerm = useSelector((state) => state.unitStatusReducer.globalSearchTerm);
  const selectedSearchCriteria = useSelector((state) => state.unitStatusReducer.selectedSearchCriteria);
  const unitLast5 = useSelector((state) => state.unitStatusReducer.unitLast5);
  const unitType = useSelector((state) => state.unitStatusReducer.unitType);
  const orderType = useSelector((state) => state.unitStatusReducer.orderType);
  const dateType = useSelector((state) => state.unitStatusReducer.dateType);

  const dateFrom = useSelector((state) => state.unitStatusReducer.dateFrom);
  const dateTo = useSelector((state) => state.unitStatusReducer.dateTo);
  const unitStatus = useSelector((state) => state.unitStatusReducer.unitStatus);
  const pickupBy = useSelector((state) => state.unitStatusReducer.pickupBy);
  const deliveryBy = useSelector((state) => state.unitStatusReducer.deliveryBy);
  const unitOrderStatus = useSelector((state) => state.unitStatusReducer.unitOrderStatus);
  const unitDelayType = useSelector((state) => state.unitStatusReducer.unitDelayType);
  const dispatchDelayType = useSelector((state) => state.unitStatusReducer.dispatchDelayType);
  const delayedUnitType = useSelector((state) => state.unitStatusReducer.delayedUnitType);
  const advancedSearchString = useSelector((state) => state.unitStatusReducer.advancedSearchString);
  const advancedSearchByInputs = useSelector((state) => state.unitStatusReducer.advancedSearchByInputs);
  const customerId = useSelector((state) => state.unitStatusReducer.customerId);
  const customerPlantId = useSelector((state) => state.unitStatusReducer.customerPlantId);
  const dealerId = useSelector((state) => state.unitStatusReducer.dealerId);
  const selectedDispatchStatus = useSelector((state) => state.unitStatusReducer.selectedDispatchStatus);
  const selectedCompanyName = useSelector((state) => state.unitStatusReducer.selectedCompanyName);
  const selectedCompanyPK = useSelector((state) => state.unitStatusReducer.companyPK);
  const changeColor = useSelector((state) => state.unitStatusReducer.changeColor);
  const advancedSearchObject = useSelector((state) => state.unitStatusReducer.advancedSearchObject);
  const rePrint = localStorage.getItem("rePrintBOL");
  const rePrintBOL = useSelector((state) => state.reprintBolReducer.rePrintBOL);
  const bolFor = useSelector((state) => state.reprintBolReducer.bolFor);
  const defaultsApplied = useSelector((state) => state.reprintBolReducer.defaultsApplied);
  const companyName = useSelector((state) => state.unitStatusReducer.companyName);
  const fetchUnitsData = () => {
    const unitSelectionRequestVO = {
      unitSelection: true,
      type: "Lookup",
      searchTerm: globalSearchTerm,
      unitNumberLast5: unitLast5,
      pageNumber: browsePageNumber,
      pageSize: 18,
      searchCriteria: selectedSearchCriteria,

      unitNumber: advancedSearchObject?.firstField,
      customer: advancedSearchObject?.secondField,
      pickup: advancedSearchObject?.thirdField,
      delivery: advancedSearchObject?.fourthField,
      unitType: advancedSearchObject?.fifthField,
      specialCode: advancedSearchObject?.sixthField,

      firstField: advancedSortingOrder?.firstField,
      secondField: advancedSortingOrder?.secondField,
      thirdField: advancedSortingOrder?.thirdField,
      fourthField: advancedSortingOrder?.fourthField,
      fifthField: advancedSortingOrder?.fifthField,
      sortValue: browseNormalSortValue,
      sortType: browseNormalSortFlag,
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
      pars: advancedSearchByInputs?.pars,
      bolNumber: advancedSearchByInputs?.bolNumber,
      vin: advancedSearchByInputs?.vin,
      stockNumber: advancedSearchByInputs?.stockNumber,
      projectCode: advancedSearchByInputs?.projectCode,
      poNumber: advancedSearchByInputs?.poNumber,
      serialNumber: advancedSearchByInputs?.serialNumber,
      model: advancedSearchByInputs?.model,
      invoiceNumber: advancedSearchByInputs?.invoiceNumber,
      companyName: companyName,
      customerId: customerId,
      customerPlantsId: customerPlantId,
      dealerId: dealerId,
      shuttleBrowse: bolFor === "shuttle" ? true : false,
    };
    // setLoader(true);
    dispatch(setLoading(true));
    UnitStatusService.getUnitSelectionLookUp(unitSelectionRequestVO)
      .then((response) => {
        const { data } = response;
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");
        dispatch(setUnitSelectionData(listingData));
        if (paginationData) {
          dispatch(setBrowseTotalElements(paginationData.TotalElements));
          dispatch(setBrowseTotalPages(paginationData.TotalPages));
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error("Error fetching unit selection data:", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const debounceFetch = useDebouncer(() => fetchUnitsData(), 500);

  useEffect(() => {
    if (!unitStatus && !orderType && !unitType && !companyName) return;
    dispatch(setLoading(true));
    debounceFetch();
  }, [
    browsePageNumber,
    browseNormalSortFlag,
    browseNormalSortValue,
    globalSearchTerm,
    unitLast5,
    selectedSearchCriteria,
    unitType,
    orderType,
    dateFrom,
    dateTo,
    unitDelayType,
    unitOrderStatus,
    dateType,
    dispatchDelayType,
    unitStatus,
    unitOrderStatus,
    pickupBy,
    deliveryBy,
    advancedSearchString,
    advancedSearchByInputs,
    advancedSortingOrder,
    advancedSearchPayload,
    customerId,
    customerPlantId,
    dealerId,
    companyName,
    bolFor,
  ]);

  /******Set the Filter Radio buttons based on the Selection */
  useEffect(() => {
    // set default unitStatus on load based on flags
    if (rePrintBOL && !defaultsApplied) {
      if (bolFor === "shuttle") {
        dispatch(setUnitStatus("Unreleased"));
        dispatch(setOrderType("Outbound"));
        dispatch(setUnitType("Towable"));
      } else if (bolFor === "Units") {
        dispatch(setUnitStatus("Active"));
        dispatch(setOrderType("Both"));
        dispatch(setUnitType("Both"));
      }
      // mark defaults as applied
      dispatch(setDefaultsApplied(true));
    }
  }, [rePrintBOL, bolFor, defaultsApplied]);

  const onhandleNormalSort = (value, val) => {
    if (!showAdvancedSort) {
      dispatch(setBrowseNormalSortValue(value));

      dispatch(setBrowseNormalSortFlag(val));
    }
  };

  /*****
   * Used to navigate to rePrintBOL
   * selection screen if it is navigated from the Reprint program
   * *****/
  useEffect(() => {
    if (location.pathname === "/unit-status-selection-reprint" && rePrintBOL === false) {
      navigate(`/reprint-selection-screen`);
    }
  }, []);

  return (
    <div className="fixTableHead unitSelection">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-1"
              onClick={() => {
                onhandleNormalSort("EntryDate", !browseNormalSortFlag);
              }}
            >
              Date
              {browseNormalSortFlag && browseNormalSortValue === "EntryDate" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!browseNormalSortFlag && browseNormalSortValue === "EntryDate" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("UnitNumber", !browseNormalSortFlag);
              }}
            >
              Unit Number
              {browseNormalSortFlag && browseNormalSortValue === "UnitNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!browseNormalSortFlag && browseNormalSortValue === "UnitNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-1.5"
              onClick={() => {
                onhandleNormalSort("customer", !browseNormalSortFlag);
              }}
            >
              Customer
              {browseNormalSortFlag && browseNormalSortValue === "customer" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!browseNormalSortFlag && browseNormalSortValue === "customer" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-1.5"
              onClick={() => {
                onhandleNormalSort("pickup", !browseNormalSortFlag);
              }}
            >
              Pickup
              {browseNormalSortFlag && browseNormalSortValue === "pickup" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!browseNormalSortFlag && browseNormalSortValue === "pickup" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-1.5"
              onClick={() => {
                onhandleNormalSort("delivery", !browseNormalSortFlag);
              }}
            >
              Delivery
              {browseNormalSortFlag && browseNormalSortValue === "delivery" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!browseNormalSortFlag && browseNormalSortValue === "delivery" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-1.5"
              onClick={() => {
                onhandleNormalSort("unitType", !browseNormalSortFlag);
              }}
            >
              Unit Type
              {browseNormalSortFlag && browseNormalSortValue === "unitType" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!browseNormalSortFlag && browseNormalSortValue === "unitType" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th className="f-w-600 col-1.5">Special Code</th>
          </tr>
        </thead>
        <tbody>
          {unitSelectionData.length >= 1 &&
            unitSelectionData.map((unitSelectionData) => (
              <tr
                id="rowId"
                key={unitSelectionData.UnitPK}
                onClick={() => dispatch(setChangeColor(false))}
                onDoubleClick={() => {
                  dispatch(setSelectedId(unitSelectionData.UnitPK));
                  //   dispatch(setViewDetail(true));
                  dispatch(resetUnitStatusInnerStatesCancel());
                  dispatch(setChangeColor(true));
                  dispatch(setUnitShuttleDetailData(null));
                  setTimeout(() => {
                    if (rePrintBOL) {
                      navigate(`/reprint-unit-confirmation-screen/${unitSelectionData.UnitPK}`);
                    } else {
                      navigate(`/unit-status-detail-page/${unitSelectionData.UnitPK}/${browsePageNumber}`);
                    }
                  }, 100);
                }}
                className={`${Number(unitSelectionData.UnitPK) === Number(selectedId) ? "tableSelected" : ""}`}
              >
                <td className="f-w-600">{customFormatDate(unitSelectionData.EntryDate)}</td>
                <td>
                  <TruncatedStringWithTooltip text={unitSelectionData.UnitNumber} charLimit={15} />
                </td>
                <td>
                  <TruncatedStringWithTooltip text={unitSelectionData.Customer} charLimit={15} />
                </td>
                <td>
                  <TruncatedStringWithTooltip text={unitSelectionData.Pickup} charLimit={15} />
                </td>
                <td>
                  <TruncatedStringWithTooltip text={unitSelectionData.Delivery} charLimit={15} />
                </td>
                <td>
                  <TruncatedStringWithTooltip text={unitSelectionData.UnitType} charLimit={15} />
                </td>
                <td>
                  <TruncatedStringWithTooltip text={unitSelectionData.SpecialCode} charLimit={15} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {loading
        ? ""
        : (!unitSelectionData ||
            unitSelectionData?.length === 0) /*  || !unitList || unitList?.length === 0 */ && (
            <NoRecordsMessage />
          )}
    </div>
  );
}

export default UnitSelectionBrowseListing;
