import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import LoadingText from "../../../common/LoadingText";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  setChangesInStatesSelection,
  setLeftLoading,
  setLeftPageNumber,
  setLeftStatesList,
  setLeftTotalElements,
  setLeftTotalPages,
  setSelectedList,
  setSortFlag,
  setSortValue,
  updateSaveList,
  updateSelectedList,
} from "../../../../redux/StateGroupsSlice";
import StateGroupsService from "../../../../services/StateGroupsService";

const LeftStateListing = () => {
  const dispatch = useDispatch();
  const leftStatesList = useSelector((state) => state.stateGroupReducer.leftStatesList);
  const leftPageNumber = useSelector((state) => state.stateGroupReducer.leftPageNumber);

  const selectedList = useSelector((state) => state.stateGroupReducer.selectedList);
  const initialList = useSelector((state) => state.stateGroupReducer.initialList);
  const isInitialListLoaded = useSelector((state) => state.stateGroupReducer.isInitialListLoaded);
  const saveList = useSelector((state) => state.stateGroupReducer.saveList);
  const deleteList = useSelector((state) => state.stateGroupReducer.deleteList);
  const exceptList = useSelector((state) => state.stateGroupReducer.exceptList);
  const sortFlag = useSelector((state) => state.stateGroupReducer.sortFlag);
  const sortValue = useSelector((state) => state.stateGroupReducer.sortValue);
  const reverseFlag = useSelector((state) => state.stateGroupReducer.reverseFlag);
  const leftTotalElements = useSelector((state) => state.stateGroupReducer.leftTotalElements);
  const loading = useSelector((state) => state.stateGroupReducer.leftLoading);

  const [lastClick, setLastClick] = useState();
  // const [loading, setLoading] = useState(false);

  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);

  const handleClick = (event, states) => {
    if (event.ctrlKey) {
      if (event.shiftKey) {
        const index1 = leftStatesList?.indexOf(states);
        const index2 = leftStatesList?.indexOf(lastClick);

        if (index1 < index2) {
          dispatch(updateSelectedList(leftStatesList?.slice(index1, index2 + 1)));
        } else {
          dispatch(updateSelectedList(leftStatesList?.slice(index2, index1 + 1)));
        }
      } else if (selectedList?.includes(states)) {
        dispatch(removeFromSelectedList(states));
      } else {
        dispatch(updateSelectedList(states));
      }
      setLastClick(states);
    } else if (event.shiftKey) {
      dispatch(setSelectedList());
      const index1 = leftStatesList?.indexOf(states);
      const index2 = leftStatesList?.indexOf(lastClick);

      if (index1 < index2) {
        dispatch(setSelectedList(leftStatesList?.slice(index1, index2 + 1)));
      } else {
        dispatch(setSelectedList(leftStatesList?.slice(index2, index1 + 1)));
      }
    } else {
      const isPresent = selectedList?.find((obj) => obj.statesPK === states.statesPK);
      if (isPresent) {
        dispatch(removeFromSelectedList(states));
      } else {
        dispatch(setSelectedList(states));
      }
      setLastClick(states);
    }
  };

  const handleDoubleClick = (statepk) => {
    dispatch(setChangesInStatesSelection(true));
    if (initialList?.includes(statepk)) {
      dispatch(removeDeleteList(statepk));
    } else {
      if (exceptList?.includes(statepk)) {
        dispatch(removeExceptList(statepk));
      } else {
        dispatch(updateSaveList(statepk));
      }
    }
  };
  useEffect(() => {
    dispatch(setLeftLoading(true));
    // wait for the initial list (loaded by RightStatesListing) - fetching before it arrives means fetching twice
    if (!isInitialListLoaded) return;
    const debounceFunction = setTimeout(() => {
      StateGroupsService.getLeftStates(
        reverseFlag,
        leftPageNumber,
        initialList,
        deleteList,
        saveList,
        exceptList,
        sortFlag,
        sortValue
      )
        .then((response) => {
          const { data } = response;
          dispatch(setLeftStatesList(data?.content));
          dispatch(setLeftTotalElements(data?.totalElements));
          dispatch(setLeftTotalPages(data?.totalPages));
          dispatch(setLeftLoading(false));
          setLastClick(data?.content[0]);
          setIsFirstPage(data?.first);
          setIsLastPage(data?.last);
          setNumberOfElements(data?.numberOfElements);
        })
        .catch(() => {
          console.error();
        })
        .finally(() => {
          dispatch(setLeftLoading(false));
        });
    }, 200);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    isInitialListLoaded,
    reverseFlag,
    initialList,
    saveList,
    deleteList,
    leftPageNumber,
    exceptList,
    sortFlag,
    sortValue,
  ]);
  useEffect(() => {
    if (isLastPage && !isFirstPage && numberOfElements === 0) {
      dispatch(setLeftPageNumber(leftPageNumber - 1));
    }
  }, [isFirstPage, isLastPage, numberOfElements]);

  return (
    <div className="fixTableHead no-select" style={{ padding: 0, flex: 1 }}>
      {
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                onClick={() => {
                  dispatch(setSortFlag());
                  dispatch(setSortValue("stateName"));
                }}
              >
                State
                {sortFlag && sortValue === "stateName" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "stateName" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              leftStatesList?.length !== 0 &&
              leftStatesList?.map((states) => (
                <tr
                  id="rowId"
                  key={states.statesPK}
                  onClick={(event) => {
                    handleClick(event, states);
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(states.statesPK);
                    dispatch(removeFromSelectedList(states));
                  }}
                  className={
                    selectedList?.some((element) => element.statesPK === states.statesPK)
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td className="f-w-600">{states.stateName}</td>
                </tr>
              ))}
            {/* {loading && <LoadingText smallerFont />} */}
          </tbody>
        </table>
      }
      {!loading && leftStatesList?.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default LeftStateListing;
