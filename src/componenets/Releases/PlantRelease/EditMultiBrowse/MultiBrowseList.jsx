import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setMultiUnitDelay,
  setMultiUnitRelease,
  setPageNumber,
  setBrowseData,
  setTotalPages,
  setTotalElements,
  setLoading,
} from "../../../../redux/PlantReleaseSlice";
import { useNavigate } from "react-router-dom";
import PlantReleaseService from "../../../../services/PlantReleaseService";
import moment from "moment";

const MultiBrowseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const browseData = useSelector((state) => state.plantReleaseReducer.browseData);
  const viewOnly = useSelector((state) => state.plantReleaseReducer.viewOnly);
  const outbound = useSelector((state) => state.plantReleaseReducer.outbound);
  const reload = useSelector((state) => state.plantReleaseReducer.reload);
  const motorized = useSelector((state) => state.plantReleaseReducer.motorized);
  const towable = useSelector((state) => state.plantReleaseReducer.towable);
  const sortByLast5 = useSelector((state) => state.plantReleaseReducer.sortByLast5);
  const customerId = useSelector((state) => state.plantReleaseReducer.customerId);
  const date1 = useSelector((state) => state.plantReleaseReducer.date1);
  const date2 = useSelector((state) => state.plantReleaseReducer.date2);
  const plantId = useSelector((state) => state.plantReleaseReducer.plantId);

  const yardId = useSelector((state) => state.plantReleaseReducer.yardId);

  const pageNumber = useSelector((state) => state.plantReleaseReducer.pageNumber);
  const unreleased = useSelector((state) => state.plantReleaseReducer.unreleased);
  const released = useSelector((state) => state.plantReleaseReducer.released);
  const all = useSelector((state) => state.plantReleaseReducer.all);
  const plantCustomerId = useSelector((state) => state.plantReleaseReducer.plantCustomerId);

  const checkMultiBrowseData = (e) => {
    dispatch(setLoading(true));
    PlantReleaseService.checkMulibrowseRelease(
      reload,
      outbound,
      towable,
      motorized,
      sortByLast5,
      pageNumber,
      customerId,
      plantId,
      yardId,
      date1,
      date2,
      unreleased,
      released,
      all,
      plantCustomerId
    )
      .then((response) => {
        const data = response?.data;

        dispatch(setBrowseData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => dispatch(setLoading(false)));
  };
  const changedArray = browseData?.filter(
    (item) =>
      (item.plantRelease === true && item.alreadyReleased === false) ||
      (item.plantRelease === false && item.alreadyReleased === true) ||
      (item.unitOnShuttleDelay === false && item.alreadyDelayed === true) ||
      (item.unitOnShuttleDelay === true && !item.alreadyDelayed)
  );

  useEffect(() => {
    if (browseData?.length === 0) {
      navigate("/plant-release-selection-screen");
    }
  }, [browseData]);

  useEffect(() => {
    if (
      (unreleased || released || all) &&
      (pageNumber ||
        reload === true ||
        towable == true ||
        outbound == true ||
        motorized === true ||
        yardId !== "" ||
        date1 !== "" ||
        date2 !== "" ||
        plantCustomerId !== "" ||
        customerId != "" ||
        plantId != "" ||
        sortByLast5)
    ) {
      checkMultiBrowseData();
    }
  }, [
    reload,
    yardId,
    date1,
    date2,
    motorized,
    towable,
    outbound,
    pageNumber,
    customerId,
    plantId,
    unreleased,
    released,
    all,
    sortByLast5,
    plantCustomerId,
  ]);
  return (
    <div className="fixTableHead ">
      <div>
        <table className="table table-striped f-w-600 mb-0">
          <thead>
            <tr disabled>
              <th className="f-w-600">Release</th>
              <th className="f-w-600">Delay</th>
              <th className="f-w-600">Unit Number</th>
              <th className="f-w-600">Customer</th>
              <th className="f-w-600">Plant</th>
              <th className="f-w-600">Unit Type</th>
              <th className="f-w-600">Special</th>
              <th className="f-w-600">Yard</th>
              <th className="f-w-600">Dealer</th>
              <th className="f-w-600">Date</th>
              <th className="f-w-600">Miles</th>
            </tr>
          </thead>
          <tbody>
            {browseData?.map((item, index) => (
              <tr
                id="rowId"
                key={item.unitPK}
                className={`${item.alreadyDelayed ? "alreadyDelayed" : ""} ${
                  item.alreadyReleased ? "alreadyReleased" : ""
                }`}
              >
                <td className="f-w-600">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="multiUnitRelease"
                    name="multiUnitRelease"
                    checked={item.plantRelease}
                    disabled={viewOnly || item.unitOnShuttleDelay}
                    onChange={(e) => dispatch(setMultiUnitRelease(index))}
                  />
                </td>
                <td className="f-w-600">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="multiUnitDelay"
                    name="multiUnitDelay"
                    checked={item.unitOnShuttleDelay}
                    disabled={viewOnly || item.plantRelease}
                    onChange={(e) => dispatch(setMultiUnitDelay(index))}
                  />
                </td>
                <td className="f-w-600">{item.unitNumber}</td>
                <td className="f-w-600">{item.customerName}</td>
                <td className="f-w-600">{item.pickupCustPlantName}</td>
                <td className="f-w-600">{item.unitTypeName}</td>
                <td className="f-w-600">{item.specialCode}</td>
                <td className="f-w-600">{item.pickUpYardName}</td>
                <td className="f-w-600">{item.pickupDealerName}</td>
                <td className="f-w-600">{moment(item.orderDate.split("T")[0]).format("MM/DD/YY")}</td>
                <td className="f-w-600">{item.invoiceMiles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MultiBrowseList;
