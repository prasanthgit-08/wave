import React, { useEffect, useState } from "react";
import {
  setChangeColor,
  setId,
  setViewDetail,
  setNormalSortValue,
  setNormalSortFlag,
  setSpecialCodesData,
  setTotalElements,
  setTotalPages,
} from "../../../redux/SpecialCodesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { toast } from "react-hot-toast";
import SpecialCodesService from "../../../services/SpecialCodesService";
import LoadingIcon from "../../common/LoadingIcon";

const SpecialCodesListing = ({ loader, setLoader }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = useSelector((state) => state.specialCodesReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.specialCodesReducer.selectedSearchCriteria);
  const specialCodesData = useSelector((state) => state.specialCodesReducer.specialCodesData);
  const id = useSelector((state) => state.specialCodesReducer.id);
  const pageNumber = useSelector((state) => state.specialCodesReducer.pageNumber);
  const changeColor = useSelector((state) => state.specialCodesReducer.changeColor);
  const sortValue = useSelector((state) => state.specialCodesReducer.normalSortValue);
  const sortFlag = useSelector((state) => state.specialCodesReducer.normalSortFlag);

  const handleDoubleClick = (value) => {
    dispatch(setId(value));
    dispatch(setChangeColor(true));
    dispatch(setViewDetail(true));
    navigate(`/special-codes-maintenance/${value}/${pageNumber}`);
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const fetchSpecialCodes = () => {
    setLoader(true);
    SpecialCodesService.getAllSpecialCodes(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        setLoader(false);
        dispatch(setSpecialCodesData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((error) => {
        let msg = "";
        if (error.response) {
          msg = error.response.data.errorMsg;
        }
        if (msg === null || msg === "" || msg === undefined) {
          msg = "Something went wrong !! Failed to save the record !!";
        }
        toast.error(msg);
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    setLoader(true);
    const debounceFunction = setTimeout(() => {
      fetchSpecialCodes();
    }, 500);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, selectedSearchCriteria, pageNumber, sortValue, sortFlag]);

  return (
    <div className="fixTableHead">
      {loader && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("code", !sortFlag);
              }}
            >
              {t("SpecialCodes.list.table.heading.code")}
              {sortFlag && sortValue === "code" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "code" && <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              {t("SpecialCodes.list.table.heading.description")}
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loader
            ? ""
            : specialCodesData.map((specialcodes) => (
                <tr
                  key={specialcodes.specialCodePK}
                  className={id === specialcodes.specialCodePK && changeColor ? "tableSelected" : ""}
                  onClick={() => {
                    dispatch(setId(specialcodes.specialCodePK));
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(specialcodes.specialCodePK);
                  }}
                >
                  <td>{specialcodes.code}</td>
                  <td>{specialcodes.description}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : specialCodesData.length === 0 &&
          !loader && (
            <h2 className="empty-list" align="center">
              {t("dealers.list.empty.message")}
            </h2>
          )}
    </div>
  );
};

export default SpecialCodesListing;
