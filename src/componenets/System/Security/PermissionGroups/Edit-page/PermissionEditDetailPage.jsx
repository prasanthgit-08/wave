import React, { useEffect, useState } from "react";
import GroupsEditPageTemplate from "../../../../Templates/GroupsEditPageTemplate";
import EditPermissionGroupHeader from "./EditPermissionGroupHeader";
import LeftSidePermissionListing from "./LeftSidePermissionListing";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import PickerController from "../../../../common/PickerController";
import RightSidePermissionListing from "./RightSidePermissionListing";
import EditPermissionGroupFooter from "./EditPermissionGroupFooter";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  removeFromUnSelectedList,
  removeModifiedList,
  removeSaveList,
  resetArrays,
  setAssignedPageNumber,
  setChangesInPermissioneSelection,
  setDeleteList,
  setExceptList,
  setExcludeList,
  setLeftPageNumber,
  setModifiedPermissionList,
  setReverseFlag,
  setSaveList,
  setSelectedList,
  setUnSelectedList,
  updateDeleteList,
  updateExceptList,
  updateSaveList,
} from "../../../../../redux/PermissionGroupMaintenanceSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const PermissionEditDetailPage = () => {
  const dispatch = useDispatch();
  const [hideSingleRight, sethideSingleRight] = useState(false);
  const [hideSingleLeft, setHideSingleLeft] = useState(false);
  const [hideDoubleRight, sethideDoubleRight] = useState(false);
  const [hideDoubleLeft, setHideDoubleLeft] = useState(false);
  const assignedPageNumber = useSelector((state) => state.permissionGroupsReducer.assignedPageNumber);
  const assignedPermissionList = useSelector((state) => state.permissionGroupsReducer.assignedPermissionList);
  const assignedTotalElements = useSelector((state) => state.permissionGroupsReducer.assignedTotalElements);
  const assignedTotalPages = useSelector((state) => state.permissionGroupsReducer.assignedTotalPages);
  const leftTotalPages = useSelector((state) => state.permissionGroupsReducer.leftTotalPages);
  const leftTotalElements = useSelector((state) => state.permissionGroupsReducer.leftTotalElements);
  const leftPageNumber = useSelector((state) => state.permissionGroupsReducer.leftPageNumber);
  const selectedList = useSelector((state) => state.permissionGroupsReducer.selectedList);
  const leftPermissionList = useSelector((state) => state.permissionGroupsReducer.leftPermissionList);
  const initialList = useSelector((state) => state.permissionGroupsReducer.initialList);
  const reverseFlag = useSelector((state) => state.permissionGroupsReducer.reverseFlag);
  const unSelectedList = useSelector((state) => state.permissionGroupsReducer.unSelectedList);

  const saveList = useSelector((state) => state.permissionGroupsReducer.saveList);
  const deleteList = useSelector((state) => state.permissionGroupsReducer.deleteList);
  const leftLoading = useSelector((state) => state.permissionGroupsReducer.leftLoading);
  const rightLoading = useSelector((state) => state.permissionGroupsReducer.rightLoading);

  const handleSingleRightMove = () => {
    dispatch(setChangesInPermissioneSelection(true));

    selectedList?.map((permission) => {
      if (initialList.includes(permission.permissionPK)) {
        dispatch(removeDeleteList(permission.permissionPK));
      } else {
        if (!reverseFlag) {
          dispatch(updateSaveList(permission.permissionPK));
        } else {
          dispatch(removeExceptList(permission.permissionPK));
        }
      }
      dispatch(removeFromSelectedList(permission));
    });
  };
  const handledoubleArrowRight = () => {
    dispatch(setDeleteList(undefined));
    dispatch(setChangesInPermissioneSelection(true));
    dispatch(setReverseFlag(true));
    dispatch(setExceptList());
    setHideSingleLeft(true);
    sethideSingleRight(true);
    dispatch(setLeftPageNumber(0));
    dispatch(setSelectedList([]));
    dispatch(setModifiedPermissionList([]));
  };

  const handleSingleLeftMove = () => {
    dispatch(setChangesInPermissioneSelection(true));
    unSelectedList?.map((permission) => {
      if (reverseFlag) {
        dispatch(updateExceptList(permission.permissionPK));
      }
      dispatch(removeModifiedList(permission.permissionPK));
      if (initialList.includes(permission.permissionPK)) {
        dispatch(updateDeleteList(permission.permissionPK));
      } else {
        if (saveList.includes(permission.permissionPK)) {
          dispatch(removeSaveList(permission.permissionPK));
        }
        if (reverseFlag) {
          dispatch(updateExceptList(permission.permissionPK));
        }
      }
      dispatch(removeFromUnSelectedList(permission));
    });
  };

  const handledoubleArrowLeft = () => {
    dispatch(setChangesInPermissioneSelection(true));

    initialList.map((permission) => {
      if (!deleteList.includes(permission)) {
        dispatch(updateDeleteList(permission));
      }
      dispatch(removeModifiedList(permission));
    });

    dispatch(setReverseFlag(false));
    dispatch(setSaveList());
    dispatch(setExcludeList());
    dispatch(setExceptList());
    dispatch(setAssignedPageNumber(0));
    setHideSingleLeft(true);
    sethideSingleRight(true);
    dispatch(setUnSelectedList([]));
  };

  useEffect(() => {
    if (unSelectedList?.length === 0) {
      setHideSingleLeft(true);
    } else {
      setHideSingleLeft(false);
    }
  }, [unSelectedList]);

  useEffect(() => {
    if (selectedList?.length === 0) {
      sethideSingleRight(true);
    } else {
      sethideSingleRight(false);
    }
  }, [selectedList]);

  useEffect(() => {
    if (assignedPermissionList?.length === 0) {
      setHideDoubleLeft(true);
    } else {
      setHideDoubleLeft(false);
    }
  }, [assignedPermissionList]);

  useEffect(() => {
    if (leftPermissionList?.length === 0) {
      sethideDoubleRight(true);
    } else {
      sethideDoubleRight(false);
    }
  }, [leftPermissionList]);

  useEffect(() => {
    dispatch(resetArrays());
    dispatch(setAssignedPageNumber(0));
    dispatch(setLeftPageNumber(0));
    dispatch(setReverseFlag(false));
    dispatch(setChangesInPermissioneSelection(false));
  }, []);

  return (
    <GroupsEditPageTemplate
      FormHeaderComponent={<EditPermissionGroupHeader />}
      UnassignedGroupsListing={<LeftSidePermissionListing />}
      UnassignedGroupsPagination={
        <PaginationComponent
          pageNumber={leftPageNumber}
          setPageNumber={setLeftPageNumber}
          totalPages={leftTotalPages}
          totalElements={leftTotalElements}
          listingData={leftPermissionList}
          numberOfElements={leftPermissionList?.length}
          firstPage
          lastPage
          singleArrowDown
          singleArrowUp
          hideBorderTop
          hideBorderBottom
          hideBorderLeft
          loading={leftLoading}
        />
      }
      PickerControllerComponent={
        <PickerController
          hideBorderLeft
          hideBorderRight
          doubleArrowRightOnClick={handledoubleArrowRight}
          singleArrowRightOnClick={handleSingleRightMove}
          singleArrowLeftOnClick={handleSingleLeftMove}
          doubleArrowLeftOnClick={handledoubleArrowLeft}
          disableDoubleArrowRight={hideDoubleRight}
          disableDoubleArrowLeft={hideDoubleLeft}
          disableSingleArrowRight={hideSingleRight}
          disableSingleArrowLeft={hideSingleLeft}
        />
      }
      AssignedGroupsListing={<RightSidePermissionListing />}
      AssignedGroupsPagination={
        <PaginationComponent
          pageNumber={assignedPageNumber}
          setPageNumber={setAssignedPageNumber}
          totalPages={assignedTotalPages}
          totalElements={assignedTotalElements}
          listingData={assignedPermissionList}
          numberOfElements={assignedPermissionList?.length}
          firstPage
          lastPage
          singleArrowDown
          singleArrowUp
          hideBorderTop
          hideBorderBottom
          hideBorderRight
          loading={rightLoading}
        />
      }
      FormFooterComponent={<EditPermissionGroupFooter />}
    />
  );
};

export default PermissionEditDetailPage;
