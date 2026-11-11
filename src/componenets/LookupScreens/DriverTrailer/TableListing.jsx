import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DriverDOTInspectionService from "../../../services/Compliance/DriverDOTInspectionService";
import { setTrailerData, setTrailerLoading } from "../../../redux/LookupScreens/DriverTrailerLookupSlice";
import {
  setSortType,
  setSortValue,
  setChangeColor,
  setTotalPages,
  setTotalElements,
} from "../../../redux/LookupScreens/DriverTrailerLookupSlice";
import { useParams } from "react-router-dom";
import LoadingText from "../../common/LoadingText";

const TableListing = ({ MaintenanceProgram, DOTInspection, handleLookupSelection }) => {
  const { driverId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const trailerData = useSelector((state) => state.driverTrailerLookupSlice.trailerData);
  const searchTerm = useSelector((state) => state.driverTrailerLookupSlice.searchTerm);
  const searchCriteria = useSelector((state) => state.driverTrailerLookupSlice.searchCriteria);
  const sortValue = useSelector((state) => state.driverTrailerLookupSlice.sortValue);
  const sortType = useSelector((state) => state.driverTrailerLookupSlice.sortType);
  const pageNumber = useSelector((state) => state.driverTrailerLookupSlice.pageNumber);
  const changeColor = useSelector((state) => state.driverTrailerLookupSlice.changeColor);
  const trailerLoading = useSelector((state) => state.driverTrailerLookupSlice.trailerLoading);

  const payload = {
    searchTerm,
    searchCriteria,
    sortValue,
    sortType,
    pageNumber,
    pageSize: 10,
    type: "LookUp",
    status: "All",
    driverFK: driverId,
  };

  const fetchTrailerDataDOTInspection = () => {
    dispatch(setTrailerLoading(true));
    DriverDOTInspectionService.getDriverTrailerData({ ...payload })
      .then(({ data }) => {
        dispatch(setTrailerData(data.slice(0, data.length - 1)));
        const paginationInfo = data[data.length - 1];
        dispatch(setTotalPages(paginationInfo?.TotalPages));
        dispatch(setTotalElements(paginationInfo?.TotalElements));
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setTrailerLoading(false));
      });
  };

  useEffect(() => {
    if (DOTInspection) {
      fetchTrailerDataDOTInspection();
    }
  }, [searchTerm, searchCriteria, sortType, sortValue]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortType(!sortType));
                dispatch(setSortValue("description"));
              }}
            >
              Description
              {sortType && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortType(!sortType));
                dispatch(setSortValue("make"));
              }}
            >
              Make
              {sortType && sortValue === "make" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "make" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortType(!sortType));
                dispatch(setSortValue("model"));
              }}
            >
              Model
              {sortType && sortValue === "model" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "model" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            trailerData?.length !== 0 &&
            trailerData?.map((data) => (
              <tr
                id="rowId"
                key={data.DriverTrailerPK}
                onClick={() => {
                  handleLookupSelection(data);
                  dispatch(setChangeColor(true));
                  setSelectedId(data?.DriverTrailerPK);
                }}
                className={data.DriverTrailerPK === selectedId && changeColor ? "tableSelected" : ""}
              >
                <td className="f-w-600"> {data.Description} </td>
                <td className="f-w-600"> {data.Make} </td>
                <td className="f-w-600"> {data.Model} </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!trailerLoading && trailerData?.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
      {trailerLoading && <LoadingText />}
    </div>
  );
};

export default TableListing;
