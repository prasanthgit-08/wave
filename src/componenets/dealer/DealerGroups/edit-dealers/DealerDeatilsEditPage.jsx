import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDeleteList,
  removeExcpetList,
  removeFromSelectedList,
  removeFromUnSelectedList,
  removeSaveList,
  setAdvancedSearchObject,
  setAssignedDealerList,
  setAssignedPageNumber,
  setExcludeList,
  setIsActive,
  setReverseList,
  setSaveList,
  setSearchCriteria,
  setSearchTerm,
  setSelectedList,
  setShowAdvancedSearch,
  setShowAdvancedSort,
  setTotalDealerList,
  setTotalPageNumber,
  setUnSelectedList,
  updateExceptList,
  updateDeleteList,
  updateSaveList,
  setSearchList,
  resetArrays,
  setName,
  setDBA,
  setCity,
  setState,
  setAdvancedSortingCriteria,
  setAdvanceSortedValue,
  setSortValue,
  setChangesInDealerSelection,
  setTotalTotalPages,
  resetDealerSelectionSearch,
  setDeleteList,
  setTotalTotalElements,
  setAssignedTotalPages,
  setAssignedTotalElements,
  setinitialList,
  setAllToDeleteList,
} from "../../../../redux/EditDealerGroupslice";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import DealerDeatilsEditFooter from "./DealerDeatilsEditFooter";
import { PaginationComponent } from "../../../common/PaginationComponent";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import GroupDealerListing from "./GroupDealerListing";
import PickerController from "../../../common/PickerController";
import AdvancedSortComponent from "../../../common/AdvancedSortComponent";
import useWindowSizeForBreakpoint from "../../../../hooks/useWindowSizeForBreakpoint";
import TotalDealerListing from "./TotalDealerListing";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import { toast } from "react-hot-toast";
import LoadingText from "../../../common/LoadingText";
import LoadingIcon from "../../../common/LoadingIcon";

const DealerDeatilsEditPage = () => {
  const extraLargeScreenSearchFilterBreakpoint = 1550;
  const isBellowBreakpoint = useWindowSizeForBreakpoint(extraLargeScreenSearchFilterBreakpoint);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const id = params.dealerGroupPK;
  const pageNumber = params.pageNumber;

  const [showClose, setShowClose] = useState(false);

  const assignedPageNumber = useSelector((state) => state.editDealerGroupReducer.assignedPageNumber);
  const assignedTotalElements = useSelector((state) => state.editDealerGroupReducer.assignedTotalElements);
  const assignedTotalPages = useSelector((state) => state.editDealerGroupReducer.assignedTotalPages);
  const listingData = useSelector((state) => state.editDealerGroupReducer.assignedDealerList);
  const totalPageNumber = useSelector((state) => state.editDealerGroupReducer.totalPageNumber);
  const totalTotalElements = useSelector((state) => state.editDealerGroupReducer.totalTotalElements);
  const totalTotalPages = useSelector((state) => state.editDealerGroupReducer.totalTotalPages);
  const totallistingData = useSelector((state) => state.editDealerGroupReducer.totalDealerList);
  const selectedList = useSelector((state) => state.editDealerGroupReducer.selectedList);
  const unSelectedList = useSelector((state) => state.editDealerGroupReducer.unSelectedList);
  const assignedDealerList = useSelector((state) => state.editDealerGroupReducer.assignedDealerList);
  const reverseList = useSelector((state) => state.editDealerGroupReducer.reverseList);
  const advancedSearchObject = useSelector((state) => state.editDealerGroupReducer.advancedSearchObject);

  const searchTerm = useSelector((state) => state.editDealerGroupReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.editDealerGroupReducer.searchCriteria);
  const isActive = useSelector((state) => state.editDealerGroupReducer.isActive);

  const initialList = useSelector((state) => state.editDealerGroupReducer.initialList);
  const saveList = useSelector((state) => state.editDealerGroupReducer.saveList);
  const deleteList = useSelector((state) => state.editDealerGroupReducer.deleteList);
  const name = useSelector((state) => state.editDealerGroupReducer.name);
  const dba = useSelector((state) => state.editDealerGroupReducer.dba);
  const state = useSelector((state) => state.editDealerGroupReducer.state);
  const city = useSelector((state) => state.editDealerGroupReducer.city);

  const showAdvancedSearch = useSelector((state) => state.editDealerGroupReducer.showAdvanceSearch);
  const showAdvancedSort = useSelector((state) => state.editDealerGroupReducer.showAdvanceSort);
  const advanceSortedValue = useSelector((state) => state.editDealerGroupReducer.advanceSortedValue);
  const advanceSortingOrder = useSelector((state) => state.editDealerGroupReducer.advanceSortingOrder);

  const saving = useSelector((state) => state.editDealerGroupReducer.saving);
  const leftLoading = useSelector((state) => state.editDealerGroupReducer.leftLoading);
  const rightLoading = useSelector((state) => state.editDealerGroupReducer.rightLoading);
  const totalDealerList = useSelector((state) => state.editDealerGroupReducer.totalDealerList);
  const advanceSortOrder = useSelector((state) => state.editDealerGroupReducer.advanceSortOrder);

  const [hideSingleRight, sethideSingleRight] = useState(false);
  const [hideSingleLeft, setHideSingleLeft] = useState(false);
  const [hideDoubleRight, sethideDoubleRight] = useState(false);
  const [hideDoubleLeft, setHideDoubleLeft] = useState(false);

  const handleSingleRightMove = () => {
    dispatch(setChangesInDealerSelection(true));
    selectedList.map((dealer) => {
      if (initialList.includes(dealer.DealerPK != null ? dealer.DealerPK : dealer.DealerPK)) {
        dispatch(removeDeleteList(dealer.DealerPK != null ? dealer.DealerPK : dealer.DealerPK));
      } else {
        if (!reverseList) {
          dispatch(updateSaveList(dealer?.DealerPK));
        } else {
          dispatch(removeExcpetList(dealer.DealerPK != null ? dealer.DealerPK : dealer.DealerPK));
        }
      }
      dispatch(removeFromSelectedList(dealer));
    });
  };

  const handleCloseNo = () => {
    setShowClose(false);
  };
  const handleCloseYes = () => {
    navigate(`/`);
    toast.success("Page Closed");
    dispatch(setSaveList());
  };

  const handledoubleArrowRight = () => {
    dispatch(setChangesInDealerSelection(true));
    dispatch(updateExceptList());

    const searchListObject = {
      searchCriteria,
      searchTerm,
      isActive,
      name,
      dba,
      city,
      state,
      advanceSortingOrder: advanceSortOrder,
      firstField: advanceSortOrder?.firstField || "",
      secondField: advanceSortOrder?.secondField || "",
      thirdField: advanceSortOrder?.thirdField || "",
      fourthField: advanceSortOrder?.fourthField || "",
    };
    dispatch(setSearchList(searchListObject));

    // 1. Move all from left → right
    dispatch(setAssignedDealerList(totalDealerList));
    dispatch(setAssignedTotalElements(totalDealerList.length));
    dispatch(setAssignedTotalPages(1)); // or calculate based on page size

    // 2. Clear left side
    dispatch(setTotalDealerList([]));

    dispatch(setTotalTotalElements(0));
    dispatch(setTotalTotalPages(0));
    dispatch(setTotalPageNumber(0));

    // 3. Reset related selections/lists
    dispatch(setDeleteList(undefined));
    dispatch(setReverseList(true));
    dispatch(removeExcpetList());
    dispatch(setAssignedPageNumber(0));
    dispatch(setSelectedList([]));
    dispatch(setSaveList());
  };
  const handleSingleLeftMove = () => {
    dispatch(setChangesInDealerSelection(true));
    unSelectedList.map((dealer) => {
      if (initialList.includes(dealer.DealerPK != null ? dealer.DealerPK : dealer.incompletedealerPK)) {
        dispatch(updateDeleteList(dealer.DealerPK != null ? dealer.DealerPK : dealer.incompletedealerPK));
      } else {
        if (saveList.includes(dealer.DealerPK != null ? dealer.DealerPK : dealer.incompletedealerPK)) {
          dispatch(removeSaveList(dealer.DealerPK != null ? dealer.DealerPK : dealer.incompletedealerPK));
        }
        if (reverseList) {
          dispatch(updateExceptList(dealer.DealerPK != null ? dealer.DealerPK : dealer.incompletedealerPK));
        }
      }
      dispatch(removeFromUnSelectedList(dealer));
    });
  };

  const handledoubleArrowLeft = () => {
    dispatch(setChangesInDealerSelection(true));
    dispatch(setAllToDeleteList(initialList));
    dispatch(setReverseList(false));
    dispatch(setSaveList());
    dispatch(setExcludeList());
    dispatch(setSearchList());
    dispatch(setAssignedPageNumber(0));
  };

  const unassignedpaginationProps = {
    pageNumber: totalPageNumber,
    setPageNumber: setTotalPageNumber,
    totalPages: totalTotalPages,
    totalElements: totalTotalElements,
    listingData: totallistingData,
  };

  const assignedpaginationProps = {
    pageNumber: assignedPageNumber,
    setPageNumber: setAssignedPageNumber,
    totalPages: assignedTotalPages,
    totalElements: assignedTotalElements,
    listingData: listingData,
    loading: leftLoading,
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
    if (assignedDealerList.length === 0) {
      setHideDoubleLeft(true);
    } else {
      setHideDoubleLeft(false);
    }
  }, [assignedDealerList]);

  useEffect(() => {
    if (totallistingData.length === 0) {
      sethideDoubleRight(true);
    } else {
      sethideDoubleRight(false);
    }
  }, [totallistingData]);

  useEffect(() => {
    dispatch(resetArrays());
    dispatch(setAssignedPageNumber(0));
    dispatch(setTotalPageNumber(0));
    dispatch(resetDealerSelectionSearch());
  }, []);

  return (
    <div className="container-fluid table-bordered customContainer">
      <div className="row">
        {
          <div
            className={`border border-dark border-2 ${!saving ? "" : "hide-elements"}`}
            style={{
              minWidth: "1480px",
            }}
          >
            <SearchFilterComponent
              isNormalSearchFilter
              hasAdvancedSearch
              hasAdvancedSort
              secondRadioGroup
              handleCloseOnClick={() => {
                setShowClose(true);
              }}
              showAdvancedSearch={showAdvancedSearch}
              handleAdvancedSearchOnClick={() => {
                dispatch(setSearchTerm(""));
                dispatch(setShowAdvancedSearch());
                dispatch(setName(""));
                dispatch(setDBA(""));
                dispatch(setCity(""));
                dispatch(setState(""));
                dispatch(setAdvancedSearchObject(null));
              }}
              handleAdvancedSortOnClick={() => {
                if (!showAdvancedSort) {
                  // onClick when Advanced Sort is hidden
                  dispatch(setSortValue());
                } else {
                  // onClick when Advanced Sort is shown
                  dispatch(setAdvancedSortingCriteria(null));
                  dispatch(setAdvanceSortedValue(null));
                }
                // toggle Advanced Sort

                dispatch(setShowAdvancedSort());
              }}
              globalSearchTerm={searchTerm}
              setGlobalSearchTerm={setSearchTerm}
              setPageNumber={setTotalPageNumber}
              firstRadioGroupValue={searchCriteria}
              setFirstRadioGroupValue={setSearchCriteria}
              secondRadioGroupValue={isActive}
              setSecondRadioGroupValue={setIsActive}
            />
            <div
              className={`row border border-dark border-1 ${
                isBellowBreakpoint ? "fitHeightLargeScreen2" : "fitHeightDealerGroups"
              }`}
            >
              <div className={`p-r-0 p-l-0 col-7`}>
                <div className="d-flex h-100">
                  <PaginationComponent
                    {...unassignedpaginationProps}
                    recordsPerPage={20}
                    firstPage
                    lastPage
                    singleArrowDown
                    singleArrowUp
                    doubleArrowDown
                    doubleArrowUp
                    tripleArrowDown
                    tripleArrowUp
                    hideBorderBottom
                  />
                  <div className="w-100">
                    <TotalDealerListing />
                  </div>

                  <PickerController
                    doubleArrowRightOnClick={handledoubleArrowRight}
                    singleArrowRightOnClick={handleSingleRightMove}
                    singleArrowLeftOnClick={handleSingleLeftMove}
                    doubleArrowLeftOnClick={handledoubleArrowLeft}
                    disableDoubleArrowRight={hideDoubleRight}
                    disableSingleArrowRight={hideSingleRight}
                    disableSingleArrowLeft={hideSingleLeft}
                    disableDoubleArrowLeft={hideDoubleLeft}
                  />
                </div>
              </div>
              <div
                className={`col-2 border border-dark border-1 border-top-0 border-right-0 border-bottom-0 border-left-0`}
              >
                <div className={`row border-bottom-2px dealerGroupsMinHeight50`}>
                  {showAdvancedSearch && (
                    <AdvancedSearchComponent
                      fourFieldSearch
                      firstFieldName={"Name"}
                      secondFieldName={"DBA"}
                      thirdFieldName={"City"}
                      fourthFieldName={"State"}
                      maxLengthFourthField={2}
                      widthFourthField={"40px"}
                      customFourthField={(fourthField) => fourthField.toUpperCase()}
                      advancedSearchObject={advancedSearchObject}
                      setAdvancedSearchObject={setAdvancedSearchObject}
                      setPageNumber={setTotalPageNumber}
                      updateAdvancedSearchPayload={() => {
                        dispatch(setName(advancedSearchObject.firstField));
                        dispatch(setDBA(advancedSearchObject.secondField));
                        dispatch(setCity(advancedSearchObject.thirdField));
                        dispatch(setState(advancedSearchObject.fourthField));
                      }}
                    />
                  )}
                </div>

                <div className={`row height-fix-2 dealerGroupsMinHeight50`}>
                  {showAdvancedSort && (
                    <AdvancedSortComponent
                      fourFieldSort
                      firstFieldName={"Name"}
                      secondFieldName={"DBA"}
                      thirdFieldName={"City"}
                      fourthFieldName={"State"}
                      firstFieldPayload={"name"}
                      secondFieldPayload={"dba"}
                      thirdFieldPayload={"city"}
                      fourthFieldPayload={"stateCode"}
                      advancedSortingOrder={advanceSortingOrder}
                      setAdvancedSortingOrder={setAdvancedSortingCriteria}
                      advancedSortingCombination={advanceSortedValue}
                      setAdvancedSortingCombination={setAdvanceSortedValue}
                    />
                  )}
                </div>
              </div>

              <div className="col-3 border border-dark border-2 border-top-0 border-right-0 border-bottom-0 px-0">
                <div className="d-flex h-100">
                  <GroupDealerListing />
                  {}
                  <PaginationComponent
                    {...assignedpaginationProps}
                    recordsPerPage={20}
                    firstPage
                    lastPage
                    singleArrowDown
                    singleArrowUp
                    doubleArrowDown
                    doubleArrowUp
                    hideBorderBottom
                  />
                </div>
              </div>
            </div>
            <DealerDeatilsEditFooter />
          </div>
        }
        {(rightLoading || saving) && <LoadingIcon />}
      </div>
      <ModalComponent
        show={showClose}
        onHide={handleCloseNo}
        title={"Close Dealer Selection"}
        body={"Please confirm you want to close the program without saving your changes"}
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default DealerDeatilsEditPage;
