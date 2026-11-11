import React from "react";
import FormHeader from "./FormHeader";
import GroupsEditPageTemplate from "../../../Templates/GroupsEditPageTemplate";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../common/PaginationComponent";
import PickerController from "../../../common/PickerController";
import EditPortsFormFooter from "./EditPortsFormFooter";
import LeftPortsListing from "./LeftPortsListing";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  removeFromUnSelectedList,
  removeSaveList,
  resetArrays,
  setChangesInPortsSelection,
  setDeleteList,
  setExceptList,
  setLeftPageNumber,
  setReverseList,
  setSaveList,
  setSelectedList,
  setUnSelectedList,
  updateDeleteList,
  updateExceptList,
  updateSaveList,
} from "../../../../redux/EditExportBrokersSlice";
import AssignedBrokersListing from "./AssignedBrokersListing";
import RightPortsListing from "./RightPortsListing";
import { setAssignedPageNumber, setExcludeList } from "../../../../redux/ExportBrokersSlice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import EditPortsHeader from "./EditPortsHeader";
const EditPorts = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const leftPortsList = useSelector((state) => state.editExportBrokersReducer.leftPortsList);
  const leftPageNumber = useSelector((state) => state.editExportBrokersReducer.leftPageNumber);
  const leftTotalElements = useSelector((state) => state.editExportBrokersReducer.leftTotalElements);
  const leftTotalPages = useSelector((state) => state.editExportBrokersReducer.leftTotalPages);
  const assignedPageNumber = useSelector((state) => state.exportBrokersReducer.assignedPageNumber);
  const assignedPortsList = useSelector((state) => state.exportBrokersReducer.assignedPortsList);
  const assignedTotalPages = useSelector((state) => state.exportBrokersReducer.assignedTotalPages);
  const assignedTotalElements = useSelector((state) => state.exportBrokersReducer.assignedTotalElements);
  const selectedList = useSelector((state) => state.editExportBrokersReducer.selectedList);
  const unSelectedList = useSelector((state) => state.editExportBrokersReducer.unSelectedList);
  const reverseList = useSelector((state) => state.editExportBrokersReducer.reverseList);
  const initialList = useSelector((state) => state.editExportBrokersReducer.initialList);
  const saveList = useSelector((state) => state.editExportBrokersReducer.saveList);
  const deleteList = useSelector((state) => state.editExportBrokersReducer.deleteList);
  const exceptList = useSelector((state) => state.editExportBrokersReducer.exceptList);
  const leftLoading = useSelector((state) => state.editExportBrokersReducer.leftLoading);
  const rightLoading = useSelector((state) => state.editExportBrokersReducer.rightLoading);

  const [hideSingleRight, sethideSingleRight] = useState(false);
  const [hideSingleLeft, setHideSingleLeft] = useState(false);
  const [hideDoubleRight, sethideDoubleRight] = useState(false);
  const [hideDoubleLeft, setHideDoubleLeft] = useState(false);
  const [close, setclose] = useState(false);
  const handleSingleRightMove = () => {
    dispatch(setChangesInPortsSelection(true));
    selectedList.map((ports) => {
      if (initialList.includes(ports.poePK)) {
        dispatch(removeDeleteList(ports.poePK));
      } else {
        if (!reverseList) {
          dispatch(updateSaveList(ports.poePK));
        } else {
          dispatch(removeExceptList(ports.poePK));
        }
      }
      dispatch(removeFromSelectedList(ports));
    });
  };
  const handleSingleLeftMove = () => {
    dispatch(setChangesInPortsSelection(true));

    unSelectedList.map((ports) => {
      if (reverseList) {
        dispatch(updateExceptList(ports.poePK));
        if (initialList.includes(ports.poePK)) {
          dispatch(updateDeleteList(ports.poePK));
        }
      } else if (initialList.includes(ports.poePK)) {
        dispatch(updateDeleteList(ports.poePK));
      } else {
        if (saveList.includes(ports.poePK)) {
          dispatch(removeSaveList(ports.poePK));
        }
        if (reverseList) {
          dispatch(updateExceptList(ports.poePK));
        }
      }
      dispatch(removeFromUnSelectedList(ports));
    });
  };
  const handledoubleArrowRight = () => {
    dispatch(setChangesInPortsSelection(true));
    dispatch(setReverseList(true));
    dispatch(setExceptList());
    sethideSingleRight(true);
    setHideSingleLeft(true);
    dispatch(setLeftPageNumber(0));
    dispatch(setSelectedList());
    dispatch(setDeleteList());
  };

  const handledoubleArrowLeft = () => {
    dispatch(setChangesInPortsSelection(true));
    initialList.map((ports) => {
      if (!deleteList.includes(ports)) {
        dispatch(updateDeleteList(ports));
      }
    });
    dispatch(setReverseList(false));
    dispatch(setSaveList());
    dispatch(setExcludeList());
    dispatch(setExceptList());
    dispatch(setAssignedPageNumber(0));
    sethideSingleRight(true);
    setHideSingleLeft(true);
    dispatch(setLeftPageNumber(0));
    dispatch(setUnSelectedList());
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
    if (assignedPortsList.length === 0) {
      setHideDoubleLeft(true);
    } else {
      setHideDoubleLeft(false);
    }
  }, [assignedPortsList]);

  useEffect(() => {
    if (leftPortsList.length === 0) {
      sethideDoubleRight(true);
    } else {
      sethideDoubleRight(false);
    }
  }, [leftPortsList]);

  useEffect(() => {
    dispatch(resetArrays());
    dispatch(setAssignedPageNumber(0));
    dispatch(setLeftPageNumber(0));
    dispatch(setChangesInPortsSelection(false));
    dispatch(setReverseList(false));
  }, []);
  return (
    <GroupsEditPageTemplate
      FormHeaderComponent={<EditPortsHeader />}
      UnassignedGroupsListing={<LeftPortsListing />}
      UnassignedGroupsPagination={
        <PaginationComponent
          // {...paginationProps}
          loading={leftLoading}
          pageNumber={leftPageNumber}
          setPageNumber={setLeftPageNumber}
          totalPages={leftTotalPages}
          totalElements={leftTotalElements}
          listingData={leftPortsList}
          numberOfElements={leftPortsList.length}
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
      AssignedGroupsListing={<RightPortsListing />}
      AssignedGroupsPagination={
        <PaginationComponent
          //  {...paginationProps}
          loading={rightLoading}
          pageNumber={assignedPageNumber}
          setPageNumber={setAssignedPageNumber}
          totalPages={assignedTotalPages}
          totalElements={assignedTotalElements}
          listingData={assignedPortsList}
          numberOfElements={assignedPortsList.length}
          firstPage
          lastPage
          singleArrowDown
          singleArrowUp
          hideBorderTop
          hideBorderBottom
          hideBorderRight
        />
      }
      FormFooterComponent={<EditPortsFormFooter />}
    />
  );
};

export default EditPorts;
