/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setListingData,
  setFormData,
  setSelectedId,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  setPaginationLoader,
} from "../../../../../redux/DriverDispatchHoldSlice";
import DriverDispatchHoldsService from "../../../../../services/DriverDispatchHoldsService";

const TableListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { driverId } = useParams();

  const [loading, setLoading] = useState(true);
  const listingData = useSelector((state) => state.driverDispatchHold.listingData);
  const searchTerm = useSelector((state) => state.driverDispatchHold.searchTerm);
  const searchCriteria = useSelector((state) => state.driverDispatchHold.searchCriteria);
  const pageNumber = useSelector((state) => state.driverDispatchHold.pageNumber);
  const selectedId = useSelector((state) => state.driverDispatchHold.selectedId);
  const sortFlag = useSelector((state) => state.driverDispatchHold.sortFlag);
  const sortValue = useSelector((state) => state.driverDispatchHold.sortValue);
  const isValidEntry = useSelector((state) => state.driverDispatchHold.isValidEntry);
  const paginationLoader = useSelector((state) => state.driverDispatchHold.paginationLoader);
  const onhandleNormalSort = (sortValue) => {
    dispatch(setSortValue(sortValue));
    dispatch(setSortFlag(!sortFlag));
  };

  const fetchTableData = () => {
    setLoading(true);
    dispatch(setPaginationLoader(true));
    DriverDispatchHoldsService.getAllDriverDispatchData(
      searchTerm,
      searchCriteria,
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
      .catch((err) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
        dispatch(setPaginationLoader(false));
      });
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber, sortValue, sortFlag]);

  useEffect(() => {
    if (!isValidEntry) {
      if (window.location.pathname === "/driverservice/driver-dispatchhold/" + driverId) {
        navigate(`/driver-service-selection/${driverId}/form`);
      } else {
        navigate(`/driver-maintenance-add/${driverId}`);
      }
    }
  }, [isValidEntry]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description");
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
                onhandleNormalSort("driverDescription");
              }}
            >
              Driver Description
              {sortFlag && sortValue === "driverDescription" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "driverDescription" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? ""
            : listingData?.length >= 1
              ? listingData?.map((data) => (
                  <tr
                    id="rowId"
                    key={data.driverDispatchHoldPK}
                    onClick={() => dispatch(setSelectedId(null))}
                    onDoubleClick={() => {
                      dispatch(setSelectedId(data.driverDispatchHoldPK));
                      dispatch(setViewDetail(true));
                      dispatch(setFormData(null));
                      setTimeout(() => {
                        if (window.location.pathname === "/driverservice/driver-dispatchhold/" + driverId) {
                          navigate(
                            `/driverservice/driver-dispatchhold/${driverId}/${data.driverDispatchHoldPK}`
                          );
                        } else {
                          navigate(
                            `/drivercompliance/driver-dispatchhold/${driverId}/${data.driverDispatchHoldPK}`
                          );
                        }
                      }, 100);
                    }}
                    className={data.driverDispatchHoldPK === selectedId ? "tableSelected" : ""}
                  >
                    <td className="f-w-600"> {data.description} </td>
                    <td className="f-w-600"> {data.driverDescription} </td>
                  </tr>
                ))
              : ""}
        </tbody>
      </table>
      {listingData?.length === 0 && !loading && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
      {loading ? (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TableListing;
