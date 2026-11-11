/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setReserveTypesData,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/ReserveTypesSlice";

import ReserveTypesService from "../../../../../services/ReserveTypeService";
import LoadingText from "../../../../common/LoadingText";
const ReserveTypesListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNumber = useSelector((state) => state.reserveTypesReducer.pageNumber);
  const reserveTypesData = useSelector((state) => state.reserveTypesReducer.reserveTypesData);
  const [reserveTypesListingData, setReserveTypesListingData] = useState([]);
  const reserveTypesPK = useSelector((state) => state.reserveTypesReducer.reserveTypesPK);
  let sortFlag = useSelector((state) => state.reserveTypesReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.reserveTypesReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.reserveTypesReducer.selectedSearchCriteria);
  const searchTerm = useSelector((state) => state.reserveTypesReducer.searchTerm);

  const viewDetail = useSelector((state) => state.reserveTypesReducer.viewDetail);
  const id = useSelector((state) => state.reserveTypesReducer.id);
  const changeColor = useSelector((state) => state.reserveTypesReducer.changeColor);

  useEffect(() => {
    if (reserveTypesData != null) {
      setReserveTypesListingData(reserveTypesData);
    }
  }, [reserveTypesData, pageNumber, sortFlag, sortValue, viewDetail]);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;

    fetchReserveTypes();
  };
  const fetchReserveTypes = async () => {
    setLoading(true);
    ReserveTypesService.getReserveTypedata(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag,
      setViewDetail
    )
      .then((response) => {
        const data = response.data;

        dispatch(setReserveTypesData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleDoubleClick = (value) => {
    dispatch(setId(value));
    dispatch(setChangeColor(true));
    dispatch(setViewDetail(true));
    setTimeout(() => {
      navigate(`/reserve-types/${value}/${pageNumber}`);
    }, 100);
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchReserveTypes();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, selectedSearchCriteria, pageNumber]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("objectKey", !sortFlag);
              }}
            >
              {" "}
              Object Key
              {sortFlag && sortValue === "objectKey" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "objectKey" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
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
          </tr>
        </thead>
        <tbody>
          {!loading &&
            reserveTypesListingData?.map((reserveTypes) => (
              <tr
                key={reserveTypes.reserveTypePK}
                className={id === reserveTypes.reserveTypePK && changeColor ? "tableSelected" : ""}
                onClick={(e) => {
                  //
                  dispatch(setId(reserveTypes.reserveTypePK));
                  dispatch(setChangeColor(false));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(reserveTypes.reserveTypePK);
                }}
              >
                <td>{reserveTypes.objectKey}</td>
                <td>{reserveTypes.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        reserveTypesData?.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default ReserveTypesListing;
