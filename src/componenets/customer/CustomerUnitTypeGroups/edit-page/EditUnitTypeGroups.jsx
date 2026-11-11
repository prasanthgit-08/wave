import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  removeFromUnSelectedList,
  removeSaveList,
  resetArrays,
  resetNormalSort,
  setAssignedPageNumber,
  setChangesInSelection,
  setDeleteList,
  setExceptList,
  setExcludeList,
  setLeftPageNumber,
  setReverseFlag,
  setSaveList,
  setSelectedList,
  setUnSelectedList,
  updateDeleteList,
  updateExceptList,
  updateSaveList,
} from "../../../../redux/CustomerUnitTypeGroupSlice";
import { PaginationComponent } from "../../../common/PaginationComponent";
import GroupsEditPageTemplate from "../../../Templates/GroupsEditPageTemplate";
import EditUnitTypeGroupHeader from "./EditUnitTypeGroupHeader";
import LeftUnitTypeGroupList from "./LeftUnitTypeGroupList";
import PickerController from "../../../common/PickerController";
import RightUnitTypeGroupList from "./RightUnitTypeGroupList";
import EditUnitTypeGroupFooter from "./EditUnitTypeGroupFooter";
const EditUnitTypeGroups = () => {
  const [hideSingleRight, sethideSingleRight] = useState(false);
  const [hideSingleLeft, setHideSingleLeft] = useState(false);
  const [hideDoubleRight, sethideDoubleRight] = useState(false);
  const [hideDoubleLeft, setHideDoubleLeft] = useState(false);

  const dispatch = useDispatch();
  const leftGroupList = useSelector((state) => state.customerUnitTypeGroupReducer.leftGroupList);
  const selectedList = useSelector((state) => state.customerUnitTypeGroupReducer.selectedList);
  const leftPageNumber = useSelector((state) => state.customerUnitTypeGroupReducer.leftPageNumber);
  const leftTotalElements = useSelector((state) => state.customerUnitTypeGroupReducer.leftTotalElements);
  const leftTotalPages = useSelector((state) => state.customerUnitTypeGroupReducer.leftTotalPages);
  const assignedPageNumber = useSelector((state) => state.customerUnitTypeGroupReducer.assignedPageNumber);
  const assignedUnitTypeGroupList = useSelector(
    (state) => state.customerUnitTypeGroupReducer.assignedUnitTypeGroupList
  );
  const AssignedTotalElements = useSelector(
    (state) => state.customerUnitTypeGroupReducer.AssignedTotalElements
  );
  const assignedTotalPages = useSelector((state) => state.customerUnitTypeGroupReducer.assignedTotalPages);
  const initialList = useSelector((state) => state.customerUnitTypeGroupReducer.initialList);
  const reverseFlag = useSelector((state) => state.customerUnitTypeGroupReducer.reverseFlag);
  const unSelectedList = useSelector((state) => state.customerUnitTypeGroupReducer.unSelectedList);
  const saveList = useSelector((state) => state.customerUnitTypeGroupReducer.saveList);
  const deleteList = useSelector((state) => state.customerUnitTypeGroupReducer.deleteList);

  const handleSingleRightMove = () => {
    dispatch(setChangesInSelection(true));
    selectedList?.map((units) => {
      if (initialList?.includes(units.unitTypeGroupPK)) {
        dispatch(removeDeleteList(units.unitTypeGroupPK));
      } else {
        if (!reverseFlag) {
          dispatch(updateSaveList(units.unitTypeGroupPK));
        } else {
          dispatch(removeExceptList(units.unitTypeGroupPK));
        }
      }
      dispatch(removeFromSelectedList(units));
    });
  };
  const handledoubleArrowRight = () => {
    dispatch(setDeleteList(undefined));
    dispatch(setChangesInSelection(true));
    dispatch(setReverseFlag(true));
    dispatch(setExceptList());
    setHideSingleLeft(true);
    sethideSingleRight(true);
    dispatch(setLeftPageNumber(0));
    dispatch(setSelectedList([]));
  };

  const handleSingleLeftMove = () => {
    dispatch(setChangesInSelection(true));
    unSelectedList?.map((units) => {
      if (reverseFlag) {
        dispatch(updateExceptList(units.unitTypeGroupPK));
      }

      if (initialList?.includes(units.unitTypeGroupPK)) {
        dispatch(updateDeleteList(units.unitTypeGroupPK));
      } else {
        if (saveList?.includes(units.unitTypeGroupPK)) {
          dispatch(removeSaveList(units.unitTypeGroupPK));
        }
        if (reverseFlag) {
          dispatch(updateExceptList(units.unitTypeGroupPK));
        }
      }
      dispatch(removeFromUnSelectedList(units));
    });
  };

  const handledoubleArrowLeft = () => {
    dispatch(setChangesInSelection(true));
    initialList?.map((units) => {
      if (!deleteList?.includes(units)) {
        dispatch(updateDeleteList(units));
      }
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
    if (assignedUnitTypeGroupList?.length === 0) {
      setHideDoubleLeft(true);
    } else {
      setHideDoubleLeft(false);
    }
  }, [assignedUnitTypeGroupList]);

  useEffect(() => {
    if (leftGroupList?.length === 0) {
      sethideDoubleRight(true);
    } else {
      sethideDoubleRight(false);
    }
  }, [leftGroupList]);

  useEffect(() => {
    dispatch(resetArrays());
    dispatch(resetNormalSort());
    dispatch(setReverseFlag(false));
    dispatch(setChangesInSelection(false));
    dispatch(setLeftPageNumber(0));
    dispatch(setAssignedPageNumber(0));
  }, []);
  return (
    <GroupsEditPageTemplate
      FormHeaderComponent={<EditUnitTypeGroupHeader />}
      UnassignedGroupsListing={<LeftUnitTypeGroupList />}
      UnassignedGroupsPagination={
        <PaginationComponent
          pageNumber={leftPageNumber}
          setPageNumber={setLeftPageNumber}
          totalPages={leftTotalPages}
          totalElements={leftTotalElements}
          listingData={leftGroupList}
          numberOfElements={leftGroupList?.length}
          firstPage
          lastPage
          singleArrowDown
          singleArrowUp
          hideBorderTop
          hideBorderBottom
          hideBorderLeft
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
      AssignedGroupsListing={<RightUnitTypeGroupList />}
      AssignedGroupsPagination={
        <PaginationComponent
          pageNumber={assignedPageNumber}
          setPageNumber={setAssignedPageNumber}
          totalPages={assignedTotalPages}
          totalElements={AssignedTotalElements}
          listingData={assignedUnitTypeGroupList}
          numberOfElements={assignedUnitTypeGroupList?.length}
          firstPage
          lastPage
          singleArrowDown
          singleArrowUp
          hideBorderTop
          hideBorderBottom
          hideBorderRight
        />
      }
      FormFooterComponent={<EditUnitTypeGroupFooter />}
    />
  );
};

export default EditUnitTypeGroups;
