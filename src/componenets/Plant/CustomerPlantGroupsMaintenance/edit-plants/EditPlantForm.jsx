import React, { useEffect, useState } from "react";
import EditPlantHeader from "./EditPlantHeader";
import EditPlantFooter from "./EditPlantFooter";
import PickerController from "../../../common/PickerController";
import UnassignedPlantsListing from "./UnassignedPlantsListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import AssignedPlantsListing from "./AssignedPlantsListing";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  removeFromUnSelectedList,
  removeSaveList,
  setDeleteList,
  setExceptList,
  setLeftPlantsPageno,
  setReverseFlag,
  setRightPlantsPageno,
  setSaveList,
  setSelectedList,
  setUnSelectedList,
  updateDeleteList,
  updateExceptList,
  updateSaveList,
} from "../../../../redux/CustomerPlantGroupSlice";
import LoadingIcon from "../../../common/LoadingIcon";
import GroupsEditPageTemplate from "../../../Templates/GroupsEditPageTemplate";

const EditPlantForm = () => {
  const dispatch = useDispatch();

  const [hideSingleRight, sethideSingleRight] = useState(false);
  const [hideSingleLeft, setHideSingleLeft] = useState(false);
  const [hideDoubleRight, sethideDoubleRight] = useState(false);
  const [hideDoubleLeft, setHideDoubleLeft] = useState(false);

  const selectedList = useSelector((state) => state.customerPlantGroup.selectedList);
  const unSelectedList = useSelector((state) => state.customerPlantGroup.unSelectedList);

  const saving = useSelector((state) => state.customerPlantGroup.saving);

  const initialList = useSelector((state) => state.customerPlantGroup.initialList);
  const saveList = useSelector((state) => state.customerPlantGroup.saveList);
  const deleteList = useSelector((state) => state.customerPlantGroup.deleteList);
  const reverseFlag = useSelector((state) => state.customerPlantGroup.reverseFlag);

  const rightPlantsList = useSelector((state) => state.customerPlantGroup.rightPlantsList);
  const rightPlantsPageno = useSelector((state) => state.customerPlantGroup.rightPlantsPageno);
  const rightPlantsTotalPages = useSelector((state) => state.customerPlantGroup.rightPlantsTotalPages);
  const rightPlantsTotalElements = useSelector((state) => state.customerPlantGroup.rightPlantsTotalElements);

  const leftPlantsList = useSelector((state) => state.customerPlantGroup.leftPlantsList);
  const leftPlantsPageno = useSelector((state) => state.customerPlantGroup.leftPlantsPageno);
  const leftPlantsTotalPages = useSelector((state) => state.customerPlantGroup.leftPlantsTotalPages);
  const leftPlantsTotalElements = useSelector((state) => state.customerPlantGroup.leftPlantsTotalElements);

  const doubleArrowLeftOnClick = () => {
    initialList.map((plant) => {
      if (!deleteList.includes(plant)) {
        dispatch(updateDeleteList(plant));
      }
    });
    dispatch(setReverseFlag(false));
    dispatch(setSaveList());
    dispatch(setExceptList());
    dispatch(setRightPlantsPageno(0));
    dispatch(setUnSelectedList([]));
  };
  const singleArrowLeftOnClick = () => {
    unSelectedList.map((plant) => {
      if (reverseFlag) {
        dispatch(updateExceptList(plant.customerPlantPK));
      }
      if (initialList.includes(plant.customerPlantPK)) {
        dispatch(updateDeleteList(plant.customerPlantPK));
      } else {
        if (saveList.includes(plant.customerPlantPK)) {
          dispatch(removeSaveList(plant.customerPlantPK));
        }
      }
      dispatch(removeFromUnSelectedList(plant));
    });
  };

  const doubleArrowRightOnClick = () => {
    dispatch(setDeleteList(undefined));
    dispatch(setReverseFlag(true));
    dispatch(setExceptList());
    dispatch(setLeftPlantsPageno(0));
    dispatch(setSelectedList([]));
  };
  const singleArrowRightOnClick = () => {
    selectedList.map((plant) => {
      if (initialList.includes(plant.customerPlantPK)) {
        dispatch(removeDeleteList(plant.customerPlantPK));
      } else {
        if (!reverseFlag) {
          dispatch(updateSaveList(plant.customerPlantPK));
        } else {
          dispatch(removeExceptList(plant.customerPlantPK));
        }
      }
      dispatch(removeFromSelectedList(plant));
    });
  };

  useEffect(() => {
    if (!leftPlantsList || leftPlantsList.length === 0) {
      sethideDoubleRight(true);
    } else {
      sethideDoubleRight(false);
    }
  }, [leftPlantsList]);

  useEffect(() => {
    if (!unSelectedList || unSelectedList.length === 0) {
      setHideSingleLeft(true);
    } else {
      setHideSingleLeft(false);
    }
  }, [unSelectedList]);

  useEffect(() => {
    if (!selectedList || selectedList.length === 0) {
      sethideSingleRight(true);
    } else {
      sethideSingleRight(false);
    }
  }, [selectedList]);
  useEffect(() => {
    if (!rightPlantsList || rightPlantsList.length === 0) {
      setHideDoubleLeft(true);
    } else {
      setHideDoubleLeft(false);
    }
  }, [rightPlantsList]);

  return (
    <>
      {
        <GroupsEditPageTemplate
          FormHeaderComponent={<EditPlantHeader />}
          UnassignedGroupsListing={<UnassignedPlantsListing />}
          UnassignedGroupsPagination={
            <PaginationComponent
              pageNumber={leftPlantsPageno}
              setPageNumber={setLeftPlantsPageno}
              totalPages={leftPlantsTotalPages}
              totalElements={leftPlantsTotalElements}
              listingData={leftPlantsList}
              numberOfElements={leftPlantsList.length}
              firstPage
              lastPage
              singleArrowDown
              singleArrowUp
              hideBorderTop
              hideBorderBottom
            />
          }
          PickerControllerComponent={
            <PickerController
              hideBorderLeft
              hideBorderRight
              doubleArrowLeftOnClick={doubleArrowLeftOnClick}
              singleArrowLeftOnClick={singleArrowLeftOnClick}
              doubleArrowRightOnClick={doubleArrowRightOnClick}
              singleArrowRightOnClick={singleArrowRightOnClick}
              disableDoubleArrowLeft={hideDoubleLeft}
              disableSingleArrowLeft={hideSingleLeft}
              disableDoubleArrowRight={hideDoubleRight}
              disableSingleArrowRight={hideSingleRight}
            />
          }
          AssignedGroupsListing={<AssignedPlantsListing />}
          AssignedGroupsPagination={
            <PaginationComponent
              pageNumber={rightPlantsPageno}
              setPageNumber={setRightPlantsPageno}
              totalPages={rightPlantsTotalPages}
              totalElements={rightPlantsTotalElements}
              listingData={rightPlantsList}
              numberOfElements={rightPlantsList.length}
              firstPage
              lastPage
              singleArrowDown
              singleArrowUp
              hideBorderTop
              hideBorderBottom
              hideBorderRight
            />
          }
          FormFooterComponent={<EditPlantFooter />}
        />
      }
      {saving && <LoadingIcon />}
    </>
  );
};

export default EditPlantForm;
