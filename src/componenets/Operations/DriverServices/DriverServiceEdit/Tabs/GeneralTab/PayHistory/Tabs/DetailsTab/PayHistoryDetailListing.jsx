import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DriverPayHistoryService from "../../../../../../../../../services/DriverPayHistoryService";
import {
  setCheckDetailList,
  setTotalPagesDetailsTab,
  setTotalElementsDetailsTab,
  setPageNumberDetailsTab,
  setFromDateDetailsTab,
  setToDateDetailsTab,
  setDetailLoading,
} from "../../../../../../../../../redux/DriverPayHistorySlice";
import formatDatetimeToDate from "../../../../../../../../../utils/formatDateTimeToDate";
import { customFormatDate } from "../../../../../../../../../utils/validation/DateFormatUtils";

function PayHistoryDetailListing() {
  const { driverId } = useParams();
  const dispatch = useDispatch();

  const checkDetailList = useSelector((state) => state.driverPayHistoryReducer.checkDetailList);
  const checkHeaderList = useSelector((state) => state.driverPayHistoryReducer.checkHeaderList);
  const pageNumberDetailsTab = useSelector((state) => state.driverPayHistoryReducer.pageNumberDetailsTab);
  const fromDateDetailsTab = useSelector((state) => state.driverPayHistoryReducer.fromDateDetailsTab);
  const toDateDetailsTab = useSelector((state) => state.driverPayHistoryReducer.toDateDetailsTab);
  const isFromDateValid = useSelector((state) => state.driverPayHistoryReducer.isFromDateValid);
  const isToDateValid = useSelector((state) => state.driverPayHistoryReducer.isToDateValid);
  const loading = useSelector((state) => state.driverPayHistoryReducer.detailLoading);
  const getCheckDetailList = (id) => {
    if (driverId && fromDateDetailsTab && toDateDetailsTab) {
      dispatch(setDetailLoading(true));
      DriverPayHistoryService.getCheckDetailListForSelectedDriver(
        id,
        pageNumberDetailsTab,
        fromDateDetailsTab,
        toDateDetailsTab
      )
        .then((response) => {
          const { data } = response;
          if (data) {
            dispatch(setCheckDetailList(data.content || []));
            dispatch(setTotalElementsDetailsTab(data.totalElements || 0));
            dispatch(setTotalPagesDetailsTab(data.totalPages || 0));
          } else {
            dispatch(setCheckDetailList([]));
            dispatch(setTotalElementsDetailsTab(0));
            dispatch(setTotalPagesDetailsTab(0));
          }
        })
        .catch((error) => {})
        .finally(() => {
          dispatch(setDetailLoading(false));
        });
    }
  };
  useEffect(() => {
    /* a cleared date counts as valid, so the empty check is what drops the old records */
    if (isFromDateValid && isToDateValid && fromDateDetailsTab && toDateDetailsTab) {
      getCheckDetailList(driverId);
    } else {
      dispatch(setCheckDetailList([]));
      dispatch(setTotalElementsDetailsTab(0));
      dispatch(setTotalPagesDetailsTab(0));
      dispatch(setPageNumberDetailsTab(0));
    }
  }, [pageNumberDetailsTab, driverId, fromDateDetailsTab, toDateDetailsTab, isFromDateValid, isToDateValid]);

  useEffect(() => {
    dispatch(setPageNumberDetailsTab(0));
  }, [fromDateDetailsTab, toDateDetailsTab]);

  return (
    <div className="fixTableHead">
      <table className="table f-w-600">
        <thead>
          <tr>
            <th className="f-w-600">Date Paid</th>
            <th className="f-w-600">Date Added</th>
            <th className="f-w-600">Unit Number</th>
            <th className="f-w-600">Delivery</th>
            <th className="f-w-600">Amount</th>
            <th className="f-w-600">Source</th>
            <th className="f-w-600">Detail</th>
          </tr>
        </thead>

        {loading
          ? null
          : checkDetailList?.length !== 0 && (
              <tbody>
                {checkDetailList?.map((checkDetail, index) => (
                  <tr id="rowId" key={checkDetail.checkDetailPK} className={checkDetail.color}>
                    <td className="f-w-600">{customFormatDate(checkDetail.datePaid || "")}</td>
                    <td className="f-w-600">{customFormatDate(checkDetail.dateAdded)}</td>
                    <td className="f-w-600">{checkDetail.unitNumber}</td>
                    <td className="f-w-600">{checkDetail.delivery}</td>
                    <td className="f-w-600">{checkDetail.amount}</td>
                    <td className="f-w-600">{checkDetail.source}</td>
                    <td className="f-w-600">{checkDetail.detail}</td>
                  </tr>
                ))}
              </tbody>
            )}
      </table>

      {loading
        ? ""
        : checkDetailList.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
}

export default PayHistoryDetailListing;
