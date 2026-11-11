import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  setChangeColor,
  setDebitCardData,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setViewDetail,
  setTotalElements,
  setTotalPages,
  setProviderValid,
} from "../../../../../redux/DebitCardSlice";
import DebitCardService from "../../../../../services/DebitCardService";
import { t } from "i18next";
import LoadingText from "../../../../common/LoadingText";

const TableListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const debitCardId = params.debitCardId;
  const pageNumber = useSelector((state) => state.debitCardReducer.pageNumber);
  const searchTerm = useSelector((state) => state.debitCardReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.debitCardReducer.searchCriteria);
  const debitCardData = useSelector((state) => state.debitCardReducer.debitCardData);
  const normalSortValue = useSelector((state) => state.debitCardReducer.normalSortValue);
  const normalSortFlag = useSelector((state) => state.debitCardReducer.normalSortFlag);
  const changeColor = useSelector((state) => state.debitCardReducer.changeColor);
  const id = useSelector((state) => state.debitCardReducer.id);
  let sortValue = useSelector((state) => state.debitCardReducer.normalSortValue);
  let sortFlag = useSelector((state) => state.debitCardReducer.normalSortFlag);

  const handleDoubleClick = (value) => {
    dispatch(setId(value));
    dispatch(setChangeColor(true));
    dispatch(setViewDetail(true));
    navigate(`/debit-card/${value}/${pageNumber}`);
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };

  const fetchTableData = () => {
    setLoading(true);
    DebitCardService.getDebitCard(searchTerm, searchCriteria, pageNumber, debitCardId, sortValue, sortFlag)
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setDebitCardData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoading(false);
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
  }, [searchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);

  useEffect(() => {
    dispatch(setProviderValid(false));
  }, []);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("provider", !normalSortFlag);
              }}
            >
              Provider
              {normalSortFlag && normalSortValue === "provider" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "provider" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            debitCardData.map((debitCard) => (
              <tr
                key={debitCard.debitCardPK}
                className={id === debitCard.debitCardPK && changeColor ? "tableSelected" : ""}
                onClick={() => {
                  dispatch(setId(debitCard.debitCardPK));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(debitCard.debitCardPK);
                }}
              >
                <td>{debitCard.provider?.trim()}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        debitCardData.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};
export default TableListing;
