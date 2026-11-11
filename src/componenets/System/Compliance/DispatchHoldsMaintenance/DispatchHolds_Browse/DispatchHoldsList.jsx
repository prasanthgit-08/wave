import React from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DispatchHoldsService from "../../../../../services/DispatchHoldsService";
import { useState, useEffect } from "react";
import {
  setChangeColor,
  setData,
  setDispatchTotalElements,
  setDispatchTotalPages,
  setEditFormData,
  setId,
  setListingData,
  setNormalSortFlag,
  setNormalSortValue,
  setViewDetail,
} from "../../../../../redux/DispatchHoldSearchSlice";
import LoadingText from "../../../../common/LoadingText";

const DispatchHoldsList = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const dispatchPageNumber = useSelector((state) => state.dispatchHoldSearchSliceReducer.dispatchPageNumber);

  const data = useSelector((state) => state.dispatchHoldSearchSliceReducer.data);
  const listingData = useSelector((state) => state.dispatchHoldSearchSliceReducer.listingData);
  const searchTerm = useSelector((state) => state.dispatchHoldSearchSliceReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.dispatchHoldSearchSliceReducer.searchCriteria);
  const selectedStatus = useSelector((state) => state.dispatchHoldSearchSliceReducer.selectedStatus);

  let sortValue = useSelector((state) => state.dispatchHoldSearchSliceReducer.normalSortValue);
  let sortFlag = useSelector((state) => state.dispatchHoldSearchSliceReducer.normalSortFlag);

  const id = useSelector((state) => state.dispatchHoldSearchSliceReducer.id);
  const changeColor = useSelector((state) => state.dispatchHoldSearchSliceReducer.changeColor);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;

    //fetchData();
  };
  const fetchData = () => {
    setLoading(true);
    DispatchHoldsService.getAllDispatchHolds(
      searchCriteria,
      searchTerm,
      dispatchPageNumber,
      sortValue,
      sortFlag,
      selectedStatus
    )
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setData(data.content));
        dispatch(setDispatchTotalElements(data.totalElements));
        dispatch(setDispatchTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, dispatchPageNumber, sortValue, sortFlag, selectedStatus]);
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
                onhandleNormalSort("driverDescription", !sortFlag);
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
          {!loading &&
            data?.map((item) => (
              <tr
                id="rowId"
                key={item.dispatchHoldPK}
                onClick={(e) => dispatch(setChangeColor(false))}
                onDoubleClick={(event) => {
                  dispatch(setId(item.dispatchHoldPK));
                  dispatch(setChangeColor(true));
                  dispatch(setViewDetail(true));
                  dispatch(setEditFormData(null));
                  setTimeout(() => {
                    navigate("/dispatch-hold-new/" + item.dispatchHoldPK + "/" + dispatchPageNumber);
                  }, 100);
                }}
                className={item.dispatchHoldPK === id && changeColor ? "tableSelected" : ""}
              >
                <td className="f-w-600">{item.description} </td>
                <td className="f-w-600">{item.driverDescription} </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        data.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
};

export default DispatchHoldsList;
