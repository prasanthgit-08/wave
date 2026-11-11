import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortType, setSortValue, setDriverId } from "../../../../../redux/DriverServiceSlice";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";

function DriverSelectionListing({ loader }) {
  const dispatch = useDispatch();

  const { driverData, sortType, sortValue, driverId } = useSelector((state) => state.driverServicesSlice);

  const renderDrivers = driverData?.map((i, index) => {
    return (
      <tr
        className={driverId == i.driverPK ? "tableSelected" : ""}
        onClick={() => {
          dispatch(setDriverId(i.driverPK));
        }}
        key={index}
      >
        <td>{i.firstName}</td>
        <td>{i.lastName}</td>
        <td>{i.city}</td>
        <td>{i.state}</td>
      </tr>
    );
  });

  return (
    <div className="fixTableHead border border-2 h-100">
      <table className="table table-striped mb-0 f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                dispatch(setSortValue("firstName"));
                if (sortType) {
                  dispatch(setSortType(false));
                } else {
                  dispatch(setSortType(true));
                }
              }}
            >
              First Name{" "}
              {sortValue === "firstName" && sortType && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "firstName" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => {
                dispatch(setSortValue("lastName"));
                if (sortType) {
                  dispatch(setSortType(false));
                } else {
                  dispatch(setSortType(true));
                }
              }}
            >
              Last Name{" "}
              {sortValue === "lastName" && sortType && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "lastName" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => {
                dispatch(setSortValue("mailingCity"));
                if (sortType) {
                  dispatch(setSortType(false));
                } else {
                  dispatch(setSortType(true));
                }
              }}
            >
              City
              {sortValue === "mailingCity" && sortType && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "mailingCity" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => {
                dispatch(setSortValue("mailingStateCode"));
                if (sortType) {
                  dispatch(setSortType(false));
                } else {
                  dispatch(setSortType(true));
                }
              }}
            >
              State
              {sortValue === "mailingStateCode" && sortType && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "mailingStateCode" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>{renderDrivers}</tbody>
      </table>
      {loader ? "" : renderDrivers?.length === 0 && <NoRecordsMessage />}
    </div>
  );
}

export default DriverSelectionListing;
