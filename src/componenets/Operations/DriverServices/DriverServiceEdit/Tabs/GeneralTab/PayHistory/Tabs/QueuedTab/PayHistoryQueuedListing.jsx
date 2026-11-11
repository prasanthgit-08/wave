import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DriverPayHistoryService from "../../../../../../../../../services/DriverPayHistoryService";
import {
  setCheckQueuedList,
  setTotalPagesQueuedTab,
  setTotalElementsQueuedTab,
  setPageNumberQueuedTab,
  setQueuedLoading,
} from "../../../../../../../../../redux/DriverPayHistorySlice";
import { customFormatDate } from "../../../../../../../../../utils/validation/DateFormatUtils";

function PayHistoryQueuedListing() {
  const { driverId } = useParams();
  const dispatch = useDispatch();

  const checkQueuedList = useSelector((state) => state.driverPayHistoryReducer.checkQueuedList);
  const pageNumberQueuedTab = useSelector((state) => state.driverPayHistoryReducer.pageNumberQueuedTab);
  // the Queued tab uses the same From / To dates as the Details tab
  const fromDateDetailsTab = useSelector((state) => state.driverPayHistoryReducer.fromDateDetailsTab);
  const toDateDetailsTab = useSelector((state) => state.driverPayHistoryReducer.toDateDetailsTab);
  const isFromDateValid = useSelector((state) => state.driverPayHistoryReducer.isFromDateValid);
  const isToDateValid = useSelector((state) => state.driverPayHistoryReducer.isToDateValid);
  const loading = useSelector((state) => state.driverPayHistoryReducer.queuedLoading);

  const getCheckQueuedList = (id) => {
    if (driverId && fromDateDetailsTab && toDateDetailsTab) {
      dispatch(setQueuedLoading(true));
      DriverPayHistoryService.getCheckDetailListForSelectedDriver(
        id,
        pageNumberQueuedTab,
        fromDateDetailsTab,
        toDateDetailsTab,
        "queued"
      )
        .then((response) => {
          const { data } = response;
          if (data) {
            dispatch(setCheckQueuedList(data.content || []));
            dispatch(setTotalElementsQueuedTab(data.totalElements || 0));
            dispatch(setTotalPagesQueuedTab(data.totalPages || 0));
          } else {
            dispatch(setCheckQueuedList([]));
            dispatch(setTotalElementsQueuedTab(0));
            dispatch(setTotalPagesQueuedTab(0));
          }
        })
        .catch((error) => {})
        .finally(() => {
          dispatch(setQueuedLoading(false));
        });
    }
  };
  useEffect(() => {
    /* a cleared date counts as valid, so the empty check is what drops the old records */
    if (isFromDateValid && isToDateValid && fromDateDetailsTab && toDateDetailsTab) {
      getCheckQueuedList(driverId);
    } else {
      dispatch(setCheckQueuedList([]));
      dispatch(setTotalElementsQueuedTab(0));
      dispatch(setTotalPagesQueuedTab(0));
      dispatch(setPageNumberQueuedTab(0));
    }
  }, [pageNumberQueuedTab, driverId, fromDateDetailsTab, toDateDetailsTab, isFromDateValid, isToDateValid]);

  useEffect(() => {
    dispatch(setPageNumberQueuedTab(0));
  }, [fromDateDetailsTab, toDateDetailsTab]);

  return (
    <div className="fixTableHead">
      <table className="table f-w-600">
        <thead>
          <tr>
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
          : checkQueuedList?.length !== 0 && (
              <tbody>
                {checkQueuedList?.map((checkDetail) => (
                  <tr id="rowId" key={checkDetail.checkDetailPK} className={checkDetail.color}>
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
        : checkQueuedList?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
}

export default PayHistoryQueuedListing;
