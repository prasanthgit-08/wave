import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import PickerController from "../../../common/PickerController";
import LeftStateListing from "./LeftStateListing";
import RightStatesListing from "./RightStatesListing";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  removeFromUnSelectedList,
  removeSaveList,
  resetArrays,
  setAssignedPageNumber,
  setChangesInStatesSelection,
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
} from "../../../../redux/StateGroupsSlice";
import EditStateGroupFooter from "./EditStateGroupFooter";
import EditStateGroupHeader from "./EditStateGroupHeader";
import GroupsEditPageQuarterScreenTemplate from "../../../Templates/GroupsEditPageQuarterScreenTemplate";
import GroupsEditPageTemplate from "../../../Templates/GroupsEditPageTemplate";

const EditStates = () => {
  const dispatch = useDispatch();
  const [hideSingleRight, sethideSingleRight] = useState(false);
  const [hideSingleLeft, setHideSingleLeft] = useState(false);
  const [hideDoubleRight, sethideDoubleRight] = useState(false);
  const [hideDoubleLeft, setHideDoubleLeft] = useState(false);
  const assignedPageNumber = useSelector((state) => state.stateGroupReducer.assignedPageNumber);
  const assignedStatesList = useSelector((state) => state.stateGroupReducer.assignedStatesList);
  const assignedTotalElements = useSelector((state) => state.stateGroupReducer.assignedTotalElements);
  const assignedTotalPages = useSelector((state) => state.stateGroupReducer.assignedTotalPages);
  const leftTotalPages = useSelector((state) => state.stateGroupReducer.leftTotalPages);
  const leftTotalElements = useSelector((state) => state.stateGroupReducer.leftTotalElements);
  const leftPageNumber = useSelector((state) => state.stateGroupReducer.leftPageNumber);
  const selectedList = useSelector((state) => state.stateGroupReducer.selectedList);
  const leftStatesList = useSelector((state) => state.stateGroupReducer.leftStatesList);
  const initialList = useSelector((state) => state.stateGroupReducer.initialList);
  const reverseFlag = useSelector((state) => state.stateGroupReducer.reverseFlag);
  const unSelectedList = useSelector((state) => state.stateGroupReducer.unSelectedList);
  const leftLoading = useSelector((state) => state.stateGroupReducer.leftLoading);
  const rightLoading = useSelector((state) => state.stateGroupReducer.rightLoading);

  const saveList = useSelector((state) => state.stateGroupReducer.saveList);
  const deleteList = useSelector((state) => state.stateGroupReducer.deleteList);
  const handleSingleRightMove = () => {
    dispatch(setChangesInStatesSelection(true));
    selectedList?.map((states) => {
      if (initialList?.includes(states.statesPK)) {
        dispatch(removeDeleteList(states.statesPK));
      } else {
        if (!reverseFlag) {
          dispatch(updateSaveList(states.statesPK));
        } else {
          dispatch(removeExceptList(states.statesPK));
        }
      }
      dispatch(removeFromSelectedList(states));
    });
  };
  const handledoubleArrowRight = () => {
    dispatch(setDeleteList(undefined));
    dispatch(setChangesInStatesSelection(true));
    dispatch(setReverseFlag(true));
    dispatch(setExceptList());
    setHideSingleLeft(true);
    sethideSingleRight(true);
    dispatch(setLeftPageNumber(0));
    dispatch(setSelectedList([]));
  };

  const handleSingleLeftMove = () => {
    dispatch(setChangesInStatesSelection(true));
    unSelectedList?.map((states) => {
      if (reverseFlag) {
        dispatch(updateExceptList(states.statesPK));
      }

      if (initialList?.includes(states.statesPK)) {
        dispatch(updateDeleteList(states.statesPK));
      } else {
        if (saveList?.includes(states.statesPK)) {
          dispatch(removeSaveList(states.statesPK));
        }
        if (reverseFlag) {
          dispatch(updateExceptList(states.statesPK));
        }
      }
      dispatch(removeFromUnSelectedList(states));
    });
  };

  const handledoubleArrowLeft = () => {
    dispatch(setChangesInStatesSelection(true));
    initialList?.map((states) => {
      if (!deleteList?.includes(states)) {
        dispatch(updateDeleteList(states));
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
    if (assignedStatesList?.length === 0) {
      setHideDoubleLeft(true);
    } else {
      setHideDoubleLeft(false);
    }
  }, [assignedStatesList]);

  useEffect(() => {
    if (leftStatesList?.length === 0) {
      sethideDoubleRight(true);
    } else {
      sethideDoubleRight(false);
    }
  }, [leftStatesList]);

  useEffect(() => {
    dispatch(resetArrays());

    dispatch(setReverseFlag(false));
    dispatch(setChangesInStatesSelection(false));
  }, []);

  return (
    <GroupsEditPageTemplate
      loading={leftLoading || rightLoading}
      FormHeaderComponent={<EditStateGroupHeader />}
      UnassignedGroupsListing={<LeftStateListing />}
      UnassignedGroupsPagination={
        <PaginationComponent
          pageNumber={leftPageNumber}
          setPageNumber={setLeftPageNumber}
          totalPages={leftTotalPages}
          totalElements={leftTotalElements}
          listingData={leftStatesList}
          numberOfElements={leftStatesList?.length}
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
      AssignedGroupsListing={<RightStatesListing />}
      AssignedGroupsPagination={
        <PaginationComponent
          pageNumber={assignedPageNumber}
          setPageNumber={setAssignedPageNumber}
          totalPages={assignedTotalPages}
          totalElements={assignedTotalElements}
          listingData={assignedStatesList}
          numberOfElements={assignedStatesList?.length}
          firstPage
          lastPage
          singleArrowDown
          singleArrowUp
          hideBorderTop
          hideBorderBottom
          hideBorderRight
        />
      }
      FormFooterComponent={<EditStateGroupFooter />}
    />
  );
};

export default EditStates;
