import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../../../../../Templates/Screens/QuarterScreenWrapper";
import PostNoCheckinHeader from "../PostNoCheckinHeader";
import PostNoCheckinFooter from "./PostNoCheckinFooter";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostNoCheckinService from "../../../../../../../../services/operations/PostNoCheckinService";
import {
  setDriverFk,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setUnitsLoading,
} from "../../../../../../../../redux/PostNoCheckinSlice";
import moment from "moment";
import { PaginationComponent } from "../../../../../../../common/PaginationComponent";
import TruncatedStringWithTooltip from "../../../../../../../common/TruncatedStringWithTooltip";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function PostNoCheckinHistoryListing() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const unitsLoading = useSelector((state) => state.postNoCheckinReducer.historyLoading);
  const postNoCheckinHistoryList = useSelector(
    (state) => state.postNoCheckinReducer.postNoCheckinHistoryList
  );

  return (
    <div className="fixTableHead">
      {unitsLoading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600 col-3">Unit Number</th>
            <th className="f-w-600 col-4">Pickup Location </th>
            <th className="f-w-600 col-3">Delivery Location </th>
            <th className="f-w-600 col-2">Date Missed </th>
          </tr>
        </thead>

        {unitsLoading
          ? null
          : postNoCheckinHistoryList?.length !== 0 && (
              <tbody>
                {postNoCheckinHistoryList?.map((units, index) => (
                  <tr id="rowId" key={units.driverNoCheckinPK} onClick={(event) => {}}>
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
                    <td className="f-w-600">{moment(units.missedDate).format("MM/DD/YY")}</td>
                  </tr>
                ))}
              </tbody>
            )}
      </table>
      {!unitsLoading && (postNoCheckinHistoryList?.length === 0 || !postNoCheckinHistoryList) && (
        <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
}

export default PostNoCheckinHistoryListing;
