import React from "react";
import { useEffect } from "react";
import DealerGroupService from "../../../../services/DealerGroupService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromUnSelectedList,
  removeSaveList,
  setAssignedDealerList,
  setAssignedTotalElements,
  setAssignedTotalPages,
  setUnSelectedList,
  setinitialList,
  updateExceptList,
  updateDeleteList,
  updateUnSelectedList,
  setAssignedSort,
  setAssignedSortValue,
  setChangesInDealerSelection,
  setTotalDealerList,
  setTotalTotalElements,
  setTotalTotalPages,
  setTotalPageNumber,
  setLeftLoading,
  setAssignedPageNumber,
} from "../../../../redux/EditDealerGroupslice";
import { useState } from "react";
import LoadingText from "../../../common/LoadingText";

const GroupDealerListing = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const totalPageNumber = useSelector((state) => state.editDealerGroupReducer.totalPageNumber);
  const assignedPageNumber = useSelector((state) => state.editDealerGroupReducer.assignedPageNumber);
  const assignedDealerList = useSelector((state) => state.editDealerGroupReducer.assignedDealerList);
  const unSelectedList = useSelector((state) => state.editDealerGroupReducer.unSelectedList);
  const reverseList = useSelector((state) => state.editDealerGroupReducer.reverseList);

  const showAdvancedSort = useSelector((state) => state.editDealerGroupReducer.showAdvanceSort);
  const initialList = useSelector((state) => state.editDealerGroupReducer.initialList);
  const saveList = useSelector((state) => state.editDealerGroupReducer.saveList);
  const deleteList = useSelector((state) => state.editDealerGroupReducer.deleteList);
  const searchList = useSelector((state) => state.editDealerGroupReducer.searchList);
  const exceptList = useSelector((state) => state.editDealerGroupReducer.exceptList);
  const searchTerm = useSelector((state) => state.editDealerGroupReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.editDealerGroupReducer.searchCriteria);
  const assignedSort = useSelector((state) => state.editDealerGroupReducer.assignedSort);
  const assignedSortValue = useSelector((state) => state.editDealerGroupReducer.assignedSortValue);
  const sort = useSelector((state) => state.editDealerGroupReducer.sort);
  const sortValue = useSelector((state) => state.editDealerGroupReducer.sortValue);
  const name = useSelector((state) => state.editDealerGroupReducer.name);
  const dba = useSelector((state) => state.editDealerGroupReducer.dba);
  const state = useSelector((state) => state.editDealerGroupReducer.state);
  const city = useSelector((state) => state.editDealerGroupReducer.city);
  const isActive = useSelector((state) => state.editDealerGroupReducer.isActive);

  const advanceSortingOrder = useSelector((state) => state.editDealerGroupReducer.advanceSortingOrder);

  const leftLoading = useSelector((state) => state.editDealerGroupReducer.leftLoading);
  const [lastClick, setLastClick] = useState();

  const [fetchedInitials, setFetchedInitials] = useState(false);

  const id = params.dealerGroupPK;

  const handleClick = (event, dealer) => {
    dispatch(setChangesInDealerSelection(true));
    if (event.ctrlKey && event.shiftKey) {
      event.preventDefault();
      const index1 = assignedDealerList.indexOf(dealer);
      const index2 = assignedDealerList.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedDealerList.slice(index1, index2 + 1);
      } else {
        array = assignedDealerList.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!unSelectedList.includes(obj)) {
          dispatch(updateUnSelectedList(obj));
        }
      });
    } else if (event.ctrlKey) {
      if (unSelectedList.includes(dealer)) {
        dispatch(removeFromUnSelectedList(dealer));
      } else {
        dispatch(updateUnSelectedList(dealer));
      }
      setLastClick(dealer);
    } else if (event.shiftKey) {
      event.preventDefault();

      const index1 = assignedDealerList.indexOf(dealer);
      const index2 = assignedDealerList.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedDealerList.slice(index1, index2 + 1);
      } else {
        array = assignedDealerList.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!unSelectedList.includes(obj)) {
          dispatch(updateUnSelectedList(obj));
        }
      });
    } else {
      const isPresent = unSelectedList.find((obj) => obj.DealerPK === dealer.DealerPK);
      if (isPresent) {
        dispatch(removeFromUnSelectedList(dealer));
      } else {
        dispatch(setUnSelectedList(dealer));
      }
      setLastClick(dealer);
    }
  };

  const handleDoubleClick = (dealerpk) => {
    dispatch(setChangesInDealerSelection(true));
    if (!reverseList) {
      if (initialList.includes(dealerpk)) {
        dispatch(updateDeleteList(dealerpk));
      } else if (saveList.includes(dealerpk)) {
        dispatch(removeSaveList(dealerpk));
      }
    } else {
      dispatch(updateExceptList(dealerpk));
    }
  };

  const getInitialList = () => {
    dispatch(setLeftLoading(true));
    DealerGroupService.getInitialList(id).then((response) => {
      dispatch(setinitialList(response.data));
      setFetchedInitials(true);
    });
  };

  useEffect(() => {
    if (fetchedInitials) {
      dispatch(setLeftLoading(true));
      const debounceFunction = setTimeout(() => {
        DealerGroupService.getLeftDealers(
          assignedPageNumber,
          20,
          totalPageNumber,
          20,
          searchCriteria,
          searchTerm,
          id,
          deleteList,
          saveList,
          searchList,
          exceptList,
          sort,
          assignedSort,
          sortValue,
          assignedSortValue,
          city,
          dba,
          state,
          name,
          advanceSortingOrder,
          isActive,
          reverseList
        )
          .then((response) => {
            if (
              response?.data?.LeftPagination?.length === 1 &&
              response?.data?.LeftPagination[0]?.TotalPages ===
                response?.data?.LeftPagination[0]?.PageNumber &&
              Number(response.data?.LeftPagination[0]?.TotalPages) > 0
            ) {
              dispatch(setTotalPageNumber(Number(response.data?.LeftPagination[0]?.TotalPages) - 1));
            } else {
              if (Number(response.data?.LeftPagination[0]?.TotalPages) <= 0) {
                dispatch(setTotalPageNumber(0));
              }
              dispatch(setTotalDealerList(response.data.LeftDealerList));
              dispatch(setTotalTotalElements(response.data?.LeftPagination[0]?.TotalElements));
              dispatch(setTotalTotalPages(response.data?.LeftPagination[0]?.TotalPages));
              dispatch(setAssignedDealerList(response.data.RightDealerList));
              dispatch(setAssignedTotalElements(response.data?.RightPagination[0]?.TotalElements));
              dispatch(setAssignedTotalPages(response.data?.RightPagination[0]?.TotalPages));
              setLastClick(response.data.LeftDealerList[0]);

              if (
                response.data.RightDealerList.length === 0 &&
                response.data?.RightPagination[0]?.PageNumber > 0
              ) {
                dispatch(setAssignedPageNumber(response.data?.RightPagination[0]?.PageNumber - 1));
              }
              if (
                response.data.LeftDealerList.length === 0 &&
                response.data?.LeftPagination[0]?.PageNumber > 0
              ) {
                dispatch(setTotalPageNumber(response.data?.LeftPagination[0]?.PageNumber - 1));
              }

              dispatch(setLeftLoading(false));
            }
          })
          .catch(() => {
            dispatch(setLeftLoading(false));
          });
      }, 200);

      return () => clearTimeout(debounceFunction);
    }
  }, [
    initialList,
    saveList,
    deleteList,
    assignedPageNumber,
    searchList,
    fetchedInitials,
    exceptList,
    sort,
    sortValue,
    reverseList,
    assignedSort,
    assignedSortValue,
    totalPageNumber,
    searchCriteria,
    searchTerm,
    isActive,
    name,
    dba,
    state,
    city,
    advanceSortingOrder,
  ]);

  useEffect(() => {
    dispatch(setinitialList());
    getInitialList();
  }, []);

  return (
    <div className="fixTableHead no-select" style={{ padding: 0, flex: 1 }}>
      {!leftLoading && (
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600 "
                onClick={() => {
                  if (showAdvancedSort) return;
                  dispatch(setAssignedSort(!assignedSort));
                  dispatch(setAssignedSortValue("name"));
                }}
              >
                Dealer Name
                {!showAdvancedSort && assignedSort && assignedSortValue === "name" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!showAdvancedSort && !assignedSort && assignedSortValue === "name" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {assignedDealerList.map((dealer) => (
              <tr
                id="rowId"
                key={dealer?.DealerPK}
                onClick={(event) => {
                  handleClick(event, dealer);
                }}
                onDoubleClick={() => {
                  handleDoubleClick(dealer.DealerPK);
                  dispatch(removeFromUnSelectedList(dealer));
                }}
                className={
                  unSelectedList.some((element) => element.DealerPK === dealer.DealerPK)
                    ? "tableSelected"
                    : ""
                }
              >
                <td>{dealer.Name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!leftLoading && assignedDealerList.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
      {leftLoading && <LoadingText />}
    </div>
  );
};

export default GroupDealerListing;
