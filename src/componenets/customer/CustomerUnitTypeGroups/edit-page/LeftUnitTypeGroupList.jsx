import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  removeFromUnSelectedList,
  setChangesInSelection,
  setLeftGroupList,
  setLeftLoading,
  setLeftPageNumber,
  setLeftTotalElements,
  setLeftTotalPages,
  setSelectedList,
  setSortFlag,
  setSortValue,
  updateSaveList,
  updateSelectedList,
} from "../../../../redux/CustomerUnitTypeGroupSlice";
import CustomerUnitTypeGroupsService from "../../../../services/CustomerUnitTypeGroupsService";
import LoadingText from "../../../common/LoadingText";

const LeftUnitTypeGroupList = () => {
  const dispatch = useDispatch();

  const [lastClick, setLastClick] = useState();
  const [loading, setLoading] = useState(false);

  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);
  const leftGroupList = useSelector((state) => state.customerUnitTypeGroupReducer.leftGroupList);
  const leftPageNumber = useSelector((state) => state.customerUnitTypeGroupReducer.leftPageNumber);
  const radioValue = useSelector((state) => state.customerUnitTypeGroupReducer.radioValue);
  const selectedList = useSelector((state) => state.customerUnitTypeGroupReducer.selectedList);
  const initialList = useSelector((state) => state.customerUnitTypeGroupReducer.initialList);
  const saveList = useSelector((state) => state.customerUnitTypeGroupReducer.saveList);
  const deleteList = useSelector((state) => state.customerUnitTypeGroupReducer.deleteList);
  const exceptList = useSelector((state) => state.customerUnitTypeGroupReducer.exceptList);
  const sortFlag = useSelector((state) => state.customerUnitTypeGroupReducer.sortFlag);
  const sortValue = useSelector((state) => state.customerUnitTypeGroupReducer.sortValue);
  const reverseFlag = useSelector((state) => state.customerUnitTypeGroupReducer.reverseFlag);
  const leftTotalElements = useSelector((state) => state.customerUnitTypeGroupReducer.leftTotalElements);

  const handleClick = (event, groups) => {
    if (event.ctrlKey) {
      if (event.shiftKey) {
        const index1 = leftGroupList?.indexOf(groups);
        const index2 = leftGroupList?.indexOf(lastClick);

        if (index1 < index2) {
          dispatch(updateSelectedList(leftGroupList?.slice(index1, index2 + 1)));
        } else {
          dispatch(updateSelectedList(leftGroupList?.slice(index2, index1 + 1)));
        }
      } else if (selectedList?.includes(groups)) {
        dispatch(removeFromUnSelectedList(groups));
      } else {
        dispatch(updateSelectedList(groups));
      }
      setLastClick(groups);
    } else if (event.shiftKey) {
      dispatch(setSelectedList());
      const index1 = leftGroupList?.indexOf(groups);
      const index2 = leftGroupList?.indexOf(lastClick);

      if (index1 < index2) {
        dispatch(setSelectedList(leftGroupList?.slice(index1, index2 + 1)));
      } else {
        dispatch(setSelectedList(leftGroupList?.slice(index2, index1 + 1)));
      }
    } else {
      const isPresent = selectedList?.find((obj) => obj.unitTypeGroupPK === groups.unitTypeGroupPK);
      if (isPresent) {
        dispatch(removeFromSelectedList(groups));
      } else {
        dispatch(setSelectedList(groups));
      }
      setLastClick(groups);
    }
  };

  const handleDoubleClick = (unitTypeGroupPK) => {
    dispatch(setChangesInSelection(true));
    if (initialList?.includes(unitTypeGroupPK)) {
      dispatch(removeDeleteList(unitTypeGroupPK));
    } else {
      if (exceptList?.includes(unitTypeGroupPK)) {
        dispatch(removeExceptList(unitTypeGroupPK));
      } else {
        dispatch(updateSaveList(unitTypeGroupPK));
      }
    }
  };
  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      CustomerUnitTypeGroupsService.getLeftUnitTypeGroups(
        reverseFlag,
        leftPageNumber,
        initialList,
        deleteList,
        saveList,
        exceptList,
        sortFlag,
        sortValue,
        radioValue
      ).then((response) => {
        const data = response?.data;
        dispatch(setLeftGroupList(data?.content));
        dispatch(setLeftTotalElements(data?.totalElements));
        dispatch(setLeftTotalPages(data?.totalPages));
        dispatch(setLeftLoading(false));
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
    reverseFlag,
    initialList,
    saveList,
    deleteList,
    leftPageNumber,
    exceptList,
    sortFlag,
    sortValue,
    radioValue,
  ]);
  useEffect(() => {
    if (isLastPage && !isFirstPage && numberOfElements === 0) {
      dispatch(setLeftPageNumber(leftPageNumber - 1));
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
                className="f-w-600"
                onClick={() => {
                  dispatch(setSortFlag());
                  dispatch(setSortValue("description"));
                }}
              >
                {" "}
                Unit Type Groups
                {sortFlag && sortValue === "description" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "description" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              leftGroupList?.length !== 0 &&
              leftGroupList?.map((unit) => (
                <tr
                  id="rowId"
                  key={unit.unitTypeGroupPK}
                  onClick={(event) => {
                    handleClick(event, unit);
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(unit.unitTypeGroupPK);
                    dispatch(removeFromSelectedList(unit));
                  }}
                  className={
                    selectedList?.some((element) => element.unitTypeGroupPK === unit.unitTypeGroupPK)
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td className="f-w-600">{unit.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      }
      {!loading && leftGroupList?.length === 0 && (
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

export default LeftUnitTypeGroupList;
