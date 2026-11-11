import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  removeFromUnSelectedList,
  removeSaveList,
  resetArrays,
  setAssignedPageNumber,
  setChangesInUnitTypeSelection,
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
} from "../../../../redux/UnitTypeGroupSlice";
import { PaginationComponent } from "../../../common/PaginationComponent";
import PickerController from "../../../common/PickerController";
import GroupsEditPageQuarterScreenTemplate from "../../../Templates/GroupsEditPageQuarterScreenTemplate";
import EditUnitTypeFooter from "./EditUnitTypeFooter";
import EditUnitTypeHeader from "./EditUnitTypeHeader";
import LeftUnitTypesListing from "./LeftUnitTypesListing";
import RightUnitTypesListing from "./RightUnitTypesListing";
import GroupsEditPageTemplate from "../../../Templates/GroupsEditPageTemplate";

const EditUnitTypes = () => {
  const dispatch = useDispatch();
  const [hideSingleRight, sethideSingleRight] = useState(false);
  const [hideSingleLeft, setHideSingleLeft] = useState(false);
  const [hideDoubleRight, sethideDoubleRight] = useState(false);
  const [hideDoubleLeft, setHideDoubleLeft] = useState(false);

  const assignedPageNumber = useSelector((state) => state.unitTypeGroupReducer.assignedPageNumber);
  const assignedUnitTypesList = useSelector((state) => state.unitTypeGroupReducer.assignedUnitTypesList);
  const assignedTotalElements = useSelector((state) => state.unitTypeGroupReducer.assignedTotalElements);
  const assignedTotalPages = useSelector((state) => state.unitTypeGroupReducer.assignedTotalPages);
  const leftTotalPages = useSelector((state) => state.unitTypeGroupReducer.leftTotalPages);
  const leftTotalElements = useSelector((state) => state.unitTypeGroupReducer.leftTotalElements);
  const leftPageNumber = useSelector((state) => state.unitTypeGroupReducer.leftPageNumber);
  const selectedList = useSelector((state) => state.unitTypeGroupReducer.selectedList);
  const leftUnitTypeList = useSelector((state) => state.unitTypeGroupReducer.leftUnitTypeList);
  const initialList = useSelector((state) => state.unitTypeGroupReducer.initialList);
  const reverseFlag = useSelector((state) => state.unitTypeGroupReducer.reverseFlag);
  const unSelectedList = useSelector((state) => state.unitTypeGroupReducer.unSelectedList);
  const saveList = useSelector((state) => state.unitTypeGroupReducer.saveList);
  const deleteList = useSelector((state) => state.unitTypeGroupReducer.deleteList);
  const leftLoading = useSelector((state) => state.unitTypeGroupReducer.leftLoading);
  const rightLoading = useSelector((state) => state.unitTypeGroupReducer.rightLoading);

  const handleSingleRightMove = () => {
    dispatch(setChangesInUnitTypeSelection(true));
    selectedList.map((unittype) => {
      if (initialList.includes(unittype.unitTypePK)) {
        dispatch(removeDeleteList(unittype.unitTypePK));
      } else {
        if (!reverseFlag) {
          dispatch(updateSaveList(unittype.unitTypePK));
        } else {
          dispatch(removeExceptList(unittype.unitTypePK));
        }
      }
      dispatch(removeFromSelectedList(unittype));
    });
  };
  const handledoubleArrowRight = () => {
    dispatch(setDeleteList(undefined));
    dispatch(setChangesInUnitTypeSelection(true));
    dispatch(setReverseFlag(true));
    dispatch(setExceptList());
    setHideSingleLeft(true);
    sethideSingleRight(true);
    dispatch(setLeftPageNumber(0));
    dispatch(setSelectedList([]));
  };

  const handleSingleLeftMove = () => {
    dispatch(setChangesInUnitTypeSelection(true));
    unSelectedList.map((unittype) => {
      if (reverseFlag) {
        dispatch(updateExceptList(unittype.unitTypePK));
      }

      if (initialList.includes(unittype.unitTypePK)) {
        dispatch(updateDeleteList(unittype.unitTypePK));
      } else {
        if (saveList.includes(unittype.unitTypePK)) {
          dispatch(removeSaveList(unittype.unitTypePK));
        }
        if (reverseFlag) {
          dispatch(updateExceptList(unittype.unitTypePK));
        }
      }
      dispatch(removeFromUnSelectedList(unittype));
    });
  };

  const handledoubleArrowLeft = () => {
    dispatch(setChangesInUnitTypeSelection(true));
    initialList.map((unittype) => {
      if (!deleteList.includes(unittype)) {
        dispatch(updateDeleteList(unittype));
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
    if (unSelectedList.length === 0) {
      setHideSingleLeft(true);
    } else {
      setHideSingleLeft(false);
    }
  }, [unSelectedList]);

  useEffect(() => {
    if (selectedList.length === 0) {
      sethideSingleRight(true);
    } else {
      sethideSingleRight(false);
    }
  }, [selectedList]);

  useEffect(() => {
    if (assignedUnitTypesList.length === 0) {
      setHideDoubleLeft(true);
    } else {
      setHideDoubleLeft(false);
    }
  }, [assignedUnitTypesList]);

  useEffect(() => {
    if (leftUnitTypeList.length === 0) {
      sethideDoubleRight(true);
    } else {
      sethideDoubleRight(false);
    }
  }, [leftUnitTypeList]);

  useEffect(() => {
    dispatch(resetArrays());
    dispatch(setAssignedPageNumber(0));
    dispatch(setLeftPageNumber(0));
    dispatch(setReverseFlag(false));
    dispatch(setChangesInUnitTypeSelection(false));
  }, []);

  return (
    <GroupsEditPageTemplate
      FormHeaderComponent={<EditUnitTypeHeader />}
      UnassignedGroupsListing={<LeftUnitTypesListing />}
      UnassignedGroupsPagination={
        <PaginationComponent
          loading={leftLoading}
          pageNumber={leftPageNumber}
          setPageNumber={setLeftPageNumber}
          totalPages={leftTotalPages}
          totalElements={leftTotalElements}
          listingData={leftUnitTypeList}
          numberOfElements={leftUnitTypeList.length}
          firstPage
          lastPage
          singleArrowDown
          singleArrowUp
          doubleArrowUp
          doubleArrowDown
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
      AssignedGroupsListing={<RightUnitTypesListing />}
      AssignedGroupsPagination={
        <PaginationComponent
          pageNumber={assignedPageNumber}
          setPageNumber={setAssignedPageNumber}
          totalPages={assignedTotalPages}
          totalElements={assignedTotalElements}
          listingData={assignedUnitTypesList}
          numberOfElements={assignedUnitTypesList.length}
          loading={rightLoading}
          firstPage
          lastPage
          singleArrowDown
          singleArrowUp
          hideBorderTop
          hideBorderBottom
          hideBorderRight
        />
      }
      FormFooterComponent={<EditUnitTypeFooter />}
    />
  );
};

export default EditUnitTypes;
