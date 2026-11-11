import React, { useEffect, useState } from "react";
import PermissionGroupService from "../../../../../services/PermissionGroupService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAssignSortValue,
  setBrowseLoading,
  setChangeColor,
  setEditFormData,
  setGroupsData,
  setId,
  setIsDescriptionUnique,
  setNormalSortFlag,
  setNormalSortValue,
  setPermissionList,
  setPermissionPageNumber,
  setSaveData,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/PermissionGroupMaintenanceSlice";
import { useSelector } from "react-redux";
import LoadingText from "../../../../common/LoadingText";
const Listpage = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTerm = useSelector((state) => state.permissionGroupsReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.permissionGroupsReducer.selectedSearchCriteria);
  const groupsData = useSelector((state) => state.permissionGroupsReducer.groupsData);
  const pageNumber = useSelector((state) => state.permissionGroupsReducer.pageNumber);

  const id = useSelector((state) => state.permissionGroupsReducer.id);
  const changeColor = useSelector((state) => state.permissionGroupsReducer.changeColor);
  let sortValue = useSelector((state) => state.permissionGroupsReducer.normalSortValue);

  let sortFlag = useSelector((state) => state.permissionGroupsReducer.normalSortFlag);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };
  const fetchData = () => {
    setLoading(true);
    dispatch(setBrowseLoading(true));
    PermissionGroupService.getAllPermissionGroups(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortFlag,
      sortValue
    )
      .then((response) => {
        const { data } = response;
        dispatch(setGroupsData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
        dispatch(setBrowseLoading(false));
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
  }, [selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);

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
          </tr>
        </thead>

        <tbody>
          {!loading &&
            groupsData?.map((item) => (
              <tr
                id="rowId"
                key={item.permissionGroupPK}
                onClick={(e) => dispatch(setChangeColor(false))}
                onDoubleClick={(event) => {
                  dispatch(setSaveData(null));
                  dispatch(setAssignSortValue(null));
                  dispatch(setPermissionPageNumber(0));
                  dispatch(setIsDescriptionUnique(true));
                  dispatch(setEditFormData(null));
                  dispatch(setId(item.permissionGroupPK));
                  dispatch(setChangeColor(true));
                  dispatch(setViewDetail(true));
                  dispatch(setPermissionList([]));
                  setTimeout(() => {
                    navigate("/permission-groups/" + item.permissionGroupPK + "/" + pageNumber);
                  }, 100);
                }}
                className={item.permissionGroupPK === id && changeColor ? "tableSelected" : ""}
              >
                <td className="f-w-600">{item.description} </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!loading && groupsData.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}

      {loading && <LoadingText />}
    </div>
  );
};

export default Listpage;
