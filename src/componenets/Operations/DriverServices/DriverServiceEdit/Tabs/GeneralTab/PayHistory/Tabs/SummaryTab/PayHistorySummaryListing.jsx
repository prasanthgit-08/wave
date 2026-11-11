import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCheckHeaderList,
  setDriverId,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setFromDate,
  setToDate,
  setLoading,
} from "../../../../../../../../../redux/DriverPayHistorySlice";
import formatDatetimeToDate from "../../../../../../../../../utils/formatDateTimeToDate";
import { customFormatDate } from "../../../../../../../../../utils/validation/DateFormatUtils";
import DriverPayHistoryService from "../../../../../../../../../services/DriverPayHistoryService";

function PayHistorySummaryListing() {
  const { driverId } = useParams();
  const dispatch = useDispatch();

  const checkHeaderList = useSelector((state) => state.driverPayHistoryReducer.checkHeaderList);
  const pageNumber = useSelector((state) => state.driverPayHistoryReducer.pageNumber);
  const fromDate = useSelector((state) => state.driverPayHistoryReducer.fromDate);
  const toDate = useSelector((state) => state.driverPayHistoryReducer.toDate);
  const isFromDateValid = useSelector((state) => state.driverPayHistoryReducer.isFromDateValid);
  const isToDateValid = useSelector((state) => state.driverPayHistoryReducer.isToDateValid);
  const loading = useSelector((state) => state.driverPayHistoryReducer.loading);
  const loader = useSelector((state) => state.driverPayHistoryReducer.dateLoading);

  const getCheckHeaderList = (id) => {
    if (id && fromDate && toDate) {
      dispatch(setLoading(true));
      DriverPayHistoryService.getCheckHeaderListForSelectedDriver(id, pageNumber, fromDate, toDate)
        .then((response) => {
          const { data } = response;
          if (data) {
            dispatch(setCheckHeaderList(data.content || []));
            dispatch(setTotalElements(data.totalElements || 0));
            dispatch(setTotalPages(data.totalPages || 0));
          } else {
            dispatch(setCheckHeaderList([]));
            dispatch(setTotalElements(0));
            dispatch(setTotalPages(0));
          }
        })
        .catch((error) => {})
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };
  useEffect(() => {
    /* the header fetches the dates with this id, so it has to be set even before any date exists */
    dispatch(setDriverId(driverId));
    /* a cleared date counts as valid, so the empty check is what drops the old records */
    if (isFromDateValid && isToDateValid && fromDate && toDate) {
      getCheckHeaderList(driverId);
    } else {
      dispatch(setCheckHeaderList([]));
      dispatch(setTotalElements(0));
      dispatch(setTotalPages(0));
      dispatch(setPageNumber(0));
    }
  }, [pageNumber, driverId, fromDate, toDate, isFromDateValid, isToDateValid]);

  useEffect(() => {
    dispatch(setPageNumber(0));
  }, [fromDate, toDate]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600 ">Date Paid</th>
            <th className="f-w-600">Amount</th>
            <th className="f-w-600">Check Number</th>
            <th className="f-w-600">Debit Card Status</th>
          </tr>
        </thead>

        {loading
          ? null
          : checkHeaderList?.length !== 0 && (
              <tbody>
                {checkHeaderList?.map((checkHeader, index) => (
                  <tr id="rowId" key={checkHeader.checkHeaderPK}>
                    <td className="f-w-600">{customFormatDate(checkHeader.checkDate)}</td>
                    <td className="f-w-600">{checkHeader.checkAmount}</td>
                    <td className="f-w-600">
                      {checkHeader?.debitCardDetailFK === null ? checkHeader?.checkNumber : ""}
                    </td>
                    <td className="f-w-600">
                      {checkHeader?.debitCardDetailFK === null
                        ? ""
                        : checkHeader?.debitCardDetail?.status === null
                          ? "Not yet sent"
                          : checkHeader?.debitCardDetail?.status === "S"
                            ? "Sent. Waiting on confirmation."
                            : checkHeader?.debitCardDetail?.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
      </table>
      {loading || loader
        ? ""
        : checkHeaderList?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
}

export default PayHistorySummaryListing;
