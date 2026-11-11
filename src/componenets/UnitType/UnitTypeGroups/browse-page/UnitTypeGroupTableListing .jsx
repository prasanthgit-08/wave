import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAssignSortValue,
  setChangeColor,
  setEditFormData,
  setGroupsData,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setRadioValue,
  setSaveData,
  setTotalElements,
  setTotalPages,
  setUnitTypeList,
  setUnitTypePageNumber,
  setViewDetail,
} from "../../../../redux/UnitTypeGroupSlice";
import UnitTypeGroupsService from "../../../../services/UnitTypeGroupsService";
import LoadingText from "../../../common/LoadingText";
import LoadingIcon from "../../../common/LoadingIcon";

const UnitTypeGroupTableListing = ({ loading7, setLoading7 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [adSort] = useState(false);
  const searchTerm = useSelector((state) => state.unitTypeGroupReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.unitTypeGroupReducer.selectedSearchCriteria);
  const groupsData = useSelector((state) => state.unitTypeGroupReducer.groupsData);
  const pageNumber = useSelector((state) => state.unitTypeGroupReducer.pageNumber);

  const id = useSelector((state) => state.unitTypeGroupReducer.id);
  const changeColor = useSelector((state) => state.unitTypeGroupReducer.changeColor);
  let sortValue = useSelector((state) => state.unitTypeGroupReducer.normalSortValue);
  let sortFlag = useSelector((state) => state.unitTypeGroupReducer.normalSortFlag);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };
  const fetchData = () => {
    setLoading7(true);
    UnitTypeGroupsService.getUnitTypeGroupFormaintenance(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortFlag,
      sortValue
    )
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setGroupsData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoading7(false);
        setLoader(false);
      })
      .finally(() => {
        setLoading7(false);
      });
  };

  useEffect(() => {
    setLoading7(true);
    const debounceFunction = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);
  return (
    <div className="fixTableHead">
      {(loading7 || loader) && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("description", !sortFlag);
                }
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
          {loader
            ? ""
            : groupsData.map((code) => (
                <tr
                  id="rowId"
                  key={code.unitTypeGroupPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setSaveData(null));
                    dispatch(setAssignSortValue(null));
                    dispatch(setUnitTypePageNumber(0));
                    dispatch(setRadioValue(null));
                    dispatch(setEditFormData(null));
                    dispatch(setId(code.unitTypeGroupPK));
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    dispatch(setUnitTypeList([]));
                    setTimeout(() => {
                      navigate("/unit-type-groups/" + code.unitTypeGroupPK + "/" + pageNumber);
                    }, 100);
                  }}
                  className={code.unitTypeGroupPK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{code.description}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : !loading7 &&
          groupsData.length === 0 && (
            <h2 className="empty-list" align="center">
              {t("AlternateContact.list.empty.message")}
            </h2>
          )}
    </div>
  );
};

export default UnitTypeGroupTableListing;
