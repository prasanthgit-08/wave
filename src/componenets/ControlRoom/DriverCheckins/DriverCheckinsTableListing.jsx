import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLastCheckinEntryDate,
  setListingData,
  setSortType2,
  setSortValue2,
} from "../../../redux/DriverCheckinSlice";
import DriverCheckinService from "../../../services/DriverCheckinService";
import { getLatestEntryDate } from "./checkinDateTimeUtils";
import formatDatetimeToDate from "../../../utils/formatDateTimeToDate";
import NoRecordsMessage from "../../common/NoRecordsMessage";
import LoadingIcon from "../../common/LoadingIcon";

function DriverCheckinsTableListing() {
  const [loading, setLoading] = useState(true);
  const listingData = useSelector((state) => state.driverCheckinReducer.listingData);
  const dispatchId = useSelector((state) => state.driverCheckinReducer.dispatchId);
  const sortValue2 = useSelector((state) => state.driverCheckinReducer.sortValue2);
  const sortType2 = useSelector((state) => state.driverCheckinReducer.sortType2);
  const companyName = useSelector((state) => state.driverCheckinReducer.companyName);
  const driverId = useSelector((state) => state.driverCheckinReducer.driverId);

  const dispatch = useDispatch();

  const fetchTableData = () => {
    DriverCheckinService.getAllDataForListing(dispatchId, sortValue2, sortType2, companyName)
      .then((response) => {
        const { data } = response;
        setLoading(false);
        // Latest checkin (entryDate) of the dispatch is the earliest allowed checkin
        // date/time; taken from the full response, before limiting it to 6 rows
        if (dispatchId) {
          dispatch(setLastCheckinEntryDate(getLatestEntryDate(data)));
        }
        const limitedData = data.slice(0, 6);

        dispatch(setListingData(limitedData));
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  // Clear the previous dispatch's latest checkin until this dispatch's records load
  useEffect(() => {
    dispatch(setLastCheckinEntryDate(null));
  }, [dispatchId]);

  // Also runs on mount, so no separate mount-only fetch is needed
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [driverId, dispatchId, sortValue2, sortType2]);

  return (
    <div className="fixTableHead" style={{ height: "250px" }}>
      {loading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortValue2("entryDate"));
                if (sortType2) {
                  dispatch(setSortType2(false));
                } else {
                  dispatch(setSortType2(true));
                }
              }}
            >
              Entry Date{" "}
              {sortValue2 === "entryDate" && sortType2 && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue2 === "entryDate" && !sortType2 && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortValue2("epu"));
                if (sortType2) {
                  dispatch(setSortType2(false));
                } else {
                  dispatch(setSortType2(true));
                }
              }}
            >
              EPU Date{" "}
              {sortValue2 === "epu" && sortType2 && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue2 === "epu" && !sortType2 && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortValue2("eta"));
                if (sortType2) {
                  dispatch(setSortType2(false));
                } else {
                  dispatch(setSortType2(true));
                }
              }}
            >
              ETA Date
              {sortValue2 === "eta" && sortType2 && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue2 === "eta" && !sortType2 && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortValue2("pickedUp"));
                if (sortType2) {
                  dispatch(setSortType2(false));
                } else {
                  dispatch(setSortType2(true));
                }
              }}
            >
              Is Pickup
              {sortValue2 === "pickedUp" && sortType2 && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue2 === "pickedUp" && !sortType2 && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortValue2("pickupDate"));
                if (sortType2) {
                  dispatch(setSortType2(false));
                } else {
                  dispatch(setSortType2(true));
                }
              }}
            >
              Pickup Date
              {sortValue2 === "pickupDate" && sortType2 && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue2 === "pickupDate" && !sortType2 && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortValue2("city"));
                if (sortType2) {
                  dispatch(setSortType2(false));
                } else {
                  dispatch(setSortType2(true));
                }
              }}
            >
              City
              {sortValue2 === "city" && sortType2 && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue2 === "city" && !sortType2 && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortValue2("stateCode"));
                if (sortType2) {
                  dispatch(setSortType2(false));
                } else {
                  dispatch(setSortType2(true));
                }
              }}
            >
              State
              {sortValue2 === "stateCode" && sortType2 && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue2 === "stateCode" && !sortType2 && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortValue2("addUserName"));
                if (sortType2) {
                  dispatch(setSortType2(false));
                } else {
                  dispatch(setSortType2(true));
                }
              }}
            >
              User
              {sortValue2 === "addUserName" && sortType2 && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue2 === "addUserName" && !sortType2 && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? ""
            : listingData.length >= 1 &&
              listingData.map((data) => (
                <tr>
                  <td className="f-w-600"> {formatDatetimeToDate(data?.entryDate, "MM/DD/YY")} </td>
                  <td className="f-w-600"> {formatDatetimeToDate(data?.epu, "MM/DD/YY")} </td>
                  <td className="f-w-600"> {formatDatetimeToDate(data?.eta, "MM/DD/YY")} </td>
                  <td className="f-w-600"> {data.pickedUp ? "Yes" : "No"} </td>
                  <td className="f-w-600"> {formatDatetimeToDate(data?.pickupDate, "MM/DD/YY")} </td>
                  <td className="f-w-600"> {data.city} </td>
                  <td className="f-w-600"> {data.stateCode} </td>
                  <td className="f-w-600"> {data.addUserName} </td>
                </tr>
              ))}
        </tbody>
      </table>

      {loading ? "" : listingData.length === 0 && <NoRecordsMessage />}
    </div>
  );
}

export default DriverCheckinsTableListing;
