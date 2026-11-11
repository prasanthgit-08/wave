import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDriverId,
  setSortValue,
  setSortType,
  setStatewiseList,
  setNormalSortValue,
  setNormalSortFlag,
} from "../../../../../../../redux/DriverFlashSlice";
import NoRecordsMessage from "../../../../../../common/NoRecordsMessage";
function DriverFlashListing({ loader, paginatedArray }) {
  const dispatch = useDispatch();
  const { driverData, sortType, driverId } = useSelector((state) => state.driverServicesSlice);
  const formData = useSelector((state) => state.driverFlashSlice.formData);
  const statewiseList = useSelector((state) => state.driverFlashSlice.statewiseList);
  let sortValue = useSelector((state) => state.driverFlashSlice.normalSortValue);
  let sortFlag = useSelector((state) => state.driverFlashSlice.normalSortFlag);
  const [showSort, setShowSort] = useState(false);

  const renderDrivers =
    paginatedArray?.map((i, index) => {
      return (
        <tr
          className={""}
          onClick={() => {
            dispatch(setDriverId(i.stateName));
          }}
          key={index}
        >
          <td>{i.stateName}</td>
          <td>{i.units}</td>
          <td>{i.percentage}</td>
          <td>{i.lastEleven}</td>
          <td>{i.lastTwelve}</td>
        </tr>
      );
    }) || [];
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    showSort && dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
    handleSort();
  };
  const handleSort = () => {
    let sortedList = [...statewiseList].sort((a, b) => a?.stateName.localeCompare(b.stateName));
    if (sortValue === "units") {
      sortedList = [...statewiseList].sort((a, b) => a?.units - b.units);
    } else if (sortValue === "percentage") {
      sortedList = [...statewiseList].sort((a, b) => a?.percentage - b.percentage);
    } else if (sortValue === "stateName") {
      sortedList = [...statewiseList].sort((a, b) => a?.stateName.localeCompare(b.stateName));
    } else if (sortValue === "lastEleven") {
      sortedList = [...statewiseList].sort((a, b) => a?.lastEleven - b.lastEleven);
    } else if (sortValue === "lastTwelve") {
      sortedList = [...statewiseList].sort((a, b) => a?.lastTwelve - b.lastTwelve);
    }
    if (sortFlag) {
      dispatch(setStatewiseList(sortedList));
    } else {
      dispatch(setStatewiseList(sortedList.reverse()));
    }
  };
  useEffect(() => {
    handleSort();
  }, [sortValue, sortType]);

  useEffect(() => {
    dispatch(setSortValue("stateName"));
  }, []);
  useEffect(() => {
    if (statewiseList.length != 0 && !showSort) {
      setTimeout(() => {
        handleSort();
      }, 1);
    }
  }, [statewiseList]);
  useEffect(() => {
    dispatch(setStatewiseList([]));
    onhandleNormalSort("stateName", true);
    handleSort();
  }, []);
  return (
    <div className="fixTableHead border border-2 h-100 ">
      <table className="table table-striped mb-0 f-w-400">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("stateName", !sortFlag);
                setShowSort(true);
              }}
            >
              State
              {showSort && sortFlag && sortValue === "stateName" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "stateName" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-1"
              onClick={() => {
                onhandleNormalSort("units", !sortFlag);
                setShowSort(true);
              }}
            >
              Units
              {sortFlag && sortValue === "units" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "units" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              className="f-w-600 col-1"
              onClick={() => {
                onhandleNormalSort("percentage", !sortFlag);
                setShowSort(true);
              }}
            >
              Percentage
              {sortFlag && sortValue === "percentage" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "percentage" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-1"
              onClick={() => {
                onhandleNormalSort("lastEleven", !sortFlag);
                setShowSort(true);
              }}
            >
              Last 11
              {sortFlag && sortValue === "lastEleven" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "lastEleven" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-1"
              onClick={() => {
                onhandleNormalSort("lastTwelve", !sortFlag);
                setShowSort(true);
              }}
            >
              Last 12
              {sortFlag && sortValue === "lastTwelve" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "lastTwelve" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>{renderDrivers}</tbody>
      </table>
      {loader ? "" : paginatedArray?.length === 0 && <NoRecordsMessage />}
    </div>
  );
}
export default DriverFlashListing;
