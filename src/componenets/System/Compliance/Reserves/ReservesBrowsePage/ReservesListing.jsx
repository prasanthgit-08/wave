import React from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  setChangeColor,
  setSelectedId,
  setNormalSortFlag,
  setNormalSortValue,
  setReservePK,
  setReservesData,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/ReservesSlice";
import ReservesService from "../../../../../services/ReservesService";
import LoadingIcon from "../../../../common/LoadingIcon";
import LoadingText from "../../../../common/LoadingText";

const ReservesListing = ({ loading, setLoading }) => {
  const pageNumber = useSelector((state) => state.reservesReducer.pageNumber);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedId = useSelector((state) => state.reservesReducer.selectedId);
  const reservePK = useSelector((state) => state.reservesReducer.reservePK);
  const reservesData = useSelector((state) => state.reservesReducer.reservesData);
  const searchTerm = useSelector((state) => state.reservesReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.reservesReducer.searchCriteria);
  const sortValue = useSelector((state) => state.reservesReducer.normalSortValue);
  const sortFlag = useSelector((state) => state.reservesReducer.normalSortFlag);
  const selectedStatus = useSelector((state) => state.reservesReducer.selectedStatus);
  // Only update the sort state; the debounced effect below refetches when it changes.
  // Fetching here as well caused a duplicate API call on every sort click.
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };
  const fetchTableData = () => {
    setLoading(true);
    ReservesService.getReserves(
      searchTerm,
      searchCriteria,
      pageNumber,
      reservePK,
      sortValue,
      sortFlag,
      selectedStatus
    )
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setReservesData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDoubleClick = (event) => {
    dispatch(setReservePK(event));
    dispatch(setChangeColor(true));
    dispatch(setViewDetail(true));
    setTimeout(() => {
      navigate(`/reserves/${event}/${pageNumber}`);
    }, 100);
  };
  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, sortValue, sortFlag, selectedStatus]);

  return (
    <div className="fixTableHead">
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
                onhandleNormalSort("reserveTypes", !sortFlag);
              }}
            >
              Reserve Type
              {sortFlag && sortValue === "reserveTypes" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "reserveTypes" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            reservesData?.map((reserves) => (
              <tr
                id="rowId"
                key={reserves.id}
                onClick={(e) => {
                  dispatch(setReservePK(reserves.id));
                  dispatch(setSelectedId(null));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(reserves.id);

                  dispatch(setSelectedId(reserves.id));
                }}
                className={reserves.id === selectedId ? "tableSelected" : ""}
              >
                <td className="f-w-600">{reserves.description} </td>
                <td className="f-w-600">{reserves.type} </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        reservesData?.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
};

export default ReservesListing;
