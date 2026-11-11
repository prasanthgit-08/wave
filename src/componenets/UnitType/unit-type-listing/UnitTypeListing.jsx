import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setFormTypeId,
  setFormTypeInput,
  setListingData,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setUnitTypeData,
  setViewDetail,
  setEditFormData,
} from "../../../redux/UnitTypeSlice";
import UnitTypeService from "../../../services/UnitTypeService";
import LoadingText from "../../common/LoadingText";

function UnitTypeListing(props) {
  const { loading, setLoading } = props;
  const listingData = useSelector((state) => state.unitTypeReducer.listingData);
  const searchTerms = useSelector((state) => state.unitTypeReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.unitTypeReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.unitTypeReducer.pageNumber);
  const selectedId = useSelector((state) => state.unitTypeReducer.selectedId);
  const changeColor = useSelector((state) => state.unitTypeReducer.changeColor);
  const selectedStatus = useSelector((state) => state.unitTypeReducer.selectedStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let sortFlag = useSelector((state) => state.unitTypeReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.unitTypeReducer.normalSortValue);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };

  const fetchUnitTypeTableData = () => {
    setLoading(true);
    UnitTypeService.fetchUnitTypes(
      searchCriteria,
      searchTerms,
      pageNumber,
      selectedStatus,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchUnitTypeTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerms, searchCriteria, pageNumber, selectedStatus, sortValue, sortFlag]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-500">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("unitCode", !sortFlag);
              }}
            >
              Unit Code
              {sortFlag && sortValue === "unitCode" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "unitCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("descriptionLong", !sortFlag);
              }}
            >
              Description{" "}
              {sortFlag && sortValue === "descriptionLong" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "descriptionLong" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? ""
            : listingData.length >= 1 &&
              listingData.map((data) => (
                <tr
                  id="rowId"
                  key={data.unitTypePK}
                  onClick={() => dispatch(setChangeColor(false))}
                  onDoubleClick={() => {
                    dispatch(setSelectedId(data.unitTypePK));
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    dispatch(setFormTypeInput(""));
                    dispatch(setFormTypeId(null));
                    dispatch(setEditFormData(null));
                    setTimeout(() => {
                      navigate(`/unit-type-edit/${data.unitTypePK}/${pageNumber}`);
                    }, 100);
                  }}
                  className={data.unitTypePK === selectedId && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {data.unitCode} </td>
                  <td className="f-w-600"> {data.descriptionLong} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading
        ? ""
        : listingData.length === 0 && (
            <h2 className="empty-list" align="center">
              {t("dealers.list.empty.message")}
            </h2>
          )}
      {loading && <LoadingText />}
    </div>
  );
}

export default UnitTypeListing;
