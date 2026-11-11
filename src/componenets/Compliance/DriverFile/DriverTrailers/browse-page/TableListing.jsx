/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DriverTrailersService from "../../../../../services/DriverFile/DriverTrailersService";
import {
  setListingData,
  setTotalPages,
  setTotalElements,
  setSelectedId,
  setViewDetail,
  setSortValue,
  setSortFlag,
  setFormData,
  setPaginationLoading,
} from "../../../../../redux/DriverTrailersSlice";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIcon from "../../../../common/LoadingIcon";

const TableListing = ({ renderItemId, handleLookupSelection, MaintenanceProgram, customFetchFunction }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listingData = useSelector((state) => state.driverTrailers.listingdata);
  const searchTerm = useSelector((state) => state.driverTrailers.searchTerm);
  const searchCriteria = useSelector((state) => state.driverTrailers.searchCriteria);
  const selectedStatus = useSelector((state) => state.driverTrailers.selectedStatus);
  const pageNumber = useSelector((state) => state.driverTrailers.pageNumber);
  const sortFlag = useSelector((state) => state.driverTrailers.sortFlag);
  const sortValue = useSelector((state) => state.driverTrailers.sortValue);
  const selectedId = useSelector((state) => state.driverTrailers.selectedId);
  const paginationLoading = useSelector((state) => state.driverTrailers.paginationLoading);
  const isTrailerForm = useSelector((state) => state.driverTrailers.isTrailerForm);
  const { driverId } = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortFlag(val));
  };

  const fetchTableData = () => {
    dispatch(setPaginationLoading(true));
    DriverTrailersService.getByDriverID(
      searchTerm,
      searchCriteria,
      selectedStatus,
      pageNumber,
      sortValue,
      sortFlag,
      driverId
    )
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((error) => {
        dispatch(setPaginationLoading(false));
      })
      .finally(() => {
        dispatch(setPaginationLoading(false));
        setHasLoaded(true);
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      dispatch(setPaginationLoading(true));
      fetchTableData();
    }, 500);

    return () => clearTimeout(debounceFunction);
  }, [searchTerm, searchCriteria, selectedStatus, pageNumber, sortValue, sortFlag, driverId, dispatch]);

  return (
    <div className="fixTableHead">
      {paginationLoading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              Description
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("make", !sortFlag);
              }}
            >
              Make
              {sortFlag && sortValue === "make" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "make" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("model", !sortFlag);
              }}
            >
              Model
              {sortFlag && sortValue === "model" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "model" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        <tbody>
          {paginationLoading
            ? null
            : listingData?.length >= 1 &&
              listingData?.map((data) => (
                <tr
                  id="rowId"
                  key={data.driverTrailerPK}
                  onClick={() => dispatch(setSelectedId(null))}
                  onDoubleClick={() => {
                    dispatch(setSelectedId(data.driverTrailerPK));
                    dispatch(setViewDetail(true));
                    setTimeout(() => {
                      navigate(`/driver-trailers/${driverId}/${data.driverTrailerPK}`);
                    }, 100);
                  }}
                  className={data.driverTrailerPK === selectedId ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{data.description}</td>
                  <td className="f-w-600">{data.make}</td>
                  <td className="f-w-600">{data.model}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {hasLoaded && !paginationLoading && listingData?.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default TableListing;
