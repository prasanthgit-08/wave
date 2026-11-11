import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  setBrowseList,
  setLoading,
  setSelectedDispatchPK,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setSelectedDispatchPKList,
  setUnitAdditionalNotes,
  setUnitNumber,
  setRecieversMail,
  setDriverName,
  setModel,
  setUnitType,
  setSpecialCode,
  setPickupAddress,
  setPickupCity,
  setPickupState,
  setDeliveryAddress,
  setDeliveryCity,
  setDeliveryState,
} from "../../../../../../redux/Reports/UnitPickupExceptionSlice";
import OutstandingPaperworkService from "../../../../../../services/operations/OutstandingPaperworkService";
import TruncatedStringWithTooltip from "../../../../../common/TruncatedStringWithTooltip";
import UnitPickupExceptionReportService from "../../../../../../services/Reports/UnitPickupExceptionReportService";

const TableListing = () => {
  const {
    division,
    source,
    selectedBy,
    pickupYardPK,
    dispatcherPK,
    driver,
    customerPK,
    plantPK,
    dealerPK,
    userPK,
    deliveryStates,
    minimumPriority,
    showTodaysDispatches,
    showNotes,
    sortType,
    sortValue,
    pageNumber,
    pageSize,
    totalPages,
    totalElements,
    selectedDispatchPK,
    browseList,
    loading,
  } = useSelector((state) => state.unitPickupException);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrowseData();
  }, [pageNumber, sortType]);

  const fetchBrowseData = async () => {
    dispatch(setLoading(true));
    try {
      const response = await UnitPickupExceptionReportService.getUnitDetails({
        division,
        source,
        pickupYardPK,
        dispatcherPK,
        driver,
        customerPK,
        plantPK,
        deliveryStates,
        selectedBy,
        minimumPriority,
        showTodaysDispatches,
        showNotes,
        pageNumber,
        pageSize,
        sortValue,
        sortType,
      });
      if (response && response.data) {
        const data = response.data;
        const filteredList = data?.slice(0, data.length - 1);
        const paginationData = data?.filter((item) => item?.Type === "Pagination");
        dispatch(setBrowseList(filteredList || []));
        if (paginationData) {
          dispatch(setTotalPages(paginationData[0]?.TotalPages));
          dispatch(setTotalElements(paginationData[0]?.TotalElements));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRowClick = (row) => {
    const [pickupCity, pickupState] = (row?.Pickup || "").split(",").map((val) => val?.trim() || "");
    const [deliveryCity, deliveryState] = (row?.Delivery || "").split(",").map((val) => val?.trim() || "");

    dispatch(setSelectedDispatchPK(row.DispatchPK));
    dispatch(setUnitAdditionalNotes(row.Notes ? row.Notes : ""));
    dispatch(setUnitNumber(row?.UnitNum || ""));
    dispatch(setRecieversMail(row?.Recepients || ""));
    dispatch(setDriverName(row?.DriverName || ""));
    dispatch(setModel(row?.Model || ""));
    dispatch(setUnitType(row?.UT || ""));
    dispatch(setSpecialCode(row?.Spcl || ""));
    dispatch(setPickupAddress(row?.PickupName || ""));
    dispatch(setPickupCity(pickupCity || ""));
    dispatch(setPickupState(pickupState || ""));
    dispatch(setDeliveryAddress(row?.DeliveryName || ""));
    dispatch(setDeliveryCity(deliveryCity || ""));
    dispatch(setDeliveryState(deliveryState || ""));
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortType(val));
  };

  return (
    <div className="fixTableHead" style={{ height: "100%", overflow: "hidden" }}>
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th onClick={() => onhandleNormalSort("Date", !sortType)} className="f-w-600 col-1 text-nowrap">
              Dispatch
              {sortType && sortValue === "Date" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Date" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th onClick={() => onhandleNormalSort("EPU", !sortType)} className="f-w-600 col-1 text-nowrap">
              EPU
              {sortType && sortValue === "EPU" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "EPU" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              onClick={() => onhandleNormalSort("DeliverBy", !sortType)}
              className="f-w-600 col-1 text-nowrap"
            >
              Deliver By
              {sortType && sortValue === "DeliverBy" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "DeliverBy" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => onhandleNormalSort("UnitNumber", !sortType)}
              className="f-w-600 col-1 text-nowrap"
            >
              Unit Number
              {sortType && sortValue === "UnitNumber" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "UnitNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => onhandleNormalSort("SpecialCode", !sortType)}
              className="f-w-600 col-1 text-nowrap"
            >
              Special
              {sortType && sortValue === "SpecialCode" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "SpecialCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => onhandleNormalSort("UnitType", !sortType)}
              className="f-w-600 col-1 text-nowrap"
            >
              Unit Type
              {sortType && sortValue === "UnitType" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "UnitType" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th onClick={() => onhandleNormalSort("Driver", !sortType)} className="f-w-600 col-1 text-nowrap">
              Driver
              {sortType && sortValue === "Driver" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Driver" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th onClick={() => onhandleNormalSort("Phone", !sortType)} className="f-w-600 col-1 text-nowrap">
              Phone
              {sortType && sortValue === "Phone" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Phone" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              onClick={() => onhandleNormalSort("Dispatcher", !sortType)}
              className="f-w-600 col-1 text-nowrap"
            >
              Dispatcher
              {sortType && sortValue === "Dispatcher" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Dispatcher" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th onClick={() => onhandleNormalSort("Pickup", !sortType)} className="f-w-600 col-1 text-nowrap">
              Pickup
              {sortType && sortValue === "Pickup" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Pickup" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => onhandleNormalSort("Delivery", !sortType)}
              className="f-w-600 col-1 text-nowrap"
            >
              Delivery
              {sortType && sortValue === "Delivery" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Delivery" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            browseList?.map((row, index) => (
              <tr
                key={index}
                className={selectedDispatchPK === row.DispatchPK ? "tableSelected" : ""}
                onClick={() => handleRowClick(row)}
              >
                <td className="text-nowrap">{row.DispDate ? moment(row.DispDate).format("MM/DD/YY") : ""}</td>
                <td className="text-nowrap">{row.PUDate ? moment(row.PUDate).format("MM/DD/YY") : ""}</td>
                <td className="text-nowrap">
                  {row.DelByDate ? moment(row.DelByDate).format("MM/DD/YY") : ""}
                </td>
                <td className="text-nowrap">
                  <TruncatedStringWithTooltip text={row.UnitNum} charLimit={7} />
                </td>
                <td className="text-nowrap">
                  <TruncatedStringWithTooltip text={row.Spcl} charLimit={7} />
                </td>
                <td className="text-nowrap">
                  <TruncatedStringWithTooltip text={row.UT} charLimit={7} />
                </td>
                <td className="text-nowrap">
                  <TruncatedStringWithTooltip text={row.DriverName} charLimit={7} />
                </td>
                <td className="text-nowrap">
                  <TruncatedStringWithTooltip text={row.CellPhone} charLimit={7} />
                </td>
                <td className="text-nowrap">
                  <TruncatedStringWithTooltip text={row.Dispatcher} charLimit={7} />
                </td>
                <td className="text-nowrap">
                  <TruncatedStringWithTooltip text={row.Pickup} charLimit={7} />
                </td>
                <td className="text-nowrap">
                  <TruncatedStringWithTooltip text={row.Delivery} charLimit={7} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {!loading && browseList?.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}

      {loading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableListing;
