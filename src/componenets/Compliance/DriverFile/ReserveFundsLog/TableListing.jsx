import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  setBeginningDate,
  setEndDate,
  setListingData,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
  updateField,
} from "../../../../redux/ReserveFundsLogSlice";
import formatDatetimeToDate from "../../../../utils//formatDateTimeToDate";
import LoadingText from "../../../common/LoadingText";
import ReserveFundsLogService from "../../../../services/ReserveFundsLogService";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";
import useDebouncer from "../../../../hooks/useDebouncer";

const TableListing = () => {
  const [loading, setLoading] = useState(true);
  const { driverId } = useParams();
  const dispatch = useDispatch();

  const listingData = useSelector((state) => state.reserveFundsLog.listingData);
  const sortValue = useSelector((state) => state.reserveFundsLog.sortValue);
  const sortFlag = useSelector((state) => state.reserveFundsLog.sortFlag);
  const pageNumber = useSelector((state) => state.reserveFundsLog.pageNumber);
  const beginningDate = useSelector((state) => state.reserveFundsLog.beginningDate);
  const endDate = useSelector((state) => state.reserveFundsLog.endDate);
  const editFormData = useSelector((state) => state.driverMaintenanceReducer.editFormData);
  const isBeginningDateValid = useSelector((state) => state.reserveFundsLog.isBeginningDateValid);
  const isEndDateValid = useSelector((state) => state.reserveFundsLog.isEndDateValid);
  const description = useSelector((state) => state.reserveFundsLog.description);
  const reserveFundId = useSelector((state) => state.reserveFundsLog.reserveFundId);

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const fetchData = () => {
    setLoading(true); // Start loading before API call
    ReserveFundsLogService.getReserveFundLogRecords(
      pageNumber,
      sortValue,
      sortFlag,
      driverId,
      null,
      beginningDate,
      endDate,
      reserveFundId ? description : ""
    )
      .then((response) => {
        if (response && response.data) {
          const { data } = response;
          const browseData = data?.slice(0, data?.length - 1); // Slice everything except the last item
          const pagination = data?.slice(data?.length - 1); // Get only the last item (or empty array if data is empty)
          updateData("totalPages", pagination[0]?.TotalPages);
          updateData("totalElements", pagination[0]?.TotalElements);
          updateData("listingData", browseData || []);

          setLoading(false);
        } else {
          console.error("Unexpected API response format:", response);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onhandleNormalSort = (value, val) => {
    updateData("sortValue", value);
    updateData("sortFlag", val);
  };

  useEffect(() => {
    if (!isEndDateValid || !isBeginningDateValid) {
      updateData("listingData", []);
      updateData("totalPages", 0);
      updateData("totalElements", 0);
    }
    if (
      !endDate ||
      !beginningDate ||
      !editFormData ||
      !(isEndDateValid && endDate) ||
      !(isBeginningDateValid && beginningDate)
    )
      return;
    debounceFetchTableData();
  }, [
    pageNumber,
    sortValue,
    sortFlag,
    beginningDate,
    endDate,
    isBeginningDateValid,
    isEndDateValid,
    beginningDate,
    reserveFundId,
  ]);

  const debounceFetchTableData = useDebouncer(fetchData, 300);

  useEffect(() => {
    dispatch(setBeginningDate(editFormData?.hireDate || new Date()));
    dispatch(setEndDate(new Date()));
  }, [editFormData?.hireDate]);

  return (
    <div className="fixTableHead border border-dark border-1" style={{ height: "444px" }}>
      <table className={`table table-striped f-w-600`}>
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("AddDate", !sortFlag);
              }}
            >
              Date
              {sortFlag && sortValue === "AddDate" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "AddDate" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("Description", !sortFlag);
              }}
            >
              Description
              {sortFlag && sortValue === "Description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("Source", !sortFlag);
              }}
            >
              Source
              {sortFlag && sortValue === "Source" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Source" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-1.5"
              onClick={() => {
                onhandleNormalSort("Amount", !sortFlag);
              }}
            >
              Amount
              {sortFlag && sortValue === "Amount" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Amount" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-1.5"
              onClick={() => {
                onhandleNormalSort("Prepaid", !sortFlag);
              }}
            >
              Prepaid
              {sortFlag && sortValue === "Prepaid" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Prepaid" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-1.5"
              onClick={() => {
                onhandleNormalSort("Reserved", !sortFlag);
              }}
            >
              Reserved
              {sortFlag && sortValue === "Reserved" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Reserved" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-1.5"
              onClick={() => {
                onhandleNormalSort("OwnerDriverFK", !sortFlag);
              }}
            >
              Owner
              {sortFlag && sortValue === "OwnerDriverFK" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "OwnerDriverFK" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? null
            : listingData?.length >= 1 &&
              listingData?.map((data) => (
                <tr id="rowId">
                  <td className="f-w-600">{formatDatetimeToDate(data?.AddDate, "MM/DD/YY")}</td>
                  <td className="f-w-600">
                    <TruncatedStringWithTooltip text={data?.Description} charLimit={15} />{" "}
                  </td>
                  <td className="f-w-600">
                    <TruncatedStringWithTooltip text={data?.Source} charLimit={15} />{" "}
                  </td>
                  <td className="f-w-600">{data?.Amount} </td>
                  <td className="f-w-600">{data?.Prepaid} </td>
                  <td className="f-w-600">{data?.Reserved} </td>
                  <td className="f-w-600">{data?.OwnerDriverFK} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading
        ? ""
        : listingData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
      {loading && <LoadingText />}
    </div>
  );
};

export default TableListing;
