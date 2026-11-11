import React, { useEffect, useState } from "react";
import LoadingText from "../../../common/LoadingText";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import EmanifestChangeRequestService from "../../../../services/EmanifestChangeRequestService";
import { useDispatch, useSelector } from "react-redux";
import {
  setListingData,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedItem,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/EmanifestChangeRequestSlice";
import { formatDatetimeToDate } from "../../../../utils/dateUtils";
import { useNavigate } from "react-router-dom";
import {
  DriverLookup_RecordsPerPage,
  EditMasterUnitSelection_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
} from "../../../../services/constants/applicationConstants";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";

const TableListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedCompanyName = useSelector((state) => state.emanifestChangeRequest.selectedCompanyName);
  const showAdvancedSearch = useSelector((state) => state.emanifestChangeRequest.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.emanifestChangeRequest.showAdvancedSort);
  const globalSearchTerm = useSelector((state) => state.emanifestChangeRequest.globalSearchTerm);
  const selectedSearchCriteria = useSelector((state) => state.emanifestChangeRequest.selectedSearchCriteria);
  const unitLast5 = useSelector((state) => state.emanifestChangeRequest.unitLast5);
  const unitType = useSelector((state) => state.emanifestChangeRequest.unitType);
  const orderType = useSelector((state) => state.emanifestChangeRequest.orderType);
  const dateType = useSelector((state) => state.emanifestChangeRequest.dateType);
  const dateFrom = useSelector((state) => state.emanifestChangeRequest.dateFrom);
  const dateTo = useSelector((state) => state.emanifestChangeRequest.dateTo);
  const unitStatus = useSelector((state) => state.emanifestChangeRequest.unitStatus);
  const pickupBy = useSelector((state) => state.emanifestChangeRequest.pickupBy);
  const deliveryBy = useSelector((state) => state.emanifestChangeRequest.deliveryBy);
  const unitOrderStatus = useSelector((state) => state.emanifestChangeRequest.unitOrderStatus);
  const unitDelayType = useSelector((state) => state.emanifestChangeRequest.unitDelayType);
  const dispatchDelayType = useSelector((state) => state.emanifestChangeRequest.dispatchDelayType);
  const selectedDispatchStatus = useSelector((state) => state.emanifestChangeRequest.selectedDispatchStatus);

  const listingData = useSelector((state) => state.emanifestChangeRequest.listingData);
  const pageNumber = useSelector((state) => state.emanifestChangeRequest.pageNumber);
  const normalSortValue = useSelector((state) => state.emanifestChangeRequest.normalSortValue);
  const normalSortFlag = useSelector((state) => state.emanifestChangeRequest.normalSortFlag);
  const advancedSearch = useSelector((state) => state.emanifestChangeRequest.advancedSearch);
  const customer = useSelector((state) => state.emanifestChangeRequest.customer);
  const delivery = useSelector((state) => state.emanifestChangeRequest.delivery);
  const pickup = useSelector((state) => state.emanifestChangeRequest.pickup);
  const specialCode = useSelector((state) => state.emanifestChangeRequest.specialCode);
  const unitNumber = useSelector((state) => state.emanifestChangeRequest.unitNumber);
  const advancedSearchObject = useSelector((state) => state.emanifestChangeRequest.advancedSearchObject);
  const advancedSearchPayload = useSelector((state) => state.emanifestChangeRequest.advancedSearchPayload);
  const advancedSortingOrder = useSelector((state) => state.emanifestChangeRequest.advancedSortingOrder);
  const advancedSortingCombination = useSelector(
    (state) => state.emanifestChangeRequest.advancedSortingCombination
  );
  const selectedItem = useSelector((state) => state.emanifestChangeRequest.selectedItem);

  const [loading, setLoading] = useState(true);

  const renderTableRows = () => {
    return (
      !loading &&
      listingData.length > 0 &&
      listingData.map((item, index) => (
        <tr
          key={index.id}
          className={item?.DispatchPK === selectedItem?.DispatchPK ? "tableSelected" : ""}
          onDoubleClick={() => {
            dispatch(setSelectedItem(item));
            setTimeout(() => {
              navigate(`/e-manifest-dispatch-confirmation-screen`);
            }, 150);
          }}
        >
          <td>{item.Driver}</td>
          <td>{item.UnitNumber}</td>
          <td>
            <TruncatedStringWithTooltip text={item.Pickup} charLimit={15} />
          </td>
          <td>
            <TruncatedStringWithTooltip text={item.Delivery} charLimit={15} />
          </td>
          <td>{item.UnitType}</td>
          <td>{item.SpecialCode}</td>
          <td>{formatDatetimeToDate(item.Dispatched, "MM/DD/YY")}</td>
        </tr>
      ))
    );
  };

  const fetch = () => {
    const selectionRequestVO = {
      pageNumber: pageNumber,
      pageSize: EditMasterUnitSelection_RecordsPerPage,
      pageSize: 17,
      searchCriteria: selectedSearchCriteria,
      searchTerm: globalSearchTerm,
      sortType: normalSortFlag,
      sortValue: normalSortValue,
      divisionParam: unitType,
      sourceParam: orderType,
      dispatchDateFrom: dateFrom,
      dispatchDateTo: dateTo,
      last5: unitLast5,
      pickupSearchType: pickupBy,
      deliverySearchType: deliveryBy,
      firstField: advancedSortingOrder?.firstField,
      secondField: advancedSortingOrder?.secondField,
      thirdField: advancedSortingOrder?.thirdField,
      fourthField: advancedSortingOrder?.fourthField,
      fifthField: advancedSortingOrder?.fifthField,
      advancedSearch: showAdvancedSearch,
      customer: advancedSearchObject?.secondField,
      delivery: advancedSearchObject?.fourthField,
      pickup: advancedSearchObject?.thirdField,
      specialCode: advancedSearchObject?.sixthField,
      unitNumber: advancedSearchObject?.firstField,
      unitType: advancedSearchObject?.fifthField,
    };

    EmanifestChangeRequestService.getEmanifestChangeRequest(selectionRequestVO)
      .then((response) => {
        setLoading(true);
        if (response && response.data) {
          const { data } = response;

          const browseData = data?.slice(0, data?.length - 1); // Slice everything except the last item
          const pagination = data?.slice(data?.length - 1); // Get only the last item (or empty array if data is empty)

          dispatch(setTotalPages(pagination[0]?.TotalPages + 1));
          dispatch(setTotalElements(pagination[0]?.TotalElements));
          dispatch(setListingData(browseData || []));

          setLoading(false);
        } else {
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetch();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    globalSearchTerm,
    selectedSearchCriteria,
    normalSortValue,
    normalSortFlag,
    pageNumber,
    unitLast5,
    unitType,
    orderType,
    pickupBy,
    deliveryBy,
    dateFrom,
    dateTo,
    advancedSearchObject,
    advancedSortingOrder,
  ]);

  const onhandleNormalSort = (value, val) => {
    if (!advancedSortingOrder) {
      dispatch(setNormalSortValue(value));
      dispatch(setNormalSortFlag(val));
    }
  };

  return (
    <div className="fixTableHead unitSelection  ">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("Driver", !normalSortFlag);
              }}
            >
              Driver
              {!showAdvancedSort && normalSortFlag && normalSortValue === "Driver" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!showAdvancedSort && !normalSortFlag && normalSortValue === "Driver" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("UnitNumber", !normalSortFlag);
              }}
            >
              Unit Number
              {!showAdvancedSort && normalSortFlag && normalSortValue === "UnitNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!showAdvancedSort && !normalSortFlag && normalSortValue === "UnitNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("Pickup", !normalSortFlag);
              }}
            >
              Pickup
              {!showAdvancedSort && normalSortFlag && normalSortValue === "Pickup" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!showAdvancedSort && !normalSortFlag && normalSortValue === "Pickup" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("Delivery", !normalSortFlag);
              }}
            >
              Delivery
              {!showAdvancedSort && normalSortFlag && normalSortValue === "Delivery" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!showAdvancedSort && !normalSortFlag && normalSortValue === "Delivery" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("UnitType", !normalSortFlag);
              }}
            >
              Unit Type
              {!showAdvancedSort && normalSortFlag && normalSortValue === "UnitType" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!showAdvancedSort && !normalSortFlag && normalSortValue === "UnitType" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("SpecialCode", !normalSortFlag);
              }}
            >
              Special Code
              {!showAdvancedSort && normalSortFlag && normalSortValue === "SpecialCode" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!showAdvancedSort && !normalSortFlag && normalSortValue === "SpecialCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("Dispatched", !normalSortFlag);
              }}
            >
              Dispatched
              {!showAdvancedSort && normalSortFlag && normalSortValue === "Dispatched" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!showAdvancedSort && !normalSortFlag && normalSortValue === "Dispatched" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      {loading ? <LoadingText /> : (!listingData || listingData?.length === 0) && <NoRecordsMessage />}
    </div>
  );
};

export default TableListing;
