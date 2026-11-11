/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCheckPayToData,
  setViewDetail,
  setChangeColor,
  setId,
  setNormalSortValue,
  setNormalSortFlag,
  setTotalElements,
  setTotalPages,
  setEditFormData,
} from "../../../../../redux/CheckPayToSlice";

import CheckPayToService from "../../../../../services/CheckPayToService";
import LoadingText from "../../../../common/LoadingText";
const CheckPayToListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNumber = useSelector((state) => state.checkPayToReducer.pageNumber);
  const checkPayToData = useSelector((state) => state.checkPayToReducer.checkPayToData);
  const [checkPayToListingData, setCheckPayToListingData] = useState([]);
  const checkPayToPK = useSelector((state) => state.checkPayToReducer.checkPayToPK);
  let sortFlag = useSelector((state) => state.checkPayToReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.checkPayToReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.checkPayToReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.checkPayToReducer.searchTerms);

  const viewDetail = useSelector((state) => state.checkPayToReducer.viewDetail);
  const id = useSelector((state) => state.checkPayToReducer.id);
  const changeColor = useSelector((state) => state.checkPayToReducer.changeColor);

  useEffect(() => {
    if (checkPayToData != null) {
      setCheckPayToListingData(checkPayToData);
    }
  }, [checkPayToData, pageNumber, sortFlag, sortValue, viewDetail]);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;

    fetchCheckPayTo();
  };
  const fetchCheckPayTo = async () => {
    setLoading(true);
    CheckPayToService.getAllcheckPayTo(selectedSearchCriteria, searchTerms, pageNumber, sortValue, sortFlag)
      .then((response) => {
        const data = response.data;

        dispatch(setCheckPayToData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleDoubleClick = (value) => {
    dispatch(setEditFormData(null));
    dispatch(setChangeColor(true));
    dispatch(setId(value));
    dispatch(setViewDetail(true));
    setTimeout(() => {
      navigate(`/check-pay-to/${value}/${pageNumber}`);
    }, 100);
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchCheckPayTo();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerms, selectedSearchCriteria, pageNumber]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("name", !sortFlag);
              }}
            >
              {" "}
              Name
              {sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
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
            checkPayToListingData?.map((checkpayto) => (
              <tr
                key={checkpayto.id}
                className={id === checkpayto.id && changeColor ? "tableSelected" : ""}
                onClick={(e) => {
                  dispatch(setChangeColor(false));
                  dispatch(setId(checkpayto.id));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(checkpayto.id);
                }}
              >
                <td>{checkpayto.name}</td>
                <td>{checkpayto.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        checkPayToData?.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default CheckPayToListing;
