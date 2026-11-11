import React, { useEffect } from "react";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setBrowseNavigation,
  setDriverCheckinHistoryData,
  setLoader,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  setSelectedCheckinNote,
  setSelectedRecordId,
} from "../../../../../../../redux/DriverCheckinHistorySlice";
import DriverCheckinHistoryService from "../../../../../../../services/DriverCheckinHistoryService";
import moment from "moment";

function DriverCheckinHistoryListing() {
  const params = useParams();
  const driverId = params.driverId;
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.driverCheckinHistoryReducer.loader);
  const pageNumber = useSelector((state) => state.driverCheckinHistoryReducer.pageNumber);
  const driverCheckinHistoryData = useSelector(
    (state) => state.driverCheckinHistoryReducer.driverCheckinHistoryData
  );
  const selectedRecordId = useSelector((state) => state.driverCheckinHistoryReducer.selectedRecordId);

  let sortFlag = useSelector((state) => state.driverCheckinHistoryReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.driverCheckinHistoryReducer.normalSortValue);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };

  const fetchDriverCheckinHistory = () => {
    dispatch(setLoader(true));
    DriverCheckinHistoryService.getDriverCheckinHistory(pageNumber, sortValue, sortFlag, driverId)
      .then((response) => {
        const { data } = response;
        dispatch(setLoader(false));
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");
        dispatch(setDriverCheckinHistoryData(listingData));
        if (paginationData) {
          dispatch(setTotalElements(paginationData.TotalElements));
          dispatch(setTotalPages(paginationData.TotalPages));
        }
        dispatch(setSelectedCheckinNote(""));
        dispatch(setSelectedRecordId(null));
      })
      .catch((err) => {
        dispatch(setLoader(false));
      });
  };

  const handleRowClick = (driverCheckinHistory) => {
    const notes = driverCheckinHistory?.CheckInNotes || "";
    console.log("Selected record notes:", notes);
    dispatch(setSelectedCheckinNote(notes));
    dispatch(setSelectedRecordId(driverCheckinHistory?.DriverCheckInPK || null));
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchDriverCheckinHistory();
    }, 50);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [pageNumber, sortFlag, sortValue]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("CheckInDate", !sortFlag);
              }}
            >
              Date & Time
              {sortFlag && sortValue === "CheckInDate" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "CheckInDate" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("UnitNumber", !sortFlag);
              }}
            >
              Unit Number
              {sortFlag && sortValue === "UnitNumber" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "UnitNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("CityState", !sortFlag);
              }}
            >
              City, State
              {sortFlag && sortValue === "CityState" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "CityState" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("EnteredByUser", !sortFlag);
              }}
            >
              Entered By User
              {sortFlag && sortValue === "EnteredByUser" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "EnteredByUser" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loader
            ? null
            : driverCheckinHistoryData.map((driverCheckinHistory) => (
                <tr
                  key={driverCheckinHistory.DriverCheckInPK || Math.random()}
                  id="rowId"
                  className={driverCheckinHistory.DriverCheckInPK === selectedRecordId ? "tableSelected" : ""}
                  onClick={() => handleRowClick(driverCheckinHistory)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    {driverCheckinHistory?.CheckInDate
                      ? moment(driverCheckinHistory.CheckInDate).format("MM/DD/YY HH:mm:ss")
                      : ""}
                  </td>

                  <td className="f-w-600">{driverCheckinHistory.UnitNumber}</td>

                  <td>{driverCheckinHistory.CityState}</td>
                  <td className="f-w-600">{driverCheckinHistory.EnteredByUser}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader ? (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        driverCheckinHistoryData.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
}

export default DriverCheckinHistoryListing;
