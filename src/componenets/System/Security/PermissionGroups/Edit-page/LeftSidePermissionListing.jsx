import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  removeFromUnSelectedList,
  setChangesInPermissioneSelection,
  setLeftLoading,
  setLeftPageNumber,
  setLeftPermissionList,
  setLeftTotalElements,
  setLeftTotalPages,
  setSelectedList,
  setSortFlag,
  setSortValue,
  updateSaveList,
  updateSelectedList,
} from "../../../../../redux/PermissionGroupMaintenanceSlice";
import PermissionGroupService from "../../../../../services/PermissionGroupService";
import { useEffect } from "react";
import LoadingText from "../../../../common/LoadingText";
import Input from "../../../../../components/common/input";

const LeftSidePermissionListing = () => {
  const dispatch = useDispatch();
  const [lastClick, setLastClick] = useState();
  const [loading, setLoading] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);

  const leftPermissionList = useSelector((state) => state.permissionGroupsReducer.leftPermissionList);
  const leftPageNumber = useSelector((state) => state.permissionGroupsReducer.leftPageNumber);

  const selectedList = useSelector((state) => state.permissionGroupsReducer.selectedList);
  const initialList = useSelector((state) => state.permissionGroupsReducer.initialList);
  const saveList = useSelector((state) => state.permissionGroupsReducer.saveList);
  const deleteList = useSelector((state) => state.permissionGroupsReducer.deleteList);
  const exceptList = useSelector((state) => state.permissionGroupsReducer.exceptList);
  const sortFlag = useSelector((state) => state.permissionGroupsReducer.sortFlag);
  const sortValue = useSelector((state) => state.permissionGroupsReducer.sortValue);
  const reverseFlag = useSelector((state) => state.permissionGroupsReducer.reverseFlag);

  const override = useSelector((state) => state.permissionGroupsReducer.override);

  const handleClick = (event, permission) => {
    if (event.ctrlKey) {
      if (event.shiftKey) {
        const index1 = leftPermissionList.indexOf(permission);
        const index2 = leftPermissionList.indexOf(lastClick);

        if (index1 < index2) {
          dispatch(updateSelectedList(leftPermissionList.slice(index1, index2 + 1)));
        } else {
          dispatch(updateSelectedList(leftPermissionList.slice(index2, index1 + 1)));
        }
      } else if (selectedList?.includes(permission)) {
        dispatch(removeFromSelectedList(permission));
      } else {
        dispatch(updateSelectedList(permission));
      }
      setLastClick(permission);
    } else if (event.shiftKey) {
      dispatch(setSelectedList());
      const index1 = leftPermissionList.indexOf(permission);
      const index2 = leftPermissionList.indexOf(lastClick);

      if (index1 < index2) {
        dispatch(setSelectedList(leftPermissionList.slice(index1, index2 + 1)));
      } else {
        dispatch(setSelectedList(leftPermissionList.slice(index2, index1 + 1)));
      }
    } else {
      const isPresent = selectedList?.find((obj) => obj.permissionPK === permission.permissionPK);
      if (isPresent) {
        dispatch(removeFromSelectedList(permission));
      } else {
        dispatch(setSelectedList(permission));
      }
      setLastClick(permission);
    }
  };

  const handleDoubleClick = (permission) => {
    dispatch(setChangesInPermissioneSelection(true));

    if (initialList?.includes(permission)) {
      dispatch(removeDeleteList(permission));
    } else {
      if (exceptList?.includes(permission)) {
        dispatch(removeExceptList(permission));
      } else {
        dispatch(updateSaveList(permission));
      }
    }
  };
  useEffect(() => {
    setLoading(true);
    dispatch(setLeftLoading(true));
    const debounceFunction = setTimeout(() => {
      PermissionGroupService.getLeftPermissions(
        reverseFlag,
        leftPageNumber,
        initialList,
        deleteList,
        saveList,
        exceptList,
        sortFlag,
        sortValue
      ).then((response) => {
        const { data } = response;
        dispatch(setLeftPermissionList(data.content));
        dispatch(setLeftTotalElements(data.totalElements));
        dispatch(setLeftTotalPages(data.totalPages));
        dispatch(setLeftLoading(false));
        setLastClick(data.content[0]);
        setIsFirstPage(data.first);
        setIsLastPage(data.last);
        setNumberOfElements(data.numberOfElements);
        setLoading(false);
      });
    }, 200);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [reverseFlag, initialList, saveList, deleteList, leftPageNumber, exceptList, sortFlag, sortValue]);

  useEffect(() => {
    if (isLastPage && !isFirstPage && numberOfElements === 0) {
      dispatch(setLeftPageNumber(leftPageNumber - 1));
    }
  }, [isFirstPage, isLastPage, numberOfElements]);

  const isEnableChecked = (permission) => {
    const exist = initialList?.some((p) => p.permissionPK === permission.permissionPK);
    if (exist) {
      const intialPermission = initialList.find((record) => record.permissionPK === permission.permissionPK);
      return intialPermission.enabled;
    } else {
      return permission.enabled;
    }
  };

  const isOverrideChecked = (permission) => {
    const exist = initialList?.some((p) => p.permissionPK === permission.permissionPK);
    if (exist) {
      const intialPermission = initialList.find((record) => record.permissionPK === permission.permissionPK);
      return intialPermission.override;
    } else {
      return permission.override;
    }
  };
  return (
    <div className="fixTableHead no-select" style={{ padding: 0, flex: 1 }}>
      {
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                onClick={() => {
                  dispatch(setSortFlag());
                  dispatch(setSortValue("description"));
                }}
                className="f-w-600"
              >
                Description
                {sortFlag && sortValue === "description" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "description" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th className="f-w-600">Enabled</th>
              <th className="f-w-600">Override</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              leftPermissionList?.length !== 0 &&
              leftPermissionList?.map((permission) => (
                <tr
                  id="rowId"
                  key={permission.permissionPK}
                  onDoubleClick={() => {
                    handleDoubleClick(permission.permissionPK);
                    dispatch(removeFromUnSelectedList(permission));
                  }}
                  className={`${
                    selectedList?.some((element) => element.permissionPK === permission.permissionPK)
                      ? "tableSelected"
                      : ""
                  }`}
                >
                  <td
                    onClick={(event) => {
                      handleClick(event, permission);
                    }}
                    className="f-w-600"
                  >
                    {permission.description}
                  </td>
                  <td className="f-w-600">
                    <Input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="multiUnitRelease"
                      name="multiUnitRelease"
                      disabled
                      checked={isEnableChecked(permission)}
                    />
                  </td>
                  <td className="f-w-600">
                    <Input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="multiUnitRelease"
                      name="multiUnitRelease"
                      checked={isOverrideChecked(permission)}
                      value={override}
                      disabled
                    />
                  </td>
                </tr>
              ))}
            {loading && <LoadingText smallerFont />}
          </tbody>
        </table>
      }
      {!loading && leftPermissionList?.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default LeftSidePermissionListing;
