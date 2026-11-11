import React, { useEffect, useState } from "react";
import {
  removeFromUnSelectedList,
  removeModifiedList,
  removeSaveList,
  setAssignePermissionList,
  setAssignedPageNumber,
  setAssignedPermissionSortFlag,
  setAssignedPermissionSortValue,
  setAssignedTotalElements,
  setAssignedTotalPages,
  setChangesInPermissioneSelection,
  setEnabled,
  setIntialObjectList,
  setModifiedPermissionList,
  setOverride,
  setRightLoading,
  setUnSelectedList,
  setinitialList,
  updateDeleteList,
  updateExceptList,
  updateModifiedList,
  updateUnSelectedList,
} from "../../../../../redux/PermissionGroupMaintenanceSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PermissionGroupService from "../../../../../services/PermissionGroupService";
import { useParams } from "react-router-dom";
import LoadingText from "../../../../common/LoadingText";
import Input from "../../../../../components/common/input";

const RightSidePermissionListing = () => {
  const dispatch = useDispatch();
  const [lastClick, setLastClick] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);
  const assignedPageNumber = useSelector((state) => state.permissionGroupsReducer.assignedPageNumber);
  const reverseFlag = useSelector((state) => state.permissionGroupsReducer.reverseFlag);
  const initialList = useSelector((state) => state.permissionGroupsReducer.initialList);
  const deleteList = useSelector((state) => state.permissionGroupsReducer.deleteList);
  const saveList = useSelector((state) => state.permissionGroupsReducer.saveList);
  const exceptList = useSelector((state) => state.permissionGroupsReducer.exceptList);
  const assignedPermissionList = useSelector((state) => state.permissionGroupsReducer.assignedPermissionList);
  const enabled = useSelector((state) => state.permissionGroupsReducer.enabled);
  const override = useSelector((state) => state.permissionGroupsReducer.override);
  const assignedPermissionSortFlag = useSelector(
    (state) => state.permissionGroupsReducer.assignedPermissionSortFlag
  );
  const assignedPermissionSortValue = useSelector(
    (state) => state.permissionGroupsReducer.assignedPermissionSortValue
  );
  const unSelectedList = useSelector((state) => state.permissionGroupsReducer.unSelectedList);
  const modifiedPermissionList = useSelector((state) => state.permissionGroupsReducer.modifiedPermissionList);
  const hasOverridePermission = useSelector((state) => state.permissionGroupsReducer.hasOverridePermission);
  const intialObjectList = useSelector((state) => state.permissionGroupsReducer.intialObjectList);

  const handleClick = (event, permission) => {
    if (event.ctrlKey && event.shiftKey) {
      event.preventDefault();
      const index1 = assignedPermissionList.indexOf(permission);
      const index2 = assignedPermissionList.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedPermissionList.slice(index1, index2 + 1);
      } else {
        array = assignedPermissionList.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!unSelectedList?.includes(obj)) {
          dispatch(assignedPermissionList(obj));
        }
      });
    } else if (event.ctrlKey) {
      if (unSelectedList?.includes(permission)) {
        dispatch(removeFromUnSelectedList(permission));
      } else {
        dispatch(updateUnSelectedList(permission));
      }
      setLastClick(permission);
    } else if (event.shiftKey) {
      event.preventDefault();
      const index1 = assignedPermissionList.indexOf(permission);
      const index2 = assignedPermissionList.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedPermissionList.slice(index1, index2 + 1);
      } else {
        array = assignedPermissionList.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!unSelectedList?.includes(obj)) {
          dispatch(updateUnSelectedList(obj));
        }
      });
    } else {
      const isPresent = unSelectedList?.find((obj) => obj.permissionPK === permission.permissionPK);
      if (isPresent) {
        dispatch(removeFromUnSelectedList(permission));
      } else {
        dispatch(setUnSelectedList(permission));
      }
      setLastClick(permission);
    }
  };

  const handleDoubleClick = (permission) => {
    dispatch(setChangesInPermissioneSelection(true));
    dispatch(removeModifiedList(permission));
    if (reverseFlag) {
      dispatch(updateExceptList(permission));
    }

    if (initialList?.includes(permission)) {
      dispatch(updateDeleteList(permission));
    } else if (saveList?.includes(permission)) {
      dispatch(removeSaveList(permission));
    } else {
      dispatch(updateExceptList(permission));
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(setRightLoading(true));
    const debounceFunction = setTimeout(() => {
      PermissionGroupService.getRightPermission(
        reverseFlag,
        assignedPageNumber,
        initialList,
        deleteList,
        saveList,
        exceptList,
        assignedPermissionSortFlag,
        assignedPermissionSortValue
      ).then((response) => {
        const { data } = response;
        dispatch(setAssignePermissionList(data.content));
        dispatch(setAssignedTotalElements(data.totalElements));
        dispatch(setAssignedTotalPages(data.totalPages));
        setLastClick(data.content[0]);
        setIsFirstPage(data.first);
        setIsLastPage(data.last);
        setNumberOfElements(data.numberOfElements);
        setLoading(false);
        dispatch(setRightLoading(false));
      });
    }, 200);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    initialList,
    reverseFlag,
    saveList,
    deleteList,
    assignedPageNumber,
    exceptList,
    assignedPermissionSortFlag,
    assignedPermissionSortValue,
  ]);

  const getInitialList = () => {
    PermissionGroupService.getInitialList(id).then((response) => {
      dispatch(setinitialList(response.data.pkList));
      dispatch(setIntialObjectList(response.data.objectList));
    });
  };

  useEffect(() => {
    dispatch(setinitialList());
    getInitialList();
  }, []);
  useEffect(() => {
    if (isLastPage && !isFirstPage && numberOfElements === 0) {
      dispatch(setAssignedPageNumber(assignedPageNumber - 1));
    }
  }, [isFirstPage, isLastPage, numberOfElements]);

  const isEnableChecked = (permission) => {
    const exist = modifiedPermissionList?.some((p) => p.permissionPK === permission.permissionPK);
    const existing = intialObjectList?.some((p) => p.permissionPK === permission.permissionPK);
    if (exist) {
      const intialPermission = modifiedPermissionList.find(
        (record) => record.permissionPK === permission.permissionPK
      );

      return intialPermission.enabled;
    } else if (existing) {
      const intialPermission = intialObjectList.find(
        (record) => record.permissionPK === permission.permissionPK
      );

      return intialPermission.enabled;
    } else {
      return permission.enabled;
    }
  };

  const isOverrideChecked = (permission) => {
    const exist = modifiedPermissionList?.some((p) => p.permissionPK === permission.permissionPK);
    const existing = intialObjectList?.some((p) => p.permissionPK === permission.permissionPK);
    if (exist) {
      const intialPermission = modifiedPermissionList.find(
        (record) => record.permissionPK === permission.permissionPK
      );
      return intialPermission.override;
    } else if (existing) {
      const intialPermission = intialObjectList.find(
        (record) => record.permissionPK === permission.permissionPK
      );

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
                  dispatch(setAssignedPermissionSortFlag());
                  dispatch(setAssignedPermissionSortValue("description"));
                }}
                className="f-w-600"
              >
                Description
                {assignedPermissionSortFlag && assignedPermissionSortValue === "description" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!assignedPermissionSortFlag && assignedPermissionSortValue === "description" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th className="f-w-600">Enabled</th>
              <th className="f-w-600">Override</th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              assignedPermissionList?.length !== 0 &&
              assignedPermissionList?.map((permission) => (
                <tr
                  id="rowId"
                  key={permission.permissionPK}
                  onDoubleClick={() => {
                    dispatch(removeModifiedList(permission));

                    handleDoubleClick(permission.permissionPK);
                    dispatch(removeFromUnSelectedList(permission));
                  }}
                  className={
                    unSelectedList?.some((element) => element.permissionPK === permission.permissionPK)
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td
                    onClick={(event) => {
                      handleClick(event, permission);
                    }}
                  >
                    {permission.description}
                  </td>
                  <td className="f-w-600">
                    <Input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="multiUnitRelease"
                      name="multiUnitRelease"
                      disabled={!hasOverridePermission && !permission.override}
                      checked={isEnableChecked(permission)}
                      onChange={(e) => {
                        const updatedEnabled = e.target.checked;

                        const exist = modifiedPermissionList?.some(
                          (p) => p.permissionPK === permission.permissionPK
                        );
                        const existnew = intialObjectList?.some(
                          (p) => p.permissionPK === permission.permissionPK
                        );
                        if (exist) {
                          const intialPermission = modifiedPermissionList.find(
                            (record) => record.permissionPK === permission.permissionPK
                          );

                          const updatePermission = {
                            ...intialPermission,
                            enabled: !intialPermission.enabled,
                          };

                          const updatedData = modifiedPermissionList.map(
                            (record) =>
                              record.permissionPK === permission.permissionPK ? updatePermission : record // Keep other records unchanged
                          );
                          dispatch(setModifiedPermissionList(updatedData));
                        } else if (existnew) {
                          const intialPermission = intialObjectList.find(
                            (record) => record.permissionPK === permission.permissionPK
                          );
                          const updatePermission = { ...intialPermission, enabled: updatedEnabled };

                          dispatch(updateModifiedList(updatePermission));
                        } else {
                          const existing = intialObjectList?.some(
                            (p) => p.permissionPK === permission.permissionPK
                          );
                          if (existing) {
                            const newPermission = intialObjectList.find(
                              (record) => record.permissionPK === permission.permissionPK
                            );
                            const updatePermission = { ...newPermission, enabled: updatedEnabled };
                            dispatch(updateModifiedList(updatePermission));
                          } else {
                            const updatePermission = { ...permission, enabled: updatedEnabled };
                            dispatch(updateModifiedList(updatePermission));
                          }
                        }

                        dispatch(setEnabled(updatedEnabled));
                      }}
                    />
                  </td>
                  <td className="f-w-600">
                    <Input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="multiUnitRelease"
                      name="multiUnitRelease"
                      value={override}
                      checked={isOverrideChecked(permission)}
                      disabled={!hasOverridePermission && !permission.override}
                      onChange={(e) => {
                        const updatedOverride = e.target.checked;

                        const exist = modifiedPermissionList?.some(
                          (p) => p.permissionPK === permission.permissionPK
                        );
                        const existing = intialObjectList?.some(
                          (p) => p.permissionPK === permission.permissionPK
                        );
                        if (exist) {
                          const intialPermission = modifiedPermissionList.find(
                            (record) => record.permissionPK === permission.permissionPK
                          );

                          const updatePermission = {
                            ...intialPermission,
                            override: !intialPermission.override,
                          };

                          const updatedData = modifiedPermissionList.map((record) =>
                            record.permissionPK === permission.permissionPK ? updatePermission : record
                          );
                          dispatch(setModifiedPermissionList(updatedData));
                        } else if (existing) {
                          const intialPermission = intialObjectList.find(
                            (record) => record.permissionPK === permission.permissionPK
                          );
                          const updatePermission = { ...intialPermission, override: updatedOverride };

                          dispatch(updateModifiedList(updatePermission));
                        } else {
                          const updatePermission = { ...permission, override: updatedOverride };

                          dispatch(updateModifiedList(updatePermission));
                        }

                        dispatch(setOverride(updatedOverride));
                      }}
                    />
                  </td>
                </tr>
              ))}
            {/* loading kept for future use */}
            {/* {loading && <LoadingText smallerFont />} */}
          </tbody>
        </table>
      }
      {!loading && assignedPermissionList?.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default RightSidePermissionListing;
