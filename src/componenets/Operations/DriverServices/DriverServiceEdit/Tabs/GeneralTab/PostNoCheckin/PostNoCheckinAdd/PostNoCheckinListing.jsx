import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangeColor,
  setCompanyName,
  setDateArrayIndex,
  setDispatchPK,
  setMissedDates,
} from "../../../../../../../../redux/PostNoCheckinSlice";
import TruncatedStringWithTooltip from "../../../../../../../common/TruncatedStringWithTooltip";

function PostNoCheckinListing() {
  const dispatch = useDispatch();

  const unitsLoading = useSelector((state) => state.postNoCheckinReducer.unitsLoading);
  const activeDispatchList = useSelector((state) => state.postNoCheckinReducer.activeDispatchList);
  const dispatchPK = useSelector((state) => state.postNoCheckinReducer.dispatchPK);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-500">
        <thead>
          <tr disabled>
            <th className="f-w-600 col-2">Unit Number</th>
            <th className="f-w-600 col-4">Pickup Location </th>
            <th className="f-w-600 col-4">Delivery Location </th>
            <th className="f-w-600">Today </th>
            <th className="f-w-600">Missed </th>
          </tr>
        </thead>
        {unitsLoading
          ? null
          : activeDispatchList?.length !== 0 && (
              <tbody>
                {activeDispatchList?.map((units, index) => (
                  <tr
                    id="rowId"
                    key={units.dispatchPK}
                    onClick={(event) => {
                      if (units.missed > 0) {
                        dispatch(setChangeColor(true));
                        dispatch(setDispatchPK(units.dispatchPK));
                        const dates = JSON.parse(units?.missedDates).map((item) => item.missedDate);

                        dispatch(setMissedDates(dates));
                        dispatch(setCompanyName(units.company));
                        // dispatch(setDateArrayIndex(dates.length - 1));
                        dispatch(setDateArrayIndex(0));
                      }
                    }}
                    className={dispatchPK === units.dispatchPK && units.missed > 0 ? "tableSelected" : " "}
                  >
                    <td>
                      {" "}
                      <TruncatedStringWithTooltip text={units.unitNumber} charLimit={12} />
                    </td>
                    <td>
                      {" "}
                      <TruncatedStringWithTooltip text={units.pickupByCityState} charLimit={12} />
                    </td>
                    <td>
                      {" "}
                      <TruncatedStringWithTooltip text={units.deliveryByCityState} charLimit={12} />
                    </td>
                    <td className="f-w-600">
                      <input type="checkbox" id="today" autoComplete="off" checked={units.today} disabled />
                    </td>
                    <td className="f-w-600">{units.missed} </td>
                  </tr>
                ))}
              </tbody>
            )}
      </table>
      {unitsLoading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        activeDispatchList?.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
}
export default PostNoCheckinListing;
