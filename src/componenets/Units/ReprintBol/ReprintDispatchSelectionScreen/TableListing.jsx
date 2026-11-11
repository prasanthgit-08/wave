import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setNormalSortValue,
  setNormalSortFlag,
  setListingData,
  setDispatchTotalElements,
  setDispatchTotalPages,
  setLoading,
  setSelectedId,
  setDriverDispatchName,
} from "../../../../redux/ReprintBolSlice";
import ReprintBolService from "../../../../services/ReprintBolService";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";
import LoadingIcon from "../../../common/LoadingIcon";

const TableListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.reprintBolReducer.loading);
  const selectedId = useSelector((state) => state.reprintBolReducer.selectedId);
  const listingData = useSelector((state) => state.reprintBolReducer.listingData);
  const dispatchPageNumber = useSelector((state) => state.reprintBolReducer.dispatchPageNumber);
  const advancedSearchPayload = useSelector((state) => state.reprintBolReducer.advancedSearchPayload);

  const showAdvancedSort = useSelector((state) => state.reprintBolReducer.showAdvancedSort);
  const advancedSortingOrder = useSelector((state) => state.reprintBolReducer.advancedSortingOrder);
  const sortFlag = useSelector((state) => state.reprintBolReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.reprintBolReducer.normalSortValue);

  const dispatchSearchTerm = useSelector((state) => state.reprintBolReducer.dispatchSearchTerm);
  const dispatchSearchCriteria = useSelector((state) => state.reprintBolReducer.dispatchSearchCriteria);
  const unitLast5 = useSelector((state) => state.reprintBolReducer.unitLast5);
  const unitType = useSelector((state) => state.reprintBolReducer.unitType);
  const orderType = useSelector((state) => state.reprintBolReducer.orderType);

  const dateFrom = useSelector((state) => state.reprintBolReducer.dateFrom);
  const dateTo = useSelector((state) => state.reprintBolReducer.dateTo);
  const unitStatus = useSelector((state) => state.reprintBolReducer.unitStatus);
  const pickupBy = useSelector((state) => state.reprintBolReducer.pickupBy);
  const deliveryBy = useSelector((state) => state.reprintBolReducer.deliveryBy);
  const showAdvancedSearch = useSelector((state) => state.reprintBolReducer.showAdvancedSearch);
  const driverId = useSelector((state) => state.reprintBolReducer.driverId);
  const rePrintBOL = useSelector((state) => state.reprintBolReducer.rePrintBOL);

  const getDispatchSelectionData = (pageSize) => {
    dispatch(setLoading(true));

    const unitSelectionRequestVO = {
      driverId: driverId || "",
      searchTerm: dispatchSearchTerm || "",
      unitNumberLast5: unitLast5 || "",
      pageNumber: dispatchPageNumber || 0,
      pageSize: 18,
      searchCriteria: dispatchSearchCriteria || "Beginning",

      unitNumber: advancedSearchPayload?.unitNumber || "",
      customer: advancedSearchPayload?.customer || "",
      pickup: advancedSearchPayload?.pickup || "",
      delivery: advancedSearchPayload?.delivery || "",
      unitType: advancedSearchPayload?.unitType || "",
      specialCode: advancedSearchPayload?.specialCode || "",

      firstField: advancedSortingOrder?.firstField || null,
      secondField: advancedSortingOrder?.secondField || null,
      thirdField: advancedSortingOrder?.thirdField || null,
      fourthField: advancedSortingOrder?.fourthField || null,
      fifthField: advancedSortingOrder?.fifthField || null,

      sortValue: sortValue || "",
      sortType: sortFlag ? 1 : 0,
      unitTypeSearchCriteria: unitType || "Both",
      orderType: orderType || "Both",
      unitStatus: unitStatus || "All",
      fromDate: dateFrom || "",
      toDate: dateTo || "",
      pickupBy: pickupBy || "Name",
      deliveryBy: deliveryBy || "Name",
    };

    ReprintBolService.fetchDispatchSelectionData(unitSelectionRequestVO)
      .then((response) => {
        const { data } = response;
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");
        const unitLists = listingData?.map((units) => ({
          ...units,
          UnitNumber: units.UnitNumber?.trim(),
        }));
        dispatch(setListingData(unitLists || []));
        if (paginationData) {
          dispatch(setDispatchTotalElements(paginationData.TotalElements));
          dispatch(setDispatchTotalPages(paginationData.TotalPages));
        }
      })
      .catch((error) => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const onhandleNormalSort = (sortValue) => {
    if (!showAdvancedSort) {
      dispatch(setNormalSortValue(sortValue));
      dispatch(setNormalSortFlag(!sortFlag));
    }
  };
  useEffect(() => {
    if (!rePrintBOL) {
      navigate("/reprint-selection-screen");
    }
  }, [rePrintBOL]);

  useEffect(() => {
    dispatch(setLoading(true));
    const debounceFunction = setTimeout(() => {
      getDispatchSelectionData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    dispatchPageNumber,
    dispatchSearchTerm,
    dispatchSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    sortFlag,
    sortValue,
    unitLast5,
    unitType,
    orderType,
    dateFrom,
    dateTo,
    unitStatus,
    pickupBy,
    deliveryBy,
  ]);

  return (
    <div /* style={{height:'810px'}} */>
      <div className="fixTableHead">
        {loading && <LoadingIcon />}
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("driver");
                }}
              >
                Driver
                {showAdvancedSort !== true && sortFlag && sortValue === "driver" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {showAdvancedSort !== true && !sortFlag && sortValue === "driver" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("unitNumber");
                }}
              >
                Unit Number
                {showAdvancedSort !== true && sortFlag && sortValue === "unitNumber" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {showAdvancedSort !== true && !sortFlag && sortValue === "unitNumber" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>

              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("pickup");
                }}
              >
                Pickup
                {showAdvancedSort !== true && sortFlag && sortValue === "pickup" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {showAdvancedSort !== true && !sortFlag && sortValue === "pickup" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("delivery");
                }}
              >
                Delivery
                {showAdvancedSort !== true && sortFlag && sortValue === "delivery" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {showAdvancedSort !== true && !sortFlag && sortValue === "delivery" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("unitType");
                }}
              >
                Unit Type
                {showAdvancedSort !== true && sortFlag && sortValue === "unitType" && (
                  <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {showAdvancedSort !== true && !sortFlag && sortValue === "unitType" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("specialCode");
                }}
                f
              >
                Special Code
                {showAdvancedSort !== true && sortFlag && sortValue === "specialCode" && (
                  <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {showAdvancedSort !== true && !sortFlag && sortValue === "specialCode" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("dispatched");
                }}
              >
                Dispatched
                {showAdvancedSort !== true && sortFlag && sortValue === "dispatched" && (
                  <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {showAdvancedSort !== true && !sortFlag && sortValue === "dispatched" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>

          <tbody>
            {loading
              ? null
              : listingData?.map((item) => (
                  <tr
                    id="rowId"
                    key={item?.DispatchPK}
                    className={selectedId === item.DispatchPK ? "tableSelected" : ""}
                    onDoubleClick={(event) => {
                      dispatch(setSelectedId(item?.DispatchPK));
                      dispatch(setDriverDispatchName(item?.DriverName));
                      setTimeout(() => {
                        navigate(`/reprint-dispatch-confirmation-screen/${item?.DispatchPK}`);
                      }, 100);
                    }}
                  >
                    <td className="f-w-600">
                      <TruncatedStringWithTooltip text={item?.DriverName} charLimit={15} />
                    </td>
                    <td className="f-w-600">
                      <TruncatedStringWithTooltip text={item?.UnitNumber} charLimit={15} />
                    </td>
                    <td className="f-w-600">
                      <TruncatedStringWithTooltip text={item?.Pickup} charLimit={15} />
                    </td>
                    <td className="f-w-600">
                      <TruncatedStringWithTooltip text={item?.Delivery} charLimit={15} />
                    </td>
                    <td className="f-w-600">
                      <TruncatedStringWithTooltip text={item?.UnitType} charLimit={15} />
                    </td>
                    <td className="f-w-600">
                      <TruncatedStringWithTooltip text={item?.SpecialCode} charLimit={15} />
                    </td>
                    <td className="f-w-600"> {item?.Dispatched ? "Yes" : "No"} </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {!loading && listingData.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )}
      </div>
    </div>
  );
};

export default TableListing;
