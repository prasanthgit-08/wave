import React, { useEffect, useState } from "react";
import FormHeader from "./FormHeader"; // Ensure you import this if it's in another file.
import PickerController from "../../../common/PickerController";
import { Col, Row } from "react-bootstrap";
import LeftListing from "./LeftListing";
import RightListing from "./RightListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import UserPermissionsGroupService from "../../../../services/UserPermissionsGroupService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDeleteList,
  removeExceptList,
  removeSaveList,
  setLefttPageNumber,
  setRightPageNumber,
  updateDeleteList,
  updateExceptList,
  updateField,
  updateMultipleFields,
  updateSaveList,
} from "../../../../redux/UserPermissionGroupSlice";

const HalfScreenGroupTemplate = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [hideSingleRight, setHideSingleRight] = useState(false);
  const [hideSingleLeft, setHideSingleLeft] = useState(false);
  const [hideDoubleRight, setHideDoubleRight] = useState(false);
  const [hideDoubleLeft, setHideDoubleLeft] = useState(false);

  const selectedListLeft = useSelector((state) => state.userPermissionGroup.selectedListLeft);
  const selectedListRight = useSelector((state) => state.userPermissionGroup.selectedListRight);
  const initialList = useSelector((state) => state.userPermissionGroup.initialList);
  const saveList = useSelector((state) => state.userPermissionGroup.saveList);
  const reverse = useSelector((state) => state.userPermissionGroup.reverse);
  const leftList = useSelector((state) => state.userPermissionGroup.leftList);
  const rightList = useSelector((state) => state.userPermissionGroup.rightList);
  const note = useSelector((state) => state.userPermissionGroup.note);
  const notedElement = useSelector((state) => state.userPermissionGroup.notedElement);
  const leftpageNumber = useSelector((state) => state.userPermissionGroup.leftpageNumber);
  const rightpageNumber = useSelector((state) => state.userPermissionGroup.rightpageNumber);
  const leftTotalPages = useSelector((state) => state.userPermissionGroup.leftTotalPages);
  const rightTotalPages = useSelector((state) => state.userPermissionGroup.rightTotalPages);
  const leftTotalElements = useSelector((state) => state.userPermissionGroup.leftTotalElements);
  const rightTotalElements = useSelector((state) => state.userPermissionGroup.rightTotalElements);
  const leftPage = useSelector((state) => state.userPermissionGroup.leftPage);
  const rightPage = useSelector((state) => state.userPermissionGroup.rightPage);

  const leftSidePagination = {
    pageNumber: leftpageNumber,
    setPageNumber: setLefttPageNumber,
    totalPages: leftTotalPages,
    totalElements: leftTotalElements,
    listingData: leftPage,
  };

  const rightSidePagination = {
    pageNumber: rightpageNumber,
    setPageNumber: setRightPageNumber,
    totalPages: rightTotalPages,
    totalElements: rightTotalElements,
    listingData: rightPage,
  };

  useEffect(() => {
    if (selectedListLeft?.length >= 1) {
      setHideSingleRight(false);
    } else {
      setHideSingleRight(true);
    }
    if (selectedListRight?.length >= 1) {
      setHideSingleLeft(false);
    } else {
      setHideSingleLeft(true);
    }
    if (leftList?.length >= 1) {
      setHideDoubleRight(false);
    } else {
      setHideDoubleRight(true);
    }
    if (rightList?.length >= 1) {
      setHideDoubleLeft(false);
    } else {
      setHideDoubleLeft(true);
    }
  }, [selectedListLeft, selectedListRight, leftList, rightList]);

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const handleDouleRightArrowClick = () => {
    const data = {
      deleteList: [],
      reverse: true,
      exceptionList: [],
      leftpageNumber: 0,
      selectedListLeft: [],
    };
    dispatch(updateMultipleFields(data));
    setHideSingleLeft(true);
    setHideSingleRight(true);
    updateData("disableSave", false);
  };

  const handleSigleRightArrowClick = (element) => {
    const temp = selectedListLeft;
    temp.map((element) => {
      if (initialList?.includes(element)) {
        dispatch(removeDeleteList(element));
      } else {
        if (!reverse) {
          dispatch(updateSaveList(element));
        } else {
          dispatch(removeExceptList(element));
        }
      }
    });
    updateData("disableSave", false);
    updateData("selectedListLeft", []);
  };

  const handleDouleLeftArrowClick = () => {
    const data = {
      deleteList: initialList,
      reverse: false,
      exceptionList: [],
      saveList: [],
      rightpageNumber: 0,
      selectedListRight: [],
    };
    dispatch(updateMultipleFields(data));
    setHideSingleLeft(true);
    setHideSingleRight(true);
    updateData("disableSave", false);
  };

  const handleSigleLeftArrowClick = () => {
    const temp = selectedListRight;
    temp.map((element) => {
      if (reverse) {
        dispatch(updateExceptList(element));
      }
      if (initialList?.includes(element)) {
        dispatch(updateDeleteList(element));
      } else {
        if (saveList.includes(element)) {
          dispatch(removeSaveList(element));
        }
      }
      updateData("disableSave", false);
    });
    updateData("selectedListRight", []);
  };

  useEffect(() => {
    // Drop any initialList left in redux from an earlier visit, so the listings wait for this record's
    // list instead of fetching once with the stale one and again when the fresh one arrives
    updateData("initialList", null);
    if (id != null && id != undefined && id != 0) {
      UserPermissionsGroupService.requestData("Initial", [], [], [], 0, [], 0, id).then(({ data }) => {
        const values = data?.response?.data.map((item) => item.PermissionGroupFK);
        updateData("initialList", values || []);
      });
    }
  }, [id]);

  return (
    <div className="table-bordered customContainer halfScreenWidth shadow-sm rounded border ">
      <div className="border border-dark border-2 ">
        <FormHeader />
        <div className="border border-dark border-2 border-right-0 border-left-0">
          <Row className=" h-550px p-0 m-0">
            <div className={`p-r-0 p-l-0 col`}>
              <div className="d-flex h-100 justify-content-between">
                <PaginationComponent
                  firstPage
                  lastPage
                  singleArrowDown
                  singleArrowUp
                  hideBorderTop
                  hideBorderBottom
                  {...leftSidePagination}
                />
                <div className="w-100">
                  <LeftListing />
                </div>
              </div>
            </div>
            <div className="col-auto border border-dark border-2 border-top-0 border-right-0 border-bottom-0 px-0">
              <div className="col-auto d-flex h-100 justify-content-between">
                <PickerController
                  hideBorderLeft
                  hideBorderRight
                  disableDoubleArrowRight={hideDoubleRight}
                  disableDoubleArrowLeft={hideDoubleLeft}
                  disableSingleArrowRight={hideSingleRight}
                  disableSingleArrowLeft={hideSingleLeft}
                  doubleArrowRightOnClick={() => {
                    handleDouleRightArrowClick();
                  }}
                  singleArrowRightOnClick={() => {
                    handleSigleRightArrowClick();
                  }}
                  singleArrowLeftOnClick={() => {
                    handleSigleLeftArrowClick();
                  }}
                  doubleArrowLeftOnClick={() => {
                    handleDouleLeftArrowClick();
                  }}
                />
              </div>
            </div>
            <div className="col border border-dark border-2 border-top-0 border-right-0 border-bottom-0 px-0">
              <div className="d-flex h-100 justify-content-between">
                <div className="w-100">
                  <RightListing />
                </div>
                <PaginationComponent
                  firstPage
                  lastPage
                  singleArrowDown
                  singleArrowUp
                  hideBorderTop
                  hideBorderBottom
                  hideBorderRight
                  {...rightSidePagination}
                />
              </div>
            </div>
          </Row>
        </div>
        {/* Styled Textarea */}
        <div className="shadow-sm rounded border ">
          <div className="textarea-container mt-1">
            <textarea
              disabled
              rows={5}
              cols={20}
              value={selectedListRight.includes(notedElement) ? note : ""}
              type="text"
              name="notes"
              className={`customFormControl h-100  `}
            />
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default HalfScreenGroupTemplate;
