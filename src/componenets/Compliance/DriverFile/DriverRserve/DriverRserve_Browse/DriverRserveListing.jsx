import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setSortValue,
  setSortFlag,
  setListingData,
  setTotalElements,
  setTotalPages,
  setSelectedId,
  setViewDetail,
  setFormData,
  setChangeColor,
  resetDriverReserves,
} from "../../../../../redux/DriverReserveSlice";
import DriverReserveService from "../../../../../services/DriverReserveService";
import LoadingText from "../../../../common/LoadingText";

const DriverRserveListing = ({ loading, setLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, driverFK } = useParams();

  const listingData = useSelector((state) => state.driverReserveReducer.listingData);
  const searchTerm = useSelector((state) => state.driverReserveReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.driverReserveReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.driverReserveReducer.pageNumber);
  const selectedId = useSelector((state) => state.driverReserveReducer.selectedId);
  const sortFlag = useSelector((state) => state.driverReserveReducer.sortFlag);
  const sortValue = useSelector((state) => state.driverReserveReducer.sortValue);
  const changeColor = useSelector((state) => state.driverReserveReducer.changeColor);

  const onhandleNormalSort = (sortValue) => {
    dispatch(setSortValue(sortValue));
    dispatch(setSortFlag(!sortFlag));
  };

  const fetchTableData = () => {
    setLoading(true);
    DriverReserveService.getAll(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag, driverFK)
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber, sortValue, sortFlag, driverFK]);

  return (
    <div className="fixTableHead border-none">
      <table className="table table-striped  border-top-0 f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-5"
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
                onhandleNormalSort("usedFor");
              }}
            >
              Used For
              {sortFlag && sortValue === "usedFor" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "usedFor" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? null
            : listingData?.length >= 1 &&
              listingData?.map((data) => (
                <tr
                  id="rowId"
                  key={data.driverReservePK}
                  onClick={() => dispatch(setChangeColor(false))}
                  onDoubleClick={() => {
                    dispatch(setChangeColor(true));
                    dispatch(setSelectedId(data.driverReservePK));
                    dispatch(setViewDetail(true));
                    dispatch(setChangeColor(true));
                    setTimeout(() => {
                      navigate(`/driver-reserve-main/${driverFK}/${data.driverReservePK}`);
                    }, 100);
                  }}
                  className={data.driverReservePK === selectedId && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {data.description} </td>
                  <td className="f-w-600"> {data.usedFor} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        listingData.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
};

export default DriverRserveListing;
