import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DriverDOTInspectionService from "../../../services/Compliance/DriverDOTInspectionService";
import {
  setSortType,
  setSortValue,
  setTruckData,
  setChangeColor,
  setTotalPages,
  setTotalElements,
  setTruckLoading,
} from "../../../redux/LookupScreens/DriverTruckLookupSlice";
import LoadingIcon from "../../common/LoadingIcon";
import { useParams } from "react-router-dom";
import LoadingText from "../../common/LoadingText";

const TableListing = ({ MaintenanceProgram, DOTInspection, handleLookupSelection }) => {
  const { driverId } = useParams();
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);

  const truckData = useSelector((state) => state.driverTruckLookupSlice.truckData);
  const searchTerm = useSelector((state) => state.driverTruckLookupSlice.searchTerm);
  const searchCriteria = useSelector((state) => state.driverTruckLookupSlice.searchCriteria);
  const sortValue = useSelector((state) => state.driverTruckLookupSlice.sortValue);
  const sortType = useSelector((state) => state.driverTruckLookupSlice.sortType);
  const pageNumber = useSelector((state) => state.driverTruckLookupSlice.pageNumber);
  const changeColor = useSelector((state) => state.driverTruckLookupSlice.changeColor);
  const truckLoading = useSelector((state) => state.driverTruckLookupSlice.truckLoading);

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

  const fetchTruckDataDOTInspection = () => {
    dispatch(setTruckLoading(true));
    DriverDOTInspectionService.getTruckData({ ...payload })
      .then(({ data }) => {
        dispatch(setTruckData(data.slice(0, data.length - 1)));
        const paginationInfo = data[data.length - 1];
        dispatch(setTotalPages(paginationInfo?.TotalPages));
        dispatch(setTotalElements(paginationInfo?.TotalElements));
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setTruckLoading(false));
      });
  };

  useEffect(() => {
    if (DOTInspection) {
      fetchTruckDataDOTInspection();
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
          {!truckLoading &&
            truckData?.length !== 0 &&
            truckData?.map((data) => (
              <tr
                id="rowId"
                key={data.DriverTruckPK}
                onClick={() => {
                  setSelectedId(data?.DriverTruckPK);
                  dispatch(setChangeColor(true));
                  handleLookupSelection(data);
                }}
                className={data?.DriverTruckPK === selectedId && changeColor ? "tableSelected" : ""}
              >
                <td className="f-w-600"> {data.Description} </td>
                <td className="f-w-600"> {data.Make} </td>
                <td className="f-w-600"> {data.Model} </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!truckLoading && truckData?.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
      {truckLoading && <LoadingText />}
    </div>
  );
};

export default TableListing;
