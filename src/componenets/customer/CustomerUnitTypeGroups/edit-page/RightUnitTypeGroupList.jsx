import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  removeFromUnSelectedList,
  removeSaveList,
  setAssignedPageNumber,
  setAssignedTotalElements,
  setAssignedTotalPages,
  setAssignedUnitTypeGroupList,
  setChangesInSelection,
  setGroupSortFlag,
  setGroupSortValue,
  setinitialList,
  setUnSelectedList,
  updateDeleteList,
  updateExceptList,
  updateUnSelectedList,
} from "../../../../redux/CustomerUnitTypeGroupSlice";
import { setAssignedStatesList } from "../../../../redux/StateGroupsSlice";
import CustomerUnitTypeGroupsService from "../../../../services/CustomerUnitTypeGroupsService";
import LoadingText from "../../../common/LoadingText";

const RightUnitTypeGroupList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [lastClick, setLastClick] = useState();
  const [loading, setLoading] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);

  const assignedPageNumber = useSelector((state) => state.customerUnitTypeGroupReducer.assignedPageNumber);

  const initialList = useSelector((state) => state.customerUnitTypeGroupReducer.initialList);
  const assignedUnitTypeGroupList = useSelector(
    (state) => state.customerUnitTypeGroupReducer.assignedUnitTypeGroupList
  );
  const saveList = useSelector((state) => state.customerUnitTypeGroupReducer.saveList);
  const deleteList = useSelector((state) => state.customerUnitTypeGroupReducer.deleteList);
  const exceptList = useSelector((state) => state.customerUnitTypeGroupReducer.exceptList);
  const groupSortValue = useSelector((state) => state.customerUnitTypeGroupReducer.groupSortValue);
  const groupSortFlag = useSelector((state) => state.customerUnitTypeGroupReducer.groupSortFlag);
  const reverseFlag = useSelector((state) => state.customerUnitTypeGroupReducer.reverseFlag);
  const unSelectedList = useSelector((state) => state.customerUnitTypeGroupReducer.unSelectedList);
  const radioValue = useSelector((state) => state.customerUnitTypeGroupReducer.radioValue);
  const handleClick = (event, groups) => {
    if (event.ctrlKey && event.shiftKey) {
      event.preventDefault();
      const index1 = assignedUnitTypeGroupList?.indexOf(groups);
      const index2 = assignedUnitTypeGroupList?.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedUnitTypeGroupList?.slice(index1, index2 + 1);
      } else {
        array = assignedUnitTypeGroupList?.slice(index2, index1 + 1);
      }
      array?.map((obj) => {
        if (!unSelectedList?.includes(obj)) {
          dispatch(assignedUnitTypeGroupList(obj));
        }
      });
    } else if (event.ctrlKey) {
      if (unSelectedList?.includes(groups)) {
        dispatch(removeFromUnSelectedList(groups));
      } else {
        dispatch(updateUnSelectedList(groups));
      }
      setLastClick(groups);
    } else if (event.shiftKey) {
      event.preventDefault();
      const index1 = assignedUnitTypeGroupList?.indexOf(groups);
      const index2 = assignedUnitTypeGroupList?.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedUnitTypeGroupList?.slice(index1, index2 + 1);
      } else {
        array = assignedUnitTypeGroupList?.slice(index2, index1 + 1);
      }
      array?.map((obj) => {
        if (!unSelectedList?.includes(obj)) {
          dispatch(updateUnSelectedList(obj));
        }
      });
    } else {
      const isPresent = unSelectedList?.find((obj) => obj.unitTypeGroupPK === groups.unitTypeGroupPK);
      if (isPresent) {
        dispatch(removeFromUnSelectedList(groups));
      } else {
        dispatch(setUnSelectedList(groups));
      }
      setLastClick(groups);
    }
  };

  const handleDoubleClick = (groups) => {
    dispatch(setChangesInSelection(true));
    if (reverseFlag) {
      dispatch(updateExceptList(groups));
    }

    if (initialList?.includes(groups)) {
      dispatch(updateDeleteList(groups));
    } else if (saveList?.includes(groups)) {
      dispatch(removeSaveList(groups));
    } else {
      dispatch(updateExceptList(groups));
    }
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      CustomerUnitTypeGroupsService.getRightUnitTypeGroups(
        reverseFlag,
        assignedPageNumber,
        initialList,
        deleteList,
        saveList,
        exceptList,
        groupSortFlag,
        groupSortValue,
        radioValue
      ).then((response) => {
        const data = response?.data;
        dispatch(setAssignedUnitTypeGroupList(data?.content));
        dispatch(setAssignedTotalElements(data?.totalElements));
        dispatch(setAssignedTotalPages(data?.totalPages));
        setLastClick(data?.content[0]);
        setIsFirstPage(data?.first);
        setIsLastPage(data?.last);
        setNumberOfElements(data?.numberOfElements);
        setLoading(false);
      });
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    initialList,
    reverseFlag,
    saveList,
    deleteList,
    assignedPageNumber,
    exceptList,
    groupSortFlag,
    groupSortValue,
    radioValue,
  ]);

  const getInitialList = () => {
    CustomerUnitTypeGroupsService.getInitialList(id).then((response) => {
      dispatch(setinitialList(response?.data));
    });
  };

  useEffect(() => {
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
      {loading && <LoadingText smallerFont />}
      {
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600 "
                onClick={() => {
                  dispatch(setGroupSortFlag());
                  dispatch(setGroupSortValue("description"));
                }}
              >
                Unit Type Groups
                {groupSortFlag && groupSortValue === "description" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!groupSortFlag && groupSortValue === "description" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              assignedUnitTypeGroupList?.length !== 0 &&
              assignedUnitTypeGroupList?.map((units) => (
                <tr
                  id="rowId"
                  key={units.unitTypeGroupPK}
                  onClick={(event) => {
                    handleClick(event, units);
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(units.unitTypeGroupPK);
                    dispatch(removeFromUnSelectedList(units));
                  }}
                  className={
                    unSelectedList?.some((element) => element.unitTypeGroupPK === units.unitTypeGroupPK)
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td>{units.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      }
      {!loading && assignedUnitTypeGroupList?.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
      {loading && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightUnitTypeGroupList;
