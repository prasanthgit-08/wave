import React from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  setChangeColor,
  setComplianceItemsData,
  setEditFormData,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/ComplianceItemsSlice";
import ComplianceItemsService from "../../../../../services/ComplianceItemsService";
import LoadingText from "../../../../common/LoadingText";
const ComplianceItemsList = ({ loading, setLoading }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNumber = useSelector((state) => state.complianceItemsReducer.pageNumber);

  const changeColor = useSelector((state) => state.complianceItemsReducer.changeColor);
  const id = useSelector((state) => state.complianceItemsReducer.id);
  const searchTerm = useSelector((state) => state.complianceItemsReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.complianceItemsReducer.searchCriteria);
  const complianceItemsData = useSelector((state) => state.complianceItemsReducer.complianceItemsData);
  let sortValue = useSelector((state) => state.complianceItemsReducer.normalSortValue);
  let sortFlag = useSelector((state) => state.complianceItemsReducer.normalSortFlag);
  const selectedStatus = useSelector((state) => state.complianceItemsReducer.selectedStatus);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };
  const fetchTableData = () => {
    setLoading(true);
    ComplianceItemsService.getComplianceItemsData(
      searchTerm,
      searchCriteria,
      pageNumber,
      sortValue,
      sortFlag,
      selectedStatus
    )
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setComplianceItemsData(data.content));
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
                onhandleNormalSort("driverDescription", !sortFlag);
              }}
            >
              {" "}
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
            complianceItemsData?.map((item) => (
              <tr
                id="rowId"
                key={item.complianceItemPK}
                onClick={(e) => dispatch(setChangeColor(false))}
                onDoubleClick={(event) => {
                  dispatch(setId(item.complianceItemPK));
                  dispatch(setChangeColor(true));
                  dispatch(setViewDetail(true));
                  dispatch(setEditFormData(null));
                  setTimeout(() => {
                    navigate("/compilance-items-add/" + item.complianceItemPK + "/" + pageNumber);
                  }, 100);
                }}
                className={item.complianceItemPK === id && changeColor ? "tableSelected" : ""}
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
        complianceItemsData?.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
};

export default ComplianceItemsList;
