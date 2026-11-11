import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PermissionGroupService from "../../../../../services/PermissionGroupService";
import {
  setAssignSortFlag,
  setAssignSortValue,
  setBrowseLoading,
  setPermissionList,
  setPermissionTotalElements,
  setPermissionTotalPages,
} from "../../../../../redux/PermissionGroupMaintenanceSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingText from "../../../../common/LoadingText";
import Input from "../../../../../components/common/input";

const PermissionList = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const permissionPageNumber = useSelector((state) => state.permissionGroupsReducer.permissionPageNumber);
  const permissionList = useSelector((state) => state.permissionGroupsReducer.permissionList);
  const assignSortFlag = useSelector((state) => state.permissionGroupsReducer.assignSortFlag);
  const assignSortValue = useSelector((state) => state.permissionGroupsReducer.assignSortValue);

  const listAssignedPermission = () => {
    setLoading(true);
    dispatch(setBrowseLoading(true));
    PermissionGroupService.getAssignedPermission(id, permissionPageNumber, assignSortFlag, assignSortValue)
      .then((response) => {
        dispatch(setPermissionList(response.data.content));
        dispatch(setPermissionTotalElements(response.data.totalElements));
        dispatch(setPermissionTotalPages(response.data.totalPages));
        setLoading(false);
        dispatch(setBrowseLoading(false));
      })
      .catch(() => {
        setLoading(false);
        dispatch(setBrowseLoading(false));
      });
  };
  useEffect(() => {
    dispatch(setBrowseLoading(true));
    const debounceFunction = setTimeout(() => {
      listAssignedPermission();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [id, permissionPageNumber, , assignSortValue, assignSortFlag]);

  return (
    <div className="fixTableHead">
      {
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                onClick={() => {
                  dispatch(setAssignSortFlag());
                  dispatch(setAssignSortValue("description"));
                }}
                className="f-w-600"
              >
                Description
                {assignSortFlag && assignSortValue === "description" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!assignSortFlag && assignSortValue === "description" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th onClick={() => {}} className="f-w-600">
                Enabled
              </th>
              <th onClick={() => {}} className="f-w-600">
                Override
              </th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              permissionList?.length !== 0 &&
              permissionList?.map((item) => (
                <tr>
                  <td className="f-w-600">{item.description}</td>
                  <td className="f-w-600">
                    <Input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="multiUnitRelease"
                      name="multiUnitRelease"
                      checked={item.enabled}
                      disabled
                    />
                  </td>
                  <td className="f-w-600">
                    <Input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="multiUnitRelease"
                      name="multiUnitRelease"
                      disabled
                      checked={item.override}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      }
      {loading && <LoadingText smallerFont />}
      {!loading && permissionList?.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default PermissionList;
