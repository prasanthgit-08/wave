import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFields,
  setChangeColor,
  setDelayedUnitsData,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/DelayUnitCodesSlice";
import DelayUnitCodesService from "../../../../../services/DelayUnitCodesService";
import { useNavigate, useParams } from "react-router-dom";
import { t } from "i18next";
import LoadingIcon from "../../../../common/LoadingIcon";
import LoadingText from "../../../../common/LoadingText";

const DelayUnitCodesListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const delayUnitCodeId = params.delayUnitCodeId;
  const pageNumber = useSelector((state) => state.delayedUnitCodesReducer.pageNumber);
  const searchTerm = useSelector((state) => state.delayedUnitCodesReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.delayedUnitCodesReducer.searchCriteria);
  const delayedUnitsData = useSelector((state) => state.delayedUnitCodesReducer.delayedUnitsData);
  const normalSortValue = useSelector((state) => state.delayedUnitCodesReducer.normalSortValue);
  const normalSortFlag = useSelector((state) => state.delayedUnitCodesReducer.normalSortFlag);
  const changeColor = useSelector((state) => state.delayedUnitCodesReducer.changeColor);
  const id = useSelector((state) => state.delayedUnitCodesReducer.id);
  const sortValue = useSelector((state) => state.delayedUnitCodesReducer.normalSortValue);
  const sortFlag = useSelector((state) => state.delayedUnitCodesReducer.normalSortFlag);

  const description = useSelector((state) => state.delayedUnitCodesReducer.description);
  const sisterDelayCode = useSelector((state) => state.delayedUnitCodesReducer.sisterDelayCode);

  const handleDoubleClick = (value) => {
    dispatch(setId(value));
    dispatch(setChangeColor(true));
    dispatch(setViewDetail(true));
    navigate(`/delay-unit-codes/${value}/${pageNumber}`);
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const fetchTableData = () => {
    setLoading(true);
    DelayUnitCodesService.getDelayUnitCodes(
      searchTerm,
      searchCriteria,
      pageNumber,
      delayUnitCodeId,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        dispatch(setDelayedUnitsData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => console.error(err))
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
  }, [searchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !normalSortFlag);
              }}
            >
              Description
              {normalSortFlag && normalSortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            delayedUnitsData?.map((delayedUnits) => (
              <tr
                key={delayedUnits.delayedUnitCodePK}
                className={id === delayedUnits.delayedUnitCodePK && changeColor ? "tableSelected" : ""}
                onClick={() => {
                  dispatch(resetFields());
                  dispatch(setId(delayedUnits.delayedUnitCodePK));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(delayedUnits.delayedUnitCodePK);
                }}
              >
                <td>{delayedUnits.description?.trim()}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {!loading && delayedUnitsData.length === 0 && (
        <h2 className="empty-list" align="center">
          {t("dealers.list.empty.message")}
        </h2>
      )}
      {loading && <LoadingText />}
    </div>
  );
};
export default DelayUnitCodesListing;
