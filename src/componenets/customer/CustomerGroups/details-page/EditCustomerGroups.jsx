import React, { useEffect, useState } from "react";
import GroupsEditPageTemplate from "../../../Templates/GroupsEditPageTemplate";
import { PaginationComponent } from "../../../common/PaginationComponent";
import PickerController from "../../../common/PickerController";
import LeftSideCustomerListing from "./LeftSideCustomerListing";
import { useSelector } from "react-redux";
import EditCustomerGroupHeader from "./EditCustomerGroupHeader";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  removeFromUnSelectedList,
  removeSaveList,
  resetArrays,
  setAssignedPageNumber,
  setChangesInCustomerSelection,
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
} from "../../../../redux/CustomerGroupsSlice";
import EditCustomerGroupFooter from "./EditCustomerGroupFooter";
import RightSideCustomerListing from "./RightSideCustomerListing";
import { useDispatch } from "react-redux";

const EditCustomerGroups = () => {
  const dispatch = useDispatch();
  const [hideSingleRight, sethideSingleRight] = useState(false);
  const [hideSingleLeft, setHideSingleLeft] = useState(false);
  const [hideDoubleRight, sethideDoubleRight] = useState(false);
  const [hideDoubleLeft, setHideDoubleLeft] = useState(false);
  const leftCustomerList = useSelector((state) => state.customerGroups.leftCustomerList);
  const leftTotalPages = useSelector((state) => state.customerGroups.leftTotalPages);
  const leftTotalElements = useSelector((state) => state.customerGroups.leftTotalElements);
  const leftPageNumber = useSelector((state) => state.customerGroups.leftPageNumber);

  const assignedCustomerList = useSelector((state) => state.customerGroups.assignedCustomerList);
  const assignedTotalPages = useSelector((state) => state.customerGroups.assignedTotalPages);
  const assignedTotalElements = useSelector((state) => state.customerGroups.assignedTotalElements);
  const assignedPageNumber = useSelector((state) => state.customerGroups.assignedPageNumber);

  const initialList = useSelector((state) => state.customerGroups.initialList);
  const selectedList = useSelector((state) => state.customerGroups.selectedList);
  const reverseFlag = useSelector((state) => state.customerGroups.reverseFlag);
  const deleteList = useSelector((state) => state.customerGroups.deleteList);
  const saveList = useSelector((state) => state.customerGroups.saveList);
  const unSelectedList = useSelector((state) => state.customerGroups.unSelectedList);

  const leftLoading = useSelector((state) => state.customerGroups.leftLoading);
  const rightLoading = useSelector((state) => state.customerGroups.rightLoading);

  const handleSingleRightMove = () => {
    dispatch(setChangesInCustomerSelection(true));
    selectedList?.map((customer) => {
      if (initialList?.includes(customer.customerPK)) {
        dispatch(removeDeleteList(customer.customerPK));
      } else {
        if (!reverseFlag) {
          dispatch(updateSaveList(customer.customerPK));
        } else {
          dispatch(removeExceptList(customer.customerPK));
        }
      }
      dispatch(removeFromSelectedList(customer));
    });
  };

  const handledoubleArrowRight = () => {
    dispatch(setDeleteList(undefined));
    dispatch(setChangesInCustomerSelection(true));
    dispatch(setReverseFlag(true));
    dispatch(setExceptList());
    setHideSingleLeft(true);
    sethideSingleRight(true);
    dispatch(setLeftPageNumber(0));
    dispatch(setSelectedList([]));
  };

  const handleSingleLeftMove = () => {
    dispatch(setChangesInCustomerSelection(true));
    unSelectedList?.map((customer) => {
      if (reverseFlag) {
        dispatch(updateExceptList(customer.customerPK));
      }

      if (initialList?.includes(customer.customerPK)) {
        dispatch(updateDeleteList(customer.customerPK));
      } else {
        if (saveList?.includes(customer.customerPK)) {
          dispatch(removeSaveList(customer.customerPK));
        }
        if (reverseFlag) {
          dispatch(updateExceptList(customer.customerPK));
        }
      }
      dispatch(removeFromUnSelectedList(customer));
    });
  };

  const handledoubleArrowLeft = () => {
    dispatch(setChangesInCustomerSelection(true));
    initialList?.map((unittype) => {
      if (!deleteList?.includes(unittype)) {
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
    if (assignedCustomerList?.length === 0) {
      setHideDoubleLeft(true);
    } else {
      setHideDoubleLeft(false);
    }
  }, [assignedCustomerList]);

  useEffect(() => {
    if (leftCustomerList?.length === 0) {
      sethideDoubleRight(true);
    } else {
      sethideDoubleRight(false);
    }
  }, [leftCustomerList]);

  /*For clearing states*/
  useEffect(() => {
    dispatch(resetArrays());
    dispatch(setAssignedPageNumber(0));
    dispatch(setLeftPageNumber(0));
    dispatch(setReverseFlag(false));
    dispatch(setChangesInCustomerSelection(false));
  }, []);
  return (
    <GroupsEditPageTemplate
      loading={leftLoading || rightLoading}
      FormHeaderComponent={<EditCustomerGroupHeader />}
      UnassignedGroupsListing={<LeftSideCustomerListing />}
      UnassignedGroupsPagination={
        <PaginationComponent
          pageNumber={leftPageNumber}
          setPageNumber={setLeftPageNumber}
          totalPages={leftTotalPages}
          totalElements={leftTotalElements}
          listingData={leftCustomerList}
          numberOfElements={leftCustomerList?.length}
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
      AssignedGroupsListing={<RightSideCustomerListing />}
      AssignedGroupsPagination={
        <PaginationComponent
          pageNumber={assignedPageNumber}
          setPageNumber={setAssignedPageNumber}
          totalPages={assignedTotalPages}
          totalElements={assignedTotalElements}
          listingData={assignedCustomerList}
          numberOfElements={assignedCustomerList?.length}
          firstPage
          lastPage
          singleArrowDown
          singleArrowUp
          hideBorderTop
          hideBorderBottom
          hideBorderRight
        />
      }
      FormFooterComponent={<EditCustomerGroupFooter />}
    />
  );
};

export default EditCustomerGroups;
