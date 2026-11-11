import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  removeFromUnSelectedList,
  removeSaveList,
  setAssignedPageNumber,
  setAssignedStatesList,
  setAssignedTotalElements,
  setAssignedTotalPages,
  setChangesInStatesSelection,
  setinitialList,
  setRightLoading,
  setIsInitialListLoaded,
  setStateSortFlag,
  setStateSortValue,
  setUnSelectedList,
  updateDeleteList,
  updateExceptList,
  updateUnSelectedList,
} from "../../../../redux/StateGroupsSlice";
import { useParams } from "react-router-dom";
import LoadingText from "../../../common/LoadingText";
import StateGroupsService from "../../../../services/StateGroupsService";

const RightStatesListing = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [lastClick, setLastClick] = useState();
  // const [loading, setLoading] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);

  const assignedPageNumber = useSelector((state) => state.stateGroupReducer.assignedPageNumber);

  const initialList = useSelector((state) => state.stateGroupReducer.initialList);
  const isInitialListLoaded = useSelector((state) => state.stateGroupReducer.isInitialListLoaded);
  const assignedStatesList = useSelector((state) => state.stateGroupReducer.assignedStatesList);
  const saveList = useSelector((state) => state.stateGroupReducer.saveList);
  const deleteList = useSelector((state) => state.stateGroupReducer.deleteList);
  const exceptList = useSelector((state) => state.stateGroupReducer.exceptList);
  const stateSortValue = useSelector((state) => state.stateGroupReducer.stateSortValue);
  const stateSortFlag = useSelector((state) => state.stateGroupReducer.stateSortFlag);
  const reverseFlag = useSelector((state) => state.stateGroupReducer.reverseFlag);
  const unSelectedList = useSelector((state) => state.stateGroupReducer.unSelectedList);
  const loading = useSelector((state) => state.stateGroupReducer.rightLoading);

  const handleClick = (event, states) => {
    if (event.ctrlKey && event.shiftKey) {
      event.preventDefault();
      const index1 = assignedStatesList?.indexOf(states);
      const index2 = assignedStatesList?.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedStatesList?.slice(index1, index2 + 1);
      } else {
        array = assignedStatesList?.slice(index2, index1 + 1);
      }
      array?.map((obj) => {
        if (!unSelectedList?.includes(obj)) {
          dispatch(assignedStatesList(obj));
        }
      });
    } else if (event.ctrlKey) {
      if (unSelectedList?.includes(states)) {
        dispatch(removeFromUnSelectedList(states));
      } else {
        dispatch(updateUnSelectedList(states));
      }
      setLastClick(states);
    } else if (event.shiftKey) {
      event.preventDefault();
      const index1 = assignedStatesList?.indexOf(states);
      const index2 = assignedStatesList?.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedStatesList?.slice(index1, index2 + 1);
      } else {
        array = assignedStatesList?.slice(index2, index1 + 1);
      }
      array?.map((obj) => {
        if (!unSelectedList?.includes(obj)) {
          dispatch(updateUnSelectedList(obj));
        }
      });
    } else {
      const isPresent = unSelectedList?.find((obj) => obj.statesPK === states.statesPK);
      if (isPresent) {
        dispatch(removeFromUnSelectedList(states));
      } else {
        dispatch(setUnSelectedList(states));
      }
      setLastClick(states);
    }
  };

  const handleDoubleClick = (states) => {
    dispatch(setChangesInStatesSelection(true));
    if (reverseFlag) {
      dispatch(updateExceptList(states));
    }

    if (initialList?.includes(states)) {
      dispatch(updateDeleteList(states));
    } else if (saveList?.includes(states)) {
      dispatch(removeSaveList(states));
    } else {
      dispatch(updateExceptList(states));
    }
  };

  useEffect(() => {
    dispatch(setRightLoading(true));
    // wait for the initial list - fetching before it arrives means fetching twice
    if (!isInitialListLoaded) return;
    const debounceFunction = setTimeout(() => {
      StateGroupsService.getRightStates(
        reverseFlag,
        assignedPageNumber,
        initialList,
        deleteList,
        saveList,
        exceptList,
        stateSortFlag,
        stateSortValue
      )
        .then((response) => {
          const { data } = response;
          dispatch(setAssignedStatesList(data?.content));

          dispatch(setAssignedTotalElements(data?.totalElements));
          dispatch(setAssignedTotalPages(data?.totalPages));
          ///dispatch(setAssignedPageNumber(data?.number));
          setLastClick(data?.content[0]);
          setIsFirstPage(data?.first);
          setIsLastPage(data?.last);
          setNumberOfElements(data?.numberOfElements);
        })
        .catch(() => {
          console.error();
        })
        .finally(() => {
          dispatch(setRightLoading(false));
        });
    }, 200);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    isInitialListLoaded,
    initialList,
    reverseFlag,
    saveList,
    deleteList,
    assignedPageNumber,
    exceptList,
    stateSortFlag,
    stateSortValue,
  ]);

  const getInitialList = () => {
    StateGroupsService.getInitialList(id)
      .then((response) => {
        dispatch(setinitialList(response?.data));
      })
      .catch(() => {})
      .finally(() => {
        // lets the left / right lists fetch, once, with the real initialList
        dispatch(setIsInitialListLoaded(true));
      });
  };

  useEffect(() => {
    dispatch(setIsInitialListLoaded(false));
    dispatch(setinitialList());
    getInitialList();
  }, []);

  useEffect(() => {
    if (isLastPage && !isFirstPage && numberOfElements === 0) {
      dispatch(setAssignedPageNumber(assignedPageNumber - 1));
    }
  }, [isFirstPage, isLastPage, numberOfElements]);

  return (
    <div className="fixTableHead no-select" style={{ padding: 0, flex: 1 }}>
      {
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600 "
                onClick={() => {
                  dispatch(setStateSortFlag());
                  dispatch(setStateSortValue("stateName"));
                }}
              >
                State
                {stateSortFlag && stateSortValue === "stateName" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!stateSortFlag && stateSortValue === "stateName" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              assignedStatesList?.length !== 0 &&
              assignedStatesList?.map((states) => (
                <tr
                  id="rowId"
                  key={states.statesPK}
                  onClick={(event) => {
                    handleClick(event, states);
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(states.statesPK);
                    dispatch(removeFromUnSelectedList(states));
                  }}
                  className={
                    unSelectedList?.some((element) => element.statesPK === states.statesPK)
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td>{states.stateName}</td>
                </tr>
              ))}
            {/* {loading && <LoadingText smallerFont />} */}
          </tbody>
        </table>
      }
      {!loading && assignedStatesList?.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
      {/* {loading && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default RightStatesListing;
